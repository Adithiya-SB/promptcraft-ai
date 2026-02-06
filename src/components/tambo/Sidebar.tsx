import React from 'react';
import { motion } from 'framer-motion';
import {
    Layers,
    Sparkles,
    Settings,
    FileCode,
    Home,
    Palette
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Sparkles, label: 'Studio', path: '/studio' },
    { icon: Palette, label: 'Templates', path: '/templates' },
    { icon: Layers, label: 'Components', path: '/components' },
    { icon: FileCode, label: 'Code', path: '/code' },
];

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-64 h-full bg-slate-900/40 backdrop-blur-xl border-r border-slate-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        PromptCraft
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <motion.button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            whileHover={{ x: 4 }}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </motion.button>
                    );
                })}
            </nav>

            {/* Settings */}
            <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all">
                    <Settings className="w-4 h-4" />
                    Settings
                </button>
            </div>
        </div>
    );
};
