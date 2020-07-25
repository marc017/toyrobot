import { Robot } from './model/robot';
/**
 * Check if the provided Moved Robot will cause the Robot to fall
 * @param robot Robot with new coordinates
 * @returns boolean if robot is going to fall or not
 */
export declare const isGoingToFall: (robot: Robot) => boolean;
/**
 * Attempt a move using the current position of Robot
 * @return Move a temporary move value with new move coordinates and isGoingToFall
 */
export declare const moveAttempt: () => Robot;
/**
 * Update current Robot position with provided Robot obj
 * @param move new Robot coordinates
 */
export declare const updateRobot: (tempRobot: Robot) => void;
/**
 * Move Robot coordinates relative to Direction
 */
export declare const moveRobot: () => void;
/**
 * Report Robot coordinates and direction
 */
export declare const report: () => void;
/**
 * Place Robot into provided coordinates and direction
 * @param coord_x input coordinate for x
 * @param coord_y input coordinate for y
 * @param direction input direction
 */
export declare const place: (coord_x: number, coord_y: number, direction: string) => void;
/**
 * Turn the Robot to Left or Right
 * @param direction Left or Right direction relative to current direction
 */
export declare const turn: (direction: string) => string;
/**
 * Process Action input of User
 * @param actions action input of user
 * @param isTest flag if action is by Test
 */
export declare const action: (actions: string, isTest?: boolean) => void;
/**
 * Run tests
 */
export declare const test: () => Promise<void>;
/**
 * Start playing and listen for user input
 */
export declare const play: () => void;
