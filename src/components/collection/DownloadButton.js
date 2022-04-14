import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MUTATION_KEYS } from '@graasp/query-client';
import { QueryClientContext } from '../QueryClientContext';

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();
  const { useMutation } = useContext(QueryClientContext);
  const {
    mutate: downloadItem,
    data,
    isSuccess,
  } = useMutation(MUTATION_KEYS.EXPORT_ZIP);

  useEffect(() => {
    if (isSuccess) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.zip`);
      document.body.appendChild(link);
      link.click();
    }
  }, [data, isSuccess]);

  const handleDownload = () => {
    downloadItem({ id });
  };

  return (
    <Tooltip title={t('Download')}>
      <IconButton onClick={handleDownload} aria-label="download">
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
};

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
