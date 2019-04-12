var spawn = require('child_process').spawn

function execute (commands) {
    if (typeof commands === 'string') {
        commands = [commands]
    }
    if (!Array.isArray(commands)) {
        throw new Error('Command(s) should be a string or an array')
    }
    return {
        name: 'execute',

        generateBundle: function (options, bundle) {
            var copy = commands.slice(0)
            var next = function () {
                var command
                if (!(command = copy.shift())) {
                    return
                }
                spawn(command, {
                    shell: true,
                    stdio: 'inherit',
                    env: process.env
                }).on('close', function (code) {
                    if (code === 0) {
                        next()
                    }
                })
            }
            next()
        }
    }
}

module.exports = execute
