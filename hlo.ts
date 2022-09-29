// import data from "./game/data.json" assert { type: "json" };
// import { Game } from "tic-tac-toe-ts";
// import type { Empty, Moves } from "tic-tac-toe-ts/dist/types";
// import { writeFileSync } from "fs";
// import path from "path";

// type InputArgs = {
// 	name?: string;
// 	url?: string;
// 	moveTo?: Moves;
// };

// const { moveTo, name, url } = process.env as InputArgs;
// const isMoveValid = (move: string) =>
// 	move.length === 2 &&
// 	["a", "b", "c"].indexOf(move[0].toLowerCase()) > -1 &&
// 	[1, 2, 3].indexOf(parseInt(move[1])) > -1;

// if (!moveTo || !name || !url || !isMoveValid(moveTo)) process.exit(1);

// const game = new Game(data.mesh as Empty);

// if (game.getMovableMoves().length > 0) {
// 	const state = game.HumanMove(moveTo);

// 	if (state) {
// 		data.mesh = state.mesh;
// 		data.mode = state.mode.toLowerCase();
// 		data.movesHistory = [...data.movesHistory, { moveTo, name, url }];

// 		writeFileSync(
// 			path.resolve(__dirname, "game/data.json"),
// 			JSON.stringify(data, null, 4)
// 		);
// 	}
// } else {
// 	data.mode = "finished";

// 	writeFileSync(
// 		path.resolve(__dirname, "game/data.json"),
// 		JSON.stringify(data, null, 4)
// 	);
// }
