/**
 * click on scroll
 * [version 1.0]
 */

;(function ($, window, document, undefined) {
	var pluginName = "clickOnScroll", defaults = {
		scrollerElement: window,
		listElement: '',
		offset: 0
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

			this.$scroller.on('scroll.' + pluginName, function () {
				if (that.mustClick()) {
					that.$element.click();
				}
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

			return ((this.$list.height() - this.$scroller.scrollTop() - this.$scroller.height() - settings.offset) <= 0));
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
