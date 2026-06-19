import { motion } from 'framer-motion';
import { MapPinIllustration, LeafIllustration } from './Illustrations';

const FARMS = [
  { name: 'Sítio do João Bento', city: 'Patrocínio, MG', altitude: '1.100m' },
  { name: 'Fazenda Boa Vista', city: 'Carmo de Minas, MG', altitude: '1.350m' },
  { name: 'Cooperativa Vale do Rio Grande', city: 'Varginha, MG', altitude: '950m' },
];

export default function Origin() {
  return (
    <section id="origem" className="bg-roast2 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-moss font-mono text-xs tracking-[0.2em] uppercase">Nossa origem</span>
          <h2 className="font-display text-parchment text-3xl sm:text-[2.6rem] leading-tight mt-3 mb-5">
            Compramos direto de quem planta — sem atravessador, sem leilão.
          </h2>
          <p className="text-paper/70 text-lg leading-relaxed">
            Visitamos cada produtor pessoalmente antes de fechar parceria.
            Pagamos até 35% acima do preço de mercado pelo café de qualidade
            superior, o que financia melhores práticas agrícolas e mantém
            famílias inteiras na lavoura.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {FARMS.map((f, idx) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-roast/60 border border-paper/10 rounded-2xl p-6"
            >
              <MapPinIllustration className="w-7 mb-4" />
              <h3 className="font-display text-parchment text-lg mb-1">{f.name}</h3>
              <p className="text-paper/60 text-sm mb-3">{f.city}</p>
              <p className="text-xs font-mono text-ochre uppercase tracking-wide">
                Altitude {f.altitude}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex items-center gap-4 bg-moss/10 border border-moss/30 rounded-2xl p-6">
          <LeafIllustration className="w-16 shrink-0" />
          <p className="text-paper/80 text-sm sm:text-base leading-relaxed">
            <strong className="text-moss">Cultivo de sombra e manejo orgânico</strong> em todas as
            lavouras parceiras — preservamos a mata nativa ao redor dos cafezais,
            o que também resulta em grãos mais doces e complexos.
          </p>
        </div>
      </div>
    </section>
  );
}
