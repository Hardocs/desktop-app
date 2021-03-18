<template>
  <div class="editor_menubar">
    <v-container class="d-flex justify-space-between">
      <SaveFile :isSaved="docIsSaved" :docId="docId"> </SaveFile>
      <span>
        <v-btn
          @click="editMode = false"
          :color="!editMode ? 'primary' : ''"
          class="mr-3"
          outlined
          rounded
        >
          Preview
        </v-btn>
        <v-btn
          :elevation="editMode ? 5 : 2"
          rounded
          icon
          @click="editMode = true"
          :color="editMode ? 'primary' : ''"
          class="mr-3"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          elevation="2"
          rounded
          icon
          @click="confirmDelete(id)"
          class="mr-3"
          :disabled="isEntry"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </span>
    </v-container>

    <v-divider class="mb-4"></v-divider>
  </div>
</template>
<script>
export default {};
</script>