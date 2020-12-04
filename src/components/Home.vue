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
      userName: this.$store.state.userInfo.userName,
      categories: [],
      categoryNames: [],
      categoryId: "",
      categoryName: "",
      modes: [],
      difficultyLabels: [],
      difficulty: "",
      currentQuestions: []
    };
  },
  methods: {
    selectCategory(categoryName) {
      this.categoryName = categoryName;
      this.categoryId = this.categories.find(
        category => category.name === categoryName
      ).id;
    },
    selectDifficulty(difficultyLabel) {
      this.difficulty = this.modes.find(
        mode => mode.label === difficultyLabel
      ).difficulty;
    },
    startQuiz() {
      api
        .getQuestions(this.categoryId, this.difficulty)
        .then(response => {
          // json形式で解決
          return response.json();
        })
        .then(jsonData => {
          // json形式のデータを配列のquestionsにいれる（レスポンスがオブジェクトの配列になっていることは分かっている）
          this.currentQuestions = jsonData.results;
          //   let a = jsonData.results;
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
    api
      .getCategory()
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.categories = jsonData.trivia_categories;
        this.categoryNames = this.categories.map(category => category.name);
      });

    this.modes = this.$store.state.modes;
    this.difficultyLabels = this.modes.map(mode => mode.label);
  }
};
</script>

<style scoped>
.right {
  margin-left: auto;
}
</style>