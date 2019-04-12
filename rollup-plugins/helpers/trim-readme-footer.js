const glob = require('glob');
const fs = require('fs');

function trimReadmeFooter() {
    const opt = {
        files: 'dist/docs/**/readme.md',
        from: new RegExp('^[-]{10,}.*', 'gms'),
        to: '',
    }
    const files = glob.sync(opt.files);
    console.log('found readme files', files.length);
    files.forEach(file => {
        let contents = fs.readFileSync(file).toString();

        for (let i = 0; i < 3; i++) {
            contents = contents.substr(0, contents.lastIndexOf('\n') - 1);
        }

        contents.replace(opt.from, opt.to);
        fs.writeFileSync(file, contents);

        console.log('trimmed readme', file);
    });
}

module.exports = trimReadmeFooter;
