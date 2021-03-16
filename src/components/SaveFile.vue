<template>
  <v-btn :disabled="isSaved" class="primary-button" @click="saveDocFile()"
    >Save</v-btn
  >
</template>
<script>
export default {
  name: 'SaveFile',
  props: {
    docId: Number,
    isSaved: Boolean
  },
  data() {
    return {
      dummy: {
        title: 'Name',
        path: 'docs/',
        content: 'this is a content',
        fileName: 'hello.html'
      }
    };
  },
  computed: {
    guidesIsActive() {
      return this.$store.getters.guidesIsActive;
    }
  },
  methods: {
    saveDocFile() {
      if (this.guidesIsActive) {
        if (process.env.NODE_ENV === 'production')
          alert('Save is disabled for GUIDES documents');
        else {
          this.$store.dispatch('saveDocFile');
          this.$store.commit(
            'SET_TO_SAVED',
            this.$store.state.docs.currentDoc.id
          );
        }
      } else {
        this.$store.dispatch('saveDocFile');
      }
    }
  }
};
</script>
