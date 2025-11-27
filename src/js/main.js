function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const nav = document.getElementById('main-nav');
    
    menu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    
    if (!menu.classList.contains('hidden') && nav.classList.contains('transparent')) {
        menu.classList.add('transparent');
    } else if (menu.classList.contains('hidden')) {
        menu.classList.remove('transparent');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    menu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

document.getElementById('mobile-menu-button').addEventListener('click', toggleMobileMenu);

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

const nav = document.getElementById('main-nav');
const mobileMenu = document.getElementById('mobile-menu');
const chevronIcon = document.querySelector('.fa-chevron-down');
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 50) {
        nav.classList.add('transparent');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('transparent');
        }
    } else {
        nav.classList.remove('transparent');
        mobileMenu.classList.remove('transparent');
    }

    // Pause chevron animation when scrolled down
    if (chevronIcon) {
        if (currentScroll > 100) {
            chevronIcon.style.animationPlayState = 'paused';
        } else {
            chevronIcon.style.animationPlayState = 'running';
        }
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll);
handleScroll();

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);
    const messageDiv = document.getElementById('form-message');
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(messageDiv, form);
        } else {
            showErrorMessage(messageDiv);
        }
    })
    .catch(error => {
        showErrorMessage(messageDiv);
    });
});

function showSuccessMessage(messageDiv, form) {
    const successText = window.getTranslation ? window.getTranslation('form.success') : 'Zpráva byla úspěšně odeslána! Brzy se vám ozveme.';
    messageDiv.className = 'form-message p-6 rounded-xl mb-6 bg-green-600 text-white text-center font-semibold text-lg shadow-lg border-2 border-green-500';
    messageDiv.innerHTML = '<div class="flex items-center justify-center gap-4"><svg width="20" height="20" class="flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>' + successText + '</span></div>';
    messageDiv.classList.remove('hidden');
    form.reset();
}

function showErrorMessage(messageDiv) {
    const errorText = window.getTranslation ? window.getTranslation('form.error') : 'Chyba při odesílání zprávy. Zkuste to prosím znovu.';
    messageDiv.className = 'form-message p-6 rounded-xl mb-6 bg-red-600 text-white text-center font-semibold text-lg shadow-lg border-2 border-red-500';
    messageDiv.innerHTML = '<div class="flex items-center justify-center gap-4"><svg width="20" height="20" class="flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>' + errorText + '</span></div>';
    messageDiv.classList.remove('hidden');
}

// Smooth scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    document.querySelectorAll('.animate-slide-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

