// Funcionalidades generales del sitio web Legionarios
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para la navegación
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar smooth scroll si el enlace es a una sección de la misma página (empieza con #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // Si el enlace va a otra página (index.html#seccion o tackle-football.html), dejarlo funcionar normalmente
        });
    });

    // Efectos de scroll para el header
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Animaciones de entrada para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    console.log('Legionarios Football - Website loaded successfully!');
});

// Función para contacto por WhatsApp
function contactWhatsApp() {
    const phoneNumber = '5491162995252';
    const message = '¡Hola! Me interesa conocer más sobre Legionarios Football Americano.';
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Funcionalidad del Slider Hero - CONSOLIDADA Y OPTIMIZADA
// Esta funcionalidad está ahora manejada por las funciones optimizadas más abajo

// Función para el efecto flip de las tarjetas del calendario
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Funcionalidad del botón "Volver arriba"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Mostrar/ocultar el botón según el scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Funcionalidad del click
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on button for animation
            this.classList.toggle('active');
            
            // Toggle active class on nav links for display
            navLinksContainer.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = navLinksContainer.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && 
                !navLinksContainer.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    }
});

// Individual Page Slider Functionality (Optimized for Performance)
let individualSlideIndex = 0;
let sliderInterval;
let heroSlides = [];
let isSliderTransitioning = false; // Prevent multiple rapid transitions

function initializeSlider() {
    heroSlides = document.querySelectorAll('.hero-slider .slide');
    if (heroSlides.length === 0) return false;
    
    // Randomize slide order
    randomizeSlides();
    
    // Preload images for smooth transitions
    heroSlides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img && !img.complete) {
            img.loading = 'eager';
        }
        // Remove active class from all slides except first
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    return true;
}

// Function to randomize slide order
function randomizeSlides() {
    const sliderContainer = document.querySelector('.hero-slider');
    if (!sliderContainer || heroSlides.length === 0) return;
    
    // Convert NodeList to Array and shuffle
    const slidesArray = Array.from(heroSlides);
    
    // Fisher-Yates shuffle algorithm
    for (let i = slidesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slidesArray[i], slidesArray[j]] = [slidesArray[j], slidesArray[i]];
    }
    
    // Remove all slides from container
    slidesArray.forEach(slide => slide.remove());
    
    // Add slides back in random order
    slidesArray.forEach(slide => sliderContainer.appendChild(slide));
    
    // Update heroSlides reference
    heroSlides = document.querySelectorAll('.hero-slider .slide');
    
    // Reset navigation dots to match new order
    const dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === 0) {
            dot.classList.add('active');
        }
    });
}

function showSlide(index) {
    if (!heroSlides.length || isSliderTransitioning) return;
    
    // Prevent rapid transitions
    isSliderTransitioning = true;
    
    // Wrap around logic
    if (index >= heroSlides.length) individualSlideIndex = 0;
    else if (index < 0) individualSlideIndex = heroSlides.length - 1;
    else individualSlideIndex = index;
    
    // Use requestAnimationFrame for smooth animations
    requestAnimationFrame(() => {
        heroSlides.forEach((slide, i) => {
            if (i === individualSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update navigation dots
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, i) => {
            if (i === individualSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Allow next transition after a short delay
        setTimeout(() => {
            isSliderTransitioning = false;
        }, 100);
    });
}

function changeSlide(direction) {
    individualSlideIndex += direction;
    showSlide(individualSlideIndex);
    
    // Reset auto-play timer when manually navigating
    if (sliderInterval) {
        clearInterval(sliderInterval);
        startAutoSlide();
    }
}

function currentSlide(index) {
    individualSlideIndex = index - 1;
    showSlide(individualSlideIndex);
    
    // Reset auto-play timer
    if (sliderInterval) {
        clearInterval(sliderInterval);
        startAutoSlide();
    }
}

// Optimized auto-play slider
function autoSlide() {
    if (heroSlides.length > 0) {
        showSlide(individualSlideIndex + 1);
    }
}

function startAutoSlide() {
    // Clear any existing interval
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
    // Start new interval with consistent 5-second timing for smooth experience
    sliderInterval = setInterval(autoSlide, 5000);
}

// Initialize slider when page loads (Optimized)
document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        // Reset index and initialize
        individualSlideIndex = 0;
        
        // Wait for DOM and images to be ready
        setTimeout(() => {
            if (initializeSlider()) {
                // Start auto-play only after successful initialization
                startAutoSlide();
                
                // Add touch support for mobile
                addTouchSupport(heroSlider);
            }
        }, 300); // Increased delay to prevent page freezing
    }
});

// Touch support for mobile slider navigation
function addTouchSupport(slider) {
    let startX = 0;
    let startY = 0;
    let isMoving = false;
    
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isMoving = false;
    }, { passive: true });
    
    slider.addEventListener('touchmove', function(e) {
        if (!isMoving) {
            const diffX = Math.abs(e.touches[0].clientX - startX);
            const diffY = Math.abs(e.touches[0].clientY - startY);
            
            // If horizontal swipe is more prominent than vertical
            if (diffX > diffY && diffX > 30) {
                isMoving = true;
                e.preventDefault(); // Prevent scrolling
            }
        }
    }, { passive: false });
    
    slider.addEventListener('touchend', function(e) {
        if (isMoving) {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Minimum swipe distance
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    changeSlide(1);
                } else {
                    // Swipe right - previous slide
                    changeSlide(-1);
                }
            }
        }
        isMoving = false;
    }, { passive: true });
}