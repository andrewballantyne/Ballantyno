/**
 * Created by Andrew on 04/10/14.
 *
 * @requires FunctionUtilities (/utilities/FunctionUtilities.js)
 * @abstract
 */
var PageNavigation = ClassVehicle.createClass(true, {
	/* ----- Public Variables ----- */
	/* ----- Public Methods ----- */
	/**
	 * Standard Page Navigation DOM Casing.
	 *
	 * @param mainDivId - The ID of the Navigation Container interface
	 */
	constructor : function (mainDivId) {
		this.__me = $('#' + mainDivId);

		this.__openHandle = this.__me.find('.handle.closeState');

		this.__panel = this.__me.find('.panel');

		this.__actions = this.__panel.find('.actions');
		this.__closeHandle = this.__panel.find('.handle.openState');
		if (this.__closeHandle.length > 0) {
			var onClick = FunctionUtilities.callWithScope(this._handleClick, this);
			this.__openHandle.on('click', onClick);
			this.__closeHandle.on('click', onClick);
		}

		this.isVisible = true;
	},

	/**
	 * Hides this Page Navigation.
	 *
	 * Note: Does not fully hide, hides up until the 'handle'.
	 */
	hide : function () {
		// Hide the actions first, since we are going to reduce the width of the Page Navigation
		this.__panel.hide();

		this.isVisible = false;

		this.__openHandle.show();
	},

	/**
	 * Shows this Page Navigation.
	 */
	show : function () {
		// Reshow the actions
		this.__panel.show();

		this.isVisible = true;

		this.__openHandle.hide();
	},

	/* ----- Private Variables ----- */
	/* ----- Private Methods ----- */
	_handleClick : function (e) {
		if (this.isVisible) {
			this.hide();
		} else {
			this.show();
		}
	},

	/* ----- Protected Variables ----- */
	__me : null,
	__openHandle : null,
	__panel : null,
	__actions : null,
	__closeHandle : null
});