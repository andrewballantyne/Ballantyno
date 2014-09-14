/**
 * Created by Andrew on 08/09/14.
 *
 * A home-grown testing framework that will create a DOM report (if so desired).
 *
 * @requires Test (./supportClasses/Test.js)
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
		 */
		fresh : function () {
			this._currentTest = null;
			this._tests = {};

			this._consoleLogCount = 0;
			this._consoleWarnCount = 0;
			this._consoleErrorCount = 0;
		},

		/**
		 * "Want a report?"
		 * Prints out a report of each test on TestMethodAPI.endTest().
		 *
		 * @param state {boolean?} - True to enable the report, False to disable the report
		 */
		printToDOM : function (state) {
			if (state == null)
			this._printDOM = state;
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
				this._currentTest.print();
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
		},
		/**
		 * A similar call to console.warn, but for the TestMethodAPI to track.
		 *
		 * @param msg {string|*} - The message to print
		 */
		warn : function (msg) {
			this._validateActiveTest();
			this._currentTest.addWarnHistory(msg);
		},
		/**
		 * A similar call to console.error, but for the TestMethodAPI to track.
		 *
		 * @param msg {string|*} - The message to print
		 */
		error : function (msg) {
			this._validateActiveTest();
			this._currentTest.addErrorHistory(msg);
		},

		/* ----- Private Variables ----- */
		_currentTest : null,
		_tests : {},
		_consoleLogCount : 0,
		_consoleWarnCount : 0,
		_consoleErrorCount : 0,
		_printDOM : false,

		/* ----- Private Methods ----- */
		_validateActiveTest : function () {
			if (this._currentTest == null) throw new Error("No Active Test! >> Call 'TestMethodAPI.startTest(...)' first");
		}
	};

	return new _TestMethodAPI();
})();