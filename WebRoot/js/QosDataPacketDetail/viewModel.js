/**
 *Qos策略展示页面QosDataPacketDetail.jsp的JS文件 
 */
var gpagesize = 100;//一页显示多少行
var index =0;
var gList1;
var gList2;
var gList3;
var gList4;
var gKeywords;
$(document).ready(function(){
	var tabContainers = $('#qosDataPacketDetail_list > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.qosDataPacketDetail_tabs li a').click(function() {
				var id = $(this).attr("id");
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.qosDataPacketDetail_tabs li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
//	gKeywords = getKeyword();
});
/**
 * 顶部固定信息
 * 
 * @param {}
 * 
 */

function qosDataPacketDetail_summaryView(key) {
	
	console.info("key:"+key);		
	var html = "<span class='summaryStyle'>key：</span>" + key
				+ "&nbsp;&nbsp;&nbsp;&nbsp;";
	html += "<table class='oldTable'>"
	    + "<tr>" +
		"<td>关键字（支持多关键字，请以空格间隔每个关键字,暂不支持手动去除高亮,去除高亮请刷新页面）：<input type='text' style='width:150px' id='aboutLogKeyWord'/></td>" +
		"<td><input type='button' id='aboutLogKeyWordsubmit' value='高亮'/></td>";
	html +="</table>";
	$('#qosDataPacketDetail_summary').html(html);
}

function getQosDataPacketDetail(keyLogId){
	var showType = "QosDataPackQuality";
	pageSize = 0;
	currPage = 0;
	$.ajax({
		type : "post",
		url : "search.aboutDataPacketQuality.action",
		dataType : "json",
		data : "keyLogId=" +keyLogId 
		+ "&pageSize=" + pageSize + "&currPage=" + currPage,
		beforeSend : function() {
			$(".layer").show();
			var pic = "<img src='images/losspackload.gif' align='middle' />";
//			$("#lossPackageMultUp").html(pic);
//			$("#lossPackageMultDown").html(pic);
			$("#qosDataPacketDetail_sender").html(pic);
			$("#qosDataPacketDetail_upRelay").html(pic);
			$("#qosDataPacketDetail_downRelay").html(pic);
			$("#qosDataPacketDetail_receiver").html(pic);
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutDataPacketQuality",showType);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

function showdata_QosDataPacketDetail(data,func){
	
	var result = data.result;
	var list = data.items; 
	var senderList = new Array();
	var upRelayList = new Array();
	var downRelayList = new Array();
	var receiverList = new Array();
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		length = list.length;
		console.info(list.length);
		$.each(list, function(i, val) {
			if(val!=undefined&&val!=null&&val!==""){
				switch(val.role)
				{
				case 1:
					senderList[senderList.length] = val;
					break;
				case 2:
					upRelayList[upRelayList.length] = val;
					break;
				case 3:
					downRelayList[downRelayList.length] = val;
					break;
				case 4:
					receiverList[receiverList.length] = val;
					break;
				default:
					break;
				}
			}	
		});	
		if(senderList!=undefined&&senderList!=null&&senderList!==""&&senderList.length!=0){
			gList1 = senderList;
			showdata_QosDataPackDetail_view(senderList,1,1,gpagesize);
		}else{
			$("#qosDataPacketDetail_sender").html("无发言者数据<br/><br/><br/><br/><br/><br/>");
		}
		if(upRelayList!=undefined&&upRelayList!=null&&upRelayList!==""&&upRelayList.length!=0){
			gList2 = upRelayList;
			showdata_QosDataPackDetail_view(upRelayList,2,1,gpagesize);
		}else{
			$("#qosDataPacketDetail_upRelay").html("无上行relay数据<br/><br/><br/><br/><br/><br/>");
		}
		if(downRelayList!=undefined&&downRelayList!=null&&downRelayList!==""&&downRelayList.length!=0){
			gList3 = downRelayList;
			showdata_QosDataPackDetail_view(downRelayList,3,1,gpagesize);
		}else{
			$("#qosDataPacketDetail_downRelay").html("无下行relay数据<br/><br/><br/><br/><br/><br/>");
		}
		if(receiverList!=undefined&&receiverList!=null&&receiverList!==""&&receiverList.length!=0){
			gList4 = receiverList;
			showdata_QosDataPackDetail_view(receiverList,4,1,gpagesize);
		}else{
			$("#qosDataPacketDetail_receiver").html("无接收者数据<br/><br/><br/><br/><br/><br/>");
		}
	}else {
		if (result == 2) {
			$("#qosDataPacketDetail_sender").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#qosDataPacketDetail_upRelay").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#qosDataPacketDetail_downRelay").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
			$("#qosDataPacketDetail_receiver").html("<center><img width='110' height='100' src='images/cancel.gif'><br/><font style='color:RGB(41,50,225);font-size:12px;'>哎呀！没有找到符合条件的数据</font></center>");
		} else if(result == 1){
			$("qosDataPacketDetail_sender").html("<center>只能查询相隔一周之内的数据</center>");
			$("qosDataPacketDetail_upRelay").html("<center>只能查询相隔一周之内的数据</center>");
			$("qosDataPacketDetail_downRelay").html("<center>只能查询相隔一周之内的数据</center>");
			$("qosDataPacketDetail_receiver").html("<center>只能查询相隔一周之内的数据</center>");
		}else if(result == 10){
			$("#qosDataPacketDetail_sender").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#qosDataPacketDetail_upRelay").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#qosDataPacketDetail_downRelay").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
			$("#qosDataPacketDetail_receiver").html("<center>请检查您的输入参数是否正确，因为它导致了服务器查询出错</center>");
		}
	}
}

function showdata_QosDataPackDetail_view(list,role,currPage,pageSize){

	console.info("list.length:" + list.length + "role:" + role + "currPage:" + currPage + "pageSize:" +pageSize);
	var flag = responsePagination(list,currPage,pageSize);
	var size;
	var lastPage;
	
	var html = "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='15px'>序号</th>" +
		"<th scope=\"col\" width='15px'>index</th>" +
//		"<th scope=\"col\" width='130px'>id</th>" +
		"<th scope=\"col\" width='350px'>内容</th>" +
	"</tr>";
	var index;
	var key;
	var logInfo;
	
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
		val         = list[i];
		index       =  val.index;
		key         = val.id;
		logInfo     = val.data;
        
		html += "<tr class=\"list\">" +
		"<th scope=\"row\">" + (i+1) +"</th>" +
		"<td title='" + index + "'>"+index+"</td>" +
//		"<td title='" + key + "'>"+key+"</td>" +
		"<td title='" + logInfo + "'>" + logInfo + "</td>" +
	"</tr>";
				
	//});
	}
	html += "</table>";
	var pages = "";
	if(flag){
		//继续分页
		if(currPage ==1){
			//第一页
			pages += "&nbsp;<a onclick=fenyeShow("+role+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=fenyeShow("+role+","+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=fenyeShow("+role+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=fenyeShow("+role+","+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=fenyeShow("+role+","+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=fenyeShow("+role+","+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=fenyeShow("+role+",1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=fenyeShow("+role+","+(currPage-1)+","+pageSize+")>上一页</a>";
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
	switch(role)
	{
	case 1:
		$("#qosDataPacketDetail_sender").html("");
		$("#qosDataPacketDetail_sender").html(html);
//		SearchHighlight("qosDataPacketDetail_sender",gKeywords);
		break;
	case 2:
		$("#qosDataPacketDetail_upRelay").html("");
		$("#qosDataPacketDetail_upRelay").html(html);
//		SearchHighlight("qosDataPacketDetail_upRelay",gKeywords);
		break;
	case 3:
		$("#qosDataPacketDetail_downRelay").html("");
		$("#qosDataPacketDetail_downRelay").html(html);
//		SearchHighlight("qosDataPacketDetail_downRelay",gKeywords);
		break;
	case 4:
		$("#qosDataPacketDetail_receiver").html("");
		$("#qosDataPacketDetail_receiver").html(html);
//		SearchHighlight("qosDataPacketDetail_receiver",gKeywords);
		break;
	}
//	$("#qosDataPacketDetail_list").html("");
//	$("#qosDataPacketDetail_list").html(html);
	aboutLogKeyWordsubmit();
	sortables_init();
}

function fenyeShow(role,currPage,pageSize){
//	console.info("123role:"+role);
	switch(role)
	{
	case 1:
		showdata_QosDataPackDetail_view(gList1,role,currPage,pageSize);
		break;
	case 2:
		showdata_QosDataPackDetail_view(gList2,role,currPage,pageSize);
		break;
	case 3:
		showdata_QosDataPackDetail_view(gList3,role,currPage,pageSize);
		break;
	case 4:
		showdata_QosDataPackDetail_view(gList4,role,currPage,pageSize);
		break;
	default:
		break;
	}
	
}

//function getKeyword(){
//	$.ajax({
//		type : "post",
//		url : "search.getKeyWord.action",
//		dataType : "json",
//		beforeSend : function() {
//			$(".layer").show();
//		},
//		complete : function() {
//			$(".layer").hide();
//		},
//		success : function(data) {
////			var version = data.version;
//			gKeywords = data.Logkeyword;
//			console.info("gKeywords:"+gKeywords);
////			$("#version").html("<span style='font-family: cursive;'>Copyright&nbsp;&copy;&nbsp;2015【Butel】&nbsp;Version:"+version+"</span>");
//		},
//		error : function(request, textStatus, errorThrown) {
//			if (request.status == 900) {
//				window.location.href = "login.jsp";
//			}
//		}
//	});
//}

$("#aboutLogKeyWordsubmit").live("click", function() {
	
	aboutLogKeyWordsubmit();
});

function aboutLogKeyWordsubmit(){
	gKeywords = $("#aboutLogKeyWord").val();
	if(gKeywords == null || gKeywords == undefined || gKeywords === "")return;
	SearchHighlight("qosDataPacketDetail_sender",gKeywords);
	SearchHighlight("qosDataPacketDetail_upRelay",gKeywords);
	SearchHighlight("qosDataPacketDetail_downRelay",gKeywords);
	SearchHighlight("qosDataPacketDetail_receiver",gKeywords);
}
