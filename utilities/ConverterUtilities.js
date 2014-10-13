/**
 * ConverterUtilities (Singleton)
 *  > Manages conversions between one thing and another (will strip out spaces, backets, or setup a param to be used in an eval)
 *
 * Created by Andrew on 12/10/14.
 */
var ConverterUtilities = (function () {
	/**
	 * @constructor
	 *
	 */
	function ConverterUtilitiesConstructor() {
	}

	/**
	 * Helper methods for an eval() call.
	 */
	_ConverterUtilities.prototype.eval = {
		/* ----- Public Variables ----- */

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
				// An array, lets parse it as an array
				convertedItem = ConverterUtilities.eval._fromArray(item);
			} else {
				// Okay, it's a standard type, lets find out which one
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
			if (object == null) return object;

			var returnString = "{";
			for (var key in object) {
				if (!object.hasOwnProperty(key)) continue;

				returnString += key + ": " + object[key] + ",";
			}
			if (returnString.length > 1)
			// We are more than just '{', remove the trailing comma
				returnString = returnString.substr(0, returnString.length - 1);
			returnString += "}";

			return returnString;
		}
	};

	/**
	 * Helper methods for stripping a string of characters.
	 */
	_ConverterUtilities.prototype.strip = {
		/* ----- Public Variables ----- */

		/* ----- Public Methods ----- */
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
	};

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _ConverterUtilities() {
		/* Call constructor */
		ConverterUtilitiesConstructor.apply(this, arguments);
	}

	/* Executes a new and returns the, now singleton, object */
	return new _ConverterUtilities();
})();