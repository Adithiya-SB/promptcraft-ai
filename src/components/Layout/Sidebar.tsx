import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, Settings, Folder, History, LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive, onClick, collapsed }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-2 py-1.5 rounded-md transition-all duration-200 group text-sm relative mb-0.5",
                isActive
                    ? "text-[#e0e7ff] bg-white/[0.06]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]",
                collapsed && "justify-center px-2"
            )}
        >
            <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[#6366f1]" : "text-slate-500 group-hover:text-slate-400")} />
            {!collapsed && <span className="font-medium truncate">{label}</span>}
            {isActive && !collapsed && (
                <motion.div layoutId="active-pill" className="absolute left-0 w-0.5 h-3 bg-[#6366f1] rounded-r-full" />
            )}
        </button>
    );
};

export const Sidebar: React.FC<{
    className?: string;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
    onHistoryClick?: () => void;
    onSettingsClick?: () => void;
    onTemplatesClick?: () => void;
    activePage?: 'studio' | 'templates' | 'history' | 'settings' | 'none';
}> = ({
    className = '',
    collapsed = false,
    onToggleCollapse,
    onHistoryClick,
    onSettingsClick,
    onTemplatesClick,
    activePage = 'studio'
}) => {
        return (
            <motion.div
                initial={false}
                animate={{ width: collapsed ? 64 : 240 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "h-full bg-[#0b0e14] border-r border-white/[0.04] flex flex-col relative group/sidebar z-30",
                    className
                )}
            >
                {/* Collapse Toggle */}
                <button
                    onClick={onToggleCollapse}
                    className="absolute -right-3 top-6 w-6 h-6 bg-[#1a1e29] border border-slate-800 rounded-full flex items-center justify-center text-slate-400 opacity-0 group-hover/sidebar:opacity-100 transition-all hover:text-white z-50 shadow-sm hover:scale-110 active:scale-95"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </button>

                {/* Header */}
                <div className={cn("h-14 flex items-center px-4 border-b border-white/[0.04] overflow-hidden", collapsed ? "justify-center px-0" : "gap-3")}>
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col min-w-0"
                        >
                            <span className="text-sm font-semibold text-white tracking-tight leading-none">PromptCraft</span>
                            <span className="text-[10px] text-slate-500 font-medium leading-none mt-1">Workspace</span>
                        </motion.div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar overflow-x-hidden">
                    <div>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="px-2 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider truncate"
                            >
                                Editor
                            </motion.div>
                        )}
                        <SidebarItem
                            icon={Layout}
                            label="Studio"
                            isActive={activePage === 'studio'}
                            collapsed={collapsed}
                        />
                        <SidebarItem
                            icon={Folder}
                            label="Templates"
                            isActive={activePage === 'templates'}
                            collapsed={collapsed}
                            onClick={onTemplatesClick}
                        />
                    </div>

                    <div>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="px-2 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider truncate"
                            >
                                Resources
                            </motion.div>
                        )}
                        <SidebarItem
                            icon={History}
                            label="History"
                            isActive={activePage === 'history'}
                            collapsed={collapsed}
                            onClick={onHistoryClick}
                        />
                        <SidebarItem
                            icon={Settings}
                            label="Settings"
                            isActive={activePage === 'settings'}
                            collapsed={collapsed}
                            onClick={onSettingsClick}
                        />
                    </div>
                </div>

                {/* User Profile */}
                <div className="p-3 border-t border-white/[0.04]">
                    <div className={cn("flex items-center gap-3 p-1.5 rounded-md hover:bg-white/[0.04] transition-colors cursor-pointer group/user", collapsed && "justify-center p-1")}>
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 group-hover/user:border-white/20 transition-colors">
                            <span className="text-[10px] font-medium text-slate-400">JD</span>
                        </div>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col min-w-0"
                            >
                                <span className="text-xs font-medium text-slate-200 truncate">John Doe</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };
