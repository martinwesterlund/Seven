<template>
  <div>
    <div id="wrapper">
      <h1>Ställning</h1>
      <ol>
      <li
        v-for="player in orderedPlayers"
        :key="player.name"
      >{{ player.name }} {{player.totalScore}}</li>
    </ol>
    </div>
    
  </div>
</template>

<script>
export default {
  computed: {
    // state() {
    //   return this.$store.state;
    // },
    // players() {
    //   return this.$store.state.players;
    // },
    orderedPlayers() {
      let sortedList = this.$store.state.players.slice()
      return sortedList.sort((a, b) => a.totalScore - b.totalScore);
    }
  }
};
</script>

<style>
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
</style>