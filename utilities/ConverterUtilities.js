/**
 * Created by Andrew on 07/09/14.
 *
 * A Stand Alone Utility Class.
 *
 * Features:
 *  - eval() support functions
 *  - strip support (removal of spaces and any other characters)
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
	},

	strip : {
		/**
		 * Strips a provided string for being used as an ID.
		 *
		 * @param string - The passed string, stripped of any unwanted 'id characters'
		 */
		forDOMId : function (string) {
			return ConverterUtilities.strip.spaces(string);
		},

		spaces : function (string) {
			return string.replace(/ /g, "");
		}
	}
};