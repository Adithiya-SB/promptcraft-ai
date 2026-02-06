import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import { templates } from '@/templates';
import { useAppStore } from '@/store';

export const TemplatesPage: React.FC = () => {
    const navigate = useNavigate();
    const { setCurrentSchema, setCurrentPrompt } = useAppStore();

    const handleTemplateClick = (template: typeof templates[0]) => {
        setCurrentSchema(template.schema);
        setCurrentPrompt(template.description);
        navigate('/studio');
    };

    const categories = Array.from(new Set(templates.map(t => t.category)));

    return (
        <div className="min-h-screen gradient-bg">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="glass-strong fixed top-0 left-0 right-0 z-50 px-6 py-4"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-8 h-8 text-primary-500" />
                        <span className="text-2xl font-bold text-gradient">PromptCraft AI</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
                        >
                            <Home className="w-5 h-5 inline mr-2" />
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/studio')}
                            className="px-6 py-2 rounded-full gradient-primary text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Launch Studio
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-gradient mb-4">
                        Template Gallery
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Start with a professionally designed template and customize it to your needs
                    </p>
                </motion.div>

                {categories.map((category, catIdx) => (
                    <div key={category} className="mb-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: catIdx * 0.1 }}
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
                        >
                            {category}
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {templates
                                .filter(t => t.category === category)
                                .map((template, idx) => (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        onClick={() => handleTemplateClick(template)}
                                        className="glass rounded-2xl p-6 smooth-shadow-lg hover:smooth-shadow-xl transition-all cursor-pointer group"
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                                            <div className="text-center">
                                                <Sparkles className="w-12 h-12 text-primary-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {template.schema.components.length} components
                                                </p>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {template.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            {template.description}
                                        </p>

                                        <button className="w-full py-2 px-4 rounded-lg gradient-primary text-white font-medium hover:opacity-90 transition-opacity">
                                            Use Template
                                        </button>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
