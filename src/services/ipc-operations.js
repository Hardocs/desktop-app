import { ipcRenderer } from 'electron';

function checkUnsavedDocs(store) {
  return ipcRenderer.on('checkUnsavedDocs', () => {
    console.log('Getting value from vuex getter to the main process');
    let response = store.getters.hasUnsavedFiles > 0;
    console.log('Response coming from vuex: ' + response);
    ipcRenderer.send('hasUnsavedFiles', response);
  });
}

// Must declare event because on render you receive an event and the data.
// Here I should dispatch an action or maybe I should import the ipcRenderer in a component

function passAppPath(store) {
  return ipcRenderer.on('passAppPath', async (event, path) => {
    console.log('Path coming from background process: ' + path);
    await store.commit('SET_APP_PATH', path);
    await store.commit('SET_CWD', path);
    await store.dispatch('loadProject');
    console.log(store.state.docs.cwd);
  });
}

export default {
  checkUnsavedDocs,
  passAppPath
};
