/**
 * Ajax scroll
 * [version 1.0]
 */

(function () {
	var defaults = {
		listTarget: '.ajaxScroll-list',
		btnTarget: '.ajaxScroll-button',
		callback: undefined
	};

	jQuery.fn.ajaxScroll = function (callback) {
		if ($.isFunction(callback)) {
			var settings = $.extend({}, defaults, {callback: callback});
		} else {
			var settings = $.extend({}, callback);
		}

		return this.each(function () {
			var $this = $(this),
				$list = $this.find(settings.listTarget),
				$btn = $this.find(settings.btnTarget);

			$this.data('ajaxScrollPaused', false);

			var scrollCallback = function () {
				if (!$this.data('ajaxScrollPaused') && (($list.height() - $this.scrollTop() - $this.height()) <= 0)) {
					$btn.click();
				}
			};

			switch (callback) {
				case 'destroy':
					$this.off('scroll', scrollCallback);
					break;

				case 'pause':
					$this.data('ajaxScrollPaused', true);
					break;

				case 'play':
					$this.data('ajaxScrollPaused', false).trigger('scroll');
					break;

				default:
					$this.on('scroll', scrollCallback);

					if ($.isFunction(settings.callback)) {
						$btn.click(function () {
							return settings.callback.call($this, $list, $btn);
						});
					}
			}
		});
	}
})();
