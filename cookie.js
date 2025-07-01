document.addEventListener("DOMContentLoaded", function() {
    const cookieConsentBanner = document.getElementById("cookieConsentBanner");
    const acceptCookiesButton = document.getElementById("acceptCookies");
    const rejectCookiesButton = document.getElementById("rejectCookies");

    // Verifica se o usuário já fez uma escolha sobre os cookies
    const userChoice = localStorage.getItem("cookiesConsent");

    if (!userChoice) {
        // Se nenhuma escolha foi feita, mostra o banner
        cookieConsentBanner.style.display = "block";
    } else if (userChoice === "accepted") {
        // Se aceitou, pode carregar scripts de cookies não essenciais aqui
        console.log("Cookies aceitos. Carregando scripts não essenciais...");
        // Exemplo: carregar Google Analytics
        // loadGoogleAnalytics();
    } else if (userChoice === "rejected") {
        // Se recusou, não carrega scripts de cookies não essenciais
        console.log("Cookies recusados. Nenhum script não essencial será carregado.");
    }

    acceptCookiesButton.addEventListener("click", function() {
        localStorage.setItem("cookiesConsent", "accepted");
        cookieConsentBanner.style.display = "none";
        // Recarrega a página ou carrega scripts de cookies não essenciais
        location.reload(); // Recarrega para aplicar as mudanças
    });

    rejectCookiesButton.addEventListener("click", function() {
        localStorage.setItem("cookiesConsent", "rejected");
        cookieConsentBanner.style.display = "none";
        // Não carrega scripts de cookies não essenciais
        // Se houver cookies já definidos, você pode precisar de lógica para removê-los aqui
    });

    // Função de exemplo para carregar Google Analytics (apenas se consentimento for dado)
    function loadGoogleAnalytics() {
        // Substitua 'UA-XXXXX-Y' pelo seu ID de acompanhamento do Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y';
        document.head.appendChild(script );

        script.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-XXXXX-Y');
        };
    }
});
