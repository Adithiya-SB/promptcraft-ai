import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, Code2 } from 'lucide-react';
import { LayoutSchema } from '@/types';
import { codeExporter } from '@/utils/exporters';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ExportModalProps {
    schema: LayoutSchema;
    isOpen: boolean;
    onClose: () => void;
}

type ExportFormat = 'react' | 'html' | 'vue' | 'json';

export const ExportModal: React.FC<ExportModalProps> = ({ schema, isOpen, onClose }) => {
    const [format, setFormat] = useState<ExportFormat>('react');
    const [copied, setCopied] = useState(false);

    const formats = [
        { id: 'react' as ExportFormat, label: 'React + TS', language: 'tsx' },
        { id: 'html' as ExportFormat, label: 'HTML/CSS', language: 'html' },
        { id: 'vue' as ExportFormat, label: 'Vue.js', language: 'vue' },
        { id: 'json' as ExportFormat, label: 'JSON', language: 'json' },
    ];

    const getCode = (): string => {
        switch (format) {
            case 'react':
                return codeExporter.exportReact(schema);
            case 'html':
                return codeExporter.exportHTML(schema);
            case 'vue':
                return codeExporter.exportVue(schema);
            case 'json':
                return codeExporter.exportJSON(schema);
            default:
                return '';
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getCode());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleDownload = () => {
        const code = getCode();
        const extensions = { react: 'tsx', html: 'html', vue: 'vue', json: 'json' };
        const filename = `${schema.name.toLowerCase().replace(/\s+/g, '-')}.${extensions[format]}`;

        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const currentFormat = formats.find(f => f.id === format);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Code2 className="w-6 h-6 text-indigo-400" />
                                    <h2 className="text-2xl font-bold text-slate-100">Export Code</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            {/* Format Selector */}
                            <div className="flex gap-2 p-4 border-b border-slate-800">
                                {formats.map((fmt) => (
                                    <button
                                        key={fmt.id}
                                        onClick={() => setFormat(fmt.id)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${format === fmt.id
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                            }`}
                                    >
                                        {fmt.label}
                                    </button>
                                ))}
                            </div>

                            {/* Code Preview */}
                            <div className="flex-1 overflow-auto p-4 bg-slate-950">
                                <SyntaxHighlighter
                                    language={currentFormat?.language || 'typescript'}
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: '0.75rem',
                                        fontSize: '0.875rem',
                                    }}
                                    showLineNumbers
                                >
                                    {getCode()}
                                </SyntaxHighlighter>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 p-4 border-t border-slate-800">
                                <button
                                    onClick={handleCopy}
                                    className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            Copy to Clipboard
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download File
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
