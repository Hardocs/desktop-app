export const getters = {
  docIsSaved: (state) => {
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

  getDocsAmount: (state) => {
    return state.allDocs.length;
  }
};
