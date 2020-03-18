<template>
  <div id="app">
    <div id="bg"></div>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
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
    this.$store.commit("createDeck");
    this.$store.commit("createPlayers");
  },
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Slackey&display=swap");


body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Slackey", cursive;
  background-color: #006e09;
}
#bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url("assets/cards.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -5;
  opacity: 0.1;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: scale(1.5);
}


</style>
