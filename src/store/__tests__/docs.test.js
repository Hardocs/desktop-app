import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import * as docs from '../docs';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Test for docs operations', () => {
  const store = new Vuex.Store({
    modules: {
      docs
    }
  });

  console.log(store.state.actions.cwd);
});
