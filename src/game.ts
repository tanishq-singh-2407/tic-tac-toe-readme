import data from "../game/data.json" assert { type: "json" };
import type { DataJson } from "../types/index.ts";
import { init } from "./constants/index.ts";
import { renderReadme } from "./renderer/index.ts";
import { getArgs } from "./utils/getArgs.ts";
import { getRandomArbitrary } from "./utils/index.ts";

export const RunGame = async () => {
    const { moveTo, name, url, game } = getArgs();
    const dataFilePath = "./game/data.json";

    if (!(game.getMovableMoves().length > 0)) {
        game.clear();

        data.mesh = init as (string | number)[][];
        data.mode = "running";
        data.movesHistory = [];
        data.whoWon = { user: "", array: [] };
        data.movableMoves = game.getMovableMoves() as never[];
        data.slf = game.getSLF();

        await Deno.writeTextFile(dataFilePath, JSON.stringify(data, null, 4));
    }

    const userMove = game.move({ name, url, user: 1, moveTo });

    if (userMove.mode === "Running") {
        // Game is still on
        const moves = game.getMovableMoves();
        const aiMove = game.move({
            name: "AI",
            moveTo: moves[getRandomArbitrary(0, moves.length)],
            user: 0,
            url: "https://github.com/tanishq-singh-2301/tic-tac-toe-readme",
        });

        if (aiMove.mode === "Running")
            data.movableMoves = game.getMovableMoves() as never[];
        else data.whoWon = aiMove.whoWon as { user: string; array: never[] };
    } else data.whoWon = userMove.whoWon as { user: string; array: never[] };

    if (data.whoWon.user !== "") {
        data.mode = "finished";
        data.no_of_games += 1;
        data.movableMoves = [];
    }

    data.mesh = game.mesh as (string | number)[][];
    data.movesHistory = game.movesHistory as never[];
    data.slf = game.getSLF();

    await Deno.writeTextFile(dataFilePath, JSON.stringify(data, null, 4));
    await renderReadme(data as unknown as DataJson, "./README.md");
}