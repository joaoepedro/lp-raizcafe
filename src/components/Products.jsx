import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function Products() {
  return (
    <section id="produtos" className="bg-paper py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-xl mb-12">
          <span className="text-clay font-mono text-xs tracking-[0.2em] uppercase">Cafés desta semana</span>
          <h2 className="font-display text-ink text-3xl sm:text-[2.6rem] leading-tight mt-3">
            Escolha seu lote. Torramos sob encomenda.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
