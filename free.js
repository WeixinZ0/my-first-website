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

// add to cart and link to the refresh of the cart
const quantityText = document.querySelector(".quantity-item span");
let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartCount = document.getElementById("cart-count");
const drawerCartCount = document.getElementById("drawer-cart-count");
const cartItemsContainer = document.getElementById("cart-items");

function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function updateCartCount() {
  const total = cart.reduce((sum, item) =>sum + item.qty, 0);

  if (cartCount) cartCount.textContent = total;
  if (drawerCartCount) drawerCartCount.textContent = total;
}

// select the product words to test add or no
function addToCart(btnCard) {
  const card = btnCard.closest(".result-card");
  const name = card.querySelector("h2").textContent;
  const category = card.querySelector(".category").textContent;
  const price = card.querySelector(".price-result").textContent;
  const image = card.querySelector("img").src;
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      category,
      price,
      image,
      qty: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}

//写入html的信息在cart
function renderCart() {
  cartItemsContainer.innerHTML = "";
  cart.forEach(item => {
    cartItemsContainer.innerHTML += `
      <div class="side-cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div class="side-cart-sentence">

          <div class="side-cart-info">
            <div>
              <p class="side-cart-category">${item.category}</p>
              <h3>${item.name}</h3>
              <p>${item.price}</p>
            </div>

            <button class="remove-items"
              onclick="removeItem('${item.name}')">
             <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 0.5L9.6695 9.44026M9.6695 0.5L0.5 9.44026" stroke="#12284C" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button></div>
          
          <div class="quantity-item">
            <button onclick="changeQuantity('${item.name}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQuantity('${item.name}', 1)">+</button>
          </div>

        </div>
      </div>
    `;
  });

  updateCartCount();
}

function changeQuantity(name, value) {
  const product = cart.find(item => item.name === name);

  if (!product) return;

  product.qty += value;

  if (product.qty <= 0) {
    cart = cart.filter(item => item.name !== name);
  }

  saveCart();
  renderCart();
}

function removeItem(name) {
  cart = cart.filter(item => item.name !== name);

  saveCart();
  renderCart();
}

function openCart(event) {
  if (event) event.preventDefault();

  document.getElementById("cartDrawer").classList.add("active");
  document.getElementById("cartOverlay").classList.add("active");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}

renderCart();









