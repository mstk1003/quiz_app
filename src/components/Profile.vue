<template>
  <div>
    <Header>
      <b-nav-item class="right" href="profile"
        ><b>{{ userName }}</b></b-nav-item
      >
      <b-nav-item href="#"><b>Sign Out</b></b-nav-item>
    </Header>
  </div>
</template>

<script>
import Header from "@/components/abstract/Header.vue";

export default {
  data() {
    return {
      // ユーザー名
      userName: this.$store.state.userInfo.userName,
      // レコード
      records: this.$store.state.records
    };
  },
  components: {
    Header
  }
};
</script>