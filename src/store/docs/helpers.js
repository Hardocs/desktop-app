import { v4 as uuidv4 } from 'uuid';
/**
 * HELPER FUNCTIONS FOR DOCS STATE STORE
 *
 *
 * Before committing the data object to the vuex it needs to be formatted
 * The formatting includes adding an id, processing the title and
 * adding properties such as saved.
 * @param {Object} response the API response data object
 * @param {Object} action this is the mutation object that wraps the data
 */
export function formatDocs(response, action) {
  const hardocs = response.data[action].hardocs;

  if (hardocs) {
    const docs = hardocs.map((doc) => {
      doc.id = uuidv4();
      doc.saved = false;
      // doc.isWritten = true;
      doc.isWritten = false;
      return doc;
    });
    return docs;
  }
}

/**
 * This function checks before a new doc object before being committed
 * If it exists, then it appends the copy string and also creates the files
 * accordingly with the same names.
 * @param {Object} state to check if the new doc exists already
 */
export function makeDoc(state, ext = 'html') {
  const doc = {
    id: uuidv4(),
    title: 'Untitled',
    content: '',
    saved: false
  };

  if (doc.fileName == state.entryFile) {
    doc.fileName = state.entryFile;
  } else {
    // Make sure that there are no duplicate titles
    for (var i = 0; i < state.hardocs.length; i++) {
      if (state.hardocs[i].title == doc.title) {
        doc.title = doc.title + ' copy';
        doc.content = doc.title;
      }
    }
    doc.content = `<h1>${doc.title}</h1>`;
    doc['fileName'] = `${doc.title.split(' ').join('-')}.${ext}`; // FIXME: check for duplicates
  }
  doc.isWritten = false;

  return doc;
}
