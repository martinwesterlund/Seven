<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="game-area">
      <div id="game-field">
        <div
          :id="playedCard.name"
          v-for="playedCard in state.playedCards"
          :key="playedCard.name"
          :style="[playedCard.card.suit == '♥' || playedCard.card.suit == '♦' ? {color:'red'} : {color:'black'}]"
        >
          <div
            v-if="playedCard.card.suit != undefined"
            class="played-card"
            :class="[{ fadeInCard: playedCard.card.isPlayable }, {unknownCard: ((playedCard.card.uniqueValue + 12) % 13 === 0) || (playedCard.card.uniqueValue % 13) === 0}]"
          >
            <div
              v-show="(playedCard.card.value !== 'A' && playedCard.card.value !=='K')"
            >{{playedCard.card.suit + ' ' + playedCard.card.value}}</div>
          </div>
          <div v-else class="no-played-card">{{playedCard.card}}</div>
        </div>
      </div>

      <div id="players-area">
        <div
          class="cpu"
          v-for="player in cpus"
          :key="player.name"
          :class="[{ myTurn: 'player'+ state.playersTurn === player.name}, { showAll: state.roundOver}]"
        >
          <div class="box">
            <span class="the-box" v-show="player.hasTheBox"><i class="fa fa-bomb"></i></span>
            <div v-if="state.round > 0">{{ player.alias }}</div>
            <span class="round-score" v-if='state.roundOver'>  {{player.roundScore}}</span>
          </div>
          <div class="card-area">
            <div
              class="card"
              @click="placeCard(card, player)"
              v-for="card in player.cards"
              :key="card.index"
              :style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
              :class="[{playable : card.isPlayable && state.helpOn}, {cpu : player.type === 'cpu'}, {cardSlide : card.slideEffectOn}]"
            >
              <div v-if="state.roundOver" class="inner-card">
                <div>{{card.suit}}</div>
                <div>{{card.value}}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="state.round > 0"
          id="player"
          :class="[{ myTurn: 'player'+ state.playersTurn === state.players[0].name}, { showAll: state.roundOver}]"
        >
          <div class="box">
            <span
                class="the-box"
                v-show="state.players[0].hasTheBox"
              ><i class="fa fa-bomb"> </i></span>
            <div v-if="state.round > 0">{{state.players[0].alias}}</div>
              <span class="round-score" v-if='state.roundOver'>{{state.players[0].roundScore}}</span>
            
          </div>
          <div class="card-area">
            <div
              class="card"
              @click="placeCard(card, state.players[0])"
              v-for="card in state.players[0].cards"
              :key="card.index"
              :style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
              :class="[{playable : card.isPlayable && state.helpOn}, {cpu : state.players[0].type === 'cpu'}, {cardSlide : card.slideEffectOn}]"
            >
              <div class="inner-card">
                <div>{{card.suit}}</div>
                <div>{{card.value}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="btn-bar">
      <button v-if="!state.roundOver && state.round === 0" @click="startGame()">Dela ut kort</button>
      <button v-if="state.ableToPlay == false && state.playersTurn === 1" @click="pass()">Pass!</button>
      <button v-if="state.roundOver" @click="newRound()">Ny rond!</button>
    </div>
    
    
  </div>
</template>

<script>
// import FooterBar from "./FooterBar.vue";
export default {
  components: {
    
  },
  computed: {
    state() {
      return this.$store.state;
    },
    cpus() {
      return this.$store.state.players.slice(
        1,
        this.$store.state.numberOfOpponents + 1
      );
    }
    // deck(){
    //   return this.$store.state.deck
    // }
  },
  methods: {
    startGame() {
      this.$store.commit("startGame");
    },
    newRound() {
      this.$store.commit("newRound");
    },
    pass() {
      this.$store.commit("pass");
    },
    // placeCard(card, player) {
    //   this.$store.commit("placeCard", { card, player });
    // }
    placeCard(card, player) {
      this.$store.dispatch("slideAwayCard", { card, player });
    }
  },
  name: "Game"
};
</script>

<style scoped lang="scss">
$card-color: #323136;
$playable-card: #a2ff95;

body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

#btn-bar {
  // position: absolute;
  // bottom: 55px;
  margin-top: 30px;
  width: 100vw;
  display: flex;
  justify-content: center;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-shadow: 0 0 10px #000;
  // padding: 10px;
  font-family: "Slackey", cursive;
  font-size: 26px;
  animation: button 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 0.3s;
  cursor: pointer;
}
#game-area {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

#game-field {
  width: 95%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  margin: 2vh auto 1vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "S8-K H8-K K8-K R8-K" "S7 H7 K7 R7" "S6-E H6-E K6-E R6-E";
}

#game-field :nth-child(5) {
  transform: rotate(-90deg);
}
#game-field :nth-child(6) {
  transform: rotate(-90deg);
}
#game-field :nth-child(7) {
  transform: rotate(-90deg);
}
#game-field :nth-child(8) {
  transform: rotate(-90deg);
}
.played-card,
.no-played-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14vw;
  height: 21vw;
  margin: 0vw 4vw;
  background-color: #fff;
  transform: rotate(-5deg);
}

.played-card {
  background-color: white;
  /* font-size: 10px; */
  border: 1px solid black;
  border-radius: 4px;
}

.no-played-card {
  border: 1px dashed black;
  opacity: 0.2;
  font-size: 30px;
}

#players-area {
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin: 5px auto;
  padding: 0;
}

.box {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Slackey", cursive;
  font-weight: normal;
  min-width: 50px;
  font-size: 14px;
}

.the-box {
  font-weight: bold;
  color: #000;
  margin-right: 5px;
  font-size: 12px;
  text-shadow: 0 0 4px #fff;
  animation: alive 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 0.3s;
}

.round-score{
  margin-left: 20px;
  color: #cec107;
  animation: alive 0.7s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: 0.3s;
}
.cpu {
  display: flex;
  flex-direction: column;
  margin-bottom: 1px;
  opacity: 0.2;
}
.cpu .card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 8vw;
  margin: 2px;
  background-color: #fff;
  opacity: 1;
  pointer-events: none;
  border-radius: 2px;
}

.showAll{
  opacity: 1 !important;
}
#player {
  display: flex;
  flex-direction: column;
  left: 100px;
  margin-bottom: 5px;
  opacity: 0.2;
}
#player .card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  min-width: 3vw;
  width: 7vw;
  height: 10vw;
  margin: 3px;
  background-color: #fff;
}

/* .card:active{
  scale: 2;
  background-color:lawngreen;
} */

.cpu .card-area {
  height: 10vw;
  display: flex;
  // flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  // margin-bottom: 5px;
  /* pointer-events: none; */
}

#player .card-area {
  width: 100%;
  height: 10vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  // margin-bottom: 5px;
  /* pointer-events: none; */
}

.myTurn {
  pointer-events: all;
  opacity: 1 !important;
}

.inner-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  // background-color:#fff;
  text-align: center;
}

.cpu .inner-card{
  background-color: #fff;
}

.card:active {
  transform: scale(2) translateY(-20px);
}

/* #player .card-area{
  overflow-x: scroll;
  overflow-y: auto;
} */

/* .myTurn {
  opacity: 1 !important;
  pointer-events: all !important;
} */

/* .hasTheBox {
  opacity: 1;
} */

.unknownCard {
  /* width: 100px;
  min-height: 150px; */

  border: 1px solid black;
  /* opacity: 1; */
  background-color: $card-color !important;
  animation-name: flipCard;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  /* color: $card-color; */
}

/* .card {
  font-size: 20px;
  margin: 4px 2px;
  min-width: 45px;
  height: 75px;
  border: 1px solid black;
  cursor: pointer;

} */

/* .card:last-child{
  flex: 0 0 auto;
}

.innerCard{
  width: 40px;
  height: 75px;
} */

.playable {
  background-color: $playable-card !important;
  /* animation-name: playable;
  animation-duration: 0.5s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite; */
}

.cardSlide {
  animation: slideCard 0.5s linear;
  /* transform: translateX(400px);
  opacity: 0; */
}

.cpu .card {
  /* color: $card-color !important; */
  background-color: $card-color !important;
}

#s7 {
  grid-area: S7;
  /* opacity: 0.8; */
}

#h7 {
  grid-area: H7;
  color: red !important;
}

#r7 {
  grid-area: R7;
  color: red !important;
}

#k7 {
  grid-area: K7;
}

#s8 {
  grid-area: S8-K;
}

#h8 {
  grid-area: H8-K;
}

#r8 {
  grid-area: R8-K;
}

#k8 {
  grid-area: K8-K;
}

#s6 {
  grid-area: S6-E;
}

#h6 {
  grid-area: H6-E;
}

#r6 {
  grid-area: R6-E;
}

#k6 {
  grid-area: K6-E;
}

// #footer {
//   width: 100%;
//   height: 50px;
//   margin: 0;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   position: fixed;
//   bottom: 0%;
//   opacity: 0;
//   animation-name: footer-fade;
//   animation-duration: 2s;
//   animation-fill-mode: forwards;
//   animation-delay: 1s;
// }

// #footer-bg {
//   width: 100%;
//   height: 50px;
//   position: fixed;
//   background-color: #003a00;
//   opacity: 0.6;
//   z-index: -1;
// }

// i {
//   color: #fff;
//   font-size: 30px;
//   opacity: 1;
// }

.fadeInCard {
  animation-name: fadeIn;
  animation-duration: 0.5s;
}

@keyframes footer-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    background-color: black;
  }
  to {
    background-color: #fff;
  }
}

@keyframes flipCard {
  from {
    transform: rotate(-5deg) rotateY(0deg);
  }
  to {
    transform: rotate(5deg) rotateY(180deg);
  }
}
@keyframes playable {
  from {
    background-color: #80f880;
  }
  to {
    background-color: #fff;
  }
}
@keyframes slideCard {
  0% {
    opacity: 1;
    transform: translateY(0vh) scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translateY(-25vh) scale(3) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-50vh) scale(1) rotate(360deg);
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

@keyframes alive {
  0% {
    transform: scaleX(1) scaleY(1.2);
  }
  50% {
    transform: scaleX(1.2);
  }
  100% {
    transform: scaleX(1.2) scaleY(1);
  }
}
</style>