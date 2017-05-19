/* 会议详情callDetail.jsp页面中“多流丢包率信息”标签页面的JS效果 */

// 最外层四个子标签点击效果

/**
 * 全局变量
 */
var glist1; //存放上行数据
var glist2; //存放下行数据
var glist3; //存放300上数据
var glist4; //存放100下数据
var glist5; //存放200下数据
var glist6; //存放300下数据
var gpagesize = 100;//一页显示多少行
var gIp = "";//记录上次不同的IP
var gIpdescription = "";//记录上次不同的IP描述

$(document).ready(function() {
//	$("#up_resourceId_100").hide();
//	$("#up_resourceId_200").hide();
//	$("#up_resourceId_300").hide();
//	$("#down_resourceId_100").hide();
//	$("#down_resourceId_200").hide();
//	$("#down_resourceId_300").hide();
	// 获取控制子标签内容的div
	var tabContainers = $('#lossPackageMult_content > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.lossPackageMult_directon_tabs li a').click(function() {
				var id = $(this).attr("id");
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.lossPackageMult_directon_tabs li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
	
	

	
});

$(document).ready(function(){
	var tabContainers = $('#lossPackageMultUpView > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.lossPackageMult_resourceId_up_tap li a').click(function() {
				var id = $(this).attr("id");
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.lossPackageMult_resourceId_up_tap li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
});

$(document).ready(function(){
	
	var tabContainers = $('#lossPackageMultDownView > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();
	
	$('.lossPackageMult_resourceId_down_tap li a').click(function() {
		var id = $(this).attr("id");
		tabContainers.hide();// 隐藏所有
		tabContainers.filter(this.hash).show();// 显示当前标签的子内容
		// 将ul下所有标签的类名移除
		$('.lossPackageMult_resourceId_down_tap li a').removeClass('selected');
		// 为当前点击的标签设置类名
		$(this).addClass('selected');
		return false;
	}).filter(':first').click();
});

function showSecondTab(){
	// 获取控制子标签内容的div
	var tabContainers = $('#lossPackageMult_speaker_tabs_view > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.MultlossPackage_speakerId_tabs li a').click(function() {
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.MultlossPackage_speakerId_tabs li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
}
//var qosTableName; // zhanghy 12-30用于存储表名，用来不变原来的逻辑
function aboutIDsubmit(userId,speakerId,meetingId,showType,currPage,startTime,endTime,qosTableName){
	console.info("showType:"+showType+"startTime:"+startTime+" endTime:"+endTime+"qosTableName"+qosTableName);
	var pageSize = 25;
	$.ajax({
    		type : "post",
    		url : "search.aboutLossPacketInfo2.action",
    		dataType : "json",
    		data : "userId=" + userId + "&meetingId=" + meetingId  + "&speakerId=" + speakerId + "&pageSize=" + pageSize
    		+"&currPage="+currPage+"&meetingStartTime="+startTime+"&meetingEndTime="+endTime+"&qosTableName="+qosTableName,
    		beforeSend : function() {
    			$(".layer").show();
    			var pic = "<img src='images/losspackload.gif' align='middle' />";
//				$("#lossPackageMultUp").html(pic);
//				$("#lossPackageMultDown").html(pic);
				$("#lossPackageMult_up_resourceId_100").html(pic);
				$("#lossPackageMult_up_resourceId_200").html(pic);
				$("#lossPackageMult_up_resourceId_300").html(pic);
				$("#lossPackageMult_down_resourceId_100").html(pic);
				$("#lossPackageMult_down_resourceId_200").html(pic);
				$("#lossPackageMult_down_resourceId_300").html(pic);
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

function speakerIdTabView_MultLossPack(speakerIdList,meetingId,userIdList,startTime,endTime,TableName){
	console.info("startTime:"+startTime+"  endTime:"+endTime);
	var times = startTime.split("_");
	startTime = times[0];
	times = endTime.split("_");
	endTime = times[0];
	var html = "";
	html += "<ul class='MultlossPackage_speakerId_tabs'>" ;
	var speakerIdListArr = speakerIdList.split(",");
	var userIdListArr = userIdList.split(",");
	$.each(speakerIdListArr,function(i,val){
		html += "<li><a href='#aa_"+val+"'>"+val+"</a></li>";
	});
	html += "</ul>";
	$("#lossPackageMult_speaker_tabs").html(html);
	
	
	
	var html1 = "";
	$.each(speakerIdListArr,function(i,val){
		html1 += "<div id='aa_"+val+"'>"+
		"<ul class='MultlossPackage_userId_tabs'>";
		console.info("click表名："+TableName);
		$.each(userIdListArr,function(k,val1){
			html1 += "<li><a onclick=aboutIDsubmit('"+val1+"','"+val+"','"+meetingId+"','lossPackageMult','1','"+startTime+"','"+endTime+"','"+TableName+"')>"+val1+"</a></li>";
		});
		html1 += "</ul>"+
		"</div>";
	});
	$("#lossPackageMult_speaker_tabs_view").html(html1);
	
	//显示第二级标签
	showSecondTab();
}


function showdata_LossPackageMult(data,func){
	var html = "";
	$("#lossPackageMultUp").html(html);
	$("#lossPackageMultDown").html(html);
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
			showdata_lossPackageMult_dirction(upList,0,1,gpagesize);
		}else{
			$("#lossPackageMultUp").html("无上行数据<br/><br/><br/><br/><br/><br/>");
		}
		
//		console.info("123456");
		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
			glist2 = downList;
			showdata_lossPackageMult_dirction(downList,1,1,gpagesize);
		}
		else{
//			console.info("1111111");
			$("#lossPackageMultDown").html("无下行数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#lossPackageMultUp").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMultDown").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("lossPackageMultUp").html("<center>只能查询相隔一周之内的数据</center>");
			$("lossPackageMultDown").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#lossPackageMultUp").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMultDown").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}


/**
 * 分页
 * 根据userId micId 传输方向展示该user在会议中的详细信息
 * @param list server返回的每一条item数据形成数组
 * @param micId 
 * @param directionType 传输方向
 */
function showdata_lossPackageMult_dirction(list,directionType,currPage,pageSize){
	var flag = responsePagination(list,currPage,pageSize);
	var size;
	var lastPage;
	var html ="<div class='callerdetail_title'>用户ID："+list[0].userId+"</div>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		        + "<tr class=\"head\">" +
				"<th scope=\"col\" width='40px'>序号</th>" +
				"<th scope=\"col\" width='120px'>时间</th>" +
				"<th scope=\"col\" width='65px'>设备类型</th>" +
				"<th scope=\"col\" width='75px'>网络(类型/wifi强度/wifi速率)</th>" +
				"<th scope=\"col\" width='135px'>用户IP</th>" +
				"<th scope=\"col\" width='135px'>RealyIp</th>" +
				"<th scope=\"col\" width='65px'>媒体ID/类型</th>" +
				"<th scope=\"col\" width='105px'>丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='65px'>FEC比例(期望/实际)</th>" +
				"<th scope=\"col\" width='105px'>整体丢包率(原/FEC/终)</th>" +
				"<th scope=\"col\" width='75px'>分辨率</th>" +
				"<th scope=\"col\" width='55px'>码率</th>" +
				"<th scope=\"col\" width='65px'>直接调整码率(最大/稳定)</th>" +
				"<th scope=\"col\" width='80px'>空音包信息(比例/1/2/3/4/10)</th>" +
				"<th scope=\"col\" width='100px'>带宽(客观/探测/使用)</th>" +
				"<th scope=\"col\" width='75px'>使用信息(cpu/内存/帧率)</th>" +
				"<th scope=\"col\" width='52px'>等待时间/重发次数</th>" +
				"<th scope=\"col\" width='100px'>延迟时间</th>" +
				"<th scope=\"col\" width='100px'>补发无效次数（数据/校验包/数据包重发/校验包重发）</th>" +
		"</tr>";
	var userId;
	var userIp;//用户IP
	var relayId;
	var relayIp;
	var cpuRate;//CPU使用率
	var FrameRate;//帧率
	var memRate;//内存使用率
	var lossRateOriginal;//视频丢包率(万分之几)Fec前
	var lossRateFEC;//视频丢包率Fec后
	var lossRateFinal;//视频最终丢包率
	var lossRateOriginalCC;//整体视频丢包率(万分之几)Fec前
	var lossRateFECCC;//整体视频丢包率Fec后
	var lossRateFinalCC;//整体视频最终丢包率
	var expCodeRate;//期望视频码率
	var curCodeRate;//实际视频码率
	var emptyPacketRate;//空音包比率(万分之几)
	var oneEmpty;//一个空心包出现的次数
	var twoEmpty;//连续两个空心包出现的次数
	var thrEmpty;//连续三个空心包出现的次数
	var fouEmpty;//连续四个到10个空心包出现的次数
	var tenEmpty;//连续10个以上的空心包出现的次数
	var timeStamp;//记录时间戳
	var fecRateExp;//期望视频FEC比例
	var fecRateUse;//实际视频FEC比例
	var bandwidth;//客观带宽
	var traffic;//流量
	var detectBandwidth;//探测带宽
	var networkType;//网络类型
	var waitTime; //视频等待时间,ms
	var networkParam1; //网络参数1，wifi:信号强度
	var networkParam2; //网络参数2, wifi:网络速率
	var delayTimeIntArray;  //延迟时间数组
	var maxCodeRate;    //最大值
	var stableCodeRate; //稳定值
	var systemType; // 会议系统 0 海军会诊系统
	var deviceType; // 硬件类型,硬件类型-1未知，1 pc，2 手机，3 N8，4 X1先这么定
	var resourceId;
	var mediaType; 
	var speakerId;
	var reTranTimes;
	var mediaFormat;
	var inValidTimes;
	var videoDescription;
	var videoFecrateDescription;
	var finalVideoDescription;
	var emptyPacketInfoDescription;
	var bandwidthInfoDescription;
	var useInfoDescription;
	var videoCodeDescription;
	var waitTimeDescription;
	var fixCodeRateDescription;
	var resourceDescription;
	
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
		finalVideoDescription = "";
		emptyPacketInfoDescription = "";
		bandwidthInfoDescription = "";
		useInfoDescription = "";
		videoCodeDescription = "";
		waitTimeDescription  = "";
		fixCodeRateDescription = "";
		resourceDescription = "";
		timeDescription = "";
		userId = val.userId;//
		userIp = val.userIp;//
        relayId = val.relayId;
        relayIp = val.relayIp;
        delayTime =val.delayTime;
        cpuRate = val.cpuRate;//CPU使用率
        FrameRate = val.FrameRate;//帧率
        memRate = val.memRate;//内存使用率
        expCodeRate = val.expCodeRate;//期望视频码率
        curCodeRate = val.curCodeRate;//实际视频码率
        emptyPacketRate = val.emptyPacketRates;//空音包比率(万分之几)
    	oneEmpty = val.oneEmpty;//一个空心包出现的次数
    	twoEmpty = val.twoEmpty;//连续两个空心包出现的次数
    	thrEmpty = val.thrEmpty;//连续三个空心包出现的次数
    	fouEmpty = val.fouEmpty;//连续四个到10个空心包出现的次数
    	tenEmpty = val.tenEmpty;//连续10个以上的空心包出现的次数
    	fecRateUse = val.fecRateUse;//实际视频FEC比例
    	fecRateExp = val.fecRateExp;//期望视频FEC比例
    	bandwidth = val.bandwidth;//客观带宽
    	traffic = val.traffic;//流量
    	detectBandwidth = val.detectBandwidth;//探测带宽
    	networkType = val.networkType;///网络类型
		timeStamp = val.timeStamps;//记录时间戳
		lossRateOriginal = val.lossRateOriginals;//视频丢包率(万分之几)Fec前
		lossRateFEC = val.lossRateFECs;//视频丢包率Fec后
		lossRateFinal = val.lossRateFinals;//视频最终丢包率
		if(directionType == 1){
			lossRateOriginalCC = val.lossRateOriginalCCs;//整体视频丢包率(万分之几)Fec前
			lossRateFECCC = val.lossRateFECCCs;//整体视频丢包率Fec后
			lossRateFinalCC = val.lossRateFinalCCs;//整体视频最终丢包率
		}
		waitTime = val.waitTime; //视频等待时间,ms
		networkParam1 = val.networkParam1; //网络参数1，wifi:信号强度
		networkParam2 = val.networkParam2; //网络参数2, wifi:网络速率
		delayTimeIntArray = val.delayTimeIntArray;  //延迟时间数组
		maxCodeRate = val.maxCodeRate;    //最大值
		stableCodeRate = val.stableCodeRate; //稳定值
		systemType = val.systemType; // 会议系统 0 海军会诊系统
		deviceType = val.deviceType; // 硬件类型,硬件类型-1未知，1 pc，2 手机，3 N8，4 X1先这么定
		resourceId = val.resourceId;
		mediaType = val.mediaType; 
		speakerId = val.speakerId;
		reTranTimes = val.reTranTimes;
		mediaFormat = val.mediaFormat;
		inValidTimes = val.inValidTimes;
		if(mediaFormat==undefined||mediaFormat==null||mediaFormat===""){
			mediaFormat = "--";
		}
		if(inValidTimes==undefined||inValidTimes==null||inValidTimes===""){
			inValidTimes = "--";
		}
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
		if(userIp==undefined||userIp==null||userIp===""){
			gIpdescription = "--";
		}else{
			userIp = userIp.split(":")[0];
			if(userIp!==gIp){
				if(userIp === "255.255.255.255"){
					gIpdescription = userIp;
				}else{
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
		if(serverTimes==undefined||serverTimes==null||serverTimes===""){
			serverTimes = "--";
		}
		if(timeDescription===""){
			timeDescription = serverTimes + "/" + timeStamp;
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
			useInfoDescription = cpuRate + "/" + memRate + "/" + FrameRate ;
		}
		
		
		//视频FEC码率(期望/使用)
		if(expCodeRate==undefined||expCodeRate==null||expCodeRate===""){
			expCodeRate = "--";
		}
		if(curCodeRate==undefined||curCodeRate==null||curCodeRate===""){
			curCodeRate = "--";
		}
		if(videoCodeDescription===""){
			videoCodeDescription =  curCodeRate;
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
		
		
		//视频FEC比例(期望/使用)
		if(fecRateUse==undefined||fecRateUse==null||fecRateUse===""){
			fecRateUse = "--";
		}
		if(fecRateExp==undefined||fecRateExp==null||fecRateExp===""){
			fecRateExp = "--";
		}
		if(videoFecrateDescription===""){
			videoFecrateDescription = fecRateExp + "/" + fecRateUse;
		}

		//带宽信息(客观/实际)
		if(bandwidth==undefined||bandwidth==null||bandwidth===""){
			bandwidth = "--";
		}
		if(detectBandwidth==undefined||detectBandwidth==null||detectBandwidth===""){
			detectBandwidth = "--";
		}
		if(traffic==undefined||traffic==null||traffic===""){
			traffic = "--";
		}
		if(bandwidthInfoDescription===""){
			bandwidthInfoDescription = bandwidth + "/" + detectBandwidth + "/" + traffic;
		}
		
		//视频丢包率
		if(lossRateOriginal==undefined||lossRateOriginal==null||lossRateOriginal===""){
			lossRateOriginal = "--";
		}
		if(lossRateFEC==undefined||lossRateFEC==null||lossRateFEC===""){
			lossRateFEC = "--";
		}
		if(lossRateFinal==undefined||lossRateFinal==null||lossRateFinal===""){
			lossRateFinal = "--";
		}
		if(videoDescription===""){
			videoDescription = lossRateOriginal + "/" + lossRateFEC + "/" + lossRateFinal;
		}

		
		//视频整体丢包率
		if(lossRateOriginalCC==undefined||lossRateOriginalCC==null||lossRateOriginalCC===""){
			lossRateOriginalCC = "--";
		}
		if(lossRateFECCC==undefined||lossRateFECCC==null||lossRateFECCC===""){
			lossRateFECCC = "--";
		}
		if(lossRateFinalCC==undefined||lossRateFinalCC==null||lossRateFinalCC===""){
			lossRateFinalCC = "--";
		}
		if(finalVideoDescription===""){
			finalVideoDescription =lossRateOriginalCC + "/" + lossRateFECCC + "/" + lossRateFinalCC;
		}
		


		//等待时间/重发次数
		if(waitTime==undefined||waitTime==null||waitTime===""){
			waitTime = "--";
		}
		if(reTranTimes==undefined||reTranTimes==null||reTranTimes===""){
			reTranTimes = "--";
		}
		if(waitTimeDescription===""){
			waitTimeDescription = waitTime + "/" + reTranTimes;
		}
		
		//延迟时间
		 if(delayTimeIntArray==undefined||delayTimeIntArray==null||delayTimeIntArray===""){
			 delayTimeIntArray = "--";
		}
		
		//视频码率调整
		if(maxCodeRate==undefined||maxCodeRate==null||maxCodeRate===""){
			maxCodeRate = "--";
		}
		if(stableCodeRate==undefined||stableCodeRate==null||stableCodeRate===""){
			stableCodeRate = "--";
		}
		if(fixCodeRateDescription===""){
			fixCodeRateDescription = maxCodeRate + "/" + stableCodeRate;
		}
		
		if(deviceType==undefined||deviceType==null||deviceType===""){
			deviceType = "--";
		}else{
			deviceType = getDeviceType(deviceType);
		}
		

		if(resourceId==undefined||resourceId==null||resourceId===""){
			resourceId = "--";
		}
		if(mediaType==undefined||mediaType==null||mediaType===""){
			mediaType = "--";
		}else{
			mediaType = getMeidaType(mediaType);
		}
		if(resourceDescription ===""){
			resourceDescription = resourceId + "/" + mediaType;
		}
		html += "<tr class=\"list\">" +
		"<th scope=\"row\">" + (i+1) +"</th>" +
		//记录时间戳
		"<td title='" + timeStamp + "'>"+timeStamp+"</td>" +
		//记录设备类型
		"<td title='" + deviceType + "'>"+deviceType+"</td>" +
		//网络类型
		"<td title='" + networkType + "'>"+networkType+"</td>" +
		//用户IP
		"<td title='" + gIpdescription + "'>" + gIpdescription + "</td>" +
		//RelayId
		//"<td title='" + relayId + "'>" + relayId + "</td>" +
		//RelayIp
		"<td title='" + relayIp + "'>" + relayIp + "</td>" +
		//媒体ID/类型
		"<td title='" + resourceDescription + "'>" + resourceDescription + "</td>" +
		//丢包率(原/FEC/终)</th>" +
		"<td title='" + videoDescription + "'>" + videoDescription + "</td>" +
		//FEC比例(期望/使用)</th>" +
		"<td title='" + videoFecrateDescription + "'>" + videoFecrateDescription + "</td>" +
		//整体丢包率(原/FEC/终)</th>" +
		"<td title='" + finalVideoDescription + "'>" + finalVideoDescription + "</td>" +
		//分辨率</th>" +
		"<td title='" + mediaFormat + "'>" + mediaFormat + "</td>" +
		//码率(期望/实际)</th>" +
		"<td title='" + videoCodeDescription + "'>" + videoCodeDescription + "</td>" +
		//调整码率(最大/稳定)</th>" +
		"<td title='" + fixCodeRateDescription + "'>" + fixCodeRateDescription + "</td>" +
		//空音包信息(比例/1/2/3/4/10)</th>" +
		"<td title='" + emptyPacketInfoDescription + "'>" + emptyPacketInfoDescription + "</td>" +
		//带宽(客观/使用)</th>" +
		"<td title='" + bandwidthInfoDescription + "'>" + bandwidthInfoDescription + "</td>" +
		//使用信息(cpu/内存/帧率/延迟)</th>" +
		"<td title='" + useInfoDescription + "'>" + useInfoDescription + "</td>" +
		//等待时间/重发次数</th>" +
		"<td title='" + waitTimeDescription + "'>" + waitTimeDescription + "</td>" +
		//延迟时间</th>" +
		"<td title='" + delayTimeIntArray + "'>" + delayTimeIntArray + "</td>" +
		//补发无效次数（数据/校验包/数据包重发/校验包重发）</th>" +
		"<td title='" + inValidTimes + "'>" + inValidTimes + "</td>" +
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
			pages += "&nbsp;<a onclick=aaaMult("+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaaMult("+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=aaaMult("+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaaMult("+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=aaaMult("+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaaMult("+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=aaaMult("+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaaMult("+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
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
	
	
	if(directionType == 0){
		$("#lossPackageMultUp").html("");
		//$("#lossPackage0101Up").html(html);
		$("#lossPackageMultUp").html(html);
	}else if(directionType == 1){
		//$("#lossPackage0101Down").html(html);
		$("#lossPackageMultDown").html("");
		$("#lossPackageMultDown").html(html);
	}	
	
	sortables_init();
}

function aaaMult(directionType,currPage,pageSize){
	//console.info("aaaglist:"+glist);
	if(directionType == 0){
		showdata_lossPackageMult_dirction(glist1,directionType,currPage,pageSize);
	}
	else if(directionType == 1){
		showdata_lossPackageMult_dirction(glist2,directionType,currPage,pageSize);
	}
}

function showdata_LossPackageMultNew(data,func){
//	var html = "";
//	$("#lossPackageMultUp").html("");
//	$("#lossPackageMultDown").html("");
	$("#lossPackageMult_up_resourceId_100").html("");
	$("#lossPackageMult_up_resourceId_200").html("");
	$("#lossPackageMult_up_resourceId_300").html("");
	$("#lossPackageMult_down_resourceId_100").html("");
	$("#lossPackageMult_down_resourceId_200").html("");
	$("#lossPackageMult_down_resourceId_300").html("");
	var upList100 ;
	var upList200 ;
	var upList300 ;
	var downList100;
	var downList200;
	var downList300;
	var result = data.result;
	var list = data.items;
	
	var streamIds = data.mediaType;

	$.each(streamIds,function(k,streamId){
		if(streamId == 0){
			upList100 = new Array();
			downList100 = new Array();
//			$("#up_resourceId_100").show();
//			$("#down_resourceId_100").show();
		}
		if(streamId == 1){
			upList200 = new Array();
			downList200 = new Array();
//			$("#up_resourceId_200").show();
//			$("#down_resourceId_200").show();
		}
		if(streamId == 2){
			upList300 = new Array();
			downList300 = new Array();
//			$("#up_resourceId_300").show();
//			$("#down_resourceId_300").show();
		}
	});

	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		console.info(list.length);
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
					if(val.directionType == 0){
						if(val.mediaType == 0){
							upList100[upList100.length] = val;
						}
						if(val.mediaType == 1){
							upList200[upList200.length] = val;
						}
						if(val.mediaType == 2){
							upList300[upList300.length] = val;
						}
					}else if(val.directionType == 1){
						if(val.mediaType == 0){
							downList100[downList100.length] = val;
						}
						if(val.mediaType == 1){
							downList200[downList200.length] = val;
						}
						if(val.mediaType == 2){
							downList300[downList300.length] = val;
						}
					}
			}	
		});	
//		console.info("upList100:"+upList100.length);
//		console.info("upList200:"+upList200.length);
		if(upList100!=undefined&&upList100!=null&&upList100!==""&&upList100.length!=0){
			glist1 = upList100;
			showdata_lossPackageMult_resource(upList100,0,0,1,gpagesize);
		}else{
			$("#lossPackageMult_up_resourceId_100").html("无上行视频流数据<br/><br/><br/><br/><br/><br/>");
		}
		//console.info("ABCE");
		if(upList200!=undefined&&upList200!=null&&upList200!==""&&upList200.length!=0){
			//console.info("BBBBBUpList200:"+upList200.length);
			glist2 = upList200;
			showdata_lossPackageMult_resource(upList200,0,1,1,gpagesize);
		}else{
			$("#lossPackageMult_up_resourceId_200").html("无上行音频流数据<br/><br/><br/><br/><br/><br/>");
		}
		
		if(upList300!=undefined&&upList300!=null&&upList300!==""&&upList300.length!=0){
			glist3 = upList300;
			showdata_lossPackageMult_resource(upList300,0,2,1,gpagesize);
		}else{
			$("#lossPackageMult_up_resourceId_300").html("无上行文档流数据<br/><br/><br/><br/><br/><br/>");
		}
		//console.info("123456");
		if(downList100!=undefined&&downList100!=null&&downList100!==""&&downList100.length!=0){
			glist4 = downList100;
			showdata_lossPackageMult_resource(downList100,1,0,1,gpagesize);
		}else{
			$("#lossPackageMult_down_resourceId_100").html("无下行视频频流数据<br/><br/><br/><br/><br/><br/>");
		}
		if(downList200!=undefined&&downList200!=null&&downList200!==""&&downList200.length!=0){
			glist5 = downList200;
			showdata_lossPackageMult_resource(downList200,1,1,1,gpagesize);
		}else{
			$("#lossPackageMult_down_resourceId_200").html("无下行音频流数据<br/><br/><br/><br/><br/><br/>");
		}
		if(downList300!=undefined&&downList300!=null&&downList300!==""&&downList300.length!=0){
			glist6 = downList300;
			showdata_lossPackageMult_resource(downList300,1,2,1,gpagesize);
		}else{
			$("#lossPackageMult_down_resourceId_300").html("无下行文档流数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#lossPackageMult_up_resourceId_100").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMult_up_resourceId_200").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMult_up_resourceId_300").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMult_down_resourceId_100").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMult_down_resourceId_200").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#lossPackageMult_down_resourceId_300").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//			$("#lossPackageMultUp").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
//			$("#lossPackageMultDown").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("#lossPackageMult_up_resourceId_100").html("<center>只能查询相隔一周之内的数据</center>");
			$("#lossPackageMult_up_resourceId_200").html("<center>只能查询相隔一周之内的数据</center>");
			$("#lossPackageMult_up_resourceId_300").html("<center>只能查询相隔一周之内的数据</center>");
			$("#lossPackageMult_down_resourceId_100").html("<center>只能查询相隔一周之内的数据</center>");
			$("#lossPackageMult_down_resourceId_200").html("<center>只能查询相隔一周之内的数据</center>");
			$("#lossPackageMult_down_resourceId_300").html("<center>只能查询相隔一周之内的数据</center>");
			//$("lossPackageMultUp").html("<center>只能查询相隔一周之内的数据</center>");
			//$("lossPackageMultDown").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#lossPackageMult_up_resourceId_100").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMult_up_resourceId_200").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMult_up_resourceId_300").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMult_down_resourceId_100").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMult_down_resourceId_200").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#lossPackageMult_down_resourceId_300").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}else if(result == -1){
			$("#lossPackageMult_up_resourceId_100").html("<center>服务器查询出现异常</center>");
			$("#lossPackageMult_up_resourceId_200").html("<center>服务器查询出现异常</center>");
			$("#lossPackageMult_up_resourceId_300").html("<center>服务器查询出现异常</center>");
			$("#lossPackageMult_down_resourceId_100").html("<center>服务器查询出现异常</center>");
			$("#lossPackageMult_down_resourceId_200").html("<center>服务器查询出现异常</center>");
			$("#lossPackageMult_down_resourceId_300").html("<center>服务器查询出现异常</center>");
		}
	}
}

/**
 * 分页
 * 根据userId micId 传输方向展示该user在会议中的详细信息
 * @param list server返回的每一条item数据形成数组
 * @param micId 
 * @param directionType 传输方向
 */
function showdata_lossPackageMult_resource(list,directionType,mediaType,currPage,pageSize){
//	console.info("resourceId:"+resourceId);
	var flag = responsePagination(list,currPage,pageSize);
	var size;
	var lastPage;
	var html ="<div class='callerdetail_title'>用户ID："+list[0].userId+"   发言者ID："+list[0].speakerId+"</div>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		        + "<tr class=\"head\">" +
				"<th scope=\"col\" width='40px'>序号</th>" +
				"<th scope=\"col\" width='260px'>时间(服务器/客户端)</th>" +
				"<th scope=\"col\" width='50px'>设备类型</th>" +
				"<th scope=\"col\" width='75px'>网络(类型/wifi强度/wifi速率)</th>" +
				"<th scope=\"col\" width='135px'>用户IP</th>" +
				"<th scope=\"col\" width='135px'>RealyIp</th>"+
				"<th scope=\"col\" width='65px'>流ID</th>" +
				"<th scope=\"col\" width='105px'>丢包率(原/FEC/终)</th>"+
                "<th scope=\"col\" width='105px'>整体丢包率(原/FEC/终)</th>";
	if(directionType == 1){
		html += "<th scope=\"col\" width='40px'>detail</th>";
	}
	
                
    html +=     "<th scope=\"col\" width='65px'>FEC比例(期望/实际)</th>"+
                "<th scope=\"col\" width='75px'>分辨率</th>"+
                "<th scope=\"col\" width='55px'>码率</th>" +     
		        "<th scope=\"col\" width='60px'>直接调整码率(最大/稳定)</th>"+			
				"<th scope=\"col\" width='80px'>空音包信息(比例/1/2/3/4/10)</th>" +
				"<th scope=\"col\" width='100px'>带宽(客观/探测/使用)</th>" +
				"<th scope=\"col\" width='75px'>使用信息(cpu/内存/帧率)</th>" +
				"<th scope=\"col\" width='85px'>延迟时间</th>" +
				"<th scope=\"col\" width='42px'>等待时间/重发次数</th>" +
				"<th scope=\"col\" width='90px'>冗余份数(数据包:校验包|数据包重发:校验包重发)</th>" +
		"</tr>";
	var userId;
	var userIp;//用户IP
	var relayId;
	var relayIp;
	var cpuRate;//CPU使用率
	var FrameRate;//帧率
	var memRate;//内存使用率
	var lossRateOriginal;//视频丢包率(万分之几)Fec前
	var lossRateFEC;//视频丢包率Fec后
	var lossRateFinal;//视频最终丢包率
	var lossRateOriginalCC;//整体视频丢包率(万分之几)Fec前
	var lossRateFECCC;//整体视频丢包率Fec后
	var lossRateFinalCC;//整体视频最终丢包率
	var expCodeRate;//期望视频码率
	var curCodeRate;//实际视频码率
	var emptyPacketRate;//空音包比率(万分之几)
	var oneEmpty;//一个空心包出现的次数
	var twoEmpty;//连续两个空心包出现的次数
	var thrEmpty;//连续三个空心包出现的次数
	var fouEmpty;//连续四个到10个空心包出现的次数
	var tenEmpty;//连续10个以上的空心包出现的次数
	var timeStamp;//记录时间戳
	var fecRateExp;//期望视频FEC比例
	var fecRateUse;//实际视频FEC比例
	var bandwidth;//客观带宽
	var traffic;//流量
	var detectBandwidth;//探测带宽
	var networkType;//网络类型
	var waitTime; //视频等待时间,ms
	var networkParam1; //网络参数1，wifi:信号强度
	var networkParam2; //网络参数2, wifi:网络速率
	var delayTimeIntArray;  //延迟时间数组
	var maxCodeRate;    //最大值
	var stableCodeRate; //稳定值
	var systemType; // 会议系统 0 海军会诊系统
	var deviceType; // 硬件类型,硬件类型-1未知，1 pc，2 手机，3 N8，4 X1先这么定
	var resourceId;
	var mediaType; 
	var speakerId;
	var reTranTimes;
	var mediaFormat;
	var inValidTimes;
	var serverTimes;
	var keyLogId;
	var videoDescription;
	var videoFecrateDescription;
	var finalVideoDescription;
	var emptyPacketInfoDescription;
	var bandwidthInfoDescription;
	var useInfoDescription;
	var videoCodeDescription;
	var waitTimeDescription;
	var fixCodeRateDescription;
	var resourceDescription;
	var timeDescription;
	if(flag){
		size = currPage * pageSize;
		if(list.length % pageSize == 0){
			//结果集的长度是每页条目的整数倍，最后一页不加1
			lastPage = floatToint(list.length/pageSize);
			//console.info("aaaalastPage:"+lastPage);
		}else{
			lastPage = floatToint(list.length/pageSize) + 1;
			//console.info("bbbblastPage:"+lastPage);
		}
		
	}else{
		size = list.length;
	}
	for(var i = (currPage-1)*pageSize;i < size; i++){
	    //遍历清空
		val = list[i];
		videoDescription = "";
		videoFecrateDescription = "";
		finalVideoDescription = "";
		emptyPacketInfoDescription = "";
		bandwidthInfoDescription = "";
		useInfoDescription = "";
		videoCodeDescription = "";
		waitTimeDescription  = "";
		fixCodeRateDescription = "";
		resourceDescription ="";
		timeDescription = "";
		userId = val.userId;//
		userIp = val.userIp;//
        relayId = val.relayId;
        relayIp = val.relayIp;
        delayTime =val.delayTime;
        cpuRate = val.cpuRate;//CPU使用率
        FrameRate = val.FrameRate;//帧率
        memRate = val.memRate;//内存使用率
        expCodeRate = val.expCodeRate;//期望视频码率
        curCodeRate = val.curCodeRate;//实际视频码率
        emptyPacketRate = val.emptyPacketRates;//空音包比率(万分之几)
    	oneEmpty = val.oneEmpty;//一个空心包出现的次数
    	twoEmpty = val.twoEmpty;//连续两个空心包出现的次数
    	thrEmpty = val.thrEmpty;//连续三个空心包出现的次数
    	fouEmpty = val.fouEmpty;//连续四个到10个空心包出现的次数
    	tenEmpty = val.tenEmpty;//连续10个以上的空心包出现的次数
    	fecRateUse = val.fecRateUse;//实际视频FEC比例
    	fecRateExp = val.fecRateExp;//期望视频FEC比例
    	bandwidth = val.bandwidth;//客观带宽
    	traffic = val.traffic;//流量
    	detectBandwidth = val.detectBandwidth;//探测带宽
    	networkType = val.networkType;///网络类型
		timeStamp = val.timeStamps;//记录时间戳
		lossRateOriginal = val.lossRateOriginals;//视频丢包率(万分之几)Fec前
		lossRateFEC = val.lossRateFECs;//视频丢包率Fec后
		lossRateFinal = val.lossRateFinals;//视频最终丢包率
		if(directionType == 1){
			lossRateOriginalCC = val.lossRateOriginalCCs;//整体视频丢包率(万分之几)Fec前
			lossRateFECCC = val.lossRateFECCCs;//整体视频丢包率Fec后
			lossRateFinalCC = val.lossRateFinalCCs;//整体视频最终丢包率
		}
		waitTime = val.waitTime; //视频等待时间,ms
		networkParam1 = val.networkParam1; //网络参数1，wifi:信号强度
		networkParam2 = val.networkParam2; //网络参数2, wifi:网络速率
		delayTimeIntArray = val.delayTimeIntArray;  //延迟时间数组
		maxCodeRate = val.maxCodeRate;    //最大值
		stableCodeRate = val.stableCodeRate; //稳定值
		systemType = val.systemType; // 会议系统 0 海军会诊系统
		deviceType = val.deviceType; // 硬件类型,硬件类型-1未知，1 pc，2 手机，3 N8，4 X1先这么定
		resourceId = val.resourceId;
		mediaType = val.mediaType; 
		speakerId = val.speakerId;
		reTranTimes = val.reTranTimes;
		serverTimes = val.serverTimes;
		keyLogId    = val.keyLogId;
		if(mediaType == 0 || mediaType == 2){
			mediaFormat = val.mediaFormat;
		}
		inValidTimes = val.inValidTimes;
		if(mediaFormat==undefined||mediaFormat==null||mediaFormat===""){
			mediaFormat = "--";
		}
		if(inValidTimes==undefined||inValidTimes==null||inValidTimes===""){
			inValidTimes = "--";
		}
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
		if(userIp==undefined||userIp==null||userIp===""){
			gIpdescription = "--";
		}else{
			userIp = userIp.split(":")[0];
			if(userIp!==gIp){
				if(userIp === "255.255.255.255"){
					gIpdescription = userIp;
				}else{
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
		if(serverTimes==undefined||serverTimes==null||serverTimes===""){
			serverTimes = "--";
		}
		if(timeDescription===""){
			timeDescription = serverTimes + "/" + timeStamp;
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
			useInfoDescription = cpuRate + "/" + memRate + "/" + FrameRate ;
		}
		
		
		//视频FEC码率(期望/使用)
		if(expCodeRate==undefined||expCodeRate==null||expCodeRate===""){
			expCodeRate = "--";
		}
		if(curCodeRate==undefined||curCodeRate==null||curCodeRate===""){
			curCodeRate = "--";
		}
		if(videoCodeDescription===""){
			videoCodeDescription =  curCodeRate;
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
		
		
		//视频FEC比例(期望/使用)
		if(fecRateUse==undefined||fecRateUse==null||fecRateUse===""){
			fecRateUse = "--";
		}
		if(fecRateExp==undefined||fecRateExp==null||fecRateExp===""){
			fecRateExp = "--";
		}
		if(videoFecrateDescription===""){
			videoFecrateDescription = fecRateExp + "/" + fecRateUse;
		}

		//带宽信息(客观/实际)
		if(bandwidth==undefined||bandwidth==null||bandwidth===""){
			bandwidth = "--";
		}
		if(detectBandwidth==undefined||detectBandwidth==null||detectBandwidth===""){
			detectBandwidth = "--";
		}
		if(traffic==undefined||traffic==null||traffic===""){
			traffic = "--";
		}
		if(bandwidthInfoDescription===""){
			bandwidthInfoDescription = bandwidth + "/" + detectBandwidth + "/" + traffic;
		}
		
		//视频丢包率
		if(lossRateOriginal==undefined||lossRateOriginal==null||lossRateOriginal===""){
			lossRateOriginal = "--";
		}
		if(lossRateFEC==undefined||lossRateFEC==null||lossRateFEC===""){
			lossRateFEC = "--";
		}
		if(lossRateFinal==undefined||lossRateFinal==null||lossRateFinal===""){
			lossRateFinal = "--";
		}
		if(videoDescription===""){
			videoDescription = lossRateOriginal + "/" + lossRateFEC + "/" + lossRateFinal;
		}

		
		//视频整体丢包率
		if(lossRateOriginalCC==undefined||lossRateOriginalCC==null||lossRateOriginalCC===""){
			lossRateOriginalCC = "--";
		}
		if(lossRateFECCC==undefined||lossRateFECCC==null||lossRateFECCC===""){
			lossRateFECCC = "--";
		}
		if(lossRateFinalCC==undefined||lossRateFinalCC==null||lossRateFinalCC===""){
			lossRateFinalCC = "--";
		}
		if(finalVideoDescription===""){
			finalVideoDescription =lossRateOriginalCC + "/" + lossRateFECCC + "/" + lossRateFinalCC;
		}
		


		//等待时间/重发次数
		if(waitTime==undefined||waitTime==null||waitTime===""){
			waitTime = "--";
		}
		if(reTranTimes==undefined||reTranTimes==null||reTranTimes===""){
			reTranTimes = "--";
		}
		if(waitTimeDescription===""){
			waitTimeDescription = waitTime + "/" + reTranTimes;
		}
		
		var delayTimeIntArrayNext = "";
		//延迟时间
		 if(delayTimeIntArray==undefined||delayTimeIntArray==null||delayTimeIntArray===""){
			 delayTimeIntArray = "--";
			}
		 else{
				//var delayTime = new Array(); 
				var delayTime = delayTimeIntArray.split("|");
				if(delayTime[0] == "-1"){
					delayTimeIntArrayNext += "--" + "|";
				}else{
					delayTimeIntArrayNext += delayTime[0] + "|";
				}
				if(delayTime[1] == "-1"){
					delayTimeIntArrayNext += "--" + "|";
				}else{
					delayTimeIntArrayNext += delayTime[1] + "|";
				}
				if(delayTime[2] == "-1"){
					delayTimeIntArrayNext += "--" + "|";
				}else{
					delayTimeIntArrayNext += delayTime[2] + "|";
				}
				if(delayTime[3] == "-1"){
					delayTimeIntArrayNext += "--" + "|";
				}else{
					delayTimeIntArrayNext += delayTime[3] + "|";
				}
				if(delayTime[4] == "-1"){
					delayTimeIntArrayNext += "--";
				}else{
					delayTimeIntArrayNext += delayTime[4];
				}
				
			}
		
		//视频码率调整
		if(maxCodeRate==undefined||maxCodeRate==null||maxCodeRate===""){
			maxCodeRate = "--";
		}
		if(stableCodeRate==undefined||stableCodeRate==null||stableCodeRate===""){
			stableCodeRate = "--";
		}
		if(fixCodeRateDescription===""){
			fixCodeRateDescription = maxCodeRate + "/" + stableCodeRate;
		}
		
		if(deviceType==undefined||deviceType==null||deviceType===""){
			deviceType = "--";
		}else{
			deviceType = getDeviceType(deviceType);
		}
		

		if(resourceId==undefined||resourceId==null||resourceId===""){
			resourceId = "--";
		}
		var meidaTypeDescription;
		if(mediaType==undefined||mediaType==null||mediaType===""){
			meidaTypeDescription = "--";
		}else{
			meidaTypeDescription = getMeidaType(mediaType);
		}
		if(resourceDescription ===""){
			resourceDescription = resourceId + "/" + mediaType;
		}
		
		//策略id
//		if(keyLogId==undefined||keyLogId==null||keyLogId===""){
////			keyLogId = "--";
//			keyLogId = "20034711-62000155-62000155-1466758120-1";
//		}else{
//			
//		}
//		keyLogId = "80034914-62000155-62000155-1467099711-1";
		html += "<tr class=\"list\">" +
		"<th scope=\"row\">" + (i+1) +"</th>" +
		//记录时间戳
		"<td title='" + timeDescription + "'>"+timeDescription+"</td>" +
		//记录设备类型
		"<td title='" + deviceType + "'>"+deviceType+"</td>" +
		//网络类型
		"<td title='" + networkType + "'>"+networkType+"</td>" +
		//用户IP
		"<td title='" + gIpdescription + "'>" + gIpdescription + "</td>" +
		//RelayId
		//"<td title='" + relayId + "'>" + relayId + "</td>" +
		//RelayIp
		"<td title='" + relayIp + "'>" + relayIp + "</td>" +
		//媒体ID/类型
		"<td title='" + resourceId + "'>" + resourceId + "</td>" +
		//丢包率(原/FEC/终)</th>" +
		"<td title='" + videoDescription + "'>" + videoDescription + "</td>" +
		//整体丢包率(原/FEC/终)</th>" +
		"<td title='" + finalVideoDescription + "'>" + finalVideoDescription + "</td>";
		
		if(directionType == 1){
			if(keyLogId==undefined||keyLogId==null||keyLogId===""||keyLogId==0){
				keyLogId = "--";
				html += "<td title='" + keyLogId + "'>"+keyLogId+"</td>";
			}else{
				html += "<td title='" + keyLogId + "'><a onclick=openQosDialog('"+keyLogId+"') class='clickBackgroundColor1'><font style='color:#359E33'>日志</font>|</a></td>";
			}
		}
		
		//FEC比例(期望/使用)</th>" +
		html += "<td title='" + videoFecrateDescription + "'>" + videoFecrateDescription + "</td>"+
		//分辨率
		"<td title='" + mediaFormat + "'>" + mediaFormat + "</td>" +
		//码率(期望/实际)</th>" +
		"<td title='" + videoCodeDescription + "'>" + videoCodeDescription + "</td>" +
		//调整码率(最大/稳定)</th>" +
		"<td title='" + fixCodeRateDescription + "'>" + fixCodeRateDescription + "</td>" +
		//空音包信息(比例/1/2/3/4/10)</th>" +
		"<td title='" + emptyPacketInfoDescription + "'>" + emptyPacketInfoDescription + "</td>" +
		//带宽(客观/使用)</th>" +
		"<td title='" + bandwidthInfoDescription + "'>" + bandwidthInfoDescription + "</td>" +
		//使用信息(cpu/内存/帧率/延迟)</th>" +
		"<td title='" + useInfoDescription + "'>" + useInfoDescription + "</td>" +
		//延迟时间</th>" +
		"<td title='" + delayTimeIntArray + "'>" + delayTimeIntArrayNext + "</td>" +
		//等待时间/重发次数</th>" +
		"<td title='" + waitTimeDescription + "'>" + waitTimeDescription + "</td>" +
		//补发无效次数（数据/校验包/数据包重发/校验包重发）</th>" +
		"<td title='" + inValidTimes + "'>" + inValidTimes + "</td>" +
	"</tr>";
		delayTimeIntArrayNext = "";	
	//});
	}
	html += "</table>";
	var pages = "";
	//console.info("当前页："+currPage);
	if(flag){
		//继续分页
		if(currPage ==1){
			//第一页
			pages += "&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=fenyeMult("+directionType+","+mediaType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=fenyeMult("+directionType+","+mediaType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=fenyeMult("+directionType+","+mediaType+","+(currPage-1)+","+pageSize+")>上一页</a>";
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
	
	if(directionType == 0){
		if(mediaType == 0){
			$("#lossPackageMult_up_resourceId_100").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_up_resourceId_100").html(html);
		}
		if(mediaType ==1){
			$("#lossPackageMult_up_resourceId_200").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_up_resourceId_200").html(html);
		}
		if(mediaType == 2){
			$("#lossPackageMult_up_resourceId_300").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_up_resourceId_300").html(html);
		}
	}else if(directionType == 1){
		if(mediaType == 0){
			$("#lossPackageMult_down_resourceId_100").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_down_resourceId_100").html(html);
		}
		if(mediaType ==1){
			$("#lossPackageMult_down_resourceId_200").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_down_resourceId_200").html(html);
		}
		if(mediaType == 2){
			$("#lossPackageMult_down_resourceId_300").html("");
			//$("#lossPackage0101Up").html(html);
			$("#lossPackageMult_down_resourceId_300").html(html);
		}
	}	
	
	sortables_init();
}

function fenyeMult(directionType,resourceId,currPage,pageSize){
	//console.info("aaaglist:"+glist);
	if(directionType == 0){
		if(resourceId == 0){
			showdata_lossPackageMult_resource(glist1,directionType,resourceId,currPage,pageSize);
		}
		if(resourceId == 1){
			showdata_lossPackageMult_resource(glist2,directionType,resourceId,currPage,pageSize);
		}
		if(resourceId == 2){
			showdata_lossPackageMult_resource(glist3,directionType,resourceId,currPage,pageSize);
		}
	}
	else if(directionType == 1){
		if(resourceId == 0){
			showdata_lossPackageMult_resource(glist4,directionType,resourceId,currPage,pageSize);
		}
		if(resourceId == 1){
			showdata_lossPackageMult_resource(glist5,directionType,resourceId,currPage,pageSize);
		}
		if(resourceId == 2){
			showdata_lossPackageMult_resource(glist6,directionType,resourceId,currPage,pageSize);
		}
	}
}
//function GenerateFourthTab(list,directionType){
//	var html1 = "";
//	html1 += "<ul class='MultlossPackage_resourceId_tabs'>" ;
//	$.each(list,function(i,streamId){
//		if(directionType == 0)
//			html1 += "<li><a href='#up_"+streamId+"'>"+val+"</a></li>";
//		if(directionType ==1)
//			html1 += "<li><a href='#down_"+streamId+"'>"+val+"</a></li>";
//	});
//	html1 +="</ul>";
//	if(directionType == 0)
//		$("#lossPackageMult_resource_up_tab").html(html1);
//	if(directionType == 1)
//		$("#lossPackageMult_resource_up_tab").html(html1);
//	
//	var html2 = "";
//	$.each(streams,function(i,streamId){
//		if(directionType == 0)
//			html2 += "<div id='up_"+streamId+"'>";
//		if(directionType == 1)
//			html2 += "<div id='down_"+streamId+"'>";
//		html2 += "</div>";
//	});
//	if(directionType == 0)
//		$("#lossPackageMult_resource_up_view").html(htm2);
//	if(directionType == 1)
//		$("#lossPackageMult_resource_Down_view").html(htm2);	
//}

function openQosDialog(key) {
    window.open("QosDataPacketDetail.jsp?key="+key);
	jQuery(this).target = "_blank";
}
function getQosTableName(tableName){
	qosTableName = tableName;
}
