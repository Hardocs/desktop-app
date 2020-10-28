<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click="commands.bold"
      >
        <icon name="bold" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click="commands.italic"
      >
        <icon name="italic" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.strike() }"
        @click="commands.strike"
      >
        <icon name="strike" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.underline() }"
        @click="commands.underline"
      >
        <icon name="underline" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code() }"
        @click="commands.code"
      >
        <icon name="code" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.paragraph() }"
        @click="commands.paragraph"
      >
        <icon name="paragraph" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
        @click="commands.heading({ level: 1 })"
      >
        H1
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
        @click="commands.heading({ level: 2 })"
      >
        H2
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
        @click="commands.heading({ level: 3 })"
      >
        H3
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click="commands.bullet_list"
      >
        <icon name="ul" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click="commands.ordered_list"
      >
        <icon name="ol" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.blockquote() }"
        @click="commands.blockquote"
      >
        <icon name="quote" />
      </button>

      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.code_block() }"
        @click="commands.code_block"
      >
        <icon name="code" />
      </button>

      <button class="menubar__button" @click="commands.horizontal_rule">
        <icon name="hr" />
      </button>

      <button class="menubar__button" @click="commands.undo">
        <icon name="undo" />
      </button>

      <button class="menubar__button" @click="commands.redo">
        <icon name="redo" />
      </button>
    </div>
  </editor-menu-bar>
</template>

<script>
export default {
  name: 'EditorMenuBar'
};
</script>

<style></style>
