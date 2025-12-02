// Scroll-based Page Transitions JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.scroll-container');
    const sections = document.querySelectorAll('.page-section');
    const indicators = document.querySelectorAll('.indicator');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSection = 0;
    let isTransitioning = false;
    let scrollTimeout;

    // Initialize
    init();

    function init() {
        // Set initial section as visible
        showSection(0);
        updateProgressBar();
        
        // Add scroll event listener with throttling
        scrollContainer.addEventListener('scroll', throttle(handleScroll, 16));
        
        // Add click handlers for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSection(index);
                }
            });
        });

        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        
        // Add wheel event for better control
        scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    function handleScroll() {
        if (isTransitioning) return;

        const scrollTop = scrollContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        const newSection = Math.round(scrollTop / sectionHeight);

        if (newSection !== currentSection && newSection >= 0 && newSection < sections.length) {
            transitionToSection(newSection);
        }

        updateProgressBar();
    }

    function handleWheel(e) {
        if (isTransitioning) return;

        e.preventDefault();
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set new timeout for wheel end detection
        scrollTimeout = setTimeout(() => {
            const delta = e.deltaY;
            const newSection = delta > 0 ? currentSection + 1 : currentSection - 1;
            
            if (newSection >= 0 && newSection < sections.length && newSection !== currentSection) {
                goToSection(newSection);
            }
        }, 50);
    }

    function handleKeyboard(e) {
        if (isTransitioning) return;

        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    goToSection(currentSection + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentSection > 0) {
                    goToSection(currentSection - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                goToSection(0);
                break;
            case 'End':
                e.preventDefault();
                goToSection(sections.length - 1);
                break;
        }
    }

    function goToSection(index) {
        if (index === currentSection || isTransitioning) return;
        
        // Smooth scroll to section
        const targetScroll = index * window.innerHeight;
        scrollContainer.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });

        // Trigger transition after scroll starts
        setTimeout(() => {
            transitionToSection(index);
        }, 100);
    }

    function transitionToSection(newSection) {
        if (isTransitioning || newSection === currentSection) return;

        isTransitioning = true;
        const oldSection = currentSection;
        currentSection = newSection;

        // Phase 1: Fly out old cards
        flyOutCards(sections[oldSection]).then(() => {
            // Phase 2: Brief moment with background
            return showBackground();
        }).then(() => {
            // Phase 3: Fly in new cards
            return flyInCards(sections[newSection]);
        }).then(() => {
            // Update UI
            updateIndicators();
            updateProgressBar();
            isTransitioning = false;
        });
    }

    function flyOutCards(section) {
        return new Promise((resolve) => {
            const cards = section.querySelectorAll('.transition-card');
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('flying-out');
                    card.classList.remove('visible');
                }, index * 80);
            });

            // Wait for all cards to fly out
            setTimeout(resolve, 800 + (cards.length * 80));
        });
    }

    function showBackground() {
        return new Promise((resolve) => {
            // Create gradient overlay effect
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(34, 211, 238, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(overlay);
            
            // Fade in
            setTimeout(() => overlay.style.opacity = '1', 50);
            
            // Fade out and remove
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        document.body.removeChild(overlay);
                    }
                    resolve();
                }, 200);
            }, 300);
        });
    }

    function flyInCards(section) {
        return new Promise((resolve) => {
            const cards = section.querySelectorAll('.transition-card');
            
            // Reset cards first
            cards.forEach(card => {
                card.classList.remove('flying-out', 'flying-in');
                card.style.transform = 'translateY(300px) rotateX(-75deg) rotateY(-45deg) scale(0.5)';
                card.style.opacity = '0';
            });

            // Start fly-in animation
            setTimeout(() => {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('flying-in', 'visible');
                        card.style.transform = '';
                        card.style.opacity = '';
                    }, index * 80);
                });
            }, 100);

            // Clean up and resolve
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove('flying-in');
                });
                resolve();
            }, 800 + (cards.length * 80));
        });
    }

    function showSection(index) {
        // Hide all sections' cards first
        sections.forEach(section => {
            const cards = section.querySelectorAll('.transition-card');
            cards.forEach(card => {
                card.classList.remove('visible');
            });
        });

        // Show current section's cards with stagger
        const currentCards = sections[index].querySelectorAll('.transition-card');
        currentCards.forEach((card, cardIndex) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, cardIndex * 100);
        });

        currentSection = index;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSection);
        });
    }

    function updateProgressBar() {
        const progress = ((currentSection + 1) / sections.length) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        
        // Update progress bar visual
        const progressBarAfter = progressBar.querySelector('::after') || progressBar;
        progressBar.style.background = `linear-gradient(to bottom, 
            rgba(168, 85, 247, 0.3) 0%, 
            rgba(168, 85, 247, 1) ${progress}%, 
            rgba(255, 255, 255, 0.2) ${progress}%, 
            rgba(255, 255, 255, 0.2) 100%)`;
    }

    // Throttle function for performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Add touch support for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    scrollContainer.addEventListener('touchend', (e) => {
        if (isTransitioning) return;
        
        touchEndY = e.changedTouches[0].screenY;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0 && currentSection < sections.length - 1) {
                // Swipe up - next section
                goToSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                // Swipe down - previous section
                goToSection(currentSection - 1);
            }
        }
    });

    // Add resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate section positions
            const targetScroll = currentSection * window.innerHeight;
            scrollContainer.scrollTo({
                top: targetScroll,
                behavior: 'auto'
            });
        }, 250);
    });

    // Performance optimization: Pause animations when not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations
            sections.forEach(section => {
                section.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations
            sections.forEach(section => {
                section.style.animationPlayState = 'running';
            });
        }
    });

    // Auto-scroll demo (optional)
    let autoScrollTimer;
    function startAutoScroll() {
        autoScrollTimer = setInterval(() => {
            if (!isTransitioning && currentSection < sections.length - 1) {
                goToSection(currentSection + 1);
            } else if (currentSection === sections.length - 1) {
                goToSection(0); // Loop back to start
            }
        }, 5000); // Change section every 5 seconds
    }

    function stopAutoScroll() {
        clearInterval(autoScrollTimer);
    }

    // Stop auto-scroll on user interaction
    ['wheel', 'touchstart', 'keydown', 'click'].forEach(event => {
        document.addEventListener(event, stopAutoScroll, { once: true });
    });

    // Uncomment to enable auto-scroll demo
    // setTimeout(startAutoScroll, 3000);
});

// Custom CSS property update for progress bar
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .progress-bar::after {
            height: var(--progress, 0%);
        }
    `;
    document.head.appendChild(style);
});

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}