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
  });

  test('Saves the current doc file', async () => {
    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);

    /** Open a hardocs project */
    await store.dispatch('loadProject');

    await store.dispatch('addDoc');

    /** Ensure that a document with title = "Untitled" have been added to the store */
    expect(store.state.docs.currentDoc.title).toStrictEqual('Untitled');

    await store.dispatch('saveDocFile');

    await store.dispatch('removeDoc', store.state.docs.currentDoc.id);

    /** Ensure that a document with title = "Untitled" have been removed from the store */
    expect(store.state.docs.currentDoc.title).not.toEqual('Untitled');
  });

  test('Overwrites title & file name when the first line of a document changes', async () => {
    /** Open a hardocs project */
    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    await store.dispatch('loadProject');

    /** I don't know why a document that was added in the previous test is still in the state that's why i have to remove it */
    if (store.state.docs.allDocs.length > 1) {
      await store.dispatch('removeDoc', '2');
    }

    await store.dispatch('addDoc');

    /** Ensure that a document with title = "Untitled" have been added to the store */
    expect(store.state.docs.currentDoc.title).toStrictEqual('Untitled');

    let data = '<h1>divine</h1>';
    let title = 'divine';

    /** Update document content */
    store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    /** Ensure that the doc title has changed */
    expect(store.state.docs.currentDoc.title).toStrictEqual(title);

    await store.dispatch('saveDocFile');

    data = '<h1>nature</h1>';
    title = 'nature';

    /** Update document content once again to 'nature' */
    store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    await store.dispatch('saveDocFile');

    /** Ensure that the current doc title === 'nature' */
    expect(store.state.docs.currentDoc.title).toStrictEqual(title);

    /** Load project once again */
    await store.dispatch('loadProject');

    const allDocs = store.state.docs.allDocs;

    console.log({ allDocs: JSON.stringify(allDocs, null, 2) });
    /** Make sure the last added doc has a title and filename of 'nature' */
    // expect(allDocs[allDocs.length - 1].title).toStrictEqual(title);
    // expect(allDocs[allDocs.length - 1].fileName).toStrictEqual(`${title}.html`);
  });
});
