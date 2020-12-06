<template>
  <div>
    <Header>
      <b-nav-item href="#"><b>Sign Out</b></b-nav-item>
    </Header>
    <h3>{{ userName }}'s Average Accuracy Rate： {{ calcTotalScore }}%</h3>
    <b-table :items="records" :fields="fields"></b-table>
  </div>
</template>

<script>
import Header from "@/components/abstract/Header.vue";

export default {
  components: {
    Header
  },
  data() {
    return {
      // ユーザー名
      userName: this.$store.state.userInfo.userName,
      // レコード
      records: [],
      fields: [
        {
          key: "categoryName",
          sortable: true
        },
        {
          key: "difficulty",
          sortable: true
        },
        {
          key: "respondedNumber",
          sortable: true
        },
        {
          key: "score",
          sortable: true
        }
      ]
    };
  },
  computed: {
    calcTotalScore() {
      let totalScore = 0;
      this.records.forEach(record => {
        totalScore += record.score;
      });
      return Math.round(totalScore / this.records.length);
    }
  },
  mounted() {
    this.$store.state.records.forEach(record => {
      this.records.push({
        categoryName: record.categoryName,
        difficulty: record.difficulty,
        respondedNumber: record.respondedNumber,
        score: Math.round((record.score / record.respondedNumber) * 100)
      });
    });
  }
};
</script>