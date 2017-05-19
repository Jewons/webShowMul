/*
 * 对带宽、等级、丢包率、延时的数据进行处理
 * 
 */
//说明：
//数据X轴时间要以丢包率和延时的为基准，它们是每隔20s汇报一次，带宽和等级汇报时间不定，汇报的次数很少
//对于带宽和等级，在两个自适应点之间所有的点的Y轴值相同，因为在两个自适应点之间的整个时间段内，所用的带宽和等级都是前者自适应调节点的。

//视图展示所需的数据
var dataArr01_bz = new Array();//端到端带宽
var dataArr02_bz = new Array();//冗余带宽
var dataArr03_bz = new Array();//有效上行带宽
var dataArr04_bz = new Array();//FEC后音频带宽
var dataArr05_bz = new Array();//FEC后视频带宽
var dataArr06_bz = new Array();//自适应调节点

var dataArr07_bz = new Array();//通话等级
var dataArr08_bz = new Array();//视频fec等级
var dataArr09_bz = new Array();//音频fec等级

var dataArr10_bz = new Array();//视频原始丢包率
var dataArr11_bz = new Array();//视频fec纠错后丢包率
var dataArr12_bz = new Array();//音频原始丢包率
var dataArr13_bz = new Array();//音频fec纠错后丢包率

var dataArr14_bz = new Array();//延时

//highstock显示标签所用
var bandMapHighstock_bz = new Map();

//被叫端X轴时间
var bandAdaptiveTimeArr_bz = new Array();
/**
 * 带宽
 */
var etoe_bwYArr_bz = new Array();//端到端带宽Y轴
var redund_up_bwYArr_bz = new Array();//冗余带宽Y轴
var valid_up_bwYArr_bz = new Array();//有效上行带宽Y轴
var audio_bw_fYArr_bz = new Array();//fec后音频带宽Y轴
var video_bw_fYArr_bz = new Array();//fec后视频带宽Y轴
var adaptivePoint_bz = new Array;//自适应调用节

var BandwidthMap_bz = new Map();//存放自适应调节点信息的Map

/**
 * 等级
 */
var trans_level_idArr_bz = new Array();//通话等级Y轴
trans_level_idArr_bz[0] = 0;
var video_redundent_levArr_bz = new Array();//视频fec等级Y轴
video_redundent_levArr_bz[0] = 0;
var audio_redundent_levArr_bz = new Array();//音频fec等级Y轴
audio_redundent_levArr_bz[0] = 0;

/**
 * 丢包率
 */
var audio_lose_bYArr_bz = new Array();//音频原始丢包率Y轴
audio_lose_bYArr_bz[0] = 0;
var audio_lose_fYArr_bz = new Array();//音频fec纠错后丢包率Y轴
audio_lose_fYArr_bz[0] = 0;
var video_lose_bYArr_bz = new Array();//视频原始丢包率Y轴
video_lose_bYArr_bz[0] = 0;
var video_lose_fYArr_bz = new Array();//视频fec纠错后丢包率Y轴
video_lose_fYArr_bz[0] = 0;
var audio_videoMap_bz = new Map();//音视频解码效果

/**
 * 延时
 */
var delayYArr_bz = new Array();//延时Y轴
var delayMap_bz = new Map();//存放延时的Map
delayYArr_bz[0] = 0;//第一个点值为0，因为此时还没有延时汇报

/**
 * “带宽自适应”被叫端
 */
function bandWithAdaptive_bz(datas){
	
	var paramExt;//包下以下七种参数
	
	var adjust_result_adjust_mode_0;//呼叫前静态协商结果参数上报
	
	var adjust_result_adjust_mode_1;//动态协商结果上报
	
	var trans_quality;//端到端质量上报
	
	var ext_dev_info;//双方设备扩展信息上报
	
	/**
	 * 带宽
	 */
	var adjust_count;//调节次数 
	var fec_adjust_count;//FEC调节次数 
	var last_loss_rate;//上次丢包率 
	
	/**
	 * 端到端质量上报
	 */
	var  avg_rtt_time;//延时
	var audio_lose_b;//音频原始丢包率
	var audio_lose_f;//音频fec纠错后丢包率
	var video_lose_b;//视频原始丢包率
	var video_lose_f;//视频fec纠错后丢包率
	var audio_res_show;//音频效果展示 
	var video_res_show;//视频效果展示
	
	
	/**
	 * 呼叫前静态协商结果参数上报
	 */
	var etoe_bw;//端到端带宽
	var redund_up_bw;//冗余带宽
	var valid_up_bw;//有效上行带宽
	var audio_bw_f;//fec后音频带宽
	var video_bw_f;//fec后视频带宽
	var trans_level_id;//视、音频等级
	var video_redundent_lev;//视频fec等级
	var audio_redundent_lev;//音频fec等级
	
	//用来对时间进行排序后，确保Y轴与X轴的数据保持一致
	var tempMap = new Map();
	
	//存放端到端质量上报的每条记录的时间，作为X轴[1,length-1]的数据，第一个时间点采用静态协商的时间
	var bandAdaptiveTimeArrTemp = new Array();
	
	//存放动态协商上报的每条记录的时间，这个记录不多，很少
	var adjust_result_adjust_mode_1Time = new Array();
	
	var etoe_bwTemp = new Array();//动态协商中端到端带宽的值
	var redund_up_bwTemp = new Array();//动态协商中冗余带宽的值
	var valid_up_bwTemp = new Array();//动态协商中有效上行带宽的值
	var audio_bw_fTemp = new Array();//动态协商中fec后音频带宽的值
	var video_bw_fTemp = new Array();//动态协商中fec后视频带宽的值
	var trans_level_idTemp = new Array();//动态协商中视、音频等级的值
	var video_redundent_levTemp = new Array();//动态协商中视频fec等级的值
	var audio_redundent_levTemp = new Array();//动态协商中音频fec等级的值
	
	
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						
						//获取X轴的基准时间数组
						trans_quality = paramExt.trans_quality;//端到端质量上报
									
						if(trans_quality!=undefined&&trans_quality!=null&&trans_quality!==""){
							$.each(trans_quality,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var trans_qualityArr = val.split(' ');
									var trans_qualityMap = new Map();
									if(trans_qualityArr!=undefined&&trans_qualityArr!=null&&trans_qualityArr!==""&&(trans_qualityArr instanceof Array)){
										$.each(trans_qualityArr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												trans_qualityMap.put(va.split('=')[0],va.split('=')[1]);
											}
										});
									}
									
									avg_rtt_time = trans_qualityMap.get('avg_rtt_time');//延时
									audio_lose_b = trans_qualityMap.get('audio_lose_b');//音频原始丢包率
									audio_lose_f = trans_qualityMap.get('audio_lose_f');//音频fec纠错后丢包率
									video_lose_b = trans_qualityMap.get('video_lose_b');//视频原始丢包率
									video_lose_f = trans_qualityMap.get('video_lose_f');//视频fec纠错后丢包率
									audio_res_show = trans_qualityMap.get('audio_res_show');//音频效果展示 
									video_res_show = trans_qualityMap.get('video_res_show');//视频效果展示
									var time = trans_qualityMap.get('time');//时间
									
									if(avg_rtt_time==undefined||avg_rtt_time==null||avg_rtt_time===""){
										avg_rtt_time = "--";
									}
									
									//将音频原始丢包率、音频fec纠错后丢包率、视频原始丢包率、视频fec纠错后丢包率、音频效果、视频效果转化为百分比，并保留两位小数
									if(audio_lose_b!=undefined&&audio_lose_b!=null&&audio_lose_b!==""){
										audio_lose_b = toFixed(parseFloat(audio_lose_b)*100);
									}
									if(audio_lose_f!=undefined&&audio_lose_f!=null&&audio_lose_f!==""){
										audio_lose_f = toFixed(parseFloat(audio_lose_f)*100);
									}
									if(video_lose_b!=undefined&&video_lose_b!=null&&video_lose_b!==""){
										video_lose_b = toFixed(parseFloat(video_lose_b)*100);
									}
									if(video_lose_f!=undefined&&video_lose_f!=null&&video_lose_f!==""){
										video_lose_f = toFixed(parseFloat(video_lose_f)*100);
									}
									if(audio_res_show!=undefined&&audio_res_show!=null&&audio_res_show!==""){
										audio_res_show = toFixed(parseFloat(audio_res_show)*100);
									}
									if(video_res_show!=undefined&&video_res_show!=null&&video_res_show!==""){
										video_res_show = toFixed(parseFloat(video_res_show)*100);
									}
									
									if(audio_lose_b==undefined||audio_lose_b==null||audio_lose_b===""){
										audio_lose_b = "--";
									}
									if(audio_lose_f==undefined||audio_lose_f==null||audio_lose_f===""){
										audio_lose_f = "--";
									}
									if(video_lose_b==undefined||video_lose_b==null||video_lose_b===""){
										video_lose_b = "--";
									}
									if(video_lose_f==undefined||video_lose_f==null||video_lose_f===""){
										video_lose_f = "--";
									}
									if(audio_res_show==undefined||audio_res_show==null||audio_res_show===""){
										audio_res_show = "--";
									}
									if(video_res_show==undefined||video_res_show==null||video_res_show===""){
										video_res_show = "--";
									}
									
									if(time!=undefined&&time!=null&&time!==""){
										time = formatTime(time);
									}
									
									if(time==undefined||time==null||time===""){
										time = "--";
									}
									
									if(time!="--"){
										//为X轴的临时变量赋值
										bandAdaptiveTimeArrTemp[i] = time;
									}
									
									//将延时的时间与Y值设置关联
									tempMap.put(time+"_avg_rtt_time",avg_rtt_time);
									//将音频原始丢包率的时间与Y值设置关联
									tempMap.put(time+"_audio_lose_b",audio_lose_b);
									//将音频fec纠错后丢包率的时间与Y值设置关联
									tempMap.put(time+"_audio_lose_f",audio_lose_f);
									//将视频原始丢包率的时间与Y值设置关联
									tempMap.put(time+"_video_lose_b",video_lose_b);
									//将视频fec纠错后丢包率的时间与Y值设置关联
									tempMap.put(time+"_video_lose_f",video_lose_f);
									audio_videoMap_bz.put(time,"音频解码率 : "+audio_res_show+"，视频解码率 : "+video_res_show);
									delayMap_bz.put(time,"延时 : "+avg_rtt_time);
								}
							});
						}
						
						
						//静态协商，第一个点采用静态协商的数据						
						adjust_result_adjust_mode_0 = paramExt.adjust_result_adjust_mode_0;
						if(adjust_result_adjust_mode_0!=undefined&&adjust_result_adjust_mode_0!=null&&adjust_result_adjust_mode_0!==""){
						
							var adjust_result_0Arr = adjust_result_adjust_mode_0.split(' ');
							var adjust_result_0Map = new Map();
							if(adjust_result_0Arr!=undefined&&adjust_result_0Arr!=null&&adjust_result_0Arr!==""){
								$.each(adjust_result_0Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										adjust_result_0Map.put(val.split('=')[0],val.split('=')[1]);
									}
								});
							}
							
							etoe_bw = adjust_result_0Map.get('etoe_bw');//端到端带宽
							redund_up_bw = adjust_result_0Map.get('redund_up_bw');//冗余带宽
							valid_up_bw = adjust_result_0Map.get('valid_up_bw');//有效上行带宽
							audio_bw_f = adjust_result_0Map.get('audio_bw_f');//fec后音频带宽
							video_bw_f = adjust_result_0Map.get('video_bw_f');//fec后视频带宽
							
							trans_level_id = adjust_result_0Map.get('trans_level_id');//视、音频等级
							video_redundent_lev = adjust_result_0Map.get('video_redundent_lev');//视频fec等级
							audio_redundent_lev = adjust_result_0Map.get('audio_redundent_lev');//音频fec等级
							
							
							if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
								etoe_bw = "--";
							}
							if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
								redund_up_bw = "--";
							}
							if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
								valid_up_bw = "--";
							}
							if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
								audio_bw_f = "--";
							}
							if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
								video_bw_f = "--";
							}
							if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
								trans_level_id = "--";
							}
							if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
								video_redundent_lev = "--";
							}
							if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
								audio_redundent_lev = "--";
							}
							
							
							/**
							 * 带宽，第一个值采用静态协商的数据
							 */
							etoe_bwYArr_bz[0] = etoe_bw;//端到端带宽Y轴
							redund_up_bwYArr_bz[0] = redund_up_bw;//冗余带宽Y轴
							valid_up_bwYArr_bz[0] = valid_up_bw;//有效上行带宽Y轴
							audio_bw_fYArr_bz[0] = audio_bw_f;//fec后音频带宽Y轴
							video_bw_fYArr_bz[0] = video_bw_f;//fec后视频带宽Y轴
							
							
							/**
							 * 等级，第一个值采用静态协商的数据
							 */
							trans_level_idArr_bz[0] = trans_level_id;//视、音频等级Y轴
							video_redundent_levArr_bz[0] = video_redundent_lev;//视频fec等级Y轴
							audio_redundent_levArr_bz[0] = audio_redundent_lev;//音频fec等级Y轴
							
							var time = adjust_result_0Map.get('time');//时间
							
							if(time!=undefined&&time!=null&&time!==""){
								time = formatTime(time);
							}
							
							if(time==undefined||time==null||time===""){
								time = "--";
							}
							//设置X轴第一个时间点的值
							bandAdaptiveTimeArr_bz[0] = time;
						}
						
						//升序排列临时变量数据
						bom(bandAdaptiveTimeArrTemp);
						
						//将临时变量的值赋值给X轴
						if(bandAdaptiveTimeArrTemp!=undefined&&bandAdaptiveTimeArrTemp!=null&&bandAdaptiveTimeArrTemp!==""){
							$.each(bandAdaptiveTimeArrTemp,function(i,val){
								//取得时间，依次存入数组，因为数组第一个值要用静态协商数据的，所以从下标1开始赋值
								if(val!=undefined&&val!=null&&val!==""){
									bandAdaptiveTimeArr_bz[i+1]= val;
								}
							});
						}
						
						//为丢包率和延时的Y轴赋值
						if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""){
							$.each(bandAdaptiveTimeArr_bz,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									if(i!==0){//排除第一个点，第一个点直接设置为0
										
										/**
										 * 丢包率
										 */
										//为音频原始丢包率Y轴赋值
										var audio_lose_bY = tempMap.get(val+"_audio_lose_b");
										if(audio_lose_bY!=undefined&&audio_lose_bY!=null&&audio_lose_bY!==""){
											audio_lose_bYArr_bz[i] = audio_lose_bY;
											//audio_lose_bYArr_bz[i] = toFixed(parseFloat(audio_lose_bY)*100);
										}
										
										//为音频fec纠错后丢包率Y轴赋值
										var audio_lose_fY = tempMap.get(val+"_audio_lose_f");
										if(audio_lose_fY!=undefined&&audio_lose_fY!=null&&audio_lose_fY!==""){
											audio_lose_fYArr_bz[i] = audio_lose_fY;
											//audio_lose_fYArr_bz[i] = toFixed(parseFloat(audio_lose_fY)*100);
										}
										
										//为视频原始丢包率Y轴赋值
										var video_lose_bY = tempMap.get(val+"_video_lose_b");
										if(video_lose_bY!=undefined&&video_lose_bY!=null&&video_lose_bY!==""){
											video_lose_bYArr_bz[i] = video_lose_bY;
											//video_lose_bYArr_bz[i] = toFixed(parseFloat(video_lose_bY)*100);
										}
										
										//为视频fec纠错后丢包率Y轴赋值
										var video_lose_fY = tempMap.get(val+"_video_lose_f");
										if(video_lose_fY!=undefined&&video_lose_fY!=null&&video_lose_fY!==""){
											video_lose_fYArr_bz[i] = video_lose_fY;
											//video_lose_fYArr_bz[i] = toFixed(parseFloat(video_lose_fY)*100);
										}
										
										/**
										 * 延时
										 */
										//为延时的Y轴赋值
										var delayY = tempMap.get(val+"_avg_rtt_time");
										if(delayY!=undefined&&delayY!=null&&delayY!==""){
											delayYArr_bz[i] = delayY;
										}
										
									}
								}
							});
						}
						
						
						//动态协商，除了第一个点，带宽和等级采用动态协商的值
						adjust_result_adjust_mode_1 = paramExt.adjust_result_adjust_mode_1;
						if(adjust_result_adjust_mode_1!=undefined&&adjust_result_adjust_mode_1!=null&&adjust_result_adjust_mode_1!==""){
							
							/**
							 * 去除掉重复汇报的数据
							 */							
							var adjust_1_Map = new Map();//key:时间，val:每个记录
							var adjust_1_adjust_count_Map = new Map();//key:时间，val:第几次调节
							var adjust_1_Arr = new Array();//存放每条记录的时间
							$.each(adjust_result_adjust_mode_1,function(i,val){
								if(val!=undefined&&val!=null&&val!==""){
									var adjust_1Arr = val.split(' ');
									var adjust_1Map = new Map();
									if(adjust_1Arr!=undefined&&adjust_1Arr!=null&&adjust_1Arr!==""){
										$.each(adjust_1Arr,function(j,va){
											if(va!=undefined&&va!=null&&va!==""){
												adjust_1Map.put(va.split('=')[0],va.split('=')[1]);
											}
										});
									}
									
									var time = adjust_1Map.get('time');
									if(time!=undefined&&time!=null&&time!==""){
										time = formatTime(time);
									}
									
									if(time==undefined||time==null||time===""){
										time = "--";
									}	
									//1.1.key:时间，val:每个记录
									adjust_1_Map.put(time,val);
									//1.2.key:时间，val:第几次调节
									adjust_1_adjust_count_Map.put(time,adjust_1Map.get('adjust_count'));
									//2.存放每条记录的时间
									adjust_1_Arr[i] = time;
								}
							});
							
							//3.将时间升序排列
							bom(adjust_1_Arr);
							
							//4.定义一个新的数组，存放不含重复记录的自适应调节数据
							var adjust_result_adjust_mode_1New = new Array();
							var flag = 0;
							//5.去掉自适应调节汇报的重复数据，只保留第一次汇报的
							if(adjust_1_Arr!=undefined&&adjust_1_Arr!=null&&adjust_1_Arr!==""&&(adjust_1_Arr instanceof Array)){
								var temp = -1;
								$.each(adjust_1_Arr,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										var adjust_count = adjust_1_adjust_count_Map.get(val);
										if(adjust_count!=temp){
											temp = adjust_count;
											adjust_result_adjust_mode_1New[flag] = adjust_1_Map.get(val);
											flag ++;
										}
									}
								});
							}
							
							//console.info("自适应去掉前"+adjust_result_adjust_mode_1);
							//console.info("自适应去掉后"+adjust_result_adjust_mode_1New);
							
							//对去掉了重复数据的自适应数据进行处理
							if(adjust_result_adjust_mode_1New!=undefined&&adjust_result_adjust_mode_1New!=null&&adjust_result_adjust_mode_1New!==""){
								//要比较的两个数组都是升序排列好的数组。此标志的作用是：循环第一个数组时，对于第一个数组的每个记录，都会去循环比较第二个数组，当符合条件后，数组一的第二个记录开始循环时，从第二个数组的刚刚循环到的记录的下一个记录开始往后循环，而无须从头开始循环，加快了程序运行速度。
								var adjustIndexFlag = 1;//第一个点属于静态协商的点，故不用。
								$.each(adjust_result_adjust_mode_1New,function(i,val){
									if(val!=undefined&&val!=null&&val!==""){
										var adjust_result_adjust_mode_1Arr = val.split(' ');
										var adjust_result_adjust_mode_1Map = new Map();
										if(adjust_result_adjust_mode_1Arr!=undefined&&adjust_result_adjust_mode_1Arr!=null&&adjust_result_adjust_mode_1Arr!==""&&(adjust_result_adjust_mode_1Arr instanceof Array)){
											$.each(adjust_result_adjust_mode_1Arr,function(j,va){
												if(va!=undefined&&va!=null&&va!==""){
													adjust_result_adjust_mode_1Map.put(va.split('=')[0],va.split('=')[1]);
												}
											});
											
										}
										
										etoe_bw = adjust_result_adjust_mode_1Map.get('etoe_bw');//端到端带宽
										redund_up_bw = adjust_result_adjust_mode_1Map.get('redund_up_bw');//冗余带宽
										valid_up_bw = adjust_result_adjust_mode_1Map.get('valid_up_bw');//有效上行带宽
										audio_bw_f = adjust_result_adjust_mode_1Map.get('audio_bw_f');//fec后音频带宽
										video_bw_f = adjust_result_adjust_mode_1Map.get('video_bw_f');//fec后视频带宽
										
										adjust_count = adjust_result_adjust_mode_1Map.get('adjust_count');//调节次数 
										fec_adjust_count = adjust_result_adjust_mode_1Map.get('fec_adjust_count');//FEC调节次数 
										last_loss_rate = adjust_result_adjust_mode_1Map.get('last_loss_rate');//上次丢包率 
										
										trans_level_id = adjust_result_adjust_mode_1Map.get('trans_level_id');//视、音频等级
										video_redundent_lev = adjust_result_adjust_mode_1Map.get('video_redundent_lev');//视频fec等级
										audio_redundent_lev = adjust_result_adjust_mode_1Map.get('audio_redundent_lev');//音频fec等级
										
										var time = adjust_result_adjust_mode_1Map.get('time');//时间
										
										if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
											etoe_bw = "--";
										}
										if(adjust_count==undefined||adjust_count==null||adjust_count===""){
											adjust_count = "--";
										}
										if(fec_adjust_count==undefined||fec_adjust_count==null||fec_adjust_count===""){
											fec_adjust_count = "--";
										}
										if(last_loss_rate==undefined||last_loss_rate==null||last_loss_rate===""){
											last_loss_rate = "--";
										}
										if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
											redund_up_bw = "--";
										}
										if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
											valid_up_bw = "--";
										}
										if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
											audio_bw_f = "--";
										}
										if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
											video_bw_f = "--";
										}
										if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
											trans_level_id = "--";
										}
										if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
											video_redundent_lev = "--";
										}
										if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
											audio_redundent_lev = "--";
										}
										
										if(time!=undefined&&time!=null&&time!==""){
											time = formatTime(time);
										}
										
										//存放动态协商上报的每条记录的时间，这个记录不多，很少
										adjust_result_adjust_mode_1Time[i] = time;
										
										etoe_bwTemp[i] = etoe_bw;//动态协商中端到端带宽的值
										redund_up_bwTemp[i] = redund_up_bw;//动态协商中冗余带宽的值
										valid_up_bwTemp[i] = valid_up_bw;//动态协商中有效上行带宽的值
										audio_bw_fTemp[i] = audio_bw_f;//动态协商中fec后音频带宽的值
										video_bw_fTemp[i] = video_bw_f;//动态协商中fec后视频带宽的值
										trans_level_idTemp[i] = trans_level_id;//动态协商中视、音频等级的值
										video_redundent_levTemp[i] = video_redundent_lev;//动态协商中视频fec等级的值
										audio_redundent_levTemp[i] = audio_redundent_lev;//动态协商中音频fec等级的值
										
										var html = "";
										html += "第"+adjust_count+"次调节，fec第"+fec_adjust_count+"调节，上次丢包率 : "+getPercentage(last_loss_rate)+"%";
										if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""){
											for(var k=adjustIndexFlag;k<bandAdaptiveTimeArr_bz.length;k++){
												//处理最后一个点之前的点
												if(k<(bandAdaptiveTimeArr_bz.length-1)){
												
													if(time!=undefined&&time!=null&&time!==""&&bandAdaptiveTimeArr_bz[k]!=undefined&&bandAdaptiveTimeArr_bz[k]!=null&&bandAdaptiveTimeArr_bz[k]!==""&&bandAdaptiveTimeArr_bz[k+1]!=undefined&&bandAdaptiveTimeArr_bz[k+1]!=null&&bandAdaptiveTimeArr_bz[k+1]!==""){
														//将三者转化为毫秒
														//自适应调节点的时间
														var adjust_result_adjust_mode_1TimeMillisecond = splitTime(time).getTime();
														//每11秒动态汇报的时间
														var bandAdaptiveTimeArr_bzMillisecond_k0 = splitTime(bandAdaptiveTimeArr_bz[k]).getTime();
														var bandAdaptiveTimeArr_bzMillisecond_k1 = splitTime(bandAdaptiveTimeArr_bz[k+1]).getTime();
														
														if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k0!=null&&bandAdaptiveTimeArr_bzMillisecond_k0!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k1!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k1!=null&&bandAdaptiveTimeArr_bzMillisecond_k1!==""){
															if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_k0&&adjust_result_adjust_mode_1TimeMillisecond<bandAdaptiveTimeArr_bzMillisecond_k1){
																time = bandAdaptiveTimeArr_bz[k];
																adjustIndexFlag = ++k;
																break;
															}
														}
														//取绝对值比较，小于3秒，算作同一个时间点
														//if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
														//}
													}
												}
												//处理最后一个点
												if(k==(bandAdaptiveTimeArr_bz.length-1)){
													if(time!=undefined&&time!=null&&time!==""&&bandAdaptiveTimeArr_bz[k]!=undefined&&bandAdaptiveTimeArr_bz[k]!=null&&bandAdaptiveTimeArr_bz[k]!==""){
														//自适应调节点的时间
														var adjust_result_adjust_mode_1TimeMillisecond = splitTime(time).getTime();
														//自适应调节点的时间
														var bandAdaptiveTimeArr_bzMillisecond_k0 = splitTime(bandAdaptiveTimeArr_bz[k]).getTime();
														
														if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
															&&bandAdaptiveTimeArr_bzMillisecond_k0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_k0!=null&&bandAdaptiveTimeArr_bzMillisecond_k0!==""){
															if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_k0){
																time = bandAdaptiveTimeArr_bz[k];
																adjustIndexFlag = ++k;
															}
														}
													}
												}
												
												/*
												if(time!=undefined&&time!=null&&time!==""&&bandAdaptiveTimeArr_bz[k]!=undefined&&bandAdaptiveTimeArr_bz[k]!=null&&bandAdaptiveTimeArr_bz[k]!==""){
													//将二者转化为毫秒
													var adjust_result_adjust_mode_1TimeMillisecond = splitTime(time).getTime();
													var bandAdaptiveTimeArr_bzMillisecond = splitTime(bandAdaptiveTimeArr_bz[k]).getTime();
													//取绝对值比较，小于3秒，算作同一个时间点 
													// TODO
													if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
														time = bandAdaptiveTimeArr_bz[k];
													}
												}*/
											}
										}
										if(time==undefined||time==null||time===""){
											time = "--";
										}	
										BandwidthMap_bz.put(time,html);
									}
								});
							}
						}
						
						//为带宽和等级的各个下标设置空值，确定长度
						if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""&&(bandAdaptiveTimeArr_bz instanceof Array)){
							//从第二个下标开始
							for(var j=1;j<bandAdaptiveTimeArr_bz.length;j++){
										
								/**
								 * 带宽，第一个值采用静态协商的数据
								 */
								etoe_bwYArr_bz[j] = "";//端到端带宽Y轴
								redund_up_bwYArr_bz[j] = "";//冗余带宽Y轴
								valid_up_bwYArr_bz[j] = "";//有效上行带宽Y轴
								audio_bw_fYArr_bz[j] = "";//fec后音频带宽Y轴
								video_bw_fYArr_bz[j] = "";//fec后视频带宽Y轴
								
								/**
								 * 等级，第一个值采用静态协商的数据
								 */
								trans_level_idArr_bz[j] = "";//视、音频等级Y轴
								video_redundent_levArr_bz[j] = "";//视频fec等级Y轴
								audio_redundent_levArr_bz[j] = "";//音频fec等级Y轴
							}
						}
						
						
						//为带宽和等级的各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
						if(adjust_result_adjust_mode_1Time!=undefined&&adjust_result_adjust_mode_1Time!=null&&adjust_result_adjust_mode_1Time!==""){
							var adaptivePoint_bz_index = 0;
							//要比较的两个数组都是升序排列好的数组。此标志的作用是：循环第一个数组时，对于第一个数组的每个记录，都会去循环比较第二个数组，当符合条件后，数组一的第二个记录开始循环时，从第二个数组的刚刚循环到的记录的下一个记录开始往后循环，而无须从头开始循环，加快了程序运行速度。
							var adjustIndexFlag = 1;//第一个点属于静态协商的点，故不用
							for(var i=0;i<adjust_result_adjust_mode_1Time.length;i++){
								for(var j=adjustIndexFlag;j<bandAdaptiveTimeArr_bz.length;j++){
									if(j<(bandAdaptiveTimeArr_bz.length-1)){
										
										if(adjust_result_adjust_mode_1Time[i]!=undefined&&adjust_result_adjust_mode_1Time[i]!=null&&adjust_result_adjust_mode_1Time[i]!==""
										&&bandAdaptiveTimeArr_bz[j]!=undefined&&bandAdaptiveTimeArr_bz[j]!=null&&bandAdaptiveTimeArr_bz[j]!==""
										&&bandAdaptiveTimeArr_bz[j+1]!=undefined&&bandAdaptiveTimeArr_bz[j+1]!=null&&bandAdaptiveTimeArr_bz[j+1]!==""){
											//将三者转化为毫秒
											var adjust_result_adjust_mode_1TimeMillisecond = splitTime(adjust_result_adjust_mode_1Time[i]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j0 = splitTime(bandAdaptiveTimeArr_bz[j]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j1 = splitTime(bandAdaptiveTimeArr_bz[j+1]).getTime();
											
											if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond&&adjust_result_adjust_mode_1TimeMillisecond!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j0!=null&&bandAdaptiveTimeArr_bzMillisecond_j0!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j1!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j1!=null&&bandAdaptiveTimeArr_bzMillisecond_j1!==""){
												if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_j0&&adjust_result_adjust_mode_1TimeMillisecond<bandAdaptiveTimeArr_bzMillisecond_j1){
												//取绝对值比较，小于3秒，算作同一个时间点 TODO
												//if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
													//设置带宽自适应点
													//每隔11秒汇报一次端到端质量，系统会根据汇报的质量决定是否进行自适应调节，调节只会发生在汇报质量之后，两次端到端质量汇报之间只会发生一次自适应调节，将调节点的显示点定位在导致它发生的汇报端到端质量的时间点
													var adaptivePoint_bzTemp = new Array();
													adaptivePoint_bzTemp[0] = bandAdaptiveTimeArr_bz[j];
													adaptivePoint_bzTemp[1] = 700;
													
													adaptivePoint_bz[adaptivePoint_bz_index] = adaptivePoint_bzTemp;
													adaptivePoint_bz_index++;
													
													//此时发生了自适应调节，下面五项参数的值取调节后的新值
													etoe_bw = etoe_bwTemp[i];//端到端带宽
													redund_up_bw = redund_up_bwTemp[i];//冗余带宽
													valid_up_bw = valid_up_bwTemp[i];//有效上行带宽
													audio_bw_f = audio_bw_fTemp[i];//fec后音频带宽
													video_bw_f = video_bw_fTemp[i];//fec后视频带宽
													
													trans_level_id = trans_level_idTemp[i];//视、音频等级
													video_redundent_lev = video_redundent_levTemp[i];//视频fec等级
													audio_redundent_lev = audio_redundent_levTemp[i];//音频fec等级
													
													if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
														etoe_bw = "--";
													}
													if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
														redund_up_bw = "--";
													}
													if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
														valid_up_bw = "--";
													}
													if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
														audio_bw_f = "--";
													}
													if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
														video_bw_f = "--";
													}
													if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
														trans_level_id = "--";
													}
													if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
														video_redundent_lev = "--";
													}
													if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
														audio_redundent_lev = "--";
													}
													
													
													//为各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
													/**
													 * 带宽，第一个值采用静态协商的数据
													 */
													//哪个时间点发生了自适应调节，就取该点的值
													etoe_bwYArr_bz[j] = etoe_bw;//端到端带宽Y轴
													redund_up_bwYArr_bz[j] = redund_up_bw;//冗余带宽Y轴
													valid_up_bwYArr_bz[j] = valid_up_bw;//有效上行带宽Y轴
													audio_bw_fYArr_bz[j] = audio_bw_f;//fec后音频带宽Y轴
													video_bw_fYArr_bz[j] = video_bw_f;//fec后视频带宽Y轴
													
													/**
													 * 等级，第一个值采用静态协商的数据
													 */
													trans_level_idArr_bz[j] = trans_level_id;//视、音频等级Y轴
													video_redundent_levArr_bz[j] = video_redundent_lev;//视频fec等级Y轴
													audio_redundent_levArr_bz[j] = audio_redundent_lev;//音频fec等级Y轴
													
													//将自适应调节点放在第一个符合条件的点上
													adjustIndexFlag = ++j;
													break;
												}
											}
										}
									}
									if(j==(bandAdaptiveTimeArr_bz.length-1)){
										if(adjust_result_adjust_mode_1Time[i]!=undefined&&adjust_result_adjust_mode_1Time[i]!=null&&adjust_result_adjust_mode_1Time[i]!==""
										&&bandAdaptiveTimeArr_bz[j]!=undefined&&bandAdaptiveTimeArr_bz[j]!=null&&bandAdaptiveTimeArr_bz[j]!==""){
											//将二者转化为毫秒
											var adjust_result_adjust_mode_1TimeMillisecond = splitTime(adjust_result_adjust_mode_1Time[i]).getTime();
											var bandAdaptiveTimeArr_bzMillisecond_j0 = splitTime(bandAdaptiveTimeArr_bz[j]).getTime();
											if(adjust_result_adjust_mode_1TimeMillisecond!=undefined&&adjust_result_adjust_mode_1TimeMillisecond!=null&&adjust_result_adjust_mode_1TimeMillisecond!==""
												&&bandAdaptiveTimeArr_bzMillisecond_j0!=undefined&&bandAdaptiveTimeArr_bzMillisecond_j0!=null&&bandAdaptiveTimeArr_bzMillisecond_j0!==""){
												if(adjust_result_adjust_mode_1TimeMillisecond>=bandAdaptiveTimeArr_bzMillisecond_j0){
												//取绝对值比较，小于3秒，算作同一个时间点 TODO
												//if(Math.abs(adjust_result_adjust_mode_1TimeMillisecond-bandAdaptiveTimeArr_bzMillisecond)<3000){
													//设置带宽自适应点
													//每隔11秒汇报一次端到端质量，系统会根据汇报的质量决定是否进行自适应调节，调节只会发生在汇报质量之后，两次端到端质量汇报之间只会发生一次自适应调节，将调节点的显示点定位在导致它发生的汇报端到端质量的时间点
													var adaptivePoint_bzTemp = new Array();
													adaptivePoint_bzTemp[0] = bandAdaptiveTimeArr_bz[j];
													adaptivePoint_bzTemp[1] = 700;
													
													adaptivePoint_bz[adaptivePoint_bz_index] = adaptivePoint_bzTemp;
													adaptivePoint_bz_index++;
													
													//此时发生了自适应调节，下面五项参数的值取调节后的新值
													etoe_bw = etoe_bwTemp[i];//端到端带宽
													redund_up_bw = redund_up_bwTemp[i];//冗余带宽
													valid_up_bw = valid_up_bwTemp[i];//有效上行带宽
													audio_bw_f = audio_bw_fTemp[i];//fec后音频带宽
													video_bw_f = video_bw_fTemp[i];//fec后视频带宽
													
													trans_level_id = trans_level_idTemp[i];//视、音频等级
													video_redundent_lev = video_redundent_levTemp[i];//视频fec等级
													audio_redundent_lev = audio_redundent_levTemp[i];//音频fec等级
													
													if(etoe_bw==undefined||etoe_bw==null||etoe_bw===""){
														etoe_bw = "--";
													}
													if(redund_up_bw==undefined||redund_up_bw==null||redund_up_bw===""){
														redund_up_bw = "--";
													}
													if(valid_up_bw==undefined||valid_up_bw==null||valid_up_bw===""){
														valid_up_bw = "--";
													}
													if(audio_bw_f==undefined||audio_bw_f==null||audio_bw_f===""){
														audio_bw_f = "--";
													}
													if(video_bw_f==undefined||video_bw_f==null||video_bw_f===""){
														video_bw_f = "--";
													}
													if(trans_level_id==undefined||trans_level_id==null||trans_level_id===""){
														trans_level_id = "--";
													}
													if(video_redundent_lev==undefined||video_redundent_lev==null||video_redundent_lev===""){
														video_redundent_lev = "--";
													}
													if(audio_redundent_lev==undefined||audio_redundent_lev==null||audio_redundent_lev===""){
														audio_redundent_lev = "--";
													}
													
													
													//为各Y轴第一个点以外的其它相应的点赋值，此时赋值完后的形式为[12.1,,,2,,5,,]
													/**
													 * 带宽，第一个值采用静态协商的数据
													 */
													//哪个时间点发生了自适应调节，就取该点的值
													etoe_bwYArr_bz[j] = etoe_bw;//端到端带宽Y轴
													redund_up_bwYArr_bz[j] = redund_up_bw;//冗余带宽Y轴
													valid_up_bwYArr_bz[j] = valid_up_bw;//有效上行带宽Y轴
													audio_bw_fYArr_bz[j] = audio_bw_f;//fec后音频带宽Y轴
													video_bw_fYArr_bz[j] = video_bw_f;//fec后视频带宽Y轴
													
													/**
													 * 等级，第一个值采用静态协商的数据
													 */
													trans_level_idArr_bz[j] = trans_level_id;//视、音频等级Y轴
													video_redundent_levArr_bz[j] = video_redundent_lev;//视频fec等级Y轴
													audio_redundent_levArr_bz[j] = audio_redundent_lev;//音频fec等级Y轴
													
													//将自适应调节点放在第一个符合条件的点上
													adjustIndexFlag = ++j;
													break;
												}
											}
										}
									}
								}
							}
						}
						
						/*
						console.info("端到端带宽Y轴"+etoe_bwYArr_bz);
						console.info("冗余带宽Y轴"+redund_up_bwYArr_bz);
						console.info("有效上行带宽Y轴"+valid_up_bwYArr_bz);
						console.info("fec后音频带宽Y轴"+audio_bw_fYArr_bz);
						console.info("fec后视频带宽Y轴"+video_bw_fYArr_bz);
						console.info("视、音频等级Y轴"+trans_level_idArr_bz);
						console.info("视频fec等级Y轴"+video_redundent_levArr_bz);
						console.info("音频fec等级Y轴"+audio_redundent_levArr_bz);
						*/
						//为带宽和等级的各个空的坐标点设置值，规则：在两个自适应点之间所有的点的Y轴值相同，因为在两个自适应点之间的整个时间段内，所用的带宽和等级都是前者自适应调节点的。
						var tempBandAdaptive = "";
						
						//因为在调节之前，所有的参数值是不变的
						//将端到端带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(etoe_bwYArr_bz!=undefined&&etoe_bwYArr_bz!=null&&etoe_bwYArr_bz!==""&&(etoe_bwYArr_bz instanceof Array)){
							tempBandAdaptive = etoe_bwYArr_bz[0];
							$.each(etoe_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										etoe_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = etoe_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将冗余带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(redund_up_bwYArr_bz!=undefined&&redund_up_bwYArr_bz!=null&&redund_up_bwYArr_bz!==""&&(redund_up_bwYArr_bz instanceof Array)){
							tempBandAdaptive = redund_up_bwYArr_bz[0];
							$.each(redund_up_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										redund_up_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = redund_up_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将有效上行带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(valid_up_bwYArr_bz!=undefined&&valid_up_bwYArr_bz!=null&&valid_up_bwYArr_bz!==""&&(valid_up_bwYArr_bz instanceof Array)){
							tempBandAdaptive = valid_up_bwYArr_bz[0];
							$.each(valid_up_bwYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										valid_up_bwYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = valid_up_bwYArr_bz[i];
									}
								}
							});
						}
						
						//将fec后音频带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(audio_bw_fYArr_bz!=undefined&&audio_bw_fYArr_bz!=null&&audio_bw_fYArr_bz!==""&&(audio_bw_fYArr_bz instanceof Array)){
							tempBandAdaptive = audio_bw_fYArr_bz[0];
							$.each(audio_bw_fYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										audio_bw_fYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = audio_bw_fYArr_bz[i];
									}
								}
							});
						}
						
						//将fec后视频带宽Y轴中值为空的下标用上一个非空下标的值代替
						if(video_bw_fYArr_bz!=undefined&&video_bw_fYArr_bz!=null&&video_bw_fYArr_bz!==""&&(video_bw_fYArr_bz instanceof Array)){
							tempBandAdaptive = video_bw_fYArr_bz[0];
							$.each(video_bw_fYArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										video_bw_fYArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = video_bw_fYArr_bz[i];
									}
								}
							});
						}
						
						//将视、音频等级Y轴中值为空的下标用上一个非空下标的值代替
						if(trans_level_idArr_bz!=undefined&&trans_level_idArr_bz!=null&&trans_level_idArr_bz!==""&&(trans_level_idArr_bz instanceof Array)){
							tempBandAdaptive = trans_level_idArr_bz[0];
							$.each(trans_level_idArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										trans_level_idArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = trans_level_idArr_bz[i];
									}
								}
							});
						}
						
						//将视频fec等级Y轴中值为空的下标用上一个非空下标的值代替
						if(video_redundent_levArr_bz!=undefined&&video_redundent_levArr_bz!=null&&video_redundent_levArr_bz!==""&&(video_redundent_levArr_bz instanceof Array)){
							tempBandAdaptive = video_redundent_levArr_bz[0];
							$.each(video_redundent_levArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										video_redundent_levArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = video_redundent_levArr_bz[i];
									}
								}
							});
						}
						
						//将音频fec等级Y轴中值为空的下标用上一个非空下标的值代替
						if(audio_redundent_levArr_bz!=undefined&&audio_redundent_levArr_bz!=null&&audio_redundent_levArr_bz!==""&&(audio_redundent_levArr_bz instanceof Array)){
							tempBandAdaptive = audio_redundent_levArr_bz[0];
							$.each(audio_redundent_levArr_bz,function(i,val){
								if(i!==0){
									if(val==undefined||val==null||val===""){
										audio_redundent_levArr_bz[i] = tempBandAdaptive;
									}else{
										tempBandAdaptive = audio_redundent_levArr_bz[i];
									}
								}
							});
						}
						
						
						
						
					}
				}
			}
		}
	}
	/*	
	console.info("被　端到端带宽Y轴："+etoe_bwYArr_bz);
	console.info("被　冗余带宽Y轴："+redund_up_bwYArr_bz);
	console.info("被　有效上行带宽Y轴："+valid_up_bwYArr_bz);
	console.info("被　fec后音频带宽Y轴："+audio_bw_fYArr_bz);
	console.info("被　fec后视频带宽Y轴："+video_bw_fYArr_bz);
	console.info("被　自适应调用节："+adaptivePoint_bz);
	console.info("被　视、音频等级Y轴："+trans_level_idArr_bz);
	console.info("被　视频fec等级Y轴："+video_redundent_levArr_bz);
	console.info("被　音频fec等级Y轴："+audio_redundent_levArr_bz);
	
	console.info("被　音频原始丢包率Y轴："+audio_lose_bYArr_bz);
	console.info("被　音频fec纠错后丢包率Y轴："+audio_lose_fYArr_bz);
	console.info("被　视频原始丢包率Y轴:"+video_lose_bYArr_bz);
	console.info("被　视频fec纠错后丢包率Y轴:"+video_lose_fYArr_bz);
	console.info("被　延时Y轴:"+delayYArr_bz);
	console.info("被　X轴："+bandAdaptiveTimeArr_bz);
	*/
	dataArr01_bz = new Array();//端到端带宽
	dataArr02_bz = new Array();//冗余带宽
	dataArr03_bz = new Array();//有效上行带宽
	dataArr04_bz = new Array();//FEC后音频带宽
	dataArr05_bz = new Array();//FEC后视频带宽
	dataArr06_bz = new Array();//自适应调节点
	
	dataArr07_bz = new Array();//通话等级
	dataArr08_bz = new Array();//视频fec等级
	dataArr09_bz = new Array();//音频fec等级
	
	dataArr10_bz = new Array();//视频原始丢包率
	dataArr11_bz = new Array();//视频fec纠错后丢包率
	dataArr12_bz = new Array();//音频原始丢包率
	dataArr13_bz = new Array();//音频fec纠错后丢包率

	dataArr14_bz = new Array();//延时
	
	//highstock的数据格式采用的是[[时间,数据],[时间,数据],[时间,数 据],[时间,数据]]
	//下面各条线，通过前面的数据处理后，变成了一维的[数据,数据,数据,数据]格式，需要转化成highstock所采用的[[时间,数据],[时间,数据],[时间,数 据],[时间,数据]]格式
	$.each(bandAdaptiveTimeArr_bz,function(i,val){
	 	if(val!=undefined&&val!=null&&val!==""){
	 		var arr01 = new Array();
	 		var arr02 = new Array();
	 		var arr03 = new Array();
	 		var arr04 = new Array();
	 		var arr05 = new Array();
	 		var arr07 = new Array();
	 		var arr08 = new Array();
	 		var arr09 = new Array();
	 		var arr10 = new Array();
	 		var arr11 = new Array();
	 		var arr12 = new Array();
	 		var arr13 = new Array();
	 		var arr14 = new Array();
	 		
	 		arr01[0] = dateToUTC(val);
	 		arr02[0] = dateToUTC(val);
	 		arr03[0] = dateToUTC(val);
	 		arr04[0] = dateToUTC(val);
	 		arr05[0] = dateToUTC(val);
	 		arr07[0] = dateToUTC(val);
	 		arr08[0] = dateToUTC(val);
	 		arr09[0] = dateToUTC(val);
	 		arr10[0] = dateToUTC(val);
	 		arr11[0] = dateToUTC(val);
	 		arr12[0] = dateToUTC(val);
	 		arr13[0] = dateToUTC(val);
	 		arr14[0] = dateToUTC(val);
	 		
	 		//先将字符串转化为Number型再赋值
	 		arr01[1] = stringToNumber(etoe_bwYArr_bz[i]);//端到端带宽
	 		arr02[1] = stringToNumber(redund_up_bwYArr_bz[i]);//冗余带宽
	 		arr03[1] = stringToNumber(valid_up_bwYArr_bz[i]);//有效上行带宽
	 		arr04[1] = stringToNumber(audio_bw_fYArr_bz[i]);//FEC后音频带宽
	 		arr05[1] = stringToNumber(video_bw_fYArr_bz[i]);//FEC后视频带宽
	 		
	 		arr07[1] = stringToNumber(trans_level_idArr_bz[i]);//通话等级
	 		arr08[1] = stringToNumber(video_redundent_levArr_bz[i]);//视频fec等级
	 		arr09[1] = stringToNumber(audio_redundent_levArr_bz[i]);//音频fec等级
	 		
	 		arr10[1] = stringToNumber(video_lose_bYArr_bz[i]);//视频原始丢包率
	 		arr11[1] = stringToNumber(video_lose_fYArr_bz[i]);//视频fec纠错后丢包率
	 		arr12[1] = stringToNumber(audio_lose_bYArr_bz[i]);//音频原始丢包率
	 		arr13[1] = stringToNumber(audio_lose_fYArr_bz[i]);//音频fec纠错后丢包率
	 		
	 		arr14[1] = stringToNumber(delayYArr_bz[i]);//延时
	 		
	 		//自适应调节点信息
			var adjust_count = BandwidthMap_bz.get(val);
			
	 		var htmlHighstock = "";
	 		htmlHighstock += val+"<br/>" ;//时间点
			if(adjust_count!=undefined&&adjust_count!=null&&adjust_count!==""){
				htmlHighstock += adjust_count+"<br/>";
			}
			htmlHighstock += "【带宽】<br/>" +
	 				"　端到端带宽 : "+arr01[1]+"，带宽利用率 : "+rate(parseInt(arr03[1]),arr01[1])+"%<br/>" +
	 				"　冗余带宽 : "+arr02[1]+"，比例 : "+rate(arr02[1],parseInt(arr03[1]))+"%<br/>"+
	 				"　有效上行带宽 : "+arr03[1]+"<br/>"+//"，比例 : "+rate(arr03[1],(parseInt(arr02[1])+parseInt(arr03[1])))+"%<br/>"+
	 				"　FEC后音频带宽 : "+arr04[1]+"，比例 : "+rate(arr04[1],(parseInt(arr04[1])+parseInt(arr05[1])))+"%<br/>"+
	 				"　FEC后视频带宽 : "+arr05[1]+"，比例 : "+rate(arr05[1],(parseInt(arr04[1])+parseInt(arr05[1])))+"%<br/>" +
					"【等级】<br/>" +
					"　通话等级 : "+arr07[1]+"<br/>" +
					"　视频fec等级 : "+arr08[1]+"<br/>" +
					"　音频fec等级 : "+arr09[1]+"<br/>" ;
					if(i===0){
			htmlHighstock += "【丢包率】<br/>" +
					"　刚开始呼叫，此时还未上报丢包率数据<br/>" +
					"【延时】<br/>" +
					"　刚开始呼叫，此时还未上报延时数据";
					}else{
			htmlHighstock += "【丢包率】<br/>" +
					"　视频原始丢包率 : "+arr10[1]+"%<br/>" +
					"　视频fec纠错后丢包率 : "+arr11[1]+"%<br/>" +
					"　音频原始丢包率 : "+arr12[1]+"%<br/>" +
					"　音频fec纠错后丢包率 : "+arr13[1]+"%<br/>" +
					"　"+audio_videoMap_bz.get(val)+"<br/>"+
					"【延时】<br/>" +
					"　延时 : "+arr14[1]+"ms";
					}
					
	 		bandMapHighstock_bz.put(splitTime(val).getTime(),htmlHighstock);//显示每个时间点标签信息的Map
	 		
	 		dataArr01_bz[i] = arr01;//端到端带宽
	 		dataArr02_bz[i] = arr02;//冗余带宽
	 		dataArr03_bz[i] = arr03;//有效上行带宽
	 		dataArr04_bz[i] = arr04;//FEC后音频带宽
	 		dataArr05_bz[i] = arr05;//FEC后视频带宽
	 		
	 		dataArr07_bz[i] = arr07;//通话等级
	 		dataArr08_bz[i] = arr08;//视频fec等级
	 		dataArr09_bz[i] = arr09;//音频fec等级
	 		
	 		dataArr10_bz[i] = arr10;//视频原始丢包率
	 		dataArr11_bz[i] = arr11;//视频fec纠错后丢包率
	 		dataArr12_bz[i] = arr12;//音频原始丢包率
	 		dataArr13_bz[i] = arr13;//音频fec纠错后丢包率
	 		
	 		dataArr14_bz[i] = arr14;//延时
	 		
	 	}
	 });
	
	 //将自适应调节点的时间转化为UTC时间
	 $.each(adaptivePoint_bz,function(i,val){
	 	var arr06 = new Array();
	 	if(val!=undefined&&val!=null&&val!==""){
	 		arr06[0] = dateToUTC(val[0]);//调节点的时间
	 		arr06[1] = stringToNumber(val[1]);//调节点的值，赋值成了700
	 		dataArr06_bz[i] = arr06;
	 	}
	 });
	 /*
	 console.info("dataArr01_bz:"+dataArr01_bz);
	 console.info("dataArr02_bz:"+dataArr02_bz);
	 console.info("dataArr03_bz:"+dataArr03_bz);
	 console.info("dataArr04_bz:"+dataArr04_bz);
	 console.info("dataArr05_bz:"+dataArr05_bz);
	 console.info("dataArr06_bz:"+dataArr06_bz);
	 console.info("dataArr07_bz:"+dataArr07_bz);
	 console.info("dataArr08_bz:"+dataArr08_bz);
	 console.info("dataArr09_bz:"+dataArr09_bz);
	 console.info("dataArr10_bz:"+dataArr10_bz);
	 console.info("dataArr11_bz:"+dataArr11_bz);
	 console.info("dataArr12_bz:"+dataArr12_bz);
	 console.info("dataArr13_bz:"+dataArr13_bz);
	 console.info("dataArr14_bz:"+dataArr14_bz);
	 */
	//调用echarts的视图方法，将组合后的数据在页面显示
	if(bandAdaptiveTimeArr_bz!=undefined&&bandAdaptiveTimeArr_bz!=null&&bandAdaptiveTimeArr_bz!==""&&
		etoe_bwYArr_bz!=undefined&&etoe_bwYArr_bz!=null&&etoe_bwYArr_bz!==""&&
		redund_up_bwYArr_bz!=undefined&&redund_up_bwYArr_bz!=null&&redund_up_bwYArr_bz!==""&&
		valid_up_bwYArr_bz!=undefined&&valid_up_bwYArr_bz!=null&&valid_up_bwYArr_bz!==""&&
		audio_bw_fYArr_bz!=undefined&&audio_bw_fYArr_bz!=null&&audio_bw_fYArr_bz!==""&&
		video_bw_fYArr_bz!=undefined&&video_bw_fYArr_bz!=null&&video_bw_fYArr_bz!==""&&
		adaptivePoint_bz!=undefined&&adaptivePoint_bz!=null&&adaptivePoint_bz!==""&&
		BandwidthMap_bz!=undefined&&BandwidthMap_bz!=null&&BandwidthMap_bz!==""&&
		trans_level_idArr_bz!=undefined&&trans_level_idArr_bz!=null&&trans_level_idArr_bz!==""&&
		video_redundent_levArr_bz!=undefined&&video_redundent_levArr_bz!=null&&video_redundent_levArr_bz!==""&&
		audio_redundent_levArr_bz!=undefined&&audio_redundent_levArr_bz!=null&&audio_redundent_levArr_bz!==""&&
		audio_lose_bYArr_bz!=undefined&&audio_lose_bYArr_bz!=null&&audio_lose_bYArr_bz!==""&&
		audio_lose_fYArr_bz!=undefined&&audio_lose_fYArr_bz!=null&&audio_lose_fYArr_bz!==""&&
		video_lose_bYArr_bz!=undefined&&video_lose_bYArr_bz!=null&&video_lose_bYArr_bz!==""&&
		video_lose_fYArr_bz!=undefined&&video_lose_fYArr_bz!=null&&video_lose_fYArr_bz!==""&&
		audio_videoMap_bz!=undefined&&audio_videoMap_bz!=null&&audio_videoMap_bz!==""&&
		delayYArr_bz!=undefined&&delayYArr_bz!=null&&delayYArr_bz!==""&&
		delayMap_bz!=undefined&&delayMap_bz!=null&&delayMap_bz!==""){
		//bandwithAdaptive_bzView();
	}
	 
	//调用highstock的视图
	//包含“带宽、等级、丢包率、延时”四个图
	if(dataArr01_bz!=undefined&&dataArr01_bz!=null&&dataArr01_bz!==""&&
	dataArr02_bz!=undefined&&dataArr02_bz!=null&&dataArr02_bz!==""&&
	dataArr03_bz!=undefined&&dataArr03_bz!=null&&dataArr03_bz!==""&&
	dataArr04_bz!=undefined&&dataArr04_bz!=null&&dataArr04_bz!==""&&
	dataArr05_bz!=undefined&&dataArr05_bz!=null&&dataArr05_bz!==""&&
	dataArr06_bz!=undefined&&dataArr06_bz!=null&&dataArr06_bz!==""&&
	dataArr07_bz!=undefined&&dataArr07_bz!=null&&dataArr07_bz!==""&&
	dataArr08_bz!=undefined&&dataArr08_bz!=null&&dataArr08_bz!==""&&
	dataArr09_bz!=undefined&&dataArr09_bz!=null&&dataArr09_bz!==""&&
	dataArr10_bz!=undefined&&dataArr10_bz!=null&&dataArr10_bz!==""&&
	dataArr11_bz!=undefined&&dataArr11_bz!=null&&dataArr11_bz!==""&&
	dataArr12_bz!=undefined&&dataArr12_bz!=null&&dataArr12_bz!==""&&
	dataArr13_bz!=undefined&&dataArr13_bz!=null&&dataArr13_bz!==""&&
	dataArr14_bz!=undefined&&dataArr14_bz!=null&&dataArr14_bz!==""&&
	bandMapHighstock_bz!=undefined&&bandMapHighstock_bz!=null&&bandMapHighstock_bz!==""){
		highstockView_bz02();
	}
}