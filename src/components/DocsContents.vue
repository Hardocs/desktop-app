<template>
  <div>
    <h1 v-if="guidesIsActive">
      <a style="cursor:pointer;" @click="backToProject()">Back to project </a>
    </h1>
    <div v-else>
      <h1 v-if="cwd == appPath">
        <a>Guides</a>
      </h1>
      <h1 v-else style="cursor:pointer;" @click="showGuides()">Guides</h1>
    </div>
    <ul>
      <li>
        <v-btn
          elevation="0"
          block
          @click="addDoc"
          v-shortkey="['ctrl', 'shift', 'n']"
          @shortkey="addDoc"
          class="mb-6"
        >
          + add doc
        </v-btn>
      </li>
      <div v-for="doc in docs" :key="doc.id">
        <li
          class="py-2 docs-contents focus:font-bold border-b border-gray-25 flex justify-between align-center content-center hover:bg-gray-15"
        >
          <a
            style="cursor:pointer;"
            @click="setCurrentDoc(doc.id)"
            :class="{ 'font-bold': doc.id == currentDocId }"
            class="pl-3"
          >
            {{ doc.title }}
          </a>
          <p
            v-if="doc.fileName !== entryFile"
            href="javascript:"
            style="cursor:pointer"
            class="opacity-0 hover:opacity-50 mr-3"
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
      guidesIsActive: false,
      projectPath: '',
      currentDoc: ''
    };
  },

  computed: {
    ...mapGetters({
      docId: 'currentDocId',
      isAppPath: 'guidesIsActive'
    }),

    currentDocId: {
      get() {
        return this.docId;
      },
      set(docId) {
        this.setCurrentDoc(docId);
      }
    },
    docs() {
      return this.$store.state.docs.allDocs;
    },
    entryFile() {
      return this.$store.state.docs.entryFile;
    },
    cwd: {
      get() {
        return this.$store.state.docs.cwd;
      }
    },
    appPath: {
      get() {
        return this.$store.state.docs.appPath;
      }
    }
  },
  methods: {
    createPath(id) {
      return `/doc/${id}`;
    },

    async showGuides() {
      this.guidesIsActive = true;
      this.$store.commit('SET_GUIDES', true);
      this.projectPath = this.cwd;
      this.currentDoc = this.currentDocId;
      await this.$store.commit('SET_CWD', this.$store.state.docs.appPath);
      this.$store.dispatch('loadProject');
    },

    async backToProject() {
      this.guidesIsActive = false;
      this.$store.commit('SET_GUIDES', false);
      await this.$store.commit('SET_CWD', this.projectPath);
      await this.$store.dispatch('loadProject');
      this.setCurrentDoc(this.currentDoc);
    },

    async setCurrentDoc(id) {
      if (!this.guidesIsActive) {
        this.currentDoc = id;
      }
      await this.$store.dispatch('setCurrentDoc', id);
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
  },
  watch: {
    cwd() {
      if (this.cwd !== this.appPath) this.guidesIsActive = false;
    }
  }
};
</script>
<style>
.docs-contents:focus {
  font-weight: 700;
}
</style>
