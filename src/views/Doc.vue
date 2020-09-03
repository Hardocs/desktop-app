<template>
  <div ref="doc" v-if="doc">
    <p>{{ this.$store.state.docs.currentDoc.id }}</p>
    <p>{{ this.$store.state.docs.currentDoc.title }}</p>
    <DocEditor
      :content="this.$store.state.docs.currentDoc.content"
      :id="id"
      :key="id"
    ></DocEditor>
  </div>
  <div v-else>
    <p>No doc in this route</p>
  </div>
</template>

<script>
import DocEditor from "@/components/DocEditor";

export default {
  components: { DocEditor },
  data() {
    return {
      id: this.$route.params.id,
      doc: {}
    };
  },

  methods: {
    getDoc() {
      // we use the id that is part of this object to
      // find the actual object stored in the vuex
      console.log("RUNNING");
      return (this.doc = this.$store.state.docs.allDocs.find(
        doc => doc.id == this.id
      ));
    }
  },
  watch: {
    $route: function() {
      this.id = this.$route.params.id;
      this.$store.dispatch("setDoc", this.id);
    }
  }
};
</script>
