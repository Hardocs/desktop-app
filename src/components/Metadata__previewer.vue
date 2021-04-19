<template>
  <v-card>
    <v-card-text>
      <v-form v-model="valid">
        <v-btn block @click="loadSchema">View</v-btn>
        <v-textarea
          name="metadata"
          id="metadata"
          cols="80"
          v-model="schema"
        ></v-textarea>
        <v-jsf v-model="model" :schema="vjsf" @submit.prevent ref="formSchema">
        </v-jsf>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import VJsf from '@koumoul/vjsf';

export default {
  name: 'MetadataPreview',
  components: {
    VJsf
  },
  props: {
    editMode: Boolean
  },
  data: function() {
    return {
      created: false,
      schema: '',
      vjsf: {},
      model: {},
      requiredProps: [],
      valid: false
    };
  },
  created() {},
  methods: {
    loadSchema() {
      this.vjsf = JSON.parse(this.schema);
    }
  }
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
