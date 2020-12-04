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
      userName: "",
      userId: "",
      password: ""
    };
  },
  methods: {
    registerUserInfo() {
      this.$store.dispatch("getLocalStrage");
      this.$store.commit("registerUserInfo", {
        userName: this.userName,
        userId: this.userId,
        password: this.password,
        auth: false
      });

      this.$store.dispatch("setLocalStrage");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>