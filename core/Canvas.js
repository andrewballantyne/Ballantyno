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
	_Canvas.prototype.$stage = null;

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	var _canvasId = 'theCanvas';
	var _fpsLabel = null;

	/* ----- Private Methods ----- */
	function _setup() {
		// Configure the canvas
		this.$me.prop('id', _canvasId);
		this.$me.prop('width', $(window).width() * .8);
		this.$me.prop('height', $(window).height() * .8);

		// Create the stage
		this.$stage = new createjs.Stage(_canvasId);
		this.$stage.enableDOMEvents(true); // allows clicks and other DOM related events to filter into the DisplayObjects

		// Set up a fps label
		_fpsLabel = new createjs.Text("0 FPS", "Bold 12px Arial", "black");
		_fpsLabel.x = this.$me.width() - 5;
		_fpsLabel.y = 5;
		_fpsLabel.textAlign = "right";
		this.$stage.addChild(_fpsLabel);

		// Start a ticker that will update the stage
		createjs.Ticker.addEventListener('tick', FunctionUtilities.callWithScope(_tick, this));
	}
	function _tick(e) {
		if (Log.debugMode) {
			_fpsLabel.visible = true;
			_fpsLabel.text = Math.floor(e["delta"]) + " FPS";
		} else {
			_fpsLabel.visible = false;
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