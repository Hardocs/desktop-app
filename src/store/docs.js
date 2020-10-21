/**
 * In HARDOCS, a project is composed of docs and metadata about the project.
 * this module stores all the specific state of project's documents.
 * This includes document files, folder holding the documents, the html contents,
 * and other data related to documents.
 */

import DocsServices from '@/services/index';
import {
  // loadFilePathsFromSelectedFolder,
  chooseFolderForUse
  // putContentToSelectedFolder
  // loadContentFromFilePath
} from '@hardocs-project/habitat-client/lib/modules/habitat-localservices';
// import fs from 'fs';
// import { chooseFolderForUse } from '@/test';
import router from '@/router';

export const state = {
  cwd: '',
  docsFolder: '',
  entryFile: '',
  devFeatures: process.env.devFeatures,
  allDocs: [],
  currentDoc: {},
  // Register is the project is being created
  initProject: {
    type: undefined,
    on: false
  }
};

const defaultNewDocName = 'Untitled';

export const mutations = {
  /**
   * defines if project is being initialized
   * and in which way is being initialized
   * @param {Object} options specifies the type of init
   */
  SET_INIT_PROJECT(state, options) {
    // state = {}
    state.initProject = options;
  },

  SET_CWD(state, cwd) {
    state.cwd = cwd;
  },

  SET_ENTRY_FILE(state, entryFile) {
    state.entryFile = entryFile;
  },

  SET_DOCS_FOLDER(state, docsFolder) {
    state.docsFolder = docsFolder;
  },

  LOAD_DOCS(state, allDocs) {
    state.allDocs = allDocs;
    if (allDocs) {
      state.currentDoc = allDocs[0];
    } else {
      state.currentDoc = undefined;
    }
  },

  ADD_DOC(state, doc) {
    state.allDocs.push(doc);
  },

  REMOVE_DOC(state, docId) {
    const index = state.allDocs.findIndex((el) => el.id === docId);
    state.allDocs.splice(index, 1);
  },

  SET_CURRENT_DOC(state, doc) {
    state.currentDoc = doc;
  },

  SET_TO_SAVED(state, docId) {
    const doc = state.allDocs.find((el) => el.id === docId);
    doc.saved = true;
  },

  SET_TO_UNSAVED(state) {
    state.currentDoc.saved = false;
  },

  UPDATE_DOC_CONTENT(state, editedDoc) {
    const newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  }
};

export const actions = {
  openFolder({ commit }) {
    const cwd = chooseFolderForUse()
      .then(commit('SET_CWD', cwd))
      .catch((err) => {
        console.log(err);
      });
  },

  async initProject({ commit, dispatch }, init) {
    /**
     * This specifies two conditions:
     * 1. If a project is being initialized
     * 2. What type of initialization is taking place
     * (Opening an existing project, creating a new one,
     * or creating a project from an existing folder)
     */
    const cwd = await chooseFolderForUse();
    if (init.on == true) {
      commit('SET_CWD', cwd);
      console.log('initializing on this path' + cwd);
      commit('SET_INIT_PROJECT', {
        on: true,
        type: init.type
      });
    } else {
      commit('SET_CWD', cwd);
      dispatch('loadProject');
    }
  },

  async createNewProject({ commit }, projectMetadata) {
    const response = await DocsServices.createNewProject(projectMetadata);
    const result = formatDocs(response, 'createProject');
    commit('LOAD_DOCS', result);
  },

  async createProjectFromExisting({ commit }, projectMetadata) {
    const response = await DocsServices.createProjectFromExisting(
      projectMetadata
    );

    const result = formatDocs(response, 'createProjectFromExisting');
    commit('LOAD_DOCS', result);
  },

  async loadProject({ commit, state, dispatch }) {
    // const put = fs.readdirSync('/home/divine/Desktop', 'utf-8');

    // const cwd = state.cwd;
    if (state.cwd) {
      const response = await DocsServices.getProject(state.cwd);
      console.log({ response });

      const formattedDocs = formatDocs(
        response,
        'openProject',
        state.entryFile
      );
      commit('SET_CWD', state.cwd);
      await commit('LOAD_DOCS', formattedDocs);
      commit('SET_DOCS_FOLDER', response.data.openProject.docsDir);
      commit('SET_ENTRY_FILE', response.data.openProject.entryFile);
      await dispatch('setCurrentDoc');
      router.push({
        path: '/doc/' + state.currentDoc.id
      });
    }
  },

  setCurrentDoc({ commit }, docId, index) {
    console.log({ docId, index: this.state.docs.allDocs });
    if (!index) {
      const doc = this.state.docs.allDocs.find((doc) => doc.id == docId);
      if (doc) {
        commit('SET_CURRENT_DOC', doc);
      }
    } else if (!docId && !index) {
      const doc = this.state.docs.allDocs[0];
      commit('SET_CURRENT_DOC', doc);
    } else {
      const doc = this.state.docs.allDocs[index];
      commit('SET_CURRENT_DOC', doc);
    }
  },

  async addDoc({ state, commit, dispatch }) {
    function makeDoc() {
      const newId = Math.floor(Math.random() * 1000000);
      const doc = {
        id: newId,
        title: defaultNewDocName,
        content: 'Edit new document',
        description: 'Edit this doc',
        saved: false
      };

      if (doc.fileName == state.entryFile) {
        doc.fileName = state.entryFile;
      } else {
        // Make sure that there are no duplicate titles
        for (var i = 0; i < state.allDocs.length; i++) {
          // FIXME: Generalize this for different scenarios
          if (state.allDocs[i].title == doc.title) {
            doc.title = doc.title + ' copy';
            doc.content = doc.title;
          }
        }
        doc['fileName'] = `${doc.title.split(' ').join('-')}.md`; // FIXME: check for duplicates
      }
      return doc;
    }
    const doc = makeDoc();
    console.log({ doc });
    await dispatch('writeFileRequest', doc).catch((err) => {
      console.log(err);
    });
    await commit('ADD_DOC', doc);
    commit('SET_TO_SAVED', doc.id);
  },

  async writeFileRequest({ state }, newDoc) {
    function makeReq(newDoc) {
      return {
        title: newDoc.title,
        description: newDoc.title,
        path: state.docsFolder,
        fileName: state.currentDoc.fileName || newDoc.fileName,
        content: newDoc.content
      };
    }
    const req = makeReq(newDoc);
    console.log({ req, currentDoc: state.currentDoc });
    await DocsServices.writeFile(req);
  },

  async saveDocFile({ state, dispatch }) {
    const newDoc = await state.currentDoc;
    newDoc.path = `${state.cwd}/${state.docsFolder}`;

    // await DocsServices.deleteFile(filePath); // You don't need to delete the file as it would be overwritten.
    if (newDoc.fileName !== state.entryFile) {
      console.log('Not entry file: ' + newDoc.title.split(' ').join('-'));

      let fileName = newDoc.fileName.toLowerCase().includes('untitled.md')
        ? `${newDoc.title.split(' ').join('-')}.md`
        : newDoc.fileName;

      newDoc.fileName = fileName;
    }
    dispatch('writeFileRequest', newDoc);
  },

  async removeDoc({ state, commit }, id) {
    const newDoc = state.allDocs.find((doc) => doc.id == id);

    console.log(`removing Doc: ${newDoc.path}`);

    if (newDoc.fileName !== state.entryFile) {
      await DocsServices.deleteFile(newDoc.path);
      commit('REMOVE_DOC', id);
    }
  }
};

function formatDocs(response, gqlAction) {
  //Check if mutation exists or not
  console.log(response.data[gqlAction]);

  response.data[gqlAction].allDocsData.filter(async (element) => {
    // create id
    element.id = Math.floor(Math.random() * 1000000);

    // Step 1: extract h1 only
    let regex = /<[^>].+?>(.*?)<\/.+?>/m;
    if (element.content.match(regex)) {
      element.title = await element.content.match(regex)[0];
    } else {
      element.title = element.content;
    }

    // Step 2: get only text inside h1 tags
    regex = /(<([^>]+)>)/gi;
    element.title = await element.title.replace(regex, '').trim();
    element.saved = true;
  });
  return response.data[gqlAction].allDocsData;
}
