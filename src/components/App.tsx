import { useMemo, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark, expandViewport, requestFullscreen } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { routes } from '@/navigation/routes.tsx';

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle"
import { ProfileProvider } from '@/contexts/ProfileContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

export function App() {
    const lp = useMemo(() => retrieveLaunchParams(), []);
    const isDark = useSignal(isMiniAppDark);
    const fullscreenRequested = useRef(false);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                expandViewport();
                if (!fullscreenRequested.current) {
                    fullscreenRequested.current = true;
                    await requestFullscreen();
                }
            } catch (error) {
                console.warn('Failed to initialize app:', error);
            }
        };

        initializeApp();
    }, []);

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
        >
            <ThemeProvider defaultTheme={isDark ? 'dark' : 'light'} storageKey="tw-theme">
                <LanguageProvider>
                    <ProfileProvider>
                        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                            <Routes>
                                {routes.map((route) => <Route key={route.path} {...route} />)}
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                            <div className="absolute top-[30px] left-1/2 -translate-x-1/2">
                                <ThemeToggle />
                            </div>
                        </HashRouter>
                    </ProfileProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AppRoot>
    );
}
