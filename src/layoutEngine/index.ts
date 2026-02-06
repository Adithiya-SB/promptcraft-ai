import { LayoutSchema, TamboComponent } from '@/types';

export function calculateLayout(components: TamboComponent[]): TamboComponent[] {
    // Auto-layout algorithm for responsive grid
    const gridColumns = 12;
    let currentY = 0;
    let currentX = 0;

    return components.map((component) => {
        if (component.layout) {
            return component;
        }

        // Default sizing based on component type
        const defaultSizes: Record<string, { width: number; height: number }> = {
            Header: { width: 12, height: 1 },
            Footer: { width: 12, height: 1 },
            Card: { width: 4, height: 3 },
            Table: { width: 12, height: 6 },
            Form: { width: 6, height: 6 },
            Chart: { width: 6, height: 4 },
            Map: { width: 12, height: 5 },
            Sidebar: { width: 3, height: 10 },
            Button: { width: 2, height: 1 },
            Input: { width: 4, height: 1 },
        };

        const size = defaultSizes[component.type] || { width: 4, height: 3 };

        // Check if component fits in current row
        if (currentX + size.width > gridColumns) {
            currentY += 1;
            currentX = 0;
        }

        const layout = {
            x: currentX,
            y: currentY,
            width: size.width,
            height: size.height,
        };

        currentX += size.width;

        return {
            ...component,
            layout,
        };
    });
}

export function optimizeLayout(schema: LayoutSchema): LayoutSchema {
    // Optimize spacing and alignment
    const optimizedComponents = schema.components.map((component) => {
        if (!component.layout) return component;

        return {
            ...component,
            layout: {
                ...component.layout,
                // Ensure proper grid alignment
                x: Math.max(0, Math.min(component.layout.x, 12 - component.layout.width)),
                y: Math.max(0, component.layout.y),
            },
        };
    });

    return {
        ...schema,
        components: optimizedComponents,
    };
}

export function convertToResponsive(schema: LayoutSchema): LayoutSchema {
    return {
        ...schema,
        responsive: true,
        components: schema.components.map((component) => ({
            ...component,
            props: {
                ...component.props,
                responsive: true,
            },
        })),
    };
}
