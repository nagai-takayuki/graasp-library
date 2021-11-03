import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  successLink: {
    display: 'block',
    fontStyle: 'italic',
    color: 'inherit',
    paddingTop: theme.spacing(0.5),
  },
}));

const ToastrWithLink = ({ link, text, linkText }) => {
  const classes = useStyles();

  return (
    <div>
      {text}
      <Link className={classes.successLink} target="_blank" to={link}>
        {linkText}
      </Link>
    </div>
  );
};

ToastrWithLink.propTypes = {
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ToastrWithLink;
