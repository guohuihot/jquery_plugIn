/**
* author : ahuing
* date   : 2015-8-7
* name   : jqfixed v1.0
* modify : 2015-8-12 10:58:54
 */
!function ($) {
    var Fixed = function (self, opt) {
        this.o     = $.extend(true, {}, Fixed.defaults, opt)
        this.$self = $(self)
    }

    Fixed.defaults = {
        css : {
            // top : 100
            // , right: 10
            // , display:'none'
            bottom : 50
        }
        , fixed : 0
        , margintop : 0
        , bottom : 0
        , close : '.btn-close'
    }

    Fixed.prototype = {
        init : function () {
            if (!this.$self.length) return;

            var _this = this
            , $win    = $(window)
            , isIE6   = !-[1, ] && !window.XMLHttpRequest
            , wH      = $win.height()
            , bH      = $('body').height()
            , o       = _this.o
            , oH      = _this.$self.outerHeight(true)
            , t       = 0
            , fixedcss = {
                position : isIE6 ? 'absolute' : 'fixed'
                , marginTop : 0
                , display : 'block'
                , zIndex: parseInt(new Date().getTime() / 1e3)
            };
            o.css.zIndex = o.css.zIndex || _this.$self.css('z-index');
            o.css.position = o.css.position || _this.$self.css('position');
            isIE6 && o.css.position == 'fixed' && (o.css.position = 'absolute');
            // 先定位 再取top
            _this.$self.css(o.css);

            var oft = _this.$self.offset().top;

            if (o.css.position == 'fixed') {
                o.css.marginTop = fixedcss.marginTop = o.css.bottom >= 0 ? wH - oH - o.css.bottom : oft;
            }
            else if (o.css.position == 'absolute') {
                o.css.marginTop = oft;
            }
            else {
                $('<div style="height:' + oH + 'px"></div>').insertBefore(_this.$self);
                o.css.marginTop = -oH;
            };

            if (o.css.position != 'fixed') {
                if (o.fixed) {
                    fixedcss.marginTop = o.fixed > oft ? o.margintop : oft - o.fixed;
                }
                else o.fixed = oft;
            };

            o.css.top = 0;
            o.css.bottom = 'auto';
            // 设置对象的宽
            o.css.width = o.css.width || _this.$self.width();
            // 设置初始状态

            _this.$self.css(o.css);
            // 点击关闭
            _this.$self.find(o.close).click(function () {
                _this.$self.css('display', 'none');
                $win.off('scroll.fixed');
            });
            $win.on('scroll.fixed', function() {
                var st = $win.scrollTop();
                fixedcss.top = isIE6 ? st : 0;
                _this.$self.css(st >= o.fixed && fixedcss || o.css);

                st > o.fixed && 
                _this.$self.trigger('fixed').trigger(st > t ? 'scrollUp' : 'scrollDown') ||
                _this.$self.trigger('unfixed');

                setTimeout(function () {t = st}, 0)
            })
        }
    }

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('jqFixed')
            var options = typeof option == 'object' && option

            if (!data) {
                $this.data('jqFixed', (data = new Fixed(this, options)));
                data.init();
            }

        })
    }

    var old = $.fn.jqFixed;

    $.fn.jqFixed             = Plugin
    $.fn.jqFixed.Constructor = Fixed;

    $.fn.jqFixed.noConflict = function () {
        $.fn.jqFixed = old
        return this
    }

    $(window).on('load', function () {
        $('.jqFixed').each(function() {
            var $this = $(this);
            Plugin.call($this, $this.data())
        });
    })
}(jQuery);