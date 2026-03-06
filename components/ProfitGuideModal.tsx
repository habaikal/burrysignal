import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingDown, Target, Zap, Bot } from 'lucide-react';

interface ProfitGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'en' | 'ko';
}

const content = {
    ko: {
        title: 'Burry Signal 실전 수익 실현 가이드',
        desc: '점수와 지표를 활용한 하락장 및 붕괴 시점 포트폴리오 기계적 대응 전략',
        steps: [
            {
                icon: <TrendingDown className="w-6 h-6 text-red-500" />,
                title: '1단계: 리스크 점수 기반 포트폴리오 조정 (Risk Calibration)',
                body: '게이지 차트의 리스크 점수(0~100%)에 따라 포지션을 기계적으로 관리합니다.\n\n• 0~30% (STABLE): 주식 등 위험자산 비중 70% 이상 유지, 현금 30%\n• 31~60% (WARNING): 위험자산 50% 축소, 금/안전자산 및 현금 비중 50% 확대\n• 61~80% (CRISIS): 위험자산 전량 매도, 시장 지수 인버스 ETF 및 헷지 포지션 30% 진입, 현금 70%\n• 81~100% (CATASTROPHIC): 전면적 숏 포지션 및 인버스 극대화. 안전자산(금, 달러) 보유 달성.'
            },
            {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: '2단계: 비정형 지표를 통한 약한 고리 섹터 선별',
                body: '시장 붕괴는 특정 섹터의 연쇄 부도에서 시작됩니다. 터미널의 지표를 활용하세요.\n\n• 엘리트 계층 자산 이동 파악: 메인 대시보드 지표 중 "내부자 매도" 및 "럭셔리 자산" 지표가 급증할 경우, 해당 임원들이 속한 섹터(예: 기술주, 부동산)를 최우선 하락 배팅(Short) 대상으로 둡니다.\n• 불투명 채무 흐름 추적: "그림자 금융" 경고가 뜰 시, 관련 금융주 및 레버리지 높은 리츠(REITs) 자산을 포트폴리오에서 즉시 제거합니다.'
            },
            {
                icon: <Bot className="w-6 h-6 text-indigo-500" />,
                title: '3단계: AI 시나리오 시뮬레이션 선제적 활용',
                body: '블랙 스완이 터지기 전 하단 패널인 "Black Swan Simulation"을 수시로 활용합니다.\n\n• 급격한 금리 인상이나 지정학적 위기 버튼을 눌렀을 때 터미널에 뜨는 "가장 취약한 자산군" 리스트를 기록합니다.\n• 실제로 그 징후가 보이기 시작할 때 사전 시뮬레이션 결과대로 해당 자산의 풋옵션(Put Option)이나 인버스를 미리 매집(Accumulate)합니다.'
            },
            {
                icon: <Target className="w-6 h-6 text-emerald-500" />,
                title: '4단계: 공포의 정점(90% 이상)에서의 역발상 재진입',
                body: '버리 시그널 목표는 파멸이 아니라 "붕괴 후의 재건에서 기회를 얻는 것"입니다.\n\n• 리스크 점수가 90%를 돌파한 후 다시 하락으로 꺾이는 변곡점이 진정한 "바닥"입니다.\n• 대중의 패닉 셀링(Panic Selling)이 극에 달할 때, 앞서 현금화해둔 자본으로 살아남을 우량 기업들의 주식을 헐값(Deep Value)에 쓸어 담습니다.'
            }
        ]
    },
    en: {
        title: 'Burry Signal Real-World Profit Guide',
        desc: 'Mechanized portfolio responses for crashes and collapse points',
        steps: [
            {
                icon: <TrendingDown className="w-6 h-6 text-red-500" />,
                title: 'Step 1: Risk Calibration based on Score',
                body: 'Mechanically manage positions based on the gauge chart risk score (0~100%).\n\n• 0~30% (STABLE): Maintain risk assets >= 70%, Cash 30%\n• 31~60% (WARNING): Reduce risk assets to 50%, expand gold/safe-haven & cash to 50%\n• 61~80% (CRISIS): Liquidate all risk assets, initiate 30% Inverse ETF/Hedge positions, Cash 70%\n• 81~100% (CATASTROPHIC): Maximize short and inverse positions. Retain safe havens (Gold, USD).'
            },
            {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: 'Step 2: Finding Weak Links via Unconventional Metrics',
                body: 'Market collapse starts from chain bankruptcies in specific sectors.\n\n• Identify Elite Asset Migration: If "Insider Selling" or "Luxury Asset" metrics spike, target the sectors those executives belong to (e.g., Tech, Real Estate) for priority short bets.\n• Track Opaque Debt Flow: Upon "Shadow Banking" alerts, immediately remove exposed financial stocks and highly leveraged REITs from your portfolio.'
            },
            {
                icon: <Bot className="w-6 h-6 text-indigo-500" />,
                title: 'Step 3: Preemptive AI Scenario Simulations',
                body: 'Frequently utilize the "Black Swan Simulation" panel before disaster strikes.\n\n• Document the "most vulnerable asset class" lists outputted by the terminal when triggering aggressive rate hikes or geopolitical crises.\n• When actual symptoms match the trigger, preemptively accumulate Put Options or Inverse ETFs of those specific assets as simulated.'
            },
            {
                icon: <Target className="w-6 h-6 text-emerald-500" />,
                title: 'Step 4: Contrarian Re-entry at Peak Fear (>90%)',
                body: 'The objective of Burry Signal is not doom, but "capturing opportunity in post-collapse rebuilding".\n\n• The true "bottom" is the inflection point where the risk score crosses 90% and begins to decline.\n• When public Panic Selling peaks, use your preserved cash reserves to accumulate surviving blue-chip equities at Deep Value prices.'
            }
        ]
    }
};

const ProfitGuideModal: React.FC<ProfitGuideModalProps> = ({ isOpen, onClose, lang }) => {
    const currentContent = content[lang];

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0f172a] border border-slate-700/50 rounded-2xl p-6 md:p-8 max-w-4xl w-full shadow-2xl relative my-8"
                        >
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8 border-b border-slate-800 pb-6">
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                                    {currentContent.title}
                                </h2>
                                <p className="text-slate-400 text-sm md:text-base">
                                    {currentContent.desc}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentContent.steps.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-slate-900 rounded-lg">
                                                {step.icon}
                                            </div>
                                            <h3 className="font-bold text-white text-lg tracking-tight leading-tight">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-light">
                                            {step.body}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};

export default ProfitGuideModal;
