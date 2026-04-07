import {createContext} from'react';

export const themes  = {
    light: {
        type: 'light',
        fontColor: '#2b2c38',
        background: '#f4f7f8',
    },
    dark: {
        type: 'dark',
        fontColor: '#ffffff',
        background: '#2b2c38',
    }
}

export const ThemeContext = createContext(themes.light);