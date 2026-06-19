import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Package } from 'lucide-react';
import { useCart } from '../lib/cart';
import { products } from '../data/products';
import { trackCtaClick } from '../lib/analytics';

function getNextRoastDeadline() {
  // Próxima torra: terça (2) ou sexta (5) às 18h
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  const daysToTuesday = (2 - day + 7) % 7;
  const daysToFriday = (5 - day + 7) % 7;
  const candidates = [daysToTuesday, daysToFriday].filter((d) => d > 0 || now.getHours() < 18);
  const delta = Math.min(...(candidates.length ? candidates : [daysToTuesday, daysToFriday]));
  target.setDate(now.getDate() + delta);
  target.setHours(18, 0, 0, 0);
  return target;
}

function useCountdown() {
  const [remaining, setRemaining] = useState(() => getNextRoastDeadline() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(getNextRoastDeadline() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.max(0, Math.floor(remaining / 3.6e6));
  const m = Math.max(0, Math.floor((remaining % 3.6e6) / 6e4));
  const s = Math.max(0, Math.floor((remaining % 6e4) / 1000));
  return { h, m, s };
}

export default function Offer() {
  const { addItem } = useCart();
  const { h, m, s } = useCountdown();

  function addBundle() {
    products.forEach((p) => addItem(p, 1));
    trackCtaClick('Adicionar kit degustação', 'offer');
  }

  const bundleTotal = products.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = Math.round(bundleTotal * 0.85 * 100) / 100;

  return (
    <section className="bg-clay py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="bg-ink rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8"
        >
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-ochre text-xs font-mono uppercase tracking-wide mb-3">
              <Package className="w-4 h-4" /> Kit degustação · 3 origens
            </span>
            <h2 className="font-display text-parchment text-2xl sm:text-3xl mb-3">
              Experimente os 3 cafés com 15% off
            </h2>
            <p className="text-paper/65 text-sm sm:text-base mb-1">
              Um pacote de 250g de cada origem — ideal para descobrir seu favorito.
            </p>
            <div className="flex items-baseline gap-2 justify-center lg:justify-start mt-4">
              <span className="text-paper/40 line-through text-sm">R$ {bundleTotal.toFixed(2)}</span>
              <span className="font-display text-3xl text-ochre">R$ {bundlePrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 text-paper/70 text-xs font-mono">
              <Clock className="w-4 h-4 text-ochre" />
              Faltam {String(h).padStart(2, '0')}h {String(m).padStart(2, '0')}m {String(s).padStart(2, '0')}s para a próxima torra
            </div>
            <button
              onClick={addBundle}
              className="px-8 py-4 rounded-full bg-ochre text-ink font-semibold hover:bg-ochre/90 transition-colors whitespace-nowrap"
            >
              Quero o kit degustação
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
