import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchUI from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import client from './client';
import Home from './modules/Home';
import { CustomThemeContext } from 'assets/themes/CustomThemeContext';

import './App.css';

// Declare styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  main: {
    flex: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const { currentTheme, setTheme } = React.useContext(CustomThemeContext);
  const isDark = Boolean(currentTheme === 'dark');

  // Toggle between light and dark theme
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              RepoWare
            </Typography>
            <FormControlLabel
              control={
                <SwitchUI checked={isDark} onChange={handleThemeChange} />
              }
              label="Theme"
            />
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <Home />
        </main>
      </div>
    </ApolloProvider>
  );
};

export default App;
