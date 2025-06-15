import { FC } from 'react';

interface BackgroundProps {
    imageUrl: string;
    className?: string;
}

export const Background: FC<BackgroundProps> = ({ imageUrl, className = '' }) => {
    return (
        <div className={`absolute inset-0 bg-cover bg-center bg-[url(${imageUrl})] ${className}`}>
            <div className="h-full [background:linear-gradient(180deg,rgba(0,0,0,0.67)_0%,rgba(0,0,0,0.65)_100%)]" />
        </div>
    );
}; 