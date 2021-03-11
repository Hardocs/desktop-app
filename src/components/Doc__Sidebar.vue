<template>
  <v-navigation-drawer permanent class="fixed px-6" width="300" height="100%">
    <h1 v-if="guidesIsActive">
      <a style="cursor:pointer;" @click="backToProject()">Back to project </a>
    </h1>
    <div v-else>
      <h1 v-if="cwd == appPath">
        <a>Guides</a>
      </h1>
      <h1 v-else style="cursor:pointer;" @click="showGuides()">Guides</h1>
    </div>
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
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item v-for="doc in docs" :key="doc.id" link>
        <v-list-item-content>
          <v-list-item-title
            @click="setCurrentDoc(doc.id)"
            :class="{ 'font-weight-bold': doc.id == currentDocId }"
            >{{ doc.title }}</v-list-item-title
          >
        </v-list-item-content>
        <v-list-item-icon
          v-if="doc.fileName !== entryFile"
          @click="confirmDelete(doc.id)"
        >
          <v-icon>&times;</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DocsSidebar',
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
.table-of-contents {
  position: fixed;
  height: 100vh;
}
</style>
