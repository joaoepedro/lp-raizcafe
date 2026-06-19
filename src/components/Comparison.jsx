import { Check, X } from 'lucide-react';

const ROWS = [
  { label: 'Tempo entre torra e sua xícara', raiz: 'até 7 dias', super: '6 a 18 meses' },
  { label: 'Origem rastreável', raiz: true, super: false },
  { label: 'Pagamento justo ao produtor', raiz: true, super: false },
  { label: 'Moagem na hora do pedido', raiz: true, super: false },
  { label: 'Notas sensoriais únicas por safra', raiz: true, super: false },
];

export default function Comparison() {
  return (
    <section className="bg-roast2 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-ochre font-mono text-xs tracking-[0.2em] uppercase">Por que a diferença é tão grande</span>
          <h2 className="font-display text-parchment text-3xl sm:text-[2.6rem] leading-tight mt-3">
            Raiz Café x café de prateleira
          </h2>
        </div>

        <div className="bg-roast/60 border border-paper/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] text-sm sm:text-base">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 text-center font-display text-ochre">Raiz Café</div>
            <div className="p-4 sm:p-5 text-center text-paper/50">Supermercado</div>

            {ROWS.map((r, idx) => (
              <RowCells key={r.label} row={r} striped={idx % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RowCells({ row, striped }) {
  const bg = striped ? 'bg-paper/[0.03]' : '';
  return (
    <>
      <div className={`p-4 sm:p-5 text-paper/75 border-t border-paper/10 ${bg}`}>{row.label}</div>
      <div className={`p-4 sm:p-5 text-center border-t border-paper/10 ${bg}`}>
        {typeof row.raiz === 'boolean' ? (
          row.raiz ? <Check className="w-5 h-5 text-moss mx-auto" /> : <X className="w-5 h-5 text-paper/30 mx-auto" />
        ) : (
          <span className="text-ochre font-mono text-sm">{row.raiz}</span>
        )}
      </div>
      <div className={`p-4 sm:p-5 text-center border-t border-paper/10 ${bg}`}>
        {typeof row.super === 'boolean' ? (
          row.super ? <Check className="w-5 h-5 text-moss mx-auto" /> : <X className="w-5 h-5 text-paper/30 mx-auto" />
        ) : (
          <span className="text-paper/40 font-mono text-sm">{row.super}</span>
        )}
      </div>
    </>
  );
}
