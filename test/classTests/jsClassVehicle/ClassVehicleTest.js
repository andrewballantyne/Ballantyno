/**
 * Created by Andrew on 07/09/14.
 *
 * Testing ClassVehicle API, with ideal information (Series 1)
 *  - Abstract Class works
 *  - Constructor Super Calls work
 *  - Inherited Method Call works
 *  - Overridden Method Call works
 *  - Overridden Method Call USING Inherited Variables works
 *  - Mandatory Params works
 *
 * Testing ClassVehicle API, with less information (Series 2)
 *  - Testing Constructor-less Creation
 *  - Testing Constructor Creation and Extension without Constructor
 *  - Testing Constructor-less Creation and Extended Constructor-less Creation
 *
 * @requires TestMethodAPI (/test/core/TestMethodAPI.js)
 * @requires ClassVehicle (/core/ClassVehicle.js)
 * @requires TypeUtilities (/utilities/TypeUtilities.js)
 */

/* ------------ Series 1 Classes ----------- */
/**
 * Base Class. Abstract.
 * @type {Vehicle}
 */
var Vehicle = ClassVehicle.createClass(true, {
	make : "Generic",
	type : "Vehicle",

	constructor : function() {
		Log.log("Vehicle Constructor");
	},
	drive : function(km) {
		TypeUtilities.valid.makeMandatory(km);
		Log.log("Driving " + km + "km");
	},
	useHorn : function() {
		Log.log("~Generic Horn~");
	},
	printDetails : function() {
		Log.log(this.make + " " + this.type);
	}
});

/**
 * First Extended. Also Abstract.
 * @extends Vehicle
 * @type {Sedan}
 */
var Sedan = ClassVehicle.extendClass(Vehicle, true, {
	type : "Sedan",

	constructor : function() {
		this.super.constructor();
		Log.log("Sedan Constructor");
	}
});

/**
 * Second Extend. NOT Abstract. Lets create one of these guys!
 * @extends Sedan
 * @type {DodgeSedan}
 */
var DodgeSedan = ClassVehicle.extendClass(Sedan, {
	make : "Dodge",
	model : "Undefined_Dodge_Model",

	constructor : function(model) {
		TypeUtilities.valid.makeMandatory(model, null, null);
		this.super.constructor();
		Log.log("DodgeSedan Constructor");

		this.model = model;
	},

	/**
	 * Prints the details of the DodgeSedan.
	 */
	printDetails : function() {
		Log.log(this.make + " " + this.model + " - Type " + this.type);
	},

	/**
	 * Uses the DodgeSedan's unique horn.
	 */
	useHorn : function() {
		Log.log("~Distinctive Dodge Sedan Car Horn~");
	}
});

/* ------------ Series 2 Classes ----------- */
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
		this.super.constructor();
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
		this.super.constructor();
		Log.log("ExtendYesBaseNoConstructor.constructor Called");
	}
});

Log.maxLogging();
/* ------------ Series 1 Tests - Lets get some tests going! ------------ */
TestMethodAPI.startFreshGroup('ClassVehicle Tests (Ideal Information)');
TestMethodAPI.printToDOM();

TestMethodAPI.startTest(1, "Abstract Class Instantiation");
TestMethodAPI.assertAbstract(Vehicle, "Abstract Functionality Successful (Vehicle)", "Abstract Functionality Unsuccessful (Vehicle)");
TestMethodAPI.assertAbstract(Sedan, "Abstract Functionality Successful (Sedan)", "Abstract Functionality Unsuccessful (Sedan)");
TestMethodAPI.endTest();

TestMethodAPI.startTest(2, "Creating/Calling Constructors for a new DodgeSedan");
var dodgeAvenger = new DodgeSedan("Avenger");
TestMethodAPI.assertConsoleLogs("Vehicle Constructor", "Sedan Constructor", "DodgeSedan Constructor");
TestMethodAPI.endTest();

TestMethodAPI.startTest(3, "Using newly created DodgeSedan object, call extended method (not directly implemented)");
dodgeAvenger.drive(20);
TestMethodAPI.assertConsoleLogs("Driving 20km");
TestMethodAPI.endTest();

TestMethodAPI.startTest(4, "Using the DodgeSedan object, call overridden method");
dodgeAvenger.useHorn();
TestMethodAPI.assertConsoleLogs("~Distinctive Dodge Sedan Car Horn~");
TestMethodAPI.endTest();

TestMethodAPI.startTest(5, "Using the DodgeSedan object, call overridden method that uses properties on extended classes");
dodgeAvenger.printDetails();
TestMethodAPI.assertConsoleLogs("Dodge Avenger - Type Sedan");
TestMethodAPI.endTest();

TestMethodAPI.endGroup();


/* ------------ Series 2 Tests - Testing Loose Creations ------------ */
TestMethodAPI.startFreshGroup('ClassVehicle Tests (Loose Constructor Implementations)');
TestMethodAPI.printToDOM();

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

Log.resetLogging();
