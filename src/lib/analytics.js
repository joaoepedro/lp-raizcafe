/**
 * src/lib/analytics.js
 * ------------------------------------------------------------------
 * Camada única de tracking para Raiz Café.
 *
 * Por que centralizar aqui?
 * Em vez de espalhar gtag(), fbq() e dataLayer.push() pelos
 * componentes, toda a página chama as funções deste arquivo.
 * Isso garante:
 *   1. Um único lugar para trocar de ferramenta (ex: trocar GA4
 *      por outra coisa) sem caçar chamadas espalhadas.
 *   2. Eventos padronizados (mesmo nome/parâmetros sempre).
 *   3. Eventos só disparam DEPOIS do consentimento de cookies
 *      (ver consent.jsx) — importante para LGPD/GDPR.
 *
 * COMO CONECTAR DE VERDADE (produção):
 *
 * 1) GOOGLE TAG MANAGER (recomendado)
 *    - Troque "GTM-XXXXXXX" no index.html pelo ID do seu container.
 *    - Dentro do GTM, crie as tags GA4 Config, Google Ads Conversion
 *      e Meta Pixel, todas disparando a partir dos eventos do
 *      dataLayer abaixo (view_item, add_to_cart, begin_checkout,
 *      purchase, generate_lead).
 *    - Isso evita colar pixels direto no código e permite o time de
 *      marketing editar tags sem mexer no front-end.
 *
 * 2) META CONVERSIONS API (CAPI) — recomendado em 2026
 *    - O Pixel sozinho perde eventos (iOS, ad blockers, navegadores
 *      restritivos). Configure o CAPI no servidor/backend de
 *      checkout e envie o mesmo `eventId` usado aqui no client-side
 *      para o Meta deduplicar automaticamente (event_id casado).
 *    - Guia oficial: business.facebook.com/events_manager
 *
 * 3) GOOGLE ADS
 *    - Vincule o Google Ads à conta do GA4 (Configurações > Vínculos
 *      de produtos) e importe a conversão "purchase" direto do GA4,
 *      em vez de duplicar uma tag de conversão separada.
 * ------------------------------------------------------------------
 */

let consentGiven = false;

export function setAnalyticsConsent(value) {
  consentGiven = value;
}

function pushDataLayer(payload) {
  if (!consentGiven) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Gera um event_id estável para deduplicar Pixel (browser) x CAPI (servidor) */
function makeEventId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Visualização de item — disparar quando um card de produto entra na viewport ou é aberto */
export function trackViewItem(product) {
  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'BRL',
      value: product.price,
      items: [{ item_id: product.id, item_name: product.name, price: product.price }],
    },
  });
}

/** Adicionar ao carrinho */
export function trackAddToCart(product, quantity = 1) {
  const eventId = makeEventId('atc');
  pushDataLayer({
    event: 'add_to_cart',
    event_id: eventId,
    ecommerce: {
      currency: 'BRL',
      value: product.price * quantity,
      items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity }],
    },
  });
  return eventId;
}

/** Início do checkout — momento-chave para otimização de campanhas */
export function trackBeginCheckout(cartItems, total) {
  const eventId = makeEventId('checkout');
  pushDataLayer({
    event: 'begin_checkout',
    event_id: eventId,
    ecommerce: {
      currency: 'BRL',
      value: total,
      items: cartItems.map((i) => ({
        item_id: i.id, item_name: i.name, price: i.price, quantity: i.quantity,
      })),
    },
  });
  return eventId;
}

/** Compra concluída — evento de conversão principal para Google Ads / Meta */
export function trackPurchase(orderId, cartItems, total) {
  const eventId = makeEventId('purchase');
  pushDataLayer({
    event: 'purchase',
    event_id: eventId,
    ecommerce: {
      transaction_id: orderId,
      currency: 'BRL',
      value: total,
      items: cartItems.map((i) => ({
        item_id: i.id, item_name: i.name, price: i.price, quantity: i.quantity,
      })),
    },
  });
  return eventId;
}

/** Lead — newsletter, lista de espera, cupom de primeira compra */
export function trackGenerateLead(formName, email) {
  const eventId = makeEventId('lead');
  pushDataLayer({
    event: 'generate_lead',
    event_id: eventId,
    form_name: formName,
    // Nunca envie e-mail em texto puro para o dataLayer em produção sem
    // hashing (SHA-256) — necessário para Enhanced Conversions / CAPI.
    lead_has_email: Boolean(email),
  });
  return eventId;
}

/** Clique no WhatsApp — bom sinal de intenção, útil como micro-conversão */
export function trackWhatsAppClick(origin) {
  pushDataLayer({ event: 'whatsapp_click', click_origin: origin });
}

/** Clique no CTA principal — para medir qual seção do scroll mais converte */
export function trackCtaClick(ctaLabel, section) {
  pushDataLayer({ event: 'cta_click', cta_label: ctaLabel, cta_section: section });
}
