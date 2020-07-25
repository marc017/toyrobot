import { Robot } from "./robot";
export interface Move extends Robot {
    isGoingToFall: boolean;
}
