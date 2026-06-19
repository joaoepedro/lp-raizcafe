import { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { trackGenerateLead } from '../lib/analytics';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Digite um e-mail válido.');
      return;
    }
    setError('');
    trackGenerateLead('newsletter_10off', email);
    setSent(true);
  }

  return (
    <section className="bg-moss/90 py-16 sm:py-20">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <Mail className="w-8 h-8 text-ink/70 mx-auto mb-4" />
        <h2 className="font-display text-ink text-2xl sm:text-3xl mb-2">
          Ganhe 10% na primeira compra
        </h2>
        <p className="text-ink/70 text-sm sm:text-base mb-7">
          Entre para a lista e receba o cupom, além de novidades de cada nova safra.
        </p>

        {sent ? (
          <p className="inline-flex items-center gap-2 text-ink font-semibold bg-cream/80 px-5 py-3 rounded-full">
            <Check className="w-5 h-5" /> Cupom enviado para o seu e-mail!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">Seu e-mail</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-cream text-ink placeholder:text-ink/40 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-ink text-cream font-semibold hover:bg-ink/85 transition-colors whitespace-nowrap"
            >
              Quero meu cupom
            </button>
          </form>
        )}
        {error && <p className="text-ink/80 text-xs mt-3">{error}</p>}
        <p className="text-ink/50 text-xs mt-4">Sem spam. Cancele quando quiser.</p>
      </div>
    </section>
  );
}
