/**
 * Created by Andrew on 04/10/14.
 *
 * @extends PageNavigation
 */
var IndexPageNavigation = ClassVehicle.extendClass(PageNavigation, {
	constructor : function (mainDivId) {
		this.super.constructor.call(this, mainDivId);

		this.logoContainer = this.me.find('.logoContainer');
	},

	hide : function () {
		this.logoContainer.hide();
		this.super.hide.call(this);
	},

	show : function () {
		this.super.show.call(this);
		this.logoContainer.show();
	}
});