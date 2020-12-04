<template>
  <div>
    <h1>Login</h1>
    <router-link to="/sign-up">SignUp</router-link>
    <b-form-input
      v-model="userId"
      type="text"
      placeholder="Enter your ID"
    ></b-form-input>
    <b-form-input
      v-model="password"
      type="password"
      placeholder="password"
    ></b-form-input>
    <b-button pill @click="login" variant="danger">Submit</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      password: ""
    };
  },
  methods: {
    login() {
      // ストアのデータを取得してマッチするかチェック
      // ストアのauthをtrueに更新
      this.$store.commit("authenticateUser", {
        userId: this.userId,
        password: this.password
      });
      this.$router.push({ path: "/home" });
    }
  },
  mounted() {
    this.$store.commit("resetUserInfo");
    this.$store.dispatch("getLocalStrage");
  }
};
</script>