import { buildTemplate } from '../../__utils__/schemas'



export const state = {
    // schemaDir: './__tests__/__fixtures__/',
    schemasDir: "", // here goes a path
    rootSchemas: [
        {
            path: "",
            title: ""
        },
        {
            path: "",
            title: ""
        },
        {
            path: "",
            title: ""
        },
    ],
    dataSet: [
    ]
}


export const mutations = {
    ADD_OBJECT(state, payload) {
        state.dataSet.push(payload)
    }
}

export const actions = {
    /**
     * We add a schema dir to provide the contexts of schemas relevant for this
     * hardocs projects, we could for instance compile a collection of standards
     * within a folder, and then take it from there
     */
    addSchemasDir() {

    },

    /**
     * 
     * @param {Object} payload {schemaDir: "", selectedSchemaFile: ""} 
     */
    addObject({ commit }, { schemaDir: schemaDir, selectedSchemaFile: selectedSchemaFile }) {
        const template = buildTemplate(schemaDir, selectedSchemaFile)
        commit('ADD_OBJECT', template.fields)
    }
}

export const getters = {}