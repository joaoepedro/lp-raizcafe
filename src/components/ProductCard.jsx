import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag, Mountain, Droplets } from 'lucide-react';
import { useCart } from '../lib/cart';
import { trackViewItem } from '../lib/analytics';
import { BeanIllustration } from './Illustrations';

const ACCENTS = {
  clay: { bg: 'bg-clay/15', text: 'text-clay', ring: 'ring-clay/40' },
  moss: { bg: 'bg-moss/15', text: 'text-moss', ring: 'ring-moss/40' },
  ochre: { bg: 'bg-ochre/15', text: 'text-ochre', ring: 'ring-ochre/40' },
};

export default function ProductCard({ product, index }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const accent = ACCENTS[product.accent];

  useEffect(() => {
    trackViewItem(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col bg-cream rounded-3xl overflow-hidden border border-ink/5 shadow-xl shadow-ink/5"
    >
      {product.badge && (
        <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${accent.bg} ${accent.text}`}>
          {product.badge}
        </span>
      )}

      <div className="relative h-44 flex items-center justify-center bg-ink/[0.04]">
        <BeanIllustration className="w-16 opacity-80" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-ink text-xl mb-1">{product.name}</h3>
        <p className="text-ink/55 text-sm mb-4">{product.subtitle}</p>

        <div className="flex gap-4 mb-4 text-xs font-mono text-ink/60">
          <span className="flex items-center gap-1"><Mountain className="w-3.5 h-3.5" /> {product.altitude}</span>
          <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5" /> {product.process}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {product.notes.map((n) => (
            <span key={n} className={`px-2.5 py-1 rounded-full text-[11px] ${accent.bg} ${accent.text}`}>
              {n}
            </span>
          ))}
        </div>

        <p className="text-ink/40 text-xs mb-5 italic">{product.producer}</p>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            {product.oldPrice && (
              <span className="text-ink/35 line-through text-sm">R$ {product.oldPrice.toFixed(2)}</span>
            )}
            <span className="font-display text-2xl text-ink">R$ {product.price.toFixed(2)}</span>
            <span className="text-ink/45 text-xs">/ 250g</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-ink/15 rounded-full">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2.5 text-ink/60 hover:text-ink"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-mono" aria-live="polite">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2.5 text-ink/60 hover:text-ink"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => { addItem(product, qty); setQty(1); }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-clayDark transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
