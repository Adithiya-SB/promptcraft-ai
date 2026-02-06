import { z } from 'zod';
import React from 'react';
import { Card } from '@/components/tambo/Card';
import { Table } from '@/components/tambo/Table';
import { Chart } from '@/components/tambo/Chart';
import { Form } from '@/components/tambo/Form';
import { Header } from '@/components/tambo/Header';
import { Map } from '@/components/tambo/Map';
import { Button } from '@/components/tambo/Button';
import { Graph } from '@/components/tambo/Graph';
import { GlassCard } from '@/components/tambo/GlassCard';
import { Chat } from '@/components/tambo/Chat';

export interface TamboRegisteredComponent {
    name: string;
    description: string;
    component: React.ComponentType<any>;
    propsSchema: z.ZodObject<any>;
}

// Component Registry
export const componentRegistry: TamboRegisteredComponent[] = [
    {
        name: 'Graph',
        description: 'Displays data as line, bar, or pie charts',
        component: Graph,
        propsSchema: z.object({
            data: z.array(z.object({
                name: z.string(),
                value: z.number()
            })),
            type: z.enum(['line', 'bar', 'pie']),
            title: z.string().optional(),
            color: z.string().optional()
        })
    },
    {
        name: 'Card',
        description: 'Display content in a card with optional icon, value, and trend',
        component: Card,
        propsSchema: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            value: z.string().optional(),
            trend: z.string().optional(),
            icon: z.string().optional(),
            image: z.string().optional(),
            action: z.string().optional()
        })
    },
    {
        name: 'GlassCard',
        description: 'Glass morphism card with hover effects',
        component: GlassCard,
        propsSchema: z.object({
            children: z.any(),
            className: z.string().optional()
        })
    },
    {
        name: 'Table',
        description: 'Display tabular data with columns and rows',
        component: Table,
        propsSchema: z.object({
            columns: z.array(z.object({
                key: z.string(),
                label: z.string(),
                sortable: z.boolean().optional()
            })),
            data: z.array(z.record(z.string(), z.any())),
            searchable: z.boolean().optional()
        })
    },
    {
        name: 'Chart',
        description: 'Display various chart types for data visualization',
        component: Chart,
        propsSchema: z.object({
            type: z.enum(['line', 'bar', 'area', 'pie']),
            data: z.array(z.record(z.string(), z.any())),
            title: z.string().optional(),
            xKey: z.string().optional(),
            yKey: z.string().optional()
        })
    },
    {
        name: 'Form',
        description: 'Create forms with various input fields',
        component: Form,
        propsSchema: z.object({
            fields: z.array(z.object({
                name: z.string(),
                label: z.string(),
                type: z.string(),
                placeholder: z.string().optional(),
                required: z.boolean().optional()
            })),
            submitLabel: z.string().optional()
        })
    },
    {
        name: 'Header',
        description: 'Page header with title and optional subtitle',
        component: Header,
        propsSchema: z.object({
            title: z.string(),
            subtitle: z.string().optional()
        })
    },
    {
        name: 'Map',
        description: 'Display interactive map',
        component: Map,
        propsSchema: z.object({
            center: z.object({
                lat: z.number(),
                lng: z.number()
            }),
            zoom: z.number().optional(),
            markers: z.array(z.object({
                lat: z.number(),
                lng: z.number(),
                label: z.string().optional()
            })).optional()
        })
    },
    {
        name: 'Button',
        description: 'Interactive button component',
        component: Button,
        propsSchema: z.object({
            label: z.string(),
            variant: z.enum(['primary', 'secondary', 'outline']).optional(),
            size: z.enum(['sm', 'md', 'lg']).optional(),
            icon: z.string().optional()
        })
    },
    {
        name: 'Chat',
        description: 'Full-featured chat interface with history and simulated AI responses',
        component: Chat,
        propsSchema: z.object({
            title: z.string().optional(),
            assistantName: z.string().optional(),
            accentColor: z.string().optional(),
            initialMessages: z.array(z.object({
                role: z.enum(['user', 'assistant']),
                content: z.string()
            })).optional()
        })
    }
];

// Helper function to get component by name
export const getComponentByName = (name: string): TamboRegisteredComponent | undefined => {
    return componentRegistry.find(comp => comp.name === name);
};

// Helper function to validate props against schema
export const validateComponentProps = (componentName: string, props: any): boolean => {
    const component = getComponentByName(componentName);
    if (!component) return false;

    try {
        component.propsSchema.parse(props);
        return true;
    } catch (error) {
        console.error(`Props validation failed for ${componentName}:`, error);
        return false;
    }
};
