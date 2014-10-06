/**
 * Created by Andrew on 04/10/14.
 *
 * @requires FunctionUtilities (/utilities/FunctionUtilities.js)
 * @extends PageNavigation
 */
var IndexPageNavigation = ClassVehicle.extendClass(PageNavigation, {
	/* ----- Public Variables ----- */
	/* ----- Public Methods ----- */
	/**
	 * Index Page Navigation DOM Casing.
	 *
	 * @param mainDivId - The ID of the Navigation Container interface
	 */
	constructor : function (mainDivId) {
		this.super.constructor.call(this, mainDivId);

		this._logoContainer = this.__me.find('.logoContainer');

		this._options = this.__panel.find('.options');
		this._optionList = this._options.find('.optionItem');

		this._configureActionOnClicks();
		this._configureOptionDefaults();
	},

	/**
	 * Hides the Index Page Navigation.
	 */
	hide : function () {
		this._logoContainer.hide();
		this.super.hide.call(this);
	},

	/**
	 * Shows the Index Page Navigation.
	 */
	show : function () {
		this.super.show.call(this);
		this._logoContainer.show();
	},

	/* ----- Private Variables ----- */
	_canvas : null,
	_logoContainer : null,
	_options : null,
	_optionList : null,
	_autoHideCheckbox : null,

	/* ----- Private Methods ----- */
	_configureActionOnClicks : function () {
		// Set up all the clicks to validate against the options
		this.__actions.find('a').not('#clearScreen').on('click', FunctionUtilities.callWithScope(function (e) {
			if (this._autoHideCheckbox.prop('checked')) {
				this.hide();
			}
		}, this));

		// Add each individual button click
		this.__actions.find('#clearScreen').on('click', FunctionUtilities.callWithScope(function (e) {
			if (TestMethodAPI.isRendered())
				TestMethodAPI.hide();

			if (this._canvas.isRendered())
				this._canvas.hide();
		}, this));
		this.__actions.find('#runTests').on('click', FunctionUtilities.callWithScope(function (e) {
			if (TestMethodAPI.isRendered())
				TestMethodAPI.show();
			else
				HeaderUtilities.include.script('test/classTests/testInit.js');
		}, this));
		this.__actions.find('#showLobby').on('click', FunctionUtilities.callWithScope(function (e) {
			this._canvas = new BallantynoCanvas();
		}, this));
	},
	_configureOptionDefaults : function () {
		this._autoHideCheckbox = this._optionList.find('#autoHideCheckbox');
		this._autoHideCheckbox.prop('checked', true);
	}
});