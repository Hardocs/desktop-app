<template>
<div class="flex">
    <button class="primary-button" @click="selectFolder()">
        Select standard
    </button>
    <p>{{this.$store.state.metadata.schemasRef}}</p>
</div>
</template>
<script>
export default {
    name: 'SchemasDir',
    data:() => {
        return {
            schemasList: []
        }
    },
    methods: {
        selectFolder(){
            this.$store.dispatch('setSchemasDir')
            // this.$store
        }
    }
}
</script>