import { Answer, Empty, Moves, MovesHistory } from "../../types/index.ts";
import { init } from "../constants/index.ts";

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
    movesHistory: MovesHistory[];

    constructor(mesh: Empty = init, movesHistory: MovesHistory[] = []) {
        this.mesh = mesh;
        this.movesHistory = movesHistory;
    }

    public clear() {
        this.mesh = init;
        this.movesHistory = [];
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
        const { user } = this.wond(mesh);
        if (user === "0" || user === "1" || user === "2") return [];

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

    public wond(
        mesh: Empty = this.mesh,
    ): { user: "0" | "1" | "2" | "" | unknown; array: Moves[] } {
        const [[A1, B1, C1], [A2, B2, C2], [A3, B3, C3]] = mesh;

        if (A1 === A2 && A2 === A3 && A1 !== "") {
            return { user: A1.toString(), array: ["A1", "A2", "A3"] };
        } else if (C1 === C2 && C2 === C3 && C1 !== "") {
            return { user: C1.toString(), array: ["C1", "C2", "C3"] };
        } else if (B3 === B2 && B2 === B1 && B3 !== "") {
            return { user: B3.toString(), array: ["B1", "B2", "B3"] };
        } else if (A1 === B1 && B1 === C1 && A1 !== "") {
            return { user: A1.toString(), array: ["A1", "B1", "C1"] };
        } else if (A2 === B2 && B2 === C2 && A2 !== "") {
            return { user: A2.toString(), array: ["A2", "B2", "C2"] };
        } else if (A3 === B3 && B3 === C3 && A3 !== "") {
            return { user: A3.toString(), array: ["A3", "B3", "C3"] };
        } else if (A1 === B2 && B2 === C3 && A1 !== "") {
            return { user: A1.toString(), array: ["A1", "B2", "C3"] };
        } else if (A3 === B2 && B2 === C1 && A3 !== "") {
            return { user: A3.toString(), array: ["A3", "B2", "C1"] };
        } else if (
            A1 !== "" &&
            A2 !== "" &&
            A3 !== "" &&
            B1 !== "" &&
            B2 !== "" &&
            B3 !== "" &&
            C1 !== "" &&
            C2 !== "" &&
            C3 !== ""
        ) return { user: "2", array: [] }; // DRAW
        else return { user: "", array: [] };
    }

    private setMove(move: Moves, user: 1 | 0, name: string, url: string) {
        const cleanMove = this.clean(move);
        const [x, y] = this.convertMoveToIndex(cleanMove);
        this.mesh[parseInt(x)][parseInt(y)] = user;

        const answer: Answer = {
            mode: "Running",
            mesh: this.mesh,
            whoWon: { user: "", array: [] },
            movedTo: cleanMove,
        };

        const isGameFinished = this.wond();

        if (isGameFinished.user !== "") {
            answer.mode = "Finished";
            answer.whoWon = isGameFinished;
        }

        this.movesHistory.push({
            moveTo: answer.movedTo,
            name,
            url,
        });

        return answer;
    }

    public move(
        { name, url = "", moveTo, user }: {
            name: string;
            url?: string;
            moveTo: Moves;
            user: 1 | 0;
        },
    ) {
        return this.setMove(moveTo, user, name, url);
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
        return (
            move.length === 2 &&
            ["a", "b", "c"].indexOf(move[0].toLowerCase()) > -1 &&
            [1, 2, 3].indexOf(parseInt(move[1])) > -1
        );
    }
}

export { Game };
