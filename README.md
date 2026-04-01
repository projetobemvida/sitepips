# PIPS Pegue Monte — Site

## Estrutura
```
pips-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── hero.webp        ← foto principal do hero
    ├── outro.webp       ← foto de decoração adicional
    ├── logo.webp        ← logo da marca
    ├── favicon.webp     ← ícone da aba
    ├── gif-pips.gif     ← gif animado
    └── gif-pips.webp    ← versão webp do gif
```

## Como subir no GitHub Pages
1. Crie um repositório no GitHub (ex: `pips-site`)
2. Suba todos os arquivos mantendo a estrutura de pastas
3. Vá em **Settings → Pages**
4. Selecione o branch `main` e pasta `/ (root)`
5. Clique em **Save** — o site estará no ar em ~2 minutos

## Adicionar suas fotos das decorações
Renomeie suas fotos e coloque na pasta `images/`:
- `pool-party.webp`
- `snoopy.webp`
- `junina.webp`
- `chapeuzinho.webp`
- etc.

Depois atualize os `src=""` dos `<img>` na seção **Temas** do `index.html`.
