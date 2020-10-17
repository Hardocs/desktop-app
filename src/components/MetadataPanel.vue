<template>
  <div class="">
    <div class="editor">
      <div class="editable"></div>
    </div>
    <div
      id="app"
      class="page content-center w-full m-auto items-center flex-col"
    >
      <div class="">
        <JsonEditor
          :options="{
            confirmText: 'confirm',
            cancelText: 'cancel'
          }"
          :objData="data"
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
import { mapGetters, mapState } from 'vuex'


export default {
  //   name:"JsonEditor",
  components: {},
  data: function() {
    return {
      path: '',
      query: '',
      componentKey: 1,
      data:{}
      // json:this.getsJsonFromStore
    };
  },
  computed: {
    ...mapGetters({
      jsonData: 'stateData'
    }),
    ...mapState({
      allDocs: 'allDocs'
    }),
    getsJsonFromStore: {
      // return this.$store.state.docs
      get: function() {
        JSON.stringify(this.jsonData) // BUG: For some reason this impacts reactiveness
        return this.jsonData
      },
      set: function(newJsonData) {
        return newJsonData;
      }
    },
    schemas() {
      return this.$store.state.metadata.schemasRef;
    }
  },
  methods: {
    passComputedJson(){
      return this.getsJsonFromStore
    }
  },
  watch:{
    getsJsonFromStore:async function(){
      this.data = {}
      this.$forceUpdate()
      this.data = await this.getsJsonFromStore
      this.$forceUpdate()
      // console.log("Updating data for json editor " + JSON.stringify(this.data.allDocs, null, 2))
      
    }
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
