import { Empty, Moves } from "./index.ts";

export type MovesHistory = {
    name: string;
    url: string;
    moveTo: Moves;
};

export type DataJson = {
    name: string;
    mode: "running" | "finished";
    mesh: Empty;
    movesHistory: MovesHistory[];
    movableMoves: Moves[];
    whoWon: "" | "1" | "0";
    slf: string;
};
