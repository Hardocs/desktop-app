<template>
  <div>
    <form class="flex" ref="form">
      <input
        type="text"
        name="path"
        id="path"
        placeholder="Input path to folder"
        class="w-3/5 p-3 rounded focus:shadow-outline outline-none bg-gray-15 focus:bg-white border border-solid border-gray-25"
        v-model="path"
      />
      <button
        @click="onSubmit"
        type="submit"
        class="bg-blue-400 ml-4 text-white focus:shadow-outline hover:bg-blue-500 focus:outline-none outline-none border-none rounded font-semibold px-4 py-2"
      >
        Open
      </button>
    </form>

    <div class="mt-12"></div>
  </div>
</template>

<script>
// import DocsServices from "@/services/index";
import { mapState } from "vuex";

export default {
  name: "OpenDocs",
  data() {
    return {
      path: "",
      subFolders: {},
      allDocs: {}
    };
  },
  computed: mapState(["docs"]),
  methods: {
    onSubmit() {
      this.$store.dispatch("fetchDocs", this.path);
    }
  },
  //TODO this is not correct we should use getters for this
  watch: {
    $store: function() {
      console.log("dispatching")
      this.$store.dispatch("setDoc", this.$store.state.docs.allDocs[0].id);
    }
  }
};
</script>
