/*通话详情callDetail.jsp页面中“Flash事件信息”标签页面的JS效果 */
//“视频参数”页面数据填充
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#flashEventInfo01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.flashEventInfo_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.flashEventInfo_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * 提取出mac、guid、通话开始时间startTime、通话时长durationMills
 * @param {} datas
 */
function gainMac_Guid(datas){
	var result = datas.result;
	var mac ;
	var guid ;
	var startTime ;//通话开始时间，用来反查时确定时间范围用，以免查询整个数据库
	var durationMills;//通话时长，毫秒
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				mac = "";
				guid = "";
				startTime = "";//通话时间，用来反查时确定时间范围用，以免查询整个数据库
				durationMills = "";//通话时长，毫秒
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							startTime = summary.starttime;
							durationMills = summary.durationMills;
						}
					}
					
					var flashmarkToCallInfo = call.flashmarkToCallInfo;
					if(flashmarkToCallInfo!=undefined&&flashmarkToCallInfo!=null&&flashmarkToCallInfo!==""){
						var flashmarkToCallInfo_arr = new Array();
						var flashmarkToCallInfo_map = new Map();
						flashmarkToCallInfo_arr = flashmarkToCallInfo.split(" ");
						if(flashmarkToCallInfo_arr!=undefined&&flashmarkToCallInfo_arr!=null&&flashmarkToCallInfo_arr!==""){
							$.each(flashmarkToCallInfo_arr,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var varArr = new Array();
									valArr = val.split("=");
									flashmarkToCallInfo_map.put(valArr[0],valArr[1]);
								}
							});
						}
						
						if(flashmarkToCallInfo_map!=undefined&&flashmarkToCallInfo_map!=null&&flashmarkToCallInfo_map!==""){
							mac = flashmarkToCallInfo_map.get("mac");
							guid = flashmarkToCallInfo_map.get("guid");
						}
					}
				}
				if(startTime==undefined||startTime==null||startTime===""){startTime="--";}
				if(durationMills==undefined||durationMills==null||durationMills===""){durationMills="--";}
				if(mac==undefined||mac==null||mac===""){mac="--";}
				if(guid==undefined||guid==null||guid===""){guid="--";}
				
				if(mac!="--"&&guid!="--"&&startTime!="--"&&durationMills!="--"){
					//startTime的格式为2015-05-13-17:13:50:430
					macGuidEventInfo(mac,guid,startTime,durationMills,"flashEventInfo_zb");//调用接口，获取由mac和guid绑定的环境与事件信息
				}
			}
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				mac = "";
				guid = "";
				startTime = "";//通话时间，用来反查时确定时间范围用，以免查询整个数据库
				durationMills = "";//通话时长，毫秒
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					var total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						var summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							startTime = summary.starttime;
							durationMills = summary.durationMills;
						}
					}
					
					var flashmarkToCallInfo = call.flashmarkToCallInfo;
					if(flashmarkToCallInfo!=undefined&&flashmarkToCallInfo!=null&&flashmarkToCallInfo!==""){
						var flashmarkToCallInfo_arr = new Array();
						var flashmarkToCallInfo_map = new Map();
						flashmarkToCallInfo_arr = flashmarkToCallInfo.split(" ");
						if(flashmarkToCallInfo_arr!=undefined&&flashmarkToCallInfo_arr!=null&&flashmarkToCallInfo_arr!==""){
							$.each(flashmarkToCallInfo_arr,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var varArr = new Array();
									valArr = val.split("=");
									flashmarkToCallInfo_map.put(valArr[0],valArr[1]);
								}
							});
						}
						
						if(flashmarkToCallInfo_map!=undefined&&flashmarkToCallInfo_map!=null&&flashmarkToCallInfo_map!==""){
							mac = flashmarkToCallInfo_map.get("mac");
							guid = flashmarkToCallInfo_map.get("guid");
						}
					}
				}
				if(startTime==undefined||startTime==null||startTime===""){startTime="--";}
				if(durationMills==undefined||durationMills==null||durationMills===""){durationMills="--";}
				if(mac==undefined||mac==null||mac===""){mac="--";}
				if(guid==undefined||guid==null||guid===""){guid="--";}
				
				if(mac!="--"&&guid!="--"&&startTime!="--"&&durationMills!="--"){
					//startTime的格式为2015-05-13-17:13:50:430
					macGuidEventInfo(mac,guid,startTime,durationMills,"flashEventInfo_bz");//调用接口，获取由mac和guid绑定的环境与事件信息
				}
			}
		}
	}
}
