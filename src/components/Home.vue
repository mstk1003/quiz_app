<template>
  <div>
    <Header>
      <b-nav-item class="right" href="profile"
        ><b>{{ userName }}</b></b-nav-item
      >
      <b-nav-item href="#"><b>Sign Out</b></b-nav-item>
    </Header>
    <h3>Show Your Wisdom !</h3>
    <h3>Aim for King of quizzes !</h3>
    <Dropdown :items="categoryNames" @select="selectCategory" />
    <Dropdown :items="difficultyLabels" @select="selectDifficulty" />
    <b-button pill @click="startQuiz" variant="danger">Quiz Start !</b-button>
  </div>
</template>

<script>
import Header from "@/components/abstract/Header.vue";
import Dropdown from "@/components/abstract/Dropdown.vue";
import api from "@/api/index.js";

export default {
  components: {
    Header,
    Dropdown
  },
  data() {
    return {
      // ユーザー名
      userName: this.$store.state.userInfo.userName,
      // カテゴリー
      categories: [],
      // カテゴリー名
      categoryNames: [],
      // カテゴリーID
      categoryId: "",
      // カテゴリー名
      categoryName: "",
      // モード
      modes: [],
      // ディスプレイ用の難易度表示用ラベル
      difficultyLabels: [],
      // 難易度
      difficulty: "",
      // 取得した問題集
      currentQuestions: []
    };
  },
  methods: {
    /**
     * カテゴリー名を選択し、カテゴリー名に一致するカテゴリーIDを取得する
     * @param categoryName カテゴリー名
     */
    selectCategory(categoryName) {
      // ドロップダウンから選んだカテゴリー名をインスタンスに保持する
      this.categoryName = categoryName;

      // カテゴリー名に一致するIDを取得
      this.categoryId = this.categories.find(
        category => category.name === categoryName
      ).id;
    },

    /**
     * 難易度を選択する
     * @param difficultyLabel 難易度
     */
    selectDifficulty(difficultyLabel) {
      this.difficulty = this.modes.find(
        mode => mode.label === difficultyLabel
      ).difficulty;
    },

    /**
     * APIからクイズを取得し、クイズ画面に遷移する
     */
    startQuiz() {
      // カテゴリーと難易度に応じたクイズを取得する
      api
        .getQuestions(this.categoryId, this.difficulty)
        .then(response => {
          // json形式で解決
          return response.json();
        })
        .then(jsonData => {
          // json形式のデータを配列のquestionsにいれる（レスポンスがオブジェクトの配列になっていることは分かっている）
          this.currentQuestions = jsonData.results;

          // クエスチョンボックス画面へ移動する
          this.$router
            .push({
              name: "question-box",
              params: {
                currentQuestions: this.currentQuestions,
                difficulty: this.difficulty,
                categoryId: this.categoryId,
                categoryName: this.categoryName
              }
            })
            .catch(() => {});
        });
    }
  },
  mounted() {
    // ホーム画面描画時に、APIからカテゴリーを取得する
    api
      .getCategory()
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.categories = jsonData.trivia_categories;
        this.categoryNames = this.categories.map(category => category.name);
      });

    // インスタンスに難易度のモードを保持する
    this.modes = this.$store.state.modes;
    // インスタンスに難易度のラベルを保持する
    this.difficultyLabels = this.modes.map(mode => mode.label);
  }
};
</script>

<style scoped>
/* 右寄せ */
.right {
  margin-left: auto;
}
</style>