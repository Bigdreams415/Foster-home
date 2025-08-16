document.querySelectorAll(".donate-btn").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "payment.html";
    });
});

// Donor Hall of Fame interactions
document.addEventListener('DOMContentLoaded', function () {
  // open modal when clicking "View Profile"
  document.querySelectorAll('.donor-card .view-profile').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const card = e.target.closest('.donor-card');
      if (!card) return;

      const name = card.dataset.name || 'Donor';
      const amount = card.dataset.amount ? `$${Number(card.dataset.amount).toLocaleString()}` : '';
      const title = card.dataset.title || '';
      const bio = card.dataset.bio || '';
      const image = card.dataset.image || '';

      // populate modal
      const modal = document.getElementById('donor-modal');
      modal.querySelector('#modal-title').textContent = name;
      modal.querySelector('#modal-titleline').textContent = title;
      modal.querySelector('#modal-amount').textContent = amount;
      modal.querySelector('#modal-bio').textContent = bio;
      const modalPhoto = modal.querySelector('#modal-photo');
      modalPhoto.src = image;
      modalPhoto.alt = name;

      // show modal
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // close modal
  const modal = document.getElementById('donor-modal');
  if (modal) {
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    const modal = document.getElementById('donor-modal');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // graceful image fallback (if image fails)
  document.querySelectorAll('.donor-photo, #modal-photo').forEach(img => {
    img.addEventListener('error', function () {
      // fallback to initials avatar (simple SVG data URL)
      const alt = img.alt || 'Donor';
      const initials = alt.split(' ').map(s => s[0] || '').join('').slice(0,2).toUpperCase();
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
                     <rect width='100%' height='100%' fill='#f4f6f8'/>
                     <text x='50%' y='50%' font-size='72' dominant-baseline='middle' text-anchor='middle' fill='#6c7884' font-family='Arial, sans-serif'>${initials}</text>
                   </svg>`;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
  });
});
