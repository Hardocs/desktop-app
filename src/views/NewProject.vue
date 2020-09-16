/<template>
  <div class>
    <!-- <FormSchema class="pb-6" ref="formSchema" v-model="model" @submit.prevent> -->
    <!-- <div class="buttons">
        <button @click="createProject" class="primary-button" type="submit">Create hardocs project</button>
    </div>-->
    <div class="buttons">
      <button class="primary-button" @click="onSubmit()">Create project</button>
    </div>
    <!-- </FormSchema> -->
    <!-- Translate this to yaml -->
    <pre class="model">{{ model }}</pre>
  </div>
</template>

<script>
// import FormSchema from '@formschema/native';

export default {
  // components: { FormSchema },
  data: () => ({
    created: false,
    schema: Promise.resolve(require('@/schemas/project.schema.json')),
    model: {},
    modelExample: {
      path: 'D:\\my-projects\\COVID-19\\DESTROY',
      name: 'EK Evaluation kit',
      shortTitle: 'A kit to evaluate EK',
      docsDir: 'docs\\',
      entryFile: 'index.md'
    }
  }),
  created() {
    this.schema.then((schema) => this.$refs.formSchema.load(schema));
  },
  methods: {
    onSubmit() {
      console.log(this.model);
      this.$store.dispatch('createNewProject', this.modelExample);
    }
  }
};
</script>

<style >
.container {
  @apply bg-gray-15 py-4;
  text-align: left;
  max-width: 1024px;
  /* margin: auto; */
  display: flex;
}

.form,
.model {
  padding: 20px;
  margin: 0 auto;
}

.form {
  /* background-color: #c5cdd6; */
}

.model {
  margin: 0;
  /* background-color: #eff0f1; */
  @apply bg-gray-100 text-white;
}

h1 {
  font-size: 1.7em;
  /* text-align: center; */
  @apply px-4 py-2;
  margin-top: 0;
  margin-bottom: 0.2em;
}

h1 + p {
  @apply px-4 py-0;

  display: block;
  /* text-align: center; */
  margin-bottom: 1.2em;
}

small {
  line-height: 20px;
  display: block;
}

[data-fs-field] {
  display: flex;
  margin-bottom: 5px;
  @apply py-2 px-1;
}

label {
  display: block;
  width: 120px;
  text-align: right;
  margin-right: 10px;
}

[data-fs-field-input] {
  @apply w-1/2;
}

.buttons {
  padding-left: 130px;
}

input {
  @apply w-full py-1 px-2 bg-gray-15;
  display: block;
}
</style>
