<template>
  <div>
    <div class="game-area">
      <div class="players-area">
        <div
          class="player"
          v-for="player in state.players"
          :key="player.name"
          :class="[{ myTurn: 'player'+ state.playersTurn === player.name}, {hasTheBox : player.hasTheBox === true}]"
        >
          {{player.name}}
          <div
            class="card"
            @click="placeCard(card, player)"
            v-for="card in player.cards"
            :key="card.index"
            :style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
            :class="[{playable : card.isPlayable}, {cpu : player.type === 'cpu'}]"
          >
            <div class="innerCard">{{card.suit + ' ' + card.value}}</div>
          </div>
        </div>
      </div>
      <div class="game-field">
        <vue-slider v-model="state.speed" v-bind='state.vueSliderOptions' />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-slider-component@latest/theme/default.css">
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
          >{{playedCard.card.suit + ' ' + playedCard.card.value}}</div>
          <div v-else class="no-played-card">{{playedCard.card}}</div>
        </div>
      </div>
    </div>

    <button v-if='!state.roundOver && state.round === 0' @click="startGame()">Dela ut kort</button>
    <button v-if="state.ableToPlay == false" @click="pass()">Pass!</button>
    <button v-if='state.roundOver' @click='newRound()'>Ny rond!</button>
    <div v-if="state.playersTurn!=null">Spelare {{ state.playersTurn }}s tur</div>
    
    <Scoreboard></Scoreboard>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import Scoreboard from './Scoreboard'
export default {
  components: {
    VueSlider,
    Scoreboard
  },
  computed: {
    state() {
      return this.$store.state;
    }
    // deck(){
    //   return this.$store.state.deck
    // }
  },
  methods: {
    startGame() {
      this.$store.commit("startGame");
    },
    newRound(){
      this.$store.commit('newRound')
    },
    pass() {
      this.$store.commit("pass");
    },
    placeCard(card, player) {
      this.$store.commit("placeCard", { card, player });
    }
  },
  name: "Game"
};
</script>

<style scoped>
.game-area {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}

.players-area{
  min-width: 650px;
}
.player {
  display: flex;
  opacity: 0.2;
  pointer-events: none;

  width: 350px;
}

.myTurn {
  opacity: 1;
  pointer-events: all;
}

.hasTheBox{
  border-left: 5px solid red;
}

.unknownCard {
  width: 100px;
  min-height: 150px;
  border: 2px solid black;
  /* opacity: 1; */

  background-color: lightblue !important;
  animation-name: flipCard;
  animation-duration: 0.5s;
  color: lightblue;
}

.card {
  font-size: 20px;
  margin: 4px 2px;
  min-width: 45px;
  height: 75px;
  border: 1px solid black;
  cursor: pointer;

  /* flex: 1 0 0;
  overflow-x: hidden; */
}

/* .card:last-child{
  flex: 0 0 auto;
}

.innerCard{
  width: 40px;
  height: 75px;
} */

.playable {
  background-color: #cdffcd;
}

.cpu {
  color: lightblue !important;
  background-color: lightblue;
}

.game-field {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "S8-K H8-K K8-K R8-K" "S7 H7 K7 R7" "S6-E H6-E K6-E R6-E";
}

#s7 {
  grid-area: S7;
}

#h7 {
  grid-area: H7;
}

#r7 {
  grid-area: R7;
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

.game-field div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  margin: 5px;
}

.played-card {
  background-color: white;
  width: 100px;
  min-height: 150px;
  border: 2px solid black;
  border-radius: 8px;
}

.fadeInCard {
  animation-name: fadeIn;
  animation-duration: 0.5s;
}
.no-played-card {
  width: 100px;
  min-height: 150px;
  border: 2px dashed black;
  opacity: 0.2;
}

@keyframes fadeIn {
  from {
    background-color: black;
  }
  to {
    background-color: white;
  }
}

@keyframes flipCard {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
}
</style>