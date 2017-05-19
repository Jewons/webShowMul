/*
 * 对道路切换和音频溢出数据进行处理，主、被都在这里处理
 * 
 */

//道路切换的数据
var pathSwitch_zbUTC = new Array();
var pathSwitch_bzUTC = new Array();

//浪涌的数据
var audioOverFlow_zbUTC = new Array();
var audioOverFlow_bzUTC = new Array();
 
//道路切换时间
var pathSwitchTimeArr_zb = new Array();
var pathSwitchTimeArr_bz = new Array();

//音频溢出时间
var audio_overflowTimeArr_zb = new Array();
var audio_overflowTimeArr_bz = new Array();

//道路切换和音频溢出数据的合并
var pathSwitch_audioOverFlowData_zb = new Array();
var pathSwitch_audioOverFlowData_bz = new Array();

//道路切换和浪涌时间的合并
var pathSwitch_audioOverFlowTime_zb = new Array();//存放去除掉重复记录的数组
var pathSwitch_audioOverFlowTime_zbTemp = new Array();//原始数组

var pathSwitch_audioOverFlowTime_bz = new Array();//存放去除掉重复记录的数组
var pathSwitch_audioOverFlowTime_bzTemp = new Array();//原始数组

var switchinfoMap;//道路切换的标签map，包含了主和被
/**
 * “带宽自适应/道路切换和浪涌”
 */
function pathSwitch_overflow(datas){
	
	switchinfoMap = new Map();
	var paramExt;//包含七种参数
	//浪涌信息上报(音频溢出)
	var audio_overflow;
	
	//道路切换
	var pathSwitch;	
	
	var count;//第几次切换
	var old_main_cid;//旧的主路道路
	var old_main_rating;//旧的主路打分
	var old_back_cid;//旧的备路道路
	var old_back_rating;//旧的备路打分
	var new_main_cid;//新的主路道路
	var new_main_rating;//新的主路道路打分
	var new_back_cid;//新的备路道路
	var new_back_rating;//新的备路道路打分
	var time;//道路切换发生的时间
	
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			var called = data.called;
			var direction = "";//方向
			if(caller!=undefined&&caller!=null&&caller!==""){
				direction = "zb";
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					pathswitch = call.pathswitch;
					if(pathswitch!=undefined&&pathswitch!=null&&pathswitch!==""){
						pathSwitchArr(pathswitch,direction);//道路切换
					}
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						audio_overflow = paramExt.audio_overflow;
						if(audio_overflow!=undefined&&audio_overflow!=null&&audio_overflow!==""){
							audio_overflowArr(audio_overflow,direction);//浪涌信息上报(音频溢出)
						}
					}
					//将道路切换时间与音频溢出时间合并，作为X轴
					switch_overflowTime(pathSwitchTimeArr_zb,audio_overflowTimeArr_zb,direction);
					//将道路切换和音频溢出的数据合并，组合成一个数组
					setSwitch_overflowArrData(pathSwitchTimeArr_zb,audio_overflowTimeArr_zb,direction);
				}
			}
			//console.info("X轴时间"+pathSwitch_audioOverFlowTime_zb);
			//console.info("Y轴合并后的总数据："+pathSwitch_audioOverFlowData_zb);
			
			if(called!=undefined&&called!=null&&called!==""){
				direction = "bz";
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					pathswitch = call.pathswitch;
					if(pathswitch!=undefined&&pathswitch!=null&&pathswitch!==""){
						pathSwitchArr(pathswitch,direction);//道路切换
					}
					paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						audio_overflow = paramExt.audio_overflow;
						if(audio_overflow!=undefined&&audio_overflow!=null&&audio_overflow!==""){
							audio_overflowArr(audio_overflow,direction);//浪涌信息上报(音频溢出)
						}
					}
					//将道路切换时间与音频溢出时间合并，作为X轴
					switch_overflowTime(pathSwitchTimeArr_bz,audio_overflowTimeArr_bz,direction);
					//将道路切换和音频溢出的数据合并，组合成一个数组
					setSwitch_overflowArrData(pathSwitchTimeArr_bz,audio_overflowTimeArr_bz,direction);
				}
			}
		}
	}
		
	//将道路切换的时间转化为UTC时间，并转化为二维数组
	if(pathSwitchTimeArr_zb!=undefined&&pathSwitchTimeArr_zb!=null&&pathSwitchTimeArr_zb!==""){
		$.each(pathSwitchTimeArr_zb,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 1;//数据值
				pathSwitch_zbUTC[i] = arr;
			}
		});
	}
	if(pathSwitchTimeArr_bz!=undefined&&pathSwitchTimeArr_bz!=null&&pathSwitchTimeArr_bz!==""){
		$.each(pathSwitchTimeArr_bz,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 1;//数据值
				pathSwitch_bzUTC[i] = arr;
			}
		});
	}
	
	//将浪涌的时间转化为UTC时间，并转化为二维数组
	if(audio_overflowTimeArr_zb!=undefined&&audio_overflowTimeArr_zb!=null&&audio_overflowTimeArr_zb!==""){
		$.each(audio_overflowTimeArr_zb,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 2;//数据值
				audioOverFlow_zbUTC[i] = arr;
			}
		});
	}
	if(audio_overflowTimeArr_bz!=undefined&&audio_overflowTimeArr_bz!=null&&audio_overflowTimeArr_bz!==""){
		$.each(audio_overflowTimeArr_bz,function(i,val){
			var arr = new Array();
			if(val!=undefined&&val!=null&&val!==""){
				arr[0] = dateToUTC(val);//时间
				arr[1] = 2;//数据值
				audioOverFlow_bzUTC[i] = arr;
			}
		});
	}
	
	//调用highstock的视图
	//包含“道路切换、浪涌”两个视图，主叫端
	if(pathSwitch_zbUTC!=undefined&&pathSwitch_zbUTC!=null&&pathSwitch_zbUTC!==""&&
	audioOverFlow_zbUTC!=undefined&&audioOverFlow_zbUTC!=null&&audioOverFlow_zbUTC!==""){
		highstockView_zb01();
	}
	//包含“道路切换、浪涌”两个视图，被叫端
	if(pathSwitch_bzUTC!=undefined&&pathSwitch_bzUTC!=null&&pathSwitch_bzUTC!==""&&
	audioOverFlow_bzUTC!=undefined&&audioOverFlow_bzUTC!=null&&audioOverFlow_bzUTC!==""){
		highstockView_bz01();
	}
	
}

/**
 * 道路切换 ，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function pathSwitchArr(data,direction){
	var html = "";
	if(direction == "zb"){
		//得到时间，然后组成数组
		pathSwitchTimeArr_zb = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var switchtime = val.switchtime;
				var switchinfo = val.switchinfo;
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
					if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
						switchtime = formatTime(switchtime);
					}
					//当时间存在时，存入数组
					//之所以另外加一个flag而不用i，是因为switchtime有时可能为空，会导致pathSwitchTimeArr_zb下标跳跃。
					pathSwitchTimeArr_zb[flag] = switchtime;
					flag ++;
					//道路切换信息，弹出框用
					if(switchinfo!=undefined&&switchinfo!=null&&switchinfo!==""){
						var switchinfoArr = switchinfo.split(' ');
						if(switchinfoArr!=undefined&&switchinfoArr!=null&&switchinfoArr!==""&&(switchinfoArr instanceof Array)){
							$.each(switchinfoArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									switchinfoMap.put(va.split('=')[0],va.split('=')[1]);
								}
							});
						}
						
						count = switchinfoMap.get('count');//第几次切换
						old_main_cid = switchinfoMap.get('old_main_cid');//旧的主路道路
						old_main_rating = switchinfoMap.get('old_main_rating');//旧的主路打分
						old_back_cid = switchinfoMap.get('old_back_cid');//旧的备路道路
						old_back_rating = switchinfoMap.get('old_back_rating');//旧的备路打分
						new_main_cid = switchinfoMap.get('new_main_cid');//新的主路道路
						new_main_rating = switchinfoMap.get('new_main_rating');//新的主路道路打分
						new_back_cid = switchinfoMap.get('new_back_cid');//新的备路道路
						new_back_rating = switchinfoMap.get('new_back_rating');//新的备路道路打分
						time = switchinfoMap.get('time');//道路切换发生的时间
						
						if(count==undefined||count==null||count===""){
							count = "--";
						}
						if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
							old_main_cid = "--";
						}
						if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
							old_main_rating = "--";
						}
						if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
							old_back_cid = "--";
						}
						if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
							old_back_rating = "--";
						}
						if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
							new_main_cid = "--";
						}
						if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
							new_main_rating = "--";
						}
						if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
							new_back_cid = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						if(time!=undefined&&time!=null&&time!==""){
							time = formatTime(time);
						}
						
						if(time==undefined||time==null||time===""){
							time = "--";
						}
						
						html += "第"+count+"次切换，时间 : "+time+"<br/>" +
								"旧的主路道路ID : "+old_main_cid+"，旧的主路道路打分 : "+old_main_rating+"<br/>" +
								"旧的备路道路ID : "+old_back_cid+"，旧的备路打分 : "+old_back_rating+"<br/>" +
								"新的主路道路ID : "+ new_main_cid+"，新的主路道路打分 : "+new_main_rating+"<br/>"+
								"新的备路道路ID : "+new_back_cid+"，新的备路道路打分 : "+new_back_rating + "<br/>";								
					}
				}
				
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					switchinfoMap.put(splitTime(switchtime).getTime()+'_1_zb',html);
				}else {
					if(time!=undefined&&time!=null&&time!==""){
						switchinfoMap.put(splitTime(time).getTime()+'_1_zb',html);
					}
				}
			}
		});
	}
	if(direction == "bz"){
		//得到时间，然后组成数组
		pathSwitchTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var switchtime = val.switchtime;
				var switchinfo = val.switchinfo;
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
					if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
						switchtime = formatTime(switchtime);
					}
					//当时间存在时，存入数组
					//之所以另外加一个flag而不用i，是因为switchtime有时可能为空，会导致pathSwitchTimeArr_bz下标跳跃。
					pathSwitchTimeArr_bz[flag] = switchtime;
					flag ++;
					
					//道路切换信息，弹出框用
					if(switchinfo!=undefined&&switchinfo!=null&&switchinfo!==""){
						var switchinfoArr = switchinfo.split(' ');
						if(switchinfoArr!=undefined&&switchinfoArr!=null&&switchinfoArr!==""&&(switchinfoArr instanceof Array)){
							$.each(switchinfoArr,function(j,va){
								if(va!=undefined&&va!=null&&va!==""){
									switchinfoMap.put(va.split('=')[0],va.split('=')[1]);
								}
							});
						}
						
						count = switchinfoMap.get('count');//第几次切换
						old_main_cid = switchinfoMap.get('old_main_cid');//旧的主路道路
						old_main_rating = switchinfoMap.get('old_main_rating');//旧的主路打分
						old_back_cid = switchinfoMap.get('old_back_cid');//旧的备路道路
						old_back_rating = switchinfoMap.get('old_back_rating');//旧的备路打分
						new_main_cid = switchinfoMap.get('new_main_cid');//新的主路道路
						new_main_rating = switchinfoMap.get('new_main_rating');//新的主路道路打分
						new_back_cid = switchinfoMap.get('new_back_cid');//新的备路道路
						new_back_rating = switchinfoMap.get('new_back_rating');//新的备路道路打分
						time = switchinfoMap.get('time');//道路切换发生的时间
						
						if(count==undefined||count==null||count===""){
							count = "--";
						}
						if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
							old_main_cid = "--";
						}
						if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
							old_main_rating = "--";
						}
						if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
							old_back_cid = "--";
						}
						if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
							old_back_rating = "--";
						}
						if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
							new_main_cid = "--";
						}
						if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
							new_main_rating = "--";
						}
						if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
							new_back_cid = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
							new_back_rating = "--";
						}
						
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						if(time!=undefined&&time!=null&&time!==""){
							time = formatTime(time);
						}
						
						if(time==undefined||time==null||time===""){
							time = "--";
						}
						
						html += "第"+count+"次切换，时间 : " +time + "<br/>"+
								"旧的主路道路ID : "+old_main_cid+"，旧的主路道路打分 : "+old_main_rating+"<br/>" +
								"旧的备路道路ID : "+old_back_cid+"，旧的备路打分 : "+old_back_rating+"<br/>" +
								"新的主路道路ID : "+ new_main_cid+"，新的主路道路打分 : "+new_main_rating+"<br/>"+
								"新的备路道路ID : "+new_back_cid+"，新的备路道路打分 : "+new_back_rating + "<br/>";
					}
				}
				if(switchtime!=undefined&&switchtime!=null&&switchtime!==""){
					switchinfoMap.put(splitTime(switchtime).getTime()+'_1_bz',html);
				}else {
					if(time!=undefined&&time!=null&&time!==""){
						switchinfoMap.put(splitTime(time).getTime()+'_1_bz',html);
					}
				}
			}
		});
	}
}

/**
 * 浪涌信息上报(音频溢出)，得到时间，然后组成数组
 * @param {} data
 * @param {} flag 主、被
 */
function audio_overflowArr(data,direction){
	var html = "";
	if(direction == "zb"){
		//得到时间，然后组成数组
		audio_overflowTimeArr_zb = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//浪涌丢掉的毫秒数
					var audio_drop_ms = rowMap.get('audio_drop_ms');
					
					//浪涌溢出时间
					var overflowTime = rowMap.get('time');
					if(overflowTime!=undefined&&overflowTime!=null&&overflowTime!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						overflowTime = formatTime(overflowTime);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为overflowTime有时可能为空，会导致audio_overflowTimeArr_zb下标跳跃。
						audio_overflowTimeArr_zb[flag] = overflowTime;
						flag ++;
					}
					
					if(audio_drop_ms==undefined||audio_drop_ms==null||audio_drop_ms===""){
						audio_drop_ms = "--";
					}
					if(overflowTime==undefined||overflowTime==null||overflowTime===""){
						overflowTime = "--";
					}
					
					html += "时间 : "+overflowTime+"<br/>音频浪涌丢掉的毫秒数 : " +audio_drop_ms+"ms";
				}
				
				if(overflowTime!=undefined&&overflowTime!=null&&overflowTime!==""){
					switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_zb',html);
				}
			}
		});
	}
	
	if(direction == "bz"){
		//得到时间，然后组成数组
		audio_overflowTimeArr_bz = new Array();
		var flag = 0;
		$.each(data,function(i,val){
			html = "";
			if(val!=undefined&&val!=null&&val!==""){
				var rowArr = val.split(' ');
				//将时间字段存入map
				if(rowArr!=undefined&&rowArr!=null&&rowArr!==""){
					var rowMap = new Map();
					$.each(rowArr,function(j,va){
						if(va!=undefined&&va!=null&&va!==""){
							rowMap.put(va.split('=')[0],va.split('=')[1]);
						}
					});
					
					//浪涌丢掉的毫秒数
					var audio_drop_ms = rowMap.get('audio_drop_ms');
					
					//浪涌溢出时间
					var overflowTime = rowMap.get('time');
					if(overflowTime!=undefined&&overflowTime!=null&&overflowTime!==""){
						//格式时字符串时间，将2015-1-14-14:32:45:165转化为2015-1-14 14:32:45:165形式的
						overflowTime = formatTime(overflowTime);
						//当时间存在时，存入数组
						//之所以另外加一个flag而不用i，是因为overflowTime有时可能为空，会导致audio_overflowTimeArr_bz下标跳跃。
						audio_overflowTimeArr_bz[flag] = overflowTime;
						flag ++;
					}
					
					if(audio_drop_ms==undefined||audio_drop_ms==null||audio_drop_ms===""){
						audio_drop_ms = "--";
					}
					if(overflowTime==undefined||overflowTime==null||overflowTime===""){
						overflowTime = "--";
					}
					
					html += "时间 : "+overflowTime+"<br/>音频浪涌丢掉的毫秒数 : " +audio_drop_ms+"ms";
				}
				if(overflowTime!=undefined&&overflowTime!=null&&overflowTime!==""){
					switchinfoMap.put(splitTime(overflowTime).getTime()+'_2_bz',html);
				}
			}
		});
	}
}


/**
 * 将道路切换时间与音频溢出时间合并，作为X轴(升序排列，去掉重复数据)
 * @param {} pathSwitchTimeArr 道路切换时间
 * @param {} audio_overflowTimeArr 音频溢出时间
 * @param {} flag 主、被
 */
function switch_overflowTime(pathSwitchTimeArr,audio_overflowTimeArr,direction){
	if(direction=="zb"){
		pathSwitch_audioOverFlowTime_zbTemp = new Array();
		
		//将道路切换时间放入总数组中
		if(pathSwitchTimeArr!=undefined&&pathSwitchTimeArr!=null&&pathSwitchTimeArr!==""){
			//先将道路切换时间放入总数组中
			$.each(pathSwitchTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					pathSwitch_audioOverFlowTime_zbTemp[i] = val;
				}
			});
		}
		
		var length = pathSwitch_audioOverFlowTime_zbTemp.length;
		
		//再将音频溢出时间放入总数组中
		if(audio_overflowTimeArr!=undefined&&audio_overflowTimeArr!=null&&audio_overflowTimeArr!==""){
			$.each(audio_overflowTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					pathSwitch_audioOverFlowTime_zbTemp[length+i] = val;
				}
			});
		}
		
		//按时间升序排列
		if(pathSwitch_audioOverFlowTime_zbTemp!=undefined&&pathSwitch_audioOverFlowTime_zbTemp!=null&&pathSwitch_audioOverFlowTime_zbTemp!==""){
			bom(pathSwitch_audioOverFlowTime_zbTemp);
		}
		
		//去掉重复数据
		getNoNameArr(pathSwitch_audioOverFlowTime_zb,pathSwitch_audioOverFlowTime_zbTemp);
	}
	if(direction=="bz"){
		pathSwitch_audioOverFlowTime_bzTemp = new Array();
		//将道路切换时间放入总数组中
		if(pathSwitchTimeArr!=undefined&&pathSwitchTimeArr!=null&&pathSwitchTimeArr!==""){
			$.each(pathSwitchTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					pathSwitch_audioOverFlowTime_bzTemp[i] = val;
				}
			});
		}
		
		var length = pathSwitch_audioOverFlowTime_bzTemp.length;
		
		//再将音频溢出时间放入总数组中
		if(audio_overflowTimeArr!=undefined&&audio_overflowTimeArr!=null&&audio_overflowTimeArr!==""){
			$.each(audio_overflowTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					pathSwitch_audioOverFlowTime_bzTemp[length+i] = val;
				}
			});
		}
		
		//按时间升序排列
		if(pathSwitch_audioOverFlowTime_bzTemp!=undefined&&pathSwitch_audioOverFlowTime_bzTemp!=null&&pathSwitch_audioOverFlowTime_bzTemp!==""){
			bom(pathSwitch_audioOverFlowTime_bzTemp);
		}
		
		//去掉重复数据
		getNoNameArr(pathSwitch_audioOverFlowTime_bz,pathSwitch_audioOverFlowTime_bzTemp);
	}
}

/**
 * 将道路切换和音频溢出的数据合并，组合成一个数组
 * @param {} pathSwitchTimeArr 道路切换时间
 * @param {} audio_overflowTimeArr 音频溢出时间
 * @param {} flag 主、被
 */
function setSwitch_overflowArrData(pathSwitchTimeArr,audio_overflowTimeArr,direction){
	if(direction=="zb"){
		//道路切换时间的二维数组设置
		pathSwitch_audioOverFlowData_zb = new Array();
		if(pathSwitchTimeArr!=undefined&&pathSwitchTimeArr!=null&&pathSwitchTimeArr!==""){
			$.each(pathSwitchTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var arr = new Array();
					arr[0] = val,
					arr[1] = 1;//道路切换设置值为1
					pathSwitch_audioOverFlowData_zb[i] = arr;
				}
			});
		}
		
		var length = pathSwitch_audioOverFlowData_zb.length;
		
		if(audio_overflowTimeArr!=undefined&&audio_overflowTimeArr!=null&&audio_overflowTimeArr!==""){
			$.each(audio_overflowTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var arr = new Array();
					arr[0] = val,
					arr[1] = 2;//浪涌设置值为2
					pathSwitch_audioOverFlowData_zb[length+i] = arr;
				}
			});
		}
	}
	if(direction == "bz"){
		//道路切换时间的二维数组设置
		pathSwitch_audioOverFlowData_bz = new Array();
		if(pathSwitchTimeArr!=undefined&&pathSwitchTimeArr!=null&&pathSwitchTimeArr!==""){
			$.each(pathSwitchTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var arr = new Array();
					arr[0] = val,
					arr[1] = 1;
					pathSwitch_audioOverFlowData_bz[i] = arr;
				}
			});
		}
		
		var length = pathSwitch_audioOverFlowData_bz.length;
		
		if(audio_overflowTimeArr!=undefined&&audio_overflowTimeArr!=null&&audio_overflowTimeArr!==""){
			$.each(audio_overflowTimeArr,function(i,val){
				if(val!=undefined&&val!=null&&val!==""){
					var arr = new Array();
					arr[0] = val,
					arr[1] = 2;
					pathSwitch_audioOverFlowData_bz[length+i] = arr;
				}
			});
		}
	}
}
