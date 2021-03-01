import Vue from 'vue';
import Vuex from 'vuex';
import * as docs from '@/store/docs';
import ipcOperations from '../services/ipc-operations';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    docs
    // metadata
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});

ipcOperations.checkUnsavedDocs(store);
ipcOperations.passAppPath(store);

export default store;
