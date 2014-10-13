/**
 * PageNavigation
 *  > A root-level class that controls a page navigation.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @requires FunctionUtilities (/utilities/FunctionUtilities.js)
 */
var PageNavigation = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_PageNavigation, isAbstract);

	/**
	 * @constructor
	 * Base Constructor:
	 *  - Checks to see if we are abstract
	 *  - Executes our constructor code
	 */
	function _PageNavigation(mainDivId) {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _PageNavigation);

		/* Our Constructor implementation */
		_setup.call(this, mainDivId);
	}

	/* ----- Protected Variables ----- */
	_PageNavigation.prototype.$me = null;
	_PageNavigation.prototype.$openHandle = null;
	_PageNavigation.prototype.$panel = null;
	_PageNavigation.prototype.$actions = null;
	_PageNavigation.prototype.$closeHandle = null;

	/* ----- Public Methods ----- */
	/**
	 * Hides this Page Navigation.
	 *
	 * Note: Does not fully hide, hides up until the 'handle'.
	 */
	_PageNavigation.prototype.hide = function () {
		// Hide the actions first, since we are going to reduce the width of the Page Navigation
		this.$panel.hide();

		this.isVisible = false;

		this.$openHandle.show();
	};

	/**
	 * Shows this Page Navigation.
	 */
	_PageNavigation.prototype.show = function () {
		// Reshow the actions
		this.$panel.show();

		this.isVisible = true;

		this.$openHandle.hide();
	};

	/* ----- Private Variables ----- */
	/* ----- Private Methods ----- */
	function _setup(mainDivId) {
		this.$me = $('#' + mainDivId);

		this.$panel = this.$me.find('.panel');
		this.$actions = this.$panel.find('.actions');

		this.$openHandle = this.$me.find('.handle.closeState');
		this.$closeHandle = this.$panel.find('.handle.openState');

		var onClick = FunctionUtilities.callWithScope(_handleClick, this);
		this.$openHandle.on('click', onClick);
		this.$closeHandle.on('click', onClick);

		this.isVisible = true;
	}
	function _handleClick(e) {
		if (this.isVisible) {
			this.hide();
		} else {
			this.show();
		}
	}

	/* Return the class, ready for a new ...() */
	return _PageNavigation;
})(true);