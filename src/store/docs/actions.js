import router from '@/router';

import DocsServices from '../../services';
import habitatLocal from '../habitatLocal';
// import types from './types';

import { formatDocs, makeDoc } from './helpers';
import { state } from './state';
import { mutations } from './mutations';

export const actions = {
  openFolder({ commit }) {
    const cwd = habitatLocal
      .chooseFolderForUse()
      .then(commit('SET_CWD', cwd))
      .catch((err) => {
        console.log(err);
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
          commit(mutations.SET_CWD, cwd);
          console.log('initializing on this path: ' + cwd);
          commit('SET_INIT_PROJECT', {
            on: true,
            type: init.type,
            path: cwd
          });
        } else {
          commit('SET_CWD', cwd);
          dispatch('loadProject');
        }
      })
      .catch((err) => {
        // *todo* you need to handle the cancel which would appear here, apropos the app
        console.log('initProject:err: ' + err);
      });
  },

  async createNewProject({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createNewProject(projectMetadata);
    // console.log("Create new project response: " + JSON.stringify(response))
    console.log(
      'createNewProject:response: ' + JSON.stringify(response, null, 2)
    );
    // const result = formatDocs(response, 'createProject')
    // console.log("Result of formatDocs: " + JSON.stringify(result))
    await commit('SET_CWD', response.data.createProject.path);
    dispatch('loadProject');
  },

  async createProjectFromExisting({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createProjectFromExisting(
      projectMetadata
    );
    // const result = formatDocs(response, 'createProjectFromExisting');
    // console.log("Result of formatDocs: " + JSON.stringify(result))
    await commit('SET_CWD', response.data.createProjectFromExisting.path);
    dispatch('loadProject');
  },

  async loadProject({ commit, state, dispatch }) {
    if (state.cwd) {
      let invalidProject = false;
      const response = await DocsServices.getProject(state.cwd).catch((e) => {
        console.log(e);
        invalidProject = true;
      });
      // console.log("Promise response: " + JSON.stringify(response))
      // console.log("Is invalid project?: " + JSON.stringify(invalidProject))
      if (!invalidProject) {
        const formattedDocs = formatDocs(
          response,
          'openProject',
          state.entryFile
        );
        commit('SET_CWD', state.cwd);
        await commit('LOAD_DOCS', formattedDocs);
        commit('SET_DOCS_FOLDER', response.data.openProject.docsDir);
        commit('SET_ENTRY_FILE', response.data.openProject.entryFile);
        // dispatch('loadsDataset');
        dispatch('setCurrentDoc');
      } else {
        console.log('Invalid hardocs project');
        commit('SET_CWD', undefined);
        return window.alert(
          'Cannot open invalid hardocs project. Select a hardocs project or create a new one'
        );
      }
    }
  },

  setCurrentDoc({ commit }, docId, index) {
    // console.log("Current Doc data: ", JSON.stringify({ docId, index: this.state.docs.allDocs }, null, 2));
    if (!index) {
      const allDocs = this.state.docs.allDocs;
      if (!allDocs) return;
      const doc = allDocs.find((doc) => doc.id == docId);
      if (doc) {
        commit('SET_CURRENT_DOC', doc);
      }
    } else if (!docId && !index) {
      const doc = this.state.docs.allDocs[0];
      commit('SET_CURRENT_DOC', doc);
    } else {
      const doc = this.state.docs.allDocs[index];
      console.log('Changing to the proper route');
      commit('SET_CURRENT_DOC', doc);
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
          console.log(err);
        }
      });
  },

  async addDoc({ state, commit, dispatch }) {
    const doc = makeDoc(state);
    console.log({ doc });
    // await dispatch('writeFileRequest', doc).catch((err) => {
    //   console.log(err);
    // });
    await commit('ADD_DOC', doc);
    await dispatch('setCurrentDoc', doc.id);
    // await dispatch('saveDocFile');
  },

  async writeFileRequest({ state, commit }, newDoc) {
    console.log(commit);
    function makeReq(newDoc) {
      return {
        title: newDoc.title,
        path: state.docsFolder,
        fileName: newDoc.fileName,
        content: newDoc.content
      };
    }
    const req = makeReq(newDoc);
    console.log(
      'Request to write a new file' +
        JSON.stringify({ req, currentDoc: state.currentDoc }, null, 2)
    );
    await DocsServices.writeFile(req);
  },

  async saveDocFile({ state, dispatch, commit }) {
    const alreadyExistingTitle = this.state.docs.allDocs.find(
      (doc) =>
        doc.title === state.currentDoc.title && doc.id !== state.currentDoc.id
    );
    if (alreadyExistingTitle) {
      window.alert("Title already exist! Change doc's title");
      commit('SET_VALID_TITLE', false);
    } else {
      commit('SET_VALID_TITLE', true);
      const newDoc = await state.currentDoc;
      newDoc.path = `${state.cwd}/${state.docsFolder}`;

      // await DocsServices.deleteFile(filePath); // You don't need to delete the file as it would be overwritten.
      if (newDoc.fileName !== state.entryFile) {
        console.log('Not entry file: ' + newDoc.title.split(' ').join('-'));

        if (newDoc.fileName) {
          await DocsServices.deleteFile(`${newDoc.path}/${newDoc.fileName}`);
          console.log('deleted %s', newDoc.fileName);
        }
        let fileName = `${newDoc.title.split(' ').join('-')}.html`;

        newDoc.fileName = fileName;
      }
      commit('SET_VALID_TITLE', true);
      commit('SET_TO_SAVED', state.currentDoc.id);
      dispatch('writeFileRequest', newDoc);
    }
  },

  setSaved({ commit }, boolean) {
    if (!boolean) {
      commit('SET_TO_UNSAVED');
    }
  },

  async removeDoc({ state, commit, dispatch }, id) {
    const doc = state.allDocs.find((doc) => doc.id == id);
    console.log(`removing Doc: ${doc.path}`);
    // TODO: This handling of files is not proper yet
    /**
     * Now we have two different path values,
     * One when the document is created from the app
     * 2 when is loaded from an existing project
     */
    if (doc.fileName !== state.entryFile) {
      if (doc.isWritten) await DocsServices.deleteFile(doc.path);
      else await DocsServices.deleteFile(`${doc.path}/${doc.fileName}`);
      await dispatch('setCurrentDoc', state.allDocs[0].id);
      commit('REMOVE_DOC', id);
    }
  },

  cwd() {
    DocsServices.getCWD();
  }
};
