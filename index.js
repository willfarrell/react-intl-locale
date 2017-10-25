import acceptedLanguages from 'acceptedlanguages';
import acceptLanguage from 'accept-language';

import {addLocaleData} from 'react-intl';

import merge from 'lodash/merge';

// locale
let defaultLocale = 'en';
let locale = defaultLocale;

export const getDefaultLocale = () => {
    return defaultLocale;
};

export const getLocale = () => {
    return locale;
};

export const getUserLocale = () => {
    let savedLocale = window.localStorage.getItem('locale');
    if (savedLocale === 'null') {
        savedLocale = null;
    }
    const browserLocale = acceptLanguage.get(acceptedLanguages.accepted.join(','));

    return (savedLocale || browserLocale || defaultLocale);
};

export const setLocale = (newLocale) => {
    // set current language
    locale = getUserLocale(newLocale);

    window.localStorage.setItem('locale', locale);

    import(`react-intl/locale-data/${locale.substr(0, 2)}`)
        .then((localeData) => {
            addLocaleData(localeData);
        });

    return locale;
};

const initLocale = (primaryLocale = defaultLocale, allowedLocales = []) => {
    defaultLocale = primaryLocale;
    allowedLocales.unshift(defaultLocale);

    // set accepted languages
    acceptLanguage.languages(allowedLocales);

    return setLocale(defaultLocale);
};

export default initLocale;
