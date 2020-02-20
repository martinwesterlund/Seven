<template>
  <div>
    <ol>
      <li
        v-for="player in orderedPlayers"
        :key="player.name"
      >{{ player.name }} {{player.totalScore}}</li>
    </ol>
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
body {
    width: 200px;
    
}
</style>