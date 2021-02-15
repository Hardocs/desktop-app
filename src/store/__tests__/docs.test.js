import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '..';
import { types as mutations } from '../docs';

import { resetState, DEFAULT_STATE } from '../helpers/resetState';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Test for docs operations', () => {
  beforeEach(resetState);

  test('Clean state', () => {
    console.log({ DEFAULT_STATE });
    expect(store.state).toStrictEqual(DEFAULT_STATE);
  });

  // console.log(JSON.stringify(store.state, null, 2));
  // store.commit(mutations.SET_CWD, '/home/divine/Desktop');
  // console.log(JSON.stringify(store.state, null, 2));

  test('truthy', () => {
    expect(true).toBe(true);
  });
});
