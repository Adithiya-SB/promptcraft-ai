import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Layout as LayoutIcon, Save, FileCode, History as HistoryIcon, Settings as SettingsIcon, RotateCcw, RotateCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AppShell } from './AppShell';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { useAppStore } from '@/store';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { geminiService } from '@/services/gemini-service';

export const Layout: React.FC = () => {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);

    const {
        currentPrompt,
        currentSchema,
        setCurrentSchema,
        addGeneration,
        setIsGenerating,
        undo,
        redo,
        setCurrentPrompt
    } = useAppStore();

    // Replicate core functionality for Command Palette globally
    const handleGenerate = async () => {
        // If we are not on Studio, navigate there first? 
        // Or just generate. Generating updates store.
        if (window.location.pathname !== '/studio') {
            navigate('/studio');
        }

        if (!currentPrompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        setIsGenerating(true);
        const loadingToast = toast.loading('Generating interface...');

        try {
            const schema = await geminiService.generateLayout(currentPrompt);
            setCurrentSchema(schema);
            addGeneration({ prompt: currentPrompt, schema });
            toast.success('Interface generated', { id: loadingToast });
        } catch (error) {
            console.error('Generation error:', error);
            // Fallback
            const { parsePrompt } = await import('@/llm/promptParser');
            const schema = parsePrompt(currentPrompt);
            setCurrentSchema(schema);
            addGeneration({ prompt: currentPrompt, schema });
            toast.error('Using fallback mode', { id: loadingToast });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportCode = () => {
        // Only works if we have a schema
        if (!currentSchema) {
            toast.error('No layout to export');
            return;
        }
        // Use a custom event or store flag to trigger modal in Studio?
        // OR just rely on Studio being the active view if we want to show the modal.
        // If we are in /history, we can't export code easily unless we load it.
        toast('Go to Studio to export', { icon: 'ℹ️' });
        navigate('/studio');
    };

    const handleSaveProject = () => {
        if (!currentSchema) {
            toast.error('No layout to save');
            return;
        }
        toast('Go to Studio to save', { icon: 'ℹ️' });
        navigate('/studio');
    };

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
                navigate('/templates');
            }
        },
        {
            id: 'history',
            icon: <HistoryIcon className="w-4 h-4" />,
            label: 'History',
            description: 'View past generations',
            action: () => {
                setShowCommandPalette(false);
                navigate('/history');
            }
        },
        {
            id: 'settings',
            icon: <SettingsIcon className="w-4 h-4" />,
            label: 'Settings',
            description: 'App preferences and theme',
            action: () => {
                setShowCommandPalette(false);
                navigate('/settings');
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
        { key: 'k', ctrl: true, callback: () => setShowCommandPalette(true) },
        { key: 'Enter', ctrl: true, callback: handleGenerate },
        { key: 'z', ctrl: true, callback: undo },
        { key: 'z', ctrl: true, shift: true, callback: redo },
    ]);

    return (
        <>
            <AppShell
                sidebar={
                    <Sidebar
                        collapsed={sidebarCollapsed}
                        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    />
                }
                topbar={<Topbar onSearchClick={() => setShowCommandPalette(true)} />}
            />
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
            <CommandPalette
                isOpen={showCommandPalette}
                onClose={() => setShowCommandPalette(false)}
                commands={commands}
            />
        </>
    );
};
