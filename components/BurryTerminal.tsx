
import React, { useState, useEffect, useRef } from 'react';
import { AnalysisSummary, Language } from '../types';

interface BurryTerminalProps {
  analysis: AnalysisSummary | null;
  loading: boolean;
  lang: Language;
}

const BurryTerminal: React.FC<BurryTerminalProps> = ({ analysis, loading, lang }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysis?.executiveSummary) {
      setDisplayText('');
      setIndex(0);
    }
  }, [analysis]);

  useEffect(() => {
    if (analysis?.executiveSummary && index < analysis.executiveSummary.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + analysis.executiveSummary[index]);
        setIndex(prev => prev + 1);
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 5);
      return () => clearTimeout(timeout);
    }
  }, [analysis, index]);

  const t = {
    loading: lang === 'ko' ? '금융 빅데이터 분석 중...' : 'Analyzing financial big data...',
    subLoading: lang === 'ko' ? '심리적 표류 상관관계 분석...' : 'Correlating psychological drift...',
    bottomLine: lang === 'ko' ? 'BOTTOM_LINE (현재 상황 핵심 요약)' : 'BOTTOM_LINE (Key Situation Summary)',
    sysStatus: lang === 'ko' ? 'SYSTEM_STATUS' : 'SYSTEM_STATUS',
    riskScore: lang === 'ko' ? '위험 점수' : 'Risk Score',
    detailedAnalysis: lang === 'ko' ? 'DETAILED_ANALYSIS' : 'DETAILED_ANALYSIS',
    threats: lang === 'ko' ? '위협 요인' : 'Threat Factors',
    insight: lang === 'ko' ? '마이클 버리의 직관' : "Michael Burry's Intuition",
    strategies: lang === 'ko' ? '대응 전략 (전술적 행동 지침)' : 'Response Strategies (Tactical Guidelines)',
    waiting: lang === 'ko' ? '데이터 입력을 기다리는 중...' : 'Waiting for data input...'
  };

  return (
    <div className="glass rounded-2xl border-white/10 overflow-hidden flex flex-col h-[650px] shadow-2xl">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="text-[10px] font-mono opacity-50 tracking-widest uppercase">
          Burry_DeepScan_v5.0_ConsumerReady.exe
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-y-auto space-y-8 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-blue-400 animate-pulse">
            <span className="text-lg">{t.loading}</span>
            <span className="text-xs mt-2 uppercase">{t.subLoading}</span>
          </div>
        ) : analysis ? (
          <>
            <div className="bg-gradient-to-r from-red-500/20 to-transparent p-4 rounded-r-lg border-l-4 border-red-500">
              <span className="text-red-500 block text-[10px] mb-1 font-bold uppercase tracking-widest"># {t.bottomLine}</span>
              <div className="text-lg font-bold text-white leading-tight">
                "{analysis.simpleStatus}"
              </div>
            </div>

            <div className="border-l-2 border-blue-500/30 pl-4">
              <span className="text-blue-400 block text-xs mb-1 uppercase tracking-tighter"># {t.sysStatus}</span>
              <div className={`text-2xl font-bold ${
                analysis.overallRisk === 'CATASTROPHIC' || analysis.overallRisk === 'CRISIS' 
                ? 'text-red-500' : 'text-amber-500'
              }`}>
                {analysis.overallRisk} // {t.riskScore}: {analysis.score}/100
              </div>
            </div>

            <div>
              <span className="text-blue-400 block text-xs mb-1 uppercase tracking-tighter"># {t.detailedAnalysis}</span>
              <p className="text-slate-300 whitespace-pre-wrap">{displayText}<span className="animate-pulse">_</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <span className="text-blue-400 block text-xs mb-2 uppercase tracking-tighter"># {t.threats}</span>
                <ul className="space-y-1">
                  {analysis.topThreats.map((threat, i) => (
                    <li key={i} className="text-red-400/80 flex gap-2 text-xs">
                      <span className="opacity-40">[{i+1}]</span> {threat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                <span className="text-amber-400 block text-xs mb-2 uppercase tracking-tighter"># {t.insight}</span>
                <p className="text-amber-200/90 italic text-xs leading-relaxed">
                  "{analysis.contrarianInsight}"
                </p>
              </div>
            </div>

            <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
              <span className="text-red-500 block text-xs mb-4 font-bold uppercase tracking-[0.2em]"># {t.strategies}</span>
              <div className="grid grid-cols-1 gap-4">
                {analysis.strategies.map((strategy, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-500 font-bold shrink-0 text-xs">
                      {i + 1}
                    </div>
                    <p className="text-slate-200 text-sm leading-snug group-hover:text-white transition-colors">
                      {strategy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-slate-600 italic">{t.waiting}</div>
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default BurryTerminal;
