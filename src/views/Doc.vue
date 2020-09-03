<template>
  <div ref="doc" v-if="doc">
    <p>{{ this.id }}</p>
    <p>{{ doc.title }}</p>
    <DocEditor :content="doc.content" :id="doc.id"></DocEditor>
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
      return (this.doc = this.$store.state.docs.allDocs.find(
        doc => doc.id == this.id
      ));
    }
  },
  // mounted: function() {
  //   console.log(this.doc);
  //   this.doc = this.getDoc();
  //   console.log("After")
  //   console.log(this.doc);
  // },
  watch: {
    $route: function() {
      this.id = this.$route.params.id;
      this.getDoc();
    }
  }
};
</script>
