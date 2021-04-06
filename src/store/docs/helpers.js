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
  let idCount = 0;
  const allDocsData = response.data[action].allDocsData;
  console.log({ metadata: response.data.metadata });

  if (allDocsData) {
    allDocsData.map((doc) => {
      // create id
      idCount += 1;
      doc.id = idCount;

      // Step 1: extract h1 only
      let regex = /<[^>].+?>(.*?)<\/.+?>/m;
      if (doc.content.match(regex)) {
        doc.title = doc.content.match(regex)[0];
      } else {
        doc.title = doc.content;
      }

      // Step 2: get first block only text inside h1 tags
      regex = /(<([^>]+)>)/gi;
      doc.title = doc.title.replace(regex, '').trim();
      doc.saved = true;
      if (doc.id == 1) {
        // Make a more unique identifier for the first document to avoid conflict with guides
        doc.id = parseInt('' + doc.id + Math.floor(Math.random() * 1000 + 1));
      }
      doc.isWritten = true;
    });

    return allDocsData;
  }
}

/**
 * This function checks before a new doc object before being committed
 * If it exists, then it appends the copy string and also creates the files
 * accordingly with the same names.
 * @param {Object} state to check if the new doc exists already
 */
export function makeDoc(state, ext = 'html') {
  const newId = state.allDocs.length + 1;
  const doc = {
    id: newId,
    title: 'Untitled',
    content: '',
    saved: false
  };

  if (doc.fileName == state.entryFile) {
    doc.fileName = state.entryFile;
  } else {
    // Make sure that there are no duplicate titles
    for (var i = 0; i < state.allDocs.length; i++) {
      if (state.allDocs[i].title == doc.title) {
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
