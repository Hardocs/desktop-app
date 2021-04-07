module.exports = {
  require: jest.fn(),
  match: jest.fn(),
  app: jest.fn(),
  remote: {
    app: {
      getPath: jest.fn()
    },
    getCurrentWindow: jest.fn()
  },
  dialog: jest.fn(),
  ipcRenderer: {
    on: jest.fn()
  }
};
