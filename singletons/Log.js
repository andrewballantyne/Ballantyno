/**
 * Log (Singleton)
 *  > A Utility that will control all logging done within this project. All 'console.log's should be Log.log.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ConverterUtilities (/utilities/ConverterUtilities.js)
 * @requires TypeUtilities  (/utilities/TypeUtilities.js)
 */
var Log = (function () {
	/**
	 * @constructor
	 * Singleton Constructor:
	 *  - Executes our constructor code
	 */
	function _Log() {
	}

	/* ----- Public Variables ----- */
	_Log.prototype.TYPE_ALL = "allConsolePrints";
	_Log.prototype.TYPE_LOG = "logConsolePrints";
	_Log.prototype.TYPE_WARN = "warnConsolePrints";
	_Log.prototype.TYPE_ERROR = "errorConsolePrints";

	/**
	 * A useful boolean to check if at any point in time it is okay to use debug-level testing/printing/coding in general.
	 */
	_Log.prototype.debugMode = true;

	/* ----- Public Methods ----- */
	/**
	 * Attaches a listener to the Log instance. Every time a console print happens, the Log will notify all listeners that the log has
	 * been done. This is useful if you want to catch and parse any console logs (ie for testing purposes).
	 *
	 * @param informCallback {Function} - The callback to inform
	 * @param listenType {string?} - Optional. The listener type Log.TYPE_ALL, TYPE_LOG, TYPE_WARN, and TYPE_ERROR are the available
	 *  options, defaults to TYPE_ALL
	 */
	_Log.prototype.attachListener = function (informCallback, listenType) {
		var type = TypeUtilities.valid.defaultTo(listenType, this.TYPE_ALL);

		if (TypeUtilities.is.aFunction(informCallback)) {
			if (_informCallbacks[type] == null)
				_informCallbacks[type] = [];
			_informCallbacks[type].push(informCallback);
		}
	};

	/**
	 * 'Flip' logging OFF.
	 * @see maxLogging()
	 * @see resetLogging()
	 */
	_Log.prototype.noLogging = function () {
		_manipulationState = _SILENCE_STATE;
	};

	/**
	 * 'Flip' logging TO MAX.
	 * @see noLogging()
	 * @see resetLogging()
	 */
	_Log.prototype.maxLogging = function () {
		_manipulationState = _THROTTLING_UP_STATE;
	};

	/**
	 * Disable 'Flip' State.
	 * @see maxLogging()
	 * @see noLogging()
	 */
	_Log.prototype.resetLogging = function () {
		_manipulationState = _NORMAL_STATE;
	};

	/**
	 * Console.log(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	_Log.prototype.log = function () {
		if (!_canPrint(_HIGH_LOG_LEVEL)) return; // insufficient debug level

		_console(this.TYPE_LOG, arguments);
	};

	/**
	 * Console.warn(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	_Log.prototype.warn = function () {
		if (!_canPrint(_MED_LOG_LEVEL)) return; // insufficient debug level

		_console(this.TYPE_WARN, arguments);
	};

	/**
	 * Console.error(...) passed params.
	 *
	 * Note: This method is ignored if there isn't a sufficient log level.
	 *
	 * @params {*} - Any number of params you wish to print
	 */
	_Log.prototype.error = function () {
		if (!_canPrint(_LOW_LOG_LEVEL)) return; // insufficient debug level

		_console(this.TYPE_ERROR, arguments);
	};

	/**
	 * Prints out a phpReturn. Creates a DOM container if one does not already exist.
	 *
	 * @param responseText - The response text containing any debug/echo statements made while executing php code
	 */
	_Log.prototype.phpPrint = function(responseText) {
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
	};

	/* ----- Private Variables ----- */
	var _ALL_TYPES = [_Log.prototype.TYPE_ALL, _Log.prototype.TYPE_LOG, _Log.prototype.TYPE_WARN, _Log.prototype.TYPE_ERROR];

	var _MAX_LOG_LEVEL = 4;		// All debug (errors, warnings, logs, and debugCode - sets debugMode to true)
	var _HIGH_LOG_LEVEL = 3;	// Strong debug (errors, warnings, logs only)
	var _MED_LOG_LEVEL = 2;		// Moderate debug (errors, warnings only)
	var _LOW_LOG_LEVEL = 1;		// Soft debug (errors only)
	var _OFF_LOG_LEVEL = 0;		// No debug
	var _logLevel = null;

	var _NORMAL_STATE = -1;
	var _THROTTLING_UP_STATE = -2;
	var _SILENCE_STATE = -3;
	var _manipulationState = null;

	var _initialized = false;
	var _informCallbacks = {};

	/* ----- Private Methods ----- */
	function _init() {
		_logLevel = _MAX_LOG_LEVEL;
		_manipulationState = _NORMAL_STATE;

		this.debugMode = (_logLevel == _MAX_LOG_LEVEL);

		_initialized = true;
	}
	function _canPrint(neededLogSetting) {
		if (!_initialized) _init();

		/**
		 * We are in Throttle Up state
		 *   OR
		 * We have the needed log level (and we are not in silence state)
		 */
		return (
			_manipulationState == _THROTTLING_UP_STATE ||
			(_logLevel >= neededLogSetting && _manipulationState != _SILENCE_STATE)
		);
	}
	function _getMethodName(methodType) {
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
	}
	function _console(methodType, params) {
		if (methodType == this.TYPE_ALL) throw new Error("Cannot log an 'all type'");

		var consoleString = "";
		var i;
		for (i = 0; i < params.length; i++) {
			consoleString += ConverterUtilities.eval.thisItem(params[i]);
			if (i < params.length - 1) {
				consoleString += ",";
			}
		}

		var methodName = _getMethodName(methodType);
		eval(methodName + "(" + consoleString + ")");

		// Inform any listening callbacks
		for (i = 0; i < _ALL_TYPES.length; i++) {
			// Get the list of callbacks for this type
			var type = _ALL_TYPES[i];
			var callbacks = _informCallbacks[type];

			// If there are no callbacks, move on
			if (callbacks == null) continue;

			// Loop the callbacks and inform each one of the log
			for (var j = 0; j < callbacks.length; j++) {
				// XXX: params[0] should really handle more than one param at a time (as the log, warn and error methods do)
				callbacks[j](params[0], methodType);
			}
		}
	}

	/* Executes a new and returns the, now singleton, object */
	return new _Log();
})();