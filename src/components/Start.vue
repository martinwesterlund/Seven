<template>
  <div>
    <div id="wrapper">
      <div id="bg"></div>
      <div class="logo1">
        <div id="logo">
          <span id="s">S</span>
          <span id="j">7</span>
          <span id="u">U</span>
          <span id="a">A</span>
          <span id="n">N</span>
        </div>
      </div>
      <div id="logo-text">- med Westerlundska regler</div>

      <button>Regler</button>
      <button id="start">START</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fredoka+One&display=swap");
@import url("https://fonts.googleapis.com/css?family=Slackey&display=swap");
#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Slackey", cursive;
}

#bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../assets/cards.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -5;
  opacity: 0.1;

  animation: bg 5s ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  overflow: hidden;
}
#logo {
  font-size: 100px;
  text-shadow: 0 0 10px #000;

  color: #fff;
  letter-spacing: -15px;
  animation: logo 2s linear;
}

#j {
  color: red;
  transform: rotate(50deg);
}
.logo1 {
    margin-top: 25vh;
  animation: logo-infinite 2s linear;
  animation-iteration-count: infinite;
  animation-direction: reverse;
}

#logo-text {
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
  margin-bottom: 25vh;
  animation: button 2s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 40px;
  animation: button 0.5s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

#start {
  animation: glow 0.5s ease-in-out infinite alternate;
}

@keyframes logo {
  0% {
    transform: translateX(-100vh);
  }

  60% {
    transform: scaleX(1) scaleY(1) translateX(0px);
    transform-origin: right center;
  }

  80% {
    transform: scaleX(0.2) scaleY(1.7) translateX(0px);
    transform-origin: right center;
  }

  100% {
    transform: scaleX(1) scaleY(1) translateX(0px);
    transform-origin: right center;
  }
}

@keyframes logo-infinite {
  0% {
    transform: scaleX(1) scaleY(1) rotate(-1deg);
  }
  25% {
    transform: scaleX(1.025) scaleY(0.975) rotate(0deg);
  }
  50% {
    transform: scaleX(1) scaleY(1.05) rotate(1deg);
  }
  75% {
    transform: scaleX(0.975) scaleY(1.025) rotate(0deg);
  }
  100% {
    transform: scaleX(1) scaleY(1) rotate(-1deg);
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
    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #fff, 0 0 4px #fff,
      0 0 5px #fff, 0 0 6px #fff, 0 0 7px #fff;
  }

  50% {
    transform: scaleX(1.025);
  }
  100% {
    transform: scaleX(1.05) scaleY(1);
    text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 3px #000, 0 0 4px #000,
      0 0 5px #000, 0 0 6px #000, 0 0 7px #000;
  }
}
</style>