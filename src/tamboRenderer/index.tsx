import React from 'react';
import { motion } from 'framer-motion';
import { TamboComponent } from '@/types';
import { getComponentByName } from '@/tamboRegistry';

interface TamboRendererProps {
    components: TamboComponent[];
}

export const TamboRenderer: React.FC<TamboRendererProps> = ({ components }) => {
    const renderComponent = (component: TamboComponent) => {
        const registeredComponent = getComponentByName(component.type);

        if (!registeredComponent) {
            console.warn(`Component type "${component.type}" not found in registry`);
            return (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    Unknown component: {component.type}
                </div>
            );
        }

        const Component = registeredComponent.component;

        return (
            <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full"
            >
                <Component {...component.props} />
            </motion.div>
        );
    };

    // Check if components use layout grid system
    const hasGridLayout = components.some(c => c.layout);

    if (hasGridLayout) {
        // Use CSS Grid for precise layout control
        return (
            <div className="w-full p-6">
                <div className="grid grid-cols-12 gap-6 auto-rows-min">
                    {components.map((component) => {
                        const layout = component.layout || { x: 0, y: 0, width: 12, height: 1 };

                        return (
                            <div
                                key={component.id}
                                className="min-h-0"
                                style={{
                                    gridColumn: `span ${layout.width}`,
                                    gridRow: `span ${layout.height}`,
                                }}
                            >
                                {renderComponent(component)}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Fallback to simple vertical layout
    return (
        <div className="space-y-6 p-6">
            {components.map((component) => (
                <div key={component.id}>
                    {renderComponent(component)}
                </div>
            ))}
        </div>
    );
};
