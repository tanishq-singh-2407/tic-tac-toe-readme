import { Answer, Empty, Moves } from "../../types/index.ts";
import { init } from "../constants/index.ts";
import { getRandomArbitrary } from "../utils/index.ts";

/**
 * @param {Empty} mesh default [ ["", "", ""], ["", "", ""], ["", "", ""] ]
 * @example
 * ```ts
 *      const game = new Game(); // New game
 *      // or
 *      const game = new Game([ // To load game with particular positions.
 *          [1,"",1],
 *          [1,0,""],
 *          ["",1,0]
 *      ]);
 * ```
 */

class Game {
    mesh: Empty;

    constructor(mesh: Empty = init) {
        this.mesh = mesh;
    }

    public clear() {
        this.mesh = init;
    }

    private clean(move: Moves) {
        return (move[0].toUpperCase() + move[1]) as Moves;
    }

    public convertIndexToMove(parent: number, box: number) {
        return (["A", "B", "C"][box] + [1, 2, 3][parent]) as Moves;
    }

    public convertMoveToIndex(move: Moves) {
        const box = move[0].toUpperCase();
        const parent = move[1];

        return (parseInt(parent) - 1).toString() + { A: 0, B: 1, C: 2 }[box];
    }

    public getMovableMoves(mesh: Empty = this.mesh) {
        if (this.wond(mesh) !== null) return [];

        const moves: Moves[] = [];

        mesh.map((row, parent) =>
            row.map(
                (column, box) =>
                    column === "" &&
                    moves.push(this.convertIndexToMove(parent, box)),
            )
        );

        return moves;
    }

    public wond(mesh: Empty = this.mesh) {
        const [[A1, B1, C1], [A2, B2, C2], [A3, B3, C3]] = mesh;

        if (A1 === A2 && A2 === A3 && A1 !== "") return A1;
        else if (C1 === C2 && C2 === C3 && C1 !== "") return C1;
        else if (A1 === B1 && B1 === C1 && A1 !== "") return A1;
        else if (A3 === B3 && B3 === C3 && A3 !== "") return A3;
        else if (A1 === B2 && B2 === C3 && A1 !== "") return A1;
        else if (A3 === B2 && B2 === C1 && A3 !== "") return A3;
        else if (B3 === B2 && B2 === B1 && B3 !== "") return B3;
        else if (A2 === B2 && B2 === C2 && A2 !== "") return A2;
        else return null;
    }

    private setMove(move: Moves, hero: 1 | 0) {
        const cleanMove = this.clean(move);
        const [x, y] = this.convertMoveToIndex(cleanMove);
        this.mesh[parseInt(x)][parseInt(y)] = hero;

        const answer: Answer = {
            mode: "Running",
            mesh: this.mesh,
            whoWon: "",
            movedTo: cleanMove,
        };

        const isGameFinished = this.wond();

        if (isGameFinished !== null) {
            answer.mode = "Finished";
            answer.whoWon = isGameFinished;
        }

        return answer;
    }

    public AiMove() {
        const moves = this.getMovableMoves();
        if (moves.length === 0) return false;

        const aiMove = moves[getRandomArbitrary(0, moves.length)];
        return this.setMove(aiMove, 0);
    }

    public HumanMove(move: Moves) {
        const moves = this.getMovableMoves();
        if (moves.indexOf(this.clean(move)) < 0) return false;

        return this.setMove(move, 1);
    }

    /**
     * @name SingleLineFormat
     * @description Convert mesh (2d matrix) to much smaller string.
     * @param mesh Empty
     * @default this.mesh
     * @returns string
     */
    public getSLF(mesh: Empty = this.mesh) {
        let meshStr = "";
        mesh.map((parent) =>
            parent.map(
                (box) => (meshStr += box === "" ? "'" : box === 1 ? ":" : "."),
            )
        );

        return meshStr;
    }

    /**
     * @description Convert SLF (Single Line Format) to 2d mesh.
     * @param slf string
     * @returns Empty mesh
     */
    public getMeshFromSLF(slf: string) {
        if (slf.length !== 9) return false;

        const mesh: Empty = init;
        const getCharMove = (char: string) =>
            char === "'" ? "" : char === ":" ? 1 : 0;

        for (let i = 0; i < 3; i++) {
            mesh[0][i] = getCharMove(slf[i]);
            mesh[1][i] = getCharMove(slf[i + 3]);
            mesh[2][i] = getCharMove(slf[i + 3 + 3]);
        }

        return mesh;
    }

    public isMoveValid(move: string) {
        return move.length === 2 &&
            ["a", "b", "c"].indexOf(move[0].toLowerCase()) > -1 &&
            [1, 2, 3].indexOf(parseInt(move[1])) > -1;
    }
}

export { Game };
