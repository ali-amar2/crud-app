// * Html Elements
var nameInput = document.getElementById("name");
var categoryInput = document.getElementById("category");
var priceInput = document.getElementById("price");
var descriptionInput = document.getElementById("description");
var imageInput = document.getElementById("file");
var productContainer = document.getElementById("productContainer");
var searchInput = document.getElementById("search");

// ! App Variables

var productList = [];
var currentEditIndex = null;
var addBtn = document.querySelector("button[onclick='addProducts()']");
if (localStorage.getItem("productList") !== null) {
  productList = JSON.parse(localStorage.getItem("productList"));
}
displayAllProduct();

// ^ Functions

function addProducts() {
  var product = {
    name: nameInput.value,
    category: categoryInput.value,
    price: priceInput.value,
    description: descriptionInput.value,
    Image: imageInput.files[0]
      ? "./Images/" + imageInput.files[0].name
      : currentEditIndex !== null
      ? productList[currentEditIndex].Image
      : "",
  };
  if (currentEditIndex === null) {
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProduct(productList.length - 1);
  } else {
    productList[currentEditIndex] = product;
    localStorage.setItem("productList", JSON.stringify(productList));
    productContainer.innerHTML = "";
    displayAllProduct();
    addBtn.textContent = "Add Product";
    currentEditIndex = null;
  }
  clearInputs();
}

function displayProduct(index) {
  var productHtml = `
    <div class="card col-sm-6 col-md-4 col-lg-3 mt-4 py-3 d-flex">
        <div class="inner text-white p-2">
            <img src="${productList[index].Image}" alt="" class="w-100 mb-3">
            <div class="d-flex justify-content-between">
                <h2 class="h5">${productList[index].name}</h2>
                <span>${productList[index].price + " $"}</span>
            </div>
            <h3 class="h6">${productList[index].category}</h3>
            <p class="text-secondary">${productList[index].description}</p>
            <button class="btn btn-outline-warning me-2" onclick="updateProduct(${index})">Update</button>
            <button class="btn btn-outline-danger" onclick="deleteProduct(${index})">Delete</button>
        </div>
    </div>
    `;
  productContainer.innerHTML += productHtml;
}
function updateProduct(index) {
  nameInput.value = productList[index].name;
  categoryInput.value = productList[index].category;
  priceInput.value = productList[index].price;
  descriptionInput.value = productList[index].description;
  imageInput.value = null;
  currentEditIndex = index;
  addBtn.textContent = "Update Product";
}

function displayAllProduct() {
  for (var i = 0; i < productList.length; i++) {
    displayProduct(i);
  }
}

function clearInputs() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
  imageInput.value = null;
}
function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  productContainer.innerHTML = "";
  displayAllProduct();
}

function searchProducts() {
  productContainer.innerHTML = "";
  var searchValue = searchInput.value.toLowerCase();
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue)) {
      displayProduct(i);
    }
  }
}
