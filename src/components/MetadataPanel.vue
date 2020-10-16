<template>
  <div class="">
    <div class="editor">
      <div class="editable">
      </div>
    </div>
    <div
      ref="docPlace"
      id="app"
      class="page content-center w-full m-auto items-center flex-col"
    >
      <div class="">
        <JsonEditor
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel'
          }"
          :objData="jsonData"
          v-model="jsonData"
        ></JsonEditor>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import DocEditor from '@/components/DocEditor';
// import DocsServices from '@/services/index';
// import SchemasDir from '@/components/MetadataEdit__SchemasDir';

export default {
//   name:"JsonEditor",  
  components: {
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
    schemas() {
      return this.$store.state.metadata.schemasRef;
    }
  },
  methods: {}
};
</script>
<style scoped>
.page * {
  @apply mb-2;
}

.cell {
  @apply mb-2;
}

body {
  font-size: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.clearfix {
  *zoom: 1;
}

.clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}

.clearfix:after {
  clear: both;
}

.t {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 60px;
}

.editor-w {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}

.w-2 {
  float: left;
  width: 50%;
}

.editor {
  padding: 20px 60px;
}
</style>
