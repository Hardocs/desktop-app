export const getters = {
  docIsSaved: (state) => {
    return !!state.currentDoc.saved;
  },
  getCurrentDoc: (state) => {
    const currentDoc = state.currentDoc;

    if (currentDoc && currentDoc.type === 'record') {
      if (typeof currentDoc.content === 'string') {
        currentDoc.content = JSON.parse(currentDoc.content);
      }
      if (typeof currentDoc.schema.content === 'string') {
        currentDoc.schema.content = JSON.parse(currentDoc.schema.content);
      }
    }
    return currentDoc;
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
  },

  error: (state) => {
    return state.error;
  }
};
