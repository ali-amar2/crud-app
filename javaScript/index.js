// * Html Elements 
var nameInput = document.getElementById("name")
var categoryInput = document.getElementById("category")
var priceInput = document.getElementById("price")
var descriptionInput = document.getElementById("description")
var imageInput = document.getElementById("file")
var productContainer = document.getElementById("productContainer")
var searchInput = document.getElementById("search");

// ! App Variables
var productList = []
if (localStorage.getItem("productList") !== null) {
    var productList = JSON.parse(localStorage.getItem("productList"));
}
displayAllProduct();

// ^ Functions  
function addProducts() {
    var product = {
        name: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        description: descriptionInput.value,
        Image: "./Images/" + imageInput.files[0].name,
    }
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProduct(productList.length - 1)
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
                        <p class="text-secondary">${productList[index].description}
                        </p>
                        <button class="btn btn-outline-warning me-2">Update</button>
                        <button class="btn btn-outline-danger" onclick="deleteProduct(${index})">Delete</button>
                    </div>
                </div>
    `
    productContainer.innerHTML += productHtml;
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
    localStorage.setItem("productList", JSON.stringify(productList))
    productContainer.innerHTML = "";
    displayAllProduct();

}

function searchProducts() {
    productContainer.innerHTML = "";
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchInput.value)) {
            displayProduct(i);
        }
    }
}
