<template>
  <div>
    <Header
      ><b-nav-item class="right">
        Counting Score... {{ record.score }} / {{ record.respondedNumber }}
      </b-nav-item></Header
    >
    <h3>{{ currentQuestion.question }}</h3>
    <b-list-group>
      <b-list-group-item
        @click="selectAnswer(index)"
        :class="answerClass(index)"
        v-for="(answer, index) in shuffledAnswers"
        :key="index"
        >{{ answer }}</b-list-group-item
      >
    </b-list-group>
    <b-button
      pill
      @click="submit"
      :hidden="isAnswered"
      :disabled="selectedIndex === null ? true : false"
      variant="primary"
      >submit</b-button
    >
    <b-button
      pill
      @click="next"
      :hidden="!isAnswered || record.respondedNumber === 10"
      variant="primary"
      >Next</b-button
    >
    <b-button
      pill
      @click="showResult"
      :hidden="!isAnswered || record.respondedNumber !== 10"
      variant="primary"
      >Show Result</b-button
    >
  </div>
</template>

<script>
import _ from "lodash";
import Header from "@/components/abstract/Header.vue";

export default {
  props: {
    currentQuestions: Array,
    difficulty: String,
    categoryId: Number,
    categoryName: String
  },
  components: {
    Header
  },
  data() {
    return {
      currentQuestionIndex: 0,
      currentQuestion: [],
      shuffledAnswers: [],
      correctIndex: null,
      selectedIndex: null,
      isAnswered: false,
      isCorrect: false,
      result: {
        question: String,
        isCorrect: Boolean,
        yourAnswer: String,
        correctAnswer: String
      },
      record: {
        userId: this.$store.state.userInfo.userId,
        difficulty: this.difficulty,
        categoryId: this.categoryId,
        categoryName: this.categoryName,
        score: 0,
        respondedNumber: 0
      }
    };
  },
  watch: {
    currentQuestion: {
      handler() {
        this.shuffleAnswer(this.currentQuestion);
      }
    }
  },
  methods: {
    shuffleAnswer(currentQuestion) {
      // let shuffledAnswers =[...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      this.shuffledAnswers = _.shuffle([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer
      ]);
      this.correctIndex = this.shuffledAnswers.indexOf(
        currentQuestion.correct_answer
      );
    },
    selectAnswer(index) {
      if (!this.isAnswered) {
        this.selectedIndex = index;
      }
    },
    next() {
      this.currentQuestion = this.currentQuestions[++this.currentQuestionIndex];
      this.correctIndex = null;
      this.selectedIndex = null;
      this.isAnswered = false;
      this.isCorrect = false;
    },
    answerClass(index) {
      if (index === this.selectedIndex && !this.isAnswered) {
        return "selected";
      } else if (index === this.correctIndex && this.isAnswered) {
        return "correct";
      } else if (
        index === this.selectedIndex &&
        index !== this.correctIndex &&
        this.isAnswered
      ) {
        return "incorrect";
      }
    },
    submit() {
      if (this.correctIndex === this.selectedIndex) {
        this.isCorrect = true;
        this.record.score++;
      }
      this.isAnswered = true;
      this.record.respondedNumber++;

      this.result.question = this.currentQuestion.question;
      this.result.correctAnswer = this.currentQuestion.correct_answer;
      this.result.yourAnswer = this.shuffledAnswers[this.selectedIndex];
      this.result.isCorrect = this.isCorrect;

      this.$store.commit("registerResult", this.result);
    },
    showResult() {
      this.$store.commit("registerRecord", this.record);
      this.$router.push({
        name: "result",
        params: {
          difficulty: this.difficulty,
          categoryName: this.categoryName
        }
      });
    }
  },
  mounted() {
    this.currentQuestion = this.currentQuestions[this.currentQuestionIndex];
  }
};
</script>

<style scoped>
.right {
  margin-left: auto;
}
.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: lightcoral;
}
</style>