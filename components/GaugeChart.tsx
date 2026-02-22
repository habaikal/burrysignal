
import React from 'react';

interface GaugeChartProps {
  score: number;
  label: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ score, label }) => {
  const strokeWidth = 18;
  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const needleRotation = (normalizedScore / 100) * 180;

  return (
    <div className="flex flex-col items-center justify-between p-8 md:p-12 bg-[#0f172a]/95 backdrop-blur-2xl rounded-[3rem] border border-white/10 relative overflow-hidden h-full w-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 opacity-40"></div>

      <div className="relative w-full max-w-[520px] flex flex-col items-center pt-8">
        <svg viewBox="0 0 200 130" className="w-full h-auto">
          <defs>
            <linearGradient id="gaugeGradientImg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="30%" stopColor="#f59e0b" />
              <stop offset="65%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="needleGlowStrong">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradientImg)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="251.32"
            strokeDashoffset={251.32 - (normalizedScore / 100) * 251.32}
            className="transition-all duration-1000 ease-out"
          />

          <text x="20" y="122" fontSize="6" fill="#475569" textAnchor="middle" className="font-mono font-black tracking-widest opacity-60 uppercase">SAFE</text>
          <text x="100" y="28" fontSize="6" fill="#475569" textAnchor="middle" className="font-mono font-black opacity-60">50</text>
          <text x="180" y="122" fontSize="6" fill="#475569" textAnchor="middle" className="font-mono font-black tracking-widest opacity-60 uppercase">CRISIS</text>

          <g transform={`rotate(${needleRotation}, 100, 100)`} className="transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)">
            <line
              x1="25" y1="100" x2="100" y2="100"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#needleGlowStrong)"
            />
            <circle cx="100" cy="100" r="7" fill="#ffffff" />
            <circle cx="100" cy="100" r="3" fill="#0f172a" />
          </g>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none pt-2 sm:pt-6">
          <div className="text-[100px] sm:text-[140px] font-black leading-none text-white tracking-tighter drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
            {Math.round(score)}
          </div>

          <div className="mt-[-10px] sm:mt-[-20px] px-8 py-4 w-full flex flex-col items-center">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-2xl max-w-[90%] min-h-[60px] flex items-center justify-center">
              <p className="text-[#ff4d4d] font-black text-center text-xs sm:text-sm md:text-base leading-relaxed tracking-tight break-keep">
                {label}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
        <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors hover:bg-[#1e293b]/60">
          <div className="text-[10px] text-slate-500 uppercase font-mono tracking-[0.2em] mb-2 font-bold opacity-60">PREVIOUS CLOSE</div>
          <div className="text-lg sm:text-xl font-black text-slate-200 mono tracking-tighter">12 (STABLE)</div>
        </div>
        <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors hover:bg-[#1e293b]/60">
          <div className="text-[10px] text-slate-500 uppercase font-mono tracking-[0.2em] mb-2 font-bold opacity-60">1 WEEK AGO</div>
          <div className="text-lg sm:text-xl font-black text-slate-200 mono tracking-tighter">45 (WARNING)</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GaugeChart);
