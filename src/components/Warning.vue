<template>
  <div>
    <div id="warning-wrapper">
      <h1 id="header">?!?!?</h1>
      <p>Är du säker på att du vill avsluta matchen?</p>
      <router-link to="/">
        <button @click='resetGame' id="yes">Ja</button>
      </router-link>
      <router-link to="/game">
        <button id="no">Nej</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
    resetGame(){
      this.$store.commit('createPlayers')
      this.$store.commit('newRound')

    }
  }
};
</script>

<style scoped>

#warning-wrapper {
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



p{
  text-align: center;
  margin: 20px;
  margin-bottom: 15vh;
}

#yes, #no {
  
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

#header{
    color: #e60808;
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