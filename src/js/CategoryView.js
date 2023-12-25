import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-discription");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });

    //update DOM
    this.categories = Storage.getAllCategories();
    this.createCategoryList();
    categoryDescription.value = " ";
    categoryTitle.value = " ";
  }

  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoryList() {
    let options = ` <option class="bg-slate-500 text-slate-300" value="">
    select a category
  </option>`;
    this.categories.forEach((element) => {
      options += ` <option class="bg-slate-500 text-slate-300" value=${element.id}>
    ${element.title}
  </option>`;
    });
    const categoryDOM = document.getElementById("product-category");
    categoryDOM.innerHTML = options;
  }
}
export default new CategoryView();
