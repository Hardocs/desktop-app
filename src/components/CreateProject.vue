<template>
  <v-app>
    <v-main>
      <div style="cursor:pointer" class="float-right px-4" @click="cancel()">
        ❌
      </div>
      <v-form v-model="valid" class="p-6">
        <v-jsf
          v-model="model"
          :schema="schema"
          @submit.prevent
          ref="formSchema"
        >
        </v-jsf>
        <v-btn class="primary" @click="onSubmit()">Create project</v-btn>
      </v-form>
      <pre class="model">{{ model }}</pre>
    </v-main>
  </v-app>
</template>

<script>
/** Vjsf */
import VJsf from '@koumoul/vjsf';
import '@koumoul/vjsf/lib/VJsf.css';
import '@koumoul/vjsf/lib/deps/third-party.js';

export default {
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
          docsDir: 'docs',
          entryFile: 'Index.html'
        }
      ],
      required: ['name', 'docsDir', 'entryFile'],
      properties: {
        path: {
          $id: '#/properties/path',
          type: 'string',
          title: 'Project path',
          description: 'Provide a root project path ',
          default: '',
          examples: ['A project ']
        },
        name: {
          $id: '#/properties/name',
          type: 'string',
          title: 'Project Name',
          description: '',
          default: '',
          examples: ['A project ']
        },
        shortTitle: {
          $id: '#/properties/shortTitle',
          type: 'string',
          title: 'Short Title',
          description: '',
          default: '',
          examples: ['This is a project title']
        },
        docsDir: {
          $id: '#/properties/docsDir',
          type: 'string',
          title: 'Docs directory',
          description: '',
          default: 'docs',
          examples: ['docs']
        },
        entryFile: {
          $id: '#/properties/entryFile',
          type: 'string',
          title: 'Entry file',
          description: 'Provide a reference file inside your docs root folder',
          default: 'index.html',
          examples: ['Index.html']
        }
      }
    },
    model: {},
    valid: false,
    modelExample: {
      path: 'D:\\my-projects\\COVID-19\\DESTROY',
      name: 'EK Evaluation kit',
      shortTitle: 'A kit to evaluate EK',
      docsDir: 'docs\\',
      entryFile: 'index.html'
    }
  }),
  mounted() {
    console.log({ model: this.model, example: this.modelExample });
  },
  created() {
    this.model.path = this.cwd;
  },
  methods: {
    onSubmit() {
      console.log(this.selectedAction);
      // Check validity here
      // If valid, toggle button to active class....
      this.$store.dispatch(this.selectedAction, this.model);
      this.cancel();
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
