import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    title: 'Colheita seletiva',
    text: 'Apenas os frutos maduros são colhidos à mão, um a um, entre maio e setembro.',
  },
  {
    n: '02',
    title: 'Torra em pequenos lotes',
    text: 'Lotes de até 15kg, monitorados por curva de torra própria para cada origem.',
  },
  {
    n: '03',
    title: 'Moagem na hora do pedido',
    text: 'Você escolhe o método de preparo no checkout — moemos só depois do pedido confirmado.',
  },
  {
    n: '04',
    title: 'Envio em até 48h',
    text: 'Embalagem com válvula desgaseificadora, que mantém o aroma por semanas.',
  },
];

export default function Process() {
  return (
    <section id="processo" className="bg-roast py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-14">
          <span className="text-ochre font-mono text-xs tracking-[0.2em] uppercase">Do grão à xícara</span>
          <h2 className="font-display text-parchment text-3xl sm:text-[2.6rem] leading-tight mt-3">
            Quatro etapas, nenhum atalho.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-0"
            >
              <span className="font-display text-5xl text-paper/15">{s.n}</span>
              <h3 className="font-display text-parchment text-lg mt-2 mb-2">{s.title}</h3>
              <p className="text-paper/65 text-sm leading-relaxed">{s.text}</p>
              {idx < STEPS.length - 1 && (
                <span className="hidden lg:block absolute top-7 -right-3 w-6 h-px bg-paper/15" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
