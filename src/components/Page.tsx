import { useNavigate } from 'react-router-dom';
import { type PropsWithChildren, useEffect } from 'react';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';

export function Page({ children, back = true, className = '' }: PropsWithChildren<{
    back?: boolean
    className?: string
}>) {
    const navigate = useNavigate();

    useEffect(() => {
        if (back) {
            showBackButton();
            return onBackButtonClick(() => {
                navigate(-1);
            });
        }
        hideBackButton();
    }, [back]);

    return (
        <div
            className={`h-dvh max-w-md mx-auto text-foreground ${className}`}
        >
            <>
                {children}
            </>
        </div>
    );
}
