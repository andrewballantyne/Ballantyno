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
			var NewClass = this._getBaseClass();

			if (abstractOrProps != null && abstractOrProps === true) {
				NewClass.abstract = true;
			} else {
				props = abstractOrProps;
			}

			// Copy our properties into our new Class
			NewClass.prototype = props;

			// Did we provide a constructor in our properties?
			if (!props.hasOwnProperty('constructor')) {
				// No we did not; best create a stock one
				NewClass.prototype.constructor = this._getStockBaseConstructor();
			}

			NewClass.prototype.parents = [];

			return NewClass;
		},

		/**
		 * Extend a Class, create a hierarchy!
		 *
		 * @param ParentClass {Function|*} - A previously created class (from ClassVehicle.createClass()) that is being extended
		 * @param abstractOrProps {boolean|Object} - Pass true to make this class abstract, or just pass props (see props)
		 * @param newProps {Object?} - The properties this class will have, pass in an object {} that contains functionName:function(){} or
		 * 	variable:value
		 * @returns {*} - The Class or JavaScript "Function" (do a new ...() on this return to create an instance)
		 */
		extendClass : function (ParentClass, abstractOrProps, newProps) {
			var NewExtendedClass = this._getBaseClass();

			if (abstractOrProps != null && abstractOrProps === true) {
				NewExtendedClass.abstract = true;
			} else {
				newProps = abstractOrProps;
			}

			// Copy all our newProps over (our foundation)
			NewExtendedClass.prototype = newProps;

			// Did we provide a constructor in our newProps?
			if (!newProps.hasOwnProperty('constructor')) {
				// No we did not; best create a stock one that calls our Parent
				NewExtendedClass.prototype.constructor = this._getStockExtendConstructor();
			}

			// Verify we are not missing any foundation pieces that our Parent has
			for (var parentProp in ParentClass.prototype) {
				if (!ParentClass.prototype.hasOwnProperty(parentProp)) continue;

				if (!NewExtendedClass.prototype.hasOwnProperty(parentProp)) {
					// Oh, our Parent has a property we don't, lets copy it over
					NewExtendedClass.prototype[parentProp] = ParentClass.prototype[parentProp];
				}
			}

			// We'll need a reference to get at our parent's newProps, let's call it "super"
			NewExtendedClass.prototype.super = {};

			// Copy all the Parent's newProps over into our new "super" property
			for (var id in ParentClass.prototype) {
				if (!ParentClass.prototype.hasOwnProperty(id)) continue;
				if (id == "super") continue; // we will never use it, no sense copying it
				if (id == "parents") continue; // we will never use it, no sense copying it

				NewExtendedClass.prototype.super[id] = this._getSuper(id); // special "copy" to create deep-set reference
			}

			// Let's check on our parent's history; does it have it's own parents?
			if (ParentClass.prototype.parents != null) {
				// Yes it does; copy over our Parent's history
				NewExtendedClass.prototype.parents = ParentClass.prototype.parents;
			} else {
				// No? Well, you should have parents, but it should be an array of 0 (see the createClass method)
				throw new Error("Parents should have been defined... where did you get this Parent Class?");
			}

			// Add this one to our family history
			NewExtendedClass.prototype.parents.push(ParentClass.prototype);

			return NewExtendedClass;
		},

		/* ----- Private Variables ----- */
		/* ----- Private Methods ----- */
		_getStockBaseConstructor : function () {
			return function () {
				console.log("Stock Base Constructor");
			}
		},
		_getStockExtendConstructor : function () {
			var cvObj = this;

			return function () {
				cvObj._callMethod(this.super, 'constructor', this, arguments);
				console.log("Stock Extend Constructor");
			}
		},
		_getBaseClass : function () {
			var cvObj = this;

			return function NewExtendedClass() {
				if (NewExtendedClass.abstract)
					throw new Error("Abstract Class!");
				else
					cvObj._callMethod(this, 'constructor', this, arguments);
			}
		},
		_getSuper : function (method) {
			var cvObj = this;

			/**
			 * This method will control the calling of the parents. Each time this method is called, it decrements the scope and reaches
			 * into that object and calls the desired method.
			 *
			 * Consider this method as a seeing eye dog, it will guide the method call into the super's object and get it's method for
			 * this particular call. Each time the bubbling stops, the depth is reset for the next time.
			 */
			return function() {
				if (this._depth_ == null)
					this._depth_ = this.parents.length;
				cvObj._callMethod(this.parents[--this._depth_], method, this, arguments);
				this._depth_ = this.parents.length;
			};
		},
		_callMethod : function (obj, method, scope, args) {
			// Arbitrary... this was easier than 'eval' sending params in. This can easily be increased to more
			if (args.length > 5) console.error("Arbitrary limit of 5 passed params exceeded. Trailing params are truncated");
			obj[method].call(scope, args[0], args[1], args[2], args[3], args[4]);
		}
	};

	return new _ClassVehicle();
})();