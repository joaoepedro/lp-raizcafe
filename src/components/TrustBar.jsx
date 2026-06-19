import { Truck, ShieldCheck, Leaf, CreditCard } from 'lucide-react';

const ITEMS = [
  { icon: Truck, label: 'Frete grátis acima de R$120' },
  { icon: ShieldCheck, label: 'Garantia de 30 dias' },
  { icon: Leaf, label: 'Direto de pequenos produtores' },
  { icon: CreditCard, label: 'Pix, cartão ou boleto' },
];

export default function TrustBar() {
  return (
    <div className="bg-ink border-y border-paper/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-paper/70">
            <Icon className="w-5 h-5 text-ochre shrink-0" />
            <span className="text-xs sm:text-sm leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
