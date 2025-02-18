document.addEventListener("DOMContentLoaded", function () {
    loadCart(); // Load cart on page load

    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        loadCart(); // Refresh cart
    });
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalAmountElement = document.getElementById("total-amount");
    cartItemsContainer.innerHTML = "";
    
    let totalAmount = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="decrease-qty" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
        `;

        cartItemsContainer.appendChild(row);
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);

    // Add event listeners for quantity update and removal
    document.querySelectorAll(".increase-qty").forEach(button => {
        button.addEventListener("click", function () {
            updateQuantity(this.dataset.index, 1);
        });
    });

    document.querySelectorAll(".decrease-qty").forEach(button => {
        button.addEventListener("click", function () {
            updateQuantity(this.dataset.index, -1);
        });
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            removeItem(this.dataset.index);
        });
    });
}

// Function to update item quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart.splice(index, 1); // Remove if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart
}

// Function to remove an item completely
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Refresh cart
}


document.addEventListener("DOMContentLoaded", function () {
    loadCart();

    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        loadCart();
    });

    document.getElementById("checkout").addEventListener("click", function () {
        checkout();
    });
});

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let confirmation = confirm(`Your total is $${totalAmount.toFixed(2)}. Proceed to checkout?`);

    if (confirmation) {
        localStorage.setItem("totalAmount", totalAmount.toFixed(2)); // Store total in localStorage
        localStorage.removeItem("cart"); // Clear cart
        window.location.href = "shop-payment.html"; // Redirect to payment page
    }
}

