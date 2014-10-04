/**
 * Created by Andrew on 04/10/14.
 */
var FunctionUtilities = {
	callWithScope : function (method, scope) {
		var caseMethod = function () {
			method.call(scope);
		};

		return caseMethod;
	}
};