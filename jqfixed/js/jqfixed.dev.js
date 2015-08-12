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
        css    : {
            top: 0
            // , right : 10
            // , display: 'none'
            , zIndex: parseInt(new Date().getTime() / 1e3)
        }
        , top : 0
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
            , t       = o.top || _this.$self.offset().top
            , h       = _this.$self.outerHeight(true)
            , _t = 0;

            o.css.position = o.css.position || _this.$self.css('position');

            if (o.css.position != 'fixed') {
                $('<div style="height:' + h + 'px"></div>').insertBefore(_this.$self);
                o.css.marginTop = -h;
            } 

            _this.$self.find(o.close).click(function () {
                _this.$self.css('display', 'none');
                $win.off('scroll.fixed')
            });

            o.css.width = _this.$self.width();
            if (o.css.bottom >= 0) {
                o.css.top = wH - o.css.bottom - h;
                o.css.bottom = 'auto'
            };
            _this.$self.css(o.css);

            $win.on('scroll.fixed', function() {
                var st = $win.scrollTop() + (!o.top && o.css.top || 0);
                _this.$self
                .css(st >= t && 
                    {
                        position: pos
                        , display: 'block'
                        , top: !isIE6 ? 0 : st
                        , marginTop: o.css.top
                    } || 
                    o.css)

                st > t && 
                _this.$self.trigger('fixed').trigger(st > _t ? 'scrollUp' : 'scrollDown') ||
                _this.$self.trigger('unfixed');

                setTimeout(function () {_t = st}, 0)
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