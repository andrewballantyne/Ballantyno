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
	 * Extend Constructor:
	 *  - Checks to see if we are abstract
	 *  - Calls parent (this passes scope through)
	 *  - Executes our constructor code
	 *
	 * @param width - The width of the board
	 * @param height - The height of the board
	 */
	function _TickTacToeBoard(width, height) {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _TickTacToeBoard);

		/* Super call */
		ParentClass.call(this); // pass scope down to child class

		/* Our Constructor implementation */
		this.graphics.beginFill('black').drawRect(0, 0, width, height);
	}

	/* Return the class, ready for a new ...() */
	return _TickTacToeBoard;
})(createjs.Shape, false);