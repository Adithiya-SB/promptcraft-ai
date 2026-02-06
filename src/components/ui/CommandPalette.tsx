import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, File } from 'lucide-react';

interface CommandItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    description?: string;
    shortcut?: string;
    action: () => void;
}

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    commands?: CommandItem[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
    isOpen,
    onClose,
    commands = []
}) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onClose(); // Toggle mechanism would be higher up
            }
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

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
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-xl bg-[#0e121b] border border-slate-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center px-4 py-3 border-b border-slate-800/50">
                                <Search className="w-5 h-5 text-slate-500 mr-3" />
                                <input
                                    autoFocus
                                    className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-sm h-6"
                                    placeholder="Type a command or search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded bg-slate-800/50 border border-slate-700/50 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                                    <span className="text-xs">ESC</span>
                                </kbd>
                            </div>

                            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                                <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    Suggestions
                                </div>
                                {commands.length > 0 ? (
                                    commands.map((cmd) => (
                                        <button
                                            key={cmd.id}
                                            onClick={cmd.action}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 group transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                                                    {cmd.icon}
                                                </span>
                                                <div>
                                                    <div className="text-sm text-slate-300 group-hover:text-white font-medium">
                                                        {cmd.label}
                                                    </div>
                                                    {cmd.description && (
                                                        <div className="text-xs text-slate-500">
                                                            {cmd.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {cmd.shortcut && (
                                                <span className="text-xs text-slate-600 font-medium">
                                                    {cmd.shortcut}
                                                </span>
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    // Default/Demo items if empty
                                    <>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 group transition-colors text-left">
                                            <Command className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm text-slate-300">New Project...</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 group transition-colors text-left">
                                            <File className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm text-slate-300">Open File...</span>
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="p-2 border-t border-slate-800/50 bg-[#0b0d13] text-[10px] text-slate-500 px-4 flex justify-between items-center">
                                <span>Navigate with ↑↓</span>
                                <span>Enter to select</span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
