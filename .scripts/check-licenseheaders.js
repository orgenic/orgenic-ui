'use strict';

(function() {
    const fs = require('fs');
    const glob = require('glob');

    const licenseheader = `/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/`;

    let fail = false;

    // Match all ".ts(x)" files in "./srtc/components/*"
    glob.sync('./src/components/*/!(*.e2e|*.spec)*.ts*').forEach((filePath) => {
        let data = fs.readFileSync(filePath, 'utf8');

        if (!data.match(/[\s\S]?\/\*\*[\s\S]*ORGENIC-UI[\s\S]*@license.*MIT[\s\S]*LICENSE[\s\S]*\*\*\//gm)) {
            console.log(`${filePath}: Add missing licenseheader.`);
            fs.writeFileSync(filePath, `${licenseheader}\n\n${data}`, 'utf8');

            // stop commit
            fail = true;
        }
    });

    if (fail) {
        return process.exit(1);
    }
}());
