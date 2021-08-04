<template>
  <v-card :class="!editMode && 'disabled'">
    <v-card-text>
      <v-form v-model="valid">
        <v-jsf
          :schema="doc.schema.content"
          v-model="doc.content"
          @submit.prevent
          ref="metadata"
          @input="onChangeData"
        >
        </v-jsf>
      </v-form>
    </v-card-text>
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
import { mapGetters } from 'vuex';

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
      requiredProps: [],
      valid: false
    };
  },
  methods: {
    cancel() {
      this.$store.commit('SET_INIT_PROJECT', {
        on: false,
        type: undefined
      });
    },
    onChangeData(data) {
      this.$store.dispatch('setSaved', false);
      this.$store.commit('SET_DOC_CONTENT', data);
    }
  },
  computed: {
    ...mapGetters({
      doc: 'getCurrentDoc'
    })
  }
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
}
</style>
