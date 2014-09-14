/**
 * Created by Andrew on 07/09/14.
 *
 * A Stand Alone Utility Class.
 *
 * Features:
 *  - eval() support functions
 */
var ConverterUtilities = {
	/**
	 * Helper methods for an eval() call.
	 */
	eval : {
		/**
		 * Converts the passed item for a "string" addition to an eval param.
		 *
		 * Note: Currently only supports strings (flat defaults to returning the passed param for everything else).
		 *
		 * @param item {*} - The item to convert
		 * @returns {*} - The item converted for use in an eval statement
		 */
		string : function(item) {
			var convertedItem = null;

			switch (typeof item) {
				case 'string':
					convertedItem = "'" + item + "'";
					break;

				default:
					convertedItem = item;
			}

			return convertedItem;
		}
	}
};