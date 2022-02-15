import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import { MUTATION_KEYS } from '@graasp/query-client';
import { QueryClientContext } from '../QueryClientContext';

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: user, isLoading } = hooks.useCurrentMember();
  const { mutate: downloadItem } = useMutation('downloadItem');
  console.log(MUTATION_KEYS);
  console.log(MUTATION_KEYS.DOWNLOAD_ITEM);

  const onClick = () => {
    // remove loading icon on callback
    // do not set parent if it is root
    console.log('download');
    downloadItem(id);
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
