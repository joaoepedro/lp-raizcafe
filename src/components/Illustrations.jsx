export function CupIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label="Xícara de café fumegante">
      <defs>
        <linearGradient id="cupBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE2CC" />
          <stop offset="100%" stopColor="#D8C7A6" />
        </linearGradient>
        <linearGradient id="coffeeSurface" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3C2A1C" />
          <stop offset="100%" stopColor="#241510" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="268" rx="92" ry="14" fill="#241510" opacity="0.18" />
      <path d="M68 110 H232 L218 230 a58 58 0 0 1 -116 0 Z" fill="url(#cupBody)" />
      <ellipse cx="150" cy="110" rx="82" ry="16" fill="url(#coffeeSurface)" />
      <path d="M232 128 q46 -4 46 34 q0 42 -52 40" fill="none" stroke="#D8C7A6" strokeWidth="12" strokeLinecap="round" />
      <g stroke="#BF5B33" strokeWidth="6" strokeLinecap="round" opacity="0.55">
        <path d="M120 70 q-14 -24 0 -46" />
        <path d="M160 70 q-14 -24 0 -46" />
        <path d="M200 70 q-14 -24 0 -46" />
      </g>
    </svg>
  );
}

export function BeanIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 100 140" className={className} role="img" aria-label="Grão de café">
      <path d="M50 4C26 4 6 30 6 64s20 72 44 72 44-38 44-72S74 4 50 4Z" fill="#3C2A1C" />
      <path d="M50 14C32 26 18 46 18 70s14 44 32 56c18-12 32-32 32-56S68 26 50 14Z" fill="#4A3424" />
      <path d="M50 12c-2 30 -2 90 0 116" stroke="#241510" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function LeafIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 120 80" className={className} role="img" aria-label="Folha de cafeeiro">
      <path d="M4 76C4 36 40 4 116 4 100 44 64 76 4 76Z" fill="#6B7752" />
      <path d="M10 70C30 46 60 22 112 8" stroke="#4F5C3D" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MapPinIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 60 80" className={className} role="img" aria-label="Localização da fazenda">
      <path d="M30 2C14 2 2 14 2 30c0 22 28 48 28 48s28-26 28-48C58 14 46 2 30 2Z" fill="#BF5B33" />
      <circle cx="30" cy="30" r="11" fill="#F2E9DA" />
    </svg>
  );
}
