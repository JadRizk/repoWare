import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import client from './client';
import RepoCrawler from './modules/repoCrawler';
import AppHeader from 'components/AppHeader';
import { CustomThemeContext } from 'assets/themes/CustomThemeContext';

const App: React.FC = () => {
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
      <Router>
        <div style={{ display: 'flex' }}>
          {/* This syntax is inspired from Vue. Looks kind of clean for me */}
          <AppHeader {...{ isDark, handleThemeChange }} />

          <Switch>
            <Route path="/" exact>
              <RepoCrawler />
            </Route>

            {/* Redirect users that tries different routes */}
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
