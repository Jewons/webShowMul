/*通话详情callDetail.jsp页面中“数据日志”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#log01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();
			
			$('.log_tabs li a').click(function() {
						var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.log_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						//当点击标签时，触发方法
						//logSwitch(id,logsid);
						return false;
					}).filter(':first').click();
		});
		
var logsid = "";


var jjjjj = "{\"10\":\"eventtype=event event=sip_event_m_ringing reason=0 logIndex=8 time=2015-04-24-15:41:51:311\",\"11\":\"eventtype=path path_type=lpath cid=5 path=10201036,180.153.194.182:9000,10201056 property=2 pid=157577 path_role=main logIndex=9 time=2015-04-24-15:41:52:312\",\"12\":\"eventtype=path path_type=lpath cid=7 path=10201036,125.88.254.162:9000,10201056 property=2 pid=157579 path_role=back logIndex=10 time=2015-04-24-15:41:52:312\",\"13\":\"eventtype=version sip_sdk=sip_sdk=3.1.0.15 Svn:5566 Wed Feb 03 2015 20:00:00 voip_sdk=Host:v1.0.8.9 svn:5233 01/12/15 11:50:44VoIP:v1.0.0.1 svn:245:5063M 01/12/15 11:53:33 logIndex=11 time=2015-04-24-15:42:01:321\",\"14\":\"eventtype=event event=sip_event_connected reason=0 logIndex=12 time=2015-04-24-15:42:01:321\",\"15\":\"eventtype=p2p loc_host=10.59.143.160:5062 loc_ref=106.37.43.148:18442 loc_rel=222.171.242.142:9000 rem_host=192.168.1.120:5062 rem_ref=1.202.14.194:56382 rem_rel=180.153.194.182:9000 ice_res=180.153.194.182:9000:relay loc_dom=18 loc_isp=1 loc_dev=2 loc_net=2 loc_os=0 loc_user_Type=0 rem_dom=1 rem_isp=1 rem_dev=3 rem_net=0 rem_os=2 rem_user_Type=0 logIndex=13 time=2015-04-24-15:42:01:321\",\"16\":\"eventtype=param p2p=1 maxbw=0K curbw=512K vformat=0x0 targetbps=0K limbps=0K fps=0 vfec=1 vfecratio=5:1 ifec=0 vad=0 2in1=1 avin1=0 avin1mainaudio=0 neteq=0 echotail=200 speex=10 ajitter=200 vjitter=500 rtpjitter=0 acodec=speex logIndex=14 time=2015-04-24-15:42:01:321\",\"17\":\"eventtype=trans_quality avg_rtt_time=143 audio_lose_b=0.000 audio_lose_f=0.000 video_lose_b=0.000 video_lose_f=0.000 audio_res_show=0.000 video_res_show=0.000 logIndex=15 time=2015-04-24-15:42:11:331\",\"18\":\"eventtype=adjust_result adjust_mode=1 trans_level_id=5 audio_bitrate=35 video_bitrate=0 audio_redundent_lev=1 video_redundent_lev=0 max_dev_size_lev=0 max_dev_fr_lev=0 max_dev_bitrate=0 adjust_count=0 fec_adjust_count=0 last_loss_rate=0.000 etoe_bw=70 valid_up_bw=70 redund_up_bw=35 audio_bw_f=52 video_bw_f=0 logIndex=16 time=2015-04-24-15:42:11:331\",\"19\":\"eventtype=event event=sip_event_disconnected reason=0 logIndex=17 time=2015-04-24-15:42:17:337\",\"20\":\"eventtype=ortp sub_type=CSS send=805 send_byte=150783 a_send=392 a_send_byte=81144 v_send=0 v_send_byte=0 vf_send=0 vf_send_byte=0 sendto_failure=0 logIndex=18 time=2015-04-24-15:42:17:337\",\"21\":\"eventtype=ortp sub_type=CSR a_recv=732 a_loss=0 a_loss_r=0.00% v_should_recv=0 v_original_real_recv=0 v_original_loss=0 v_recover_by_fec=0 v_after_fec_recover_loss=0 v_original_loss_r=0.00% v_after_fec_recover_loss_r=0.00% vf_recover_r=0.00% logIndex=19 time=2015-04-24-15:42:17:337\",\"22\":\"eventtype=ortp sub_type=CE2E_L2R cid=5 total=499 loss=17 delay_aver=134 path_role=main logIndex=20 time=2015-04-24-15:42:17:337\",\"23\":\"eventtype=ortp sub_type=CLU cid=5 path_id=157577 src=106.37.43.148 dst=180.153.194.182_3 total=512 loss=1 loss_r=0.20% audio=256 a_loss=0 a_loss_r=0.00% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=107 score=4.89 logIndex=21 time=2015-04-24-15:42:17:337\",\"24\":\"eventtype=ortp sub_type=CRD cid=5 path_id=157577 src=180.153.194.182_3 dst=192.168.1.120 total=499 loss=16 loss_r=3.21% audio=250 a_loss=6 a_loss_r=2.40% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=4.40 logIndex=22 time=2015-04-24-15:42:17:337\",\"25\":\"eventtype=ortp sub_type=CE2E_R2L cid=4 total=365 loss=25 delay_aver=0 logIndex=23 time=2015-04-24-15:42:17:337\",\"26\":\"eventtype=ortp sub_type=CRU cid=4 src=1.202.14.194 dst=210.51.168.109_1 total=205 loss=24 loss_r=11.71% audio=205 a_loss=24 a_loss_r=11.71% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=3.13 logIndex=24 time=2015-04-24-15:42:17:337\",\"27\":\"eventtype=ortp sub_type=CRISRV cid=4 src=210.51.168.109_1 dst=112.65.213.214_4 total=181 loss=0 loss_r=0.00% audio=181 a_loss=0 a_loss_r=0.00% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=5.00 logIndex=25 time=2015-04-24-15:42:17:337\",\"28\":\"eventtype=ortp sub_type=CLD cid=4 src=112.65.213.214_4 dst=10.59.143.160 total=328 loss=0 loss_r=0.00% audio=328 a_loss=0 a_loss_r=0.00% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=5.00 logIndex=26 time=2015-04-24-15:42:17:337\",\"29\":\"eventtype=ortp sub_type=CE2E_R2L cid=8 total=365 loss=0 delay_aver=0 logIndex=27 time=2015-04-24-15:42:17:337\",\"3\":\"eventtype=path path_type=rpath cid=-1 path=10201056,210.51.168.109:9000,112.65.213.214:9000,10201036 property=2 pid=237572 logIndex=1 time=2015-04-24-15:41:49:309\",\"30\":\"eventtype=ortp sub_type=CRU cid=8 src=1.202.14.194 dst=125.88.254.162_5 total=205 loss=0 loss_r=0.00% audio=205 a_loss=0 a_loss_r=0.00% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=5.00 logIndex=28 time=2015-04-24-15:42:17:337\",\"31\":\"eventtype=ortp sub_type=CLD cid=8 src=125.88.254.162_5 dst=10.59.143.160 total=366 loss=0 loss_r=0.00% audio=366 a_loss=0 a_loss_r=0.00% video=0 v_loss=0 v_loss_r=0.00% v_fec=0 vf_loss=0 vf_loss_r=0.00% delay_aver=0 score=5.00 logIndex=29 time=2015-04-24-15:42:17:337\",\"4\":\"eventtype=adjust_ability audio_red_lev=1 camera_size=4 dev_enc_bitrate_max=1024 dev_enc_fr_lev=15 dev_enc_size_lev=4 ldev_type=2 lnet_type=2 p2p_ok=0 upload_bw=512 ldownload_bw=512 video_red_lev=1 dev_dec_bitrate_max=600 dev_dec_fr_max=15 dev_dec_size_max=16 rdev_type=3 download_bw=2035 rnet_type=0 screen_size=16 logIndex=5 time=2015-04-24-15:41:49:309\",\"5\":\"eventtype=adjust_result adjust_mode=0 trans_level_id=5 audio_bitrate=35 video_bitrate=0 audio_redundent_lev=1 video_redundent_lev=1 max_dev_size_lev=0 max_dev_fr_lev=0 max_dev_bitrate=0 adjust_count=0 fec_adjust_count=0 last_loss_rate=0.000 etoe_bw=70 valid_up_bw=70 redund_up_bw=35 audio_bw_f=52 video_bw_f=0 is_adjust=1 logIndex=6 time=2015-04-24-15:41:49:309\",\"6\":\"eventtype=path path_type=rpath cid=-1 path=10201056,125.88.254.162:9000,10201036 property=2 pid=147575 logIndex=3 time=2015-04-24-15:41:49:309\",\"7\":\"eventtype=path path_type=rpath cid=-1 path=10201056,180.153.194.182:9000,10201036 property=2 pid=147573 logIndex=2 time=2015-04-24-15:41:49:309\",\"8\":\"eventtype=ext_dev_info loc_dom=18 loc_isp=1 loc_dev=2 loc_dev_id=80:71:7a:c5:ed:cd loc_dev_name=HUAWEI C199|Qualcomm MSM8928|1593600|4|1877.9141|4.4.2 loc_hostid=10008 loc_net=2 loc_os=0 loc_user_type=0 rem_dom=1 rem_isp=1 rem_dev=3 rem_dev_name=(=6\\6\\1 rem_net=0 rem_os=2 rem_user_type=0 rem_hostid=10008 rem_dev_id=65F90EA6-58DD-4543-A7C2-1D76CCDB2387 logIndex=4 time=2015-04-24-15:41:49:309\",\"9\":\"eventtype=event event=sip_event_inprogess reason=0 logIndex=7 time=2015-04-24-15:41:51:311\",\"existGetpath\":true,\"recordCount\":29,\"recordStatus\":29,\"sidReporter\":\"2668063295_1206310428_10201036_10201056_9367781691020103_10201036\"}";
//console.info("转化前："+jjjjj);
//var jsonaa = JSON.parse(jjjjj);
//console.info("转化后："+jsonaa);

//为logsid赋值，以使当点击标签时才会触发方法，降低系统消耗
function getLogsid(sid){
	logsid = sid;
}

/**
 * 判断点击的是主还是被
 * @param {} id
 * @param {} logsid
 */
function logSwitch(id,logsid){
    var sid="";
    
    var logsidArr = logsid.split("_");
    if(logsidArr!=undefined&&logsidArr!=null&&logsidArr!==""&&(logsidArr instanceof Array)){
		//主叫id
		var callerid = logsidArr[2];
		//被叫id
		var calledid = logsidArr[3];
		if(id==="log_bz1"){
			sid = logsid.substring(0,logsid.lastIndexOf("_"))+"_"+calledid;
			$('#log_bz').html("正在加载数据，请稍候！");
			
			
			
			
			log(id,sid);
		}else{
			sid = logsid.substring(0,logsid.lastIndexOf("_"))+"_"+callerid;
			$('#log_zb').html("正在加载数据，请稍候！");
			log(id,sid);
		}
    
    }
    
}
		
/**
 * 取出某条日志的所有信息,无格式显示
 * @param {} sid
 */
function log(id,sid){
	$.ajax({
		type : "post",
		url : "errordataaction.errordata.action",// 此处连接action，获取数据
		dataType : "json",
		data : "sid=" + sid ,
		beforeSend : function() {
			//$(".layer").show();
		},
		complete : function() {
			//$(".layer").hide();
		},
		success : function(data) {
			if (data != null) {
				if(id==="log_zb1"){
					logView_zb(data);
				}else{
					logView_bz(data);
				}
			}
		},
		error : function(request, textStatus, errorThrown) {
			/*
			var day = new Date();
			if(id==="log_zb1"){
				$('#log_zb').html("没有获取数据(只能查看今天("+day.getFullYear()+"年"+(day.getMonth()+1)+"月"+day.getDate()+"日)的数据，请确定日期是否是今天)");
			}else{
				$('#log_bz').html("没有获取数据(只能查看今天("+day.getFullYear()+"年"+(day.getMonth()+1)+"月"+day.getDate()+"日)的数据，请确定日期是否是今天)");
			}
			*/
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
	
/**
 * “数据日志”标签页，主叫端数据，直接从报告里取，不从单独一个接口里取　
 * @param {} data
 */
function logView_zb_new(datas){
	var html = "<table class='detailTable'>" +   
			"<tr><td style='width:50px;'>ortp</td><td id='ortp_log_zb'></td></tr>" +
			"<tr><td>p2p</td><td id='p2p_log_zb'></td></tr>" +
			"<tr><td>event</td><td id='event_log_zb'></td></tr>" +
			"<tr><td>path</td><td id='path_log_zb'></td></tr>" +
			"<tr><td>param</td><td id='param_log_zb'></td></tr>" +
			"<tr><td>version</td><td id='version_log_zb'></td></tr>" +
			"<tr><td>getpath</td><td id='getpath_log_zb'></td></tr>" +
			"<tr><td>其它</td><td id='other_zb'></td></tr>" +
			"</table>";
    $('#log_zb').html(html);
	
	var result;
	var data;
	var caller;
	var getpath;
	var callBaseLog;
	result = datas.result;
	if(result!=undefined&&result!=null&&result!==""){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				getpath = caller.getpath;
				if(getpath!=undefined&&getpath!=null&&getpath!==""){
					$('#getpath_log_zb').text(JSON.stringify(getpath));
				}
				callBaseLog = caller.callBaseLog;
				if(callBaseLog!=undefined&&callBaseLog!=null&&callBaseLog!==""){
					callBaseLog = JSON.parse(callBaseLog);
					for(var i in callBaseLog){
						var flag = null;
						if(i!="_id"&&i!="getpath"&&i!="optime"&&i!="sidReporter"&&i!="recordCount"&&i!="recordStatus"&&i!="existGetpath"&&i!="state"&&i!="reason"&&i!="lastTime"&&i!="firstTime"){
							var flagArr = callBaseLog[i].split(" ");
							if(flagArr!=undefined&&flagArr!=null&&flagArr!==""&&(flagArr instanceof Array)){
								var flag0 = flagArr[0];
								if(flag0!=undefined&&flag0!=null&&flag0!==""){
									var flag0Arr = flag0.split('=');
									if(flag0Arr!=undefined&&flag0Arr!=null&&flag0Arr!==""&&(flag0Arr instanceof Array)){
										flag = flag0Arr[1];
										if(flag==="ortp"){
											$('#ortp_log_zb').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="p2p"){
											$('#p2p_log_zb').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="event"){
											$('#event_log_zb').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="path"){
											$('#path_log_zb').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="param"){
											$('#param_log_zb').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="version"){
											$('#version_log_zb').append(callBaseLog[i]+"<hr/>");
										}else{
											$('#other_zb').append(callBaseLog[i]+"<hr/>");
										}
									}
								}
							}
						}
					}   
				}
			}
		}
	}
}

/**
 * “数据日志”标签页，被叫端数据，直接从报告里取，不从单独一个接口里取　
 * @param {} data
 */
function logView_bz_new(datas){
	var html = "<table class='detailTable'>" +
			"<tr><td style='width:50px;'>ortp</td><td id='ortp_log_bz'></td></tr>" +
			"<tr><td>p2p</td><td id='p2p_log_bz'></td></tr>" +
			"<tr><td>event</td><td id='event_log_bz'></td></tr>" +
			"<tr><td>path</td><td id='path_log_bz'></td></tr>" +
			"<tr><td>param</td><td id='param_log_bz'></td></tr>" +
			"<tr><td>version</td><td id='version_log_bz'></td></tr>" +
			"<tr><td>getpath</td><td id='getpath_log_bz'></td></tr>" +
			"<tr><td>其它</td><td id='other_bz'></td></tr>" +
			"</table>";
    $('#log_bz').html(html);
    
	var result;
	var data;
	var called;
	var getpath;
	var callBaseLog;
	result = datas.result;
	if(result!=undefined&&result!=null&&result!==""){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				getpath = called.getpath;
				if(getpath!=undefined&&getpath!=null&&getpath!==""){
					$('#getpath_log_bz').text(JSON.stringify(getpath));
				}
				callBaseLog = called.callBaseLog;
				if(callBaseLog!=undefined&&callBaseLog!=null&&callBaseLog!==""){
					callBaseLog = JSON.parse(callBaseLog);
					for(var i in callBaseLog){
						var flag = null;
						if(i!="_id"&&i!="getpath"&&i!="optime"&&i!="sidReporter"&&i!="recordCount"&&i!="recordStatus"&&i!="existGetpath"&&i!="state"&&i!="reason"&&i!="lastTime"&&i!="firstTime"){
							var flagArr = callBaseLog[i].split(" ");
							if(flagArr!=undefined&&flagArr!=null&&flagArr!==""&&(flagArr instanceof Array)){
								var flag0 = flagArr[0];
								if(flag0!=undefined&&flag0!=null&&flag0!==""){
									var flag0Arr = flag0.split('=');
									if(flag0Arr!=undefined&&flag0Arr!=null&&flag0Arr!==""&&(flag0Arr instanceof Array)){
										flag = flag0Arr[1];
										if(flag==="ortp"){
											$('#ortp_log_bz').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="p2p"){
											$('#p2p_log_bz').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="event"){
											$('#event_log_bz').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="path"){
											$('#path_log_bz').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="param"){
											$('#param_log_bz').append(callBaseLog[i]+"<hr/>");
										}else if(flag==="version"){
											$('#version_log_bz').append(callBaseLog[i]+"<hr/>");
										}else{
											$('#other_bz').append(callBaseLog[i]+"<hr/>");
										}
									}
								}
							}
						}
					}   
				}
			}
		}
	}
    

}


/**
 * “数据日志”标签页，主叫端数据，单独从一个接口里取数据
 * @param {} data
 */
function logView_zb(data){
	var html = "<table class='detailTable'>" +   
			"<tr><td style='width:50px;'>ortp</td><td id='ortp_log_zb'></td></tr>" +
			"<tr><td>p2p</td><td id='p2p_log_zb'></td></tr>" +
			"<tr><td>event</td><td id='event_log_zb'></td></tr>" +
			"<tr><td>path</td><td id='path_log_zb'></td></tr>" +
			"<tr><td>param</td><td id='param_log_zb'></td></tr>" +
			"<tr><td>version</td><td id='version_log_zb'></td></tr>" +
			"<tr><td>getpath</td><td id='getpath_log_zb'></td></tr>" +
			"<tr><td>其它</td><td id='other_zb'></td></tr>" +
			"</table>";
    $('#log_zb').html(html);
	$('#getpath_log_zb').text(data.getpath);
	if(data!=undefined&&data!=null&&data!==""){
		for(var i in data){
			var flag = null;
			if(i!="_id"&&i!="getpath"&&i!="optime"&&i!="sidReporter"&&i!="recordCount"&&i!="recordStatus"&&i!="existGetpath"&&i!="state"&&i!="reason"&&i!="lastTime"&&i!="firstTime"){
				var flagArr = data[i].split(" ");
				if(flagArr!=undefined&&flagArr!=null&&flagArr!==""&&(flagArr instanceof Array)){
					var flag0 = flagArr[0];
					if(flag0!=undefined&&flag0!=null&&flag0!==""){
						var flag0Arr = flag0.split('=');
						if(flag0Arr!=undefined&&flag0Arr!=null&&flag0Arr!==""&&(flag0Arr instanceof Array)){
							flag = flag0Arr[1];
							if(flag==="ortp"){
								$('#ortp_log_zb').append(data[i]+"<hr/>");
							}else if(flag==="p2p"){
								$('#p2p_log_zb').append(data[i]+"<hr/>");
							}else if(flag==="event"){
								$('#event_log_zb').append(data[i]+"<hr/>");
							}else if(flag==="path"){
								$('#path_log_zb').append(data[i]+"<hr/>");
							}else if(flag==="param"){
								$('#param_log_zb').append(data[i]+"<hr/>");
							}else if(flag==="version"){
								$('#version_log_zb').append(data[i]+"<hr/>");
							}else{
								$('#other_zb').append(data[i]+"<hr/>");
							}
							
						}
					}
				}
			}
		}   
	}
}

/**
 * “数据日志”标签页，被叫端数据，单独从一个接口里取数据
 * @param {} data
 */
function logView_bz(data){
	var html = "<table class='detailTable'>" +
			"<tr><td style='width:50px;'>ortp</td><td id='ortp_log_bz'></td></tr>" +
			"<tr><td>p2p</td><td id='p2p_log_bz'></td></tr>" +
			"<tr><td>event</td><td id='event_log_bz'></td></tr>" +
			"<tr><td>path</td><td id='path_log_bz'></td></tr>" +
			"<tr><td>param</td><td id='param_log_bz'></td></tr>" +
			"<tr><td>version</td><td id='version_log_bz'></td></tr>" +
			"<tr><td>getpath</td><td id='getpath_log_bz'></td></tr>" +
			"<tr><td>其它</td><td id='other_bz'></td></tr>" +
			"</table>";
    $('#log_bz').html(html);
	$('#getpath_log_bz').text(data.getpath);
	if(data!=undefined&&data!=null&&data!==""){
		for(var i in data){
			var flag = null;
			if(i!="_id"&&i!="getpath"&&i!="optime"&&i!="sidReporter"&&i!="recordCount"&&i!="recordStatus"&&i!="existGetpath"&&i!="state"&&i!="reason"&&i!="lastTime"&&i!="firstTime"){
				var flagArr = data[i].split(" ");
				if(flagArr!=undefined&&flagArr!=null&&flagArr!==""&&(flagArr instanceof Array)){
					var flag0 = flagArr[0];
					if(flag0!=undefined&&flag0!=null&&flag0!==""){
						var flag0Arr = flag0.split('=');
						if(flag0Arr!=undefined&&flag0Arr!=null&&flag0Arr!==""&&(flag0Arr instanceof Array)){
							flag = flag0Arr[1];
							if(flag==="ortp"){
								$('#ortp_log_bz').append(data[i]+"<hr/>");
							}else if(flag==="p2p"){
								$('#p2p_log_bz').append(data[i]+"<hr/>");
							}else if(flag==="event"){
								$('#event_log_bz').append(data[i]+"<hr/>");
							}else if(flag==="path"){
								$('#path_log_bz').append(data[i]+"<hr/>");
							}else if(flag==="param"){
								$('#param_log_bz').append(data[i]+"<hr/>");
							}else if(flag==="version"){
								$('#version_log_bz').append(data[i]+"<hr/>");
							}else{
								$('#other_bz').append(data[i]+"<hr/>");
							}
						}
					}
				}
			}
		}   
	}
}