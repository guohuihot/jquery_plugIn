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
            top: 0
            // , marginTop: 0
            , zIndex: parseInt(new Date().getTime() / 1e3)
        }
        , fixed : 0
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
            , pos     = isIE6 ? 'absolute' : 'fixed'
            , o       = _this.o
            , oH      = _this.$self.outerHeight(true)
            , t       = 0
            , fixedO  = o;
            // 获取position
            o.css.position = o.css.position || _this.$self.css('position');

            if (o.css.position == 'fixed' || o.css.position == 'absolute') {
                o.css.marginTop = o.css.marginTop || parseInt(_this.$self.css('margin-top')) || o.css.top || o.css.bottom && (wH - o.css.bottom - oH) || parseInt(_this.$self.css('top'));
                o.css.top = 0;
                isIE6 && (o.css.position = 'absolute')
            }
            else {
                $('<div style="height:' + oH + 'px"></div>').insertBefore(_this.$self);
                o.css.marginTop = -oH;
            } 
            // 点击关闭
            _this.$self.find(o.close).click(function () {
                _this.$self.css('display', 'none');
                $win.off('scroll.fixed');
            });
            // 设置对象的宽
            o.css.width = o.css.width || _this.$self.width();
            // 设置初始状态
            _this.$self.css(o.css);
            o.fixed = o.fixed || _this.$self.offset().top;
            $win.on('scroll.fixed', function() {
                var st = $win.scrollTop();
                _this.$self.css(st >= o.fixed && {
                        position: pos
                        , display: 'block'
                        , top: isIE6 ? st : 0
                        , marginTop: (o.css.bottom || o.css.position == 'fixed') ? o.css.marginTop * 1 : 0
                    } || o.css);

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