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

		_theBoard = theBoard;
		_xPos = xPos;
		_yPos = yPos;
		_dimensions = squareDimensions;

		_setupSquare.call(this);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	var _theBoard = null;
	var _xPos = -1;
	var _yPos = -1;
	var _dimensions = {
		width: 0,
		height: 0
	};
	var _text = null;

	/* ----- Private Methods ----- */
	function _setupSquare() {
		// Draw a square, so it can be clicked on
		var bg = new createjs.Shape();
		bg.graphics.beginFill('#fff').drawRect(0, 0, _dimensions.width, _dimensions.height);
		this.addChild(bg);

		_text = new createjs.Text(_xPos, 'Bold 60px Arial', 'Red');

		this.addChild(_text);

		// Setup the click
		this.on('click', FunctionUtilities.callWithScope(_onClick, this));
	}
	function _onClick() {
		var player = _theBoard.currentPlayer();

		_text.text = player.symbol;
		_text.x = _dimensions.width / 2 - _text.getMeasuredWidth() / 2;
		_text.y = _dimensions.height / 2 - _text.getMeasuredHeight() / 2;
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