import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../lib/cart';
import { trackCtaClick } from '../lib/analytics';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const { items, total, setIsOpen, goToCheckout } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-ink/97 backdrop-blur border-t border-paper/10 px-4 py-3 flex items-center justify-between gap-3"
        >
          {count > 0 ? (
            <>
              <span className="text-paper text-sm">
                {count} {count === 1 ? 'item' : 'itens'} · <strong className="text-ochre">R$ {total.toFixed(2)}</strong>
              </span>
              <button
                onClick={() => { setIsOpen(true); goToCheckout(); trackCtaClick('Finalizar compra', 'sticky_mobile'); }}
                className="px-5 py-2.5 rounded-full bg-clay text-parchment text-sm font-semibold"
              >
                Finalizar compra
              </button>
            </>
          ) : (
            <>
              <span className="text-paper text-sm">Café fresco, direto do produtor.</span>
              <a
                href="#produtos"
                onClick={() => trackCtaClick('Ver cafés', 'sticky_mobile')}
                className="px-5 py-2.5 rounded-full bg-clay text-parchment text-sm font-semibold"
              >
                Ver cafés
              </a>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
