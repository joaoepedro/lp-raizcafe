import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../lib/analytics';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5535999999999?text=Oi!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20caf%C3%A9%20Raiz."
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating_button')}
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-moss flex items-center justify-center shadow-xl shadow-ink/30 hover:scale-105 transition-transform"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-cream" />
    </a>
  );
}
