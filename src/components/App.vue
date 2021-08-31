<template>
  <div id="app">
    <div class="container">
      <div id="game-box" class="row">
        <div class="text-center main-cols">
          <img class="logo-sm" src="../assets/peoples-trivia-logo-med-white.png" />
          <div v-if="hello">
            <p></p>
            <h3>Game Id: {{ gameid }}</h3>
            <button
              v-on:click="this.newGame"
              id="newgame"
              style="margin-right:5px;"
              class="btn btn-primary"
            >Start New Game</button>
            <button
              v-on:click="this.getList"
              style="margin-left:5px;"
              id="computer"
              class="btn btn-success"
            >Compute Scores</button>
            <p></p>
            <h4>Winner: {{ winner.phone }} with a guess of {{ winner.guess }}</h4>
            <p></p>
            <p></p>
            <div class="row">
            <div class="col-md">
              <h2 class="text-center">Counts per Guess</h2>
              <table class="table" style="max-width: 250px; margin: 0 auto;">
                <tr>
                  <th>Guess</th>
                  <th>Count</th>
                </tr>
                <tr v-for="guess in rankings" :key="guess.phone">
                  <td>{{guess.guess}}</td>
                  <td>{{guess.c}}</td>
                </tr>
              </table>
            </div>
            <div class="col-md">
              <h2 class="text-center">All Guesses</h2>
              <table class="table" style="max-width: 500px; margin: 0 auto;">
                <tr>
                  <th>Phone</th>
                  <th>Guess</th>
                </tr>
                <tr v-for="guess in list" :key="guess.phone">
                  <td>{{guess.phone}}</td>
                  <td>{{guess.guess}}</td>
                </tr>
              </table>
            </div>
            </div>
          </div>
          <div v-else>
            <form>
              <div class="form-group">
                <label for="pw">Password:</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="pw"
                  aria-describedby="pw"
                  placeholder="Enter Password"
                  v-model="pw"
                  maxlength="240"
                />
                <p></p>
                <div class="row justify-content-around">
                  <button
                    style="margin-top:20px"
                    id="hmmmm"
                    v-on:click="this.sendPw"
                    class="btn btn-primary"
                  >
                    Submit
                    <span class="fa fa-paper-plane"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "People's Trivia Co.",
  computed: mapState({
    gameid: "gameid",
    rankings: "rankings",
    list: "list",
    winner: "winner",
    hello: "hello"
  }),
  data() {
    return {
      teamname: "",
      guess: "",
      submitted: false,
      pw: ""
    };
  },
  methods: {
    newGame: function(event) {
      event.preventDefault();
      this.$store.dispatch("newGame",this.gameid);
    },
    getList: function(event) {
      event.preventDefault();
      this.$store.dispatch("getList");
    },
    sendPw: function(event) {
      event.preventDefault();
      this.$store.dispatch("login", this.pw);
    }
  }
};
</script>

<style>
</style>



