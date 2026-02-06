import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'glass';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    as?: any;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    as: Component = motion.button,
    ...props
}, ref) => {

    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed select-none border";

    const variants = {
        primary: "bg-[#5e6ad2] hover:bg-[#4e5ac0] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.08)_inset] border-transparent focus:ring-[#5e6ad2]",
        secondary: "bg-slate-800/50 hover:bg-slate-800 text-slate-200 border-white/5 hover:border-slate-700 shadow-sm focus:ring-slate-500",
        outline: "bg-transparent border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white focus:ring-slate-500",
        ghost: "bg-transparent border-transparent text-slate-400 hover:text-slate-100 hover:bg-white/5 focus:ring-slate-500",
        danger: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 hover:text-red-300 focus:ring-red-500",
        glass: "bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-sm shadow-sm"
    };

    const sizes = {
        xs: "h-6 px-2 text-[11px] gap-1 rounded",
        sm: "h-7 px-2.5 text-xs gap-1.5 rounded-md",
        md: "h-8 px-3 text-sm gap-2 rounded-md",
        lg: "h-10 px-4 text-sm gap-2.5 rounded-lg",
        icon: "h-8 w-8 p-0 flex items-center justify-center rounded-md",
    };

    return (
        <Component
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.1 }}
            {...props}
        >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {!isLoading && leftIcon && <span className="opacity-80">{leftIcon}</span>}
            <span className="truncate">{children}</span>
            {!isLoading && rightIcon && <span className="opacity-80">{rightIcon}</span>}
        </Component>
    );
});

Button.displayName = 'Button';
