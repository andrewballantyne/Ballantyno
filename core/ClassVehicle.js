/**
 * Created by Andrew on 07/09/14.
 *
 * "The Vehicle that will drive JavaScript Class creation"
 * ClassVehicle, a helpful Class Creating framework. This set of API will help create "Java-like" Objects.
 *
 * Features supported:
 *  - Abstract classes (cannot be instantiated, only extended)
 *  - Extending classes
 *  - Overriding and calling of 'super' (both constructor and any method for it's overridden functionality)
 *
 * @requires ConverterUtilities (/utilities/ConverterUtilities.js)
 */
var ClassVehicle = (function () {
	function _ClassVehicle() {}
	_ClassVehicle.prototype = {
		/* ----- Public Variables ----- */

		/* ----- Public Methods ----- */
		/**
		 * Create a Class!
		 *
		 * @param abstractOrProps {boolean|Object} - Pass true to make this class abstract, or just pass props (see props)
		 * @param props {Object?} - The properties this class will have, pass in an object {} that contains functionName:function(){} or
		 * 	variable:value
		 * @returns {Function|*} - The Class or JavaScript "Function" (do a new ...() on this return to create an instance)
		 */
		createClass : function (abstractOrProps, props) {
			var Class = this._getClassBase();
			if (abstractOrProps === true)
				Class.abstract = true;
			else
				props = abstractOrProps;
			this._addNewProperties(Class, props);

			return Class;
		},

		/**
		 * Extend a Class, create a hierarchy!
		 *
		 * @param ExtendClass {Function|*} - A previously created class (from ClassVehicle.createClass())
		 * @param abstractOrProps {boolean|Object} - Pass true to make this class abstract, or just pass props (see props)
		 * @param newProps {Object?} - The properties this class will have, pass in an object {} that contains functionName:function(){} or
		 * 	variable:value
		 * @returns {*} - The Class or JavaScript "Function" (do a new ...() on this return to create an instance)
		 */
		extendClass : function (ExtendClass, abstractOrProps, newProps) {
			var Class = this._getClassBase();
			if (abstractOrProps === true)
				Class.abstract = true;
			else
				newProps = abstractOrProps;
			this._addExtendedClass(Class, ExtendClass);
			this._addNewProperties(Class, newProps);

			return Class;
		},

		/* ----- Private Variables ----- */
		/* ----- Private Methods ----- */
		_getClassBase : function () {
			function Class(constructorProperties) {
				if (Class.abstract === true)
					throw new Error("Attempting to instantiate an abstract class!");
				this.constructor(constructorProperties);
			}

			Class.prototype.super = null;

			return Class;
		},
		_addExtendedClass : function (CurrentClass, ExtendedClass) {
			for (var extendedProperty in ExtendedClass.prototype) {
				if (!ExtendedClass.prototype.hasOwnProperty(extendedProperty)) continue;
				if (extendedProperty === "super") continue; // ignore super properties

				var value = ConverterUtilities.eval.thisItem(ExtendedClass.prototype[extendedProperty]);
				eval("CurrentClass.prototype." + extendedProperty + " = " + value);
			}

			// Register super call property
			CurrentClass.prototype.super = ExtendedClass.prototype;
		},
		_addNewProperties : function (CurrentClass, properties) {
			var iHaveConstructor = false;
			// Copy current properties
			for (var property in properties) {
				if (!properties.hasOwnProperty(property)) continue;

				var value = ConverterUtilities.eval.thisItem(properties[property]);
				if (property == 'constructor') iHaveConstructor = true;
				eval("CurrentClass.prototype." + property + " = " +  value);
			}

			if (!iHaveConstructor) {
				// We were not give a defined constructor, let's add a stock constructor
				if (CurrentClass.prototype.super != null) {
					CurrentClass.prototype.constructor = function (constructorProperties) {
						/* Yes Parent Stock Constructor */
						this.super.constructor(constructorProperties); // call parent
					};
				} else {
					CurrentClass.prototype.constructor = function (constructorProperties) {
						/* No Parent Stock Constructor */
					};
				}
			}
		}
	};

	return new _ClassVehicle();
})();