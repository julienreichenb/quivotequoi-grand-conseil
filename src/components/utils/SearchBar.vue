<template>
    <b-input-group>
        <b-form-input type="text" placeholder="Rechercher un terme..." v-model="query" />
        <b-input-group-append>
            <b-button variant="danger" class="bg-nouvelliste" @click="$emit('search', query)">
                <font-awesome-icon icon="search" class="mr-2" />
                Rechercher
            </b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
export default {
    data() {
        return {
            query: null,
        }
    },
}
</script>

<style>

</style>