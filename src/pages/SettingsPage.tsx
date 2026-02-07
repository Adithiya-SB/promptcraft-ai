import React from 'react';
import { Settings, Moon, Sun } from 'lucide-react';
import { useAppStore } from '@/store';
import { GlassCard } from '@/components/ui/GlassCard';

export const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useAppStore();

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3 mb-8">
                <Settings className="w-8 h-8 text-[#6366f1]" />
                Settings
            </h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">Appearance</h2>
                    <GlassCard className="bg-[#0e121b] border-slate-800 p-0 overflow-hidden">
                        <div className="flex items-center justify-between p-6 hover:bg-white/[0.01] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {theme === 'dark' ? (
                                        <Moon className="w-6 h-6" />
                                    ) : (
                                        <Sun className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-base font-medium text-slate-200">Dark Mode</p>
                                    <p className="text-sm text-slate-500">Toggle between dark and light themes</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0f172a] ${theme === 'dark' ? 'bg-[#6366f1]' : 'bg-slate-700'
                                    }`}
                            >
                                <span
                                    className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
                                />
                            </button>
                        </div>
                    </GlassCard>
                </section>

                <section className="opacity-50 pointer-events-none grayscale">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">API Configuration</h2>
                    <GlassCard className="bg-[#0e121b] border-slate-800 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-medium text-slate-200">Gemini API Key</p>
                                <p className="text-sm text-slate-500">Manage your connection to Google Gemini</p>
                            </div>
                            <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded">Managed by Admin</span>
                        </div>
                    </GlassCard>
                </section>

                <section className="opacity-50 pointer-events-none grayscale">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">Account</h2>
                    <GlassCard className="bg-[#0e121b] border-slate-800 p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold">
                                JD
                            </div>
                            <div>
                                <p className="text-base font-medium text-slate-200">John Doe</p>
                                <p className="text-sm text-slate-500">john.doe@example.com</p>
                            </div>
                        </div>
                    </GlassCard>
                </section>
            </div>
        </div>
    );
};
