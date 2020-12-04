<template>
  <div>
    <b-dropdown :text="selectedItem" variant="warning" class="m-md-2">
      <b-dropdown-item
        v-for="(item, index) in items"
        v-bind:key="index"
        @click="selectItem(item)"
        >{{ item }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  data() {
    return {
      selectedItem: "Choose"
    };
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      this.$emit("select", item);
    }
  }
};
</script>

<style>
.dropdown {
  width: 30vw;
}
</style>