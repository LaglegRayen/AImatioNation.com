document.addEventListener('DOMContentLoaded', () => {
    const pricingToggle = document.querySelector('.pricing-toggle');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (!pricingToggle) return;
    
    const monthlyPrices = {
        'Starter Package': '$2,500',
        'Professional Package': '$5,000'
    };
    
    const annualPrices = {
        'Starter Package': '$27,000',
        'Professional Package': '$54,000'
    };
    
    const updatePrices = (period) => {
        pricingCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const priceElement = card.querySelector('.amount');
            const periodElement = card.querySelector('.period');
            
            if (period === 'monthly') {
                priceElement.textContent = monthlyPrices[title];
                periodElement.textContent = '/month';
            } else {
                priceElement.textContent = annualPrices[title];
                periodElement.textContent = '/year';
            }
        });
    };
    
    pricingToggle.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;
        
        // Update active state
        pricingToggle.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Update prices
        const period = e.target.dataset.period;
        updatePrices(period);
    });
}); 