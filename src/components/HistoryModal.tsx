import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ArrowRight, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils';

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (schema: any, prompt: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
    isOpen,
    onClose,
    onLoad
}) => {
    const { generationHistory, clearHistory } = useAppStore();

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
                            className="w-full max-w-2xl max-h-[80vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <GlassCard className="flex flex-col h-full overflow-hidden bg-[#0e121b] border-slate-800">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#6366f1]" />
                                        <h2 className="text-lg font-semibold text-white">Generation History</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {generationHistory.length > 0 && (
                                            <Button
                                                variant="danger"
                                                size="xs"
                                                onClick={clearHistory}
                                                leftIcon={<Trash2 className="w-3 h-3" />}
                                            >
                                                Clear
                                            </Button>
                                        )}
                                        <button
                                            onClick={onClose}
                                            className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                    {generationHistory.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                                            <Clock className="w-10 h-10 mb-3 opacity-20" />
                                            <p className="text-sm">No history yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {generationHistory.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="group flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer"
                                                    onClick={() => onLoad(item.schema, item.prompt)}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-slate-200 font-medium line-clamp-2 leading-relaxed">
                                                            {item.prompt}
                                                        </p>
                                                        <span className="text-xs text-slate-500 mt-2 block">
                                                            {formatDate(new Date(item.timestamp))}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                                    >
                                                        Load
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
