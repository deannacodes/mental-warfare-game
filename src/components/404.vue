<template>
  <div id="app">
    <div class="container">
      <div id="game-box" class="row">
        <div class="text-center main-cols">
          <img class="logo" src="../assets/peoples-trivia-logo-med-white.png" />
          <p></p>
          <div v-if="submitted">
            <h1>Success!</h1>
            <p>Your team, {{ teamname }} submitted a guess of {{ guess }}. Good Luck!</p>
          </div>
          <div v-else>
            <form>
              <div class="form-group">
                <label for="teamname">*Team Name:</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="teamname"
                  aria-describedby="teamname"
                  placeholder="Enter teamname"
                  v-model="teamname"
                  maxlength="240"
                />
                <p></p>
                <label for="guess">*Guess:</label>
                <input
                  required
                  type="number"
                  class="form-control"
                  id="guess"
                  aria-describedby="guess"
                  placeholder="Enter guess"
                  v-model="guess"
                  maxlength="9"
                  min="1"
                />
                <div class="row justify-content-around">
                  <button
                    style="margin-top:20px"
                    id="hmmmm"
                    v-on:click="this.sendCase"
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
    gameid: "gameid"
  }),
  data() {
    return {
      teamname: "",
      guess: "",
      submitted: false
    };
  },
  methods: {
    sendCase: function(event) {
      event.preventDefault();
      this.submitted = true
      const guess = {
        team_name: this.teamname,
        guess: this.guess,
        gameid: this.gameid
      };
      this.$store.dispatch("sendGuess", guess);
    }
  }
};
</script>

<style>
</style>



