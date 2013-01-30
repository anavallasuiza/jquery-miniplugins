/**
 * Tabs
 */
(function () {
	jQuery.fn.tabs = function () {
		var $tabs = this.find('> ul a');
		var $contents = this.find('> :not(ul)').hide();

		$tabs.on('click', function () {
			var $this = $(this);
			var id = $this.attr('href');

			$contents.not(id).hide().trigger('tabHide');
			$contents.filter(id).show().trigger('tabShow');
			$tabs.removeClass('active');
			$this.addClass('active');

			return false;
		});

		$tabs.first().click();
	}
})();
