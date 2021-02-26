import { ipcRenderer } from 'electron';

function checkUnsavedDocs(store) {
  return ipcRenderer.on('checkUnsavedDocs', () => {
    let response = store.getters.hasUnsavedFiles > 0;
    ipcRenderer.send('hasUnsavedFiles', response);
  });
}

// Must declare event because on render you receive an event and the data.
// Here I should dispatch an action or maybe I should import the ipcRenderer in a component

function passAppPath(store) {
  return ipcRenderer.on('passAppPath', async (event, path) => {
    await store.commit('SET_APP_PATH', path);
    await store.commit('SET_CWD', path);
    await store.dispatch('loadProject');
  });
}

export default {
  checkUnsavedDocs,
  passAppPath
};
