import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Folder, Trash2, Download, Upload, Clock } from 'lucide-react';
import { storageService, Project } from '@/utils/storage';
import { LayoutSchema } from '@/types';

interface ProjectManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onLoadProject: (schema: LayoutSchema, prompt: string) => void;
    currentSchema: LayoutSchema | null;
    currentPrompt: string;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
    isOpen,
    onClose,
    onLoadProject,
    currentSchema,
    currentPrompt,
}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadProjects();
        }
    }, [isOpen]);

    const loadProjects = () => {
        const allProjects = storageService.getAllProjects();
        setProjects(allProjects);
    };

    const handleSave = () => {
        if (!currentSchema || !projectName.trim()) return;

        storageService.saveProject({
            name: projectName,
            description: currentSchema.description,
            schema: currentSchema,
            prompt: currentPrompt,
        });

        setProjectName('');
        loadProjects();
    };

    const handleLoad = (project: Project) => {
        onLoadProject(project.schema, project.prompt || '');
        onClose();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            storageService.deleteProject(id);
            loadProjects();
        }
    };

    const handleExport = () => {
        const data = storageService.exportProjects();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'promptcraft-projects.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target?.result as string;
            if (storageService.importProjects(data)) {
                loadProjects();
                alert('Projects imported successfully!');
            } else {
                alert('Failed to import projects. Invalid format.');
            }
        };
        reader.readAsText(file);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-3xl max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Folder className="w-6 h-6 text-indigo-400" />
                                    <h2 className="text-2xl font-bold text-slate-100">Project Manager</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            {/* Save Current */}
                            {currentSchema && (
                                <div className="p-6 border-b border-slate-800 bg-slate-800/30">
                                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Save Current Project</h3>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            placeholder="Project name..."
                                            className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200"
                                        />
                                        <button
                                            onClick={handleSave}
                                            disabled={!projectName.trim()}
                                            className="px-6 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Projects List */}
                            <div className="flex-1 overflow-auto p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-slate-300">
                                        Saved Projects ({projects.length})
                                    </h3>
                                    <div className="flex gap-2">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept=".json"
                                                onChange={handleImport}
                                                className="hidden"
                                            />
                                            <div className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                                                <Upload className="w-4 h-4 text-slate-400" />
                                            </div>
                                        </label>
                                        <button
                                            onClick={handleExport}
                                            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                                            title="Export all projects"
                                        >
                                            <Download className="w-4 h-4 text-slate-400" />
                                        </button>
                                    </div>
                                </div>

                                {projects.length === 0 ? (
                                    <div className="text-center text-slate-500 py-12">
                                        <Folder className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                        <p>No saved projects yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {projects.map((project) => (
                                            <motion.div
                                                key={project.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="group p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 cursor-pointer" onClick={() => handleLoad(project)}>
                                                        <h4 className="font-semibold text-slate-100 mb-1">
                                                            {project.name}
                                                        </h4>
                                                        <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDate(project.updatedAt)}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
