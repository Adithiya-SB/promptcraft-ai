import React from 'react';
import { cn } from '@/utils';

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
    orientation = 'horizontal',
    className = ''
}) => {
    return (
        <div
            className={cn(
                "bg-white/[0.06] shrink-0",
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
                className
            )}
        />
    );
};
