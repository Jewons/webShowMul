/* 会议详情callDetail.jsp页面中“丢包率信息”标签页面的JS效果 */

// 最外层四个子标签点击效果

/**
 * 全局变量
 */
var glist1; //存放上行数据
var glist2; //存放下行数据
var gpagesize = 100;//一页显示多少行
var gIp = "";//记录上次不同的IP
var gIpdescription = "";//记录上次不同的IP描述


$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#lossPackageContent > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.lossPackage_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.lossPackage_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// MIC1
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#lossPackage0101 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.lossPackage0101_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.lossPackage0101_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// MIC2
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#lossPackage0202 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.lossPackage0202_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.lossPackage0202_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

function MakeQosreport(meetingId,micId){
	location.href ="search.aboutMakeQosReport.action?meetingId="+meetingId+"&micId="+micId;
}


function aboutIDsubmit(userId,showType,micId,meetingId,currPage){
	//console.info("userId:"+userId+"meetingId:"+meetingId+"micId:"+micId+"showType:"+showType);
	//userId = '1';
	var pageSize = 25;
	$.ajax({
    		type : "post",
    		url : "search.aboutLossPacketInfo1.action",
    		dataType : "json",
    		data : "userId=" + userId + "&meetingId=" + meetingId  + "&micId=" + micId + "&pageSize=" + pageSize
    		+"&currPage="+currPage,
    		beforeSend : function() {
    			$(".layer").show();
    			if(micId == '1'){
    				var pic = "<img src='images/losspackload.gif' align='middle' />";
    				$("#lossPackage0101Up_02").html(pic);
    				$("#lossPackage0101Down_02").html(pic);
    			}
    			if(micId == '2'){
    				var pic = "<img src='images/losspackload.gif'  align='middle' />";
    				$("#lossPackage0202Up_02").html(pic);
    				$("#lossPackage0202Down_02").html(pic);
    			}
    		},
    		complete : function() {
    			$(".layer").hide();
    		},
    		success : function(data) {
    			showdata(data, "aboutIDsubmit",showType);
    		},
    		error : function(request, textStatus, errorThrown) {
    			if (request.status == 900) {
    				window.location.href = "login.jsp";
    			}
    		}
    	});
 }
/** *******************以上属于点击效果************************ */
/** *******************以下属于页面数据展示************************ */

/**
 根据用户数动态产生mic1标签
 * @param {} userIdList 用户列表
 * @param {} meetingId  会议号
 * @return {}
 */
function userIdTabView_lossPackageMic01(userIdList,meetingId){
	var html = "";
	html += "<div>" +
			"<ul class='lossPackage_tabs'>" ;
	var userIdListArr = userIdList.split(",");
	$.each(userIdListArr,function(i,val){
		html += "<li><a onclick=aboutIDsubmit('"+val+"','lossPackage_mic1','1','"+meetingId+"','1')>"+val+"</a></li>";
	});
	html += "</ul>" +
	"</div>";
	$("#lossPackage01_audio_tab").html(html);
}

/**
根据用户数动态产生mic2标签
* @param {} userIdList 用户列表
* @param {} meetingId  会议号
* @return {}
*/
function userIdTabView_lossPackageMic02(userIdList,meetingId){
	var html = "";
	html += "<div>" +
			"<ul class='lossPackage_tabs'>" ;
	var userIdListArr = userIdList.split(",");
	$.each(userIdListArr,function(i,val){
		html += "<li><a onclick=aboutIDsubmit('"+val+"','lossPackage_mic2','2','"+meetingId+"','1')>"+val+"</a></li>";
	});
	html += "</ul>" +
	"</div>";
	$("#lossPackage02_audio_tab").html(html);
}


function showdata_lossPackage_mic1(data,func){
	var html = "";
	//$("#lossPackage0101Up_01").html(html);
	$("#lossPackage0101Up_02").html(html);
	//$("#lossPackage0101Down_01").html(html);
	$("#lossPackage0101Down_02").html(html);
	var result = data.result;
	var list = data.items;
	var upList = new Array();
	var downList = new Array();
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		console.info(list.length);
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
					if(val.directionType == 0){
						upList[upList.length] = val;
					}else if(val.directionType == 1){
						downList[downList.length] = val;
					}
			}	
		});	
		if(upList!=undefined&&upList!=null&&upList!==""&&upList.length!=0){
			glist1 = upList;
			testshowdata_lossPackage_mic_dirction(upList,1,0,1,gpagesize);
			//showdata_lossPackage_mic_dirction(upList,1,0);
		}else{
			$("#lossPackage0101Up_02").html("无上行数据<br/><br/><br/><br/><br/><br/>");
		}
		
		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
			glist2 = downList;
			testshowdata_lossPackage_mic_dirction(downList,1,1,1,gpagesize);
			//showdata_lossPackage_mic_dirction(downList,1,1);
			
		}
		else{
			$("#lossPackage0101Down_02").html("无下行数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#lossPackage0101Up_02").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackage0101Down_02").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("lossPackage0101Up_02").html("<center>只能查询相隔一周之内的数据</center>");
			$("lossPackage0101Down_02").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#lossPackage0101Up_02").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackage0101Down_02").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}
function showdata_lossPackage_mic2(data,func){
	var html = "";
	//$("#lossPackage0101Up_01").html(html);
	$("#lossPackage0202Up_02").html(html);
	//$("#lossPackage0101Down_01").html(html);
	$("#lossPackage0202Down_02").html(html);
	var result = data.result;
	var list = data.items;
	var upList = new Array();
	var downList = new Array();
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		console.info(list.length);
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
					if(val.directionType == 0){
						upList[upList.length] = val;
					}else if(val.directionType == 1){
						downList[downList.length] = val;
					}
			}	
		});	
		if(upList!=undefined&&upList!=null&&upList!==""&&upList.length!=0){
			glist1 = upList;
			testshowdata_lossPackage_mic_dirction(upList,2,0,1,gpagesize);
			//showdata_lossPackage_mic_dirction(upList,2,0);
		}else{
			$("#lossPackage0202Up_02").html("无上行数据<br/><br/><br/><br/><br/><br/>");
		}
		
		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
			glist2 = downList;
			testshowdata_lossPackage_mic_dirction(downList,2,1,1,gpagesize);
			//showdata_lossPackage_mic_dirction(downList,2,1);
		}
		else{
			$("#lossPackage0202Down_02").html("无下行数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#lossPackage0202Up_02").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackage0202Down_02").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("lossPackage0202Up_02").html("<center>只能查询相隔一周之内的数据</center>");
			$("lossPackage0202Down_02").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#lossPackage0202Up_02").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackage0202Down_02").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}


/**
 * 不分页
 * 根据userId micId 传输方向展示该user在会议中的详细信息
 * @param list server返回的每一条item数据形成数组
 * @param micId 
 * @param directionType 传输方向
 */
//function showdata_lossPackage_mic_dirction(list, micId, directionType)
//{
//	//console.info("list.length:"+list.length+"micId:"+micId+"directionType:"+directionType);
//	var html ="<div class='callerdetail_title'>用户ID："+list[0].userId+"&nbsp;&nbsp;&nbsp;&nbsp;用户IP地址："+list[0].userIp+"</div>";
//	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
//		        + "<tr class=\"head\">" +
//				"<th scope=\"col\" width='40px'>序号</th>" +
//				"<th scope=\"col\" width='120px'>时间</th>" +
//				"<th scope=\"col\" width='60px'>网络类型</th>" +
//				//"<th scope=\"col\" width='100px'>用户IP</th>" +
//				//"<th scope=\"col\" width='70px'>RealyId</th>" +
//				"<th scope=\"col\" width='100px'>RealyIp</th>" +
//				"<th scope=\"col\" width='80px'>视频丢包率(原/FEC/终)</th>" +
//				"<th scope=\"col\" width='65px'>视频FEC比例(期望/实际)</th>" +
//				"<th scope=\"col\" width='80px'>音频丢包率(原/FEC/终)</th>" +
//				"<th scope=\"col\" width='65px'>音频FEC比例(期望/实际)</th>" +
//				"<th scope=\"col\" width='70px'>视频整体丢包率(原/FEC/终)</th>" +
//				"<th scope=\"col\" width='70px'>音频整体丢包率(原/FEC/终)</th>" +
//				"<th scope=\"col\" width='60px'>视频码率(期望/实际)</th>" +
//				"<th scope=\"col\" width='55px'>音频码率(期望/实际)</th>" +
//				"<th scope=\"col\" width='80px'>空音包信息(比例/1/2/3/4/10)</th>" +
//				"<th scope=\"col\" width='80px'>带宽(客观/探测/使用)</th>" +
//				"<th scope=\"col\" width='75px'>使用信息(cpu/内存/帧率/延迟)</th>" +		
//		"</tr>";
//	var userId;
//	var userIp;//用户IP
//	var relayId;
//	var relayIp;
//	var delayTime;//时延
//	var cpuRate;//CPU使用率
//	var FrameRate;//帧率
//	var memRate;//内存使用率
//	var videolossRateOriginal;//视频丢包率(万分之几)Fec前
//	var videolossRateFEC;//视频丢包率Fec后
//	var videolossRateFinal;//视频最终丢包率
//	var audiolossRateOriginal;//音频丢包率Fec前
//	var audiolossRateFEC;//音频丢包率Fec后
//	var audiolossRateFinal;//音频最终丢包率
//	var videolossRateOriginalCC;//整体视频丢包率(万分之几)Fec前
//	var videolossRateFECCC;//整体视频丢包率Fec后
//	var videolossRateFinalCC;//整体视频最终丢包率
//	var audiolossRateOriginalCC;//整体音频丢包率Fec前
//	var audiolossRateFECCC;//整体音频丢包率Fec后
//	var audiolossRateFinalCC;//整体音频最终丢包率
//	var audioCoderateExp;//期望视频码率
//	var audioCoderateUse;//实际音频码率
//	var videoCoderateExp;//期望视频码率
//	var videoCoderateUse;//实际视频码率
//	var emptyPacketRate;//空音包比率(万分之几)
//	var oneEmpty;//一个空心包出现的次数
//	var twoEmpty;//连续两个空心包出现的次数
//	var thrEmpty;//连续三个空心包出现的次数
//	var fouEmpty;//连续四个到10个空心包出现的次数
//	var tenEmpty;//连续10个以上的空心包出现的次数
//	var timeStamp;//记录时间戳
//	var fecrateExpVideo;//期望视频FEC比例
//	var fecrateUseVideo;//实际视频FEC比例
//	var fecrateExpAudio;//期望音频FEC比例
//	var fecrateUseAudio;//实际音频FEC比例
//	var bandwidth;//客观带宽
//	var traffic;//流量
//	var detectBandwith;//探测带宽
//	var networkType;//网络类型
//	var videoDescription;
//	var videoFecrateDescription;
//	var audioDescription;
//	var audioFecrateDescription;
//	var finalVideoDescription;
//	var finalAudioDescription;
//	var emptyPacketInfoDescription;
//	var bandwidthInfoDescription;
//	var useInfoDescription;
//	var videoCodeDescription;
//	var audioCodeDescripton;
//	$.each(list,function(i,val){
//		//遍历清空
//		videoDescription = "";
//		videoFecrateDescription = "";
//		audioDescription = "";
//		audioFecrateDescription = "";
//		finalVideoDescription = "";
//		finalAudioDescription = "";
//		emptyPacketInfoDescription = "";
//		bandwidthInfoDescription = "";
//		useInfoDescription = "";
//		videoCodeDescription = "";
//		audioCodeDescription = "";
//		
//		userId = val.userId;//
//		userIp = val.userIp;//
//        relayId = val.relayId;
//        relayIp = val.relayIp;
//        delayTime =val.delayTime;
//        cpuRate = val.cpuRate;//CPU使用率
//        FrameRate = val.frameRate;//帧率
//        memRate = val.memRate;//内存使用率
//        audioCoderateExp = val.audioCoderateExp;//期望视频码率
//        audioCoderateUse = val.audioCoderateUse;//实际音频码率
//        videoCoderateExp = val.videoCoderateExp;//期望视频码率
//        videoCoderateUse = val.videoCoderateUse;//实际视频码率
//        emptyPacketRate = val.emptyPacketRates;//空音包比率(万分之几)
//    	oneEmpty = val.oneEmpty;//一个空心包出现的次数
//    	twoEmpty = val.twoEmpty;//连续两个空心包出现的次数
//    	thrEmpty = val.thrEmpty;//连续三个空心包出现的次数
//    	fouEmpty = val.fouEmpty;//连续四个到10个空心包出现的次数
//    	tenEmpty = val.tenEmpty;//连续10个以上的空心包出现的次数
//    	fecrateExpVideo = val.fecrateExpVideo;//期望视频FEC比例
//    	fecrateUseVideo = val.fecrateUseVideo;//实际视频FEC比例
//    	fecrateExpAudio = val.fecrateExpAudio;//期望音频FEC比例
//    	fecrateUseAudio = val.fecrateUseAudio;//实际音频FEC比例
//    	bandwidth = val.bandwidth;//客观带宽
//    	detectBandwith = val.detectBandwith;//探测带宽
//    	traffic = val.traffic;//流量
//		timeStamp = val.timeStamps;//记录时间戳
//		videolossRateOriginal = val.videolossRateOriginals;//视频丢包率(万分之几)Fec前
//		videolossRateFEC = val.videolossRateFECs;//视频丢包率Fec后
//		videolossRateFinal = val.videolossRateFinals;//视频最终丢包率
//		audiolossRateOriginal = val.audiolossRateOriginals;//音频丢包率Fec前
//		audiolossRateFEC = val.audiolossRateFECs;//音频丢包率Fec后
//		audiolossRateFinal = val.audiolossRateFinals;//音频最终丢包率
//		if(directionType == 1){
//			videolossRateOriginalCC = val.videolossRateOriginalCCs;//整体视频丢包率(万分之几)Fec前
//			videolossRateFECCC = val.videolossRateFECCCs;//整体视频丢包率Fec后
//			videolossRateFinalCC = val.videolossRateFinalCCs;//整体视频最终丢包率
//			audiolossRateOriginalCC = val.audiolossRateOriginalCCs;//整体音频丢包率Fec前
//			audiolossRateFECCC = val.audiolossRateFECCCs;//整体音频丢包率Fec后
//			audiolossRateFinalCC = val.audiolossRateFinalCCs;//整体音频最终丢包率
//		}
//		
//		if(userId==undefined||userId==null||userId===""){
//			userId = "--";
//		}
//		if(userIp==undefined||userIp==null||userIp===""){
//			userIp = "--";
//		}
//		if(relayId==undefined||relayId==null||relayId===""){
//			relayId = "--";
//		}
//		if(relayIp==undefined||relayIp==null||relayIp===""){
//			relayIp = "--";
//		}else{
//			relayIp = getRelayInfo(relayIp);
//		}
//		if(timeStamp==undefined||timeStamp==null||timeStamp===""){
//			timeStamp = "--";
//		}
//		if(networkType==undefined||networkType==null||networkType===""){
//			networkType = "--";
//		}else{
//			networkType = getNetTypeInfo(networkType);
//		}
//		
//		//使用信息(cpu/内存/帧率/延迟)
//		if(delayTime==undefined||delayTime==null||delayTime===""){
//			delayTime = "--";
//		}
//		if(cpuRate==undefined||cpuRate==null||cpuRate===""){
//			cpuRate = "--";
//		}
//		if(FrameRate==undefined||FrameRate==null||FrameRate===""){
//			FrameRate = "--";
//		}
//		if(memRate==undefined||memRate==null||memRate===""){
//			memRate = "--";
//		}		
//		if(useInfoDescription===""){
//			useInfoDescription = cpuRate + "/" + memRate + "/" + FrameRate + "/" + delayTime;
//		}
//		
//		
//		//音频FEC码率(期望/使用)
//		if(audioCoderateExp==undefined||audioCoderateExp==null||audioCoderateExp===""){
//			audioCoderateExp = "--";
//		}
//		if(audioCoderateUse==undefined||audioCoderateUse==null||audioCoderateUse===""){
//			audioCoderateUse = "--";
//		}
//		if(audioCodeDescription===""){
//			audioCodeDescription = audioCoderateExp + "/" + audioCoderateUse;
//		}
//		
//		//视频FEC码率(期望/使用)
//		if(videoCoderateExp==undefined||videoCoderateExp==null||videoCoderateExp===""){
//			videoCoderateExp = "--";
//		}
//		if(videoCoderateUse==undefined||videoCoderateUse==null||videoCoderateUse===""){
//			videoCoderateUse = "--";
//		}
//		if(videoCodeDescription===""){
//			videoCodeDescription = videoCoderateExp + "/" + videoCoderateUse;
//		}
//		
//		
//	    //空心包信息
//		if(emptyPacketRate==undefined||emptyPacketRate==null||emptyPacketRate===""){
//			emptyPacketRate = "--";
//		}
//		if(oneEmpty==undefined||oneEmpty==null||oneEmpty===""){
//			oneEmpty = "--";
//		}
//		if(twoEmpty==undefined||twoEmpty==null||twoEmpty===""){
//			twoEmpty = "--";
//		}
//		if(thrEmpty==undefined||thrEmpty==null||thrEmpty===""){
//			thrEmpty = "--";
//		}
//		if(fouEmpty==undefined||fouEmpty==null||fouEmpty===""){
//			fouEmpty = "--";
//		}
//		if(tenEmpty==undefined||tenEmpty==null||tenEmpty===""){
//			tenEmpty = "--";
//		}
//		if(emptyPacketInfoDescription===""){
//			emptyPacketInfoDescription = emptyPacketRate + "/" + oneEmpty + "/" + twoEmpty + "/" + thrEmpty + "/" + fouEmpty + "/" + tenEmpty;
//		}
//		
//		
//		//音频FEC比例(期望/使用)
//		if(fecrateExpAudio==undefined||fecrateExpAudio==null||fecrateExpAudio===""){
//			fecrateExpAudio = "--";
//		}
//		if(fecrateUseAudio==undefined||fecrateUseAudio==null||fecrateUseAudio===""){
//			fecrateUseAudio = "--";
//		}
//		if(audioFecrateDescription===""){
//			audioFecrateDescription = fecrateExpAudio + "/" + fecrateUseAudio;
//		}
//		
//		//视频FEC比例(期望/使用)
//		if(fecrateExpVideo==undefined||fecrateExpVideo==null||fecrateExpVideo===""){
//			fecrateExpVideo = "--";
//		}
//		if(fecrateUseVideo==undefined||fecrateUseVideo==null||fecrateUseVideo===""){
//			fecrateUseVideo = "--";
//		}
//		if(videoFecrateDescription===""){
//			videoFecrateDescription = fecrateExpVideo + "/" + fecrateUseVideo;
//		}
//
//		//带宽信息(客观/实际)
//		if(bandwidth==undefined||bandwidth==null||bandwidth===""){
//			bandwidth = "--";
//		}
//		if(detectBandwith==undefined||detectBandwith==null||detectBandwith===""){
//			detectBandwith = "--";
//		}
//		if(traffic==undefined||traffic==null||traffic===""){
//			traffic = "--";
//		}
//		if(bandwidthInfoDescription===""){
//			bandwidthInfoDescription = bandwidth + "/" + detectBandwith + "/"traffic;
//		}
//		
//		//视频丢包率
//		if(videolossRateOriginal==undefined||videolossRateOriginal==null||videolossRateOriginal===""){
//			videolossRateOriginal = "--";
//		}
//		if(videolossRateFEC==undefined||videolossRateFEC==null||videolossRateFEC===""){
//			videolossRateFEC = "--";
//		}
//		if(videolossRateFinal==undefined||videolossRateFinal==null||videolossRateFinal===""){
//			videolossRateFinal = "--";
//		}
//		if(videoDescription===""){
//			videoDescription = videolossRateOriginal + "/" + videolossRateFEC + "/" + videolossRateFinal;
//		}
//		//音频丢包率
//		if(audiolossRateOriginal==undefined||audiolossRateOriginal==null||audiolossRateOriginal===""){
//			thrEmpty = "--";
//		}
//		if(audiolossRateFEC==undefined||audiolossRateFEC==null||audiolossRateFEC===""){
//			audiolossRateFEC = "--";
//		}
//		if(audiolossRateFinal==undefined||audiolossRateFinal==null||audiolossRateFinal===""){
//			audiolossRateFinal = "--";
//		}
//		if(audioDescription===""){
//			audioDescription = audiolossRateOriginal + "/" + audiolossRateFEC + "/" + audiolossRateFinal;
//		}
//		//视频整体丢包率
//		if(videolossRateOriginalCC==undefined||videolossRateOriginalCC==null||videolossRateOriginalCC===""){
//			videolossRateOriginalCC = "--";
//		}
//		if(videolossRateFECCC==undefined||videolossRateFECCC==null||videolossRateFECCC===""){
//			videolossRateFECCC = "--";
//		}
//		if(videolossRateFinalCC==undefined||videolossRateFinalCC==null||videolossRateFinalCC===""){
//			videolossRateFinalCC = "--";
//		}
//		if(finalVideoDescription===""){
//			finalVideoDescription =videolossRateOriginalCC + "/" + videolossRateFECCC + "/" + videolossRateFinalCC;
//		}
//		
//		//音频整体丢包率
//		if(audiolossRateOriginalCC==undefined||audiolossRateOriginalCC==null||audiolossRateOriginalCC===""){
//			audiolossRateOriginalCC = "--";
//		}
//		if(audiolossRateFECCC==undefined||audiolossRateFECCC==null||audiolossRateFECCC===""){
//			audiolossRateFECCC = "--";
//		}
//		if(audiolossRateFinalCC==undefined||audiolossRateFinalCC==null||audiolossRateFinalCC===""){
//			audiolossRateFinalCC = "--";
//		}
//		if(finalAudioDescription===""){
//			finalAudioDescription = audiolossRateOriginalCC + "/" + audiolossRateFECCC + "/" + audiolossRateFinalCC;
//		}
//
//
//		
//		html += "<tr class=\"list\">" +
//		"<th scope=\"row\">" + (i+1) +"</th>" +
//		//记录时间戳
//		"<td title='" + timeStamp + "'>"+timeStamp+"</td>" +
//		//用户IP
//		//"<td title='" + userIp + "'>" + userIp + "</td>" +
//		//RelayId
//		//"<td title='" + relayId + "'>" + relayId + "</td>" +
//		//RelayIp
//		"<td title='" + relayIp + "'>" + relayIp + "</td>" +
//		//视频丢包率(原/FEC/终)</th>" +
//		"<td title='" + videoDescription + "'>" + videoDescription + "</td>" +
//		//视频FEC比例(期望/使用)</th>" +
//		"<td title='" + videoFecrateDescription + "'>" + videoFecrateDescription + "</td>" +
//		//音频丢包率(原/FEC/终)</th>" +
//		"<td title='" + audioDescription + "'>" + audioDescription + "</td>" +
//		//音频FEC比例(期望/使用)</th>" +
//		"<td title='" + audioFecrateDescription + "'>" + audioFecrateDescription + "</td>" +
//		//视频整体丢包率(原/FEC/终)</th>" +
//		"<td title='" + finalVideoDescription + "'>" + finalVideoDescription + "</td>" +
//		//音频整体丢包率(原/FEC/终)</th>" +
//		"<td title='" + finalAudioDescription + "'>" + finalAudioDescription + "</td>" +
//		//视频码率(期望/实际)</th>" +
//		"<td title='" + videoCodeDescription + "'>" + videoCodeDescription + "</td>" +
//		//音频码率(期望/实际)</th>" +
//		"<td title='" + audioCodeDescription + "'>" + audioCodeDescription + "</td>" +
//		//空音包信息(比例/1/2/3/4/10)</th>" +
//		"<td title='" + emptyPacketInfoDescription + "'>" + emptyPacketInfoDescription + "</td>" +
//		//带宽(客观/使用)</th>" +
//		"<td title='" + bandwidthInfoDescription + "'>" + bandwidthInfoDescription + "</td>" +
//		//使用信息(cpu/内存/帧率/延迟)</th>" +
//		"<td title='" + useInfoDescription + "'>" + useInfoDescription + "</td>" +
//	"</tr>";
//				
//	});
//	html += "</table>";
//	html += "<div>";
//	var count = list.length;
//	if(count!=undefined&&count!=null&&count!==""){
//		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
//	}		
//			
//	html += "</div>";
//	
//	if(micId == 1){
//		if(directionType == 0){
//			//$("#lossPackage0101Up").html(html);
//			$("#lossPackage0101Up_02").html(html);
//		}else if(directionType == 1){
//			//$("#lossPackage0101Down").html(html);
//			$("#lossPackage0101Down_02").html(html);
//		}	
//	}
//	if(micId == 2){
//		if(directionType == 0){
//			//$("#lossPackage0202Up").html(html);
//			$("#lossPackage0202Up_02").html(html);
//		}else if(directionType == 1){
//			//$("#lossPackage0202Down").html(html);
//			$("#lossPackage0202Down_02").html(html);
//		}	
//	}
//	sortables_init();
//}



/**
 * 分页
 * 根据userId micId 传输方向展示该user在会议中的详细信息
 * @param list server返回的每一条item数据形成数组
 * @param micId 
 * @param directionType 传输方向
 */
function testshowdata_lossPackage_mic_dirction(list,micId, directionType,currPage,pageSize){
	var flag = responsePagination(list,currPage,pageSize);
	var size;
	var lastPage;
	var html ="<div class='callerdetail_title'>用户ID："+list[0].userId+"</div>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		        + "<tr class=\"head\">" +
				"<th scope=\"col\" width='40px'>序号</th>" +
				"<th scope=\"col\" width='120px'>时间</th>" +
				"<th scope=\"col\" width='75px'>网络(类型/wifi强度/wifi速率)</th>" +
				"<th scope=\"col\" width='135px'>用户IP</th>" +
				//"<th scope=\"col\" width='70px'>RealyId</th>" +
				"<th scope=\"col\" width='135px'>RealyIp</th>" +
				"<th scope=\"col\" width='105px'>视频丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='65px'>视频FEC比例(期望/实际)</th>" +
				"<th scope=\"col\" width='105px'>音频丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='60px'>音频FEC比例(期望/实际)</th>" +
				"<th scope=\"col\" width='105px'>视频整体丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='105px'>音频整体丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='55px'>视频码率(期望/实际)</th>" +
				"<th scope=\"col\" width='55px'>音频码率(期望/实际)</th>" +
				"<th scope=\"col\" width='65px'>直接调整视频码率(最大/稳定/当前)</th>" +
				"<th scope=\"col\" width='80px'>空音包信息(比例/1/2/3/4/10)</th>" +
				"<th scope=\"col\" width='100px'>带宽(客观/探测/使用)</th>" +
				"<th scope=\"col\" width='75px'>使用信息(cpu/内存/帧率/延迟)</th>" +
				"<th scope=\"col\" width='52px'>等待时间(视频/音频)</th>" +
				"<th scope=\"col\" width='52px'>迟到率(视频/音频)</th>" +	
				"<th scope=\"col\" width='100px'>延迟时间</th>" +
		"</tr>";
	var userId;
	var userIp;//用户IP
//	var ip = "";//记录上次不同的IP
//	var ipdescription = "";//记录上次不同的IP描述
	var relayId;
	var relayIp;
	var delayTime;//时延
	var cpuRate;//CPU使用率
	var FrameRate;//帧率
	var memRate;//内存使用率
	var videolossRateOriginal;//视频丢包率(万分之几)Fec前
	var videolossRateFEC;//视频丢包率Fec后
	var videolossRateFinal;//视频最终丢包率
	var audiolossRateOriginal;//音频丢包率Fec前
	var audiolossRateFEC;//音频丢包率Fec后
	var audiolossRateFinal;//音频最终丢包率
	var videolossRateOriginalCC;//整体视频丢包率(万分之几)Fec前
	var videolossRateFECCC;//整体视频丢包率Fec后
	var videolossRateFinalCC;//整体视频最终丢包率
	var audiolossRateOriginalCC;//整体音频丢包率Fec前
	var audiolossRateFECCC;//整体音频丢包率Fec后
	var audiolossRateFinalCC;//整体音频最终丢包率
	var audioCoderateExp;//期望视频码率
	var audioCoderateUse;//实际音频码率
	var videoCoderateExp;//期望视频码率
	var videoCoderateUse;//实际视频码率
	var emptyPacketRate;//空音包比率(万分之几)
	var oneEmpty;//一个空心包出现的次数
	var twoEmpty;//连续两个空心包出现的次数
	var thrEmpty;//连续三个空心包出现的次数
	var fouEmpty;//连续四个到10个空心包出现的次数
	var tenEmpty;//连续10个以上的空心包出现的次数
	var timeStamp;//记录时间戳
	var fecrateExpVideo;//期望视频FEC比例
	var fecrateUseVideo;//实际视频FEC比例
	var fecrateExpAudio;//期望音频FEC比例
	var fecrateUseAudio;//实际音频FEC比例
	var bandwidth;//客观带宽
	var traffic;//流量
	var detectBandwith;//探测带宽
	var networkType;//网络类型
	var audioWaitTime; //音频等待时间,ms
	var vedioWaitTime; //视频等待时间,ms
	var audioLaterRate;//音频迟到率,万分比
	var vedioLaterRate;//视频迟到率,万分比
	var networkParam1; //网络参数1，wifi:信号强度
	var networkParam2; //网络参数2, wifi:网络速率
	var delayTimeIntArray;  //延迟时间数组
	var videoMaxCodeRate;    //最大值
	var videoStableCodeRate; //稳定值
	var videoCurCodeRate;    //当前值
	var videoDescription;
	var videoFecrateDescription;
	var audioDescription;
	var audioFecrateDescription;
	var finalVideoDescription;
	var finalAudioDescription;
	var emptyPacketInfoDescription;
	var bandwidthInfoDescription;
	var useInfoDescription;
	var videoCodeDescription;
	var audioCodeDescription;
	var waitTimeDescription;
	var laterRateDescription;
	var fixCodeRateDescription;
	if(flag){
		size = currPage * pageSize;
		if(list.length % pageSize == 0){
			//结果集的长度是每页条目的整数倍，最后一页不加1
			lastPage = floatToint(list.length/pageSize);
			console.info("aaaalastPage:"+lastPage);
		}else{
			lastPage = floatToint(list.length/pageSize) + 1;
			console.info("bbbblastPage:"+lastPage);
		}
		
	}else{
		size = list.length;
	}
	for(var i = (currPage-1)*pageSize;i < size; i++){
	    //遍历清空
		val = list[i];
		videoDescription = "";
		videoFecrateDescription = "";
		audioDescription = "";
		audioFecrateDescription = "";
		finalVideoDescription = "";
		finalAudioDescription = "";
		emptyPacketInfoDescription = "";
		bandwidthInfoDescription = "";
		useInfoDescription = "";
		videoCodeDescription = "";
		audioCodeDescription = "";
		waitTimeDescription  = "";
		laterRateDescription  = "";
		fixCodeRateDescription = "";
		
		userId = val.userId;//
		userIp = val.userIp;//
        relayId = val.relayId;
        relayIp = val.relayIp;
        delayTime =val.delayTime;
        cpuRate = val.cpuRate;//CPU使用率
        FrameRate = val.FrameRate;//帧率
        memRate = val.memRate;//内存使用率
        audioCoderateExp = val.audioCoderateExp;//期望视频码率
        audioCoderateUse = val.audioCoderateUse;//实际音频码率
        videoCoderateExp = val.videoCoderateExp;//期望视频码率
        videoCoderateUse = val.videoCoderateUse;//实际视频码率
        emptyPacketRate = val.emptyPacketRates;//空音包比率(万分之几)
    	oneEmpty = val.oneEmpty;//一个空心包出现的次数
    	twoEmpty = val.twoEmpty;//连续两个空心包出现的次数
    	thrEmpty = val.thrEmpty;//连续三个空心包出现的次数
    	fouEmpty = val.fouEmpty;//连续四个到10个空心包出现的次数
    	tenEmpty = val.tenEmpty;//连续10个以上的空心包出现的次数
    	fecrateExpVideo = val.fecrateExpVideo;//期望视频FEC比例
    	fecrateUseVideo = val.fecrateUseVideo;//实际视频FEC比例
    	fecrateExpAudio = val.fecrateExpAudio;//期望音频FEC比例
    	fecrateUseAudio = val.fecrateUseAudio;//实际音频FEC比例
    	bandwidth = val.bandwidth;//客观带宽
    	traffic = val.traffic;//流量
    	detectBandwith = val.detectBandwith;//探测带宽
    	networkType = val.networkType;///网络类型
		timeStamp = val.timeStamps;//记录时间戳
		videolossRateOriginal = val.videolossRateOriginals;//视频丢包率(万分之几)Fec前
		videolossRateFEC = val.videolossRateFECs;//视频丢包率Fec后
		videolossRateFinal = val.videolossRateFinals;//视频最终丢包率
		audiolossRateOriginal = val.audiolossRateOriginals;//音频丢包率Fec前
		audiolossRateFEC = val.audiolossRateFECs;//音频丢包率Fec后
		audiolossRateFinal = val.audiolossRateFinals;//音频最终丢包率
		if(directionType == 1){
			videolossRateOriginalCC = val.videolossRateOriginalCCs;//整体视频丢包率(万分之几)Fec前
			videolossRateFECCC = val.videolossRateFECCCs;//整体视频丢包率Fec后
			videolossRateFinalCC = val.videolossRateFinalCCs;//整体视频最终丢包率
			audiolossRateOriginalCC = val.audiolossRateOriginalCCs;//整体音频丢包率Fec前
			audiolossRateFECCC = val.audiolossRateFECCCs;//整体音频丢包率Fec后
			audiolossRateFinalCC = val.audiolossRateFinalCCs;//整体音频最终丢包率
		}
		audioWaitTime = val.audioWaitTime; //音频等待时间,ms
		vedioWaitTime = val.vedioWaitTime; //视频等待时间,ms
		audioLaterRate = val.audioLaterRate;//音频迟到率,万分比
		vedioLaterRate = val.audioLaterRate;//视频迟到率,万分比
		networkParam1 = val.networkParam1; //网络参数1，wifi:信号强度
		networkParam2 = val.networkParam2; //网络参数2, wifi:网络速率
		delayTimeIntArray = val.delayTimeIntArray;  //延迟时间数组
		videoMaxCodeRate = val.videoMaxCodeRate;    //最大值
		videoStableCodeRate = val.videoStableCodeRate; //稳定值
		videoCurCodeRate = val.videoCurCodeRate;    //当前值
		if(userId==undefined||userId==null||userId===""){
			userId = "--";
		}
		if(userIp==undefined||userIp==null||userIp===""){
			userIp = "--";
		}
		if(relayId==undefined||relayId==null||relayId===""){
			relayId = "--";
		}
		if(relayIp==undefined||relayIp==null||relayIp===""){
			relayIp = "--";
		}else{
			relayIp = getRelayInfo(relayIp);
		}
//		if(userIp==undefined||userIp==null||userIp===""){
//			gIpdescription = "--";
//		}else{
//			if(userIp!==gIp)
//			{
//				if(userIp ==="255.255.255.255:25000"){
//					gIpdescription = userIp;
//				}else{
//					gIpdescription = postUserIpToOutSide(userIp);
//					console.info("ipdescription:"+gIpdescription);
//				}
//				
//				//gIp = userIp.split(":")[0];
//				gIp = userIp;
//				//console.info("bbbbgIp:"+gIp);
//			}else{
//				
//			}
//		}
		if(userIp==undefined||userIp==null||userIp===""){
			gIpdescription = "--";
		}else{
			userIp = userIp.split(":")[0];
			if(userIp!==gIp){
				if(userIp === "255.255.255.255"){
					gIpdescription = userIp;
				}else{
					//gIpdescription = getIpInfo(userIp);
					gIpdescription = postUserIpToOutSide(userIp);
					console.info("ipdescription:"+gIpdescription);
				}
				gIp = userIp;
			}else{
				
			}
		}
		if(timeStamp==undefined||timeStamp==null||timeStamp===""){
			timeStamp = "--";
		}
		if(networkType==undefined||networkType==null||networkType===""){
			networkType = "--";
		}else{
			//console.info("networkType:"+networkType);
			if(networkType=="1"){
				//console.info("BBBnetworkType:"+networkType);
				networkType = getNetTypeInfo(networkType);
				networkType = networkType + "/" + networkParam1 + "/" + networkParam2;
			}else{
				networkType = getNetTypeInfo(networkType);
			}
		}
		
		//使用信息(cpu/内存/帧率/延迟)
		if(delayTime==undefined||delayTime==null||delayTime===""){
			delayTime = "--";
		}
		if(cpuRate==undefined||cpuRate==null||cpuRate===""){
			cpuRate = "--";
		}
		if(FrameRate==undefined||FrameRate==null||FrameRate===""){
			FrameRate = "--";
		}
		if(memRate==undefined||memRate==null||memRate===""){
			memRate = "--";
		}		
		if(useInfoDescription===""){
			useInfoDescription = cpuRate + "/" + memRate + "/" + FrameRate + "/" + delayTime;
		}
		
		
		//音频FEC码率(期望/使用)
		if(audioCoderateExp==undefined||audioCoderateExp==null||audioCoderateExp===""){
			audioCoderateExp = "--";
		}
		if(audioCoderateUse==undefined||audioCoderateUse==null||audioCoderateUse===""){
			audioCoderateUse = "--";
		}
		if(audioCodeDescription===""){
			audioCodeDescription = audioCoderateExp + "/" + audioCoderateUse;
		}
		
		//视频FEC码率(期望/使用)
		if(videoCoderateExp==undefined||videoCoderateExp==null||videoCoderateExp===""){
			videoCoderateExp = "--";
		}
		if(videoCoderateUse==undefined||videoCoderateUse==null||videoCoderateUse===""){
			videoCoderateUse = "--";
		}
		if(videoCodeDescription===""){
			videoCodeDescription = videoCoderateExp + "/" + videoCoderateUse;
		}
		
		
	    //空心包信息
		if(emptyPacketRate==undefined||emptyPacketRate==null||emptyPacketRate===""){
			emptyPacketRate = "--";
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
		if(emptyPacketInfoDescription===""){
			emptyPacketInfoDescription = emptyPacketRate + "/" + oneEmpty + "/" + twoEmpty + "/" + thrEmpty + "/" + fouEmpty + "/" + tenEmpty;
		}
		
		
		//音频FEC比例(期望/使用)
		if(fecrateExpAudio==undefined||fecrateExpAudio==null||fecrateExpAudio===""){
			fecrateExpAudio = "--";
		}
		if(fecrateUseAudio==undefined||fecrateUseAudio==null||fecrateUseAudio===""){
			fecrateUseAudio = "--";
		}
		if(audioFecrateDescription===""){
			audioFecrateDescription = fecrateExpAudio + "/" + fecrateUseAudio;
		}
		
		//视频FEC比例(期望/使用)
		if(fecrateExpVideo==undefined||fecrateExpVideo==null||fecrateExpVideo===""){
			fecrateExpVideo = "--";
		}
		if(fecrateUseVideo==undefined||fecrateUseVideo==null||fecrateUseVideo===""){
			fecrateUseVideo = "--";
		}
		if(videoFecrateDescription===""){
			videoFecrateDescription = fecrateExpVideo + "/" + fecrateUseVideo;
		}

		//带宽信息(客观/实际)
		if(bandwidth==undefined||bandwidth==null||bandwidth===""){
			bandwidth = "--";
		}
		if(detectBandwith==undefined||detectBandwith==null||detectBandwith===""){
			detectBandwith = "--";
		}
		if(traffic==undefined||traffic==null||traffic===""){
			traffic = "--";
		}
		if(bandwidthInfoDescription===""){
			bandwidthInfoDescription = bandwidth + "/" + detectBandwith + "/" + traffic;
		}
		
		//视频丢包率
		if(videolossRateOriginal==undefined||videolossRateOriginal==null||videolossRateOriginal===""){
			videolossRateOriginal = "--";
		}
		if(videolossRateFEC==undefined||videolossRateFEC==null||videolossRateFEC===""){
			videolossRateFEC = "--";
		}
		if(videolossRateFinal==undefined||videolossRateFinal==null||videolossRateFinal===""){
			videolossRateFinal = "--";
		}
		if(videoDescription===""){
			videoDescription = videolossRateOriginal + "/" + videolossRateFEC + "/" + videolossRateFinal;
		}
		//音频丢包率
		if(audiolossRateOriginal==undefined||audiolossRateOriginal==null||audiolossRateOriginal===""){
			thrEmpty = "--";
		}
		if(audiolossRateFEC==undefined||audiolossRateFEC==null||audiolossRateFEC===""){
			audiolossRateFEC = "--";
		}
		if(audiolossRateFinal==undefined||audiolossRateFinal==null||audiolossRateFinal===""){
			audiolossRateFinal = "--";
		}
		if(audioDescription===""){
			audioDescription = audiolossRateOriginal + "/" + audiolossRateFEC + "/" + audiolossRateFinal;
		}
		//视频整体丢包率
		if(videolossRateOriginalCC==undefined||videolossRateOriginalCC==null||videolossRateOriginalCC===""){
			videolossRateOriginalCC = "--";
		}
		if(videolossRateFECCC==undefined||videolossRateFECCC==null||videolossRateFECCC===""){
			videolossRateFECCC = "--";
		}
		if(videolossRateFinalCC==undefined||videolossRateFinalCC==null||videolossRateFinalCC===""){
			videolossRateFinalCC = "--";
		}
		if(finalVideoDescription===""){
			finalVideoDescription =videolossRateOriginalCC + "/" + videolossRateFECCC + "/" + videolossRateFinalCC;
		}
		
		//音频整体丢包率
		if(audiolossRateOriginalCC==undefined||audiolossRateOriginalCC==null||audiolossRateOriginalCC===""){
			audiolossRateOriginalCC = "--";
		}
		if(audiolossRateFECCC==undefined||audiolossRateFECCC==null||audiolossRateFECCC===""){
			audiolossRateFECCC = "--";
		}
		if(audiolossRateFinalCC==undefined||audiolossRateFinalCC==null||audiolossRateFinalCC===""){
			audiolossRateFinalCC = "--";
		}
		if(finalAudioDescription===""){
			finalAudioDescription = audiolossRateOriginalCC + "/" + audiolossRateFECCC + "/" + audiolossRateFinalCC;
		}

		//等待时间
		if(audioWaitTime==undefined||audioWaitTime==null||audioWaitTime===""){
			audioWaitTime = "--";
		}
		if(vedioWaitTime==undefined||vedioWaitTime==null||vedioWaitTime===""){
			vedioWaitTime = "--";
		}
		if(waitTimeDescription===""){
			waitTimeDescription = vedioWaitTime + "/" + audioWaitTime;
		}
		
		//迟到率
        audioLaterRate = val.audioLaterRate;//音频迟到率,万分比
        vedioLaterRate = val.audioLaterRate;//视频迟到率,万分比
        if(audioLaterRate==undefined||audioLaterRate==null||audioLaterRate===""){
        	audioLaterRate = "--";
		}
		if(vedioLaterRate==undefined||vedioLaterRate==null||vedioLaterRate===""){
			vedioLaterRate = "--";
		}
		if(laterRateDescription===""){
			laterRateDescription = vedioLaterRate + "/" + audioLaterRate;
		}
		
		//延迟时间
		 if(delayTimeIntArray==undefined||delayTimeIntArray==null||delayTimeIntArray===""){
			 delayTimeIntArray = "--";
			}
		
		//视频码率调整
		if(videoMaxCodeRate==undefined||videoMaxCodeRate==null||videoMaxCodeRate===""){
			videoMaxCodeRate = "--";
		}
		if(videoStableCodeRate==undefined||videoStableCodeRate==null||videoStableCodeRate===""){
			videoStableCodeRate = "--";
		}
		if(videoCurCodeRate==undefined||videoCurCodeRate==null||videoCurCodeRate===""){
			videoCurCodeRate = "--";
		}
		if(fixCodeRateDescription===""){
			fixCodeRateDescription = videoMaxCodeRate + "/" + videoStableCodeRate + "/" + videoCurCodeRate;
		}
		
		html += "<tr class=\"list\">" +
		"<th scope=\"row\">" + (i+1) +"</th>" +
		//记录时间戳
		"<td title='" + timeStamp + "'>"+timeStamp+"</td>" +
		//网络类型
		"<td title='" + networkType + "'>"+networkType+"</td>" +
		//用户IP
		"<td title='" + gIpdescription + "'>" + gIpdescription + "</td>" +
		//RelayId
		//"<td title='" + relayId + "'>" + relayId + "</td>" +
		//RelayIp
		"<td title='" + relayIp + "'>" + relayIp + "</td>" +
		//视频丢包率(原/FEC/终)</th>" +
		"<td title='" + videoDescription + "'>" + videoDescription + "</td>" +
		//视频FEC比例(期望/使用)</th>" +
		"<td title='" + videoFecrateDescription + "'>" + videoFecrateDescription + "</td>" +
		//音频丢包率(原/FEC/终)</th>" +
		"<td title='" + audioDescription + "'>" + audioDescription + "</td>" +
		//音频FEC比例(期望/使用)</th>" +
		"<td title='" + audioFecrateDescription + "'>" + audioFecrateDescription + "</td>" +
		//视频整体丢包率(原/FEC/终)</th>" +
		"<td title='" + finalVideoDescription + "'>" + finalVideoDescription + "</td>" +
		//音频整体丢包率(原/FEC/终)</th>" +
		"<td title='" + finalAudioDescription + "'>" + finalAudioDescription + "</td>" +
		//视频码率(期望/实际)</th>" +
		"<td title='" + videoCodeDescription + "'>" + videoCodeDescription + "</td>" +
		//音频码率(期望/实际)</th>" +
		"<td title='" + audioCodeDescription + "'>" + audioCodeDescription + "</td>" +
		//调整码率(最大/稳定/当前)</th>" +
		"<td title='" + fixCodeRateDescription + "'>" + fixCodeRateDescription + "</td>" +
		//空音包信息(比例/1/2/3/4/10)</th>" +
		"<td title='" + emptyPacketInfoDescription + "'>" + emptyPacketInfoDescription + "</td>" +
		//带宽(客观/使用)</th>" +
		"<td title='" + bandwidthInfoDescription + "'>" + bandwidthInfoDescription + "</td>" +
		//使用信息(cpu/内存/帧率/延迟)</th>" +
		"<td title='" + useInfoDescription + "'>" + useInfoDescription + "</td>" +
		//等待时间(视频/音频)</th>" +
		"<td title='" + waitTimeDescription + "'>" + waitTimeDescription + "</td>" +
		//迟到率(视频/音频)</th>" +
		"<td title='" + laterRateDescription + "'>" + laterRateDescription + "</td>" +
		//延迟时间</th>" +
		"<td title='" + delayTimeIntArray + "'>" + delayTimeIntArray + "</td>" +
	"</tr>";
				
	//});
	}
	html += "</table>";
	var pages = "";
	//console.info("当前页："+currPage);
	if(flag){
		//继续分页
		if(currPage ==1){
			//第一页
			pages += "&nbsp;<a onclick=aaa("+micId+","+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa("+micId+","+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=aaa("+micId+","+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa("+micId+","+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=aaa("+micId+","+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa("+micId+","+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=aaa("+micId+","+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa("+micId+","+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;尾页";
		}
	}
	

	html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
			+ currPage + "页";
	
	var count = list.length;
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}		
			
	html += "</div>";
	
	if(micId == 1){
		if(directionType == 0){
			$("#lossPackage0101Up_02").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackage0101Up_02").html(html);
		}else if(directionType == 1){
			//$("#lossPackage0101Down").html(html);
			$("#lossPackage0101Down_02").html("");
			$("#lossPackage0101Down_02").html(html);
		}	
	}
	if(micId == 2){
		if(directionType == 0){
			$("#lossPackage0202Up_02").html("");
			//$("#lossPackage0202Up").html(html);
			$("#lossPackage0202Up_02").html(html);
		}else if(directionType == 1){
			$("#lossPackage0202Down_02").html("");
			//$("#lossPackage0202Down").html(html);
			$("#lossPackage0202Down_02").html(html);
		}	
	}
	sortables_init();
}

function aaa(micId,directionType,currPage,pageSize){
	//console.info("aaaglist:"+glist);
	if(directionType == 0){
		testshowdata_lossPackage_mic_dirction(glist1,micId,directionType,currPage,pageSize);
	}
	else if(directionType == 1){
		testshowdata_lossPackage_mic_dirction(glist2,micId,directionType,currPage,pageSize);
	}
}




/*************************************************************带散列图版的丢包率信息页面.js******************************************/
//该JS为以前的demo,逻辑没有问题可以用散列图，但是数据与真实数据库表中数据不符
//如果使用，需要改变数据
/**
 * mic1丢包率数据展示
 * @param data 数据
 * @param func 查询函数 后期不需要
 */
//function showdata_lossPackage_mic1(data,func){
//	//var domObjects = $("#60010001");
//	//domObjects.each(function(){alert("1111");});
//	var upVideoLossBeforeArr = new Array();
//	var upVideoLossAfterArr = new Array();
//	var upAudioLossBeforeArr = new Array();
//	var upAudioLossAfterArr = new Array();
//	var upToolTipView = new Map();
//	var upToolTipViewHtml = "";
//	
//	var downVideoLossBeforeArr = new Array();
//	var downVideoLossAfterArr = new Array();
//	var downAudioLossBeforeArr = new Array();
//	var downAudioLossAfterArr = new Array();
//	var downToolTipView = new Map();
//	
//	//8个临时数组
//	var arr1;
//	var arr2;
//	var arr3;
//	var arr4;
//	var arr5;
//	var arr6;
//	var arr7;
//	var arr8;
//	var html = "";
//	$("#lossPackage0101Up_01").html(html);
//	$("#lossPackage0101Up_02").html(html);
//	$("#lossPackage0101Down_01").html(html);
//	$("#lossPackage0101Down_02").html(html);
//	//console.info("showdata_lossPackage_mic1");
//	var result = data.result;
//	//console.info("result:"+result);
//	var list = data.items;
//	var upList = new Array();
//	var downList = new Array();
//	if (result==0&&list!=undefined&&list!=null&&list!=="") {
//		length = list.length;
//		$.each(list, function(i, val) {
//			if(val!=undefined&&val!=null&&val!==""){
//				//console.info("val.directionType :"+val.directionType);
//					if(val.directionType == 0){
//						upList[upList.length] = val;
//						if(val.lossPackRatioBeforeFECDTO !=undefined && val.lossPackRatioBeforeFECDTO != null && val.lossPackRatioBeforeFECDTO !==""
//						&&val.lossPackRatioAfterFECDTO !=undefined && val.lossPackRatioAfterFECDTO !=null && val.lossPackRatioAfterFECDTO !==""
//					    &&val.audioLossPackRatioBeforeFECDTO !=undefined && val.audioLossPackRatioBeforeFECDTO !=null && val.audioLossPackRatioBeforeFECDTO !==""
//					    &&val.audioLossPackRatioAfterFECDTO !=undefined && val.audioLossPackRatioAfterFECDTO !=null && val.audioLossPackRatioAfterFECDTO !==""){
//							arr1 = new Array();
//							arr2 = new Array();
//							arr3 = new Array();
//							arr4 = new Array();
//							arr1[0] = arr2[0] = arr3[0] = arr4[0] = val.timeStamp;
//							arr1[1] = stringToNumber(val.lossPackRatioBeforeFECDTO);
//							arr2[1] = stringToNumber(val.lossPackRatioAfterFECDTO);
//							arr3[1] = stringToNumber(val.audioLossPackRatioBeforeFECDTO);
//							arr4[1] = stringToNumber(val.audioLossPackRatioAfterFECDTO);
//							
//							upVideoLossBeforeArr[upVideoLossBeforeArr.length] = arr1;
//							upVideoLossAfterArr[upVideoLossAfterArr.length] = arr2;
//							upAudioLossBeforeArr[upAudioLossBeforeArr.length] = arr3;
//							upAudioLossAfterArr[upAudioLossAfterArr.length] = arr4;
//							
//							upToolTipViewHtml = ""+val.timeStamps+ "<br/>"+
//							"【视频丢包率】<br/>"+
//							"原始视频丢包率："+arr1[1]+"%<br/>"+
//							"视频解FEC后丢包率："+arr2[1]+"%<br/>"+
//							"【音频丢包率】<br/>"+
//							"原始音频丢包率："+arr3[1]+"%<br/>"+
//							"音频解FEC后丢包率："+arr4[1]+"%";
//							upToolTipView.put(arr1[0],upToolTipViewHtml);
//						}
//						
//						
//					}else if(val.directionType == 1){
//						downList[downList.length] = val;
//						if(val.lossPackRatioBeforeFECDTO !=undefined && val.lossPackRatioBeforeFECDTO != null && val.lossPackRatioBeforeFECDTO !==""
//							&&val.lossPackRatioAfterFECDTO !=undefined && val.lossPackRatioAfterFECDTO !=null && val.lossPackRatioAfterFECDTO !==""
//						    &&val.audioLossPackRatioBeforeFECDTO !=undefined && val.audioLossPackRatioBeforeFECDTO !=null && val.audioLossPackRatioBeforeFECDTO !==""
//						    &&val.audioLossPackRatioAfterFECDTO !=undefined && val.audioLossPackRatioAfterFECDTO !=null && val.audioLossPackRatioAfterFECDTO !==""){
//								arr5 = new Array();
//								arr6 = new Array();
//								arr7 = new Array();
//								arr8 = new Array();
//								arr5[0] = arr6[0] = arr7[0] = arr8[0] = val.timeStamp;
//								arr5[1] = stringToNumber(val.lossPackRatioBeforeFECDTO);
//								arr6[1] = stringToNumber(val.lossPackRatioAfterFECDTO);
//								arr7[1] = stringToNumber(val.audioLossPackRatioBeforeFECDTO);
//								arr8[1] = stringToNumber(val.audioLossPackRatioAfterFECDTO);
//								
//								downVideoLossBeforeArr[downVideoLossBeforeArr.length] = arr5;
//								downVideoLossAfterArr[downVideoLossAfterArr.length] = arr6;
//								downAudioLossBeforeArr[downAudioLossBeforeArr.length] = arr7;
//								downAudioLossAfterArr[downAudioLossAfterArr.length] = arr8;
//								
//								downToolTipViewHtml = ""+val.timeStamps+ "<br/>"+
//								"【视频丢包率】<br/>"+
//								"原始视频丢包率："+arr5[1]+"%<br/>"+
//								"视频解FEC后丢包率："+arr6[1]+"%<br/>"+
//								"【音频丢包率】<br/>"+
//								"原始音频丢包率："+arr7[1]+"%<br/>"+
//								"音频解FEC后丢包率："+arr8[1]+"%";
//								downToolTipView.put(arr5[0],downToolTipViewHtml);
//							}
//					}
//			}	
//		});	
//		//console.info("upList:"+upList);
//		if(upVideoLossBeforeArr.length!=0){
//			bomTime(upVideoLossBeforeArr);
//			bomTime(upVideoLossAfterArr);
//			bomTime(upAudioLossBeforeArr);
//			bomTime(upAudioLossAfterArr);
//			//console.info("upVideoLossBeforeArr:"+upVideoLossBeforeArr);
//			//console.info("upVideoLossAfterArr:"+upVideoLossAfterArr);
//			//console.info("upAudioLossBeforeArr:"+upAudioLossBeforeArr);
//			//console.info("upAudioLossAfterArr:"+upAudioLossAfterArr);
//			lossPackage_highStock_DataView(upVideoLossBeforeArr,upVideoLossAfterArr,upAudioLossBeforeArr,upAudioLossAfterArr,upToolTipView,1,0);
//		}
//		if(upList!=undefined&&upList!=null&&upList!==""&&upList.length!=0){
//			//console.info("++upList:"+upList);
//			showdata_lossPackage_mic_dirction(upList,1,0);
//		}else{
//			//$("#lossPackage0101Up").html("无上行数据");
//			$("#lossPackage0101Up_02").html("无上行数据<br/><br/><br/><br/><br/>");
//		}
//		if(downVideoLossBeforeArr.length!=0){
//			bomTime(downVideoLossBeforeArr);
//			bomTime(downVideoLossAfterArr);
//			bomTime(downAudioLossBeforeArr);
//			bomTime(downAudioLossAfterArr);
//			//console.info("aaaaa");
//			//console.info("downVideoLossBeforeArr:"+downVideoLossBeforeArr);
//			//console.info("downVideoLossAfterArr:"+downVideoLossAfterArr);
//			//console.info("downAudioLossBeforeArr:"+downAudioLossBeforeArr);
//			//console.info("downAudioLossAfterArr:"+downAudioLossAfterArr);
//			lossPackage_highStock_DataView(downVideoLossBeforeArr,downVideoLossAfterArr,downAudioLossBeforeArr,downAudioLossAfterArr,downToolTipView,1,1);
//			//console.info("nnnnnnn");
//		}
//		
//		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
//			showdata_lossPackage_mic_dirction(downList,1,1);
//		}else{
//			//console.info("downList++++++:"+downList);
//			$("#lossPackage0101Down_02").html("无下行数据<br/><br/><br/><br/><br/>");
//		}
//	} else {
//		if (result == 2) {
//			$("#lossPackage0101Up_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//			$("#lossPackage0101Down_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//		} else if(result == 1){
//			$("lossPackage0101Up_01").html("<center>只能查询相隔一周之内的数据</center>");
//			$("lossPackage0101Down_01").html("<center>只能查询相隔一周之内的数据</center>");
//		}else if(result == 10){
//			$("#lossPackage0101Up_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//			$("#lossPackage0101Down_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//		}
//	}
//	
//	
//	
//	/*if (result==0&&list!=undefined&&list!=null&&list!=="") {
//		length = list.length;
//		$.each(list, function(i, val) {
//			if(val!=undefined&&val!=null&&val!==""){
//				//console.info("val.directionType :"+val.directionType);
//					if(val.directionType == 0){
//						upList[upList.length] = val;
//					}else if(val.directionType == 1){
//						downList[downList.length] = val;
//					}
//			}	
//		});	
//		console.info("upList:"+upList);
//		if(upList!=undefined&&upList!=null&&upList!==""&&upList.length!=0){
//			console.info("++upList:"+upList);
//			showdata_lossPackage_mic_dirction(upList,1,0);
//		}else{
//			$("#lossPackage0101Up").html("无上行数据");
//		}
//		
//		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
//			showdata_lossPackage_mic_dirction(downList,1,1);
//		}
//		else{
//			$("#lossPackage0101Down").html("无下行数据");
//		}
//	} else {
//		if (result == 2) {
//			$("#lossPackage0101Up").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//			$("#lossPackage0101Down").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//		} else if(result == 1){
//			$("lossPackage0101Up").html("<center>只能查询相隔一周之内的数据</center>");
//			$("lossPackage0101Down").html("<center>只能查询相隔一周之内的数据</center>");
//		}else if(result == 10){
//			$("#lossPackage0101Up").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//			$("#lossPackage0101Down").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//		}
//	}*/
//}
//
///**
// * 根据userId micId 传输方向展示该user在会议中的详细信息
// * @param list server返回的每一条item数据形成数组
// * @param micId 
// * @param directionType 传输方向
// */
//function showdata_lossPackage_mic_dirction(list, micId, directionType)
//{
//	//console.info("list.length:"+list.length+"micId:"+micId+"directionType:"+directionType);
//	var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
//		        + "<tr class=\"head\">" +
//				"<th scope=\"col\" width='40px'>序号</th>" +
//				"<th scope=\"col\" width='70px'>用户Id</th>" +
//				"<th scope=\"col\" width='130px'>时间戳</th>" +
//				"<th scope=\"col\" width='100px'>用户IP</th>" +
//				"<th scope=\"col\" width='70px'>RealyId</th>" +
//				"<th scope=\"col\" width='100px'>RealyIp</th>" +
//				"<th scope=\"col\" width='120px'>视频丢包率</th>" +
//				"<th scope=\"col\" width='120px'>解fec后视频丢包率</th>" +
//				"<th scope=\"col\" width='120px'>音频丢包率</th>" +
//				"<th scope=\"col\" width='120px'>解fec后音频丢包率</th>" +
//		"</tr>";
//	$.each(list,function(i,val){
//		userId = val.userId;//
//		//console.info("userId:"+userId);
//		userIp = val.userIp;//
//        relayId = val.relayId;
//        relayIp = val.relayIp;
//		lossPackRatioBeforeFEC = val.lossPackRatioBeforeFECDTO;//视频丢包率
//		lossPackRatioAfterFEC = val.lossPackRatioAfterFECDTO;//efc后视频丢包率
//		audioLossPackRatioBeforeFEC = val.audioLossPackRatioBeforeFECDTO;//音频丢包率
//		audioLossPackRatioAfterFEC = val.audioLossPackRatioAfterFECDTO;//efc后音频丢包率
//		timeStamp = val.timeStamps;//记录时间戳
//		//directionType = val.directionType;//传输方向
//		if(userId==undefined||userId==null||userId===""){
//			userId = "--";
//		}
//		if(userIp==undefined||userIp==null||userIp===""){
//			userIp = "--";
//		}
//		if(relayId==undefined||relayId==null||relayId===""){
//			relayId = "--";
//		}
//		if(relayIp==undefined||relayIp==null||relayIp===""){
//			relayIp = "--";
//		}
//		if(micId==undefined||micId==null||micId===""){
//			micId = "--";
//		}
//		if(lossPackRatioBeforeFEC==undefined||lossPackRatioBeforeFEC==null||lossPackRatioBeforeFEC===""){
//			lossPackRatioBeforeFEC = "--";
//		}
//		if(lossPackRatioAfterFEC==undefined||lossPackRatioAfterFEC==null||lossPackRatioAfterFEC===""){
//			lossPackRatioAfterFEC = "--";
//		}
//		if(audioLossPackRatioBeforeFEC==undefined||audioLossPackRatioBeforeFEC==null||audioLossPackRatioBeforeFEC===""){
//			audioLossPackRatioBeforeFEC = "--";
//		}
//		if(audioLossPackRatioAfterFEC==undefined||audioLossPackRatioAfterFEC==null||audioLossPackRatioAfterFEC===""){
//			audioLossPackRatioAfterFEC = "--";
//		}
//		if(timeStamp==undefined||timeStamp==null||timeStamp===""){
//			timeStamp = "--";
//		}
//
//		html += "<tr class=\"list\">" +
//		"<th scope=\"row\">" + (i+1) +"</th>" +
//		//用户Id
//		"<td title='"+ userId + "'>" + userId +"</td>" +
//		//记录时间戳
//		"<td title='" + timeStamp + "'>"+timeStamp+"</td>" +
//		//用户IP
//		"<td title='" + userIp + "'>" + userIp + "</td>" +
//		//RelayId
//		"<td title='" + relayId + "'>" + relayId + "</td>" +
//		//RelayIp
//		"<td title='" + relayIp + "'>" + relayIp + "</td>" +
//		//视频丢包率(fec前/fec后)
//		"<td title='"+lossPackRatioBeforeFEC+"'>"+ lossPackRatioBeforeFEC +"</td>" +
//		//视频丢包率(fec前/fec后)
//		"<td title='"+lossPackRatioAfterFEC+"'>"+ lossPackRatioAfterFEC +"</td>" +
//		//音频丢包率(fec前/fec后)
//		"<td title='" + audioLossPackRatioBeforeFEC + "'>"+audioLossPackRatioBeforeFEC+"</td>" +
//		//音频丢包率(fec前/fec后)
//		"<td title='" + audioLossPackRatioAfterFEC + "'>"+audioLossPackRatioAfterFEC+"</td>" +				
//	"</tr>";
//				
//	});
//	html += "</table>";
//	html += "<div>";
//	var count = list.length;
//	if(count!=undefined&&count!=null&&count!==""){
//		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
//	}		
//			
//	html += "</div>";
//	
//	if(micId == 1){
//		if(directionType == 0){
//			//$("#lossPackage0101Up").html(html);
//			$("#lossPackage0101Up_02").html(html);
//		}else if(directionType == 1){
//			//$("#lossPackage0101Down").html(html);
//			$("#lossPackage0101Down_02").html(html);
//		}	
//	}
//	if(micId == 2){
//		if(directionType == 0){
//			//$("#lossPackage0202Up").html(html);
//			$("#lossPackage0202Up_02").html(html);
//		}else if(directionType == 1){
//			//$("#lossPackage0202Down").html(html);
//			$("#lossPackage0202Down_02").html(html);
//		}	
//	}
//	sortables_init();
//}
//
//
///**
// * mic2丢包率数据展示
// * @param data 数据
// * @param func 查询函数 后期不需要
// */
//function showdata_lossPackage_mic2(data,func){
//	var upVideoLossBeforeArr = new Array();
//	var upVideoLossAfterArr = new Array();
//	var upAudioLossBeforeArr = new Array();
//	var upAudioLossAfterArr = new Array();
//	var upToolTipView = new Map();
//	var upToolTipViewHtml = "";
//	
//	var downVideoLossBeforeArr = new Array();
//	var downVideoLossAfterArr = new Array();
//	var downAudioLossBeforeArr = new Array();
//	var downAudioLossAfterArr = new Array();
//	var downToolTipView = new Map();
//	
//	//8个临时数组
//	var arr1;
//	var arr2;
//	var arr3;
//	var arr4;
//	var arr5;
//	var arr6;
//	var arr7;
//	var arr8;
//	var html = "";
//	$("#lossPackage0202Up_01").html(html);
//	$("#lossPackage0202Up_02").html(html);
//	$("#lossPackage0202Down_01").html(html);
//	$("#lossPackage0202Down_02").html(html);
//	//console.info("showdata_lossPackage_mic1");
//	var result = data.result;
//	//console.info("result:"+result);
//	var list = data.items;
//	var upList = new Array();
//	var downList = new Array();
//	if (result==0&&list!=undefined&&list!=null&&list!=="") {
//		length = list.length;
//		$.each(list, function(i, val) {
//			if(val!=undefined&&val!=null&&val!==""){
//				//console.info("val.directionType :"+val.directionType);
//					if(val.directionType == 0){
//						upList[upList.length] = val;
//						if(val.lossPackRatioBeforeFECDTO !=undefined && val.lossPackRatioBeforeFECDTO != null && val.lossPackRatioBeforeFECDTO !==""
//						&&val.lossPackRatioAfterFECDTO !=undefined && val.lossPackRatioAfterFECDTO !=null && val.lossPackRatioAfterFECDTO !==""
//					    &&val.audioLossPackRatioBeforeFECDTO !=undefined && val.audioLossPackRatioBeforeFECDTO !=null && val.audioLossPackRatioBeforeFECDTO !==""
//					    &&val.audioLossPackRatioAfterFECDTO !=undefined && val.audioLossPackRatioAfterFECDTO !=null && val.audioLossPackRatioAfterFECDTO !==""){
//							arr1 = new Array();
//							arr2 = new Array();
//							arr3 = new Array();
//							arr4 = new Array();
//							arr1[0] = arr2[0] = arr3[0] = arr4[0] = val.timeStamp;
//							arr1[1] = stringToNumber(val.lossPackRatioBeforeFECDTO);
//							arr2[1] = stringToNumber(val.lossPackRatioAfterFECDTO);
//							arr3[1] = stringToNumber(val.audioLossPackRatioBeforeFECDTO);
//							arr4[1] = stringToNumber(val.audioLossPackRatioAfterFECDTO);
//							
//							upVideoLossBeforeArr[upVideoLossBeforeArr.length] = arr1;
//							upVideoLossAfterArr[upVideoLossAfterArr.length] = arr2;
//							upAudioLossBeforeArr[upAudioLossBeforeArr.length] = arr3;
//							upAudioLossAfterArr[upAudioLossAfterArr.length] = arr4;
//							
//							upToolTipViewHtml = ""+val.timeStamps+ "<br/>"+
//							"【视频丢包率】<br/>"+
//							"原始视频丢包率："+arr1[1]+"%<br/>"+
//							"视频解FEC后丢包率："+arr2[1]+"%<br/>"+
//							"【音频丢包率】<br/>"+
//							"原始音频丢包率："+arr3[1]+"%<br/>"+
//							"音频解FEC后丢包率："+arr4[1]+"%";
//							upToolTipView.put(arr1[0],upToolTipViewHtml);
//						}
//						
//						
//					}else if(val.directionType == 1){
//						downList[downList.length] = val;
//						if(val.lossPackRatioBeforeFECDTO !=undefined && val.lossPackRatioBeforeFECDTO != null && val.lossPackRatioBeforeFECDTO !==""
//							&&val.lossPackRatioAfterFECDTO !=undefined && val.lossPackRatioAfterFECDTO !=null && val.lossPackRatioAfterFECDTO !==""
//						    &&val.audioLossPackRatioBeforeFECDTO !=undefined && val.audioLossPackRatioBeforeFECDTO !=null && val.audioLossPackRatioBeforeFECDTO !==""
//						    &&val.audioLossPackRatioAfterFECDTO !=undefined && val.audioLossPackRatioAfterFECDTO !=null && val.audioLossPackRatioAfterFECDTO !==""){
//								arr5 = new Array();
//								arr6 = new Array();
//								arr7 = new Array();
//								arr8 = new Array();
//								arr5[0] = arr6[0] = arr7[0] = arr8[0] = val.timeStamp;
//								arr5[1] = stringToNumber(val.lossPackRatioBeforeFECDTO);
//								arr6[1] = stringToNumber(val.lossPackRatioAfterFECDTO);
//								arr7[1] = stringToNumber(val.audioLossPackRatioBeforeFECDTO);
//								arr8[1] = stringToNumber(val.audioLossPackRatioAfterFECDTO);
//								
//								downVideoLossBeforeArr[downVideoLossBeforeArr.length] = arr5;
//								downVideoLossAfterArr[downVideoLossAfterArr.length] = arr6;
//								downAudioLossBeforeArr[downAudioLossBeforeArr.length] = arr7;
//								downAudioLossAfterArr[downAudioLossAfterArr.length] = arr8;
//								
//								downToolTipViewHtml = ""+val.timeStamps+ "<br/>"+
//								"【视频丢包率】<br/>"+
//								"原始视频丢包率："+arr5[1]+"%<br/>"+
//								"视频解FEC后丢包率："+arr6[1]+"%<br/>"+
//								"【音频丢包率】<br/>"+
//								"原始音频丢包率："+arr7[1]+"%<br/>"+
//								"音频解FEC后丢包率："+arr8[1]+"%";
//								downToolTipView.put(arr5[0],downToolTipViewHtml);
//							}
//					}
//			}	
//		});	
//		//console.info("upList:"+upList);
//		if(upVideoLossBeforeArr.length!=0){
//			bomTime(upVideoLossBeforeArr);
//			bomTime(upVideoLossAfterArr);
//			bomTime(upAudioLossBeforeArr);
//			bomTime(upAudioLossAfterArr);
//			//console.info("upVideoLossBeforeArr:"+upVideoLossBeforeArr);
//			//console.info("upVideoLossAfterArr:"+upVideoLossAfterArr);
//			//console.info("upAudioLossBeforeArr:"+upAudioLossBeforeArr);
//			//console.info("upAudioLossAfterArr:"+upAudioLossAfterArr);
//			lossPackage_highStock_DataView(upVideoLossBeforeArr,upVideoLossAfterArr,upAudioLossBeforeArr,upAudioLossAfterArr,upToolTipView,2,0);
//		}
//		if(upList!=undefined&&upList!=null&&upList!==""&&upList.length!=0){
//			//console.info("++upList:"+upList);
//			showdata_lossPackage_mic_dirction(upList,2,0);
//		}else{
//			//$("#lossPackage0101Up").html("无上行数据");
//			$("#lossPackage0202Up_02").html("无上行数据<br/><br/><br/><br/><br/>");
//		}
//		if(downVideoLossBeforeArr.length!=0){
//			bomTime(downVideoLossBeforeArr);
//			bomTime(downVideoLossAfterArr);
//			bomTime(downAudioLossBeforeArr);
//			bomTime(downAudioLossAfterArr);
//			//console.info("aaaaa");
//			//console.info("downVideoLossBeforeArr:"+downVideoLossBeforeArr);
//			//console.info("downVideoLossAfterArr:"+downVideoLossAfterArr);
//			//console.info("downAudioLossBeforeArr:"+downAudioLossBeforeArr);
//			//console.info("downAudioLossAfterArr:"+downAudioLossAfterArr);
//			lossPackage_highStock_DataView(downVideoLossBeforeArr,downVideoLossAfterArr,downAudioLossBeforeArr,downAudioLossAfterArr,downToolTipView,2,1);
//			//console.info("nnnnnnn");
//		}
//		
//		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
//			showdata_lossPackage_mic_dirction(downList,2,1);
//		}else{
//			//console.info("downList++++++:"+downList);
//			$("#lossPackage0202Down_02").html("无下行数据<br/><br/><br/><br/><br/>");
//		}
//	} else {
//		if (result == 2) {
//			$("#lossPackage0202Up_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//			$("#lossPackage0202Down_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//		} else if(result == 1){
//			$("lossPackage0202Up_01").html("<center>只能查询相隔一周之内的数据</center>");
//			$("lossPackage0202Down_01").html("<center>只能查询相隔一周之内的数据</center>");
//		}else if(result == 10){
//			$("#lossPackage0202Up_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//			$("#lossPackage0202Down_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
//		}
//	}
//}
//
//function lossPackage_highStock_DataView(list1,list2,list3,list4,tooltipMap,micId,directionType){
//	//console.info("list1:"+list1+"\nlist2:"+list2+"\nlist3:"+list3+"\nlist4:"+list4+"\ntooltipMap:"+tooltipMap.toString()+"\nmicId:"+micId+"\ndirectionType:"+directionType);
//	var mainId;
//	if(micId == 1){
//		if(directionType == 0){
//           mainId = "lossPackage0101Up_01";
//		}
//		else if(directionType == 1){
//			//console.info("xia")
//			mainId = "lossPackage0101Down_01";
//		}
//	}
//	if(micId == 2){
//		if(directionType == 0){
//	           mainId = "lossPackage0202Up_01";
//			}
//		else if(directionType == 1){
//			//console.info("xia")
//			mainId = "lossPackage0202Down_01";
//		}	
//	}
//	$('#'+mainId).highcharts('StockChart', {
//		title : {
//			text : '该用户在本次会议中丢包率记录图'
//		},
//		exporting: {//右上角导出图片    
//            enabled: false//是否能导出趋势图图片  
//        },
//        navigation:{//对图表右上角的导出趋势图的菜单进行设置
//	    	enabled:true,
//	    	buttonOptions:{
//		    	width:200,
//		    	text:'导出'
//	    	},
//	    	menuStyle: {
//	    		border: '1px solid #A0A0A0',
//	    		background: '#FFFFFF'
//	    	}
//	    },
//		tooltip : {// 标签提示框
//			enabled : true,// 显示提示框
//			backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
//			crosshairs : true,// 鼠标经过时显示上下标尺线
//			shared : true,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
//			xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
//			useHTML : true,
//			formatter : function() {//如果此项进行了设置，提示框的显示将按下面设置的显示，上面的xDateFormat失效
//				//console.log(this);
//				var  now = new Date(this.x-8*60*60*1000);
//				var time = "";
//				time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
//				time = dateToUTC(time);
//				if(tooltipMap.get(time)!=undefined&&tooltipMap.get(time)!=null&&tooltipMap.get(time)!==""){
//    	   			return  tooltipMap.get(time);}
//				
//			},
//			style : {
//				color : '#00FF00',// 绿字
//				fontSize : '12px'
//			}
//		},
//		rangeSelector: {//控制顶部的时间快捷按钮
//        	enabled:true,
//            buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
//	            type: 'minute',  
//	            count: 1,  
//	            text: '1分钟'  
//	        },{  
//	            type: 'minute',  
//	            count: 5,  
//	            text: '5分钟'  
//	        }, {  
//	            type: 'minute',  
//	            count: 10,  
//	            text: '10分钟'  
//	        }, {  
//	            type: 'minute',  
//	            count: 20,  
//	            text: '20分钟'  
//	        }, {  
//	            type: 'minute',  
//	            count: 30,  
//	            text: '30分钟'  
//	        }, {  
//	            type: 'minute',  
//	            count: 45,  
//	            text: '45分钟'  
//	        }, {  
//	            type: 'hour',  
//	            count: 1,  
//	            text: '1小时'  
//	        }, {  
//	            type: 'all',  
//	            text: '所有' 
//	        }],
//	        buttonTheme: {
//	        	width: 36,
//	        	height: 16,
//	        	padding: 1,
//	        	r: 0,
//	        	stroke: '#68A'
//	        	//zIndex: 7
//        	},
//        	inputEnabled:false,//是否显示右上角的输入框
//        	inputBoxWidth:190,//右上角时间输入框的宽度
//        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
//        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
//            selected: 7//加载时以上定义button的index哪个被选中,从0开始  
//        }, 
//		credits : {// 配置右下角版权链接
//			enabled : false,
//			href : 'http://www.butel.com/',
//			text : 'Butel',
//			style : {
//				color : '#0000FF',
//				fontSize : '19',
//				fontWeight : 'bold'
//			}
//		},
//		legend : {// 图例
//			// 是否显示图例
//			enabled : true,
//			// 垂直排列
//			layout : 'vertical',
//			height:313,//定位上下位置
//			// 靠右显示
//			align : 'right',
//			verticalAlign : 'bottom',//"top", "middle" or "bottom".
//			borderWidth : 0
//		},
//		plotOptions:{//对于数据点的操作　
//        	column:{
//        		allowPointSelect:true,//允许柱形被选择
//	        	//pointWidth:null,//每个柱形的宽度，默认是null，自动根据实际情况变化
//        		//pointRange:20,
//	        	showCheckbox:false//图例旁显示复选框
//        	}
//        },
//        navigator:{//图表底部的数据区域
//        	enabled:true,
//        	height:20,
//        	top:340,
//        	xAxis: {
//        	    tickWidth: 0,//数据分段
//        	    lineWidth: 0,
//        	    gridLineWidth: 1,
//        	    tickPixelInterval: 100,
//        	    labels: {
//        	        align: 'left',
//        	        style: {
//        	            color: '#888'
//        	        },
//        	        x: 3,
//        	        y: -4
//        	    }
//        	}
//        },
//        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
//        	enabled:true,
//			height : 20,
//			barBackgroundColor:'#2493F7',//滚动条背景色
//			buttonBackgroundColor:'#F07600',//左右按钮的背景色
//			buttonBorderColor:'#F07600'//左右按钮的边框色
//		},
//		xAxis : {
//			enabled:true,
//			//tickPixelInterval: 10,//x轴上的间隔  
//			tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
//			height:200,
//			//width:800,
//			type: 'datetime',//datetime
//			title:{
//				text:"时间",
//				align:"high"
//			},
//			dateTimeLabelFormats:{
//                //second: '%H:%M:%S:%L'
//                second: '%H:%M:%S'
//                //second: '%Y-%m-%d %H:%M:%S'
//            }
//		},
//		yAxis : [{
//				title : {
//					text : '丢包率(%)',
//					align : 'high',
//					offset : 1,// 偏移
//					rotation : 0// 旋转
//				},
//				//top : 30,
//				min:0,
//			    //max:100,
//				height : 200,
//				//splitNumber : 5
//				//boundaryGap : [ 0.05, 0.05 ]
//				lineWidth : 1,
//				opposite : false,// 图标题显示位置，为true时显示在右边
//				offset : 0// 偏移
//			}
//		],
//		series : [{
//					type : 'spline',
//					name : '视频原始丢包率',
//					data :list1,
//					marker : {  
//	                   enabled : true,//显示曲线上的点  
//	                   radius : 6,//曲线上点的大小
//	                   symbol:'triangle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
//	           		},
//					yAxis : 0
//
//				},{
//					//type : 'scatter',
//					type : 'spline',
//					name : '视频FEC丢包率',
//					data : list2,
//					marker : {  
//	                   enabled : true,//显示曲线上的点  
//	                   radius : 6,//曲线上点的大小
//	                   symbol:'diamond'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
//	           		},
//					yAxis : 0
//
//				},{
//					//type : 'scatter',
//					type : 'spline',
//					name : '音频原始丢包率',
//					data : list3,
//					marker : {  
//	                   enabled : true,//显示曲线上的点  
//	                   radius : 6,//曲线上点的大小
//	                   symbol:'diamond'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
//	           		},
//					yAxis : 0
//
//				},{
//					//type : 'scatter',
//					type : 'spline',
//					name : '音频FEC丢包率',
//					data : list4,
//					marker : {  
//	                   enabled : true,//显示曲线上的点  
//	                   radius : 6,//曲线上点的大小
//	                   symbol:'diamond'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
//	           		},
//					yAxis : 0
//
//				}
//			]
//	});
//}




