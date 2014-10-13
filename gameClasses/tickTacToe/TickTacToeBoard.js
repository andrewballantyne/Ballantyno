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

		this.width = width;
		this.height = height;

		_drawLines.call(this);
		_setupSquares.call(this);
	}

	/* ----- Public Variables ----- */
	_TickTacToeBoard.prototype.width = 0;
	_TickTacToeBoard.prototype.height = 0;

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	_TickTacToeBoard.prototype.currentPlayer = function () {
		if (_currentPlayer == null) _currentPlayer = _X_PLAYER;
		else if (_currentPlayer == _X_PLAYER) _currentPlayer = _O_PLAYER;
		else if (_currentPlayer == _O_PLAYER) _currentPlayer = _X_PLAYER;
		return _currentPlayer;
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	var _X_PLAYER = new TickTacToePlayer('X');
	var _O_PLAYER = new TickTacToePlayer('O');

	var _currentPlayer = null;
	var _lineCapRadius = 5;
	var _lineWidth = 5;
	var _lineHeight = 5;
	var _aClickSquare = {
		width : 0,
		height : 0
	};
	var _squares = {
		0 : { 			// top row
			0 : null,		// top, left
			1 : null,		// top, center
			2 : null		// top, right
		},
		1 : { 			// middle row
			0 : null,		// middle, left
			1 : null,		// middle, center
			2 : null		// middle, right
		},
		2 : { 			// bottom row
			0 : null,		// bottom, left
			1 : null,		// bottom, center
			2 : null		// bottom, right
		}
	};

	/* ----- Private Methods ----- */
	function _drawLines() {
		var gridLines = new createjs.Shape();
		//   1/3 2/3  |3/3
		//    |   |
		// ---+---+--- 1/3
		//    |   |
		// ---+---+--- 2/3
		//    |   |
		//            -3/3
		_aClickSquare.width = (this.width - _lineWidth*3) / 3;
		_aClickSquare.height = (this.height - _lineHeight*3) / 3;

		gridLines.graphics.beginFill('black');

		// first vertical
		gridLines.graphics.drawRoundRect(_aClickSquare.width, 0, _lineWidth, this.height, _lineCapRadius);
		// second vertical
		gridLines.graphics.drawRoundRect(_aClickSquare.width * 2 + _lineWidth, 0, _lineWidth, this.height, _lineCapRadius);

		// first horizontal
		gridLines.graphics.drawRoundRect(0, _aClickSquare.height, this.width, _lineHeight, _lineCapRadius);
		// second horizontal
		gridLines.graphics.drawRoundRect(0, _aClickSquare.height * 2 + _lineHeight, this.width, _lineHeight, _lineCapRadius);

		this.addChild(gridLines);
	}
	function _setupSquares() {
		var SQUARE_COUNT = 3;
		for (var h = 0; h < SQUARE_COUNT; h++) {
			for (var v = 0; v < SQUARE_COUNT; v++) {
				var square = new TickTacToeSquare(h, v, _aClickSquare, this);
				square.x = _aClickSquare.width * h + _lineWidth * h;
				square.y = _aClickSquare.height * v + _lineHeight * v;

				this.addChild(square);
				_squares[h][v] = square;
			}
		}
	}

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
})(createjs.Container, false);