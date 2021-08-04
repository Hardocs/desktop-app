<template>
  <v-card ref="doc" v-if="getCurrentDoc.content">
    <div v-if="$store.state.docs.devFeatures == true">
      <p>{{ this.$store.state.docs.currentDoc.id }}</p>
      <p>{{ this.$store.state.docs.currentDoc.title }}</p>
    </div>

    <div class="editor_menubar">
      <v-container class="d-flex justify-space-between">
        <SaveFile :isSaved="!!docIsSaved" :docId="String(docId)"> </SaveFile>
        <div>
          <v-menu v-if="isStructured">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                icon
                rounded
                :elevation="editMode ? 5 : 2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark>
                  mdi-information-outline
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-text
                >Schema name:
                <b>{{ getCurrentDoc.schema.name }}</b></v-card-text
              >
              <v-card-text
                >Source URL:
                <a
                  target="_blank"
                  :href="getCurrentDoc.schema.source"
                  @click="handleUrl"
                  >{{ getCurrentDoc.schema.source }}</a
                ></v-card-text
              >
            </v-card>
          </v-menu>
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
            @click="confirmDelete()"
            class="mr-3"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </v-container>
    </div>

    <div v-if="getCurrentDoc.content">
      <div
        v-html="getCurrentDoc.content"
        v-if="!isStructured && !editMode"
        class="px-8 py-8"
      ></div>
      <MetadataEditor
        v-if="isStructured"
        :editMode="editMode"
        :key="componentKey"
      />
      <div class="editor_contain">
        <DocEditor
          :content="getCurrentDoc.content"
          class="ckeditor__"
          :id="id"
          v-if="editMode && !isStructured"
          :key="componentKey"
        ></DocEditor>
      </div>
    </div>
  </v-card>
</template>

<script>
import DocEditor from './Doc__Editor';
import SaveFile from './SaveFile';
import MetadataEditor from '@/components/Metadata__Editor';
import { shell } from 'electron';

export default {
  components: { DocEditor, SaveFile, MetadataEditor },
  data() {
    return {
      id: this.$route.params.id,
      componentKey: 1,
      holdComponentKey: 1,
      priorCwd: '',
      tabs: null,
      editMode: false,
      error: null,
      items: [
        {
          name: 'preview'
        },
        {
          name: 'edit'
        }
      ]
    };
  },
  computed: {
    docIsSaved() {
      return this.$store.state.docs.currentDoc.saved;
    },
    docId() {
      return this.$store.state.docs.currentDoc.id;
    },
    isStructured: {
      get() {
        return this.$store.state.docs.currentDoc.type === 'record';
      }
    },
    getCurrentDoc() {
      const response = this.$store.state.docs.currentDoc;

      try {
        if (
          response &&
          typeof response.content === 'string' &&
          this.isStructured
        ) {
          this.$store.commit('SET_ERROR', {
            error: false,
            message: undefined
          });

          return response;
        } else if (!response || !response.content) {
          this.$store.commit('SET_ERROR', {
            error: true,
            message: 'Document does not exist in the file system.'
          });
          return {
            content: `<h1>${this.$store.state.docs.currentDoc.title}</h1>`
          };
        } else {
          this.$store.commit('SET_ERROR', {
            error: false,
            message: undefined
          });
          return response;
        }
      } catch (err) {
        this.$store.commit('SET_ERROR', {
          error: true,
          message: 'Invalid metadata content: ' + err.message
        });

        return {};
      }
    },
    cwd: {
      get() {
        return this.$store.state.docs.cwd;
      }
    },
    // This is necessesary to avoid constant changing of key on docContent changes
    compoundCwdDocContent() {
      return this.cwd, this.getCurrentDoc, this.isStructured;
    }
  },

  methods: {
    confirmDelete() {
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc');
      }
    },
    handleUrl(e) {
      e.preventDefault();
      shell.openExternal(e.target.href);
    }
  },
  created: function() {
    if (this.$store.state.docs.hardocs.length) {
      this.id = this.$route.params.id;
      this.$store.dispatch('setCurrentDoc', this.id, 0); // TODO: Ideally we should find by several methods
      // this.getDoc();
    }
  },
  watch: {
    $route: function() {
      this.id = this.$route.params.id;
      this.$store.dispatch('setCurrentDoc', this.id);
      this.componentKey = this.componentKey + 1;
    }
  }
};
</script>

<style scoped>
.editor_menubar {
  z-index: 99;
  position: sticky;
  top: 64.5px;
  background-color: white;
  border-bottom: 1px solid rgb(212, 212, 212);
}
</style>
