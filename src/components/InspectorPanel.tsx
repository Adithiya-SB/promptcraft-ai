import React from 'react';
import { Sparkles, Lightbulb, Save, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AISuggestions } from '@/components/AISuggestions';

interface InspectorPanelProps {
    currentSchema: any;
    onApplySuggestion: (suggestion: string) => void;
    onSave: () => void;
    onExport: () => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
    currentSchema,
    onApplySuggestion,
    onSave,
    onExport
}) => {
    return (
        <div className="h-full flex flex-col bg-[#0b0e14]">
            <div className="h-10 px-4 border-b border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#6366f1]" />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Assistant</span>
                </div>
                <Badge variant="neutral" size="sm">Beta</Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {currentSchema ? (
                    <div className="space-y-6">
                        <AISuggestions
                            schema={currentSchema}
                            onApplySuggestion={onApplySuggestion}
                        />
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-50">
                        <Lightbulb className="w-10 h-10 text-slate-700 mb-3" />
                        <p className="text-xs text-slate-500">Generate a layout to see AI suggestions</p>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-white/[0.04] bg-[#0f111a]">
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<Save className="w-3.5 h-3.5" />}
                        onClick={onSave}
                        disabled={!currentSchema}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<Code2 className="w-3.5 h-3.5" />}
                        onClick={onExport}
                        disabled={!currentSchema}
                    >
                        Export
                    </Button>
                </div>
            </div>
        </div>
    );
};
