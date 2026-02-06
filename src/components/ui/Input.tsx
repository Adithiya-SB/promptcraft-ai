import React from 'react';
import { cn } from '@/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: boolean;
    containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    className = '',
    containerClassName = '',
    leftIcon,
    rightIcon,
    error,
    ...props
}, ref) => {
    return (
        <div className={cn("relative group", containerClassName)}>
            {leftIcon && (
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-300 transition-colors pointer-events-none">
                    {leftIcon}
                </div>
            )}
            <input
                ref={ref}
                className={cn(`
                    w-full bg-[#0f111a] border border-slate-800/60 rounded-md
                    py-1.5 px-3 text-sm text-slate-200 placeholder:text-slate-600
                    transition-all duration-200
                    focus:outline-none focus:ring-1 focus:ring-[#5e6ad2] focus:border-[#5e6ad2]
                    hover:border-slate-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-sm
                `,
                    leftIcon ? 'pl-9' : '',
                    rightIcon ? 'pr-9' : '',
                    error ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' : '',
                    className)}
                {...props}
            />
            {rightIcon && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    {rightIcon}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';
