/*	jq.duang v3.0 jQuery1.7+
 *	author：ahuing  2012-12-26
 *  ps：从效率上考虑尽量用最新版本的.如果网站是utf-8时，需要转下编码
 *  modifed:2015-04-28
 *  http://www.jqduang.com/
 */
$.extend($.easing, {
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeOutBounce: function(x, t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	}
});

; (function($) {
	// 参数选项设置
    var defaults = {
		thumbObj     : null
		,botPrev     : null //上一个
		,botNext     : null //下一个
		,effect      : 'fade' //效果
		,curClass    : 'act'
		,trigger     : 'mouseover' //切换的方式 'click'
		,speed       : 400 //切换速度
		,autoPlay  : 1
		,playTime  : 3000 //等待时间
		,delayTime   : 0 //延迟时间
		,showTxt     : 0
		,visible     : 1 //可见数量
		,steps       : 1 //每次切换的数量
		,cycle       : 0 //循环
		,start       : 0
		,direction   : 'left' //方向
		,easing      : 'swing'
		,wrapSize    : 0 //外层的宽度
		,full        : 0
		,beforeStart : null //切换前函数
		,afterEnd    : null //切换完成的函数
		,index : 0
	};

	$.fn.jqDuang = function(opt) {
		return this.each(function() {
			var o     = $.extend({},defaults, opt || {}),
			that      = $(this),
			$per      = that.parent(),
			$img      = that.find('img'),
			drt       = o.direction,
			vis       = o.visible,
			itemAttr  = drt == 'left' ? 'width': 'height',
			itemAttrV = {
			h         : that.outerHeight(true)
			,w        : that.outerWidth(true)
			};

			that.children = that.children();
			that.len      = that.children.length;
			that.index    = o.index;

			if (!that.len) return;
			//初始化
			switch(o.effect){
				case '' :
				break;
				default :
					that.children.css({
						display : 'none'
					}).eq(that.index).show();
			}
			// 切换函数

			that.Play = function() {
				o.beforeStart && o.beforeStart.call(that);
				switch(o.effect){
					case '' :
					break;
					default :
						that.children.stop(1,1).eq(that.index).animate({opacity:'hide'},o.speed);
						that.children.eq(that.next).animate({opacity:'show'},o.speed);
				}
				that.index = that.next;
				o.afterEnd && o.afterEnd.call(that)
			}

			if (o.thumbObj) {
				var $thumbObj = $(o.thumbObj).slice(0, that.len),delayRun;
				$thumbObj[o.trigger](function() {
					that.next = $thumbObj.removeClass(o.curClass).index(this);
					$(this).addClass(o.curClass)
					clearTimeout(delayRun);
					delayRun = setTimeout(that.Play, o.delayTime)
					if(o.trigger == 'click') return false;//点击时阻止跳转
				});
			};

			if (o.autoPlay) {
				var startRun = setInterval(that.Play, o.playTime);
				that.add($thumbObj).mouseover(function() {
					clearInterval(startRun);
				}).mouseout(function() {
					that.next = (that.index + 1) % that.len;
					startRun = setInterval(that.Play, o.playTime)
				});
			};


		})
	}
})(jQuery);