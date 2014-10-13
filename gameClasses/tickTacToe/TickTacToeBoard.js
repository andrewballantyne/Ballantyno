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
		if (this._currentPlayer == null) this._currentPlayer = this._X_PLAYER;
		else if (this._currentPlayer == this._X_PLAYER) this._currentPlayer = this._O_PLAYER;
		else if (this._currentPlayer == this._O_PLAYER) this._currentPlayer = this._X_PLAYER;
		return this._currentPlayer;
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_TickTacToeBoard.prototype._X_PLAYER = new TickTacToePlayer('X');
	_TickTacToeBoard.prototype._O_PLAYER = new TickTacToePlayer('O');

	_TickTacToeBoard.prototype._currentPlayer = null;
	_TickTacToeBoard.prototype._lineCapRadius = 5;
	_TickTacToeBoard.prototype._lineWidth = 5;
	_TickTacToeBoard.prototype._lineHeight = 5;
	_TickTacToeBoard.prototype._aClickSquare = {
		width : 0,
		height : 0
	};
	_TickTacToeBoard.prototype._squares = {
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
		this._aClickSquare.width = (this.width - this._lineWidth*3) / 3;
		this._aClickSquare.height = (this.height - this._lineHeight*3) / 3;

		gridLines.graphics.beginFill('black');

		// first vertical
		gridLines.graphics.drawRoundRect(
			this._aClickSquare.width,
			0,
			this._lineWidth,
			this.height,
			this._lineCapRadius
		);
		// second vertical
		gridLines.graphics.drawRoundRect(
			this._aClickSquare.width * 2 + this._lineWidth,
			0,
			this._lineWidth,
			this.height,
			this._lineCapRadius
		);

		// first horizontal
		gridLines.graphics.drawRoundRect(
			0,
			this._aClickSquare.height,
			this.width,
			this._lineHeight,
			this._lineCapRadius
		);
		// second horizontal
		gridLines.graphics.drawRoundRect(
			0,
			this._aClickSquare.height * 2 + this._lineHeight,
			this.width,
			this._lineHeight,
			this._lineCapRadius
		);

		this.addChild(gridLines);
	}
	function _setupSquares() {
		var SQUARE_COUNT = 3;
		for (var h = 0; h < SQUARE_COUNT; h++) {
			for (var v = 0; v < SQUARE_COUNT; v++) {
				var square = new TickTacToeSquare(h, v, this._aClickSquare, this);
				square.x = this._aClickSquare.width * h + this._lineWidth * h;
				square.y = this._aClickSquare.height * v + this._lineHeight * v;

				this.addChild(square);
				this._squares[h][v] = square;
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