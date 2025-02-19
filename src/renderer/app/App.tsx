import React, { useEffect, useState } from 'react';
import AppWindow from './components/layouts/AppWindow';
import WelcomeScreen from './components/screens/WelcomeScreen';
import 'animate.css';
import { Preferences, Theme } from '../../shared/types/preferences.type';
import DebugLogPage from './components/screens/DebugLog';

function App() {

    const [currentPreferences, setCurrentPreferences] = useState<Preferences | null>();

    useEffect(() => {

        // Helper function to set theme
        const setTheme = (theme: string) => {
            const isDarkTheme = theme === 'dark';
            document.documentElement.classList.toggle('dark', isDarkTheme);
            localStorage.setItem('theme', theme as string);
        };

        // Initialize theme
        const initializeSettings = async () => {
            const preferences = await window.api.invoke('get-preferences') as Preferences;
            setCurrentPreferences(preferences);
            setTheme(preferences?.theme as Theme);

            const userData = {
                userFirstName: preferences?.userFirstName,
                userLastName: preferences?.userLastName,
                userEmail: preferences?.userEmail
            };

            const hasAllUserData = Object.values(userData).every(value => value);

            if (hasAllUserData) {
                Object.entries(userData).forEach(([key, value]) => {
                    localStorage.setItem(key, value as string);
                });
            } else {
                Object.keys(userData).forEach(key => {
                    localStorage.removeItem(key);
                });
            }
        };
        
        initializeSettings();

        // Listen for theme changes
        window.api.on('theme-changed', (theme) => {
            setCurrentPreferences(prev => prev ? {...prev, theme: theme as Theme} : null);
            setTheme(theme as string);
        });

        window.api.on('close-onboarding-screen', () => {
            setCurrentPreferences(prev => prev ? {...prev, isFirstRun: false} : null);
        });
    }, []);
    
    return (
        <AppWindow>
            {/* Welcome Screen */}
            {currentPreferences?.isFirstRun && <WelcomeScreen />}
            {!currentPreferences?.isFirstRun && (
                <DebugLogPage/>
            )}
        </AppWindow>
    );
}

export default App;