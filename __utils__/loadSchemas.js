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
    const template = {
        referenceSchemas: [], // an array of objects
        templateFields: schema.properties,
        examples: []
    }

    if ('properties' in schema) {
        let props = schema.properties
        
        for (let node in props) {
            
            // Find properties that are complex
            if (!('type' in props[node])) {
                
                // find $ref schemas and list them
                let complexSchema = props[node]
                for (let key in complexSchema) {
                    if ('$ref' in complexSchema[key]) {
                        if (Object.values(complexSchema[key])[0]){
                            const reference = Object.values(complexSchema[key])[0]
                            let referenceTitle = fs.readFileSync(`${schemaDir}${reference}`, 'utf8')
                            referenceTitle = JSON.parse(referenceTitle)
                            console.log(reference)
                            template.referenceSchemas.push({ '$ref' : reference , type : referenceTitle.title})

                        }
                    }
                }
            }
            
            // empty values in the template
            template.templateFields[node] = ""
        }
    }
    // FIXME: console.log(template)
    return template
}



