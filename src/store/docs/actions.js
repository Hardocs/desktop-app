import router from '@/router';
import { v4 as uuidV4 } from 'uuid';
import { DocsServices } from '../../services';
import habitatLocal from '../../services/habitatLocal';
import { formatDocs, makeDoc } from './helpers';
import { types } from './types';

export const initialState = {
  // FIXME: What's the use of "appPath"?
  appPath: '',
  cwd: '',
  docsFolder: '',
  hardocs: [],
  currentDoc: { saved: false },
  initProject: {
    type: undefined,
    on: false,
    path: ''
  },
  error: {
    error: false,
    message: null
  },
  validTitle: true
};

export { initialState as state };

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

  async loadProject({ commit, state, dispatch }) {
    const INITIAL_STATE = JSON.parse(
      JSON.stringify({
        docs: initialState
      })
    );
    this.replaceState(JSON.parse(JSON.stringify(INITIAL_STATE)));
    if (state.cwd) {
      let invalidProject = false;
      const response = await DocsServices.getProject(state.cwd).catch((e) => {
        console.error({ e });
        invalidProject = true;
      });
      if (response.data.openProject.error || invalidProject) {
        await commit(types.SET_ERROR, response.data.openProject);
        await commit(types.SET_CWD, '');
        return state.error;
      }

      if (!invalidProject) {
        const formattedDocs = formatDocs(response, 'openProject');

        commit(types.SET_CWD, state.cwd);
        await commit(types.LOAD_PROJECT, response.data.openProject);
        if (formattedDocs.length) {
          await commit(types.LOAD_DOCS, formattedDocs);
          dispatch('setCurrentDoc');
        }
      } else {
        console.error('Invalid hardocs project');
        commit(types.SET_CWD, undefined);
        return window.alert(
          'Cannot open invalid hardocs project. Select a hardocs project or create a new one'
        );
      }
    }
  },

  async setCurrentDoc({ commit, state }, docId) {
    if (state.hardocs.length < 1) {
      await commit(types.SET_CURRENT_DOC, {
        saved: false
      });
      return;
    }
    if (docId) {
      const hardocs = state.hardocs;
      const doc = hardocs.find((doc) => doc.id == docId);
      if (doc) {
        commit(types.SET_CURRENT_DOC, doc);
      }
    } else if (!docId) {
      if (state.hardocs.length <= 0) {
        await commit(types.SET_CURRENT_DOC, {
          saved: false
        });
      } else {
        const doc = state.hardocs[0];
        commit(types.SET_CURRENT_DOC, doc);
      }
    }

    if (state.currentDoc.id) {
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
    }
  },

  async addDoc({ state, commit, dispatch }) {
    // TODO: This code can be refactored to work for both metadata docs and regular html docs.
    // but I'll leave that for later
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
    await DocsServices.writeFile(state.cwd, req);
  },

  async saveDocFile({ state, commit }) {
    if (state.currentDoc.type === 'record') {
      await DocsServices.writeFile(state.cwd, {
        content: JSON.stringify(state.currentDoc.content, null, 2),
        path: state.currentDoc.path
      });
      commit(types.SET_SAVED, true);
    } else {
      const alreadyExistingTitle = this.state.docs.hardocs.filter(
        (doc) =>
          doc.title === state.currentDoc.title && doc.id !== state.currentDoc.id
      ).length;
      if (alreadyExistingTitle > 1) {
        window.alert("Title already exist! Change doc's title");
        commit(types.SET_VALID_TITLE, false);
      } else {
        commit(types.SET_VALID_TITLE, true);
        const newDoc = await state.currentDoc;

        const fileName = `${newDoc.title
          .split(' ')
          .join('-')
          .trim()}.html`;

        if (state.currentDoc.fileName !== fileName) {
          const deleted = await DocsServices.deleteFile(
            state.currentDoc,
            state
          );
          if (
            typeof deleted.data.deleteFile === 'boolean' &&
            deleted.data.deleteFile
          ) {
            await commit(types.SET_FILENAME, fileName);
          }
        }

        commit(types.SET_VALID_TITLE, true);
        await DocsServices.saveDoc(state.cwd, {
          content: state.currentDoc.content,
          docsDir: state.docsFolder,
          title: newDoc.title
        });
        commit(types.SET_SAVED, true);
      }
    }
  },

  setSaved({ commit }, boolean) {
    commit(types.SET_SAVED, boolean);
  },

  async removeDoc({ state, commit, dispatch }) {
    const file = state.currentDoc;
    // const doc = state.hardocs.find((doc) => doc.id == file.id);
    // TODO: This handling of files is not proper yet

    /**
     * Now we have two different path values,
     * One when the document is created from the app
     * 2 when is loaded from an existing project
     */
    if (file) {
      await DocsServices.deleteFile(file, state);
    }
    await commit(types.REMOVE_DOC, file.id);
    await dispatch('setCurrentDoc');
  },

  async addMetadata({ commit, state }, data) {
    try {
      const response = await DocsServices.addMetadata(state, data);
      response.data.addMetadata.id = uuidV4();
      response.data.addMetadata.saved = true;
      response.data.addMetadata.isWritten = true;

      await commit(types.ADD_DOC, response.data.addMetadata);
      await commit(types.SET_CURRENT_DOC, response.data.addMetadata);
    } catch (error) {
      await commit(types.SET_ERROR, {
        error: true,
        message: error
      });
    }
  }
};

// CurrentDoc => Conditionally render documents based on document type
// update the [hardocs] field when a new record or doc is added or updated
// !Remove the schema and metadata fields in state and in the `manifest`
