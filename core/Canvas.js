/**
 * Created by Andrew on 05/10/14.
 */
var Canvas = ClassVehicle.extendClass(DOMObject, true, {
	constructor : function () {
		this.super.constructor.call(this, '<canvas></canvas>');

		this._me.prop('id', 'theCanvas');
		this._me.prop('width', $(window).width() * .8);
		this._me.prop('height', $(window).height() * .8);

		$(document.body).append(this._me);
	}
});