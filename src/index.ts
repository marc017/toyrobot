#!/usr/bin/env node

import chalk from 'chalk';
import program from 'commander';
const clear = require('clear');
const figlet = require('figlet');

import { showInstructions } from './instructions';
import * as Game from './game';

clear();
console.log(
  chalk.green(figlet.textSync('toy-robot-cli', { horizontalLayout: 'full' }))
);
program
  .version('0.0.1')
  .description('Toy Robot Simulator CLI')
  .option('-t --test', 'Run game using test commands')
  .parse(process.argv);

program.outputHelp();

showInstructions(); // Show Instructions

if (program.test) {
  // Run tests if -t option is used
  Game.test();
} else {
  // Start to Play Game
  Game.play();
}
