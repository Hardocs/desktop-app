<template>
  <div class="layout flex w-full">
    <aside class="w-1/3">
      <DocsContents></DocsContents>
    </aside>
    <div class="w-2/3">
      <slot />
    </div>
  </div>
</template>
<script>
import DocsContents from "@/components/DocsContents";

export default {
  name: "LayoutDefault",
  components: { DocsContents }
};
</script>