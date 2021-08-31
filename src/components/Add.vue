<template>
  <div id="app">
    <div class="container">
      <div id="game-box" class="row">
        <div class="text-center main-cols">
          <img class="logo" src="../assets/peoples-trivia-logo-med-white.png" />
          <h2>Mental Warfare</h2>
          <p>The goal of this game is to guess the <strong>lowest whole number (between 1 - 999) that no one else chooses.</p>
          <div v-if="submitted">
            <h1 style="padding-top: 50px;">Success!</h1>
            <p>You submitted a guess of {{ guess }}. Good Luck!</p>
            <p><a class="btn btn-primary" href="https://forms.gle/avS7AgEr4MQf8Lmn8">Continue to Round 4 →</a></p>
          </div>
          <div v-else>
            <form>
              <div class="form-group">
                <label for="phone">*Phone:</label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="phone"
                  aria-describedby="phone"
                  placeholder="Enter phone number"
                  v-model="phone"
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
                  maxlength="3"
                  min="1"
                />
                <div class="row justify-content-around">
                  <button
                    style="margin-top:20px"
                    id="hmmmm"
                    v-on:click="this.sendCase"
                    class="btn btn-primary"
                    :disabled="guess < 1 || guess > 999 || phone.length < 1"
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
      phone: "",
      guess: "",
      submitted: false
    };
  },
  methods: {
    sendCase: function(event) {
      event.preventDefault();
      this.submitted = true
      const guess = {
        phone: this.phone,
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



