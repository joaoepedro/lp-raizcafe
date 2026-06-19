import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  return (
    <section id="depoimentos" className="bg-paper py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-clay font-mono text-xs tracking-[0.2em] uppercase">Quem já provou</span>
            <h2 className="font-display text-ink text-3xl sm:text-[2.6rem] leading-tight mt-3">
              2.340 xícaras, 4.9 de média.
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream rounded-2xl p-6 border border-ink/5"
            >
              <div className="flex text-ochre mb-4" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="text-ink/75 text-sm leading-relaxed mb-5">
                “{t.text}”
              </blockquote>
              <figcaption className="text-ink/50 text-xs">
                <span className="font-semibold text-ink/70">{t.name}</span> · {t.city}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
