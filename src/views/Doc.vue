<template>
  <v-card ref="doc" v-if="doc">
    <div v-if="$store.state.docs.devFeatures == true">
      <p>{{ this.$store.state.docs.currentDoc.id }}</p>
      <p>{{ this.$store.state.docs.currentDoc.title }}</p>
    </div>
    <div class="flex flex-end py-2">
      <SaveFile :saved="docIsSaved" :docId="docId"> </SaveFile>
    </div>
    <v-tabs v-model="tabs" right>
      <v-tab v-for="item in items" :key="item.name" :href="'#' + item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item value="preview">
        <div v-html="docContent" class="px-8 py-8"></div>
      </v-tab-item>
      <v-tab-item value="edit">
        <DocEditor
          :content="docContent"
          :id="id"
          :key="componentKey"
        ></DocEditor>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  <div v-else>
    <p>No doc in this route</p>
  </div>
</template>

<script>
import DocEditor from '@/components/Doc__Editor';
import SaveFile from '@/components/SaveFile';

export default {
  components: { DocEditor, SaveFile },
  data() {
    return {
      id: this.$route.params.id,
      doc: {},
      componentKey: 1,
      holdComponentKey: 1,
      priorCwd: '',
      tabs: null,
      items: [
        {
          name: 'preview'
        },
        {
          name: 'edit'
        }
      ],
      text: 'Helo world, This is divine nature'
    };
  },
  computed: {
    docIsSaved() {
      return this.$store.state.docs.currentDoc.saved;
    },
    docId() {
      return this.$store.state.docs.currentDoc.id;
    },
    docContent: {
      get() {
        return this.$store.state.docs.currentDoc.content;
      }
    },
    cwd: {
      get() {
        return this.$store.state.docs.cwd;
      }
    },
    // This is necessesary to avoid constant changing of key on docContent changes
    compoundCwdDocContent() {
      return this.cwd, this.docContent;
    }
  },

  methods: {
    getDoc() {
      // we use the id that is part of this object to
      // find the actual object stored in the vuex
      this.componentKey += this.componentKey;
      return (this.doc = this.$store.state.docs.allDocs.find(
        (doc) => doc.id == this.id
      ));
    }
  },
  created: function() {
    this.id = this.$route.params.id;
    this.$store.dispatch('setCurrentDoc', this.id, 0); // TODO: Ideally we should find by several methods
    this.getDoc();
  },
  watch: {
    $route: function() {
      console.log('Listening to route change');
      this.id = this.$route.params.id;
      this.$store.dispatch('setCurrentDoc', this.id);
      this.componentKey = this.componentKey + 1;
    },
    cwd: function() {
      // this.componentKey = this.componentKey + 1
      // this.$router.go()
    },
    doc: async function() {
      if (!this.doc) {
        await this.$store.dispatch('setCurrentDoc');
      }
    }
  }
};
</script>
