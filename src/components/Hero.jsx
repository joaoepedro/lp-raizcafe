import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck } from 'lucide-react';
import { CupIllustration, BeanIllustration } from './Illustrations';
import { trackCtaClick } from '../lib/analytics';

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-roast grain pt-28 pb-20 sm:pt-36 sm:pb-28">
      <BeanIllustration className="absolute -left-10 top-24 w-28 opacity-20 rotate-12 hidden sm:block" />
      <BeanIllustration className="absolute right-6 bottom-10 w-20 opacity-10 -rotate-12 hidden sm:block" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-moss/20 text-moss text-xs font-mono tracking-widest uppercase mb-6">
            Torra desta semana: 18 e 21 de junho
          </span>

          <h1 className="font-display text-parchment text-[2.6rem] leading-[1.05] sm:text-6xl sm:leading-[1.05] mb-6">
            Da terra de Minas
            <br />
            <span className="text-ochre">até a sua xícara</span>
            <br />
            em menos de 7 dias.
          </h1>

          <p className="text-paper/75 text-lg leading-relaxed max-w-md mb-8">
            Café especial comprado direto de pequenos produtores, torrado em
            lotes pequenos e enviado fresco — sem passar meses parado em
            prateleira de supermercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#produtos"
              onClick={() => trackCtaClick('Ver cafés disponíveis', 'hero')}
              className="text-center px-7 py-4 rounded-full bg-clay text-parchment font-semibold hover:bg-clayDark transition-colors shadow-lg shadow-clay/20"
            >
              Ver cafés disponíveis
            </a>
            <a
              href="#origem"
              className="text-center px-7 py-4 rounded-full border border-paper/25 text-paper hover:bg-paper/5 transition-colors"
            >
              Conhecer a origem
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-paper/70 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="flex text-ochre" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </span>
              4.9 de 2.340 avaliações
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> Frete grátis acima de R$120
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Garantia de 30 dias
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 bg-ochre/20 blur-3xl rounded-full" aria-hidden="true" />
          <CupIllustration className="relative w-full drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
