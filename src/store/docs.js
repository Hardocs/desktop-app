// import Vuex from 'vuex'
import DocsServices from '@/services/index';
 
 /**
 *  State should store all documents being created
 *     Create an id for each document
 *     Create  a page per document
 */
export const state = {
  devFeatures: process.env.devFeatures,
  allDocs: [
    {
      id: 'dave',
      title: 'Here we go again',
      content: 'this is a content'
    },
    {
      id: 'jose',
      title: 'Voodoo child',
      content: 'this is a content with sorcery'
    },
    {
      id: 'friend',
      title: 'Jimmy child',
      content: 'Not also is a content with sorcery'
    }
  ],
  currentDoc: {
    id: 'dave',
    title: 'Here we go again',
    content: 'this is a content'
  }
};

export const mutations = {
  OPEN_PROJECT(state, allDocs) {
    state.allDocs = allDocs;
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
    // We have to identify the doc to be updated
    // Then replace the content
    let newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id);
    newDoc.content = editedDoc.content;
    newDoc.title = editedDoc.title;
  }
};

export const actions = {
  async fetchDocs({ commit }, path) {
    // make ajax call to graphQL server to get the documents
    const response = await DocsServices.getProject(path);
    const result = formatDocs(response, 'openProject')
    commit('OPEN_PROJECT', result);
  },

  setDoc({ commit }, docId, index) {
    if(!index){
    const doc = this.state.docs.allDocs.find((doc) => doc.id == docId);
    commit('SET_CURRENT_DOC', doc);
    }
    else{
      const doc = this.state.docs.allDocs[index];
      commit('SET_CURRENT_DOC', doc);
    }
  },

  async createNewProject({commit}, projectMetadata){
    let response = await DocsServices.createNewProject(projectMetadata)
    console.log(response)
    let result = formatDocs(response, 'createProject')
    console.log(result)
    commit('OPEN_PROJECT', result)
  },

  async createProjectFromFolder({commit},projectMetadata){
    let response = await DocsServices.createProjectFromFolder(projectMetadata)
    let result = formatDocs(response, 'createProjectFromExisting')
    commit('OPEN_PROJECT', result)
  }
};

function formatDocs(response, gqlAction){
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
