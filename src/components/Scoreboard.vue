<template>
  <div>
    <div id="wrapper">
      <h1 v-if= "state.gameOver">Slutställning</h1>
      <h1 v-else>Ställning</h1>
      <ol>
      <li
        v-for="player in orderedPlayers"
        :key="player.name"
        :class="{you : player.name === 'player1'}"
      >{{ player.alias }} : {{player.totalScore}}</li>
    </ol>
    <router-link to="/">
        <button @click="resetGame" v-if= "state.gameOver" id="back">Spela igen</button>
      </router-link>
    </div>
    
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.state;
    },
    // players() {
    //   return this.$store.state.players;
    // },
    orderedPlayers() {
      let sortedList = this.$store.state.players.slice()
      return sortedList.sort((a, b) => a.totalScore - b.totalScore);
    }
  },
  methods: {
    resetGame() {
      this.$store.commit("createPlayers");
      this.$store.commit("newRound");
    }
  }
};
</script>

<style scoped>
#wrapper {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
}

.you{
  color: #cec107;
}

#back {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 30px;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}

@keyframes button {
  0% {
    transform: scaleX(1) scaleY(1.05);
  }
  50% {
    transform: scaleX(1.025);
  }
  100% {
    transform: scaleX(1.05) scaleY(1);
  }
}

</style>