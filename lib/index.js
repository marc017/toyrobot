#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = __importDefault(require("commander"));
var clear = require('clear');
var figlet = require('figlet');
var instructions_1 = require("./instructions");
var Game = __importStar(require("./game"));
clear();
console.log(chalk_1.default.green(figlet.textSync('toy-robot-cli', { horizontalLayout: 'full' })));
commander_1.default
    .version('0.0.1')
    .description('Toy Robot Simulator CLI')
    .option('-t --test', 'Run game using test commands')
    .parse(process.argv);
commander_1.default.outputHelp();
instructions_1.showInstructions(); // Show Instructions
if (commander_1.default.test) {
    // Run tests if -t option is used
    Game.test();
}
else {
    // Start to Play Game
    Game.play();
}
