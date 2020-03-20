<template>
  <div>
    <div id="gamesetup-wrapper">
      <h3>Antal motspelare: {{ state.numberOfOpponents }}</h3>
      <vue-slider id="slider1" v-model="state.numberOfOpponents" v-bind="state.opponentsOptions" />
      <h3>Spelet slut när någon når upp till: {{ state.endScore }} p</h3>
      <vue-slider id="slider2" v-model="state.endScore" v-bind="state.endScoreOptions" />
      <router-link to="/">
        <button id="ok" @click='resetGame'>OK!</button>
      </router-link>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css"
      />
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
export default {
  components: {
    VueSlider
  },
  computed: {
    state() {
      return this.$store.state;
    }
  },
  methods: {
    resetGame(){
      this.$store.commit('createPlayers')
      this.$store.commit('newRound')

    }
  }
};
</script>

<style scoped>
#gamesetup-wrapper {
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
  text-align: center;
}

#slider-info {
  display: flex;
  margin: 0 auto;
}

#slider1, #slider2 {
  margin: 0px 20% 20px;
}

#slider2{
  margin-bottom: 15vh;
}

p {
  text-align: center;
  margin: 20px;
}

#ok {
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
  margin: 0 auto;
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