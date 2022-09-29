import { parse } from "https://deno.land/std@0.158.0/flags/mod.ts";
import data from "../game/data.json" assert { type: "json" };
import type { Empty, Moves } from "../types/index.ts";
import { init } from "./constants/index.ts";
import { Game } from "./logic/index.ts";

// deno run --allow-read --allow-write src/index.ts --name="Tanishq Singh" --url="https://github.com/tanishq-singh-2301" --moveTo="C2"
// deno fmt --options-indent-width 4

type InputArgs = {
    name?: string;
    url?: string;
    moveTo?: string;
};

const { moveTo, name, url } = parse(Deno.args) as InputArgs;
const game = new Game(data.mesh as Empty);
const dataFilePath = "./game/data.json";

if (!moveTo || !name || !url || !game.isMoveValid(moveTo)) Deno.exit(1);

if (game.getMovableMoves().length > 0) { // Game is still on
    const userMove = game.HumanMove(moveTo as Moves);

    if (userMove) { // Successfully moved
        if (userMove.mode === "Running") { // Game is still on
            data.movesHistory = [
                ...data.movesHistory,
                { name, moveTo, url },
            ] as never[];

            const aiMove = game.AiMove();

            if (aiMove) {
                if (aiMove.mode === "Running") { // Game is still on
                    data.movesHistory = [
                        ...data.movesHistory,
                        {
                            name: "AI",
                            moveTo: aiMove.movedTo,
                            url: "https://github.com/tanishq-singh-2301/tic-tac-toe-readme",
                        },
                    ] as never[];
                } else { // Game finished
                    data.whoWon = aiMove.whoWon.toString().toUpperCase();
                    data.mode = aiMove.mode.toLowerCase();
                }
            }
        } else { // Game finished
            data.whoWon = userMove.whoWon.toString().toUpperCase();
            data.mode = userMove.mode.toLowerCase();
        }

        data.mesh = game.mesh as string[][];

        Deno.writeTextFileSync(
            dataFilePath,
            JSON.stringify(data, null, 4),
        );
    }
} else {
    data.mesh = init as string[][];
    data.mode = "running";
    data.movesHistory = [];
    data.whoWon = "";

    Deno.writeTextFileSync(
        dataFilePath,
        JSON.stringify(data, null, 4),
    );
}
