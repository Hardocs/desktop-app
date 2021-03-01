import router from '@/router';

import DocsServices from '../services';
import habitatLocal from './habitatLocal';

export const types = {
  SET_INIT_PROJECT: 'SET_INIT_PROJECT',
  SET_APP_PATH: 'SET_APP_PATH',
  SET_CWD: 'SET_CWD',
  SET_ENTRY_FILE: 'SET_ENTRY_FILE',
  SET_DOCS_FOLDER: 'SET_DOCS_FOLDER',
  SET_VALID_TITLE: 'SET_VALID_TITLE',
  LOAD_DOCS: 'LOAD_DOCS',
  ADD_DOC: 'ADD_DOC',
  REMOVE_DOC: 'REMOVE_DOC',
  SET_CURRENT_DOC: 'SET_CURRENT_DOC',
  SET_TO_SAVED: 'SET_TO_SAVED',
  SET_TO_UNSAVED: 'SET_TO_UNSAVED',
  UPDATE_DOC_CONTENT: 'UPDATE_DOC_CONTENT',
  SET_GUIDES: 'SET_GUIDES'
};

export const state = {
  appPath: '',
  cwd: '',
  docsFolder: '',
  entryFile: 'index.html',
  // FIXME: Set to docsList
  allDocs: [],
  currentDoc: { saved: false },
  // Register is the project is being created
  initProject: {
    type: undefined,
    on: false,
    path: ''
  },
  validTitle: true
};

export const mutations = {
  /**
   * defines if project is being initialized
   * and in which way is being initialized
   * @param {Object} options specifies the type of init
   */
  [types.SET_INIT_PROJECT](state, options) {
    // state = {}
    state.initProject = options;
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

export const getters = {
  docIsSaved: (state) => {
    return state.currentDoc.saved;
  },
  currentDocId: (state) => {
    return state.currentDoc.id;
  },

  hasUnsavedFiles: (state) => {
    const allDocs = state.allDocs;
    if (allDocs) {
      return allDocs.filter((doc) => !doc.saved).length;
    }
  },

  guidesIsActive: (state) => {
    if (state.appPath === state.cwd) return true;
    else return false;
  },

  getDocsAmount: (state) => {
    return state.allDocs.length;
  }
};

export const actions = {
  openFolder({ commit }) {
    const cwd = habitatLocal
      .chooseFolderForUse()
      .then(commit(types.SET_CWD, cwd))
      .catch((err) => {
        console.error(err);
      });
  },

  /**
   * Opening a project requires several init conditions:
   * 1. We check If a project is being initialized
   * 2. We check type of initialization is taking place.
   * These types of inits are Opening an existing project, creating a new one,
   * or creating a project from an existing folder
   * @param {Object} init passes init options, on, type, path
   */
  async initProject({ commit, dispatch }, init) {
    habitatLocal
      .chooseFolderForUse()
      .then((cwd) => {
        if (init.on == true) {
          commit(types.SET_CWD, cwd);
          commit(types.SET_INIT_PROJECT, {
            on: true,
            type: init.type,
            path: cwd
          });
        } else {
          commit(types.SET_CWD, cwd);
          dispatch('loadProject');
        }
      })
      .catch((err) => {
        // *todo* you need to handle the cancel which would appear here, apropos the app
        console.error('initProject:err: ' + err);
      });
  },

  /**
   * 
   * @param {*} param0 
   * @param {*} projectMetadata @example {
        docsDir: 'docs',
        entryFile: 'index.html',
        name: 'delete-this',
        path: '/path/to/project',
        shortTitle: ''
      }
   */
  async createNewProject({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createNewProject(projectMetadata);
    await commit(types.SET_CWD, response.data.createProject.path);
    dispatch('loadProject');
  },

  async createProjectFromExisting({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createProjectFromExisting(
      projectMetadata
    );
    await commit(types.SET_CWD, response.data.createProjectFromExisting.path);
    dispatch('loadProject');
  },

  async loadProject({ commit, state, dispatch }) {
    if (state.cwd) {
      let invalidProject = false;
      const response = await DocsServices.getProject(state.cwd).catch((e) => {
        console.error(e);
        invalidProject = true;
      });
      if (!invalidProject) {
        const formattedDocs = formatDocs(response, 'openProject');
        commit(types.SET_CWD, state.cwd);
        await commit(types.LOAD_DOCS, formattedDocs);
        commit(types.SET_DOCS_FOLDER, response.data.openProject.docsDir);
        commit(types.SET_ENTRY_FILE, response.data.openProject.entryFile);
        // dispatch('loadsDataset');
        dispatch('setCurrentDoc');
      } else {
        console.error('Invalid hardocs project');
        commit(types.SET_CWD, undefined);
        return window.alert(
          'Cannot open invalid hardocs project. Select a hardocs project or create a new one'
        );
      }
    }
  },

  setCurrentDoc({ commit }, docId, index) {
    if (!index) {
      const allDocs = this.state.docs.allDocs;
      if (!allDocs) return;
      const doc = allDocs.find((doc) => doc.id == docId);
      if (doc) {
        commit(types.SET_CURRENT_DOC, doc);
      }
    } else if (!docId && !index) {
      const doc = this.state.docs.allDocs[0];
      commit(types.SET_CURRENT_DOC, doc);
    } else {
      const doc = this.state.docs.allDocs[index];
      commit(types.SET_CURRENT_DOC, doc);
    }
    router
      .push({
        path: '/doc/' + state.currentDoc.id
      })
      .catch((err) => {
        // Ignore the vuex err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes(
            'Avoided redundant navigation to current location'
          )
        ) {
          // But print any other errors to the console
          console.error(err);
        }
      });
  },

  async addDoc({ state, commit, dispatch }) {
    const doc = makeDoc(state);
    await commit(types.ADD_DOC, doc);
    await dispatch('setCurrentDoc', doc.id);
  },

  async writeFileRequest({ state }, newDoc) {
    function makeReq(newDoc) {
      return {
        title: newDoc.title,
        path: state.docsFolder,
        fileName: newDoc.fileName.trim(),
        content: newDoc.content
      };
    }
    const req = makeReq(newDoc);
    await DocsServices.writeFile(req);
  },

  async saveDocFile({ state, dispatch, commit }) {
    const alreadyExistingTitle = this.state.docs.allDocs.find(
      (doc) =>
        doc.title === state.currentDoc.title && doc.id !== state.currentDoc.id
    );
    if (alreadyExistingTitle) {
      window.alert("Title already exist! Change doc's title");
      commit(types.SET_VALID_TITLE, false);
    } else {
      commit(types.SET_VALID_TITLE, true);
      const newDoc = await state.currentDoc;
      newDoc.path = `${state.cwd}/${state.docsFolder}`;

      if (state.currentDoc.fileName !== state.entryFile) {
        if (
          `${newDoc.title
            .split(' ')
            .join('-')
            .trim()}.html` !== state.currentDoc.fileName
        ) {
          DocsServices.deleteFile(`${newDoc.path}/${newDoc.fileName}`);
        }
      }
      let fileName = `${newDoc.title
        .split(' ')
        .join('-')
        .trim()}.html`;

      newDoc.fileName = fileName;

      commit(types.SET_VALID_TITLE, true);
      await dispatch('writeFileRequest', newDoc);
      commit(types.SET_TO_SAVED, state.currentDoc.id);
    }
  },

  setSaved({ commit }, boolean) {
    if (!boolean) {
      commit(types.SET_TO_UNSAVED);
    }
  },

  async removeDoc({ state, commit, dispatch }, id) {
    const doc = state.allDocs.find((doc) => doc.id == id);
    // TODO: This handling of files is not proper yet
    /**
     * Now we have two different path values,
     * One when the document is created from the app
     * 2 when is loaded from an existing project
     */
    if (doc.fileName !== state.entryFile) {
      if (doc.isWritten) DocsServices.deleteFile(doc.path);
      else DocsServices.deleteFile(`${doc.path}/${doc.fileName}`);
      await dispatch('setCurrentDoc', state.allDocs[0].id);
    }
    commit(types.REMOVE_DOC, id);
  },

  cwd() {
    return DocsServices.getCWD();
  },

  setCwd(path) {
    return DocsServices.setCWD(path);
  }
};

/**
 * HELPER FUNCTIONS FOR DOCS STATE STORE
 *
 *
 * Before committing the data object to the vuex it needs to be formatted
 * The formatting includes adding an id, processing the title and
 * adding properties such as saved.
 * @param {Object} response the API response data object
 * @param {Object} action this is the mutation object that wraps the data
 */
export function formatDocs(response, action) {
  let idCount = 0;
  const allDocsData = response.data[action].allDocsData;

  if (allDocsData) {
    allDocsData.map((doc) => {
      // create id
      idCount += 1;
      doc.id = idCount;

      // Step 1: extract h1 only
      let regex = /<[^>].+?>(.*?)<\/.+?>/m;
      if (doc.content.match(regex)) {
        doc.title = doc.content.match(regex)[0];
      } else {
        doc.title = doc.content;
      }

      // Step 2: get first block only text inside h1 tags
      regex = /(<([^>]+)>)/gi;
      doc.title = doc.title.replace(regex, '').trim();
      doc.saved = true;
      if (doc.id == 1) {
        // Make a more unique identifier for the first document to avoid conflict with guides
        doc.id = parseInt('' + doc.id + Math.floor(Math.random() * 1000 + 1));
      }
      doc.isWritten = true;
    });

    return allDocsData;
  }
}

/**
 * This function checks before a new doc object before being committed
 * If it exists, then it appends the copy string and also creates the files
 * accordingly with the same names.
 * @param {Object} state to check if the new doc exists already
 */
export function makeDoc(state) {
  const newId = state.allDocs.length + 1;
  const doc = {
    id: newId,
    title: 'Untitled',
    content: '',
    saved: false
  };

  if (doc.fileName == state.entryFile) {
    doc.fileName = state.entryFile;
  } else {
    // Make sure that there are no duplicate titles
    for (var i = 0; i < state.allDocs.length; i++) {
      if (state.allDocs[i].title == doc.title) {
        doc.title = doc.title + ' copy';
        doc.content = doc.title;
      }
    }
    doc.content = `<h1>${doc.title}</h1>`;
    doc['fileName'] = `${doc.title.split(' ').join('-')}.html`; // FIXME: check for duplicates
  }
  doc.isWritten = false;

  return doc;
}
