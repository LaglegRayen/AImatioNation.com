class Slider {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            slidesToShow: options.slidesToShow || 1,
            slidesToScroll: options.slidesToScroll || 1,
            autoplay: options.autoplay || false,
            autoplaySpeed: options.autoplaySpeed || 3000,
            dots: options.dots || false,
            arrows: options.arrows || true,
            infinite: options.infinite || true
        };
        
        this.slides = Array.from(this.element.children);
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Create slider container
        this.sliderContainer = document.createElement('div');
        this.sliderContainer.classList.add('slider-container');
        
        // Create track
        this.track = document.createElement('div');
        this.track.classList.add('slider-track');
        
        // Move slides into track
        this.slides.forEach(slide => {
            this.track.appendChild(slide);
        });
        
        this.sliderContainer.appendChild(this.track);
        this.element.appendChild(this.sliderContainer);
        
        // Add navigation if enabled
        if (this.options.arrows) {
            this.addArrows();
        }
        
        if (this.options.dots) {
            this.addDots();
        }
        
        // Start autoplay if enabled
        if (this.options.autoplay) {
            this.startAutoplay();
        }
        
        // Add styles
        this.addStyles();
        
        // Set initial position
        this.goToSlide(0);
    }
    
    addArrows() {
        const prevButton = document.createElement('button');
        prevButton.classList.add('slider-arrow', 'slider-prev');
        prevButton.innerHTML = '←';
        prevButton.addEventListener('click', () => this.prev());
        
        const nextButton = document.createElement('button');
        nextButton.classList.add('slider-arrow', 'slider-next');
        nextButton.innerHTML = '→';
        nextButton.addEventListener('click', () => this.next());
        
        this.sliderContainer.appendChild(prevButton);
        this.sliderContainer.appendChild(nextButton);
    }
    
    addDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('slider-dots');
        
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        this.sliderContainer.appendChild(dotsContainer);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .slider-container {
                position: relative;
                overflow: hidden;
            }
            
            .slider-track {
                display: flex;
                transition: transform 0.3s ease;
            }
            
            .slider-track > * {
                flex: 0 0 100%;
                width: 100%;
            }
            
            .slider-arrow {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                padding: 1rem;
                cursor: pointer;
                z-index: 10;
            }
            
            .slider-prev {
                left: 0;
            }
            
            .slider-next {
                right: 0;
            }
            
            .slider-dots {
                position: absolute;
                bottom: 1rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 0.5rem;
            }
            
            .slider-dot {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                border: none;
                cursor: pointer;
                padding: 0;
            }
            
            .slider-dot.active {
                background: white;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    goToSlide(index) {
        if (index < 0) {
            index = this.options.infinite ? this.slideCount - 1 : 0;
        } else if (index >= this.slideCount) {
            index = this.options.infinite ? 0 : this.slideCount - 1;
        }
        
        this.currentSlide = index;
        this.track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots if they exist
        const dots = this.sliderContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    next() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prev() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.autoplaySpeed);
        
        // Pause on hover
        this.sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(this.autoplayInterval);
        });
        
        this.sliderContainer.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(slider => {
        new Slider(slider, {
            slidesToShow: parseInt(slider.dataset.slidesToShow) || 1,
            slidesToScroll: parseInt(slider.dataset.slidesToScroll) || 1,
            autoplay: slider.dataset.autoplay === 'true',
            autoplaySpeed: parseInt(slider.dataset.autoplaySpeed) || 3000,
            dots: slider.dataset.dots === 'true',
            arrows: slider.dataset.arrows !== 'false',
            infinite: slider.dataset.infinite !== 'false'
        });
    });
}); 