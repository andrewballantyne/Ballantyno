/**
 * Dimension
 *  > A Width/Height Dimension object
 *
 * Created by Andrew on 14/10/14.
 *
 * @requires ClassVehicle
 */
var Dimension = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_Dimension, isAbstract);

	/**
	 * @constructor
	 *
	 * @param width {number} - The width of the dimension
	 * @param height {number} - The height of the dimension
	 */
	function DimensionConstructor(width, height) {
		this.width = width;
		this.height = height;
	}

	/* ----- Public Variables ----- */
	_Dimension.prototype.width = 0;
	_Dimension.prototype.height = 0;

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _Dimension() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _Dimension);

		/* Call constructor */
		DimensionConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _Dimension;
})(false);