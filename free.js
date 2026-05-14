/*for homepage btn cat or dog*/
const petButtons = document.querySelectorAll(".pet-tab button");
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