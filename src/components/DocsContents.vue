<template>
  <div>
    <h1>
      <router-link to="/">Docs</router-link>
    </h1>
    <ul>
      <li>
        <button class="primary-button w-full" @click="addDoc">+ add doc</button>
      </li>
      <div v-for="doc in docs" :key="doc.id">
        <li
          class="py-2 border-b border-gray-25 flex justify-between align-center content-center hover:bg-gray-15"
        >
          <router-link :to="{ path: createPath(doc.id) }">{{
            doc.title
          }}</router-link>
          <p
            v-if="doc.fileName !== entryFile"
            href="javascript:"
            style="cursor:pointer"
            class="font-bold opacity-0 hover:opacity-50"
            @click="confirmDelete(doc.id)"
          >
            ❌
          </p>
        </li>
      </div>
    </ul>
    <!-- THE MODAL TO CONFIRM -->
    <h1 v-if="showModal == true">Hello Modal</h1>
    <t-modal v-if="showModal == true" header="Title of the modal">
      <!-- <t-modal header="Title of the modal"> -->
      Content of the modal.
      <template v-slot:footer>
        <div class="flex justify-between">
          <t-button type="button" @click="setShowModal(false)">Cancel</t-button>
          <t-button type="button" @click="remove(docToDelete)">Ok</t-button>
        </div>
      </template>
    </t-modal>
  </div>
</template>

<script>
export default {
  name: 'DocsContents',
  data() {
    return {
      showModal: false,
      docToDelete: null
    };
  },

  computed: {
    docs() {
      return this.$store.state.docs.allDocs;
    },
    entryFile() {
      return this.$store.state.docs.entryFile;
    }
  },
  methods: {
    createPath(id) {
      return `/doc/${id}`;
    },

    addDoc() {
      this.$store.dispatch('addDoc');
    },
    removeDoc(id) {
      this.$store.dispatch('removeDoc', id);
    },

    confirmDelete(id) {
      console.log(this.$store.state.docs.entryFile);
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc', id);
      }
    }
  }
};
</script>
