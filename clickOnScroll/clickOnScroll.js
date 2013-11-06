/**
 * click on scroll
 * [version 1.1]
 */

;(function ($, window, document, undefined) {
	var pluginName = "clickOnScroll", defaults = {
		scrollerElement: window,
		listElement: '',
		offset: 0,
		timeout: 500
	};

	function Plugin (element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.$element = $(this.element);
			this.$list = $(this.settings.listElement);
			this.$scroller = $(this.settings.scrollerElement);
			
			this.play();

			var that = this;
			var timeout;

			this.$scroller.on('scroll.' + pluginName, function () {
				if (timeout) {
					return;
				}
				timeout = setTimeout(function () {
					console.log('check');
					if (that.mustClick()) {
						console.log('go');
						that.$element.click();
					}
					timeout = undefined;
				}, that.settings.timeout);
			});
		},
		play: function () {
			this.paused = false;
		},
		pause: function () {
			this.paused = true;
		},
		mustClick: function () {
			if (this.paused) {
				return false;
			}

			var height = 0;

			this.$list.each(function () {
				var thisHeight = $(this).height();

				if ((height === 0) || (thisHeight < height)) {
					height = thisHeight;
				}
			});

			return ((height - this.$scroller.scrollTop() - this.$scroller.height() - this.settings.offset) <= 0);
		},
		destroy: function () {
			this.$scroller.off('.' + pluginName);
		}
	};

	$.fn[pluginName] = function (options) {
		if ((options === undefined) || (typeof options === 'object')) {
			return this.each(function () {
				if (!$.data(this, "plugin_" + pluginName)) {
					$.data(this, "plugin_" + pluginName, new Plugin(this, options));
				}
			});
		}

		if ((typeof options === 'string') && (options[0] !== '_') && (options !== 'init')) {
			var returns, args = arguments;

			this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);

				if ((instance instanceof Plugin) && (typeof instance[options] === 'function')) {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}

				if (options === 'destroy') {
				  $.data(this, 'plugin_' + pluginName, null);
				}
			});

			return returns !== undefined ? returns : this;
		}
	};
})(jQuery, window, document);
