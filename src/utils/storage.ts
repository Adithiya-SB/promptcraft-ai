import { LayoutSchema } from '@/types';

const STORAGE_KEY = 'promptcraft_projects';
const PREFERENCES_KEY = 'promptcraft_preferences';

export interface Project {
    id: string;
    name: string;
    description: string;
    schema: LayoutSchema;
    prompt?: string;
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    showComponentLibrary: boolean;
    showAISuggestions: boolean;
    autoSave: boolean;
}

export class StorageService {
    // Projects
    saveProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
        const projects = this.getAllProjects();
        const now = new Date().toISOString();

        const newProject: Project = {
            ...project,
            id: this.generateId(),
            createdAt: now,
            updatedAt: now
        };

        projects.push(newProject);
        this.saveProjects(projects);
        return newProject;
    }

    updateProject(id: string, updates: Partial<Project>): Project | null {
        const projects = this.getAllProjects();
        const index = projects.findIndex(p => p.id === id);

        if (index === -1) return null;

        projects[index] = {
            ...projects[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.saveProjects(projects);
        return projects[index];
    }

    deleteProject(id: string): boolean {
        const projects = this.getAllProjects();
        const filtered = projects.filter(p => p.id !== id);

        if (filtered.length === projects.length) return false;

        this.saveProjects(filtered);
        return true;
    }

    getProject(id: string): Project | null {
        const projects = this.getAllProjects();
        return projects.find(p => p.id === id) || null;
    }

    getAllProjects(): Project[] {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading projects:', error);
            return [];
        }
    }

    private saveProjects(projects: Project[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        } catch (error) {
            console.error('Error saving projects:', error);
            // Handle quota exceeded
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                alert('Storage quota exceeded. Please delete some projects.');
            }
        }
    }

    // Preferences
    getPreferences(): UserPreferences {
        try {
            const data = localStorage.getItem(PREFERENCES_KEY);
            return data ? JSON.parse(data) : this.getDefaultPreferences();
        } catch (error) {
            console.error('Error loading preferences:', error);
            return this.getDefaultPreferences();
        }
    }

    savePreferences(preferences: Partial<UserPreferences>): void {
        const current = this.getPreferences();
        const updated = { ...current, ...preferences };

        try {
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    }

    private getDefaultPreferences(): UserPreferences {
        return {
            theme: 'dark',
            showComponentLibrary: true,
            showAISuggestions: true,
            autoSave: true
        };
    }

    // Utilities
    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    exportProjects(): string {
        const projects = this.getAllProjects();
        return JSON.stringify(projects, null, 2);
    }

    importProjects(jsonData: string): boolean {
        try {
            const projects = JSON.parse(jsonData);
            if (!Array.isArray(projects)) {
                throw new Error('Invalid format');
            }
            this.saveProjects(projects);
            return true;
        } catch (error) {
            console.error('Error importing projects:', error);
            return false;
        }
    }

    clearAllData(): void {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PREFERENCES_KEY);
    }

    getStorageUsage(): { used: number; total: number; percentage: number } {
        let used = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                used += localStorage[key].length + key.length;
            }
        }

        const total = 5 * 1024 * 1024; // 5MB typical limit
        return {
            used,
            total,
            percentage: (used / total) * 100
        };
    }
}

export const storageService = new StorageService();
