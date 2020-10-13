import {
    buildsTemplate,
    mkSchemasList
} from '../../__utils__/schemas'

// FIXME: Setup unit testing with electron
import {
    // loadFilePathsFromSelectedFolder,
    chooseFolderForUse
    // putContentToSelectedFolder,
    // loadContentFromFilePath
} from '@hardocs-project/habitat-client/lib/modules/habitat-localservices';


export const state = {
    // TODO: transfer appDir later to the index store
    appDir: "D:\\my-projects\\hardocs\\REPOS\\hardocs-vue-client",                        // stores the path where the application lives
    schemasDir: "",                   // here goes a path
    schemasRef: [],
    dataSet: [
    ]
}


export const mutations = {
    ADD_OBJECT(state, payload) {
        state.dataSet.push(payload)
    },
    ADD_ROOT_SCHEMAS(state, schemasList) {
        state.schemasRef = schemasList
    },
    SET_SCHEMAS_DIR(state, path) {
        state.schemaDir = path
    }
}

export const actions = {
    /**
     * We add a schema dir to provide the contexts of schemas relevant for this
     * hardocs projects, we could for instance compile a collection of standards
     * within a folder, and then take it from there
     */
    addSchemasDir() {
        const dir = chooseFolderForUse()
            .then(commit('SET_SCHEMAS_DIR', dir))
            .catch((err) => {
                console.log(err)
            })
    },
    
    /**
     * @param {Array} schemasList contains a list of objects with reference schemas
     */
    addSchemas({ commit }, schemasList) {
        console.log(schemasList)
        const { refSchemas } = schemasList
        commit('ADD_ROOT_SCHEMAS', refSchemas)
    },

    /**
     * 
     * @param {Object} payload {schemaDir: "", selectedSchemaFile: ""} 
     */
    addObject({ commit, state }, { schemaDir: schemaDir, selectedSchemaFile: selectedSchemaFile }) {
        // schemaDir = state.appDir + "/" + schemaDir
        const template = buildsTemplate(schemaDir, selectedSchemaFile)
        commit('ADD_OBJECT', template.fields)
    }
}

export const getters = {}