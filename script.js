document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (menuToggle && sidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('open');
        });

        // Close when clicking empty space
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
        
        // Close when clicking a link inside mobile
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    sidebarOverlay.classList.remove('open');
                }
            });
        });
    }

    // Custom Cursor removed per user request

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.querySelector('.theme-toggle');
    
    if (themeToggleBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
            }
        });
    }

    // --- Floating "Back to Top" Button ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Fade-in animations removed per user request

    // --- 5. Animated Skill Progress Bars ---
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetPercent = entry.target.getAttribute('data-percent');
                entry.target.style.width = targetPercent + '%';
                
                // Optional: Animate the percentage text
                const prevSibling = entry.target.parentElement.previousElementSibling;
                const textElement = prevSibling ? prevSibling.querySelector('.skill-percent-text') : null;
                if (textElement) {
                    let currentNum = 0;
                    const increment = Math.ceil(targetPercent / 50);
                    const updateNum = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= targetPercent) {
                            currentNum = targetPercent;
                            clearInterval(updateNum);
                        }
                        textElement.textContent = currentNum + '%';
                    }, 30); // Speed of number counter
                }
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillProgressBars.forEach(bar => skillObserver.observe(bar));

    // Removed typing effect per user request

    // --- Wrap standalone tables for horizontal scroll on mobile ---
    document.querySelectorAll('.content > table').forEach(table => {
        if (!table.parentElement.classList.contains('table-wrap')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-wrap');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // --- Close sidebar on resize above mobile breakpoint ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('open');
            if (sidebarOverlay) sidebarOverlay.classList.remove('open');
        }
    });
});
