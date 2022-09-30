import type { DataJson, Moves } from "../../types/index.ts";

const indexToMove = (parent: number, box: number) => (["A", "B", "C"][box] + [1, 2, 3][parent]) as Moves;

const getPiece = (data: DataJson, parent: number, box: number) => {
    const state = data.mesh[parent][box];
    const color: "green" | "yellow" =
		data.whoWon.array.indexOf(indexToMove(parent, box)) > -1
			? "yellow"
			: "green";

    return `![](./images/${color}/${state === "" ? "blank" : state}.png)`;
};

const _1 = () => "\n\n||A|B|C|" + "\n";
const _2 = () => "|-|:-:|:-:|:-:|" + "\n";
const __3_4_5 = (data: DataJson, parent: number) =>
    `|**${parent + 1}**|${getPiece(data, parent, 0)}|${getPiece(data, parent, 1)}|${getPiece(data, parent, 2)}|` + "\n";

export const renderGameBoard = (data: DataJson) =>
    _1() + _2() + __3_4_5(data, 0) + __3_4_5(data, 1) + __3_4_5(data, 2);
