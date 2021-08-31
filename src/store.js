import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        gameid: 1,
        rankings: [],
        list: [],
        winner: {},
        hello: false
    },
    mutations: {
        setGame(state, id) {
            state.gameid = id
        },
        setList(state, list) {
            state.list = list
        },
        setRankings(state, rankings) {
            state.rankings = rankings
        },
        setWinner(state, winner) {
            state.winner = winner
        },
        hello(state, hello) {
            state.hello = hello
        }

    },
    actions: {
        getGameId({ commit }) {
            let url = "api/getgame"
            Axios.get(url).then((response) => {
                commit('setGame', response.data.response.game_id)
            })
        },
        newGame({ commit },curr) {
            let url = "api/newgame?current=" + curr
            Axios.post(url).then((response) => {
                this.dispatch('getGameId', response.data.response)
                commit('setList', [])
                commit('setWinner', {})
                commit('setRankings', [])
            })
        },
        getList({ commit }) {
            let url = "api/getlist?gameid=" + this.state.gameid
            let url2 = "api/getwinner?gameid=" + this.state.gameid            
            let url3 = "api/getrankings?gameid=" + this.state.gameid
            Axios.get(url).then((response) => {
                commit('setList', response.data.response)
            })
            Axios.get(url2).then((response) => {                
                commit('setWinner', response.data.response)
            })
            Axios.get(url3).then((response) => {                
                commit('setRankings', response.data.response)
            })
        },
        login({ commit },pw) {
            let url = "api/login?pw=" + pw
            Axios.post(url).then((response) => {
                commit('hello', response.data.response)
            })
        },
        sendGuess({ commit }, guess) {
            let url = "api/sendguess"
            Axios.post(url, guess).then((response) => {
            })
        }
    }
})

