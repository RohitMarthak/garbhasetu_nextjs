export function IntegrativeHeroGraphic({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 540 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D98A2C" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#153C33" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#153C33" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D98A2C" />
          <stop offset="50%" stopColor="#FAF6EE" />
          <stop offset="100%" stopColor="#842938" />
        </linearGradient>
      </defs>

      {/* Atmospheric luminous glow circles */}
      <circle cx="270" cy="220" r="190" fill="url(#heroGlow)" />
      <circle cx="270" cy="220" r="160" stroke="#FAF6EE" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 6" />
      <circle cx="270" cy="220" r="120" stroke="#D98A2C" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Left side: Ayurveda & Garbhasanskar Motif (Sacred Sprout, Diya, Surya) */}
      <g>
        <circle cx="160" cy="210" r="60" fill="#153C33" fillOpacity="0.35" />
        <path
          d="M130 250C142 232 158 228 160 210C162 228 178 232 190 250C170 254 150 254 130 250Z"
          fill="#FAF6EE"
          fillOpacity="0.15"
          stroke="#D98A2C"
          strokeWidth="2"
        />
        <path
          d="M160 210C152 192 144 180 132 172C148 176 156 188 160 210Z"
          fill="#D98A2C"
          fillOpacity="0.5"
        />
        <path
          d="M160 210C168 192 176 180 188 172C172 176 164 188 160 210Z"
          fill="#D98A2C"
          fillOpacity="0.5"
        />
        <circle cx="160" cy="142" r="14" fill="#D98A2C" fillOpacity="0.85" />
        <path d="M160 120V126M160 158V164M138 142H144M176 142H182" stroke="#FAF6EE" strokeWidth="2" strokeLinecap="round" />
        <text x="160" y="282" textAnchor="middle" fill="#FAF6EE" fillOpacity="0.9" fontSize="10" fontWeight="600" letterSpacing="1.5" fontFamily="sans-serif">
          AYURVEDA & SANSKAR
        </text>
      </g>

      {/* Right side: Clinical Physiotherapy Motif (Pelvic Balance, Biomechanics, Pulse) */}
      <g>
        <circle cx="380" cy="210" r="60" fill="#153C33" fillOpacity="0.35" />
        <circle cx="380" cy="235" r="24" fill="#FAF6EE" fillOpacity="0.1" stroke="#FAF6EE" strokeWidth="2" strokeOpacity="0.6" />
        <path
          d="M365 140C385 160 375 188 395 210C382 218 374 230 382 248"
          stroke="#FAF6EE"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="365" cy="132" r="5" fill="#D98A2C" />
        <path
          d="M352 200C370 216 390 216 408 200"
          stroke="#D98A2C"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <path
          d="M340 170H358L366 156L374 184L382 166L390 170H418"
          stroke="#FAF6EE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <text x="380" y="282" textAnchor="middle" fill="#FAF6EE" fillOpacity="0.9" fontSize="10" fontWeight="600" letterSpacing="1.5" fontFamily="sans-serif">
          CLINICAL PHYSIO
        </text>
      </g>

      {/* Central Setu (Bridge) & Womb Harmony */}
      <g>
        <path
          d="M185 245C202 135 338 135 355 245"
          stroke="url(#bridgeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="270" cy="215" rx="38" ry="46" fill="#0E2923" stroke="#D98A2C" strokeWidth="2" />
        <circle cx="270" cy="198" r="9" fill="#D98A2C" />
        <path
          d="M270 207V236M262 224C267 220 273 220 278 224"
          stroke="#FAF6EE"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M150 310C210 288 330 288 390 310"
          stroke="#D98A2C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text x="270" y="348" textAnchor="middle" fill="#FAF6EE" fontSize="12" fontWeight="700" letterSpacing="2.5" fontFamily="serif">
          GARBHASETU
        </text>
        <text x="270" y="366" textAnchor="middle" fill="#D98A2C" fontSize="9" fontWeight="600" letterSpacing="1.5" fontFamily="sans-serif">
          SCIENCE MEETS SANSKAR
        </text>
      </g>
    </svg>
  );
}

export function NutritionIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="360" height="200" fill="#F4EFE4" rx="12" />
      <circle cx="180" cy="100" r="70" fill="#E9F0EC" />
      {/* Traditional Ayurvedic Katori Bowl */}
      <path d="M125 115C125 145 150 160 180 160C210 160 235 145 235 115H125Z" fill="#FFFFFF" stroke="#153C33" strokeWidth="2.25" strokeLinejoin="round" />
      <path d="M115 115H245" stroke="#153C33" strokeWidth="2.25" strokeLinecap="round" />
      {/* Warm Sattvic steam wisps */}
      <path d="M165 98C160 85 170 76 165 64" stroke="#D98A2C" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M180 94C175 80 185 72 180 58" stroke="#153C33" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M195 98C190 85 200 76 195 64" stroke="#D98A2C" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="3 3" />
      {/* Fresh Ayurvedic Herb Sprig */}
      <path d="M225 110C240 92 254 72 268 68" stroke="#153C33" strokeWidth="2" strokeLinecap="round" />
      <path d="M242 92C250 90 256 92 258 98" stroke="#153C33" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M234 102C230 95 228 86 232 80" stroke="#153C33" strokeWidth="1.5" strokeLinecap="round" />
      {/* Turmeric root seeds */}
      <circle cx="108" cy="138" r="6" fill="#D98A2C" />
      <circle cx="98" cy="148" r="4.5" fill="#842938" />
      <circle cx="255" cy="142" r="5" fill="#D98A2C" />
    </svg>
  );
}

export function MeditationIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="360" height="200" fill="#F4EFE4" rx="12" />
      {/* Meditative concentric resonance */}
      <circle cx="180" cy="100" r="75" stroke="#153C33" strokeOpacity="0.12" strokeWidth="1.25" />
      <circle cx="180" cy="100" r="55" stroke="#D98A2C" strokeOpacity="0.25" strokeWidth="1.25" strokeDasharray="3 3" />
      <circle cx="180" cy="100" r="35" fill="#E9F0EC" />
      {/* Traditional Diya Lamp */}
      <path d="M155 130C155 142 166 150 180 150C194 150 205 142 205 130H155Z" fill="#FFFFFF" stroke="#153C33" strokeWidth="2" strokeLinejoin="round" />
      <path d="M148 130H212" stroke="#153C33" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="180" cy="115" rx="8" ry="14" fill="#D98A2C" />
      <circle cx="180" cy="118" r="4" fill="#FFFFFF" />
      {/* Open Swadhyay Book Base */}
      <path d="M135 156C155 148 175 152 180 156C185 152 205 148 225 156" stroke="#842938" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MusicIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="360" height="200" fill="#F4EFE4" rx="12" />
      <circle cx="180" cy="100" r="70" stroke="#842938" strokeOpacity="0.12" strokeWidth="1.25" />
      <circle cx="180" cy="100" r="45" fill="#FAF6EE" />
      {/* Traditional Veena / Tanpura Sound Body */}
      <circle cx="165" cy="130" r="22" fill="#FFFFFF" stroke="#842938" strokeWidth="2.25" />
      <path d="M165 108V55" stroke="#842938" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M160 60H170" stroke="#D98A2C" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M160 70H170" stroke="#D98A2C" strokeWidth="2.25" strokeLinecap="round" />
      {/* Harmonic sound waves / Halarda notes */}
      <path d="M190 95C210 85 224 100 240 92" stroke="#153C33" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M200 118C220 108 232 122 250 114" stroke="#D98A2C" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="240" cy="92" r="3.5" fill="#153C33" />
      <circle cx="250" cy="114" r="3.5" fill="#D98A2C" />
    </svg>
  );
}

export function SeedSoilIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Earth & Soil Bed */}
      <path d="M40 120C100 115 260 115 320 120" stroke="#153C33" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 135C120 130 240 130 300 135" stroke="#D98A2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
      {/* The 4 Essentials (Beej, Kshetra, Ambu, Ritu) */}
      {/* 1. Beej (Seed/Sprout) */}
      <g>
        <circle cx="70" cy="115" r="7" fill="#D98A2C" />
        <path d="M70 107C70 94 78 88 82 82C80 92 76 100 70 107Z" fill="#153C33" />
        <text x="70" y="150" textAnchor="middle" fill="#153C33" fontSize="10" fontWeight="600">Beej (Seed)</text>
      </g>
      {/* 2. Kshetra (Fertile Soil) */}
      <g>
        <path d="M130 118C140 105 160 105 170 118" stroke="#842938" strokeWidth="2" strokeLinecap="round" />
        <circle cx="150" cy="110" r="3" fill="#842938" />
        <text x="150" y="150" textAnchor="middle" fill="#153C33" fontSize="10" fontWeight="600">Kshetra (Soil)</text>
      </g>
      {/* 3. Ambu (Nourishing Water) */}
      <g>
        <path d="M220 88C220 88 212 100 212 108C212 114 215 118 220 118C225 118 228 114 228 108C228 100 220 88 220 88Z" fill="#153C33" fillOpacity="0.8" />
        <text x="220" y="150" textAnchor="middle" fill="#153C33" fontSize="10" fontWeight="600">Ambu (Water)</text>
      </g>
      {/* 4. Ritu (Season & Timing) */}
      <g>
        <circle cx="290" cy="102" r="13" stroke="#D98A2C" strokeWidth="2" />
        <path d="M290 95V102L295 106" stroke="#D98A2C" strokeWidth="1.5" strokeLinecap="round" />
        <text x="290" y="150" textAnchor="middle" fill="#153C33" fontSize="10" fontWeight="600">Ritu (Season)</text>
      </g>
    </svg>
  );
}
