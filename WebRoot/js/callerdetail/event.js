/*通话详情callDetail.jsp页面中“通话事件”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#event01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.event_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.event_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “通话事件”标签页，主叫端事件
 * @param {} datas
 */
function eventView_zb(datas){
	var html = "";
	html += "<table class=\"detailTable\">" +
				"<tr align=\"center\">" +
					"<th>事件名称</th>" +
					"<th>事件原因</th>" +
					"<th>时间</th>" +
				"</tr>";
	var result = datas.result;
	
	var eventinfo;//事件信息
	var eventinfoArr;
	var eventtime;//事件时间
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var event = call.event;
					if(event!=undefined&&event!=null&&event!==""){
						$.each(event,function(i,val){
							var map1 = new Map();
							eventinfo = val.eventinfo;
							eventtime = val.eventtime;
							
							eventinfoArr = eventinfo.split(' ');
							$.each(eventinfoArr,function(j,va){
								map1.put(va.split('=')[0],va.split('=')[1]);
							});
							
							var eventName = "<font style=\"color:red;font-weight:bold;\">未提供与此值对应的相关描述</font>";
							var reasonName = "<font style=\"color:red;font-weight:bold;\">未提供与此值对应的相关描述</font>";
							if(disconnectReason(map1.get('event'))!=undefined){
								eventName = disconnectReason(map1.get('event'));
							}
							if(disconnectReason(map1.get('reason'))!=undefined){
								reasonName = disconnectReason(map1.get('reason'));
							}
				      html+="<tr>" +
								"<td>"+eventName+"&nbsp;[&nbsp;"+map1.get('event')+"&nbsp;]</td>" +
								"<td>"+reasonName+"&nbsp;[&nbsp;"+map1.get('reason')+"&nbsp;]</td>" +
								"<td>"+eventtime+"</td>" +
							"</tr>";
						});
					}else{
						html+="<tr><td colspan='3' align='center'>无</td></tr>";
					}
				}else{
					html+="<tr><td colspan='3' align='center'>无</td></tr>";
				}
			}else{
				html+="<tr><td colspan='3' align='center'>无</td></tr>";
			}
		}else{
			html+="<tr><td colspan='3' align='center'>无</td></tr>";
		}
	}else{
		html+="<tr><td colspan='3' align='center'>无</td></tr>";
	}
	html+="</table>";
	
	$('#event_zb').html(html);
}

/**
 * “通话事件”标签页，被叫端事件
 * @param {} datas
 */
function eventView_bz(datas){
	var html = "";
	html+="<table class=\"detailTable\">" +
				"<tr align=\"center\">" +
					"<th>事件名称</th>" +
					"<th>事件原因</th>" +
					"<th>时间</th>" +
				"</tr>";
				
	var result = datas.result;
	
	var eventinfo;//事件信息
	var eventinfoArr;
	var eventtime;//事件时间
				
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var event = call.event;
					if(event!=undefined&&event!=null&&event!==""){
						$.each(event,function(i,val){
							var map1 = new Map();
							eventinfo = val.eventinfo;
							eventtime = val.eventtime;
							
							eventinfoArr = eventinfo.split(' ');
							$.each(eventinfoArr,function(j,va){
								map1.put(va.split('=')[0],va.split('=')[1]);
							});
							
							var eventName = "<font style=\"color:red;font-weight:bold;\">未提供与此值对应的相关描述</font>";
							var reasonName = "<font style=\"color:red;font-weight:bold;\">未提供与此值对应的相关描述</font>";
							if(disconnectReason(map1.get('event'))!=undefined){
								eventName = disconnectReason(map1.get('event'));
							}
							if(disconnectReason(map1.get('reason'))!=undefined){
								reasonName = disconnectReason(map1.get('reason'));
							}
				      html+="<tr>" +
								"<td>"+eventName+"&nbsp;[&nbsp;"+map1.get('event')+"&nbsp;]</td>" +
								"<td>"+reasonName+"&nbsp;[&nbsp;"+map1.get('reason')+"&nbsp;]</td>" +
								"<td>"+eventtime+"</td>" +
							"</tr>";
						});
					}else{
						html+="<tr><td colspan='3' align='center'>无</td></tr>";
					}
				}else{
					html+="<tr><td colspan='3' align='center'>无</td></tr>";
				}
			}else{
				html+="<tr><td colspan='3' align='center'>无</td></tr>";
			}
		}else{
			html+="<tr><td colspan='3' align='center'>无</td></tr>";
		}
	}else{
		html+="<tr><td colspan='3' align='center'>无</td></tr>";
	}
	html+="</table>";
	
	$('#event_bz').html(html);
}