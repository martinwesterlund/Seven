<template>
  <div>
    <div class="game-area">
      <div class="players-area">
        <div class="player" v-for="player in state.players" :key="player.name" :class="{ myTurn: 'player'+ state.playersTurn === player.name}">
          {{player.name}}
          <div
            class="card"
            @click='placeCard(card, player)'
            v-for="card in player.cards"
            
            :key="card.index"
            :style="[card.suit == '♥' || card.suit == '♦' ? {color:'red'} : {color:'black'}]"
          >{{card.suit + ' ' + card.value}}</div>
        </div>
      </div>
      <div class="game-field">
       
        <div :id='playedCard.name' v-for='playedCard in state.playedCards' :key='playedCard.name' :style="[playedCard.card.suit == '♥' || playedCard.card.suit == '♦' ? {color:'red'} : {color:'black'}]">
         <div v-if='((playedCard.card.uniqueValue + 12) % 13 === 0) || (playedCard.card.uniqueValue % 13) === 0' class='unknown-card'></div>
          <div v-else-if='playedCard.card.suit != undefined' class='played-card'>{{playedCard.card.suit + ' ' + playedCard.card.value}} </div>
          
          <div v-else class='no-played-card'>{{playedCard.card}}</div>
          
          
        </div>
        
      </div>
    </div>

    <button @click="startGame()">Dela ut kort</button>
    <button @click="sortCards()">Sortera</button>
    <button v-if='state.ableToPlay == false' @click="pass()">Pass!</button>
    <div v-if='state.playersTurn!=null'>Spelare {{ state.playersTurn }}s tur</div>
    <div>{{ state.playedCardsArray}}</div>
  </div>
</template>

<script>
export default {
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
      this.$store.commit('startGame')
    },
    pass(){
      this.$store.commit('switchTurn')
    },
    placeCard(card, player){
      console.log(player)
      this.$store.commit('placeCard', {card, player })
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
.player {
  display: flex;
  opacity: 0.2;
  pointer-events: none;
}

.myTurn{
  opacity: 1;
  pointer-events: all;
}

.unknown-card{
  background-color: lightblue;
  width: 100px;
  min-height: 150px;
  border: 2px solid black;
  opacity: 1;
  transform: rotateY(180deg);
}

.card {
  font-size: 20px;
  margin: 2px;
  min-width: 35px;
  height: 60px;
  border: 1px solid black;
  cursor: pointer;
}
.game-field {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: "S8-K H8-K K8-K R8-K" "S7 H7 K7 R7" "S6-E H6-E K6-E R6-E";
}



#s7 { grid-area: S7; }

#h7 { grid-area: H7; }

#r7 { grid-area: R7; }

#k7 { grid-area: K7; }

#s8 { grid-area: S8-K; }

#h8 { grid-area: H8-K; }

#r8 { grid-area: R8-K; }

#k8 { grid-area: K8-K; }

#s6 { grid-area: S6-E; }

#h6 { grid-area: H6-E; }

#r6 { grid-area: R6-E; }

#k6 { grid-area: K6-E; }

.game-field div{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  
  margin: 5px;
}

/* .game-field div:nth-child(even){
  color:red;
}

.game-field div:nth-child(n+5){
  color:red;
  font-size: 30px;
} */

.played-card{
  width: 100px;
  min-height: 150px;
  border: 2px solid black;
  border-radius: 8px;
}
.no-played-card{
  width: 100px;
  min-height: 150px;
  border: 2px dashed black;
  opacity: 0.2;
}
</style>