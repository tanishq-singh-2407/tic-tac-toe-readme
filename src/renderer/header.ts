const _1 = () => "# tic-tac-toe-readme" + "\n\n";
const _2 = (isCompleted: boolean) =>
	`**${
		isCompleted ? "One more game is finished." : "Game is in progress."
	}** This is open to ANYONE to play the next move. That's the point. wave: It's your turn! Put a 'X'.` +
	"\n\n";

export const renderHeader = (isCompleted: boolean) => _1() + _2(isCompleted);
