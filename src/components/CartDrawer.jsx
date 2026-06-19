import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { useCart } from '../lib/cart';
import { trackCtaClick } from '../lib/analytics';

export default function CartDrawer() {
  const {
    items, updateQuantity, removeItem, subtotal, shipping, total,
    freeShippingThreshold, isOpen, setIsOpen, checkoutStep, setCheckoutStep,
    goToCheckout, completeOrder, lastOrderId,
  } = useCart();

  function close() {
    setIsOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 300);
  }

  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[90]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-cream z-[95] flex flex-col"
            role="dialog"
            aria-label="Carrinho de compras"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h2 className="font-display text-ink text-xl">
                {checkoutStep === 'cart' && 'Seu carrinho'}
                {checkoutStep === 'checkout' && 'Finalizar pedido'}
                {checkoutStep === 'success' && 'Pedido confirmado'}
              </h2>
              <button onClick={close} aria-label="Fechar carrinho" className="p-1.5 text-ink/50 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {checkoutStep === 'cart' && (
                <CartStep
                  items={items}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  subtotal={subtotal}
                  missingForFreeShipping={missingForFreeShipping}
                />
              )}
              {checkoutStep === 'checkout' && <CheckoutStep onBack={() => setCheckoutStep('cart')} onConfirm={completeOrder} />}
              {checkoutStep === 'success' && <SuccessStep orderId={lastOrderId} onClose={close} />}
            </div>

            {checkoutStep === 'cart' && items.length > 0 && (
              <div className="px-6 py-5 border-t border-ink/10 bg-paper">
                <div className="flex justify-between text-sm text-ink/60 mb-1">
                  <span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-ink/60 mb-3">
                  <span>Frete</span><span>{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-display text-lg text-ink mb-4">
                  <span>Total</span><span>R$ {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { goToCheckout(); trackCtaClick('Ir para checkout', 'cart_drawer'); }}
                  className="w-full py-4 rounded-full bg-clay text-parchment font-semibold hover:bg-clayDark transition-colors"
                >
                  Finalizar compra
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartStep({ items, updateQuantity, removeItem, missingForFreeShipping }) {
  if (items.length === 0) {
    return <p className="text-ink/50 text-center py-12">Seu carrinho está vazio. Que tal um café da Serra da Mantiqueira?</p>;
  }
  return (
    <>
      {missingForFreeShipping > 0 && (
        <div className="bg-moss/15 text-moss text-xs rounded-xl px-4 py-3 mb-5">
          Faltam <strong>R$ {missingForFreeShipping.toFixed(2)}</strong> para frete grátis.
        </div>
      )}
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4">
            <div className="w-16 h-16 rounded-xl bg-ink/5 shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-ink text-sm">{item.name}</p>
              <p className="text-ink/45 text-xs mb-2">R$ {item.price.toFixed(2)} / 250g</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-ink/15 rounded-full">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-ink/60" aria-label="Diminuir">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center text-xs font-mono">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-ink/60" aria-label="Aumentar">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-ink/35 hover:text-clay" aria-label={`Remover ${item.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function CheckoutStep({ onBack, onConfirm }) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Simulação de checkout para fins de portfólio.
    // Em produção: integrar gateway real (Stripe, Mercado Pago, Pagar.me)
    // e só chamar onConfirm() após confirmação do pagamento pelo backend.
    setTimeout(() => {
      setSubmitting(false);
      onConfirm();
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-ink/50 text-sm mb-2">
        <ArrowLeft className="w-4 h-4" /> Voltar ao carrinho
      </button>

      <fieldset className="space-y-3">
        <legend className="text-ink/50 text-xs uppercase tracking-wide mb-1">Entrega</legend>
        <Field label="Nome completo" required />
        <Field label="CEP" required placeholder="00000-000" />
        <Field label="Endereço" required />
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-ink/50 text-xs uppercase tracking-wide mb-1">Pagamento</legend>
        <Field label="Número do cartão" required placeholder="•••• •••• •••• ••••" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Validade" required placeholder="MM/AA" />
          <Field label="CVV" required placeholder="•••" />
        </div>
      </fieldset>

      <p className="flex items-center gap-1.5 text-ink/40 text-xs">
        <Lock className="w-3.5 h-3.5" /> Pagamento simulado — projeto de portfólio, nenhum dado é processado.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-clay text-parchment font-semibold hover:bg-clayDark transition-colors disabled:opacity-60"
      >
        {submitting ? 'Processando…' : 'Confirmar pedido'}
      </button>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-ink/60 text-xs mb-1 block">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-white text-ink text-sm outline-none focus:border-clay"
      />
    </label>
  );
}

function SuccessStep({ orderId, onClose }) {
  return (
    <div className="text-center py-8">
      <CheckCircle2 className="w-14 h-14 text-moss mx-auto mb-5" />
      <h3 className="font-display text-ink text-xl mb-2">Pedido confirmado!</h3>
      <p className="text-ink/55 text-sm mb-1">Número do pedido</p>
      <p className="font-mono text-clay text-lg mb-6">{orderId}</p>
      <p className="text-ink/55 text-sm mb-8 max-w-xs mx-auto">
        Enviamos os detalhes para o seu e-mail. Seu café será torrado na próxima leva e enviado em até 48h.
      </p>
      <button onClick={onClose} className="px-8 py-3 rounded-full bg-ink text-cream font-semibold">
        Continuar navegando
      </button>
    </div>
  );
}
