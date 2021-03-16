<template>
  <div>
    <v-app-bar color="#fff" fixed app>
      <div v-for="item in actions" :key="item.actionType">
        <v-btn
          elevation="0"
          style="cursor: pointer"
          class="mr-3"
          @click="openHardocsPath(item.actionType, item.initOn)"
        >
          {{ item.label }}
        </v-btn>
      </div>
      <div class="w-1/2">
        <div class="text-center flex justify-center">
          <strong>Project Folder: </strong>
          <div class="px-4">{{ cwd }}</div>
        </div>
      </div>
    </v-app-bar>
    <v-dialog
      v-model="init"
      width="500"
      v-if="isInit == true ? (init = true) : (init = false)"
      persistent
    >
      <CreateProject
        :cwd="cwd"
        :selectedAction="selectedAction"
        class="relative pt-4 bg-white w-2/5 mx-auto"
      ></CreateProject>
    </v-dialog>
  </div>
</template>

<script>
import CreateProject from '@/components/CreateProject__Form';

export default {
  name: 'MenuBar',
  components: {
    CreateProject
  },
  data() {
    return {
      init: false,
      selectedAction: '',
      actions: [
        {
          label: 'Create project',
          actionType: 'createNewProject',
          initOn: true
        },
        {
          label: 'Open project',
          actionType: 'loadProject',
          initOn: false
        }
      ]
    };
  },

  computed: {
    isInit() {
      // Compute if initialization is taking place or not
      const response = this.$store.state.docs.initProject.on;
      return response;
    },
    cwd() {
      return this.$store.state.docs.cwd;
    }
  },
  methods: {
    openHardocsPath(type, initOn) {
      this.selectedAction = type;
      this.$store.dispatch('initProject', { type: type, on: initOn });
    }
  }
};
</script>
