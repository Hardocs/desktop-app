<template>
  <div id="app">
    <Layout>
    <router-view/>
    </Layout>
    </div>
</template>
<script>
import Layout from "@/layouts/Default";

export default {
    components: { Layout },

}
</script>