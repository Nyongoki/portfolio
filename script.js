// Interactive Portfolio JavaScript for Timothy Nyongoki

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavbar();
    initCounters();
    initSkillBars();
    initBackToTop();
    initContactForm();
    initTypingEffect();
    initParticles();
    initSmoothScrolling();
    initThemeToggle();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 20);
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, options);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Hello Timothy! 👋\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}\n\n` +
            `Sent from your portfolio website.`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/254705280974?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showNotification('Message sent! Opening WhatsApp...', 'success');
        
        // Reset form
        form.reset();
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const textElement = document.querySelector('.hero-content h2');
    if (!textElement) return;
    
    const texts = [
        'Full Stack Developer & AI Enthusiast',
        'Django & JavaScript Expert',
        'Machine Learning Explorer',
        'Problem Solver & Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function typeEffect() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        textElement.innerHTML = currentText + '<span class="cursor">|</span>';
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Add cursor style
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(typeEffect, 1000);
}

// Particle effect for hero section
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }
        
        function initParticleSystem() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(createParticle());
            }
        }
        
        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 123, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });
        }
        
        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        initParticleSystem();
        animate();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticleSystem();
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    // Use existing theme toggle in navigation bar
    const themeContainer = document.querySelector('.theme-toggle-container');
    const themeLabel = themeContainer.querySelector('.theme-label');
    const themeToggle = themeContainer.querySelector('.theme-toggle');
    
    // Add CSS for theme toggle
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle-container {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            margin-left: 15px;
        }
        .theme-toggle-container:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }
        .theme-toggle {
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .theme-toggle:hover {
            transform: scale(1.1);
            background: var(--info-color);
        }
        .theme-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--dark-color);
            white-space: nowrap;
            user-select: none;
        }
        .dark-theme .theme-toggle-container {
            background: rgba(42, 42, 42, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .dark-theme .theme-label {
            color: #ffffff;
        }
        .dark-theme {
            --bg-color: #1a1a1a;
            --text-color: #ffffff;
            --dark-color: #ffffff;
            --light-color: #1a1a1a;
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .dark-theme .navbar {
            background: rgba(0, 0, 0, 0.95) !important;
        }
        .dark-theme .section-title {
            color: #ffffff !important;
        }
        .dark-theme .interest-card {
            background: #2a2a2a !important;
            color: #ffffff;
        }
        .dark-theme .gallery-item {
            background: #2a2a2a;
        }
        .dark-theme section {
            background-color: #1a1a1a !important;
        }
        .dark-theme .bg-light {
            background-color: #2a2a2a !important;
        }
        .dark-theme .about-content h3 {
            color: var(--primary-color) !important;
        }
        .dark-theme .skill-header h5 {
            color: #ffffff !important;
        }
        .dark-theme .counter-label {
            color: #cccccc !important;
        }
        .dark-theme .floating-card {
            background: #2a2a2a !important;
            color: #ffffff;
        }
        .dark-theme .floating-card h5 {
            color: #ffffff !important;
        }
        .dark-theme .floating-card p {
            color: #cccccc !important;
        }
        .dark-theme p {
            color: #cccccc !important;
        }
        .dark-theme .lead {
            color: #cccccc !important;
        }
    `;
    document.head.appendChild(style);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            themeLabel.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            themeLabel.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
        themeLabel.textContent = 'Light Mode';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add CSS for notifications
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
            .notification-success {
                background: linear-gradient(135deg, #28a745, #34ce57);
            }
            .notification-error {
                background: linear-gradient(135deg, #dc3545, #f56565);
            }
            .notification-info {
                background: linear-gradient(135deg, #007bff, #17a2b8);
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            createLightbox(img.src, img.alt);
        });
    });
}

function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    // Add lightbox styles
    if (!document.querySelector('#lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox img {
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
            .lightbox-close {
                position: absolute;
                top: -10px;
                right: -10px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .lightbox-close:hover {
                background: var(--danger-color);
                transform: scale(1.1);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(lightbox);
    
    // Close lightbox functionality
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        closeLightbox(lightbox);
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
        }
    });
}

function closeLightbox(lightbox) {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (lightbox.parentNode) {
            lightbox.parentNode.removeChild(lightbox);
        }
    }, 300);
}

// Initialize gallery lightbox
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
});

// Performance optimization - Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading states
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading class from all elements
    document.querySelectorAll('.loading').forEach(element => {
        element.classList.add('loaded');
    });
});

// Console message for developers
console.log(
    '%cTimothy Nyongoki Portfolio',
    'color: #007bff; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cBuilt with ❤️ using HTML5, CSS3, JavaScript, and Bootstrap',
    'color: #28a745; font-size: 14px;'
);
console.log(
    '%cInterested in collaboration? WhatsApp: +254705280974',
    'color: #17a2b8; font-size: 12px;'
);

