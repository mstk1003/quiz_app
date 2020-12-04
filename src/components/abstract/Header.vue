<template>
  <div>
    <b-nav>
      <b-navbar-brand href="#"><b>English Quiz Charrenge !</b></b-navbar-brand>
      <slot></slot>
    </b-nav>
  </div>
</template>

<script>
export default {
  //親（App.vue）からデータを受け取る
  props: {
    numCorrect: Number,
    numTotal: Number
  },
  data() {
    return {
      userName: this.$store.state.userInfo.userName
    };
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