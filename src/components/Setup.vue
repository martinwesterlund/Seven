<template>
  <div>
    <div id="gamesetup-wrapper">
      <h3>
        Antal motspelare:
        <span>{{state.numberOfOpponents}}</span>
      </h3>
      <vue-slider id="slider1" v-model="state.numberOfOpponents" v-bind="state.opponentsOptions" />
      <h3>
        Spelet slut vid:
        <span>{{state.endScore}}</span> p
      </h3>
      <vue-slider id="slider2" v-model="state.endScore" v-bind="state.endScoreOptions" />
      <h3>
        Speltempo:
        <span>{{ state.speed }}</span>
      </h3>
      <vue-slider id="slider" v-model="state.speed" v-bind="state.speedOptions" />
      <h3>Hjälpmedel</h3>
      <h5>Visa spelbara kort</h5>
      <div id="slider-info">
        <span :class="{notSelected : state.helpOn}">Av</span>
        <label class="switch">
          <input id="switchValue" v-model="state.helpOn" type="checkbox" />
          <span class="slider round"></span>
        </label>
        <span :class="{notSelected : !state.helpOn}">På</span>
      </div>
      <router-link to="/game">
        <button id="ok" @click="resetGame">SPELA!</button>
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
    resetGame() {
      this.$store.commit("createPlayers");
      this.$store.commit("newRound");
    }
  }
};
</script>

<style scoped>
#gamesetup-wrapper {
  padding: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
  text-align: center;
}

#slider-info {
  display: flex;
  margin: 0 auto;
}

#slider,
#slider1,
#slider2 {
  margin: 0px 20% 20px;
}
h3 {
  margin-bottom: 10px;
}
h5 {
  margin-top: 0;
}

span {
  color: #cec107;
}

.notSelected {
  color: #fff;
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
  margin: 40px auto 0;
}

.switch {
  position: relative;
  width: 60px;
  height: 34px;
  margin: 0 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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