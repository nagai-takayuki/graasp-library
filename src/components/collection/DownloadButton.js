import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { QueryClientContext } from '../QueryClientContext';

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);

  const onClick = () => {
    // remove loading icon on callback
    // do not set parent if it is root
    hooks.useDownloadItem(id);
  };

  return (
    <Tooltip title={t('Download')}>
      <IconButton onClick={onClick} aria-label="download">
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
};

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
