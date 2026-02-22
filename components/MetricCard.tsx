
import React from 'react';
import { RiskIndicator, Language } from '../types';

interface MetricCardProps {
  indicator: RiskIndicator;
  lang: Language;
}

const MetricCard: React.FC<MetricCardProps> = ({ indicator, lang }) => {
  const isCritical = indicator.value > 80;

  return (
    <div className={`glass-card rounded-2xl p-6 relative overflow-hidden group border-l-2 transition-all duration-500 ${isCritical ? 'border-red-500 neon-glow-red animate-pulse-slow' : 'border-transparent'}`}>
      <div
        className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 transition-all group-hover:opacity-30"
        style={{ backgroundColor: indicator.color }}
      />

      <div className="flex justify-between items-start mb-4">
        <div className="z-10">
          <span className="text-2xl mb-2 block">{indicator.icon}</span>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">{indicator.title[lang]}</h3>
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500 mb-2">{indicator.category}</p>
        </div>
        <div className="text-right z-10">
          <span className={`text-3xl font-black mono ${isCritical ? 'text-red-500' : ''}`} style={{ color: !isCritical ? indicator.color : undefined }}>
            {Math.round(indicator.value)}%
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/5 min-h-[60px] flex items-center">
        <p className="text-xs text-blue-300 font-medium leading-relaxed italic">
          " {indicator.simpleMeaning[lang]} "
        </p>
      </div>

      <div className="w-full bg-slate-800/50 rounded-full h-1.5 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${indicator.value}%`, backgroundColor: indicator.color }}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-tighter">
          {lang === 'ko' ? '기술적 세부사항:' : 'Technical Details:'}
        </div>
        <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">
          {indicator.description[lang]}
        </p>
      </div>
    </div>
  );
};

export default React.memo(MetricCard);
