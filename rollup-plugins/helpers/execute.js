
var spawn = require('child_process').spawn;

async function execute (commands) {
    if (typeof commands === 'string') {
        commands = [commands]
    }
    if (!Array.isArray(commands)) {
        throw new Error('Command(s) should be a string or an array')
    }

    var copy = commands.slice(0);

    return new Promise((resolve, reject) => {
        var next = function () {
            var command
            if (!(command = copy.shift())) {
                return resolve();
            }
            spawn(command, {
                shell: true,
                stdio: 'inherit',
                env: process.env
            }).on('close', function (code) {
                if (code === 0) {
                    next();
                }
            })
        }
        next();
    });
}

module.exports = execute
