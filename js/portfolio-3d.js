// Portfolio 3D Transitions JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const transitionBtn = document.getElementById('transitionBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Alternative portfolio data for transitions
    const alternativeProjects = [
        {
            category: 'ai automation',
            icon: '🚀',
            title: 'Sales Acceleration Platform',
            description: 'AI-powered sales pipeline optimization and forecasting',
            techStack: ['OpenAI', 'React', 'PostgreSQL'],
            details: ['150% sales increase', 'Automated lead scoring', 'Real-time insights']
        },
        {
            category: 'integration',
            icon: '🌐',
            title: 'Multi-Platform Sync Engine',
            description: 'Real-time data synchronization across 15+ platforms',
            techStack: ['Node.js', 'Redis', 'GraphQL'],
            details: ['99.9% uptime', '15+ integrations', 'Real-time sync']
        },
        {
            category: 'ai',
            icon: '💬',
            title: 'Advanced AI Chatbot',
            description: 'Context-aware conversational AI with memory',
            techStack: ['GPT-4', 'Vector DB', 'FastAPI'],
            details: ['95% satisfaction rate', 'Multi-language support', 'Context memory']
        },
        {
            category: 'automation',
            icon: '📈',
            title: 'Revenue Operations Suite',
            description: 'Complete revenue cycle automation and optimization',
            techStack: ['Python', 'Salesforce', 'Tableau'],
            details: ['40% faster close rates', 'Automated reporting', 'Revenue forecasting']
        },
        {
            category: 'ai integration',
            icon: '🔮',
            title: 'Predictive Analytics Engine',
            description: 'Machine learning models for business predictions',
            techStack: ['TensorFlow', 'Python', 'AWS'],
            details: ['98% prediction accuracy', 'Real-time analysis', 'Custom models']
        },
        {
            category: 'automation ai',
            icon: '⚡',
            title: 'Workflow Automation Hub',
            description: 'Intelligent workflow orchestration and optimization',
            techStack: ['n8n', 'OpenAI', 'MongoDB'],
            details: ['200+ automated tasks', 'Smart routing', 'Error recovery']
        }
    ];

    let isTransitioning = false;
    let currentProjects = 'original';

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isTransitioning) return;

            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });

    // Portfolio filtering
    function filterPortfolio(filter) {
        portfolioCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.classList.remove('filtered-out');
                card.classList.add('filtered-in');
            } else {
                card.classList.remove('filtered-in');
                card.classList.add('filtered-out');
                setTimeout(() => {
                    if (card.classList.contains('filtered-out')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // 3D Transition functionality
    transitionBtn.addEventListener('click', function() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        transitionBtn.disabled = true;
        transitionBtn.textContent = '🔄 Transitioning...';

        // Phase 1: Cards fly out
        flyOutCards().then(() => {
            // Phase 2: Brief gradient background moment
            return showGradientMoment();
        }).then(() => {
            // Phase 3: Update content
            updatePortfolioContent();
            // Phase 4: Cards fly in
            return flyInCards();
        }).then(() => {
            // Reset button
            isTransitioning = false;
            transitionBtn.disabled = false;
            transitionBtn.textContent = '🔄 Experience 3D Transition';
        });
    });

    // Phase 1: Fly out animation
    function flyOutCards() {
        return new Promise((resolve) => {
            portfolioCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('flying-out');
                }, index * 100);
            });

            // Wait for all animations to complete
            setTimeout(resolve, 1200);
        });
    }

    // Phase 2: Show gradient background moment
    function showGradientMoment() {
        return new Promise((resolve) => {
            // Hide all cards temporarily
            portfolioCards.forEach(card => {
                card.style.visibility = 'hidden';
            });

            // Show gradient background effect
            const gradientOverlay = document.createElement('div');
            gradientOverlay.className = 'gradient-overlay';
            gradientOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(34, 211, 238, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%);
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(gradientOverlay);
            
            // Fade in gradient
            setTimeout(() => {
                gradientOverlay.style.opacity = '1';
            }, 50);

            // Remove gradient after brief moment
            setTimeout(() => {
                gradientOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(gradientOverlay);
                    resolve();
                }, 300);
            }, 400);
        });
    }

    // Phase 3: Update portfolio content
    function updatePortfolioContent() {
        const projects = currentProjects === 'original' ? alternativeProjects : getOriginalProjects();
        
        portfolioCards.forEach((card, index) => {
            if (projects[index]) {
                updateCardContent(card, projects[index]);
            }
        });

        currentProjects = currentProjects === 'original' ? 'alternative' : 'original';
    }

    // Update individual card content
    function updateCardContent(card, projectData) {
        // Update data attribute
        card.setAttribute('data-category', projectData.category);

        // Update front face
        const frontFace = card.querySelector('.card-front');
        const icon = frontFace.querySelector('.project-icon');
        const title = frontFace.querySelector('h3');
        const description = frontFace.querySelector('p');
        const techStack = frontFace.querySelector('.tech-stack');

        icon.textContent = projectData.icon;
        title.textContent = projectData.title;
        description.textContent = projectData.description;

        techStack.innerHTML = '';
        projectData.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techStack.appendChild(tag);
        });

        // Update back face
        const backFace = card.querySelector('.card-back');
        const detailsList = backFace.querySelector('ul');
        
        detailsList.innerHTML = '';
        projectData.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsList.appendChild(li);
        });
    }

    // Phase 4: Fly in animation
    function flyInCards() {
        return new Promise((resolve) => {
            // Remove old animation classes and show cards
            portfolioCards.forEach(card => {
                card.classList.remove('flying-out');
                card.style.visibility = 'visible';
            });

            // Start fly-in animation with stagger
            portfolioCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('flying-in');
                }, index * 100);
            });

            // Clean up animation classes after completion
            setTimeout(() => {
                portfolioCards.forEach(card => {
                    card.classList.remove('flying-in');
                });
                resolve();
            }, 1200);
        });
    }

    // Get original project data
    function getOriginalProjects() {
        return [
            {
                category: 'automation ai',
                icon: '🤖',
                title: 'AI Lead Generation System',
                description: 'Automated LinkedIn prospecting and email sequences',
                techStack: ['Python', 'OpenAI', 'LinkedIn API'],
                details: ['47 qualified meetings in first month', '326% ROI increase', 'Fully automated workflow']
            },
            {
                category: 'integration',
                icon: '🔗',
                title: 'CRM Integration Hub',
                description: 'Seamless data flow across multiple platforms',
                techStack: ['n8n', 'HubSpot', 'Salesforce'],
                details: ['95% reduction in manual data entry', 'Real-time synchronization', 'Multi-platform integration']
            },
            {
                category: 'ai automation',
                icon: '📊',
                title: 'Intelligent Analytics Dashboard',
                description: 'AI-powered insights and automated reporting',
                techStack: ['React', 'Python', 'OpenAI'],
                details: ['80% faster decision making', 'Predictive analytics', 'Custom AI insights']
            },
            {
                category: 'automation',
                icon: '⚡',
                title: 'E-commerce Automation Suite',
                description: 'Order processing and inventory management',
                techStack: ['Shopify', 'Zapier', 'AWS'],
                details: ['99.9% order accuracy', '24/7 automated processing', 'Inventory optimization']
            },
            {
                category: 'ai',
                icon: '🧠',
                title: 'AI Customer Support Bot',
                description: 'Intelligent chatbot with natural language processing',
                techStack: ['OpenAI', 'Node.js', 'WebSocket'],
                details: ['85% query resolution rate', '24/7 customer support', 'Multi-language support']
            },
            {
                category: 'integration ai',
                icon: '🔮',
                title: 'Predictive Sales Platform',
                description: 'AI-driven sales forecasting and pipeline management',
                techStack: ['TensorFlow', 'Python', 'SQL'],
                details: ['92% forecast accuracy', 'Automated pipeline scoring', 'Revenue optimization']
            }
        ];
    }

    // Add hover sound effects (optional)
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale effect on hover
            if (!this.classList.contains('flying-out') && !this.classList.contains('flying-in')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flying-out') && !this.classList.contains('flying-in')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
            }
        });
    }, observerOptions);

    // Observe all portfolio cards for scroll animations
    portfolioCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS for fade in animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeInStyle);

    // Auto-transition demo (optional - runs once after page load)
    setTimeout(() => {
        if (!isTransitioning) {
            // Uncomment the line below to enable auto-demo
            // transitionBtn.click();
        }
    }, 3000);
});

// Utility function for random delays
function randomDelay(min, max) {
    return Math.random() * (max - min) + min;
}

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Recalculate any layout-dependent features
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            portfolioGrid.style.perspective = window.innerWidth < 768 ? '800px' : '1200px';
        }
    }, 250);
});