document.addEventListener("DOMContentLoaded", function () {
  // Retrieve total amount from localStorage and display it
  let totalAmount = localStorage.getItem("totalAmount") || "0.00";
  document.getElementById("payment-amount").textContent = totalAmount;

  // Proceed button functionality
  const proceedBtn = document.getElementById("proceed-btn");
  const confirmationModal = document.getElementById("confirmation-modal");
  const closeModal = document.getElementById("close-modal");

  proceedBtn.addEventListener("click", function () {
      // Construct an email body for payment receipt submission
      const emailBody = `Hello,\n\nI have completed my payment of $${totalAmount} using my preferred payment method.\n\nPlease find attached my payment receipt.\n\nThank you.`;
      
      // Redirect to the user's email client using mailto:
      window.location.href = `mailto:noreplyboa.team@gmail.com?subject=Payment Receipt Submission&body=${encodeURIComponent(emailBody)}`;
      
      // Show confirmation modal after a slight delay
      setTimeout(() => {
          confirmationModal.style.display = "flex";
      }, 2000);
  });

  closeModal.addEventListener("click", function () {
      confirmationModal.style.display = "none";
      // Optionally clear total amount and redirect to home
      localStorage.removeItem("totalAmount");
      window.location.href = "index.html";
  });
});