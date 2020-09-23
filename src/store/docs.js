/**
 * In HARDOCS, a project is composed of docs and metadata about the project.
 * this module stores all the specific state of project's documents.
 * This includes document files, folder holding the documents, the html contents,
 * and other data related to documents. 
 */

import DocsServices from '@/services/index';
import {
  // loadFilePathsFromSelectedFolder,
  chooseFolderForUse,
  // putContentToSelectedFolder,
  // loadContentFromFilePath
} from '@hardocs-project/habitat-client/lib/modules/habitat-localservices'

export const state = {
  cwd: "",
  docsFolder: "",
  devFeatures: process.env.devFeatures,
  allDocs: [],
  currentDoc: {}
};

let defaultNewDocName = "Untitled"

export const mutations = {

  SET_CWD(state, cwd) {
    state.cwd = cwd;
  },

  SET_DOCS_FOLDER(state, docsFolder) {
    state.docsFolder = docsFolder;
  },

  LOAD_DOCS(state, allDocs) {
    state.allDocs = allDocs;
    if (allDocs) {
      state.currentDoc = allDocs[0];
    }
    else { state.currentDoc = undefined }
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

  SET_TO_UNSAVED(state){
    state.currentDoc.saved = false
  },

  UPDATE_DOC_CONTENT(state, editedDoc) {
    const newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  }
};

export const actions = {
  openFolder: function () {
    return chooseFolderForUse()
  },

  async loadProject({ commit }) {
    const cwd = await chooseFolderForUse()
    const response = await DocsServices.getProject(cwd);
    const formattedDocs = formatDocs(response, 'openProject')
    commit('SET_CWD', cwd);
    commit('LOAD_DOCS', formattedDocs);
    commit('SET_DOCS_FOLDER', response.data.openProject.docsDir)
  },

  setCurrentDoc({ commit }, docId, index) {
    if (!index) {
      const doc = this.state.docs.allDocs.find((doc) => doc.id == docId);
      if (doc) {
        commit('SET_CURRENT_DOC', doc);
      }
    }
    else {
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
        content: "Edit new document",
        description: "Edit this doc",
        saved: false
      }

      // Make sure that there are no duplicate titles
      for (var i = 0; i < state.allDocs.length; i++) { // FIXME: Generalize this for different scenarios
        if (state.allDocs[i].title == doc.title) {
          doc.title = doc.title + " copy";
          doc.content = doc.title
        }
      }
      doc['fileName'] = `${doc.title.split(' ').join('-')}` // FIXME: check for duplicates
      return doc
    }
    const doc = await makeDoc()
    await dispatch('writeFileRequest', doc)
      .catch((err) => { console.log(err) })
    await commit('ADD_DOC', doc)
    commit('SET_TO_SAVED', doc.id)

  },

  async writeFileRequest({ state , commit }, newDoc) {
    console.log(commit)
    function makeReq(newDoc) {
      return {
        title: newDoc.title,
        description: newDoc.title,
        path: state.docsFolder,
        fileName: `/${newDoc.fileName}.md`,
        content: newDoc.content
      }
    }
    let req = await makeReq(newDoc)
    await DocsServices.writeFile(req)
  },

  deleteDocFile(path) {
    DocsServices.deleteFile(path)
  },

  async saveDocFile({ state , dispatch }) {
    let newDoc = await state.currentDoc
    if(state.currentDoc.saved == false){
      await DocsServices.deleteFile(`${state.cwd}/${state.docsFolder}/${newDoc.fileName}.md`)
      newDoc['fileName'] = `${newDoc.title.split(' ').join('-')}` 
      dispatch('writeFileRequest', newDoc)
    }
  },

  removeDoc({ commit }, id) {
    commit('REMOVE_DOC', id)
  },

  async createNewProject({ commit }, projectMetadata) {
    let response = await DocsServices.createNewProject(projectMetadata)
    let result = formatDocs(response, 'createProject')
    commit('LOAD_DOCS', result)
  },

  async createProjectFromFolder({ commit }, projectMetadata) {
    let response = await DocsServices.createProjectFromFolder(projectMetadata)
    let result = formatDocs(response, 'createProjectFromExisting')
    commit('LOAD_DOCS', result)
  },
};

function formatDocs(response, gqlAction) {
  //Check if mutation exists or not
  response.data[gqlAction].allDocsData.filter((element) => {
    // create id
    element.id = Math.floor(Math.random() * 1000000);

    // Step 1: extract h1 only
    let regex = /<[^>].+?>(.*?)<\/.+?>/;

    if (element.content.match(regex)) {
      element.title = element.content.match(regex)[0];
    }

    else { element.title = element.content }

    // Step 2: get only text inside h1 tags
    regex = /(<([^>]+)>)/gi;
    element.title = element.title.replace(regex, '').trim();
    element.saved = true;
  });
  return response.data[gqlAction].allDocsData
}
