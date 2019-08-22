const execute = require('./helpers/execute');
const trimReadmeFooter = require('./helpers/trim-readme-footer');
const addCssVarsDefaultValue = require('./helpers/add-css-vars-default-value');
const momentLocales2Modules = require('./helpers/moment-locales-to-modules');

function orgenicUiPostProcessing(config) {
  if (config.target === 'start') {
    console.log('starting node sass in watch mode');
    // TODO this one starts an additional watch process to build themes.
    // We should try to reduce it to only one watch process for source and themes.
    execute('node-sass --watch src/styles/themes -o www/themes');
  }
  return {
    name: 'orgenic-up-post-processing',

    generateBundle: async function (options, bundle) {
      if (config.target !== 'start' && options.entryFileNames.indexOf('.esm.js') < 0) {
        return;
      }

      return new Promise(resolve => {
        const delay = config.target === 'build' ? 4000 : 2000;

        resolve();
        // wait for stenciljs build chain completely finished
        setTimeout(async () => {
          if (config.target === 'build') {
            // copy generated component readmes to dist/docs
            await execute('copyfiles -u 1 "src/components/**/readme.md" dist/docs/');

            // copy helpers to dist
            await execute('copyfiles -R src/helper dist')

            // trim readme footer
            trimReadmeFooter();
            // extend readme css variable table with column for default value
            addCssVarsDefaultValue();

            // generate themes
            await execute('node-sass src/styles/themes -o dist/themes');
            momentLocales2Modules({ outDir: 'dist/orgenic-ui-assets/og-calendar-locales' });
          } else {
            momentLocales2Modules({ outDir: 'www/orgenic-ui-assets/og-calendar-locales' });
            await execute('node-sass src/styles/themes -o www/themes');
          }
        }, delay);
      });
    }
  };
}

module.exports = orgenicUiPostProcessing;
