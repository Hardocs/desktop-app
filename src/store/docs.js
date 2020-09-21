// import Vuex from 'vuex'
import DocsServices from '@/services/index';
// import store from '@/store/'
import {
  // loadFilePathsFromSelectedFolder,
  chooseFolderForUse,
  // putContentToSelectedFolder,
  // loadContentFromFilePath
} from '@hardocs-project/habitat-client/lib/modules/habitat-localservices'



/**
*  State should store all documents being created
*     Create an id for each document
*     Create  a page per document
*/
export const state = {
  devFeatures: process.env.devFeatures,
  allDocs: [],
  currentDoc: {}
};

export const mutations = {
  OPEN_PROJECT(state, allDocs) {
    state.allDocs = allDocs;
    if(allDocs){
      state.currentDoc = allDocs[0]; // FiXME: handle exception
    }
    else{state.currentDoc = undefined}
  },
  ADD_DOC(state, doc) {
    state.allDocs.push(doc);
  },

  REMOVE_DOC(state, docId) {
    // check if docId is correct, etc...
    let index = state.allDocs.findIndex((el) => el.id === docId);
    // Need to get the doc and the position
    state.allDocs.splice(index, 1);
  },
  SET_CURRENT_DOC(state, doc) {
    state.currentDoc = doc;
  },

  // This is to update the content from the Doc component
  SET_CONTENT(state, editedDoc) {
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

  setDoc({ commit }, docId, index) {
    if (!index) {
      const doc = this.state.docs.allDocs.find((doc) => doc.id == docId);
      commit('SET_CURRENT_DOC', doc);
    }
    else {
      const doc = this.state.docs.allDocs[index];
      commit('SET_CURRENT_DOC', doc);
    }
  },

  async createNewProject({ commit }, projectMetadata) {
    let response = await DocsServices.createNewProject(projectMetadata)
    console.log(response)
    let result = formatDocs(response, 'createProject')
    console.log(result)
    commit('OPEN_PROJECT', result)
  },

  async createProjectFromFolder({ commit }, projectMetadata) {
    let response = await DocsServices.createProjectFromFolder(projectMetadata)
    let result = formatDocs(response, 'createProjectFromExisting')
    commit('OPEN_PROJECT', result)
  }
};

function formatDocs(response, gqlAction) {
  //Check if mutation exists or not
  response.data[gqlAction].allDocsData.filter((element) => {
    // create id
    element.id = Math.floor(Math.random() * 1000000);

    // Create title
    // Step 1: extract h1 only
    let regex = /<h1 [^>]+>(.*?)<\/h1>/;
    element.title = element.content.match(regex)[0];

    // Step 2: get only text inside h1 tags
    regex = /(<([^>]+)>)/gi;
    element.title = element.title.replace(regex, '').trim();
  });
  console.log(response)
  return response.data[gqlAction].allDocsData
}
