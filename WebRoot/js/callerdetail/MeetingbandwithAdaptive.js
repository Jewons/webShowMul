/* 通话详情callDetail.jsp页面中“丢包率信息”标签页面的JS效果 */

// 最外层四个子标签点击效果


var glistbandAda1;
var glistbandAda2;
var gpagesize = 100;
var gFunc;
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#MeetingbandwithAdaptiveContent > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.MeetingbandwithAdaptive_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.MeetingbandwithAdaptive_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// MIC1
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#MeetingbandwithAdaptive0101 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.MeetingbandwithAdaptive0101_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.MeetingbandwithAdaptive0101_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// MIC2
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#MeetingbandwithAdaptive0202 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.MeetingbandwithAdaptive0202_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.MeetingbandwithAdaptive0202_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});



function aboutBandAdpInfosubmit(userId,showType,micId,meetingId,currPage){
	//console.info("userId:"+userId+"meetingId:"+meetingId+"micId:"+micId+"showType:"+showType);
	//userId = '1';
	var pageSize = 25;
	$.ajax({
    		type : "post",
    		url : "search.aboutBandAdpInfo.action",
    		dataType : "json",
    		data : "userId=" + userId + "&meetingId=" + meetingId  + "&micId=" + micId + "&pageSize=" + pageSize
    		+"&currPage="+currPage,
    		beforeSend : function() {
    			$(".layer").show();
    			if(micId == '1'){
    				var pic = "<img src='images/losspackload.gif' align='middle' />";
    				$("#MeetingbandwithAdaptive0101Up_01").html(pic);
    				$("#MeetingbandwithAdaptive0101Down_01").html(pic);
    			}
    			if(micId == '2'){
    				var pic = "<img src='images/losspackload.gif'  align='middle' />";
    				$("#MeetingbandwithAdaptive0202Up_01").html(pic);
    				$("#MeetingbandwithAdaptive0202Down_01").html(pic);
    			}
    		},
    		complete : function() {
    			$(".layer").hide();
    		},
    		success : function(data) {
    			showdata(data, "aboutBandAdpInfosubmit",showType);
    		},
    		error : function(request, textStatus, errorThrown) {
    			if (request.status == 900) {
    				window.location.href = "login.jsp";
    			}
    		}
    	});
 }

function aboutBandAdpInfosubmitForRelay(relayIp,showType,micId,meetingId,currPage){
	//console.info("userId:"+userId+"meetingId:"+meetingId+"micId:"+micId+"showType:"+showType);
	//userId = '1';
	console.info("relayIp:"+relayIp);
	var pageSize = 25;
	$.ajax({
    		type : "post",
    		url : "search.aboutBandAdpInfoForRelay.action",
    		dataType : "json",
    		data : "relayIp=" + relayIp + "&meetingId=" + meetingId + "&micId=" + micId + "&pageSize=" + pageSize
    		+"&currPage="+currPage,
    		beforeSend : function() {
    			$(".layer").show();
    			if(micId == '1'){
    				var pic = "<img src='images/losspackload.gif' align='middle' />";
    				$("#MeetingbandwithAdaptive0101Up_01").html(pic);
    				$("#MeetingbandwithAdaptive0101Down_01").html(pic);
    			}
    			if(micId == '2'){
    				var pic = "<img src='images/losspackload.gif'  align='middle' />";
    				$("#MeetingbandwithAdaptive0202Up_01").html(pic);
    				$("#MeetingbandwithAdaptive0202Down_01").html(pic);
    			}
    		},
    		complete : function() {
    			$(".layer").hide();
    		},
    		success : function(data) {
    			showdata(data, "aboutBandAdpInfosubmitForRelay",showType);
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
function userIdTabView_BandAdpMic01(userIdList,meetingId,relayIdList){
	var html = "";
	html += "<div>" +
			"<ul class='MeetingbandwithAdaptive_tabs'>" ;
	var userIdListArr = userIdList.split(",");
	$.each(userIdListArr,function(i,val){
		html += "<li><a onclick=aboutBandAdpInfosubmit('"+val+"','bandAdp_mic1','1','"+meetingId+"','1')>"+val+"</a></li>";
	});
	var relayIdListArr = relayIdList.split(",");
	$.each(relayIdListArr,function(i,val){
		html += "<li><a onclick=aboutBandAdpInfosubmitForRelay('"+val+"','bandAdp_mic1','1','"+meetingId+"','1')>"+val+"</a></li>";
	});
	html += "</ul>" +
	"</div>";
	$("#MeetingbandwithAdaptive01_audio_tab").html(html);
}

/**
根据用户数动态产生mic2标签
* @param {} userIdList 用户列表
* @param {} meetingId  会议号
* @return {}
*/
function userIdTabView_BandAdpMic02(userIdList,meetingId,relayIdList){
	var html = "";
	html += "<div>" +
			"<ul class='MeetingbandwithAdaptive_tabs'>" ;
	var userIdListArr = userIdList.split(",");
	$.each(userIdListArr,function(i,val){
		html += "<li><a onclick=aboutBandAdpInfosubmit('"+val+"','bandAdp_mic2','2','"+meetingId+"','1')>"+val+"</a></li>";
	});
	var relayIdListArr = relayIdList.split(",");
	$.each(relayIdListArr,function(i,val){
		html += "<li><a onclick=aboutBandAdpInfosubmitForRelay('"+val+"','bandAdp_mic2','2','"+meetingId+"','1')>"+val+"</a></li>";
	});
	html += "</ul>" +
	"</div>";
	$("#MeetingbandwithAdaptive02_audio_tab").html(html);
}


function showdata_BandAdp_mic1(data,func){
	//console.info("showdata_BandAdp_mic1func:"+func);
	var html = "";
	$("#MeetingbandwithAdaptive0101Up_01").html(html);
	$("#MeetingbandwithAdaptive0101Down_01").html(html);
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
			glistbandAda1 = upList;
			showdata_BandAdp_mic_dirction(upList,1,0,1,gpagesize,func);
			//showdata_lossPackage_mic_dirction(upList,1,0);
		}else{
			$("#MeetingbandwithAdaptive0101Up_01").html("无上行数据<br/><br/><br/><br/><br/><br/>");
		}
		
		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
			glistbandAda2 = downList;
		    showdata_BandAdp_mic_dirction(downList,1,1,1,gpagesize,func);
			//showdata_lossPackage_mic_dirction(downList,1,1);
			
		}
		else{
			$("#MeetingbandwithAdaptive0101Down_01").html("无下行数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#MeetingbandwithAdaptive0101Up_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#MeetingbandwithAdaptive0101Down_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("MeetingbandwithAdaptive0101Up_01").html("<center>只能查询相隔一周之内的数据</center>");
			$("MeetingbandwithAdaptive0101Down_01").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#MeetingbandwithAdaptive0101Up_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#MeetingbandwithAdaptive0101Down_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}
function showdata_BandAdp_mic2(data,func){
	//console.info("showdata_BandAdp_mic2func:"+func);
	var html = "";
	$("#MeetingbandwithAdaptive0202Up_01").html(html);
	$("#MeetingbandwithAdaptive0202Down_01").html(html);
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
			glistbandAda1 = upList;
			showdata_BandAdp_mic_dirction(upList,2,0,1,gpagesize,func);
		}else{
			$("#MeetingbandwithAdaptive0202Up_01").html("无上行数据<br/><br/><br/><br/><br/><br/>");
		}
		
		if(downList!=undefined&&downList!=null&&downList!==""&&downList.length!=0){
			glistbandAda2 = downList;
			showdata_BandAdp_mic_dirction(downList,2,1,1,gpagesize,func);
		}
		else{
			$("#MeetingbandwithAdaptive0202Down_01").html("无下行数据<br/><br/><br/><br/><br/><br/>");
		}
	} else {
		if (result == 2) {
			$("#MeetingbandwithAdaptive0202Up_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#MeetingbandwithAdaptive0202Down_01").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("MeetingbandwithAdaptive0202Up_01").html("<center>只能查询相隔一周之内的数据</center>");
			$("MeetingbandwithAdaptive0202Down_01").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#MeetingbandwithAdaptive0202Up_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#MeetingbandwithAdaptive0202Down_01").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}


/**
 * 根据userId micId 传输方向展示该user在会议中的详细信息
 * @param list server返回的每一条item数据形成数组
 * @param micId 
 * @param directionType 传输方向
 */
function showdata_BandAdp_mic_dirction(list,micId, directionType,currPage,pageSize,func){
	//console.info("showdata_BandAdp_mic_dirctionfunc:"+func);
	//console.info("micId:"+micId+"directionType:"+directionType);
	gFunc = func;
	var flag = responsePagination(list,currPage,pageSize);
	var size;
	var lastPage;
	var html = "";
	if(func==="aboutBandAdpInfosubmit"){
		html ="<div class='callerdetail_title'>用户ID："+list[0].userId+"&nbsp;&nbsp;&nbsp;&nbsp;用户IP地址："+list[0].userIp+"</div>";
	}else if(func==="aboutBandAdpInfosubmitForRelay"){
		html ="<div class='callerdetail_title'>relay IP地址："+list[0].relayIp+"</div>";
	}
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		        + "<tr class=\"head\">" +
				"<th scope=\"col\" width='40px'>序号</th>" +
				"<th scope=\"col\" width='150px'>时间</th>" ;
				//"<th scope=\"col\" width='100px'>用户IP</th>" +
				//"<th scope=\"col\" width='70px'>RealyId</th>" +
				if(func === "aboutBandAdpInfosubmit"){
					html += "<th scope=\"col\" width='150px'>RealyIp</th>";
				}else if(func === "aboutBandAdpInfosubmitForRelay"){
					html += "<th scope=\"col\" width='150px'>userId</th>";
				}
				
				html +="<th scope=\"col\" width='700px'>关键事件描述</th>" +	
		"</tr>";
	var userId;
	var userIp;//用户IP
	var relayId;
	var relayIp;
	var bandInfo;

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
		
		userId = val.userId;//
		userIp = val.userIp;//
        relayId = val.relayId;
        relayIp = val.relayIp;
		timeStamp = val.timeStamp;//记录时间戳
		bandInfo = val.bandInfo;
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
		if(timeStamp==undefined||timeStamp==null||timeStamp===""){
			timeStamp = "--";
		}
		if(bandInfo==undefined||bandInfo==null||bandInfo===""){
			bandInfo = "--";
		}
		
		
		html += "<tr class=\"list4\">" +
		"<th scope=\"row\">" + (i+1) +"</th>" +
		//记录时间戳
		"<td title='" + timeStamp + "'>"+timeStamp+"</td>" ;
		//用户IP
		//"<td title='" + userIp + "'>" + userIp + "</td>" +
		//RelayId
		//"<td title='" + relayId + "'>" + relayId + "</td>" +
		//RelayIp
		if(func === "aboutBandAdpInfosubmit"){
			html += "<td title='" + relayIp + "'>" + relayIp + "</td>";	
		}else if(func === "aboutBandAdpInfosubmitForRelay"){
			html += "<td title='" + userId + "'>" + userId + "</td>";
		}
		//关键事件描述
		 html += "<td title='" + bandInfo + "'>" + bandInfo + "</td>" +
	"</tr>";
				
	//});
	}
	html += "</table>";
	var pages = "";
	//console.info("当前页："+currPage);
	console.info("func:"+func);
	var funcType = func;
	if(flag){
		//继续分页
		if(currPage ==1){
			//第一页
			pages += "&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=aaa_BandAdp("+micId+","+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=aaa_BandAdp("+micId+","+directionType+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa_BandAdp("+micId+","+directionType+","+(currPage-1)+","+pageSize+")>上一页</a>";
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
	//console.info("html:"+html);
	
	if(micId == 1){
		if(directionType == 0){
			$("#MeetingbandwithAdaptive0101Up_01").html("");
			$("#MeetingbandwithAdaptive0101Up_01").html(html);
		}else if(directionType == 1){
			$("#MeetingbandwithAdaptive0101Down_01").html("");
			$("#MeetingbandwithAdaptive0101Down_01").html(html);
		}	
	}
	if(micId == 2){
		if(directionType == 0){
			$("#MeetingbandwithAdaptive0202Up_01").html("");
			$("#MeetingbandwithAdaptive0202Up_01").html(html);
		}else if(directionType == 1){
			$("#MeetingbandwithAdaptive0202Down_01").html("");
			$("#MeetingbandwithAdaptive0202Down_01").html(html);
		}	
	}
	sortables_init();
}

function aaa_BandAdp(micId,directionType,currPage,pageSize){
	//console.info("aaaglist:"+glist);
	console.info("aaa_BandAdpfunc:"+gFunc);
	if(directionType == 0){
		showdata_BandAdp_mic_dirction(glistbandAda1,micId,directionType,currPage,pageSize,gFunc);
	}
	else if(directionType == 1){
		showdata_BandAdp_mic_dirction(glistbandAda2,micId,directionType,currPage,pageSize,gFunc);
	}
}

