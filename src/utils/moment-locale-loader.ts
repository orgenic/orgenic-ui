async function loadMomentLocale(locale: string, moment) {
  if (moment.locales().indexOf(locale) >= 0) {
    return;
  }

  const url = `/orgenic-ui-assets/og-calendar-locales/${locale}.mjs`;
  try {
    const module = await import(/* webpackIgnore: true */ url);
    if (moment.locales().indexOf(locale) >= 0) {
      return;
    }
    module.addToMoment(moment);
  } catch (e) {
    console.log('unable to retreive og-calendar-locale', e);
  }
}

function getDefaultLocale(): string {
  return navigator.language.substr(0,2);
}

export {
  loadMomentLocale,
  getDefaultLocale
};
