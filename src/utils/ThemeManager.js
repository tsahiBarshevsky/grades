import React, { useState, useEffect } from 'react'
import { getTheme, setTheme as changeTheme } from './AsyncStorageHandler';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('');

    useEffect(() => {
        getTheme().then((theme) => setTheme(theme));
    }, []);

    const toggleTheme = async () => {
        if (theme === 'light') {
            setTheme('dark');
            changeTheme('dark');
        }
        else {
            setTheme('light');
            changeTheme('light');
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}