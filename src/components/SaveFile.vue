<template>
  <div v-if="saved == false">
    <button class="primary-button" @click="saveDocFile()">Save</button>
  </div>
</template>
<script>
export default {
  name: 'SaveFile',
  props: {
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
  computed: {
    saved() {
      return this.$store.state.docs.currentDoc.saved
    },
    guidesIsActive(){
      return this.$store.state.docs.guidesIsActive
    }
  },
  methods: {
    saveDocFile() {
      if(this.guidesIsActive){
        if(process.env.NODE_ENV !== 'production')
          console.log("Are you sure you want to save??")
          this.$store.dispatch('saveDocFile');
          this.$store.commit('SET_TO_SAVED', this.$store.state.docs.currentDoc.id);
        }
        else {
          alert('Save is disabled for GUIDES documents')
        }
      }
    }
};
</script>
