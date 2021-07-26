import { createLocalVue } from '@vue/test-utils';
import fs from 'fs';
import { cloneDeep } from 'lodash';
import { join, resolve } from 'path';
import Vuex from 'vuex';
import * as docs from '../docs';
import { types as mutations } from '../docs';
import { initCWD } from './init_cwd';
import { resetState } from './resetState';

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

const BASE_PATH = initCWD();

console.log({ BASE_PATH });
const mocksDir = join(BASE_PATH, '__mocks__');
// const mocksDir = join(__dirname, '__mocks__');
const projectName = 'test-project';
const projectPath = resolve(mocksDir, projectName);

describe('Test for docs operations', () => {
  let store, DEFAULT_STATE;

  /** Before each test runs, We have to create a new store and reset the state. */
  beforeEach(() => {
    // console.log = () => {};
    store = createStore();
    DEFAULT_STATE = resetState(store);
  });

  /** We no longer need to check for a clean store.state since we're no longer using the global store. */
  test('Clean state', () => {
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  test('Creates a hardocs project', async () => {
    /**  Disable console log */

    await store.dispatch('createNewProject', {
      docsDir: 'docs',
      name: projectName,
      path: mocksDir
    });

    store.commit(mutations.SET_CWD, projectPath);
    await store.dispatch('loadProject');

    expect(store.state).not.toStrictEqual(DEFAULT_STATE);
    expect(store.state.docs.hardocs).toStrictEqual([]);
  });

  test('opens a hardocs project with no docs', async () => {
    /** hardocs in state is empty */
    expect(store.state.docs.hardocs).toEqual([]);

    store.commit(mutations.SET_CWD, projectPath);
    expect(store.state.docs.cwd).toBe(projectPath);

    await store.dispatch('loadProject');

    expect(store.state).not.toStrictEqual(DEFAULT_STATE);

    /** hardocs in state is no longer empty */
    expect(store.state.docs.hardocs).toEqual([]);
    expect(store.state.docs.docsFolder).toEqual('docs');
  });

  test('Adds a document to the store', async () => {
    expect(store.state.docs.hardocs.length).toBe(0);
    await store.dispatch('addDoc');

    expect(store.state.docs.hardocs.length).toBe(1);
  });

  test('Creates or Updates title from the first line of the document ', async () => {
    expect(store.state.docs.hardocs.length).toBe(0);

    await store.dispatch('loadProject');
    await store.dispatch('addDoc');
    expect(store.state.docs.hardocs.length).toBe(1);

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
});

afterAll(async (done) => {
  fs.existsSync(projectPath) &&
    fs.statSync(projectPath) &&
    fs.rmdir(projectPath, { recursive: true }, (err) => {
      if (err) console.error(err);
      console.log('Done');
      done();
    });
});

// TODO: Add test to create a project from an existing folder
// TODO: Enable createProjectFromExisting functionality
// TODO: Setup spectron
