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

describe('Test actions', () => {
  let store, DEFAULT_STATE;

  /** Before each test runs, We have to create a new store and reset the state. */
  beforeEach(async () => {
    store = createStore();
    DEFAULT_STATE = resetState(store);
  });

  /** We no longer need to check for a clean store.state since we're no longer using the global store. */
  test('Clean state', () => {
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  test('Adds a document to the store', async () => {
    /** allDocs in state is empty */
    expect(store.state.docs.allDocs).toEqual([]);

    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    expect(store.state.docs.cwd).toBe(`${process.cwd()}/test-project`);

    /** Open a hardocs project */
    await store.dispatch('loadProject');

    /** allDocs in state is no longer empty */
    expect(store.state.docs.allDocs).not.toEqual([]);

    /** Ensure that the project has at least one document */
    expect(store.state.docs.allDocs.length).toBe(1);

    await store.dispatch('addDoc');

    /** Ensure that a document have been added to the store */
    expect(store.state.docs.allDocs.length).toBe(2);

    console.log(JSON.stringify(store.state, null, 2));

    await store.dispatch('saveDocFile');

    await store.dispatch('removeDoc', '2');

    // store.state.docs.currentDoc.content = '<h1>divine</h1>';
  });
});
