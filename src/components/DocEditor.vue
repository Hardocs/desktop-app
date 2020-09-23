<template>
  <div class="editor">
    <div v-if="$store.state.docs.devFeatures == true" class="flex gap-2 py-3 justify-end">
      <button class="primary-button" v-on:click="setStateTo('active')">
        Edit
      </button>
      <button  class="primary-button" v-on:click="setStateTo('preview')">
        Preview
      </button>
      <button  class="primary-button" v-on:click="setStateTo('data')">
        Doc data
      </button>
    </div>

    <div v-if="state === 'active'">
      <editor-content
        :v-model="content"
        class="editor__content"
        :editor="editor"
      />
    </div>
    <div v-else-if="state === 'data'" class="export">
      <h3>JSON</h3>
      <pre class="p-2 bg-gray-15"><code v-html="json"></code></pre>
    </div>
    <div v-else>
      <h2 class="text-primary-100">This is the HTML</h2>
      <div class="p-2 bg-gray-15" v-html="html"></div>
    </div>
  </div>
</template>

<script>
// import Icon from "../components/Icon";
// import DocBtn from "../components/DocButton";
import {
  Editor,
  EditorContent
  // EditorMenuBar
} from 'tiptap';
import {
  Image,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent
    // EditorMenuBar
    // Icon,
    // DocBtn,
  },
  name: 'Doc',
  props: {
    id: {
      // type: any,
      required: true
    },
    // Now the content property can only be passed via
    content: {
      type: String,
      required: false,
      default: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `
    }
  },
  data() {
    return {
      editor: null,
      state: 'active',
      json: 'edit content',
      html: this.content
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      content: this.content, // passing the prop
      onUpdate: ({ getJSON, getHTML }) => {
        // console.log(this.html.length);
        this.json = getJSON(); // this should update the actual state
        this.html = getHTML(); // todo: update the state
        this.$store.commit('SET_TO_UNSAVED')
        if (this.html.length > 9 && this.json) { // FIXME: There is an error here
          this.$store.commit('UPDATE_DOC_CONTENT', {
            id: this.id,
            content: this.html,
            title: this.json.content[0].content[0].text
              ? this.json.content[0].content[0].text
              : 'Edit this doc'
          });
        } else {
          this.$store.commit('UPDATE_DOC_CONTENT', {
            id: this.id,
            content: 'Untitled',
            title: 'Untitled'
          });
        }
      }
    });
    this.editor.setContent(this.content);
  },
  methods: {
    setStateTo: function(value) {
      this.state = value;
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
