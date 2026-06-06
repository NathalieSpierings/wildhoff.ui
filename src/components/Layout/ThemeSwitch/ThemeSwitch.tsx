import React, { FC, useEffect, useState } from 'react';

export interface ThemeSwitchProps {}

export const themes = ['theme-light', 'theme-dimmed', 'theme-dark'] as const;
type Theme = typeof themes[number];

const themeIcons: Record<Theme, string> = {
    'theme-light': '#svg_icon_sun',
    'theme-dimmed': '#svg_icon_moon_clouds',
    'theme-dark': '#svg_icon_moon',
};

const ThemeSwitch: FC<ThemeSwitchProps> = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>('theme-light');
    
    const applyTheme = (theme: Theme) => {
        const htmlElement = document.documentElement;
        
        htmlElement.classList.remove(...themes);
        htmlElement.classList.add(theme);
        localStorage.setItem('theme', theme);
        setCurrentTheme(theme);

    };

    const getCurrentTheme = (): Theme => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;

        if (savedTheme && themes.includes(savedTheme)) {
            return savedTheme;
        }

        const htmlTheme = themes.find((theme) =>
            document.documentElement.classList.contains(theme)
        );

        return htmlTheme || 'theme-light';
    };

    const themeSwitch = () => {
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        applyTheme(nextTheme);
    };

    useEffect(() => {
        applyTheme(getCurrentTheme());
    }, []);

    return (
        <div className="theme-switcher">            
            <svg className="icon-duotone" onClick={themeSwitch}>
                <use xlinkHref={themeIcons[currentTheme]} />
            </svg>
        </div>
    );
};

export default ThemeSwitch;
