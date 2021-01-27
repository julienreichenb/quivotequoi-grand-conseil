<template>
  <b-container id="error">
      <h1 class="text-nouvelliste">La page que vous cherchez n'existe pas ou plus.</h1>
      <router-link to="/">Retour à l'accueil</router-link>
  </b-container>
</template>

<script>
export default {
  metaInfo: {
    titleTemplate: 'Page introuvable | %s'
  }
}
</script>

<style>
#error {
  margin-top: 25vh !important;
}
</style>