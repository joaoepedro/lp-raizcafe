import { MapPin } from 'lucide-react';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5C14 9.22 14.22 9 14 9z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <p className="font-display text-parchment text-2xl mb-3">
              Raiz <span className="text-ochre">Café</span>
            </p>
            <p className="text-paper/55 text-sm leading-relaxed max-w-xs flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              Torrefação própria — Varginha, MG. CNPJ 00.000.000/0001-00.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-paper/5 text-paper/70 hover:text-ochre transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-paper/5 text-paper/70 hover:text-ochre transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <FooterCol title="Navegação" links={[
            ['Origem', '#origem'], ['Cafés', '#produtos'], ['Processo', '#processo'], ['Avaliações', '#depoimentos'],
          ]} />
          <FooterCol title="Ajuda" links={[
            ['Dúvidas frequentes', '#faq'], ['Política de troca', '#'], ['Frete e prazos', '#'], ['Fale conosco', '#'],
          ]} />
          <FooterCol title="Legal" links={[
            ['Termos de uso', '#'], ['Privacidade', '#'], ['Política de cookies', '#'],
          ]} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-paper/10">
          <p className="text-paper/40 text-xs">
            © {new Date().getFullYear()} Raiz Café. Marca e produtos fictícios — projeto de portfólio.
          </p>
          <div className="flex items-center gap-3 text-paper/50 text-xs font-mono">
            <span>Pix</span><span>·</span><span>Cartão</span><span>·</span><span>Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="text-paper/40 text-xs uppercase tracking-wide mb-4">{title}</p>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-paper/65 text-sm hover:text-ochre transition-colors">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
