<template>
  <div>
    <Header title="Qui vote quoi ?" text="Résultats des votes du Grand Conseil Valaisan" />
    <b-container class="text-left">
      <div class="lead">
        <h3 class="text-nouvelliste">Titre</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra quam. In eu libero tristique, vulputate tortor in, varius est. Donec cursus felis ac ligula suscipit dictum. Sed semper metus mauris, quis posuere justo auctor sed. Praesent tristique finibus orci, vel rutrum ipsum ultricies sed. Sed posuere sed nibh in elementum.</p>
        <h3 class="text-nouvelliste">Titre</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra quam. In eu libero tristique, vulputate tortor in, varius est. Donec cursus felis ac ligula suscipit dictum. Sed semper metus mauris, quis posuere justo auctor sed. Praesent tristique finibus orci, vel rutrum ipsum ultricies sed. Sed posuere sed nibh in elementum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra quam. In eu libero tristique, vulputate tortor in, varius est. Donec cursus felis ac ligula suscipit dictum. Sed semper metus mauris, quis posuere justo auctor sed. Praesent tristique finibus orci, vel rutrum ipsum ultricies sed. Sed posuere sed nibh in elementum.</p>
      </div>
      <VoteSelection />
    </b-container>
  </div>
</template>

<script>
import Header from './utils/Header'
import VoteSelection from './votes/VoteSelection'
export default {
  components: {
    Header,
    VoteSelection,
  },
  metaInfo: {
    titleTemplate: 'Accueil | %s'
  }
}
</script>

<style>

</style>