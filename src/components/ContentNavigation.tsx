import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItem {
    icon: LucideIcon;
    label: string | React.ReactNode;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
}

interface ContentNavigationProps {
    items: NavigationItem[];
}

export const ContentNavigation: React.FC<ContentNavigationProps> = ({ items }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-3 py-3 border-t bg-background z-50">
            {items.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col items-center gap-1",
                            item.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer group"
                        )}
                        onClick={item.isDisabled ? undefined : item.onClick}
                    >
                        <div className={cn(
                            "rounded-full transition-all duration-200",
                            !item.isDisabled && "group-hover:text-primary",
                            item.isDisabled ? "text-muted-foreground" : (item.isActive ? "text-primary" : "text-foreground")
                        )}>
                            <Icon size={24} />
                        </div>
                        <div className={cn(
                            "text-xs transition-all duration-200",
                            !item.isDisabled && "group-hover:text-primary",
                            item.isDisabled ? "text-muted-foreground" : (item.isActive ? "text-primary" : "text-foreground")
                        )}>
                            {item.label}
                        </div>
                    </div>
                );
            })}
        </nav>
    );
}; 