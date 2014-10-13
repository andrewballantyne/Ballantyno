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
	 * Singleton Constructor:
	 *  - Executes our constructor code
	 */
	function _TestMethodAPI() {
	}

	_TestMethodAPI.prototype = {
		/* ----- Public Variables ----- */

		/* ----- Public Methods ----- */
		/**
		 * Initializes the Testing Framework.
		 *
		 * @param activateDOMPrinting {boolean} - Set to True if you wish to enable DOM printing; False will disable DOM printing (this
		 *  value can be changed at anytime from the printToDOM() method)
		 *
		 * @see printToDOM(boolean?)
		 */
		init : function (activateDOMPrinting) {
			if (this._initialized) return; // already initialized
			TypeUtilities.valid.defaultTo(activateDOMPrinting, false);

			Log.attachListener(FunctionUtilities.callWithScope(this._consolePrint, this));
			this._initialized = true;

			if (activateDOMPrinting) {
				this.printToDOM(true);
			}
		},

		/**
		 * Resets the full test suite.
		 */
		reset : function () {
			this._testSuiteStats.pass = 0;
			this._testSuiteStats.fail = 0;
		},

		/**
		 * Checks to see if the TestMethodAPI has rendered to the DOM.
		 *
		 * @returns {boolean} - True if rendered; False if not
		 */
		isRendered : function () {
			return this._testContainer != null;
		},

		/**
		 * Hide the test container. If it has been rendered.
		 */
		hide : function () {
			if (this._testContainer != null)
				this._testContainer.hide();
		},

		/**
		 * Show the test container. If it has been rendered.
		 */
		show : function () {
			if (this._testContainer != null)
				this._testContainer.show();
		},

		/**
		 * Start Fresh, wipe all the current tests that are stored.
		 *
		 * Note: Doesn't clear the printToDOM setting.
		 *
		 * @param groupName - The name of the group of tests that are about to be run
		 */
		startFreshGroup : function (groupName) {
			if (!this._initialized) this.init(true); // might as well initialize it if it's not already initialized

			this._currentTestGroupName = groupName;
			this._currentTestGroupId = ConverterUtilities.strip.forDOMId(this._currentTestGroupName);
			this._currentTest = null;
			this._tests = {};

			this._groupTs = Date.now();

			this._clearForTestStart();
		},

		/**
		 * Ends the current group. Will clean up some of itself. Prints a timestamp for the entire group.
		 */
		endGroup : function () {
			var duration = Date.now() - this._groupTs;

			this._getPrintoutContainer().find('.groupTimeStamp').text('Group Duration: ' + duration + 'ms');
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

			if (this._testContainer == null)
				this._createTestContainer();

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
			this._clearForTestStart();

			this._tests[testNumber] = new Test(testNumber, testTitle);

			this._currentTest = this._tests[testNumber];
		},

		/**
		 * Ends the current Test. This will validate that all logs/warns/errors were accounted for and printToDOM (if enabled).
		 */
		endTest : function () {
			this._validateActiveTest();

			// Add asserts if we still have logs unaccounted for
			this._currentTest.addAssert(
				this._currentTest.consolePrints.logs.length == this._consoleLogCount,
				undefined, // nothing to report if it's successful
				"Logs Difference: (" + (this._currentTest.consolePrints.logs.length - this._consoleLogCount) + ")"
			);
			this._currentTest.addAssert(
				this._currentTest.consolePrints.warns.length == this._consoleWarnCount,
				undefined, // nothing to report if it's successful
				"Warns Difference: (" + (this._currentTest.consolePrints.warns.length - this._consoleWarnCount) + ")"
			);
			this._currentTest.addAssert(
				this._currentTest.consolePrints.errors.length == this._consoleErrorCount,
				undefined, // nothing to report if it's successful
				"Errors Difference: (" + (this._currentTest.consolePrints.errors.length - this._consoleErrorCount) + ")"
			);

			this._testSuiteStats.pass += this._currentTest.getPassAssertCount();
			this._testSuiteStats.fail += this._currentTest.getFailAssertCount();

			if (this._printDOM) {
				this._currentTest.print(this._getPrintoutContainer());
				this._updateTotalCount();
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

			// Do not expect it to be created
			this._performNew(Class, false, success, fail);
		},

		/**
		 * Asserts that a class is creatable without an error being thrown.
		 *
		 * Note: startTest(...) must be called before this method (and after the last endTest(...)).
		 *
		 * @param Class {Function|*} - The intended abstract class to test
		 * @param success {string} - The success string to print out for this assert
		 * @param fail {string} - The failure string to print out for this assert
		 */
		assertInstantiation : function (Class, success, fail) {
			this._validateActiveTest();

			// Expect it to be created
			this._performNew(Class, true, success, fail);
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
		_testSuiteStats: {
			pass: 0,
			fail: 0
		},
		_consoleLogCount : 0,
		_consoleWarnCount : 0,
		_consoleErrorCount : 0,
		_printDOM : false,
		_testContainer : null,
		_printoutContainer : null,
		_testContainerTotalStatsSuccesses : null,
		_testContainerTotalStatsFailures : null,
		_groupTs : 0, // group timestamp

		_initialized : false,
		_actuallyConsolePrint : false,

		/* ----- Private Methods ----- */
		_validateActiveTest : function () {
			if (this._currentTest == null) throw new Error("No Active Test! >> Call 'TestMethodAPI.startTest(...)' first");
		},
		_performNew : function (Class, isCreated, success, fail) {
			var classObj = null;
			try {
				classObj = new Class();
			} catch (e) {}

			// Check to see if the object status meets our expectations (isCreated == true means we wanted this to not be null)
			var result = (isCreated) ? classObj != null : classObj == null;
			this._currentTest.addAssert(result, success, fail);
		},
		_getPrintoutContainer : function () {
			if (this._printoutContainer != null && this._printoutContainer.prop('id') == this._currentTestGroupId)
				return this._printoutContainer;

			if (this._testContainer == null) {
				this._createTestContainer();
			}

			// Try to get the DOM object
			this._printoutContainer = $(this._currentTestGroupId);

			// Check to see if we actually have a DOM object
			if (this._printoutContainer.length == 0) {
				// Since we do not, we need to create one
				this._printoutContainer = $('<div />');
				this._printoutContainer.prop('id', this._currentTestGroupId);
				this._printoutContainer.addClass('groupTestContainer');
				this._testContainer.append(this._printoutContainer);

				// Add it's title
				var title = $('<p />');
				title.addClass('groupTestTitle');
				title.text(this._currentTestGroupName);
				this._printoutContainer.append(title);

				// Add a duration field
				var duration = $('<div />');
				duration.addClass('groupTimeStamp');
				duration.text('Calculating...');
				this._printoutContainer.append(duration);
			}

			return this._printoutContainer;
		},
		_createTestContainer : function () {
			this._testContainer = $('<div />');
			this._testContainer.prop('id', 'testSuite');
			$(document.body).append(this._testContainer);

			var header = $('<div />');
			this._testContainer.append(header);

			var testSuiteTitle = $('<div />');
			testSuiteTitle.prop('id', 'testSuiteTitle');
			testSuiteTitle.text('Test Suite');
			header.append(testSuiteTitle);

			var statsContainer = $('<div />');
			statsContainer.addClass('testSuiteTotalStatsContainer');
			header.append(statsContainer);

			this._testContainerTotalStatsSuccesses = $('<div />');
			this._testContainerTotalStatsSuccesses.addClass('testSuiteTotalStats');
			this._testContainerTotalStatsSuccesses.addClass('statsBrief');
			statsContainer.append(this._testContainerTotalStatsSuccesses);
			this._testContainerTotalStatsFailures = $('<div />');
			this._testContainerTotalStatsFailures.addClass('testSuiteTotalStats');
			this._testContainerTotalStatsFailures.addClass('statsBrief');
			statsContainer.append(this._testContainerTotalStatsFailures);
		},
		_updateTotalCount : function () {
			// Update the successful count
			var successful = this._testSuiteStats.pass;
			this._testContainerTotalStatsSuccesses.text(successful + ' Pass' + ((successful > 1) ? 'es' : ''));
			this._testContainerTotalStatsSuccesses.addClass('pass');

			// Update the unsuccessful count
			var unsuccessful = this._testSuiteStats.fail;
			this._testContainerTotalStatsFailures.text(unsuccessful + ' Failure' + ((unsuccessful > 1) ? 's' : ''));
			this._testContainerTotalStatsFailures.addClass('fail');

			// If we don't have any, hide it for visual effect
			if (unsuccessful == 0)
				this._testContainerTotalStatsFailures.hide();
			else
				this._testContainerTotalStatsFailures.show();
		},
		_clearForTestStart : function () {
			this._consoleLogCount = 0;
			this._consoleWarnCount = 0;
			this._consoleErrorCount = 0;
		},
		_consolePrint : function (consoleString, type) {
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
	};

	/* Executes a new and returns the, now singleton, object */
	return new _TestMethodAPI();
})();