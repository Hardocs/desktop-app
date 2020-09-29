import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'



describe(" When opening an existing hardocs project", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store
    it("handles invalid hardocs project entry", () => {
        // 

    })
    it("loads valid hardocs project", () => {
        const path = "D:\\my-projects\\JUNK\\mit-emergency-ventilator"
        const cwd =  
        expect(path).toBe(cwd)
    })
})

describe("When creating a hardocs project from folder", () => {
    it("checks if is a hardocs project and asks if user wants to open it", () => {
        // do something
    })
})
