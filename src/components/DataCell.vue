<template>
  <div class="cell">
    <div class="flex justify-between">
      <p class="text-2xl">
        <strong>{{ objectType }}</strong
        >: {{ objectName }}
      </p>
      <div class="flex justify-end py-2 space-x-2">
        <div
          class="primary-button"
          @click="setActive(false)"
          style="cursor:pointer"
        >
          Preview
        </div>
        <div @click="setActive(true)" class="primary-button">
          Edit
        </div>
        <div
          class="primary-button"
          @click="save()"
          style="cursor:pointer"
        >
          Save
        </div>
        <div
          class="primary-button"
          @click="close()"
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
      <p v-for="field in json" :key="field"><strong>{{ getKey(json, field) }}</strong> : {{ field }}</p>
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
      active: true,
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
    setActive(Boolean){
      this.active = Boolean
    },
    getKey(object,value){
      return Object.keys(object).find(key => object[key] === value)
    },
    getValue(value){
      if (value) return value
      else return "" 
    },
    save(){
      return this.saved = true
    },
    close () {
      // destroy the vue listeners, etc
      this.$destroy();

      // remove the element from the DOM
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    }
  },
  components: {
    codemirror
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
