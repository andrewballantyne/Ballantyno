/**
 * HeaderUtilities (Singleton)
 *  > Manages any functionality around adding tags to the DOM head tag.
 *
 * Created by Andrew on 12/10/14.
 */
var HeaderUtilities = (function () {
	/**
	 * @constructor
	 *
	 */
	function HeaderUtilitiesConstructor() {
	}

	/**
	 * External Libraries.
	 */
	_HeaderUtilities.prototype.externals = {
		/* ----- Public Variables ----- */
		// jQuery - General DOM Manipulation
		JQUERY : 'http://code.jquery.com/jquery-2.1.1.min.js',

		// Handlebars - For Dynamic Page Loading
		HANDLEBARS : 'http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v2.0.0.js',

		// CreateJs - Canvas API Library
		CREATEJS : 'http://code.createjs.com/createjs-2013.12.12.min.js',
		EASELJS : 'http://code.createjs.com/easeljs-0.7.1.min.js',
		TWEENJS : 'http://code.createjs.com/tweenjs-0.5.1.min.js',
		SOUNDJS : 'http://code.createjs.com/soundjs-0.5.2.min.js',
		PRELOADJS : 'http://code.createjs.com/preloadjs-0.4.1.min.js'

		/* ----- Public Methods ----- */
	};

	/**
	 * Includes. Include 'script' tags, 'link' tags, etc.
	 */
	_HeaderUtilities.prototype.include = {
		/* ----- Public Variables ----- */

		/* ----- Public Methods ----- */
		/**
		 * Include the latest jQuery library.
		 */
		jQuery : function () {
			HeaderUtilities.include.script(HeaderUtilities.externals.JQUERY);
		},

		/**
		 * Include the latest handlebars library.
		 */
		handlebars : function () {
			HeaderUtilities.include.script(HeaderUtilities.externals.HANDLEBARS);
		},

		/**
		 * Include the desired createjs libraries (Easel, Tween, Sound, and/or Preload).
		 */
		createjs : function () {
			HeaderUtilities.include.script(HeaderUtilities.externals.CREATEJS);
		},

		/**
		 * Adds a script tag to the header of the current document.
		 *
		 * @see HeaderUtilities.externals for known library includes.
		 *
		 * @param url - The url to add
		 */
		script : function (url) {
			if (_isIncluded(url)) return;

			// Create the script tag
			var element = document.createElement('script');
			element.type = 'text/javascript';
			element.src = url;

			// Append to the header (just after the title tag)
			document.getElementsByTagName('head')[0].insertBefore(element, document.getElementsByTagName('title')[0].nextSibling);

			_alreadyIncluded.push(url);
		},

		/**
		 * Adds a link (style) tag to the header of the current document.
		 *
		 * @see HeaderUtilities.externals for known library includes.
		 *
		 * @param url - The url to add
		 */
		style : function (url) {
			if (_isIncluded(url)) return;

			// Create the script tag
			var element = document.createElement('link');
			element.rel = 'stylesheet';
			element.href = url;

			// Append to the header (just after the title tag)
			document.getElementsByTagName('head')[0].insertBefore(element, document.getElementsByTagName('title')[0].nextSibling);

			_alreadyIncluded.push(url);
		}
	};

	/* ----- Private Variables ----- */
	var _alreadyIncluded = [];

	/* ----- Private Methods ----- */
	function _isIncluded(url) {
		return _alreadyIncluded.indexOf(url) >= 0;
	}

	/**
	 * Entry point into class. This method will only contain needed class-level checks.
	 */
	function _HeaderUtilities() {
		/* Call constructor */
		HeaderUtilitiesConstructor.apply(this, arguments);
	}

	/* Executes a new and returns the, now singleton, object */
	return new _HeaderUtilities();
})();