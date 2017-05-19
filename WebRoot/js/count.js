/**
 *查询页面count.jsp的JS文件 
 */

var isCaller = "true";//按主叫查询，true为主叫，false为被叫
var startTime = $("#startTime").val();//开始时间
var endTime = $("#endTime").val();//结束时间
//var reportType;//确定是按“Flash通话”/“全部/视频/仅音频”查询
var directionType;//“全部/上行/下行”查询
$(document).ready(function(){
	/*************************************************/
	//刷新页面时设置半小时的单选按钮被选中，并设置默认查询半小时以内的记录
	$("#radioFirst").attr("checked","checked");
	setTime(30);
	
	//单击选择时间的单选按钮事件
	$(":radio[name='timeradio']").click(function(){
		var minute = $(":radio[name='timeradio'][checked]").val();
		setTime(minute);
	});
	
	function setTime(flag){
		$("#startTime").val(time(flag));
		$("#endTime").val(time(0));
	}
	getVersion();
});


/**
 * 验证前台两个日期之间不能超过七天
 * @return {Boolean}
 */
function checkTime(){
	var date1 = $("#startTime").val();
	var date2 = $("#endTime").val();
	var tmp = date1.split(" ")[0].split("-");
	var d1 = new Date(tmp[0],tmp[1]-1,tmp[2]);

	tmp = date2.split(" ")[0].split("-");
	var d2 = new Date(tmp[0],tmp[1]-1,tmp[2]);
//	if((d2.getTime()-d1.getTime())>7*24*60*60*1000){
//		alert("只能查询相隔一周之内的数据哦！");
//		return false;
//	}
	if(d1>d2){
		alert('开始时间不能大于结束时间');
		return false;
	}
	return true;
}

function checkTime1(diffTime){
	var date1 = $("#startTime").val();
	var date2 = $("#endTime").val();
	var tmp = date1.split(" ")[0].split("-");
	var d1 = new Date(tmp[0],tmp[1]-1,tmp[2]);

	tmp = date2.split(" ")[0].split("-");
	var d2 = new Date(tmp[0],tmp[1]-1,tmp[2]);
	if((d2.getTime()-d1.getTime())>diffTime){
		alert("只能导出相隔一天之内的数据哦！");
		return false;
	}
	if(d1>d2){
		alert('开始时间不能大于结束时间');
		return false;
	}
	return true;
}
/**
 * 当点击“查询”按钮时，触发时间框时间
 * 如果有单选按钮被选中，则根据单选按钮自动调整时间，
 * 如果没有单选按钮被选中，则不调整时间，时间按照时间文本域中的时间计算
 */
function resetTime(){
	$(":radio[name='timeradio']").each(function(){
		var id= $(this).attr("id");
		//只要有单选按钮被选中，即按此单选按钮规定的时间设置时间
		if($("#"+id).attr("checked")=="checked"){
			var minute = $("#"+id).val();;
			setTime(minute);
   		}
	});
}

/**
 * 当手动为时间文本域设置时间时，取消所有时间单选按钮的选择状态，使其不被选择
 */
function removeRadio(){
	$(":radio[name='timeradio']").removeAttr("checked");
}

/**
 * “错误数据”按钮
 */
$("#getError").live("click",function(){
	if(checkTime()==true){
		resetTime();
		errorID(1);
	}
});

function errorID(currPage){	
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	$.ajax({
		type : "post",
		url : "errordataaction.errorID.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime +"&currPage=" + currPage,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showDataError(data,errorID);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * “报告情况”按钮，点击一次查询一次
 */

function refreshBt(sids){	
	//截取sid的前五段作为参数
	var sid = sids.substring(0,sids.lastIndexOf('_'));
	$.ajax({
		type : "post",
		url : "allaction.refresh.action",
		dataType : "json",
		data : "sid=" + sid,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			var result = data.result;
			if(result===0){
				$('#refreshInfo').html("【报告已重新生成，请手动刷新页面】");
			}
			if(result===1){
				$('#refreshInfo').html("【不能生成报告(没有对应的报告)】");
			}
			if(result===2){
				$('#refreshInfo').html("【不能生成报告(没有主叫话务数据)】");
			}
			if(result===3){
				$('#refreshInfo').html("【不能生成报告(没有被叫话务数据)】");
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

//1 根据标识查询
$("#aboutIDsubmit").live("click", function() {
	if(checkTime()==true){
		//1、不输入标识，查询全部
		//2、输入标识，按输入条件查，并验证输入条件是否符合格式
		resetTime();
		aboutIDsubmit(1);
		
	}
});

function aboutIDsubmit(currPage) {	
/*	$(":radio[name='directionType']").each(function(){
	//确定是按“全部/上行/仅下行”查询
	if($(this).attr("checked")=="checked"){
		directionType = $(this).val();
		}
});*/
	
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	
	var userId = $("#aboutIDuser").val().trim();//用户Id
	var meetingId = $("#aboutIDmeeting").val().trim();//会议Id
	var relayId   = $("#aboutIDRelay").val().trim();//relayId;
	var companyName = $("#aboutCompanyName").val().trim(); //公司名称
	console.info("companyName:"+companyName);
	$.ajax({
		type : "post",
		url : "search.aboutID.action",
		dataType : "json",
		data : "userId=" + userId + "&meetingId=" + meetingId + "&relayId=" + relayId+"&startTime=" + startTime + "&endTime=" + endTime
		+ "&currPage=" + currPage+"&directionType="+directionType+"&companyName="+companyName,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
//		success : function(data) {
//			showdata(data, "aboutIDsubmit","selectcontent");
//		},
		success : function(data) {
			multshowdata(data, "aboutIDsubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

// 2 根据时间查询
$("#abouttimesubmit").live("click", function() {
	if(checkTime()==true){
		resetTime();
		abouttimesubmit(1);
	}
});

function abouttimesubmit(currPage) {

	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	var timeduraction = $("#aboutTimeduraction").val();//持续时间
	$.ajax({
		type : "post",
		url : "search.aboutTime.action",
		dataType : "json",
		data : "startTime=" + startTime + "&endTime=" + endTime
				+ "&timeduraction=" + timeduraction + "&currPage=" +currPage,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
//		success : function(data) {
//			showdata(data, "abouttimesubmit","selectcontent");
//		},
		success : function(data) {
		multshowdata(data, "abouttimesubmit","selectcontent");
	    },
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});

}



// 5 根据质量查询 
$("#aboutQualitysubmit").live("click", function() {
	//alert('此功能未实现');
	if(checkTime()==true){
		resetTime();
		aboutQualitysubmit(1);
	}
});

//质量
function aboutQualitysubmit(currPage) {
/*	$(":radio[name='directionType']").each(function(){
		//确定是按“全部/上行/下行”查询
		if($(this).attr("checked")=="checked"){
			directionType = $(this).val();
   		}
	});*/
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	var frameRate = $("#aboutFrameRate").val();//帧率
	var delay = $("#aboutDelay").val();//时延
	var cpuRate = $("#aboutCpuRate").val();//cpuRate

	$.ajax({
		type : "post",
		url : "search.aboutQuality.action",
		dataType : "json",
		data : "frameRate=" + frameRate +  "&delay=" + delay + "&cpuRate=" + cpuRate
		+ "&currPage=" + currPage +"&startTime=" + startTime + "&endTime=" + endTime
		+ "&directionType=" +directionType,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutQualitysubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

// 6 根据视频流统计查询
$("#aboutVideoStreamsubmit").live("click", function() {
	if(checkTime()==true){
		resetTime();
		aboutVideoStreamsubmit(1);
	}

});

function aboutVideoStreamsubmit(currPage) {
/*	$(":radio[name='directionType']").each(function(){
		//确定是按“全部/上行/下行”查询
		if($(this).attr("checked")=="checked"){
			directionType = $(this).val();
   		}
	});*/
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	var upVideoLossBefore = $("#aboutStreamUpVideoLostBefore").val();//up视频fec前
	var upVideoLossAfter = $("#aboutStreamUpVideoLostAfter").val();//up视频fec后
	var upVideoLossFinal = $("#aboutStreamUpVideoLostFinal").val();//up视频最终
	var downVideoLossBefore = $("#aboutStreamDownVideoLostBefore").val();//down视频fec前
	var downVideoLossAfter = $("#aboutStreamDownVideoLostAfter").val();//down视频fec后
	var downVideoLossFinal = $("#aboutStreamDownVideoLostFinal").val();//down视频fec后
	var videoLossBefore = $("#aboutStreamVideoLostBefore").val();//整体视频fec前
	var videoLossAfter = $("#aboutStreamVideoLostAfter").val();//整体视频fec后
	var videoLossFinal = $("#aboutStreamVideoLostFinal").val();//整体视频fec后
	
	$.ajax({
		type : "post",
		url : "search.aboutVideoStream.action",
		dataType : "json",
		data : "upVideoLossBefore=" + upVideoLossBefore + "&upVideoLossAfter="
				+ upVideoLossAfter + "&upVideoLossFinal="
				+ upVideoLossFinal + "&downVideoLossBefore=" + downVideoLossBefore
				+ "&downVideoLossAfter=" + downVideoLossAfter + "&downVideoLossFinal=" + downVideoLossFinal 
				+ "&videoLossBefore="+ videoLossBefore+ "&videoLossAfter=" + videoLossAfter + "&videoLossFinal"+ videoLossFinal               
				+"&currPage="+ currPage +"&startTime=" + startTime + "&endTime=" + endTime,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutVideoStreamsubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

//7 根据音频流统计查询
$("#aboutAudioStreamsubmit").live("click", function() {
	if(checkTime()==true){
		resetTime();
		aboutAudioStreamsubmit(1);
	}

});

function aboutAudioStreamsubmit(currPage) {
/*	$(":radio[name='directionType']").each(function(){
		//确定是按“全部/上行/下行”查询
		if($(this).attr("checked")=="checked"){
			directionType = $(this).val();
   		}
	});*/
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	var upAudioLossBefore = $("#aboutStreamUpAudioLostBefore").val();//up视频fec前
	var upAudioLossAfter = $("#aboutStreamUpAudioLostAfter").val();//up视频fec后
	var upAudioLossFinal = $("#aboutStreamUpAudioLostFinal").val();//up视频最终
	var downAudioLossBefore = $("#aboutStreamDownAudioLostBefore").val();//down视频fec前
	var downAudioLossAfter = $("#aboutStreamDownAudioLostAfter").val();//down视频fec后
	var downAudioLossFinal = $("#aboutStreamDownAudioLostFinal").val();//down视频fec后
	var audioLossBefore = $("#aboutStreamAudioLostBefore").val();//整体视频fec前
	var audioLossAfter = $("#aboutStreamAudioLostAfter").val();//整体视频fec后
	var audioLossFinal = $("#aboutStreamAudioLostFinal").val();//整体视频fec后
	
	$.ajax({
		type : "post",
		url : "search.aboutAudioStream.action",
		dataType : "json",
		data : "upAudioLossBefore=" + upAudioLossBefore + "&upAudioLossAfter="
				+ upAudioLossAfter + "&upAudioLossFinal="
				+ upAudioLossFinal + "&downAudioLossBefore=" + downAudioLossBefore
				+ "&downAudioLossAfter=" + downAudioLossAfter + "&downAudioLossFinal=" + downAudioLossFinal 
				+ "&audioLossBefore="+ audioLossBefore+ "&audioLossAfter=" + audioLossAfter + "&audioLossFinal"+ audioLossFinal               
				+"&currPage="+ currPage +"&startTime=" + startTime + "&endTime=" + endTime,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutAudioStreamsubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

		

/**
 * 重置
 */
$(".selectreset").live("click", function() {
	$("#radioFirst").attr("checked","checked");
	setTime(30);//默认查询半小时以内
});



/*高级搜索*/

$("#allSearch").live("click", function() {
			if(checkTime()==true){
				resetTime();
				allSearch(1);
			}
});
		
function allSearch(currPage) {
//	$(":radio[name='directionType']").each(function(){
//		//确定是按“全部/上行/仅下行”查询
//		if($(this).attr("checked")=="checked"){
//			directionType = $(this).val();
//   		}
//	});
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	
	//标识
	var userId = $("#aboutIDuser").val().trim();//用户Id
	var meetingId = $("#aboutIDmeeting").val().trim();//会议Id
	var relayId   = $("#aboutIDRelay").val().trim();//relayId;
	
	//质量
//	var frameRate = $("#aboutFrameRate").val();//帧率
//	var delay = $("#aboutDelay").val();//时延
//	var cpuRate = $("#aboutCpuRate").val();//cpuRate
	
	
	// 视频流统计　
//	var upVideoLossBefore = $("#aboutStreamUpVideoLostBefore").val();//up视频fec前
//	var upVideoLossAfter = $("#aboutStreamUpVideoLostAfter").val();//up视频fec后
//	var upVideoLossFinal = $("#aboutStreamUpVideoLostFinal").val();//up视频最终
//	var downVideoLossBefore = $("#aboutStreamDownVideoLostBefore").val();//down视频fec前
//	var downVideoLossAfter = $("#aboutStreamDownVideoLostAfter").val();//down视频fec后
//	var downVideoLossFinal = $("#aboutStreamDownVideoLostFinal").val();//down视频fec后
//	var videoLossBefore = $("#aboutStreamVideoLostBefore").val();//整体视频fec前
//	var videoLossAfter = $("#aboutStreamVideoLostAfter").val();//整体视频fec后
//	var videoLossFinal = $("#aboutStreamVideoLostFinal").val();//整体视频fec后
	
	//音频流统计
//	var upAudioLossBefore = $("#aboutStreamUpAudioLostBefore").val();//up视频fec前
//	var upAudioLossAfter = $("#aboutStreamUpAudioLostAfter").val();//up视频fec后
//	var upAudioLossFinal = $("#aboutStreamUpAudioLostFinal").val();//up视频最终
//	var downAudioLossBefore = $("#aboutStreamDownAudioLostBefore").val();//down视频fec前
//	var downAudioLossAfter = $("#aboutStreamDownAudioLostAfter").val();//down视频fec后
//	var downAudioLossFinal = $("#aboutStreamDownAudioLostFinal").val();//down视频fec后
//	var audioLossBefore = $("#aboutStreamAudioLostBefore").val();//整体视频fec前
//	var audioLossAfter = $("#aboutStreamAudioLostAfter").val();//整体视频fec后
//	var audioLossFinal = $("#aboutStreamAudioLostFinal").val();//整体视频fec后
	
	//空心包
//	var oneEmpty = $("#aboutOneEmpty").val().trim();//一个空心包出现的次数
//	var twoEmpty = $("#aboutTwoEmpty").val().trim();//连续出现两个空心包的次数
//	var thrEmpty   = $("#aboutThreeEmpty").val().trim();//连续出现三个空心包的次数
//	var fouEmpty   = $("#aboutFourEmpty").val().trim();//连续出现四个至10个空心包的次数
//	var tenEmpty   = $("#aboutTenEmpty").val().trim();//连续出现10个以上的空心包次数
	
	//参会人数
	var attendCount = $("#aboutAttendCount").val().trim();
	
	//持续时间
	var timeduraction = $("#aboutTimeduraction").val();
	
	$.ajax({
				type : "post",
				url : "search.aboutAll.action",
				dataType : "json",
				data : "userId=" + userId +"&meetingId=" + meetingId+"&relayId=" + relayId//标识
				        //+"&frameRate=" + frameRate+"&delay=" + delay +"&cpuRate=" + cpuRate//质量
				        //+"&upVideoLossBefore="+upVideoLossBefore+"&upVideoLossAfter="+upVideoLossAfter+"&upVideoLossFinal="+upVideoLossFinal+"&downVideoLossBefore="+downVideoLossBefore+"&downVideoLossAfter="+downVideoLossAfter+"&downVideoLossFinal="+downVideoLossFinal+"&videoLossBefore="+videoLossBefore+ "&videoLossAfter="+videoLossAfter+"&videoLossFinal"+videoLossFinal//视频流统计
				        //+"&upAudioLossBefore="+upAudioLossBefore+"&upAudioLossAfter="+upAudioLossAfter+"&upAudioLossFinal="+upAudioLossFinal+"&downAudioLossBefore="+downAudioLossBefore+"&downAudioLossAfter="+downAudioLossAfter+"&downAudioLossFinal="+downAudioLossFinal+"&audioLossBefore="+audioLossBefore+"&audioLossAfter="+audioLossAfter+"&audioLossFinal"+audioLossFinal//音频流统计
				        //+"&oneEmpty=" + oneEmpty +"&twoEmpty=" + twoEmpty+"&thrEmpty=" + thrEmpty+"&fouEmpty=" + fouEmpty + "&tenEmpty=" + tenEmpty//空心包
				        +"&attendCount=" + attendCount//参会人数
				        + "&timeduraction=" + timeduraction//持续时间
				        +"&currPage=" + currPage+"&startTime=" + startTime + "&endTime=" + endTime,	
				beforeSend : function() {
					$(".layer").show();
				},
				complete : function() {
					$(".layer").hide();
				},
//				success : function(data) {
//					showdata(data, "allSearch","selectcontent");
//				},
				success : function(data) {
					multshowdata(data, "allSearch","selectcontent");
				},
				error : function(request, textStatus, errorThrown) {
					if (request.status == 900) {
						window.location.href = "login.jsp";
					}
				}
			});
}		

/**
 * 点击快捷按钮时，为时间文本域设置时间
 * @param {} flag
 */
function setTime(flag){
	$("#startTime").val(time(flag));
	$("#endTime").val(time(0));
}

// 根据空心包出现次数查询
$("#aboutEmptyPackagesubmit").live("click", function() {
	if(checkTime()==true){
		//1、不输入标识，查询全部
		//2、输入标识，按输入条件查，并验证输入条件是否符合格式
		resetTime();
		aboutEmptyPackagesubmit(1);
		
	}
});

function aboutEmptyPackagesubmit(currPage) {	
/*	$(":radio[name='directionType']").each(function(){
	//确定是按“全部/上行/仅下行”查询
	if($(this).attr("checked")=="checked"){
		directionType = $(this).val();
		}
});*/
	
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	
	var oneEmpty = $("#aboutOneEmpty").val().trim();//一个空心包出现的次数
	var twoEmpty = $("#aboutTwoEmpty").val().trim();//连续出现两个空心包的次数
	var thrEmpty   = $("#aboutThreeEmpty").val().trim();//连续出现三个空心包的次数
	var fouEmpty   = $("#aboutFourEmpty").val().trim();//连续出现四个至10个空心包的次数
	var tenEmpty   = $("#aboutTenEmpty").val().trim();//连续出现10个以上的空心包次数
	$.ajax({
		type : "post",
		url : "search.aboutEmptyPackage.action",
		dataType : "json",
		data : "oneEmpty=" + oneEmpty + "&twoEmpty=" + twoEmpty + "&thrEmpty=" + thrEmpty + "&fouEmpty=" + fouEmpty + "&tenEmpty=" + tenEmpty + "&startTime=" + startTime + "&endTime=" + endTime
		+ "&currPage=" + currPage+"&directionType="+directionType,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutEmptyPackagesubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

//参会人数
$("#aboutAttendCountsubmit").live("click", function() {
	if(checkTime()==true){
		//1、不输入标识，查询全部
		//2、输入标识，按输入条件查，并验证输入条件是否符合格式
		resetTime();
		aboutAttendCountsubmit(1);
		
	}
});

function aboutAttendCountsubmit(currPage) {		
	startTime = $("#startTime").val();//开始时间
	endTime = $("#endTime").val();//结束时间
	var attendCount = $("#aboutAttendCount").val().trim(); //参会人数
	$.ajax({
		type : "post",
		url : "search.aboutAttendCount.action",
		dataType : "json",
		data : "attendCount=" + attendCount + "&startTime=" + startTime + "&endTime=" + endTime
		+ "&currPage=" + currPage,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
//		success : function(data) {
//			showdata(data, "aboutAttendCountsubmit","selectcontent");
//		},
		success : function(data) {
			multshowdata(data, "aboutAttendCountsubmit","selectcontent");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function makeReport(){
	if(checkTime1(24*60*60*1000)==true){
		startTime = $("#startTime").val();//开始时间
		endTime = $("#endTime").val();//结束时间
		var attendCount = '>,1';
		location.href ="search.aboutMakeReport.action?attendCount="+attendCount+"&startTime="+startTime+"&endTime="+endTime;
	}	
}

function makeDetailData(){
//	if(checkTime1()==true)
	{
		startTime = $("#startTime").val();//开始时间
		endTime = $("#endTime").val();//结束时间
		//var attendCount = '>,1';
		location.href ="search.aboutDetailData.action?startTime="+startTime+"&endTime="+endTime;
	}	
}

function getVersion(){
	$.ajax({
		type : "post",
		url : "search.getVersion.action",
		dataType : "json",
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			var version = data.version;
			console.info("version:"+version);
			$("#version").html("<span style='font-family: cursive;'>Copyright&nbsp;&copy;&nbsp;2015【Butel】&nbsp;Version:"+version+"</span>");
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}



function makeMarketClientData(){
	//if(checkTime1(7*24*60*60*1000)==true)
	{
		startTime = $("#startTime").val();//开始时间
		endTime = $("#endTime").val();//结束时间
		var attendCount = '>,1';
		location.href ="search.aboutMakeMarketClientData.action?attendCount="+attendCount+"&startTime="+startTime+"&endTime="+endTime;
	}	
}
