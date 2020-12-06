<template>
  <div>
    <h1>Sign Up</h1>
    <router-link to="/login">LogIn</router-link>
    <b-form-input
      v-model="userName"
      type="text"
      placeholder="Enter your Name"
    ></b-form-input>
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
    <b-button pill @click="registerUserInfo" variant="danger">Submit</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ユーザー名
      userName: "",
      // ユーザーID
      userId: "",
      // パスワード
      password: ""
    };
  },
  methods: {
    /**
     * ユーザー情報をストアに登録する。
     */
    registerUserInfo() {
      // ローカルストレージからユーザー情報を取得
      this.$store.dispatch("getUserInfoFromLocalStrage");
      // ユーザー情報を登録する
      this.$store.commit("registerUserInfo", {
        userName: this.userName,
        userId: this.userId,
        password: this.password,
        auth: false
      });

      // ローカルストレージにユーザー情報を保存する
      this.$store.dispatch("setUserInfo2LocalStrage");
      // ログイン画面へ遷移する
      this.$router.push({ path: "/login" });
    }
  }
};
</script>