/**
 * MediaQuery Scripts
 * [version 1.0]
 */

(function () {
	var $element, lastValue, mediaQueryFunctions = {};

	addToMediaQuery = function (key, callback) {
		if (!$element) {
			$element = $('<div class="media-queries"></div>').hide().appendTo('body');

			$(window).resize(executeMediaQuery);

			$(document).ready(function () {
				executeMediaQuery();
			});
		}

		if (!mediaQueryFunctions[key]) {
			mediaQueryFunctions[key] = [];
		}

		mediaQueryFunctions[key].push(callback);
	}

	var executeMediaQuery = function () {
		var width = $element.width();

		if (width !== lastValue) {
			if (mediaQueryFunctions[width]) {
				$.each(mediaQueryFunctions[width], function (key, callback) {
					callback(width);
				});
			}

			lastValue = width;
		}
	};
})();
