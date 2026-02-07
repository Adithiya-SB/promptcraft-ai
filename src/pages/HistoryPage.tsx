import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Trash2, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils';
import toast from 'react-hot-toast';

export const HistoryPage: React.FC = () => {
    const navigate = useNavigate();
    const { generationHistory, clearHistory, setCurrentSchema, setCurrentPrompt } = useAppStore();

    const handleLoad = (schema: any, prompt: string) => {
        setCurrentSchema(schema);
        setCurrentPrompt(prompt);
        toast.success('Loaded from history');
        navigate('/studio');
    };

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto w-full h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/studio')}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                    Back to Studio
                </Button>
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Clock className="w-8 h-8 text-[#6366f1]" />
                    Generation History
                </h1>
            </div>

            <GlassCard className="flex-1 flex flex-col overflow-hidden bg-[#0e121b] border-slate-800">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.04]">
                    <span className="text-slate-400 text-sm">
                        {generationHistory.length} items found
                    </span>
                    {generationHistory.length > 0 && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={clearHistory}
                            leftIcon={<Trash2 className="w-4 h-4" />}
                        >
                            Clear History
                        </Button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {generationHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                            <Clock className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">No history yet</p>
                            <Button
                                className="mt-4"
                                variant="primary"
                                onClick={() => navigate('/studio')}
                            >
                                Start Generating
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {generationHistory.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-[#6366f1]/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
                                    onClick={() => handleLoad(item.schema, item.prompt)}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base text-slate-200 font-medium leading-relaxed">
                                            {item.prompt}
                                        </p>
                                        <span className="text-xs text-slate-500 mt-2 block font-mono">
                                            {formatDate(new Date(item.timestamp))}
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity"
                                        rightIcon={<ArrowRight className="w-4 h-4" />}
                                    >
                                        Load Template
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
};
