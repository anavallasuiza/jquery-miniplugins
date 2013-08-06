/**
 * Tabs
 * [version 2.0]
 */
;(function ($, window, document, undefined) {
	var pluginName = "tabs", defaults = {};

	function Plugin (element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);

		this.init();
	}

	Plugin.prototype = {
		init: function () {
			this.$element = $(this.element);
			this.$tabs = this.$element.find('> ul a');
			this.$contents = this.$element.find('> :not(ul)').hide();

			var that = this;

			this.$tabs.on('click.tabs', function () {
				var $this = $(this), id = $this.attr('href');

				that.$contents.not(id).hide().trigger('tabHide');
				that.$contents.filter(id).show().trigger('tabShow');
				that.$tabs.removeClass('active');
				$this.addClass('active');

				return false;
			});

			var $tab = this.$tabs.filter('.active');

			if (!$tab.length) {
				if (location.hash) {
					$tab = this.$tabs.filter('[href=' + location.hash + ']');
				}

				if (!$tab || !$tab.length) {
					$tab = this.$tabs.first();
				}
			}

			$tab.click();
		},
		destroy: function () {
			this.$tabs.off('.tabs');
			this.$contents.off('tabHide tabShow');
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
