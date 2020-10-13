<template>
  <div class="editor-w clearfix">
    <div class="editor">
      <div class="editable">
        <!-- <JsonEditor :is-edit="true" v-model="jsonData"></JsonEditor> -->
      </div>
    </div>
    <div
      ref="docPlace"
      id="app"
      class="page content-center w-full m-auto items-center flex-col"
    >
      <!-- <button class="primary-button" @click="addData()">+ add data cell</button> -->
      <!-- <h1>HERE I AM DUMPING ALL COMPONENTS TO TEST THEM</h1>
    <div id="nav"><router-link to="/">Home</router-link>|</div>
    <div>
      <h1 style="color:red" class="bg-gray-25">{{ query }}</h1>
      <button class="primary-button" @click="gqlQuery()">
        Test apollo client
      </button>
      <router-view />
    </div> -->
      <SchemasDir></SchemasDir>
      <DataCell></DataCell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DocEditor from '@/components/DocEditor'
import DocsServices from '@/services/index'
import DataCell from '@/components/DataCell'
import SchemasDir from '@/components/MetadataEdit__SchemasDir'

export default {
  components: {
    // DocEditor,
    DataCell,
    SchemasDir
    // OpenDocs
  },
  data: function() {
    return {
      path: '',
      query: ''
    };
  },
  computed: {
    jsonData() {
      return this.$store.state.docs;
    },
    schemas(){
      return this.$store.state.metadata.schemasRef
    }
  },
  methods: {
    // Vue-Apollo options here
    gqlQuery: async function() {
      // e.preventDefault();
      const result = await DocsServices.getCWD();
      this.query = result.data.cwd;
    },
    addDoc() {
      let ComponentClass = Vue.extend(DocEditor);
      let instance = new ComponentClass();
      instance.$mount(); // pass nothing
      this.$refs.docPlace.appendChild(instance.$el);
    },
    // addData() {
    //   let ComponentClass = Vue.extend(DataCell);
    //   let instance = new ComponentClass();
    //   instance.$mount(); // pass nothing
    //   this.$refs.docPlace.appendChild(instance.$el);
    // },
  }
};
</script>
<style scoped>
.page * {
  @apply mb-2;
}

.cell {
  @apply mb-2;
}
</style>
