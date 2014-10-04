/**
 * Created by Andrew on 16/09/14.
 *
 * This init file will just include the tests found within the sub folders (local to this file).
 *
 * @requires HeaderUtilities (/utilities/HeaderUtilities.js)
 */

/** Testing Framework Init **/
TestMethodAPI.init();

/** ClassVehicle Test **/
HeaderUtilities.include.script('test/classTests/jsClassVehicle/ClassVehicleTest.js');

/** Other Test.... **/