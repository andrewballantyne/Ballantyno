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

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_TickTacToeSquare.prototype._theBoard = null;
	_TickTacToeSquare.prototype._xPos = -1;
	_TickTacToeSquare.prototype._yPos = -1;
	_TickTacToeSquare.prototype._dimensions = {
		width: 0,
		height: 0
	};
	_TickTacToeSquare.prototype._text = null;

	/* ----- Private Methods ----- */
	function _setupSquare() {
		// Draw a square, so it can be clicked on
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#fff').drawRect(0, 0, this._dimensions.width, this._dimensions.height);
		this.addChild(bg);

		this._text = new createjs.Text('', 'Bold 60px Arial', 'Red');

		this.addChild(this._text);

		// Setup the click
		this.on('click', FunctionUtilities.callWithScope(_onClick, this));
	}
	function _onClick() {
		var player = this._theBoard.currentPlayer();

		this._text.text = player.symbol;
		this._text.x = this._dimensions.width / 2 - this._text.getMeasuredWidth() / 2;
		this._text.y = this._dimensions.height / 2 - this._text.getMeasuredHeight() / 2;
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