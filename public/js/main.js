// DOM Elements
const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu-wrapper');
const menuShadow = document.querySelector('.menu-shadow');
const hamburgerIcon = document.querySelector('.nav-hamburger-icon');
const closeIcon = document.querySelector('.nav-close-icon');

// Animation Elements
const animatedElements = document.querySelectorAll('.animation-content');
const bannerElements = document.querySelectorAll('[data-w-id^=""]');

// Initialize animations
function initAnimations() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Animate banner elements
    bannerElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 200);
    });
}

// Menu Toggle
function toggleMenu() {
    const isOpen = navMenu.classList.toggle('active');
    menuShadow.classList.toggle('active');
    hamburgerIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Event Listeners
menuButton.addEventListener('click', toggleMenu);
menuShadow.addEventListener('click', toggleMenu);

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
}); 