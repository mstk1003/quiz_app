<template>
  <div>
    <b-dropdown :text="text" class="m-md-2">
      <b-dropdown-item
        v-for="category in categories"
        v-bind:key="category.id"
        @click="selectCategory(category.id)"
        >{{ category.name }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Any Categories",
      categories: [],
    };
  },
  methods: {
    selectCategory(id) {
      this.text = this.categories.find((category) => category.id === id).name;
      this.$emit("getCategoryId", id);
    },
  },
  mounted() {
    fetch("https://opentdb.com/api_category.php", {
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        this.categories = jsonData.trivia_categories;
      });
  },
};
</script>