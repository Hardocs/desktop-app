<template>
  <v-card>
    <div style="cursor:pointer" class="float-right px-4" @click="cancel">
      ❌
    </div>
    <v-card-title class="headline lighten-2">
      Create a new Project
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-jsf
          v-model="model"
          :schema="schema"
          @submit.prevent
          ref="formSchema"
        >
        </v-jsf>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="primary" @click="onSubmit()">Create project</v-btn>
    </v-card-actions>
    <v-snackbar v-model="requiredProps.length">
      The following fields are required:
      <strong>{{ requiredProps.join(', ') }}</strong>
      <template v-slot:action="{ attrs }">
        <v-btn
          small
          color="pink"
          text
          v-bind="attrs"
          @click="requiredProps = []"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
/** Vjsf */
import VJsf from '@koumoul/vjsf';

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
    schema: {
      type: 'object',
      title: 'Project',
      examples: [
        {
          name: 'A project ',
          shortTitle: 'This is a project title',
          description: 'Describe project',
          docsDir: 'docs'
        }
      ],
      required: ['name', 'docsDir'],
      properties: {
        name: {
          $id: '#/properties/name',
          type: 'string',
          title: 'Folder name',
          description: '',
          default: '',
          examples: ['A project path']
        },
        // path: {
        //   $id: '#/properties/path',
        //   type: 'string',
        //   title: 'Project path',
        //   description: 'Provide a root project path ',
        //   default: '',
        //   examples: ['Path to a folder']
        // },

        docsDir: {
          $id: '#/properties/docsDir',
          type: 'string',
          title: 'Docs directory',
          description: '',
          default: 'docs',
          examples: ['docs']
        }
      }
    },
    model: {},
    requiredProps: [],
    valid: false,
    modelExample: {
      path: 'D:\\my-projects\\COVID-19\\DESTROY',
      name: 'EK Evaluation kit',
      shortTitle: 'A kit to evaluate EK',
      docsDir: 'docs\\'
    }
  }),

  methods: {
    onSubmit() {
      const model = this.model;
      this.model.path = this.cwd;
      const valid = () => {
        let requiredProps = [];
        if (!model.name || model.name.lenght < 1) {
          requiredProps.push('Project Name');
        }

        if (!model.docsDir || model.docsDir.lenght < 1) {
          requiredProps.push('Docs Directory');
        }

        if (requiredProps.length) {
          this.requiredProps = requiredProps;
        }
        return requiredProps.length ? false : true;
      };

      // Check validity here
      // If valid, toggle button to active class....
      if (valid()) {
        this.$store.dispatch(this.selectedAction, this.model);
        this.cancel();
      }
    },
    cancel() {
      this.$store.commit('SET_INIT_PROJECT', {
        on: false,
        type: undefined
      });
    }
  }
};
</script>
