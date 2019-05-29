const glob = require('glob');
const fs = require('fs');
const moment = require('moment');

const regex = 'function\\s\\(moment\\)\\s{([.\\S\\s]*)}';
// const regex = '(week\\s:\\s{[.\\S\\s]*?})|(((weekdays|months|week)\\w*\\s):.*)';
const languages = ['de', 'fr', 'it', 'es', 'se', 'nl', 'pl', 'ru'];

function momentLocales2Modules(options) {
    const opt = {
        files: (options && options.files) || 'node_modules/moment/locale/*.js',
        outDir: (options && options.outDir) || 'www/assets/og-datepicker-locales'
    };

    if (!fs.existsSync(opt.outDir)) {
        fs.mkdirSync(opt.outDir, { recursive: true });
    }

    const files = glob.sync(opt.files);

    files.forEach(file => {
        const locale = file.match('.*/(.*).js')[1];
        // if (languages.indexOf(locale) < 0) {
        //     return;
        // }
        // console.log(locale);

        const fileContent = fs.readFileSync(file).toString();

        const re = new RegExp(regex, 'gm');

        let result = '';
        let match = re.exec(fileContent);
        if (match != null) {
            result = `export { addToMoment };\n\nfunction addToMoment(moment) {\n${match[1]}\n}\n`;

            try {
                fs.writeFileSync(`${opt.outDir}/${locale}.mjs`, result);
            } catch (e) {
                console.log(e);
            }
        }
    });
}

module.exports = momentLocales2Modules;
