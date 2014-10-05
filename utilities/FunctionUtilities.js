/**
 * Created by Andrew on 04/10/14.
 */
var FunctionUtilities = {
	/**
	 * Calls the passed method with the passed scope. Useful for 'on' handlers.
	 *
	 * @param method {Function} - The method you want to call
	 * @param scope {*} - The scope you want to call the method with (usually 'this')
	 * @returns {Function} - The listener that will retain scope
	 */
	callWithScope : function (method, scope) {
		return function () {
			if (arguments.length > 0) {
				// If we have arguments passed in, lets pass them along through
				var evalStatement = 'method.call(scope';
				for (var i = 0; i < arguments.length; i++) {
					evalStatement += ',' + ConverterUtilities.eval.thisItem(arguments[i]);
				}
				evalStatement += ')';

				eval(evalStatement);
			} else {
				// No arguments, lets just straight up call the method
				method.call(scope);
			}
		};
	}
};