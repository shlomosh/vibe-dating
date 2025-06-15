import React from 'react';

interface ContentFeedProps {
    children?: React.ReactNode;
}

export const ContentFeed: React.FC<ContentFeedProps> = ({ children }) => {
    return (
        <main className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-16">
            <div className="max-w-lg mx-auto px-4 py-4">
                {children}
            </div>
        </main>
    );
}; 