<template>
  <b-row no-gutters class="font-weight-bold">
    <b-col class="text-left">
        <router-link :to="'/'">
            <font-awesome-icon icon="angle-double-left" class="mr-1" />
            Retour à l'accueil
        </router-link>
    </b-col>
    <b-col class="text-right">
        <router-link v-if="previous" :to="'/vote/' + previous">
            <font-awesome-icon icon="caret-left" class="mr-1" />
            Vote précédent
        </router-link>
        <span class="mx-1" v-if="next && previous">|</span>
        <router-link v-if="next" :to="'/vote/' + next">
            Vote suivant
            <font-awesome-icon icon="caret-right" class="ml-1" />
        </router-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
    props: {
        next: { type: String, default: null },
        previous: { type: String, default: null },
    },
}
</script>

<style>

</style>