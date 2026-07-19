export function EmptyBox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="20" y="40" width="80" height="60" rx="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M20 48L60 68L100 48" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M60 68V90" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <circle cx="60" cy="30" r="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
      <path d="M56 30H64M60 26V34" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round" />
      <path d="M90 55L95 50M95 55L90 50" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
      <path d="M30 55L25 50M25 55L30 50" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
    </svg>
  )
}

export function SearchSky({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="55" cy="50" r="22" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
      <path d="M71 67L85 81" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" strokeLinecap="round" />
      <path d="M28 82C32 78 38 76 44 78C50 80 54 76 58 72" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
      <path d="M82 82C86 78 92 76 98 78" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
      <circle cx="48" cy="44" r="3" fill="currentColor" fillOpacity="0.15" />
      <circle cx="62" cy="52" r="2" fill="currentColor" fillOpacity="0.1" />
      <circle cx="52" cy="58" r="1.5" fill="currentColor" fillOpacity="0.08" />
      <path d="M90 30L92 24M92 30L90 24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" />
      <path d="M16 24L18 18M18 24L16 18" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" strokeLinecap="round" />
    </svg>
  )
}

export function EmptyShelf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="15" y="30" width="90" height="6" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="15" y="70" width="90" height="6" rx="3" fill="currentColor" fillOpacity="0.08" />
      <rect x="25" y="36" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
      <rect x="50" y="36" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
      <rect x="75" y="36" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
      <rect x="35" y="76" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
      <rect x="65" y="76" width="20" height="28" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.12" />
      <path d="M45 44V52" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
      <path d="M85 80V88" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
    </svg>
  )
}