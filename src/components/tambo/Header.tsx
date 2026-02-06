import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <h1 className="text-4xl font-bold text-gradient mb-2">
                {title}
            </h1>
            {subtitle && (
                <p className="text-lg text-slate-600 dark:text-slate-400">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};
