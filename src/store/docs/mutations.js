import { sep } from 'path';
import { types } from './types';

export const mutations = {
  /**
   * defines if project is being initialized
   * and in which way is being initialized
   * @param {Object} options specifies the type of init
   */
  [types.SET_INIT_PROJECT](state, options) {
    state.initProject = options;
  },
  [types.LOAD_PROJECT](state, projectData) {
    state.schema = projectData.schema;
    state.metadata = projectData.metadata;
    state.entryFile = projectData.entryFile;
    state.docsFolder = projectData.docsDir;
  },
  [types.SET_APP_PATH](state, appPath) {
    state.appPath = appPath;
  },

  [types.SET_CWD](state, cwd) {
    state.cwd = cwd;
  },

  [types.SET_VALID_TITLE](state, isValid) {
    state.validTitle = isValid;
  },

  [types.SET_FILENAME](state, fileName) {
    if (state.currentDoc && state.currentDoc.type !== 'record') {
      state.currentDoc.fileName = fileName;
      state.currentDoc.path = `${state.docsFolder}${sep}${fileName}`;
    }
  },

  [types.LOAD_DOCS](state, hardocs) {
    state.hardocs = hardocs;
    if (hardocs.length) {
      state.currentDoc = hardocs[0];
    } else {
      state.currentDoc = undefined;
    }
  },

  [types.ADD_DOC](state, doc) {
    state.hardocs = [...state.hardocs, doc];
    // state.hardocs.push(doc);
  },

  [types.REMOVE_DOC](state, docId) {
    const index = state.hardocs.findIndex((el) => el.id === docId);
    state.hardocs.splice(index, 1);
  },

  [types.SET_CURRENT_DOC](state, doc) {
    state.currentDoc = doc;
  },

  [types.SET_SAVED](state, value) {
    state.currentDoc.saved = value;
  },

  [types.UPDATE_DOC_CONTENT](state, editedDoc) {
    const newDoc = state.hardocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  },

  [types.SET_DOC_CONTENT](state, content) {
    state.currentDoc.content = content;
  },
  [types.SET_ERROR](state, error) {
    state.error = error;
  }
};
