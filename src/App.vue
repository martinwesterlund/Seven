<template>
  <div id="app">
    <Start />
    <!-- <Navbar /> -->
    <!-- <Game /> -->
    <!-- <Scoreboard /> -->
    <!-- <Settings /> -->
  </div>
</template>

<script>
// import Navbar from "./components/Navbar.vue"
// import Game from "./components/Game.vue"
// import Scoreboard from "./components/Scoreboard.vue"
// import Settings from "./components/Settings.vue"
import Start from "./components/Start.vue"

export default {
  components: {
    // Navbar,
    // Game
    // Scoreboard,
    // Settings
    Start
  },
  created() {
    this.$store.commit('createDeck');
    this.$store.commit('createPlayers')
  },
  name: "app"
};
</script>

<style>

body{
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #006e09;
    
}

</style>
