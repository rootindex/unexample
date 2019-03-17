"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var examplecopy_1 = __importDefault(require("./examplecopy"));
var argv_1 = require("./argv");
new examplecopy_1.default(argv_1.input, argv_1.output, argv_1.force, argv_1.silent);
