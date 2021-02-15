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

import { resetState, DEFAULT_STATE } from '../helpers/resetState';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Test for docs operations', () => {
  beforeEach(resetState);

  test('Clean state', () => {
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  // console.log(JSON.stringify(store.state, null, 2));
  // store.commit(mutations.SET_CWD, '/home/divine/Desktop');
  // console.log(JSON.stringify(store.state, null, 2));

  test('opens a hardocs project', async () => {
    store.commit(mutations.SET_CWD, `${actions.cwd().data.cwd}/test-project`);
    expect(store.state.docs.cwd).toBe(`${process.cwd()}/test-project`);
    await store.dispatch('loadProject');
    console.log({
      state: JSON.stringify(store.state, null, 2)
    });
    expect(true).toBe(true);
  });
});
