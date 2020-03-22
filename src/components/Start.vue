<template>
  <div>
    <div id="wrapper">
      <div class="logo1">
        <div id="logo">
          <span id="s">S</span>
          <span id="j">7</span>
          <span id="u">U</span>
          <span id="a">A</span>
          <span id="n">N</span>
        </div>
      </div>
      <div id="logo-text-wrapper">
        <div id="logo-text">- med Westerlundska regler</div>
      </div>
      <router-link to="/about">
        <div id="about1">
          <button id="about">Om spelet</button>
        </div>
      </router-link>
      <router-link to="/setup">
        <div id="setup1">
          <button id="setup">Spelinställningar</button>
        </div>
      </router-link>
      <router-link to="/game">
        <div id="start1">
          <button id="start">SNABBSTART!</button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showFooter() {
      this.$store.commit("showFooter");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Slackey&display=swap");

#wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#logo {
  margin-right: 15px;
  font-size: 80px;
  text-shadow: 0 0 10px #000;
  text-align: center;
  color: #fff;
  letter-spacing: -15px;
  animation: logo 2s linear;
}

#j {
  color: #ff5100;
  transform: rotate(50deg);
}
.logo1 {
  width: 80%;
  margin-top: 10vh;
  animation: logo-infinite 2s linear;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}
#logo-text-wrapper {
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-delay: 1s;

  animation-fill-mode: forwards;
}
#logo-text {
  color: #fff;
  font-size: 16px;
  text-shadow: 0 0 10px #000;
  margin-bottom: 10vh;
  animation: button 2s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#about1 {
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-delay: 1.3s;
  animation-fill-mode: forwards;
}

#setup1 {
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-delay: 1.6s;
  animation-fill-mode: forwards;
}

#start1 {
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-delay: 1.9s;
  animation-fill-mode: forwards;
}

#setup {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 25px;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 0.3s;
  cursor: pointer;
}
#about {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 25px;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  cursor: pointer;
}
#start {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 25px;
  animation: glow 0.7s ease-in-out infinite alternate;
  animation-delay: 0.6s;
  cursor: pointer;
}

@keyframes fade-in {
  from {
    opacity: 0;

    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes logo {
  0% {
    transform: translateY(-100vh);
  }

  60% {
    transform: scaleX(1) scaleY(1) translateX(0px);
    transform-origin: bottom center;
  }

  80% {
    transform: scaleX(1.1) scaleY(0.7) translateX(0px);
    transform-origin: bottom center;
  }

  100% {
    transform: scaleX(1) scaleY(1) translateX(0px);
    transform-origin: bottom center;
  }
}

@keyframes logo-infinite {
  0% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
  25% {
    transform: scaleX(1.025) scaleY(0.975) rotate(0deg);
  }
  50% {
    transform: scaleX(1) scaleY(1.05) rotate(0deg);
  }
  75% {
    transform: scaleX(0.975) scaleY(1.025) rotate(0deg);
  }
  100% {
    transform: scaleX(1) scaleY(1) rotate(0deg);
  }
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

@keyframes glow {
  0% {
    transform: scaleX(1) scaleY(1.05);

    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #000, 0 0 4px #000,
      0 0 5px #000, 0 0 6px #000, 0 0 7px #000;
  }

  50% {
    transform: scaleX(1.025);
  }
  100% {
    transform: scaleX(1.05) scaleY(1);
    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #fff, 0 0 4px #fff,
      0 0 5px #fff, 0 0 6px #fff, 0 0 7px #fff;
  }
}
</style>