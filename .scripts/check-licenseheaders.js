'use strict';

(function() {
    const fs = require('fs');
    const glob = require('glob');

    const licenseheader = `/**
 * ORGENIC-UI
 * @license __ENTERNEWLICENSEHERE__
 * See LICENSE file at https://path/to/LICENSE
 **/`;

    let fail = false;
return; // disable check until license was set
    // Match all ".ts(x)" files in "./srtc/components/*"
    glob.sync('./src/components/*/!(*.e2e|*.spec)*.ts*').forEach((filePath) => {
        let data = fs.readFileSync(filePath, 'utf8');

        if (!data.match(/[\s\S]?\/\*\*[\s\S]*ORGENIC-UI[\s\S]*@license.*__ENTERNEWLICENSEHERE__[\s\S]*LICENSE[\s\S]*\*\*\//gm)) {
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
