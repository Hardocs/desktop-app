/* eslint-disable */
/**
 * In HARDOCS, a project is composed of docs and metadata about the project.
 * this module stores all the specific state of project's documents.
 * This includes document files, folder holding the documents, the html contents,
 * and other data related to documents.
 */
// import { ipcRenderer } from 'electron'
import DocsServices from '@/services/index'
import {
  habitatLocal
} from '@hardocs-project/habitat-client'
import router from '@/router'
import store from '@/store/index'
import { ipcRenderer } from 'electron'

export const state = {
  cwd: '',
  docsFolder: '',
  entryFile: '',
  devFeatures: process.env.devFeatures,
  // FIXME: Set to docsList
  allDocs: [],
  currentDoc: { saved: false },
  // Register is the project is being created
  initProject: {
    type: undefined,
    on: false,
    path: ''
  }
}

const defaultNewDocName = 'Untitled'

export const mutations = {
  /**
   * defines if project is being initialized
   * and in which way is being initialized
   * @param {Object} options specifies the type of init
   */
  SET_INIT_PROJECT(state, options) {
    // state = {}
    state.initProject = options
    console.log('SET_INIT_PROJECT options: ' + JSON.stringify(options))
  },

  SET_CWD(state, cwd) {
    state.cwd = cwd
  },

  SET_ENTRY_FILE(state, entryFile) {
    state.entryFile = entryFile
  },

  SET_DOCS_FOLDER(state, docsFolder) {
    state.docsFolder = docsFolder
  },

  LOAD_DOCS(state, allDocs) {
    state.allDocs = allDocs
    if (allDocs) {
      state.currentDoc = allDocs[0]
    } else {
      state.currentDoc = undefined
    }
  },

  ADD_DOC(state, doc) {
    state.allDocs.push(doc)
  },

  REMOVE_DOC(state, docId) {
    const index = state.allDocs.findIndex((el) => el.id === docId)
    state.allDocs.splice(index, 1)
  },

  SET_CURRENT_DOC(state, doc) {
    state.currentDoc = doc
  },
  // FIXME: unify this mutation into SET_SAVED
  SET_TO_SAVED(state, docId) {
    const doc = state.allDocs.find((el) => el.id === docId)
    doc.saved = true
  },

  SET_TO_UNSAVED(state) {
    state.currentDoc.saved = false
  },

  UPDATE_DOC_CONTENT(state, editedDoc) {
    const newDoc = state.allDocs.find((doc) => doc.id == editedDoc.id)
    newDoc.content = editedDoc.content
    newDoc.title = editedDoc.title
  }
}

export const actions = {
  openFolder({ commit }) {
    const cwd = habitatLocal.chooseFolderForUse()
      .then(commit('SET_CWD', cwd))
      .catch((err) => {
        console.log(err)
      })
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
    habitatLocal.chooseFolderForUse()
      .then(cwd => {
        if (init.on == true) {
          commit('SET_CWD', cwd)
          console.log("initializing on this path: " + cwd)
          commit('SET_INIT_PROJECT', {
            on: true,
            type: init.type,
            path: cwd
          })
        } else {
          commit('SET_CWD', cwd)
          dispatch('loadProject')
        }
      })
      .catch(err => {
        // *todo* you need to handle the cancel which would appear here, apropos the app
        console.log('initProject:err: ' + err)
      })
  },

  async createNewProject({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createNewProject(projectMetadata)
    // console.log("Create new project response: " + JSON.stringify(response))
    console.log('createNewProject:response: ' + JSON.stringify(response, null, 2))
    // const result = formatDocs(response, 'createProject')
    // console.log("Result of formatDocs: " + JSON.stringify(result))
    await commit('SET_CWD', response.data.createProject.path)
    dispatch('loadProject')
  },

  async createProjectFromExisting({ commit, dispatch }, projectMetadata) {
    const response = await DocsServices.createProjectFromExisting(
      projectMetadata
    )
    // const result = formatDocs(response, 'createProjectFromExisting')
    // console.log("Result of formatDocs: " + JSON.stringify(result))
    await commit('SET_CWD', response.data.createProjectFromExisting.path)
    dispatch('loadProject')
  },

  async loadProject({ commit, state, dispatch }) {
    if (state.cwd) {
      const response = await DocsServices.getProject(state.cwd).catch(()=>{})
      // console.log({ response })

      const formattedDocs = formatDocs(
        response,
        'openProject',
        state.entryFile
      )
      commit('SET_CWD', state.cwd)
      await commit('LOAD_DOCS', formattedDocs)
      commit('SET_DOCS_FOLDER', response.data.openProject.docsDir)
      commit('SET_ENTRY_FILE', response.data.openProject.entryFile)
      await dispatch('')
      dispatch('loadsDataset')
      dispatch('setCurrentDoc')
    }
  },

  setCurrentDoc({ commit }, docId, index) {
    console.log({ docId, index: this.state.docs.allDocs })
    if (!index) {
      const doc = this.state.docs.allDocs.find((doc) => doc.id == docId)
      if (doc) {
        commit('SET_CURRENT_DOC', doc)
      }
    } else if (!docId && !index) {
      const doc = this.state.docs.allDocs[0]
      commit('SET_CURRENT_DOC', doc)
    } else {
      const doc = this.state.docs.allDocs[index]
      commit('SET_CURRENT_DOC', doc)
    }
    router.push({
      path: '/doc/' + state.currentDoc.id
    }).catch((err) => {
      // Ignore the vuex err regarding  navigating to the page they are already on.
      if (
        err.name !== 'NavigationDuplicated' &&
        !err.message.includes('Avoided redundant navigation to current location')
      ) {
        // But print any other errors to the console
        console.log(err)
      }
    })
  },

  async addDoc({ state, commit, dispatch }) {
    const doc = makeDoc(state)
    console.log({ doc })
    await dispatch('writeFileRequest', doc).catch((err) => {
      console.log(err)
    })
    await commit('ADD_DOC', doc)
    await dispatch('setCurrentDoc', doc.id)
    await dispatch('saveDocFile')
    commit('SET_TO_SAVED', doc.id)
  },

  async writeFileRequest({ state, commit }, newDoc) {
    console.log(commit)
    function makeReq(newDoc) {
      return {
        title: newDoc.title,
        description: newDoc.title,
        path: state.docsFolder,
        fileName: state.currentDoc.fileName || newDoc.fileName,
        content: newDoc.content
      }
    }
    const req = makeReq(newDoc)
    console.log({ req, currentDoc: state.currentDoc })
    await DocsServices.writeFile(req)
  },

  async saveDocFile({ state, dispatch }) {
    const newDoc = await state.currentDoc
    newDoc.path = `${state.cwd}/${state.docsFolder}`

    // await DocsServices.deleteFile(filePath) // You don't need to delete the file as it would be overwritten.
    if (newDoc.fileName !== state.entryFile) {
      console.log('Not entry file: ' + newDoc.title.split(' ').join('-'))

      let fileName = newDoc.fileName.toLowerCase().includes('untitled.md')
        ? `${newDoc.title.split(' ').join('-')}.md`
        : newDoc.fileName

      newDoc.fileName = fileName
    }
    dispatch('writeFileRequest', newDoc)
  },

  setSaved({ commit }, boolean) {
    if (!boolean) {
      commit('SET_TO_UNSAVED')
    }
  },

  async removeDoc({ state, commit }, id) {
    const newDoc = state.allDocs.find((doc) => doc.id == id)
    // console.log(`removing Doc: ${newDoc.path}`)
    if (newDoc.fileName !== state.entryFile) {
      await DocsServices.deleteFile(newDoc.path)
      commit('REMOVE_DOC', id)
    }
  }
}

export const getters = {
  docIsSaved: (state) => {
    // console.log("Getter for isSaved " + JSON.stringify(state.currentDoc))
    console.log('Getter for isSaved  ' + state.currentDoc.saved)
    return state.currentDoc.saved
  },
  currentDocId: (state) => {
    return state.currentDoc.id
  },

  hasUnsavedFiles: (state) => {
    return state.allDocs.filter(doc => !doc.saved).length
  }
}

/**
 * TODO: This doesnt work, try it with the plugin approach bellow....
 */
ipcRenderer.on('checkUnsavedDocs', ()=> {
  console.log("Getting value from vuex getter to the main process")
  let response = store.getters.hasUnsavedFiles > 0
  console.log("Response coming from vuex: " + response)
  ipcRenderer.send('hasUnsavedFiles', response)
})

/**
 * HELPER FUNCTIONS FOR DOCS STATE STORE
 *
 *
 * Before committing the data object to the vuex it needs to be formatted
 * The formatting includes adding an id, processing the title and
 * adding properties such as saved.
 * @param {Object} response the API response data object
 * @param {Object} gqlAction this is the mutation object that wraps the data
 */
function formatDocs(response, gqlAction) {
  // console.log('formatDocs:response: ' + response.data[gqlAction])
  response.data[gqlAction].allDocsData.map((doc) => {
    // create id
    doc.id = Math.floor(Math.random() * 1000000)

    // Step 1: extract h1 only
    let regex = /<[^>].+?>(.*?)<\/.+?>/m
    if (doc.content.match(regex)) {
      doc.title = doc.content.match(regex)[0]
    } else {
      doc.title = doc.content
    }

    // Step 2: get first block only text inside h1 tags
    regex = /(<([^>]+)>)/gi
    doc.title = doc.title.replace(regex, '').trim()
    doc.saved = true
  })

  return response.data[gqlAction].allDocsData
}

/**
 * This function checks before a new doc object before being committed
 * If it exists, then it appends the copy string and also creates the files
 * accordingly with the same names.
 * @param {Object} state to check if the new doc exists already
 */
function makeDoc(state) {
  const newId = Math.floor(Math.random() * 1000000)
  const doc = {
    id: newId,
    title: defaultNewDocName,
    content: 'Edit new document',
    description: 'Edit this doc',
    saved: false
  }

  if (doc.fileName == state.entryFile) {
    doc.fileName = state.entryFile
  } else {
    // Make sure that there are no duplicate titles
    for (var i = 0; i < state.allDocs.length; i++) {
      if (state.allDocs[i].title == doc.title) {
        doc.title = doc.title + ' copy'
        doc.content = doc.title
      }
    }
    doc['fileName'] = `${doc.title.split(' ').join('-')}.md` // FIXME: check for duplicates
  }
  return doc
}


