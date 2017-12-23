import acceptedLanguages from 'acceptedlanguages';
import acceptLanguage from 'accept-language';

import {addLocaleData} from 'react-intl';

// locale
let defaultLocale = 'en';
let locale = defaultLocale;

export const getDefaultLocale = () => {
    return defaultLocale;
};

export const getLocale = () => {
    return locale;
};

export const getLocaleMessages = (locale, paths) => {
    if (!locale) return Promise.resolve({});
    const language = locale.substr(0,2);
    const qarr = [];
    paths.forEach((path) => {
        path = path.replace('{locale}', locale).replace('{language}', language);
        qarr.push(fetch(path)
            .then((res) => res.json())
            .catch((err) => {
                console.error(err);
                return {};
            }));
    });
    return Promise.all(qarr)
        .then((contents) => {
            return contents.reduce((result, currentObject) => {
                for (let key in currentObject) {
                    if (!currentObject.hasOwnProperty(key)) {
                        continue;
                    }
                    result[key] = currentObject[key];
                }
                return result;
            }, {});
        });
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
