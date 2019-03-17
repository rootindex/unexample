import meow from 'meow'
import minimist from 'minimist'
import opt, { Options } from 'minimist-options'

const options: Options = {
    help: {
        type: 'boolean',
        alias: 'h',
        default: false
    },
    version: {
        type: 'boolean',
        alias: 'v',
        default: false,
    },
    silent: {
        type: 'boolean',
        alias: 's',
        default: false
    },
    force: {
        type: 'boolean',
        alias: 'f',
        default: false
    },
    input: {
        type: 'string',
        alias: 'i',
    },
    output: {
        type: 'string',
        alias: 'o',
    }
}

meow(`
Usage
  $ unexample <arguments>

Options
  --input       -i  Input file  (.env.example)
  --output      -o  Output file (.env)
  --force       -f  Overwrite .env if it exists 
  --silent      -s  Fail silently, if an error occured
  
  --help        -h  Show this help
  --version     -v  Show version

`, { flags: { ...options } })


const minimistArgument = opt(options)
const argv = minimist(process.argv.slice(2), minimistArgument);

export const input = argv.input || argv.i || '.env.example'
export const output = argv.output || argv.o || '.env'
export const force = argv.force || argv.f || false
export const silent = argv.silent || argv.s || false
