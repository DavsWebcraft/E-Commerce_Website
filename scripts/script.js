document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNav = document.getElementById("mobile-nav");

  hamburgerBtn.addEventListener("click", () => {
    mobileNav.style.display =
      mobileNav.style.display === "flex" ? "none" : "flex";
  });
});

// Handling Add-to-cart Functionality
document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.querySelector(".cart-count");
  const addToCartButton = document.querySelector(".add-to-cart-btn");

  // Function to update the cart count
  function updateCartCount(cart) {
    cartCountElement.textContent = cart.length;
  }

  // Function to add a product to the cart
  function addToCart(product) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart);
    alert(`${product.title} has been added to your cart.`);
  }

  // Event listener for the "Add to Cart" button
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productTitle = document.querySelector(
        ".product-details h1"
      ).textContent;
      const productPrice = document
        .querySelector(".price")
        .textContent.replace("$", "");
      const productSize = document.querySelector(".size-options .selected")
        ? document.querySelector(".size-options .selected").textContent
        : "M";
      const productQuantity = document.querySelector("#quantity").value;

      const product = {
        title: productTitle,
        price: parseFloat(productPrice),
        size: productSize,
        quantity: parseInt(productQuantity),
      };

      addToCart(product);
    });
  }

  // Function to select size
  document.querySelectorAll(".size-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      document
        .querySelectorAll(".size-btn")
        .forEach((btn) => btn.classList.remove("selected"));
      e.target.classList.add("selected");
    });
  });

  // Functions to handle quantity change
  document
    .querySelector(".quantity .quantity-btn:first-of-type")
    .addEventListener("click", decreaseQuantity);
  document
    .querySelector(".quantity .quantity-btn:last-of-type")
    .addEventListener("click", increaseQuantity);

  function decreaseQuantity() {
    const quantityInput = document.querySelector("#quantity");
    if (quantityInput.value > 1) {
      quantityInput.value--;
    }
  }

  function increaseQuantity() {
    const quantityInput = document.querySelector("#quantity");
    quantityInput.value++;
  }

  // Function to show cart contents
  function showCartContents() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let cartDetails = "Cart Items:\n";
    cart.forEach((item, index) => {
      cartDetails += `${index + 1}. ${item.title} - ${item.size} - ${
        item.quantity
      } pcs - $${item.price}\n`;
    });

    alert(cartDetails);
  }

  // Event listener for cart icon to display cart contents
  const cartIcon = document.querySelector(".icons a");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default action
      showCartContents();
    });
  }
});

// Function to display cart contents on the cart page
function displayCartContents() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    document.querySelector(".cart-contents").innerHTML = "Your cart is empty.";
    return;
  }

  let cartContents = "";
  cart.forEach((item) => {
    cartContents += `
        <div class="cart-item">
          <h4>${item.title}</h4>
          <p>Size: ${item.size}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${item.price}</p>
        </div>
      `;
  });

  document.querySelector(".cart-contents").innerHTML = cartContents;
}

if (document.querySelector(".cart-contents")) {
  displayCartContents();
}

// Cart Functionality
document.addEventListener("DOMContentLoaded", function () {
  const cartTable = document.querySelector(".cart-table tbody");
  const cartSummary = document.querySelector(".cart-summary");
  const subtotalElement = cartSummary.querySelector("p span");
  const totalElement = cartSummary.querySelector("p:last-child span");
  const updateCartButtons = document.querySelectorAll(".update-cart-btn");
  const removeButtons = document.querySelectorAll(".remove-item");
  const cartCountElement = document.querySelector(".cart-count");

  // Update cart total function
  function updateCartTotal() {
    let subtotal = 0;
    let totalItems = 0;
    const rows = cartTable.querySelectorAll("tr");
    rows.forEach((row) => {
      const priceElement = row.querySelector("td:nth-child(2)");
      const quantityElement = row.querySelector(".quantity-input");
      const subtotalElement = row.querySelector("td:last-child");

      const price = parseFloat(priceElement.textContent.replace("$", ""));
      const quantity = parseInt(quantityElement.value);

      const rowSubtotal = price * quantity;
      subtotalElement.textContent = `$${rowSubtotal.toFixed(2)}`;

      subtotal += rowSubtotal;
      totalItems += quantity;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${subtotal.toFixed(2)}`;

    cartCountElement.textContent = totalItems;
  }

  // Handle quantity change
  cartTable.addEventListener("change", function (event) {
    if (event.target.classList.contains("quantity-input")) {
      updateCartTotal();
    }
  });

  // Handle remove item
  cartTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const row = event.target.closest("tr");
      row.remove();
      updateCartTotal();
    }
  });

  // Handle Update Cart button
  updateCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      updateCartTotal();
    });
  });

  updateCartTotal();
});

document.addEventListener("DOMContentLoaded", function () {
  const proceedButtons = document.getElementsByClassName("checkout-btn");

  // Since getElementsByClassName returns a collection, you need to loop through it
  Array.from(proceedButtons).forEach(function (button) {
    button.addEventListener("click", function () {
      window.location.href = "../html_files/checkout.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const placeOrderButton = document.querySelector(".place-order-btn");

  placeOrderButton.addEventListener("click", function () {
    alert("Your order has been placed successfully! 🎉");
  });
});

// Function to make an API call and return the response
async function callApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Function to render categories
async function renderCategories() {
  const categoriesGrid = document.querySelector(".categories-grid");

  // Call the API to get categories
  const categories = await callApi(
    "https://fakestoreapi.com/products/categories"
  );

  if (categories && categories.length > 0) {
    categoriesGrid.innerHTML = ""; // Clear any existing content

    categories.forEach((category, index) => {
      const categoryCard = document.createElement("div");
      categoryCard.classList.add("category-card");

      // Example images, adjust paths or fetch dynamic images if available
      const images = [
        "https://www.codrey.com/wp-content/uploads/2017/12/Consumer-Electronics.png",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIefp7jor2qwG3zzdkuIxf2rdSqXIbpZ0svQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi2gfiWgwwHQWrcKgWX3nw4X2bZ5t5xCV2pw&s",
        "https://www.shutterstock.com/shutterstock/photos/2364067289/display_1500/stock-photo-fashion-woman-in-yellow-silk-dress-flowing-on-wind-dark-skinned-model-with-afro-hairstyle-in-long-2364067289.jpg",
      ];

      // Construct the inner HTML of the category card
      categoryCard.innerHTML = `
        <img src="${images[index % images.length]}" alt="Category ${
        index + 1
      }" class="category-img" />
        <div class="category-title">${category}</div>
      `;

      // Append the category card to the grid
      categoriesGrid.appendChild(categoryCard);
    });
  } else {
    categoriesGrid.innerHTML =
      "<p>Failed to load categories. Please try again later.</p>";
  }
}

// Function to render products
async function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");

  // Call the API to get products
  const products = await callApi("https://fakestoreapi.com/products");

  if (products && products.length > 0) {
    productsGrid.innerHTML = ""; // Clear any existing content

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Construct the inner HTML of the product card
      productCard.innerHTML = `
        <a href="individual_product.html?id=${product.id}">
          <img src="${product.image}" alt="${
        product.title
      }" class="product-img" />
          <h4 class="product-title">${product.title}</h4>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <div class="rating">⭐⭐⭐⭐⭐</div>
        </a>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;

      // Append the product card to the grid
      productsGrid.appendChild(productCard);
    });
  } else {
    productsGrid.innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
});
