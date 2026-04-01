// PIPS PEGUE MONTE — script.js

document.addEventListener('DOMContentLoaded', function () {

  // ── Header scroll ──────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Mobile nav ─────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav  = document.getElementById('mobileNav');
  const closeNav   = document.getElementById('closeNav');

  if (menuToggle) menuToggle.addEventListener('click', () => mobileNav.classList.add('open'));
  if (closeNav)   closeNav.addEventListener('click',   () => mobileNav.classList.remove('open'));

  window.closeMobileNav = function () { mobileNav.classList.remove('open'); };

  // ── Copiar endereço ────────────────────────────
  window.copiarEndereco = function () {
    navigator.clipboard.writeText('Rua Sargento José de Paula, 237 - Centro, Barueri, SP')
      .then(() => alert('Endereço copiado!'))
      .catch(() => alert('Erro ao copiar.'));
  };

  // ── Fade-in on scroll (IntersectionObserver) ───
  const targets = document.querySelectorAll(
    '.step-item, .tema-card, .trust-item, .insta-item, .footer-col'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity .65s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1),
                            transform .65s ${i * 0.07}s cubic-bezier(0.16,1,0.3,1)`;
    observer.observe(el);
  });

});
