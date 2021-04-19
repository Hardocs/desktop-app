<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <textarea
          name="metadata"
          id="metadata"
          cols="80"
          v-model="schema"
        ></textarea>
        <!-- <v-jsf
          v-model="model"
          :schema="JSON.parse(schema)"
          @submit.prevent
          ref="formSchema"
        >
        </v-jsf> -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
// import VJsf from '@koumoul/vjsf';

export default {
  name: 'MetadataPreview',
  components: {
    // VJsf
  },
  props: {
    editMode: Boolean
  },
  data: function() {
    return {
      created: false,
      schema: '',
      model: {},
      requiredProps: [],
      valid: false
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
