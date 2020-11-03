import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, getters, actions, mutations, createNewHardocsJson } from '../src/store/metadata'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    metadata: {
      state,
      actions,
      mutations,
      getters
    }
  }
})

it("Stores the metadata object inside hardocs.json", () => {
  // Store the object here.....
  store.dispatch('writeMetadata', )
  expect(1).toBe(0)
})

it("Rejects wrong metadata object inside hardocs.json", () => {
  if(!valid) console.log(validate.errors)
})

// it("loads the metadata in the state from the hardocs.json", () => {
//   // Open the json file in the current folder
//   // extract the dataset field
//   // push it to the vuex state 
//   expect("Vuex data set").toBe("Data set field in the hardocs.json")
// })

