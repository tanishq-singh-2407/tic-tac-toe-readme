import { parse } from "https://deno.land/std@0.158.0/flags/mod.ts";
import { Game } from "../logic/index.ts";
import data from "../../game/data.json" assert { type: "json" };
import { Empty, Moves, MovesHistory } from "../../types/index.ts";

export type Args = {
    name?: string;
    url?: string;
    moveTo?: Moves;
    slf?: string;
};

export const getArgs = () => {
    const { moveTo: tempMoveTo, name, url, slf } = parse(Deno.args) as Args;
    const game = new Game(
        data.mesh as Empty,
        data.movesHistory as MovesHistory[],
    );
    const movables = game.getMovableMoves();

    const moveTo = tempMoveTo?.toUpperCase() as Moves;

    if (
        !moveTo ||
        !name ||
        !url ||
        !game.isMoveValid(moveTo) ||
        !((slf?.length === 9 && slf === game.getSLF()) ||
            (slf?.length === 0 && movables.length === 0)) ||
        (movables.length > 0 && !(movables.indexOf(moveTo) > -1))
    ) {
        Deno.exit(1);
    }

    return {
		name,
		moveTo: moveTo.toUpperCase() as Moves,
		url,
		slf,
		game,
    };
};
