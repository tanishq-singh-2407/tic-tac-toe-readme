import type { Empty } from "../../types/index.ts";

const getPiece = (mesh: Empty, parent: number, box: number) => {
    const color: "green" | "yellow" = "green";
    const state = mesh[parent][box];

    return `![](./images/${color}/${state === "" ? "blank" : state}.png)`;
};

const _1 = () => "\n\n||A|B|C|" + "\n";
const _2 = () => "|-|:-:|:-:|:-:|" + "\n";
const __3_4_5 = (mesh: Empty, parent: number) =>
    `|**${parent + 1}**|${getPiece(mesh, parent, 0)}|${
        getPiece(mesh, parent, 1)
    }|${getPiece(mesh, parent, 2)}|` + "\n";

export const renderGameBoard = (mesh: Empty) =>
    _1() + _2() + __3_4_5(mesh, 0) + __3_4_5(mesh, 1) + __3_4_5(mesh, 2);
