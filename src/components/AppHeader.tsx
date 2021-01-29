import React, { ChangeEvent } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchUI from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Declare styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

interface AppHeaderProps {
  isDark: boolean;
  handleThemeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isDark, handleThemeChange }) => {
  const { appBar, title } = useStyles();

  return (
    <AppBar position="fixed" className={appBar}>
      <Toolbar>
        <Typography variant="h6" className={title}>
          RepoWare
        </Typography>
        <FormControlLabel
          control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
          label="Theme"
        />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
