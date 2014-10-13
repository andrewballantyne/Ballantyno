/**
 * FunctionUtilities (Singleton)
 *  > Manages all functionality that is in and around a function; including calling a function with scope.
 *
 * Created by Andrew on 12/10/14.
 */
var FunctionUtilities = (function () {
	/**
	 * @constructor
	 * Singleton Constructor:
	 *  - Executes our constructor code
	 */
	function _FunctionUtilities() {
	}

	/**
	 * Calls the passed method with the passed scope. Useful for 'on' handlers.
	 *
	 * @param method {Function} - The method you want to call
	 * @param scope {*} - The scope you want to call the method with (usually 'this')
	 * @returns {Function} - The listener that will retain scope
	 */
	_FunctionUtilities.prototype.callWithScope = function (method, scope) {
		return function () {
			method.apply(scope, arguments);
		};
	};

	/* Executes a new and returns the, now singleton, object */
	return new _FunctionUtilities();
})();