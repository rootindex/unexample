declare class ExampleCopy {
    constructor(input: string, output: string, force: boolean, silent: boolean);
    process(inputFile: string, outputFile: string, force: boolean): void;
    copy(inputFile: string, outputFile: string, force: boolean): void;
}
export default ExampleCopy;
