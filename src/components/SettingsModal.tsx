import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store';
import { GlassCard } from '@/components/ui/GlassCard';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose
}) => {
    const { theme, toggleTheme } = useAppStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#020617]/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GlassCard className="bg-[#0e121b] border-slate-800">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-[#6366f1]" />
                                        <h2 className="text-lg font-semibold text-white">Settings</h2>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Appearance Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Appearance</h3>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-white/[0.05]">
                                                    {theme === 'dark' ? (
                                                        <Moon className="w-4 h-4 text-slate-200" />
                                                    ) : (
                                                        <Sun className="w-4 h-4 text-amber-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-200">Dark Mode</p>
                                                    <p className="text-xs text-slate-500">Adjust the interface theme</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={toggleTheme}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0f172a] ${theme === 'dark' ? 'bg-[#6366f1]' : 'bg-slate-700'
                                                    }`}
                                            >
                                                <span
                                                    className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* API Config Section (Placeholder for future) */}
                                    <div className="space-y-4 opacity-50 pointer-events-none">
                                        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">API Configuration</h3>
                                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                            <p className="text-sm text-slate-500">Managed by Administrator</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-white/[0.01] border-t border-white/[0.04] flex justify-end">
                                    <button
                                        className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                                        onClick={onClose}
                                    >
                                        Done
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
