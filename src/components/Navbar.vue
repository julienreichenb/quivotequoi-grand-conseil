<template>
    <b-navbar type="light" id="header">
        <b-navbar-brand to="/">
            <span class="font-weight-bold">Qui vote quoi ?</span>
        </b-navbar-brand>           
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/tous-les-votes">
                    Historique des votes
                </b-nav-item>
                <b-nav-item to="/a-propos">
                    À propos
                </b-nav-item>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="https://www.lenouvelliste.ch/">
                    <img src="../assets/images/logo-nouvelliste.gif" height="25" class="d-inline-block align-top" alt="Accueil">
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {

}
</script>

<style>
#header {
    box-shadow: 0px 5px 10px rgba(255, 0, 0, 0.3);
}
</style>