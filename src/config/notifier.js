import React from 'react';
import { routines } from '@graasp/query-client';
import { toast } from 'react-toastify';
import i18n from './i18n';
import ToastrWithLink from '../components/common/ToastrWithLink';
import { buildPerformViewItemRoute } from './routes';

export const COPY_RESOURCE_LINK_TO_CLIPBOARD = {
  SUCESS: 'success',
  FAILURE: 'failure',
};

const notifier = ({ type, payload }) => {
  switch (type) {
    case routines.copyItemRoutine.FAILURE:
      toast.error(i18n.t('An error occured while copying the item'), {
        variant: 'error',
      });
      break;
    case routines.copyItemRoutine.SUCCESS:
      toast.success(
        <ToastrWithLink
          link={buildPerformViewItemRoute(payload.id)}
          text={i18n.t('The item was copied successfully')}
          linkText={i18n.t('Click here to open the item on Graasp.')}
        />,
      );
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS:
      toast.success(i18n.t('The item resource was successfully copied.'), {
        variant: 'success',
      });
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE:
      toast.error(i18n.t('An error occured while copying the resource link.'), {
        variant: 'error',
      });
      break;
    default:
  }
};
export default notifier;
