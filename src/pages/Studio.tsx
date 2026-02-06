import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wand2,
    Zap,
    Send,
    Layout as LayoutIcon,
    History as HistoryIcon,
    Settings as SettingsIcon,
    FileCode,
    Save,
    RotateCcw,
    RotateCw
} from 'lucide-react';
import { useAppStore } from '@/store';
import { TamboRenderer } from '@/tamboRenderer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { geminiService } from '@/services/gemini-service';
import { ExportModal } from '@/components/ExportModal';
import { ProjectManager } from '@/components/ProjectManager';
import toast, { Toaster } from 'react-hot-toast';
import { EXAMPLE_PROMPTS } from '@/llm/promptParser';

// New UI Components
import { AppShell } from '@/components/Layout/AppShell';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Topbar } from '@/components/Layout/Topbar';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { InspectorPanel } from '@/components/InspectorPanel';

import { HistoryModal } from '@/components/HistoryModal';
import { SettingsModal } from '@/components/SettingsModal';
import { TemplatesModal } from '@/components/TemplatesModal';

import { CommandPalette } from '@/components/ui/CommandPalette';

// Helper component for loading state
const GeneratingSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-16 bg-white/[0.04] rounded-lg border border-white/[0.05]" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 space-y-6">
                <div className="h-64 bg-white/[0.04] rounded-xl border border-white/[0.05]" />
                <div className="grid grid-cols-2 gap-6">
                    <div className="h-40 bg-white/[0.04] rounded-xl border border-white/[0.05]" />
                    <div className="h-40 bg-white/[0.04] rounded-xl border border-white/[0.05]" />
                </div>
            </div>
            <div className="col-span-12 md:col-span-4 space-y-6">
                <div className="h-32 bg-white/[0.04] rounded-xl border border-white/[0.05]" />
                <div className="h-full min-h-[300px] bg-white/[0.04] rounded-xl border border-white/[0.05]" />
            </div>
        </div>

        <div className="flex justify-center py-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#6366f1]/10 rounded-full border border-[#6366f1]/20">
                <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-[#6366f1] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                <span className="text-xs font-medium text-[#6366f1] ml-1">Generating Interface...</span>
            </div>
        </div>
    </div>
);

export const Studio: React.FC = () => {
    const {
        currentSchema,
        setCurrentSchema,
        currentPrompt,
        setCurrentPrompt,
        isGenerating,
        setIsGenerating,
        undo,
        redo,
        addGeneration
    } = useAppStore();

    const [showExportModal, setShowExportModal] = useState(false);
    const [showProjectManager, setShowProjectManager] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleGenerate = async () => {
        if (!currentPrompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        const loadingToast = toast.loading('Generating interface...');

        try {
            // Use Gemini API for generation
            const schema = await geminiService.generateLayout(currentPrompt);
            setCurrentSchema(schema);
            addGeneration({ prompt: currentPrompt, schema });
            toast.success('Interface generated', { id: loadingToast });
        } catch (error) {
            console.error('Generation error:', error);
            toast.error('Using fallback mode', { id: loadingToast });

            // Fallback to rule-based parser
            const { parsePrompt } = await import('@/llm/promptParser');
            const schema = parsePrompt(currentPrompt);
            setCurrentSchema(schema);
            addGeneration({ prompt: currentPrompt, schema });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleEnhancePrompt = async () => {
        if (!currentPrompt.trim()) return;

        const loadingToast = toast.loading('Enhancing prompt...');
        try {
            const enhanced = await geminiService.enhancePrompt(currentPrompt);
            setCurrentPrompt(enhanced);
            toast.success('Prompt enhanced', { id: loadingToast });
        } catch (error) {
            toast.error('Failed to enhance', { id: loadingToast });
        }
    };

    const handleExportCode = () => {
        if (!currentSchema) {
            toast.error('No layout to export');
            return;
        }
        setShowExportModal(true);
    };

    const handleSaveProject = () => {
        if (!currentSchema) {
            toast.error('No layout to save');
            return;
        }
        setShowProjectManager(true);
    };

    const handleApplySuggestion = async (suggestion: string) => {
        const loadingToast = toast.loading('Applying suggestion...');
        setCurrentPrompt(currentPrompt + '. ' + suggestion);
        toast.success('Applied', { id: loadingToast });
    };

    // Command Palette Actions
    const commands = [
        {
            id: 'generate',
            icon: <Zap className="w-4 h-4" />,
            label: 'Generate Interface',
            description: 'Generate a new UI from the current prompt',
            shortcut: '⌘ + Enter',
            action: () => {
                setShowCommandPalette(false);
                handleGenerate();
            }
        },
        {
            id: 'templates',
            icon: <LayoutIcon className="w-4 h-4" />,
            label: 'Browse Templates',
            description: 'Start with a pre-built template',
            action: () => {
                setShowCommandPalette(false);
                setShowTemplates(true);
            }
        },
        {
            id: 'save-project',
            icon: <Save className="w-4 h-4" />,
            label: 'Save Project',
            description: 'Save current work to local projects',
            shortcut: 'Ctrl + S',
            action: () => {
                setShowCommandPalette(false);
                handleSaveProject();
            }
        },
        {
            id: 'export-code',
            icon: <FileCode className="w-4 h-4" />,
            label: 'Export Code',
            description: 'Export to React/Tailwind code',
            shortcut: 'Ctrl + E',
            action: () => {
                setShowCommandPalette(false);
                handleExportCode();
            }
        },
        {
            id: 'history',
            icon: <HistoryIcon className="w-4 h-4" />,
            label: 'History',
            description: 'View past generations',
            action: () => {
                setShowCommandPalette(false);
                setShowHistory(true);
            }
        },
        {
            id: 'settings',
            icon: <SettingsIcon className="w-4 h-4" />,
            label: 'Settings',
            description: 'App preferences and theme',
            action: () => {
                setShowCommandPalette(false);
                setShowSettings(true);
            }
        },
        {
            id: 'undo',
            icon: <RotateCcw className="w-4 h-4" />,
            label: 'Undo',
            shortcut: 'Ctrl + Z',
            action: () => {
                undo();
                setShowCommandPalette(false);
                toast.success('Undone');
            }
        },
        {
            id: 'redo',
            icon: <RotateCw className="w-4 h-4" />,
            label: 'Redo',
            shortcut: 'Ctrl + Shift + Z',
            action: () => {
                redo();
                setShowCommandPalette(false);
                toast.success('Redone');
            }
        }
    ];

    useKeyboardShortcuts([
        { key: 'Enter', ctrl: true, callback: handleGenerate },
        { key: 'z', ctrl: true, callback: undo },
        { key: 'z', ctrl: true, shift: true, callback: redo },
        { key: 'e', ctrl: true, callback: handleExportCode },
        { key: 's', ctrl: true, callback: handleSaveProject },
        { key: 'k', ctrl: true, callback: () => setShowCommandPalette(true) }, // Command Palette shortcut
    ]);

    return (
        <AppShell
            sidebar={
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    onHistoryClick={() => setShowHistory(true)}
                    onSettingsClick={() => setShowSettings(true)}
                    onTemplatesClick={() => setShowTemplates(true)}
                />
            }
            topbar={<Topbar onSearchClick={() => setShowCommandPalette(true)} />}
            rightPanel={
                <InspectorPanel
                    currentSchema={currentSchema}
                    onApplySuggestion={handleApplySuggestion}
                    onSave={handleSaveProject}
                    onExport={handleExportCode}
                />
            }
        >
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#0f172a',
                        border: '1px solid #1e293b',
                        color: '#f8fafc',
                        fontSize: '0.875rem',
                    },
                }}
            />

            {/* Prompt Input Area (Floating) */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-30">
                <GlassCard className="p-1.5 backdrop-blur-xl shadow-2xl border-white/10 ring-1 ring-black/20 bg-[#0f111a]/95 rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-[#6366f1]/50 focus-within:border-[#6366f1]/50">
                    <div className="relative">
                        <textarea
                            value={currentPrompt}
                            onChange={(e) => setCurrentPrompt(e.target.value)}
                            placeholder="Describe your interface... (e.g., 'A modern CRM dashboard with sales charts')"
                            className="w-full bg-transparent border-0 text-sm text-slate-200 placeholder:text-slate-600 focus:ring-0 resize-none h-[52px] py-3.5 pl-3.5 pr-24 custom-scrollbar font-normal leading-relaxed"
                            style={{
                                minHeight: '52px',
                                maxHeight: '200px',
                                overflowY: currentPrompt.length > 100 ? 'auto' : 'hidden'
                            }}
                            disabled={isGenerating}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                    handleGenerate();
                                    e.preventDefault();
                                }
                            }}
                        />
                        <div className="absolute right-1.5 bottom-1.5 flex items-center gap-1">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleEnhancePrompt}
                                disabled={isGenerating || !currentPrompt.trim()}
                                className="h-7 w-7 text-slate-400 hover:text-[#6366f1]"
                                title="Enhance Prompt"
                            >
                                <Wand2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={handleGenerate}
                                disabled={isGenerating || !currentPrompt.trim()}
                                isLoading={isGenerating}
                                className="h-7 px-3 text-xs bg-[#6366f1] hover:bg-[#4f46e5]"
                            >
                                {!isGenerating && <Send className="w-3.5 h-3.5" />}
                            </Button>
                        </div>
                    </div>
                </GlassCard>

                {/* Hints */}
                {/* Hints / Examples */}
                <div className="flex justify-center mt-3">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-slate-500 font-medium opacity-60 flex items-center gap-1.5"
                    >
                        <span className="text-slate-400">Try:</span>
                        <span className="text-slate-500">
                            "A CRM dashboard with customer table and revenue charts"
                        </span>
                    </motion.p>
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                {/* Dot Grid Background */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1 }} />

                <div className="absolute inset-0 overflow-auto p-8 pb-32 z-10 custom-scrollbar flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full flex justify-center"
                            >
                                <GeneratingSkeleton />
                            </motion.div>
                        ) : currentSchema ? (
                            <motion.div
                                key="canvas"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-6xl min-h-[calc(100vh-8rem)]"
                            >
                                <div className="bg-[#0b0e14] rounded-xl border border-white/[0.06] shadow-2xl overflow-hidden ring-1 ring-black/40">
                                    {/* Browser Chrome Simulation */}
                                    <div className="h-8 bg-[#0f111a] border-b border-white/[0.04] flex items-center px-3 gap-2">
                                        <div className="flex gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                                        </div>
                                        <div className="flex-1 text-center flex justify-center">
                                            <div className="bg-[#020617] px-8 py-0.5 rounded text-[10px] text-slate-600 font-mono border border-white/[0.02] flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                localhost:3000
                                            </div>
                                        </div>
                                        <div className="w-12" />
                                    </div>
                                    <div className="relative">
                                        <TamboRenderer components={currentSchema.components} />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center mt-20 max-w-xl text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#4f46e5]/20 border border-[#6366f1]/20 flex items-center justify-center mb-6 shadow-glow">
                                    <Zap className="w-8 h-8 text-[#6366f1]" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">What shall we build today?</h2>
                                <p className="text-slate-400 text-base leading-relaxed mb-8">
                                    Describe your interface naturally. Tambo AI converts your words into production-ready code instantly.
                                </p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {EXAMPLE_PROMPTS.slice(0, 3).map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPrompt(prompt)}
                                            className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#6366f1]/30 text-xs text-slate-300 transition-all cursor-pointer"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showExportModal && currentSchema && (
                    <ExportModal
                        schema={currentSchema}
                        isOpen={showExportModal}
                        onClose={() => setShowExportModal(false)}
                    />
                )}
                {showProjectManager && (
                    <ProjectManager
                        currentSchema={currentSchema}
                        currentPrompt={currentPrompt}
                        isOpen={showProjectManager}
                        onClose={() => setShowProjectManager(false)}
                        onLoadProject={(schema, prompt) => {
                            setCurrentSchema(schema);
                            setCurrentPrompt(prompt);
                            setShowProjectManager(false);
                        }}
                    />
                )}
                {showHistory && (
                    <HistoryModal
                        isOpen={showHistory}
                        onClose={() => setShowHistory(false)}
                        onLoad={(schema, prompt) => {
                            setCurrentSchema(schema);
                            setCurrentPrompt(prompt);
                            setShowHistory(false);
                            toast.success('Loaded from history');
                        }}
                    />
                )}
                {showSettings && (
                    <SettingsModal
                        isOpen={showSettings}
                        onClose={() => setShowSettings(false)}
                    />
                )}
                {showTemplates && (
                    <TemplatesModal
                        isOpen={showTemplates}
                        onClose={() => setShowTemplates(false)}
                        onLoad={(schema, prompt) => {
                            setCurrentSchema(schema);
                            setCurrentPrompt(prompt);
                            setShowTemplates(false);
                            toast.success('Template loaded');
                        }}
                    />
                )}
                {showCommandPalette && (
                    <CommandPalette
                        isOpen={showCommandPalette}
                        onClose={() => setShowCommandPalette(false)}
                        commands={commands}
                    />
                )}
            </AnimatePresence>
        </AppShell>
    );
};
