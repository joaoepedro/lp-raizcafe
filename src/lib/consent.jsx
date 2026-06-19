import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { setAnalyticsConsent } from './analytics';

const ConsentContext = createContext(null);

function readInitialConsent() {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem('raiz_consent');
  if (saved === 'accepted' || saved === 'rejected') {
    setAnalyticsConsent(saved === 'accepted');
    return saved;
  }
  return null;
}

export function ConsentProvider({ children }) {
  const [status, setStatus] = useState(readInitialConsent); // null = ainda não decidiu

  function decide(value) {
    localStorage.setItem('raiz_consent', value);
    setStatus(value);
    setAnalyticsConsent(value === 'accepted');
  }

  return (
    <ConsentContext.Provider value={{ status, decide }}>
      {children}
      <CookieBanner status={status} decide={decide} />
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}

function CookieBanner({ status, decide }) {
  return (
    <AnimatePresence>
      {status === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-ink/97 backdrop-blur border-t border-clay/30 px-4 py-4 sm:py-3"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <Cookie className="hidden sm:block w-6 h-6 text-ochre shrink-0" aria-hidden="true" />
            <p className="text-paper/90 text-sm leading-relaxed flex-1">
              Usamos cookies para melhorar sua experiência e medir o desempenho das nossas campanhas
              (Google Ads, Meta Ads). Você pode aceitar ou recusar o uso de cookies de análise e publicidade.
            </p>
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => decide('rejected')}
                className="flex-1 sm:flex-none px-4 py-2 text-sm rounded-full border border-paper/30 text-paper/80 hover:bg-paper/10 transition-colors"
              >
                Recusar
              </button>
              <button
                onClick={() => decide('accepted')}
                className="flex-1 sm:flex-none px-5 py-2 text-sm rounded-full bg-ochre text-ink font-semibold hover:bg-ochre/90 transition-colors"
              >
                Aceitar cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
