<template lang="">
  <div>
    <div class="m-auto w-1/2">
      <div class="w-full flex items-center" style="height:300px;" v-if="dev">
        <img style="width:100px;" src="@/assets/icons/icon.png" />
        <h1 class="px-4 flex-1 text-5xl text-gray-100">
          <span class="text-primary-100">HAR</span>DOCS
        </h1>
        <MetadataPreview />
      </div>
    </div>
  </div>
</template>
<script>
import MetadataPreview from '@/components/Metadata__previewer';
export default {
  name: 'InitView',
  components: { MetadataPreview },
  data() {
    return {
      dev: process.env.NODE_ENV !== 'production'
    };
  }
};
</script>
