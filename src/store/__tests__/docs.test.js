// it saves the document correctly (this means the doc is saved locally and in the store)
//    it saves document on store
//    it saves document on the file
// it deletes the doc (in fs and in the store)
// creates project from folder
// creates new project
//

import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '..';
import { types as mutations, actions } from '../docs';
import fs from 'fs';

import { resetState, DEFAULT_STATE } from '../helpers/resetState';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Test for docs operations', () => {
  beforeEach(resetState);

  test('Clean state', () => {
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  test('Creates a hardocs project and updates the store', async () => {
    /**  Disable console log */
    console.log = (...params) => params;
    const name = 'test-project';

    await store.dispatch('createNewProject', {
      docsDir: 'docs',
      entryFile: 'index.html',
      name: name,
      path: process.cwd(),
      shortTitle: ''
    });

    await store.dispatch('loadProject');

    expect(store.state).not.toStrictEqual(DEFAULT_STATE);
    expect(store.state.docs.allDocs).not.toStrictEqual([]);
  });

  test('opens a hardocs project and updates the store', async () => {
    /** allDocs in state is empty */
    expect(store.state.docs.allDocs).toEqual([]);

    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    expect(store.state.docs.cwd).toBe(`${process.cwd()}/test-project`);
    await store.dispatch('loadProject');

    expect(store.state).not.toStrictEqual(DEFAULT_STATE);

    /** allDocs in state is no longer empty */
    expect(store.state.docs.allDocs).not.toEqual([]);
  });
});
