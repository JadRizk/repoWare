import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import getTheme from '.';

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Create the Theme Dispatch Context
export const CustomThemeContext = React.createContext<{
  currentTheme: string;
  setTheme: (themeName: string) => void;
}>({
  currentTheme: 'light',
  setTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Read current theme from localStorage
  const currentTheme = localStorage.getItem('appTheme') || 'light';

  // State to hold the selected theme name
  const [themeName, _setThemeName] = React.useState(currentTheme);

  // Retrieve the theme object by theme name
  const theme = React.useMemo(() => getTheme(themeName), [themeName]);

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (themeType: string) => {
    localStorage.setItem('appTheme', themeType);
    _setThemeName(themeType);
  };

  // Build the  context value object
  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default ThemeProvider;
