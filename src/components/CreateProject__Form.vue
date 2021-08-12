<template>
  <v-card>
    <div style="cursor:pointer" class="float-right px-4" @click="cancel">
      ❌
    </div>
    <v-card-title class="headline lighten-2">
      Create a new Project
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-jsf v-model="model" :schema="schema" @submit.prevent />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="primary" @click="onSubmit()">Create project</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/** Vjsf */
import VJsf from '@koumoul/vjsf';
import '@koumoul/vjsf/lib/deps/third-party.js';

export default {
  name: 'CreateProject',
  components: {
    VJsf
  },
  props: {
    selectedAction: {
      type: String,
      required: true
    },
    cwd: {
      type: String,
      required: true
    }
  },
  computed: {
    currentCwd() {
      console.log('CreateProject:currentCwd: ' + this.$store.state.docs.cwd);
      return this.$store.state.docs.cwd;
    }
  },
  data: () => ({
    created: false,
    valid: null,
    model: {},
    schema: {
      type: 'object',
      title: 'Project',
      required: ['name', 'docsDir'],
      properties: {
        name: {
          type: 'string',
          $id: '#/properties/name',
          title: 'Folder name',
          description: '',
          default: '',
          examples: ['A project path']
        },
        docsDir: {
          $id: '#/properties/docsDir',
          type: 'string',
          title: 'Docs directory',
          description: '',
          default: 'docs',
          examples: ['docs']
        }
      }
    }
  }),

  methods: {
    onSubmit() {
      console.log('form name: |' + this.model.name + '|')
      console.log('form docsDir: |' + this.model.docsDir + '|')
      try {
        if (this.$refs.form.validate()) {
          this.model.path = this.cwd;
          this.$store.dispatch(this.selectedAction, this.model);
          this.cancel();
          this.$store.commit('SET_ERROR', {
            error: false,
            message: undefined
          });
        } else {
          let msg = 'Unknown input error: please check your form...'
          if (!this.model.name || this.model.name.strlen() === 0) {
            msg = 'You need to enter a project name...'
          }
          // else { etc }
          this.$store.commit('SET_ERROR', {
            error: true,
            message: msg
          });
        }
      } catch (err) {
        this.$store.commit('SET_ERROR', {
          error: true,
          message: err.message
        });
      }
    },
    cancel() {
      this.$store.commit('SET_INIT_PROJECT', {
        on: false,
        type: undefined
      });
      this.$store.commit('SET_ERROR', {
        error: false,
        message: null
      });
    }
  }
};
</script>
