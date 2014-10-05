/**
 * Created by Andrew on 04/10/14.
 */
var IndexPageNavigation = ClassVehicle.extendClass(PageNavigation, {
	constructor : function () {
		debugger;
		this.super.constructor();

		this.logoContainer = this.super.me.find('.logoContainer');
	},

	hide : function () {
		debugger;
		this.logoContainer.hide();
		this.super.hide();
	},

	show : function () {
		debugger;
		this.super.show();
		this.logoContainer.show();
	}
});