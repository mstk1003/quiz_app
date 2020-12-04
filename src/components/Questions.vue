<template>
  <div class="question-box-container">
    <b-jumbotron>
      <template #lead>
        {{ currentQuestion.question }}
      </template>

      <hr class="my-4" />

      <b-list-group>
        <b-list-group-item
          v-for="(shuffledAnswer, index) in shuffledAnswers"
          :key="index"
          @click="selectAnswer(index)"
          :class="answerClass(index)"
          >{{ shuffledAnswer }}</b-list-group-item
        >
      </b-list-group>

      <b-button
        @click="submitAnswer"
        variant="primary"
        :disabled="selectedIndex === null || answered"
        >Submit</b-button
      >
      <b-button @click="next" variant="success" href="#">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  // 親（App.vue）からデータを受け取る
  props: { currentQuestion: Object, next: Function, increment: Function },
  data() {
    return {
      // 選択中の回答のインデックス
      selectedIndex: null,
      // 正解のインデックス
      correctIndex: null,
      // 回答をsubmit済かどうかのフラグ
      answered: false,
      // シャッフルした回答を格納する配列
      shuffledAnswers: []
    };
  },
  watch: {
    // currentQuestionに変化があるかどうかを監視する
    currentQuestion: {
      // 初期読み込み時にもhandler()が実行されるように、immediateをtrueにする
      immediate: true,
      handler() {
        // currentQuestionが変わるたびにリセットする
        this.selectedIndex = null;
        this.correctIndex = null;
        this.answered = false;
        // currentQuestionが変わるたびに回答をシャッフルする
        this.shuffleAnswers();
      }
    }
  },
  computed: {
    /**
     * 誤答と正答を一つの配列する
     * @returns {Array} answers 誤答と正答を一つの配列にしたもの
     */
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers];
      answers.push(this.currentQuestion.correct_answer);
      return answers;
    }
  },
  methods: {
    /**
     * 選択した回答のインデックスを保持する
     * @param {Number} index 選択中の回答のインデックス
     */
    selectAnswer(index) {
      this.selectedIndex = index;
    },
    /**
     * 回答を提出する
     */
    submitAnswer() {
      let isCorrect = false;
      if (this.selectedIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true;
      this.increment(isCorrect);
    },
    /**
     * 回答をシャッフルする
     * @returns {Array} shuffledAnswers シャッフル済の回答
     */
    shuffleAnswers() {
      let answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer
      ];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(
        this.currentQuestion.correct_answer
      );
      return this.shuffledAnswers;
    },
    /**
     * 選択中・正解・不正解の回答を表すクラスを付与する
     * @param {Number} index 回答のインデックス
     * @returns {String} クラス名
     */
    answerClass(index) {
      if (index === this.selectedIndex && !this.answered) {
        // 回答を選択かつ未提出の場合、selectedクラスを付与
        return "selected";
      } else if (index === this.correctIndex && this.answered) {
        // 選択した回答が正解かつ回答を提出済の場合、correctクラスを付与
        return "correct";
      } else if (
        index !== this.correctIndex &&
        index === this.selectedIndex &&
        this.answered
      ) {
        // 選択した回答が不正解かつ回答を提出済の場合、incorrectクラスを付与
        return "incorrect";
      }
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background-color: lightyellow;
  cursor: pointer;
}

.btn {
  margin: 0 10px;
}
.selected {
  background-color: lightblue;
}
.correct {
  background-color: lightgreen;
}
.incorrect {
  background-color: red;
}
</style>