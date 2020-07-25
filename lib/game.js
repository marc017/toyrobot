"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = exports.test = exports.action = exports.turn = exports.place = exports.report = exports.moveRobot = exports.updateRobot = exports.moveAttempt = exports.isGoingToFall = void 0;
var inquirer = require('inquirer');
var config_1 = require("./config/config");
var enum_1 = require("./model/enum");
var test_1 = require("./test/test");
var isRobotPlaced = false; // toggle if robot is placed
var robot = {}; // initialize Robot obj
var directions = [
    enum_1.DIRECTIONS.NORTH,
    enum_1.DIRECTIONS.EAST,
    enum_1.DIRECTIONS.SOUTH,
    enum_1.DIRECTIONS.WEST,
]; // directions array to cycle through
/**
 * Check if the provided Moved Robot will cause the Robot to fall
 * @param robot Robot with new coordinates
 * @returns boolean if robot is going to fall or not
 */
exports.isGoingToFall = function (robot) {
    return !(robot.coord_x >= config_1.CONFIG.X_MIN &&
        robot.coord_y >= config_1.CONFIG.Y_MIN &&
        robot.coord_x <= config_1.CONFIG.X_MAX &&
        robot.coord_y <= config_1.CONFIG.Y_MAX);
};
/**
 * Attempt a move using the current position of Robot
 * @return Move a temporary move value with new move coordinates and isGoingToFall
 */
exports.moveAttempt = function () {
    var robotMove = {
        coord_x: robot.coord_x,
        coord_y: robot.coord_y,
        direction: robot.direction,
        isGoingToFall: true,
    };
    if (robot.direction === enum_1.DIRECTIONS.NORTH) {
        robotMove.coord_y++;
    }
    if (robot.direction === enum_1.DIRECTIONS.SOUTH) {
        robotMove.coord_y--;
    }
    if (robot.direction === enum_1.DIRECTIONS.EAST) {
        robotMove.coord_x++;
    }
    if (robot.direction === enum_1.DIRECTIONS.WEST) {
        robotMove.coord_x--;
    }
    robotMove.isGoingToFall = exports.isGoingToFall(robotMove);
    return robotMove;
};
/**
 * Update current Robot position with provided Robot obj
 * @param move new Robot coordinates
 */
exports.updateRobot = function (tempRobot) {
    robot = tempRobot;
};
/**
 * Move Robot coordinates relative to Direction
 */
exports.moveRobot = function () {
    var moveRobot = exports.moveAttempt();
    if (moveRobot.isGoingToFall)
        return console.log('Cannot move this way, Robot will fall');
    exports.updateRobot(moveRobot);
};
/**
 * Report Robot coordinates and direction
 */
exports.report = function () {
    console.log(robot.coord_x + "," + robot.coord_y + "," + robot.direction);
};
/**
 * Check if direction provided is valid
 * @param direction input direction to check
 * @returns boolean
 */
var isDirectionValid = function (direction) {
    return directions.findIndex(function (d) { return d === direction; }) >= 0;
};
/**
 * Place Robot into provided coordinates and direction
 * @param coord_x input coordinate for x
 * @param coord_y input coordinate for y
 * @param direction input direction
 */
exports.place = function (coord_x, coord_y, direction) {
    if (!coord_x && !coord_y && !direction)
        return;
    // check if the direction provided is valid
    if (!isDirectionValid(direction))
        return;
    var initialRobotPlacement = {
        coord_x: coord_x,
        coord_y: coord_y,
        direction: direction,
    }; // temporary
    if (exports.isGoingToFall(initialRobotPlacement))
        return console.log('Cannot place Robot here');
    isRobotPlaced = true; // toggle isRobotPlaced to true
    exports.updateRobot(initialRobotPlacement);
};
/**
 * Turn the Robot to Left or Right
 * @param direction Left or Right direction relative to current direction
 */
exports.turn = function (direction) {
    // get index of robot current direction
    var currDirection = directions.findIndex(function (d) { return d === robot.direction; });
    var nextDirection = 0;
    if (direction === enum_1.ACTIONS.LEFT) {
        // rotate directions to the left
        nextDirection = (currDirection - 1) % directions.length;
    }
    if (direction === enum_1.ACTIONS.RIGHT) {
        // rotate directions to the right
        nextDirection = (currDirection + 1) % directions.length;
    }
    if (nextDirection === -1)
        nextDirection = directions.length - 1;
    if (nextDirection === directions.length)
        nextDirection = directions.length - 1;
    return directions[nextDirection];
};
/**
 * Process Action input of User
 * @param actions action input of user
 * @param isTest flag if action is by Test
 */
exports.action = function (actions, isTest) {
    if (isTest === void 0) { isTest = false; }
    var _a = actions.toUpperCase().split(' '), action = _a[0], details = _a[1];
    if (action === enum_1.ACTIONS.PLACE) {
        var robotDetails = details.split(',');
        exports.place(+robotDetails[0], +robotDetails[1], robotDetails[2]);
    }
    else if (action === enum_1.ACTIONS.MOVE && isRobotPlaced) {
        exports.moveRobot();
    }
    else if ((action === enum_1.ACTIONS.LEFT || action === enum_1.ACTIONS.RIGHT) &&
        isRobotPlaced) {
        var tempRobot = robot;
        tempRobot.direction = exports.turn(action);
        exports.updateRobot(tempRobot);
        // report();
    }
    else if (action === enum_1.ACTIONS.REPORT && isRobotPlaced) {
        exports.report();
    }
    if (action === enum_1.ACTIONS.EXIT)
        return;
    actionListener(isTest);
};
/**
 * Listen for user input
 * @param isTest flag if action is by Test
 */
var actionListener = function (isTest) {
    if (isTest === void 0) { isTest = false; }
    if (isTest)
        return; // if the actions is done by Test, don't show inquirer
    inquirer
        .prompt([
        {
            name: 'action',
            message: 'Action',
        },
    ])
        .then(function (answers) {
        exports.action(answers.action);
    });
};
/**
 * Run tests
 */
exports.test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var commands;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, test_1.getTestCommands()];
            case 1:
                commands = _a.sent();
                commands.forEach(function (command, index) {
                    setTimeout(function () {
                        console.log("Test Command: " + command);
                        exports.action(command, true);
                    }, index * 1000);
                });
                return [2 /*return*/];
        }
    });
}); };
/**
 * Start playing and listen for user input
 */
exports.play = function () { return actionListener(); };
