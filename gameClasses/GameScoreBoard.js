/**
 * GameScoreBoard extends createjs.Container
 *  > A score board for a game.
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 * @extends createjs.Container
 */
var GameScoreBoard = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_GameScoreBoard, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param playerList {GamePlayer[]} - The list of players that will appear in the score board
	 * @param drawHorizontally {boolean} - True to render the score board horizontally; False to render it vertically
	 * @param dimensions {Dimension} - A dimension object that defines the width/height of the score board
	 */
	function GameScoreBoardConstructor(playerList, drawHorizontally, dimensions) {
		ParentClass.call(this); // super call

		this._players = playerList;
		this._isHorizontal = drawHorizontally;
		this._dimensions = dimensions;

		_drawPlayers.call(this)
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	_GameScoreBoard.prototype.addPointTo = function (player) {
		for (var i = 0; i < this._players.length; i++) {
			if (this._players[i].name == player.name) {
				console.warn("@" + i + " gets a point");
			}
		}
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	/** @type Dimension */
	_GameScoreBoard.prototype._dimensions = null;
	/** @type GamePlayer[] */
	_GameScoreBoard.prototype._players = [];

	_GameScoreBoard.prototype._isHorizontal = false;

	/* ----- Private Methods ----- */
	function _drawPlayers() {
		var i; // for loops
		var lineWidth = 5;
		var lineHeight = 5;

		if (this._isHorizontal) {
			Log.warn("Horizontal Score Board is not implemented.");
		} else {
			// Setup and determine our bounding box for the text
			var playerTextList = [];
			var largestWidth = 0;
			var largestHeight = 0;
			for (i = 0; i < this._players.length; i++) {
				var player = this._players[i];
				var playerNameText = new createjs.Text(player.name, "bold 20px Arial", player.color);
				largestWidth = Math.max(largestWidth, playerNameText.getMeasuredWidth());
				largestHeight = Math.max(largestHeight, playerNameText.getMeasuredLineHeight());

				playerTextList.push(playerNameText);
			}

			// Render Text to look like:
			//
			//   player1  |  player2	...etc
			// -----------+-----------	// cross-bar
			//            |
			//            |
			//

			var playerSpace = (this._dimensions.width / this._players.length) - (lineWidth * (this._players.length - 1));

			if (playerSpace < largestWidth) {
				Log.warn("The playerSpace (" + playerSpace + ") is not large enough for the playerName (" + largestWidth + ").");
				// TODO: Implement ellipsis or some other form of truncation/size reduction
				return;
			}

			for (i = 0; i < playerTextList.length; i++) {
				// Add Player Names
				var playerTextObj = playerTextList[i];
				playerTextObj.regX = playerTextObj.getMeasuredWidth() / 2;
				playerTextObj.regY = playerTextObj.getMeasuredLineHeight() / 2;
				playerTextObj.x = ((playerSpace + lineWidth) * i) + (playerSpace / 2);
				playerTextObj.y = largestHeight;
				this.addChild(playerTextObj);

				// Add Lines in between players
				if (i < playerTextList.length - 1) {
					// There is still another player to come (don't want to draw a line between a player and nothing)
					var line = new createjs.Shape();
					line.graphics.beginFill('black').drawRect(0, 0, lineWidth, this._dimensions.height);
					line.x = playerSpace * (i+1);
					this.addChild(line);
				}
			}

			// Draw the cross-bar
			var crossBar = new createjs.Shape();
			crossBar.graphics.beginFill('black').drawRect(0, 0, this._dimensions.width, lineHeight);
			crossBar.x = 0;
			crossBar.y = largestHeight * 2;
			this.addChild(crossBar);
		}
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _GameScoreBoard() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _GameScoreBoard);

		/* Call constructor */
		GameScoreBoardConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _GameScoreBoard;
})(createjs.Container, false);