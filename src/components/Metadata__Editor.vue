<template>
  <v-card :class="!editMode && 'disabled'">
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
    <v-card-actions v-if="editMode">
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
  props: {
    editMode: Boolean
  },
  data: function() {
    return {
      created: false,
      schema: JSON.parse(this.$store.state.docs.currentDoc.schema.content),
      model: JSON.parse(this.$store.state.docs.currentDoc.content),
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

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
