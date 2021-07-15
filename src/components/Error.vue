<template>
  <v-snackbar v-model="error.error" top>
    <strong>{{ error.message }}</strong>
    <template v-slot:action="{ attrs }">
      <v-btn small color="pink" text v-bind="attrs" @click="handleClose">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Error',

  computed: {
    error() {
      const error = this.$store.state.docs.error;

      return error;
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('SET_ERROR', {
        error: false,
        message: null
      });
    }
  }
};
</script>
