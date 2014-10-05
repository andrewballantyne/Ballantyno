/**
 * Created by Andrew on 16/09/14.
 *
 * This init file will just include the tests found within the sub folders (local to this file).
 *
 * @requires HeaderUtilities (/utilities/HeaderUtilities.js)
 */

// Enable full logging as we are in test mode
Log.maxLogging();

/** Testing Framework Init **/
TestMethodAPI.init(true);

/** ClassVehicle Tests **/
HeaderUtilities.include.script('test/classTests/ClassVehicle/ClassVehicleUsage.js');
HeaderUtilities.include.script('test/classTests/ClassVehicle/ClassVehicleHierarchy.js');

/** Other Test.... **/


/** Clear Test Data **/
TestMethodAPI.reset();

// Return logging back to it's previous state, as testing has finished
Log.resetLogging();
