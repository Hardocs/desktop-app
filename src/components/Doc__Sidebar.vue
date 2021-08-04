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
            <v-icon v-if="doc.type === 'record'">mdi-code-json</v-icon>
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
            <v-form ref="formSchema">
              <v-jsf
                v-model="model"
                :schema="schema"
                @submit.prevent
                @change="handleSchemaTitle"
              >
              </v-jsf>
            </v-form>
          </v-container>
          <v-divider></v-divider>

          <v-card-actions>
            <v-btn @click="addMetadata" color="primary" :loading="loading"
              >Create record</v-btn
            >
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
      loading: false,
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
          },
          validate: {
            type: 'boolean',
            title: 'Enable strict schema validation',
            default: false,
            'x-display': 'checkbox'
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
    handleSchemaTitle(model) {
      if (model.schemaUrl && !model.schemaTitle) {
        const url = new URL(model.schemaUrl);
        if (url.pathname) {
          const pathname = model.schemaUrl.split('/');
          this.model.schemaTitle = pathname[pathname.length - 1].replace(
            '.json',
            ''
          );
        }
      }
    },
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
      this.loading = true;
      if (this.$refs.formSchema.validate()) {
        // prevent duplicate metadata title
        const title = this.model.title;

        const exists = this.$store.state.docs.hardocs.find(
          (doc) => doc.title === title
        );
        if (exists) {
          this.$store.commit('SET_ERROR', {
            error: true,
            message: `Record name "${title}" already exists!`
          });

          this.loading = false;
        } else {
          this.$store
            .dispatch('addMetadata', this.model)
            .then(() => {
              this.open = false;
            })
            .catch((err) => {
              this.$store.commit('SET_ERROR', {
                error: true,
                message: err.message
              });
            });
          this.$store.commit('SET_ERROR', {
            error: false,
            message: null
          });
          this.loading = false;
        }
      } else {
        this.$store.commit('SET_ERROR', {
          error: true,
          message: 'Invalid input'
        });
        this.loading = false;
      }
    },

    removeDoc() {
      this.$store.dispatch('removeDoc');
    },

    confirmDelete() {
      if (confirm('are you sure you want to delete this document ?')) {
        this.$store.dispatch('removeDoc');
      }
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
