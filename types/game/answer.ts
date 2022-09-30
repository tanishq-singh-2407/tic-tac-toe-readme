import { Empty } from "./empty.ts";
import { Moves } from "./moves.ts";

export type Mode = "Running" | "Finished";
export type Answer = {
    mode: Mode;
    mesh: Empty;
    message?: string;
    body?: string;
    whoWon: { user: "0" | "1" | "2" | "" | unknown; array: Moves[] };
    movedTo: Moves;
};
