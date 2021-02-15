export const state = {
  appPath: '',
  cwd: '',
  docsFolder: '',
  entryFile: '',
  // FIXME: Set to docsList
  allDocs: [],
  currentDoc: { saved: false },
  // Register is the project is being created
  initProject: {
    type: undefined,
    on: false,
    path: ''
  },
  validTitle: true
};
