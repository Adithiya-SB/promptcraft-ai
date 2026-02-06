import React from 'react';
import { GlassCard } from './GlassCard';
import { cn } from '@/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    icon?: LucideIcon;
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    trend = 'neutral',
    icon: Icon,
    className
}) => {
    return (
        <GlassCard className={cn("flex flex-col gap-1 hover:border-slate-700 transition-colors", className)}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</span>
                {Icon && <Icon className="w-4 h-4 text-slate-500" />}
            </div>

            <div className="flex items-end gap-3">
                <span className="text-2xl font-semibold text-slate-100 tracking-tight">{value}</span>
                {change && (
                    <span className={cn(
                        "text-xs font-medium mb-1 px-1.5 py-0.5 rounded-full",
                        trend === 'up' && "text-emerald-400 bg-emerald-500/10",
                        trend === 'down' && "text-red-400 bg-red-500/10",
                        trend === 'neutral' && "text-slate-400 bg-slate-500/10"
                    )}>
                        {change}
                    </span>
                )}
            </div>
        </GlassCard >
    );
};

export const WidgetContainer: React.FC<{ children: React.ReactNode; title?: string; className?: string }> = ({
    children,
    title,
    className
}) => {
    return (
        <div className={cn("border border-white/5 bg-[#0f111a] rounded-xl overflow-hidden", className)}>
            {title && (
                <div className="px-4 py-3 border-b border-white/5 bg-slate-800/30">
                    <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
                </div>
            )}
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};
