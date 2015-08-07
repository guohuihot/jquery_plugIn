// custom
!function ($) {
	//fixed
	$.extend({
		isIE6: function() {
			return !-[1, ] && !window.XMLHttpRequest;
		},
		getZindex: function() {
			return parseInt(new Date().getTime() / 1e3);
		},
		jqFixed: function(fixedOpt) {

			if ($(fixedOpt.obj).length) var $obj = $(fixedOpt.obj);
			else return;
			var ie6 = $.isIE6(),
				pos = ie6 ? "absolute" : "fixed",
				$w = $(window),
				o = $.extend(true, {
					type: 1,
					css: {
						position: "absolute",
						display: "block"
					},
					top: 0
				}, fixedOpt);
			if (o.css.bottom >= 0) o.css.top = $w.height() - o.css.bottom - $obj.outerHeight();
			if (ie6 && o.type) o.css.top += $w.scrollTop();
			$obj.css(o.css);
			var T = $obj.offset().top;
			if (ie6 && o.type) T -= $w.scrollTop();
			if (o.top) $obj.css("display", "none");
			$w.on("scroll", function() {
				var st = $w.scrollTop(),
					c = st >= o.top;
				$obj.css({
					display: c ? "block" : "none",
					position: st > T ? pos : o.type ? pos : "absolute",
					top: ie6 ? o.type ? T + st : st > T ? st : T : st > T ? o.type ? T : 0 : T
				})[c ? 'addClass' : 'removeClass']('j-fixed');
			});
			return $obj;
		}
	})
}(jQuery);