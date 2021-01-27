import React from 'react';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    width: '80%',
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
});

const SearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}> = ({ value, onChange, onClear }) => {
  const classes = useStyles();

  const handleOnChange = (event: React.ChangeEvent<{ value: string }>) => {
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
