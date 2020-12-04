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
    // ドロップダウンに表示するアイテム
    items: Array
  },
  data() {
    return {
      // ドロップダウンから選択したアイテム
      selectedItem: "Choose"
    };
  },
  methods: {
    /**
     * 選択したアイテムを親コンポーネントに渡す
     * @param item 選択した要素
     */
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