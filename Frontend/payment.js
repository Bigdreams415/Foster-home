// document.addEventListener("DOMContentLoaded", function () {
//     const donationButtons = document.querySelectorAll(".donation-amount");
//     const customAmountInput = document.getElementById("custom-amount");
//     const paymentButtons = document.querySelectorAll(".payment-option");
//     const otherMethodInput = document.getElementById("other-method");
//     const contactButton = document.getElementById("contact-management");
//     const confirmationMessage = document.getElementById("confirmation-message");
//     const confirmationModal = document.getElementById("confirmation-modal");
//     const closeModal = document.getElementById("close-modal");

//     let selectedAmount = "";
//     let selectedMethod = "";

//     donationButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             if (this.classList.contains("custom")) {
//                 customAmountInput.style.display = "block";
//                 customAmountInput.focus();
//                 selectedAmount = "";
//             } else {
//                 customAmountInput.style.display = "none";
//                 selectedAmount = this.getAttribute("data-amount");
//             }
//         });
//     });

//     customAmountInput.addEventListener("input", function () {
//         selectedAmount = this.value;
//     });

//     paymentButtons.forEach(button => {
//         button.addEventListener("click", function () {
//             if (this.classList.contains("other")) {
//                 otherMethodInput.style.display = "block";
//                 otherMethodInput.focus();
//                 selectedMethod = "";
//             } else {
//                 otherMethodInput.style.display = "none";
//                 selectedMethod = this.getAttribute("data-method");
//             }
//         });
//     });

//     otherMethodInput.addEventListener("input", function () {
//         selectedMethod = this.value;
//     });

//     contactButton.addEventListener("click", function () {
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const message = document.getElementById("message").value;

//         if (!selectedAmount || !selectedMethod || !name || !email) {
//             alert("Please fill in all required fields.");
//             return;
//         }

//         const emailBody = `Hello,\n\nI would like to donate $${selectedAmount}.\n\nPayment Method: ${selectedMethod}\n\nName: ${name}\nEmail: ${email}\n\nAdditional Message: ${message}\n\nThank you.`;
        
//         window.location.href = `mailto:mmanagementmmn@gmail.com?subject=Donation Inquir/Paymenty&body=${encodeURIComponent(emailBody)}`;
        
//         confirmationMessage.style.display = "block";
//         confirmationModal.style.display = "block";
//     });

//     closeModal.addEventListener("click", function () {
//         confirmationModal.style.display = "none";
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const donationButtons = document.querySelectorAll(".amount-btn");
    const customAmountInput = document.getElementById("custom-amount");
    const paymentButtons = document.querySelectorAll(".payment-btn");
    const contactButton = document.getElementById("contact-btn");

    let selectedAmount = "";
    let selectedPaymentMethod = "";

    function resetSelection(buttons) {
        buttons.forEach(btn => btn.classList.remove("selected"));
    }

    // Handle donation amount selection
    donationButtons.forEach(button => {
        button.addEventListener("click", function () {
            resetSelection(donationButtons);
            this.classList.add("selected");

            if (this.classList.contains("custom")) {
                customAmountInput.style.display = "block";
                customAmountInput.focus();
                selectedAmount = "";
            } else {
                customAmountInput.style.display = "none";
                customAmountInput.value = "";
                selectedAmount = this.getAttribute("data-amount");
            }
        });
    });

    customAmountInput.addEventListener("input", function () {
        selectedAmount = this.value;
    });

    // Handle payment method selection
    paymentButtons.forEach(button => {
        button.addEventListener("click", function () {
            resetSelection(paymentButtons);
            this.classList.add("selected");
            selectedPaymentMethod = this.getAttribute("data-method");
        });
    });

    // Handle contact button click
    contactButton.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const notes = document.getElementById("notes").value.trim();

        if (!selectedAmount || !selectedPaymentMethod || !name || !email) {
            alert("Please fill in all required fields before proceeding.");
            return;
        }

        const emailBody = `
Hello,

I would like to make a donation of $${selectedAmount}.

**Payment Method: ${selectedPaymentMethod}
**Name: ${name}
**Email: ${email}
${phone ? `**Phone: ${phone}` : ""}
${notes ? `**Notes: ${notes}` : ""}

Thank you.`;

        window.location.href = `mailto:mmanagementmmn@gmail.com?subject=Donation Inquiry&body=${encodeURIComponent(emailBody)}`;
    });
});

