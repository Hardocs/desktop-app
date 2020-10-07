<template>
    <div>
        <JsonEditor :is-edit="true" v-model="jsonData"></JsonEditor>
    </div>
</template>
<script>
import JsonEditor from 'vue-edit-json'
export default {
    name: 'MetadataViewerEditor',
    components: { JsonEditor }
}
</script>