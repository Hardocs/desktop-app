import fs from 'fs'
import path from 'path'

/**
 * Preconditions: currently all schemas are in a dir as a context...
 * Builds a template object that includes fields, examples and references to
 *  other schemas
 * Reference to other schemas are used to compose complex schemas
 * @param { String } schemaDir a path where the schemas a re located 
 * @param { String } schemaFileName the schemaFile name 
 */
export function buildsTemplate(schemaDir, schemaFileName) {
    // Find the location of the schema in the file system
    let schema = fs.readFileSync(`${schemaDir}${schemaFileName}`, 'utf8')
    schema = JSON.parse(schema)

    // Create response object
    const object = {
        referenceSchemas: [], // an array of objects
        fields: schema.properties, 
        examples: []
    }

    if ('properties' in schema) {
        let props = schema.properties
        for (let key in props) {

            // Find properties that are complex
            if (!('type' in props[key])) {

                // find $ref schemas and list them
                let complexSchema = props[key]
                for (let key in complexSchema) {
                    if ('$ref' in complexSchema[key]) {
                        if (Object.values(complexSchema[key])[0]) {
                            const reference = Object.values(complexSchema[key])[0]
                            let referenceTitle = fs.readFileSync(`${schemaDir}${reference}`, 'utf8')
                            referenceTitle = JSON.parse(referenceTitle)
                            object.referenceSchemas.push({ '$ref': reference, type: referenceTitle.title })
                        }
                    }
                }
            }

            // empty values in the template
            object.fields[key] = ""
        }
    }
    object.fields['$schema'] = `./${schemaFileName}`

    return object
}

/**
 * Creates a list of objects that defines the title of the schema
 * and the name as of the file that contains the schema as a reference
 * @param {String} folderPath 
 */
export function mkSchemasList(folderPath) {
    return new Promise((resolve, reject) => {
        // servicesLog('loadFilePathsFromFolder: ' + JSON.stringify(folderPath))
        try {
            let files = fs.readdirSync(folderPath)
            let refSchemas = []
            // FIXME: make it a reduce function
            files.forEach((file) => {
                let schema = fs.readFileSync(path.join(folderPath, file), 'utf8')
                if (JSON.parse(schema).title) {
                    refSchemas.push ({
                        title: JSON.parse(schema).title,
                        ref: file
                    })
                }
            })
            resolve({
                folderPath: folderPath,
                refSchemas: refSchemas 
            })
        } catch (e) {
            console.log(JSON.stringify({ loadSchemas: 'error: ' + e.toString() }))
            reject({ loadSchemas: 'error: ' + e.toString() })
        }
    })
}






