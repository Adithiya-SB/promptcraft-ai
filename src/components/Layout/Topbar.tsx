import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TopbarProps {
    onSearchClick?: () => void;
    subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onSearchClick, subtitle = 'Studio' }) => {
    return (
        <div className="h-14 border-b border-white/[0.04] flex items-center justify-between px-6 sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-md">
            {/* Left: Breadcrumbs / Page Title */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">PromptCraft</span>
                <span className="text-slate-600">/</span>
                <span className="text-sm font-medium text-slate-200">{subtitle}</span>
            </div>

            {/* Center: Global Search */}
            <div className="flex-1 max-w-md mx-6">
                <div onClick={onSearchClick}>
                    <Input
                        readOnly
                        placeholder="Try 'Dashboard'..."
                        leftIcon={<Search className="w-3.5 h-3.5" />}
                        className="bg-[#0f111a] border-slate-800 text-xs h-8 cursor-pointer hover:border-slate-700 transition-colors placeholder:text-slate-600"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                    <HelpCircle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8 relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#6366f1] rounded-full ring-2 ring-[#020617]" />
                </Button>
            </div>
        </div>
    );
};
