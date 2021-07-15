<template>
  <v-app>
    <v-divider class="top-line"></v-divider>
    <MenuBar />

    <v-main>
      <div class="content">
        <DocsSidebar v-if="cwd" />
        <div class="ml-12 mt-12 main">
          <slot />
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
  },
  computed: {
    cwd: {
      get() {
        return this.$store.state.docs.cwd;
      }
    }
  }
};
</script>
<style scoped>
.content {
  display: flex;
  height: 100%;
}

.main {
  width: 800px;
}

.top-line {
  position: fixed;
  width: 100vw;
  z-index: 9999;
}
</style>
