import Storage from "./Storage.js";
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();

  console.log(ProductView);
  console.log(CategoryView);
  ProductView.createProductList();
  CategoryView.createCategoryList();
});
