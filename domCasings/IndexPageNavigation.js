/**
 * IndexPageNavigation extends PageNavigation
 *  > An Index Page Implementation of the Navigation class.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 * @requires BallantynoCanvas
 * @extends PageNavigation
 */
var IndexPageNavigation = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_IndexPageNavigation, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 * @param mainDivId - The main div that encompasses the entire Index Page Navigation
	 */
	function IndexPageNavigationConstructor(mainDivId) {
		ParentClass.call(this, mainDivId); // super call

		_setup.call(this);
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	/**
	 * @override
	 * Hides the Index Page Navigation.
	 */
	_IndexPageNavigation.prototype.hide = function () {
		this._logoContainer.hide();
		ParentClass.prototype.hide.call(this);
	};

	/**
	 * @override
	 * Shows the Index Page Navigation.
	 */
	_IndexPageNavigation.prototype.show = function () {
		ParentClass.prototype.show.call(this);
		this._logoContainer.show();
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	_IndexPageNavigation.prototype._canvas = null; /** @see BallantynoCanvas **/
	_IndexPageNavigation.prototype._logoContainer = null;
	_IndexPageNavigation.prototype._options = null;
	_IndexPageNavigation.prototype._optionList = null;
	_IndexPageNavigation.prototype._autoHideCheckbox = null;

	/* ----- Private Methods ----- */
	function _setup() {
		this._logoContainer = this.$me.find('.logoContainer');

		this._options = this.$panel.find('.options');
		this._optionList = this._options.find('.optionItem');

		_configureActionOnClicks.call(this);
		_configureOptionDefaults.call(this);
	}
	function _configureActionOnClicks() {
		// Set up all the clicks to validate against the options
		this.$actions.find('a').not('#clearScreen').on('click', FunctionUtilities.callWithScope(function (e) {
			if (this._autoHideCheckbox.prop('checked')) {
				this.hide();
			}
		}, this));

		// Add each individual button click
		this.$actions.find('#clearScreen').on('click', FunctionUtilities.callWithScope(function (e) {
			if (TestMethodAPI.isRendered())
				TestMethodAPI.hide();

			if (this._canvas != null && this._canvas.isVisible())
				this._canvas.hide();
		}, this));
		this.$actions.find('#runTests').on('click', FunctionUtilities.callWithScope(function (e) {
			if (TestMethodAPI.isRendered())
				TestMethodAPI.show();
			else
				HeaderUtilities.include.script('test/classTests/testInit.js');
		}, this));
		this.$actions.find('#showLobby').on('click', FunctionUtilities.callWithScope(function (e) {
			this._canvas = new BallantynoCanvas();
		}, this));
	}
	function _configureOptionDefaults() {
		this._autoHideCheckbox = this._optionList.find('#autoHideCheckbox');
		this._autoHideCheckbox.prop('checked', true);
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _IndexPageNavigation() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _IndexPageNavigation);

		/* Call constructor */
		IndexPageNavigationConstructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _IndexPageNavigation;
})(PageNavigation, false);