/*通话详情callDetail.jsp页面中“异常数据”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#exception01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.exception_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.exception_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “异常数据”标签页，主叫端数据
 * @param {} data
 */
function exceptionView_zb(datas){
	var html = "";
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var errordata = caller.errordata;
				if(errordata!=undefined&&errordata!=null&&errordata!==""){
					html += errordata;
				}else{
					html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
				}
			}else{
				html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
			}
		}else{
			html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
		}
	}else{
		html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
	}
	$('#exception_zb').html(html);
}

/**
 * “异常数据”标签页，被叫端数据
 * @param {} data
 */
function exceptionView_bz(datas){
	var html = "";
	var result = datas.result;
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var errordata = called.errordata;
				if(errordata!=undefined&&errordata!=null&&errordata!==""){
					html += errordata;
				}else{
					html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
				}
			}else{
				html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
			}
		}else{
			html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
		}
	}else{
		html += "<font style='font-size:18px;color:red;'>数据正常，没有异常数据。</font>";
	}
	$('#exception_bz').html(html);
}