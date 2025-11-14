// ===== Menu Data =====
const menuItems = [
    {
        name: "Arabic Biriyani Rice",
        price: "₹250",
        description: "Fragrant basmati rice cooked with aromatic spices and tender meat, a signature dish.",
        category: "biryani",
        image: "🥘"
    },
    {
        name: "Beef Rib Mandi",
        price: "₹450",
        description: "Tender beef ribs slow-cooked with traditional spices, served with fragrant rice.",
        category: "mandi",
        image: "🍖"
    },
    {
        name: "Al Faham Mandi",
        price: "₹380",
        description: "Succulent grilled chicken marinated in special spices, served with mandi rice.",
        category: "mandi",
        image: "🍗"
    },
    {
        name: "Beef Dry Fry",
        price: "₹320",
        description: "Crispy and flavorful beef pieces, perfectly spiced and fried to perfection.",
        category: "grilled",
        image: "🥩"
    },
    {
        name: "Chicken Fried Rice",
        price: "₹180",
        description: "Delicious fried rice with tender chicken pieces and fresh vegetables.",
        category: "rice",
        image: "🍚"
    },
    {
        name: "Mutton Biryani",
        price: "₹280",
        description: "Traditional mutton biryani with layers of aromatic rice and tender mutton.",
        category: "biryani",
        image: "🍛"
    },
    {
        name: "Grilled Chicken",
        price: "₹250",
        description: "Juicy grilled chicken marinated in special herbs and spices.",
        category: "grilled",
        image: "🍖"
    },
    {
        name: "Shawarma",
        price: "₹150",
        description: "Authentic shawarma wrap with tender meat and fresh vegetables.",
        category: "grilled",
        image: "🌯"
    },
    {
        name: "Chicken Mandi",
        price: "₹300",
        description: "Traditional chicken mandi with aromatic rice and tender chicken pieces.",
        category: "mandi",
        image: "🍗"
    },
    {
        name: "Kabsa Rice",
        price: "₹220",
        description: "Fragrant kabsa rice with choice of meat, cooked with traditional spices.",
        category: "rice",
        image: "🍚"
    },
    {
        name: "Baklava",
        price: "₹120",
        description: "Sweet pastry made of layers of filo filled with chopped nuts and honey.",
        category: "desserts",
        image: "🍯"
    },
    {
        name: "Kunafa",
        price: "₹140",
        description: "Traditional Middle Eastern dessert with sweet cheese and crispy pastry.",
        category: "desserts",
        image: "🧁"
    },
    {
        name: "Umm Ali",
        price: "₹100",
        description: "Creamy Egyptian dessert with milk, nuts, and pastry.",
        category: "desserts",
        image: "🥛"
    },
    {
        name: "Lamb Mandi",
        price: "₹420",
        description: "Tender lamb slow-cooked with aromatic spices, served with mandi rice.",
        category: "mandi",
        image: "🍖"
    },
    {
        name: "Fish Biryani",
        price: "₹260",
        description: "Fresh fish biryani with aromatic spices and basmati rice.",
        category: "biryani",
        image: "🐟"
    }
];

// ===== DOM Elements =====
let navToggle, navMenu, navbar, navLinks, menuTabs, menuGrid, reservationForm, scrollTopBtn;

// Initialize DOM elements when page loads
function initDOMElements() {
    // Get all DOM elements
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    navbar = document.getElementById('navbar');
    navLinks = document.querySelectorAll('.nav-link');
    menuTabs = document.querySelectorAll('.menu-tab');
    menuGrid = document.getElementById('menuGrid');
    reservationForm = document.getElementById('reservationForm');
    scrollTopBtn = document.getElementById('scrollTop');
    
    // Initialize mobile navigation (only if elements exist)
    if (navToggle && navMenu) {
        // Initialize mobile navigation
        initMobileNavigation();
    }
    
    // Initialize smooth scroll
    initSmoothScroll();
}

// ===== Mobile Navigation Toggle =====
function initMobileNavigation() {
    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found', { navToggle, navMenu });
        return;
    }

    // Remove any existing event listeners by checking if already initialized
    if (navToggle.dataset.initialized === 'true') {
        return; // Already initialized
    }
    
    navToggle.dataset.initialized = 'true';

    // Mobile menu toggle
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        
        console.log('Menu toggled:', !isActive);
    });

    // Close mobile menu when clicking on a link
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navToggle && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu on window resize (if resizing to desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Show/hide scroll to top button
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Update active nav link
    updateActiveNavLink();
});

// ===== Scroll to Top =====
// (Handled by GSAP below)

// ===== Smooth Scroll for Navigation Links =====
// This will be initialized after DOM elements are loaded
function initSmoothScroll() {
    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Only prevent default for anchor links
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ===== Update Active Nav Link =====
function updateActiveNavLink() {
    if (!navLinks || navLinks.length === 0) return;
    
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${sectionId}` || (href === '#home' && sectionId === 'home' && scrollY < 200)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Render Menu Items =====
function renderMenuItems(category = 'all') {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.style.animationDelay = `${index * 0.1}s`;
        
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <span style="font-size: 4rem;">${item.image}</span>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <span class="menu-item-category">${item.category.toUpperCase()}</span>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });

    // Animate menu items
    const items = menuGrid.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
}

// ===== Menu Tab Filtering =====
function initMenuTabs() {
    if (menuTabs && menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Filter menu items
                const category = tab.getAttribute('data-category');
                renderMenuItems(category);
            });
        });
    }
}

// ===== Initialize Menu =====
if (menuGrid) {
    renderMenuItems();
    initMenuTabs();
}

// ===== Reservation Form Handling =====
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Validate date (must be today or future)
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a valid date (today or future).');
            return;
        }

        // Show success message
        showNotification('Reservation request submitted successfully! We will contact you shortly.', 'success');
        
        // Reset form
        reservationForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Reservation Data:', formData);
    });
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

// ===== Set Minimum Date for Reservation =====
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ===== Intersection Observer for Animations =====
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ===== Gallery Lightbox (Optional Enhancement) =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real implementation, you would open a lightbox with the full image
        console.log('Gallery item clicked - Lightbox would open here');
    });
});

// ===== Lazy Loading for Images (if images are added later) =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Initialize on Load =====
// Multiple initialization strategies to ensure it works
function initializeApp() {
    // Initialize DOM elements
    initDOMElements();
    
    // Set hero section to visible
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
    
    // Update active nav link
    updateActiveNavLink();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready - initialize immediately
    initializeApp();
}

// Also initialize on window load as a fallback
window.addEventListener('load', () => {
    // Re-initialize if elements weren't found before
    if (!navToggle || !navMenu) {
        initDOMElements();
    }
    
    // Set hero section to visible
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Fallback: Try to initialize after a short delay if still not working
setTimeout(() => {
    if (!navToggle || !navMenu) {
        console.log('Retrying initialization...');
        initDOMElements();
    }
}, 100);

// ===== Add smooth scroll behavior for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== GSAP Animations =====
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero Section Animations
const heroTimeline = gsap.timeline();
heroTimeline
    .from('.hero-title .title-line', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero-title .title-main', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.hero-features .hero-feature-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.3')
    .from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5');

// Animate hero background pattern
gsap.to('.hero-pattern', {
    x: 50,
    y: 50,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Section Header Animations
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// About Section Animations
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out'
});

gsap.from('.about-features .feature-item', {
    scrollTrigger: {
        trigger: '.about-features',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Featured Dishes Animations
gsap.from('.dish-card', {
    scrollTrigger: {
        trigger: '.dishes-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
});

// Menu Section Animations
gsap.from('.menu-teaser', {
    scrollTrigger: {
        trigger: '.menu-teaser',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -60,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.menu-teaser-image', {
    scrollTrigger: {
        trigger: '.menu-teaser',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 60,
    duration: 1,
    ease: 'power3.out'
});

// Gallery Animations (if gallery exists)
if (document.querySelector('.gallery-item')) {
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// Reservations Form Animations
gsap.from('.reservation-form', {
    scrollTrigger: {
        trigger: '.reservation-form',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.form-group', {
    scrollTrigger: {
        trigger: '.reservation-form',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

// Contact Section Animations
gsap.from('.contact-item', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
});

gsap.from('.contact-map', {
    scrollTrigger: {
        trigger: '.contact-map',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
});

// Social Links Animation
gsap.from('.social-link', {
    scrollTrigger: {
        trigger: '.social-links',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0,
    rotation: -180,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
});

// Footer Animations
gsap.from('.footer-section', {
    scrollTrigger: {
        trigger: '.footer-content',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
});

// Button Hover Animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Navbar Scroll Animation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    if (currentScroll > 100) {
        gsap.to(navbar, {
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
            duration: 0.3
        });
    } else {
        gsap.to(navbar, {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
            duration: 0.3
        });
    }
    
    lastScroll = currentScroll;
});

// Scroll to Top Button Animation
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onEnter: () => {
            gsap.to(scrollTopBtn, {
                opacity: 1,
                visibility: 'visible',
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        },
        onLeaveBack: () => {
            gsap.to(scrollTopBtn, {
                opacity: 0,
                visibility: 'hidden',
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });

    // Scroll to Top Button with GSAP
    scrollTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: 0
            },
            ease: 'power3.inOut'
        });
    });
}

// Smooth Scroll with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        }
    });
});

// Parallax Effect for Hero
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    opacity: 0.3,
    ease: 'none'
});

// Subtle floating animation for dish icons (only on desktop)
if (window.innerWidth > 768) {
    gsap.utils.toArray('.dish-icon').forEach(icon => {
        gsap.to(icon, {
            y: -8,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 1.5
        });
    });
}

// Gallery Hover Effect (if gallery exists)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.03,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Menu CTA Buttons Animation
gsap.from('.menu-cta .btn', {
    scrollTrigger: {
        trigger: '.menu-cta',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

// Bistro Section Animations
gsap.from('.bistro-badge-simple', {
    scrollTrigger: {
        trigger: '.bistro-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'power2.out'
});

gsap.from('.bistro-showcase', {
    scrollTrigger: {
        trigger: '.bistro-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.bistro-feature', {
    scrollTrigger: {
        trigger: '.bistro-features',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
});

gsap.from('.bistro-dish-item', {
    scrollTrigger: {
        trigger: '.bistro-dishes-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.2)'
});

gsap.from('.bistro-image', {
    scrollTrigger: {
        trigger: '.bistro-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 60,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.bistro-buttons .btn', {
    scrollTrigger: {
        trigger: '.bistro-buttons',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

// Smooth Page Load Animation
window.addEventListener('load', () => {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});


