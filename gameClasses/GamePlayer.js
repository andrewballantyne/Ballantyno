/**
 * GamePlayer
 *  > The root class for all players in all games
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 */
var GamePlayer = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_GamePlayer, isAbstract);

	/**
	 * @constructor
	 *
	 * @param name {string} - The name that associates with this player
	 * @param color {string} - The colour this player will have
	 */
	function GamePlayerConstructor(name, color) {
		this.name = name;
		this.color = color;
	}

	/* ----- Public Variables ----- */
	_GamePlayer.prototype.name = ''; // the name of the player (visible on things like the score board)
	_GamePlayer.prototype.color = '';

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _GamePlayer() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _GamePlayer);

		/* Call constructor */
		GamePlayerConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _GamePlayer;
})(true);