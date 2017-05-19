/*
 * 通话详情/带宽自适应/静态协商参数
 * 
 */

function bandWithAdaptive_ability(datas){
	
	var paramExt;//包下以下七种参数
	
	var adjust_ability;//呼叫接通前协商输入参数上报
	
	var adjust_result_adjust_mode_0;//静态协商结果
	
	var cut_enlarge_path;//砍掉放大路径消息上报
	
	/**
	 * 静态协商，主叫
	 */
	var etoe_bw_zb;//端到端带宽
	var trans_level_id_zb;//协商后所在等级
	var audio_redundent_lev_zb;//音频FEC等级 
	var video_redundent_lev_zb;//视频FEC等级
	var audio_bitrate_zb;//音频码率 
	var video_bitrate_zb;//视频码率
	var is_adjust_zb;//是否开启动态协商（0没开启，非0开启）
	/**
	 * 静态协商，被叫
	 */
	var etoe_bw_bz;//端到端带宽
	var trans_level_id_bz;//协商后所在等级
	var audio_redundent_lev_bz;//音频FEC等级 
	var video_redundent_lev_bz;//视频FEC等级
	var audio_bitrate_bz;//音频码率 
	var video_bitrate_bz;//视频码率
	var is_adjust_bz;//是否开启动态协商（0没开启，非0开启）
	
	/**
	 * 设备能力表格，主叫
	 */
	 //共18个
	 var camera_size_zb;//摄像头分辨率
	 var dev_enc_size_lev_zb;//编码分辨率 
	 var dev_enc_fr_lev_zb;//编码帧率 
	 var dev_enc_bitrate_max_zb;//编码码率 
	 var audio_red_lev_zb;//音频FEC等级 
	 var video_red_lev_zb;//视频FEC等级 
	 var p2p_ok_zb;//是否打洞成功 
	 
	 var upload_bw_zb;//本端上行带宽 
	 var ldownload_bw_zb;//本端下行带宽 (接收带宽)
	 var lnet_type_zb;//本端网络类型 
	 var ldev_type_zb;//本端设备类型 
	 
	 var dev_dec_size_max_zb;//对端解码分辨率 
	 var dev_dec_fr_max_zb;//对端解码帧率 
	 var dev_dec_bitrate_max_zb;//对端解码码率
	 var rdev_type_zb;//;对端设备类型 
	 var rnet_type_zb;//对端网络类型 
	 var download_bw_zb;//对端下行带宽 
	 var screen_size_zb;//对端屏幕分辨率
	/**
	 * 设备能力表格，被叫
	 */
	 //共18个
	 var camera_size_bz;//摄像头分辨率
	 var dev_enc_size_lev_bz;//编码分辨率 
	 var dev_enc_fr_lev_bz;//编码帧率 
	 var dev_enc_bitrate_max_bz;//编码码率 
	 var audio_red_lev_bz;//音频FEC等级 
	 var video_red_lev_bz;//视频FEC等级 
	 var p2p_ok_bz;//是否打洞成功 
	 
	 var upload_bw_bz;//本端上行带宽 
	 var ldownload_bw_bz;//本端下行带宽 (接收带宽)
	 var lnet_type_bz;//本端网络类型 
	 var ldev_type_bz;//本端设备类型 
	 
	 var dev_dec_size_max_bz;//对端解码分辨率 
	 var dev_dec_fr_max_bz;//对端解码帧率 
	 var dev_dec_bitrate_max_bz;//对端解码码率
	 var rdev_type_bz;//;对端设备类型 
	 var rnet_type_bz;//对端网络类型 
	 var download_bw_bz;//对端下行带宽 
	 var screen_size_bz;//对端屏幕分辨率
	 
	 /**
	  * 砍掉的路径，主叫
	  */
	 var bcutpath_zb;//砍放大路径前的原始路径 
	 var acutpath_zb;//砍放大路径后的路径
	 
	 /**
	  * 砍掉的路径，被叫
	  */
	 var bcutpath_bz;//砍放大路径前的原始路径 
	 var acutpath_bz;//砍放大路径后的路径
	
	
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			var called = data.called;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						
						//能力参数
						adjust_ability = paramExt.adjust_ability;//呼叫接通前协商输入参数上报
						if(adjust_ability!=undefined&&adjust_ability!=null&&adjust_ability!==""){
							var adjust_abilityArr = adjust_ability.split(' ');
							var adjust_abilityMap = new Map();
							if(adjust_abilityArr!=undefined&&adjust_abilityArr!=null&&adjust_abilityArr!==""&&(adjust_abilityArr instanceof Array)){
								$.each(adjust_abilityArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_abilityMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
						
							if(adjust_abilityMap!=undefined&&adjust_abilityMap!=null&&adjust_abilityMap!==""){
								//共18个
								audio_red_lev_zb = adjust_abilityMap.get('audio_red_lev');//音频FEC等级 
								camera_size_zb = adjust_abilityMap.get('camera_size');//摄像头分辨率
								dev_enc_bitrate_max_zb = adjust_abilityMap.get('dev_enc_bitrate_max');//编码码率 
								dev_enc_fr_lev_zb = adjust_abilityMap.get('dev_enc_fr_lev');//编码帧率 
								dev_enc_size_lev_zb = adjust_abilityMap.get('dev_enc_size_lev');//编码分辨率 
								ldev_type_zb = adjust_abilityMap.get('ldev_type');//本端设备类型 
								lnet_type_zb = adjust_abilityMap.get('lnet_type');//本端网络类型 
								p2p_ok_zb = adjust_abilityMap.get('p2p_ok');//是否打洞成功 
								upload_bw_zb = adjust_abilityMap.get('upload_bw');//本端上行带宽 
								ldownload_bw_zb = adjust_abilityMap.get('ldownload_bw');//本端下行带宽 
								video_red_lev_zb = adjust_abilityMap.get('video_red_lev');//视频FEC等级 
								dev_dec_bitrate_max_zb = adjust_abilityMap.get('dev_dec_bitrate_max');//对端解码码率
								dev_dec_fr_max_zb = adjust_abilityMap.get('dev_dec_fr_max');//对端解码帧率 
								dev_dec_size_max_zb = adjust_abilityMap.get('dev_dec_size_max');//对端解码分辨率 
								rdev_type_zb = adjust_abilityMap.get('rdev_type');//;对端设备类型 
								download_bw_zb = adjust_abilityMap.get('download_bw');//对端下行带宽 
								rnet_type_zb = adjust_abilityMap.get('rnet_type');//对端网络类型 
								screen_size_zb = adjust_abilityMap.get('screen_size');//对端屏幕分辨率
							}
						}
						
						//砍路信息
						cut_enlarge_path = paramExt.cut_enlarge_path;//砍掉放大路径消息上报
						if(cut_enlarge_path!=undefined&&cut_enlarge_path!=null&&cut_enlarge_path!==""){
							var cut_enlarge_pathArr = cut_enlarge_path.split(' ');
							var cut_enlarge_pathMap = new Map();
							if(cut_enlarge_pathArr!=undefined&&cut_enlarge_pathArr!=null&&cut_enlarge_pathArr!==""&&(cut_enlarge_pathArr instanceof Array)){
								$.each(cut_enlarge_pathArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										cut_enlarge_pathMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							bcutpath_zb = cut_enlarge_pathMap.get('bcutpath');//砍放大路径前的原始路径 
 							acutpath_zb = cut_enlarge_pathMap.get('acutpath');//砍放大路径后的路径
						}
						
						//静态协商
						adjust_result_adjust_mode_0 = paramExt.adjust_result_adjust_mode_0;
						if(adjust_result_adjust_mode_0!=undefined&&adjust_result_adjust_mode_0!=null&&adjust_result_adjust_mode_0!==""){
							var adjust_result_adjust_mode_0Arr = adjust_result_adjust_mode_0.split(' ');
							var adjust_result_adjust_mode_0Map = new Map();
							if(adjust_result_adjust_mode_0Arr!=undefined&&adjust_result_adjust_mode_0Arr!=null&&adjust_result_adjust_mode_0Arr!==""&&(adjust_result_adjust_mode_0Arr instanceof Array)){
								$.each(adjust_result_adjust_mode_0Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_result_adjust_mode_0Map.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							/**
							 * 静态协商，主叫
							 */
							etoe_bw_zb = adjust_result_adjust_mode_0Map.get('etoe_bw');//端到端带宽
							trans_level_id_zb = adjust_result_adjust_mode_0Map.get('trans_level_id');//协商后所在等级
							audio_redundent_lev_zb = adjust_result_adjust_mode_0Map.get('audio_redundent_lev');//音频FEC等级 
							video_redundent_lev_zb = adjust_result_adjust_mode_0Map.get('video_redundent_lev');//视频FEC等级
							audio_bitrate_zb = adjust_result_adjust_mode_0Map.get('audio_bitrate');//音频码率 
							video_bitrate_zb = adjust_result_adjust_mode_0Map.get('video_bitrate');//视频码率
							is_adjust_zb = adjust_result_adjust_mode_0Map.get('is_adjust');//是否开启动态协商（0没开启，非0开启）
						}
					}
				}
			}
			
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						
						//能力参数
						adjust_ability = paramExt.adjust_ability;//呼叫接通前协商输入参数上报
						if(adjust_ability!=undefined&&adjust_ability!=null&&adjust_ability!==""){
							var adjust_abilityArr = adjust_ability.split(' ');
							var adjust_abilityMap = new Map();
							if(adjust_abilityArr!=undefined&&adjust_abilityArr!=null&&adjust_abilityArr!==""&&(adjust_abilityArr instanceof Array)){
								$.each(adjust_abilityArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_abilityMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
						
							if(adjust_abilityMap!=undefined&&adjust_abilityMap!=null&&adjust_abilityMap!==""){
								//共18个
								audio_red_lev_bz = adjust_abilityMap.get('audio_red_lev');//音频FEC等级 
								camera_size_bz = adjust_abilityMap.get('camera_size');//摄像头分辨率
								dev_enc_bitrate_max_bz = adjust_abilityMap.get('dev_enc_bitrate_max');//编码码率 
								dev_enc_fr_lev_bz = adjust_abilityMap.get('dev_enc_fr_lev');//编码帧率 
								dev_enc_size_lev_bz = adjust_abilityMap.get('dev_enc_size_lev');//编码分辨率 
								ldev_type_bz = adjust_abilityMap.get('ldev_type');//本端设备类型 
								lnet_type_bz = adjust_abilityMap.get('lnet_type');//本端网络类型 
								p2p_ok_bz = adjust_abilityMap.get('p2p_ok');//是否打洞成功 
								upload_bw_bz = adjust_abilityMap.get('upload_bw');//本端上行带宽 
								ldownload_bw_bz = adjust_abilityMap.get('ldownload_bw');//本端下行带宽 
								video_red_lev_bz = adjust_abilityMap.get('video_red_lev');//视频FEC等级 
								dev_dec_bitrate_max_bz = adjust_abilityMap.get('dev_dec_bitrate_max');//对端解码码率
								dev_dec_fr_max_bz = adjust_abilityMap.get('dev_dec_fr_max');//对端解码帧率 
								dev_dec_size_max_bz = adjust_abilityMap.get('dev_dec_size_max');//对端解码分辨率 
								rdev_type_bz = adjust_abilityMap.get('rdev_type');//;对端设备类型 
								download_bw_bz = adjust_abilityMap.get('download_bw');//对端下行带宽 
								rnet_type_bz = adjust_abilityMap.get('rnet_type');//对端网络类型 
								screen_size_bz = adjust_abilityMap.get('screen_size');//对端屏幕分辨率
							}
						}
						
						//砍路信息
						cut_enlarge_path = paramExt.cut_enlarge_path;//砍掉放大路径消息上报
						if(cut_enlarge_path!=undefined&&cut_enlarge_path!=null&&cut_enlarge_path!==""){
							var cut_enlarge_pathArr = cut_enlarge_path.split(' ');
							var cut_enlarge_pathMap = new Map();
							if(cut_enlarge_pathArr!=undefined&&cut_enlarge_pathArr!=null&&cut_enlarge_pathArr!==""&&(cut_enlarge_pathArr instanceof Array)){
								$.each(cut_enlarge_pathArr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										cut_enlarge_pathMap.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							bcutpath_bz = cut_enlarge_pathMap.get('bcutpath');//砍放大路径前的原始路径 
 							acutpath_bz = cut_enlarge_pathMap.get('acutpath');//砍放大路径后的路径
						}
						
						//静态协商
						adjust_result_adjust_mode_0 = paramExt.adjust_result_adjust_mode_0;
						if(adjust_result_adjust_mode_0!=undefined&&adjust_result_adjust_mode_0!=null&&adjust_result_adjust_mode_0!==""){
							var adjust_result_adjust_mode_0Arr = adjust_result_adjust_mode_0.split(' ');
							var adjust_result_adjust_mode_0Map = new Map();
							if(adjust_result_adjust_mode_0Arr!=undefined&&adjust_result_adjust_mode_0Arr!=null&&adjust_result_adjust_mode_0Arr!==""&&(adjust_result_adjust_mode_0Arr instanceof Array)){
								$.each(adjust_result_adjust_mode_0Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_result_adjust_mode_0Map.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							/**
							 * 静态协商，被叫
							 */
							etoe_bw_bz = adjust_result_adjust_mode_0Map.get('etoe_bw');//端到端带宽
							trans_level_id_bz = adjust_result_adjust_mode_0Map.get('trans_level_id');//协商后所在等级
							audio_redundent_lev_bz = adjust_result_adjust_mode_0Map.get('audio_redundent_lev');//音频FEC等级 
							video_redundent_lev_bz = adjust_result_adjust_mode_0Map.get('video_redundent_lev');//视频FEC等级
							audio_bitrate_bz = adjust_result_adjust_mode_0Map.get('audio_bitrate');//音频码率 
							video_bitrate_bz = adjust_result_adjust_mode_0Map.get('video_bitrate');//视频码率
							is_adjust_bz = adjust_result_adjust_mode_0Map.get('is_adjust');//是否开启动态协商（0没开启，非0开启）
						}
					}
				}
			}
			
		}
	}
	
	if(camera_size_zb!=undefined&&camera_size_zb!=null&&camera_size_zb!==""){
		camera_size_zb = camera_screen_map.get(camera_size_zb)+"["+camera_size_zb+"]";
	}
	if(camera_size_bz!=undefined&&camera_size_bz!=null&&camera_size_bz!==""){
		camera_size_bz = camera_screen_map.get(camera_size_bz)+"["+camera_size_bz+"]";
	}
	if(screen_size_zb!=undefined&&screen_size_zb!=null&&screen_size_zb!==""){
		screen_size_zb = camera_screen_map.get(screen_size_zb)+"["+screen_size_zb+"]";
	}
	if(screen_size_bz!=undefined&&screen_size_bz!=null&&screen_size_bz!==""){
		screen_size_bz = camera_screen_map.get(screen_size_bz)+"["+screen_size_bz+"]";
	}
	
	if(dev_enc_size_lev_zb!=undefined&&dev_enc_size_lev_zb!=null&&dev_enc_size_lev_zb!==""){
		dev_enc_size_lev_zb = camera_screen_map.get(dev_enc_size_lev_zb)+"["+dev_enc_size_lev_zb+"]";
	}
	if(dev_enc_size_lev_bz!=undefined&&dev_enc_size_lev_bz!=null&&dev_enc_size_lev_bz!==""){
		dev_enc_size_lev_bz = camera_screen_map.get(dev_enc_size_lev_bz)+"["+dev_enc_size_lev_bz+"]";
	}
	if(dev_dec_size_max_zb!=undefined&&dev_dec_size_max_zb!=null&&dev_dec_size_max_zb!==""){
		dev_dec_size_max_zb = camera_screen_map.get(dev_dec_size_max_zb)+"["+dev_dec_size_max_zb+"]";
	}
	if(dev_dec_size_max_bz!=undefined&&dev_dec_size_max_bz!=null&&dev_dec_size_max_bz!==""){
		dev_dec_size_max_bz = camera_screen_map.get(dev_dec_size_max_bz)+"["+dev_dec_size_max_bz+"]";
	}
	
	if(audio_red_lev_zb==undefined||audio_red_lev_zb==null||audio_red_lev_zb===""){
		audio_red_lev_zb = "--";
	}
	if(camera_size_zb==undefined||camera_size_zb==null||camera_size_zb===""){
		camera_size_zb = "--";
	}
	if(dev_enc_bitrate_max_zb==undefined||dev_enc_bitrate_max_zb==null||dev_enc_bitrate_max_zb===""){
		dev_enc_bitrate_max_zb = "--";
	}
	if(dev_enc_fr_lev_zb==undefined||dev_enc_fr_lev_zb==null||dev_enc_fr_lev_zb===""){
		dev_enc_fr_lev_zb = "--";
	}
	if(dev_enc_size_lev_zb==undefined||dev_enc_size_lev_zb==null||dev_enc_size_lev_zb===""){
		dev_enc_size_lev_zb = "--";
	}
	if(ldev_type_zb==undefined||ldev_type_zb==null||ldev_type_zb===""){
		ldev_type_zb = "--";
	}
	if(lnet_type_zb==undefined||lnet_type_zb==null||lnet_type_zb===""){
		lnet_type_zb = "--";
	}
	if(p2p_ok_zb==undefined||p2p_ok_zb==null||p2p_ok_zb===""){
		p2p_ok_zb = "--";
	}
	if(upload_bw_zb==undefined||upload_bw_zb==null||upload_bw_zb===""){
		upload_bw_zb = "--";
	}
	if(ldownload_bw_zb==undefined||ldownload_bw_zb==null||ldownload_bw_zb===""){
		ldownload_bw_zb = "--";
	}
	if(video_red_lev_zb==undefined||video_red_lev_zb==null||video_red_lev_zb===""){
		video_red_lev_zb = "--";
	}
	if(dev_dec_bitrate_max_zb==undefined||dev_dec_bitrate_max_zb==null||dev_dec_bitrate_max_zb===""){
		dev_dec_bitrate_max_zb = "--";
	}
	if(dev_dec_fr_max_zb==undefined||dev_dec_fr_max_zb==null||dev_dec_fr_max_zb===""){
		dev_dec_fr_max_zb = "--";
	}
	if(dev_dec_size_max_zb==undefined||dev_dec_size_max_zb==null||dev_dec_size_max_zb===""){
		dev_dec_size_max_zb = "--";
	}
	if(rdev_type_zb==undefined||rdev_type_zb==null||rdev_type_zb===""){
		rdev_type_zb = "--";
	}
	if(download_bw_zb==undefined||download_bw_zb==null||download_bw_zb===""){
		download_bw_zb = "--";
	}
	if(rnet_type_zb==undefined||rnet_type_zb==null||rnet_type_zb===""){
		rnet_type_zb = "--";
	}
	if(screen_size_zb==undefined||screen_size_zb==null||screen_size_zb===""){
		screen_size_zb = "--";
	}
	
	if(bcutpath_zb==undefined||bcutpath_zb==null||bcutpath_zb===""){
		bcutpath_zb = "--";
	}
	if(acutpath_zb==undefined||acutpath_zb==null||acutpath_zb===""){
		acutpath_zb = "--";
	}
	
	//本端设备类型
	var ldev_typeChinese_zb = device_type_map.get(ldev_type_zb);
	//远端设备类型
	var rdev_typeChinese_zb = device_type_map.get(rdev_type_zb);
	if(ldev_typeChinese_zb==undefined||ldev_typeChinese_zb==null||ldev_typeChinese_zb===""){
		ldev_typeChinese_zb = "--";
	}
	if(rdev_typeChinese_zb==undefined||rdev_typeChinese_zb==null||rdev_typeChinese_zb===""){
		rdev_typeChinese_zb = "--";
	}
	
	//本端网络类型
	var lnet_typeChinese_zb = net_type_map.get(lnet_type_zb);
	//远端网络类型
	var rnet_typeChinese_zb = net_type_map.get(rnet_type_zb);
	if(lnet_typeChinese_zb==undefined||lnet_typeChinese_zb==null||lnet_typeChinese_zb===""){
		lnet_typeChinese_zb = "--";
	}
	if(rnet_typeChinese_zb==undefined||rnet_typeChinese_zb==null||rnet_typeChinese_zb===""){
		rnet_typeChinese_zb = "--";
	}
	
	if(p2p_ok_zb!=undefined&&p2p_ok_zb!=null&&p2p_ok_zb!==""){
		if(p2p_ok_zb==0){
			p2p_ok_zb = "失败[0]";
		}else if(p2p_ok_zb==1){
			p2p_ok_zb = "成功[1]";
		}
	}
	
	if(audio_red_lev_bz==undefined||audio_red_lev_bz==null||audio_red_lev_bz===""){
		audio_red_lev_bz = "--";
	}
	if(camera_size_bz==undefined||camera_size_bz==null||camera_size_bz===""){
		camera_size_bz = "--";
	}
	if(dev_enc_bitrate_max_bz==undefined||dev_enc_bitrate_max_bz==null||dev_enc_bitrate_max_bz===""){
		dev_enc_bitrate_max_bz = "--";
	}
	if(dev_enc_fr_lev_bz==undefined||dev_enc_fr_lev_bz==null||dev_enc_fr_lev_bz===""){
		dev_enc_fr_lev_bz = "--";
	}
	if(dev_enc_size_lev_bz==undefined||dev_enc_size_lev_bz==null||dev_enc_size_lev_bz===""){
		dev_enc_size_lev_bz = "--";
	}
	if(ldev_type_bz==undefined||ldev_type_bz==null||ldev_type_bz===""){
		ldev_type_bz = "--";
	}
	if(lnet_type_bz==undefined||lnet_type_bz==null||lnet_type_bz===""){
		lnet_type_bz = "--";
	}
	if(p2p_ok_bz==undefined||p2p_ok_bz==null||p2p_ok_bz===""){
		p2p_ok_bz = "--";
	}
	if(upload_bw_bz==undefined||upload_bw_bz==null||upload_bw_bz===""){
		upload_bw_bz = "--";
	}
	if(ldownload_bw_bz==undefined||ldownload_bw_bz==null||ldownload_bw_bz===""){
		ldownload_bw_bz = "--";
	}
	if(video_red_lev_bz==undefined||video_red_lev_bz==null||video_red_lev_bz===""){
		video_red_lev_bz = "--";
	}
	if(dev_dec_bitrate_max_bz==undefined||dev_dec_bitrate_max_bz==null||dev_dec_bitrate_max_bz===""){
		dev_dec_bitrate_max_bz = "--";
	}
	if(dev_dec_fr_max_bz==undefined||dev_dec_fr_max_bz==null||dev_dec_fr_max_bz===""){
		dev_dec_fr_max_bz = "--";
	}
	if(dev_dec_size_max_bz==undefined||dev_dec_size_max_bz==null||dev_dec_size_max_bz===""){
		dev_dec_size_max_bz = "--";
	}
	if(rdev_type_bz==undefined||rdev_type_bz==null||rdev_type_bz===""){
		rdev_type_bz = "--";
	}
	if(download_bw_bz==undefined||download_bw_bz==null||download_bw_bz===""){
		download_bw_bz = "--";
	}
	if(rnet_type_bz==undefined||rnet_type_bz==null||rnet_type_bz===""){
		rnet_type_bz = "--";
	}
	if(screen_size_bz==undefined||screen_size_bz==null||screen_size_bz===""){
		screen_size_bz = "--";
	}
	if(bcutpath_bz==undefined||bcutpath_bz==null||bcutpath_bz===""){
		bcutpath_bz = "--";
	}
	if(acutpath_bz==undefined||acutpath_bz==null||acutpath_bz===""){
		acutpath_bz = "--";
	}
	
	//本端设备类型
	var ldev_typeChinese_bz = device_type_map.get(ldev_type_bz);
	//远端设备类型
	var rdev_typeChinese_bz = device_type_map.get(rdev_type_bz);
	if(ldev_typeChinese_bz==undefined||ldev_typeChinese_bz==null||ldev_typeChinese_bz===""){
		ldev_typeChinese_bz = "--";
	}
	if(rdev_typeChinese_bz==undefined||rdev_typeChinese_bz==null||rdev_typeChinese_bz===""){
		rdev_typeChinese_bz = "--";
	}
	
	//本端网络类型
	var lnet_typeChinese_bz = net_type_map.get(lnet_type_bz);
	//远端网络类型
	var rnet_typeChinese_bz = net_type_map.get(rnet_type_bz);
	if(lnet_typeChinese_bz==undefined||lnet_typeChinese_bz==null||lnet_typeChinese_bz===""){
		lnet_typeChinese_bz = "--";
	}
	if(rnet_typeChinese_bz==undefined||rnet_typeChinese_bz==null||rnet_typeChinese_bz===""){
		rnet_typeChinese_bz = "--";
	}
	
	if(p2p_ok_bz!=undefined&&p2p_ok_bz!=null&&p2p_ok_bz!==""){
		if(p2p_ok_bz==0){
			p2p_ok_bz = "失败[0]";
		}else if(p2p_ok_bz==1){
			p2p_ok_bz = "成功[1]";
		}
	}
	
	if(etoe_bw_zb==undefined||etoe_bw_zb==null||etoe_bw_zb===""){
		etoe_bw_zb = "--";
	}
	if(trans_level_id_zb==undefined||trans_level_id_zb==null||trans_level_id_zb===""){
		trans_level_id_zb = "--";
	}
	if(audio_redundent_lev_zb==undefined||audio_redundent_lev_zb==null||audio_redundent_lev_zb===""){
		audio_redundent_lev_zb = "--";
	}
	if(video_redundent_lev_zb==undefined||video_redundent_lev_zb==null||video_redundent_lev_zb===""){
		video_redundent_lev_zb = "--";
	}
	if(audio_bitrate_zb==undefined||audio_bitrate_zb==null||audio_bitrate_zb===""){
		audio_bitrate_zb = "--";
	}
	if(video_bitrate_zb==undefined||video_bitrate_zb==null||video_bitrate_zb===""){
		video_bitrate_zb = "--";
	}
	if(is_adjust_zb==undefined||is_adjust_zb==null||is_adjust_zb===""){
		is_adjust_zb = "--";
	}else{
		if(isNaN(is_adjust_zb)==false){//必须是数字
			if(is_adjust_zb==0){
				is_adjust_zb = "不开启["+is_adjust_zb+"]";
			}else if(is_adjust_zb!=0){
				is_adjust_zb = "开启["+is_adjust_zb+"]";
			}
		}
	}
	if(etoe_bw_bz==undefined||etoe_bw_bz==null||etoe_bw_bz===""){
		etoe_bw_bz = "--";
	}
	if(trans_level_id_bz==undefined||trans_level_id_bz==null||trans_level_id_bz===""){
		trans_level_id_bz = "--";
	}
	if(audio_redundent_lev_bz==undefined||audio_redundent_lev_bz==null||audio_redundent_lev_bz===""){
		audio_redundent_lev_bz = "--";
	}
	if(video_redundent_lev_bz==undefined||video_redundent_lev_bz==null||video_redundent_lev_bz===""){
		video_redundent_lev_bz = "--";
	}
	if(audio_bitrate_bz==undefined||audio_bitrate_bz==null||audio_bitrate_bz===""){
		audio_bitrate_bz = "--";
	}
	if(video_bitrate_bz==undefined||video_bitrate_bz==null||video_bitrate_bz===""){
		video_bitrate_bz = "--";
	}
	if(is_adjust_bz==undefined||is_adjust_bz==null||is_adjust_bz===""){
		is_adjust_bz = "--";
	}else{
		if(isNaN(is_adjust_bz)==false){//必须是数字
			if(is_adjust_bz==0){
				is_adjust_bz = "不开启["+is_adjust_bz+"]";
			}else if(is_adjust_bz!=0){
				is_adjust_bz = "开启["+is_adjust_bz+"]";
			}
		}
	}
	
	var html = "";
	html += "<center>";
	html += "<table class='bandAdaptive'>" +
				"<caption><b>主</b>→<b>被</b></caption>" +
				"<tr>" +
					"<th></th>" +
					"<th title='本端指上行带宽，远端指下行带宽'>带宽 (kb)</th>" +
					"<th>硬件分辨率 </th>" +
					"<th title='本端指编码分辨率，远端指解码分辨率'>编 / 解码分辨率 </th>" +
					"<th title='本端指编码码率，远端指解码码率'>编 / 解码码率 </th>" +
					"<th title='本端指编码帧率，远端指解码帧率'>编 / 解码帧率 </th>" +
					//"<th>视频FEC等级</th>" +
					//"<th>音频FEC等级 </th>" +
					"<th colspan='2'>设备类型 </th>" +
					"<th colspan='2'>网络类型</th>" +
					"<th>前置打洞 </th>" +
				"</tr>" +
				"<tr>" +
					"<td>本端</td>" +
					"<td>上行："+upload_bw_zb+"</td>" +
					"<td class='bandAdaptivetd01'>摄头："+camera_size_zb+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_size_lev_zb+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_bitrate_max_zb+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_fr_lev_zb+"</td>" +
					//"<td class='bandAdaptivetd01'>"+video_red_lev_zb+"</td>" +
					//"<td class='bandAdaptivetd02'>"+audio_red_lev_zb+"</td>" +
					"<td colspan='2'>"+ldev_typeChinese_zb+"["+ldev_type_zb+"]</td>" +
					"<td colspan='2'>"+lnet_typeChinese_zb+"["+lnet_type_zb+"]</td>" +
					"<td>"+p2p_ok_zb+"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>远端：</td>" +
					"<td>下行："+download_bw_zb+"</td>" +
					"<td class='bandAdaptivetd01'>屏幕："+screen_size_zb+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_size_max_zb+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_bitrate_max_zb+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_fr_max_zb+"</td>" +
					//"<td class='bandAdaptivetd01'></td>" +
					//"<td class='bandAdaptivetd02'></td>" +
					"<td colspan='2'>"+rdev_typeChinese_zb+"["+rdev_type_zb+"]</td>" +
					"<td colspan='2'>"+rnet_typeChinese_zb+"["+rnet_type_zb+"]</td>" +
					"<td></td>" +
				"</tr>" +
				"<tr>" +
					"<th></th>" +
					"<th>端到端带宽(kb)</th>" +
					"<th colspan='4'>视音频编码级别</th>" +
					"<th>视频FEC级别</th>" +
					"<th>音频FEC级别</th>" +
					"<th>视频码率</th>" +
					"<th>音频码率</th>" +
					"<th>是否开启自适应调节</th>" +
				"</tr>" +
				"<tr>" +
					"<td>静态协商结果</td>" +
					"<td>"+etoe_bw_zb+"</td>" +
					"<td class='bandAdaptivetd02' colspan='4'><center>"+trans_level_id_zb+"</center></td>" +
					"<td>"+video_redundent_lev_zb+"</td>" +
					"<td>"+audio_redundent_lev_zb+"</td>" +
					"<td>"+video_bitrate_zb+"</td>" +
					"<td>"+audio_bitrate_zb+"</td>" +
					"<td>"+is_adjust_zb+"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>砍路结果</td>" +
					"<td colspan='5'>砍掉放大路径前的原始路径 : "+bcutpath_zb+"</td>" +
					"<td colspan='5'>砍掉放大路径后的路径 : "+acutpath_zb+"</td>" +
				"</tr>" +
			"</table>";
	html += "<table class='bandAdaptive'>" +
				"<caption><b>被</b>→<b>主</b></caption>" +
				"<tr>" +
					"<th></th>" +
					"<th title='本端指上行带宽，远端指下行带宽'>带宽 (kb)</th>" +
					"<th>硬件分辨率 </th>" +
					"<th title='本端指编码分辨率，远端指解码分辨率'>编 / 解码分辨率 </th>" +
					"<th title='本端指编码码率，远端指解码码率'>编 / 解码码率 </th>" +
					"<th title='本端指编码帧率，远端指解码帧率'>编 / 解码帧率 </th>" +
					//"<th>视频FEC等级</th>" +
					//"<th>音频FEC等级 </th>" +
					"<th colspan='2'>设备类型 </th>" +
					"<th colspan='2'>网络类型</th>" +
					"<th>前置打洞 </th>" +
				"</tr>" +
				"<tr>" +
					"<td>本端</td>" +
					"<td>上行："+upload_bw_bz+"</td>" +
					"<td class='bandAdaptivetd01'>摄头："+camera_size_bz+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_size_lev_bz+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_bitrate_max_bz+"</td>" +
					"<td class='bandAdaptivetd01'>编："+dev_enc_fr_lev_bz+"</td>" +
					//"<td class='bandAdaptivetd01'>"+video_red_lev_bz+"</td>" +
					//"<td class='bandAdaptivetd02'>"+audio_red_lev_bz+"</td>" +
					"<td colspan='2'>"+ldev_typeChinese_bz+"["+ldev_type_bz+"]</td>" +
					"<td colspan='2'>"+lnet_typeChinese_bz+"["+lnet_type_bz+"]</td>" +
					"<td>"+p2p_ok_bz+"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>远端：</td>" +
					"<td>下行："+download_bw_bz+"</td>" +
					"<td class='bandAdaptivetd01'>屏幕："+screen_size_bz+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_size_max_bz+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_bitrate_max_bz+"</td>" +
					"<td class='bandAdaptivetd01'>解："+dev_dec_fr_max_bz+"</td>" +
					//"<td class='bandAdaptivetd01'></td>" +
					//"<td class='bandAdaptivetd02'></td>" +
					"<td colspan='2'>"+rdev_typeChinese_bz+"["+rdev_type_bz+"]</td>" +
					"<td colspan='2'>"+rnet_typeChinese_bz+"["+rnet_type_bz+"]</td>" +
					"<td></td>" +
				"</tr>" +
				"<tr>" +
					"<th></th>" +
					"<th>端到端带宽(kb)</th>" +
					"<th colspan='4'>视音频编码级别</th>" +
					"<th>视频FEC级别</th>" +
					"<th>音频FEC级别</th>" +
					"<th>视频码率</th>" +
					"<th>音频码率</th>" +
					"<th>是否开启自适应调节</th>" +
				"</tr>" +
				"<tr>" +
					"<td>静态协商结果</td>" +
					"<td>"+etoe_bw_bz+"</td>" +
					"<td class='bandAdaptivetd01' colspan='4'><center>"+trans_level_id_bz+"</center></td>" +
					"<td>"+video_redundent_lev_bz+"</td>" +
					"<td>"+audio_redundent_lev_bz+"</td>" +
					"<td>"+video_bitrate_bz+"</td>" +
					"<td>"+audio_bitrate_bz+"</td>" +
					"<td>"+is_adjust_bz+"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>砍路结果</td>" +
					"<td colspan='5'>砍掉放大路径前的原始路径 : "+bcutpath_bz+"</td>" +
					"<td colspan='5'>砍掉放大路径后的路径 : "+acutpath_bz+"</td>" +
				"</tr>" +
			"</table>";
			html += "<table class='bandAdaptive'>" +
						"<caption><b>带宽自适应调节等级表</b></caption>" +
						"<tr>" +
							"<th>等级</th>" +
							"<th>档次规格</th>" +
							"<th>帧率</th>" +
							"<th>主观编码效果</th>" +
							"<th>最高码率限制下限值</th>" +
							"<th>最高码率限制上限值</th>" +
						"</tr>" +
						"<tr>" +
							"<td>0</td>" +
							"<td>720P</td>" +
							"<td>20</td>" +
							"<td>无马赛克，流畅</td>" +
							"<td>1000K视频 + 35K音频</td>" +
							"<td>1200K视频 + 35K音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>1</td>" +
							"<td>VGA</td>" +
							"<td>15</td>" +
							"<td>无马赛克，流畅</td>" +
							"<td>600K视频 + 35K音频</td>" +
							"<td>1000K视频 + 35k音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>2</td>" +
							"<td>VAG</td>" +
							"<td>10</td>" +
							"<td>无马赛克，缓慢</td>" +
							"<td>400K视频 + 35K音频</td>" +
							"<td>600K视频 + 35K音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>3</td>" +
							"<td>QVAG</td>" +
							"<td>15</td>" +
							"<td>无马赛克，流畅</td>" +
							"<td>250K视频 + 22K音频</td>" +
							"<td>400K视频 + 22K音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>4</td>" +
							"<td>QVGA</td>" +
							"<td>10</td>" +
							"<td>无马赛克，顿</td>" +
							"<td>150K视频 + 22K音频</td>" +
							"<td>250K视频 + 22K音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>5</td>" +
							"<td>纯声音</td>" +
							"<td>0</td>" +
							"<td>无图像</td>" +
							"<td>35K音频</td>" +
							"<td>35K音频</td>" +
						"</tr>" +
						"<tr>" +
							"<td>6</td>" +
							"<td>纯声音</td>" +
							"<td>0</td>" +
							"<td>无图像</td>" +
							"<td>22K音频</td>" +
							"<td>22K音频</td>" +
						"</tr>" +
					"</table>";
					html += "<table class='bandAdaptive'>" +
								"<caption><b>FEC档位</b></caption>" +
								"<tr>" +
									"<td>音频冗余等级</td>" +
									"<td>视频冗余等级</td>" +
								"</tr>" +
								"<tr>" +
									"<td>FEC固定为4:2<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.1. 原始数据*1+FEC*1(3G初始档)<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2. 原始数据*2（WIFI初始档）<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;2. 原始数据*2+FEC*1<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;3. 原始数据*2+FEC*2<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;4. 原始数据*4+FEC*4" +
									"</td>" +
									"<td>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;1. 原始数据*1+FEC 5:1<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;2. 原始数据*1+FEC 5:2<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;3. 原始数据*1+FEC 5:3<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;4. 原始数据*1+FEC 5:4<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;5. 原始数据*2+FEC 5:4<br/>" +
									"&nbsp;&nbsp;&nbsp;&nbsp;6. 原始数据*2+FEC 5:4 *2" +
									"</td>" +
								"</tr>" +
								"<tr>" +
									"<td colspan='2'>" +
										"<span id='upLevel'>解释说明：<font style='color:#35A368;'><b>OPEN</b></font></span>" +
										"<span id='downLevel' style='display:none;'>解释说明：<font style='color:#FD042E;'><b>CLOSE</b></font></span>" +
										"<div id='bandFec' style='display:none;'>音频：<br/>" +
										"&nbsp;&nbsp;1.1&nbsp;&nbsp;原始数据发送1份，FEC冗余包发送一份，此份原始数据与FEC冗余包的比例为4:2，如果原始数据每份是4个包，那最后发送的总数据是6(4*1+2*1)个包；<br/>" +
										"&nbsp;&nbsp;1.2&nbsp;&nbsp;原始数据发送2份，不发送FEC冗余包，如果原始数据每份是4个包，那最后发送的总数据是8(4*2)个包；<br/>" +
										"&nbsp;&nbsp;2&nbsp;&nbsp;原始数据发送2份， FEC冗余包发送1份，其中每份原始数据与FEC冗余包的比例都为4:2，如果原始数据每份是4个包，那最后发送的总数据是10(4*2+2*1)个包；<br/>" +
										"&nbsp;&nbsp;3&nbsp;&nbsp;原始数据发送2份，FEC冗余包发送2份，其中每份原始数据与每份FEC冗余包的比例都为4:2，如果原始数据每份是4个包，那最后发送的总数据是12(4*2+2*2)个包；<br/>" +
										"&nbsp;&nbsp;4&nbsp;&nbsp;原始数据发送4份，FEC冗余包发送4份，其中每份原始数据与每份FEC冗余包的比例都为4:2，如果原始数据每份是4个包，那最后发送的总数据是24(4*4+2*4)个包；<br/>" +
										"视频：<br/>" +
										"&nbsp;&nbsp;1&nbsp;&nbsp;原始数据发送1份，FEC冗余包发送1份，原始数据与FEC冗余包的比例为5:1，如果原始数据每份是5个包，那最后发送的总数据是6(5*1+1*1)个包；<br/>" +
										"&nbsp;&nbsp;2&nbsp;&nbsp;原始数据发送1份，FEC冗余包发送1份，原始数据与FEC冗余包的比例为5:2，如果原始数据每份是5个包，那最后发送的总数据是7(5*1+2*1)个包；<br/>" +
										"&nbsp;&nbsp;3&nbsp;&nbsp;原始数据发送1份，FEC冗余包发送1份，原始数据与FEC冗余包的比例为5:3，如果原始数据每份是5个包，那最后发送的总数据是8(5*1+3*1)个包；<br/>" +
										"&nbsp;&nbsp;4&nbsp;&nbsp;原始数据发送1份，FEC冗余包发送1份，原始数据与FEC冗余包的比例为5:4，如果原始数据每份是5个包，那最后发送的总数据是9(5*1+4*1)个包；<br/>" +
										"&nbsp;&nbsp;5&nbsp;&nbsp;原始数据发送2份，FEC冗余包发送1份，其中每份原始数据与FEC冗余包的比例都为5:4，如果原始数据每份是5个包，那最后发送的总数据是14(5*2+4*1)个包；<br/>" +
										"&nbsp;&nbsp;6&nbsp;&nbsp;原始数据发送2份，FEC冗余包发送2份，其中每份原始数据与每份FEC冗余包的比例都为5:4，如果原始数据每份是5个包，那最后发送的总数据是18(5*2+4*2)个包；" +
										"</div>" +
									"</td>" +
								"</tr>" +
							"</table>";
							
		html += "</center>";
	$('#bandwithAdaptive_ability').html(html);
}