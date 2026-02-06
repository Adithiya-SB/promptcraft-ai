import React from 'react';
import { cn } from '@/utils';

interface AppShellProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    topbar?: React.ReactNode;
    rightPanel?: React.ReactNode;
    className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
    children,
    sidebar,
    topbar,
    rightPanel,
    className
}) => {
    return (
        <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-[#5e6ad2]/30 selection:text-[#e0e7ff]">
            {/* Sidebar Gradient Effect */}
            <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-r from-slate-900/20 to-transparent pointer-events-none z-0" />

            {/* Sidebar */}
            {sidebar && (
                <div className="hidden md:block flex-shrink-0 z-20 relative h-full">
                    {sidebar}
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 z-10 relative">
                {/* Topbar */}
                {topbar && (
                    <div className="flex-shrink-0 z-20">
                        {topbar}
                    </div>
                )}

                {/* Content Canvas */}
                <main className={cn(
                    "flex-1 overflow-hidden relative",
                    className
                )}>
                    {children}
                </main>
            </div>

            {/* Right Panel */}
            {rightPanel && (
                <div className="flex-shrink-0 w-80 border-l border-white/[0.04] bg-[#0b0e14] z-20 overflow-hidden">
                    {rightPanel}
                </div>
            )}
        </div>
    );
};
