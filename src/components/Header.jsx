import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../lib/cart';
import { trackCtaClick } from '../lib/analytics';

const LINKS = [
  { href: '#origem', label: 'Origem' },
  { href: '#produtos', label: 'Cafés' },
  { href: '#processo', label: 'Como preparamos' },
  { href: '#depoimentos', label: 'Avaliações' },
  { href: '#faq', label: 'Dúvidas' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, setIsOpen } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-roast/95 backdrop-blur shadow-lg shadow-ink/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#topo" className="font-display text-2xl text-parchment tracking-tight">
          Raiz <span className="text-ochre">Café</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-paper/80 hover:text-ochre transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              setIsOpen(true);
              trackCtaClick('Abrir carrinho', 'header');
            }}
            className="relative p-2 text-paper hover:text-ochre transition-colors"
            aria-label={`Abrir carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-ochre text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <a
            href="#produtos"
            onClick={() => trackCtaClick('Comprar agora', 'header')}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-clay text-parchment text-sm font-semibold hover:bg-clayDark transition-colors"
          >
            Comprar agora
          </a>
          <button
            className="md:hidden p-2 text-paper"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-roast border-t border-paper/10 px-5 py-4 flex flex-col gap-4" aria-label="Navegação móvel">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-paper/90 text-base"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#produtos"
            onClick={() => { setMobileOpen(false); trackCtaClick('Comprar agora', 'header_mobile'); }}
            className="mt-2 text-center px-5 py-3 rounded-full bg-clay text-parchment font-semibold"
          >
            Comprar agora
          </a>
        </nav>
      )}
    </header>
  );
}
