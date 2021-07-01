import { createLocalVue } from '@vue/test-utils';
import fs from 'fs';
import { cloneDeep } from 'lodash';
import { join } from 'path';
import Vuex from 'vuex';
import * as docs from '../docs';
import { types as mutations } from '../docs';
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

const mocksDir = join(__dirname, '__mocks__');
const projectName = 'test-project';
const projectPath = join(mocksDir, projectName);

describe('Test actions', () => {
  let DEFAULT_STATE;
  const store = createStore();

  /** Before each test runs, We have to create a new store and reset the state. */
  beforeEach(async () => {
    DEFAULT_STATE = resetState(store);

    await store.dispatch('createNewProject', {
      docsDir: 'docs',
      name: projectName,
      path: mocksDir
    });
  });

  afterEach(async (done) => {
    fs.existsSync(projectPath) &&
      fs.statSync(projectPath) &&
      fs.rmdir(projectPath, { recursive: true }, (err) => {
        if (err) console.error(err);
        done();
      });
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
    // It should create a blank project with no documents.
    expect(store.state.docs.hardocs).toStrictEqual([]);
  });

  test('Adds a document to the project', async () => {
    /** hardocs in state is empty */
    expect(store.state.docs.hardocs).toEqual([]);

    store.commit(mutations.SET_CWD, projectPath);
    expect(store.state.docs.cwd).toBe(projectPath);

    /** Open a hardocs project */
    await store.dispatch('loadProject');

    await store.dispatch('addDoc');

    /** Ensure that a document have been added to the store */
    expect(store.state.docs.hardocs.length).toBe(1);
  });

  test('Saves the current doc file', async () => {
    store.commit(mutations.SET_CWD, projectPath);

    /** Open a hardocs project */
    await store.dispatch('loadProject');

    await store.dispatch('addDoc');

    /** Ensure that a document with title = "Untitled" have been added to the store */
    // expect(store.state.docs.currentDoc.title).toStrictEqual('Untitled');

    await store.dispatch('saveDocFile');

    await store.dispatch('removeDoc');
    /** Ensure that a document with title = "Untitled" have been removed from the store */
    expect(store.state.docs.currentDoc.title).toBeUndefined();
    expect(store.state.docs.hardocs).toHaveLength(0);
  });

  /**
   * STEPS
   * 1. Load a hardocs project.
   * 2. Add a new document (Ensure that the document title/content is 'Untitled').
   * 3. Update the document title and content.
   * 4. Save the document.
   * 5. Ensure that the document has been saved .
   * 6. Load the project again to refetch updated contents in the file system.
   * 7. Update the title/content of the previously added file.
   * 8. Ensure the filename has been updated in the store
   * 9. Save the file to the file system.
   * 10. Load the project once again.
   * 11. ensure that the least added title/content is updated.
   */
  test('Updates title & file name when the first line of a document changes', async () => {
    /** Open a hardocs project */
    // store.commit(mutations.SET_CWD, projectPath);
    await store.dispatch('loadProject');

    /** I don't know why a document that was added in the previous test is still in the state that's why i have to remove it */
    if (store.state.docs.hardocs.length >= 1) {
      await store.dispatch('removeDoc', store.state.docs.currentDoc.id);
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

    /** Ensure that the doc title is the same as before */
    expect(store.state.docs.currentDoc.title).toStrictEqual(title);

    data = '<h1>nature</h1>';
    title = 'nature';

    /** Update document content once again to 'nature' */
    await store.commit(mutations.UPDATE_DOC_CONTENT, {
      id: store.state.docs.currentDoc.id,
      content: data,
      title
    });

    await store.dispatch('saveDocFile');

    /** Ensure that the current doc title === 'nature' */
    expect(store.state.docs.currentDoc.title).toStrictEqual(title);

    const hardocs = store.state.docs.hardocs;

    /** Make sure the last added doc has a title and filename of 'nature' */
    expect(hardocs[hardocs.length - 1].title).toStrictEqual(title);
    expect(hardocs[hardocs.length - 1].fileName).toStrictEqual(`${title}.html`);

    await store.dispatch('removeDoc', '2');

    expect(hardocs.length).toBe(0);
  });

  test('should add and delete a record', async () => {
    // store.commit(mutations.SET_CWD, projectPath);
    await store.dispatch('loadProject');
    const data = {
      title: 'example',
      schemaTitle: 'example-schema',
      schemaUrl: 'https://json.schemastore.org/esmrc.json'
    };
    await store.dispatch('addMetadata', data);

    expect(store.state.docs.currentDoc).not.toEqual(
      DEFAULT_STATE.docs.currentDoc
    );
    expect(store.state.docs.currentDoc.title).toStrictEqual(data.title);
    expect(store.state.docs.currentDoc.schema.title).toStrictEqual(
      data.schemaTitle
    );

    await store.dispatch('removeDoc');
  });
});
