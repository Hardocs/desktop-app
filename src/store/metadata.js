import { mkSchemasList } from '../../__utils__/schemas';
import { habitatLocal } from '@hardocs-project/habitat-client';
import { types as shared } from './docs';
import fs from 'fs';

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
  },

  async loadSchemaToState({ commit }) {
    selectContentFromFolder()
      .then((data) => {
        commit(types.SELECT_SCHEMA, JSON.parse(data.content));
      })
      .catch((err) => {
        // *todo* you need to handle the cancel which would appear here, apropos the app
        console.error('initProject:err: ' + err);
      });
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
      docsDir: projectConfig.docsFolder
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

import electron from 'electron';

const { dialog, getCurrentWindow } = electron.remote;
const rendWin = getCurrentWindow();

const selectContentFromFolder = (
  fileExts = ['json'],
  typeName = 'Json file',
  options = 'utf8'
) => {
  return new Promise((resolve, reject) => {
    if (process.env.ORIGINAL_XDG_CURRENT_DESKTOP !== null) {
      dialog
        .showOpenDialog(rendWin, {
          filters: [
            {
              name: typeName,
              extensions: fileExts
            }
          ],
          properties: ['openFile']
        })
        .then((fileInfo) => {
          if (!fileInfo.canceled) {
            // only a single file is chosen -- use the other accesses below to get many
            const filePath = fileInfo.filePaths[0];
            return filePath;
          } else {
            reject('(Cancelled...)');
          }
        })
        .then((filePath) => {
          loadContentFromFilePath(filePath, options).then((contentInfo) => {
            resolve(contentInfo);
          });
        })
        .catch((e) => {
          reject('selectContentFromFolder: ' + e.toString());
        });
    } else {
      reject('SelectContentFromFile:error: Not allowed.');
    }
  });
};

const loadContentFromFilePath = (filePath, options = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject('loadContentFromFilePath' + err);
      } else {
        resolve({ filePath: filePath, content: data });
      }
    });
  });
};
