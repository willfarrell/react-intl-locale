# react-intl-locale
Dynamically load locale as needed for `react-intl`.


## Install
```bash
$ npm install react-intl-locale
```

## Use
```js
import initLocale, { defaultLocale, getLocale, setLocale, getLocaleMessages } from 'react-intl-locale';
...
initLocale('en-CA', ['fr-CA']);
...
const locale = getLocale();
const messages = getLocaleMessages(['./{locale}.header.json','./{locale}.footer.json']);
...
<IntlProvider
    locale={locale}
    defaultLocale={defaultLocale}
    messages={messages}
>
...
```

## Docs
### initLocale
- defaultLocale (String): Set the default locale to use in the app. default: `en`.
- allowedLocales (String[]): List of locales supported in the app, excluding the defaultLocale, defaultLocale will be added to it.

Using the browsers locale and the locales initialized the best match will be returned for use.

### getLocale
Returns the currently selected locale

### setLocale
Overrides the the current locale, if allowed based in the init.

### getLocaleMessages
- locale (String): Current locale
- paths (String[]): Array to paths to load for locale. Has locale replacement built in `{locale}` and `{language}`. Path names are relative the root of the build folder.
