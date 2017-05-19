/*通话详情callDetail.jsp页面中“丢包统计”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#lost01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.lost_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.lost_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “丢包统计”标签页，主叫端数据
 * @param {} datas
 */
function lostView_zb(datas){
	var result = datas.result;

	/**
	 * 统计者：RtmpServer 统计类型：收包汇总 方向：FlashSDK→RtmpServer sub_type：g_f_l
	 */
	//主叫Flash发包，它的发包即为RtmpServer的收包，因为Flash到RtmpServer是TCP传输，不丢包
	var real_v_num_f_send;//实际收到视频包个数
	var real_v_byte_f_send;//实际收到视频包字节数
	var real_a_num_f_send;//实际收到音频包个数
	var real_a_byte_f_send;//实际收到音频包字节数
	
	var real_up_bps;//通话过程中实际上行码率
	var max_up_bps;//通话过程中最大上行码率
	var min_up_bps;//通话过程中最小上行码率
	
	/**
	 * 统计者：RtmpServer 统计类型：发包汇总 方向：RtmpServer→ConnectSDK sub_type：g_c_r
	 */
	//主叫RtmpServer发包
	var real_v_num_g_send;//实际发送视频包个数
	var real_v_byte_g_send;//实际发送视频包字节数
	var real_a_num_g_send;//实际发送音频包个数
	var real_a_byte_g_send;//实际发送音频包字节数

	
	//主叫ConnectSDK
	//主叫发包带宽(SBW)
	var max ;//最大带宽
	var avg ;//平均带宽
	var min ;//最小带宽
	
	//主叫发包统计(CSS)	
	var a_send ;//音频发包数(a_send)
	var a_send_byte ;//音频发包量(a_byte)
	var v_send ;//视频发包数(v_send)
	var v_send_byte;//视频发包量(v_byte)

	var vf_send ;//FEC发包数(vf_send)
	var vf_send_byte ;//FEC发包量(vf_byte)

	var send ;//总发包数(send)
	var send_byte ;//总发包量(byte)	
	var sendto_failure ;//(sendto_failure)
	
	
	//被叫ConnectSDK
	//被叫收包统计(CSR)
	var a_recv ;//音频流收包总数
	var a_loss ;//音频流丢包数
	var a_loss_r ;//音频流丢包率
	var v_recv ;//视频流收包总数
	var v_should_recv ;//视频流应收包数
	var v_original_real_recv ;//视频流原始实际收包数
	var v_original_loss ;//视频流原始丢包数
	var v_recover_by_fec;//fec恢复出的视频包数
	var v_after_fec_recover_loss ;//fec恢复后的视频流丢包数
	var v_original_loss_r;//视频流原始丢包率
	var v_after_fec_recover_loss_r ;//fec恢复后的视频流丢包率
	var vf_recover_r ;//fec的纠错率
	
	/**
	 * 统计者：RtmpServer 统计类型：收包汇总 方向：ConnectSDK→rtmpServer sub_type：g_c_l
	 */
	//被叫RtmpServer收包
	var real_v_num_g_recv;//实际收到视频包个数
	var real_v_byte_g_recv;//实际收到视频包字节数
	var real_a_num_g_recv;//实际收到音频包个数
	var real_a_byte_g_recv;//实际收到音频包字节数

	/**
	 * 统计者：RtmpServer 统计类型：发包汇总 方向：rtmpServer→FlashSDK sub_type：g_f_r 
	 */
	//被叫Flash收包与丢包
	var v_lost_num_g_lost;//丢弃视频包个数
	var v_lost_byte_g_lost;//丢弃视频包字节数
	var a_lost_num_g_lost;//丢弃音频包个数
	var a_lost_byte_g_lost;//丢弃音频包字节数
	var real_v_num_f_recv;//实际收到视频包个数
	var real_v_byte_f_recv;//实际收到视频包字节数
	var real_a_num_f_recv;//实际收到音频包个数
	var real_a_byte_f_recv;//实际收到音频包字节数
	var real_down_bps;//通话过程中实际下行码率
	var max_down_bps;//通话过程中最大下行码率
	var min_down_bps;//通话过程中最小下行码率

	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						var g_count_result;
						var g_f_l;//主叫Flash发包
						var g_c_r;//主叫RtmpServer发包
						
						g_count_result = stream.g_count_result;
						
						if(g_count_result!=undefined&&g_count_result!=null&&g_count_result!==""){
							//主叫Flash发包
							var g_f_l = g_count_result.g_f_l;
							if(g_f_l!=undefined&&g_f_l!=null&&g_f_l!==""){
								
								var g_f_l_arr = new Array();
								var g_f_l_map = new Map();
								
								g_f_l_arr = g_f_l.split(" ");								
								if(g_f_l_arr!=undefined&&g_f_l_arr!=null&&g_f_l_arr!==""&&g_f_l_arr instanceof Array){
									$.each(g_f_l_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_f_l_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								if(g_f_l_map!=undefined&&g_f_l_map!=null&&g_f_l_map!==""){
									real_v_num_f_send = g_f_l_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_f_send = g_f_l_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_f_send = g_f_l_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_f_send = g_f_l_map.get("real_a_byte");//实际收到音频包字节数
									
									real_up_bps = g_f_l_map.get("real_up_bps");//通话过程中实际上行码率
									max_up_bps = g_f_l_map.get("max_up_bps");//通话过程中最大上行码率
									min_up_bps = g_f_l_map.get("min_up_bps");//通话过程中最小上行码率
								}
							}
							
							//主叫RtmpServer发包
							g_c_r = g_count_result.g_c_r;
							if(g_c_r!=undefined&&g_c_r!=null&&g_c_r!==""){
								var g_c_r_arr = new Array();
								var g_c_r_map = new Map();
								
								g_c_r_arr = g_c_r.split(" ");
								if(g_c_r_arr!=undefined&&g_c_r_arr!=null&&g_c_r_arr!==""&&g_c_r_arr instanceof Array){
									$.each(g_c_r_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_c_r_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_c_r_map!=undefined&&g_c_r_map!=null&&g_c_r_map!==""){
									real_v_num_g_send = g_c_r_map.get("real_v_num");//实际发送视频包个数
									real_v_byte_g_send = g_c_r_map.get("real_v_byte");//实际发送视频包字节数
									real_a_num_g_send = g_c_r_map.get("real_a_num");//实际发送音频包个数
									real_a_byte_g_send = g_c_r_map.get("real_a_byte");//实际发送音频包字节数
								}
							}
						}
						
						//主叫ConnectSDK发包带宽
						var bw = stream.bw;
						if(bw!=undefined&&bw!=null&&bw!==""){
							var bwArr = bw.split(' ');
							var mapbw = new Map();
							$.each(bwArr,function(i,val){
								mapbw.put(val.split('=')[0],val.split('=')[1]);
							});
							max = mapbw.get('max');//最大带宽
							avg = mapbw.get('avg');//平均带宽
							min = mapbw.get('min');//最小带宽
						}
						
						//主叫ConnectSDK发包统计
						send = stream.send;
						if(send!=undefined&&send!=null&&send!==""){
							var sendArr = send.split(' ');
							var mapsend = new Map();
							$.each(sendArr,function(i,val){
								mapsend.put(val.split('=')[0],val.split('=')[1]);
							});
							
							a_send = mapsend.get('a_send');//音频发包数(a_send)
							a_send_byte = mapsend.get('a_send_byte');//音频发包量(a_byte)
							v_send = mapsend.get('v_send');//视频发包数(v_send)
							v_send_byte = mapsend.get('v_send_byte');//视频发包量(v_byte)
						
							vf_send = mapsend.get('vf_send');//FEC发包数(vf_send)
							vf_send_byte = mapsend.get('vf_send_byte');//FEC发包量(vf_byte)
						
							send = mapsend.get('send');//总发包数(send)
							send_byte = mapsend.get('send_byte');//总发包量(byte)	
							sendto_failure = mapsend.get('sendto_failure');//(sendto_failure)
						}
					}
				}
			}
			
			//获取被叫端的收包
			var called = data.called;
			
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						
						var g_count_result;
						var g_c_l;
						var g_f_r;
						
						g_count_result = stream.g_count_result;
						if(g_count_result!=undefined&&g_count_result!=null&&g_count_result!==""){
							//被叫RtmpServer收包
							g_c_l = g_count_result.g_c_l;
							if(g_c_l!=undefined&&g_c_l!=null&&g_c_l!==""){
								var g_c_l_arr = new Array();
								var g_c_l_map = new Map();
								g_c_l_arr = g_c_l.split(" ");
								if(g_c_l_arr!=undefined&&g_c_l_arr!=null&&g_c_l_arr!==""&&g_c_l_arr instanceof Array){
									$.each(g_c_l_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_c_l_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_c_l_map!=undefined&&g_c_l_map!=null&&g_c_l_map!==""){
									real_v_num_g_recv = g_c_l_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_g_recv = g_c_l_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_g_recv = g_c_l_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_g_recv = g_c_l_map.get("real_a_byte");//实际收到音频包字节数
								}
							}
							
							//被叫RtmpServer丢包和被叫Flash收包
							g_f_r = g_count_result.g_f_r;
							if(g_f_r!=undefined&&g_f_r!=null&&g_f_r!==""){
								var g_f_r_arr = new Array();
								var g_f_r_map = new Map();
								g_f_r_arr = g_f_r.split(" ");
								if(g_f_r_arr!=undefined&&g_f_r_arr!=null&&g_f_r_arr!==""){
									$.each(g_f_r_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_f_r_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_f_r_map!=undefined&&g_f_r_map!=null&&g_f_r_map!==""){
									v_lost_num_g_lost = g_f_r_map.get("v_lost_num");//丢弃视频包个数
									v_lost_byte_g_lost = g_f_r_map.get("v_lost_byte");//丢弃视频包字节数
									a_lost_num_g_lost = g_f_r_map.get("a_lost_num");//丢弃音频包个数
									a_lost_byte_g_lost = g_f_r_map.get("a_lost_byte");//丢弃音频包字节数
									real_v_num_f_recv = g_f_r_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_f_recv = g_f_r_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_f_recv = g_f_r_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_f_recv = g_f_r_map.get("real_a_byte");//实际收到音频包字节数
									real_down_bps = g_f_r_map.get("real_down_bps");//通话过程中实际下行码率
									max_down_bps = g_f_r_map.get("max_down_bps");//通话过程中最大下行码率
									min_down_bps = g_f_r_map.get("min_down_bps");//通话过程中最小下行码率
								}
							}
						}
						
						//被叫ConnectSDK收包
						var recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = recv.split(' ');
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							
							a_recv = maprecv.get('a_recv');//音频流收包总数()
							a_loss = maprecv.get('a_loss');//音频流丢包数()
							a_loss_r = maprecv.get('a_loss_r');//音频流丢包率()
							v_recv = maprecv.get('v_recv');//视频流收包总数()
							v_should_recv = maprecv.get('v_should_recv');//视频流应收包数()
							v_original_real_recv = maprecv.get('v_original_real_recv');//视频流原始实际收包数()
							v_original_loss = maprecv.get('v_original_loss');//视频流原始丢包数()
							v_recover_by_fec = maprecv.get('v_recover_by_fec');//fec恢复出的视频包数()
							v_after_fec_recover_loss = maprecv.get('v_after_fec_recover_loss');//fec恢复后的视频流丢包数()
							v_original_loss_r = maprecv.get('v_original_loss_r');//视频流原始丢包率()
							v_after_fec_recover_loss_r = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率()
							vf_recover_r = maprecv.get('vf_recover_r');//fec的纠错率()
						}
						
					}
				}
			}
		}
	}
	
//空值校验，主叫Flash发包	
if(real_v_num_f_send==undefined||real_v_num_f_send==null||real_v_num_f_send===""){
	real_v_num_f_send = "--";
}
if(real_v_byte_f_send==undefined||real_v_byte_f_send==null||real_v_byte_f_send===""){
	real_v_byte_f_send = "--";
}
if(real_a_num_f_send==undefined||real_a_num_f_send==null||real_a_num_f_send===""){
	real_a_num_f_send = "--";
}
if(real_a_byte_f_send==undefined||real_a_byte_f_send==null||real_a_byte_f_send===""){
	real_a_byte_f_send = "--";
}
if(real_up_bps==undefined||real_up_bps==null||real_up_bps===""){
	real_up_bps = "--";
}
if(max_up_bps==undefined||max_up_bps==null||max_up_bps===""){
	max_up_bps = "--";
}
if(min_up_bps==undefined||min_up_bps==null||min_up_bps===""){
	min_up_bps = "--";
}
									 
//空值校验，主叫RtmpServer发包
if(real_v_num_g_send==undefined||real_v_num_g_send==null||real_v_num_g_send===""){
	real_v_num_g_send = "--";
}
if(real_v_byte_g_send==undefined||real_v_byte_g_send==null||real_v_byte_g_send===""){
	real_v_byte_g_send = "--";
}
if(real_a_num_g_send==undefined||real_a_num_g_send==null||real_a_num_g_send===""){
	real_a_num_g_send = "--";
}
if(real_a_byte_g_send==undefined||real_a_byte_g_send==null||real_a_byte_g_send===""){
	real_a_byte_g_send = "--";
}

//空值校验，主叫ConnectSDK发包统计
if(a_send==undefined||a_send==null||a_send===""){
	a_send = "--";
}
if(a_send_byte==undefined||a_send_byte==null||a_send_byte===""){
	a_send_byte = "--";
}
if(v_send==undefined||v_send==null||v_send===""){
	v_send = "--";
}
if(v_send_byte==undefined||v_send_byte==null||v_send_byte===""){
	v_send_byte = "--";
}
if(vf_send==undefined||vf_send==null||vf_send===""){
	vf_send = "--";
}
if(vf_send_byte==undefined||vf_send_byte==null||vf_send_byte===""){
	vf_send_byte = "--";
}
if(send==undefined||send==null||send===""){
	send = "--";
}
if(send_byte==undefined||send_byte==null||send_byte===""){
	send_byte = "--";
}
if(sendto_failure==undefined||sendto_failure==null||sendto_failure===""){
	sendto_failure = "--";
}
	
//空值校验，主叫ConnectSDK发包带宽
if(max==undefined||max==null||max===""){
	max = "--";
}
if(avg==undefined||avg==null||avg===""){
	avg = "--";
}
if(min==undefined||min==null||min===""){
	min = "--";
}

//空值校验，被叫ConnectSDK收包统计
if(a_recv==undefined||a_recv==null||a_recv===""){
a_recv = "--";
}
if(a_loss==undefined||a_loss==null||a_loss===""){
a_loss = "--";
}
if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
	a_loss_r = "--";
}
if(v_recv==undefined||v_recv==null||v_recv===""){
	v_recv = "--";
}
if(v_should_recv==undefined||v_should_recv==null||v_should_recv===""){
	v_should_recv = "--";
}
if(v_original_real_recv==undefined||v_original_real_recv==null||v_original_real_recv===""){
	v_original_real_recv = "--";
}
if(v_original_loss==undefined||v_original_loss==null||v_original_loss===""){
	v_original_loss = "--";
}
if(v_recover_by_fec==undefined||v_recover_by_fec==null||v_recover_by_fec===""){
	v_recover_by_fec = "--";
}
if(v_after_fec_recover_loss==undefined||v_after_fec_recover_loss==null||v_after_fec_recover_loss===""){
	v_after_fec_recover_loss = "--";
}
if(v_original_loss_r==undefined||v_original_loss_r==null||v_original_loss_r===""){
	v_original_loss_r = "--";
}
if(v_after_fec_recover_loss_r==undefined||v_after_fec_recover_loss_r==null||v_after_fec_recover_loss_r===""){
	v_after_fec_recover_loss_r = "--";
}
if(vf_recover_r==undefined||vf_recover_r==null||vf_recover_r===""){
	vf_recover_r = "--";
}

//空值校验，被叫RtmpServer收包
if(real_v_num_g_recv==undefined||real_v_num_g_recv==null||real_v_num_g_recv===""){
	real_v_num_g_recv = "--";
}
if(real_v_byte_g_recv==undefined||real_v_byte_g_recv==null||real_v_byte_g_recv===""){
	real_v_byte_g_recv = "--";
}
if(real_a_num_g_recv==undefined||real_a_num_g_recv==null||real_a_num_g_recv===""){
	real_a_num_g_recv = "--";
}
if(real_a_byte_g_recv==undefined||real_a_byte_g_recv==null||real_a_byte_g_recv===""){
	real_a_byte_g_recv = "--";
}
 

//空值校验，被叫RtmpServer丢包和被叫Flash收包
if(v_lost_num_g_lost==undefined||v_lost_num_g_lost==null||v_lost_num_g_lost===""){
	v_lost_num_g_lost = "--";
}
if(v_lost_byte_g_lost==undefined||v_lost_byte_g_lost==null||v_lost_byte_g_lost===""){
	v_lost_byte_g_lost = "--";
}
if(a_lost_num_g_lost==undefined||a_lost_num_g_lost==null||a_lost_num_g_lost===""){
	a_lost_num_g_lost = "--";
}
if(a_lost_byte_g_lost==undefined||a_lost_byte_g_lost==null||a_lost_byte_g_lost===""){
	a_lost_byte_g_lost = "--";
}
if(real_v_num_f_recv==undefined||real_v_num_f_recv==null||real_v_num_f_recv===""){
	real_v_num_f_recv = "--";
}
if(real_v_byte_f_recv==undefined||real_v_byte_f_recv==null||real_v_byte_f_recv===""){
	real_v_byte_f_recv = "--";
}
if(real_a_num_f_recv==undefined||real_a_num_f_recv==null||real_a_num_f_recv===""){
	real_a_num_f_recv = "--";
}
if(real_a_byte_f_recv==undefined||real_a_byte_f_recv==null||real_a_byte_f_recv===""){
	real_a_byte_f_recv = "--";
}
if(real_down_bps==undefined||real_down_bps==null||real_down_bps===""){
	real_down_bps = "--";
}
if(max_down_bps==undefined||max_down_bps==null||max_down_bps===""){
	max_down_bps = "--";
}
if(min_down_bps==undefined||min_down_bps==null||min_down_bps===""){
	min_down_bps = "--";
}
	
var html = "";
html += "<table class='detailTable'>" +
		"<tr>" +
			"<th>主叫Flash</th>" +
			"<th>主叫RtmpServer</th>" +
			"<th>主叫ConnectSDK</th>" +
			"<th>被叫ConnectSDK</th>" +
			"<th>被叫RtmpServer</th>" +
			"<th>被叫Flash</th>" +
		"</tr>";
html += "<tr>" +
		"<td valign='top'>" +
			"<b>发包：</b>" +"<br/>"+
			"实际发送视频包个数："+real_v_num_f_send+"<br/>"+
			"实际发送视频包字节数："+real_v_byte_f_send+"<br/>"+
			"实际发送音频包个数："+real_a_num_f_send+"<br/>"+
			"实际发送音频包字节数："+real_a_byte_f_send+"<br/>"+
			"通话过程中实际上行码率："+real_up_bps+"<br/>"+
			"通过过程中最大上行码率："+max_up_bps+"<br/>"+
			"通过过程中最小上行码率："+min_up_bps+
		"</td>" +
		"<td valign='top'>" +
			"<b>发包：</b>" +"<br/>"+
			"实际发送视频包个数：" +real_v_num_g_send+"<br/>"+
			"实际发送视频包字节数：" +real_v_byte_g_send+"<br/>"+
			"实际发送音频包个数：" +real_a_num_g_send+"<br/>"+
			"实际发送音频包字节数" +real_a_byte_g_send+
		"</td>" +
		"<td valign='top'>" +
			"<b>发包统计：</b>" +"<br/>"+
			"音频发包数："+a_send+"<br/>"+
			"视频发包数："+v_send+"<br/>"+
			"音频发包量："+a_send_byte+"<br/>"+
			"视频发包量："+v_send_byte+"<br/>"+
			"FEC发包数："+vf_send+"<br/>"+
			"FEC发包量："+vf_send_byte+"<br/>"+
			"总发包数："+send+"<br/>"+
			"总发包量："+send_byte+"<br/>"+
			"发送失败个数："+sendto_failure+"<br/>"+
			"<b>发包带宽：</b>" +"<br/>"+
			"最大带宽："+max+"<br/>"+
			"平均带宽："+avg+"<br/>"+
			"最小带宽："+min+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包统计：</b>" +"<br/>"+
			"音频流收包总数："+a_recv+"<br/>"+
			"视频流收包总数："+v_recv+"<br/>"+
			"音频流丢包数："+a_loss+"<br/>"+
			"音频流丢包率："+a_loss_r+"<br/>"+
			"视频流应收包数："+v_should_recv+"<br/>"+
			"视频流原始实际收包数："+v_original_real_recv+"<br/>"+
			"视频流原始丢包数："+v_original_loss+"<br/>"+
			"fec恢复出的视频包数："+v_recover_by_fec+"<br/>"+
			"fec恢复后的视频流丢包数："+v_after_fec_recover_loss+"<br/>"+
			"视频流原始丢包率："+v_original_loss_r+"<br/>"+
			"fec恢复后的视频流丢包率："+v_after_fec_recover_loss_r+"<br/>"+
			"fec的纠错率："+vf_recover_r+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包：</b>" +"<br/>"+
			"实际收到视频包个数：" +real_v_num_g_recv+"<br/>"+
			"实际收到视频包字节数：" +real_v_byte_g_recv+"<br/>"+
			"实际收到音频包个数：" +real_a_num_g_recv+"<br/>"+
			"实际收到音频包字节数：" +real_a_byte_g_recv+"<br/>"+
			"<b>丢包：</b>" +"<br/>"+
			"丢弃视频包个数：" +v_lost_num_g_lost+"<br/>"+
			"丢弃视频包字节数：" +v_lost_byte_g_lost+"<br/>"+
			"丢弃音频包个数：" +a_lost_num_g_lost+"<br/>"+
			"丢弃音频包字节数：" +a_lost_byte_g_lost+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包：</b>" +"<br/>"+
			"实际收到视频包个数" +real_v_num_f_recv+"<br/>"+
			"实际收到视频包字节数：" +real_v_byte_f_recv+"<br/>"+
			"实际收到音频包个数：" +real_a_num_f_recv+"<br/>"+
			"实际收到音频包字节数：" +real_a_byte_f_recv+"<br/>"+
			"通话过程中实际下行码率：" +real_down_bps+"<br/>"+
			"通话过程中最大下行码率：" +max_down_bps+"<br/>"+
			"通话过程中最小下行码率：" +min_down_bps+
		"</td>" +
	"</tr>" +
	"<tr>" +
		"<td colspan='6'>注：-- 代表未获取到数据</td>" +
	"</tr>";
	
	html += "</table>";
	$('#lost_zb').html(html);
}

/**
 * “丢包统计”标签页，被叫端数据
 * @param {} datas
 */
function lostView_bz(datas){
	
	var result = datas.result;

	/**
	 * 统计者：RtmpServer 统计类型：收包汇总 方向：FlashSDK→RtmpServer sub_type：g_f_l
	 */
	//被叫Flash发包，它的发包即为RtmpServer的收包，因为Flash到RtmpServer是TCP传输，不丢包
	var real_v_num_f_send;//实际收到视频包个数
	var real_v_byte_f_send;//实际收到视频包字节数
	var real_a_num_f_send;//实际收到音频包个数
	var real_a_byte_f_send;//实际收到音频包字节数
	
	var real_up_bps;//通话过程中实际上行码率
	var max_up_bps;//通话过程中最大上行码率
	var min_up_bps;//通话过程中最小上行码率
	
	/**
	 * 统计者：RtmpServer 统计类型：发包汇总 方向：RtmpServer→ConnectSDK sub_type：g_c_r
	 */
	//被叫RtmpServer发包
	var real_v_num_g_send;//实际发送视频包个数
	var real_v_byte_g_send;//实际发送视频包字节数
	var real_a_num_g_send;//实际发送音频包个数
	var real_a_byte_g_send;//实际发送音频包字节数

	
	//被叫ConnectSDK
	//被叫发包带宽(SBW)
	var max ;//最大带宽
	var avg ;//平均带宽
	var min ;//最小带宽
	
	//被叫发包统计(CSS)	
	var a_send ;//音频发包数(a_send)
	var a_send_byte ;//音频发包量(a_byte)
	var v_send ;//视频发包数(v_send)
	var v_send_byte;//视频发包量(v_byte)

	var vf_send ;//FEC发包数(vf_send)
	var vf_send_byte ;//FEC发包量(vf_byte)

	var send ;//总发包数(send)
	var send_byte ;//总发包量(byte)	
	var sendto_failure ;//(sendto_failure)
	
	
	//主叫ConnectSDK
	//主叫收包统计(CSR)
	var a_recv ;//音频流收包总数
	var a_loss ;//音频流丢包数
	var a_loss_r ;//音频流丢包率
	var v_recv ;//视频流收包总数
	var v_should_recv ;//视频流应收包数
	var v_original_real_recv ;//视频流原始实际收包数
	var v_original_loss ;//视频流原始丢包数
	var v_recover_by_fec;//fec恢复出的视频包数
	var v_after_fec_recover_loss ;//fec恢复后的视频流丢包数
	var v_original_loss_r;//视频流原始丢包率
	var v_after_fec_recover_loss_r ;//fec恢复后的视频流丢包率
	var vf_recover_r ;//fec的纠错率
	
	/**
	 * 统计者：RtmpServer 统计类型：收包汇总 方向：ConnectSDK→rtmpServer sub_type：g_c_l
	 */
	//主叫RtmpServer收包
	var real_v_num_g_recv;//实际收到视频包个数
	var real_v_byte_g_recv;//实际收到视频包字节数
	var real_a_num_g_recv;//实际收到音频包个数
	var real_a_byte_g_recv;//实际收到音频包字节数

	/**
	 * 统计者：RtmpServer 统计类型：发包汇总 方向：rtmpServer→FlashSDK sub_type：g_f_r 
	 */
	//主叫Flash收包与丢包
	var v_lost_num_g_lost;//丢弃视频包个数
	var v_lost_byte_g_lost;//丢弃视频包字节数
	var a_lost_num_g_lost;//丢弃音频包个数
	var a_lost_byte_g_lost;//丢弃音频包字节数
	var real_v_num_f_recv;//实际收到视频包个数
	var real_v_byte_f_recv;//实际收到视频包字节数
	var real_a_num_f_recv;//实际收到音频包个数
	var real_a_byte_f_recv;//实际收到音频包字节数
	var real_down_bps;//通话过程中实际下行码率
	var max_down_bps;//通话过程中最大下行码率
	var min_down_bps;//通话过程中最小下行码率

	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					var stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						var g_count_result;
						var g_f_l;//被叫Flash发包
						var g_c_r;//被叫RtmpServer发包
						
						g_count_result = stream.g_count_result;
						
						if(g_count_result!=undefined&&g_count_result!=null&&g_count_result!==""){
							//被叫Flash发包
							var g_f_l = g_count_result.g_f_l;
							if(g_f_l!=undefined&&g_f_l!=null&&g_f_l!==""){
								
								var g_f_l_arr = new Array();
								var g_f_l_map = new Map();
								
								g_f_l_arr = g_f_l.split(" ");								
								if(g_f_l_arr!=undefined&&g_f_l_arr!=null&&g_f_l_arr!==""&&g_f_l_arr instanceof Array){
									$.each(g_f_l_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_f_l_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								if(g_f_l_map!=undefined&&g_f_l_map!=null&&g_f_l_map!==""){
									real_v_num_f_send = g_f_l_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_f_send = g_f_l_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_f_send = g_f_l_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_f_send = g_f_l_map.get("real_a_byte");//实际收到音频包字节数
									
									real_up_bps = g_f_l_map.get("real_up_bps");//通话过程中实际上行码率
									max_up_bps = g_f_l_map.get("max_up_bps");//通话过程中最大上行码率
									min_up_bps = g_f_l_map.get("min_up_bps");//通话过程中最小上行码率
								}
							}
							
							//被叫RtmpServer发包
							g_c_r = g_count_result.g_c_r;
							if(g_c_r!=undefined&&g_c_r!=null&&g_c_r!==""){
								var g_c_r_arr = new Array();
								var g_c_r_map = new Map();
								
								g_c_r_arr = g_c_r.split(" ");
								if(g_c_r_arr!=undefined&&g_c_r_arr!=null&&g_c_r_arr!==""&&g_c_r_arr instanceof Array){
									$.each(g_c_r_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_c_r_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_c_r_map!=undefined&&g_c_r_map!=null&&g_c_r_map!==""){
									real_v_num_g_send = g_c_r_map.get("real_v_num");//实际发送视频包个数
									real_v_byte_g_send = g_c_r_map.get("real_v_byte");//实际发送视频包字节数
									real_a_num_g_send = g_c_r_map.get("real_a_num");//实际发送音频包个数
									real_a_byte_g_send = g_c_r_map.get("real_a_byte");//实际发送音频包字节数
								}
							}
						}
						
						//被叫ConnectSDK发包带宽
						var bw = stream.bw;
						if(bw!=undefined&&bw!=null&&bw!==""){
							var bwArr = bw.split(' ');
							var mapbw = new Map();
							$.each(bwArr,function(i,val){
								mapbw.put(val.split('=')[0],val.split('=')[1]);
							});
							max = mapbw.get('max');//最大带宽
							avg = mapbw.get('avg');//平均带宽
							min = mapbw.get('min');//最小带宽
						}
						
						//被叫ConnectSDK发包统计
						send = stream.send;
						if(send!=undefined&&send!=null&&send!==""){
							var sendArr = send.split(' ');
							var mapsend = new Map();
							$.each(sendArr,function(i,val){
								mapsend.put(val.split('=')[0],val.split('=')[1]);
							});
							
							a_send = mapsend.get('a_send');//音频发包数(a_send)
							a_send_byte = mapsend.get('a_send_byte');//音频发包量(a_byte)
							v_send = mapsend.get('v_send');//视频发包数(v_send)
							v_send_byte = mapsend.get('v_send_byte');//视频发包量(v_byte)
						
							vf_send = mapsend.get('vf_send');//FEC发包数(vf_send)
							vf_send_byte = mapsend.get('vf_send_byte');//FEC发包量(vf_byte)
						
							send = mapsend.get('send');//总发包数(send)
							send_byte = mapsend.get('send_byte');//总发包量(byte)	
							sendto_failure = mapsend.get('sendto_failure');//(sendto_failure)
						}
					}
				}
			}
			
			//获取主叫端的收包
			var caller = data.caller;
			
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						
						var g_count_result;
						var g_c_l;
						var g_f_r;
						
						g_count_result = stream.g_count_result;
						if(g_count_result!=undefined&&g_count_result!=null&&g_count_result!==""){
							//主叫RtmpServer收包
							g_c_l = g_count_result.g_c_l;
							if(g_c_l!=undefined&&g_c_l!=null&&g_c_l!==""){
								var g_c_l_arr = new Array();
								var g_c_l_map = new Map();
								g_c_l_arr = g_c_l.split(" ");
								if(g_c_l_arr!=undefined&&g_c_l_arr!=null&&g_c_l_arr!==""&&g_c_l_arr instanceof Array){
									$.each(g_c_l_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_c_l_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_c_l_map!=undefined&&g_c_l_map!=null&&g_c_l_map!==""){
									real_v_num_g_recv = g_c_l_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_g_recv = g_c_l_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_g_recv = g_c_l_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_g_recv = g_c_l_map.get("real_a_byte");//实际收到音频包字节数
								}
							}
							
							//主叫RtmpServer丢包和被叫Flash收包
							g_f_r = g_count_result.g_f_r;
							if(g_f_r!=undefined&&g_f_r!=null&&g_f_r!==""){
								var g_f_r_arr = new Array();
								var g_f_r_map = new Map();
								g_f_r_arr = g_f_r.split(" ");
								if(g_f_r_arr!=undefined&&g_f_r_arr!=null&&g_f_r_arr!==""){
									$.each(g_f_r_arr,function(i,val){
										if(val!=undefined&&val!=null&&val!==""){
											var valArr = new Array();
											valArr = val.split("=");
											if(valArr!=undefined&&valArr!=null&&valArr!==""&&valArr instanceof Array){
												g_f_r_map.put(valArr[0],valArr[1]);
											}
										}
									});
								}
								
								if(g_f_r_map!=undefined&&g_f_r_map!=null&&g_f_r_map!==""){
									v_lost_num_g_lost = g_f_r_map.get("v_lost_num");//丢弃视频包个数
									v_lost_byte_g_lost = g_f_r_map.get("v_lost_byte");//丢弃视频包字节数
									a_lost_num_g_lost = g_f_r_map.get("a_lost_num");//丢弃音频包个数
									a_lost_byte_g_lost = g_f_r_map.get("a_lost_byte");//丢弃音频包字节数
									real_v_num_f_recv = g_f_r_map.get("real_v_num");//实际收到视频包个数
									real_v_byte_f_recv = g_f_r_map.get("real_v_byte");//实际收到视频包字节数
									real_a_num_f_recv = g_f_r_map.get("real_a_num");//实际收到音频包个数
									real_a_byte_f_recv = g_f_r_map.get("real_a_byte");//实际收到音频包字节数
									real_down_bps = g_f_r_map.get("real_down_bps");//通话过程中实际下行码率
									max_down_bps = g_f_r_map.get("max_down_bps");//通话过程中最大下行码率
									min_down_bps = g_f_r_map.get("min_down_bps");//通话过程中最小下行码率
								}
							}
						}
						//主叫ConnectSDK收包
						var recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = recv.split(' ');
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							
							a_recv = maprecv.get('a_recv');//音频流收包总数()
							a_loss = maprecv.get('a_loss');//音频流丢包数()
							a_loss_r = maprecv.get('a_loss_r');//音频流丢包率()
							v_recv = maprecv.get('v_recv');//视频流收包总数()
							v_should_recv = maprecv.get('v_should_recv');//视频流应收包数()
							v_original_real_recv = maprecv.get('v_original_real_recv');//视频流原始实际收包数()
							v_original_loss = maprecv.get('v_original_loss');//视频流原始丢包数()
							v_recover_by_fec = maprecv.get('v_recover_by_fec');//fec恢复出的视频包数()
							v_after_fec_recover_loss = maprecv.get('v_after_fec_recover_loss');//fec恢复后的视频流丢包数()
							v_original_loss_r = maprecv.get('v_original_loss_r');//视频流原始丢包率()
							v_after_fec_recover_loss_r = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率()
							vf_recover_r = maprecv.get('vf_recover_r');//fec的纠错率()
						}
						
					}
				}
			}
		}
	}
	
//空值校验，被叫Flash发包	
if(real_v_num_f_send==undefined||real_v_num_f_send==null||real_v_num_f_send===""){
	real_v_num_f_send = "--";
}
if(real_v_byte_f_send==undefined||real_v_byte_f_send==null||real_v_byte_f_send===""){
	real_v_byte_f_send = "--";
}
if(real_a_num_f_send==undefined||real_a_num_f_send==null||real_a_num_f_send===""){
	real_a_num_f_send = "--";
}
if(real_a_byte_f_send==undefined||real_a_byte_f_send==null||real_a_byte_f_send===""){
	real_a_byte_f_send = "--";
}
if(real_up_bps==undefined||real_up_bps==null||real_up_bps===""){
	real_up_bps = "--";
}
if(max_up_bps==undefined||max_up_bps==null||max_up_bps===""){
	max_up_bps = "--";
}
if(min_up_bps==undefined||min_up_bps==null||min_up_bps===""){
	min_up_bps = "--";
}
									 
//空值校验，被叫RtmpServer发包
if(real_v_num_g_send==undefined||real_v_num_g_send==null||real_v_num_g_send===""){
	real_v_num_g_send = "--";
}
if(real_v_byte_g_send==undefined||real_v_byte_g_send==null||real_v_byte_g_send===""){
	real_v_byte_g_send = "--";
}
if(real_a_num_g_send==undefined||real_a_num_g_send==null||real_a_num_g_send===""){
	real_a_num_g_send = "--";
}
if(real_a_byte_g_send==undefined||real_a_byte_g_send==null||real_a_byte_g_send===""){
	real_a_byte_g_send = "--";
}

//空值校验，被叫ConnectSDK发包统计
if(a_send==undefined||a_send==null||a_send===""){
	a_send = "--";
}
if(a_send_byte==undefined||a_send_byte==null||a_send_byte===""){
	a_send_byte = "--";
}
if(v_send==undefined||v_send==null||v_send===""){
	v_send = "--";
}
if(v_send_byte==undefined||v_send_byte==null||v_send_byte===""){
	v_send_byte = "--";
}
if(vf_send==undefined||vf_send==null||vf_send===""){
	vf_send = "--";
}
if(vf_send_byte==undefined||vf_send_byte==null||vf_send_byte===""){
	vf_send_byte = "--";
}
if(send==undefined||send==null||send===""){
	send = "--";
}
if(send_byte==undefined||send_byte==null||send_byte===""){
	send_byte = "--";
}
if(sendto_failure==undefined||sendto_failure==null||sendto_failure===""){
	sendto_failure = "--";
}
	
//空值校验，被叫ConnectSDK发包带宽
if(max==undefined||max==null||max===""){
	max = "--";
}
if(avg==undefined||avg==null||avg===""){
	avg = "--";
}
if(min==undefined||min==null||min===""){
	min = "--";
}

//空值校验，主叫ConnectSDK收包统计
if(a_recv==undefined||a_recv==null||a_recv===""){
a_recv = "--";
}
if(a_loss==undefined||a_loss==null||a_loss===""){
a_loss = "--";
}
if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
	a_loss_r = "--";
}
if(v_recv==undefined||v_recv==null||v_recv===""){
	v_recv = "--";
}
if(v_should_recv==undefined||v_should_recv==null||v_should_recv===""){
	v_should_recv = "--";
}
if(v_original_real_recv==undefined||v_original_real_recv==null||v_original_real_recv===""){
	v_original_real_recv = "--";
}
if(v_original_loss==undefined||v_original_loss==null||v_original_loss===""){
	v_original_loss = "--";
}
if(v_recover_by_fec==undefined||v_recover_by_fec==null||v_recover_by_fec===""){
	v_recover_by_fec = "--";
}
if(v_after_fec_recover_loss==undefined||v_after_fec_recover_loss==null||v_after_fec_recover_loss===""){
	v_after_fec_recover_loss = "--";
}
if(v_original_loss_r==undefined||v_original_loss_r==null||v_original_loss_r===""){
	v_original_loss_r = "--";
}
if(v_after_fec_recover_loss_r==undefined||v_after_fec_recover_loss_r==null||v_after_fec_recover_loss_r===""){
	v_after_fec_recover_loss_r = "--";
}
if(vf_recover_r==undefined||vf_recover_r==null||vf_recover_r===""){
	vf_recover_r = "--";
}

//空值校验，主叫RtmpServer收包
if(real_v_num_g_recv==undefined||real_v_num_g_recv==null||real_v_num_g_recv===""){
	real_v_num_g_recv = "--";
}
if(real_v_byte_g_recv==undefined||real_v_byte_g_recv==null||real_v_byte_g_recv===""){
	real_v_byte_g_recv = "--";
}
if(real_a_num_g_recv==undefined||real_a_num_g_recv==null||real_a_num_g_recv===""){
	real_a_num_g_recv = "--";
}
if(real_a_byte_g_recv==undefined||real_a_byte_g_recv==null||real_a_byte_g_recv===""){
	real_a_byte_g_recv = "--";
}
 

//空值校验，主叫RtmpServer丢包和被叫Flash收包
if(v_lost_num_g_lost==undefined||v_lost_num_g_lost==null||v_lost_num_g_lost===""){
	v_lost_num_g_lost = "--";
}
if(v_lost_byte_g_lost==undefined||v_lost_byte_g_lost==null||v_lost_byte_g_lost===""){
	v_lost_byte_g_lost = "--";
}
if(a_lost_num_g_lost==undefined||a_lost_num_g_lost==null||a_lost_num_g_lost===""){
	a_lost_num_g_lost = "--";
}
if(a_lost_byte_g_lost==undefined||a_lost_byte_g_lost==null||a_lost_byte_g_lost===""){
	a_lost_byte_g_lost = "--";
}
if(real_v_num_f_recv==undefined||real_v_num_f_recv==null||real_v_num_f_recv===""){
	real_v_num_f_recv = "--";
}
if(real_v_byte_f_recv==undefined||real_v_byte_f_recv==null||real_v_byte_f_recv===""){
	real_v_byte_f_recv = "--";
}
if(real_a_num_f_recv==undefined||real_a_num_f_recv==null||real_a_num_f_recv===""){
	real_a_num_f_recv = "--";
}
if(real_a_byte_f_recv==undefined||real_a_byte_f_recv==null||real_a_byte_f_recv===""){
	real_a_byte_f_recv = "--";
}
if(real_down_bps==undefined||real_down_bps==null||real_down_bps===""){
	real_down_bps = "--";
}
if(max_down_bps==undefined||max_down_bps==null||max_down_bps===""){
	max_down_bps = "--";
}
if(min_down_bps==undefined||min_down_bps==null||min_down_bps===""){
	min_down_bps = "--";
}
	
var html = "";
html += "<table class='detailTable'>" +
		"<tr>" +
			"<th>被叫Flash</th>" +
			"<th>被叫RtmpServer</th>" +
			"<th>被叫ConnectSDK</th>" +
			"<th>主叫ConnectSDK</th>" +
			"<th>主叫RtmpServer</th>" +
			"<th>主叫Flash</th>" +
		"</tr>";
html += "<tr>" +
		"<td valign='top'>" +
			"<b>发包：</b>" +"<br/>"+
			"实际发送视频包个数："+real_v_num_f_send+"<br/>"+
			"实际发送视频包字节数："+real_v_byte_f_send+"<br/>"+
			"实际发送音频包个数："+real_a_num_f_send+"<br/>"+
			"实际发送音频包字节数："+real_a_byte_f_send+"<br/>"+
			"通话过程中实际上行码率："+real_up_bps+"<br/>"+
			"通过过程中最大上行码率："+max_up_bps+"<br/>"+
			"通过过程中最小上行码率："+min_up_bps+
		"</td>" +
		"<td valign='top'>" +
			"<b>发包：</b>" +"<br/>"+
			"实际发送视频包个数：" +real_v_num_g_send+"<br/>"+
			"实际发送视频包字节数：" +real_v_byte_g_send+"<br/>"+
			"实际发送音频包个数：" +real_a_num_g_send+"<br/>"+
			"实际发送音频包字节数" +real_a_byte_g_send+
		"</td>" +
		"<td valign='top'>" +
			"<b>发包统计：</b>" +"<br/>"+
			"音频发包数："+a_send+"<br/>"+
			"视频发包数："+v_send+"<br/>"+
			"音频发包量："+a_send_byte+"<br/>"+
			"视频发包量："+v_send_byte+"<br/>"+
			"FEC发包数："+vf_send+"<br/>"+
			"FEC发包量："+vf_send_byte+"<br/>"+
			"总发包数："+send+"<br/>"+
			"总发包量："+send_byte+"<br/>"+
			"发送失败个数："+sendto_failure+"<br/>"+
			"<b>发包带宽：</b>" +"<br/>"+
			"最大带宽："+max+"<br/>"+
			"平均带宽："+avg+"<br/>"+
			"最小带宽："+min+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包统计：</b>" +"<br/>"+
			"音频流收包总数："+a_recv+"<br/>"+
			"视频流收包总数："+v_recv+"<br/>"+
			"音频流丢包数："+a_loss+"<br/>"+
			"音频流丢包率："+a_loss_r+"<br/>"+
			"视频流应收包数："+v_should_recv+"<br/>"+
			"视频流原始实际收包数："+v_original_real_recv+"<br/>"+
			"视频流原始丢包数："+v_original_loss+"<br/>"+
			"fec恢复出的视频包数："+v_recover_by_fec+"<br/>"+
			"fec恢复后的视频流丢包数："+v_after_fec_recover_loss+"<br/>"+
			"视频流原始丢包率："+v_original_loss_r+"<br/>"+
			"fec恢复后的视频流丢包率："+v_after_fec_recover_loss_r+"<br/>"+
			"fec的纠错率："+vf_recover_r+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包：</b>" +"<br/>"+
			"实际收到视频包个数：" +real_v_num_g_recv+"<br/>"+
			"实际收到视频包字节数：" +real_v_byte_g_recv+"<br/>"+
			"实际收到音频包个数：" +real_a_num_g_recv+"<br/>"+
			"实际收到音频包字节数：" +real_a_byte_g_recv+"<br/>"+
			"<b>丢包：</b>" +"<br/>"+
			"丢弃视频包个数：" +v_lost_num_g_lost+"<br/>"+
			"丢弃视频包字节数：" +v_lost_byte_g_lost+"<br/>"+
			"丢弃音频包个数：" +a_lost_num_g_lost+"<br/>"+
			"丢弃音频包字节数：" +a_lost_byte_g_lost+
		"</td>" +
		"<td valign='top'>" +
			"<b>收包：</b>" +"<br/>"+
			"实际收到视频包个数" +real_v_num_f_recv+"<br/>"+
			"实际收到视频包字节数：" +real_v_byte_f_recv+"<br/>"+
			"实际收到音频包个数：" +real_a_num_f_recv+"<br/>"+
			"实际收到音频包字节数：" +real_a_byte_f_recv+"<br/>"+
			"通话过程中实际下行码率：" +real_down_bps+"<br/>"+
			"通话过程中最大下行码率：" +max_down_bps+"<br/>"+
			"通话过程中最小下行码率：" +min_down_bps+
		"</td>" +
	"</tr>" +
	"<tr>" +
		"<td colspan='6'>注：-- 代表未获取到数据</td>" +
	"</tr>";
	
	html += "</table>";
	$('#lost_bz').html(html);
}