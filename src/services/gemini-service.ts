import { GoogleGenerativeAI } from '@google/generative-ai';
import { LayoutSchema } from '@/types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn('Gemini API key not found. AI generation will use fallback mode.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SYSTEM_PROMPT = `You are an expert UI/UX designer and developer. Your task is to convert natural language descriptions into structured UI layouts.

You must respond with ONLY a valid JSON object following this exact schema:

{
  "id": "unique-id",
  "name": "Layout Name",
  "description": "Brief description",
  "components": [
    {
      "id": "component-id",
      "type": "ComponentType",
      "props": { /* component-specific props */ },
      "layout": { "x": 0, "y": 0, "width": 12, "height": 4 }
    }
  ],
  "theme": "dark",
  "responsive": true
}

Available ComponentTypes: Card, Table, Form, Chart, Button, Map, Sidebar, Tabs, Modal, Dashboard, Input, Header, Footer, Grid, List, Graph, GlassCard, Chat

Layout Grid: 12 columns wide, components can span multiple rows/columns
- x: column position (0-11)
- y: row position (0+)
- width: columns to span (1-12)
- height: rows to span (1+)

Component Props Examples:
- Card: { title, value, trend, icon, description, image, action }
- Chart: { title, chartType: "line"|"bar"|"area"|"pie", data: [{name, value, value2}] }
- Table: { title, columns: [], data: [], searchable, sortable }
- Form: { title, fields: [{name, label, type, required}], submitText }
- Header: { title, subtitle }
- Map: { title, markers: [] }
- Chat: { title, assistantName, initialMessages: [] }

Design Principles:
1. Use Header component at top (y:0, width:12, height:1)
2. Place stat cards in a row (width:3 each for 4 cards)
3. Charts should be larger (width:6-8, height:4-6)
4. Tables for data lists (width:4-12, height:4-8)
5. Use dark theme by default
6. Ensure components don't overlap

Respond with ONLY the JSON, no markdown, no explanation.`;

export interface GenerationOptions {
    useStreaming?: boolean;
    temperature?: number;
    maxTokens?: number;
}

export class GeminiService {
    private model: any;
    private cache: Map<string, LayoutSchema> = new Map();

    constructor() {
        if (genAI) {
            this.model = genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                }
            });
        }
    }

    async generateLayout(
        prompt: string,
        options: GenerationOptions = {}
    ): Promise<LayoutSchema> {
        // Check cache first
        const cacheKey = `${prompt}-${options.temperature || 0.7}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        if (!this.model) {
            const errorMsg = 'Gemini API not initialized. API Key: ' + (API_KEY ? 'Present' : 'Missing');
            console.error('❌', errorMsg);
            throw new Error(errorMsg);
        }

        try {
            const fullPrompt = `${SYSTEM_PROMPT}\n\nUser Request: ${prompt}`;

            const result = await this.model.generateContent(fullPrompt);
            const response = await result.response;
            const text = response.text();

            // Parse the JSON response
            const schema = this.parseResponse(text);

            // Cache the result
            this.cache.set(cacheKey, schema);

            return schema;
        } catch (error: any) {
            console.error('❌ Gemini API error:', error);
            console.error('❌ Error message:', error?.message);
            console.error('❌ Error details:', JSON.stringify(error, null, 2));
            throw error;
        }
    }

    async generateSuggestions(currentSchema: LayoutSchema): Promise<string[]> {
        if (!this.model) {
            return this.getFallbackSuggestions(currentSchema);
        }

        try {
            const prompt = `Analyze this UI layout and provide 3-5 specific improvement suggestions:
${JSON.stringify(currentSchema, null, 2)}

Respond with a JSON array of suggestion strings. Each suggestion should be actionable and specific.
Example: ["Add a search bar to the header", "Use a pie chart for category distribution", "Add pagination to the table"]

Respond with ONLY the JSON array, no markdown.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Extract JSON from response
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return this.getFallbackSuggestions(currentSchema);
        } catch (error) {
            console.error('Error generating suggestions:', error);
            return this.getFallbackSuggestions(currentSchema);
        }
    }

    async enhancePrompt(prompt: string): Promise<string> {
        if (!this.model) {
            return prompt;
        }

        try {
            const enhancePrompt = `Enhance this UI description to be more detailed and specific, but keep it concise (max 2 sentences):
"${prompt}"

Respond with ONLY the enhanced description, no quotes, no explanation.`;

            const result = await this.model.generateContent(enhancePrompt);
            const response = await result.response;
            return response.text().trim();
        } catch (error) {
            console.error('Error enhancing prompt:', error);
            return prompt;
        }
    }

    private parseResponse(text: string): LayoutSchema {
        // Remove markdown code blocks if present
        let cleanText = text.trim();
        cleanText = cleanText.replace(/```json\s*/g, '');
        cleanText = cleanText.replace(/```\s*/g, '');
        cleanText = cleanText.trim();

        try {
            const parsed = JSON.parse(cleanText);

            // Validate the schema
            if (!parsed.components || !Array.isArray(parsed.components)) {
                throw new Error('Invalid schema: missing components array');
            }

            // Ensure all required fields exist
            return {
                id: parsed.id || this.generateId(),
                name: parsed.name || 'Generated Layout',
                description: parsed.description || '',
                components: parsed.components.map((c: any) => ({
                    id: c.id || this.generateId(),
                    type: c.type,
                    props: c.props || {},
                    layout: c.layout || { x: 0, y: 0, width: 12, height: 4 }
                })),
                theme: parsed.theme || 'dark',
                responsive: parsed.responsive !== false
            };
        } catch (error) {
            console.error('Failed to parse Gemini response:', error);
            console.error('Response text:', cleanText);
            throw new Error('Failed to parse AI response. Please try again.');
        }
    }

    private getFallbackSuggestions(schema: LayoutSchema): string[] {
        const suggestions: string[] = [];
        const components = schema.components;

        // Header Check
        const hasHeader = components.some(c => c.type === 'Header');
        if (!hasHeader) {
            suggestions.push('Add a Header component to define the page structure.');
        }

        // Dashboard Logic
        const charts = components.filter(c => c.type === 'Chart');
        const statCards = components.filter(c => c.type === 'Card' || c.type === 'GlassCard');

        if (charts.length > 0 && statCards.length === 0) {
            suggestions.push('Add Stat Cards above charts to summarize key metrics.');
        }

        // Form Logic
        const forms = components.filter(c => c.type === 'Form');
        if (forms.length > 0) {
            suggestions.push('Group related form fields using a "GlassCard" container.');
        }

        // Navigation Logic
        const hasSidebar = components.some(c => c.type === 'Sidebar');
        if (!hasSidebar && components.length > 3) {
            suggestions.push('Add a Sidebar for better navigation in complex layouts.');
        }

        // Visual Polish
        if (components.length > 0 && !components.some(c => c.type === 'GlassCard')) {
            suggestions.push('Wrap sections in "GlassCard" components for a premium modern look.');
        }

        // Data Display
        const tables = components.filter(c => c.type === 'Table');
        if (tables.length > 0 && charts.length === 0) {
            suggestions.push('Visualize your table data with a Bar or Line Chart.');
        }

        // Fallbacks if perfectly optimized
        if (suggestions.length === 0) {
            suggestions.push('Layout looks great! Try adding a "Theme Toggle" feature.');
            suggestions.push('Enhance visual hierarchy by increasing Header size.');
        }

        return suggestions.slice(0, 4);
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    clearCache(): void {
        this.cache.clear();
    }
}

export const geminiService = new GeminiService();
