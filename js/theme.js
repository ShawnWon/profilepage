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
        var toggleBtn = document.getElementById('themeToggleBtn');
        if (icon) {
            if (isClassic) {
                icon.className = 'fa-solid fa-leaf';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        }
        if (text) {
            text.textContent = isClassic ? 'Classic Theme' : 'Dark Theme';
        }
        if (toggleBtn) {
            toggleBtn.setAttribute('title', isClassic ? 'Switch to Dark Theme' : 'Switch to Classic Theme');
            toggleBtn.setAttribute('aria-label', isClassic ? 'Switch to Dark Theme' : 'Switch to Classic Theme');
        }
    }

    // Determine daytime default (7:00 AM to 7:00 PM is Day/Classic, otherwise Night/Dark)
    function getTimeBasedTheme() {
        try {
            var currentHour = new Date().getHours();
            // 7:00 to 18:59 is daytime
            return (currentHour >= 7 && currentHour < 19) ? 'classic' : 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    // Initialize as soon as DOM is interactive
    function initTheme() {
        var userExplicit = false;
        try {
            userExplicit = localStorage.getItem(STORAGE_KEY + '_explicit') === 'true';
        } catch (e) {}

        var savedTheme = null;
        try {
            savedTheme = localStorage.getItem(STORAGE_KEY);
        } catch (e) {}

        // If user hasn't explicitly toggled, auto-switch based on local time (7am - 7pm Day/Classic)
        var themeToApply = (userExplicit && savedTheme) ? savedTheme : getTimeBasedTheme();
        applyTheme(themeToApply);

        var toggleBtn = document.getElementById('themeToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var currentTheme = document.body.classList.contains('theme-classic') ? 'classic' : 'dark';
                var nextTheme = (currentTheme === 'classic') ? 'dark' : 'classic';
                try {
                    localStorage.setItem(STORAGE_KEY, nextTheme);
                    localStorage.setItem(STORAGE_KEY + '_explicit', 'true');
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

