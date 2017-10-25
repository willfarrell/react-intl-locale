import acceptedLanguages from 'acceptedlanguages';
import acceptLanguage from 'accept-language';

import { addLocaleData } from 'react-intl';

export let defaultLocale = 'en';
export let locale = defaultLocale;


export const getLocale = () => {
    let savedLocale = window.localStorage.getItem('locale');
    if (savedLocale === 'null') { savedLocale = null; }
    const browserLocale = acceptLanguage.get(acceptedLanguages.accepted.join(','));

    return (savedLocale || browserLocale || defaultLocale);
};

export const setLocale = (newLocale) => {
    // set current language
    locale = getLocale(newLocale);

    window.localStorage.setItem('locale', locale);

    import(`react-intl/locale-data/${locale.substr(0, 2)}`)
        .then((localeData) => {
            addLocaleData(localeData);
        });

    return locale;
};

const initLocale = (primaryLocale, allowedLocales = []) => {
    defaultLocale = primaryLocale;
    allowedLocales.push(defaultLocale);

    // set accepted languages
    acceptLanguage.languages(allowedLocales);

    return setLocale(defaultLocale);
};

export default initLocale;
