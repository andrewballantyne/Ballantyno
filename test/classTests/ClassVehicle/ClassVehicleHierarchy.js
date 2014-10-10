/**
 * Created by Andrew on 05/10/14.
 *
 * Testing ClassVehicle API, with less information
 *  - Testing Constructor-less Creation
 *  - Testing Constructor Creation and Extension without Constructor
 *  - Testing Constructor-less Creation and Extended Constructor-less Creation
 *
 * @requires TestMethodAPI (/test/core/TestMethodAPI.js)
 * @requires ClassVehicle (/core/ClassVehicle.js)
 * @requires TypeUtilities (/utilities/TypeUtilities.js)
 */
/* ------------ Classes ----------- */
/**
 * A Base Class (to-be extended) that has no explicitly defined constructor.
 * @type {BaseNoConstructor}
 */
var BaseNoConstructor = ClassVehicle.createClass({
	// No methods
});
/**
 * A Base Class (to-be extended) that does have an explicitly defined constructor.
 * @type {BaseYesConstructor}
 */
var BaseYesConstructor = ClassVehicle.createClass({
	constructor : function () {
		Log.log("BaseYesConstructor.constructor Called");
	}
});
/**
 * An Extension Class (one that is extending) that has no base constructor or an extended constructor.
 * @extends BaseNoConstructor
 * @type {ExtendNoBaseNoConstructor}
 */
var ExtendNoBaseNoConstructor = ClassVehicle.extendClass(BaseNoConstructor, {
	// No methods
});
/**
 * An Extension Class (one that is extending) that does have a base constructor and is implementing an extended constructor.
 * @extends BaseYesConstructor
 * @type {ExtendYesBaseYesConstructor}
 */
var ExtendYesBaseYesConstructor = ClassVehicle.extendClass(BaseYesConstructor, {
	constructor : function () {
		this.super.constructor.call(this);
		Log.log("ExtendYesBaseYesConstructor.constructor Called");
	}
});
/**
 * An Extension Class (one that is extending) that does have a base constructor but does not implement an extended constructor.
 * @extends BaseYesConstructor
 * @type {ExtendNoBaseYesConstructor}
 */
var ExtendNoBaseYesConstructor = ClassVehicle.extendClass(BaseYesConstructor, {
	// No methods
});
/**
 * An Extension Class (one that is extending) that has no base constructor but is implementing an extended constructor.
 * @extends BaseNoConstructor
 * @type {ExtendYesBaseNoConstructor}
 */
var ExtendYesBaseNoConstructor = ClassVehicle.extendClass(BaseNoConstructor, {
	constructor : function () {
		this.super.constructor.call(this);
		Log.log("ExtendYesBaseNoConstructor.constructor Called");
	}
});

/* ------------ Tests - Testing Loose Creations ------------ */
TestMethodAPI.startFreshGroup('ClassVehicle Tests (Loose Constructor Implementations)');

TestMethodAPI.startTest(1, "Create 'No Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	BaseNoConstructor,
	"Class was created WITHOUT a constructor",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.endTest();

TestMethodAPI.startTest(2, "Create 'Yes Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	BaseYesConstructor,
	"Class was created with a constructor - No surprise there!",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.assertConsoleLogs("BaseYesConstructor.constructor Called");
TestMethodAPI.endTest();

TestMethodAPI.startTest(3, "Create 'Yes Extend + Yes Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	ExtendYesBaseYesConstructor,
	"Class was created with an extended constructor and with a base constructor - No surprise there!",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.assertConsoleLogs("BaseYesConstructor.constructor Called", "ExtendYesBaseYesConstructor.constructor Called");
TestMethodAPI.endTest();

TestMethodAPI.startTest(4, "Create 'Yes Extend + No Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	ExtendYesBaseNoConstructor,
	"Class was created with an extended constructor and WITHOUT a base constructor",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.assertConsoleLogs("ExtendYesBaseNoConstructor.constructor Called");
TestMethodAPI.endTest();

TestMethodAPI.startTest(5, "Create 'No Extend + Yes Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	ExtendNoBaseYesConstructor,
	"Class was created WITHOUT an extended constructor and with a base constructor",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.assertConsoleLogs("BaseYesConstructor.constructor Called");
TestMethodAPI.endTest();

TestMethodAPI.startTest(6, "Create 'No Extend + No Base Constructor' Class");
TestMethodAPI.assertInstantiation(
	ExtendNoBaseNoConstructor,
	"Class was created WITHOUT an extended constructor and WITHOUT a base constructor",
	"Error Creating Class - Constructor Problems"
);
TestMethodAPI.endTest();

TestMethodAPI.endGroup();