import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CardProps {
    title?: string;
    description?: string;
    value?: string;
    trend?: string;
    icon?: string;
    image?: string;
    action?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    title,
    description,
    value,
    trend,
    icon,
    image,
    action,
    onClick,
}) => {
    const IconComponent = icon ? (Icons[icon as keyof typeof Icons] as LucideIcon) : null;
    const isPositiveTrend = trend?.startsWith('+');

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300 cursor-pointer group h-full flex flex-col"
            onClick={onClick}
        >
            {image && (
                <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    {title && (
                        <h3 className="text-sm font-medium text-slate-400 mb-1">
                            {title}
                        </h3>
                    )}
                    {description && (
                        <p className="text-xs text-slate-500">
                            {description}
                        </p>
                    )}
                </div>
                {IconComponent && (
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20">
                        <IconComponent className="w-4 h-4 text-indigo-400" />
                    </div>
                )}
            </div>

            {value && (
                <div className="mt-auto">
                    <div className="text-3xl font-bold text-slate-100">
                        {value}
                    </div>
                    {trend && (
                        <div className={`text-sm font-medium mt-1.5 ${isPositiveTrend ? 'text-green-400' : 'text-red-400'
                            }`}>
                            {trend}
                        </div>
                    )}
                </div>
            )}

            {action && (
                <button className="mt-4 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-medium transition-opacity text-sm">
                    {action}
                </button>
            )}
        </motion.div>
    );
};
