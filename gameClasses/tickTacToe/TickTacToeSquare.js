/**
 * TickTacToeSquare
 *  > A Square on a Tick Tac Toe board; this is the square that gets an 'X' or an 'O'.
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 */
var TickTacToeSquare = (function (ParentClass, isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClassExtend(_TickTacToeSquare, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param xPos {number} - The x position of this square (0 being the left side, 2 being the right side of the grid)
	 * @param yPos {number} - The y position of this square (0 being the top, 2 being the bottom)
	 * @param squareDimensions {Dimension} - A dimension object with the width/height of this square
	 * @param theBoard {TickTacToeBoard} - The reference back to the board that owns this square
	 */
	function TickTacToeSquareConstructor(xPos, yPos, squareDimensions, theBoard) {
		ParentClass.call(this);

		this._theBoard = theBoard;
		this._xPos = xPos;
		this._yPos = yPos;
		this._dimensions = squareDimensions;

		_setupSquare.call(this);
	}

	/* ----- Public Variables ----- */
	_TickTacToeSquare.prototype.checkedState = '';
	_TickTacToeSquare.prototype.locked = false;

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_TickTacToeSquare.prototype._DEFAULT_TEXT = '';

	/** @type TickTacToeBoard */
	_TickTacToeSquare.prototype._theBoard = null;
	/** @type Dimension */
	_TickTacToeSquare.prototype._dimensions = null;
	/** @type createjs.Text */
	_TickTacToeSquare.prototype._text = null;

	_TickTacToeSquare.prototype._xPos = -1;
	_TickTacToeSquare.prototype._yPos = -1;

	/* ----- Private Methods ----- */
	function _setupSquare() {
		// Draw a square, so it can be clicked on
		var bg = new createjs.Shape();
		bg.graphics.beginFill('white').drawRect(0, 0, this._dimensions.width, this._dimensions.height);
		this.addChild(bg);

		this._text = new createjs.Text(this._DEFAULT_TEXT, 'Bold 50px Arial', 'Red');

		this.addChild(this._text);

		// Setup the click
		this.on('click', FunctionUtilities.callWithScope(_onClick, this));
	}
	function _onClick() {
		if (this.locked) return;
		if (this._text.text != this._DEFAULT_TEXT) return; // already have something, cannot change it again
		var player = this._theBoard.currentPlayer();

		this._text.text = player.symbol;
		this._text.color = player.color;
		this._text.x = this._dimensions.width / 2 - this._text.getMeasuredWidth() / 2;
		this._text.y = this._dimensions.height / 2 - this._text.getMeasuredLineHeight() / 2;

		this.checkedState = player.symbol;

		// Signal a check
		this._theBoard.checkVictor();
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _TickTacToeSquare() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _TickTacToeSquare);

		/* Call constructor */
		TickTacToeSquareConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _TickTacToeSquare;
})(createjs.Container, false);