/**
 * TickTacToeBoard extends createjs.Shape
 *  > The Visual Tick Tac Tao Game Board
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @extends createjs.Shape
 */
var TickTacToeBoard = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_TickTacToeBoard, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param width - The width of the board
	 * @param height - The height of the board* @constructor
	 */
	function TickTacToeBoardConstructor(width, height) {
		ParentClass.call(this); // super call

		/* Our Constructor implementation */
		this.graphics.beginFill('black').drawRect(0, 0, width, height);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _TickTacToeBoard(width, height) {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _TickTacToeBoard);

		/* Call constructor */
		TickTacToeBoardConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _TickTacToeBoard;
})(createjs.Shape, false);