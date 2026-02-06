export type ComponentType =
    | 'Card'
    | 'Table'
    | 'Form'
    | 'Chart'
    | 'Button'
    | 'Map'
    | 'Sidebar'
    | 'Tabs'
    | 'Modal'
    | 'Dashboard'
    | 'Input'
    | 'Header'
    | 'Footer'
    | 'Grid'
    | 'List'
    | 'Graph'
    | 'GlassCard'
    | 'Chat';

export interface TamboComponent {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    children?: TamboComponent[];
    layout?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface LayoutSchema {
    id: string;
    name: string;
    description: string;
    components: TamboComponent[];
    theme?: 'light' | 'dark';
    responsive?: boolean;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail?: string;
    schema: LayoutSchema;
}

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    schema: LayoutSchema;
}

export interface HistoryState {
    past: LayoutSchema[];
    present: LayoutSchema;
    future: LayoutSchema[];
}
