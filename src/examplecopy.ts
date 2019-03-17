import * as path from 'path'
import * as fs from 'fs'
import _ from 'underscore'

class ExampleCopy {

    constructor(
        input: string,
        output: string,
        force: boolean,
        silent: boolean
    ) {

        try {
            _.each({ input, output, force, silent }, (obj, key) => {
                if (typeof obj === 'object') {
                    throw new Error(`No duplicated entries allowed for "--${key}" argument or option`)
                }
            })

            this.process(input, output, force)

        } catch (err) {
            !silent ? console.log(err.message) : ''
        }
    }

    process(inputFile: string, outputFile: string, force: boolean) {

        const input = path.resolve(inputFile)

        let output = ''

        if (outputFile === '.env') { // default outputFile name
            output = path.resolve(path.dirname(input), outputFile)
        } else {
            output = path.resolve(outputFile)
        }

        if (!fs.existsSync(input)) {
            throw new Error(`No example file exist at: ${input}`)
        }

        if (!fs.existsSync(output)) {
            return this.copy(input, output, force)
        }

        if (fs.existsSync(output) && force) {
            return this.copy(input, output, force)

        }

        if (fs.existsSync(output) && !force) {
            console.warn(`Did not overwrite ${output} use --force to ignore this safety check`)
        }
    }

    copy(inputFile: string, outputFile: string, force: boolean): void {

        let lines: string[] = []

        lines = (fs.readFileSync(inputFile, 'utf8') || '')
            .split(/\r?\n|\r/)
            .filter(line => /\s*=\s*/i.test(line))
            .map(line => line.replace('exports ', ''))

        let envLines: string[] = []

        _.each(lines, line => {
            if (!/^\s*\#/i.test(line)) {
                let keyValue = line.match(/^([^=]+)\s*=\s*(.*)$/)
                if (keyValue && keyValue.length !== 0) {
                    let mergedValue = process.env[keyValue[1]] || keyValue[2]
                    envLines.push(`${keyValue[1]}=${mergedValue}`)
                }
            }
        })

        const finalEnv = envLines.join("\r\n") || ''
        fs.writeFileSync(outputFile, finalEnv)

        console.log(`Copied ${envLines.length} variable(s) and removed ${lines.length - envLines.length} comment(s)`)
        console.log(`From ${path.basename(inputFile)} to ${path.basename(outputFile)} file`)
    }
}

export default ExampleCopy