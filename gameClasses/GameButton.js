/**
 * GameButton extends createjs.Shape
 *  > A Simple Game Button
 *
 * Created by Andrew on 13/10/14.
 *
 * @requires ClassVehicle
 * @extends createjs.Container
 */
var GameButton = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_GameButton, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param label {string} - The button label
	 * @param width {number} - The width of the button
	 * @param height {height} - The height of the button
	 */
	function GameButtonConstructor(label, width, height) {
		ParentClass.call(this); // super call

		this._label = label;
		this.width = width;
		this.height = height;

		_renderButton.call(this);
		_setupActions.call(this);
	}

	/* ----- Public Variables ----- */
	_GameButton.prototype.width = 0;
	_GameButton.prototype.height = 0;

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	/**
	 * Sets a callback on the onClick functionality for this button.
	 *
	 * @param callback - The callback to call when this button is clicked
	 */
	_GameButton.prototype.setClick = function (callback) {
		this.on('click', callback);
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_GameButton.prototype._label = '';
	_GameButton.prototype._cornerRadius = 5;

	/* ----- Private Methods ----- */
	function _renderButton() {
		var bg = new createjs.Shape();
		bg.graphics.beginFill('black').drawRoundRect(0, 0, this.width, this.height, this._cornerRadius);
		this.addChild(bg);

		var text = new createjs.Text(this._label, '12px Arial', 'white');
		text.regX = text.getMeasuredWidth() / 2;
		text.regY = text.getMeasuredLineHeight() / 2;
		text.x = this.width / 2;
		text.y = this.height / 2;
		this.addChild(text);
	}
	function _setupActions() {
		this.hitArea = new createjs.Shape();
		this.hitArea.graphics.beginFill('red').drawRect(0, 0, this.width, this.height);
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _GameButton() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _GameButton);

		/* Call constructor */
		GameButtonConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _GameButton;
})(createjs.Container, false);