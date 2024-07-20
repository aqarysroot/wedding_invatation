import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import kazakhTranslation from './translations/kazakh.json';
import russianTranslation from './translations/russian.json';

i18next
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      kk: { translation: kazakhTranslation },
      ru: { translation: russianTranslation },
    },
    lng: "kk",
    fallbackLng: 'kk',

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18next;
