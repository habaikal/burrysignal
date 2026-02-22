
import React from 'react';
import { AnalysisSummary, Language, Scenario } from '../types';

interface SimulationPanelProps {
  analysis: AnalysisSummary | null;
  loading: boolean;
  lang: Language;
  onTriggerScenario: (scenario: string) => void;
}

const SCENARIOS: Scenario[] = [
  { id: 'bank', label: { en: 'Major Bank Default', ko: '초대형 은행 파산' }, prompt: 'A Top 5 global bank unexpectedly freezes all withdrawals and files for bankruptcy.' },
  { id: 'cyber', label: { en: 'Global Payment Blackout', ko: '글로벌 결제망 마비' }, prompt: 'A state-sponsored cyber attack shuts down the SWIFT network and major credit card processing for 48 hours.' },
  { id: 'oil', label: { en: 'Energy Shock ($250+)', ko: '에너지 쇼크 (유가 $250)' }, prompt: 'Major supply routes blocked; oil prices spike to $250/barrel overnight, causing instant hyper-inflation.' }
];

const SimulationPanel: React.FC<SimulationPanelProps> = ({ analysis, loading, lang, onTriggerScenario }) => {
  const t = {
    title: lang === 'ko' ? '블랙 스완 스트레스 테스트' : 'BLACK SWAN STRESS TEST',
    subtitle: lang === 'ko' ? '예측 불가능한 충격을 시뮬레이션 하십시오' : 'Simulate catastrophic unpredictable shocks',
    logTitle: lang === 'ko' ? '시뮬레이션 로그' : 'SIMULATION_LOG',
    heatmapTitle: lang === 'ko' ? '섹터별 균열 분석' : 'SECTOR_FRACTURE_ANALYSIS'
  };

  return (
    <div className="space-y-8">
      {/* Scenario Triggers */}
      <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
        <h3 className="text-xs font-mono tracking-[0.4em] text-slate-500 mb-6 uppercase flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          {t.title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => onTriggerScenario(sc.prompt)}
              disabled={loading}
              className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-slate-300 hover:bg-white/10 hover:border-indigo-500/50 transition-all text-center uppercase tracking-tighter disabled:opacity-30"
            >
              {sc.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Result Visualization: Heatmap & Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Heatmap Grid */}
        <div className="glass rounded-[2.5rem] p-8 border-white/5">
          <h4 className="text-[10px] font-mono tracking-[0.3em] text-slate-500 mb-6 uppercase font-black">{t.heatmapTitle}</h4>
          <div className="grid grid-cols-2 gap-4">
            {analysis?.fractureHeatmap?.map((item, i) => (
              <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-1000"
                  style={{ width: `${item.risk}%`, backgroundColor: item.risk > 70 ? '#ef4444' : '#f59e0b' }}
                />
                <div className="text-[10px] text-slate-500 mb-1 font-mono uppercase">{item.sector}</div>
                <div className="text-xl font-black text-white tracking-tighter">{item.risk}%</div>
                <div className="text-[9px] text-slate-400 mt-2 font-medium opacity-60 group-hover:opacity-100 transition-opacity">{item.status}</div>
              </div>
            )) || <div className="col-span-2 text-slate-700 font-mono text-xs italic py-10 text-center">Awaiting Simulation...</div>}
          </div>
        </div>

        {/* Terminal Log */}
        <div className="bg-black/80 rounded-[2.5rem] p-8 border border-white/5 font-mono text-[11px] leading-relaxed overflow-hidden flex flex-col h-[300px]">
          <h4 className="text-[10px] tracking-[0.3em] text-indigo-500 mb-4 uppercase font-black">{t.logTitle}</h4>
          <div className="space-y-2 text-slate-400 overflow-y-auto custom-scrollbar pr-2">
            {loading ? (
              <div className="animate-pulse text-indigo-400">INITIALIZING NEURAL STRESS TEST...</div>
            ) : analysis?.simulationLog?.map((log, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-indigo-600 shrink-0">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                <span className="text-slate-300">&gt;&gt; {log}</span>
              </div>
            )) || <div className="opacity-20">NO RECENT ACTIVITY DETECTED.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SimulationPanel);
