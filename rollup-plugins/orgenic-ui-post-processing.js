const execute = require('./helpers/execute');
const trimReadmeFooter = require('./helpers/trim-readme-footer');

function orgenicUiPostProcessing(config) {
    if (config.target === 'start') {
        console.log('starting node sass in watch mode');
        // TODO this one starts an additional watch process to build themes.
        // We should try to reduce it to only one watch process for source and themes.
        execute('node-sass --watch src/styles/themes -o www/themes');
    }
    return {
        name: 'orgenic-up-post-processing',

        generateBundle: function (options, bundle) {
            if (config.target !== 'start' && !options.amd.id) {
                return;
            }

            return new Promise(resolve => {
                // wait for stenciljs build chain completely finished
                setTimeout(async () => {
                    if (config.target === 'build') {
                        // generate themes
                        await execute('node-sass src/styles/themes -o dist/themes');

                        // copy generated component readmes to dist/docs
                        await execute('copyfiles -u 1 "src/components/**/readme.md" dist/docs/');

                        // copy helpers to dist
                        await execute('cp -R src/helper dist')

                        // trim readme footer
                        trimReadmeFooter();
                        resolve();
                    } else {
                        await execute('node-sass src/styles/themes -o www/themes');
                        resolve();
                    }
                }, 2000);
            });
        }
    };
}

module.exports = orgenicUiPostProcessing;
