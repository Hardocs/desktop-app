<template>
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
</template>

<script>
import Vue from "vue";
import Doc from "@/components/Doc";
import OpenFolder from "@/components/OpenFolder";

// import DataCell from "~/components/DataCell";
// import OpenFolder from "~/components/OpenFolder";

export default {
  components: { Doc, OpenFolder },
  methods: {
    addDoc() {
      let ComponentClass = Vue.extend(Doc);
      let instance = new ComponentClass();
      instance.$mount(); // pass nothing
      this.$refs.docPlace.appendChild(instance.$el);
    },
    // addData() {
    //   let ComponentClass = Vue.extend(DataCell);
    //   let instance = new ComponentClass();
    //   instance.$mount(); // pass nothing
    //   this.$refs.docPlace.appendChild(instance.$el);
    // }
  }
};
</script>
