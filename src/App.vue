<template>
  <div id="app">
    <div id="bg"></div>
    <!-- <Start /> -->
    <!-- <Navbar /> -->
    <!-- <Game /> -->
    <!-- <Scoreboard /> -->
    <!-- <Settings /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Navbar from "./components/Navbar.vue"
// import Game from "./components/Game.vue"
// import Scoreboard from "./components/Scoreboard.vue"
// import Settings from "./components/Settings.vue"
// import Start from "./components/Start.vue"

export default {
  components: {
    // Navbar,
    // Game
    // Scoreboard,
    // Settings
    // Start
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
#bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("assets/cards.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -5;
  opacity: 0.1;
}

</style>
