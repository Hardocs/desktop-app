import Vue from 'vue';
import Vuex from 'vuex';
import * as docs from './docs';
import * as metadata from './metadata';
import { ipcOperations } from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    docs,
    metadata
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});

ipcOperations.checkUnsavedDocs(store);
ipcOperations.passAppPath(store);

export default store;
