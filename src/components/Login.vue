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
    /**
     * ユーザーの認証処理を実行する
     */
    login() {
      // ユーザーIDとパスワードをチェックする
      this.$store.commit("authenticateUser", {
        userId: this.userId,
        password: this.password
      });
      // ホーム画面へ移動する
      this.$router.push({ path: "/home" });
    }
  },
  mounted() {
    // ログイン画面を開いたときに、ストアのユーザー情報をリセットする
    this.$store.commit("resetUserInfo");
    // ローカストレージからユーザー情報を取得し、ストアに保存する
    this.$store.dispatch("getLocalStrage");
  }
};
</script>