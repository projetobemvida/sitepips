function aceitarCookies() {
  localStorage.setItem('consentimentoCookies', 'aceito');
  document.getElementById('cookie-banner').style.display = 'none';
  ativarCookies(); // Ative cookies opcionais aqui
}

function recusarCookies() {
  localStorage.setItem('consentimentoCookies', 'recusado');
  document.getElementById('cookie-banner').style.display = 'none';
  // Nenhum cookie opcional será ativado
}

function ativarCookies() {
  // Aqui você pode carregar scripts como Google Analytics, Facebook Pixel etc.
  // Exemplo:
  // const scriptGA = document.createElement('script');
  // scriptGA.src = 'https://www.googletagmanager.com/gtag/js?id=SEU_ID';
  // document.head.appendChild(scriptGA);
}

window.onload = function () {
  const consentimento = localStorage.getItem('consentimentoCookies');
  if (!consentimento) {
    document.getElementById('cookie-banner').style.display = 'flex';
  } else if (consentimento === 'aceito') {
    ativarCookies();
  }
};
