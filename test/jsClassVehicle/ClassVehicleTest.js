/**
 * Created by Andrew on 07/09/14.
 *
 * Testing ClassVehicle API
 *  - Abstract Class works
 *  - Constructor Super Calls work
 *  - Inherited Method Call works
 *  - Overridden Method Call works
 *  - Overridden Method Call USING Inherited Variables works
 *  - Mandatory Params works
 */
/**
 * Base Class. Abstract.
 * @type {Vehicle}
 */
var Vehicle = ClassVehicle.createClass(true, {
	make : "Generic",
	type : "Vehicle",

	constructor : function() {
		TestMethodAPI.log("Vehicle Constructor");
	},
	drive : function(km) {
		ClassVehicle.makeMandatory(km);
		TestMethodAPI.log("Driving " + km + "km");
	},
	useHorn : function() {
		TestMethodAPI.log("~Generic Horn~");
	},
	printDetails : function() {
		TestMethodAPI.log(this.make + " " + this.type);
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
		TestMethodAPI.log("Sedan Constructor");
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
		ClassVehicle.makeMandatory(model, null, null);
		this.super.constructor();
		TestMethodAPI.log("DodgeSedan Constructor");

		this.model = model;
	},

	/**
	 * Prints the details of the DodgeSedan.
	 */
	printDetails : function() {
		TestMethodAPI.log(this.make + " " + this.model + " - Type " + this.type);
	},

	/**
	 * Uses the DodgeSedan's unique horn.
	 */
	useHorn : function() {
		TestMethodAPI.log("~Distinctive Dodge Sedan Car Horn~");
	}
});

/* Lets get some tests going! */
TestMethodAPI.fresh();
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