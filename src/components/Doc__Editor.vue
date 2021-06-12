<template>
  <div class="editor">
    <div v-if="state === 'active'">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
        @input="onChange"
        class=""
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import ClassicEditor from 'hardocs-ck-editor';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';

// import CKEditor from '@ckeditor/ckeditor5-vue/dist/ckeditor';
// import Base64ImagePlugin from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

export default {
  components: {
    // ckeditor: CKEditor.component
  },
  name: 'Doc',
  props: {
    id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false,
      default: `
          <h2>
            Dummy text when state doesnt work,
          </h2>`
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      state: 'active',
      json: 'edit content',
      html: this.content,
      editorData: this.content,
      editorConfig: {
        toolbar: {
          viewportTopOffset: 124
        }
      }
    };
  },
  methods: {
    setStateTo: function(value) {
      this.state = value;
    },
    onChange: function(data) {
      this.$store.dispatch('setSaved', false);
      let regex = /<[^>].+?>(.*?)<\/.+?>/m;
      // let regex = /(# |## |### |#### )[\w]*[\s\S]*?\n/gis;

      if (data.length && data.match(regex)) {
        let title = data.match(regex)[0];
        regex = /(<([^>]+)>)/gi;
        // regex = /(# |## |### |#### )/gi;
        // Set conditional statement here
        title = title.replace(regex, '').trim();
        title = title.replace(/&nbsp;/g, '');

        this.$store.commit('UPDATE_DOC_CONTENT', {
          id: this.id,
          content: data,
          title
        });
      }
    }
  }
};
</script>

<style scoped>
.text-icon {
  font-size: 1rem;
}
.grid__menubar {
  display: flex;
  align-items: center;
}
.grid__menubar > * {
  padding: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 5px;
  margin: 0 4px;
}
.grid__menubar > *:hover {
  background-color: #dbdbdb;
}

.is-active {
  background-color: #cecece;
}
</style>
