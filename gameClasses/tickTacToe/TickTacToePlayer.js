/**
 * TickTacToePlayer
 *  > A Player in the Tick Tac Toe Game
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 * @extends GamePlayer
 */
var TickTacToePlayer = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_TickTacToePlayer, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param name {string} - The name that associates with this player
	 * @param color {string} - The colour this player will have
	 * @param symbol {string} - The symbol that identifies this player (X or O)
	 */
	function TickTacToePlayerConstructor(name, color, symbol) {
		ParentClass.call(this, name, color);

		this.symbol = symbol;
	}

	/* ----- Public Variables ----- */
	_TickTacToePlayer.prototype.symbol = '?';

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _TickTacToePlayer() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _TickTacToePlayer);

		/* Call constructor */
		TickTacToePlayerConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _TickTacToePlayer;
})(GamePlayer, false);