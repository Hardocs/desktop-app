import { types as shared } from './docs';
import { MetadataService } from '../services';

export const types = {
  ...shared,
  ADD_OBJECT: 'ADD_OBJECT',
  ADD_ROOT_SCHEMAS: 'ADD_ROOT_SCHEMAS',
  SET_SCHEMAS_DIR: 'SET_SCHEMAS_DIR',
  UPDATE_METADATA: 'UPDATE_METADATA',
  SET_HARDOCS_CONFIG: 'SET_HARDOCS_CONFIG',
  SELECT_SCHEMA: 'SELECT_SCHEMA'
};

export const state = {
  // TODO: transfer appDir later to the index store
  appDir: 'D:\\my-projects\\hardocs\\REPOS\\hardocs-vue-client', // stores the path where the application lives
  schemasDir: '', // here goes a path to a list of schemas
  schemasNames: [], // The name of the schemas used to present them in a list
  projectSchema: {}, // The schema saved inside .hardocs folder used to regenerate forms
  projectSchemaPath: '', // The schema path should be added to hardocsConfig at least
  metadata: {}, // The metadata generated using the form
  hardocsConfig: {}
};

export const mutations = {
  // This added an object inside the metadata
  // * This is deprecated
  [types.ADD_OBJECT](state, payload) {
    state.metadata.push(payload);
  },

  [types.SELECT_SCHEMA](state, payload) {
    state.projectSchema = payload;
  },

  // This adds the list of schemeas
  // TODO: Change better name
  [types.ADD_ROOT_SCHEMAS](state, schemasList) {
    state.schemasRef = schemasList;
  },

  // This where schemas live
  // For instance in the app folder there can be an updatable list of schemas
  [types.SET_SCHEMAS_DIR](state, path) {
    state.schemasDir = path;
  },

  // metadata refers to metadata
  [types.UPDATE_METADATA](state, metadataObject) {
    state.metadata = metadataObject;
  },

  // This is the config file currently starting a hardocs project
  [types.SET_HARDOCS_CONFIG](state, object) {
    state.hardocsConfig = object;
  }
};

export const actions = {
  /**
   * Loads selected schema to state.
   */
  async loadSchemaToState({ commit }) {
    const data = await MetadataService.loadSchema();
    commit(types.SELECT_SCHEMA, JSON.parse(data));
  }
};

export const getters = {
  stateData: (state) => {
    return state;
  }
};
