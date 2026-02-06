import React from 'react';
import { Search } from 'lucide-react';
import { useAppStore } from '@/store';

export const Topbar: React.FC = () => {
    const { theme, toggleTheme } = useAppStore();
    const [searchFocused, setSearchFocused] = React.useState(false);

    return (
        <div className="h-14 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
            <div className="flex items-center gap-4 flex-1 max-w-md">
                <div className={`relative flex items-center gap-2 flex-1 transition-all duration-200 ${searchFocused ? 'ring-2 ring-indigo-500/50' : ''} rounded-xl`}>
                    <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search… (⌘K)"
                        className="w-full bg-slate-800 pl-10 pr-4 py-2 rounded-xl text-sm outline-none text-slate-200 placeholder-slate-500 focus:bg-slate-800/80 transition-colors"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                </div>
            </div>

            <div className="flex gap-3 items-center">
                <button
                    onClick={toggleTheme}
                    className="hover:bg-slate-800 p-2 rounded-lg transition-colors"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    U
                </div>
            </div>
        </div>
    );
};
