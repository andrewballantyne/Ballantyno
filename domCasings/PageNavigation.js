/**
 * Created by Andrew on 04/10/14.
 */
var PageNavigation = ClassVehicle.createClass(true, {
	constructor : function (mainDivId) {
		this.me = $('#' + mainDivId);

		this.actions = this.me.find('.actions');

		this.handle = this.me.find('.handle');
		if (this.handle.length > 0) {
			this.handle.on('click', FunctionUtilities.callWithScope(this.handleClick, this));
		}

		this.isVisible = true;
	},

	/**
	 * 'Handle' Click Handler
	 *
	 * @param e - The event from the click
	 */
	handleClick : function (e) {
		if (this.isVisible) {
			this.hide();
		} else {
			this.show();
		}
	},

	/**
	 * Hides this Page Navigation.
	 *
	 * Note: Does not fully hide, hides up until the 'handle'.
	 */
	hide : function () {
		// Hide the actions first, since we are going to reduce the width of the Page Navigation
		this.actions.hide();

		// Shrink the Page Navigation down to the width of the handle
		this.me.css({
			width: this.handle.width() + 'px'
		});

		this.isVisible = false;
	},

	/**
	 * Shows this Page Navigation.
	 */
	show : function () {
		// Remove the custom width we used in hide() first
		this.me.css({
			width: ''
		});

		// Reshow the actions
		this.actions.show();

		this.isVisible = true;
	}
});