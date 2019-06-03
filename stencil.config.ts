import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import orgenicUiPostProcessing from './rollup-plugins/orgenic-ui-post-processing';

export const config: Config = {
    namespace: 'orgenic-ui',
    outputTargets: [
        { type: 'dist' },
        { type: 'docs-readme' },
        {
            type: 'www',
            serviceWorker: null // disable service workers
        }
    ],
    plugins: [
        sass({
            injectGlobalPaths: [
                'src/styles/_mixins.scss',
                'src/styles/variables/_index.scss',
            ],
        }),
        orgenicUiPostProcessing({ target: 'build' }),
    ],
};
