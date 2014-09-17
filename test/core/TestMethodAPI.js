/**
 * Created by Andrew on 08/09/14.
 *
 * A home-grown testing framework that will create a DOM report (if so desired).
 *
 * @requires Test (./scripts/Test.js)
 * @requires jQuery (/utilities/HeaderUtilities.include.jQuery())
 */
var TestMethodAPI = (function () {
	function _TestMethodAPI() {}
	_TestMethodAPI.prototype = {
		/* ----- Public Variables ----- */

		/* ----- Public Methods ----- */
		/**
		 * Start Fresh, wipe all the current tests that are stored.
		 *
		 * Note: Doesn't clear the printToDOM setting.
		 *
		 * @param groupName - The name of the group of tests that are about to be run
		 */
		fresh : function (groupName) {
			this._currentTestGroupName = groupName;
			this._currentTestGroupId = ConverterUtilities.strip.forDOMId(this._currentTestGroupName);
			this._currentTest = null;
			this._tests = {};

			this._clearForTestStart();
		},

		/**
		 * "Want a report?"
		 * Prints out a report of each test on TestMethodAPI.endTest().
		 *
		 * @param state {boolean?} - Optional. True to enable the report, False to disable the report. Defaults to True.
		 */
		printToDOM : function (state) {
			state = TypeUtilities.valid.defaultTo(state, true);

			if (this._printDOM === state) return;

			this._printDOM = state;

			if (this._printDOM) {
				// If we are going to print to the DOM, we need the styles
				HeaderUtilities.include.style(this._CORE_TEST_CSS);
			}
		},

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
		startTest : function (testNumber, testTitle) {
			this._tests[testNumber] = new Test(testNumber, testTitle);

			this._currentTest = this._tests[testNumber];

			this._clearForTestStart();
		},

		/**
		 * Ends the current Test. This will validate that all logs/warns/errors were accounted for and printToDOM (if enabled).
		 */
		endTest : function () {
			this._validateActiveTest();

			if (this._currentTest.consolePrints.logs.length != this._consoleLogCount) {
				// Some Logs left
				console.warn("Logs Left! (" + (this._currentTest.consolePrints.logs.length - this._consoleLogCount) + ")");
			}
			if (this._currentTest.consolePrints.warns.length != this._consoleWarnCount) {
				// Some Warns left
				console.warn("Warns Left! (" + (this._currentTest.consolePrints.warns.length - this._consoleWarnCount) + ")");
			}
			if (this._currentTest.consolePrints.errors.length != this._consoleErrorCount) {
				// Some Errors left
				console.warn("Errors Left! (" + (this._currentTest.consolePrints.errors.length - this._consoleErrorCount) + ")");
			}

			if (this._printDOM) {
				this._currentTest.print(this._getPrintoutContainer());
			}

			this._currentTest = null;
		},

		/**
		 * Asserts that a class is Abstract (cannot be instantiated, only extended).
		 *
		 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
		 *
		 * @param Class {Function|*} - The intended abstract class to test
		 * @param success {string} - The success string to print out for this assert
		 * @param fail {string} - The failure string to print out for this assert
		 */
		assertAbstract : function (Class, success, fail) {
			this._validateActiveTest();
			var testingAbstract = null;
			try {
				// Abstract classes throw an error, we need to catch this so we can continue to test
				testingAbstract = new Class();
			} catch (e) {}

			this.assertOnTest(testingAbstract, null, success, fail);
		},

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
		assertOnTest : function (item, is, success, fail) {
			this._validateActiveTest();
			this._currentTest.addAssert(item === is, success, fail);
		},

		/**
		 * Asserts a list of logs against already fired TestMethodAPI.log()s.
		 *
		 * Note: This method will assert them in order of console printing.
		 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
		 *
		 * @params {*} - Any number of passed params ("","","","",...)
		 */
		assertConsoleLogs : function () {
			this._validateActiveTest();
			var i = 0;
			for (; i < arguments.length; i++) {
				this._currentTest.assertLogAt(this._consoleLogCount + i, arguments[i]);
			}
			this._consoleLogCount = i;
		},
		/**
		 * Asserts a list of warns against already fired TestMethodAPI.warn()s.
		 *
		 * Note: This method will assert them in order of console printing.
		 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
		 *
		 * @params {*} - Any number of passed params ("","","","",...)
		 */
		assertConsoleWarns : function () {
			this._validateActiveTest();
			var i = 0;
			for (; i < arguments.length; i++) {
				this._currentTest.assertWarnAt(this._consoleWarnCount + i, arguments[i]);
			}
			this._consoleWarnCount = i;
		},
		/**
		 * Asserts a list of errors against already fired TestMethodAPI.error()s.
		 *
		 * Note: This method will assert them in order of console printing.
		 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
		 *
		 * @params {*} - Any number of passed params ("","","","",...)
		 */
		assertConsoleErrors : function () {
			this._validateActiveTest();
			var i = 0;
			for (; i < arguments.length; i++) {
				this._currentTest.assertErrorAt(this._consoleErrorCount + i, arguments[i]);
			}
			this._consoleErrorCount = i;
		},

		/**
		 * A similar call to console.log, but for the TestMethodAPI to track.
		 *
		 * @param msg {string|*} - The message to print
		 */
		log : function (msg) {
			this._validateActiveTest();
			this._currentTest.addLogHistory(msg);

			if (this._actuallyConsolePrint)
				console.log('log :: ' + msg);
		},
		/**
		 * A similar call to console.warn, but for the TestMethodAPI to track.
		 *
		 * @param msg {string|*} - The message to print
		 */
		warn : function (msg) {
			this._validateActiveTest();
			this._currentTest.addWarnHistory(msg);

			if (this._actuallyConsolePrint)
				console.log('warn :: ' + msg);
		},
		/**
		 * A similar call to console.error, but for the TestMethodAPI to track.
		 *
		 * @param msg {string|*} - The message to print
		 */
		error : function (msg) {
			this._validateActiveTest();
			this._currentTest.addErrorHistory(msg);

			if (this._actuallyConsolePrint)
				console.log('error :: ' + msg);
		},

		/* ----- Private Constants ----- */
		_CORE_TEST_CSS : 'test/core/styles/coreTests.css',

		/* ----- Private Variables ----- */
		_currentTestGroupName : '',
		_currentTestGroupId : '',
		_currentTest : null,
		_tests : {},
		_consoleLogCount : 0,
		_consoleWarnCount : 0,
		_consoleErrorCount : 0,
		_printDOM : false,
		_printoutContainer : null,

		_actuallyConsolePrint : false,

		/* ----- Private Methods ----- */
		_validateActiveTest : function () {
			if (this._currentTest == null) throw new Error("No Active Test! >> Call 'TestMethodAPI.startTest(...)' first");
		},
		_getPrintoutContainer : function () {
			if (this._printoutContainer != null && this._printoutContainer.prop('id') == this._currentTestGroupId)
				return this._printoutContainer;

			// Try to get the DOM object
			this._printoutContainer = $(this._currentTestGroupId);

			// Check to see if we actually have a DOM object
			if (this._printoutContainer.length == 0) {
				// Since we do not, we need to create one
				this._printoutContainer = $('<div />');
				this._printoutContainer.prop('id', this._currentTestGroupId);
				this._printoutContainer.addClass('groupTestContainer');
				$(document.body).append(this._printoutContainer);

				// Add it's title
				var title = $('<p />');
				title.addClass('groupTestTitle');
				title.text(this._currentTestGroupName);
				this._printoutContainer.append(title);
			}

			return this._printoutContainer;
		},
		_clearForTestStart : function () {
			this._consoleLogCount = 0;
			this._consoleWarnCount = 0;
			this._consoleErrorCount = 0;
		}
	};

	return new _TestMethodAPI();
})();