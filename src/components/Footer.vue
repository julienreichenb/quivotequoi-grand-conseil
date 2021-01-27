<template>
  <b-row id="footer" class="border-top border-secondary bg-white text-center py-2 fixed-bottom">
      <b-col sm="3" class="px-5">
          <span class="text-muted small">© {{ today }} Qui vote quoi - HES-SO Valais/Wallis</span>
      </b-col>
      <b-col class="px-5 text-right">
          <a href="https://www.hevs.ch/fr/">
            <img src="../assets/images/logo-hes-so.png" target="_blank" height="20">
          </a>
      </b-col>
  </b-row>
</template>

<script>
export default {
    computed: {
        today() {
            return new Date().getFullYear()
        }
    }
}
</script>

<style>
#footer {
    z-index: 10000 !important;
}
</style>