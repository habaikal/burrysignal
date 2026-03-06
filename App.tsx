
import React, { useState, useEffect, useCallback } from 'react';
import { INDICATORS } from './constants';
import { RiskIndicator, AnalysisSummary, Language } from './types';
import { GeminiService } from './services/geminiService';
import MetricCard from './components/MetricCard';
import BurryTerminal from './components/BurryTerminal';
import GaugeChart from './components/GaugeChart';
import SimulationPanel from './components/SimulationPanel';
import ProfitGuideModal from './components/ProfitGuideModal';
import AutoExecutionLog from './components/AutoExecutionLog';
import ApiKeyModal from './components/ApiKeyModal';
import { Bot } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [indicators, setIndicators] = useState<RiskIndicator[]>(INDICATORS);
  const [analysis, setAnalysis] = useState<AnalysisSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [currentScenario, setCurrentScenario] = useState<string | undefined>(undefined);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isAutoExecution, setIsAutoExecution] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const runAnalysis = useCallback(async (scenario?: string) => {
    setLoading(true);
    setCurrentScenario(scenario);
    try {
      const service = new GeminiService();
      const result = await service.analyzeRisk(indicators, lang, scenario);
      if (result) {
        setAnalysis(result);
      } else {
        alert(lang === 'ko' ? "분석 중 오류가 발생했습니다." : "Analysis error.");
      }
    } catch (error: any) {
      console.error(error);
      const isMissingKey = error.message?.includes('API_KEY') || error.status === 401 || error.status === 403;
      if (isMissingKey) {
        setShowApiKeyModal(true);
      } else {
        alert(lang === 'ko' ? "치명적 오류: 알 수 없는 이유로 분석에 실패했습니다." : "Critical Error: Failed to analyze.");
      }
    } finally {
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString());
    }
  }, [indicators, lang]);

  useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const randomizeData = () => {
    setIndicators(prev => prev.map(ind => ({
      ...ind,
      value: Math.min(100, Math.max(0, ind.value + (Math.random() * 20 - 10)))
    })));
    setCurrentScenario(undefined);
  };

  const t = {
    scanner: lang === 'ko' ? '실시간 위기 스캐너' : 'LIVE CRISIS SCANNER',
    title: lang === 'ko' ? '버리시그널' : 'BURRYSIGNAL',
    desc: lang === 'ko'
      ? '마이클 버리의 직관을 알고리즘화했습니다. 일반적인 지표가 아닌, 부자들의 행동 변화와 언어적 패턴을 통해 다음 붕괴를 예측합니다.'
      : 'Algorithmic pessimism. Detecting elite behavioral patterns and systemic fractures to predict the next market collapse.',
    sync: lang === 'ko' ? '시스템 동기화 시간' : 'SYSTEM_CORE_UPTIME',
    runBtn: lang === 'ko' ? '딥 스캔 시작' : 'DEEP SCAN START',
    runningBtn: lang === 'ko' ? '계산 중...' : 'CALCULATING...',
    stable: { level: 'STABLE', range: '0-30%', desc: lang === 'ko' ? '경제의 평온한 상태. 비정상적 징후 없음.' : 'State of economic calm. No abnormal signs detected.' },
    warning: { level: 'WARNING', range: '31-60%', desc: lang === 'ko' ? '균열 발생. 엘리트 계층의 자산 이동 시작.' : 'Fractures appearing. Elite asset migration detected.' },
    crisis: { level: 'CRISIS', range: '61-80%', desc: lang === 'ko' ? '시스템 붕괴 직전. 시장 전반의 공포 확산.' : 'Pre-collapse state. Widespread market panic spreading.' },
    catastrophic: { level: 'CATASTROPHIC', range: '81-100%', desc: lang === 'ko' ? '총체적 붕괴. 즉각적인 포트폴리오 헤징 권장.' : 'Systemic collapse. Immediate portfolio hedging advised.' },
    metrics: lang === 'ko' ? '비정형 위험 지표' : 'UNCONVENTIONAL_METRIC_FEED',
    alertLog: lang === 'ko' ? '위험 구역 로그' : 'DANGER_ZONE_LOG',
    velocity: lang === 'ko' ? '부실 전파 속도' : 'Velocity of Failure',
    debtFlow: lang === 'ko' ? '불투명 채무 흐름' : 'Opaque Debt Flow',
    footerNotice: lang === 'ko' ? '비금융적 조언' : 'PROPRIETARY ALGORITHM',
    encrypted: lang === 'ko' ? '암호화 채널' : 'ENCRYPTED_TUNNEL',
    scenarioActive: lang === 'ko' ? '시뮬레이션 활성화 중' : 'SIMULATION ACTIVE'
  };

  return (
    <div className="max-w-[1500px] mx-auto px-6 sm:px-10 py-12 min-h-screen">
      {/* Header */}
      <header className="mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border transition-all tracking-[0.2em] uppercase ${currentScenario ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}`}>
                {currentScenario ? t.scenarioActive : t.scanner}
              </span>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${lang === 'en' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ko')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${lang === 'ko' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  KO
                </button>
              </div>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="px-4 py-2 border border-slate-600 rounded-lg text-xs font-black text-slate-300 hover:text-white hover:bg-slate-800 transition-colors uppercase"
              >
                {lang === 'ko' ? '수익 실현 가이드 / PROFIT GUIDE' : 'PROFIT GUIDE'}
              </button>
              <button
                onClick={() => setIsAutoExecution(!isAutoExecution)}
                className={`px-4 py-2 border rounded-lg text-xs font-black transition-colors uppercase flex items-center gap-2 ${isAutoExecution ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                <Bot className={`w-4 h-4 ${isAutoExecution ? 'animate-pulse' : ''}`} />
                {lang === 'ko' ? '자동 진입 모드 (BOT)' : 'AUTO-ENTRY BOT'}
              </button>
            </div>
            <h1 className="text-[43px] sm:text-[57px] md:text-[76px] font-black tracking-tighter text-white leading-[0.85] uppercase">
              {lang === 'ko' ? <>버리<span className="text-red-600">시그널</span></> : <>BURRY<span className="text-red-600">SIGNAL</span></>}
            </h1>
            <p className="text-slate-400 mt-8 max-w-2xl text-lg sm:text-xl font-light leading-relaxed">
              {t.desc}
            </p>
          </div>

          <div className="flex flex-col items-end gap-5">
            <div className="text-right">
              <div className="text-slate-600 text-[10px] uppercase font-mono tracking-[0.4em] mb-2 font-bold">{t.sync}</div>
              <div className="text-4xl font-black mono text-slate-100 tracking-tighter shadow-sm">{lastUpdate}</div>
            </div>
            <button
              onClick={() => { randomizeData(); runAnalysis(); }}
              disabled={loading}
              className={`px-12 py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-95 ${loading
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white hover:-translate-y-1'
                }`}
            >
              {loading ? t.runningBtn : t.runBtn}
            </button>
          </div>
        </div>
      </header>

      {/* Main Status Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch relative">
        {currentScenario && (
          <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none rounded-[3rem] ring-2 ring-indigo-500/20 animate-pulse"></div>
        )}
        <div className="lg:col-span-7 flex flex-col">
          <GaugeChart
            score={analysis?.score || 0}
            label={analysis?.simpleStatus || (lang === 'ko' ? '시장 데이터를 정밀 분석 중입니다...' : 'Analyzing market data precision...')}
          />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          {[t.stable, t.warning, t.crisis, t.catastrophic].map((item) => (
            <div
              key={item.level}
              className={`p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-center transition-all duration-300 flex-1 relative bg-[#1e293b]/30 hover:border-white/20 group cursor-default`}
            >
              <div className={`text-2xl font-black mb-1 flex items-center justify-between ${item.level === 'STABLE' ? 'text-green-500' :
                item.level === 'WARNING' ? 'text-amber-500' :
                  item.level === 'CRISIS' ? 'text-orange-600' : 'text-red-600'
                } tracking-tight`}>
                <span>{item.level}</span>
                <span className="text-xs opacity-50 font-mono tracking-widest font-bold">{item.range}</span>
              </div>
              <div className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</div>

              {analysis?.overallRisk === item.level && (
                <div className="absolute left-0 top-0 w-1.5 h-full bg-current rounded-l-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Simulation Panel - New Section */}
      <section className="mb-24">
        <SimulationPanel
          analysis={analysis}
          loading={loading}
          lang={lang}
          onTriggerScenario={(prompt) => runAnalysis(prompt)}
        />
      </section>

      <main className="space-y-24">
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-[10px] font-mono tracking-[0.6em] uppercase text-slate-600 font-black">{t.metrics}</h2>
            <div className="h-px flex-1 bg-white/5 mx-10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {indicators.map((indicator) => (
              <MetricCard key={indicator.id} indicator={indicator} lang={lang} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <BurryTerminal analysis={analysis} loading={loading} lang={lang} />
          </div>
          <div className="space-y-10">
            <div className="glass rounded-[2.5rem] p-10 border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="text-9xl font-black text-red-500">!</span>
              </div>
              <h3 className="text-red-600 font-black mb-10 flex items-center gap-4 uppercase tracking-[0.2em] text-xs">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
                {t.alertLog}
              </h3>
              <div className="space-y-8 relative z-10">
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5 shadow-inner">
                  <div className="text-[9px] text-slate-500 mb-3 font-mono uppercase tracking-[0.3em] font-black">{t.velocity}</div>
                  <div className="text-5xl font-black mono text-amber-500 tracking-tighter">1.84</div>
                </div>
                <div className="p-8 bg-black/40 rounded-3xl border border-white/5 shadow-inner">
                  <div className="text-[9px] text-slate-500 mb-3 font-mono uppercase tracking-[0.3em] font-black">{t.debtFlow}</div>
                  <div className="text-5xl font-black mono text-red-600 tracking-tighter">92%</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-40 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-slate-600 text-[10px] tracking-[0.5em] uppercase font-mono font-bold">
        <div className="text-center md:text-left">SCION_SIGNAL_INTEL // {t.footerNotice}</div>
        <div className="flex gap-12">
          <span>LATENCY: 12ms</span>
          <span>UPTIME: 99.9%</span>
          <span className="text-blue-500">{t.encrypted}</span>
        </div>
      </footer>
      <ProfitGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />
      <AutoExecutionLog
        score={analysis?.score}
        isActive={isAutoExecution}
        lang={lang}
      />
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        lang={lang}
        onSave={(key) => {
          localStorage.setItem('gemini_api_key', key);
          setShowApiKeyModal(false);
          runAnalysis();
        }}
      />
    </div>
  );
};

export default App;
