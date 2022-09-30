import data from "../game/data.json" assert { type: "json" };
import type { DataJson, Empty, MovesHistory } from "../types/index.ts";
import { renderReadme } from "./renderer/index.ts";
import { parse } from "https://deno.land/std@0.158.0/flags/mod.ts";
import { RunGame } from "./game.ts";
import { Game } from "./logic/index.ts";

const dataFilePath = "./game/data.json";
const { game, render } = parse(Deno.args);

// deno run --allow-read --allow-write src/index.ts --game --name="Tanishq Singh" --url="https://github.com/tanishq-singh-2301" --moveTo="C2" --slf=""
if (game) await RunGame();
    
// deno run --allow-read --allow-write src/index.ts --render
else if (render) {
	const game = new Game(
		data.mesh as Empty,
		data.movesHistory as MovesHistory[]
	);

	data.mode = game.wond().user === "" ? "running" : "finished";
	data.movableMoves = game.getMovableMoves() as never[];
	data.slf = game.getSLF();
	data.whoWon = game.wond() as { user: string; array: never[] };
    
    await Deno.writeTextFile(dataFilePath, JSON.stringify(data, null, 4));
	await renderReadme(data as unknown as DataJson, "./README.md");
}