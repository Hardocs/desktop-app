import { types } from './types';

export const mutations = {
  /**
   * defines if project is being initialized
   * and in which way is being initialized
   * @param {Object} options specifies the type of init
   */
  [types.SET_INIT_PROJECT](state, options) {
    // state = {}
    state.initProject = options;
    console.log('SET_INIT_PROJECT options: ' + JSON.stringify(options));
  },

  [types.SET_APP_PATH](state, appPath) {
    state.appPath = appPath;
  },

  [types.SET_CWD](state, cwd) {
    state.cwd = cwd;
  },

  [types.SET_ENTRY_FILE](state, entryFile) {
    state.entryFile = entryFile;
  },

  [types.SET_DOCS_FOLDER](state, docsFolder) {
    state.docsFolder = docsFolder;
  },

  [types.SET_VALID_TITLE](state, isValid) {
    state.validTitle = isValid;
  },

  [types.LOAD_DOCS](state, allDocs) {
    state.allDocs = allDocs;
    if (allDocs) {
      state.currentDoc = allDocs[0];
    } else {
      state.currentDoc = undefined;
    }
  },

  [types.ADD_DOC](state, doc) {
    state.allDocs.push(doc);
  },

  [types.REMOVE_DOC](state, docId) {
    const index = state.allDocs.findIndex((el) => el.id === docId);
    state.allDocs.splice(index, 1);
  },

  [types.SET_CURRENT_DOC](state, doc) {
    state.currentDoc = doc;
  },
  // FIXME: unify this mutation into SET_SAVED
  [types.SET_TO_SAVED](state, docId) {
    const doc = state.allDocs.find((el) => el.id === docId);
    doc.saved = true;
  },

  [types.SET_TO_UNSAVED](state) {
    state.currentDoc.saved = false;
  },

  [types.UPDATE_DOC_CONTENT](state, editedDoc) {
    const newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  },

  [types.SET_GUIDES](state, isActive) {
    state.guidesIsActive = isActive;
  }
};
