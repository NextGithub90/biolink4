// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    const biolinkCard = document.querySelector('.biolink-card');
    biolinkCard.style.opacity = '0';
    biolinkCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        biolinkCard.style.transition = 'all 0.8s ease-out';
        biolinkCard.style.opacity = '1';
        biolinkCard.style.transform = 'translateY(0)';
    }, 100);

    // Animate elements on scroll/load
    const animateElements = () => {
        const elements = document.querySelectorAll('.link-btn, .social-btn, .contact-btn, .admin-btn');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    };

    // Start animation after card is loaded
    setTimeout(animateElements, 500);

    // Add click ripple effect
    const addRippleEffect = (element) => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    };

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.link-btn, .social-btn, .contact-btn, .admin-btn');
    buttons.forEach(addRippleEffect);

    // Profile image hover effect
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Smooth hover effects for links
    const links = document.querySelectorAll('.link-btn, .social-btn, .contact-btn, .admin-btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to decorative elements
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10}deg)`;
        }, 3000 + Math.random() * 2000);
    });

    // Add click tracking for analytics (optional)
    const trackClick = (element, linkName) => {
        element.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log(`Clicked: ${linkName}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    };

    // Track clicks on important links
    const socialLinks = document.querySelectorAll('.social-btn');
    socialLinks.forEach((link, index) => {
        const platform = link.querySelector('span').textContent;
        trackClick(link, `Social - ${platform}`);
    });

    const mainLinks = document.querySelectorAll('.link-btn');
    mainLinks.forEach((link, index) => {
        const title = link.querySelector('.link-title').textContent;
        trackClick(link, `Main - ${title}`);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.5s ease';
                
                // Check if image is already loaded
                if (img.complete && img.naturalHeight !== 0) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                }
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add scroll-based animations for mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animation on mobile
        const elementsToAnimate = document.querySelectorAll('.contact-section, .admin-section');
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
            scrollObserver.observe(element);
        });
    }

    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate animations if needed
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                location.reload(); // Simple solution for responsive changes
            }
        }, 250);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #fbbf24 !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-navigation *:focus:not(:focus-visible) {
        outline: none !important;
    }
`;
document.head.appendChild(style);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you want to add PWA capabilities
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Add meta theme color for mobile browsers
const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = '#1e3a8a';
document.head.appendChild(metaThemeColor);

// Add viewport meta for better mobile experience
const viewport = document.querySelector('meta[name="viewport"]');
if (viewport) {
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
}