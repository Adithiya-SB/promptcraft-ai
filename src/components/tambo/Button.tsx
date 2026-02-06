import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    text: string;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
    text,
    variant = 'primary',
    onClick
}) => {
    const variants = {
        primary: 'gradient-primary text-white',
        secondary: 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${variants[variant]}`}
        >
            {text}
        </motion.button>
    );
};
