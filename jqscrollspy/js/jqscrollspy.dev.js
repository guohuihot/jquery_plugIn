/**
* author : ahuing
* date   : 2015-8-7
* name   : jqscrollspy v1.0
* modify : 2015-8-7 15:06:03
 */
!function ($) {
    var Scrollspy = function (self, opt) {
        this.o         = $.extend({}, Duang.defaults, opt)
        this.$self     = $(self)
    }

    Scrollspy.defaults = {
        obj           : 'li'
        , cell        : ''
        , trigger     : 'mouseover' //click mouseover
        , effect      : 'fade' //效果 fold left leftLoop
    }

    Scrollspy.prototype = {
        init : function () {
            var _this = this
            , o       = _this.o
            , $obj    = _this.$obj
            , $objP   = $obj.parent()
            , $objPP  = $objP.parent();

        }
        , start : function () {
            this.t1 = setInterval($.proxy(this.next, this), this.o.interval);
        }
        , play : function (next) {
            var _this  = this
            , o        = _this.o
            , $obj     = _this.$obj
            , $objP    = $obj.parent()
            , loopNext = _this.loopNext;

        }

    }

    function Plugin(option) {
        return option == 'index' ? this.data('jqScrollspy').index : this.each(function () {
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