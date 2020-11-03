<template>
  <div class="cell">
    <div class="flex justify-between">
      <p class="text-2xl">
        <strong>{{ objectType }}</strong
        >: {{ objectName }}
      </p>
      <div class="flex justify-end py-2 space-x-2">
        <TemplateSelector @loadSchema="loadTemplate" ref="template"></TemplateSelector>
        <div
          class="primary-button"
          @click="setActive(false)"
          v-shortkey="['ctrl', 'shift', 'p']"
          @shortkey="setActive(false)"
          style="cursor:pointer"
        >
          Preview
        </div>
        <div
          class="primary-button"
          @click="setActive(true)"
          v-shortkey="['ctrl', 'e']"
          @shortkey="setActive(true)"
        >
          Edit
        </div>
        <div
          class="primary-button"
          @click="save()"
          v-shortkey="['ctrl', 's']"
          @shortkey="save()"
          style="cursor:pointer"
        >
          Save
        </div>
        <div
          class="primary-button"
          @click="close()"
          v-shortkey="['ctrl', 'x']"
          @shortkey="close()"
          style="cursor:pointer"
        >
          Delete
        </div>
      </div>
    </div>
    <codemirror
      v-if="active"
      ref="myCm"
      :value="code"
      :options="cmOptions"
      @input="onCmCodeChange"
    ></codemirror>
    <div v-if="active">
      <p v-if="saved" class="text-xl">Pushing to state...</p>
      <p>{{ json }}</p>
    </div>
    <div v-if="!active">
      <p v-for="(value,propertyName) in json" :key="propertyName"><strong>{{ propertyName }}</strong> : {{ value }}</p>
    </div>
  </div>
</template>

<script>
// language js
import { codemirror } from 'vue-codemirror';
// theme css
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/duotone-light.css';
import '../../node_modules/codemirror/mode/yaml/yaml.js';
import yaml from 'js-yaml';
import TemplateSelector from '@/components/MetadataEdit__TemplateSelector'

import {
    buildsTemplate,
} from '../../__utils__/schemas'
import YAML from 'json-to-pretty-yaml'

// more codemirror resources
// import 'codemirror/some-resource...'
/**
 * TODO:
 * - Import templates for data cells
 * - Dropdown of available schemas for data objects
 * - Load the project data
 * - Search to filder data parts cells
 *
 */
export default {
  props: ['template'],
  data() {
    return {
      code: '# Each Object has a type and a name \n type: null \n name: null',
      active: false,
      json: {},
      saved: false,
      objectType: 'Object type',
      objectName: 'Name',
      cmOptions: {
        // codemirror options
        code: 'textCode',
        tabSize: 3,
        mode: 'text/yaml',
        theme: 'duotone-light',
        lineNumbers: true,
        line: true,
        lineWrapping: true
      }
    };
  },
  methods: {
    onCmCodeChange(newCode) {
      this.code = newCode;
      this.json = yaml.safeLoad(this.code);
      this.saved = false
    },
    yamlToJson() {
      /**
       * Here goes a mutation that that passes this json
       * to the state on save
       */
      this.json = yaml.safeLoad(this.code)
    },
    jsonToYaml(json){
      this.code = YAML.stringify(json)
    },
    setActive(Boolean){
      this.active = Boolean
    },
    getKey(object,keyToLookFor){
      return Object.keys(object).find(key => object[key] === keyToLookFor)
    },
    getValue(object, valueToLookFor){
        return Object.values(object).find(value => object[value] === valueToLookFor)
    },
    save(){
       // FIXME: this action is incorrect, it should updateThisObject
       this.$store.dispatch('addObject', this.json)
       this.active = false
       this.saved = true
    },
    close () {
      // destroy the vue listeners, etc
      this.$destroy();

      // remove the element from the DOM
      this.$el.parentNode.removeChild(this.$el);
    },
    loadTemplate(schemaFile){
      console.log("Testing event emit from child " + schemaFile)
      let template = buildsTemplate(this.$store.state.metadata.schemasDir + "\\", schemaFile)
      console.log(template)
      this.json = template.fields
      this.code = YAML.stringify(template.fields)
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
  },
  components: {
    codemirror,
    TemplateSelector
  },
  watch: {
    json: function() {
      if (this.json.type) {
        this.objectType = this.json.type;
      }
      if (this.json.name) {
        this.objectName = this.json.name;
      }
    }
  }
};
</script>
<style>
.CodeMirror {
  font-size: 18px;
  height: 200px;
}
.cell{
  @apply mb-2;
}
</style>
