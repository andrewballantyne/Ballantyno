/**
 * Test
 *  > An object used by TestMethodAPI to track tests.
 *
 * Created by Andrew on 12/10/14.
 *
 * @requires ClassVehicle
 */
var Test = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_Test, isAbstract);

	/**
	 * @constructor
	 * Test constructor, initializes need variables on a new Test().
	 *
	 * @param testNumber {Number} - An id for the test
	 * @param testTitle {string} - A title for the test
	 */
	function _Test(testNumber, testTitle) {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _Test);

		/* Our Constructor implementation */
		_ts = Date.now();

		_testNumber = testNumber;
		_testTitle = testTitle;
		_asserts = {
			successes : [],
			fails : []
		};

		// Clear console prints
		this.consolePrints = {
			logs : [],
			warns : [],
			errors : []
		};
	}

	/* ----- Public Variables ----- */
	/**
	 * The list of all the console prints (logs, warns, errors, etc) that have gone through this Test.
	 */
	_Test.prototype.consolePrints = {
		logs : [],
		warns : [],
		errors : []
	};

	/* ----- Public Methods ----- */
	/**
	 * Adds an assert to the test.
	 *
	 * Note: Does not have to have a success AND fail, but if it has neither it will do nothing.
	 *
	 * @param isSuccessful {boolean} - Was the desired assert successful?
	 * @param success {string?} - Optional. The success string to print out for this assert (set to undefined to ignore)
	 * @param fail {string?} - Optional. The failure string to print out for this assert (set to undefined to ignore)
	 * @param prefix {string?} - Optional. Any prefix to appear before the individual assert result data
	 */
	_Test.prototype.addAssert = function (isSuccessful, success, fail, prefix) {
		if (isSuccessful && TypeUtilities.is.defined(success))
			_asserts["successes"].push(((prefix != null) ? "(" + prefix + " successful): " : "") + success);
		else if (!isSuccessful && TypeUtilities.is.defined(fail))
			_asserts["fails"].push(((prefix != null) ? "(" + prefix + " unsuccessful): " : "") + fail);
	};

	/**
	 * Assert for this desired log (at the log index).
	 *
	 * @param logIndex {number} - The index in which the log was printed (0 would be the first log printed since the start of this
	 * 	test; 1 would be the second; and so forth)
	 * @param logMsg {string|*} - The result of the log to match (does an absolute equal, ===)
	 */
	_Test.prototype.assertLogAt = function (logIndex, logMsg) {
		this.addAssert(this.consolePrints.logs[logIndex] === logMsg, logMsg, logMsg, "log");
	};
	/**
	 * Assert for this desired warning (at the warn index).
	 *
	 * @param warnIndex {number} - The index in which the warn was printed (0 would be the first warn printed since the start of
	 * 	this test; 1 would be the second; and so forth)
	 * @param warnMsg {string|*} - The result of the warn to match (does an absolute equal, ===)
	 */
	_Test.prototype.assertWarnAt = function (warnIndex, warnMsg) {
		this.addAssert(this.consolePrints.warns[warnIndex] === warnMsg, warnMsg, warnMsg, "warn");
	};
	/**
	 * Assert for this desired error (at the error index).
	 *
	 * @param errorIndex {number} - The index in which the error was printed (0 would be the first error printed since the start of
	 * 	this test; 1 would be the second; and so forth)
	 * @param errorMsg {string|*} - The result of the error to match (does an absolute equal, ===)
	 */
	_Test.prototype.assertErrorAt = function (errorIndex, errorMsg) {
		this.addAssert(this.consolePrints.errors[errorIndex] === errorIndex, errorMsg, errorMsg, "error");
	};

	/**
	 * Gets the count of pass asserts.
	 *
	 * @returns {number} - The number of passes for this test
	 */
	_Test.prototype.getPassAssertCount = function () {
		return _asserts.successes.length;
	};

	/**
	 * Gets the count of fail asserts.
	 *
	 * @returns {number} - The number of failures for this test
	 */
	_Test.prototype.getFailAssertCount = function () {
		return _asserts.fails.length;
	};

	/**
	 * Prints out the test to the DOM.
	 *
	 * @param printoutContainer {jQuery} - The to-be parent for this tests' printouts
	 */
	_Test.prototype.print = function (printoutContainer) {
		HeaderUtilities.include.jQuery();

		// Create this test container
		var thisContainer = $('<div />');
		thisContainer.prop('id', 'TestMethodAPI_test' + _testNumber);
		thisContainer.addClass('testContainer');

		// Add the test results container
		var testResults = $('<div />');
		testResults.addClass('testResults');
		testResults.hide();

		// Add the header
		var header = $('<div />');
		header.addClass('header');
		header.on('click', function () {
			if (testResults.is(':visible'))
				testResults.hide();
			else
				testResults.show();
		});

		// Add the title
		var title = $('<div />');
		title.addClass('title');
		title.text(_testTitle);
		header.append(title);

		// Add brief stats
		var briefStats = $('<div />');
		briefStats.addClass('statsBrief');
		header.prepend(briefStats);

		// Important order of appending
		thisContainer.append(header);
		thisContainer.append(testResults);

		// Add the successful tests
		var successful = 0;
		for (; successful < _asserts.successes.length; successful++) {
			var successfulTest = $('<div />');
			successfulTest.addClass('assert successfulTest');
			successfulTest.text(_asserts.successes[successful]);
			testResults.append(successfulTest);
		}

		// Add the unsuccessful tests
		var unsuccessful = 0;
		for (; unsuccessful < _asserts.fails.length; unsuccessful++) {
			var unsuccessfulTest = $('<div />');
			unsuccessfulTest.addClass('assert unsuccessfulTest');
			unsuccessfulTest.text(_asserts.fails[unsuccessful]);
			testResults.append(unsuccessfulTest);
		}

		if (unsuccessful > 0) {
			briefStats.text(unsuccessful + ' Failure' + ((unsuccessful > 1) ? 's' : ''));
			briefStats.addClass('fail');
		} else {
			briefStats.text(successful + ' Pass' + ((successful > 1) ? 'es' : ''));
			briefStats.addClass('pass');
		}

		// Calculate the Duration and post it
		var ts = $('<div />');
		ts.addClass('timeStamp');
		var duration = Date.now() - _ts;
		ts.text('Duration: ' + ((duration > 0) ? '~' + duration + 'ms' : 'Negligible (less than 1ms)'));
		thisContainer.append(ts);

		// Add it to the parent 'printout' container
		printoutContainer.append(thisContainer);
	};

	/**
	 * Adds a log to the history. To be asserted against in the future. Order matters.
	 *
	 * @param msg {string|*} - The log to store
	 */
	_Test.prototype.addLogHistory = function (msg) {
		this.consolePrints.logs.push(msg);
	};
	/**
	 * Adds a warn to the history. To be asserted against in the future. Order matters.
	 *
	 * @param msg {string|*} - The warn to store
	 */
	_Test.prototype.addWarnHistory = function (msg) {
		this.consolePrints.warns.push(msg);
	};
	/**
	 * Adds an error to the history. To be asserted against in the future. Order matters.
	 *
	 * @param msg {string|*} - The error to store
	 */
	_Test.prototype.addErrorHistory = function (msg) {
		this.consolePrints.errors.push(msg);
	};

	/* ----- Private Variables ----- */
	var _ts = 0; // timeStamp (for duration of test)
	var _testNumber = -1;
	var _testTitle = "";
	var _asserts = {
		successes : [],
			fails : []
	};

	/* ----- Private Methods ----- */

	/* Return the class, ready for a new ...() */
	return _Test;
})(false);