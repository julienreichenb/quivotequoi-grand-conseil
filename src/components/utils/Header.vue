<template>
    <b-container fluid class="mb-5">
        <div class="custom-header p-3 rounded text-light" :class="'bg-' + variant">
            <h1 class="text-uppercase">{{ title }}</h1>
            <h3>{{ text }}</h3>
        </div>
    </b-container>
</template>

<script>
export default {
    props: {
        variant: { type: String, default: 'dark '},
        title: { type: String, required: true },
        text: { type: String, default: '' },
    }
}
</script>

<style>
.custom-header {
    box-shadow: 3px 3px 5px darkgray;
}
</style>