/**
* author : ahuing
* date   : 2015-8-7
* name   : jqfixed v1.0
* modify : 2015-8-10 14:43:10
 */
!function ($) {
    var Fixed = function (self, opt) {
        this.o     = $.extend({}, Fixed.defaults, opt)
        this.$self = $(self)
    }

    Fixed.defaults = {
        offset   : 10
        , css    : {
            top: 0
            , position: 'static'
            , zIndex: parseInt(new Date().getTime() / 1e3)
        }
        , bottom : 0
    }

    Fixed.prototype = {
        init : function () {
            if (!this.$self.length) return;

            var _this = this
            , $win    = $(window)
            , isIE6   = !-[1, ] && !window.XMLHttpRequest
            , wH      = $win.height()
            , bH      = $('body').height()
            , pos     = isIE6 ? "absolute" : "fixed"
            , o       = _this.o
            , T = this.$self.offset().top;

            $before = $('<div></div>').insertBefore(_this.$self)
                        .css({
                            height: _this.$self.outerHeight(true)
                        });

            o.css.marginTop = -_this.$self.outerHeight(true);
            o.css.width = _this.$self.width();
            _this.$self.css(o.css);

            $win.on('scroll', function() {
                var st = $win.scrollTop() + o.css.top;
                st >= T && _this.$self.css({
                    position: pos
                    , marginTop: 0
                }) || _this.$self.css({
                    position: o.css.position
                    , marginTop: o.css.marginTop
                });
            });
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