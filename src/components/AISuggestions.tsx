import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { LayoutSchema } from '@/types';
import { geminiService } from '@/services/gemini-service';

interface AISuggestionsProps {
    schema: LayoutSchema | null;
    onApplySuggestion?: (suggestion: string) => void;
}

export const AISuggestions: React.FC<AISuggestionsProps> = ({ schema, onApplySuggestion }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (schema) {
            loadSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [schema]);

    const loadSuggestions = async () => {
        if (!schema) return;

        setLoading(true);
        try {
            const newSuggestions = await geminiService.generateSuggestions(schema);
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Error loading suggestions:', error);
            setSuggestions([
                'Add interactive elements to improve user engagement',
                'Consider using consistent spacing between components',
                'Add visual hierarchy with different font sizes',
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (!schema) {
        return (
            <div className="text-center text-slate-500 py-8">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Generate a layout to see AI suggestions</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-semibold text-slate-100">AI Suggestions</h3>
                </div>
                <button
                    onClick={loadSuggestions}
                    disabled={loading}
                    className="p-2 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    title="Refresh suggestions"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4 text-slate-400" />
                    )}
                </button>
            </div>

            {loading ? (
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-20 bg-slate-800/50 rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {suggestions.map((suggestion, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-300 leading-relaxed flex-1">
                                        {suggestion}
                                    </p>
                                </div>
                                {onApplySuggestion && (
                                    <button
                                        onClick={() => onApplySuggestion(suggestion)}
                                        className="mt-3 w-full py-2 px-3 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-medium transition-colors"
                                    >
                                        Apply Suggestion
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && suggestions.length === 0 && (
                <div className="text-center text-slate-500 py-8">
                    <p className="text-sm">No suggestions available</p>
                </div>
            )}
        </div>
    );
};
