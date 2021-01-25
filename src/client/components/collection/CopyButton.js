import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import {
  LOGIN_ROUTE,
  IS_AUTHENTICATED_ROUTE,
  buildResourceRoute,
} from '../../config/routes';
import { openInNewWindow, openInNewTab } from '../../config/helpers';
import { DEFAULT_GET } from '../../../api/common';

const CopyButton = ({ id }) => {
  const { t } = useTranslation();

  const onClick = async () => {
    const isAuthenticated = await (
      await fetch(IS_AUTHENTICATED_ROUTE, DEFAULT_GET)
    ).json();
    if (!isAuthenticated) {
      // open login popup
      openInNewWindow({
        url: LOGIN_ROUTE,
        title: t('Graasp Login'),
      });
    } else {
      openInNewTab(buildResourceRoute(id));
    }
  };

  return (
    <Tooltip
      title={t(
        'This will open this content in Graasp where you can create a copy of it. You might need to login first.',
      )}
    >
      <IconButton onClick={onClick} aria-label="copy">
        <FileCopyIcon />
      </IconButton>
    </Tooltip>
  );
};

CopyButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CopyButton;
