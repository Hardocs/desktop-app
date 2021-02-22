// it saves the document correctly (this means the doc is saved locally and in the store)
//    it saves document on store
//    it saves document on the file
// it deletes the doc (in fs and in the store)
// creates project from folder
// creates new project
//

import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import * as docs from '../docs';
import { types as mutations, actions } from '../docs';
import { resetState } from '../helpers/resetState';
import { cloneDeep } from 'lodash';

const localVue = createLocalVue();
localVue.use(Vuex);

const createStore = () => {
  return new Vuex.Store(
    cloneDeep({
      modules: {
        docs
      }
    })
  );
};

afterEach(async () => {
  await actions.setCwd(process.cwd().replace('/test-project', ''));
});

describe('Test for docs operations', () => {
  let store, DEFAULT_STATE;

  /** Before each test runs, We have to create a new store and reset the state. */
  beforeEach(() => {
    console.log = () => {};
    store = createStore();
    DEFAULT_STATE = resetState(store);
  });

  /** We no longer need to check for a clean store.state since we're no longer using the global store. */
  test('Clean state', () => {
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  test('Creates a hardocs project and updates the store', async () => {
    /**  Disable console log */
    const name = 'test-project';

    console.log(JSON.stringify(store.state, null, 2));
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

  test('Adds a document to the store', async () => {
    expect(store.state.docs.allDocs.length).toBe(0);
    await store.dispatch('addDoc');

    expect(store.state.docs.allDocs.length).toBe(1);
  });

  test('Adds and Saves a document locally and to the store', async () => {
    expect(store.state.docs.allDocs).toStrictEqual([]);

    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    await store.dispatch('loadProject');
    await store.dispatch('addDoc');
    await store.dispatch('saveDocFile');

    expect(store.state.docs.allDocs.length).toBe(2); // I still haven't figured a way to handle this
  });

  /**
   * This test depends on the previous test to check if the length of allDocs is "2"
   */
  test('Delete a document locally updates the store', async () => {
    expect(store.state.docs.allDocs).toStrictEqual([]);

    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    await store.dispatch('loadProject');
    expect(store.state.docs.allDocs.length).toBe(2); // I still haven't figured a way to handle this

    // await store.dispatch('setCurrentDoc', '2');
    await store.dispatch('removeDoc', '2');
    expect(store.state.docs.allDocs.length).not.toBe(2); // I still haven't figured a way to handle this
  });
});

// TODO: Add test to create a project from an existing folder
// TODO: Enable createProjectFromExisting functionality
// TODO: Setup spectron
