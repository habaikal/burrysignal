import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Target, Shield, TrendingDown } from 'lucide-react';

interface AutoExecutionLogProps {
    score: number | undefined;
    isActive: boolean;
    lang: 'en' | 'ko';
}

interface LogEntry {
    id: number;
    message: string;
    type: 'info' | 'warning' | 'critical' | 'action';
    icon: React.ReactNode;
    time: string;
}

const AutoExecutionLog: React.FC<AutoExecutionLogProps> = ({ score, isActive, lang }) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        if (!isActive || score === undefined) return;

        let newLog: LogEntry | null = null;
        const now = new Date().toLocaleTimeString();
        const id = Date.now();

        if (score >= 90) {
            newLog = {
                id,
                message: lang === 'ko'
                    ? `[자동 진입] 붕괴 정점(Score: ${score}%) 감지. 우량주 역발상 매수(Deep Value Accumulation) 시퀀스를 가동합니다.`
                    : `[AUTO-ENTRY] Peak collapse (Score: ${score}%) detected. Initiating Deep Value Accumulation sequence.`,
                type: 'action',
                icon: <Target className="w-4 h-4 text-emerald-500" />,
                time: now
            };
        } else if (score >= 80) {
            newLog = {
                id,
                message: lang === 'ko'
                    ? `[헤지 실행] 위험도 ${score}%. 인버스 ETF 및 숏 포지션 비중을 최대화합니다.`
                    : `[HEDGE EXEC] Risk ${score}%. Maximizing Inverse ETF & Short positions.`,
                type: 'critical',
                icon: <Zap className="w-4 h-4 text-red-500" />,
                time: now
            };
        } else if (score >= 60) {
            newLog = {
                id,
                message: lang === 'ko'
                    ? `[포트폴리오 조정] 위험도 ${score}%. 위험자산을 전량 매도하고 안전자산(금/달러)을 확보합니다.`
                    : `[REBALANCE] Risk ${score}%. Liquidating risk assets, securing safe havens (Gold/USD).`,
                type: 'warning',
                icon: <Shield className="w-4 h-4 text-amber-500" />,
                time: now
            };
        } else if (score <= 30) {
            newLog = {
                id,
                message: lang === 'ko'
                    ? `[유지] 안정 상태(Score: ${score}%). 위험자산 비중을 70%로 유지합니다.`
                    : `[HOLD] Stable state (Score: ${score}%). Maintaining risk asset exposure at 70%.`,
                type: 'info',
                icon: <TrendingDown className="w-4 h-4 text-blue-500" />,
                time: now
            };
        }

        if (newLog) {
            setLogs((prev) => {
                // Only add if it's different from the last log type to avoid spam
                if (prev.length > 0 && prev[0].type === newLog?.type) {
                    return prev;
                }
                return [newLog!, ...prev].slice(0, 5); // Keep last 5 logs
            });
        }

    }, [score, isActive, lang]);

    if (!isActive && logs.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] flex flex-col items-end gap-3 pointer-events-none">
            <AnimatePresence>
                {logs.map((log) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`w-full p-4 rounded-2xl border backdrop-blur-md shadow-2xl pointer-events-auto ${log.type === 'action' ? 'bg-emerald-950/80 border-emerald-500/50 shadow-emerald-900/20' :
                                log.type === 'critical' ? 'bg-red-950/80 border-red-500/50 shadow-red-900/20' :
                                    log.type === 'warning' ? 'bg-amber-950/80 border-amber-500/50 shadow-amber-900/20' :
                                        'bg-blue-950/80 border-blue-500/50 shadow-blue-900/20'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">{log.icon}</div>
                            <div className="flex-1">
                                <div className="text-[10px] font-mono font-bold opacity-60 mb-1">{log.time}</div>
                                <div className={`text-sm font-medium leading-snug ${log.type === 'action' ? 'text-emerald-100' :
                                        log.type === 'critical' ? 'text-red-100' :
                                            log.type === 'warning' ? 'text-amber-100' :
                                                'text-blue-100'
                                    }`}>
                                    {log.message}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AutoExecutionLog;
