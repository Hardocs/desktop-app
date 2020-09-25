<template>
<div v-if="this.$store.state.docs.currentDoc.saved == false">
  <button class="primary-button" @click="saveDocFile()">Save</button>
</div>
</template>
<script>
export default {
  name: 'SaveFile',
  props:{
    saved: Boolean,
    docId: Number
  },
  data() {
    return {
      dummy: {
        title: 'Name',
        description: 'akasdasd',
        path: 'docs/',
        content: 'this is a content',
        fileName: 'hello.md'
      }
    };
  },
  methods:{
    saveDocFile(){
      this.$store.dispatch('saveDocFile')
      this.$store.commit('SET_TO_SAVED', this.$store.state.docs.currentDoc.id)
    }
  }
};
</script>