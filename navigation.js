// JavaScript específico para navegación entre páginas
document.addEventListener('DOMContentLoaded', function() {
    // Función para manejar navegación entre páginas con hash
    function handleCrossPageNavigation() {
        // Si la URL tiene un hash al cargar la página
        if (window.location.hash) {
            setTimeout(function() {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
        }
    }

    // Ejecutar cuando se carga la página
    handleCrossPageNavigation();

    // Funcionalidad del menú hamburguesa móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle del menú
            navLinks.classList.toggle('nav-open');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('nav-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('nav-open');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});