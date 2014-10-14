/**
 * Game
 *  > The Base class for all games
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 */
var Game = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_Game, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function GameConstructor() {
		ParentClass.call(this); // super call

		_renderReplayButton.call(this);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */
	_Game.prototype.$replayButton = null; /** @see GameButton */

	/* ----- Public Methods ----- */
	_Game.prototype.restartGame = function () {
		Log.warn("Restart Game not implemented");
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */
	function _renderReplayButton() {
		this.$replayButton = new GameButton('Replay?', 75, 30);
		this.$replayButton.x = 5;
		this.$replayButton.y = 5;
		this.$replayButton.setClick(FunctionUtilities.callWithScope(this.restartGame, this));
		this.addChild(this.$replayButton);
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _Game() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _Game);

		/* Call constructor */
		GameConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _Game;
})(createjs.Container, true);