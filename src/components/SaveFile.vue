<template>
  <button class="primary-button">Save</button>
</template>
<script>
export default {
  name: 'SaveFile',
  data() {
    return {
      dummy: {
        title: 'Name',
        description: 'akasdasd',
        path: 'docs/',
        content: 'this is a content',
        fileName: 'hello.md'
      }
    };
  }
};
</script>