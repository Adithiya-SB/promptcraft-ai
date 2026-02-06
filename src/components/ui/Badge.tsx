import React from 'react';
import { cn } from '@/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral' | 'outline' | 'brand';
    className?: string;
    size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className = '',
    size = 'sm'
}) => {
    const variants = {
        default: "bg-slate-800 text-slate-200 border-white/5",
        brand: "bg-[#5e6ad2]/10 text-[#5e6ad2] border-[#5e6ad2]/20",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        error: "bg-red-500/10 text-red-400 border-red-500/20",
        neutral: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        outline: "bg-transparent border-slate-700 text-slate-400",
    };

    const sizes = {
        sm: "px-1.5 py-0.5 text-[10px] h-5",
        md: "px-2.5 py-0.5 text-xs h-6",
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-full font-medium border",
            variants[variant],
            sizes[size],
            className
        )}>
            {children}
        </span>
    );
};
