const glob = require('glob');
const fs = require('fs');

function addCssVarsDefaultValue() {
    const opt = {
        files: 'src/components/**/*.scss'
    }
    const files = glob.sync(opt.files);
    files.forEach(file => {
        const component = file.match('.*/(.*).scss')[1];

        const props = {};

        const fileContent = fs.readFileSync(file).toString();
        // find host block in scss file
        const reHostContent = /^:host\s*\{([.\s\S]*?)^\}/gm;
        const matchHost = reHostContent.exec(fileContent);
        if (matchHost === null) {
            console.error('skipping component: unable to retreive host rules', matchHost);
        } else {
            // find css variable assignments
            const reVarDefault = /^\s*(--.*):.*var\((--.*?)[,\)]/gm;
            while((matchProps = reVarDefault.exec(matchHost[1])) !== null) {
                props[matchProps[1]] = matchProps[2];
            }
            addToReadme(component, props);
            // console.table(props);
        }
    });
}

function addToReadme(component, props) {
    const readme = `dist/docs/components/${component}/readme.md`;
    if (!fs.existsSync(readme)) {
        return;
    }
    const contents = fs.readFileSync(readme).toString();
    const lines = contents.split('\n');

    let cssVarTable = false;
    let newContents = '';
    lines.forEach(line => {
        newContents += line;
        if (!cssVarTable) {
            if (line.indexOf('## CSS Custom Properties') === 0) {
                cssVarTable = true;
            }
        } else {
            // extend markdown table with column for default value
            if (line.length === 0) {
                // ignore empty line
            } else if (line.indexOf('| Name') === 0) {
                // table header: append default value column
                newContents += ' Default Value |';
            } else if (line.indexOf('| ---------') === 0) {
                // table separator: append column
                newContents += ' ------------- |'
            } else if (line.indexOf('| `--') === 0) {
                // table content line: append default value if available
                const variable = /`(--.*)`/gm.exec(line)[1];
                if (!props[variable]) {
                    newContents += ` - |`;
                } else {
                    newContents += ` ${props[variable]} |`;
                }
            } else {
                cssVarTable = false;
            }
        }
        newContents += '\n';
    });
    fs.writeFileSync(readme, newContents);
}

module.exports = addCssVarsDefaultValue;
