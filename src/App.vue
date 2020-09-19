<template>
  <div id="app">
    <Layout>
      <router-view />
    </Layout>
  </div>
</template>
<script>
import Layout from '@/layouts/Default';

export default {
  components: { Layout },
  beforeMount() {
    window.addEventListener("beforeunload", event => {
      if (!this.isEditing) return
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ""
    })
  }
};
</script>
