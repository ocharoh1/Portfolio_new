document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check if dark mode preference is stored in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        updateDarkModeToggle(true);
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        updateDarkModeToggle(isDarkMode);
    });

    function updateDarkModeToggle(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        const text = darkModeToggle.querySelector('span');

        if (isDarkMode) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark';
        }
    }

    // Prevent scrolling on the main container
    document.querySelector('.main-container').addEventListener('wheel', (e) => {
        e.preventDefault();
    }, { passive: false });

    // Allow scrolling on container-two
    document.querySelector('.container-two').addEventListener('wheel', (e) => {
        e.stopPropagation();
    });
});