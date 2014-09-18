/**
 * Created by Andrew on 17/09/14.
 *
 * @requires ConverterUtilities (/utilities/ConverterUtilities.js)
 */

var Log = new (ClassVehicle.createClass({
	/* ----- Public Variables ----- */
	/**
	 * A useful boolean to check if at any point in time it is okay to use debug-level testing/printing/coding in general.
	 */
	debugMode : false,

	/* ----- Public Methods ----- */
	/**
	 * 'Flip' logging OFF.
	 * @see maxLogging()
	 * @see resetLogging()
	 */
	noLogging : function () {
		this._manipulationState = this._SILENCE_STATE;
	},

	/**
	 * 'Flip' logging TO MAX.
	 * @see noLogging()
	 * @see resetLogging()
	 */
	maxLogging : function () {
		this._manipulationState = this._THROTTLING_UP_STATE;
	},

	/**
	 * Disable 'Flip' State.
	 * @see maxLogging()
	 * @see noLogging()
	 */
	resetLogging : function () {
		this._manipulationState = this._NORMAL_STATE;
	},

	/**
	 * Console.log(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	log : function () {
		if (!this._canPrint(3)) return; // insufficient debug level

		this._console("console.log", arguments);
	},

	/**
	 * Console.warn(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	warn : function () {
		if (!this._canPrint(2)) return; // insufficient debug level

		this._console("console.warn", arguments);
	},

	/**
	 * Console.error(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	error : function () {
		if (!this._canPrint(1)) return; // insufficient debug level

		this._console("console.error", arguments);
	},

	/**
	 * Prints out a phpReturn. Creates a DOM container if one does not already exist.
	 *
	 * @param responseText - The response text containing any debug/echo statements made while executing php code
	 */
	phpPrint : function(responseText) {
		// TODO: Convert to new working framework
//		var phpDebug = $('#phpDebug');
//		if (phpDebug.length == 0) {
//			// We haven't yet created a phpDebug in the DOM... add the styles and create the DOM object
//			S_LoaderUtility.addCSSFiles(['client/styles/debug/phpDebug.css']);
//			$(document.body).append('<div id="phpDebug"></div>');
//
//			// ReQuery the php container object
//			phpDebug = $('#phpDebug');
//		}
//		else {
//			// We already have a php container object, empty it out so it's fresh data
//			phpDebug.empty();
//		}
//
//		// Append the response to the container
//		phpDebug.append(responseText);
//
//		// Hide the current page so only the responseText is visible
//		$('#' + 'MainSiteContact').hide();
	},

	/* ----- Private Variables ----- */
	_MAX_LOG_LEVEL : 4, // All debug (errors, warnings, logs, and debugCode - sets debugMode to true)
	_HIGH_LOG_LEVEL : 3, // Strong debug (errors, warnings, logs only)
	_MED_LOG_LEVEL : 2, // Moderate debug (errors, warnings only)
	_LOW_LOG_LEVEL : 1, // Soft debug (errors only)
	_OFF_LOG_LEVEL : 0, // No debug
	_logLevel : this._MED_LOG_LEVEL,

	_NORMAL_STATE : -1,
	_THROTTLING_UP_STATE : -2,
	_SILENCE_STATE : -3,
	_manipulationState : this._NORMAL_STATE,

	_initialized : false,
	/* ----- Private Methods ----- */
	_init : function () {
		this.debugMode = (this._logLevel == this._MAX_LOG_LEVEL);

		this._initialized = true;
	},
	_canPrint : function (neededLogSetting) {
		if (!this._initialized) this._init();

		/**
		 * We are in Throttle Up state
		 *   OR
		 * We have the needed log level (and we are not in silence state)
		 */
		return (
			this._manipulationState == this._THROTTLING_UP_STATE ||
			(this._logLevel >= neededLogSetting && this._manipulationState != this._SILENCE_STATE)
		);
	},
	_console : function (methodName, params) {
		var evalString = methodName + "(";
		for (var i = 0; i < params.length; i++) {
			evalString += ConverterUtilities.eval.thisItem(params[i]);
			if (i < params.length - 1) {
				evalString += ",";
			}
		}
		evalString += ")";

		eval(evalString);
	}
}))();
