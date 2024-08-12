// Function to change the main product image
function changeImage(imageUrl) {
  document.getElementById("mainImage").src = imageUrl;
}

// Function to change quantity
function increaseQuantity() {
  let quantityInput = document.getElementById("quantity");
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
  let quantityInput = document.getElementById("quantity");
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

// Function to get the product ID from the query string
function getProductIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// Fetch and display the product details
async function displayProductDetails() {
  const productId = getProductIdFromQuery();
  console.log(productId);

  if (productId) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const product = await response.json();

      // Display the product details on the page
      document.querySelectorAll(".product-title").forEach((element) => {
        element.textContent = product.title;
      });

      document.querySelectorAll(".price").forEach((element) => {
        element.textContent = `\$${product.price}`;
      });

      document.querySelectorAll(".description").forEach((element) => {
        element.textContent = product.description;
      });

      document.querySelectorAll(".product-image").forEach((element) => {
        element.src = product.image;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("Product ID not found in the URL.");
  }
}

displayProductDetails();
