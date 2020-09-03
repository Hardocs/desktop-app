<template>
  <div>
    <div ref="doc" v-if="doc">
      <p>{{ id }}</p>
      <p>{{ doc.title }}</p>
      <Doc :content="doc.content" :id="doc.id"></Doc>
    </div>
    <div v-else>
      <p>No doc in this route</p>
    </div>
  </div>
</template>

<script>
import Doc from "@/components/Doc";
// import DataCell from "~/components/DataCell";
export default {
  components: { Doc },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    doc() {
      // we use the id that is part of this object to
      // find the actual object stored in the vuex
      return this.$store.state.docs.allDocs.find(doc => doc.id == this.id); 
    }
  }
};
</script>
