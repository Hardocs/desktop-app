<template>
  <div>
    <v-navigation-drawer
      permanent
      width="300"
      :expand-on-hover="$vuetify.breakpoint.smAndDown"
      app
    >
      <v-list dense nav>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Add Doc</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in docType"
              :key="index"
              :docType="item.toLowerCase()"
              @click="addDoc"
            >
              <v-list-item-title :name="item">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-divider class="my-3"></v-divider>
        <v-list-item
          v-for="doc in docs"
          :key="doc.id"
          link
          @click="setCurrentDoc(doc.id)"
        >
          <v-list-item-icon>
            <v-icon v-if="doc.type === 'record'">mdi-file-document</v-icon>
            <v-icon v-else>mdi-file-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              :class="{ 'font-weight-bold': doc.id == currentDocId }"
              >{{ doc.title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="open" width="500">
      <template>
        <v-card>
          <v-container>
            <v-form>
              <v-jsf
                v-model="model"
                :schema="schema"
                @submit.prevent
                ref="formSchema"
              >
              </v-jsf>
            </v-form>
          </v-container>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn @click="addMetadata" color="primary">Create record</v-btn>
            <v-btn @click="open = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VJsf from '@koumoul/vjsf';

export default {
  name: 'DocsSidebar',
  components: {
    VJsf
  },
  data() {
    return {
      showModal: false,
      docToDelete: null,
      projectPath: '',
      currentDoc: '',
      mini: true,
      open: false,
      schema: {
        type: 'object',
        title: 'Create record',
        required: ['title', 'schemaUrl'],
        properties: {
          title: {
            type: 'string',
            title: 'Record name',
            default: ''
          },
          schemaTitle: {
            type: 'string',
            title: 'Schema title',
            default: ''
          },
          schemaUrl: {
            type: 'string',
            title: 'Schema URL',
            default: ''
          }
        }
      },
      model: {},
      docType: ['Metadata', 'Document']
    };
  },

  computed: {
    ...mapGetters({
      docId: 'currentDocId'
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
      return this.$store.state.docs.hardocs;
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

    async backToProject() {
      await this.$store.commit('SET_CWD', this.projectPath);
      await this.$store.dispatch('loadProject');
      this.setCurrentDoc(this.currentDoc);
    },

    async setCurrentDoc(id) {
      await this.$store.dispatch('setCurrentDoc', id);
    },

    addDoc(e) {
      if (e.target.innerText.toLowerCase() === 'document') {
        this.$store.dispatch('addDoc');
      } else {
        this.open = true;
      }
    },

    async addMetadata() {
      this.$store
        .dispatch('addMetadata', this.model)
        .then(() => {
          this.open = false;
        })
        .catch((err) => console.error(err));
    },

    removeDoc() {
      this.$store.dispatch('removeDoc');
    },

    confirmDelete() {
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc');
      }
    }
  },
  watch: {
    cwd() {
      // if (this.cwd !== this.appPath) this.guidesIsActive = false;
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
.editor_menubar {
  z-index: 0 !important;
}
</style>
