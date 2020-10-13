import fs from 'fs'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { state, getters, actions, mutations } from '../src/store/metadata'

// Service used in actions
import {
    buildsTemplate,
    mkSchemasList
} from '../__utils__/schemas'

const absoluteSchemaDir = "D:\\my-projects\\hardocs\\REPOS\\hardocs-vue-client\\__tests__\\__fixtures__\\"
const schemaDir = './__tests__/__fixtures__/'
const selectedSchemaFile = 'project.schema.json'
const schemasRef = [
    { title: 'The root schema', ref: 'person.json' },
    { title: 'Project', ref: 'project.schema.json' },
    { title: 'Vendor', ref: 'vendor.schema.json' }
]
/**
 * A json schemas loader, template generator and editor in vue that
 * allows user to generate metadata easily and consistently with schemas specs
 * When user selects a set of schemas, the component loads a root schema
 * that has all the reference to child schemas to generate metadata
 * additional semi-structured that can be added to the schemas
 */
describe("Json schemas loader and templates based on schemas", () => {
    describe("The utility library layer", () => {
        it("Generates lists available schemas in a path", async () => {
            let schemasList = await mkSchemasList(absoluteSchemaDir)
            // await console.log("Loading schemasdir " + JSON.stringify(mkSchemasList(absoluteSchemaDir, selectedSchemaFile)))
            
            expect(schemasList.refSchemas).toEqual(schemasRef)
            // expect(schemasList.folderPath).toEqual(undefined) // FIXME: this should be passed from the state
        })

        it("converts json schema into a json object", () => {
            let json = buildsTemplate(schemaDir, selectedSchemaFile)
            json = json.fields
            let mockObject = JSON.stringify({
                "$schema": '',
                context: {
                    title: "Part",
                },
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
            expect(jsonKeys).toStrictEqual(mockObjectKeys)
        })
    })

    describe("The vuex state management layer", () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        const store = new Vuex.Store({
            modules: {
                metadata: {
                    state,
                    actions,
                    mutations,
                    getters
                }
            }
        })

        it('tests if state stores some data', () => {
            let key = "$schema"
            store.dispatch('addObject', { schemaDir: schemaDir, selectedSchemaFile: selectedSchemaFile })
            // console.log(JSON.stringify(store.state.metadata, null, 2))
            expect(store.state.metadata.dataSet[0].hasOwnProperty(key)).toBe(true)
        })

        it("stores the list of schemas in the state given a folder path", async () => {
            /**
             * This is an action in vuex store... or a util.. that is required in an action
             * Go through all files 
             * Check that is a json file
             * Read the file 
             */
            let list = await mkSchemasList(schemaDir)
            store.dispatch('addSchemas', list)
            expect(store.state.metadata.schemasRef).toStrictEqual(schemasRef)
        })


        it("Creates a new object in the store based on a selected json schema", () => {


            //     // expect(wrapper.vm.salad).toEqual(['cucumber'])

        })


        /**
         * Tip for the user on schema details, and examples of values
         */

    })
})








// FIXME: this might be irrelevant
// it("Updates json object based ", () => {

// })

// it("Validates objects metadata against the schema when action is dispatched", () => {
//     // Action dispatching mutation
// })

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
 *
 */