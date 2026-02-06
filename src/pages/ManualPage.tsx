import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/Layout/AppShell';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Topbar } from '@/components/Layout/Topbar';

export const ManualPage: React.FC = () => {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <AppShell
            sidebar={
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                    onTemplatesClick={() => navigate('/templates')}
                    onHistoryClick={() => navigate('/studio')}
                    onSettingsClick={() => navigate('/studio')}
                    activePage="none"
                />
            }
            topbar={<Topbar subtitle="Manual" />}
            className="overflow-y-auto"
        >
            <div className="max-w-3xl mx-auto px-6 py-12 text-slate-300">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="inline-block p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400 font-medium text-sm">
                            📘 Manual
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Welcome to PromptCraft AI</h1>
                        <p className="text-lg text-slate-400">
                            PromptCraft AI lets you generate complete user interfaces using plain English.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/[0.06] p-6 rounded-xl">
                        <p className="italic text-slate-200 font-medium mb-4">Just describe what you want — and the app builds it instantly.</p>
                        <div className="flex gap-4 text-slate-400 text-sm">
                            <span>No coding.</span>
                            <span>No design tools.</span>
                            <span className="text-white font-medium">Just prompts.</span>
                        </div>
                    </div>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            🚀 Quick Start (30 seconds)
                        </h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/10">1</div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">Step 1 — Enter a Prompt</h3>
                                    <p className="text-slate-400 text-sm mb-2">Type something like:</p>
                                    <div className="bg-black/40 border border-white/10 p-3 rounded text-indigo-200 text-sm font-mono">
                                        “Create a dark analytics dashboard with charts and sidebar”
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/10">2</div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">Step 2 — Click Generate</h3>
                                    <p className="text-slate-400 text-sm">
                                        The AI understands your request and builds the interface automatically using Tambo components.<br />
                                        <span className="text-slate-300">You’ll see the UI appear live on the canvas.</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/10">3</div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">Step 3 — Refine</h3>
                                    <ul className="text-slate-400 text-sm space-y-1">
                                        <li>• Edit your prompt</li>
                                        <li>• Apply AI suggestions</li>
                                        <li>• Load templates</li>
                                        <li>• Adjust layout</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0 border border-white/10">4</div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">Step 4 — Export</h3>
                                    <p className="text-slate-400 text-sm mb-2">Click Export Code to download clean production-ready code.</p>
                                    <div className="flex gap-2 text-xs font-mono text-slate-500">
                                        <span className="bg-white/5 px-2 py-1 rounded">Supports:</span>
                                        <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">React</span>
                                        <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">HTML/CSS</span>
                                        <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">Vue</span>
                                        <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">JSON schema</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            🧩 Using Templates
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-300 mb-4">
                            {[
                                "Dashboard", "CRM", "SaaS Landing Page", "Chat Interface", "Settings Panel"
                            ].map(t => (
                                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">{t}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                            Click → Load → Instantly rendered.
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            ⚡ Features Overview
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-400">
                            <div>• Natural language → UI generation</div>
                            <div>• Real-time preview</div>
                            <div>• Tambo-powered dynamic components</div>
                            <div>• AI layout suggestions</div>
                            <div>• Templates gallery</div>
                            <div>• Multi-framework export</div>
                            <div>• Premium Linear-style interface</div>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            💡 Example Prompts
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-400">
                            <div>• Analytics dashboard with 4 charts</div>
                            <div>• CRM with contacts and pipeline</div>
                            <div>• Login page with email/password</div>
                            <div>• Chat app like ChatGPT</div>
                            <div>• SaaS landing page with pricing</div>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            🎯 Tips
                        </h2>
                        <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-400">
                            <li>• Be specific</li>
                            <li>• Use templates</li>
                            <li>• Try multiple prompts</li>
                            <li>• Export when satisfied</li>
                            <li>• Use desktop for best experience</li>
                        </ul>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06] pb-12">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            👨‍💻 Built With
                        </h2>
                        <p className="text-slate-400 text-sm mb-1">Powered by React, Gemini AI, and Tambo Generative UI SDK.</p>
                        <p className="text-white font-medium text-sm">Built by Adithiya S.B</p>
                    </section>
                </motion.div>
            </div>
        </AppShell>
    );
};
