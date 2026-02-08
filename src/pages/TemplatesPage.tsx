import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { templates } from '@/templates';
import { useAppStore } from '@/store';

export const TemplatesPage: React.FC = () => {
    const navigate = useNavigate();
    const { setCurrentSchema, setCurrentPrompt } = useAppStore();

    const handleTemplateClick = (e: React.MouseEvent, template: typeof templates[0]) => {
        e.preventDefault();
        e.stopPropagation();

        setCurrentSchema(template.schema);
        setCurrentPrompt(template.description);

        // Small delay to ensure state updates propagate before navigation
        setTimeout(() => {
            navigate('/studio');
        }, 10);
    };

    const categories = Array.from(new Set(templates.map(t => t.category)));

    return (
        <div className="relative p-6 space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-slate-200 mb-2">
                    Template Gallery
                </h1>
                <p className="text-slate-400">
                    Start with a professionally designed template and customize it to your needs
                </p>
            </motion.div>

            {categories.map((category, catIdx) => (
                <div key={category} className="mb-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: catIdx * 0.1 }}
                        className="text-xl font-bold text-slate-200 mb-4"
                    >
                        {category}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {templates
                            .filter(t => t.category === category)
                            .map((template, idx) => (
                                <motion.div
                                    key={template.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    onClick={(e) => handleTemplateClick(e, template)}
                                    className="group relative bg-[#0b0e14] border border-white/[0.06] hover:border-indigo-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                                >
                                    {/* Preview Area */}
                                    <div className="aspect-video bg-[#0f111a] relative overflow-hidden group-hover:bg-[#131620] transition-colors">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-indigo-500/40 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500" />
                                        </div>
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors mb-1">
                                            {template.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                            {template.description}
                                        </p>
                                        <button className="w-full py-1.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all pointer-events-none">
                                            Use Template
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

