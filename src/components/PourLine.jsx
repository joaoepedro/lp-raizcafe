import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const STAGES = [
  { label: 'Colheita', at: 0.04 },
  { label: 'Torra', at: 0.32 },
  { label: 'Moagem', at: 0.6 },
  { label: 'Xícara', at: 0.92 },
];

/**
 * Elemento de assinatura da página: uma linha vertical fixa na lateral
 * (desktop) que "enche" conforme o usuário rola — como café sendo
 * despejado, ligando a origem (grão) ao destino (xícara). Cada marcador
 * representa um estágio real do processo, não é decoração.
 */
export default function PourLine({ targetRef }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });
  const height = useTransform(fill, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block fixed left-6 top-0 bottom-0 w-px z-30 pointer-events-none"
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-clay/35 dual-halo-shape" />
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-ochre to-clay"
          style={{ height }}
        />
        {STAGES.map((s) => (
          <div
            key={s.label}
            className="absolute -left-[5px] flex items-center gap-3"
            style={{ top: `${s.at * 100}%` }}
          >
            <Dot progress={fill} at={s.at} />
            <span className="dual-halo-text text-[10px] tracking-[0.18em] uppercase font-mono text-parchment whitespace-nowrap">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dot({ progress, at }) {
  const bg = useTransform(progress, (v) => (v >= at ? '#D6A24A' : '#BF5B33'));
  const scale = useTransform(progress, [at - 0.02, at], [0.8, 1.15]);
  return (
    <motion.span
      style={{ backgroundColor: bg, scale }}
      className="dual-halo-shape block w-[11px] h-[11px] rounded-full"
    />
  );
}
