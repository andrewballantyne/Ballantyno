/**
 * BallantynoCanvas extends Canvas
 *  > Ballantyno Site Canvas Starting Level.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @extends Canvas
 */
var BallantynoCanvas = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_BallantynoCanvas, ParentClass, isAbstract);

	/**
	 * @constructor
	 * Extend Constructor:
	 *  - Checks to see if we are abstract
	 *  - Calls parent (this passes scope through)
	 *  - Executes our constructor code
	 */
	function _BallantynoCanvas() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _BallantynoCanvas);

		/* Super call */
		ParentClass.call(this); // pass scope down to child class

		/* Our Constructor implementation */
		_setup.call(this);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	function _setup() {
		this.$stage.addChild(new TickTacToeBoard(100,100));
	}

	/* ----- Private Methods ----- */

	/* Return the class, ready for a new ...() */
	return _BallantynoCanvas;
})(Canvas, false);