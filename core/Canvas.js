/**
 * Canvas extends DOMObject
 *  > The First Level to the Canvas tag. This class will own and control setting up the Stage and preparing the canvas for rendering.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @extends DOMObject
 */
var Canvas = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_Canvas, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function CanvasConstructor() {
		ParentClass.call(this, '<canvas></canvas>'); // super call

		_setup.call(this);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */
	/** @type createjs.Stage **/
	_Canvas.prototype.$stage = null;

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	/** @type createjs.Text **/
	_Canvas.prototype._fpsLabel = null;

	_Canvas.prototype._canvasId = 'theCanvas';

	/* ----- Private Methods ----- */
	function _setup() {
		// Configure the canvas
		this.$me.prop('id', this._canvasId);
		this.$me.prop('width', $(window).width() * .8);
		this.$me.prop('height', $(window).height() * .8);

		// Create the stage
		this.$stage = new createjs.Stage(this._canvasId);
		this.$stage.mouseEnabled = true;
		this.$stage.enableDOMEvents(true); // allows clicks and other DOM related events to filter into the DisplayObjects

		// Set up a fps label
		this._fpsLabel = new createjs.Text("0 FPS", "Bold 12px Arial", "black");
		this._fpsLabel.x = this.$me.width() - 5;
		this._fpsLabel.y = 5;
		this._fpsLabel.textAlign = "right";
		this.$stage.addChild(this._fpsLabel);

		// Start a ticker that will update the stage
		createjs.Ticker.addEventListener('tick', FunctionUtilities.callWithScope(_tick, this));
	}
	/**
	 * @param e [createjs.Event} - The event
	 */
	function _tick(e) {
		if (Log.debugMode) {
			this._fpsLabel.visible = true;
			this._fpsLabel.text = Math.floor(e["delta"]) + " FPS";
		} else {
			this._fpsLabel.visible = false;
		}
		this.$stage.update();
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _Canvas() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _Canvas);

		/* Call constructor */
		CanvasConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _Canvas;
})(DOMObject, true);