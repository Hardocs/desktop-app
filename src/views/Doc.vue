<template>
  <v-card ref="doc" v-if="doc">
    <div v-if="$store.state.docs.devFeatures == true">
      <p>{{ this.$store.state.docs.currentDoc.id }}</p>
      <p>{{ this.$store.state.docs.currentDoc.title }}</p>
    </div>

    <div class="editor_menubar">
      <v-container class="d-flex justify-space-between">
        <SaveFile :isSaved="docIsSaved" :docId="docId"> </SaveFile>
        <span>
          <v-btn
            @click="editMode = false"
            :color="!editMode ? 'primary' : ''"
            class="mr-3"
            outlined
            rounded
          >
            Preview
          </v-btn>
          <v-btn
            :elevation="editMode ? 5 : 2"
            rounded
            icon
            @click="editMode = true"
            :color="editMode ? 'primary' : ''"
            class="mr-3"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            elevation="2"
            rounded
            icon
            @click="confirmDelete(id)"
            class="mr-3"
            :disabled="isEntry"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </span>
      </v-container>

      <v-divider class="mb-4"></v-divider>
    </div>

    <div v-html="docContent" v-if="!editMode" class="px-8 py-8"></div>
    <div class="editor_container">
      <DocEditor
        :content="docContent"
        class="ckeditor__"
        :id="id"
        v-if="editMode"
        :key="componentKey"
      ></DocEditor>
    </div>
  </v-card>
  <div v-else>
    <p>No doc in this route</p>
  </div>
</template>

<script>
import DocEditor from '@/components/Doc__Editor';
import SaveFile from '@/components/SaveFile';

export default {
  components: { DocEditor, SaveFile },
  data() {
    return {
      id: this.$route.params.id,
      doc: {},
      componentKey: 1,
      holdComponentKey: 1,
      priorCwd: '',
      tabs: null,
      editMode: false,
      items: [
        {
          name: 'preview'
        },
        {
          name: 'edit'
        }
      ],
      text: 'Helo world, This is divine nature'
    };
  },
  computed: {
    docIsSaved() {
      return this.$store.state.docs.currentDoc.saved;
    },
    docId() {
      return this.$store.state.docs.currentDoc.id;
    },
    docContent: {
      get() {
        return this.$store.state.docs.currentDoc.content;
      }
    },
    cwd: {
      get() {
        return this.$store.state.docs.cwd;
      }
    },
    isEntry: {
      get() {
        return (
          this.$store.state.docs.currentDoc.fileName ===
          this.$store.state.docs.entryFile
        );
      }
    },
    // This is necessesary to avoid constant changing of key on docContent changes
    compoundCwdDocContent() {
      return this.cwd, this.docContent;
    }
  },

  methods: {
    getDoc() {
      // we use the id that is part of this object to
      // find the actual object stored in the vuex
      this.componentKey += this.componentKey;
      return (this.doc = this.$store.state.docs.allDocs.find(
        (doc) => doc.id == this.id
      ));
    },
    confirmDelete(id) {
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc', id);
      }
    }
  },
  created: function() {
    this.id = this.$route.params.id;
    this.$store.dispatch('setCurrentDoc', this.id, 0); // TODO: Ideally we should find by several methods
    this.getDoc();
  },
  watch: {
    $route: function() {
      console.log('Listening to route change');
      this.id = this.$route.params.id;
      this.$store.dispatch('setCurrentDoc', this.id);
      this.componentKey = this.componentKey + 1;
    },
    cwd: function() {
      // this.componentKey = this.componentKey + 1
      // this.$router.go()
    },
    doc: async function() {
      if (!this.doc) {
        await this.$store.dispatch('setCurrentDoc');
      }
    }
  }
};
</script>

<style scoped>
.editor_menubar {
  position: sticky;
  top: 4.2rem;
  background-color: white;
}

/* .editor_container {
  max-height: 70vh !important;
  overflow-y: scroll;
}

.editor_container {
  scrollbar-width: none !important;
}

.editor_container::-webkit-scrollbar {
  display: none !important;
} */
</style>
