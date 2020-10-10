/**
 * 
 * Loaded project
 *  Adding metadata to the project
 *  RULES:
 *    Load
 *    append annotations and non structured data      
 *    INFO: available types to load (for instance vendors or specs)
 */

// let utils = '../__utils__/'

import fs from 'fs'
import { getJsonTemplate } from '../__utils__/loadSchemas'
const schemaDir = './__tests__/__fixtures__/'
let selectedSchemaFile = 'project.schema.json'


describe("NOT SPEC testing: Experimenting and trying things", () => {
    it('reads traverses json schema tree', () => {
        let schema = fs.readFileSync(`${schemaDir}person.json`, 'utf8')
        let json = getJsonTemplate(schema)
        let mockObject = JSON.stringify({
            "person": {
                "name": "Elizabeth",
                "children": [{
                    "name": "Charles",
                    "children": [{
                        "name": "William",
                        "children": [{
                            "name": "George"
                        },
                        {
                            "name": "Charlotte"
                        }
                        ]
                    },
                    {
                        "name": "Harry"
                    }
                    ]
                }]
            }
        })
        mockObject = JSON.parse(mockObject)
        let jsonKeys = Object.keys(json).sort()
        let mockObjectKeys = Object.keys(mockObject).sort()
        console.log("Show result of final traversed object" + JSON.stringify(json))
        expect(mockObjectKeys).toStrictEqual(jsonKeys)
    })
})

/**
 * Select and import schema feature....
 * 
 */

/**
 * Tip for the user on schema details, and examples of values
 */

it("converts json schema into a json object", () => {
    let schema = fs.readFileSync(schemaDir + selectedSchemaFile, 'utf8')

    let json = getJsonTemplate(schema)
    let mockObject = JSON.stringify({
        path: '',
        name: '',
        shortTitle: '',
        docsDir: '',
        entryFile: '',
        vendors: ''
    })

    mockObject = JSON.parse(mockObject)
    let jsonKeys = Object.keys(json).sort()
    let mockObjectKeys = Object.keys(mockObject).sort()

    expect(mockObjectKeys).toStrictEqual(jsonKeys)
})

it("stores all the schemas in the state given a schemasDir path", () => {
    /**
     * This is an action in vuex store... or a util.. that is required in an action
     * Go through all files 
     * Check that is a json file
     * Read the file 
     */

    expect(1).toBe(2)
})


it("Creates a new object in the store based on a selected json schema", () => {
    /**
     * TO DO: test mutations of vuex 
     */

})

// FIXME: this might be irrelevant
it("Updates json object based ", () => {

})

it("Validates objects metadata against the schema when action is dispatched", () => {
    // Action dispatching mutation
})

/**
 * Pushes data to the database...
 *
 */

/**
 * Creates in the frontend a new data object
 *
 */

/**
 * Injects linked data into html documents, more flat searches
 *
 *
 */