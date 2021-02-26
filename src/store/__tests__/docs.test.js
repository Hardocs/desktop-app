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
import { resetState } from './resetState';
import { cloneDeep } from 'lodash';

import fs from 'fs';

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

  test('Creates a hardocs project', async () => {
    /**  Disable console log */
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

  test('opens a hardocs project', async () => {
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

  test('Creates or Updates title from the first line of the document ', async () => {
    expect(store.state.docs.allDocs.length).toBe(0);
    await store.dispatch('addDoc');
    expect(store.state.docs.allDocs.length).toBe(1);

    let data = '<h1>divine</h1>';
    let title = 'divine';

    /** Update document content */
    store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    expect(store.state.docs.currentDoc.title).toStrictEqual(title);
    expect(store.state.docs.currentDoc.content).toStrictEqual(data);
  });

  test('Creates or Updates filename from title when the document is saved', async () => {
    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    expect(store.state.docs.cwd).toBe(`${process.cwd()}/test-project`);
    await store.dispatch('loadProject');

    await store.dispatch('addDoc');

    let data = '<h1>divine</h1>';
    let title = 'divine';

    /** Update document content */
    store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    expect(store.state.docs.currentDoc.title).toStrictEqual(title);
    expect(store.state.docs.currentDoc.content).toStrictEqual(data);

    await store.dispatch('saveDocFile');
    expect(store.state.docs.currentDoc.fileName).toStrictEqual(`${title}.html`);
  });

  test('should Update an existing document and save it', async () => {
    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    expect(store.state.docs.cwd).toBe(`${process.cwd()}/test-project`);
    await store.dispatch('loadProject');

    await store.dispatch('addDoc');

    let data = '<h1>nature</h1>';
    let title = 'nature';

    /** Update document content */
    store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    expect(store.state.docs.currentDoc.title).toStrictEqual(title);
    expect(store.state.docs.currentDoc.content).toStrictEqual(data);

    await store.dispatch('saveDocFile');
    expect(store.state.docs.currentDoc.fileName).toStrictEqual(`${title}.html`);
  });
});

afterAll(async (done) => {
  const path = `${actions.cwd().data.cwd}/test-project`;

  fs.existsSync(path) &&
    fs.statSync(path) &&
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) console.error(err);
      console.log('Done');
      done();
    });
});

// TODO: Add test to create a project from an existing folder
// TODO: Enable createProjectFromExisting functionality
// TODO: Setup spectron
