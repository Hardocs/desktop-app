import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'

import {state, getters, actions, mutations} from '../src/store/metadata'
const schemaDir = './__tests__/__fixtures__/'
let selectedSchemaFile = 'project.schema.json'

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

it.only('tests if state has some data', () => {
    let key = "$schema"
    store.dispatch('addObject', {schemaDir: schemaDir, selectedSchemaFile: selectedSchemaFile})
    console.log(JSON.stringify(store.state.metadata, null, 2))
    expect(store.state.metadata.dataSet[0].hasOwnProperty(key)).toBe(true)
})