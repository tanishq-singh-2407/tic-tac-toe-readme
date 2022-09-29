import type { Moves } from '../../types/index.ts';

const _1 = () => "\n\n#### **X:** It's your move... to choose _where_ to move..." + "\n\n";
const _2 = () => "|FROM|TO - _just click one of the links_ :)|" + "\n";
const _3 = () => "|-|-|" + "\n";
const __4 = (no: number, move: Moves) =>
	`|**${no}**|[${move}](https://github.com/tanishq-singh-2301/tic-tac-toe-readme/issues/new?title=ttt%7move%7${move}&body=Just+push+%27Submit+new+issue%27.+You+don%27t+need+to+do+anything+else.)|` +
	"\n";

export const renderMovables = (movables: Moves[]) => {
    let rendered = _1() + _2() + _3();
    movables.map((val, index) => rendered += __4(index + 1, val));

    return rendered;
}