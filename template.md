# PHPStorm File Templates

## Base Classes
```
/**
 * ${NAME}
 *  > ${Description}
 *
 * Created by ${USER} on ${DATE}.
 *
 * @requires ClassVehicle
 */
var ${NAME} = (function (isAbstract) {
	/* Setup Class Defaults */
	ClassVehicle.setupClass(_${NAME}, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function ${NAME}Constructor() {
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _${NAME}() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _${NAME});

		/* Call constructor */
		${NAME}Constructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _${NAME};
})(${Abstract___true_or_false});
```

## Extended Classes
```
/**
 * ${NAME} extends ${Extends}
 *  > ${Description}
 *
 * Created by ${USER} on ${DATE}.
 *
 * @requires ClassVehicle
 * @extends ${Extends}
 */
var ${NAME} = (function (ParentClass, isAbstract) {
	/* Setup Extend Link and Setup Class Defaults */
	ClassVehicle.setupClassExtend(_${NAME}, ParentClass, isAbstract);

	/**
	 * @constructor
	 *
	 */
	function ${NAME}Constructor() {
		ParentClass.call(this); // super call
	}

	/* ----- Public Variables ----- */

	/* ----- Protected Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Protected Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks (ie, isAbstract).
	 */
	function _${NAME}() {
		/* Check Abstract-ness */
		ClassVehicle.checkAbstract.call(this, _${NAME});

		/* Call constructor */
		${NAME}Constructor.apply(this, arguments);
	}

	/* Return the class, ready for a new ...() */
	return _${NAME};
})(${Extends}, ${Abstract___true_or_false});
```

## Singletons
```
/**
 * ${NAME} (Singleton)
 *  > ${Description}
 *
 * Created by ${USER} on ${DATE}.
 *
 * @requires ...
 */
var ${NAME} = (function () {

	/**
	 * @constructor
	 *
	 */
	function ${NAME}Constructor() {
	}

	/* ----- Public Variables ----- */

	/* ----- Public Methods ----- */

	/* ----- Private Variables ----- */

	/* ----- Private Methods ----- */

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _${NAME}() {
		/* Call constructor */
		${NAME}Constructor.apply(this, arguments);
	}

	/* Executes a new and returns the, now singleton, object */
	return new _${NAME}();
})();
```