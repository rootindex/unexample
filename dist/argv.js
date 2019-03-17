"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var meow_1 = __importDefault(require("meow"));
var minimist_1 = __importDefault(require("minimist"));
var minimist_options_1 = __importDefault(require("minimist-options"));
var options = {
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
};
meow_1.default("\nUsage\n  $ unexample <arguments>\n\nOptions\n  --input       -i  Input file  (.env.example)\n  --output      -o  Output file (.env)\n  --force       -f  Overwrite .env if it exists \n  --silent      -s  Fail silently, if an error occured\n  \n  --help        -h  Show this help\n  --version     -v  Show version\n\n", { flags: __assign({}, options) });
var minimistArgument = minimist_options_1.default(options);
var argv = minimist_1.default(process.argv.slice(2), minimistArgument);
exports.input = argv.input || argv.i || '.env.example';
exports.output = argv.output || argv.o || '.env';
exports.force = argv.force || argv.f || false;
exports.silent = argv.silent || argv.s || false;
