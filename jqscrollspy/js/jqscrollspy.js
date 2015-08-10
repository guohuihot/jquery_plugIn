/**
* author : ahuing
* date   : 2015-8-7
* name   : jqscrollspy v1.0
* modify : 2015-8-10 14:43:10
 */
!function(a){function c(c){return this.each(function(){var d=a(this),e=d.data("jqScrollspy"),f="object"==typeof c&&c;e||(d.data("jqScrollspy",e=new b(this,f)),e.init())})}var d,b=function(c,d){this.o=a.extend({},b.defaults,d),this.$cell=a(c).find(this.o.obj)};b.defaults={offset:10,obj:"a"},b.prototype={init:function(){var b=this,c=a(window),d=c.height(),e=a("html").height(),f=function(){var f,g,a=c.scrollTop()+b.o.offset;if(e-d>a)for(g=0;g<b.aTop.length;g++)a>=b.aTop[g]&&b.aTop[g]>0&&(f=g);else f=-1;b.$cell.removeClass("act").eq(f).addClass("act")};b.aTop=[],b.$cell.each(function(c,d){b.aTop.push(a(a(d).attr("href")).offset().top)}).on("click",function(){return a("body,html").animate({scrollTop:b.aTop[b.$cell.index(this)]-b.o.offset}),!1}),b.aTop.length<2||(f(),c.on("scroll",f))}},d=a.fn.jqScrollspy,a.fn.jqScrollspy=c,a.fn.jqScrollspy.Constructor=b,a.fn.jqScrollspy.noConflict=function(){return a.fn.jqScrollspy=d,this},a(window).on("load",function(){a(".jqScrollspy").each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery);