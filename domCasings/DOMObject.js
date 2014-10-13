/**
 * DOMObject
 *  > An Object that encompasses a DOM Element.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 */
var DOMObject = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_DOMObject, isAbstract);

	/**
	 * @constructor
	 *
	 * @param domIdOrTag {string} - The id or full tag (<div id="myId"></div>) that corresponds to the DOM element that you wish
	 *  to encompass.
	 */
	function DOMObjectConstructor(domIdOrTag) {
		_setup.call(this, domIdOrTag);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */
	_DOMObject.prototype.$me = null;

	/* ----- Public Methods ----- */
	/**
	 * Shows the DOM Element that this DOM Object encases.
	 */
	_DOMObject.prototype.show = function () {
		if (!_rendered) return;

		this.$me.show();
	};

	/**
	 * Hides the DOM Element that this DOM Object encases.
	 */
	_DOMObject.prototype.hide = function () {
		if (!_rendered) return;

		this.$me.hide();
	};

	/**
	 * Checks to see if the DOM Element that this DOM Object encases is visible.
	 *
	 * @returns {boolean} - True if it is visible; false if it's not
	 */
	_DOMObject.prototype.isVisible = function () {
		return this.$me.is(':visible');
	};

	/**
	 * Checks to see if this DOM Element has been rendered to the DOM.
	 *
	 * @returns {boolean} - True if it has been; false if it has not yet been rendered to the DOM
	 */
	_DOMObject.prototype.isRendered = function () {
		return _rendered;
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	var _rendered = false;

	/* ----- Private Methods ----- */
	function _setup(domId) {
		this.$me = $(domId);

		$(document.body).append(this.$me);

		_rendered = true;
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _DOMObject() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _DOMObject);

		/* Call constructor */
		DOMObjectConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _DOMObject;
})(false);