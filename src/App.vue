<template>
  <div id="app">
    <Game />
    <Scoreboard />
    <Settings />
  </div>
</template>

<script>
import Game from "./components/Game.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Settings from "./components/Settings.vue";

export default {
  components: {
    Game,
    Scoreboard,
    Settings
  },
  created() {
    this.$store.commit("createDeck");
  },
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
