// Side Navigation Functions
function toggleSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('navOverlay');
    
    sideNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
}

function closeSideNav() {
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('navOverlay');
    
    sideNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close side nav when clicking on a nav item
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', closeSideNav);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add mobile menu button to navbar
    navbar.querySelector('.container').appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .mobile-menu-btn span {
        display: block;
        width: 25px;
        height: 2px;
        background-color: var(--text-color);
        margin: 5px 0;
        transition: all 0.3s ease;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 4rem;
            left: 0;
            right: 0;
            background-color: var(--background);
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Pricing Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update pricing displays with animation
            const period = button.dataset.tab;
            pricingCards.forEach(card => {
                const monthlyPrice = card.querySelector('.price.monthly');
                const annualPrice = card.querySelector('.price.annual');
                
                if (period === 'monthly') {
                    // Fade out annual price
                    annualPrice.style.opacity = '0';
                    annualPrice.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        annualPrice.classList.remove('active');
                        monthlyPrice.classList.add('active');
                        // Fade in monthly price
                        monthlyPrice.style.opacity = '1';
                        monthlyPrice.style.transform = 'translateY(0)';
                    }, 300);
                } else {
                    // Fade out monthly price
                    monthlyPrice.style.opacity = '0';
                    monthlyPrice.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        monthlyPrice.classList.remove('active');
                        annualPrice.classList.add('active');
                        // Fade in annual price
                        annualPrice.style.opacity = '1';
                        annualPrice.style.transform = 'translateY(0)';
                    }, 300);
                }
            });
        });
    });
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Setting up mobile menu');
    
    // Wait a bit for all elements to be available
    setTimeout(() => {
        const menuBtn = document.querySelector('.menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenu = document.querySelector('.close-menu');
        const menuLinks = document.querySelectorAll('.menu-link');

        console.log('Menu button:', menuBtn);
        console.log('Mobile menu:', mobileMenu);
        console.log('Close button:', closeMenu);

        // Check if elements exist
        if (!menuBtn) {
            console.log('Menu button not found');
            return;
        }
        
        if (!mobileMenu) {
            console.log('Mobile menu not found');
            return;
        }

        console.log('Mobile menu elements found, adding event listeners');

        // Force remove any existing event listeners and add new ones
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

        // Add click handler to the new button
        newMenuBtn.addEventListener('click', function(e) {
            console.log('HAMBURGER CLICKED!');
            e.preventDefault();
            e.stopPropagation();
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Menu closed');
            } else {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            }
        });

        // Add event listener to close button if it exists
        if (closeMenu) {
            closeMenu.addEventListener('click', function(e) {
                console.log('Close button clicked');
                e.preventDefault();
                e.stopPropagation();
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

    // Close menu
    closeMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Close menu first
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // If it's an anchor link (starts with #), handle smooth scrolling
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For regular page links (.html), let the default navigation happen
        });
    });
}); 