import React from 'react';

export const WiproLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Multicolored concentric dots of Wipro */}
    <g transform="translate(5, 5)">
      {/* Outer rainbow ring dots */}
      <circle cx="20" cy="5" r="3.2" fill="#E2231A" />
      <circle cx="31" cy="9" r="3.2" fill="#EB6314" />
      <circle cx="35" cy="20" r="3.2" fill="#F8A000" />
      <circle cx="31" cy="31" r="3.2" fill="#B7D200" />
      <circle cx="20" cy="35" r="3.2" fill="#00A54F" />
      <circle cx="9" cy="31" r="3.2" fill="#00AEC7" />
      <circle cx="5" cy="20" r="3.2" fill="#0072CE" />
      <circle cx="9" cy="9" r="3.2" fill="#753F98" />
      {/* Inner dots */}
      <circle cx="20" cy="12" r="2.4" fill="#0072CE" />
      <circle cx="26" cy="15" r="2.4" fill="#00A54F" />
      <circle cx="26" cy="25" r="2.4" fill="#F8A000" />
      <circle cx="20" cy="28" r="2.4" fill="#E2231A" />
      <circle cx="14" cy="25" r="2.4" fill="#753F98" />
      <circle cx="14" cy="15" r="2.4" fill="#00AEC7" />
      {/* Center dot */}
      <circle cx="20" cy="20" r="2.2" fill="#004B87" />
    </g>
    {/* Text "wipro" in corporate blue */}
    <text x="50" y="32" fontFamily="Arial, Helvetica, sans-serif" fontSize="26" fontWeight="bold" fill="#004B87">
      wipro
    </text>
  </svg>
);

export const CapgeminiLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 180 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Capgemini iconic blue ace of spades emblem */}
    <g transform="translate(6, 8)">
      <path
        d="M17 2C13 2 8 8 8 13.5C8 18 11.5 21 15 21C14 24 12 26 9 27H25C22 26 20 24 19 21C22.5 21 26 18 26 13.5C26 8 21 2 17 2Z"
        fill="#0070AD"
      />
      <circle cx="17" cy="12" r="2" fill="#FFFFFF" />
    </g>
    {/* "Capgemini" typography in official royal blue */}
    <text x="40" y="32" fontFamily="'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" fontSize="24" fontWeight="600" fill="#0070AD" letterSpacing="-0.5">
      Capgemini
    </text>
  </svg>
);

export const InfosysLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 150 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Official Infosys Vibrant Blue */}
    <text x="5" y="33" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', sans-serif" fontSize="30" fontWeight="bold" fill="#007CC3" letterSpacing="-0.5">
      Infosys
    </text>
  </svg>
);

export const TelusLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 150 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* TELUS logo in authentic Brand Purple (#4B286D) and signature Green accent (#2B8000) */}
    <text x="5" y="32" fontFamily="Arial Black, Impact, sans-serif" fontSize="26" fontWeight="900" fill="#4B286D" letterSpacing="1">
      TELUS
    </text>
    {/* Green leaf / accent dot */}
    <circle cx="118" cy="18" r="4.5" fill="#2B8000" />
    <path d="M118 18C121 14 125 15 125 15C125 15 124 19 120 21C118 22 118 18 118 18Z" fill="#2B8000" />
  </svg>
);

export const DnbLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 140 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* DNB official deep Nordic teal */}
    <text x="10" y="35" fontFamily="'Arial Black', 'Helvetica Neue', sans-serif" fontSize="32" fontWeight="900" fill="#026E77" letterSpacing="0.5">
      DNB
    </text>
  </svg>
);

export const AwsLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 140 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* AWS text in dark squid navy #232F3E */}
    <text x="18" y="27" fontFamily="'Amazon Ember', 'Arial Black', sans-serif" fontSize="26" fontWeight="900" fill="#232F3E" letterSpacing="1">
      aws
    </text>
    {/* Iconic curved Amazon/AWS orange smile arrow #FF9900 */}
    <path
      d="M16 33C35 41 55 41 74 34C75.5 33.3 77.5 34.5 76.5 36C69 44 41 46 15 37C13.5 36.5 14.5 34.5 16 33Z"
      fill="#FF9900"
    />
    <path
      d="M74 33L81 35.5L75.5 40.5C75 41 74.2 40.5 74.5 39.8L76 36.8L73.5 34.5C73 34 73.4 33 74 33Z"
      fill="#FF9900"
    />
  </svg>
);

export const IrisSoftwareLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 170 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Iris emblem with layered orange and cyan petals */}
    <g transform="translate(6, 10)">
      <circle cx="15" cy="15" r="12" fill="#002D62" />
      <path d="M15 6C17 11 21 15 26 15C21 15 17 19 15 24C13 19 9 15 4 15C9 15 13 11 15 6Z" fill="#F47716" />
      <circle cx="15" cy="15" r="3.5" fill="#38BDF8" />
    </g>
    {/* "iris" typography */}
    <text x="42" y="28" fontFamily="'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" fontSize="24" fontWeight="800" fill="#002D62">
      iris
    </text>
    {/* "SOFTWARE" subtitle */}
    <text x="43" y="39" fontFamily="'Segoe UI', Roboto, sans-serif" fontSize="9" fontWeight="700" fill="#F47716" letterSpacing="3">
      SOFTWARE
    </text>
  </svg>
);

export const TcsLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(8, 12)">
      {/* Colorful TCS dynamic infinity wave */}
      <path d="M2 18C2 9 8 3 16 3C22 3 26 7 28 11C30 7 34 3 40 3C48 3 54 9 54 18C54 27 48 33 40 33C34 33 30 29 28 25C26 29 22 33 16 33C8 33 2 27 2 18Z" stroke="url(#tcsGradient)" strokeWidth="4.5" fill="none" />
      <defs>
        <linearGradient id="tcsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6007E" />
          <stop offset="50%" stopColor="#7B2CBF" />
          <stop offset="100%" stopColor="#0070BA" />
        </linearGradient>
      </defs>
    </g>
    <text x="68" y="34" fontFamily="'Arial Black', 'Helvetica Neue', sans-serif" fontSize="24" fontWeight="900" fill="#0B1E48" letterSpacing="0.5">
      tcs
    </text>
  </svg>
);

export const CognizantLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cognizant modern blue C spark */}
    <g transform="translate(6, 12)">
      <circle cx="13" cy="13" r="10" stroke="#0033A0" strokeWidth="4" fill="none" strokeDasharray="50 15" strokeLinecap="round" />
      <circle cx="19" cy="7" r="2.5" fill="#00A3E0" />
    </g>
    <text x="35" y="32" fontFamily="'Segoe UI', Roboto, sans-serif" fontSize="21" fontWeight="700" fill="#0033A0" letterSpacing="-0.3">
      Cognizant
    </text>
  </svg>
);

export const AccentureLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="34" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="26" fontWeight="700" fill="#000000" letterSpacing="-0.5">
      accenture
    </text>
    {/* Signature purple accent arrow > above the 't' */}
    <path d="M78 12L85 16L78 20" stroke="#A100FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const HclTechLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="34" fontFamily="'Arial Black', Impact, sans-serif" fontSize="26" fontWeight="900" fill="#290066" letterSpacing="-0.5">
      HCL
    </text>
    <text x="75" y="34" fontFamily="'Segoe UI', Roboto, sans-serif" fontSize="24" fontWeight="600" fill="#007CC3">
      Tech
    </text>
  </svg>
);

export const MicrosoftLogo: React.FC<{ className?: string }> = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 160 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 4 Colored Tiles of Microsoft */}
    <g transform="translate(6, 12)">
      <rect x="0" y="0" width="11" height="11" fill="#F25022" />
      <rect x="13" y="0" width="11" height="11" fill="#7FBA00" />
      <rect x="0" y="13" width="11" height="11" fill="#00A4EF" />
      <rect x="13" y="13" width="11" height="11" fill="#FFB900" />
    </g>
    <text x="36" y="32" fontFamily="'Segoe UI', 'Segoe UI Web', Roboto, sans-serif" fontSize="21" fontWeight="600" fill="#5E5E5E" letterSpacing="-0.3">
      Microsoft
    </text>
  </svg>
);

