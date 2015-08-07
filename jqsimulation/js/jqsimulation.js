/**
*author:ahuing
*date:2014-10-29
*jSimulation v1.0
*modify:2014-10-29
 */
(function($) {
		// ����ѡ������
    var selectConfig = {
		event       : 'click'//�¼���Ĭ�ϵ����'mouseover'
		,linkActive : 0 //���������������ӣ�ʱ���Ƿ���ת
		,vertical   : 1 //��������������з���
		,dropWidth  : 0 //������Ŀ�ȣ�0��ʾ��select�����ͬ
		,clickFun   : null //���ʱ�����Ĵ��룬�������������Ч��
	};
	$('<link rel="stylesheet">').appendTo('head').attr('href',(typeof(tplurl)!='undefined'?tplurl:'')+'css/jqsimulation.css');
	$.fn.jqSimulation = function(opt){
		return this.each(function() {
			var that = $(this);
			if(that.is('select')){
				var o = $.extend({},selectConfig, opt || {})
				, $option = that.find('option')
				, $select = $('<div id="j-'+this.name+'" class="j-select"><span class="j-txt"></span><i></i></div>')
				, $selectTxt = $select.find('.j-txt').html(that.find('option:selected').html());

				var sHtml = '<span class="j-droplist">';
				$option.each(function(a, b) {
					sHtml += '<a class="'+(!$(b).prop('selected')||'j-selected')+'" style="float:'+(!o.vertical?'left':'none')+';" href="'+b.value+'">'+b.innerHTML+'</a>';
				});
				sHtml += '</span>';

				var $selectDrop = $(sHtml).width(o.dropWidth||'100%');
				$select.insertAfter(that).css({
					width   : that.outerWidth()
					,zIndex : that.css('z-index')
					,float  : that.css('float')
				}).append($selectDrop)
				[o.event](function() {
					$selectDrop.css('display', 'block');
				}).mouseleave(function() {
					$selectDrop.css('display', 'none');
				}).on('click','a',function() {
					var $this = $(this);
					$selectDrop.css('display', 'none');
					$option.removeAttr('selected').eq($this.index()).prop('selected','selected');
					$this.addClass('j-selected').siblings().removeClass('class j-selected');
					$selectTxt.html($this.html());
					o.clickFun&&o.clickFun.call();
					if(!o.linkActive) return false;
				})
			}else{
				var $label = $('label[for="'+this.id+'"]');

				that.prop('checked')&&$label.addClass('checked');
				$label.addClass('j-'+that[0].type+' j-'+that[0].name)
				.on('click',function() {
					that.triggerHandler('click');
					if (that.is(':checkbox')) {
						$label.toggleClass('checked');
					}else{
						$('input[name="'+that[0].name+'"]').each(function() {
							$('label[for="'+this.id+'"]').removeClass('checked');
						});
						$label.addClass('checked');
					};
				})
			}
			//����ԭ����
			that.css('display', 'none');
		});
	}
})(jQuery);