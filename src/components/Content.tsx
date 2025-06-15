import { FC, ReactNode } from 'react';
import { useSignal } from '@telegram-apps/sdk-react';
import { viewportSafeAreaInsets } from '@telegram-apps/sdk';
import peachImage from '@/assets/peach.png';

interface ContentHeaderProps {
    text: string | ReactNode;
}

export const ContentHeader: FC<ContentHeaderProps> = ({ text }) => {
    return (
        <div className="text-[1.2em] font-bold text-primary text-left flex items-center gap-2">
            <span>
                <img src={peachImage} alt="Peach" className="w-[2em] h-[2em] -mt-1" />
            </span>
            <span className="text-[1em] hover:text-primary">{text}</span>
        </div>
    );
};

interface ContentProps {
    children: ReactNode;
    className?: string;
    itemsAlign?: 'center' | 'left' | 'right';
    extraTopPadding?: number;
}

export const Content: FC<ContentProps> = ({ children, className = '', itemsAlign = 'center', extraTopPadding = 38 }) => {
    const safeInsets = useSignal(viewportSafeAreaInsets) ?? { top: 0, bottom: 0, left: 0, right: 0 };

    return (
        <div
            className={`relative h-full flex flex-col items-${itemsAlign} justify-end ${className}`}
            style={{
                paddingTop: `${extraTopPadding + safeInsets.top}px`,
                paddingBottom: `${safeInsets.bottom}px`,
                paddingLeft: `${3 + safeInsets.left}px`,
                paddingRight: `${3 + safeInsets.right}px`,
            }}
        >
            <div className='h-full w-full'>
                {children}
            </div>
        </div>
    );
}; 