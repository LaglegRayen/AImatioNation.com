class PricingTabs {
    constructor(element) {
        this.tabs = element;
        this.tabButtons = this.tabs.querySelectorAll('.pricing-tab');
        this.tabContents = this.tabs.querySelectorAll('.pricing-tab-contents-wrapper');
        
        this.init();
    }

    init() {
        // Add event listeners to tab buttons
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        // Update active state of buttons
        this.tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabId);
        });
        
        // Show selected content
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
        
        // Trigger animation
        this.animateContent(tabId);
    }

    animateContent(tabId) {
        const activeContent = this.tabs.querySelector(`#${tabId}`);
        const cards = activeContent.querySelectorAll('.starter-card-wrap');
        
        // Reset opacity
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        // Animate cards with delay
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Initialize tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const pricingTabs = document.querySelector('.tabs');
    if (pricingTabs) {
        new PricingTabs(pricingTabs);
    }
}); 