export * from './actions';
export * from './getters';
export * from './helpers';
export * from './mutations';
export * from './state';
export * from './types';

// import { actions } from './actions';
// import { getters } from './getters';
// import { helpers } from './helpers';
// import { mutations } from './mutations';
// import { state } from './state';
// import { types } from './types';

// export { actions, getters, helpers, mutations, state, types };

import store from '@/store/index';
import { ipcRenderer } from 'electron';

/**
 * TODO: This doesnt work, try it with the plugin approach bellow....
 */
ipcRenderer.on('checkUnsavedDocs', () => {
  console.log('Getting value from vuex getter to the main process');
  let response = store.getters.hasUnsavedFiles > 0;
  console.log('Response coming from vuex: ' + response);
  ipcRenderer.send('hasUnsavedFiles', response);
});

// Must declare event because on render you receive an event and the data.
// Here I should dispatch an action or maybe I should import the ipcRenderer in a component
ipcRenderer.on('passAppPath', async (event, path) => {
  console.log('Path coming from background process: ' + path);
  await store.commit('SET_APP_PATH', path);
  await store.commit('SET_CWD', path);
  await store.dispatch('loadProject');
  console.log(store.state.docs.cwd);
});
