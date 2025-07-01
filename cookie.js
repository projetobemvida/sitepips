
function aceitarCookies() {
  localStorage.setItem('consentimentoCookies', 'aceito');
  document.getElementById('cookie-banner').style.display = 'none';
  ativarCookies(); // Ativa cookies opcionais como Google Analytics
}

function recusarCookies() {
  localStorage.setItem('consentimentoCookies', 'recusado');
  document.getElementById('cookie-banner').style.display = 'none';
}

function ativarCookies() {
  // Google Analytics (insira seu ID real no lugar de G-XXXXXXX)
  const scriptGA = document.createElement('script');
  scriptGA.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
  scriptGA.async = true;
  document.head.appendChild(scriptGA);

  const inlineGA = document.createElement('script');
  inlineGA.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  `;
  document.head.appendChild(inlineGA);
}

window.onload = function () {
  const consentimento = localStorage.getItem('consentimentoCookies');
  if (!consentimento) {
    document.getElementById('cookie-banner').style.display = 'flex';
  } else if (consentimento === 'aceito') {
    ativarCookies();
  }
};
