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
});