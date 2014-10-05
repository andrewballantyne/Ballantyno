/**
 * Created by Andrew on 17/09/14.
 *
 * @requires ConverterUtilities (/utilities/ConverterUtilities.js)
 * @requires TypeUtilities  (/utilities/TypeUtilities.js)
 */

var Log = new (ClassVehicle.createClass({
	/* ----- Public Variables ----- */
	TYPE_ALL : "allConsolePrints",
	TYPE_LOG : "logConsolePrints",
	TYPE_WARN : "warnConsolePrints",
	TYPE_ERROR : "errorConsolePrints",

	/**
	 * A useful boolean to check if at any point in time it is okay to use debug-level testing/printing/coding in general.
	 */
	debugMode : false,

	/* ----- Public Methods ----- */
	/**
	 * Attaches a listener to the Log instance. Every time a console print happens, the Log will notify all listeners that the log has
	 * been done. This is useful if you want to catch and parse any console logs (ie for testing purposes).
	 *
	 * @param informCallback {Function} - The callback to inform
	 * @param listenType {string?} - Optional. The listener type Log.TYPE_ALL, TYPE_LOG, TYPE_WARN, and TYPE_ERROR are the available
	 *  options, defaults to TYPE_ALL
	 */
	attachListener : function (informCallback, listenType) {
		var type = TypeUtilities.valid.defaultTo(listenType, this.TYPE_ALL);

		if (TypeUtilities.is.aFunction(informCallback)) {
			if (this._informCallbacks[type] == null)
				this._informCallbacks[type] = [];
			this._informCallbacks[type].push(informCallback);
		}
	},

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
		if (!this._canPrint(this._HIGH_LOG_LEVEL)) return; // insufficient debug level

		this._console(this.TYPE_LOG, arguments);
	},

	/**
	 * Console.warn(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	warn : function () {
		if (!this._canPrint(this._MED_LOG_LEVEL)) return; // insufficient debug level

		this._console(this.TYPE_WARN, arguments);
	},

	/**
	 * Console.error(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	error : function () {
		if (!this._canPrint(this._LOW_LOG_LEVEL)) return; // insufficient debug level

		this._console(this.TYPE_ERROR, arguments);
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
	_ALL_TYPES : null,

	_MAX_LOG_LEVEL : 4, // All debug (errors, warnings, logs, and debugCode - sets debugMode to true)
	_HIGH_LOG_LEVEL : 3, // Strong debug (errors, warnings, logs only)
	_MED_LOG_LEVEL : 2, // Moderate debug (errors, warnings only)
	_LOW_LOG_LEVEL : 1, // Soft debug (errors only)
	_OFF_LOG_LEVEL : 0, // No debug
	_logLevel : null,

	_NORMAL_STATE : -1,
	_THROTTLING_UP_STATE : -2,
	_SILENCE_STATE : -3,
	_manipulationState : null,

	_initialized : false,
	_informCallbacks : {},

	/* ----- Private Methods ----- */
	_init : function () {
		this._logLevel = this._MAX_LOG_LEVEL;
		this._manipulationState = this._NORMAL_STATE;

		this.debugMode = (this._logLevel == this._MAX_LOG_LEVEL);

		this._ALL_TYPES = [this.TYPE_ALL, this.TYPE_LOG, this.TYPE_WARN, this.TYPE_ERROR];

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
			(this._manipulationState == this._THROTTLING_UP_STATE) ||
			(this._logLevel >= neededLogSetting && this._manipulationState != this._SILENCE_STATE)
		);
	},
	_getMethodName : function (methodType) {
		var methodName = 'console.';

		switch (methodType) {
			case Log.TYPE_LOG:
				methodName += 'log';
				break;

			case Log.TYPE_WARN:
				methodName += 'warn';
				break;

			case Log.TYPE_ERROR:
				methodName += 'error';
				break;

			default:
				throw new Error("Unknown method type (" + methodType + "), cannot get method name.");
		}

		return methodName;
	},
	_console : function (methodType, params) {
		if (methodType == this.TYPE_ALL) throw new Error("Cannot log an 'all type'");

		var consoleString = "";
		var i;
		for (i = 0; i < params.length; i++) {
			consoleString += ConverterUtilities.eval.thisItem(params[i]);
			if (i < params.length - 1) {
				consoleString += ",";
			}
		}
		
		var methodName = this._getMethodName(methodType);
		eval(methodName + "(" + consoleString + ")");

		// Inform any listening callbacks
		for (i = 0; i < this._ALL_TYPES.length; i++) {
			// Get the list of callbacks for this type
			var type = this._ALL_TYPES[i];
			var callbacks = this._informCallbacks[type];

			// If there are no callbacks, move on
			if (callbacks == null) continue;

			// Loop the callbacks and inform each one of the log
			for (var j = 0; j < callbacks.length; j++) {
				// XXX: params[0] should really handle more than one param at a time (as the log, warn and error methods do)
				callbacks[j](params[0], methodType);
			}
		}
	}
}))();