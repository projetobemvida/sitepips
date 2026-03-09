/**
 * Sistema de Cookies LGPD - JavaScript
 * Implementação completa para conformidade com LGPD
 * Compatível com o site PIPS Pegue Monte
 */

class CookieConsentManager {
    constructor() {
        this.cookieName = 'pips_cookie_consent';
        this.cookieExpiry = 365; // dias
        this.consentData = this.getConsentData();
        this.categories = {
            essential: {
                name: 'Cookies Essenciais',
                description: 'Necessários para o funcionamento básico do site. Não podem ser desabilitados.',
                required: true,
                enabled: true,
                cookies: [
                    { name: 'pips_cookie_consent', purpose: 'Armazena suas preferências de cookies' },
                    { name: 'PHPSESSID', purpose: 'Mantém sua sessão ativa no site' },
                    { name: 'csrf_token', purpose: 'Proteção contra ataques CSRF' }
                ]
            },
            functional: {
                name: 'Cookies Funcionais',
                description: 'Melhoram sua experiência lembrando de preferências e configurações.',
                required: false,
                enabled: false,
                cookies: [
                    { name: 'language_preference', purpose: 'Lembra seu idioma preferido' },
                    { name: 'theme_preference', purpose: 'Lembra suas configurações de tema' },
                    { name: 'form_data', purpose: 'Salva dados de formulários temporariamente' }
                ]
            },
            analytics: {
                name: 'Cookies de Análise',
                description: 'Nos ajudam a entender como você usa o site para melhorarmos a experiência.',
                required: false,
                enabled: false,
                cookies: [
                    { name: '_ga', purpose: 'Google Analytics - Identificador único' },
                    { name: '_ga_*', purpose: 'Google Analytics - Dados de sessão' },
                    { name: '_gid', purpose: 'Google Analytics - Identificador de sessão' },
                    { name: '_gat', purpose: 'Google Analytics - Limitação de taxa' }
                ]
            },
            marketing: {
                name: 'Cookies de Marketing',
                description: 'Utilizados para personalizar anúncios e medir a eficácia de campanhas.',
                required: false,
                enabled: false,
                cookies: [
                    { name: '_fbp', purpose: 'Facebook Pixel - Rastreamento' },
                    { name: 'fr', purpose: 'Facebook - Publicidade personalizada' },
                    { name: 'IDE', purpose: 'Google Ads - Publicidade personalizada' },
                    { name: 'test_cookie', purpose: 'Google - Teste de suporte a cookies' }
                ]
            }
        };
        
        this.init();
    }

    init() {
        this.createBannerHTML();
        this.createModalHTML();
        this.createSettingsLink();
        this.bindEvents();
        this.loadConsentData();
        this.checkConsentStatus();
        this.initializeAllowedCookies();
    }

    createBannerHTML() {
        const bannerHTML = `
            <div id="cookie-banner" class="cookie-banner">
                <div class="cookie-banner-content">
                    <div class="cookie-banner-text">
                        <h3 class="cookie-banner-title">Política de Cookies</h3>
                        <p class="cookie-banner-description">
                            Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                            Você pode escolher quais cookies aceitar.
                        </p>
                        <div class="cookie-banner-links">
                            <a href="#" class="cookie-banner-link" onclick="cookieManager.openModal()">
                                Personalizar Cookies
                            </a>
                            <a href="/politica-privacidade" class="cookie-banner-link" target="_blank">
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                    <div class="cookie-banner-actions">
                        <button class="cookie-btn cookie-btn-reject" onclick="cookieManager.rejectAll()">
                            Rejeitar Todos
                        </button>
                        <button class="cookie-btn cookie-btn-customize" onclick="cookieManager.openModal()">
                            Personalizar
                        </button>
                        <button class="cookie-btn cookie-btn-accept" onclick="cookieManager.acceptAll()">
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
    }

    createModalHTML() {
        const categoriesHTML = Object.keys(this.categories).map(key => {
            const category = this.categories[key];
            const cookiesListHTML = category.cookies.map(cookie => 
                `<li>
                    <span class="cookie-name">${cookie.name}</span>
                    <span class="cookie-purpose">${cookie.purpose}</span>
                </li>`
            ).join('');

            return `
                <div class="cookie-category" data-category="${key}">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4 class="cookie-category-title">
                                <span class="cookie-icon cookie-icon-${key}"></span>
                                ${category.name}
                                ${category.required ? '<span style="color: #ff6b6b; font-size: 0.8em;">(Obrigatório)</span>' : ''}
                            </h4>
                            <p class="cookie-category-description">${category.description}</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" 
                                   data-category="${key}" 
                                   ${category.required ? 'checked disabled' : ''}
                                   ${category.enabled ? 'checked' : ''}>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                    <div class="cookie-details">
                        <button class="cookie-details-toggle" onclick="cookieManager.toggleDetails('${key}')">
                            Ver detalhes dos cookies
                        </button>
                        <div class="cookie-details-content" id="details-${key}">
                            <ul class="cookie-list">
                                ${cookiesListHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
