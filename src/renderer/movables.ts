import type { DataJson, Moves } from "../../types/index.ts";

const _1 = (isCompleted: boolean) => `\n\n### **${isCompleted ? "Start a new game..." : "It's your turn..."} make a _move_...**` + "\n\n";
const _2 = () => "|FROM|TO - _just click one of the links_ :)|" + "\n";
const _3 = () => "|-|-|" + "\n";
const __4 = (no: number, move: Moves, slf: string) => `|**${no}**|<a target="_blank" rel="noopener" href="https://github.com/tanishq-singh-2301/tic-tac-toe-readme/issues/new?title=_ttt_move_${move.toLowerCase()}_${slf}_&labels=make+move&body=Just+push+'Submit+new+issue'.+You+don't+need+to+do+anything+else.">${move}</a>|` + "\n";

export const renderMovables = (data: DataJson) => {
    let rendered = _1(data.mode === "finished") + _2() + _3();

    if (data.whoWon.user === "")
        data.movableMoves.map((val, index) => rendered += __4(index + 1, val, data.slf));
    
    else
        ["A", "B", "C"].map((parent, p_ind) =>
            ["1", "2", "3"].map((box, b_ind) =>
                rendered += __4(((p_ind * 3) + b_ind) + 1, (parent + box) as Moves, ""))
        );
    
    return rendered;
};
