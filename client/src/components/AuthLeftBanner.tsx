import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  Globe,
  Briefcase,
  ShieldCheck,
  Code,
  Cloud,
  Lock,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface DomainItem {
  id: string;
  name: string;
  line1: string;
  line2: string;
  title: string;
  icon: 'code' | 'playwright' | 'dev' | 'cloud' | 'cyber';
  bgGradient: string;
  borderColor: string;
  glowColor: string;
}

const DOMAINS: DomainItem[] = [
  {
    id: 'testing',
    name: 'Software Testing',
    line1: 'Software',
    line2: 'Testing',
    title: 'Software Testing & QA',
    icon: 'code',
    bgGradient: 'from-[#7C3AED] via-[#6D28D9] to-[#4C1D95]',
    borderColor: 'border-purple-300',
    glowColor: 'rgba(167,139,250,0.6)',
  },
  {
    id: 'playwright',
    name: 'Playwright AI Testing',
    line1: 'Playwright',
    line2: 'AI Testing',
    title: 'Playwright AI Testing',
    icon: 'playwright',
    bgGradient: 'from-[#059669] via-[#047857] to-[#064E3B]',
    borderColor: 'border-[#4ADE80]',
    glowColor: 'rgba(74,222,128,0.6)',
  },
  {
    id: 'dev',
    name: 'Software Development',
    line1: 'Software',
    line2: 'Development',
    title: 'Software Development',
    icon: 'dev',
    bgGradient: 'from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A]',
    borderColor: 'border-blue-300',
    glowColor: 'rgba(96,165,250,0.6)',
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    line1: 'Cloud &',
    line2: 'DevOps',
    title: 'Cloud & DevOps Engineering',
    icon: 'cloud',
    bgGradient: 'from-[#F97316] via-[#EA580C] to-[#9A3412]',
    borderColor: 'border-orange-300',
    glowColor: 'rgba(251,146,60,0.6)',
  },
  {
    id: 'cyber',
    name: 'Cyber Security',
    line1: 'Cyber',
    line2: 'Security',
    title: 'Cyber Security & Defense',
    icon: 'cyber',
    bgGradient: 'from-[#E11D48] via-[#BE123C] to-[#881337]',
    borderColor: 'border-pink-300',
    glowColor: 'rgba(244,63,94,0.6)',
  },
];

export const AuthLeftBanner: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('playwright');
  const [selectedCountry, setSelectedCountry] = useState<string>('India');

  const currentDomain = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[1];

  return (
    <div className="relative w-full lg:w-[54%] xl:w-[55%] min-h-[620px] lg:min-h-screen flex flex-col justify-between p-5 sm:p-8 lg:p-10 select-none text-white z-10">
      {/* TOP: Official AIICQB Full White Logo (Optimized for Dark Background) above Global Professional Certification */}
      <div className="flex flex-col items-center text-center pt-2">
        <Link to="/" className="group inline-flex flex-col items-center cursor-pointer">
          <img
            src="/aiicqb-logo-white.png"
            alt="AIICQB - AI International Certification & Qualification Board"
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105 duration-300"
          />
        </Link>
      </div>

      {/* MIDDLE: Golden Laurel Branches (Authentic High-Res PNGs) + Selected Domain Title */}
      <div className="my-auto py-3 sm:py-5 flex flex-col items-center">
        {/* Laurel Wreath with Uploaded High-Res Golden Branches */}
        <div className="relative flex items-center justify-center max-w-2xl mx-auto px-2">
          {/* Left Laurel Branch PNG */}
          <img
            src="/laurel-branch-left.png"
            alt="Golden Laurel Branch Left"
            className="w-12 sm:w-16 md:w-20 lg:w-22 h-auto max-h-28 sm:max-h-36 object-contain filter drop-shadow-[0_3px_12px_rgba(255,215,0,0.5)] pointer-events-none flex-shrink-0"
          />

          {/* Central Title (Dynamically reflects selected domain) */}
          <div className="text-center px-2 sm:px-5">
            <h3 className="text-white text-base sm:text-xl lg:text-2xl font-bold tracking-wide leading-tight drop-shadow-md">
              Global Professional Certification for
            </h3>
            <h2 className="text-[#FFB800] text-lg sm:text-2xl lg:text-3xl font-black tracking-wider uppercase mt-1 drop-shadow-[0_2px_12px_rgba(255,184,0,0.6)] transition-all duration-300">
              {currentDomain.title}
            </h2>
          </div>

          {/* Right Laurel Branch PNG */}
          <img
            src="/laurel-branch-right.png"
            alt="Golden Laurel Branch Right"
            className="w-12 sm:w-16 md:w-20 lg:w-22 h-auto max-h-28 sm:max-h-36 object-contain filter drop-shadow-[0_3px_12px_rgba(255,215,0,0.5)] pointer-events-none flex-shrink-0"
          />
        </div>

        {/* 5 Feature Pillars - Open, Modern, Floating Design (No Side Bar / No Enclosing Capsule / No Scrollbar) */}
        <div className="w-full max-w-2xl my-3 sm:my-4 px-1 select-none">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
            {/* Feature 1: International Certification */}
            <div className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:border-amber-400/80 group-hover:bg-amber-400/10 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-100 group-hover:text-amber-200 transition-colors leading-tight drop-shadow">
                International
                <br />
                Certification
              </span>
            </div>

            {/* Feature 2: Career Growth */}
            <div className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:border-cyan-400/80 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300 group-hover:text-cyan-200 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors leading-tight drop-shadow">
                Career
                <br />
                Growth
              </span>
            </div>

            {/* Feature 3: Global Recognition */}
            <div className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:border-yellow-400/80 group-hover:bg-yellow-400/10 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all duration-300">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 group-hover:text-yellow-200 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-100 group-hover:text-yellow-200 transition-colors leading-tight drop-shadow">
                Global
                <br />
                Recognition
              </span>
            </div>

            {/* Feature 4: Industry Aligned */}
            <div className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:border-blue-400/80 group-hover:bg-blue-400/10 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all duration-300">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 group-hover:text-blue-200 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-100 group-hover:text-blue-200 transition-colors leading-tight drop-shadow">
                Industry
                <br />
                Aligned
              </span>
            </div>

            {/* Feature 5: Verified & Credible */}
            <div className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:border-emerald-400/80 group-hover:bg-emerald-400/10 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all duration-300">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 group-hover:text-emerald-200 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-slate-100 group-hover:text-emerald-200 transition-colors leading-tight drop-shadow">
                Verified
                <br />
                &amp; Credible
              </span>
            </div>
          </div>
        </div>

        {/* "Certification Domains" Yellow Badge with Divider Lines - Compact Sizing */}
        <div className="flex items-center justify-center space-x-2.5 w-full max-w-md my-1.5">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F59E0B]/80"></span>
          <span className="px-3.5 py-0.5 bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#F59E0B] text-[#0A1D37] font-extrabold text-[10px] sm:text-xs rounded-full shadow-sm uppercase tracking-wider">
            Certification Domains
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F59E0B]/80"></span>
        </div>

        {/* 5 COLORFUL DOMAIN CARDS - SELECTABLE THROUGH MOUSE CLICK - REFINED COMPACT SIZE */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full max-w-lg mt-1 px-1">
          {DOMAINS.map((domain) => {
            const isSelected = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedDomain(domain.id)}
                className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-gradient-to-b ${domain.bgGradient} transition-all duration-300 cursor-pointer focus:outline-none select-none text-center aspect-[1/1] sm:aspect-[1.05/1] ${
                  isSelected
                    ? `border-2 ${domain.borderColor} scale-105 z-20 shadow-xl`
                    : 'border border-white/20 opacity-85 hover:opacity-100 hover:scale-105 z-10'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 18px ${domain.glowColor}` : undefined,
                }}
                title={`Click to select ${domain.name}`}
              >
                {/* Active Selection Indicator Checkmark Badge */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white text-[#0A1D37] flex items-center justify-center shadow-md animate-scaleUp">
                    <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3]" />
                  </div>
                )}

                {/* Card Icon */}
                {domain.icon === 'playwright' ? (
                  <div className="flex items-center space-x-0.5 mb-1">
                    <span className="text-sm leading-none">🎭</span>
                    <span className="px-1 py-0.5 bg-[#4ADE80] text-[#064E3B] font-black text-[8px] rounded-full">
                      AI
                    </span>
                  </div>
                ) : domain.icon === 'cloud' ? (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                    <Cloud className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : domain.icon === 'cyber' ? (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                    <Lock className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/15 flex items-center justify-center mb-1">
                    <Code className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                {/* Card Title */}
                <span className="text-[9px] sm:text-[10px] font-bold text-white leading-tight drop-shadow-sm pointer-events-none">
                  {domain.line1}
                  <br />
                  {domain.line2}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM: 8 Country Flags Glass Pill - STATIC ROW (NO SLIDE) WITH SQUARE FLAGS */}
      <div className="flex flex-col items-center pt-2">
        <div className="w-full max-w-xl bg-blue-950/70 backdrop-blur-md border border-cyan-500/40 rounded-2xl py-2.5 px-2 sm:px-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between">
          {[
            { id: 'India', label: 'India' },
            { id: 'USA', label: 'USA' },
            { id: 'UK', label: 'UK' },
            { id: 'Canada', label: 'Canada' },
            { id: 'UAE', label: 'UAE' },
            { id: 'Australia', label: 'Australia' },
            { id: 'Germany', label: 'Germany' },
            { id: 'Singapore', label: 'Singapore' },
          ].map((country) => {
            const isCountrySelected = selectedCountry === country.id;
            return (
              <button
                key={country.id}
                type="button"
                onClick={() => setSelectedCountry(country.id)}
                className={`flex flex-col items-center space-y-1 cursor-pointer transition-transform focus:outline-none ${
                  isCountrySelected ? 'scale-110' : 'hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                title={`Select ${country.label}`}
              >
                {/* Square Flag Container */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md overflow-hidden shadow-md flex items-center justify-center transition-all aspect-square ${
                    isCountrySelected
                      ? 'ring-2 ring-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.6)]'
                      : 'border border-white/50'
                  }`}
                >
                  {country.id === 'India' && (
                    <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
                      <rect width="600" height="133.3" fill="#FF9933" />
                      <rect y="133.3" width="600" height="133.3" fill="#FFFFFF" />
                      <rect y="266.6" width="600" height="133.4" fill="#138808" />
                      <circle cx="300" cy="200" r="42" fill="none" stroke="#000080" strokeWidth="4.5" />
                      <circle cx="300" cy="200" r="9" fill="#000080" />
                      {Array.from({ length: 24 }).map((_, i) => (
                        <line
                          key={i}
                          x1="300"
                          y1="200"
                          x2={300 + 42 * Math.cos((i * 15 * Math.PI) / 180)}
                          y2={200 + 42 * Math.sin((i * 15 * Math.PI) / 180)}
                          stroke="#000080"
                          strokeWidth="2.8"
                        />
                      ))}
                    </svg>
                  )}
                  {country.id === 'USA' && (
                    <svg viewBox="0 0 640 480" className="w-full h-full object-cover">
                      <g fill="#b22234">
                        <path d="M0 0h640v480H0z"/>
                        <path stroke="#fff" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                        <path fill="#3c3b6e" d="M0 0h260v258H0z"/>
                      </g>
                      <circle cx="130" cy="129" r="60" fill="#ffffff" opacity="0.3" />
                      <text x="130" y="145" fontSize="65" textAnchor="middle" fill="#fff" fontWeight="bold">★</text>
                    </svg>
                  )}
                  {country.id === 'UK' && (
                    <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                      <path d="M0 0v30h60V0z" fill="#012169"/>
                      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                      <path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4"/>
                      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                    </svg>
                  )}
                  {country.id === 'Canada' && (
                    <svg viewBox="0 0 600 300" className="w-full h-full object-cover">
                      <path fill="#FF0000" d="M0 0h600v300H0z"/>
                      <path fill="#FFFFFF" d="M150 0h300v300H150z"/>
                      <path fill="#FF0000" d="M300 70 L310 115 L350 110 L330 140 L360 160 L320 180 L325 210 L300 195 L275 210 L280 180 L240 160 L270 140 L250 110 L290 115 Z"/>
                    </svg>
                  )}
                  {country.id === 'UAE' && (
                    <svg viewBox="0 0 600 300" className="w-full h-full object-cover">
                      <path fill="#00732f" d="M0 0h600v100H0z"/>
                      <path fill="#ffffff" d="M0 100h600v100H0z"/>
                      <path fill="#000000" d="M0 200h600v100H0z"/>
                      <path fill="#ff0000" d="M0 0h150v300H0z"/>
                    </svg>
                  )}
                  {country.id === 'Australia' && (
                    <svg viewBox="0 0 600 300" className="w-full h-full object-cover">
                      <path fill="#00008b" d="M0 0h600v300H0z"/>
                      <path d="M0 0h250v150H0z" fill="#012169"/>
                      <path d="M0 0l250 150m0-150L0 150" stroke="#fff" strokeWidth="20"/>
                      <path d="M0 0l250 150m0-150L0 150" stroke="#C8102E" strokeWidth="12"/>
                      <path d="M125 0v150M0 75h250" stroke="#fff" strokeWidth="30"/>
                      <path d="M125 0v150M0 75h250" stroke="#C8102E" strokeWidth="18"/>
                      <circle cx="125" cy="225" r="30" fill="#ffffff" />
                      <circle cx="450" cy="80" r="10" fill="#ffffff" />
                      <circle cx="500" cy="130" r="10" fill="#ffffff" />
                      <circle cx="420" cy="180" r="10" fill="#ffffff" />
                      <circle cx="470" cy="240" r="10" fill="#ffffff" />
                    </svg>
                  )}
                  {country.id === 'Germany' && (
                    <svg viewBox="0 0 5 3" className="w-full h-full object-cover">
                      <rect width="5" height="1" y="0" fill="#000" />
                      <rect width="5" height="1" y="1" fill="#D00" />
                      <rect width="5" height="1" y="2" fill="#FFCE00" />
                    </svg>
                  )}
                  {country.id === 'Singapore' && (
                    <svg viewBox="0 0 600 400" className="w-full h-full object-cover">
                      <rect width="600" height="200" fill="#ED2939" />
                      <rect y="200" width="600" height="200" fill="#FFFFFF" />
                      <circle cx="100" cy="100" r="55" fill="#FFFFFF" />
                      <circle cx="120" cy="100" r="50" fill="#ED2939" />
                      <circle cx="130" cy="70" r="8" fill="#FFFFFF" />
                      <circle cx="150" cy="90" r="8" fill="#FFFFFF" />
                      <circle cx="145" cy="120" r="8" fill="#FFFFFF" />
                      <circle cx="115" cy="120" r="8" fill="#FFFFFF" />
                      <circle cx="110" cy="90" r="8" fill="#FFFFFF" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-semibold transition-colors ${
                    isCountrySelected ? 'text-[#FFD700] font-bold' : 'text-slate-200'
                  }`}
                >
                  {country.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Back to Home Link */}
        <div className="mt-3 flex items-center justify-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to AICQB Main Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
