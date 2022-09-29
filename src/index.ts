import { parse } from "https://deno.land/std@0.158.0/flags/mod.ts";
import data from "../game/data.json" assert { type: "json" };
import type { Empty, Moves } from "../types/index.ts";
import { init } from "./constants/index.ts";
import { Game } from "./logic/index.ts";
import { renderGameBoard, renderHeader, renderMovables, renderMovesHistory, renderStatic } from "./renderer/index.ts";

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
            data.movableMoves = game.getMovableMoves() as never[];
            data.movesHistory = [
                ...data.movesHistory,
                { name, moveTo, url },
            ] as never[];

            const aiMove = game.AiMove();

            if (aiMove) {
                if (aiMove.mode === "Running") { // Game is still on
                    data.movableMoves = game.getMovableMoves() as never[];
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
                    data.movableMoves = [];
                }
            }
        } else { // Game finished
            data.whoWon = userMove.whoWon.toString().toUpperCase();
            data.mode = userMove.mode.toLowerCase();
            data.movableMoves = [];
        }

        data.mesh = game.mesh as string[][];

        Deno.writeTextFileSync(
            dataFilePath,
            JSON.stringify(data, null, 4),
        );
    }
} else {
    game.clear();
    
    data.mesh = init as string[][];
    data.mode = "running";
    data.movesHistory = [];
    data.whoWon = "";
    data.movableMoves = game.getMovableMoves() as never[];

    Deno.writeTextFileSync(
        dataFilePath,
        JSON.stringify(data, null, 4),
    );
}

const header = renderHeader();
const gameBoard = renderGameBoard(game.mesh);
const movables = renderMovables(game.getMovableMoves());
const working = renderStatic("**How this works**\n\nWhen you click a link, it opens a GitHub Issue with the required pre-populated text. Just push 'Create New Issue'. That will trigger a [GitHub Actions](https://github.blog/2020-07-03-github-action-hero-casey-lee/) workflow that'll update my GitHub Profile _README.md_ with the new state of the board.");
const problem = renderStatic("**Notice a problem?**\n\nRaise an [issue](https://github.com/timburgan/timburgan/issues), and include the text _cc @timburgan_.");
const movesHistory = renderMovesHistory(data.movesHistory);

const README = header + gameBoard + movables + working + problem + movesHistory;

Deno.writeTextFileSync("./test.md", README);
