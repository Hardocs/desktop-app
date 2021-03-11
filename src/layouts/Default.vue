<template>
  <v-app>
    <MenuBar />

    <v-main>
      <div class="content">
        <DocsSidebar />
        <div class="ml-12 main">
          <slot />
        </div>
        <div
          :class="{ active: metadata }"
          class="fixed pt-10 top-0 right-0 h-screen flex hidden"
        >
          <div class="flex items-center transform -rotate-90 w-4">
            <div class="bg-primary-100 text-white">
              <p
                class="pl-3 pr-3"
                style="cursor:pointer;"
                @click="toggleOpen()"
              >
                METADATA
              </p>
            </div>
          </div>
          <div class="bg-primary-100 w-3"></div>
          <div
            id="app"
            :class="{ hidden: !metadata }"
            class="bg-gray-15 w-full pr-4 border-r border-solid border-gray-25 overflow-auto"
          >
            <div class="">
              <!-- <MetadataPanel></MetadataPanel> -->
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import DocsSidebar from '@/components/Doc__Sidebar';
import MenuBar from '@/components/MenuBar';
// import MetadataPanel from '@/components/MetadataPanel';

export default {
  name: 'LayoutDefault',
  components: {
    DocsSidebar,
    MenuBar
    // MetadataPanel
  },
  data: () => {
    return {
      metadata: false
    };
  },
  methods: {
    toggleOpen() {
      this.metadata = !this.metadata;
    }
  },
  created() {
    console.log('WELCOME TO HARDOCS');
  }
};
</script>
<style scoped>
.content {
  display: flex;
  height: 100%;
}

.main {
  max-width: 800px;
}
</style>
