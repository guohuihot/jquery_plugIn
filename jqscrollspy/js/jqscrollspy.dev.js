/**
* author : ahuing
* date   : 2015-8-7
* name   : jqscrollspy v1.0
* modify : 2015-8-10 10:13:06
 */
!function ($) {
    var Scrollspy = function (self, opt) {
        this.o         = $.extend({}, Scrollspy.defaults, opt)
        this.$cell     = $(self).find('a')
    }

    Scrollspy.defaults = {
        offset : 10
    }

    Scrollspy.prototype = {
        init : function () {
            var _this = this
            , $win    = $(window)
            , wH      = $win.height()
            , bH      = $('html').height()
            , ScrollTo = function () {
                var st = $win.scrollTop(), iIndex = -1;
                if (bH - wH != st) {
                    for (var i = 0; i < _this.aTop.length; i++) {
                        _this.aTop[i] <= st && (iIndex = i);
                    };
                }
                _this.$cell.removeClass('act').eq(iIndex).addClass('act');
            }

            _this.aTop = [];
            _this.$cell.each(function(i, el) {
                _this.aTop.push($(el.href.replace(el.baseURI, '')).offset().top - _this.o.offset);
            })
            .on('click', function () {
                $('body,html').animate({scrollTop: _this.aTop[_this.$cell.index(this)]});
                return false;
            });

            ScrollTo();

            $win.on('scroll', ScrollTo);

        }
    }

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('jqScrollspy')
            var options = typeof option == 'object' && option

            if (!data) {
                $this.data('jqScrollspy', (data = new Scrollspy(this, options)));
                data.init();
            }

        })
    }

    var old = $.fn.jqScrollspy;

    $.fn.jqScrollspy             = Plugin
    $.fn.jqScrollspy.Constructor = Scrollspy;

    $.fn.jqScrollspy.noConflict = function () {
        $.fn.jqScrollspy = old
        return this
    }

    $(window).on('load', function () {
        $('.jqScrollspy').each(function() {
            var $this = $(this);
            Plugin.call($this, $this.data())
        });
    })
}(jQuery);