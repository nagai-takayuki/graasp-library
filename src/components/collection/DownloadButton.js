import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { MUTATION_KEYS } from '@graasp/query-client';
import { QueryClientContext } from '../QueryClientContext';

const DownloadButton = ({ id }) => {
  const { t } = useTranslation();
  const { useMutation } = useContext(QueryClientContext);
  const {
    mutate: downloadItem,
    data,
    isLoading,
    isError,
  } = useMutation(MUTATION_KEYS.DOWNLOAD_ITEM);

  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}.zip`);
      document.body.appendChild(link);
      link.click();
    }
    if (isError) {
      openDialog();
    }
  }, [data, isError]);

  if (isLoading) {
    return null;
  }

  const handleDownload = () => {
    downloadItem(id);
  };

  return (
    <>
      <Tooltip title={t('Download')}>
        <IconButton onClick={handleDownload} aria-label="download">
          <GetAppIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('Error')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('Unable to download the item. Please try again later!')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
