<template>
  <div class="flex">
    <!-- <p>{{ this.$store.state.metadata.schemasRef }}</p> -->
    <div class="flex justify-center">
      <div class="relative">
        <div class="grid gap-2 grid-cols-3">
          <!-- <button class="primary-button" @click="addData()">
            + add data cell
          </button> -->

          <button
            class="primary-button"
            @click="selectFolder()"
            v-shortkey="['ctrl', 'shift', 's']"
            @shortkey="selectFolder()"
          >
            Select standard
          </button>
          <!-- <div
            class="primary-button"
            @click="toggleOpen()"
            v-shortkey="['ctrl', 'shift', 't']"
            @shortkey="toggleOpen()"
          >
            Choose a template
          </div> -->
        </div>
        <!-- <div v-if="open" @click="open = false" class="fixed z-40 inset-0"></div> -->
        <!-- <div :open="open" :toggleOpen="toggleOpen()"> -->
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
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// import DataCell from '@/components/DataCell'

export default {
  name: 'SchemasDir',
  //   components: {
  //           DataCell,
  //   },
  data: () => {
    return {
      //   schemasList: [],
      open: false,
      username: 'John Wick',
      email: 'dontkillmydog@johnwick.com'
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
    selectFolder() {
      this.$store.dispatch('setSchemasDir');
    },
    toggleOpen() {
      this.open = !this.open;
    },
    addDataCellFromTemplate(schemaFile) {
      this.$store.dispatch('addObject', {
        schemaDir: this.schemasDir + '\\',
        selectedSchemaFile: schemaFile
      });
      this.toggleOpen();
    }

    // FIXME: This should be a state action.....
    // addData() {
    //   let ComponentClass = Vue.extend(DataCell);
    //   let instance = new ComponentClass();
    //   instance.$mount(); // pass nothing
    //   this.$refs.docPlace.appendChild(instance.$el);
    // }
  }
};
</script>
