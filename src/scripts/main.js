document.addEventListener('DOMContentLoaded', () => {
        const toggleDropdown = document.querySelector('.toggle__show__dropdown');
        const dropdownMenu = document.querySelector('.dropdown__menu');

        toggleDropdown.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!toggleDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
});

// Toggle sidebar
const toggleButton = document.getElementById('toggle-menu-bar');
const aside = document.querySelector('.asidebar');

toggleButton.addEventListener('click', () => {
    aside.classList.toggle('open');
});

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
    if (
        window.innerWidth < 768 &&
        !aside.contains(e.target) &&
        !toggleButton.contains(e.target) &&
        aside.classList.contains('open')
    ) {
        aside.classList.remove('open');
    }
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        aside.classList.remove('open');
    }
});

// Set initial state
window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
        aside.classList.remove('open');
    }
});