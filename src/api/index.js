export default{
  getCategory(){
  return fetch("https://opentdb.com/api_category.php", {
        method: "get",
      });
  },
  getQuestions(categoryId, difficulty) {
    return fetch(
      "https://opentdb.com/api.php?amount=10&category=" + categoryId + "&difficulty=" + difficulty,
      {
        method: "get"
      }
    )
  }
}