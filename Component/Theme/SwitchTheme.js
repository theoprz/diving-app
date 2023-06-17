import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    useEffect(() => {
        // Load dark mode state from storage or use default value
        const loadDarkModeState = async () => {
            const darkModeState = await AsyncStorage.getItem('isDarkModeEnabled');
            setIsDarkModeEnabled(darkModeState === 'true');
        };

        loadDarkModeState();
    }, []);

    const toggleDarkMode = async (value) => {
        setIsDarkModeEnabled(value);
        await AsyncStorage.setItem('isDarkModeEnabled', value.toString());
    };

    return (
        <ThemeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
