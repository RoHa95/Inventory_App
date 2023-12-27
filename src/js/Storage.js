const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    quantity: 1,
    createdAt: "2023-12-28T15:02:54.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    quantity: 1,
    createdAt: "2023-12-28T15:02:54.411Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of application",
    createdAt: "2021-12-18T15:02:54.411Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backend of application",
    createdAt: "2023-12-10T21:12:01.411Z",
  },
];
export default class Storage {
  static getAllCategories() {
    //products, categories => local storage
    const savedCategory = JSON.parse(localStorage.getItem("category")) || [];

    //sort => desending
    const sortedCategories = savedCategory.sort((a, b) => {
      new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    });
    return sortedCategories;
  }
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    //new category
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    //edit
    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products1")) || [];

    //sort => desending
    return savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
  }
  static saveProducts(productToSave) {
    const saveProducts = Storage.getAllProducts();
    //new category
    const existedItem = saveProducts.find((c) => c.id === productToSave.id);
    //edit
    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      //new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      saveProducts.push(productToSave);
    }
    localStorage.setItem("products1", JSON.stringify(saveProducts));
  }
}
