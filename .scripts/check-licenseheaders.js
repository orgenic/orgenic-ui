'use strict';

(function() {
    const fs = require('fs');
    const glob = require('glob');

    const licenseheader = `/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/`;

    glob.sync('./src/components/*/!(*.e2e|*.spec)*.ts*').forEach((filePath) => {
        console.log(filePath);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (!data.match(/[\n\r]?\/\*\*.*ORGENIC-UI.*@license.*MIT.*LICENSE.*\*\*\//)) {
                console.log(`${filePath}: Add missing licenseheader.`);
                fs.writeFile(filePath, `${licenseheader}\n\n${data}`, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    });

}());
