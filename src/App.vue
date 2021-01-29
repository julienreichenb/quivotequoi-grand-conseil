<template>
  <div id="app">
    <Navbar />
    <router-view id="content" />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  metaInfo: {
    titleTemplate(title) {
      const suffix = "Qui Vote Quoi ?"
      return title ? `${title} | ${suffix}` : suffix
    },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');

h1 {
  font-weight: bold !important;
}

#app {
  font-family: 'Titillium Web', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#content {
  margin: 40px 0 100px 0;
}

.section {
  text-align: left;
  h2 {
    margin-top: 30px;
  }
}

.bg-nouvelliste {
  background-color: #cc0404 !important;
}

.text-nouvelliste {
  color: #cc0404 !important;
}

.border-nouvelliste {
  border-color: #cc0404 !important;
}
</style>
