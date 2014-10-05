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
			var event = (TypeUtilities.is.anEvent(arguments[0])) ? arguments[0] : null;
			var argumentOffset = 0;
			if (event != null)
				argumentOffset = 1;

			if (arguments.length > argumentOffset) {
				// We have arguments (skipping past the event if applicable)
				var evalStatement = 'method.call(scope';
				for (var i = argumentOffset; i < arguments.length; i++) {
					evalStatement += ',' + ConverterUtilities.eval.thisItem(arguments[i]);
				}
				evalStatement += ')';

				eval(evalStatement);
			} else {
				// No arguments, lets just straight up call the method
				method.call(scope, event);
			}
		};
	}
};