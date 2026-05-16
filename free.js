/*for homepage btn cat or dog*/
const petButtons = document.querySelectorAll(".pet-tab button ");
const productGrids = document.querySelectorAll(".product-grid");

petButtons.forEach((button) => {
  button.addEventListener("click", () => {

     petButtons.forEach((btn) => {
      btn.classList.remove("tab-active");
      btn.classList.add("tab");
    });

 //current btn
  button.classList.remove("tab");
    button.classList.add("tab-active");

  productGrids.forEach((grid) => {
      grid.classList.remove("active");});
//show colum.

     const petType = button.dataset.pet;

      document.querySelector(`.${petType}-products`).classList.add("active");
  });
});


//this is for tes

const reviewButtons = document.querySelectorAll(".review-bn");

const reviews = {
  kitten: {
 image: "img/kittten.jpg",
 text: "He has always been very fussy with food, this is the only treat he loves and enjoys! Will definitely buy again and again.",
    name: "- Sarah"
  },
  puppies: {
    image: "img/dogimage.jpg",
    text: "Our puppies loved the treats straight away. They are natural, easy to serve, and perfect for daily rewards.",
    name: "- Emma"
  },
  fussy: {
    image: "img/catimae.jpg",
    text: "My pet is usually very picky, but this product made feeding time much easier and more enjoyable.",
    name: "- Jessie"
  },
  raw: {
    image: "img/mian-review.jpg",
    text: "A great way to add natural raw nutrition into our pet’s daily meals while keeping it simple.",
    name: "- David"
  },
  service: {
    image: "img/shampoo.jpg",
    text: "The delivery was fast and the service was helpful. I felt confident ordering again.",
    name: "- Oliver"
  }
};

reviewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    reviewButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedReview = reviews[button.dataset.review];

    document.getElementById("review-image").src = selectedReview.image;
    document.getElementById("review-text").textContent = selectedReview.text;
    document.getElementById("review-name").textContent = selectedReview.name;
  });
});


//this is for search result
const searchInput = document.getElementById("search-input");
const productsArea =document.getElementById("products-show");
const suggestionArea = document.querySelector(".search-suggestion");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const value = searchInput.value.trim().toLowerCase();

    if (value === "food") {
      productsArea.style.display = "block";
      suggestionArea.style.display = "flex";
    } else {
      productsArea.style.display = "none";
      suggestionArea.style.display = "none";
    }
  });
}

// add to cart link to the refresh of the cart
const quantityText = document.querySelector(".quantity-item span");
let count = Number(localStorage.getItem("cartCount")) || 0;

const cartCount = document.getElementById("cart-count");



const drawerCartCount = document.getElementById("drawer-cart-count");

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = count;
  }
  if (drawerCartCount) {
    drawerCartCount.textContent = count;}
  if (quantityText) {
    quantityText.textContent = count;
  }
  localStorage.setItem("cartCount", count);
}

updateCartCount();
function addToCart() {
  count++;
  updateCartCount();
  openCart();
}

//加或-
function changeQuantity(value) {
  const quantityText = document.querySelector(".quantity-item span");
  count += value;
  if (count <= 0) {
    removeItem(document.querySelector(".remove-items"));
    return;
  }
  if (quantityText) {
    quantityText.textContent = count;
  }
  
  updateCartCount();
}

// remove
function removeItem(button) {
  const item = button.closest(".side-cart-item");

  if (item) {
    item.remove();
  }
  count = 0;
  updateCartCount();
}

// drawer
function openCart(event) {
  if (event) event.preventDefault();
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}



//open drawer
function openCart(event) {
  event.preventDefault();
  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
 }

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}



