document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".shop-nav-links");
    const burger = document.querySelector(".hamburger-menu");

    burger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});
 

//quantity selection panel
document.addEventListener("DOMContentLoaded", function () {
    // Update cart count on page load (if there are existing items)
    updateCartCount();

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const quantityPanel = document.querySelector(".quantity-panel");
    const quantityValue = document.querySelector(".quantity-value");
    const totalAmount = document.querySelector(".total-amount");
    const selectedItemName = document.querySelector(".selected-item-name");
    const confirmButton = document.querySelector(".confirm-selection");
    const cancelButton = document.querySelector(".cancel-selection");
    const increaseButton = document.querySelector(".quantity-increase");
    const decreaseButton = document.querySelector(".quantity-decrease");

    let currentItem = "";
    let currentPrice = 0;
    let quantity = 1;

    // When an "Add to Cart" button is clicked, open the quantity modal
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            currentItem = productCard.querySelector(".product-title").textContent;
            currentPrice = parseFloat(productCard.querySelector(".product-price").textContent.replace("$", ""));
            
            quantity = 1;
            quantityValue.textContent = quantity;
            totalAmount.textContent = (currentPrice * quantity).toFixed(2);
            selectedItemName.textContent = currentItem;

            quantityPanel.classList.remove("hidden"); // Show the modal panel
        });
    });

    // Increase quantity
    increaseButton.addEventListener("click", function () {
        quantity++;
        quantityValue.textContent = quantity;
        totalAmount.textContent = (currentPrice * quantity).toFixed(2);
    });

    // Decrease quantity (minimum 1)
    decreaseButton.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            totalAmount.textContent = (currentPrice * quantity).toFixed(2);
        }
    });

    // When the "Confirm" button in the modal is clicked, add the item to the cart
    confirmButton.addEventListener("click", function () {
        // Create a cart item object
        const item = {
            name: currentItem,
            price: currentPrice,
            quantity: quantity
        };

        // Retrieve the current cart from localStorage, or initialize it as an empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the item already exists in the cart (using product name as identifier)
        const existingIndex = cart.findIndex(i => i.name === currentItem);
        if (existingIndex !== -1) {
            // If it exists, update the quantity
            cart[existingIndex].quantity += quantity;
        } else {
            // Otherwise, add the new item to the cart
            cart.push(item);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update the cart count on the navbar
        updateCartCount();

        // Hide the modal panel
        quantityPanel.classList.add("hidden");

        // Optionally show a confirmation alert
        alert(`${quantity} x ${currentItem} added to cart!`);
    });

    // Cancel button simply hides the modal
    cancelButton.addEventListener("click", function () {
        quantityPanel.classList.add("hidden");
    });

    // Function to update the cart count on the navbar
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector(".cart-count").textContent = totalQuantity;
    }
});

 
// FAG
document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".icon");

            // Toggle the active class for smooth transition
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "−"; // Change to minus sign when open
            }
        });
    });
});
