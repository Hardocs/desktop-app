<template>
  <div class="m-auto w-2/3">
    <form class="flex" ref="form">
      <input
        type="text"
        name="path"
        id="path"
        placeholder="Input path to folder"
        class="w-full p-3 rounded focus:shadow-outline outline-none bg-gray-15 focus:bg-white border border-solid border-gray-25"
        v-model="path"
      />
      <button @click="onSubmit" type="button" class="primary-button mx-4">Open</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OpenDocs',
  data() {
    return {
      path: '',
      subFolders: {},
      allDocs: {}
    };
  },
  computed: mapState(['docs']),
  methods: {
    onSubmit() {
      this.$store.dispatch('loadProject');      
    }
  },
  //TODO this is not correct we should use getters for this
  watch: {
    $store: function() {
      this.$store.dispatch(
        'setCurrentDoc',
        this.$store.state.docs.allDocs[0].id
      );
    }
  }
};
</script>
