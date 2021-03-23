import { mkSchemasList } from '../../__utils__/schemas';
// FIXME: Setup unit testing with electron
import { habitatLocal } from '@hardocs-project/habitat-client';
import fs from 'fs';
// import Ajv from 'ajv';
// let docs = context.rootState.instance.docs

export const state = {
  // TODO: transfer appDir later to the index store
  appDir: 'D:\\my-projects\\hardocs\\REPOS\\hardocs-vue-client', // stores the path where the application lives
  schemasDir: '',          // here goes a path to a list of schemas
  schemasNames: [],        // The name of the schemas used to present them in a list 
  projectSchema: {},       // The schema saved inside .hardocs folder used to regenerate forms
  projectSchemaPath:"",    // The schema path should be added to hardocsConfig at least
  metadata: {},            // The metadata generated using the form
  hardocsConfig: {},       
};

export const mutations = {
  // This added an object inside the metadata
  // * This is deprecated
  ADD_OBJECT(state, payload) {
    state.metadata.push(payload);
  },

  // This adds the list of schemeas
  // TODO: Change better name
  ADD_ROOT_SCHEMAS(state, schemasList) {
    state.schemasRef = schemasList;
  },

  // This where schemas live
  // For instance in the app folder there can be an updatable list of schemas
  SET_SCHEMAS_DIR(state, path) {
    state.schemasDir = path;
  },

  // metadata refers to metadata
  UPDATE_METADATA(state, metadataObject) {
    state.metadata = metadataObject;
  },

  // This is the config file currently starting a hardocs project
  SET_HARDOCS_JSON(state, object) {
    state.hardocsConfig = object;
  }
};

export const actions = {
  /**
   * We add a schema dir to provide the contexts of schemas relevant for this
   * hardocs projects, we could for instance compile a collection of standards
   * within a folder, and then take it from there
   */
  async setSchemasDir({ commit, dispatch }) {
    const dir = await habitatLocal.chooseFolderForUse();
    await commit('SET_SCHEMAS_DIR', dir);
    const schemasNames = await mkSchemasList(dir);
    dispatch('addSchemas', schemasNames);
  },

  /**
   * @param {Array} schemasList contains a list of objects with reference schemas
   */
  addSchemas({ commit }, schemasList) {
    console.log(schemasList);
    const { refSchemas } = schemasList;
    commit('ADD_ROOT_SCHEMAS', refSchemas);
  },

  /**
   * This is assuming objects can be added to a metadata object
   * TODO: Not needed at the moment
   * @param {Object} payload {schemaDir: "", selectedSchemaFile: ""}
   */
  addObject({ commit }, dataObject) {
    commit('ADD_OBJECT', dataObject);
  },

  async updateMetadata({ commit }, metadata) {
    await commit('UPDATE_METADATA', metadata);
    createNewhardocsConfig(this.state.docs, metadata);
  },

  /**
   * When project is opened, then load the new metadata from hardocs.json
   * 
   */
  async loadsProjectConfig({ commit }) {
    let newMetadata = await JSON.parse(
      fs.readFileSync(`${this.state.docs.cwd}/.hardocs/hardocs.json`, 'utf8')
    );
    if (!newMetadata.metadata) {
      newMetadata['metadata'] = {};
    } else newMetadata = newMetadata.metadata;
    commit('UPDATE_METADATA', newMetadata);
  }
};

export const getters = {
  stateData: (state) => {
    return state;
  }
};

/**
 * TODO: All these fs operations need to be properly layered in the services layer
 * @param {} projectConfig 
 */
async function createNewhardocsConfig(projectConfig) {
  // FIXME: We should do json schema validation here
  if (Object.prototype.hasOwnProperty.call(projectConfig, 'docsDir')) {
    let newprojectConfigFile = {
      path: projectConfig.cwd,
      entryFile: projectConfig.entryFile,
      docsDir: projectConfig.docsFolder,
    };

    newprojectConfigFile = await JSON.stringify(newprojectConfigFile, null, 2);
    // console.log("New projectConfig to store in json: " + newprojectConfigFile)

    fs.writeFileSync(
      `${projectConfig.cwd}/.hardocs/hardocs.json`,
      newprojectConfigFile,
      function(err) {
        if (err) return console.log(err);
        console.log(newprojectConfigFile);
      }
    );
  } else {
    console.log('Cant generate hardocsConfig from invalid hardocs project');
  }
}
