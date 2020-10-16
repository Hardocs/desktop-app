<template>
  <div
    ref="doc"
    v-if="doc"
    class="border-solid border border-gray-25 rounded-md p-2"
  >
    <div v-if="$store.state.docs.devFeatures == true">
      <p>{{ this.$store.state.docs.currentDoc.id }}</p>
      <p>{{ this.$store.state.docs.currentDoc.title }}</p>
    </div>
    <div class="flex flex-end py-2">
      <SaveFile
        :saved="this.$store.state.docs.currentDoc.saved"
        :docId="this.$store.state.docs.currentDoc.id"
      >
      </SaveFile>
    </div>
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
import DocEditor from '@/components/DocEditor';
import SaveFile from '@/components/SaveFile';

export default {
  components: { DocEditor, SaveFile },
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
        (doc) => doc.id == this.id
      ));
    }
  },
  created: function() {
    this.id = this.$route.params.id;
    this.$store.dispatch('setCurrentDoc', this.id, 0); // TODO: Ideally we should find by several methods
    this.getDoc();
  },
  watch: {
    $route: function() {
      this.id = this.$route.params.id;
      this.$store.dispatch('setCurrentDoc', this.id);
    }
  }
};
</script>
