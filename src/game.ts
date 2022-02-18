const inquirer = require('inquirer');

import { CONFIG } from './config/config';
import { DIRECTIONS, ACTIONS } from './model/enum';
import { Robot } from './model/robot';
import { getTestCommands } from './test/test';

let isRobotPlaced: boolean = false; // toggle if robot is placed

let robot: Robot = {} as Robot; // initialize Robot obj

const directions = [
  DIRECTIONS.NORTH,
  DIRECTIONS.EAST,
  DIRECTIONS.SOUTH,
  DIRECTIONS.WEST,
]; // directions array to cycle through

/**
 * Check if the provided Moved Robot will cause the Robot to fall
 * @param robot Robot with new coordinates
 * @returns boolean if robot is going to fall or not
 */
export const isGoingToFall = (robot: Robot): boolean => {
  return !(
    robot.coord_x >= CONFIG.X_MIN &&
    robot.coord_y >= CONFIG.Y_MIN &&
    robot.coord_x <= CONFIG.X_MAX &&
    robot.coord_y <= CONFIG.Y_MAX
  );
};

/**
 * Attempt a move using the current position of Robot
 * @return Move a temporary move value with new move coordinates and isGoingToFall
 */
export const moveAttempt = (): Robot => {
  let robotMove: Robot = {
    coord_x: robot.coord_x,
    coord_y: robot.coord_y,
    direction: robot.direction,
    isGoingToFall: true,
  };
  if (robot.direction === DIRECTIONS.NORTH) {
    robotMove.coord_y++;
  }
  if (robot.direction === DIRECTIONS.SOUTH) {
    robotMove.coord_y--;
  }
  if (robot.direction === DIRECTIONS.EAST) {
    robotMove.coord_x++;
  }
  if (robot.direction === DIRECTIONS.WEST) {
    robotMove.coord_x--;
  }

  robotMove.isGoingToFall = isGoingToFall(robotMove);

  return robotMove;
};

/**
 * Update current Robot position with provided Robot obj
 * @param move new Robot coordinates
 */
export const updateRobot = (tempRobot: Robot) => {
  robot = tempRobot;
};

/**
 * Move Robot coordinates relative to Direction
 */
export const moveRobot = () => {
  const moveRobot = moveAttempt();
  if (moveRobot.isGoingToFall)
    return console.log('Cannot move this way, Robot will fall');
  updateRobot(moveRobot);
};

/**
 * Report Robot coordinates and direction
 */
export const report = () => {
  console.log(`${robot.coord_x},${robot.coord_y},${robot.direction}`);
};

/**
 * Check if direction provided is valid
 * @param direction input direction to check
 * @returns boolean
 */
const isDirectionValid = (direction: string): boolean => {
  return directions.findIndex((d) => d === direction) >= 0;
};

/**
 * Place Robot into provided coordinates and direction
 * @param coord_x input coordinate for x
 * @param coord_y input coordinate for y
 * @param direction input direction
 */
export const place = (coord_x: number, coord_y: number, direction: string) => {
  if (!coord_x && !coord_y && !direction) return;
  // check if the direction provided is valid
  if (!isDirectionValid(direction)) return;

  const initialRobotPlacement = {
    coord_x: coord_x,
    coord_y: coord_y,
    direction: direction,
  } as Robot; // temporary

  if (isGoingToFall(initialRobotPlacement))
    return console.log('Cannot place Robot here');
  isRobotPlaced = true; // toggle isRobotPlaced to true
  updateRobot(initialRobotPlacement);
};

/**
 * Turn the Robot to Left or Right
 * @param direction Left or Right direction relative to current direction
 */
export const turn = (direction: string): string => {
  // get index of robot current direction
  let currDirection = directions.findIndex((d) => d === robot.direction);
  let nextDirection: number = 0;
  if (direction === ACTIONS.LEFT) {
    // rotate directions to the left
    nextDirection = (currDirection - 1) % directions.length;
  }
  if (direction === ACTIONS.RIGHT) {
    // rotate directions to the right
    nextDirection = (currDirection + 1) % directions.length;
  }
  if (nextDirection === -1) nextDirection = directions.length - 1;
  if (nextDirection === directions.length)
    nextDirection = directions.length - 1;
  return directions[nextDirection];
};

/**
 * Process Action input of User
 * @param actions action input of user
 * @param isTest flag if action is by Test
 */
export const action = (actions: string, isTest: boolean = false) => {
  const [action, details] = actions.toUpperCase().split(' ');
  if (action === ACTIONS.PLACE) {
    const robotDetails = details.split(',');
    place(+robotDetails[0], +robotDetails[1], robotDetails[2]);
  } else if (action === ACTIONS.MOVE && isRobotPlaced) {
    moveRobot();
  } else if (
    (action === ACTIONS.LEFT || action === ACTIONS.RIGHT) &&
    isRobotPlaced
  ) {
    const tempRobot = robot;
    tempRobot.direction = turn(action);
    updateRobot(tempRobot);
    // report();
  } else if (action === ACTIONS.REPORT && isRobotPlaced) {
    report();
  }
  if (action === ACTIONS.EXIT) return;
  actionListener(isTest);
};

/**
 * Listen for user input
 * @param isTest flag if action is by Test
 */
const actionListener = (isTest: boolean = false) => {
  if (isTest) return; // if the actions is done by Test, don't show inquirer
  inquirer
    .prompt([
      {
        name: 'action',
        message: 'Action',
      },
    ])
    .then((answers: { action: string }) => {
      action(answers.action);
    });
};

/**
 * Run tests
 */
export const test = async () => {
  const commands: string[] = await getTestCommands();
  commands.forEach((command, index) => {
    setTimeout(() => {
      console.log(`Test Command: ${command}`);
      action(command, true);
    }, index * 1000);
  });
};

/**
 * Start playing and listen for user input
 */
export const play = () => actionListener();
