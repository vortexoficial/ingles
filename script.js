const header = document.querySelector('.site-header');
const revealElements = document.querySelectorAll('[data-reveal]');
const faqQuestions = document.querySelectorAll('.faq-question');
const currentYear = document.getElementById('current-year');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-panel a');
const HEADER_SCROLL_ENTER = 40;
const HEADER_SCROLL_EXIT = 8;

let headerScrollTicking = false;

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const setMobileMenuState = (isOpen) => {
    if (!header || !mobileMenuToggle || !mobileMenuPanel) {
        return;
    }

    header.classList.toggle('menu-open', isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
};

const handleHeaderState = () => {
    if (!header) {
        return;
    }

    const currentScrollY = window.scrollY;
    const isScrolled = header.classList.contains('is-scrolled');

    if (!isScrolled && currentScrollY > HEADER_SCROLL_ENTER) {
        header.classList.add('is-scrolled');
        return;
    }

    if (isScrolled && currentScrollY < HEADER_SCROLL_EXIT) {
        header.classList.remove('is-scrolled');
    }
};

handleHeaderState();
window.addEventListener('scroll', () => {
    if (headerScrollTicking) {
        return;
    }

    headerScrollTicking = true;
    window.requestAnimationFrame(() => {
        handleHeaderState();
        headerScrollTicking = false;
    });
}, { passive: true });

if (mobileMenuToggle && mobileMenuPanel) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        setMobileMenuState(!isOpen);
    });

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setMobileMenuState(false);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 980) {
            setMobileMenuState(false);
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMobileMenuState(false);
        }
    });
}

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
    });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
}

faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const expanded = button.getAttribute('aria-expanded') === 'true';

        faqQuestions.forEach((question) => {
            question.setAttribute('aria-expanded', 'false');
            question.closest('.faq-item')?.classList.remove('is-open');
            const marker = question.querySelector('.faq-marker');
            if (marker) {
                marker.textContent = '+';
            }
        });

        if (!expanded && item) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            const marker = button.querySelector('.faq-marker');
            if (marker) {
                marker.textContent = '−';
            }
        }
    });
});