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
          @input="onChangeData"
        >
        </v-jsf>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn class="primary" @click="onSubmit()">Save</v-btn>
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
  name: 'MetadataEditor',
  components: {
    VJsf
  },
  data: function() {
    return {
      created: false,
      schema: this.$store.state.docs.schema.content,
      model: this.$store.state.docs.metadata.content,
      requiredProps: [],
      valid: false
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('writeMetadata');
      console.log(this.model);
    },
    cancel() {
      this.$store.commit('SET_INIT_PROJECT', {
        on: false,
        type: undefined
      });
    },
    onChangeData(data) {
      this.$store.commit('SET_METADATA', data);
    }
  }
};
</script>
