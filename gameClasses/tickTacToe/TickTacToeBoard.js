/**
 * TickTacToeBoard extends createjs.Shape
 *  > The Visual Tick Tac Tao Game Board
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @extends createjs.Container
 */
var TickTacToeBoard = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_TickTacToeBoard, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param width {number} - The width of the board
	 * @param height {height} - The height of the board
	 * @param game {TickTacToeGame} - The reference back to the Tick Tac Toe Game object
	 */
	function TickTacToeBoardConstructor(width, height, game) {
		ParentClass.call(this); // super call

		this.width = width;
		this.height = height;
		this._game = game;

		_drawLines.call(this);
		_setupSquares.call(this);
	}

	/* ----- Public Variables ----- */
	_TickTacToeBoard.prototype.width = 0;
	_TickTacToeBoard.prototype.height = 0;

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	/**
	 * Gets the current active player.
	 *
	 * @returns {TickTacToePlayer} - The current player that is playing
	 */
	_TickTacToeBoard.prototype.currentPlayer = function () {
		this._currentPlayer = this._game.getNextPlayer();
		return this._currentPlayer;
	};
	/**
	 * Check to see if we have a victor (has anyone made 3 straight marks?).
	 */
	_TickTacToeBoard.prototype.checkVictor = function () {
		this._cellsFilled++;
		if (this._cellsFilled < 5) return; // Can't have a victor until at least 5 pieces are played

		var aSymbol, bSymbol, cSymbol;
		for (var i = 0; i < this._WIN_LINES.length; i++) {
			var winLine = this._WIN_LINES[i];
			aSymbol = this._squares[winLine["a"][0]][winLine["a"][1]].checkedState;
			bSymbol = this._squares[winLine["b"][0]][winLine["b"][1]].checkedState;
			cSymbol = this._squares[winLine["c"][0]][winLine["c"][1]].checkedState;

			if (aSymbol === bSymbol && bSymbol === cSymbol && cSymbol != '') {
				// Victor!
				_markVictor.call(this,
					this._game.getPlayerBySymbol(aSymbol),
					winLine["a"][0],
					winLine["a"][1],
					winLine["c"][0],
					winLine["c"][1]
				);
				return;
			}
		}

		Log.log(this._cellsFilled + " Cells Filled; No Winners");

		if (this._cellsFilled === this._SQUARE_COUNT * this._SQUARE_COUNT) {
			// Oh no! The grid has filled, no winner :(
			this._game.declareWinner(null);
		}
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_TickTacToeBoard.prototype._SQUARE_COUNT = 3;
	/**
	 * Possible Win Lines:
	 *
	 *	 1 |   |	   |   | 2	 3 | 3 | 3	   |   | 	   |   |	 6 |   |  	   | 7 |   	   |   | 8
	 *	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---
	 *	   | 1 |	   | 2 |  	   |   |  	 4 | 4 | 4	   |   |  	 6 |   |	   | 7 |   	   |   | 8
	 *	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---	---+---+---
	 *	   |   | 1	 2 |   |	   |   | 	   |   |	 5 | 5 | 5	 6 |   |   	   | 7 |       |   | 8
	 */
	_TickTacToeBoard.prototype._WIN_LINES = [
		{
			// Check for #1
			"a": [0,0],
			"b": [1,1],
			"c": [2,2]
		}, {
			// Check for #2
			"a": [2,0],
			"b": [1,1],
			"c": [0,2]
		}, {
			// Check for #3
			"a": [0,0],
			"b": [1,0],
			"c": [2,0]
		}, {
			// Check for #4
			"a": [0,1],
			"b": [1,1],
			"c": [2,1]
		}, {
			// Check for #5
			"a": [0,2],
			"b": [1,2],
			"c": [2,2]
		}, {
			// Check for #6
			"a": [0,0],
			"b": [0,1],
			"c": [0,2]
		}, {
			// Check for #7
			"a": [1,0],
			"b": [1,1],
			"c": [1,2]
		}, {
			// Check for #8
			"a": [2,0],
			"b": [2,1],
			"c": [2,2]
		}
	];

	/** @type TickTacToeGame */
	_TickTacToeBoard.prototype._game = null;
	/** @type TickTacToePlayer */
	_TickTacToeBoard.prototype._currentPlayer = null;
	/** @type Dimension */
	_TickTacToeBoard.prototype._aClickSquare = null;

	_TickTacToeBoard.prototype._cellsFilled = 0;
	_TickTacToeBoard.prototype._lineCapRadius = 5;
	_TickTacToeBoard.prototype._lineWidth = 5;
	_TickTacToeBoard.prototype._lineHeight = 5;
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
		this._aClickSquare.width = (this.width - this._lineWidth*2) / 3;
		this._aClickSquare.height = (this.height - this._lineHeight*2) / 3;

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
		for (var h = 0; h < this._SQUARE_COUNT; h++) {
			for (var v = 0; v < this._SQUARE_COUNT; v++) {
				var square = new TickTacToeSquare(h, v, this._aClickSquare, this);
				square.x = this._aClickSquare.width * h + this._lineWidth * h;
				square.y = this._aClickSquare.height * v + this._lineHeight * v;

				this.addChild(square);
				this._squares[h][v] = square;
			}
		}
	}
	/**
	 * @param player {GamePlayer} - The player object of the winner
	 * @param startX {number} - The starting xPosition in the grid (0,0 is top left)
	 * @param startY {number} - The starting yPosition in the grid (0,0 is top left)
	 * @param endX {number} - The end xPosition in the grid (2,2 is bottom right)
	 * @param endY {number} - The end yPosition in the grid (2,2 is bottom right)
	 */
	function _markVictor(player, startX, startY, endX, endY) {
		_stopFurtherMarkers.call(this);
		_drawWinLine.call(this, startX, startY, endX, endY);
		this._game.declareWinner(player);
	}
	function _stopFurtherMarkers() {
		for (var h = 0; h < this._SQUARE_COUNT; h++) {
			for (var v = 0; v < this._SQUARE_COUNT; v++) {
				var square = this._squares[h][v];
				square.locked = true;
			}
		}
	}
	/**
	 * @param startX {number} - The starting xPosition in the grid (0,0 is top left)
	 * @param startY {number} - The starting yPosition in the grid (0,0 is top left)
	 * @param endX {number} - The end xPosition in the grid (2,2 is bottom right)
	 * @param endY {number} - The end yPosition in the grid (2,2 is bottom right)
	 */
	function _drawWinLine(startX, startY, endX, endY) {
		var xSpacer = (this._aClickSquare.width + this._lineWidth) + (this._aClickSquare.width / 2);
		var ySpacer = (this._aClickSquare.height + this._lineHeight) + (this._aClickSquare.height / 2);

		var x1 = startX * xSpacer;
		var y1 = startY * ySpacer;
		var x2 = endX * xSpacer;
		var y2 = endY * ySpacer;
		var lineThickness = 5;

		var victorLine = new createjs.Shape();
		victorLine.graphics
			.setStrokeStyle(lineThickness, 1)
			.beginStroke('green')
			.moveTo(x1, y1)
			.lineTo(x2, y2)
			.closePath();

		this.addChild(victorLine);
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