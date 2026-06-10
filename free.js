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
const drawerCartItems = document.getElementById("drawer-cart-items");
const cartPageItems = document.getElementById("cart-page-items");

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
  const id = card.dataset.id;
  const existing = cart.find(item => item.id === id);

if (existing) {
  existing.qty += 1;
} else {
  cart.push({
    id,
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
  updateShippingBar();
  btnCard.textContent = "In Cart";
  btnCard.disabled = true;
  btnCard.classList.add("in-cart");
}

//写入html的信息在cart

function renderCart() {
  if (drawerCartItems) {
    drawerCartItems.innerHTML = "";

    cart.forEach(item => {
      drawerCartItems.innerHTML += `
        <div class="side-cart-item">
          <img src="${item.image}" alt="${item.name}">

          <div class="side-cart-sentence">
            <div class="side-cart-info">
              <div>
                <p class="side-cart-category">${item.category}</p>
                <h3>${item.name}</h3>
                ${item.size ? `<p class="cart-size">Size: ${item.size}</p>` : ""}
                <p>${item.price}</p>
              </div>

              <button class="remove-items" onclick="removeItem('${item.id}')">
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 0.5L9.6695 9.44026M9.6695 0.5L0.5 9.44026"
      stroke="#12284C"
      stroke-linecap="round"
      stroke-linejoin="round"/>
  </svg>
              </button>
            </div>

            <div class="quantity-item">
              <button onclick="changeQuantity('${item.id}', -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
        </div>
      `;
    });
  }

  if (cartPageItems) {
    cartPageItems.innerHTML = "";

    cart.forEach(item => {
      cartPageItems.innerHTML += `
        <div class="cart-row">
          <div class="cart-product">
            <img src="${item.image}" alt="${item.name}">
            <div>
              <p class="cart-category">${item.category}</p>
              <h3>${item.name}</h3>
            </div>
          </div>

          <p class="cart-price">${item.price}</p>

          <div class="quantity-item">
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>

          <p class="cart-total">$${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}</p>
        </div>
      `;
    });
  }

  updateCartCount();
  updateCartTotal();
  updateShippingBar();
  updateCheckoutTotal();
}

function changeQuantity(id, value) {
  const product = cart.find(item => item.id === id);

  if (!product) return;

  product.qty += value;

  if (product.qty <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  renderCart();
  updateShippingBar();
  updateCheckoutTotal();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();
  updateShippingBar();
  updateCheckoutTotal();

  document.querySelectorAll(".result-card").forEach(card => {
    if (card.dataset.id === id) {
      const button = card.querySelector("button");

      if (button) {
        button.textContent = "Add to cart";
        button.disabled = false;
        button.classList.remove("in-cart");
      }
    }
  });

  document.querySelectorAll(".add-cart-btn").forEach(button => {
    if (button.dataset.id === id) {
      button.textContent = `Add to cart - ${button.dataset.price}`;
      button.disabled = false;
      button.classList.remove("in-cart");
    }
  });
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

document.addEventListener("DOMContentLoaded", renderCart);


function updateCartTotal() {
  const total = cart.reduce((sum, item) => {
    const priceNumber = parseFloat(item.price.replace("$", ""));
    return sum + priceNumber * item.qty;
  }, 0);

  document.querySelectorAll(".side-cart-total strong, .cart-summary strong")
    .forEach(totalText => {
      totalText.textContent = `$${total.toFixed(2)} AUD`;
    });
}



//free
function updateShippingBar() {
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.qty;
  }, 0);

  const freeShippingTarget = 150;
  const remaining = freeShippingTarget - total;
  const progress = Math.min((total / freeShippingTarget) * 100, 100);

  const shippingMessages = document.querySelectorAll(".shipping-message");
  const shippingProgressBars = document.querySelectorAll(".shipping-progress");

  shippingMessages.forEach(message => {
    if (total >= freeShippingTarget) {
      message.textContent = "You have free shipping!";
    } else {
      message.textContent = `Spend $${remaining.toFixed(2)} more to reach free shipping!`;
    }
  });

  shippingProgressBars.forEach(bar => {
    bar.style.width = `${progress}%`;
  });
}

function updateCheckoutTotal() {

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.qty;
  }, 0);

  const grandTotal = subtotal + 5;

  const grandTotalText =
    document.getElementById("grand-total");

  if (grandTotalText) {
    grandTotalText.textContent =
      `$${grandTotal.toFixed(2)} AUD`;
  }
}



function showOrderPopup() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("order") === "success") {
    const orderOverlay = document.getElementById("orderOverlay");

    if (orderOverlay) {
      orderOverlay.classList.add("active");
    }
  }
}

function closeOrderPopup() {
  const orderOverlay = document.getElementById("orderOverlay");

  if (orderOverlay) {
    orderOverlay.classList.remove("active");
  }

  window.history.replaceState({}, document.title, "index.html");
}

document.addEventListener("DOMContentLoaded", showOrderPopup);

function toggleAccordion(button){

  const item =
    button.closest(".accordion-item");

  item.classList.toggle("active");

}

function addProductPageToCart(btn) {
 const product = {
  id: btn.dataset.id,
  name: btn.dataset.name,
  category: btn.dataset.category,
  price: btn.dataset.price,
  size: btn.dataset.size,
  image: btn.dataset.image,
  qty: 1
};
  

  if (!product.name || !product.category || !product.price || !product.image) {
    console.log("Product data missing", product);
    return;
  }

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }

  saveCart();
  renderCart();
  openCart();

 const oldText = btn.textContent;

btn.textContent = "In Cart";

setTimeout(() => {
  btn.textContent = oldText;
}, 4000);
}


function clearCart() {
  cart = [];

  localStorage.removeItem("cartItems");

  updateCartCount();
}


const sizeButtons =
document.querySelectorAll(".size-btn");

const productPrice =
document.getElementById("product-price");

const currentSize =
document.getElementById("current-size");

const addCartBtn =
document.querySelector(".add-cart-btn");

sizeButtons.forEach(button => {

  button.addEventListener("click", () => {

    sizeButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const price =button.dataset.price;

    const size = button.dataset.size;

    productPrice.textContent =price;

    currentSize.textContent = size;

    addCartBtn.textContent = `Add to cart - ${price}`;

    addCartBtn.dataset.price =
      price;
      addCartBtn.dataset.id = button.dataset.id;
      addCartBtn.dataset.size = size;
  });

});

