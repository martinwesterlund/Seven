<template>
  <div>
    <div id="wrapper">
      <div id="bg"></div>
      <div id="logo">7an</div>
      <button>Regler</button>
      <button>START</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');
#wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-family: 'Fredoka One', cursive;
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
  font-size: 75px;
  margin: 25vh 0;
  color: #fff;
  /* animation: logo 0.5s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse; */
}
button {
  padding: 10px;
  font-size: 30px;
  animation: button 0.5s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
}
@keyframes logo {
  0% {
    transform: scale(1) rotate(-5deg);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1) rotate(5deg);
  }
}

@keyframes button {
  0% {
    transform: scaleX(1) scaleY(1.05);
  }
  /* 50% {
    
    transform: scaleX(1.05) scaleY(1.05);
  } */
  100% {
    transform: scaleX(1.05) scaleY(1);
  }
}

@keyframes bg{
    0% {
        left: 10px;
        transform: scale(1.5);
    }
    /* 25% {
        left: -10px;
        transform: scale(2);
    }
    75% {
        left: 0px;
        transform: scale(1.5);
    } */
    100% {
        left: 10px;
        transform: scale(2);
    }

}
</style>