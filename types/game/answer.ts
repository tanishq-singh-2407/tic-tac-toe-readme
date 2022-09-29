import { Empty } from "./empty.ts";
import { Moves } from "./moves.ts";

export type Mode = "Running" | "Finished";
export type Answer = {
    mode: Mode;
    mesh: Empty;
    message?: string;
    body?: string;
    whoWon: "" | 1 | 0;
    movedTo: Moves;
};
