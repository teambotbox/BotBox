// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.policy-card, .subject-card, .kit-card, .resource-category, .content-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Resource links with fun click effects
document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Add analytics tracking here if needed
        console.log('Resource clicked:', e.target.textContent.trim());
        
        // Add fun click wave effect
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(233, 77, 54, 0.3);
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: wave 0.6s ease-out;
        `;
        
        item.style.position = 'relative';
        item.appendChild(wave);
        
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 600);
    });
});

// Add wave animation
const waveStyle = document.createElement('style');
waveStyle.textContent = `
    @keyframes wave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(waveStyle);

// Enhanced kit card hover effects
document.querySelectorAll('.kit-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02) rotate(1deg)';
        card.style.boxShadow = '0 15px 30px rgba(12, 50, 114, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        card.style.boxShadow = '0 4px 6px rgba(12, 50, 114, 0.05)';
    });
    
    // Add click effect with sound simulation
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-5px) scale(0.98) rotate(-1deg)';
        
        // Create a fun click effect
        const clickEffect = document.createElement('div');
        clickEffect.innerHTML = '★';
        clickEffect.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2rem;
            pointer-events: none;
            animation: sparkle 1s ease-out forwards;
            z-index: 10;
            color: var(--botbox-orange-red);
        `;
        
        card.appendChild(clickEffect);
        
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1.02) rotate(1deg)';
            if (clickEffect.parentNode) {
                clickEffect.parentNode.removeChild(clickEffect);
            }
        }, 150);
    });
});

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Policy card interactive features with fun effects
document.querySelectorAll('.policy-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add expand/collapse functionality with animation
        card.classList.toggle('expanded');
        
        // Add a fun bounce effect
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'bounce 0.6s ease';
        
        // Add celebration effect
        const celebration = document.createElement('div');
        celebration.innerHTML = '★';
        celebration.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 1.5rem;
            pointer-events: none;
            animation: celebrate 1.2s ease-out forwards;
            z-index: 10;
            color: var(--botbox-orange-red);
        `;
        
        card.appendChild(celebration);
        
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 1200);
    });
});

// Add celebration animation
const celebrateStyle = document.createElement('style');
celebrateStyle.textContent = `
    @keyframes celebrate {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        25% {
            transform: scale(1.2) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: scale(1.1) rotate(270deg);
            opacity: 0.6;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrateStyle);

// Search functionality (if search box is added later)
function searchContent(query) {
    const searchTerm = query.toLowerCase();
    const sections = document.querySelectorAll('section');
    let results = [];
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            results.push({
                section: section.id,
                title: section.querySelector('h2')?.textContent || 'Section'
            });
        }
    });
    
    return results;
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation (accessibility)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-link')) {
            e.preventDefault();
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.indexOf(focusedElement);
            
            if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
                navLinks[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                navLinks[currentIndex - 1].focus();
            }
        }
    }
});

// Print functionality
function printPage() {
    window.print();
}

// Copy link functionality with fun feedback
function copyPageLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Show temporary notification
        showNotification('تم نسخ الرابط إلى الحافظة!');
        
        // Add confetti effect
        createConfetti();
    });
}

// Fun confetti effect
function createConfetti() {
    const colors = ['#E94D36', '#0C3272', '#FFD700', '#FF69B4', '#00CED1'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['★', '●', '▲', '◆', '♥'][Math.floor(Math.random() * 5)];
            confetti.style.cssText = `
                position: fixed;
                top: 20%;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 10000;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 100);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Notification system
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(-100%);
        transition: all 0.3s ease;
        direction: rtl;
        text-align: right;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Theme toggle (if dark mode is added later)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation (if contact form is added later)
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Lazy loading for images (if images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance monitoring
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Initialize performance monitoring
logPerformance();
