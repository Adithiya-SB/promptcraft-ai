import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/Layout/AppShell';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Topbar } from '@/components/Layout/Topbar';

export const AboutPage: React.FC = () => {
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
            topbar={<Topbar subtitle="About" />}
            className="overflow-y-auto"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
                <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 text-slate-300 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <div className="space-y-4 text-center">
                        <div className="inline-block p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-400 font-medium text-sm">
                            🚀 About PromptCraft AI
                        </div>
                        <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                            Build interfaces at the<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">speed of thought.</span>
                        </h1>
                        <p className="text-xl leading-relaxed text-slate-400 max-w-2xl mx-auto">
                            PromptCraft AI is a next-generation Generative UI platform that turns simple English prompts into fully functional, responsive web applications in real time.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl italic text-slate-200 font-medium text-xl text-center">
                            “Create a dark analytics dashboard with charts and a sidebar.”
                        </div>

                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-400 font-medium text-center">
                            <li className="bg-white/[0.02] p-3 rounded-lg border border-white/5">No boilerplate</li>
                            <li className="bg-white/[0.02] p-3 rounded-lg border border-white/5">No manual layouts</li>
                            <li className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 text-indigo-300">Just ideas → UI</li>
                        </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-8">
                        <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                ✨ The Problem
                            </h2>
                            <p className="text-slate-400 mb-4">Modern interfaces are static.</p>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span> Users must learn complex workflows</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span> Developers manually design screens</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500/50"></span> Prototyping takes days</li>
                            </ul>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                ✨ Our Solution
                            </h2>
                            <p className="text-slate-400 mb-4">PromptCraft introduces Generative UI.</p>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span> Understands user intent</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span> Decides required components</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span> Exports production-ready code</li>
                            </ul>
                        </div>
                    </div>

                    <section className="pt-8">
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/[0.06] rounded-2xl p-8">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                ⚙️ How It Works
                            </h2>
                            <div className="flex flex-wrap gap-2 items-center justify-center text-sm font-mono text-indigo-300 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                                <span>Prompt</span>
                                <span className="text-slate-600">→</span>
                                <span>AI</span>
                                <span className="text-slate-600">→</span>
                                <span>Layout Schema</span>
                                <span className="text-slate-600">→</span>
                                <span>Tambo</span>
                                <span className="text-slate-600">→</span>
                                <span className="text-white font-bold">Live Interface</span>
                            </div>
                            <ol className="grid md:grid-cols-5 gap-4 text-center">
                                {[
                                    "Describe the UI",
                                    "AI Interprets",
                                    "Schema Gen",
                                    "Tambo Render",
                                    "Export Code"
                                ].map((step, i) => (
                                    <li key={i} className="bg-white/5 rounded-lg p-3 text-sm text-slate-300 border border-white/5">
                                        <div className="text-xs text-slate-500 mb-1">0{i + 1}</div>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    <section className="pt-8">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            🧩 What You Can Build
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                "Dashboards", "Admin Panels", "CRM Tools", "Landing Pages",
                                "Chat Interfaces", "Forms", "SaaS Products", "Settings Pages"
                            ].map((item) => (
                                <div key={item} className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] p-3 rounded-lg text-center text-slate-400 text-sm transition-colors cursor-default">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            🛠 Built With
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {["React", "TypeScript", "TailwindCSS", "Framer Motion", "Google Gemini", "Tambo SDK"].map(tech => (
                                <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm border border-blue-500/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="pt-8 border-t border-white/[0.06]">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            👨‍💻 Built By
                        </h2>
                        <div className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05]">
                            <div className="flex-1">
                                <h3 className="text-white font-medium text-lg">Adithiya S.B</h3>
                                <p className="text-indigo-400 text-sm mb-4">AI & Generative Systems Developer</p>

                                <div className="space-y-2 text-sm text-slate-400">
                                    <p className="flex items-center gap-2">📧 adithiyasb34@gmail.com</p>
                                    <p className="flex items-center gap-2">💼 <a href="https://www.linkedin.com/in/adithiya-s-b-786b20290" className="hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">LinkedIn Profile</a></p>
                                    <p className="flex items-center gap-2">💻 <a href="https://github.com/Adithiya-SB" className="hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">GitHub Profile</a></p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-8">
                        <div className="bg-gradient-to-br from-purple-900/30 via-[#0f0e17] to-indigo-900/30 border border-white/[0.1] rounded-2xl p-10 text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,transparent)]" />
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                <div className="inline-block p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-300 font-medium text-xs tracking-wider uppercase mb-6">
                                    🌍 Our Vision
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-6">"We believe the future of software is intent-driven."</h3>
                                <div className="space-y-2 text-lg text-slate-300 mb-8 font-light">
                                    <p>You shouldn’t design interfaces.</p>
                                    <p>You should describe them.</p>
                                    <p className="text-indigo-300 font-normal pt-2">And AI should build the rest.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-white/50 text-sm">
                                    <span className="w-8 h-[1px] bg-white/20"></span>
                                    <span>PromptCraft AI</span>
                                    <span className="w-8 h-[1px] bg-white/20"></span>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </AppShell>
    );
};
