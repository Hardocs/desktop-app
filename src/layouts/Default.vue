<template>
<div>
  <div>
    <MenuBar class="fixed bg-white z-40 w-full"></MenuBar>
  </div>
  <div class="py-16 w-full layout flex gap-8">
    <aside class="fixed h-screen pl-6 pr-4 w-1/5 border-r border-solid border-gray-25">
      <DocsContents></DocsContents>
    </aside>
    <div class="w-1/5"></div>
    <div class="m-auto w-3/4 xl:w-2/4">
      <slot />
    </div>
  </div>
  </div>
</template>
<script>
import DocsContents from '@/components/DocsContents';
import MenuBar from '@/components/MenuBar';
export default {
  name: 'LayoutDefault',
  components: { DocsContents , MenuBar  },
  
};
</script>
