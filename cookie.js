function aceitarCookies() {
  localStorage.setItem('cookiesAceitos', 'true');
  document.getElementById('cookie-banner').style.display = 'none';
}

window.onload = function () {
  if (localStorage.getItem('cookiesAceitos') !== 'true') {
    document.getElementById('cookie-banner').style.display = 'flex';
  } else {
    document.getElementById('cookie-banner').style.display = 'none';
  }
};
