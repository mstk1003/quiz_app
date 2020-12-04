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
  props: { difficulty: String, categoryName: String },
  components: {
    Header
  },
  data() {
    return {
      userName: this.$store.state.userInfo.userName,
      score: 0,
      respondedNumber: 0,
      fields: ["question", "yourAnswer", "correctAnswer"],
      results: this.$store.state.results
    };
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.isCorrect === false) return "table-danger";
    },
    goHome() {
      this.$store.commit("resetResults");
      this.$router.push({ path: "home" });
    }
  },
  mounted() {
    this.respondedNumber = this.results.length;
    this.score = Math.round(
      (this.results.filter(result => result.isCorrect === true).length /
        this.results.length) *
        100
    );
  }
};
</script>

<style>
.right {
  margin-left: auto;
}
.left {
  text-align: left;
}
</style>