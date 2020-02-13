import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        testVariabel: null,
        ableToPlay: null,
        deck: [],
        playedCardsArray: [],
        playedCards: [
            { name: 's7', card: '♠' },
            { name: 'h7', card: '♥' },
            { name: 'k7', card: '♣' },
            { name: 'r7', card: '♦' },
            { name: 's8', card: '▲' },
            { name: 'h8', card: '▲' },
            { name: 'k8', card: '▲' },
            { name: 'r8', card: '▲' },
            { name: 's6', card: '▼' },
            { name: 'h6', card: '▼' },
            { name: 'k6', card: '▼' },
            { name: 'r6', card: '▼' }
        ],
        players: [
            { name: 'player1', cards: [] },
            { name: 'player2', cards: [] },
            { name: 'player3', cards: [] },
            { name: 'player4', cards: [] },
            { name: 'player5', cards: [] }
        ],
        playersTurn: null,
        round: 0









    },

    actions: {
        computersTurn(context, player) {
            if(player.cards.length > 0){
                setTimeout(() => {
                    let card = null
                    for (let i = 0; i < player.cards.length; i++) {
                        if (player.cards[i].isPlayable) {
                            card = player.cards[i]
                            
                            break
    
                        }
                    }
                    if(card != null){
                        this.commit('placeCard', {card, player})

                    } else {
                        this.commit('switchTurn')
                    }
                }, 2000)
            }else {
                this.commit('switchTurn')
            }
            
        }


    },

    mutations: {

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

                }
            }
            if (state.playersTurn !== 1) {
                this.commit('checkIfPlayerAbleToPlay')
            }


        },

        doNotSwitchTurn(state) {
            state.round++
            // state.playersTurn--
            // if (state.playersTurn < 1) {
            //     state.playersTurn = state.players.length
            // }
            if (state.players[state.playersTurn - 1].cards.length < 1) {
                this.commit('switchTurn')
            }
            this.commit('checkIfPlayerAbleToPlay')
        },

        //Se över denna - kukar ur i slutet av ett spel
        switchTurn(state) {
            state.round++
            state.playersTurn++
            
            if (state.playedCardsArray.length === 52) {
                console.log('52 kort lagda, spelet slut')
                state.playersTurn = 0
           
            } else if (state.playersTurn > state.players.length) {
                console.log('Spelare 6s tur, men finns ej så det blir spelare 1s tur')
                state.playersTurn = 1
                this.commit('checkIfPlayerAbleToPlay')
               
            } else {
                console.log('Skickar vidare till checkIfAbleToPlay')
                this.commit('checkIfPlayerAbleToPlay')
            }


            
            
        },

        checkIfPlayerAbleToPlay(state) {
            state.ableToPlay = false
            if(state.playedCardsArray.length !== 52){
                console.log('Alla 52 kort är inte lagda, sök igenom spelarens kort')
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
                }
                if (state.playersTurn !== 1) {
                    console.log('Har nu kontrollerat spelarens kort, som verkar tillhöra en dator')
                    this.dispatch('computersTurn', state.players[state.playersTurn - 1])
                } else if(state.players[0].cards.length < 1){
                    console.log('Människospelarens kort är slut, gå till nästa spelare')
                    this.commit('switchTurn')
                } 
            }
            
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

                    this.commit('switchTurn')
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
                    if ((card.uniqueValue + 12) % 13 === 0) {
                        
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
                    if (card.uniqueValue % 13 === 0) {
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

        }



        /*
        Logik - Ordning
        1. Placera alla spelbara kort i en array
        2. Om jag har hjärter 7 - Lägg
        3. Om jag kan lägga ett ess eller kung - lägg detta
        4. Om jag har ett ess - lägg 7 eller neråt i samma färg
        5. Om jag har en kung - lägg 7 eller uppåt i samma färg
        6. Om jag har en dam - Lägg 7 eller uppåt i samma färg
        7. Om jag har en tvåa - Lägg 7 eller nedåt i samma färg
        8. Om jag har en knekt - Lägg 7 eller uppåt i samma färg
        9. Om jag har en trea - Lägg 7 eller nedåt i samma färg
        10. Om jag har en tia - Lägg 7 eller uppåt i samma färg
        11. Om jag har en fyra - Lägg 7 eller nedåt i samma färg
        12. Om jag har en nia - Lägg 7 eller uppåt i samma färg
        13. Om jag har en femma - Lägg 7 eller nedåt i samma färg
        14. Om jag har en sexa - Lägg 7 eller nedår i samma färg
        15. Om jag har en åtta - Lägg / eller uppåt i samma färg
        */







    },


})