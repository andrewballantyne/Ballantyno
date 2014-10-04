/**
 * Created by Andrew on 04/10/14.
 */
var PageNavigation = ClassVehicle.createClass({
	constructor : function (mainDivId) {
		this.me = $('#' + mainDivId);

		this.handle = this.me.find('.handle');
		if (this.handle.length > 0) {
			this.handle.on('click', FunctionUtilities.callWithScope(this.handleClick, this));
		}
	},

	handleClick : function () {
		Log.log("test : " + this.me);
	}
});