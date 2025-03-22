
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile menu toggle
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
document.querySelector('nav').appendChild(mobileMenu);

mobileMenu.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});


// JavaScript for Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to show the current slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = (i === index) ? "1" : "0";
    });
}

// Auto slide change
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Start the slider
setInterval(nextSlide, 5000);
showSlide(currentSlide);



 
// JavaScript for Meet the Children Section

function openModal(name, imgSrc, story) {
    document.getElementById("modal-name").innerText = name;
    document.getElementById("modal-img").src = imgSrc;
    document.getElementById("modal-story").innerText = story;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Close modal if clicked outside content
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeModal();
    }
});


//our mission and vision section


document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 200);
    });
});

//success and impact section

document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll(".counter");
    
    function animateCount(counter) {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 500;
        
        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    }
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
});

//live imapct sections

document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([10, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Example impact markers
    var locations = [
        { coords: [40.7128, -74.0060], text: 'New York - 5,000 Children Helped' },
        { coords: [34.0522, -118.2437], text: 'Los Angeles - 3,500 Meals Provided' },
        { coords: [51.5074, -0.1278], text: 'London - 1,200 Homes Built' },
        { coords: [48.8566, 2.3522], text: 'Paris - 8,000 Volunteers Engaged' }
    ];

    locations.forEach(function(location) {
        L.marker(location.coords).addTo(map)
            .bindPopup(location.text)
            .openPopup();
    });
});

// Sample Data for Children's Profiles
const children = [
    {
        name: "Alice",
        age: "8 years",
        gender: "female",
        bio: "Loves drawing and dreams of becoming an artist.",
        photo: "images/young-woman",
        sponsored: false,
    },
    {
        name: "John",
        age: "6 years",
        gender: "male",
        bio: "Enjoys playing soccer and wants to be a footballer.",
        photo: "images/ball",
        sponsored: true,
    },
    {
        name: "Maria",
        age: "10 years",
        gender: "female",
        bio: "Loves reading and dreams of becoming a teacher.",
        photo: "images/reading",
        sponsored: false,
    },
    {
        name: "Success and Victoria",
        age: "12 years",
        gender: "female",
        bio: "Enjoys science experiments and wants to be a scientist.",
        photo: "images/chemistry-studen.webp",
        sponsored: false,
    },
];

// Function to Render Profiles
function renderProfiles(filteredChildren) {
    const profilesGrid = document.getElementById("profiles-grid");
    profilesGrid.innerHTML = ""; // Clear existing profiles

    filteredChildren.forEach((child) => {
        const template = document.getElementById("profile-template");
        const profileCard = template.content.cloneNode(true);

        profileCard.querySelector(".profile-photo").src = child.photo;
        profileCard.querySelector(".profile-name").textContent = child.name;
        profileCard.querySelector(".profile-age").textContent = child.age;
        profileCard.querySelector(".profile-bio").textContent = child.bio;

        const sponsorButton = profileCard.querySelector(".sponsor-button");
        const sponsorStatus = profileCard.querySelector(".sponsor-status");

        if (child.sponsored) {
            sponsorButton.disabled = true;
            sponsorButton.textContent = "Sponsored";
            sponsorStatus.textContent = "Thank you for your support!";
        } else {
            sponsorButton.addEventListener("click", () => {
                sponsorButton.disabled = true;
                sponsorButton.textContent = "Sponsored";
                sponsorStatus.textContent = "Thank you for your support!";
                child.sponsored = true;
            });
        }

        profilesGrid.appendChild(profileCard);
    });
}

// Initial Render
renderProfiles(children);

// Filter Functionality
document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredChildren = children.filter((child) =>
        child.name.toLowerCase().includes(searchTerm)
    );
    renderProfiles(filteredChildren);
});

document.getElementById("age-filter").addEventListener("change", (e) => {
    const ageRange = e.target.value;
    const filteredChildren = children.filter((child) => {
        const age = parseInt(child.age);
        if (ageRange === "0-5") return age >= 0 && age <= 5;
        if (ageRange === "6-10") return age >= 6 && age <= 10;
        if (ageRange === "11-15") return age >= 11 && age <= 15;
        return true;
    });
    renderProfiles(filteredChildren);
});

document.getElementById("gender-filter").addEventListener("change", (e) => {
    const gender = e.target.value;
    const filteredChildren = children.filter((child) =>
        gender ? child.gender === gender : true
    );
    renderProfiles(filteredChildren);
});


 //success stories section

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const stories = document.querySelectorAll(".success-story");
    const prevBtn = document.querySelector(".success-stories-prev");
    const nextBtn = document.querySelector(".success-stories-next");

    function showStory(n) {
        stories.forEach(story => story.classList.remove("active"));
        stories[n].classList.add("active");
    }

    function nextStory() {
        index = (index + 1) % stories.length;
        showStory(index);
    }

    function prevStory() {
        index = (index - 1 + stories.length) % stories.length;
        showStory(index);
    }

    prevBtn.addEventListener("click", prevStory);
    nextBtn.addEventListener("click", nextStory);

    showStory(index);
    setInterval(nextStory, 5000); // Auto-slide every 5 seconds
});
 
//Hamburger menu functionality

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    navLinks.classList.toggle('active');

    // Animate the hamburger menu
    menuToggle.classList.toggle('open');
}

//animation for the miision section
function revealOnScroll() {
    const cards = document.querySelectorAll(".mission-card");
    
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardPosition < windowHeight - 50) {
            card.classList.add("show");
        } else {
            card.classList.remove("show"); // Remove class if scrolled out of view
        }
    });
}

// Add scroll event listener
window.addEventListener("scroll", revealOnScroll);

// Trigger once on page load
revealOnScroll();
