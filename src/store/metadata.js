import { mkSchemasList } from '../../__utils__/schemas'
// FIXME: Setup unit testing with electron
import { habitatLocal } from '@hardocs-project/habitat-client';
import fs from 'fs'
// import Ajv from 'ajv';
// let docs = context.rootState.instance.docs


export const state = {
    // TODO: transfer appDir later to the index store
    appDir: "D:\\my-projects\\hardocs\\REPOS\\hardocs-vue-client",                        // stores the path where the application lives
    schemasDir: "",                   // here goes a path
    schemasRef: [],
    hardocsJson: {},
    dataSet:{}
}


export const mutations = {
    ADD_OBJECT(state, payload) {
        state.dataSet.push(payload)
    },
    ADD_ROOT_SCHEMAS(state, schemasList) {
        state.schemasRef = schemasList
    },
    SET_SCHEMAS_DIR(state, path) {
        state.schemasDir = path
    },

    UPDATE_DATA_SET(state, dataSetObject) {
        state.dataSet = dataSetObject
    },

    SET_HARDOCS_JSON(state, object) {
        state.hardocsJson = object
    }
}

export const actions = {
    /**
     * We add a schema dir to provide the contexts of schemas relevant for this
     * hardocs projects, we could for instance compile a collection of standards
     * within a folder, and then take it from there
     */
    async setSchemasDir({ commit, dispatch }) {
        const dir = await habitatLocal.chooseFolderForUse()
        await commit('SET_SCHEMAS_DIR', dir)
        const schemasRefs = await mkSchemasList(dir)
        dispatch('addSchemas', schemasRefs)
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
    addObject({ commit }, dataObject) {
        commit('ADD_OBJECT', dataObject)
    },

    async updateDataset({ commit }, dataSet) {
        await commit('UPDATE_DATA_SET', dataSet)
        createNewHardocsJson(this.state.docs, dataSet)
    },

    /**
     * When project is opened, then load the new dataset from hardocs.json
     */
    async loadsDataset({commit}){
        let newDataset = await JSON.parse(fs.readFileSync(`${this.state.docs.cwd}/.hardocs/hardocs.json`, 'utf8'))
        if(!newDataset.dataSet){
           newDataset['dataSet'] = {}
        }
        else newDataset = newDataset.dataSet
        commit('UPDATE_DATA_SET', newDataset)
    }
}

export const getters = {
    stateData: state => {
        return state
    }
}

async function createNewHardocsJson(generalMetadata, dataSetObject) {
    // FIXME: We should do json schema validation here
    if(Object.prototype.hasOwnProperty.call(generalMetadata, 'docsDir')){
        let newMetadataFile = {
            path: generalMetadata.cwd,
            entryFile: generalMetadata.entryFile,
            docsDir: generalMetadata.docsFolder,
            dataSet: dataSetObject
        }
    
        newMetadataFile = await JSON.stringify(newMetadataFile, null, 2)
        // console.log("New metadata to store in json: " + newMetadataFile)
    
        fs.writeFileSync(`${generalMetadata.cwd}/.hardocs/hardocs.json`, newMetadataFile, function (err) {
            if (err) return console.log(err)
            console.log(newMetadataFile)
        });
    }
    else {
        console.log("Cant generate hardocsJson from invalid hardocs project")
    }
    
}
