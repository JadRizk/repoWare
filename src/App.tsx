import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

import client from './client';
import RepoCrawler from './modules/repoCrawler';
import AppHeader from 'components/AppHeader';
import { CustomThemeContext } from 'assets/themes/CustomThemeContext';

import './App.css';

// Declare styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const App: React.FC = () => {
  const { root } = useStyles();
  // Use the theme context
  const { currentTheme, setTheme } = React.useContext(CustomThemeContext);

  const isDark = Boolean(currentTheme === 'dark');

  // Toggle between light and dark theme
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    // Toggle themes
    if (checked) return setTheme('dark');

    return setTheme('light');
  };

  return (
    <ApolloProvider client={client}>
      <div className={root}>
        {/* This syntax is inspired from Vue. Looks kind of clean for me.
        Let me know what you think, found out about this not to long ago */}
        <AppHeader {...{ isDark, handleThemeChange }} />

        <RepoCrawler />
      </div>
    </ApolloProvider>
  );
};

export default App;
