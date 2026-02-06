import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Code, Wand2, Brain, Rocket, Palette, Download, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full overflow-y-auto overflow-x-hidden relative scroll-smooth">
            {/* ... background ... */}
            <div className="linear-bg" />
            <div className="linear-grid" />
            <div className="linear-orb linear-orb-1" />
            <div className="linear-orb linear-orb-2" />
            <div className="linear-orb linear-orb-3" />

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/5"
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="text-xl font-bold linear-text-gradient">PromptCraft AI</span>
                            <p className="text-xs text-slate-400">Powered by Tambo AI</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/manual')}
                        >
                            Manual
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/about')}
                        >
                            About Us
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/studio')}
                            leftIcon={<Play className="w-4 h-4" />}
                        >
                            Launch Studio
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    {/* Animated Icon */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block mb-8"
                    >
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center border border-indigo-500/20 backdrop-blur-xl">
                            <Wand2 className="w-12 h-12 text-indigo-400" />
                        </div>
                    </motion.div>

                    <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
                        <span className="linear-text-gradient">Build interfaces</span>
                        <br />
                        <span className="text-white">with your words</span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
                        Next-generation UI platform powered by <span className="text-indigo-400 font-semibold">Tambo AI</span>
                    </p>
                    <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
                        Convert natural language into production-ready interfaces in seconds
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/studio')}
                            className="linear-btn-primary px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2"
                        >
                            <Rocket className="w-5 h-5" />
                            Start Building
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/templates')}
                            className="linear-btn-secondary px-8 py-4 rounded-xl text-lg font-semibold"
                        >
                            View Examples
                        </motion.button>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
                    {[
                        {
                            icon: Brain,
                            title: 'AI-Powered',
                            description: 'Tambo AI understands your intent and creates perfect layouts',
                            gradient: 'from-purple-500 to-pink-500'
                        },
                        {
                            icon: Zap,
                            title: 'Instant Results',
                            description: 'Watch your UI materialize in real-time as you type',
                            gradient: 'from-yellow-500 to-orange-500'
                        },
                        {
                            icon: Code,
                            title: 'Export Anywhere',
                            description: 'Production-ready code for React, Vue, or HTML',
                            gradient: 'from-blue-500 to-cyan-500'
                        },
                        {
                            icon: Palette,
                            title: 'Beautiful Designs',
                            description: 'Modern interfaces with glassmorphism and animations',
                            gradient: 'from-green-500 to-emerald-500'
                        },
                        {
                            icon: Sparkles,
                            title: 'Smart Suggestions',
                            description: 'AI analyzes and recommends improvements',
                            gradient: 'from-indigo-500 to-purple-500'
                        },
                        {
                            icon: Download,
                            title: 'Project Management',
                            description: 'Save, load, and manage multiple projects',
                            gradient: 'from-red-500 to-pink-500'
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="linear-card p-8 group cursor-pointer"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Demo Preview */}
                {/* Demo Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-32 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative linear-card p-1 overflow-hidden bg-[#0a0a0f] rounded-2xl">
                        <div className="aspect-video bg-[#0f111a] rounded-xl flex items-center justify-center relative overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent" />

                            {/* Glowing Orbs */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity }}
                                className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"
                            />
                            <motion.div
                                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
                            />

                            <div className="text-center relative z-10 px-8">
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="mb-8 relative inline-block"
                                >
                                    <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse"></div>
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1a1c2e] to-[#0f111a] border border-indigo-500/30 flex items-center justify-center relative shadow-2xl shadow-indigo-500/20">
                                        <Sparkles className="w-12 h-12 text-indigo-400" />
                                    </div>

                                    {/* Floating badges */}
                                    <motion.div
                                        animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                        className="absolute -right-12 -top-4 bg-[#1a1c2e]/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-purple-300 shadow-xl"
                                    >
                                        AI Powered
                                    </motion.div>
                                    <motion.div
                                        animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                                        className="absolute -left-12 -bottom-4 bg-[#1a1c2e]/90 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-indigo-300 shadow-xl"
                                    >
                                        Generative
                                    </motion.div>
                                </motion.div>

                                <h3 className="text-5xl font-bold mb-4 tracking-tight">
                                    Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Tambo AI</span>
                                </h3>
                                <p className="text-slate-400 text-xl mb-8 font-light max-w-2xl mx-auto">
                                    Experience the future of UI development where code writes itself.
                                </p>

                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => navigate('/studio')}
                                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                    >
                                        <Play className="w-5 h-5 fill-current" />
                                        Launch Studio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Components', value: '18+', icon: Palette },
                        { label: 'Export Formats', value: '4', icon: Download },
                        { label: 'AI Engine', value: 'Tambo', icon: Brain },
                        { label: 'Generation', value: '<3s', icon: Zap },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + idx * 0.1 }}
                            className="linear-card p-6 text-center group hover:scale-105 transition-transform"
                        >
                            <stat.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <p className="text-4xl font-bold linear-text-gradient mb-2">{stat.value}</p>
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-32 pt-12 border-t border-white/5 text-center">
                    <p className="text-slate-500 text-sm">
                        © 2026 PromptCraft AI. Powered by Tambo AI Technology.
                    </p>
                </div>
            </div>
        </div>
    );
};
