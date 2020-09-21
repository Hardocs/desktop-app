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
    <div class="py-8">
        <h2>Examples</h2>
        <p>D:\my-projects\COVID-19\DESIGNS-REPOS\mit-emergency-ventilator</p>
        <p>D:\my-projects\JUNK\JOSE_project</p>
      </div>

    <div class="mt-12"></div>
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
      this.$store.dispatch('fetchDocs');      
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
