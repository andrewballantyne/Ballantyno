/**
 * Created by Andrew on 08/09/14.
 *
 * A internal testing object used by TestMethodAPI.
 *
 * @packagedWith TestMethodAPI (../TestMethodAPI.js)
 */
var Test = (function () {
	function _Test(testNumber, testTitle) {
		this.constructor(testNumber, testTitle);
	}
	_Test.prototype = {
		/* ----- Public Variables ----- */
		/**
		 * The list of all the console prints (logs, warns, errors, etc) that have gone through this Test.
		 */
		consolePrints : {
			logs : [],
			warns : [],
			errors : []
		},

		/* ----- Public Methods ----- */
		/**
		 * Test constructor, initializes need variables on a new Test().
		 *
		 * @param testNumber {Number} - An id for the test
		 * @param testTitle {string} - A title for the test
		 */
		constructor : function (testNumber, testTitle) {
			this._ts = Date.now();

			this._testNumber = testNumber;
			this._testTitle = testTitle;
			this._asserts = {
				successes : [],
				fails : []
			};
			this.consolePrints = {
				logs : [],
				warns : [],
				errors : []
			};
		},

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
		addAssert : function (isSuccessful, success, fail, prefix) {
			if (isSuccessful && TypeUtilities.is.defined(success))
				this._asserts["successes"].push(((prefix != null) ? "(" + prefix + " successful): " : "") + success);
			else if (!isSuccessful && TypeUtilities.is.defined(fail))
				this._asserts["fails"].push(((prefix != null) ? "(" + prefix + " unsuccessful): " : "") + fail);
		},

		/**
		 * Assert for this desired log (at the log index).
		 *
		 * @param logIndex {number} - The index in which the log was printed (0 would be the first log printed since the start of this
		 * 	test; 1 would be the second; and so forth)
		 * @param logMsg {string|*} - The result of the log to match (does an absolute equal, ===)
		 */
		assertLogAt : function (logIndex, logMsg) {
			this.addAssert(this.consolePrints.logs[logIndex] === logMsg, logMsg, logMsg, "log");
		},
		/**
		 * Assert for this desired warning (at the warn index).
		 *
		 * @param warnIndex {number} - The index in which the warn was printed (0 would be the first warn printed since the start of
		 * 	this test; 1 would be the second; and so forth)
		 * @param warnMsg {string|*} - The result of the warn to match (does an absolute equal, ===)
		 */
		assertWarnAt : function (warnIndex, warnMsg) {
			this.addAssert(this.consolePrints.warns[warnIndex] === warnMsg, warnMsg, warnMsg, "warn");
		},
		/**
		 * Assert for this desired error (at the error index).
		 *
		 * @param errorIndex {number} - The index in which the error was printed (0 would be the first error printed since the start of
		 * 	this test; 1 would be the second; and so forth)
		 * @param errorMsg {string|*} - The result of the error to match (does an absolute equal, ===)
		 */
		assertErrorAt : function (errorIndex, errorMsg) {
			this.addAssert(this.consolePrints.errors[errorIndex] === errorIndex, errorMsg, errorMsg, "error");
		},

		/**
		 * Prints out the test to the DOM.
		 *
		 * @param printoutContainer {jQuery} - The to-be parent for this tests' printouts
		 */
		print : function (printoutContainer) {
			HeaderUtilities.include.jQuery();

			// Create this test container
			var thisContainer = $('<div />');
			thisContainer.prop('id', 'TestMethodAPI_test' + this._testNumber);
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
			title.text(this._testTitle);
			header.append(title);

			// Add brief stats
			var briefStats = $('<div />');
			briefStats.addClass('testStats_brief');
			header.prepend(briefStats);

			// Important order of appending
			thisContainer.append(header);
			thisContainer.append(testResults);

			// Add the successful tests
			var successful = 0;
			for (; successful < this._asserts.successes.length; successful++) {
				var successfulTest = $('<div />');
				successfulTest.addClass('assert successfulTest');
				successfulTest.text(this._asserts.successes[successful]);
				testResults.append(successfulTest);
			}

			// Add the unsuccessful tests
			var unsuccessful = 0;
			for (; unsuccessful < this._asserts.fails.length; unsuccessful++) {
				var unsuccessfulTest = $('<div />');
				unsuccessfulTest.addClass('assert unsuccessfulTest');
				unsuccessfulTest.text(this._asserts.fails[unsuccessful]);
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
			var duration = Date.now() - this._ts;
			ts.text('Duration: ' + ((duration > 0) ? '~' + duration + 'ms' : 'Negligible (less than 1ms)'));
			thisContainer.append(ts);

			// Add it to the parent 'printout' container
			printoutContainer.append(thisContainer);
		},

		/**
		 * Adds a log to the history. To be asserted against in the future. Order matters.
		 *
		 * @param msg {string|*} - The log to store
		 */
		addLogHistory : function (msg) {
			this.consolePrints.logs.push(msg);
		},
		/**
		 * Adds a warn to the history. To be asserted against in the future. Order matters.
		 *
		 * @param msg {string|*} - The warn to store
		 */
		addWarnHistory : function (msg) {
			this.consolePrints.warns.push(msg);
		},
		/**
		 * Adds an error to the history. To be asserted against in the future. Order matters.
		 *
		 * @param msg {string|*} - The error to store
		 */
		addErrorHistory : function (msg) {
			this.consolePrints.errors.push(msg);
		},

		/* ----- Private Variables ----- */
		_ts : 0, // timeStamp (for duration of test)
		_testNumber : -1,
		_testTitle : "",
		_asserts : {
			successes : [],
			fails : []
		}
		/* ----- Private Methods ----- */
	};

	return _Test;
})();