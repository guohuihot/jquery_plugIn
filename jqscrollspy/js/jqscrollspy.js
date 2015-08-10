/**
* author : ahuing
* date   : 2015-8-7
* name   : jqscrollspy v1.0
* modify : 2015-8-10 10:13:06
 */
!function(a){function c(c){return this.each(function(){var d=a(this),e=d.data("jqScrollspy"),f="object"==typeof c&&c;e||(d.data("jqScrollspy",e=new b(this,f)),e.init())})}var d,b=function(c,d){this.o=a.extend({},b.defaults,d),this.$cell=a(c).find("a")};b.defaults={offset:10},b.prototype={init:function(){var b=this,c=a(window),d=c.height(),e=a("html").height(),f=function(){var g,a=c.scrollTop(),f=-1;if(e-d!=a)for(g=0;g<b.aTop.length;g++)b.aTop[g]<=a&&(f=g);b.$cell.removeClass("act").eq(f).addClass("act")};b.aTop=[],b.$cell.each(function(c,d){b.aTop.push(a(d.href.replace(d.baseURI,"")).offset().top-b.o.offset)}).on("click",function(){return a("body,html").animate({scrollTop:b.aTop[b.$cell.index(this)]}),!1}),f(),c.on("scroll",f)}},d=a.fn.jqScrollspy,a.fn.jqScrollspy=c,a.fn.jqScrollspy.Constructor=b,a.fn.jqScrollspy.noConflict=function(){return a.fn.jqScrollspy=d,this},a(window).on("load",function(){a(".jqScrollspy").each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery);