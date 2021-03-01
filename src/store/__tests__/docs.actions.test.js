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

describe('Test actions', () => {
  let store, DEFAULT_STATE;

  /** Before each test runs, We have to create a new store and reset the state. */
  beforeEach(async () => {
    store = createStore();
    DEFAULT_STATE = resetState(store);
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

  test('Adds a document to the project', async () => {
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
    expect(store.state.docs.currentDoc.fileName.toLowerCase()).toStrictEqual(
      'index.html'
    );

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

    const allDocs = store.state.docs.allDocs;

    /** Make sure the last added doc has a title and filename of 'nature' */
    expect(allDocs[allDocs.length - 1].title).toStrictEqual(title);
    expect(allDocs[allDocs.length - 1].fileName).toStrictEqual(`${title}.html`);

    await store.dispatch('removeDoc', '2');

    expect(allDocs.length).toBe(1);
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
