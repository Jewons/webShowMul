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
 *//*
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
}*/


var end = 0;
/**
 * 显示查询结果 TODO
 * @param {} data 数据
 * @param {} func　函数名
 * @param {} mainid　页面上显示的位置
 */
function showdata(data, func, mainid) {
	//console.info("分页数据:"+data);
    
	//清空原数据
	$('#'+mainid).html("");
	
	var result = data.result;
	var list = data.items;
	var userIdList;
	var relayIdList;
	var pageSize = data.pageSize;
	var currPage = data.currPage;
	var count = data.count;//符合查询条件的记录数
	var length ;
	var meetingId;//会议ID
	var endTime;//会议结束时间
	var duration;//会议持续时间
	var userCount;//参会人数
	var upLossVideoMic1;//上行mic1视频平均丢包率
	var downLossVideoMic1;//下行mic1视频平均丢包率
	var upLossVideoMic2;//上行mic2视频平均丢包率
	var downLossVideoMic2;//下行mic2视频平均丢包率
	var upLossVideoEFCMic1;//上行mic1视频解FEC后平均丢包率
	var downLossVideoEFCMic1;//下行mic1视频解FEC后平均丢包率
	var upLossVideoEFCMic2;//上行mic2视频解FEC后平均丢包率
	var downLossVideoEFCMic2;//下行mic2视频解FEC后平均丢包率
	var upLossAudioMic1;//上行mic1音频平均丢包率
	var downLossAudioMic1;//下行mic1音频平均丢包率
	var upLossAudioMic2;//上行mic2音频平均丢包率
	var downLossAudioMic2;//下行mic2音频平均丢包率
	var upLossAudioEFCMic1;//上行mic1音频解FEC后平均丢包率
	var downLossAudioEFCMic1;//下行mic1音频解FEC后平均丢包率
	var upLossAudioEFCMic2;//上行mic2音频解FEC后平均丢包率
	var downLossAudioEFCMic2;//下行mic2音频解FEC后平均丢包率
	var upLossVideoMic1Description;//上行mic1视频丢包率的title描述
	var upLossAudioMic1Description;//上行mic1音频丢包率的title描述
	var upLossVideoMic2Description;//上行mic2视频丢包率的title描述
	var upLossAudioMic2Description;//上行mic2音频丢包率的title描述
	var downLossVideoMic1Description;//下行mic1视频丢包率的title描述
	var downLossAudioMic1Description;//下行mic1音频丢包率的title描述
	var downLossVideoMic2Description;//下行mic2视频丢包率的title描述
	var downLossAudioMic2Description;//下行mic2音频丢包率的title描述
	var durationDescription;//会议持续时间描述
	
	//8.5新增
	var upLossVideoFinalMic1;//上行mic1视频最终丢包率
	var downLossVideoFinalMic1;//下行mic1视频最终丢包率
	var upLossVideoFinalMic2;//上行mic2视频最终丢包率
	var downLossVideoFinalMic2;//下行mic2视频最终丢包率
	var upLossAudioFinalMic1;//上行mic1音频最终丢包率
	var downLossAudioFinalMic1;//下行mic1音频最终丢包率
	var upLossAudioFinalMic2;//上行mic2音频最终丢包率
	var downLossAudioFinalMic2;//下行mic2音频最终丢包率
	var lossVideoMic1CC;//下行mic1视频整体原始丢包率
	var lossVideoEFCMic1CC;//下行mic1视频整体FEC后丢包率
	var lossVideoMic1FinalCC;//下行mic1视频整体最终丢包率
	var lossVideoMic2CC;//下行mic2视频整体原始丢包率
	var lossVideoEFCMic2CC;//下行mic2视频整体FEC后丢包率
	var lossVideoMic2FinalCC;//下行mic2视频整体最终丢包率
	var lossAudioMic1CC;//下行mic1音频整体原始丢包率
	var lossAudioEFCMic1CC;//下行mic1音频整体FEC后丢包率
	var lossAudioMic1FinalCC;//下行mic1音频整体最终丢包率
	var lossAudioMic2CC;//下行mic2音频整体原始丢包率
	var lossAudioEFCMic2CC;//下行mic2音频整体FEC后丢包率
	var lossAudioMic2FinalCC;//下行mic2音频整体最终丢包率
	var lossVideoMic1Description;//MIC1视频整体丢包率描述
	var lossVideoMic2Description;//MIC2视频整体丢包率描述
	var lossAudioMic1Description;//MIC1音频整体丢包率描述
	var lossAudioMic2Description;//MIC2音频整体丢包率描述
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
				+ "<tr class=\"head\">" +
						"<th scope=\"col\" width='40px'>序号</th>" +
						"<th scope=\"col\" width='70px'>会议号</th>" +
						//"<th scope=\"col\" width='100px'>持续时间</th>" +
						"<th scope=\"col\" width='50px'>人数</th>" +
						"<th scope=\"col\" width='70px'>用户列表</th>" +
						"<th scope=\"col\" width='70px'>relay列表</th>" +
						"<th scope=\"col\" width='70px'>上行mic1V丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>上行mic1A丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>上行mic2V丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>上行mic2A丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>下行mic1V丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>下行mic1A丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>下行mic2V丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>下行mic2A丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>mic1V整体丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>mic1A整体丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>mic2V整体丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='70px'>mic2A整体丢包率(原/fec/终)</th>" +
						"<th scope=\"col\" width='150px'>会议开始时间</th>" +
						"<th scope=\"col\" colspan='1' width='50px'></th>" +
				"</tr>";
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
				    //每次循环都要先置空
				    userIdListDescription        = "";
				    relayIdListDescription       = "";
				    upLossVideoMic1Description   = "";
				    upLossAudioMic1Description   = "";
					upLossVideoMic2Description   = "";
					upLossAudioMic2Description   = "";
					downLossVideoMic1Description = "";
					downLossAudioMic1Description = "";
					downLossVideoMic2Description = "";
					downLossAudioMic2Description = "";
					
					//8.25新增
					lossVideoMic1Description     = "";
					lossVideoMic2Description     = "";
					lossAudioMic1Description     = "";
					lossAudioMic2Description     = "";
					
					meetingId            = val.meetingId;//会议ID
					endTime              = val.timeStamps;//会议结束时间
					duration             = val.duration;//会议持续时间
					userCount            = val.userCount;
					upLossVideoMic1      = val.upLossVideoMic1DTO;//上行mic1视频平均丢包率
					downLossVideoMic1    = val.downLossVideoMic1DTO;//下行mic1视频平均丢包率
					upLossVideoMic2      = val.upLossVideoMic2DTO;//上行mic2视频平均丢包率
					downLossVideoMic2    = val.downLossVideoMic2DTO;//下行mic2视频平均丢包率
					upLossVideoEFCMic1   = val.upLossVideoEFCMic1DTO;//上行mic1视频解FEC后平均丢包率
					downLossVideoEFCMic1 = val.downLossVideoEFCMic1DTO;//下行mic1视频解FEC后平均丢包率
					upLossVideoEFCMic2   = val.upLossVideoEFCMic2DTO;//上行mic2视频解FEC后平均丢包率
					downLossVideoEFCMic2 = val.downLossVideoEFCMic2DTO;//下行mic2视频解FEC后平均丢包率
					upLossAudioMic1      = val.upLossAudioMic1DTO;//上行mic1音频平均丢包率
					downLossAudioMic1    = val.downLossAudioMic1DTO;//下行mic1音频平均丢包率
					upLossAudioMic2      = val.upLossAudioMic2DTO;//上行mic2音频平均丢包率
					downLossAudioMic2    = val.downLossAudioMic2DTO;//下行mic2音频平均丢包率
					upLossAudioEFCMic1   = val.upLossAudioEFCMic1DTO;//上行mic1音频解FEC后平均丢包率
					downLossAudioEFCMic1 = val.downLossAudioEFCMic1DTO;//下行mic1音频解FEC后平均丢包率
					upLossAudioEFCMic2   = val.upLossAudioEFCMic2DTO;//上行mic2音频解FEC后平均丢包率
					downLossAudioEFCMic2 = val.downLossAudioEFCMic2DTO;//下行mic2音频解FEC后平均丢包率
					
					//8.5新增
					upLossVideoFinalMic1   = val.upLossVideoFinalMic1DTO;//上行mic1视频最终丢包率
					downLossVideoFinalMic1 = val.downLossVideoFinalMic1DTO;//下行mic1视频最终丢包率
					upLossVideoFinalMic2   = val.upLossVideoFinalMic2DTO;//上行mic2视频最终丢包率
					downLossVideoFinalMic2 = val.downLossVideoFinalMic2DTO;//下行mic2视频最终丢包率
					upLossAudioFinalMic1   = val.upLossAudioFinalMic1DTO;//上行mic1音频最终丢包率
					downLossAudioFinalMic1 =val.downLossAudioFinalMic1DTO;//下行mic1音频最终丢包率
					upLossAudioFinalMic2   = val.upLossAudioFinalMic2DTO;//上行mic2音频最终丢包率
					downLossAudioFinalMic2 = val.downLossAudioFinalMic2DTO;//下行mic2音频最终丢包率
					lossVideoMic1CC        = val.lossVideoMic1CCDTO;//下行mic1视频整体原始丢包率
					lossVideoEFCMic1CC     = val.lossVideoEFCMic1CCDTO;//下行mic1视频整体FEC后丢包率
					lossVideoMic1FinalCC   = val.lossVideoMic1FinalCCDTO;//下行mic1视频整体最终丢包率
					lossVideoMic2CC        = val.lossVideoMic2CCDTO;//下行mic2视频整体原始丢包率
					lossVideoEFCMic2CC     = val.lossVideoEFCMic2CCDTO;//下行mic2视频整体FEC后丢包率
					lossVideoMic2FinalCC   = val.lossVideoMic2FinalCCDTO;//下行mic2视频整体最终丢包率
					lossAudioMic1CC        = val.lossAudioMic1CCDTO;//下行mic1音频整体原始丢包率
					lossAudioEFCMic1CC     = val.lossAudioEFCMic1CCDTO;//下行mic1音频整体FEC后丢包率
					lossAudioMic1FinalCC   = val.lossAudioMic1FinalCCDTO;//下行mic1音频整体最终丢包率
					lossAudioMic2CC        = val.lossAudioMic2CCDTO;//下行mic2音频整体原始丢包率
					lossAudioEFCMic2CC     = val.lossAudioEFCMic2CCDTO;//下行mic2音频整体FEC后丢包率
					lossAudioMic2FinalCC   = val.lossAudioMic2FinalCCDTO;//下行mic2音频整体最终丢包率
					
					if(meetingId==undefined||meetingId==null||meetingId===""){
						meetingId = "--";
					}
					if(upLossVideoMic1==undefined||upLossVideoMic1==null||upLossVideoMic1===""){
						upLossVideoMic1 = "--";
					}
					if(upLossVideoEFCMic1==undefined||upLossVideoEFCMic1==null||upLossVideoEFCMic1===""){
						upLossVideoEFCMic1 = "--";
					}
					if(upLossVideoFinalMic1==undefined||upLossVideoFinalMic1==null||upLossVideoFinalMic1===""){
						upLossVideoFinalMic1 = "--";
					}
					if(upLossVideoMic1Description===""){
						upLossVideoMic1Description = upLossVideoMic1 + "/" + upLossVideoEFCMic1 + "/" + upLossVideoFinalMic1;
					}
					if(upLossAudioMic1==undefined||upLossAudioMic1==null||upLossAudioMic1===""){
						upLossAudioMic1 = "--";
					}
					if(upLossAudioEFCMic1==undefined||upLossAudioEFCMic1==null||upLossAudioEFCMic1===""){
						upLossAudioEFCMic1 = "--";
					}
					if(upLossAudioFinalMic1==undefined||upLossAudioFinalMic1==null||upLossAudioFinalMic1===""){
						upLossAudioFinalMic1 = "--";
					}
					if(upLossAudioMic1Description===""){
						upLossAudioMic1Description = upLossAudioMic1 + "/" + upLossAudioEFCMic1 + "/" + upLossAudioFinalMic1;
					}
					if(upLossVideoMic2==undefined||upLossVideoMic2==null||upLossVideoMic2===""){
						upLossVideoMic2 = "--";
					}
					if(upLossVideoEFCMic2==undefined||upLossVideoEFCMic2==null||upLossVideoEFCMic2===""){
						upLossVideoEFCMic2 = "--";
					}
					if(upLossVideoFinalMic2==undefined||upLossVideoFinalMic2==null||upLossVideoFinalMic2===""){
						upLossVideoFinalMic2 = "--";
					}
					if(upLossVideoMic2Description===""){
						upLossVideoMic2Description = upLossVideoMic2 + "/" + upLossVideoEFCMic2 + "/" + upLossVideoFinalMic2;
					}
					if(upLossAudioMic2==undefined||upLossAudioMic2==null||upLossAudioMic2===""){
						upLossAudioMic2 = "--";
					}
					if(upLossAudioEFCMic2==undefined||upLossAudioEFCMic2==null||upLossAudioEFCMic2===""){
						upLossAudioEFCMic2 = "--";
					}
					if(upLossAudioFinalMic2==undefined||upLossAudioFinalMic2==null||upLossAudioFinalMic2===""){
						upLossAudioFinalMic2 = "--";
					}
					if(upLossAudioMic2Description===""){
						upLossAudioMic2Description = upLossAudioMic2 + "/" + upLossAudioEFCMic2 + "/" + upLossAudioFinalMic2;
					}
					if(downLossVideoMic1==undefined||downLossVideoMic1==null||downLossVideoMic1===""){
						downLossVideoMic1 = "--";
					}
					if(downLossVideoEFCMic1==undefined||downLossVideoEFCMic1==null||downLossVideoEFCMic1===""){
						downLossVideoEFCMic1 = "--";
					}
					if(downLossVideoFinalMic1==undefined||downLossVideoFinalMic1==null||downLossVideoFinalMic1===""){
						downLossVideoFinalMic1 = "--";
					}
					if(downLossVideoMic1Description===""){
						downLossVideoMic1Description = downLossVideoMic1 + "/" + downLossVideoEFCMic1 + "/" + downLossVideoFinalMic1;
					}
					if(downLossAudioMic1==undefined||downLossAudioMic1==null||downLossAudioMic1===""){
						downLossVideoMic1 = "--";
					}
					if(downLossAudioEFCMic1==undefined||downLossAudioEFCMic1==null||downLossAudioEFCMic1===""){
						downLossAudioEFCMic1 = "--";
					}
					if(downLossAudioFinalMic1==undefined||downLossAudioFinalMic1==null||downLossAudioFinalMic1===""){
						downLossAudioFinalMic1 = "--";
					}
					if(downLossAudioMic1Description===""){
						downLossAudioMic1Description = downLossVideoMic1 + "/" + downLossAudioEFCMic1 + "/" + downLossAudioFinalMic1;
					}
					if(downLossVideoMic2==undefined||downLossVideoMic2==null||downLossVideoMic2===""){
						downLossVideoMic2 = "--";
					}
					if(downLossVideoEFCMic2==undefined||downLossVideoEFCMic2==null||downLossVideoEFCMic2===""){
						downLossVideoEFCMic2 = "--";
					}
					if(downLossVideoFinalMic2==undefined||downLossVideoFinalMic2==null||downLossVideoFinalMic2===""){
						downLossVideoFinalMic2 = "--";
					}
					if(downLossVideoMic2Description===""){
						downLossVideoMic2Description = downLossVideoMic2 + "/" + downLossVideoEFCMic2 + "/" + downLossVideoFinalMic2;
					}
					if(downLossAudioMic2==undefined||downLossAudioMic2==null||downLossAudioMic2===""){
						downLossVideoMic2 = "--";
					}
					if(downLossAudioEFCMic2==undefined||downLossAudioEFCMic2==null||downLossAudioEFCMic2===""){
						downLossVideoEFCMic2 = "--";
					}
					if(downLossAudioFinalMic2==undefined||downLossAudioFinalMic2==null||downLossAudioFinalMic2===""){
						downLossAudioFinalMic2 = "--";
					}
					if(downLossAudioMic2Description===""){
						downLossAudioMic2Description = downLossAudioMic2 + "/" + downLossAudioEFCMic2 + "/" + downLossAudioFinalMic2;
					}
					
					if(lossVideoMic1CC==undefined||lossVideoMic1CC==null||lossVideoMic1CC===""){
						lossVideoMic1CC = "--";
					}
					if(lossVideoEFCMic1CC==undefined||lossVideoEFCMic1CC==null||lossVideoEFCMic1CC===""){
						lossVideoEFCMic1CC = "--";
					}
					if(lossVideoMic1FinalCC==undefined||lossVideoMic1FinalCC==null||lossVideoMic1FinalCC===""){
						lossVideoMic1FinalCC = "--";
					}
					if(lossVideoMic1Description===""){
						lossVideoMic1Description = lossVideoMic1CC + "/" + lossVideoEFCMic1CC + "/" + lossVideoMic1FinalCC;
					}
					
					if(lossVideoMic2CC==undefined||lossVideoMic2CC==null||lossVideoMic2CC===""){
						lossVideoMic2CC = "--";
					}
					if(lossVideoEFCMic2CC==undefined||lossVideoEFCMic2CC==null||lossVideoEFCMic2CC===""){
						lossVideoEFCMic2CC = "--";
					}
					if(lossVideoMic2FinalCC==undefined||lossVideoMic2FinalCC==null||lossVideoMic2FinalCC===""){
						lossVideoMic2FinalCC = "--";
					}
					if(lossVideoMic2Description===""){
						lossVideoMic2Description = lossVideoMic2CC + "/" + lossVideoEFCMic2CC + "/" + lossVideoMic2FinalCC;
					}
					
					if(lossAudioMic1CC==undefined||lossAudioMic1CC==null||lossAudioMic1CC===""){
						lossAudioMic1CC = "--";
					}
					if(lossAudioEFCMic1CC==undefined||lossAudioEFCMic1CC==null||lossAudioEFCMic1CC===""){
						lossAudioEFCMic1CC = "--";
					}
					if(lossAudioMic1FinalCC==undefined||lossAudioMic1FinalCC==null||lossAudioMic1FinalCC===""){
						lossAudioMic1FinalCC = "--";
					}
					if(lossAudioMic1Description===""){
						lossAudioMic1Description = lossAudioMic1CC + "/" + lossAudioEFCMic1CC + "/" + lossAudioMic1FinalCC;
					}
					
					if(lossAudioMic2CC==undefined||lossAudioMic2CC==null||lossAudioMic2CC===""){
						lossAudioMic2CC = "--";
					}
					if(lossAudioEFCMic2CC==undefined||lossAudioEFCMic2CC==null||lossAudioEFCMic2CC===""){
						lossAudioEFCMic2CC = "--";
					}
					if(lossAudioMic2FinalCC==undefined||lossAudioMic2FinalCC==null||lossAudioMic2FinalCC===""){
						lossAudioMic2FinalCC = "--";
					}
					if(lossAudioMic2Description===""){
						lossAudioMic2Description = lossAudioMic2CC + "/" + lossAudioEFCMic2CC + "/" + lossAudioMic2FinalCC;
					}
					if(endTime==undefined||endTime==null||endTime===""){
						endTime = "--";
					}
				/*	if(duration==undefined||duration==null||duration===""){
						durationDescription = "--";
					}else{
						durationDescription = timeformat(duration);
					}*/
					
					if(userCount==undefined||userCount==null||userCount===""){
						userCount = "--";
					}
					
					userIdList = val.userIdList;
					var userId;
					if(userIdList!=undefined&&userIdList!=null&&userIdList!==""){
						if(userIdList[0]==undefined||userIdList[0]==null||userIdList[0]===""){
							userIdListDescription = "--";
						}else{
							userIdListDescription = userIdList[0];
						}
						for(var j = 1;j<userIdList.length;j++){
							if(userIdList[j]==undefined||userIdList[j]==null||userIdList[j]===""){
								userId = "--";
							}else{
								userId = userIdList[j];
							}
								userIdListDescription += "/" + userId;
						}		
					}
					
					relayIdList = new Array();
					//val.relayIdList = null;
					//val.relayIdList = new Array('123','123','321','123','222','321');
					bomStringArray(val.relayIdList);//排序
					getNoNameArr(relayIdList,val.relayIdList);//去重
					//relayIdList = val.relayIdList;
					var relayId;
					if(relayIdList!=undefined&&relayIdList!=null&&relayIdList!==""){
						if(relayIdList[0]==undefined||relayIdList[0]==null||relayIdList[0]===""){
							relayIdListDescription = "--";
						}else{
							relayIdListDescription = relayIdList[0];
						}
						for(var k = 1;k<relayIdList.length;k++){
							if(relayIdList[k]==undefined||relayIdList[k]==null||relayIdList[k]===""){
								relayId = "--";
							}else{
								relayId = relayIdList[k];
							}
							relayIdListDescription += "/" + relayId;
						}		
					}
			}
			
			//将结束时间由YY-MM-DD HH:MM:SS改成YY-MM-DD_HH:MM:SS形式进行页面传值
			//否则由于空格无法传递
			var times = endTime.split(' ');
			var endTimes = times[0];
			endTimes  += "_" + times[1];
			
					html += "<tr class=\"list\">" +
								"<th scope=\"row\">" + (i+1) +"</th>" +
								//会议号
								"<td title='" + meetingId + "'>" + meetingId + "</td>" +
								//持续时间
								//"<td title='"+ durationDescription + "'>" + durationDescription +"</td>" +
								//参会人数
								"<td title='" + userCount + "'>" + userCount + "</td>" +
								//参会列表
								"<td title='" + userIdListDescription+"'>" + userIdListDescription+"</td>" +
								//Relay列表
								"<td title='" + relayIdListDescription + "'>" + relayIdListDescription + "</td>" +
								//上行mic1V丢包率(原/fec)
								"<td title='" + upLossVideoMic1Description + "'>" + upLossVideoMic1Description + "</td>" +
								//上行mic1A丢包率(原/fec)
								"<td title='" + upLossAudioMic1Description + "'>" + upLossAudioMic1Description + "</td>" +
								//上行mic2V丢包率(原/fec)
								"<td title='" + upLossVideoMic2Description + "'>" + upLossVideoMic2Description + "</td>" +
								//上行mic2A丢包率(原/fec)
								"<td title='" + upLossAudioMic2Description + "'>" + upLossAudioMic2Description + "</td>" +
								//下行mic1V丢包率(原/fec)
								"<td title='" + downLossVideoMic1Description + "'>" + downLossVideoMic1Description + "</td>" +
								//下行mic1A丢包率(原/fec)
								"<td title='" + downLossAudioMic1Description + "'>" + downLossAudioMic1Description + "</td>" +
								//下行mic2V丢包率(原/fec)
								"<td title='" + downLossVideoMic2Description + "'>" + downLossVideoMic2Description + "</td>" +
								//下行mic2A丢包率(原/fec)
								"<td title='" + downLossAudioMic2Description + "'>" + downLossAudioMic2Description + "</td>" +
								//mic1V整体丢包率(原/fec/终)
								"<td title='" + lossVideoMic1Description + "'>" + lossVideoMic1Description + "</td>" +
								//mic1A整体丢包率(原/fec/终)
								"<td title='" + lossAudioMic1Description + "'>" + lossAudioMic1Description + "</td>" +
								//mic2V整体丢包率(原/fec/终)
								"<td title='" + lossVideoMic2Description + "'>" + lossVideoMic2Description + "</td>" +
								//mic2A整体丢包率(原/fec/终)
								"<td title='" + lossAudioMic2Description + "'>" + lossAudioMic2Description + "</td>" +
								//开始时间
								"<td title='" + endTime + "'>"+endTime+"</td>" +								
								//报告
								"<td><a onclick=openDialog('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+endTimes+"','"+duration+"','"+userCount+"','"+upLossVideoMic1+"','"+downLossVideoMic1+"','"+upLossVideoMic2+"','"+downLossVideoMic2+"','"+upLossVideoEFCMic1+"','"+downLossVideoEFCMic1+"','"+upLossVideoEFCMic2+"','"+downLossVideoEFCMic2+"','"+upLossAudioMic1+"','"+downLossAudioMic1+"','"+upLossAudioMic2+"','"+downLossAudioMic2+"','"+upLossAudioEFCMic1+"','"+downLossAudioEFCMic1+"','"+upLossAudioEFCMic2+"','"+downLossAudioEFCMic2+"','"+val.speakerIdListMic1+"','"+val.speakerIdListMic2+"') class='clickBackgroundColor1'><font style='color:#359E33'>详情</font>|</a></td>"+
								//"<td><a onclick=openDialog('"+meetingId+"','"+userCount+"') class='clickBackgroundColor1'><font style='color:#359E33'>详情</font></a></td>"+
							    //"<td><a onclick=openDialog('"+endTimes+"','"+durations+"') class='clickBackgroundColor1'><font style='color:#359E33'>详情</font></a></td>"+
								"</tr>";

			
		});
	

		html += "</table>";
		var pages = "";
		
		//用的是真分页，每次查询出多少条就显示多少条，显示的条数与pageSize不一样相等。
		//只要存在的数据够多，一定是length>=pageSize，只有最后一页会出现length<=pageSize的现象
		//所以当length==pageSize时，无法判断是不是到了尾页，但是如果length<pageSize，一定是到了尾页		
		//只要能执行到这里，length肯定大于0
		var flag = length < 2*pageSize;
		console.info("flag:"+flag+"length:"+length+"pageSize:"+pageSize);
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
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage + 1) + ")>下一页</a>";
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
 * 点击“报告”、“日志”、“视图”时调用的方法
 * @param {} sid
 * @param {} flag
 */
function openDialog(relayIdList,userIdList,meetingId,endTime,durations,userCount,upLossVideoMic1,downLossVideoMic1,upLossVideoMic2,downLossVideoMic2,upLossVideoEFCMic1,
		downLossVideoEFCMic1,upLossVideoEFCMic2,downLossVideoEFCMic2,upLossAudioMic1,downLossAudioMic1,upLossAudioMic2,downLossAudioMic2,upLossAudioEFCMic1,
		downLossAudioEFCMic1,upLossAudioEFCMic2,downLossAudioEFCMic2,speakerIdListMic1,speakerIdListMic2) {
    window.open("callDetail.jsp?relayIdList="+relayIdList+"&meetingId="+meetingId+"&userIdList="+userIdList+"&endTime="+endTime+"&durations="+durations+"&userCount="+userCount+"&upLossVideoMic1="+upLossVideoMic1+"&downLossVideoMic1="+downLossVideoMic1+"&upLossVideoMic2="+upLossVideoMic2+"&downLossVideoMic2="+downLossVideoMic2+"&upLossVideoEFCMic1="+upLossVideoEFCMic1+"&downLossVideoEFCMic1="+downLossVideoEFCMic1+"&upLossVideoEFCMic2="+upLossVideoEFCMic2+"&downLossVideoEFCMic2="+downLossVideoEFCMic2+"&upLossAudioMic1="+upLossAudioMic1+"&downLossAudioMic1="+downLossAudioMic1+"&upLossAudioMic2="+upLossAudioMic2+"&downLossAudioMic2="+downLossAudioMic2+"&upLossAudioEFCMic1="+upLossAudioEFCMic1+"&downLossAudioEFCMic1="+downLossAudioEFCMic1+"&upLossAudioEFCMic2="+upLossAudioEFCMic2+"&downLossAudioEFCMic2="+downLossAudioEFCMic2+"&speakerIdListMic1="+speakerIdListMic1+"&speakerIdListMic2="+speakerIdListMic2);
	jQuery(this).target = "_blank";
}


/*function openDialog(endTimes,durations){
	console.info("durations:",+durations);
	window.open("callDetail.jsp?durations="+durations+"&endTime="+endTimes);
	jQuery(this).target = "_blank";
}
*/

/**
 * 点击错误数据的“详情”
 * @param {} sid
 */
function openErrorDataDialog(sid) {
	window.open("errordata.jsp?sid=" + sid);
	jQuery(this).target = "_blank";
}



/**
 * 根据返回码确实是何种类型的通话
 * @param {} directionType
 * @return {}
 */
function showDirectionType(directionType){
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
}

var section_qualified_num = 0;
var secition_unqualified_num = 0;;
function multshowdata(data, func, mainid) {
	//console.info("分页数据:"+data);
    
	//清空原数据
	
	$('#'+mainid).html("");
	$('#section_qualified').html("");
	
	var result = data.result;
	var list = data.items;
	var userIdList;
	var relayIdList;
	var pageSize = data.pageSize;
	var currPage = data.currPage;
	var count = data.count;//符合查询条件的记录数
	var length ;
	var meetingId;//会议ID
	var startTime;//会议开始时间
	var duration;//会议持续时间
	var userCount;//参会人数
	var durationDescription;//会议持续时间描述
	var c2cquality; //端到端质量
	var qosTableNames;
	var finalUserCount = 0; // 实际参会人数（过滤掉RelayID）
	//2016.4.25 新增 
	var speakerIdList;
	//2016.5.11
	var endTime;//会议结束时间
	
	var test_json = JSON.stringify(list);
	console.info("meetingSummaryInfo:"+test_json);
	if (result==0&&list!=undefined&&list!=null&&list!=="") {
		length = list.length;
		var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
				+ "<tr class=\"head\">" +
						"<th scope=\"col\" width='40px'>序号</th>" +
						"<th scope=\"col\" width='70px'>会议号</th>" +
						"<th scope=\"col\" width='100px'>会议开始时间</th>" +
						"<th scope=\"col\" width='80px'>持续时间</th>" +
						"<th scope=\"col\" width='40px'>人数</th>" +
						"<th scope=\"col\" width='100px'>用户列表</th>" +
						"<th scope=\"col\" width='100px'>relay列表</th>" +
						"<th scope=\"col\" colspan='1' width='150px'>端到端合格状态</th>" +
						"<th scope=\"col\" colspan='1' width='50px'>会议合格率</th>" +
						"<th scope=\"col\" colspan='1' width='50px'></th>" +
				"</tr>";
		var c2cIdNumber = 0;
		var index_meetingNum = 1;
		$.each(list, function(i, val) {
			c2cIdNumber++;
			if(val!=undefined&&val!=null&&val!==""){
				    //每次循环都要先置空
				    userIdListDescription        = "";
				    relayIdListDescription       = "";
				    finalUserCount = 0
				    
					meetingId            = val.meetingId;//会议ID
					startTime            = val.timeStamps;//会议结束时间
					duration             = val.duration;//会议持续时间
					userCount            = val.userCount;
					c2cquality			 = val.c2cquality;//端到端质量评估
					qosTableNames		 = val.qosTableName;//该会议信息所在的详情表的表名
					//2016.5.11
					endTime             = val.endTimes;
					console.info("c2c:"+c2cquality);
					if(meetingId==undefined||meetingId==null||meetingId===""){
						meetingId = "--";
					}

					if(startTime==undefined||startTime==null||startTime===""){
						startTime = "--";
					}
					if(duration==undefined||duration==null||duration===""){
						durationDescription = "--";
					}else{
						if(duration == 0){
							durationDescription = "0秒";
						}else{
							durationDescription = timeformat(duration*1000);
							if(durationDescription===""){
								durationDescription = "--";
							}
						}
							
					}
					if(userCount==undefined||userCount==null||userCount===""){
						userCount = "--";
					}
					userIdList = val.userIdList;
					var userId;
					if(userIdList!=undefined&&userIdList!=null&&userIdList!==""){
						if(userIdList[0]==undefined||userIdList[0]==null||userIdList[0]===""){
							userIdListDescription = "--";
						}else{
							if( strlen(userIdList[0]) > 4){
								userIdListDescription = userIdList[0];
								finalUserCount++;
							}
							
						}
						for(var j = 1;j<userIdList.length;j++){
							if(userIdList[j]==undefined||userIdList[j]==null||userIdList[j]===""){
								userId = "--";
							}else{
								userId = userIdList[j];
							}
								if(strlen(userId) > 4){
									if(finalUserCount == 0){
										userIdListDescription = userId;
									}else{
										userIdListDescription += "/" + userId;
									}
									finalUserCount++;
								}
						}		
					}
					//zhanghy 2017-05-05修改，查找商业用户时，过滤掉只有一人的会议
					var companyName = document.getElementById("aboutCompanyName");
					if(finalUserCount <= 1 && companyName.value != ""){
						//index_meetingNum++;
						return;
					}
					relayIdList = new Array();
					bomStringArray(val.relayIdList);//排序
					getNoNameArr(relayIdList,val.relayIdList);//去重
					var relayId;
					if(relayIdList!=undefined&&relayIdList!=null&&relayIdList!==""){
						if(relayIdList[0]==undefined||relayIdList[0]==null||relayIdList[0]===""){
							relayIdListDescription = "--";
						}else{
							relayIdListDescription = relayIdList[0];
						}
						for(var k = 1;k<relayIdList.length;k++){
							if(relayIdList[k]==undefined||relayIdList[k]==null||relayIdList[k]===""){
								relayId = "--";
							}else{
								relayId = relayIdList[k];
							}
							relayIdListDescription += "/" + relayId;
						}		
					}
					
					speakerIdList = val.speakerIdList;
					var speakerId;
					if(speakerIdList!=undefined&&speakerIdList!=null&&speakerIdList!==""){
						if(speakerIdList[0]==undefined||speakerIdList[0]==null||speakerIdList[0]===""){
							speakerIdListDescription = "--";
						}else{
							speakerIdListDescription = speakerIdList[0];
						}
						for(var j = 1;j<speakerIdList.length;j++){
							if(speakerIdList[j]==undefined||speakerIdList[j]==null||speakerIdList[j]===""){
								userId = "--";
							}else{
								userId = speakerIdList[j];
							}
							speakerIdListDescription += "/" + speakerId;
						}		
					}
			}
			
			//将结束时间由YY-MM-DD HH:MM:SS改成YY-MM-DD_HH:MM:SS形式进行页面传值
			//否则由于空格无法传递
			var times = startTime.split(' ');
			var startTimes = times[0];
			startTimes  += "_" + times[1];
			if(endTime == null || endTime == undefined || endTime ==="" || endTime === "1970-01-01 08:00:00"){
				endTime = $("#endTime").val();
				console.info("endTime:"+endTime);
			}/*else{
				endTime = val.endTimes;
			}*/
			times = endTime.split(' ');
			console.info("times:"+times[0]);
			var endTimes = times[0];
			endTimes += "_" + times[1];
			html += "<tr class=\"list\">" +
			"<th scope=\"row\">" + index_meetingNum +"</th>" +
			//会议号
			"<td title='" + meetingId + "'>" + meetingId + "</td>" +
			//开始时间
			"<td title='" + startTime + "'>"+startTime+"</td>" +
			//持续时间
			"<td title='"+ durationDescription + "'>" + durationDescription +"</td>" +
			//参会人数
			"<td title='" + finalUserCount + "'>" + finalUserCount + "</td>" +
			//参会列表
			"<td title='" + userIdListDescription+"'>" + userIdListDescription+"</td>" +
			//Relay列表
			"<td title='" + relayIdListDescription + "'>" + relayIdListDescription + "</td>" +
			
			//端到端合格率
			//"<td><div id='c2c"+c2cIdNumber+"' onclick='over("+c2cIdNumber+")' ondbclick='out("+c2cIdNumber+")' style=\"height:18px\">"+c2cqualitySerialize(c2cquality,relayIdList,userIdList,meetingId,startTimes,duration,userCount,speakerIdList,endTimes,qosTableNames)+"</div></td>" +								
			"<td><div id='c2c"+c2cIdNumber+"' onclick='over("+c2cIdNumber+")' ondblclick='out("+c2cIdNumber+")' style=\"height:18px\">"+c2cqualitySerialize(c2cquality,relayIdList,userIdList,meetingId,startTimes,duration,userCount,speakerIdList,endTimes,qosTableNames,c2cIdNumber)+"</div></td>" +
			//会议合格率
			"<td><div>"+calRateOfMeeting(c2cquality)+"</div></td>" +
			//报告
			"<td><a onclick=openMultDialog('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+startTimes+"','"+duration+"','"+userCount+"','"+speakerIdList+"','"+endTimes+"','"+qosTableNames+"') class='clickBackgroundColor1'><font style='color:#359E33'>详情</font>|</a></td>"+
			"</tr>";	
			index_meetingNum++;
		});
	
		
		html += "</table>";
		var pages = "";
		//length = index_meetingNum;
		//用的是真分页，每次查询出多少条就显示多少条，显示的条数与pageSize不一样相等。
		//只要存在的数据够多，一定是length>=pageSize，只有最后一页会出现length<=pageSize的现象
		//所以当length==pageSize时，无法判断是不是到了尾页，但是如果length<pageSize，一定是到了尾页		
		//只要能执行到这里，length肯定大于0
		var flag = length < 2*pageSize;
		console.info("flag:"+flag+"length:"+length+"pageSize:"+pageSize);
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
			} else {
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage + 1) + ")>下一页</a>";
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
	//zhanghy 12-29 在端到端统计之后添加合格次数，不合格次数，
	$('#section_qualified').html("本页合格次数："+section_qualified_num+"|"+"本页不合格次数:"+secition_unqualified_num);
	section_qualified_num = 0;
	secition_unqualified_num = 0;
}

function c2cqualitySerialize(data,relayIdList,userIdList,meetingId,startTime,durations,userCount,speakerIdList,endTime,qosTableNames,c2cIdNumber){
	if(data == null || data == undefined){
		return "--";
	}
	//var data_test = "A/B/0|A/C/1";
	//var qosTable_test = "MeetingQosStatic20170101_01";
	
	//zhanghy 2018-03-08 修改增加在会议中终端之间人次的合格率
	var meetingQualifiedNum = 0;
	
	
	var strings = data.split("|");
	var resultString = "";
	var c2cNum = strings.length;
	for(var i = 0;i < c2cNum;i++){
		var details = strings[i].split("/");
		if(details[2] == "1"){
			resultString += "<a onclick=openMultDialogForStupidOprate('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+startTime+"','"+durations+"','"+userCount+"','"+speakerIdList+"','"+endTime+"','"+details[0]+"','"+details[1]+"','"+qosTableNames+"')>"+details[0] + "->" + details[1] + "|" + "合格" +"</a>"+ "<br>";
			//"1"为合格，合格次数+1
			section_qualified_num++;
			meetingQualifiedNum++;
		}
		else if(details[2] == "0"){
			resultString += "<a onclick=openMultDialogForStupidOprate('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+startTime+"','"+durations+"','"+userCount+"','"+speakerIdList+"','"+endTime+"','"+details[0]+"','"+details[1]+"','"+qosTableNames+"')>"+details[0] + "->" + details[1] + "|" + "不合格" +"</a>"+ "<br>";
			//"0"为不合格，不合格次数+1
			secition_unqualified_num++;
		}
		else{
			resultString += "<a onclick=openMultDialogForStupidOprate('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+startTime+"','"+durations+"','"+userCount+"','"+speakerIdList+"','"+endTime+"','"+details[0]+"','"+details[1]+"','"+qosTableNames+"')>"+details[0] + "->" + details[1] + "|" + "未知" +"</a>"+ "<br>";
		}
	}
	
	//$('#rate'+c2cIdNumber).append(qualifiedRateOfMeeting);
	//document.getElementById("rate"+c2cIdNumber).style.height = "18px";
	return resultString;
}
function calRateOfMeeting(data){
	if(data == null || data == undefined){
		return "--";
	}
	//var data_test = "A/B/0|A/C/1";
	//var qosTable_test = "MeetingQosStatic20170101_01";
	
	//zhanghy 2018-03-08 修改增加在会议中终端之间人次的合格率
	var meetingQualifiedNum = 0;
	
	var strings = data.split("|");
	var resultString = "";
	var c2cNum = strings.length;
	for(var i = 0;i < c2cNum;i++){
		var details = strings[i].split("/");
		if(details[2] == "1"){
		//	resultString += "<a onclick=openMultDialogForStupidOprate('"+relayIdList+"','"+userIdList+"','"+meetingId+"','"+startTime+"','"+durations+"','"+userCount+"','"+speakerIdList+"','"+endTime+"','"+details[0]+"','"+details[1]+"','"+qosTableNames+"')>"+details[0] + "->" + details[1] + "|" + "合格" +"</a>"+ "<br>";
			//"1"为合格，合格次数+1
			section_qualified_num++;
			meetingQualifiedNum++;
		}
	}
	var qualifiedRateOfMeeting = Math.round(meetingQualifiedNum / c2cNum * 10000) / 100.00 + "%";
	return qualifiedRateOfMeeting;
}
//function openMultDialog(relayIdList,userIdList,meetingId,endTime,durations,userCount,speakerIdList) {
//    window.open("callDetail.jsp?relayIdList="+relayIdList+"&meetingId="+meetingId+"&userIdList="+userIdList+"&endTime="+endTime+"&durations="+durations+"&userCount="+userCount+"&speakerIdList="+speakerIdList);
//	jQuery(this).target = "_blank";
//}
/**
 * 鼠标放到表格上，表格放大
 */
function over(c2cIdNumber){
	/*if(clickNum%2 == 0){
		document.getElementById("c2c"+c2cIdNumber).style.height = "18px";
	}else{
		document.getElementById("c2c"+c2cIdNumber).style.height = "auto";
	}*/
	document.getElementById("c2c"+c2cIdNumber).style.height = "auto";
}
function out(c2cIdNumber){
	document.getElementById("c2c"+c2cIdNumber).style.height = "18px";
	//document.getElementById("c2c"+c2cIdNumber).style.overflow = "hidden";
}
function openMultDialogForStupidOprate(relayIdList,userIdList,meetingId,startTime,durations,userCount,speakerIdList,endTime,upUserID,downUserID,qosTableNames) {
	if(qosTableNames == null || qosTableNames == "undefined" || qosTableNames == qosTableNames == undefined){
		alert("传入表名参数不合法");
		return;
	}
    window.open("callDetail.jsp?relayIdList="+relayIdList+"&meetingId="+meetingId+"&userIdList="+userIdList+"&startTime="+startTime+"&durations="+durations+"&userCount="+userCount+"&speakerIdList="+speakerIdList+"&endTime="+endTime+"&upUserID="+upUserID+"&downUserID="+downUserID+"&flag=true"+"&qosTableName="+qosTableNames);
	jQuery(this).target = "_blank";
}
function openMultDialog(relayIdList,userIdList,meetingId,startTime,durations,userCount,speakerIdList,endTime,qosTableNames) {
	if(qosTableNames == null || qosTableNames == undefined || qosTableNames == "undefined"){
		alert("传入表名参数不合法");
		return;
	}
    window.open("callDetail.jsp?relayIdList="+relayIdList+"&meetingId="+meetingId+"&userIdList="+userIdList+"&startTime="+startTime+"&durations="+durations+"&userCount="+userCount+"&speakerIdList="+speakerIdList+"&endTime="+endTime+"&qosTableName="+qosTableNames);
	jQuery(this).target = "_blank";
}
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
     }else {
      len+=2;
      }
     }
    return len;
}