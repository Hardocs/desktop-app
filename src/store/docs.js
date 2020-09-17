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
      content: 'this is a content',
      saved: true
    },
    {
      id: 'jose',
      title: 'Voodoo child',
      content: 'this is a content with sorcery',
      saved: true
    },
    {
      id: 'friend',
      title: 'Jimmy child',
      content: 'Not also is a content with sorcery',
      saved: true
    }
  ],
  currentDoc: {
    id: 'dave',
    title: 'Here we go again',
    content: 'this is a content',
    saved: true
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
    const response = await DocsServices.getProject(path);
    const result = formatDocs(response, 'openProject')
    commit('OPEN_PROJECT', result);
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

   addDoc({ commit }) {
    let newId = Math.floor(Math.random() * 1000000);
    let doc = {
      id: newId,
      title: "Edit this doc",
      content: "Edit new document",
    }
    // TODO: prepend the path of the 
    doc['fileName'] = `${doc.title.split(' ').join('-')}.md`
    let req = {
      title: doc.title,
      description: doc.title,
      path: "docs/",
      fileName: doc.fileName,
      content: doc.content
    }
    // console.log(req)
    req = JSON.stringify(req)
    console.log(req)

    commit('ADD_DOC', doc)
    // need to work with a promise
    // FIXME: this is not working well because of async
    DocsServices.writeFile(      
      {"title":"Edit this doc","description":"Edit this doc","path":"docs/","fileName":"Edit-this-doc.md","content":"Edit new document"}
    )
  },

  removeDoc({ commit }, id) {
    // Here we should call the mutation to remove doc
    commit('REMOVE_DOC', id)
  },


  // TODO: this should be part of another store file
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

  // async saveDocFile({commit}, fileMetadata){
  //   let response = await DocsServices.writeFile(fileMetadata)
  //   commit('ADD_DOC', )
  // }
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
    element.saved = true;
  });
  console.log(response)
  return response.data[gqlAction].allDocsData
}
