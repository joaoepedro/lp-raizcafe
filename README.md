# Raiz Café — Landing Page de Conversão (E-commerce)

Landing page premium para uma marca fictícia de café especial, construída como
projeto de portfólio com foco em **conversão**, **performance** e **integração
com Google Ads / Meta Ads**. Stack: **Vite + React 19 + Tailwind CSS v4 +
Framer Motion**.

🔗 Deploy sugerido: Vercel (mesmo fluxo usado no projeto DigitalPro).

---

## 1. O que tem nesta página (e por quê)

### Estrutura pensada para converter
| Seção | Objetivo de conversão |
|---|---|
| Hero | Promessa única e clara + CTA acima da dobra + prova social rápida (nota, frete, garantia) |
| Trust bar | Reforça segurança logo após o hero (frete, garantia, pagamento) |
| Origem | Storytelling que justifica o preço premium (por que custa mais que café de mercado) |
| Produtos | Cards com especificações tipo "etiqueta de pacote" (altitude, processo, notas), preço, contador de quantidade e CTA direto |
| Processo | 4 etapas reais (não decorativas) que reduzem objeção sobre frescor |
| Comparação | Tabela direta Raiz x Supermercado — ajuda quem está em dúvida |
| Prova social | Depoimentos com nome, cidade e nota |
| Oferta | Kit degustação com desconto + contador regressivo da próxima torra (urgência real, não falsa) |
| FAQ | Resolve objeções de frete, pagamento, garantia antes do carrinho |
| Newsletter | Captura de lead com cupom de 10% — funciona como rede de segurança para quem não compra na primeira visita |
| Carrinho/Checkout | Drawer lateral com fluxo completo: carrinho → dados → confirmação, sem sair da página (menos fricção) |

### Elemento de assinatura visual
Uma **linha de despejo** fixa na lateral (desktop) que "enche" conforme o
usuário rola a página — do grão até a xícara — com marcadores reais de cada
etapa do processo (Colheita → Torra → Moagem → Xícara). É o fio condutor
visual da página inteira.

### Boas práticas técnicas implementadas
- **Performance**: fontes com `font-display: swap`, preconnect, CSS minificado, build de produção otimizado (~119kB gzip de JS).
- **Acessibilidade**: foco visível em todos os elementos interativos, `aria-label`/`aria-expanded` em botões e accordions, `prefers-reduced-motion` respeitado, contraste verificado.
- **Mobile-first**: CTA fixo no rodapé do celular, drawer de carrinho em tela cheia no mobile, navegação simplificada.
- **SEO**: meta tags completas, Open Graph, Twitter Card, dados estruturados (JSON-LD `Organization`), URL canônica.
- **LGPD**: banner de consentimento de cookies que **bloqueia o disparo de eventos de analytics até o usuário aceitar** (ver `src/lib/consent.jsx`).
- **Formulário curto**: newsletter pede só e-mail (sem fricção desnecessária).

---

## 2. Integração com Google Ads, Meta Ads e GA4

Toda a lógica de tracking está centralizada em **`src/lib/analytics.js`** —
é o único arquivo que você precisa mexer para conectar com ferramentas reais.
Os componentes só chamam funções como `trackAddToCart()`, `trackPurchase()`,
nunca `gtag()` ou `fbq()` diretamente. Isso facilita trocar de ferramenta sem
caçar código espalhado.

### Passo a passo para deixar "ligado de verdade"

**1) Google Tag Manager (recomendado como hub central)**
- Crie um container em [tagmanager.google.com](https://tagmanager.google.com)
- Troque `GTM-XXXXXXX` em `index.html` (aparece 2x: no `<head>` e no `<noscript>`) pelo seu ID
- Dentro do GTM, crie:
  - Tag **GA4 Configuration**
  - Tag **Google Ads Conversion Tracking** (evento `purchase`)
  - Tag **Meta Pixel** (template oficial da Community Gallery, não cole o script direto em HTML customizado)
  - Triggers customizados por evento do `dataLayer`: `view_item`, `add_to_cart`, `begin_checkout`, `purchase`, `generate_lead`

**2) Meta Conversions API (CAPI) — recomendado em 2026**
- O Pixel sozinho perde eventos por bloqueadores de anúncio e restrições do iOS.
- Cada evento já sai com um `event_id` único (gerado em `analytics.js`) — use o
  mesmo ID no servidor para o Meta deduplicar Pixel (browser) e CAPI (servidor) automaticamente.
- Configure o envio server-to-server no seu backend de checkout real, ou use
  o servidor GTM (sGTM) reaproveitando os eventos do GA4 como fonte.

**3) Google Ads**
- Vincule o Google Ads à propriedade do GA4 (Admin → Vínculos de produtos) e
  importe a conversão `purchase` direto do GA4, em vez de duplicar uma tag de
  conversão separada — menos chance de contar a conversão duas vezes.

**4) Conformidade com cookies (LGPD/GDPR)**
- Os eventos só são enviados ao `dataLayer` depois que o usuário aceita o
  banner de cookies (`src/lib/consent.jsx`). Isso é checado em
  `setAnalyticsConsent()` dentro de `analytics.js`.

### Eventos já implementados
```
view_item        → ao um card de produto entrar na tela
add_to_cart       → ao clicar em "Adicionar"
begin_checkout    → ao abrir o formulário de checkout
purchase          → ao confirmar o pedido (evento de conversão principal)
generate_lead     → ao enviar o e-mail da newsletter
whatsapp_click    → ao clicar no botão flutuante do WhatsApp (boa micro-conversão)
cta_click         → em todos os CTAs principais, com label e seção (útil para saber qual parte do scroll mais converte)
```

---

## 3. O checkout é só uma simulação

O fluxo de carrinho → checkout → confirmação é **front-end apenas**, pensado
para portfólio. Antes de usar em produção:

1. Crie um backend (Node/Express, ou serverless na Vercel) que receba os dados do formulário.
2. Integre um gateway de pagamento real: **Mercado Pago** (mais comum no Brasil, aceita Pix nativo) ou **Stripe**.
3. Só dispare `trackPurchase()` depois da confirmação real do pagamento pelo backend — nunca antes, para não contaminar os dados de conversão dos Ads.
4. Implemente o Meta CAPI no mesmo backend, reaproveitando o `event_id` do evento `purchase` do front-end.

---

## 4. Rodando localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção em /dist
npm run preview   # testa o build de produção localmente
```

## 5. Deploy

```bash
npm i -g vercel
vercel
```
Ou conecte o repositório diretamente em [vercel.com](https://vercel.com) —
mesmo fluxo do projeto DigitalPro.

---

## 6. Próximos passos sugeridos (para deixar "produção de verdade")

- [ ] Trocar ilustrações SVG por fotografia real do produto/fazenda
- [ ] Conectar backend de checkout + gateway de pagamento
- [ ] Configurar GTM com IDs reais (GA4, Google Ads, Meta Pixel/CAPI)
- [ ] Rodar Google PageSpeed Insights e ajustar LCP se necessário
- [ ] Configurar A/B test no headline do hero (maior impacto comprovado em testes de CRO)
- [ ] Adicionar Hotjar ou Microsoft Clarity para heatmaps
- [ ] Página de política de privacidade e termos reais (hoje são links placeholder)

---

*Marca, produtos, depoimentos e dados de fazendas são fictícios — projeto
desenvolvido para fins de portfólio.*
