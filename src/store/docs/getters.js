export const getters = {
  docIsSaved: (state) => {
    // console.log("Getter for isSaved " + JSON.stringify(state.currentDoc))
    console.log('Getter for isSaved  ' + state.currentDoc.saved);
    return state.currentDoc.saved;
  },
  currentDocId: (state) => {
    return state.currentDoc.id;
  },

  hasUnsavedFiles: (state) => {
    const allDocs = state.allDocs;
    if (allDocs) {
      return allDocs.filter((doc) => !doc.saved).length;
    }
  },

  guidesIsActive: (state) => {
    if (state.appPath === state.cwd) return true;
    else return false;
  },

  getDocsAmount: (state) => {
    return state.allDocs.length;
  }
};
