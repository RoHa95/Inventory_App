import Storage from "./Storage.js";
const productTitle = document.querySelector("#product-title");
const productCategory = document.querySelector("#product-category");
const addNewProductBtn = document.querySelector("#add-new-product");
const productQuantity = document.querySelector("#product-quantity");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const category = productCategory.value;
    const quantity = productQuantity.value;
    if (!title || !category || !quantity) return;
    Storage.saveProducts({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProductList(this.products);
    //update DOM
    // console.log(this.products);
    productCategory.value = " ";
    productTitle.value = " ";
    productQuantity.value = " ";
  }

  setApp() {
    this.products = Storage.getAllProducts();
    console.log(this.products);
  }
  createProductList(products) {
    let result = " ";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += ` <div class="flex items-center justify-between mb-8">
        <span class="text-slate-400">${item.title}</span>
        <div class="flex items-center gap-x-3">
          <span class="to-slate-400">${new Date().toLocaleDateString(
            "fa-IR"
          )}</span>
          <span
            class="block px-3 border border-slate-500 text-slate-400 text-sm rounded-2xl"
            >${selectedCategory.title}</span
          >
          <span
            class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-2 border-slate-300"
            >${item.quantity}</span
          >
          <button data-id=${item.id}
            class="border px-2 py-0.5 rounded-2xl border-red-400 text-red-500"
          >
            delete
          </button>
        </div>
      </div>`;
    });
    const productsDOM = document.querySelector(".product-list");
    productsDOM.innerHTML = result;
    console.log(this.products);
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) => {
      return p.title.toLowerCase().includes(value);
    });

    this.createProductList(filteredProducts);
  }
  sortProducts(e) {
    const selectedSort = e.target.value;
    console.log(selectedSort);
    this.products = Storage.getAllProducts(selectedSort);
    this.createProductList(this.products);
  }
}
export default new ProductView();
