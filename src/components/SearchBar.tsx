import React from 'react';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import DirectionsIcon from '@material-ui/icons/Directions';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  searchIcon: {
    margin: '0 0.5rem',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => {
  // Import style classes
  const classes = useStyles();

  // Handles on input value change
  const handleOnChange = (event: React.ChangeEvent<{ value: string }>) => {
    // Triggers the onChange callback
    onChange(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <SearchIcon className={classes.searchIcon} />

      <InputBase
        className={classes.input}
        value={value}
        onChange={handleOnChange}
        placeholder="Search for your favorite repositories"
        inputProps={{ 'aria-label': 'search github repo' }}
      />
      {value.length > 0 && (
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={onClear}
        >
          <CloseIcon />
        </IconButton>
      )}

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
