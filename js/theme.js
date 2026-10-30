// Theme Switcher for Shawn Wang's Portfolio
(function() {
    'use strict';
    var STORAGE_KEY = 'shawn_portfolio_theme';

    function applyTheme(theme) {
        var isClassic = (theme === 'classic');
        if (isClassic) {
            document.body.classList.add('theme-classic');
            document.documentElement.classList.add('theme-classic');
        } else {
            document.body.classList.remove('theme-classic');
            document.documentElement.classList.remove('theme-classic');
        }

        var icon = document.getElementById('themeToggleIcon');
        var text = document.getElementById('themeToggleText');
        if (icon && text) {
            if (isClassic) {
                icon.className = 'fa-solid fa-leaf';
                text.textContent = 'Classic Theme';
            } else {
                icon.className = 'fa-solid fa-moon';
                text.textContent = 'Dark Theme';
            }
        }
    }

    // Initialize as soon as DOM is interactive
    function initTheme() {
        var savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
        applyTheme(savedTheme);

        var toggleBtn = document.getElementById('themeToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var currentTheme = document.body.classList.contains('theme-classic') ? 'classic' : 'dark';
                var nextTheme = (currentTheme === 'classic') ? 'dark' : 'classic';
                try {
                    localStorage.setItem(STORAGE_KEY, nextTheme);
                } catch (err) {
                    // Ignore localStorage quotas / disabled
                }
                applyTheme(nextTheme);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();

