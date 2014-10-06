/**
 * Created by Andrew on 05/10/14.
 */
var DOMObject = ClassVehicle.createClass({
	constructor : function (domId) {
		this._me = $(domId);

		this._rendered = true;
	},

	show : function () {
		if (!this._rendered) return;

		this._me.show();
	},

	hide : function () {
		if (!this._rendered) return;

		this._me.hide();
	},

	isRendered : function () {
		return this._rendered;
	},

	_me : null,
	_rendered : false
});