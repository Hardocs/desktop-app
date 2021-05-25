<template>
  <v-btn :disabled="isSaved" class="primary-button" @click="saveDocFile()"
    >Save</v-btn
  >
</template>
<script>
export default {
  name: 'SaveFile',
  props: {
    docId: String,
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
  methods: {
    saveDocFile() {
      this.$store.dispatch('saveDocFile');
    }
  }
};
</script>
