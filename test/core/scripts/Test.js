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
			}
		},

		/**
		 * Adds an assert to the test.
		 *
		 * @param isSuccessful {boolean} - Was the desired assert successful?
		 * @param success {string} - The success string to print out for this assert
		 * @param fail {string} - The failure string to print out for this assert
		 * @param prefix {string?} - Optional. Any prefix to appear before the individual assert result data
		 */
		addAssert : function (isSuccessful, success, fail, prefix) {
			if (isSuccessful)
				this._asserts["successes"].push(((prefix != null) ? "(" + prefix + ")" : "") + success);
			else
				this._asserts["fails"].push(((prefix != null) ? "(" + prefix + ")" : "") + fail);
		},

		/**
		 * Assert for this desired log (at the log index).
		 *
		 * @param logIndex {number} - The index in which the log was printed (0 would be the first log printed since the start of this
		 * 	test; 1 would be the second; and so forth)
		 * @param logMsg {string|*} - The result of the log to match (does an absolute equal, ===)
		 */
		assertLogAt : function (logIndex, logMsg) {
			this.addAssert(this.consolePrints.logs[logIndex] === logMsg, logMsg, logMsg, "console.log");
		},
		/**
		 * Assert for this desired warning (at the warn index).
		 *
		 * @param warnIndex {number} - The index in which the warn was printed (0 would be the first warn printed since the start of
		 * 	this test; 1 would be the second; and so forth)
		 * @param warnMsg {string|*} - The result of the warn to match (does an absolute equal, ===)
		 */
		assertWarnAt : function (warnIndex, warnMsg) {
			this.addAssert(this.consolePrints.warns[warnIndex] === warnMsg, warnMsg, warnMsg, "console.warn");
		},
		/**
		 * Assert for this desired error (at the error index).
		 *
		 * @param errorIndex {number} - The index in which the error was printed (0 would be the first error printed since the start of
		 * 	this test; 1 would be the second; and so forth)
		 * @param errorMsg {string|*} - The result of the error to match (does an absolute equal, ===)
		 */
		assertErrorAt : function (errorIndex, errorMsg) {
			this.addAssert(this.consolePrints.errors[errorIndex] === errorIndex, errorMsg, errorMsg, "console.error");
		},

		/**
		 * Prints out the test to the DOM.
		 * TODO: Implement
		 *
		 * @param printoutContainer {jQuery} - The target of all printouts
		 */
		print : function (printoutContainer) {
			HeaderUtilities.include.jQuery();

			// Create this test container
			var thisContainer = $('<div />');
			thisContainer.prop('id', 'TestMethodAPI_test' + this._testNumber);
			thisContainer.addClass('testContainer');

			// Add the header
			var header = $('<p />');
			header.addClass('header');
			header.text(this._testTitle);
			thisContainer.append(header);

			// Add the tests
			// TODO: add them!

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