import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    noPadding?: boolean;
    as?: any;
    [key: string]: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    hoverEffect = false,
    noPadding = false,
    as: Component = motion.div,
    ...props
}) => {
    return (
        <Component
            className={cn(
                "bg-[#13161f]/80 backdrop-blur-md border border-white/[0.06] rounded-xl shadow-sm relative overflow-hidden",
                hoverEffect && "hover:border-white/[0.1] hover:bg-[#181b25]/80 transition-all duration-300",
                !noPadding && "p-4",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};
