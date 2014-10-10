/**
 * Created by Andrew on 07/09/14.
 *
 * Testing ClassVehicle API, with ideal information
 *  - Abstract Class works
 *  - Constructor Super Calls work
 *  - Inherited Method Call works
 *  - Overridden Method Call works
 *  - Overridden Method Call USING Inherited Variables works
 *  - Mandatory Params works
 *
 * @requires TestMethodAPI (/test/core/TestMethodAPI.js)
 * @requires ClassVehicle (/core/ClassVehicle.js)
 * @requires TypeUtilities (/utilities/TypeUtilities.js)
 */

/* ------------ Classes ----------- */
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
		this.super.constructor.call(this);
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
		this.super.constructor.call(this);
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

/* ------------ Tests ------------ */
TestMethodAPI.startFreshGroup('ClassVehicle Tests (Ideal Information)');

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
