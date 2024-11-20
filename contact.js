document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');

    // Check if dark mode preference is stored in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light</span>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light</span>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark</span>';
        }
    });

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                // Clear form fields after successful submission
                contactForm.reset();
                statusMessage.textContent = 'Message sent successfully!';
                statusMessage.className = 'success';
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = 'Failed to send message. Please try again later.';
            statusMessage.className = 'error';
        }

        // Clear status message after 5 seconds
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = '';
        }, 5000);
    });
});