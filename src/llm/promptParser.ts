import { LayoutSchema, TamboComponent } from '@/types';

const EXAMPLE_PROMPTS = [
    'Create a CRM dashboard with pipeline stages, contacts table, and revenue metrics',
    'Build a dark-themed SaaS landing page with hero, features grid, and pricing plans',
    'Design an AI chat interface with message history, sidebar, and input area',
    'Make a crypto portfolio tracker with real-time charts, wallet balance, and transfer form',
    'Generate an analytics dashboard with traffic insights, user growth charts, and activity feed',
];

export function parsePrompt(prompt: string): LayoutSchema {
    const lowercasePrompt = prompt.toLowerCase();

    // Detect intent and generate appropriate schema
    if (lowercasePrompt.includes('dashboard')) {
        return generateDashboardSchema(prompt);
    } else if (lowercasePrompt.includes('table') || lowercasePrompt.includes('list')) {
        return generateTableSchema(prompt);
    } else if (lowercasePrompt.includes('form') || lowercasePrompt.includes('input')) {
        return generateFormSchema(prompt);
    } else if (lowercasePrompt.includes('chart') || lowercasePrompt.includes('analytics')) {
        return generateChartSchema(prompt);
    } else if (lowercasePrompt.includes('card') || lowercasePrompt.includes('grid')) {
        return generateCardGridSchema(prompt);
    } else {
        return generateDefaultSchema(prompt);
    }
}

function generateDashboardSchema(prompt: string): LayoutSchema {
    const components: TamboComponent[] = [
        {
            id: 'header-1',
            type: 'Header',
            props: {
                title: extractTitle(prompt),
                subtitle: 'Real-time dashboard overview',
            },
            layout: { x: 0, y: 0, width: 12, height: 1 },
        },
        {
            id: 'card-1',
            type: 'Card',
            props: {
                title: 'Total Items',
                value: '1,234',
                trend: '+12%',
                icon: 'package',
            },
            layout: { x: 0, y: 1, width: 3, height: 2 },
        },
        {
            id: 'card-2',
            type: 'Card',
            props: {
                title: 'Active Users',
                value: '856',
                trend: '+8%',
                icon: 'users',
            },
            layout: { x: 3, y: 1, width: 3, height: 2 },
        },
        {
            id: 'card-3',
            type: 'Card',
            props: {
                title: 'Revenue',
                value: '$45.2K',
                trend: '+23%',
                icon: 'dollar-sign',
            },
            layout: { x: 6, y: 1, width: 3, height: 2 },
        },
        {
            id: 'card-4',
            type: 'Card',
            props: {
                title: 'Alerts',
                value: '12',
                trend: '-5%',
                icon: 'alert-circle',
            },
            layout: { x: 9, y: 1, width: 3, height: 2 },
        },
        {
            id: 'chart-1',
            type: 'Chart',
            props: {
                title: 'Analytics Overview',
                chartType: 'line',
                data: generateChartData(),
            },
            layout: { x: 0, y: 3, width: 8, height: 4 },
        },
        {
            id: 'table-1',
            type: 'Table',
            props: {
                title: 'Recent Activity',
                columns: ['Name', 'Status', 'Date', 'Action'],
                data: generateTableData(),
            },
            layout: { x: 8, y: 3, width: 4, height: 4 },
        },
    ];

    if (prompt.toLowerCase().includes('map')) {
        components.push({
            id: 'map-1',
            type: 'Map',
            props: {
                title: 'Location Overview',
                markers: [],
            },
            layout: { x: 0, y: 7, width: 12, height: 4 },
        });
    }

    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components,
        theme: 'dark',
        responsive: true,
    };
}

function generateTableSchema(prompt: string): LayoutSchema {
    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components: [
            {
                id: 'header-1',
                type: 'Header',
                props: {
                    title: extractTitle(prompt),
                    subtitle: 'Data management interface',
                },
                layout: { x: 0, y: 0, width: 12, height: 1 },
            },
            {
                id: 'table-1',
                type: 'Table',
                props: {
                    title: 'Data Table',
                    columns: ['ID', 'Name', 'Status', 'Created', 'Actions'],
                    data: generateTableData(10),
                    searchable: true,
                    sortable: true,
                },
                layout: { x: 0, y: 1, width: 12, height: 8 },
            },
        ],
        theme: 'dark',
        responsive: true,
    };
}

function generateFormSchema(prompt: string): LayoutSchema {
    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components: [
            {
                id: 'header-1',
                type: 'Header',
                props: {
                    title: extractTitle(prompt),
                    subtitle: 'Fill in the details below',
                },
                layout: { x: 0, y: 0, width: 12, height: 1 },
            },
            {
                id: 'form-1',
                type: 'Form',
                props: {
                    title: 'Form',
                    fields: [
                        { name: 'name', label: 'Name', type: 'text', required: true },
                        { name: 'email', label: 'Email', type: 'email', required: true },
                        { name: 'phone', label: 'Phone', type: 'tel' },
                        { name: 'message', label: 'Message', type: 'textarea', rows: 4 },
                    ],
                    submitText: 'Submit',
                },
                layout: { x: 3, y: 2, width: 6, height: 6 },
            },
        ],
        theme: 'dark',
        responsive: true,
    };
}

function generateChartSchema(prompt: string): LayoutSchema {
    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components: [
            {
                id: 'header-1',
                type: 'Header',
                props: {
                    title: extractTitle(prompt),
                    subtitle: 'Analytics and insights',
                },
                layout: { x: 0, y: 0, width: 12, height: 1 },
            },
            {
                id: 'chart-1',
                type: 'Chart',
                props: {
                    title: 'Line Chart',
                    chartType: 'line',
                    data: generateChartData(),
                },
                layout: { x: 0, y: 1, width: 6, height: 4 },
            },
            {
                id: 'chart-2',
                type: 'Chart',
                props: {
                    title: 'Bar Chart',
                    chartType: 'bar',
                    data: generateChartData(),
                },
                layout: { x: 6, y: 1, width: 6, height: 4 },
            },
            {
                id: 'chart-3',
                type: 'Chart',
                props: {
                    title: 'Area Chart',
                    chartType: 'area',
                    data: generateChartData(),
                },
                layout: { x: 0, y: 5, width: 12, height: 4 },
            },
        ],
        theme: 'dark',
        responsive: true,
    };
}

function generateCardGridSchema(prompt: string): LayoutSchema {
    const cards: TamboComponent[] = [];

    for (let i = 0; i < 6; i++) {
        cards.push({
            id: `card-${i + 1}`,
            type: 'Card',
            props: {
                title: `Item ${i + 1}`,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                image: `https://picsum.photos/400/300?random=${i}`,
                action: 'View Details',
            },
            layout: {
                x: (i % 3) * 4,
                y: Math.floor(i / 3) * 3 + 1,
                width: 4,
                height: 3
            },
        });
    }

    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components: [
            {
                id: 'header-1',
                type: 'Header',
                props: {
                    title: extractTitle(prompt),
                    subtitle: 'Browse our collection',
                },
                layout: { x: 0, y: 0, width: 12, height: 1 },
            },
            ...cards,
        ],
        theme: 'dark',
        responsive: true,
    };
}

function generateDefaultSchema(prompt: string): LayoutSchema {
    return {
        id: generateId(),
        name: extractTitle(prompt),
        description: prompt,
        components: [
            {
                id: 'header-1',
                type: 'Header',
                props: {
                    title: extractTitle(prompt),
                    subtitle: 'Generated from your prompt',
                },
                layout: { x: 0, y: 0, width: 12, height: 1 },
            },
            {
                id: 'card-1',
                type: 'Card',
                props: {
                    title: 'Welcome',
                    description: 'Your app has been generated. Customize it using the controls on the right.',
                },
                layout: { x: 0, y: 1, width: 12, height: 3 },
            },
        ],
        theme: 'dark',
        responsive: true,
    };
}

function extractTitle(prompt: string): string {
    // Remove common action verbs and articles to find the subject
    const cleanPrompt = prompt
        .replace(/^(create|build|design|make|generate|show|give|render)\s+/i, '')
        .replace(/\s+(in|with|using|for)\s+.*$/i, '') // Remove trailing context like "in dark mode"
        .replace(/\b(a|an|the)\b/gi, '')
        .trim();

    // Capitalize words
    const words = cleanPrompt.split(/\s+/);
    const titleWords = words.slice(0, 4).map(w =>
        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

    const title = titleWords.join(' ').trim();
    return title || 'New Dashboard';
}

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateChartData() {
    return Array.from({ length: 7 }, (_, i) => ({
        name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        value: Math.floor(Math.random() * 100) + 50,
        value2: Math.floor(Math.random() * 100) + 50,
    }));
}

function generateTableData(count = 5) {
    const statuses = ['Active', 'Pending', 'Completed', 'Cancelled'];
    return Array.from({ length: count }, (_, i) => ({
        id: `#${1000 + i}`,
        name: `Item ${i + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        action: 'View',
    }));
}

export { EXAMPLE_PROMPTS };
