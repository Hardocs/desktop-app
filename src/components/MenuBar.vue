<template>
  <div>
    <div v-if="isInit == true" class="pt-16 h-screen absolute w-full bg-black bg-opacity-25">
      <OpenProject class="relative pt-4 bg-white w-1/3 mx-auto"></OpenProject>
    </div>
    <div
      class="border-solid border-b border-gray-25 py-4 w-full flex border-b-1"
    >
      <!-- <p>{{ menuActions }}</p> -->
      <div v-for="item in actions" :key="item.actionType" class="px-4">
        <!-- <router-link
          v-if="item.name && item.name !== 'Index'"
          class="primary-button"
          :to="{ path: item.path }"
        >
          {{ item.name }}
        </router-link> -->
        <p @click="openHardocsPath(item.actionType)">{{item.label}}</p>
      </div>
      <!-- <div class="font-bold px-4" @click="openHardocsPath(creatorType)">
        Route to open project
      </div> -->
    </div>
  </div>
</template>
<script>
// import here the modal component...
import { routes } from '@/router/index.js';
import OpenProject from '@/components/OpenProject';
export default {
  name: 'MenuBar',
  components: { OpenProject },
  data() {
    return {
      init: false,
      // creatorType: 'createProjectFromExisting',
      actions: [
        {
          label:"Open project",
          actionType:"loadProject"
        },  
        {
          label:"Create project",
          actionType:""
        },
        {
          label:"Create from folder",
          actionType: 'createProjectFromExisting'
        }
      ]
    };
  },
  computed: {
    menuActions() {
      return routes;
    },
    cwd() {
      return this.$store.state.docs.cwd;
    },
    requestType() {
      return this.$store.state.docs.initProject.type;
    },
    isInit() {
      // Compute if initialization is taking place or not
      return this.$store.state.docs.initProject.on;
    }
  },
  methods: {
    openHardocsPath(type) {
      this.$store.dispatch('initProject', { type: type, on: true });
    }
  }
};
</script>