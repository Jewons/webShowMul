/**
 *对Flash调节的数据进行处理
 *三个图，每个图汇报的时间不一样，所以必须分开显示
 */
 
 //主叫端的map，存放了所有主叫端的信息
 var flashCallerMap = new Map();
 
 //被叫端的map，存放了所有被叫端的信息
 var flashCalledMap = new Map();
 
 
 //主叫方FlashSDK每10秒汇报一次的数据
 var cpu_caller = new Array();//主叫方FlashSDK的cpu
 var memory_caller = new Array();//主叫方FlashSDK的内存
 var real_v_bps_r_caller = new Array();//主叫方FlashSDK发送的视频码率
 var real_a_bps_r_caller = new Array();//主叫方FlashSDK发送的音频码率
 var real_v_bps_l_caller = new Array();//主叫方FlashSDK接收的视频码率
 var real_a_bps_l_caller = new Array();//主叫方FlashSDK接收的音频码率
 var sample_fps_caller = new Array();//主叫方FlashSDK的采样帧率
 var play_fps_caller = new Array();//主叫方FlashSDK的播放帧率
 var net_delay_caller = new Array();//主叫方FlashSDK的网络延时
 
 //主叫方RtmpServer每10次汇报一次的数据
 var v_bps_caller = new Array();//接收的视频码率
 var a_bps_caller = new Array();//接收的音频码率
 
 //主叫方RtmpServer丢包
 var flash_lost_caller = new Array();//丢包点

 
 //主叫方的媒体格式协商数据，由FlashSDK汇报，即调节点的数据
 var flash_adjust_caller = new Array();//调节点
 
 //被叫方FlashSDK每10秒汇报一次的数据
 var cpu_called = new Array();//主叫方FlashSDK的cpu
 var memory_called = new Array();//主叫方FlashSDK的内存
 var real_v_bps_r_called = new Array();//主叫方FlashSDK发送的视频码率
 var real_a_bps_r_called = new Array();//主叫方FlashSDK发送的音频码率
 var real_v_bps_l_called = new Array();//主叫方FlashSDK接收的视频码率
 var real_a_bps_l_called = new Array();//主叫方FlashSDK接收的音频码率
 var sample_fps_called = new Array();//主叫方FlashSDK的采样帧率
 var play_fps_called = new Array();//主叫方FlashSDK的播放帧率
 var net_delay_called = new Array();//主叫方FlashSDK的网络延时
 
 //被叫方RtmpServer每10次汇报一次的数据
 var v_bps_called = new Array();//接收的视频码率
 var a_bps_called = new Array();//接收的音频码率
 
 //被叫方RtmpServer丢包
 var flash_lost_called = new Array();//丢包点
 
 //被叫方的媒体格式协商数据，由FlashSDK汇报，即调节点的数据
 var flash_adjust_called = new Array();//调节点

 /**
  * 将Flash通话的各种数据进行处理
  * @param {} datas
  */
 function flashAdjustData(datas){
 	//主叫端的map，存放了所有主叫端的信息
	flashCallerMap = new Map();
	 
	//被叫端的map，存放了所有被叫端的信息
	flashCalledMap = new Map();
	 
	//主叫方FlashSDK每10秒汇报一次的数据
	cpu_caller = new Array();//主叫方FlashSDK的cpu
	memory_caller = new Array();//主叫方FlashSDK的内存
	real_v_bps_r_caller = new Array();//主叫方FlashSDK发送的视频码率
	real_a_bps_r_caller = new Array();//主叫方FlashSDK发送的音频码率
	real_v_bps_l_caller = new Array();//主叫方FlashSDK接收的视频码率
	real_a_bps_l_caller = new Array();//主叫方FlashSDK接收的音频码率
	sample_fps_caller = new Array();//主叫方FlashSDK的采样帧率
	play_fps_caller = new Array();//主叫方FlashSDK的播放帧率
	net_delay_caller = new Array();//主叫方FlashSDK的网络延时
	 
	//主叫方RtmpServer每10次汇报一次的数据
	v_bps_caller = new Array();//接收的视频码率
	a_bps_caller = new Array();//接收的音频码率
	 
	//主叫方RtmpServer丢包
	flash_lost_caller = new Array();//丢包点
	
	 
	//主叫方的媒体格式协商数据，由FlashSDK汇报，即调节点的数据
	flash_adjust_caller = new Array();//调节点
	 
	//被叫方FlashSDK每10秒汇报一次的数据
	cpu_called = new Array();//主叫方FlashSDK的cpu
	memory_called = new Array();//主叫方FlashSDK的内存
	real_v_bps_r_called = new Array();//主叫方FlashSDK发送的视频码率
    real_a_bps_r_called = new Array();//主叫方FlashSDK发送的音频码率
	real_v_bps_l_called = new Array();//主叫方FlashSDK接收的视频码率
	real_a_bps_l_called = new Array();//主叫方FlashSDK接收的音频码率
	sample_fps_called = new Array();//主叫方FlashSDK的采样帧率
	play_fps_called = new Array();//主叫方FlashSDK的播放帧率
	net_delay_called = new Array();//主叫方FlashSDK的网络延时
	 
	//被叫方RtmpServer每10次汇报一次的数据
	v_bps_called = new Array();//接收的视频码率
	a_bps_called = new Array();//接收的音频码率
	 
	//被叫方RtmpServer丢包
	flash_lost_called = new Array();//丢包点
	 
	//被叫方的媒体格式协商数据，由FlashSDK汇报，即调节点的数据
	flash_adjust_called = new Array();//调节点
 	
 	
 	
 	
 	//FlashSDK每10秒汇报的字段信息
	var play_fps;//播放帧率
	var sample_fps;//采样帧率
	var cpu;//CPU
	var memory; //内存
	var real_v_bps_l; //接收的视频码率
	var real_v_bps_r; //发送的视频码率
	var real_a_bps_l; //接收的音频码率
	var real_a_bps_r; //发送的音频码率
	var net_delay; //网络延时
	
	//RtmpServer每10次汇报一次的数据
	var v_bps;//接收的视频码率
	var a_bps;//接收的音频码率
	
	//丢包字段
 	var v_lost_num;//视频丢包数量
 	var v_lost_time;//视频丢包时间
 	var a_lost_num;//音频丢包数量
 	var a_lost_time;//音频丢包时间
	
	//媒体协商，即调节点
 	var v_bps;//视频码率
 	var v_resolution;//视频分辨率
 	var v_fps;//视频帧率
 	
	//时间，通用
	var time;
	
 	var result;
 	result = datas.result;
 	if(result===0){
 		var data = datas.data;
 		if(data!=undefined&&data!=null&&data!==""){
 			//主叫端信息
 			var caller = data.caller;
 			if(caller!=undefined&&caller!=null&&caller!==""){
 				var call = caller.call;
 				if(call!=undefined&&call!=null&&call!==""){
 					var flashAdjust = call.flashAdjust;
 					if(flashAdjust!=undefined&&flashAdjust!=null&&flashAdjust!==""){
 						//FlashSDK每10秒汇报一次的信息
 						var f_trans_quality = flashAdjust.f_trans_quality;
 						if(f_trans_quality!=undefined&&f_trans_quality!=null&&f_trans_quality!==""&&f_trans_quality instanceof Array){
 							var indexFlag_play_fps = 0 ;
 							var indexFlag_sample_fps = 0 ;
 							var indexFlag_cpu = 0 ;
 							var indexFlag_memory = 0 ;
 							var indexFlag_real_v_bps_l = 0 ;
 							var indexFlag_real_v_bps_r = 0 ;
 							var indexFlag_real_a_bps_l = 0 ;
 							var indexFlag_real_a_bps_r = 0 ;
 							var indexFlag_net_delay = 0 ;
 							$.each(f_trans_quality,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var f_trans_quality_arr = new Array();
		 							var f_trans_quality_map = new Map();
		 							f_trans_quality_arr = val.split(" ");
		 							if(f_trans_quality_arr!=undefined&&f_trans_quality_arr!=null&&f_trans_quality_arr!==""&&f_trans_quality_arr instanceof Array){
		 								$.each(f_trans_quality_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											f_trans_quality_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(f_trans_quality_map!=undefined&&f_trans_quality_map!=null&&f_trans_quality_map!==""){
		 								play_fps = f_trans_quality_map.get("play_fps");//播放帧率
			 							sample_fps = f_trans_quality_map.get("sample_fps");//采样帧率
			 							cpu = f_trans_quality_map.get("cpu");//CPU
			 							memory = f_trans_quality_map.get("memory"); //内存
			 							real_v_bps_l = f_trans_quality_map.get("real_v_bps_l"); //接收的视频码率
			 							real_v_bps_r = f_trans_quality_map.get("real_v_bps_r"); //发送的视频码率
			 							real_a_bps_l = f_trans_quality_map.get("real_a_bps_l"); //接收的音频码率
			 							real_a_bps_r = f_trans_quality_map.get("real_a_bps_r"); //发送的音频码率
			 							net_delay = f_trans_quality_map.get("net_delay"); //网络延时
			 							time = f_trans_quality_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
										//将数据存入数组和map
			 							if(play_fps!=undefined&&play_fps!=null&&play_fps!==""){
			 								//保留两位小数
			 								play_fps = toFixed(play_fps);
				 							var play_fpsArr = new Array();play_fpsArr[0] = time;play_fpsArr[1] = play_fps;
											play_fps_caller[indexFlag_play_fps] = play_fpsArr;//主叫方FlashSDK的播放帧率
											indexFlag_play_fps++;
				 							flashCallerMap.put(timeMap+"_play_fps",play_fps);
			 							}
			 							if(sample_fps!=undefined&&sample_fps!=null&&sample_fps!==""){
			 								//保留两位小数
			 								sample_fps = toFixed(sample_fps);
				 							var sample_fpsArr = new Array();sample_fpsArr[0] = time;sample_fpsArr[1] = sample_fps;
											sample_fps_caller[indexFlag_sample_fps] = sample_fpsArr;//主叫方FlashSDK的采样帧率
											indexFlag_sample_fps++;
				 							flashCallerMap.put(timeMap+"_sample_fps",sample_fps);
			 							}
			 							if(cpu!=undefined&&cpu!=null&&cpu!==""){
				 							var cpuArr = new Array();cpuArr[0] = time;cpuArr[1] = cpu;
				 							cpu_caller[indexFlag_cpu] = cpuArr;//主叫方FlashSDK的cpu
				 							indexFlag_cpu++;
				 							flashCallerMap.put(timeMap+"_cpu",cpu);
			 							}
			 							if(memory!=undefined&&memory!=null&&memory!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成MB显示
			 								memory = toFixed(memory/1024/1024);
				 							var memoryArr = new Array();memoryArr[0] = time;memoryArr[1] = memory;
											memory_caller[indexFlag_memory] = memoryArr;//主叫方FlashSDK的内存
											indexFlag_memory++;
				 							flashCallerMap.put(timeMap+"_memory",memory);
			 							}
			 							if(real_v_bps_l!=undefined&&real_v_bps_l!=null&&real_v_bps_l!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_v_bps_l = toFixed(real_v_bps_l/1024);
				 							var real_v_bps_lArr = new Array();real_v_bps_lArr[0] = time;real_v_bps_lArr[1] = real_v_bps_l;
											real_v_bps_l_caller[indexFlag_real_v_bps_l] = real_v_bps_lArr;//主叫方FlashSDK接收的视频码率
											indexFlag_real_v_bps_l++;
				 							flashCallerMap.put(timeMap+"_real_v_bps_l",real_v_bps_l);
			 							}
			 							if(real_v_bps_r!=undefined&&real_v_bps_r!=null&&real_v_bps_r!==""){
		 									//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_v_bps_r = toFixed(real_v_bps_r/1024);
				 							var real_v_bps_rArr = new Array();real_v_bps_rArr[0] = time;real_v_bps_rArr[1] = real_v_bps_r;
											real_v_bps_r_caller[indexFlag_real_v_bps_r] = real_v_bps_rArr;//主叫方FlashSDK发送的视频码率
											indexFlag_real_v_bps_r++;
				 							flashCallerMap.put(timeMap+"_real_v_bps_r",real_v_bps_r);
			 							}
			 							if(real_a_bps_l!=undefined&&real_a_bps_l!=null&&real_a_bps_l!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_a_bps_l = toFixed(real_a_bps_l/1024);
				 							var real_a_bps_lArr = new Array();real_a_bps_lArr[0] = time;real_a_bps_lArr[1] = real_a_bps_l;
											real_a_bps_l_caller[indexFlag_real_a_bps_l] = real_a_bps_lArr;//主叫方FlashSDK接收的音频码率
											indexFlag_real_a_bps_l++;
				 							flashCallerMap.put(timeMap+"_real_a_bps_l",real_a_bps_l);
			 							}
			 							if(real_a_bps_r!=undefined&&real_a_bps_r!=null&&real_a_bps_r!==""){
		 									//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_a_bps_r = toFixed(real_a_bps_r/1024);
				 							var real_a_bps_rArr = new Array();real_a_bps_rArr[0] = time;real_a_bps_rArr[1] = real_a_bps_r;
											real_a_bps_r_caller[indexFlag_real_a_bps_r] = real_a_bps_rArr;//主叫方FlashSDK发送的音频码率
											indexFlag_real_a_bps_r++;
				 							flashCallerMap.put(timeMap+"_real_a_bps_r",real_a_bps_r);
			 							}
			 							if(net_delay!=undefined&&net_delay!=null&&net_delay!==""){
				 							var net_delayArr = new Array();net_delayArr[0] = time;net_delayArr[1] = net_delay;
											net_delay_caller[indexFlag_net_delay] = net_delayArr;//主叫方FlashSDK的网络延时
											indexFlag_net_delay++;
				 							flashCallerMap.put(timeMap+"_net_delay",net_delay);
			 							}
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序
 							play_fps_caller = ascOrder(play_fps_caller);
							sample_fps_caller = ascOrder(sample_fps_caller);
							cpu_caller = ascOrder(cpu_caller);
							memory_caller = ascOrder(memory_caller);
							real_v_bps_l_caller = ascOrder(real_v_bps_l_caller);
							real_v_bps_r_caller = ascOrder(real_v_bps_r_caller);
							real_a_bps_l_caller = ascOrder(real_a_bps_l_caller);
							real_a_bps_r_caller = ascOrder(real_a_bps_r_caller);
							net_delay_caller = ascOrder(net_delay_caller);
 						}
 						
 						//RtmpServer每10秒汇报一次的数据
 						var g_trans_quality = flashAdjust.g_trans_quality;
 						if(g_trans_quality!=undefined&&g_trans_quality!=null&&g_trans_quality!==""&&g_trans_quality instanceof Array){
 							var indexFlag_v_bps = 0 ;
 							var indexFlag_a_bps = 0 ;
 							$.each(g_trans_quality,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var g_trans_quality_arr = new Array();
		 							var g_trans_quality_map = new Map();
		 							g_trans_quality_arr = val.split(" ");
		 							if(g_trans_quality_arr!=undefined&&g_trans_quality_arr!=null&&g_trans_quality_arr!==""&&g_trans_quality_arr instanceof Array){
		 								$.each(g_trans_quality_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											g_trans_quality_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(g_trans_quality_map!=undefined&&g_trans_quality_map!=null&&g_trans_quality_map!==""){
		 								v_bps = g_trans_quality_map.get("v_bps");//接收的视频码率
			 							a_bps = g_trans_quality_map.get("a_bps");//接收的音频码率
			 							time = g_trans_quality_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
										//将数据存入数组和map
			 							if(v_bps!=undefined&&v_bps!=null&&v_bps!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								v_bps = toFixed(v_bps/1024);
				 							var v_bpsArr = new Array();v_bpsArr[0] = time;v_bpsArr[1] = v_bps;
											v_bps_caller[indexFlag_v_bps] = v_bpsArr;//接收的视频码率
											indexFlag_v_bps++;
				 							flashCallerMap.put(timeMap+"_v_bps",v_bps);
			 							}
			 							if(a_bps!=undefined&&a_bps!=null&&a_bps!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								a_bps = toFixed(a_bps/1024);
				 							var a_bpsArr = new Array();a_bpsArr[0] = time;a_bpsArr[1] = a_bps;
											a_bps_caller[indexFlag_a_bps] = a_bpsArr;//接收的音频码率
											indexFlag_a_bps++;
				 							flashCallerMap.put(timeMap+"_a_bps",a_bps);
			 							}
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序
 							v_bps_caller = ascOrder(v_bps_caller);
							a_bps_caller = ascOrder(a_bps_caller);
 						}
 						
 						//RtmpServer汇报的丢包事件
 						var g_trans_overflow = flashAdjust.g_trans_overflow;
 						if(g_trans_overflow!=undefined&&g_trans_overflow!=null&&g_trans_overflow!==""&&g_trans_overflow instanceof Array){
 							var indexFlag_lost = 0 ;
 							$.each(g_trans_overflow,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var g_trans_overflow_arr = new Array();
		 							var g_trans_overflow_map = new Map();
		 							g_trans_overflow_arr = val.split(" ");
		 							if(g_trans_overflow_arr!=undefined&&g_trans_overflow_arr!=null&&g_trans_overflow_arr!==""&&g_trans_overflow_arr instanceof Array){
		 								$.each(g_trans_overflow_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											g_trans_overflow_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(g_trans_overflow_map!=undefined&&g_trans_overflow_map!=null&&g_trans_overflow_map!==""){
		 								v_lost_num = g_trans_overflow_map.get("v_lost_num");//视频丢包数量
			 							a_lost_num = g_trans_overflow_map.get("a_lost_num");//音频丢包数量
		 								v_lost_time = g_trans_overflow_map.get("v_lost_time");//视频丢包时间
			 							a_lost_time = g_trans_overflow_map.get("a_lost_time");//音频丢包时间
			 							time = g_trans_overflow_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
			 							if(v_lost_num==undefined||v_lost_num==null||v_lost_num===""){v_lost_num = "--";}
			 							if(a_lost_num==undefined||a_lost_num==null||a_lost_num===""){a_lost_num = "--";}
			 							if(v_lost_time==undefined||v_lost_time==null||v_lost_time===""){v_lost_time = "--";}
			 							if(a_lost_time==undefined||a_lost_time==null||a_lost_time===""){a_lost_time = "--";}
			 							
			 							var flash_lost_Arr = new Array();flash_lost_Arr[0] = time;flash_lost_Arr[1] = 100;//在图上显示的位置
			 							
			 							//将数组存放入数组
										flash_lost_caller[indexFlag_lost] = flash_lost_Arr;//丢包数组
										indexFlag_lost++;
										
										var html = "视频丢包数量："+v_lost_num+"<br/>视频丢包时间："+v_lost_time+"<br/>音频丢包数量："+a_lost_num+"<br/>音频丢包时间："+a_lost_time;
										
			 							//将数据存放入Map
			 							flashCallerMap.put(timeMap+"_flash_lost",html);
		 							}
		 							
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							flash_lost_caller = ascOrder(flash_lost_caller);
 						}
 						
 						//FlashSDK汇报的媒体协商事件，即调节点
 						var f_adjust_result = flashAdjust.f_adjust_result;
 						if(f_adjust_result!=undefined&&f_adjust_result!=null&&f_adjust_result!==""&&f_adjust_result instanceof Array){
 							var indexFlag_adjust = 0 ;
 							$.each(f_adjust_result,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var f_adjust_result_arr = new Array();
		 							var f_adjust_result_map = new Map();
		 							f_adjust_result_arr = val.split(" ");
		 							if(f_adjust_result_arr!=undefined&&f_adjust_result_arr!=null&&f_adjust_result_arr!==""&&f_adjust_result_arr instanceof Array){
		 								$.each(f_adjust_result_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											f_adjust_result_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(f_adjust_result_map!=undefined&&f_adjust_result_map!=null&&f_adjust_result_map!==""){
		 								v_bps = f_adjust_result_map.get("v_bps");//视频码率
			 							v_resolution = f_adjust_result_map.get("v_resolution");//视频分辨率
		 								v_fps = f_adjust_result_map.get("v_fps");//视频帧率
			 							time = f_adjust_result_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
			 							if(v_bps==undefined||v_bps==null||v_bps===""){v_bps = "--";}
			 							if(v_resolution==undefined||v_resolution==null||v_resolution===""){v_resolution = "--";}
			 							if(v_fps==undefined||v_fps==null||v_fps===""){v_fps = "--";}
			 							
			 							var flash_adjust_Arr = new Array();flash_adjust_Arr[0] = time;flash_adjust_Arr[1] = 100;//在图上显示的位置
			 							
			 							//将数组存放入数组
										flash_adjust_caller[indexFlag_adjust] = flash_adjust_Arr;//丢包数组
										indexFlag_adjust++;
										
										var html = "视频码率："+v_bps+"<br/>视频分辨率："+v_resolution+"<br/>视频帧率："+v_fps;
										
			 							//将数据存放入Map
			 							flashCallerMap.put(timeMap+"_flash_adjust",html);
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							flash_adjust_caller = ascOrder(flash_adjust_caller);
 						}
 					}
 				}
 			}
 			
 			//被叫端信息
 			var called = data.called;
 			if(called!=undefined&&called!=null&&called!==""){
 				var call = called.call;
 				if(call!=undefined&&call!=null&&call!==""){
 					var flashAdjust = call.flashAdjust;
 					if(flashAdjust!=undefined&&flashAdjust!=null&&flashAdjust!==""){
 						//FlashSDK每10秒汇报一次的信息
 						var f_trans_quality = flashAdjust.f_trans_quality;
 						if(f_trans_quality!=undefined&&f_trans_quality!=null&&f_trans_quality!==""&&f_trans_quality instanceof Array){
 							var indexFlag_play_fps = 0 ;
 							var indexFlag_sample_fps = 0 ;
 							var indexFlag_cpu = 0 ;
 							var indexFlag_memory = 0 ;
 							var indexFlag_real_v_bps_l = 0 ;
 							var indexFlag_real_v_bps_r = 0 ;
 							var indexFlag_real_a_bps_l = 0 ;
 							var indexFlag_real_a_bps_r = 0 ;
 							var indexFlag_net_delay = 0 ;
 							$.each(f_trans_quality,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var f_trans_quality_arr = new Array();
		 							var f_trans_quality_map = new Map();
		 							f_trans_quality_arr = val.split(" ");
		 							if(f_trans_quality_arr!=undefined&&f_trans_quality_arr!=null&&f_trans_quality_arr!==""&&f_trans_quality_arr instanceof Array){
		 								$.each(f_trans_quality_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											f_trans_quality_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(f_trans_quality_map!=undefined&&f_trans_quality_map!=null&&f_trans_quality_map!==""){
		 								play_fps = f_trans_quality_map.get("play_fps");//播放帧率
			 							sample_fps = f_trans_quality_map.get("sample_fps");//采样帧率
			 							cpu = f_trans_quality_map.get("cpu");//CPU
			 							memory = f_trans_quality_map.get("memory"); //内存
			 							real_v_bps_l = f_trans_quality_map.get("real_v_bps_l"); //接收的视频码率
			 							real_v_bps_r = f_trans_quality_map.get("real_v_bps_r"); //发送的视频码率
			 							real_a_bps_l = f_trans_quality_map.get("real_a_bps_l"); //接收的音频码率
			 							real_a_bps_r = f_trans_quality_map.get("real_a_bps_r"); //发送的音频码率
			 							net_delay = f_trans_quality_map.get("net_delay"); //网络延时
			 							time = f_trans_quality_map.get("time");//时间
		 							}
		 							
									if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
		 							
			 							//将数据存入数组和map
			 							if(play_fps!=undefined&&play_fps!=null&&play_fps!==""){
			 								//保留两位小数
			 								play_fps = toFixed(play_fps);
				 							var play_fpsArr = new Array();play_fpsArr[0] = time;play_fpsArr[1] = play_fps;
											play_fps_called[indexFlag_play_fps] = play_fpsArr;//被叫方FlashSDK的播放帧率
											indexFlag_play_fps++;
											
				 							flashCalledMap.put(time+"_play_fps",play_fps);
			 							}
			 							if(sample_fps!=undefined||sample_fps!=null||sample_fps!==""){
			 								//保留两位小数
			 								sample_fps = toFixed(sample_fps);
				 							var sample_fpsArr = new Array();sample_fpsArr[0] = time;sample_fpsArr[1] = sample_fps;
											sample_fps_called[indexFlag_sample_fps] = sample_fpsArr;//被叫方FlashSDK的采样帧率
											indexFlag_sample_fps++;
				 							flashCalledMap.put(timeMap+"_sample_fps",sample_fps);
			 							}
			 							if(cpu!=undefined&&cpu!=null&&cpu!==""){
				 							var cpuArr = new Array();cpuArr[0] = time;cpuArr[1] = cpu;
				 							cpu_called[indexFlag_cpu] = cpuArr;//被叫方FlashSDK的cpu
				 							indexFlag_cpu++;
				 							flashCalledMap.put(timeMap+"_cpu",cpu);
			 							}
			 							if(memory!=undefined&&memory!=null&&memory!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成MB显示
			 								memory = toFixed(memory/1024/1024);
				 							var memoryArr = new Array();memoryArr[0] = time;memoryArr[1] = memory;
											memory_called[indexFlag_memory] = memoryArr;//被叫方FlashSDK的内存
											indexFlag_memory++;
				 							flashCalledMap.put(timeMap+"_memory",memory);
			 							}
			 							if(real_v_bps_l!=undefined&&real_v_bps_l!=null&&real_v_bps_l!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_v_bps_l = toFixed(real_v_bps_l/1024);
				 							var real_v_bps_lArr = new Array();real_v_bps_lArr[0] = time;real_v_bps_lArr[1] = real_v_bps_l;
											real_v_bps_l_called[indexFlag_real_v_bps_l] = real_v_bps_lArr;//被叫方FlashSDK接收的视频码率
											indexFlag_real_v_bps_l++;
				 							flashCalledMap.put(timeMap+"_real_v_bps_l",real_v_bps_l);
			 							}
			 							if(real_v_bps_r!=undefined&&real_v_bps_r!=null&&real_v_bps_r!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_v_bps_r = toFixed(real_v_bps_r/1024);
				 							var real_v_bps_rArr = new Array();real_v_bps_rArr[0] = time;real_v_bps_rArr[1] = real_v_bps_r;
											real_v_bps_r_called[indexFlag_real_v_bps_r] = real_v_bps_rArr;//被叫方FlashSDK发送的视频码率
											indexFlag_real_v_bps_r++;
				 							flashCalledMap.put(timeMap+"_real_v_bps_r",real_v_bps_r);
			 							}
			 							if(real_a_bps_l!=undefined&&real_a_bps_l!=null&&real_a_bps_l!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_a_bps_l = toFixed(real_a_bps_l/1024);
				 							var real_a_bps_lArr = new Array();real_a_bps_lArr[0] = time;real_a_bps_lArr[1] = real_a_bps_l;
											real_a_bps_l_called[indexFlag_real_a_bps_l] = real_a_bps_lArr;//被叫方FlashSDK接收的音频码率
											indexFlag_real_a_bps_l++;
				 							flashCalledMap.put(timeMap+"_real_a_bps_l",real_a_bps_l);
			 							}
			 							if(real_a_bps_r!=undefined&&real_a_bps_r!=null&&real_a_bps_r!==""){
			 								//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								real_a_bps_r = toFixed(real_a_bps_r/1024);
				 							var real_a_bps_rArr = new Array();real_a_bps_rArr[0] = time;real_a_bps_rArr[1] = real_a_bps_r;
											real_a_bps_r_called[indexFlag_real_a_bps_r] = real_a_bps_rArr;//被叫方FlashSDK发送的音频码率
											indexFlag_real_a_bps_r++;
				 							flashCalledMap.put(timeMap+"_real_a_bps_r",real_a_bps_r);
			 							}
			 							if(net_delay!=undefined&&net_delay!=null&&net_delay!==""){
				 							var net_delayArr = new Array();net_delayArr[0] = time;net_delayArr[1] = net_delay;
											net_delay_called[indexFlag_net_delay] = net_delayArr;//被叫方FlashSDK的网络延时
											indexFlag_net_delay++;
				 							flashCalledMap.put(timeMap+"_net_delay",net_delay);
			 							}
									}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							play_fps_called = ascOrder(play_fps_called);
							sample_fps_called = ascOrder(sample_fps_called);
							cpu_called = ascOrder(cpu_called);
							memory_called = ascOrder(memory_called);
							real_v_bps_l_called = ascOrder(real_v_bps_l_called);
							real_v_bps_r_called = ascOrder(real_v_bps_r_called);
							real_a_bps_l_called = ascOrder(real_a_bps_l_called);
							real_a_bps_r_called = ascOrder(real_a_bps_r_called);
							net_delay_called = ascOrder(net_delay_called);
 						}
 						
						//RtmpServer每10秒汇报一次的数据
 						var g_trans_quality = flashAdjust.g_trans_quality;
 						if(g_trans_quality!=undefined&&g_trans_quality!=null&&g_trans_quality!==""&&g_trans_quality instanceof Array){
 							var indexFlag_v_bps = 0 ;
 							var indexFlag_a_bps = 0 ;
 							$.each(g_trans_quality,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var g_trans_quality_arr = new Array();
		 							var g_trans_quality_map = new Map();
		 							g_trans_quality_arr = val.split(" ");
		 							if(g_trans_quality_arr!=undefined&&g_trans_quality_arr!=null&&g_trans_quality_arr!==""&&g_trans_quality_arr instanceof Array){
		 								$.each(g_trans_quality_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											g_trans_quality_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(g_trans_quality_map!=undefined&&g_trans_quality_map!=null&&g_trans_quality_map!==""){
		 								v_bps = g_trans_quality_map.get("v_bps");//接收的视频码率
			 							a_bps = g_trans_quality_map.get("a_bps");//接收的音频码率
			 							time = g_trans_quality_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
		 								//将数据存入数组和map
		 								if(v_bps!=undefined&&v_bps!=null&&v_bps!==""){
		 									//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								v_bps = toFixed(v_bps/1024);
				 							var v_bpsArr = new Array();v_bpsArr[0] = time;v_bpsArr[1] = v_bps;
											v_bps_called[indexFlag_v_bps] = v_bpsArr;//接收的视频码率
											indexFlag_v_bps++;
				 							flashCalledMap.put(timeMap+"_v_bps",v_bps);
		 								}
		 								if(a_bps!=undefined&&a_bps!=null&&a_bps!==""){
		 									//汇报的原始值是Byte，因为太大，影响图形曲线显示，要改成KB显示
			 								a_bps = toFixed(a_bps/1024);
				 							var a_bpsArr = new Array();a_bpsArr[0] = time;a_bpsArr[1] = a_bps;
											a_bps_called[indexFlag_a_bps] = a_bpsArr;//接收的音频码率
											indexFlag_a_bps++;
				 							flashCalledMap.put(timeMap+"_a_bps",a_bps);
		 								}
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							v_bps_called = ascOrder(v_bps_called);
							a_bps_called = ascOrder(a_bps_called);
 						}
 						
						//RtmpServer汇报的丢包事件
 						var g_trans_overflow = flashAdjust.g_trans_overflow;
 						if(g_trans_overflow!=undefined&&g_trans_overflow!=null&&g_trans_overflow!==""&&g_trans_overflow instanceof Array){
 							var indexFlag_lost = 0 ;
 							$.each(g_trans_overflow,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var g_trans_overflow_arr = new Array();
		 							var g_trans_overflow_map = new Map();
		 							g_trans_overflow_arr = val.split(" ");
		 							if(g_trans_overflow_arr!=undefined&&g_trans_overflow_arr!=null&&g_trans_overflow_arr!==""&&g_trans_overflow_arr instanceof Array){
		 								$.each(g_trans_overflow_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											g_trans_overflow_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(g_trans_overflow_map!=undefined&&g_trans_overflow_map!=null&&g_trans_overflow_map!==""){
		 								v_lost_num = g_trans_overflow_map.get("v_lost_num");//视频丢包数量
			 							a_lost_num = g_trans_overflow_map.get("a_lost_num");//音频丢包数量
		 								v_lost_time = g_trans_overflow_map.get("v_lost_time");//视频丢包时间
			 							a_lost_time = g_trans_overflow_map.get("a_lost_time");//音频丢包时间
			 							time = g_trans_overflow_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
			 							if(v_lost_num==undefined||v_lost_num==null||v_lost_num===""){v_lost_num = "--";}
			 							if(a_lost_num==undefined||a_lost_num==null||a_lost_num===""){a_lost_num = "--";}
			 							if(v_lost_time==undefined||v_lost_time==null||v_lost_time===""){v_lost_time = "--";}
			 							if(a_lost_time==undefined||a_lost_time==null||a_lost_time===""){a_lost_time = "--";}
			 							var flash_lost_Arr = new Array();flash_lost_Arr[0] = time;flash_lost_Arr[1] = 100;//在图上显示的位置
			 							
			 							//将数组存放入数组
										flash_lost_called[indexFlag_lost] = flash_lost_Arr;//丢包数组
										indexFlag_lost++;
		 							
										var html = "视频丢包数量："+v_lost_num+"<br/>视频丢包时间："+v_lost_time+"<br/>音频丢包数量："+a_lost_num+"<br/>音频丢包时间："+a_lost_time;
										
			 							//将数据存放入Map
			 							flashCalledMap.put(timeMap+"_flash_lost",html);
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							flash_lost_called = ascOrder(flash_lost_called);
 						}
 						
						//FlashSDK汇报的媒体协商事件，即调节点
 						var f_adjust_result = flashAdjust.f_adjust_result;
 						if(f_adjust_result!=undefined&&f_adjust_result!=null&&f_adjust_result!==""&&f_adjust_result instanceof Array){
 							var indexFlag_adjust = 0 ;
 							$.each(f_adjust_result,function(i,val){
 								if(val!=undefined&&val!=null&&val!==""){
		 							var f_adjust_result_arr = new Array();
		 							var f_adjust_result_map = new Map();
		 							g_trans_overflow_arr = val.split(" ");
		 							if(f_adjust_result_arr!=undefined&&f_adjust_result_arr!=null&&f_adjust_result_arr!==""&&f_adjust_result_arr instanceof Array){
		 								$.each(f_adjust_result_arr,function(j,va){
		 									if(va!=undefined&&va!=null&&va!==""){
		 										var vaArr = new Array();
		 										vaArr = va.split("=");
		 										if(vaArr!=undefined&&vaArr!=null&&vaArr!==""&&vaArr instanceof Array){
		 											f_adjust_result_map.put(vaArr[0],vaArr[1]);
		 										}
		 									}
		 								});
		 							}
		 							
		 							if(f_adjust_result_map!=undefined&&f_adjust_result_map!=null&&f_adjust_result_map!==""){
		 								v_bps = f_adjust_result_map.get("v_bps");//视频码率
			 							v_resolution = f_adjust_result_map.get("v_resolution");//视频分辨率
		 								v_fps = f_adjust_result_map.get("v_fps");//视频帧率
			 							time = f_adjust_result_map.get("time");//时间
		 							}
		 							
		 							if(time!=undefined&&time!=null&&time!==""){
										//time的格式为2015-05-13-17:13:50:430，所以要先去掉日时之间的－连结符，再转化为毫秒，此处的map所用，前面的数组不用，故前面不转化
										var timeMap = splitTime(formatTime(time)).getTime();//转化为毫秒
			 							if(v_bps==undefined||v_bps==null||v_bps===""){v_bps = "--";}
			 							if(v_resolution==undefined||v_resolution==null||v_resolution===""){v_resolution = "--";}
			 							if(v_fps==undefined||v_fps==null||v_fps===""){v_fps = "--";}
		 							
			 							var flash_adjust_Arr = new Array();flash_adjust_Arr[0] = time;flash_adjust_Arr[1] = 100;//在图上显示的位置
			 							
			 							//将数组存放入数组
										flash_adjust_called[indexFlag_adjust] = flash_adjust_Arr;//丢包数组
										indexFlag_adjust++;
										
										var html = "视频码率："+v_bps+"<br/>视频分辨率："+v_resolution+"<br/>视频帧率："+v_fps;
										
			 							//将数据存放入Map
			 							flashCalledMap.put(timeMap+"_flash_adjust",html);
		 							}
 								}
 							});
 							
 							//将数组里面的值按时间升序排序 TODO
 							flash_adjust_called = ascOrder(flash_adjust_called);
 						}
 					}
 				}
 			}
 		}
 	}
 	
 	/*
 	console.info("主-->被：主叫方FlashSDK");
 	console.info("cpu:"+cpu_caller);
 	console.info("内存:"+memory_caller);
 	console.info("发送的视频码率:"+real_v_bps_r_caller);
 	console.info("发送的音频码率:"+real_a_bps_r_caller);
 	console.info("调节点:"+flash_adjust_caller);
 	
 	console.info("主-->被：被叫方RtmpServer");
 	console.info("接收的视频码率:"+v_bps_called);
 	console.info("接收的音频码率:"+a_bps_called);
 	console.info("丢包事件："+flash_lost_called);
 	
 	console.info("主-->被：被叫方FlashSDK");
 	console.info("cpu:"+cpu_called);
 	console.info("内存:"+memory_called);
 	console.info("接收的视频码率:"+real_v_bps_l_called);
 	console.info("接收的音频码率:"+real_a_bps_l_called);
 	console.info("播放帧率:"+play_fps_called);
 	console.info("延时:"+net_delay_called);
 	
 	console.info("被-->主：被叫方FlashSDK");
 	console.info("cpu:"+cpu_called);
 	console.info("内存:"+memory_called);
 	console.info("发送的视频码率:"+real_v_bps_r_called);
 	console.info("发送的音频码率:"+real_a_bps_r_called);
 	console.info("调节点:"+flash_adjust_called);
 	
 	console.info("被-->主：主叫方RtmpServer");
 	console.info("接收的视频码率:"+v_bps_caller);
 	console.info("接收的音频码率:"+a_bps_caller);
 	console.info("丢包事件："+flash_lost_caller);
 	
 	console.info("被-->主：主叫方FlashSDK");
 	console.info("cpu:"+cpu_caller);
 	console.info("内存:"+memory_caller);
 	console.info("接收的视频码率:"+real_v_bps_l_caller);
 	console.info("接收的音频码率:"+real_a_bps_l_caller);
 	console.info("播放帧率:"+play_fps_caller);
 	console.info("延时:"+net_delay_caller);
 	*/
 	
 	if(cpu_caller!=undefined&&cpu_caller!=null&&cpu_caller!==""&&cpu_caller.length>0||
	 	memory_caller!=undefined&&memory_caller!=null&&memory_caller!==""&&memory_caller.length>0||
	 	real_v_bps_r_caller!=undefined&&real_v_bps_r_caller!=null&&real_v_bps_r_caller!==""&&real_v_bps_r_caller.length>0||
	 	real_a_bps_r_caller!=undefined&&real_a_bps_r_caller!=null&&real_a_bps_r_caller!==""&&real_a_bps_r_caller.length>0||
	 	flash_adjust_caller!=undefined&&flash_adjust_caller!=null&&flash_adjust_caller!==""&&flash_adjust_caller.length>0
 	){
 		//主-->被：主叫方FlashSDK
	 	flashView_zb01();
 	}
 	
 	if(v_bps_called!=undefined&&v_bps_called!=null&&v_bps_called!==""&&v_bps_called.length>0||
	 	a_bps_called!=undefined&&a_bps_called!=null&&a_bps_called!==""&&a_bps_called.length>0||
	 	flash_lost_called!=undefined&&flash_lost_called!=null&&flash_lost_called!==""&&flash_lost_called.length>0
 	){
 		//主-->被：被叫方RtmpServer
	 	flashView_zb02();
 	}
 	if(cpu_called!=undefined&&cpu_called!=null&&cpu_called!==""&&cpu_called.length>0||
	 	memory_called!=undefined&&memory_called!=null&&memory_called!==""&&memory_called.length>0||
	 	real_v_bps_l_called!=undefined&&real_v_bps_l_called!=null&&real_v_bps_l_called!==""&&real_v_bps_l_called.length>0||
	 	real_a_bps_l_called!=undefined&&real_a_bps_l_called!=null&&real_a_bps_l_called!==""&&real_a_bps_l_called.length>0||
	 	play_fps_called!=undefined&&play_fps_called!=null&&play_fps_called!==""&&play_fps_called.length>0||
	 	net_delay_called!=undefined&&net_delay_called!=null&&net_delay_called!==""&&net_delay_called.length>0
 	){
 		//主-->被：被叫方FlashSDK
	 	flashView_zb03();
 	}
 	
 	if(cpu_called!=undefined&&cpu_called!=null&&cpu_called!==""&&cpu_called.length>0||
	 	memory_called!=undefined&&memory_called!=null&&memory_called!==""&&memory_called.length>0||
	 	real_v_bps_r_called!=undefined&&real_v_bps_r_called!=null&&real_v_bps_r_called!==""&&real_v_bps_r_called.length>0||
	 	real_a_bps_r_called!=undefined&&real_a_bps_r_called!=null&&real_a_bps_r_called!==""&&real_a_bps_r_called.length>0||
	 	flash_adjust_called!=undefined&&flash_adjust_called!=null&&flash_adjust_called!==""&&flash_adjust_called.length>0
 	){
	 	//被-->主：被叫方FlashSDK
	 	flashView_bz01();
 	}
 	if(v_bps_caller!=undefined&&v_bps_caller!=null&&v_bps_caller!==""&&v_bps_caller.length>0||
	 	a_bps_caller!=undefined&&a_bps_caller!=null&&a_bps_caller!==""&&a_bps_caller.length>0||
	 	flash_lost_caller!=undefined&&flash_lost_caller!=null&&flash_lost_caller!==""&&flash_lost_caller.length>0
 	){
	 	//被-->主：主叫方RtmpServer
	 	flashView_bz02();
 	}
 	if(cpu_caller!=undefined&&cpu_caller!=null&&cpu_caller!==""&&cpu_caller.length>0||
	 	memory_caller!=undefined&&memory_caller!=null&&memory_caller!==""&&memory_caller.length>0||
	 	real_v_bps_l_caller!=undefined&&real_v_bps_l_caller!=null&&real_v_bps_l_caller!==""&&real_v_bps_l_caller.length>0||
	 	real_a_bps_l_caller!=undefined&&real_a_bps_l_caller!=null&&real_a_bps_l_caller!==""&&real_a_bps_l_caller.length>0||
	 	play_fps_caller!=undefined&&play_fps_caller!=null&&play_fps_caller!==""&&play_fps_caller.length>0||
	 	net_delay_caller!=undefined&&net_delay_caller!=null&&net_delay_caller!==""&&net_delay_caller.length>0
 	){
	 	//被-->主：主叫方FlashSDK
	 	flashView_bz03();
 	}
 }
 
/**
 * 将二维数组按时间升序排列，并将时间转化为UTC时间
 * @param {} oldArr
 */ 
function ascOrder(oldArr){
	var newArr = new Array();
	if(oldArr!=undefined&&oldArr!=null&&oldArr!==""){
		var arrTemp = new Array();
		var mapTemp = new Map();
		$.each(oldArr,function(i,val){
			if(val!=undefined&&val!=null&&val!==""){
				//将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
				var time = formatTime(val[0]);
				var value = val[1];
				if(time!=undefined&&time!=null&&time!==""&&value!=undefined&&value!=null&&value!==""){
					arrTemp[i] = time;
					mapTemp.put(time,value);
				}
			}
		});
		
		//将时间升序排列
		bom(arrTemp);
		$.each(arrTemp,function(i,val){
			var valArr = new Array();
			valArr[0] = dateToUTC(val);//将时间转化为UTC时间
			valArr[1] = stringToNumber(mapTemp.get(val));
			
			newArr[i] = valArr;
		});
	}
	
	return newArr;
} 

