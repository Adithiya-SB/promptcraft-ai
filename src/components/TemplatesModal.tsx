import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search, Sparkles, Layout } from 'lucide-react';
import { templates } from '@/templates';
import { LayoutSchema } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface TemplatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (schema: LayoutSchema, prompt: string) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
    isOpen,
    onClose,
    onLoad
}) => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

    const filteredTemplates = templates.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-5xl h-[80vh] flex flex-col bg-[#0b0e14] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-[#0f111a]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <Layout className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">Template Gallery</h2>
                            <p className="text-sm text-slate-400">Jumpstart your project with professionally designed layouts</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-lg hover:bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-white/[0.08] bg-[#0b0e14] flex gap-4 overflow-x-auto no-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${selectedCategory === category
                                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                : 'bg-white/[0.03] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                    <div className="flex-1" />
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-[#0f111a] border border-white/[0.08] rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 w-64"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#020617]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredTemplates.map(template => (
                            <div
                                key={template.id}
                                className="group relative bg-[#0b0e14] border border-white/[0.06] hover:border-indigo-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                                onClick={() => onLoad(template.schema, template.description)}
                            >
                                {/* Preview Area */}
                                <div className="aspect-video bg-[#0f111a] relative overflow-hidden group-hover:bg-[#131620] transition-colors">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-indigo-500/40 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500" />
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Badge variant="neutral" className="bg-black/50 backdrop-blur border-white/10 text-xs">
                                            {template.schema.components.length} Components
                                        </Badge>
                                    </div>
                                    {/* Abstract Grid Pattern */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-medium text-slate-200 group-hover:text-indigo-400 transition-colors">
                                            {template.name}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                                        {template.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                                            {template.category}
                                        </span>
                                        <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center gap-1">
                                            Use Template
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
