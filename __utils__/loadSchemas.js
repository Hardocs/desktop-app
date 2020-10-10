import fs from 'fs'
// import { convertSchemaToJson } from 'SchemaToJson'


/**
 * Load nested schema
 * 
 */

 let schemaDir = "./src/schemas/"

 export function getJsonTemplate(schema){
    schema = JSON.parse(schema) // FIXME: this has
    let template = schema.properties
    for (let key in template){
        // if key has reference then get the schema
        template[key] = "" 
    }
    return template
 }

// function getRefTemplate(key, value){
//     if(key === "$ref"){
//         const schema = fs.readFileSync(`${schemaDir}${value}`, 'utf8')
//         return schema
//     }
// }


