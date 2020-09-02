<template>
  <div
    refs="docPlace"
    id="app"
    class="content-center w-1/3 m-auto text-center items-center  flex-col"
  >
  <h1>HERE I AM DUMPING ALL COMPONENTS TO TEST THEM</h1>
    <div id="nav"><router-link to="/">Home</router-link> |</div>
    <div>
      <h1 style="color:red" class="bg-gray-25">{{ query }}</h1>
      <button class="primary-button" @click="gqlQuery()">
        Test apollo client
      </button>
      <router-view />
    </div>
    <div ref="docPlace" class="w-full">
      <div ref="container flex ga-2" class="my-2">
        <button class="primary-button" @click="addDoc">add Doc</button>
        <!-- <button class="primary-button" @click="addData">add Data</button> -->
        <br />
        <br />
        <OpenFolder></OpenFolder>
      </div>
      <!-- <h1>What an Doc</h1> -->
      <Doc id="1"></Doc>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Doc from "@/components/Doc";
import OpenFolder from "@/components/OpenFolder";
import DocsServices from "@/services/index";


// import DataCell from "~/components/DataCell";
// import OpenFolder from "~/components/OpenFolder";

export default {
  components: { Doc, OpenFolder },
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
    },
    addDoc() {
      let ComponentClass = Vue.extend(Doc);
      let instance = new ComponentClass();
      instance.$mount(); // pass nothing
      this.$refs.docPlace.appendChild(instance.$el);
    }
    // addData() {
    //   let ComponentClass = Vue.extend(DataCell);
    //   let instance = new ComponentClass();
    //   instance.$mount(); // pass nothing
    //   this.$refs.docPlace.appendChild(instance.$el);
    // }
  }
};
</script>
