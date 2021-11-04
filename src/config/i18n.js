import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../langs/en.json';
import fr from '../langs/fr.json';
import { NODE_ENV } from './env';

i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  fallbackLng: 'en',
  // debug only when not in production
  debug: NODE_ENV !== 'production',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
});

export default i18n;
