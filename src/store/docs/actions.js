import router from '@/router';

import { DocsServices } from '../../services';
import habitatLocal from '../../services/habitatLocal';
import { makeDoc, formatDocs } from './helpers';
import { types } from './types';

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
  validTitle: true,
  metadata: {},
  schema: {}
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
        await commit(types.LOAD_PROJECT, response.data.openProject);
        await commit(types.LOAD_DOCS, formattedDocs);
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

      let fileName = `${newDoc.title
        .split(' ')
        .join('-')
        .trim()}.html`;

      if (state.currentDoc.fileName !== state.entryFile) {
        if (
          `${newDoc.title
            .split(' ')
            .join('-')
            .trim()}.html` !== state.currentDoc.fileName
        ) {
          DocsServices.deleteFile(`${newDoc.path}/${newDoc.fileName}`);
        }
      } else {
        fileName = state.entryFile;
      }

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
