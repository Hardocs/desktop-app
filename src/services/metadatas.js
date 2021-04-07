/* eslint-disable prettier/prettier */
// TODO: import the default schema and hardcode it in the service layer
import { 
    selectContentFromFolder,
    loadContentFromFilePath,
    chooseFolderForUse,
    loadFilePathsFromFolder,
    loadFilePathsFromSelectedFolder,
    putContentToSelectedFolder,
    putContentToFilePath,
    shellProcess
} from 'habitat'

var DEFAULT_SCHEMA = "pass the schema here" // Use a simple dublin core

// Expose methods with resources
// Here a metadata doc is simply a doc
export default {
    // Start first just getting a document
    getDoc(){
        return {
            path: "filename",
            schemaType: "Here goes the type of schema",
            // This is the reference to where the schema lives, normally on the internet
            schemaRef: "Schema reference",
            schemaFilePath: "" // Where the schema lives
        }
    },
    // This simply gets a schema
    getSchema(){
        return DEFAULT_SCHEMA
    }
}