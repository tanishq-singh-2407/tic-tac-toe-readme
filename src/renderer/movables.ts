import type { DataJson, Moves } from "../../types/index.ts";

const _1 = (isCompleted: boolean) => `\n\n### **${isCompleted ? "Start a new game..." : "It's your turn..."} make a _move_...**` + "\n\n";
const _2 = () => "|FROM|TO - _just click one of the links_ :)|" + "\n";
const _3 = () => "|-|-|" + "\n";
const __4 = (no: number, move: Moves) => `|**${no}**|[${move}](https://github.com/tanishq-singh-2301/tic-tac-toe-readme/issues/new?title=ttt%7move%7${move}&body=Just+push+%27Submit+new+issue%27.+You+don%27t+need+to+do+anything+else.)|` + "\n";

export const renderMovables = (data: DataJson) => {
    let rendered = _1(data.mode === "finished") + _2() + _3();

    if (data.whoWon.user === "")
        data.movableMoves.map((val, index) => rendered += __4(index + 1, val));
    
    else
        ["A", "B", "C"].map((parent, p_ind) =>
            ["1", "2", "3"].map((box, b_ind) =>
                rendered += __4(((p_ind * 3) + b_ind) + 1, (parent + box) as Moves))
        );
    
    return rendered;
};
