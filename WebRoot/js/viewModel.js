/**
 * 此JS的作用是将查询出的话务结果进行展示
 * 使用位置：
 * count.jsp
 * flashInfo.jsp
 */



/**
 *显示错误查询结果
 * @param {} data
 * @param {} func
 */
function showDataError(data,func){
	var result = data.result;
	var list = data.items;
	var sid;
	var optime;
	var reason;
	var html = "";
	if (result ==0 &&list!=undefined&&list!=null&&list!="") {
		var length = list.length;
		     html += "<table width='100%' border='0' cellpadding='0' cellspacing='1' class='sortable' id='mytable2'>"+
						 "<tr class='head'>" +
								"<th scope='col' width='40px'>序号</th>" +
								"<th scope='col' width='170px'>时间</th>" +
								"<th scope='col' width='470px'>sid</th>" +
								"<th scope='col'>错误原因</th>" +
								"<th scope='col' width='40px'>操作</th>" +
						  "</tr>";
		$.each(list, function(i, val) {
					sid = val.sid;
					optime = val.optime;
					reason = val.reason;
					
					html += "<tr class='list'>" +
								"<th scope='row'>" + (i+1) +"</th>" +
								"<td title='" + optime + "'>" + optime +"</td>" +
								"<td title='" + sid + "'>" + sid+ "</td>" +
								"<td title='"+reason+"'>" + reason +"</td>" +
								"<td><a onclick=openErrorDataDialog('" + sid+"')><font style='color:#359E33''>详情</font></a></td>" +
							"</tr>";
				});
		html += "</table>";
		var pages = "";
		var pageSize = data.pageSize;
		
		var flag = length < pageSize;
		if(flag) {//此时查出的数据条数>=0，<pageSize
			if (data.currPage != 1) {
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage - 1) + ")>上一页</a>";
				pages += "&nbsp;尾页";
			}
		}else{
			if (data.currPage != 1) {
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage - 1) + ")>上一页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage + 1) + ")>下一页</a>";
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (data.currPage + 1) + ")>下一页</a>";
			}
		}

		html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
				+ data.currPage + "页</div>";
		$("#selectcontent").html(html);

		sortables_init();

	} else {
		if (result == "2") {
			$("#selectcontent").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == "1"){
			$("#selectcontent").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == "10"){
			$("#selectcontent").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}

/**
 * 显示某条日志的详情，打印出其无格式的完整信息
 * @param {} sid
 */
function getData_errordata(sid) {
	$.ajax({
		type : "post",
		url : "errordataaction.errordata.action",// 此处连接action，获取数据
		dataType : "text",
		data : "sid=" + sid ,
		beforeSend : function() {
			//$(".layer").show();
		},
		complete : function() {
			//$(".layer").hide();
		},
		success : function(data) {
			if (data != null) {
				$("#contenterrordata").text(data);
			} 
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}


var end = 0;
/**
 * 显示查询结果 TODO
 * @param {} data 数据
 * @param {} func　函数名
 * @param {} mainid　页面上显示的位置
 */
/*
function showdata(data, func, mainid) {
	//console.info("分页数据:"+data);

	//清空原数据
	$('#'+mainid).html("");
	
	var result = data.result;
	var list = data.items;

	var pageSize = data.pageSize;
	var currPage = data.currPage;
	var count;//符合查询条件的记录数
	var length ;
	var userId;//用户Id
	var userIp;//用户IP
	var meetingId;//会议ID
	var relayId;
	var relayIp;
	var micId;
	var delay;//时延
	var cpuRate;//CPU使用率
	var FrameRate;//帧率
	var lossPackRatioBeforeFEC;//视频丢包率
	var lossPackRatioAfterFEC;//efc后视频丢包率
	var audioLossPackRatioBeforeFEC;//音频丢包率
	var audioLossPackRatioAfterFEC;//efc后音频丢包率
	var oneEmpty;//一个空心包出现的次数
	var twoEmpty;//连续两个空心包出现的次数
	var thrEmpty;//连续三个空心包出现的次数
	var fouEmpty;//连续四个到10个空心包出现的次数
	var tenEmpty;//连续10个以上的空心包出现的次数
	var timeStamp;//记录时间戳
	var lossPackDescription;//视频丢包率的title描述
	var audioLossPackDescription;//音频丢包率的title描述
	var emptyPackDescription;//空心包的title描述
	var directionType;//传输方向
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
				+ "<tr class=\"head\">" +
						"<th scope=\"col\" width='40px'>序号</th>" +
						"<th scope=\"col\" width='70px'>用户Id</th>" +
						"<th scope=\"col\" width='100px'>用户IP</th>" +
						"<th scope=\"col\" width='70px'>传输方向</th>" +
						"<th scope=\"col\" width='70px'>会议号</th>" +
						"<th scope=\"col\" width='40px'>micId</th>" +
						"<th scope=\"col\" width='70px'>RealyId</th>" +
						"<th scope=\"col\" width='100px'>RealyIp</th>" +
						"<th scope=\"col\" width='40px'>CPU</th>" +
						"<th scope=\"col\" width='40px'>帧率</th>" +
						"<th scope=\"col\" width='40px'>时延</th>" +
						"<th scope=\"col\" width='120px'>视频丢包/fec纠错</th>" +
						"<th scope=\"col\" width='120px'>音频丢包/fec纠错</th>" +
						"<th scope=\"col\" width='135px'>空心包(1/2/3/4/10)</th>" +
						"<th scope=\"col\" width='180px'>时间戳</th>" +
						//"<th scope=\"col\" colspan='3'></th>" +
				"</tr>";
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
				    //每次循环都要先置空
					lossPackDescription = "";
					audioLossPackDescription = "";
					emptyPackDescription = "";
					directionTypeDescription = "";
					
					userId = val.userId;//
					userIp = val.userIp;//
					meetingId = val.meetingId;//会议ID
	                relayId = val.relayId;
	                relayIp = val.relayIp;
	                micId = val.micId;
	                delay = val.delay; //时延
					cpuRate = val.cpuRate;//CPU使用率
					FrameRate = val.frameRate;//帧率
					lossPackRatioBeforeFEC = val.lossPackRatioBeforeFECDTO;//视频丢包率
					lossPackRatioAfterFEC = val.lossPackRatioAfterFECDTO;//efc后视频丢包率
					audioLossPackRatioBeforeFEC = val.audioLossPackRatioBeforeFECDTO;//音频丢包率
					audioLossPackRatioAfterFEC = val.audioLossPackRatioAfterFECDTO;//efc后音频丢包率
					oneEmpty = val.oneEmpty;//一个空心包出现的次数
					twoEmpty = val.twoEmpty;//连续两个空心包出现的次数
					thrEmpty = val.thrEmpty;//连续三个空心包出现的次数
					fouEmpty = val.fouEmpty;//连续四个到10个空心包出现的次数
					tenEmpty = val.tenEmpty;//连续10个以上的空心包出现的次数
					timeStamp = val.timeStamps;//记录时间戳
					directionType = val.directionType;//传输方向
					if(userId==undefined||userId==null||userId===""){
						userId = "--";
					}
					if(userIp==undefined||userIp==null||userIp===""){
						userIp = "--";
					}
					if(meetingId==undefined||meetingId==null||meetingId===""){
						meetingId = "--";
					}
					if(relayId==undefined||relayId==null||relayId===""){
						relayId = "--";
					}
					if(relayIp==undefined||relayIp==null||relayIp===""){
						relayIp = "--";
					}
					if(micId==undefined||micId==null||micId===""){
						micId = "--";
					}
					if(delay==undefined||delay==null||delay===""){
						delay = "--";
					}
					if(cpuRate==undefined||cpuRate==null||cpuRate===""){
						cpuRate = "--";
					}
					if(FrameRate==undefined||FrameRate==null||FrameRate===""){
						FrameRate = "--";
					}
					if(lossPackRatioBeforeFEC==undefined||lossPackRatioBeforeFEC==null||lossPackRatioBeforeFEC===""){
						lossPackRatioBeforeFEC = "--";
					}
					if(lossPackRatioAfterFEC==undefined||lossPackRatioAfterFEC==null||lossPackRatioAfterFEC===""){
						lossPackRatioAfterFEC = "--";
					}
					if(lossPackDescription===""){
						lossPackDescription = lossPackRatioBeforeFEC + "/" + lossPackRatioAfterFEC;
					}
					if(audioLossPackRatioBeforeFEC==undefined||audioLossPackRatioBeforeFEC==null||audioLossPackRatioBeforeFEC===""){
						audioLossPackRatioBeforeFEC = "--";
					}
					if(audioLossPackRatioAfterFEC==undefined||audioLossPackRatioAfterFEC==null||audioLossPackRatioAfterFEC===""){
						audioLossPackRatioAfterFEC = "--";
					}
					if(audioLossPackDescription===""){
						audioLossPackDescription = audioLossPackRatioBeforeFEC + "/" + audioLossPackRatioAfterFEC;
					}
					if(oneEmpty==undefined||oneEmpty==null||oneEmpty===""){
						oneEmpty = "--";
					}
					if(twoEmpty==undefined||twoEmpty==null||twoEmpty===""){
						twoEmpty = "--";
					}
					if(thrEmpty==undefined||thrEmpty==null||thrEmpty===""){
						thrEmpty = "--";
					}
					if(fouEmpty==undefined||fouEmpty==null||fouEmpty===""){
						fouEmpty = "--";
					}
					if(tenEmpty==undefined||tenEmpty==null||tenEmpty===""){
						tenEmpty = "--";
					}
					if(emptyPackDescription===""){
						emptyPackDescription = oneEmpty + "/" + twoEmpty + "/" + thrEmpty + "/" + fouEmpty + "/" + tenEmpty;
					}
					if(timeStamp==undefined||timeStamp==null||timeStamp===""){
						timeStamp = "--";
					}
					if(directionType==undefined||directionType==null||directionType===""){
						directionTypeDescription = "--";
					}else{
						directionTypeDescription = showDirectionType(directionType);
						}
					}
					html += "<tr class=\"list\">" +
								"<th scope=\"row\">" + (i+1) +"</th>" +
								//用户Id
								"<td title='"+ userId + "'>" + userId +"</td>" +
								//用户IP
								"<td title='" + userIp + "'>" + userIp + "</td>" +
								//传输方向
								"<td title='" + directionTypeDescription+"'>" + directionTypeDescription+"</td>" +
								//会议号
								"<td title='" + meetingId + "'>" + meetingId + "</td>" +
								//micId
								"<td title='" + micId + "'>" + micId + "</td>" +
								//RelayId
								"<td title='" + relayId + "'>" + relayId + "</td>" +
								//RelayIp
								"<td title='" + relayIp + "'>" + relayIp + "</td>" +
								//CPU使用率
								"<td title='" + cpuRate + "'>" + cpuRate + "</td>" +
								//帧率
								"<td title='" + FrameRate + "'>" + FrameRate + "</td>" +
								//时延
								"<td title='" + delay + "'>" + delay + "</td>" +
								//视频丢包率(fec前/fec后)
								"<td title='"+lossPackDescription+"'>"+ lossPackDescription +"</td>" +
								//音频丢包率(fec前/fec后)
								"<td title='" + audioLossPackDescription + "'>"+audioLossPackDescription+"</td>" +
								//连续(1/2/3/4/10)空心包出现数
								"<td title='" + emptyPackDescription + "'>"+emptyPackDescription+"</td>" +
								//记录时间戳
								"<td title='" + timeStamp + "'>"+timeStamp+"</td>" +					
							"</tr>";
			});
	

		html += "</table>";
		var pages = "";
		
		//用的是真分页，每次查询出多少条就显示多少条，显示的条数与pageSize不一样相等。
		//只要存在的数据够多，一定是length>=pageSize，只有最后一页会出现length<=pageSize的现象
		//所以当length==pageSize时，无法判断是不是到了尾页，但是如果length<pageSize，一定是到了尾页		
		//只要能执行到这里，length肯定大于0
		var flag = length < pageSize;
		
		if(flag) {//此时查出的数据条数>=0，<pageSize
			if (currPage != 1) {//处于最后一页
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage - 1) + ")>上一页</a>";
				pages += "&nbsp;尾页";
			}else{
				pages += "共1页";
			}
		}else{
			if (currPage != 1) {
				if(end==1){
					pages += "<a onclick=" + func + "(1)>首页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage - 1) + ")>上一页</a>";
					pages += "&nbsp;尾页";
					//将标志重置 
					end = 0;
				}else{
					pages += "<a onclick=" + func + "(1)>首页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage - 1) + ")>上一页</a>";
					
					pages += "&nbsp;<a onclick=" + func + "("
							+ (currPage + 1) + ")>下一页</a>";
				}
						
				//pages += "&nbsp;<a onclick=" + func + "(" + flag + ")>尾页</a>";
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage + 1) + ")>下一页</a>";
						
				//pages += "&nbsp;<a onclick=" + func + "(" + flag + ")>尾页</a>";
			}
		}

		html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
				+ currPage + "页";
		
		count = data.count;
		if(count!=undefined&&count!=null&&count!==""){
			html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
		}		
				
		html += "</div>";
		
		$("#"+mainid).html(html);

		sortables_init();

	} else {
		//如果当前页不为1，说明是点击“下一页”查到的数据，此时要自动返回上一页
		//在未查到数据的情况下，如果当前页为1，说明是初始未查询到数据
		if (result == 2) {
			if(currPage>1){
				end = 1;
				eval(func+"("+(currPage - 1)+")");
			}else{
				$("#"+mainid).html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			}
		} else if(result == 1){
			$("#"+mainid).html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#"+mainid).html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}
*/

function showdata(data, func, showType) {
	//console.info("showdatafunc:"+func);
	console.info("BBBBBshowType:"+showType);
	switch(showType)
	{
	case "lossPackage_mic1":
		showdata_lossPackage_mic1(data,func);
		break;
	case "lossPackage_mic2":
		showdata_lossPackage_mic2(data,func);
		break;
	case "dataPackDetail_mic1":
		testshowdata_dataPackDetail_mic1(data,func);
		break;
	case "dataPackDetail_mic2":
		showdata_dataPackDetail_mic2(data,func);
		break;
	case "framePacketInfo":
		showdata_packageDetail_packetInfo(data,func);
		break;
	case "resendReqConmand":
		showdata_packageDetail_resendReqConmand(data,func);
		break;
	case "bandAdp_mic1":
		showdata_BandAdp_mic1(data,func);
		break;
	case "bandAdp_mic2":
		showdata_BandAdp_mic2(data,func);
		break;
//	case "lossPackageMult":
//		showdata_LossPackageMult(data,func);
//		break;
	case "lossPackageMult":
		showdata_LossPackageMultNew(data,func);
		break;
	
	
	case "QosDataPackQuality":
		showdata_QosDataPacketDetail(data,func);
		break;
	}
//	if(showType=="lossPackage_mic1"){
//		showdata_lossPackage_mic1(data,func);
//	}
//	if(showType=="lossPackage_mic2"){
//		showdata_lossPackage_mic2(data,func);
//	}
//	
//	if(showType=="dataPackDetail_mic1"){
//		showdata_dataPackDetail_mic1(data,func);
//	}
//	
//	if(showType=="dataPackDetail_mic2"){
//		showdata_dataPackDetail_mic2(data,func);
//	}
//	
//	//test
//	if(showType=="dataPackDetail_mic1"){
//		testshowdata_dataPackDetail_mic1(data,func);
//	}
//	
//	if(showType=="framePacketInfo"){
//		showdata_packageDetail_packetInfo(data,func);
//	}
//	
//	/*if(showType=="resendReqConmand"){
//		showdata_packageDetail_resendReqConmand(data,func);
//	}*/
//	
//	if(showType == "bandAdp_mic1"){
//		
//	}
//	
//	if(showType == "bandAdp_mic2"){
//		
//	}
}

//1、为正常数据查询界面添加了点击后行变色的功能；
$(document).ready(function(){
	//点击以下三个链接时，行都变色
	//报告
	$("#mytable a.clickBackgroundColor1").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor1").index(this))+1]).style.background="RGB(96,165,252)";
	});
	//日志
	$("#mytable a.clickBackgroundColor2").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor2").index(this))+1]).style.background="RGB(96,165,252)";
	});
	//视图
	$("#mytable a.clickBackgroundColor3").live("click",function(){
	  ($("#mytable tr")[($("#mytable a.clickBackgroundColor3").index(this))+1]).style.background="RGB(96,165,252)";
	});
});
//2、为错误数据查询界面添加了点击后行变色的功能；
$(document).ready(function(){
	//详情
	$("#mytable2 a").live("click",function(){
	  ($("#mytable2 tr")[($("#mytable2 a").index(this))+1]).style.background="RGB(96,165,252)";
	});
});

/**
 * 根据返回码确实是何种类型的通话
 * @param {} directionType
 * @return {}
 */
/*function showDirectionType(directionType){
	var map = new Map();
	map.put("0","up");
	map.put("1","down");
	if(isNaN(directionType)==false){//判断是不是数字
		if(directionType!=undefined&&directionType!=null&&directionType!==""){
			return map.get(directionType);
		}
	}else{
		return "非数值类型，无法处理";
	}
}*/
