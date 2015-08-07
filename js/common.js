// 加载顶部导航
!$('.nav').length && $.get('../nav.html', function(data) {
	$(data).prependTo('body').find('a').filter('[href*="'+ location.href.split('/').reverse()[1] +'"]').addClass('act');
	window.scrollTo(0,0);
});

// 子导航点击切换
var setPage = function (str) {
	if (!str) return;

	$('.sub-nav').find('a').removeClass('act')
	.filter('[href="' + str + '"]').addClass('act');

	location.hash = str;
	window.scrollTo(0,0);

	$('.active').removeClass('active')
	$(str).addClass('active');
}

setPage(location.hash);

$('.sub-nav').on('click', 'a', function () {
	setPage($(this).attr('href'))
	return false;
})

$(window).load(function () {

    $.fn.serializeObject = function() {
       var o = {};    
       var a = this.serializeArray();    
       $.each(a, function() {    
           if (o[this.name]) {    
               if (!o[this.name].push) {    
                   o[this.name] = [o[this.name]];    
               }    
               o[this.name].push(this.value || '');    
           } else {    
               o[this.name] = this.value || '';    
           }
       });    
       return o;    
    };

	$('body').on('mousewheel', '.wheel', function() {
		return false;
	})
	$('iframe').each(function(i, ele) {
		var h = $(this).height() + 'px';
		$(this).after('<div class="loading loading-'+ i +'" style="height:'+ h +';margin-top:-'+ h +'"></div>');
	});
	$('.config-wrap input[type="submit"]').on('click', function(e, i, ele) {

		var $ele = $(ele);
		if ($ele.hasClass('nosubmit')) {
			var opt = $ele.serializeObject();
			var $jqmodal = $(opt['remote'] && '<iframe>' || ele.target);
			if ($jqmodal.data('jqModal')) {
				$jqmodal.jqModal('hide').data('jqModal','').appendTo('body');
			};

			$.each(opt, function (o, v) {
				if (!v) return;
				if ($.inArray(o, ['fixed','overlay','drag','lock','timeout']) >= 0) opt[o] = v * 1;
				if ($.inArray(o, ['css','headcss','bodycss','footcss']) >= 0) opt[o] = $.parseJSON(v);
			});
			if (opt['remote']) opt['css']['width'] = '590';

			$jqmodal.jqModal(opt);
			return false;
		}
		else {
			var $loading = $('.loading-' + i).show();
			$('iframe').eq(i).load(function() {
				$loading.hide();
			})
			ele.wheel && $('iframe[name = "' + ele.target + '"]').parent()[ele.wheel.value == 1 ? 'addClass' : 'removeClass']('wheel')
		}

	})
	$('.config-wrap form').each(function(a, b) {
		$(this)
		.on('change', 'select', function() {
			$(b).find('input[type="submit"]').trigger('click',[a,b]);
		})
		.find('input[type="submit"]').trigger('click',[a,b]);
	});
})
