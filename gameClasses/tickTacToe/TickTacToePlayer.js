/**
 * TickTacToePlayer
 *  > A Player in the Tick Tac Toe Game
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 */
var TickTacToePlayer = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_TickTacToePlayer, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function TickTacToePlayerConstructor(symbol) {
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
})(false);