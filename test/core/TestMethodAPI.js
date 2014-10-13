/**
 * TestMethodAPI (Singleton)
 *  > A Testing Framework that allows you to watch and listen to various parts of method usage. Including listening for Log prints.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires Test (./scripts/Test.js)
 * @requires Log (/singletons/Log.js)
 * @requires ConverterUtilities (/utilities/ConverterUtilities.js)
 * @requires FunctionUtilities (/utilities/FunctionUtilities.js)
 * @requires jQuery (/utilities/HeaderUtilities.include.jQuery())
 */
var TestMethodAPI = (function () {
	/**
	 * @constructor
	 *
	 */
	function TestMethodAPIConstructor() {
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */
	/**
	 * Initializes the Testing Framework.
	 *
	 * @param activateDOMPrinting {boolean} - Set to True if you wish to enable DOM printing; False will disable DOM printing (this
	 *  value can be changed at anytime from the printToDOM() method)
	 *
	 * @see printToDOM(boolean?)
	 */
	_TestMethodAPI.prototype.init = function (activateDOMPrinting) {
		if (_initialized) return; // already initialized
		TypeUtilities.valid.defaultTo(activateDOMPrinting, false);

		Log.attachListener(FunctionUtilities.callWithScope(_consolePrint, this));
		_initialized = true;

		if (activateDOMPrinting) {
			this.printToDOM(true);
		}
	};

	/**
	 * Resets the full test suite.
	 */
	_TestMethodAPI.prototype.reset = function () {
		_testSuiteStats.pass = 0;
		_testSuiteStats.fail = 0;
	};
	/**
	 * Checks to see if the TestMethodAPI has rendered to the DOM.
	 *
	 * @returns {boolean} - True if rendered; False if not
	 */
	_TestMethodAPI.prototype.isRendered = function () {
		return _testContainer != null;
	};

	/**
	 * Hide the test container. If it has been rendered.
	 */
	_TestMethodAPI.prototype.hide = function () {
		if (_testContainer != null)
			_testContainer.hide();
	};

	/**
	 * Show the test container. If it has been rendered.
	 */
	_TestMethodAPI.prototype.show = function () {
		if (_testContainer != null)
			_testContainer.show();
	};

	/**
	 * Start Fresh, wipe all the current tests that are stored.
	 *
	 * Note: Doesn't clear the printToDOM setting.
	 *
	 * @param groupName - The name of the group of tests that are about to be run
	 */
	_TestMethodAPI.prototype.startFreshGroup = function (groupName) {
		if (!_initialized) this.init(true); // might as well initialize it if it's not already initialized

		_currentTestGroupName = groupName;
		_currentTestGroupId = ConverterUtilities.strip.forDOMId(_currentTestGroupName);
		_currentTest = null;
		_tests = {};

		_groupTs = Date.now();

		_clearForTestStart.call(this);
	};

	/**
	 * Ends the current group. Will clean up some of itself. Prints a timestamp for the entire group.
	 */
	_TestMethodAPI.prototype.endGroup = function () {
		var duration = Date.now() - _groupTs;

		_getPrintoutContainer.call(this).find('.groupTimeStamp').text('Group Duration: ' + duration + 'ms');
	};

	/**
	 * "Want a report?"
	 * Prints out a report of each test on TestMethodAPI.endTest().
	 *
	 * @param state {boolean?} - Optional. True to enable the report, False to disable the report. Defaults to True.
	 */
	_TestMethodAPI.prototype.printToDOM = function (state) {
		state = TypeUtilities.valid.defaultTo(state, true);

		if (_printDOM === state) return;

		_printDOM = state;

		if (_testContainer == null)
			_createTestContainer.call(this);

		if (_printDOM) {
			// If we are going to print to the DOM, we need the styles
			HeaderUtilities.include.style(_CORE_TEST_CSS);
		}
	};

	/**
	 * Starts a Test. Opens a listening set and enables the following methods (see methods for more details):
	 *  - assertAbstract(...) // asserts that the passed class cannot be instantiated
	 *  - assertOnTest(...) // asserts that the passed param meets the desired output
	 *  - assertConsoleLogs(...) // asserts that the passed logs were console.log()-ged from the start of the test until now
	 *  - assertConsoleWarns(...) // same as assertConsoleLogs(...), but for console.warn()
	 *  - assertConsoleErrors(...) // same as assertConsoleLogs(...), but for console.error()
	 *
	 * @param testNumber {Number} - An id for the test
	 * @param testTitle {string} - A title for the test
	 */
	_TestMethodAPI.prototype.startTest = function (testNumber, testTitle) {
		_clearForTestStart.call(this);

		_tests[testNumber] = new Test(testNumber, testTitle);

		_currentTest = _tests[testNumber];
	};

	/**
	 * Ends the current Test. This will validate that all logs/warns/errors were accounted for and printToDOM (if enabled).
	 */
	_TestMethodAPI.prototype.endTest = function () {
		_validateActiveTest.call(this);

		// Add asserts if we still have logs unaccounted for
		_currentTest.addAssert(
			_currentTest.consolePrints.logs.length == _consoleLogCount,
			undefined, // nothing to report if it's successful
			"Logs Difference: (" + (_currentTest.consolePrints.logs.length - _consoleLogCount) + ")"
		);
		_currentTest.addAssert(
			_currentTest.consolePrints.warns.length == _consoleWarnCount,
			undefined, // nothing to report if it's successful
			"Warns Difference: (" + (_currentTest.consolePrints.warns.length - _consoleWarnCount) + ")"
		);
		_currentTest.addAssert(
			_currentTest.consolePrints.errors.length == _consoleErrorCount,
			undefined, // nothing to report if it's successful
			"Errors Difference: (" + (_currentTest.consolePrints.errors.length - _consoleErrorCount) + ")"
		);

		_testSuiteStats.pass += _currentTest.getPassAssertCount();
		_testSuiteStats.fail += _currentTest.getFailAssertCount();

		if (_printDOM) {
			_currentTest.print(_getPrintoutContainer.call(this));
			_updateTotalCount.call(this);
		}

		_currentTest = null;
	};

	/**
	 * Asserts that a class is Abstract (cannot be instantiated, only extended).
	 *
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @param Class {Function|*} - The intended abstract class to test
	 * @param success {string} - The success string to print out for this assert
	 * @param fail {string} - The failure string to print out for this assert
	 */
	_TestMethodAPI.prototype.assertAbstract = function (Class, success, fail) {
		_validateActiveTest.call(this);

		// Do not expect it to be created
		_performNew.call(this, Class, false, success, fail);
	};

	/**
	 * Asserts that a class is creatable without an error being thrown.
	 *
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @param Class {Function|*} - The intended abstract class to test
	 * @param success {string} - The success string to print out for this assert
	 * @param fail {string} - The failure string to print out for this assert
	 */
	_TestMethodAPI.prototype.assertInstantiation = function (Class, success, fail) {
		_validateActiveTest.call(this);

		// Expect it to be created
		_performNew.call(this, Class, true, success, fail);
	};

	/**
	 * Asserts that the passed param is of the 'is'-intended value.
	 *
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @param item {*} - Any item you want to test
	 * @param is {*} - Any value you intend the 'item' to be equal to (does absolute equals, ===)
	 * 	TODO: this has problems with objects; needs improvement
	 * @param success {string} - The success string to print out for this assert
	 * @param fail {string} - The failure string to print out for this assert
	 */
	_TestMethodAPI.prototype.assertOnTest = function (item, is, success, fail) {
		_validateActiveTest.call(this);
		_currentTest.addAssert(item === is, success, fail);
	};

	/**
	 * Asserts a list of logs against already fired TestMethodAPI.log()s.
	 *
	 * Note: This method will assert them in order of console printing.
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @params {*} - Any number of passed params ("","","","",...)
	 */
	_TestMethodAPI.prototype.assertConsoleLogs = function () {
		_validateActiveTest.call(this);
		var i = 0;
		for (; i < arguments.length; i++) {
			_currentTest.assertLogAt(_consoleLogCount + i, arguments[i]);
		}
		_consoleLogCount = i;
	};
	/**
	 * Asserts a list of warns against already fired TestMethodAPI.warn()s.
	 *
	 * Note: This method will assert them in order of console printing.
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @params {*} - Any number of passed params ("","","","",...)
	 */
	_TestMethodAPI.prototype.assertConsoleWarns = function () {
		_validateActiveTest.call(this);
		var i = 0;
		for (; i < arguments.length; i++) {
			_currentTest.assertWarnAt(_consoleWarnCount + i, arguments[i]);
		}
		_consoleWarnCount = i;
	};
	/**
	 * Asserts a list of errors against already fired TestMethodAPI.error()s.
	 *
	 * Note: This method will assert them in order of console printing.
	 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
	 *
	 * @params {*} - Any number of passed params ("","","","",...)
	 */
	_TestMethodAPI.prototype.assertConsoleErrors = function () {
		_validateActiveTest.call(this);
		var i = 0;
		for (; i < arguments.length; i++) {
			_currentTest.assertErrorAt(_consoleErrorCount + i, arguments[i]);
		}
		_consoleErrorCount = i;
	};

	/**
	 * A similar call to console.log, but for the TestMethodAPI to track.
	 *
	 * @param msg {string|*} - The message to print
	 */
	_TestMethodAPI.prototype.log = function (msg) {
		_validateActiveTest.call(this);
		_currentTest.addLogHistory(msg);

		if (_actuallyConsolePrint)
			console.log('log :: ' + msg);
	};
	/**
	 * A similar call to console.warn, but for the TestMethodAPI to track.
	 *
	 * @param msg {string|*} - The message to print
	 */
	_TestMethodAPI.prototype.warn = function (msg) {
		_validateActiveTest.call(this);
		_currentTest.addWarnHistory(msg);

		if (_actuallyConsolePrint)
			console.log('warn :: ' + msg);
	};
	/**
	 * A similar call to console.error, but for the TestMethodAPI to track.
	 *
	 * @param msg {string|*} - The message to print
	 */
	_TestMethodAPI.prototype.error = function (msg) {
		_validateActiveTest.call(this);
		_currentTest.addErrorHistory(msg);

		if (_actuallyConsolePrint)
			console.log('error :: ' + msg);
	};

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */
	var _CORE_TEST_CSS = 'test/core/styles/coreTests.css';

	var _currentTestGroupName = '';
	var _currentTestGroupId = '';
	var _currentTest = null;
	var _tests = {};
	var _testSuiteStats = {
		pass: 0,
		fail: 0
	};
	var _consoleLogCount = 0;
	var _consoleWarnCount = 0;
	var _consoleErrorCount = 0;
	var _printDOM = false;
	var _testContainer = null;
	var _printoutContainer = null;
	var _testContainerTotalStatsSuccesses = null;
	var _testContainerTotalStatsFailures = null;
	var _groupTs = 0; // group timestamp

	var _initialized = false;
	var _actuallyConsolePrint = false;

	/* ----- Private Methods ----- */
	function _validateActiveTest() {
		if (_currentTest == null) throw new Error("No Active Test! >> Call 'TestMethodAPI.startTest(...)' first");
	}
	function _performNew(Class, isCreated, success, fail) {
		var classObj = null;
		try {
			classObj = new Class();
		} catch (e) {}

		// Check to see if the object status meets our expectations (isCreated == true means we wanted this to not be null)
		var result = (isCreated) ? classObj != null : classObj == null;
		_currentTest.addAssert(result, success, fail);
	}
	function _getPrintoutContainer() {
		if (_printoutContainer != null && _printoutContainer.prop('id') == _currentTestGroupId)
			return _printoutContainer;

		if (_testContainer == null) {
			_createTestContainer.call(this);
		}

		// Try to get the DOM object
		_printoutContainer = $(_currentTestGroupId);

		// Check to see if we actually have a DOM object
		if (_printoutContainer.length == 0) {
			// Since we do not, we need to create one
			_printoutContainer = $('<div />');
			_printoutContainer.prop('id', _currentTestGroupId);
			_printoutContainer.addClass('groupTestContainer');
			_testContainer.append(_printoutContainer);

			// Add it's title
			var title = $('<p />');
			title.addClass('groupTestTitle');
			title.text(_currentTestGroupName);
			_printoutContainer.append(title);

			// Add a duration field
			var duration = $('<div />');
			duration.addClass('groupTimeStamp');
			duration.text('Calculating...');
			_printoutContainer.append(duration);
		}

		return _printoutContainer;
	}
	function _createTestContainer() {
		_testContainer = $('<div />');
		_testContainer.prop('id', 'testSuite');
		$(document.body).append(_testContainer);

		var header = $('<div />');
		_testContainer.append(header);

		var testSuiteTitle = $('<div />');
		testSuiteTitle.prop('id', 'testSuiteTitle');
		testSuiteTitle.text('Test Suite');
		header.append(testSuiteTitle);

		var statsContainer = $('<div />');
		statsContainer.addClass('testSuiteTotalStatsContainer');
		header.append(statsContainer);

		_testContainerTotalStatsSuccesses = $('<div />');
		_testContainerTotalStatsSuccesses.addClass('testSuiteTotalStats');
		_testContainerTotalStatsSuccesses.addClass('statsBrief');
		statsContainer.append(_testContainerTotalStatsSuccesses);
		_testContainerTotalStatsFailures = $('<div />');
		_testContainerTotalStatsFailures.addClass('testSuiteTotalStats');
		_testContainerTotalStatsFailures.addClass('statsBrief');
		statsContainer.append(_testContainerTotalStatsFailures);
	}
	function _updateTotalCount() {
		// Update the successful count
		var successful = _testSuiteStats.pass;
		_testContainerTotalStatsSuccesses.text(successful + ' Pass' + ((successful > 1) ? 'es' : ''));
		_testContainerTotalStatsSuccesses.addClass('pass');

		// Update the unsuccessful count
		var unsuccessful = _testSuiteStats.fail;
		_testContainerTotalStatsFailures.text(unsuccessful + ' Failure' + ((unsuccessful > 1) ? 's' : ''));
		_testContainerTotalStatsFailures.addClass('fail');

		// If we don't have any, hide it for visual effect
		if (unsuccessful == 0)
			_testContainerTotalStatsFailures.hide();
		else
			_testContainerTotalStatsFailures.show();
	}
	function _clearForTestStart() {
		_consoleLogCount = 0;
		_consoleWarnCount = 0;
		_consoleErrorCount = 0;
	}
	function _consolePrint(consoleString, type) {
		switch (type) {
			case Log.TYPE_LOG:
				this.log(consoleString);
				break;

			case Log.TYPE_WARN:
				this.warn(consoleString);
				break;

			case Log.TYPE_ERROR:
				this.error(consoleString);
				break;

			default:
				throw new Error("Unknown log type called (" + type + ")");
		}
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _TestMethodAPI() {
		/* Call constructor */
		TestMethodAPIConstructor.apply(this, arguments);
	}

	/* Executes a new and returns the, now singleton, object */
	return new _TestMethodAPI();
})();