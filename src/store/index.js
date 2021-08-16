import Vue from 'vue';
import Vuex from 'vuex';
import { ipcOperations } from '../services';
import docs from './docs';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    docs
  }
});

ipcOperations.checkUnsavedDocs(store);
ipcOperations.passAppPath(store);

export default store;
