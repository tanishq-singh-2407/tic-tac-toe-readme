import { DataJson } from "../../types/data.ts";
import { renderGameBoard, renderHeader, renderMovables, renderMovesHistory, renderStatic, } from "./index.ts";

export const renderReadme = async (data: DataJson, path: string) => {
    const header = renderHeader(data.mode === "finished");
    const gameBoard = renderGameBoard(data);
    const whoIsWhat = renderStatic(
		"### **Who is what?**\n|Piece|who|\n|-|-|\n|**X**|You|\n|**Y**|Computer|"
	);
    const movables = renderMovables(data);
    const working = renderStatic(
        "**How this works**\n\nWhen you click a link, it opens a GitHub Issue with the required pre-populated text. Just push 'Create New Issue'. That will trigger a [GitHub Actions](https://github.blog/2020-07-03-github-action-hero-casey-lee/) workflow that'll update my GitHub Profile _README.md_ with the new state of the board.",
    );
    const problem = renderStatic(
        "**Notice a problem?**\n\nRaise an [issue](https://github.com/timburgan/timburgan/issues), and include the text _cc @timburgan_.",
    );
    const movesHistory = renderMovesHistory(data.movesHistory);

    const README = header + gameBoard + whoIsWhat + movables + working + problem +
        movesHistory;

    await Deno.writeTextFile(path, README);
};
