/*通话详情callDetail.jsp页面中“视频参数”标签页面的JS效果 */
//“视频参数”页面数据填充
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#videoParam01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.videoParam_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.videoParam_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “视频参数”标签页，主叫端数据
 * @param {} data
 */
function videoParamView_zb(datas){
	var ldownload_bw;//末次探测下行可用带宽
	var html = "";
	var result = datas.result;
	if(result ===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						var adjust_ability = paramExt.adjust_ability;//呼叫接通前协商输入参数上报
						
						if(adjust_ability!=undefined&&adjust_ability!=null&&adjust_ability!==""){
							var adjust_abilityArr = adjust_ability.split(' ');
							var adjust_abilityMap = new Map();
							if(adjust_abilityArr!=undefined&&adjust_abilityArr!=null&&adjust_abilityArr!==""&&(adjust_abilityArr instanceof Array)){
								$.each(adjust_abilityArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_abilityMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							ldownload_bw = adjust_abilityMap.get('ldownload_bw');//末次探测下行可用带宽
						}
					}
					
					if(ldownload_bw==undefined||ldownload_bw==null||ldownload_bw===""){
						ldownload_bw = "--";
					}
					
					//得到主叫端的信息 
					var paramCaller = call.param;
					if(paramCaller!=undefined&&paramCaller!=null&&paramCaller!==""){
						
						var paramArrCaller = paramCaller.split(' ');
						var map = new Map();
						for(var i=0;i<paramArrCaller.length;i++){
							map.put(paramArrCaller[i].split('=')[0],paramArrCaller[i].split('=')[1]);
						}
						
						//上行历史最大可用带宽
						var maxbw = map.get('maxbw');
						
						//末次探测上行可用带宽
						//当前实际上行可用带宽
						//两个显示用同一字段
						var curbw = map.get('curbw');
						
						
						//空值校验
						if(maxbw==undefined||maxbw==null||maxbw===""){
							maxbw = "无";
						}
						if(curbw==undefined||curbw==null||curbw===""){
							curbw = "无";
						}
						
						
						var map1 = new Map();
						//共21个
						map1.put('p2p','P2P类型(p2p)');
						map1.put('maxbw','上行历史最大可用带宽(maxbw)');
						map1.put('curbw','当前上行可用带宽(curbw)');
						map1.put('vformat','视频分辨率(format)');
						map1.put('targetbps','目标码率(targetbps)');
						map1.put('limbps','限流码率(limbps)');
						map1.put('fps','视频帧率(fps)');
						map1.put('vfec','视频fec开关(vfec) ');
						map1.put('vfecratio','视频fec比率(vfecratio) ');
						map1.put('ifec','I帧fec开关(ifec) ');
						map1.put('vad','静音检测开关(vad)');
						map1.put('2in1','音频包2合1开关(2in1)');
						map1.put('avin1','音视频包混传开关(avin1)');
						map1.put('avin1mainaudio','音视频包混传时主路频开关(avin1mainaudio)');
						map1.put('neteq','neteq开关(neteq)');
						map1.put('echotail','回声消除时延大小(echotail)');
						map1.put('speex','speex编码级别(speex)');
						map1.put('ajitter','音频抖动控制时间(ajitter)');
						map1.put('vjitter','视频抖动控制时间(vjitter)');
						map1.put('rtpjitter','rtp原生抖动控制(rtpjitter)');
						map1.put('acodec','音频编码格式(acodec)');
						
						//为自定义添加的字段赋文明文字
						map1.put('eventtype','事件类型');
						map1.put('time','时间');
						
						html += "<table class='detailTable'>" +
									"<tr>" +
										"<td valign='top'>" +
											"<b>通话视频档位选择</b>"+
											"<div>" +
												"<span>当前实际上行可用带宽 : </span>"+curbw+"<br/>"+
												"<span>上行历史最大可用带宽 : </span>"+maxbw+"<br/>"+
												"<span>末次探测上行可用带宽 : </span>"+curbw+"<br/>"+
												"<span>末次探测下行可用带宽 : </span>"+ldownload_bw+"k<br/>"+
											"</div>"+
										"</td>" +
										"<td style='width:420px;vertical-align:top;'>"+
										 	"<b>通话详细参数</b><br/>";
											map.each(function(key,value,i){
												html += "<div style='margin-left:10px;float:left;width:270px;margin-bottom:-17px;'>"+(i+1)+"&nbsp;&nbsp;"+map1.get(key)+"</div><div style='margin-bottom:-17px;'>="+value+"</div><br/>";
											});
								html += "</td>" +
									"</tr>" +
									/*
									"<tr>" +
										"<td valign='top'>" +
										    "<b>档位数据参考</b>"+
											"<table style='width:600px;' class='detailTable'>" +
												"<tr>" +
													"<td colspan='5'><font style='color:#0000FF;font-size:18px;'>有线/WiFi</font></td>"+
												"</tr>"+
												"<tr>" +
													"<th>带宽(kb)</th>"+
													"<th>视频格式</th>"+
													"<th>视频带宽(kb)</th>"+
													"<th>帧数</th>"+
													"<th>FEC比例</th>"+
												"</tr>"+
												"<tr>" +
													"<td>[250, 400)</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[400, 410]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(410,430]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>4:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(430,450)</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>3:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[450, 470]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(470,500)</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>4:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[500, 580]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:3</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(580,600)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[600, 630]</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>4:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(630,660)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>3:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[660,700)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[700,740)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>4:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[740,xxxx)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:3</td>"+
												"</tr>"+
												"<tr>" +
													"<td colspan='5'><font style='color:#0000FF;font-size:18px;'>3G</font></td>"+														
												"</tr>"+
												"<tr>" +
													"<th>带宽(kb)</th>"+
													"<th>视频格式</th>"+
													"<th>视频带宽(kb)</th>"+
													"<th>帧数</th>"+
													"<th>FEC比例</th>"+
												"</tr>"+
												"<tr>" +
													"<td>[200, 280]</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(280,xxxx)</td>"+
													"<td>QVGA</td>"+
													"<td>150</td>"+
													"<td>10</td>"+
													"<td>5:1</td>"+
												"</tr>"+
											"</table>"+
										"</td>" +
									"</tr>" +*/
								"</table>";
						$('#videoParam_zb').html(html);
					}
				}
			}
		}
	}
}

/**
 * “视频参数”标签页，被叫端数据
 * @param {} data
 */
function videoParamView_bz(datas){
	var ldownload_bw;//末次探测下行可用带宽
	var html = "";
	var result = datas.result;
	if(result ===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					var paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						var adjust_ability = paramExt.adjust_ability;//呼叫接通前协商输入参数上报
						
						if(adjust_ability!=undefined&&adjust_ability!=null&&adjust_ability!==""){
							var adjust_abilityArr = adjust_ability.split(' ');
							var adjust_abilityMap = new Map();
							if(adjust_abilityArr!=undefined&&adjust_abilityArr!=null&&adjust_abilityArr!==""&&(adjust_abilityArr instanceof Array)){
								$.each(adjust_abilityArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_abilityMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							ldownload_bw = adjust_abilityMap.get('ldownload_bw');//末次探测下行可用带宽
						}
					}
					
					if(ldownload_bw==undefined||ldownload_bw==null||ldownload_bw===""){
						ldownload_bw = "--";
					}
					
					//得到被叫端的信息 
					var paramCalled = call.param;
					if(paramCalled!=undefined&&paramCalled!=null&&paramCalled!==""){
					
						var paramArrCalled = paramCalled.split(' ');
						var map = new Map();
						for(var i=0;i<paramArrCalled.length;i++){
							map.put(paramArrCalled[i].split('=')[0],paramArrCalled[i].split('=')[1]);
						}
						
						//上行历史最大可用带宽
						var maxbw = map.get('maxbw');
						
						//末次探测上行可用带宽
						//当前实际上行可用带宽
						//两个显示用同一字段
						var curbw = map.get('curbw');
						
						//空值校验
						if(maxbw==undefined||maxbw==null||maxbw===""){
							maxbw = "无";
						}
						if(curbw==undefined||curbw==null||curbw===""){
							curbw = "无";
						}
						
						var map1 = new Map();
						//共21个
						map1.put('p2p','P2P类型(p2p)');
						map1.put('maxbw','上行历史最大可用带宽(maxbw)');
						map1.put('curbw','当前上行可用带宽(curbw)');
						map1.put('vformat','视频分辨率(format)');
						map1.put('targetbps','目标码率(targetbps)');
						map1.put('limbps','限流码率(limbps)');
						map1.put('fps','视频帧率(fps)');
						map1.put('vfec','视频fec开关(vfec) ');
						map1.put('vfecratio','视频fec比率(vfecratio) ');
						map1.put('ifec','I帧fec开关(ifec) ');
						map1.put('vad','静音检测开关(vad)');
						map1.put('2in1','音频包2合1开关(2in1)');
						map1.put('avin1','音视频包混传开关(avin1)');
						map1.put('avin1mainaudio','音视频包混传时主路频开关(avin1mainaudio)');
						map1.put('neteq','neteq开关(neteq)');
						map1.put('echotail','回声消除时延大小(echotail)');
						map1.put('speex','speex编码级别(speex)');
						map1.put('ajitter','音频抖动控制时间(ajitter)');
						map1.put('vjitter','视频抖动控制时间(vjitter)');
						map1.put('rtpjitter','rtp原生抖动控制(rtpjitter)');
						map1.put('acodec','音频编码格式(acodec)');
							
						//为自定义添加的字段赋文明文字
						map1.put('eventtype','事件类型');
						map1.put('time','时间');
						
						html += "<table class='detailTable'>" +
									"<tr>" +
										"<td valign='top'>" +
											"<b>通话视频档位选择</b>"+
											"<div>" +
												"<span>当前实际上行可用带宽 : </span>"+curbw+"<br/>"+
												"<span>上行历史最大可用带宽 : </span>"+maxbw+"<br/>"+
												"<span>末次探测上行可用带宽 : </span>"+curbw+"<br/>"+
												"<span>末次探测下行可用带宽 : </span>"+ldownload_bw+"k<br/>"+
											"</div>"+
										"</td>" +
										"<td style='width:420px;vertical-align:top;'>"+
										 	"<b>通话详细参数</b><br/>";
											map.each(function(key,value,i){
												html += "<div style='margin-left:10px;float:left;width:270px;margin-bottom:-17px;'>"+(i+1)+"&nbsp;&nbsp;"+map1.get(key)+"</div><div style='margin-bottom:-17px;'>="+value+"</div><br/>";
											});
								html += "</td>" +
									"</tr>" +
									/*
									"<tr>" +
										"<td valign='top'>" +
										    "<b>档位数据参考</b>"+
											"<table style='width:600px;' class='detailTable'>" +
												"<tr>" +
													"<td colspan='5'><font style='color:#0000FF;font-size:18px;'>有线/WiFi</font></td>"+
												"</tr>"+	
												"<tr>" +
													"<th>带宽(kb)</th>"+
													"<th>视频格式</th>"+
													"<th>视频带宽(kb)</th>"+
													"<th>帧数</th>"+
													"<th>FEC比例</th>"+
												"</tr>"+
												"<tr>" +
													"<td>[250, 400)</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[400, 410]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(410,430]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>4:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(430,450)</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>3:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[450, 470]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(470,500)</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>4:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[500, 580]</td>"+
													"<td>QVGA</td>"+
													"<td>250</td>"+
													"<td>15</td>"+
													"<td>5:3</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(580,600)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[600, 630]</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>4:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(630,660)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>3:1</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[660,700)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[700,740)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>4:2</td>"+
												"</tr>"+
												"<tr>" +
													"<td>[740,xxxx)</td>"+
													"<td>VGA</td>"+
													"<td>400</td>"+
													"<td>15</td>"+
													"<td>5:3</td>"+
												"</tr>"+
												"<tr>" +
													"<td colspan='5'><font style='color:#0000FF;font-size:18px;'>3G</font></td>"+
												"</tr>"+
												"<tr>" +
													"<th>带宽(kb)</th>"+
													"<th>视频格式</th>"+
													"<th>视频带宽(kb)</th>"+
													"<th>帧数</th>"+
													"<th>FEC比例</th>"+
												"</tr>"+
												"<tr>" +
													"<td>[200, 280]</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
													"<td>NULL</td>"+
												"</tr>"+
												"<tr>" +
													"<td>(280,xxxx)</td>"+
													"<td>QVGA</td>"+
													"<td>150</td>"+
													"<td>10</td>"+
													"<td>5:1</td>"+
												"</tr>"+
											"</table>"+
										"</td>" +
									"</tr>" +*/
								"</table>";
						$('#videoParam_bz').html(html);
					}
				}
			}
		}
	}
}