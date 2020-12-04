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
    // クイズリスト
    currentQuestions: Array,
    // 難易度
    difficulty: String,
    // カテゴリーID
    categoryId: Number,
    // カテゴリー名
    categoryName: String
  },
  components: {
    Header
  },
  data() {
    return {
      // 画面に表示中のクイズのインデックス
      currentQuestionIndex: 0,
      // 現在表示中のクイズ
      currentQuestion: [],
      // シャッフル後の回答
      shuffledAnswers: [],
      // 正解の回答のインデックス
      correctIndex: null,
      // 選択中の回答のインデックス
      selectedIndex: null,
      // 回答済フラグ
      isAnswered: false,
      // 正解したかどうかのフラグ
      isCorrect: false,
      // 回答結果
      result: {
        // クイズ
        question: String,
        // 正解したかどうかのフラグ
        isCorrect: Boolean,
        // 選択した回答
        yourAnswer: String,
        // 正解
        correctAnswer: String
      },
      // カテゴリーと難易度毎のレコード（ユーザーごとに保持）
      record: {
        // ユーザーID
        userId: this.$store.state.userInfo.userId,
        // 難易度
        difficulty: this.difficulty,
        // カテゴリーID
        categoryId: this.categoryId,
        // カテゴリー名
        categoryName: this.categoryName,
        // 正解率
        score: 0,
        // 回答数
        respondedNumber: 0
      }
    };
  },
  watch: {
    // 表示中のクイズの変更をウォッチする
    currentQuestion: {
      // 表示中のクイズに変更があれば、回答をシャッフルする
      handler() {
        this.shuffleAnswer(this.currentQuestion);
      }
    }
  },
  methods: {
    /**
     * 回答をシャッフルする
     * @param currentQuestion 表示中のクイズ
     */
    shuffleAnswer(currentQuestion) {
      this.shuffledAnswers = _.shuffle([
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer
      ]);
      this.correctIndex = this.shuffledAnswers.indexOf(
        currentQuestion.correct_answer
      );
    },
    /**
     * 回答を選択する
     * @param index 選択した回答のインデックス
     */
    selectAnswer(index) {
      // 未回答の場合、選択中のindexを上書きする
      if (!this.isAnswered) {
        this.selectedIndex = index;
      }
    },
    /**
     * 次のクイズへ進む
     */
    next() {
      this.currentQuestion = this.currentQuestions[++this.currentQuestionIndex];
      // 正解のインデックスを初期化
      this.correctIndex = null;
      // 選択中のインデックスを初期化
      this.selectedIndex = null;
      // 回答済フラグを初期化
      this.isAnswered = false;
      // 正解かどうかのフラグを初期化
      this.isCorrect = false;
    },
    /**
     * 回答にクラスを付与する
     */
    answerClass(index) {
      if (index === this.selectedIndex && !this.isAnswered) {
        // 選択中かつ未回答の場合、selectedクラスを付与する
        return "selected";
      } else if (index === this.correctIndex && this.isAnswered) {
        // 選択中の回答が正解かつ回答済の場合、correctクラスを付与する
        return "correct";
      } else if (
        index === this.selectedIndex &&
        index !== this.correctIndex &&
        this.isAnswered
      ) {
        // それ以外は、incorrectクラスを付与する
        return "incorrect";
      }
    },
    /**
     * 回答を提出する
     */
    submit() {
      if (this.correctIndex === this.selectedIndex) {
        // 選択中の回答が正解の場合
        this.isCorrect = true;
        this.record.score++;
      }
      this.isAnswered = true;
      this.record.respondedNumber++;

      // クイズ結果を更新
      this.result.question = this.currentQuestion.question;
      this.result.correctAnswer = this.currentQuestion.correct_answer;
      this.result.yourAnswer = this.shuffledAnswers[this.selectedIndex];
      this.result.isCorrect = this.isCorrect;

      // クイズ結果をストアに保存する
      this.$store.commit("registerResult", this.result);
    },
    /**
     * 全てのクイズの結果をレコードに記録し、リザルト画面に遷移する
     */
    showResult() {
      // 全てのクイズの結果をストアのレコードに保持する
      this.$store.commit("registerRecord", this.record);
      // リザルト画面に遷移する
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
    // 初回描画時に、クイズを更新する
    this.currentQuestion = this.currentQuestions[this.currentQuestionIndex];
  }
};
</script>

<style scoped>
/* 右寄せ */
.right {
  margin-left: auto;
}
/* 選択中クラス */
.selected {
  background-color: lightblue;
}
/* 正解クラス */
.correct {
  background-color: lightgreen;
}
/* 不正解クラス */
.incorrect {
  background-color: lightcoral;
}
</style>