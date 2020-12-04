<template>
  <div>
    <Header>
      <b-nav-item class="right"
        ><b>{{ userName }}</b></b-nav-item
      >
      <b-nav-item href="#"><b>Sign Out</b></b-nav-item>
    </Header>
    <h5 class="left">【Category】 {{ categoryName }}</h5>
    <h5 class="left">【Level】{{ difficulty }}</h5>
    <h3>SCORE {{ score }}%</h3>
    <b-table
      :items="results"
      :fields="fields"
      :tbody-tr-class="rowClass"
    ></b-table>
    <b-button pill @click="goHome" variant="danger">Go Home</b-button>
  </div>
</template>

<script>
import Header from "@/components/abstract/Header.vue";
export default {
  props: {
    // 難易度
    difficulty: String,
    // カテゴリー名
    categoryName: String
  },
  components: {
    Header
  },
  data() {
    return {
      // ユーザー名
      userName: this.$store.state.userInfo.userName,
      // 正解率
      score: 0,
      // 回答数
      respondedNumber: 0,
      // テーブルのフィールド
      fields: ["question", "yourAnswer", "correctAnswer"],
      // 結果
      results: this.$store.state.results
    };
  },
  methods: {
    // 不正解のクイズの行にクラスを付与
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.isCorrect === false) return "table-danger";
    },
    // ホーム画面へ遷移する
    goHome() {
      this.$store.commit("resetResults");
      this.$router.push({ path: "home" });
    }
  },
  mounted() {
    this.respondedNumber = this.results.length;

    // 正解率を表示する
    this.score = Math.round(
      (this.results.filter(result => result.isCorrect === true).length /
        this.results.length) *
        100
    );
  }
};
</script>

<style>
/* 右寄せ */
.right {
  margin-left: auto;
}
/* 左寄せ */
.left {
  text-align: left;
}
</style>