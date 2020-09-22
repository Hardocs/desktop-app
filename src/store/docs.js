/**
 * this module stores all the specific state related to an opened project
 * A project is composed of docs and metadata about the project
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
  docsBaseDir:"",
  devFeatures: process.env.devFeatures,
  allDocs: [],
  currentDoc: {}
};

export const mutations = {
  OPEN_PROJECT(state, allDocs, cwd , docsBaseDir) {
    state.cwd = cwd;
    state.docsBaseDir = docsBaseDir
    state.allDocs = allDocs;
    if (allDocs) {
      state.currentDoc = allDocs[0]; // FiXME: handle exception
    }
    else { state.currentDoc = undefined }
  },
  ADD_DOC(state, doc) {
    state.allDocs.push(doc);
  },

  REMOVE_DOC(state, docId) {
    let index = state.allDocs.findIndex((el) => el.id === docId);
    state.allDocs.splice(index, 1);
  },

  SET_CURRENT_DOC(state, doc) {
    state.currentDoc = doc;
  },

  SET_TO_SAVED(state, docId){
    let doc = state.allDocs.findIndex((el) => el.id === docId);
    console.log("SAVED")
    doc.saved = true;
  },
  

  // Update content when edited
  UPDATE_DOC_CONTENT(state, editedDoc) {
    let newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  }
};

export const actions = {
  openFolder: function () {
    return chooseFolderForUse()
  },

  async fetchDocs({ commit }) {
    const cwd = await chooseFolderForUse()
    const response = await DocsServices.getProject(cwd);
    const formattedDocs = formatDocs(response, 'openProject')
    commit('OPEN_PROJECT', formattedDocs);
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

  async addDoc({ commit , dispatch }) {
    function makeDoc() {
      const newId = Math.floor(Math.random() * 1000000);
      const doc = {
        id: newId,
        title: "Edit this doc",
        content: "Edit new document",
        description:"Hello world"
      }
      doc['fileName'] = `${doc.title.split(' ').join('-')}`
      return doc
    }

    const doc = await makeDoc()
    console.log(doc)
    commit('ADD_DOC', doc)
    // console.log('second: ' + JSON.stringify(doc))
    dispatch('writeFileRequest',  doc)
  },

  async writeFileRequest({commit}, newDoc) {
    // console.log('third: ' + JSON.stringify(state))
    function makeReq(newDoc){
      return {
        title: newDoc.title,
        description: newDoc.title,
        path: state.docsBaseDir, // TODO: this 
        fileName: `${newDoc.fileName}.md` ,
        content: newDoc.content
      }
    }
    let req = await makeReq(newDoc)
    await DocsServices.writeFile(req)
    commit('')
  },

  deleteDocFile(path) {
    DocsServices.deleteFile(path)
  },

  saveDocFile({ state }) {
    let newDoc = state.currentDoc
    console.log(newDoc)
    // Get current Doc
    // let current = state.currentDoc
    // Dispatch delete action

    // Save and change the name
  },

  removeDoc({ commit }, id) {
    // Here we should call the mutation to remove doc
    commit('REMOVE_DOC', id)
  },

  async createNewProject({ commit }, projectMetadata) {
    let response = await DocsServices.createNewProject(projectMetadata)
    let result = formatDocs(response, 'createProject')
    commit('OPEN_PROJECT', result)
  },

  async createProjectFromFolder({ commit }, projectMetadata) {
    let response = await DocsServices.createProjectFromFolder(projectMetadata)
    let result = formatDocs(response, 'createProjectFromExisting')
    commit('OPEN_PROJECT', result)
  },
};

function formatDocs(response, gqlAction) {
  //Check if mutation exists or not
  response.data[gqlAction].allDocsData.filter((element) => {
    // create id
    element.id = Math.floor(Math.random() * 1000000);

    // Create title
    // Step 1: extract h1 only
    let regex = /<h1 [^>]+>(.*?)<\/h1>/;
    if(element.content.match(regex)){
      element.title = element.content.match(regex)[0];
    }
    else{
      element.title = "Untitled"
    }

    // Step 2: get only text inside h1 tags
    regex = /(<([^>]+)>)/gi;
    element.title = element.title.replace(regex, '').trim();
    element.saved = true;
  });
  return response.data[gqlAction].allDocsData
}
