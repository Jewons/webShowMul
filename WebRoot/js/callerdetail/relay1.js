/* 通话详情callDetail.jsp页面中“Relay信息”标签页面的JS效果 */

function getpathnew(filename) {
	var getPathFileName = "C:\\getpathlog\\"+filename;
	$.ajax({
		type : "post",
		url : "allaction.report1.action",// 此处连接action，获取数据
		dataType : "json",
		data : "getPathFileName=" + getPathFileName ,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			if (data != null) {
				/* ====================Relay信息====================== */
				//“Relay信息”标签页第一个子标签“Relay状态”
				relayView01_zb_getpath(data.object[0]);
				//“Relay信息”标签页第二个子标签“短链关系”，顶部表格
				relayView02_zb_01table_getpath(data.object[0]);
				//“Relay信息”标签页第二个子标签“短链关系”
				relayView02_zb_getpath(data.object[0]);
				//“Relay信息”标签页第三个子标签“可达路径”
				relayView03_zb_getpath(data.object[0]);
				//“Relay信息”标签页第四个子标签“RC输出”
				relayView04_zb_getpath(data.object[0]);
				//“Relay信息”标签页第四个子标签“RC输出”，底部relay关系图
				relayImg_zb_getpath(data.object[0]);
			} 
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}


// 最外层四个子标签点击效果
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#relayContent > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.relay_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.relay_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// Relay状态01
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#relay0101 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.relay0101_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.relay0101_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// 短链状态02
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#relay0202 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.relay0202_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.relay0202_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// 可达路径03
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#relay0301 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.relay0301_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.relay0301_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

// RC输出04
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#relay0402 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.relay0402_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.relay0402_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

/** *******************以上属于点击效果************************ */
/** *******************以下属于页面数据展示************************ */


/**
 * “Relay信息”标签页第一个子标签“Relay状态”，主叫端数据
 * @param {}
 * data
 */
function relayView01_zb_getpath(getpath) {
	
	var html = "";
	html += "<font style=\"color:red;font-weight:bold;\">★红色加粗</font>代表该relay超时未心跳&nbsp;&nbsp;<font style=\"color:yellow;background:#FF0000;\">★红底黄字</font>代表此值超过阀值。以下relay指本次getpath中用到的relay。";
	html += "<table class=\"detailTable\">" +
					"<tr align=\"center\">" +
						"<td>ID</td>" +
						"<td colspan=\"15\">基本信息（快照）</td>" +
						"<td colspan=\"7\">负载信息（快照）</td>" +
					"</tr>" +
					"<tr>" +
						"<th>ID</th>" +
						"<th>名字</th>" +
						"<th>媒体IP</th>" +
						"<th>媒体端口</th>" +
						"<th>价格</th>" +						
						"<th>下行带宽</th>" +
						"<th>上行带宽</th>" +
						"<th>探测数</th>" +
						"<th>连接数</th>" +
						"<th>会话数</th>" +
						"<th>运营商</th>" +
						"<th>运营商索引</th>" +
						"<th>预留ip</th>" +
						"<th>预留端口</th>" +
						"<th>地域</th>" +
						"<th>地域索引</th>" +
						"<th>cpu</th>" +
						"<th>内存</th>" + 
						"<th>下行带宽</th>" +
						"<th>上行带宽</th>" +
						"<th>探测数</th>" +
						"<th>连接数</th>" +
						"<th>会话数</th>" +
					"</tr>" ;
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
			var relay_info = getpath.relay_info;
			var connOverloadRate = "";//连接数过载阈值 单位百分之
			var sessionOverloadRate = "";//session过载阈值 单位百分之
			var detectOverloadRate = "";//探测过载阈值 单位百分之
			var bandWidthOverloadRate = "";//带宽过载阈值 单位百分之
			var cpuOverloadRate = "";//cpu过载阈值 
			var memOverloadRate = "";//内存过载阈值
			
			if(relay_info!=undefined&&relay_info!=null&&relay_info!==""){
		    	var OverloadRate ="";
		    	if(getpath.OverloadRate!=undefined&&getpath.OverloadRate!=null&&getpath.OverloadRate!==""){
					OverloadRate = getpath.OverloadRate;
					connOverloadRate = OverloadRate.connOverloadRate;//连接数过载阈值 单位百分之
					sessionOverloadRate = OverloadRate.sessionOverloadRate;//session过载阈值 单位百分之
					detectOverloadRate = OverloadRate.detectOverloadRate;//探测过载阈值 单位百分之
					bandWidthOverloadRate = OverloadRate.bandWidthOverloadRate;//带宽过载阈值 单位百分之
					cpuOverloadRate = OverloadRate.cpuOverloadRate;//cpu过载阈值 
					memOverloadRate = OverloadRate.memOverloadRate;//内存过载阈值
		    	}
		    	
		    	$.each(relay_info,function(i,val){
		    		
		    		//是否可用
		    		var enable = val.enable; 
		    		//ID
		    		var relayID ;
		    		/*
		    		 * 基本信息
		    		 */
		    		//名字
		    		var name ;
		    		
		    		//媒体IP
		    		var media_ip ;
		    		
		    		//媒体端口
		    		var media_port ;
		    		
		    		//价格 
		    		var price ;
		    		
		    		//下行带宽
		    		var max_inbound ;
		    		
		    		//上行带宽
		    		var max_outbound ;
		    		
		    		//探测数　
		    		var max_detect_num ;
		    		
		    		//连接数
		    		var max_connet_num ;
		    		
		    		//会话数　
		    		var max_session_num ;
		    		
		    		//运营商　
		    		var isp ;
		    		
		    		//运营商索引　
		    		var isp_index ;
		    		
		    		//预留ip 
		    		var iperf_ip ;
		    		
		    		//预留端口 
		    		var iperf_port ;
		    		
		    		//地域 
		    		var domain ;
		    		
		    		//地域索引 
		    		var domain_index ;
		    		var relayInfo = val.relayInfo;
		    		if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
		    			//ID
			    		relayID = relayInfo.relayID;
			    		/*
			    		 * 基本信息
			    		 */
			    		//名字
			    		name = relayInfo.name;
			    		
			    		//媒体IP
			    		media_ip = relayInfo.media_ip;
			    		
			    		//媒体端口
			    		media_port = relayInfo.media_port;
			    		
			    		//价格 
			    		price = relayInfo.price;
			    		
			    		//下行带宽
			    		max_inbound = relayInfo.max_inbound;
			    		
			    		//上行带宽
			    		max_outbound = relayInfo.max_outbound;
			    		
			    		//探测数　
			    		max_detect_num = relayInfo.max_detect_num;
			    		
			    		//连接数
			    		max_connet_num = relayInfo.max_connet_num;
			    		
			    		//会话数　
			    		max_session_num = relayInfo.max_session_num;
			    		
			    		//运营商　
			    		isp = relayInfo.isp;
			    		
			    		//运营商索引　
			    		isp_index = relayInfo.isp_index;
			    		
			    		//预留ip 
			    		iperf_ip = relayInfo.iperf_ip;
			    		
			    		//预留端口 
			    		iperf_port = relayInfo.iperf_port;
			    		
			    		//地域 
			    		domain = relayInfo.domain;
			    		
			    		//地域索引 
			    		domain_index = relayInfo.domain_index;
		    		}
		    		
		    		//空值校验
		    		//relayID
		    		if(relayID==undefined||relayID==null||relayID===""){
						relayID = "--";
					}
		    		//名字
		    		if(name==undefined||name==null||name===""){
						name = "--";
					}
		    		//媒体IP
		    		if(media_ip==undefined||media_ip==null||media_ip===""){
						media_ip = "--";
					}
		    		//媒体端口
		    		if(media_port==undefined||media_port==null||media_port===""){
						media_port = "--";
					}
		    		//价格 
		    		if(price==undefined||price==null||price===""){
						price = "--";
					}
		    		//下行带宽
		    		if(max_inbound==undefined||max_inbound==null||max_inbound===""){
						max_inbound = "--";
					}
		    		//上行带宽
		    		if(max_outbound==undefined||max_outbound==null||max_outbound===""){
						max_outbound = "--";
					}
		    		//探测数　
		    		if(max_detect_num==undefined||max_detect_num==null||max_detect_num===""){
						max_detect_num = "--";
					}
		    		//连接数
		    		if(max_connet_num==undefined||max_connet_num==null||max_connet_num===""){
						max_connet_num = "--";
					}
		    		//会话数　
		    		if(max_session_num==undefined||max_session_num==null||max_session_num===""){
						max_session_num = "--";
					}
		    		//运营商　
		    		if(isp==undefined||isp==null||isp===""){
						isp = "--";
					}
		    		//运营商索引　
		    		if(isp_index==undefined||isp_index==null||isp_index===""){
						isp_index = "--";
					}
		    		//预留ip 
		    		if(iperf_ip==undefined||iperf_ip==null||iperf_ip===""){
						iperf_ip = "--";
					}
		    		//预留端口 
		    		if(iperf_port==undefined||iperf_port==null||iperf_port===""){
						iperf_port = "--";
					}
		    		//地域 
		    		if(domain==undefined||domain==null||domain===""){
						domain = "--";
					}
		    		//地域索引 
		    		if(domain_index==undefined||domain_index==null||domain_index===""){
						domain_index = "--";
					}
		    		
					/*
		    		 * 负载信息
		    		 */
		    		//cpu 
		    		var cpu ;
		    		
		    		//内存
		    		var mem ;
		    		
		    		//下行带宽 
		    		var inbound ;
		    		
		    		//上行带宽 
		    		var outbound ;
		    		
		    		//探测数 
		    		var detect_num ;
		    		
		    		//连接数 
		    		var connect_num ;
		    		
		    		//会话数 
		    		var session_num ;
		    		var payLoadInfo = val.payLoadInfo;
		    		if(payLoadInfo!=undefined&&payLoadInfo!=null&&payLoadInfo!==""){
		    			
			    		/*
			    		 * 负载信息
			    		 */
			    		//cpu 
			    		cpu = payLoadInfo.cpu;
			    		
			    		//内存
			    		mem = payLoadInfo.mem;
			    		
			    		//下行带宽 
			    		inbound = payLoadInfo.inbound;
			    		
			    		//上行带宽 
			    		outbound = payLoadInfo.outbound;
			    		
			    		//探测数 
			    		detect_num = payLoadInfo.detect_num;
			    		
			    		//连接数 
			    		connect_num = payLoadInfo.connect_num;
			    		
			    		//会话数 
			    		session_num = payLoadInfo.session_num;
		    		}
		    		
		    		//空值校验
		    		//cpu 
		    		if(cpu==undefined||cpu==null||cpu===""){
						cpu = "--";
					}
		    		//内存
		    		if(mem==undefined||mem==null||mem===""){
						mem = "--";
					}
		    		//下行带宽 
		    		if(inbound==undefined||inbound==null||inbound===""){
						inbound = "--";
					}
		    		//上行带宽 
		    		if(outbound==undefined||outbound==null||outbound===""){
						outbound = "--";
					}
		    		//探测数 
		    		if(detect_num==undefined||detect_num==null||detect_num===""){
						detect_num = "--";
					}
		    		//连接数 
		    		if(connect_num==undefined||connect_num==null||connect_num===""){
						connect_num = "--";
					}
		    		//会话数 
		    		if(session_num==undefined||session_num==null||session_num===""){
						session_num = "--";
					}
					
		    		if(enable==false){
		    			html+="<tr id=\"disable\">";
		    		}else{
		    			html+="<tr>";
		    		}
		    	
					html+="<td>"+relayID+"</td>" +
					"<td>"+name+"</td>" +
					"<td>"+media_ip+"</td>" +
					"<td>"+media_port+"</td>" +
					"<td>"+price+"</td>" ;
					
					//基本信息：下行带宽
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(inbound)&&!isNaN(max_inbound)){
							if(max_inbound>0){
								if((inbound/max_inbound)*100>=bandWidthOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+max_inbound+"</td>" ;
								}else{
									html+="<td>"+max_inbound+"</td>" ;
								}
							}else{
								html+="<td>"+max_inbound+"</td>" ;
							}
						}else{
							html+="<td>"+max_inbound+"</td>" ;
						}
					}else{
						html+="<td>"+max_inbound+"</td>" ;
					}
					
					//基本信息：上行带宽
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(outbound)&&!isNaN(max_outbound)){
							if(max_outbound>0){
								if((outbound/max_outbound)*100>=bandWidthOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+max_outbound+"</td>" ;
								}else{
									html+="<td>"+max_outbound+"</td>" ;
								}
							}else{
								html+="<td>"+max_outbound+"</td>" ;
							}
						}else{
							html+="<td>"+max_outbound+"</td>" ;
						}
					}else{
						html+="<td>"+max_outbound+"</td>" ;
					}
				
					//基本信息：探测数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(detect_num)&&!isNaN(max_detect_num)){
							if(max_detect_num>0){
								if((detect_num/max_detect_num)*100>=detectOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+max_detect_num+"</td>";
								}else{
									 html+="<td>"+max_detect_num+"</td>" ;
								}
							}else{
								 html+="<td>"+max_detect_num+"</td>" ;
							}
						}else{
							 html+="<td>"+max_detect_num+"</td>" ;
						}
					}else{
						 html+="<td>"+max_detect_num+"</td>" ;
					}
					//基本信息：连接数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(connect_num)&&!isNaN(max_connet_num)){
							if(max_connet_num>0){
								if((connect_num/max_connet_num)*100>=connOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+max_connet_num+"</td>" ;
								}else{
									html+="<td>"+max_connet_num+"</td>" ;
								}
							}else{
								html+="<td>"+max_connet_num+"</td>" ;
							}
						}else{
							html+="<td>"+max_connet_num+"</td>" ;
						}
					}else{
						html+="<td>"+max_connet_num+"</td>" ;
					}
					
					//基本信息：会话数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(session_num)&&!isNaN(max_session_num)){
							if(max_session_num>0){
								if((session_num/max_session_num)*100>=sessionOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+max_session_num+"</td>" ;
								}else{
									html+="<td>"+max_session_num+"</td>" ;
								}
							}else{
								html+="<td>"+max_session_num+"</td>" ;
							}
						}else{
							html+="<td>"+max_session_num+"</td>" ;
						}
					}else{
						html+="<td>"+max_session_num+"</td>" ;
					}	
					html+="<td>"+isp+"</td>" +
					"<td>"+isp_index+"</td>" +
					"<td>"+iperf_ip+"</td>" +
					"<td>"+iperf_port+"</td>" +
					"<td>"+domain+"</td>" +
					"<td>"+domain_index+"</td>" ;
					
					//负载信息：CPU
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(cpu)){
							if(cpu>=cpuOverloadRate){
								html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+cpu+"</td>" ;
							}else{
								html+="<td>"+cpu+"</td>" ;
							}
						}else{
							html+="<td>"+cpu+"</td>" ;
						}
					}else{
						html+="<td>"+cpu+"</td>" ;
					}
					//负载信息：内存
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(mem)){
							if(mem>=memOverloadRate){
								html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+mem+"</td>" ;
							}else{
								html+="<td>"+mem+"</td>" ;
							}
						}else{
							html+="<td>"+mem+"</td>" ;
						}
					}else{
						html+="<td>"+mem+"</td>" ;
					}	
					//负载信息：下行带宽
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(inbound)&&!isNaN(max_inbound)){
							if(max_inbound>0){
								if((inbound/max_inbound)*100>=bandWidthOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+inbound+"</td>" ;
								}else{
									html+="<td>"+inbound+"</td>" ;
								}
							}else{
								html+="<td>"+inbound+"</td>" ;
							}
						}else{
							html+="<td>"+inbound+"</td>" ;
						}
					}else{
						html+="<td>"+inbound+"</td>" ;
					}
					//负载信息：上行带宽
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(outbound)&&!isNaN(max_outbound)){
							if(max_outbound>0){
								if((outbound/max_outbound)*100>=bandWidthOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+outbound+"</td>" ;
								}else{
									html+="<td>"+outbound+"</td>" ;
								}
							}else{
								html+="<td>"+outbound+"</td>" ;
							}
						}else{
							html+="<td>"+outbound+"</td>" ;
						}
					}else{
						html+="<td>"+outbound+"</td>" ;
					}
					//负载信息：探测数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(detect_num)&&!isNaN(max_detect_num)){
							if(max_detect_num>0){
								if((detect_num/max_detect_num)*100>=detectOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+detect_num+"</td>" ;
								}else{
									html+="<td>"+detect_num+"</td>" ;
								}
							}else{
								html+="<td>"+detect_num+"</td>" ;
							}
						}else{
							html+="<td>"+detect_num+"</td>" ;
						}
					}else{
						html+="<td>"+detect_num+"</td>" ;
					}
					//负载信息：连接数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(connect_num)&&!isNaN(max_connet_num)){
							if(max_connet_num>0){
								if((connect_num/max_connet_num)*100>=connOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+connect_num+"</td>" ;
								}else{
									html+="<td>"+connect_num+"</td>" ;
								}
							}else{
								html+="<td>"+connect_num+"</td>" ;
							}
						}else{
							html+="<td>"+connect_num+"</td>" ;
						}
					}else{
						html+="<td>"+connect_num+"</td>" ;
					}
					//负载信息：会话数
					if(OverloadRate!=undefined&&OverloadRate!=null&&OverloadRate!==""){
						if(!isNaN(session_num)&&!isNaN(max_session_num)){
							if(max_session_num>0){
								if((session_num/max_session_num)*100>=sessionOverloadRate){
									html+="<td style=\"color:yellow;background:red; font-weight:bold;\">"+session_num+"</td>" ;
								}else{
									html+="<td>"+session_num+"</td>" ;
								}
							}else{
								html+="<td>"+session_num+"</td>" ;
							}
						}else{
							html+="<td>"+session_num+"</td>" ;
						}
					}else{
						html+="<td>"+session_num+"</td>" ;
					}
				html+="<tr>";
			});
	      }else{
	      	  html+="<tr><td colspan='23' align='center'>无</td></tr>";
	      }
	}else{
    	html+="<tr><td colspan='23' align='center'>无</td></tr>";
    }
		    
	html+="</table>";
	$("#relay0101_zb").html(html);
}

/**
 * “Relay信息”标签页第二个子标签“短链关系”，主叫端顶部表格
 * @param {}
 * data
 */
function relayView02_zb_01table_getpath(getpath){
	var html = "";
	html += "<div style='width:700px;margin:0 auto;'>" +
				"<table class=\"detailTable1\">" +
					"<tr>" +
						"<th>ID</th>" +
						"<th>名字</th>" +
						"<th>IP</th>" +
						"<th>地域</th>" +
						"<th>运营商</th>" +
						"<th>状态</th>" +
					"</tr>" ;
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
	      var relay_info = getpath.relay_info;
	      
	      if(relay_info!=undefined&&relay_info!=null&&relay_info!==""){
	    	 $.each(relay_info,function(i,val){
	    		
	    		//是否可用
	    		var enable = val.enable; 
	    		var relayInfo = val.relayInfo;
	    		
	    		//ID
	    		var relayID ;
	    		/*
	    		 * 基本信息
	    		 */
	    		//名字
	    		var name ;
	    		
	    		//IP
	    		var iperf_ip ;
	    		
	    		//地域 
	    		var domain ;
	    		
	    		//运营商　
	    		var isp ;
	    		if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
		    		//ID
		    		relayID = relayInfo.relayID;
		    		/*
		    		 * 基本信息
		    		 */
		    		//名字
		    		name = relayInfo.name;
		    		
		    		//IP
		    		iperf_ip = relayInfo.iperf_ip;
		    		
		    		//地域 
		    		domain = relayInfo.domain;
		    		
		    		//运营商　
		    		isp = relayInfo.isp;
		    		
		    		//空值校验
		    		//relayID
		    		if(relayID==undefined||relayID==null||relayID===""){
						relayID = "无";
					}
		    		//名字
		    		if(name==undefined||name==null||name===""){
						name = "无";
					}
		    		//IP
		    		if(iperf_ip==undefined||iperf_ip==null||iperf_ip===""){
						iperf_ip = "无";
					}
		    		//地域 
		    		if(domain==undefined||domain==null||domain===""){
						domain = "无";
					}
		    		//运营商　
		    		if(isp==undefined||isp==null||isp===""){
						isp = "无";
					}
					
		    		if(enable==false){
		    			html+="<tr id=\"disable\">";
		    		}else{
		    			html+="<tr>";
		    		}
		    	
					html += "<td>R"+relayID+"</td>" +
					"<td>"+name+"</td>" +
					"<td>"+iperf_ip+"</td>" +
					"<td>"+domain+"</td>" +
					"<td>"+isp+"</td>";
					if(enable==false){
						html += "<td>Unavailable</td>" ;
					}else{
						html += "<td>Online</td>" ;
					}
					html+="<tr>";
	    		}
	    		
			});
	      }else{
	      	 html+="<tr><td colspan='6' align='center'>无</td></tr>";
	      }
	}else{
  	   html+="<tr><td colspan='6' align='center'>无</td></tr>";
    }
	html+="</table></div>";
	$("#relay0202_zb_01").html(html);//Relay信息/短链关系/主叫端数据的顶部表格
	$("#relay0402_zb_01").html(html);//Relay信息/RC输出/主叫端数据的顶部表格
}

/**
 * “Relay信息”标签页第二个子标签“短链关系”，主叫向数据
 * @param {}
 * data
 */
function relayView02_zb_getpath(getpath){
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
		//源　头部ID、IP
		var src_user_info = getpath.src_user_info;
		var src_user_id ;
		var src_user_ip ;
		
		if(src_user_info!=undefined&&src_user_info!=null&&src_user_info!==""){
			src_user_id = src_user_info.user_id;
			src_user_ip = src_user_info.udp_ip;
		}
		if(src_user_id==undefined||src_user_id==null||src_user_id===""){
			src_user_id = "无";
		}
		if(src_user_ip==undefined||src_user_ip==null||src_user_ip===""){
			src_user_ip = "无";
		}
		//目的　头部ID、IP
		var dest_user_info = getpath.dest_user_info;
		var dest_user_id ;
		var dest_user_ip ;
		if(src_user_info!=undefined&&src_user_info!=null&&src_user_info!==""){
			dest_user_id = dest_user_info.user_id;
		    dest_user_ip = dest_user_info.udp_ip;
		}
		if(dest_user_id==undefined||dest_user_id==null||dest_user_id===""){
			dest_user_id = "无";
		}
		if(dest_user_ip==undefined||dest_user_ip==null||dest_user_ip===""){
			dest_user_ip = "无";
		}
		
		//ur_link_info的四个部分
		var R_U_self ;
		var U_R_self ;
		var U_R_shared ;
		var R_U_shared ;
		
		var ur_link_info = getpath.ur_link_info;
		if(ur_link_info!=undefined&&ur_link_info!=null&&ur_link_info!==""){
			//ur_link_info的四个部分
			R_U_self = ur_link_info.R_U_self;
			U_R_self = ur_link_info.U_R_self;
			U_R_shared = ur_link_info.U_R_shared;
			R_U_shared = ur_link_info.R_U_shared;
		}
		//rr_link_info一个部分
		var rr_link_info = getpath.rr_link_info;
		
		var html="<table class='detailTable'>";
	  			html+="<tr>"+
					      "<td valign=\"top\">" +
							"<table width='530px'>" +
								"<tr>" +
									"<td colspan=\"2\"><b>Us-->R</b>&nbsp;&nbsp;&nbsp;&nbsp;userID："+src_user_id+"&nbsp;&nbsp;&nbsp;&nbsp;userIP："+src_user_ip+"</td>" +
								"</tr>" +
								"<tr>" +
									"<td></td><th>(丢包，延时，抖动)&nbsp;&nbsp;更新时间</th>" +
								"</tr>" +
								"<tr>" +
									"<td width='106px;'>Us->Relay(self)</td>" +
									"<td valign=\"top\">";
										 if(U_R_self!=undefined&&U_R_self!=null&&U_R_self!==""){
											$.each(U_R_self,function(i,val){
												html += "<div style='width:100px;float:left;border-bottom:thin solid #E69C39;'>" +
														  "Us→R"+val.relayID+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.lost+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.delay+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.jitter+
														"</div>"+
														"<div style='width:145px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.updateTime+
														"</div>" ;
													
											});
										}else{
											html+="无";
										}
								html+="</td>" +
								"</tr>" +
								"<tr>" +
									"<td>Us->Relay(shared)</td>" +
									"<td valign=\"top\">";
										if(U_R_shared!=undefined&&U_R_shared!=null&&U_R_shared!==""){
											$.each(U_R_shared,function(i,val){
												html +=" <div style='width:100px;float:left;border-bottom:thin solid #E69C39;'>" +
															"Us→"+"R"+val.relayID+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.lost+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.delay+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.jitter+
														"</div>"+
														"<div style='width:145px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.updateTime+
														"</div>";
											});
										}else{
											html+="无";
										}
							html+="</td>" +
								"</tr>" +
							"</table>" +
						"</td>" +
			
						"<td valign=\"top\">" +
							"<table width='530px'>" +
								"<tr>" +
									"<td colspan=\"2\"><b>R-->Ud</b>&nbsp;&nbsp;&nbsp;&nbsp;userID："+dest_user_id+"&nbsp;&nbsp;&nbsp;&nbsp;userIP："+dest_user_ip+"</td>" +
								"</tr>" +
								"<tr>" +
									"<td></td><th>(丢包，延时，抖动)&nbsp;&nbsp;更新时间</th>" +
								"</tr>" +
								"<tr>" +
									"<td width='106px;'>Relay->Ud(self)</td>" +
									"<td valign=\"top\">";
									if(R_U_self!=undefined&&R_U_self!=null&&R_U_self!==""){
										
										$.each(R_U_self,function(i,val){
											html += "<div style='width:100px;float:left;border-bottom:thin solid #E69C39;'>" +
														"R"+val.relayID+"→Ud"+
													"</div>"+
													"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
														val.lost+
													"</div>"+
													"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
														val.delay+
													"</div>"+
													"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
														val.jitter+
													"</div>"+
													"<div style='width:145px;float:left;border-bottom:thin solid #E69C39;'>"+
														val.updateTime+
													"</div>";
									});	
									}else{
										html+="无";
									}		
							html+="</td>" +
								"</tr>" +
								"<tr>" +
									"<td>Relay->Ud(shared)</td>" +
									"<td valign=\"top\">";
										if(R_U_shared!=undefined&&R_U_shared!=null&&R_U_shared!==""){
											$.each(R_U_shared,function(i,val){
												html += "<div style='width:100px;float:left;border-bottom:thin solid #E69C39;'>" +
															"R"+val.relayID+"→Ud"+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.lost+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.delay+
														"</div>"+
														"<div style='width:50px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.jitter+
														"</div>"+
														"<div style='width:145px;float:left;border-bottom:thin solid #E69C39;'>"+
															val.updateTime+
														"</div>";
											});
										}else{
											html+="无";
										}	
							html+="</td>" +
								"</tr>" +
							"</table>" +
						"</td>" +
					"</tr>"+
					"<tr>" +
						"<td colspan='2' valign='top'>" +
							"<table>" +
								"<tr><td colspan=\"2\"><b>R-->R</b></td></tr>" ;
								if(rr_link_info!=null&&rr_link_info!=undefined&&rr_link_info!==""){
									$.each(rr_link_info,function(i,val){
									
									var link_info = val.link_info;
									var src_relayIP = val.src_relayIP;
									var src_relayID = val.src_relayID;
									if(src_relayIP==undefined||src_relayIP==null||src_relayIP===""){
										src_relayIP = "无";
									}
									if(src_relayID==undefined||src_relayID==null||src_relayID===""){
										src_relayID = "无";
									}
									html+="<tr>";
									
									html+="<td width='40px;'>";
									html+="<span>R"+src_relayID+"→</span>";
									html+="</td>";
									
									html+="<td>";
										if(link_info!=undefined&&link_info!=null&&link_info!==""){
											$.each(link_info,function(j,va){
												html += "<div style='width:40px;float:left;border-bottom:thin solid #E69C39;'>" +
															"R"+va.targetRelayID+
														"</div>"+
														"<div style='width:70px;float:left;border-bottom:thin solid #E69C39;'>丢包："+
															va.lost+
														"</div>"+
														"<div style='width:70px;float:left;border-bottom:thin solid #E69C39;'>延时："+
															va.delay+
														"</div>"+
														"<div style='width:70px;float:left;border-bottom:thin solid #E69C39;'>抖动："+
															va.jitter+
														"</div>"+
														"<div style='width:230px;float:left;margin-right:20px;border-bottom:thin solid #E69C39;'>更新："+
															va.updateTime+
														"</div>" ;
											});
										}else{
											html+="无";
										}
									html+="</td>";
										"</tr>";
									});
								}else{
									html+="<tr><td colspan=\"2\" align=\"center\">无</td></tr>" ;
								}
							html+="</table>" +
						"</td>" +
					"</tr>";
		html+="</table>";
		
		$("#relay0202_zb_02").html(html);
	}
}

/**
 * “Relay信息”标签页第三个子标签“可达路径”，主叫向数据
 */
function relayView03_zb_getpath(getpath){
	var html = "";
	var html1 = "";
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
		
		var reachable_path_array = getpath.reachable_path_array;//包含若干个记录
		var quality;
		var segment;//包含一个U_R，一个R_U，若干个R_R
		var U_R;
		var R_R;//这是一个数组
		var R_U;
		
		var lost;//丢包
		var delay;//延时
		var price;//价格
		
		var length;//reachable_path_array数组的长度
		
		
		var num = 3;//设置一行显示几个记录
		
		var flag = 0;//获取div的ID用
		
		if(reachable_path_array!=undefined&&reachable_path_array!=null&&reachable_path_array!==""){
			
			//生成表格，每行存放num个记录			
			length = reachable_path_array.length;
			
			//得到行数
			var trNum = getTrNum(length,num);
			html += "<table class='detailTable'>"+
						"<tr>" +
							"<th style='width:171px;'>路径</th><th style='width:48px;'>丢包</th><th style='width:49px;'>延时</th><th style='width:50px;'>价格</th>" +
							"<th style='width:165px;'>路径</th><th style='width:48px;'>丢包</th><th style='width:49px;'>延时</th><th style='width:50px;'>价格</th>" +
							"<th style='width:165px;'>路径</th><th style='width:48px;'>丢包</th><th style='width:49px;'>延时</th><th>价格</th>"+
						"</tr>";
			for(var i=0;i<trNum;i++){
				html += "<tr align='center'><td colspan='12' align='center' id='relayView03_zb01"+i+"'></td></tr>";
			}
			html += "</table>";
		
			$.each(reachable_path_array,function(i,val){
				//用div来控制num个记录显示在同一行
				html1 += "<div id='relayView03_zb02"+i+"' style='width:356px;float:left;'>";
				html1 += "<table width='356px'>" ;
						html1 += "<tr>";
						segment = val.segment;
						quality = val.quality;
						if(quality!=undefined&&quality!=null&&quality!==""){
							lost = quality.lost;
							delay = quality.delay;
							price = quality.price;
							//空值校验
							if(lost==undefined||lost==null||lost===""){
								lost = "无";
							}
							if(delay==undefined||delay==null||delay===""){
								delay = "无";
							}
							if(price==undefined||price==null||price===""){
								price = "无";
							}
						}
						
						if(segment!=undefined&&segment!=null&&segment!==""){
							U_R = segment.U_R;
							R_R = segment.R_R;
							R_U = segment.R_U;
						}
						
						var dest_id;
						if(U_R!=undefined&&U_R!=null&&U_R!==""){
							dest_id = U_R.dest_id;
						}
						
						if(dest_id==undefined||dest_id==null||dest_id===""){
							dest_id = "无";
						}
						
					 html1 += "<td style='width:140px;WORD-BREAK: break-all;WORD-WRAP: break-word;'>"+
								"Us→R"+dest_id+"→";
								if(R_R!=undefined&&R_R!=null&&R_R!==""){
									$.each(R_R,function(k,v){
										if(v!=undefined&&v!=null&&v!==""){
											if(v.dest_id!=undefined&&v.dest_id!=null&&v.dest_id!==""){
												html1 += "R"+v.dest_id+"→";
											}
										}
									});
								} 
								html1 += "Ud"+
							"</td>" +
							"<td style='width:40px;WORD-BREAK: break-all;WORD-WRAP: break-word;'>"+lost+"</td>" +
							"<td style='width:40px;WORD-BREAK: break-all;WORD-WRAP: break-word;'>"+delay+"</td>" +
							"<td style='width:40px;WORD-BREAK: break-all;WORD-WRAP: break-word;'>"+price+"</td>"+
						  "</tr>" ;
			html1 += "</table>"+
				"</div>";
			});	
			
			//把创建好的表格放到页面上，创建其文档元素
			$("#relay0301_zb").html(html);
			
			//把创建好的div放到页面上，创建其文档元素
			$("#relay0301_zb").append(html1);
			
			//把创建好的div以num个作为一个分组放到创建好的表格里，num个记录一行
			for(var i = 0;i<trNum; i++){
				for(var j=0;j<num;j++){//每行存放num个记录
					++flag;
					if(flag <= length){
						$('#relayView03_zb01'+i).append($('#relayView03_zb02'+(flag-1)));
					}
				}
			}
		}else{
			html += "<div>"+
						"<table class='detailTable'>"+
							"<tr>" +
								"<th>路径</th><th>丢包</th><th>延时</th><th>价格</th>" +
							"</tr>"+
							"<tr><td align='center' colspan='4'>无</td></tr>" +
						"</table>" +
					"</div>";
			$("#relay0301_zb").html(html);
		}
	}else{
		html += "<div>"+
					"<table class='detailTable'>"+
						"<tr>" +
							"<th>路径</th><th>丢包</th><th>延时</th><th>价格</th>" +
						"</tr>"+
						"<tr><td align='center' colspan='4'>无</td></tr>" +
					"</table>" +
				"</div>";
		$("#relay0301_zb").html(html);
	}
}


/**
 * 用在“Relay信息”标签页第三个子标签“可达路径”的主/被叫向数据
 * 根据数组的记录数和每行的单元格数确定生成几行
 * @param {} length
 * @param {} tdNum
 * @return {Number}
 */
function getTrNum(length,tdNum){
	if(length>0){
		if(length < tdNum){
			return 1;
		}else{
			var i = parseInt(length/tdNum);
			if(tdNum*i == length){//只会等于或小于
				return parseInt(length/tdNum);
			}else{
				return parseInt(length/tdNum)+1;
			}
		}					
	}
}

/**
 * “Relay信息”标签页第四个子标签“RC输出”，主叫向数据
 * @param {}
 * data
 */
function relayView04_zb_getpath(getpath){
	var html ="";
	html += "<table class='detailTable'>" +
				"<tr>" +
				    "<th>path_id</th>" +
					"<th>综合</th>" +
					"<th>放大</th>" +
					"<th>价格</th>" +
					"<th>类型</th>" +
					"<th>(丢包率，延时，价格)</th>" +
					"<th>路径</th>" +
				"</tr>";
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
		
		var resp_cmd_path_array = getpath.resp_cmd_path_array;
			
		if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
		 $.each(resp_cmd_path_array,function(i,val){
		 	//path_id
		 	var path_id = val.path_id;
		 	
		 	//综合质量
		 	var path_score = val.path_score;
		 	//需要截取到小数点后四位
		 	path_score = path_score.toFixed(4);
		 	//是否放大
		 	var transit_amplifying = val.transit_amplifying;
		 	if(transit_amplifying==true){
		 		transit_amplifying = "是";
		 	}else{
		 		transit_amplifying = "否";
		 	}
		 	//价格
		 	var path_price = val.path_price;
		 	//类型
		 	var property = val.property; 
		 	
		 	//(丢包，延时，价格)
		 	var sub_path_array = val.sub_path_array;
		 	
		 	//详细内容
			html+="<tr>" +
					"<td>"+path_id+"</td>" +
					"<td>"+path_score+"</td>" +
					"<td>"+transit_amplifying+"</td>" +
					"<td>"+path_price+"</td>" +
					"<td>"+property+"</td>" +
					"<td>";
				$.each(sub_path_array,function(j,va){
					//丢包
					var lost ;
					//延时
					var delay ;
					//价格
					var price ;
					
					var quality = va.quality;
					if(quality!=undefined&&quality!=null&&quality!==""){
						//丢包
						lost = quality.lost;
						//延时
						delay = quality.delay;
						//价格
						price = quality.price;
					}
					
					if(lost==undefined||lost==null||lost===""){
						lost = "无";
					}
					if(delay==undefined||delay==null||delay===""){
						delay = "无";
					}
					if(price==undefined||price==null||price===""){
						price = "无";
					}
					
					html += "<div style='width:50px;float:left;margin-left:180px;'>" +
								lost+"%" +
							"</div>"+
							"<div style='width:50px;float:left;'>" +
								delay +
							"</div>"+
							"<div style='width:50px;float:left;'>" +
								price +
							"</div><br/>";
				});
					
			  html+="</td><td>";
					$.each(sub_path_array,function(j,va){
						//详细内容
						var path_info = va.path_info;
								
						var segment = va.segment;
						var R_R = segment.R_R;
						var U_R = segment.U_R;
						
						var dest_id;
						if(U_R!=undefined&&U_R!=null&&U_R!==""){
							dest_id = U_R.dest_id;
						}
						if(dest_id==undefined||dest_id==null||dest_id===""){
							dest_id = "无";
						}
						//如果不存在R_R，中间的Relay就用U_R中的来取
						html += "Us→R"+dest_id+"→";
						//有的子路径不存在R_R，这个必须判断
						if(R_R!=undefined&&R_R!=null&&R_R!=""){
							$.each(R_R,function(k,v){
								if(v!=undefined&&v!=null&&v!==""){
									if(v.dest_id!=undefined&&v.dest_id!=null&&v.dest_id!==""){
										html += "R"+v.dest_id+"→";
									}
								}
							});
						} 
						html += "Ud<br/>";
					});
			  html+="</td>" +
				  "</tr>";
			  });
		 }else{
			html+="<tr><td colspan='7' align='center'>无</td></tr>";
		 }
	}else{
		html+="<tr><td colspan='7' align='center'>无</td></tr>";
	}
	html+="</table>";
	$("#relay0402_zb_02").html(html);
}


/**
 * “Relay信息”标签页第四个子标签“RC输出”，底部relay关系图，主叫向
 * @param {}
 * data
 */
function relayImg_zb_getpath(getpath){
	var html = "";
	if(getpath!=undefined&&getpath!=null&&getpath!==""){
		
		var resp_cmd_path_array = getpath.resp_cmd_path_array;
		if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
			html += "<table class='detailTable'>";
			$.each(resp_cmd_path_array,function(i,val){
				html += "<tr><td id='relayImg_zb"+i+"'></td></tr>";
			});
			html += "</table>";
		
		    $('#relay0402_zb').append(html);
		
			$.each(resp_cmd_path_array,function(i,val){
				//画图函数
				drawPathByDataObject(val,"relayImg_zb"+i);
			});
		}else{
			html += "<table class='detailTable'>"+
						"<tr><td align='center'>无数据，无法展示Relay关系图!</td></tr>"+
				    "</table>";
		 	$('#relay0402_zb').append(html);//必须写在此处，不能写在最后，否则表格行会重复
		}
	}else{
		html += "<table class='detailTable'>"+
					"<tr><td align='center'>无数据，无法展示Relay关系图!</td></tr>"+
			    "</table>";
	 	$('#relay0402_zb').append(html);//必须写在此处，不能写在最后，否则表格行会重复
	}
}

