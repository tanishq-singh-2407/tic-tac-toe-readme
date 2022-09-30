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
	whoWon: { user: "0" | "1" | "2" | "" | unknown; array: Moves[] };
	slf: string;
};
