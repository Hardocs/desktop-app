<template>
  <div class="cell">
    <div class="flex justify-between">
      <h1>
        <strong>{{ objectType }}</strong
        >: {{ objectName }}
      </h1>
      <div class="flex justify-end py-2 space-x-2">
        <div
          class="primary-button"
          @click="yamlToJson()"
          style="cursor:pointer"
        >
          Preview
        </div>
        <div class="primary-button">
          Edit
        </div>
        <div
          class="primary-button"
          @click="yamlToJson()"
          style="cursor:pointer"
        >
          Save
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
    <div>
      {{ json }}
    </div>
  </div>
</template>

<script>
// language js
import { codemirror } from 'vue-codemirror';
// theme css
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/bespin.css';
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
      code: 'Here goes the template',
      active: true,
      json: '',
      objectType: 'Object type',
      objectName: 'Name',
      cmOptions: {
        // codemirror options
        code: 'textCode',
        tabSize: 3,
        mode: 'text/yaml',
        theme: 'bespin',
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
    },
    yamlToJson() {
      /**
       * Here goes a mutation that that passes this json
       * to the state on save
       */
      this.json = yaml.safeLoad(this.code);
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
</style>
