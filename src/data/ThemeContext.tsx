import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkspaceTheme } from '../types';
import { WORKSPACE_THEMES, ThemeConfig } from './theme';

interface ThemeContextType {
  theme: WorkspaceTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: WorkspaceTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'steel-blue',
  themeConfig: WORKSPACE_THEMES['steel-blue'],
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<WorkspaceTheme>(() => {
    try {
      const saved = localStorage.getItem('planai_workspace_theme');
      if (saved && (saved === 'steel-blue' || saved === 'sage-green' || saved === 'muted-sand')) {
        return saved as WorkspaceTheme;
      }
    } catch {
      // ignore
    }
    return 'steel-blue'; // Default to Steel Blue (Dịu mắt, chuẩn CAD)
  });

  const setTheme = (newTheme: WorkspaceTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('planai_workspace_theme', newTheme);
    } catch {
      // ignore
    }
  };

  const themeConfig = WORKSPACE_THEMES[theme] || WORKSPACE_THEMES['steel-blue'];

  return (
    <ThemeContext.Provider value={{ theme, themeConfig, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useWorkspaceTheme = () => useContext(ThemeContext);
