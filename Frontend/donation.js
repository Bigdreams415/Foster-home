document.querySelectorAll(".donate-btn").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "payment.html";
    });
});
