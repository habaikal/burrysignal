import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: 'en' | 'ko';
    onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, lang, onSave }) => {
    const [inputKey, setInputKey] = useState('');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500">
                                <Key className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                {lang === 'ko' ? 'API 키 필요' : 'API KEY REQUIRED'}
                            </h2>
                        </div>

                        <p className="text-slate-400 mb-6 font-light">
                            {lang === 'ko'
                                ? '분석을 진행하려면 Gemini API 키가 필요합니다. 입력된 키는 브라우저 내부에만 안전하게 임시 저장됩니다.'
                                : 'A Gemini API key is required to proceed with the analysis. The key will be securely stored only in your local browser.'}
                        </p>

                        <div className="space-y-4">
                            <input
                                type="password"
                                value={inputKey}
                                onChange={(e) => setInputKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full px-5 py-4 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono"
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 px-6 rounded-xl font-bold bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors uppercase text-sm"
                                >
                                    {lang === 'ko' ? '취소' : 'CANCEL'}
                                </button>
                                <button
                                    onClick={() => {
                                        if (inputKey.trim()) {
                                            onSave(inputKey.trim());
                                        }
                                    }}
                                    className="flex-1 py-4 px-6 rounded-xl font-black bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all uppercase tracking-widest text-sm"
                                >
                                    {lang === 'ko' ? '저장 및 시작' : 'SAVE & RUN'}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center text-xs text-slate-500 border-t border-white/5 pt-4">
                            {lang === 'ko' ? (
                                <span>Google AI Studio에서 무료로 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">API 키 받기</a></span>
                            ) : (
                                <span>Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">Google AI Studio</a></span>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ApiKeyModal;
