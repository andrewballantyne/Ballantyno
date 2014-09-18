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
		/* ----- Public Methods ----- */
		/**
		 * Converts the passed item for a "string" addition to an eval param.
		 *
		 * Note: Currently only supports strings (flat defaults to returning the passed param for everything else).
		 *
		 * @param item {*} - The item to convert
		 * @returns {*} - The item converted for use in an eval statement
		 */
		thisItem : function(item) {
			var convertedItem = null;

			if (item instanceof Array) {
				convertedItem = ConverterUtilities.eval._fromArray(item);
			}

			if (convertedItem == null) {
				switch (typeof item) {
					case 'string':
						convertedItem = ConverterUtilities.eval._fromString(item);
						break;

					case 'object':
						convertedItem = ConverterUtilities.eval._fromObject(item);
						break;

					default:
						convertedItem = item;
				}
			}

			return convertedItem;
		},

		/* ----- Private Methods ----- */
		_fromString : function (string) {
			return "'" + string + "'";
		},
		_fromArray : function (array) {
			var returnString = "[";
			for (var i = 0; i < array.length; i++) {
				returnString += array[i];
				if (i < array.length - 1) {
					returnString += ",";
				}
			}
			returnString += "]";

			return returnString;
		},
		_fromObject : function (object) {
			var returnString = "{";
			for (var key in object) {
				if (!object.hasOwnProperty(key)) continue;

				returnString += key + ": " + object[key] + ",";
			}
			returnString = returnString.substr(0, returnString.length - 1);
			returnString += "}";

			return returnString;
		}
	},

	/**
	 * Helper methods for stripping a string of characters.
	 */
	strip : {
		/**
		 * Strips a provided string for being used as an ID.
		 *
		 * Strips (and replaces with nothing):
		 *  - Spaces 	=	' '
		 *  - Brackets 	=	'()[]{}'
		 *
		 * @param string - The passed string, stripped of any unwanted 'id characters'
		 */
		forDOMId : function (string) {
			var newId = ConverterUtilities.strip.spaces(string);
			newId = ConverterUtilities.strip.brackets(newId);
			return newId;
		},

		/**
		 * Removes all brackets ([{ and }]) in the passed string.
		 *
		 * @param string - The string to parse
		 * @returns {string}
		 */
		brackets : function (string) {
			return string.replace(/[()\[\]\{\}]/g, "");
		},

		/**
		 * Removes all spaces in the passed string.
		 *
		 * @param string - The string to parse
		 * @returns {string}
		 */
		spaces : function (string) {
			return string.replace(/ /, "");
		}
	}
};