import { useState, useContext, useMemo } from "react";
import { ThemeContext, themes } from "../context/ThemeContext";

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(themes.light);

    const toggleTheme = () => {
        setTheme(theme === themes.light ? themes.dark : themes.light);
    }

    const themeAPI = useMemo(() => {
        return {
            theme,
            toggleTheme
        }
    }, [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={themeAPI}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Export ThemeProvider as both default and named export
export { ThemeProvider };
export default ThemeProvider;