/**
 * Tabs
 * [version 1.0]
 */

(function () {
	jQuery.fn.tabs = function () {
		return this.each(function () {
			var $this = $(this),
				$tabs = $this.find('> ul a'),
				$contents = $this.find('> :not(ul)').hide();

			$tabs.on('click', function () {
				var $this = $(this),
					id = $this.attr('href');

				$contents.not(id).hide().trigger('tabHide');
				$contents.filter(id).show().trigger('tabShow');
				$tabs.removeClass('active');
				$this.addClass('active');

				return false;
			});

			var $tab = $tabs.filter('.active');

			if (!$tab.length) {
				if (location.hash) {
					$tab = $tabs.filter('[href=' + location.hash + ']');
				}

				if (!$tab || !$tab.length) {
					$tab = $tabs.first();
				}
			}

			$tab.click();
		});
	}
})();
