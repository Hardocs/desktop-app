<template>
  <div refs="docPlace" id="app" class="content-center w-1/3 m-auto text-center items-center  flex-col"> 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Index">Index</router-link>
    </div>
    <h1 style="color:red" class="bg-gray-25">{{ query }}</h1>
    <button class="primary-button" @click="gqlQuery()">Button</button>
    <router-view />
  </div>
</template>

<script>
import DocsServices from "./services/index";
export default {
  data: function() {
    return {
      path: "",
      query: ""
    };
  },
  methods: {
    // Vue-Apollo options here
    gqlQuery: async function() {
      // e.preventDefault();
      const result = await DocsServices.getCWD();
      this.query = result.data.cwd;
    }
  }
};
</script>


