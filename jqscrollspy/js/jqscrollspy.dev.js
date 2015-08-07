/**
* author : ahuing
* date   : 2015-8-7
* name   : jqscrollspy v1.0
* modify : 2015-8-7 15:06:03
 */
!function ($) {
    var Scrollspy = function (self, opt) {
        this.o         = $.extend({}, Scrollspy.defaults, opt)
        this.$cell     = $(self).find(this.o.cell)
    }

    Scrollspy.defaults = {
        offset : 10
        , cell : 'a'
    }

    Scrollspy.prototype = {
        init : function () {
            this.$cell.each($.proxy(function(i, el) {
                this.aTop.push($(el.attr('href')).offset().top - this.o.offset);
            }, this))
            .on('click', function () {
                $('body,html').animate({scrollTop: this.aTop[this.$cell.index(this)]});
            });

            var $win = $(window);

            $win.on('scroll', function () {
                var st = $win.scrollTop();
                for (var i = 0; i < this.aTop.length; i++) {
                    this.aTop[i] <= st && this.$cell.removeClass('act').eq(i).addClass('act');
                };
            })

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

            if (typeof option == 'string') data[option]()
            else if(typeof option == 'number') data.play(data.loopNext = option)
        })
    }

    var old = $.fn.jqScrollspy;

    $.fn.jqScrollspy             = Plugin
    $.fn.jqScrollspy.Constructor = Scrollspy;

    $.fn.jqDuang.noConflict = function () {
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