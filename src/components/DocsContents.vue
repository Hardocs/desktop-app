<template>
  <div>
    <h1>
      <router-link to="/">Docs</router-link>
    </h1>
    <ul>
      <li>
        <button
          class="primary-button w-full"
          @click="addDoc"
          v-shortkey="['ctrl', 'shift', 'a']"
          @shortkey="addDoc"
        >
          + add doc
        </button>
      </li>
      <div v-for="doc in docs" :key="doc.id">
        <li
          class="py-2 docs-contents focus:font-bold border-b border-gray-25 flex justify-between align-center content-center hover:bg-gray-15"
        >
          <a 
            style="cursor:pointer;" 
            class="w-full"
            @click="setCurrentDoc(doc.id)"
            :class="{ 'font-bold' : doc.id == currentDocId}"
          >
            {{doc.title}}
          </a>
          <p
            v-if="doc.fileName !== entryFile"
            href="javascript:"
            style="cursor:pointer"
            class="opacity-0 hover:opacity-50"
            @click="confirmDelete(doc.id)"
          >
            ❌
          </p>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DocsContents',
  data() {
    return {
      showModal: false,
      docToDelete: null,
      // isActive: ,
      // currentDocId: getCurrentDocId()
    };
  },

  computed: {
    ...mapGetters({
        docId: 'currentDocId'
    }),
  
    currentDocId:{
      get(){
        return this.docId
      },
      set(docId){
        this.setCurrentDoc(docId)
      }
    },
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

    async setCurrentDoc(id){
      await this.$store.dispatch('setCurrentDoc',id)
    },

    addDoc() {
      this.$store.dispatch('addDoc');
    },
    removeDoc(id) {
      this.$store.dispatch('removeDoc', id);
    },

    confirmDelete(id) {
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc', id);
      }
    }
  }
};
</script>
<style>
.docs-contents:focus{
  font-weight: 700;
}  
</style>
