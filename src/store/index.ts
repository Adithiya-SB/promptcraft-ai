import { create } from 'zustand';
import { LayoutSchema, Project, HistoryState } from '@/types';

interface AppState {
    // Theme
    theme: 'light' | 'dark';
    toggleTheme: () => void;

    // Current Project
    currentProject: Project | null;
    setCurrentProject: (project: Project) => void;

    // Layout Schema
    currentSchema: LayoutSchema | null;
    setCurrentSchema: (schema: LayoutSchema) => void;

    // History (Undo/Redo)
    history: HistoryState;
    undo: () => void;
    redo: () => void;
    addToHistory: (schema: LayoutSchema) => void;

    // UI State
    isGenerating: boolean;
    setIsGenerating: (value: boolean) => void;

    selectedComponentId: string | null;
    setSelectedComponentId: (id: string | null) => void;

    // Prompt
    currentPrompt: string;
    setCurrentPrompt: (prompt: string) => void;

    // Saved Projects
    savedProjects: Project[];
    saveProject: (project: Project) => void;
    loadProject: (id: string) => void;
    deleteProject: (id: string) => void;
    // Generation History
    generationHistory: { id: string; prompt: string; timestamp: number; schema: LayoutSchema }[];
    addGeneration: (item: { prompt: string; schema: LayoutSchema }) => void;
    clearHistory: () => void;
}

import { persist } from 'zustand/middleware';

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Theme
            theme: 'dark',
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                if (typeof document !== 'undefined') {
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }
                return { theme: newTheme };
            }),

            // Current Project
            currentProject: null,
            setCurrentProject: (project) => set({ currentProject: project }),

            // Layout Schema
            currentSchema: null,
            setCurrentSchema: (schema) => {
                set({ currentSchema: schema });
                get().addToHistory(schema);
            },

            // History (Undo/Redo)
            history: {
                past: [],
                present: null as any,
                future: [],
            },

            undo: () => set((state) => {
                if (state.history.past.length === 0) return state;

                const previous = state.history.past[state.history.past.length - 1];
                const newPast = state.history.past.slice(0, state.history.past.length - 1);

                return {
                    history: {
                        past: newPast,
                        present: previous,
                        future: [state.history.present, ...state.history.future],
                    },
                    currentSchema: previous,
                };
            }),

            redo: () => set((state) => {
                if (state.history.future.length === 0) return state;

                const next = state.history.future[0];
                const newFuture = state.history.future.slice(1);

                return {
                    history: {
                        past: [...state.history.past, state.history.present],
                        present: next,
                        future: newFuture,
                    },
                    currentSchema: next,
                };
            }),

            addToHistory: (schema) => set((state) => {
                if (!schema) return state;

                return {
                    history: {
                        past: state.history.present
                            ? [...state.history.past, state.history.present]
                            : state.history.past,
                        present: schema,
                        future: [],
                    },
                };
            }),

            // Generation History (Persistent)
            generationHistory: [],
            addGeneration: (item) => set((state) => ({
                generationHistory: [
                    {
                        id: crypto.randomUUID(),
                        timestamp: Date.now(),
                        ...item
                    },
                    ...state.generationHistory
                ]
            })),
            clearHistory: () => set({ generationHistory: [] }),

            // UI State
            isGenerating: false,
            setIsGenerating: (value) => set({ isGenerating: value }),

            selectedComponentId: null,
            setSelectedComponentId: (id) => set({ selectedComponentId: id }),

            // Prompt
            currentPrompt: '',
            setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),

            // Saved Projects
            savedProjects: [],
            saveProject: (project) => set((state) => ({
                savedProjects: [...state.savedProjects.filter(p => p.id !== project.id), project],
            })),

            loadProject: (id) => {
                const project = get().savedProjects.find(p => p.id === id);
                if (project) {
                    set({
                        currentProject: project,
                        currentSchema: project.schema,
                    });
                }
            },

            deleteProject: (id) => set((state) => ({
                savedProjects: state.savedProjects.filter(p => p.id !== id),
            })),
        }),
        {
            name: 'promptcraft-storage',
            partialize: (state) => ({
                theme: state.theme,
                savedProjects: state.savedProjects,
                generationHistory: state.generationHistory,
                currentSchema: state.currentSchema,
                currentPrompt: state.currentPrompt
            }),
        }
    )
);
