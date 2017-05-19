/**
 *数据包页面packageDetail.jsp的JS文件 
 */
var ghtml ="";
var index =0;
$(document).ready(function(){
	ghtml = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='40px'>方向</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='200px'>包信息</th>" +
	"</tr>";
});
/**
 * 顶部固定信息
 * 
 * @param {}
 * 
 */

function packageDetail_summaryView(meetingId,speakerId,micId,timeStamp,frameId,framePiece,realPiece,topoInfo) {
	
	// 空值校验
	var senderid = topoInfo.split("_")[0];
	var receiverid = topoInfo.split("_")[1];
	//console.info("topoInfo:"+topoInfo);
	if (framePiece == undefined || framePiece == null || framePiece === "" || framePiece ==="--") {
		framePiece = "无";
	}
	if (realPiece == undefined || realPiece == null || realPiece === "" || realPiece ==="--") {
		realPiece = "无";
	}
	if (receiverid == undefined || receiverid == null || receiverid === "" || receiverid ==="--") {
		receiverid = "无";
	}
	
	var html = "<span class='summaryStyle'>会议号：</span>" + meetingId
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>时间：</span>" + timeStampsFormat(timeStamp)
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>MICID：</span>" + micId
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>发言者ID：</span>" + speakerId
				+"&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>发送者ID：</span>" + senderid
				+"&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>接收者ID：</span>" + receiverid
				+"&nbsp;&nbsp;&nbsp;&nbsp;"
				+"<span class='summaryStyle'>帧ID：</span>" + frameId
				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>帧内应有包数：</span>" + framePiece
				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
				"<span class='summaryStyle'>实际收到包数：</span>" + realPiece
				+"&nbsp;&nbsp;&nbsp;&nbsp;";
	$('#packagedetail_summary').html(html);
}
function getPackageDetail(meetingId,speakerId,micId,timeStamp,topoInfo){
	console.info("meetingId:"+meetingId+"speakerId:"+speakerId+"micId:"+micId+"timeStamp:"+timeStamp+"topoInfo:"+topoInfo);
	var showType = "framePacketInfo";
	$.ajax({
		type : "post",
		url : "packdetail.aboutTimeStamp.action",
		dataType : "json",
		data : "speakerId="+speakerId+"&meetingId="+meetingId+"&micId="+micId+"&timeStamp="+timeStamp+"&topoInfo="+topoInfo,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutTimeStamp",showType);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function getResendReqConmandDetail(meetingId,speakerId,micId,timeStamp,topoInfo){
	var showType = "resendReqConmand";
	$.ajax({
		type : "post",
		url : "packdetail.aboutResendReqConmandTimeStamp.action",
		dataType : "json",
		data : "speakerId="+speakerId+"&meetingId="+meetingId+"&micId="+micId+"&timeStamp="+timeStamp+"&topoInfo="+topoInfo,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutResendReqConmandTimeStamp",showType);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function showdata_packageDetail(data,func){
	console.info("data:"+data);
}


function showdata_packageDetail_packetInfo(data,func){
	console.info("showdata_packageDetail_packetInfo");
	index =0;
	var html ="";
	var result = data.result;
	var list = data.items;
	var frameid;//帧号
	var recvtime;//帧接收时间
	var senderid;//发送者编号
	var receiverid;//接收者编号
	var direction;//0接收，1发送
	var packettype;//data 或 check
	var fecgroupid;//组编号
	var fecrateFEC;//比例
	var fecgroupinnerid;//FEC组内编号
	var time;//包接收时间
	var frameInnerId;//帧内编号
	var index;//数据包序号
	var mideatype;//0视频，1音频
	var directionDescription;//接收描述
	var packageInfoDescription;
	var mideatypeDescription;
	var packettypeDescription;
	var senderIdArr = new Array();
	var receiverIdArr = new Array();
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		/*html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		    + "<tr class=\"head\">" +
			"<th scope=\"col\" width='40px'>序号</th>" +
			"<th scope=\"col\" width='40px'>方向</th>" +
			"<th scope=\"col\" width='130px'>时间戳</th>" +
			"<th scope=\"col\" width='200px'>包信息</th>" +
		"</tr>";*/
		$.each(list,function(i,val){
			packageInfoDescription ="";
			directionDescription ="";
			mideatypeDescription = "";
			packettypeDescription ="";
			frameid = val.frameid;
			recvtime = val.recvtimes;//帧接收时间
			senderid = val.senderid;//发送者编号
			receiverid = val.receiverid;//接收者编号
			direction = val.direction;//0接收，1发送
			packettype =val.packettype;//data 或 check
			fecgroupid = val.fecgroupid;//组编号
			fecrateFEC = val.fecrateFEC;//比例
			fecgroupinnerid = val.fecgroupinnerid;//FEC组内编号
			time = val.times;//包接收时间
			frameInnerId = val.frameInnerId;//帧内编号
			index = val.index;//数据包序号
			mideatype = val.mideatype;//0视频，1音频
			
			if(frameid==undefined||frameid==null||frameid===""){
				frameid = "--";
			}
			if(recvtime==undefined||recvtime==null||recvtime===""){
				recvtime = "--";
			}
			if(senderid==undefined||senderid==null||senderid===""){
				senderid = "--";
			}
			if(receiverid==undefined||receiverid==null||receiverid===""){
				receiverid = "--";
			}
			if(direction==undefined||direction==null||direction===""){
				directionDescription = "--";
			}
			else{
				directionDescription = showType("direct",direction);
			}
			if(packettype==undefined||packettype==null||packettype===""){
				packettype = "--";
			}
//			else{
//				packettypeDescription = showType("packet",packettype);
//			}
			if(fecgroupid==undefined||fecgroupid==null||fecgroupid===""){
				fecgroupid = "--";
			}
			if(fecrateFEC==undefined||fecrateFEC==null||fecrateFEC===""){
				fecrateFEC = "--";
			}
			if(fecgroupinnerid==undefined||fecgroupinnerid==null||fecgroupinnerid===""){
				fecgroupinnerid = "--";
			}
			if(time==undefined||time==null||time===""){
				time = "--";
			}
			if(frameInnerId==undefined||frameInnerId==null||frameInnerId===""){
				frameInnerId = "--";
			}
			if(index==undefined||index==null||index===""){
				index = "--";
			}
			if(mideatype==undefined||mideatype==null||mideatype===""){
				mideatypeDescription = "--";
			}else{
				mideatypeDescription = showType("media",mideatype);
			}
			
			packageInfoDescription = "包序号："+index+"&nbsp;&nbsp;&nbsp;帧内编号："+frameInnerId+"&nbsp;&nbsp;&nbsp;包类型：【"+mideatypeDescription+"&nbsp;&nbsp;&nbsp;"+ packettype + "】&nbsp;&nbsp;&nbsp;fec组号："+fecgroupid+"&nbsp;&nbsp;&nbsp;FEC比例："+fecrateFEC+"&nbsp;&nbsp;&nbsp;FEC组内ID"+fecgroupinnerid
			+ "&nbsp;&nbsp;&nbsp;远端时间："+recvtime + "&nbsp;&nbsp;&nbsp;接收时间："+time;
			
			//html += "<tr class=\"list3\">" +
			ghtml += "<tr class=\"list3\">" +
			"<th scope=\"row\">" + (i+1) +"</th>" +
			//传输方向
			"<td title='" + directionDescription+"'>" + directionDescription+"</td>" +
			//记录时间戳
			"<td title='" + time + "'>"+time+"</td>" +
			//包信息
			"<td title='" + packageInfoDescription + "'>"+packageInfoDescription+"</td>"+				
		"</tr>";
			if(direction == 0){
				receiverIdArr.push(packageInfoDescription);
			}else if(direction == 1){
				senderIdArr.push(packageInfoDescription);
			}
			index = i+1;
		});
		
	}
	ghtml += "</table>";
	$("#packagedetaillist").html(ghtml);
	sortables_init();
	
	
}

function showdata_packageDetail_resendReqConmand(data,func){
	var html ="";	
	var packetrtt;//数据包传输的双向时延
	var packetrto;//包补发的超时时间
	var packetmaxrto;//包补发的最大时间
	var packetmaxtimes;
	var direction;//0接收，1发送
	var framertt;
	var framerto;
	var framemaxtimes;
	var frameinnerrto;
	var time;//包接收时间
	var recvtime;
	var dataPacketList;
	var checkPacketList;
	var frameList;
	var directionDescription;//接收描述
	var result = data.result;
	var list = data.items;
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		var resendReqConmandDescription ="";
		html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">";
		$.each(list,function(i,val){
			time =val.times;
			recvtime = val.recetimes;
			packetrtt = val.packetrtt;
			packetrto = val.packetrto;
			packetmaxrto = val.packetmaxrto;//包补发的最大时间
			packetmaxtimes = val.packetmaxtimes;
			direction = val.direction;//0接收，1发送
			framertt = val.framertt;
			framerto = val.framerto;
			framemaxtimes = val.framemaxtimes;
			frameinnerrto = val.frameinnerrto;
			dataPacketList = val.dataPacketList;
			checkPacketList = val.checkPacketList;
			frameList = val.frameList;
			if(recvtime==undefined||recvtime==null||recvtime===""){
				recvtime = "--";
			}
			if(time==undefined||time==null||time===""){
				time = "--";
			}
			if(packetrtt==undefined||packetrtt==null||packetrtt===""){
				packetrtt = "--";
			}
			if(packetrto==undefined||packetrto==null||packetrto===""){
				packetrto = "--";
			}
			if(packetmaxrto==undefined||packetmaxrto==null||packetmaxrto===""){
				packetmaxrto = "--";
			}
			if(packetmaxtimes==undefined||packetmaxtimes==null||packetmaxtimes===""){
				packetmaxtimes = "--";
			}
			if(framertt==undefined||framertt==null||framertt===""){
				framertt = "--";
			}
			if(framerto==undefined||framerto==null||framerto===""){
				framerto = "--";
			}
			if(framemaxtimes==undefined||framemaxtimes==null||framemaxtimes===""){
				framemaxtimes = "--";
			}
			if(frameinnerrto==undefined||frameinnerrto==null||frameinnerrto===""){
				frameinnerrto = "--";
			}
			if(direction==undefined||direction==null||direction===""){
				directionDescription = "--";
			}
			else{
				directionDescription = showType("direct",direction);
			}
			if(dataPacketList==undefined||dataPacketList==null||dataPacketList===""){
				dataPacketList = "--";
			}
			if(checkPacketList==undefined||checkPacketList==null||checkPacketList===""){
				checkPacketList = "--";
			}
			if(frameList==undefined||frameList==null||frameList===""){
				frameList = "--";
			}
			resendReqConmandDescription = "packetrtt："+packetrtt+"&nbsp;&nbsp;&nbsp;packetrto："+packetrto
			+"&nbsp;&nbsp;&nbsp;packetmaxrto"+packetmaxrto+"&nbsp;&nbsp;&nbsp;packetmaxtimes："+packetmaxtimes
			+"&nbsp;&nbsp;&nbsp;framertt："+framertt+"&nbsp;&nbsp;&nbsp;framerto："+framerto+"&nbsp;&nbsp;&nbsp;framemaxtimes："
			+framemaxtimes+"&nbsp;&nbsp;&nbsp;frameinnerrto："+frameinnerrto+"&nbsp;&nbsp;&nbsp;补发数据包列表：【"
			+listToArrDescription(dataPacketList)+"】&nbsp;&nbsp;&nbsp;补发校验包列表：【"+listToArrDescription(checkPacketList)
			+"】&nbsp;&nbsp;&nbsp;帧内补发列表：【"+listToArrDescription(frameList)+"】";
			//html += "<tr class=\"list3\">" +
			ghtml += "<tr class=\"list4\">" +
			"<th scope=\"row\">" + (i+1) +"</th>" +
			//传输方向
			"<td title='" + directionDescription+"'>" + directionDescription+"</td>" +
			//记录时间戳
			"<td title='" + time + "'>"+time+"</td>" +
			//包信息
			"<td title='" + resendReqConmandDescription + "'>"+resendReqConmandDescription+"</td>"+				
		"</tr>";
		});
	}
	ghtml += "</table>";
	$("#packagedetaillist").html(ghtml);
	sortables_init();
}




function showType(type,val){
	var map = new Map();
	if("direct" == type){
		map.put("1","接收");
		map.put("0","发送");
	}
	if("media" == type){
		map.put("0","视频");
		map.put("1","音频");
	}
//	if("packet" == type){
//		map.put("0","data");
//		map.put("1","check");
//	}
	if(isNaN(val)==false){//判断是不是数字
		if(val!=undefined&&val!=null&&val!==""){
			return map.get(val);
		}
	}else{
		return "非数值类型，无法处理";
	}
}

function listToArrDescription(list){
	if(list==undefined||list==null||list===""){
		list =="--";
	}else{
		var arr = list.split("_");
		if(arr!=null&&arr!=undefined){
			list ="";
			$.each(arr,function(i,val){
				if(i!=arr.length-1){
					list += val + " "; 
				}else{
					list += val;
				}
			});
		}
	}
	return list;
}

