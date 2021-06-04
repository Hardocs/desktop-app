export const getters = {
  docIsSaved: (state) => {
    return state.currentDoc.saved;
  },
  currentDocId: (state) => {
    return state.currentDoc.id;
  },

  hasUnsavedFiles: (state) => {
    const hardocs = state.hardocs;
    if (hardocs) {
      return hardocs.filter((doc) => !doc.saved).length;
    }
  },

  getDocsAmount: (state) => {
    return state.hardocs.length;
  }
};
