/**
 * TickTacToeGame extends Game
 *  > The Launching point for the Tick Tac Toe Game.
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 * @extends Game
 */
var TickTacToeGame = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_TickTacToeGame, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function TickTacToeGameConstructor() {
		ParentClass.call(this); // super call

		_drawTickTacToeBoard.call(this);
		_drawPlayers.call(this);
	}

	/* ----- Public Variables ----- */
	/**
	 * Gets the next player to have a turn.
	 *
	 * @returns {TickTacToePlayer} - The player who's turn it now is
	 */
	_TickTacToeGame.prototype.getNextPlayer = function () {
		return (this._currentPlayerIndex == 0) ?
			this._players[++this._currentPlayerIndex] :
			this._players[--this._currentPlayerIndex];
	};
	/**
	 * Gets the player that matches the passed symbol
	 *
	 * @param symbol {string} - The symbol to find a matching player against
	 * @returns {TickTacToePlayer} - The player that matches the passed symbol
	 */
	_TickTacToeGame.prototype.getPlayerBySymbol = function (symbol) {
		return (this._players[0].symbol === symbol) ? this._players[0] : this._players[1];
	};
	/**
	 * Declare a player the winner, and end the game.
	 *
	 * @param player {TickTacToePlayer} - The player that is the winner (or null if no one won)
	 */
	_TickTacToeGame.prototype.declareWinner = function (player) {
		if (player != null) {
			// We have a winner
			Log.log(player.symbol + " is the winner!");

			// Update the score board
			this._scoreBoard.addPointTo(player);
		} else {
			// No one won...
			Log.log("No Victor, play again?");
		}

		// Replay Button
		this.$replayButton.visible = true;
	};

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	/** @type TickTacToeBoard */
	_TickTacToeGame.prototype._tickTacToeBoard = null;
	/** @type GameScoreBoard */
	_TickTacToeGame.prototype._scoreBoard = null;
	/** @type TickTacToePlayer[] */
	_TickTacToeGame.prototype._players = [
		new TickTacToePlayer('Player X', 'Red', 'X'),
		new TickTacToePlayer('Player O', 'Blue', 'O')
	];

	_TickTacToeGame.prototype._currentPlayerIndex = 0;

	/* ----- Private Methods ----- */
	function _drawTickTacToeBoard() {
		this._tickTacToeBoard = new TickTacToeBoard(200, 200, this);
		this._tickTacToeBoard.x = 50;
		this._tickTacToeBoard.y = 50;

		this.addChild(this._tickTacToeBoard);
	}
	function _drawPlayers() {
		this._scoreBoard = new GameScoreBoard(this._players, false, {width: 200, height: 100});
		this._scoreBoard.x = 300;
		this._scoreBoard.y = 50;
		this.addChild(this._scoreBoard);
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _TickTacToeGame() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _TickTacToeGame);

		/* Call constructor */
		TickTacToeGameConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _TickTacToeGame;
})(Game, false);