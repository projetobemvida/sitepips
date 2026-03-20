/**
 * PIPS Pegue Monte - Scripts
 */
document.addEventListener('DOMContentLoaded', function() {

    // ── AOS ──────────────────────────────────────────────
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease', once: true, offset: 100 });
    }

    // ── MENU MOBILE ──────────────────────────────────────
    const menuToggle = document.querySelector('.menu-toggle');
    const navList    = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ── SCROLL SUAVE ─────────────────────────────────────
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // ── HEADER HIDE/SHOW NO SCROLL ────────────────────────
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (header) {
            header.style.transform = scrollTop > lastScrollTop && scrollTop > 100
                ? 'translateY(-100%)'
                : 'translateY(0)';
            header.classList.toggle('scrolled', scrollTop > 0);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // ── ELFSIGHT LAZY ─────────────────────────────────────
    var elfsightLoaded = false;
    var container = document.getElementById('elfsight-container');
    if (container) {
        new IntersectionObserver(function(entries, obs) {
            if (entries[0].isIntersecting && !elfsightLoaded) {
                elfsightLoaded = true;
                var s = document.createElement('script');
                s.src = 'https://static.elfsight.com/platform/platform.js';
                s.defer = true;
                document.body.appendChild(s);
                obs.disconnect();
            }
        }).observe(container);
    }

    // ── YOUTUBE LITE ──────────────────────────────────────
    document.querySelectorAll('.youtube-lite').forEach(function(el) {
        el.addEventListener('click', function() {
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + el.dataset.videoid + '?autoplay=1&rel=0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.title = el.getAttribute('aria-label') || 'Vídeo YouTube';
            iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0';
            el.innerHTML = '';
            el.appendChild(iframe);
        });
    });

});
