/**
 * Created by Andrew on 08/09/14.
 *
 * A Stand-Alone Utility Class.
 *
 * Features:
 *  - Stronger typed functions (see TypeUtilities.is)
 */
var TypeUtilities = {
	/**
	 * "Is what? Is equal, that's what!"
	 * Helper methods to validate the state of variables.
	 */
	is : {
		/* ----- Public Variables ----- */
		EQUAL_TO_NOT_SET : [undefined],
		EQUAL_TO_NOT_DEFINED : [null, undefined],

		/* ----- Public Methods ----- */
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
		}
	}
};