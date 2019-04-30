'use strict';

(function() {
    const fs = require('fs');
    const glob = require('glob');

    const licenseheader = `/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/`;

    // Match all ".ts(x)" files in "./srtc/components/*"
    glob.sync('./src/components/*/!(*.e2e|*.spec)*.ts*').forEach((filePath) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            // Matches a block-comment w/ at least the words
            // "ORGENIC-UI", "@license", "MIT" and "LICENSE"
            // - in that order
            if (!data.match(/[\s\S]?\/\*\*[\s\S]*ORGENIC-UI[\s\S]*@license.*MIT[\s\S]*LICENSE[\s\S]*\*\*\//gm)) {
                console.log(`${filePath}: Add missing licenseheader.`);
                fs.writeFile(filePath, `${licenseheader}\n\n${data}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                // stop commit
                return process.exit(1);
            }
        });
    });

}());
