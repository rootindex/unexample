"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var underscore_1 = __importDefault(require("underscore"));
var ExampleCopy = /** @class */ (function () {
    function ExampleCopy(input, output, force, silent) {
        try {
            underscore_1.default.each({ input: input, output: output, force: force, silent: silent }, function (obj, key) {
                if (typeof obj === 'object') {
                    throw new Error("No duplicated entries allowed for \"--" + key + "\" argument or option");
                }
            });
            this.process(input, output, force);
        }
        catch (err) {
            !silent ? console.log(err.message) : '';
        }
    }
    ExampleCopy.prototype.process = function (inputFile, outputFile, force) {
        var input = path.resolve(inputFile);
        var output = '';
        if (outputFile === '.env') { // default outputFile name from argv.ts            
            output = path.resolve(path.dirname(input), outputFile);
        }
        else {
            output = path.resolve(outputFile);
        }
        if (!fs.existsSync(input)) {
            throw new Error("No example file exist at: " + input);
        }
        if (!fs.existsSync(output)) {
            return this.copy(input, output, force);
        }
        if (fs.existsSync(output) && force) {
            return this.copy(input, output, force);
        }
        if (fs.existsSync(output) && !force) {
            console.warn("Did not overwrite " + output + " use --force to ignore this safety check");
        }
    };
    ExampleCopy.prototype.copy = function (inputFile, outputFile, force) {
        var lines = [];
        lines = (fs.readFileSync(inputFile, 'utf8') || '')
            .split(/\r?\n|\r/)
            .filter(function (line) { return /\s*=\s*/i.test(line); })
            .map(function (line) { return line.replace('exports ', ''); });
        var envLines = [];
        underscore_1.default.each(lines, function (line) {
            if (!/^\s*\#/i.test(line)) {
                var keyValue = line.match(/^([^=]+)\s*=\s*(.*)$/);
                if (keyValue && keyValue.length !== 0) {
                    var mergedValue = process.env[keyValue[1]] || keyValue[2];
                    envLines.push(keyValue[1] + "=" + mergedValue);
                }
            }
        });
        var finalEnv = envLines.join("\r\n") || '';
        fs.writeFileSync(outputFile, finalEnv);
        console.log("Copied " + envLines.length + " variable(s) and removed " + (lines.length - envLines.length) + " comment(s) from " + path.basename(inputFile) + " to " + path.basename(outputFile) + " file");
    };
    return ExampleCopy;
}());
exports.default = ExampleCopy;
