import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};
