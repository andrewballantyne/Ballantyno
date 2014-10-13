/**
 * TypeUtilities (Singleton)
 *  > Manages any type-related checks and settings (such as mandatory and defaulting to if undefined).
 *
 * Created by Andrew on 12/10/14.
 */
var TypeUtilities = (function () {
	/**
	 * @constructor
	 * Singleton Constructor:
	 *  - Executes our constructor code
	 */
	function _TypeUtilities() {
	}

	_TypeUtilities.prototype.valid = {
		/* ----- Public Variables ----- */
		TYPE_BOOLEAN : 'isBoolean',

		/* ----- Public Methods ----- */
		/**
		 * Default if the passed value is not defined.
		 *
		 * @param item - The item to check against
		 * @param defaultOption - What to default to if the item is undefined
		 * @returns - Either the item or the defaultOption (if the item is not defined)
		 */
			defaultTo : function (item, defaultOption) {
			if (item === defaultOption) return item; // if it's already equal, lets just return it
			return (TypeUtilities.is.defined(item)) ? item : defaultOption;
		},

		/**
		 * Make a set of params mandatory (cannot be undefined/not passed).
		 *
		 * Note: This will throw a JavaScript Error. Designed to prevent coding without using all params.
		 *
		 * @params (*) - Any number of parameters to validate they are set to something (ie not undefined)
		 */
		makeMandatory : function () {
			for (var i = 0; i < arguments.length; i++) {
				if (!TypeUtilities.is.defined(arguments[i])) {
					throw new Error("Not Defined Parameter. Passed param " + (i+1) + " = " + arguments[i]);
				}
			}
		}
	};

	/**
	 * "Is what? Is equal, that's what!"
	 * Helper methods to validate the state of variables.
	 */
	_TypeUtilities.prototype.is = {
		/* ----- Public Variables ----- */
		EQUAL_TO_NOT_DEFINED : [undefined],
		EQUAL_TO_NOTHING : [null, undefined],

		/* ----- Public Methods ----- */
		/**
		 * Defined, as in has been given a value (ie. not 'undefined', the default value of JavaScript variables).
		 *
		 * @param item - The item to check against
		 * @returns - True if it's been defined (ie. item !== undefined)
		 */
		defined : function (item) {
			return !TypeUtilities.is.equal(item, TypeUtilities.is.EQUAL_TO_NOT_DEFINED);
		},

		/**
		 * Validates that the passed 'item' is of one of the passed validation types ('validateParams').
		 *
		 * @param item {*} - Any item to validate
		 * @param validateParams {*[]} - A mixed array of any values to validate the 'item' against
		 * @returns {boolean} - True if there was a match, False if there was not
		 */
		equal : function (item, validateParams) {
			// Make the validateParams parameter into an array if it's not already for easy matching
			if (!(validateParams instanceof Array)) validateParams = [validateParams];
			var equal = false;
			for (var i = 0; i < validateParams.length; i++) {
				if (item === validateParams[i]) {
					equal = true;
					break;
				}
			}
			return equal;
		},

		aFunction : function (item) {
			return typeof item == 'function';
		},

		anEvent : function (event) {
			return (
				event instanceof Event ||			// Regular Event
				event instanceof jQuery.Event ||	// jQuery Event
				event instanceof createjs.Event		// createjs Event
			);
		}
	};

	/* Executes a new and returns the, now singleton, object */
	return new _TypeUtilities();
})();