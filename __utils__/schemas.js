import fs from 'fs'


/**
 * Preconditions: currently all schemas are in a dir as a context...
 * Builds a template object that includes fields, examples and references to
 *  other schemas
 * Reference to other schemas are used to compose complex schemas
 * @param { String } schemaDir a path where the schemas a re located 
 * @param { String } schemaFileName the schemaFile name 
 */
export function buildTemplate(schemaDir, schemaFileName) {
    // Find the location of the schema in the file system
    let schema = fs.readFileSync(`${schemaDir}${schemaFileName}`, 'utf8')
    schema = JSON.parse(schema)

    // Create response object
    const object = {
        referenceSchemas: [], // an array of objects
        fields: schema.properties, ...'$schema',
        examples: []
    }
    // object.fields['$schema'] = `./${schemaFileName}`
    // Object.assign(object, '$schema': `./${schemaFileName}` )
    // object.fields['$schema'] = `./${schemaFileName}`

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
    // FIXME: console.log(template)
    return object
}

export function loadsSchemas(schemasDir) {
    var dirPath = schemasDir;
    var filesList = [] //this is going to contain paths

    fs.readdirSync(__dirname + dirPath, function (err, filesPath) {
        if (err) throw err;
        result = filesPath.map(function (filePath) {
            return dirPath + filePath;
        });
    });

    let refSchemas = []
    filesList.forEach((file) => {

        // refSchemas.push()
    }))

}




