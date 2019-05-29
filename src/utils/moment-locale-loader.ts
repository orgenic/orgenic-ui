export {
    loadMomentLocale,
    getDefaultLocale
} ;


async function loadMomentLocale(locale: string, moment) {
    if (moment.locales().indexOf(locale) >= 0) {
        return;
    }

    const url = `/og-datepicker-locales/${locale}.mjs`;

    const module = await import(url);
    if (moment.locales().indexOf(locale) >= 0) {
        return;
    }
    module.addToMoment(moment);
}

function getDefaultLocale(): string {
    return navigator.language.substr(0,2);
}
