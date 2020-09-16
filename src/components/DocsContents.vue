<template>
  <div>
    <h1><router-link to="/">Docs</router-link></h1>
    <ul>
      <li>
        <button class="primary-button w-full" @click="addDoc">+ add doc</button>
      </li>
      <div v-for="doc in docs" :key="doc.id">
        <li
          class="py-2 p-1 border-b border-gray-25 flex justify-between align-center content-center hover:bg-gray-15"
        >
          <router-link :to="{ path: createPath(doc.id) }">{{
            doc.title
          }}</router-link>
          <p
            style="cursor:pointer"
            class="font-bold opacity-0 hover:opacity-50"
            @click="removeDoc(doc.id)"
          >
            ❌
          </p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
// import store from "~/store/docs";
// import { mapMutations } from "vuex";

export default {
  name: 'DocsContents',
  computed: {
    docs() {
      return this.$store.state.docs.allDocs;
    }
  },
  methods: {
    createPath(id) {
      return `/doc/${id}`;
    },

    // FIXME: This should be an action
    addDoc() {
      let newId = Math.floor(Math.random() * 1000000);
      this.$store.commit('ADD_DOC', {
        id: newId,
        title: 'Edit this doc',
        content: 'Edit this doc'
      });
    },
    removeDoc(id) {
      // console.log();
      // Get previous route
      // navigate to it before reomoving the route
      this.$store.commit('REMOVE_DOC', id);
    }
  }
};
</script>
