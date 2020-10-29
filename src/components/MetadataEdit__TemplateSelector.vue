<template>
  <!-- <p>{{ this.$store.state.metadata.schemasRef }}</p> -->
  <div class="relative">
    <div
      class="primary-button"
      @click="toggleOpen()"
      v-shortkey="['ctrl', 't']"
      @shortkey="toggleOpen()"
    >
      Choose a template
    </div>
    <div
      v-if="open"
      class="origin-top-right absolute right-0 mt-2 w-64 bg-white border border-gray-25 rounded-lg shadow-md"
    >
      <ul>
        <li
          v-for="item in schemasList"
          :key="item.title"
          class="rounded-t-lg block px-4 py-3"
          style="cursor:pointer"
          @click="addDataCellFromTemplate(item.ref)"
        >
          <a class="hover:gray-25">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TemplateSelector',
  data: () => {
    return {
      open: false,
    };
  },
  computed: {
    schemasList() {
      return this.$store.state.metadata.schemasRef;
    },
    schemasDir() {
      return this.$store.state.metadata.schemasDir;
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },

    addDataCellFromTemplate(schemaFile) {
      this.$emit('loadSchema', schemaFile);
      this.toggleOpen();
    }
  }
};
</script>
