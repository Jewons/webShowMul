/*通话详情callDetail.jsp页面中“VOIP信息”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#voip01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.voip_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.voip_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

/**
 * “VOIP信息”标签页，主叫向数据
 * @param {} data
 */
function voipView_zb(datas){
	var result = datas.result;
	var html = "";
	var html1 = "";
	if(result ===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					//flash在voip上的信息
					var flashVoip;
					
					var flashsdkIp;//FlashSDK的ip
				    var rtmpserverIp;//RtmpServer的ip
				    var src_v_lost_r;//FlashSDK-->RtmpServer的视频丢包率
				    var src_a_lost_r;//FlashSDK-->RtmpServer的音频丢包率
					
					flashVoip = call.flashVoip;
					if(flashVoip!=undefined&&flashVoip!=null&&flashVoip!==""){
						flashsdkIp = flashVoip.flashsdkIp;//FlashSDK的ip
				    	rtmpserverIp = flashVoip.rtmpserverIp;//RtmpServer的ip
					    src_v_lost_r = flashVoip.src_v_lost_r;//FlashSDK-->RtmpServer的视频丢包率
					    src_a_lost_r = flashVoip.src_a_lost_r;//FlashSDK-->RtmpServer的音频丢包率
					}
					
					//空值校验
					if(flashsdkIp==undefined||flashsdkIp==null||flashsdkIp===""){flashsdkIp="--";}
					if(rtmpserverIp==undefined||rtmpserverIp==null||rtmpserverIp===""){rtmpserverIp="--";}
					if(src_v_lost_r==undefined||src_v_lost_r==null||src_v_lost_r===""){src_v_lost_r="--";}
					if(src_a_lost_r==undefined||src_a_lost_r==null||src_a_lost_r===""){src_a_lost_r="--";}
					
					html +="<table class='detailTable'>" +
								"<tr>" +
									"<td rowspan='2' style='width:400px;'>FlashSDK("+flashsdkIp+")-->RtmpServer("+rtmpserverIp+")</td>" +
									"<td style='width:170px;'>视频丢包率(%)</td>" +
									"<td style='width:242px;'>音频丢包率(%)</td>" +
									"<td>延时(ms)</td>" +
								"</tr>" +
								"<tr>" +
									"<td>"+src_v_lost_r+"</td>" +
									"<td>"+src_a_lost_r+"</td>" +
									"<td>0</td>" +
								"</tr>" +
							"</table>";
					
					//取得voip的整体信息
					var voip = call.voip;
					if(voip!=undefined&&voip!=null&&voip!==""){
					
						//获取voip包含的几个子部分
						var cp2pce2e;
						var pathid;
						var pathinfo;
						var pathsub;
						
						//通道ID
						var cid ;
						//路径ID
						var pid ;
						//道路角色
						var path_role ;
						//道路类型
						var path_type ;
						//道路属性
						var property ;
						
						//道路延时　
						var path_delay_aver;
						//道路描述
						var path ;
						var getpath;
							
						
						html += "<table class='detailTable'>" ;
						$.each(voip,function(i,val){	
							
							//获取voip包含的几个子部分
							cp2pce2e = val.cp2pce2e;
							pathid = val.pathid;
							pathinfo = val.pathinfo;
							pathsub  = val.pathsub;
							
							//取出整条路径的总体延时
							//从取出的数据上只看到汇报了cp2pce2e这个数组，不能确定还会不会汇报其它的，它就包含一条记录，所以下面这样循环也只是对第一条记录进行操作
							var dealyMap = new Map();
							if(cp2pce2e!=undefined&&cp2pce2e!=null&&cp2pce2e!==""){
								$.each(cp2pce2e,function(k,v){
									var delayArr = v.split(' ');
									if(delayArr!=undefined&&delayArr!=null&&delayArr!==""&&(delayArr instanceof Array)){
										$.each(delayArr,function(kk,vv){
											dealyMap.put(vv.split('=')[0],vv.split('=')[1]);
										});
									}
								});
							}
							
							//道路延时
							path_delay_aver = dealyMap.get('delay_aver');
							if(path_delay_aver==undefined||path_delay_aver==null||path_delay_aver===""){
								path_delay_aver = "无";
							}else{
								path_delay_aver = path_delay_aver+"ms";
							}
							
							
							if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
								//上部道路信息
								var map = new Map();
								var pathinfoArr = pathinfo.split(' ');
								$.each(pathinfoArr,function(j,va){
									map.put(va.split('=')[0],va.split('=')[1]);
								});
								//通道ID
								cid =  map.get('cid');
								//路径ID
								pid = map.get('pid');
								//道路角色
								path_role = map.get('path_role'); 
								//道路类型
								path_type = map.get('path_type');
								//道路属性
								property = map.get('property');
								//道路描述
								path = map.get('path');
								
								//空值校验
								if(cid==undefined||cid==null||cid===""){
									cid = "无";
								}
								if(pid==undefined||pid==null||pid===""){
									pid = "无";
								}
								if(path_role==undefined||path_role==null||path_role===""){
									path_role = "无";
								}
								if(path_type==undefined||path_type==null||path_type===""){
									path_type = "无";
								}
								if(property==undefined||property==null||property===""){
									property = "无";
								}
								if(path==undefined||path==null||path===""){
									path = "无";
								}
								
								//下部各段丢包率
								var src;
								var dst;
								var total ;//总包数
								var loss ;//总丢包
								var loss_r ;//总丢包率
								
								var audio ;//视频总包数
								var a_loss ;//视频丢包数
								var a_loss_r ;//视频丢包率
								
								var video ;//音频总包数
								var v_loss ;//音频丢包数
								var v_loss_r ;//音频丢包率
								
								var v_fec ;//FEC总包数
								var vf_loss ;//FEC丢包数
								var vf_loss_r ;//FEC丢包率
								
								var delay_aver;	//分段延时
								
								var allArr;
								var map1 = new Map();
								if(path_type!='rpath'){
									html += "<tr>" +
												"<td colspan='3'>" +
													"<span class='summaryStyle'>通道ID：</span>"+cid+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>路径ID：</span>"+pid+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路角色：</span>"+path_role+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路类型：</span>"+path_type+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路属性：</span>"+property+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>延时：</span>"+path_delay_aver+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路描述：</span>"+path+"&nbsp;&nbsp;&nbsp;&nbsp;"+
												"</td>" +
											"</tr>"+
											"<tr>" +
												"<td id='voipView_zb"+i+"' style='width:400px;'></td>"+
												"<td style='width:170px;'>" ;
												getpath = caller.getpath;
												if(getpath!=undefined&&getpath!=null&&getpath!==""){
													var resp_cmd_path_array = getpath.resp_cmd_path_array;
													if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
														$.each(resp_cmd_path_array,function(j,v){
															if(pathid==v.path_id||pid==v.path_id){//通过path_id取得与resp_cmd_path_array中对应的pathsub的数组记录
																var sub_path_array = v.sub_path_array;
																$.each(sub_path_array,function(index,value){
																	var segment = value.segment;
																	var R_R = segment.R_R;
																	var U_R = segment.U_R;
																	//如果不存在R_R，中间的Relay就用U_R中的来取
																	html += "Us→R"+U_R.dest_id+"→";
																	//有的子路径不存在R_R，这个必须判断
																	if(R_R!=undefined&&R_R!=null&&R_R!==""){
																		$.each(R_R,function(index1,value1){
																			html += "R"+value1.dest_id+"→";
																		});
																	} 
																	html += "Ud<br/>";
																});
															}
														});
													}else{
														html += "未获取数据，无法展示信息！";
													}
												}else{
													html += "未获取数据，无法展示信息！";
												}
										html += "</td>"+
												"<td valign='top'>";
													if(pathsub!=undefined&&pathsub!=null&&pathsub!==""&&pathsub.length>0){
														/*var p2p = 0;
														$.each(pathsub,function(i,val){
															allArr = val.split(" ");
															$.each(allArr,function(j,va){
																map1.put(va.split('=')[0],va.split('=')[1]);
															});
															//判断是不是p2p路径
															map1.each(function(key,value,i){
																if(value=='CISRV'||value=='CRISRV'){
																	p2p = 1;
																}
															});
														});*/
														html += "<table class='detailTable'>";
														html +="<tr><td></td><td>总丢包率(%)</td><td>视频丢包率(%)</td><td>音频丢包率(%)</td><td>FEC丢包率(%)</td><td>延时(ms)</td></tr>";
														$.each(pathsub,function(i,val){
															allArr = val.split(" ");
															$.each(allArr,function(j,va){
																map1.put(va.split('=')[0],va.split('=')[1]);
															});
															src = map1.get('src');
															dst = map1.get('dst');
						
															total = map1.get('total');
															loss = map1.get('loss');
															loss_r = map1.get('loss_r');
															
															audio = map1.get('audio');
															a_loss = map1.get('a_loss');
															a_loss_r = map1.get('a_loss_r');
															
															video = map1.get('video');
															v_loss = map1.get('v_loss');
															v_loss_r = map1.get('v_loss_r');
															
															v_fec = map1.get('v_fec');
															vf_loss = map1.get('vf_loss');
															vf_loss_r = map1.get('vf_loss_r');
															
															delay_aver = map1.get('delay_aver');
															//空值校验
															if(total==undefined||total==null||total===""){
																total = "无";
															}
															if(loss==undefined||loss==null||loss===""){
																loss = "无";
															}
															if(loss_r==undefined||loss_r==null||loss_r===""){
																loss_r = "无";
															}
															if(audio==undefined||audio==null||audio===""){
																audio = "无";
															}
															if(a_loss==undefined||a_loss==null||a_loss===""){
																a_loss = "无";
															}
															if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
																a_loss_r = "无";
															}
															if(video==undefined||video==null||video===""){
																video = "无";
															}
															if(v_loss==undefined||v_loss==null||v_loss===""){
																v_loss = "无";
															}
															if(v_loss_r==undefined||v_loss_r==null||v_loss_r===""){
																v_loss_r = "无";
															}
															if(v_fec==undefined||v_fec==null||v_fec===""){
																v_fec = "无";
															}
															if(vf_loss==undefined||vf_loss==null||vf_loss===""){
																vf_loss = "无";
															}
															if(vf_loss_r==undefined||vf_loss_r==null||vf_loss_r===""){
																vf_loss_r = "无";
															}
															if(delay_aver==undefined||delay_aver==null||delay_aver===""){
																delay_aver = "无";
															}
															
															if(path_type == 'p2ppath'){//是p2p路径
																if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→Ud"+
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																
																}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→Ud"+
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}
															}else{
																if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																	if(dst!=undefined&&dst!=null&&dst!==""){
																		if(dst.indexOf("_")<0){
																			dst = "<font color='red'>R*</font>";
																		}else{
																			dst = "R"+dst.split("_")[1];
																		}
																	}else{
																		dst = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→"+ dst +
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																
																}else if(map1.get('sub_type')=='CISRV'||map1.get('sub_type')=='CRISRV'){//RR
																	if(src!=undefined&&src!=null&&src!==""){
																		if(src.indexOf("_")<0){
																			src = "<font color='red'>R*</font>";
																		}else{
																			src = "R"+src.split("_")[1];
																		}
																	}else{
																		src = "<font color='red'>R*</font>";
																	}
																	
																	if(dst!=undefined&&dst!=null&&dst!==""){
																		if(dst.indexOf("_")<0){
																			dst = "<font color='red'>R*</font>";
																		}else{
																			dst = "R"+dst.split("_")[1];
																		}
																	}else{
																		dst = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					src +"→"+ dst +
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																	if(src!=undefined&&src!=null&&src!==""){
																		if(src.indexOf("_")<0){
																			src = "<font color='red'>R*</font>";
																		}else{
																			src = "R"+src.split("_")[1];
																		}
																	}else{
																		src = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					src +"→Ud"+
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}
															}
														});
														html += "</table>";
													}else{
														html += "未获取数据，无法展示信息！";
													}
									html += "</td>" +
										"</tr>";
								}
							}
						});
						html +="</table>";
						
						//必须先把创建好的表格放到页面中，才能通过其id画relay的关系图
						$('#voip_zb').html(html);
							
						getpath = caller.getpath;
						if(getpath!=undefined&&getpath!=null&&getpath!==""){
							var resp_cmd_path_array = getpath.resp_cmd_path_array;
							if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
								//画Relay关系图
								$.each(voip,function(i,val){
									pathid = val.pathid;
									pathinfo = val.pathinfo;
									if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
										var map = new Map();
										var pathinfoArr = pathinfo.split(' ');
										$.each(pathinfoArr,function(j,va){
											map.put(va.split('=')[0],va.split('=')[1]);
										});
										//路径ID
										pid = map.get('pid');
										//道路类型
										path_type = map.get('path_type');
										if(path_type!='rpath'){
											var flag = 0;
											//画Relay关系图
											$.each(resp_cmd_path_array,function(j,v){
												if(pathid===(v.path_id)||pid===(v.path_id)){//取得与pathid对应的getpath中的子路径
													flag = 1;
													//画图函数
													drawPathByDataObject(v,"voipView_zb"+i);
													return;
												}
											});
											if(flag==0){
												$("#voipView_zb"+i).text("getpath中没有与上面“路径ID”对应的路径,无法展示关系图。");
											}
										}
									}else{
										$("#voipView_zb"+i).text("getpath中没有与上面“路径ID”对应的路径,无法展示关系图。");
									}
								});
							}
						}
					}
				}
			}
			
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					//flash在voip上的信息
					var flashVoip;
					var dealy;//延时
					var flashsdkIp;//FlashSDK的ip
				    var rtmpserverIp;//RtmpServer的ip
				    var dest_v_lost_r;//RtmpServer-->FlashSDK的视频丢包率
				    var dest_a_lost_r;//RtmpServer-->FlashSDK的音频丢包率
					
					flashVoip = call.flashVoip;
					if(flashVoip!=undefined&&flashVoip!=null&&flashVoip!==""){
						dealy = flashVoip.delay;
						flashsdkIp = flashVoip.flashsdkIp;//FlashSDK的ip
				    	rtmpserverIp = flashVoip.rtmpserverIp;//RtmpServer的ip
					    dest_v_lost_r = flashVoip.dest_v_lost_r;//RtmpServer-->FlashSDK的视频丢包率
					    dest_a_lost_r = flashVoip.dest_a_lost_r;//RtmpServer-->FlashSDK的音频丢包率
					}
					
					//空值校验
					if(dealy==undefined||dealy==null||dealy===""){dealy="--";}
					if(flashsdkIp==undefined||flashsdkIp==null||flashsdkIp===""){flashsdkIp="--";}
					if(rtmpserverIp==undefined||rtmpserverIp==null||rtmpserverIp===""){rtmpserverIp="--";}
					if(dest_v_lost_r==undefined||dest_v_lost_r==null||dest_v_lost_r===""){dest_v_lost_r="--";}
					if(dest_a_lost_r==undefined||dest_a_lost_r==null||dest_a_lost_r===""){dest_a_lost_r="--";}
					
					html1 +="<table class='detailTable'>" +
								"<tr>" +
									"<td rowspan='2' style='width:400px;'>FlashSDK("+flashsdkIp+")-->RtmpServer("+rtmpserverIp+")</td>" +
									"<td style='width:170px;'>视频丢包率(%)</td>" +
									"<td style='width:242px;'>音频丢包率(%)</td>" +
									"<td>延时(ms)</td>" +
								"</tr>" +
								"<tr>" +
									"<td>"+dest_v_lost_r+"</td>" +
									"<td>"+dest_a_lost_r+"</td>" +
									"<td>"+dealy+"</td>" +
								"</tr>" +
								"<tr>" +
								"<td colspan='4'>注：-- 代表未获取到数据</td>" +
								"</tr>" +
							"</table>";
				}
			}
			$('#voip_zb').append(html1);
		}
	}
}

/**
 * “VOIP信息”标签页，被叫向数据
 * @param {} data
 */
function voipView_bz(datas){
	var result = datas.result;
	var html = "";
	var html1 = "";
	if(result === 0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					
										//flash在voip上的信息
					var flashVoip;
					
					var flashsdkIp;//FlashSDK的ip
				    var rtmpserverIp;//RtmpServer的ip
				    var src_v_lost_r;//FlashSDK-->RtmpServer的视频丢包率
				    var src_a_lost_r;//FlashSDK-->RtmpServer的音频丢包率
					
					flashVoip = call.flashVoip;
					if(flashVoip!=undefined&&flashVoip!=null&&flashVoip!==""){
						flashsdkIp = flashVoip.flashsdkIp;//FlashSDK的ip
				    	rtmpserverIp = flashVoip.rtmpserverIp;//RtmpServer的ip
					    src_v_lost_r = flashVoip.src_v_lost_r;//FlashSDK-->RtmpServer的视频丢包率
					    src_a_lost_r = flashVoip.src_a_lost_r;//FlashSDK-->RtmpServer的音频丢包率
					}
					
					//空值校验
					if(flashsdkIp==undefined||flashsdkIp==null||flashsdkIp===""){flashsdkIp="--";}
					if(rtmpserverIp==undefined||rtmpserverIp==null||rtmpserverIp===""){rtmpserverIp="--";}
					if(src_v_lost_r==undefined||src_v_lost_r==null||src_v_lost_r===""){src_v_lost_r="--";}
					if(src_a_lost_r==undefined||src_a_lost_r==null||src_a_lost_r===""){src_a_lost_r="--";}
					
					html +="<table class='detailTable'>" +
								"<tr>" +
									"<td rowspan='2' style='width:400px;'>FlashSDK("+flashsdkIp+")-->RtmpServer("+rtmpserverIp+")</td>" +
									"<td style='width:170px;'>视频丢包率(%)</td>" +
									"<td style='width:242px;'>音频丢包率(%)</td>" +
									"<td>延时(ms)</td>" +
								"</tr>" +
								"<tr>" +
									"<td>"+src_v_lost_r+"</td>" +
									"<td>"+src_a_lost_r+"</td>" +
									"<td>0</td>" +
								"</tr>" +
							"</table>";
					
					
					//取得voip的整体信息
					var voip = call.voip;
					if(voip!=undefined&&voip!=null&&voip!==""){
						//获取voip包含的几个子部分
						var pathid;
						var pathinfo;
						var pathsub;
						
						//通道ID
						var cid ;
						//路径ID
						var pid ;
						//道路角色
						var path_role ;
						//道路类型
						var path_type ;
						//道路属性
						var property ;
						//道路延时
						var path_delay_aver;
						//道路描述
						var path ;
						
						var getpath;
						html += "<table class='detailTable'>";
						$.each(voip,function(i,val){
							//获取voip包含的几个子部分
							cp2pce2e = val.cp2pce2e;
							pathid = val.pathid;
							pathinfo = val.pathinfo;
							pathsub  = val.pathsub;
							
							//取出整条路径的总体延时
							//从取出的数据上只看到汇报了cp2pce2e这个数组，不能确定还会不会汇报其它的，它就包含一条记录，所以下面这样循环也只是对第一条记录进行操作
							var dealyMap = new Map();
							if(cp2pce2e!=undefined&&cp2pce2e!=null&&cp2pce2e!==""){
								$.each(cp2pce2e,function(k,v){
									var delayArr = v.split(' ');
									if(delayArr!=undefined&&delayArr!=null&&delayArr!==""&&(delayArr instanceof Array)){
										$.each(delayArr,function(kk,vv){
											dealyMap.put(vv.split('=')[0],vv.split('=')[1]);
										});
									}
								});
							}
							
							//道路延时
							path_delay_aver = dealyMap.get('delay_aver');
							if(path_delay_aver==undefined||path_delay_aver==null||path_delay_aver===""){
								path_delay_aver = "无";
							}else{
								path_delay_aver = path_delay_aver+"ms";
							}
							
							if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
								//上部道路信息
								var map = new Map();
								var pathinfoArr = pathinfo.split(' ');
								$.each(pathinfoArr,function(j,va){
									map.put(va.split('=')[0],va.split('=')[1]);
								});
								//通道ID
								cid =  map.get('cid');
								//路径ID
								pid = map.get('pid');
								//道路角色
								path_role = map.get('path_role'); 
								//道路类型
								path_type = map.get('path_type');
								//道路属性
								property = map.get('property');
								//道路描述
								path = map.get('path');
								
								//空值校验
								if(cid==undefined||cid==null||cid===""){
									cid = "无";
								}
								if(pid==undefined||pid==null||pid===""){
									pid = "无";
								}
								if(path_role==undefined||path_role==null||path_role===""){
									path_role = "无";
								}
								if(path_type==undefined||path_type==null||path_type===""){
									path_type = "无";
								}
								if(property==undefined||property==null||property===""){
									property = "无";
								}								
								if(path==undefined||path==null||path===""){
									path = "无";
								}
								
								//下部各段丢包率
								var src;
								var dst;
								var total ;//总包数
								var loss ;//总丢包
								var loss_r ;//总丢包率
								
								var audio ;//视频总包数
								var a_loss ;//视频丢包数
								var a_loss_r ;//视频丢包率
								
								var video ;//音频总包数
								var v_loss ;//音频丢包数
								var v_loss_r ;//音频丢包率
								
								var v_fec ;//FEC总包数
								var vf_loss ;//FEC丢包数
								var vf_loss_r ;//FEC丢包率
								
								var delay_aver;//分段延时
								
								var allArr;
								var map1 = new Map();
								
								if(path_type!='rpath'){
									html += "<tr>" +
												"<td colspan='3'>" +
													"<span class='summaryStyle'>通道ID：</span>"+cid+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>路径ID：</span>"+pid+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路角色：</span>"+path_role+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路类型：</span>"+path_type+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路属性：</span>"+property+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>延时：</span>"+path_delay_aver+"&nbsp;&nbsp;&nbsp;&nbsp;"+
													"<span class='summaryStyle'>道路描述：</span>"+path+"&nbsp;&nbsp;&nbsp;&nbsp;"+
												"</td>" +
											"</tr>"+
											"<tr>" +
												"<td id='voipView_bz"+i+"' style='width:400px;'></td>"+
												"<td style='width:170px;'>" ;
												getpath = called.getpath;
												if(getpath!=undefined&&getpath!=null&&getpath!==""){
													var resp_cmd_path_array = getpath.resp_cmd_path_array;
													if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
														$.each(resp_cmd_path_array,function(j,v){
															if(pathid==v.path_id||pid==v.path_id){//取得与pathid对应的getpath中的子路径
																var sub_path_array = v.sub_path_array;
																$.each(sub_path_array,function(index,value){
																	var segment = value.segment;
																	var R_R = segment.R_R;
																	var U_R = segment.U_R;
																	//如果不存在R_R，中间的Relay就用U_R中的来取
																	html += "Us→R"+U_R.dest_id+"→";
																	//有的子路径不存在R_R，这个必须判断
																	if(R_R!=undefined&&R_R!=null&&R_R!==""){
																		$.each(R_R,function(index1,value1){
																			html += "R"+value1.dest_id+"→";
																		});
																	} 
																	html += "Ud<br/>";
																});
															}
														});
													}else{
														html += "未获取数据，无法展示信息！";
													}
												}else{
													html += "未获取数据，无法展示信息！";
												}
										html += "</td>"+
												"<td valign='top'>";
													if(pathsub!=undefined&&pathsub!=null&&pathsub!==""&&pathsub.length>0){
														/*var p2p = 0;
														$.each(pathsub,function(i,val){
															allArr = val.split(" ");
															$.each(allArr,function(j,va){
																map1.put(va.split('=')[0],va.split('=')[1]);
															});
															//判断是不是p2p路径
															map1.each(function(key,value,i){
																if(value=='CISRV'||value=='CRISRV'){
																	p2p = 1;
																}
															});
														});*/
														html += "<table class='detailTable'>";
														html +="<tr><td></td><td>总丢包率(%)</td><td>视频丢包率(%)</td><td>音频丢包率(%)</td><td>FEC丢包率(%)</td><td>延时(ms)</td></tr>";
														$.each(pathsub,function(i,val){
															allArr = val.split(" ");
															$.each(allArr,function(j,va){
																map1.put(va.split('=')[0],va.split('=')[1]);
															});
															src = map1.get('src');
															dst = map1.get('dst');
															
															total = map1.get('total');
															loss = map1.get('loss');
															loss_r = map1.get('loss_r');
															
															audio = map1.get('audio');
															a_loss = map1.get('a_loss');
															a_loss_r = map1.get('a_loss_r');
															
															video = map1.get('video');
															v_loss = map1.get('v_loss');
															v_loss_r = map1.get('v_loss_r');
															
															v_fec = map1.get('v_fec');
															vf_loss = map1.get('vf_loss');
															vf_loss_r = map1.get('vf_loss_r');
															
															delay_aver = map1.get('delay_aver');
															//空值校验
															if(total==undefined||total==null||total===""){
																total = "无";
															}
															if(loss==undefined||loss==null||loss===""){
																loss = "无";
															}
															if(loss_r==undefined||loss_r==null||loss_r===""){
																loss_r = "无";
															}
															if(audio==undefined||audio==null||audio===""){
																audio = "无";
															}
															if(a_loss==undefined||a_loss==null||a_loss===""){
																a_loss = "无";
															}
															if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
																a_loss_r = "无";
															}
															if(video==undefined||video==null||video===""){
																video = "无";
															}
															if(v_loss==undefined||v_loss==null||v_loss===""){
																v_loss = "无";
															}
															if(v_loss_r==undefined||v_loss_r==null||v_loss_r===""){
																v_loss_r = "无";
															}
															if(v_fec==undefined||v_fec==null||v_fec===""){
																v_fec = "无";
															}
															if(vf_loss==undefined||vf_loss==null||vf_loss===""){
																vf_loss = "无";
															}
															if(vf_loss_r==undefined||vf_loss_r==null||vf_loss_r===""){
																vf_loss_r = "无";
															}
															if(delay_aver==undefined||delay_aver==null||delay_aver===""){
																delay_aver = "无";
															}
															
															if(path_type == 'p2ppath'){//是p2p路径
																if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→Ud"+ 
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																
																}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→Ud"+
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}
															}else{
																if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																	if(dst!=undefined&&dst!=null&&dst!==""){
																		if(dst.indexOf("_")<0){
																			dst = "<font color='red'>R*</font>";
																		}else{
																			dst = "R"+dst.split("_")[1];
																		}
																	}else{
																		dst = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					"Us→"+ dst +
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																
																}else if(map1.get('sub_type')=='CISRV'||map1.get('sub_type')=='CRISRV'){//RR
																	if(src!=undefined&&src!=null&&src!==""){
																		if(src.indexOf("_")<0){
																			src = "<font color='red'>R*</font>";
																		}else{
																			src = "R"+src.split("_")[1];
																		}
																	}else{
																		src = "<font color='red'>R*</font>";
																	}
																	
																	if(dst!=undefined&&dst!=null&&dst!==""){
																		if(dst.indexOf("_")<0){
																			dst = "<font color='red'>R*</font>";
																		}else{
																			dst = "R"+dst.split("_")[1];
																		}
																	}else{
																		dst = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					src +"→"+ dst +
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																	if(src!=undefined&&src!=null&&src!==""){
																		if(src.indexOf("_")<0){
																			src = "<font color='red'>R*</font>";
																		}else{
																			src = "R"+src.split("_")[1];
																		}
																	}else{
																		src = "<font color='red'>R*</font>";
																	}
																	html += "<tr>"+
																		 		"<td>" +
																					src +"→Ud"+
																				"</td>"+
																				"<td>" +
																					loss_r+"("+loss+"/"+total+")"+
																				"</td>"+
																				"<td>" +
																					v_loss_r+"("+v_loss+"/"+video+")"+
																				"</td>"+
																				"<td>" +
																					a_loss_r+"("+a_loss+"/"+audio+")"+
																				"</td>"+
																				"<td>" +
																					vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																				"</td>" +
																				"<td>" +
																					delay_aver+
																				"</td>" +
																			"</tr>";
																}
															}
														});
														html += "</table>";	
													}else{
														html += "未获取数据，无法展示信息！";
													}	
									html += "</td>" +
										"</tr>";
								}
							}
						});
						
						html += "</table>";
						//必须先把创建好的表格放到页面中，才能通过其id画relay的关系图
						$('#voip_bz').html(html);
	
						getpath = called.getpath;
						if(getpath!=undefined&&getpath!=null&&getpath!==""){
							var resp_cmd_path_array = getpath.resp_cmd_path_array;
							if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
								//画Relay关系图
								$.each(voip,function(i,val){
									pathid = val.pathid;
									pathinfo = val.pathinfo;
									if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
										var pathinfoArr = pathinfo.split(' ');
										var map = new Map();
										$.each(pathinfoArr,function(j,va){
											map.put(va.split('=')[0],va.split('=')[1]);
										});
										//路径ID
										pid = map.get('pid');
										//道路类型
										path_type = map.get('path_type');
										if(path_type!='rpath'){
											var flag = 0;
											//画Relay关系图
											$.each(resp_cmd_path_array,function(j,v){
												if(pathid==v.path_id||pid==v.path_id){//取得与pathid对应的getpath中的子路径
													flag = 1;
													//画图函数
													drawPathByDataObject(v,"voipView_bz"+i);
													return; 
												}
											});
											if(flag==0){
												$("#voipView_bz"+i).text("getpath中没有与上面“路径ID”对应的路径,无法展示关系图。");
											}
										}
									}else{
										$("#voipView_bz"+i).text("getpath中没有与上面“路径ID”对应的路径,无法展示关系图。");
									}
								});
							}
						}
					}
				}
			}
			
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					
					//flash在voip上的信息
					var flashVoip;
					var dealy;//延时
					var flashsdkIp;//FlashSDK的ip
				    var rtmpserverIp;//RtmpServer的ip
				    var dest_v_lost_r;//RtmpServer-->FlashSDK的视频丢包率
				    var dest_a_lost_r;//RtmpServer-->FlashSDK的音频丢包率
					
					flashVoip = call.flashVoip;
					if(flashVoip!=undefined&&flashVoip!=null&&flashVoip!==""){
						dealy = flashVoip.delay;
						flashsdkIp = flashVoip.flashsdkIp;//FlashSDK的ip
				    	rtmpserverIp = flashVoip.rtmpserverIp;//RtmpServer的ip
					    dest_v_lost_r = flashVoip.dest_v_lost_r;//RtmpServer-->FlashSDK的视频丢包率
					    dest_a_lost_r = flashVoip.dest_a_lost_r;//RtmpServer-->FlashSDK的音频丢包率
					}
					
					//空值校验
					if(dealy==undefined||dealy==null||dealy===""){dealy="--";}
					if(flashsdkIp==undefined||flashsdkIp==null||flashsdkIp===""){flashsdkIp="--";}
					if(rtmpserverIp==undefined||rtmpserverIp==null||rtmpserverIp===""){rtmpserverIp="--";}
					if(dest_v_lost_r==undefined||dest_v_lost_r==null||dest_v_lost_r===""){dest_v_lost_r="--";}
					if(dest_a_lost_r==undefined||dest_a_lost_r==null||dest_a_lost_r===""){dest_a_lost_r="--";}
					
					html1 +="<table class='detailTable'>" +
								"<tr>" +
									"<td rowspan='2' style='width:400px;'>FlashSDK("+flashsdkIp+")-->RtmpServer("+rtmpserverIp+")</td>" +
									"<td style='width:170px;'>视频丢包率(%)</td>" +
									"<td style='width:242px;'>音频丢包率(%)</td>" +
									"<td>延时(ms)</td>" +
								"</tr>" +
								"<tr>" +
									"<td>"+dest_v_lost_r+"</td>" +
									"<td>"+dest_a_lost_r+"</td>" +
									"<td>"+dealy+"</td>" +
								"</tr>" +
								"<tr>" +
								"<td colspan='4'>注：-- 代表未获取到数据</td>" +
								"</tr>" +
							"</table>";
				}
			}
			$('#voip_bz').append(html1);
			
			
		}
	}
}