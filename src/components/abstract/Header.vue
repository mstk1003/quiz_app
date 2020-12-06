<template>
  <div>
    <b-nav>
      <b-navbar-brand href="#" @click="goHome"
        ><b>English Quiz Charrenge !</b></b-navbar-brand
      >
      <b-nav-item class="right" @click="goProfile"
        ><b>{{ userName }}</b></b-nav-item
      >
      <slot></slot>
    </b-nav>
  </div>
</template>

<script>
export default {
  props: {
    numCorrect: Number,
    numTotal: Number
  },
  data() {
    return {
      userName: this.$store.state.userInfo.userName
    };
  },
  methods: {
    goProfile() {
      this.$router.push({ name: "profile" }).catch(() => {});
    },
    goHome() {
      this.$router.push({ name: "home" }).catch(() => {});
    }
  }
};
</script>
<style scoped>
.nav {
  background-color: #dc3545;
}
.navbar-brand {
  margin-left: 15px;
}
.nav-link {
  color: white;
}
.navbar-brand {
  color: white;
}
</style>