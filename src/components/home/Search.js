import { useTranslation } from 'react-i18next';
import React from 'react';
import {
  InputBase,
  Divider,
  Paper,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { RANGES } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.25, 0.5),
    margin: theme.spacing(12.5, 0),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  divider: {
    height: theme.spacing(3),
    margin: theme.spacing(0.5),
  },
  search: {
    margin: theme.spacing(1),
  },
  searchOptions: {
    marginTop: theme.spacing(-10),
    marginLeft: theme.spacing(1),
  },
}));

function Search({
  handleSearch,
  handleClick,
  isLoading,
  range,
  handleRangeChange,
}) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <Paper component="div" className={classes.root}>
        <InputBase
          id="search"
          disabled={isLoading}
          className={classes.search}
          placeholder={t('Search collections using keywords and range options')}
          fullWidth
          margin="none"
          InputLabelProps={{
            shrink: true,
            ariaLabel: 'search collections',
          }}
          variant="filled"
          onChange={handleSearch}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
          type="submit"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <FormControl component="fieldset" className={classes.searchOptions}>
        <FormLabel component="legend">{t('Search Range')}</FormLabel>
        <RadioGroup row value={range} onChange={handleRangeChange}>
          {Object.values(RANGES).map((entry) => (
            <FormControlLabel
              value={entry.value}
              control={<Radio color="primary" />}
              label={t(entry.title)}
            />
          ))}
          {/*
            TODO: prompt users hints about how to use multiple keywords 
            <Tooltip title="Use | or & for union/intersection of multiple keywords if choose 'Tag' or 'All'"> 
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          */}
        </RadioGroup>
      </FormControl>
    </>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  range: PropTypes.string.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
};

export default Search;
