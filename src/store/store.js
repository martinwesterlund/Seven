import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        ableToPlay: null,
        deck: [],
        scoreBoard: [],
        speed: 2,
        playedCardsArray: [],
        playedCards: [
            { name: 's7', card: '♠' },
            { name: 'h7', card: '♥' },
            { name: 'k7', card: '♣' },
            { name: 'r7', card: '♦' },
            { name: 's8', card: '' },
            { name: 'h8', card: '' },
            { name: 'k8', card: '' },
            { name: 'r8', card: '' },
            { name: 's6', card: '' },
            { name: 'h6', card: '' },
            { name: 'k6', card: '' },
            { name: 'r6', card: '' }
        ],
        players: [
            { name: 'player1', cards: [], type: 'human', hasTheBox: false, roundScore: 0, totalScore: 0 },
            { name: 'player2', cards: [], type: 'cpu', hasTheBox: false, roundScore: 0, totalScore: 0 },
            { name: 'player3', cards: [], type: 'cpu', hasTheBox: false, roundScore: 0, totalScore: 0 },
            { name: 'player4', cards: [], type: 'cpu', hasTheBox: false, roundScore: 0, totalScore: 0 },
            { name: 'player5', cards: [], type: 'cpu', hasTheBox: false, roundScore: 0, totalScore: 0 }
        ],
        playersTurn: null,
        round: 0,
        roundOver: false,
        vueSliderOptions: {
            interval: 1,
            min: 1,
            max: 5
        }
    },

    actions: {
        computersTurn(context, player) {
            if (player.cards.length > 0) {


                setTimeout(() => {
                    let card = null


                    

                    
                    let aces = player.cards.filter(playerCard => playerCard.value === 'A' && playerCard.isPlayable)
                    let kings = player.cards.filter(playerCard => playerCard.value === 'K' && playerCard.isPlayable)
                    let playableCards = player.cards.filter(playerCard => playerCard.isPlayable === true)

                    if(playableCards.filter(playerCard => playerCard.uniqueValue === 7).length > 0){
                        card = playableCards.filter(playerCard => playerCard.uniqueValue === 7)[0]
                    } else if (aces.length > 0) {
                        card = aces[0]
                    } else if (kings.length > 0) {
                        card = kings[0]
                    } else if (playableCards.length > 0){ 
                        console.log('Letar igenom playable')
                        playableCards.forEach((playableCard) => {
                            switch(playableCard.uniqueValue % 13){
                                
                                case 12 : playableCard.playability = 1
                                break
                                case 11 : playableCard.playability = 2
                                break
                                case 10 : playableCard.playability = 3
                                break
                                case 2 : playableCard.playability = 4
                                break
                                case 3 : playableCard.playability = 5
                                break
                                case 4 : playableCard.playability = 6
                                break
                                case 9 : playableCard.playability = 7
                                break
                                case 5 : playableCard.playability = 8
                                break
                                case 6 : playableCard.playability = 9
                                break
                                case 8 : playableCard.playability = 10
                                break
                                case 7 : playableCard.playability = 11
                                break 

                            }
                        })
                        playableCards.sort((a, b) => b.playability < a.playability ? 1 : b.playability > a.playability ? -1 : 0)
                        playableCards.forEach((card) => {
                            console.log(card.playability)
                        })
                        
                        card = playableCards[0]
                    }

                   
                        if (card != null) {
                            this.commit('placeCard', { card, player })

                        } else {
                            this.commit('getBoxFromOtherPlayer', player)
                            this.commit('switchTurn')
                        }
                    

                }, 2500 / this.state.speed)
            } else {
                this.commit('switchTurn')
            }

        },







        switchPlayableStatus(context, card) {
            setTimeout(() => {
                card.isPlayable = false
            }, 300)
        }


    },

    mutations: {
        calcScore(state) {
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].type = 'human'
                for (let j = 0; j < state.players[i].cards.length; j++) {
                    switch (state.players[i].cards[j].value) {
                        case 'A':
                            state.players[i].roundScore += 15
                            break
                        case '10':
                            state.players[i].roundScore += 10
                            break
                        case 'J':
                            state.players[i].roundScore += 10
                            break
                        case 'Q':
                            state.players[i].roundScore += 10
                            break
                        case 'K':
                            state.players[i].roundScore += 10
                            break
                        default:
                            state.players[i].roundScore += 5
                    }
                }
                if (state.players[i].hasTheBox) {
                    state.players[i].roundScore += 25
                }
                state.players[i].totalScore += state.players[i].roundScore
                console.log(state.players[i].name + ' fick ' + state.players[i].roundScore + ' och totalpoängen är ' + state.players[i].totalScore)
            }


        },
        createDeck(state) {
            state.deck = []
            const suits = ['♥', '♠', '♦', '♣']
            const value = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

            for (let n = 0; n < suits.length; n++) {
                for (let m = 0; m < 13; m++) {

                    state.deck.push({
                        suit: suits[n],
                        value: value[m],
                        uniqueValue: (13 * (n)) + (m + 1),
                        isPlayable: false
                    })
                }
            }
        },

        getBoxFromOtherPlayer(state, player) {
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].hasTheBox = false
            }
            player.hasTheBox = true
        },

        pass(state) {
            this.commit('getBoxFromOtherPlayer', state.players[0])
            this.commit('switchTurn')
        },

        startGame(state) {
            let playerNumber = 0

            //Deal cards
            for (let i = 0; i < 52; i++) {
                if (playerNumber === state.players.length) {
                    playerNumber = 0
                }
                let random = Math.floor(Math.random() * state.deck.length)
                let card = state.deck.splice(random, 1)
                state.players[playerNumber].cards.push(card[0])
                playerNumber++
            }

            //Sort cards
            for (let i = 0; i < state.players.length; i++) {
                let sortedCards = state.players[i].cards.slice(0)
                sortedCards.sort(function (a, b) {
                    return a.uniqueValue - b.uniqueValue
                })
                state.players[i].cards = sortedCards
            }

            //Find out who has the 7 of hearts
            for (let i = 0; i < state.players.length; i++) {
                if (state.players[i].cards.find(x => x.uniqueValue === 7)) {
                    state.playersTurn = i + 1
                    this.commit('setHeartOfSevenAsPlayable', state.players[state.playersTurn - 1])
                }
            }
            if (state.playersTurn !== 1) {
                this.commit('checkIfPlayerAbleToPlay')
            }


        },

        doNotSwitchTurn(state) {
            state.round++
            console.log('Spelare' + state.playersTurn + 's tur igen')
            this.commit('checkIfPlayerAbleToPlay')
        },

        setHeartOfSevenAsPlayable(state, player) {
            for (let i = 0; i < player.cards.length; i++) {
                if (player.cards[i].uniqueValue === 7) {
                    player.cards[i].isPlayable = true
                }
            }

        },

        switchTurn(state) {

            state.round++
            state.playersTurn++
            console.log('Spelare' + state.playersTurn + 's tur')

            if (state.playersTurn > state.players.length) {
                console.log('Spelare 6s tur, men finns ej så det blir spelare 1s tur')
                state.playersTurn = 1
                this.commit('checkIfPlayerAbleToPlay')

            } else {
                console.log('Skickar vidare till checkIfAbleToPlay')
                this.commit('checkIfPlayerAbleToPlay')
            }




        },

        // Switch status to true if card is playable
        checkIfPlayerAbleToPlay(state) {
            state.ableToPlay = false
            for (let i = 0; i < state.players[state.playersTurn - 1].cards.length; i++) {
                let card = state.players[state.playersTurn - 1].cards[i]
                if (

                    (state.playedCardsArray.find(x => x.uniqueValue === card.uniqueValue - 1) && ((card.uniqueValue % 13) > 7 || (card.uniqueValue % 13) === 0)) ||
                    ((state.playedCardsArray.find(x => x.uniqueValue === card.uniqueValue + 1) && (card.uniqueValue % 13) < 7 && card.uniqueValue % 13 > 0)) ||
                    (card.uniqueValue + 6) % 13 === 0) {
                    console.log('Hittade spelbart kort')
                    card.isPlayable = true
                    state.ableToPlay = true
                }
                else {
                    console.log('Hittade inget spelbart kort')
                }
            }
            if (state.playersTurn !== 1) {
                console.log('Har nu kontrollerat spelarens kort, som verkar tillhöra en dator')
                this.dispatch('computersTurn', state.players[state.playersTurn - 1])
            }


        },

        // pushWinnerToScoreBoard(state, player){

        // },

        newRound(state) {
            state.round = 0
            state.roundOver = false
            state.ableToPlay = null
            state.playersTurn = null
            state.deck = []
            state.playedCardsArray = []
            state.playedCards =
                [
                    { name: 's7', card: '♠' },
                    { name: 'h7', card: '♥' },
                    { name: 'k7', card: '♣' },
                    { name: 'r7', card: '♦' },
                    { name: 's8', card: '' },
                    { name: 'h8', card: '' },
                    { name: 'k8', card: '' },
                    { name: 'r8', card: '' },
                    { name: 's6', card: '' },
                    { name: 'h6', card: '' },
                    { name: 'k6', card: '' },
                    { name: 'r6', card: '' }
                ]
            for (let i = 0; i < state.players.length; i++) {
                state.players[i].roundScore = 0
                state.players[i].hasTheBox = false
                state.players[i].cards = []
                state.players[i].type = 'cpu'

            }
            state.players[0].type = 'human'
            this.commit('createDeck')

        },

        placeCard(state, { card, player }) {

            console.log(player.name + ' lägger ' + card.suit + card.value)
            if (state.round > 0) {


                if ((card.uniqueValue + 6) % 13 === 0) {

                    state.playedCardsArray.push(card)

                    switch (card.suit) {
                        case '♥': state.playedCards[1].card = card
                            break
                        case '♠': state.playedCards[0].card = card
                            break
                        case '♦': state.playedCards[3].card = card
                            break
                        case '♣': state.playedCards[2].card = card
                            break
                    }
                    player.cards.splice(player.cards.map(function (x) { return x.uniqueValue }).indexOf(card.uniqueValue), 1)
                    if (player.cards.length < 1) {
                        this.commit('roundOver')
                    }
                    else {
                        this.commit('switchTurn')
                    }

                }
                // mindre än 7
                else if ((card.uniqueValue % 13) < 7 && (card.uniqueValue % 13) > 0 && state.playedCardsArray.find(x => x.uniqueValue === card.uniqueValue + 1)) {

                    state.playedCardsArray.push(card)
                    switch (card.suit) {
                        case '♥': state.playedCards[9].card = card
                            break
                        case '♠': state.playedCards[8].card = card
                            break
                        case '♦': state.playedCards[11].card = card
                            break
                        case '♣': state.playedCards[10].card = card
                            break
                    }
                    player.cards.splice(player.cards.map(function (x) { return x.uniqueValue }).indexOf(card.uniqueValue), 1)

                    if (player.cards.length < 1) {
                        this.commit('roundOver')
                    }
                    else if ((card.uniqueValue + 12) % 13 === 0) {
                        this.commit('doNotSwitchTurn')
                    }
                    else {
                        this.commit('switchTurn')
                    }
                }

                // större än 7
                else if (((card.uniqueValue % 13) > 7 || (card.uniqueValue % 13 === 0)) && state.playedCardsArray.find(x => x.uniqueValue === card.uniqueValue - 1)) {

                    state.playedCardsArray.push(card)
                    switch (card.suit) {
                        case '♥': state.playedCards[5].card = card
                            break
                        case '♠': state.playedCards[4].card = card
                            break
                        case '♦': state.playedCards[7].card = card
                            break
                        case '♣': state.playedCards[6].card = card
                            break
                    }
                    player.cards.splice(player.cards.map(function (x) { return x.uniqueValue }).indexOf(card.uniqueValue), 1)
                    if (player.cards.length < 1) {
                        this.commit('roundOver')
                    }
                    else if (card.uniqueValue % 13 === 0) {
                        this.commit('doNotSwitchTurn')
                    }
                    else {
                        this.commit('switchTurn')
                    }

                }




            }

            else if (card.uniqueValue === 7) {
                state.playedCardsArray.push(card)
                player.cards.splice(player.cards.map(function (x) { return x.uniqueValue }).indexOf(card.uniqueValue), 1)
                state.playedCards[1].card = card
                this.commit('switchTurn')
            }
            this.dispatch('switchPlayableStatus', card)

        },

        roundOver(state) {
            console.log('Vinnaren av ronden är: ' + state.players[state.playersTurn - 1].name)
            this.commit('calcScore')
            state.roundOver = true
        }













    },


})