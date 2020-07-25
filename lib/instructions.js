"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showInstructions = void 0;
var instructions = [
    "Toy Robot Simulator CLI\n",
    "Table size is 5x5\n",
    "Available Actions\n",
    "PLACE <x_coordinate>,<y_coordinate>,<direction> - Place Robot on desired coordinates and direction",
    "-- Default value is 0,0,NORTH",
    "LEFT - Turn left from current direction",
    "RIGHT - Turn right from current direction",
    "MOVE - move one step towards the current direction",
    "REPORT - view current position of Robot",
    "EXIT - exit Toy Robot CLI\n",
];
exports.showInstructions = function () {
    instructions.forEach(function (instruction) { return console.log(instruction); });
};
