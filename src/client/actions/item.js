import React from 'react';
import { toast } from 'react-toastify';
import i18n from '../config/i18n';
import { DEFAULT_POST } from '../../api/common';
import ToastrWithLink from '../components/common/ToastrWithLink';
import { buildSpaceRoute, COPY_ROUTE } from '../config/routes';

// eslint-disable-next-line import/prefer-default-export
export const copyItem = ({ body }, callback) =>
  fetch(COPY_ROUTE, { ...DEFAULT_POST, body: JSON.stringify(body) }).then(
    async (response) => {
      callback?.();

      if (response.ok) {
        const { _id: newItemId } = await response.json();
        const link = buildSpaceRoute(newItemId);
        toast.success(
          <ToastrWithLink
            link={link}
            text={i18n.t('The item was copied successfully')}
            linkText={i18n.t('Click here to open the item on Graasp.')}
          />,
        );
      } else {
        toast.error(i18n.t('An error occured while copying the item'), {
          variant: 'error',
        });
      }
    },
  );
