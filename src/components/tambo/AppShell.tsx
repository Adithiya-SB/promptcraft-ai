import React from 'react';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

interface AppShellProps {
    children: React.ReactNode;
    showSidebar?: boolean;
    showTopbar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
    children,
    showSidebar = true,
    showTopbar = true
}) => {
    return (
        <div className="h-screen flex flex-col bg-slate-950">
            {showTopbar && <Topbar />}

            <div className="flex-1 flex overflow-hidden">
                {showSidebar && <Sidebar />}

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
