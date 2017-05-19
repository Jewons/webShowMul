/**
 * Flash调节的视图，包含：主叫方FlashSDK、被叫方RtmpServer、被叫方FlashSDK
 */
/**
 * 主叫方FlashSDK 
 */
function flashView_zb01() {
	$('#flashAdjust_main_zb01').highcharts('StockChart', {
				title : {
					text : '本次通话Flash调节过程记录图'
				},
				exporting: {//右上角导出图片    
		            enabled: false//是否能导出趋势图图片  
		        },
		        navigation:{//对图表右上角的导出趋势图的菜单进行设置
			    	enabled:true,
			    	buttonOptions:{
				    	width:200,
				    	text:'导出'
			    	},
			    	menuStyle: {
			    		border: '1px solid #A0A0A0',
			    		background: '#FFFFFF'
			    	}
			    },
		        navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:180,
		        	xAxis: {
		        	    tickWidth: 0,//数据分段
		        	    lineWidth: 0,
		        	    gridLineWidth: 1,
		        	    tickPixelInterval: 100,
		        	    labels: {
		        	        align: 'left',
		        	        style: {
		        	            color: '#888'
		        	        },
		        	        x: 3,
		        	        y: -4
		        	    }
		        	}
		        },
		        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
		        	//enabled:false,
					height : 20,
					barBackgroundColor:'#2493F7',//滚动条背景色
					buttonBackgroundColor:'#F07600',//左右按钮的背景色
					buttonBorderColor:'#F07600'//左右按钮的边框色
				},
				tooltip : {// 标签提示框
					enabled : true,// 显示提示框
					backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
					crosshairs : true,// 鼠标经过时显示上下标尺线
					shared : true,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
					formatter : function() {//如果此项进行了设置，提示框的显示将按下面设置的显示，上面的xDateFormat失效
						var  now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
        	   			var maptime = splitTime(time).getTime();
        	   			var info = "";
        	   			var cpu = flashCallerMap.get(maptime+"_cpu");
        	   			var memory = flashCallerMap.get(maptime+"_memory");
        	   			var real_v_bps_r = flashCallerMap.get(maptime+"_real_v_bps_r");
        	   			var real_a_bps_r = flashCallerMap.get(maptime+"_real_a_bps_r");
        	   			var sample_fps = flashCallerMap.get(maptime+"_sample_fps");
        	   			var flash_adjust = flashCallerMap.get(maptime+"_flash_adjust");
        	   			
        	   			info += time + "<br/>";
        	   			
        	   			if(cpu!=undefined&&cpu!=null&&cpu!==""){
        	   				info += "CPU："+cpu+ "%<br/>";
        	   			}else{
        	   				info += "CPU：无<br/>";
        	   			}
        	   			if(memory!=undefined&&memory!=null&&memory!==""){
        	   				info += "内存："+ memory + "MB<br/>";
        	   			}else{
        	   				info += "内存：无<br/>";
        	   			}
        	   			if(real_v_bps_r!=undefined&&real_v_bps_r!=null&&real_v_bps_r!==""){
        	   				info += "发送的视频码率："+real_v_bps_r+ "KB/秒<br/>";
        	   			}else{
        	   				info += "发送的视频码率：无<br/>";
        	   			}
        	   			if(real_a_bps_r!=undefined&&real_a_bps_r!=null&&real_a_bps_r!==""){
        	   				info += "发送的音频码率："+real_a_bps_r+ "KB/秒<br/>";
        	   			}else{
        	   				info += "发送的音频码率：无<br/>";
        	   			}
        	   			if(sample_fps!=undefined&&sample_fps!=null&&sample_fps!==""){
        	   				info += "采样帧率："+sample_fps+ "帧/秒<br/>";
        	   			}else{
        	   				info += "采样帧率：无<br/>";
        	   			}
        	   			if(flash_adjust!=undefined&&flash_adjust!=null&&flash_adjust!==""){
        	   				info += "<b>调节点：</b><br/>"+flash_adjust;
        	   			}else{
        	   				info += "<b>调节点：</b><br/>无";
        	   			}
        	   			return info;
					},
					style : {
						color : '#00FF00',// 绿字
						fontSize : '12px'
					}
				},
				rangeSelector: {//控制顶部的时间快捷按钮
		        	enabled:true,
		            buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
			            type: 'minute',  
			            count: 1,  
			            text: '1分钟'  
			        },{  
			            type: 'minute',  
			            count: 5,  
			            text: '5分钟'  
			        }, {  
			            type: 'minute',  
			            count: 10,  
			            text: '10分钟'  
			        }, {  
			            type: 'minute',  
			            count: 20,  
			            text: '20分钟'  
			        }, {  
			            type: 'minute',  
			            count: 30,  
			            text: '30分钟'  
			        }, {  
			            type: 'minute',  
			            count: 45,  
			            text: '45分钟'  
			        }, {  
			            type: 'hour',  
			            count: 1,  
			            text: '1小时'  
			        }, {  
			            type: 'all',  
			            text: '所有' 
			        }],
			        buttonTheme: {
			        	width: 36,
			        	height: 16,
			        	padding: 1,
			        	r: 0,
			        	stroke: '#68A'
			        	//zIndex: 7
		        	},
		        	inputEnabled:false,//是否显示右上角的输入框
		        	inputBoxWidth:190,//右上角时间输入框的宽度
		        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
		        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
		            selected: 0//加载时以上定义button的index哪个被选中,从0开始  
		        }, 
				credits : {// 配置右下角版权链接
					enabled : false,
					href : 'http://www.butel.com/',
					text : 'Butel',
					style : {
						color : '#0000FF',
						fontSize : '19',
						fontWeight : 'bold'
					}
				},
				legend : {// 图例
					// 是否显示图例
					enabled : true,
					// 垂直排列
					layout : 'vertical',
					height:138,//定位上下位置
					// 靠右显示
					align : 'right',
					verticalAlign : 'bottom',//"top", "middle" or "bottom".
					borderWidth : 0
				},
				plotOptions:{//对于数据点的操作　
		        	column:{
		        		allowPointSelect:true,//允许柱形被选择
			        	//pointWidth:null,//每个柱形的宽度，默认是null，自动根据实际情况变化
		        		//pointRange:20,
			        	showCheckbox:false//图例旁显示复选框
		        	}
		        },
				xAxis : {
					//tickPixelInterval: 10,//x轴上的间隔  
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					height:310,
					type: 'datetime',//datetime
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S:%L'
		            }
				},
				yAxis : [{
						title : {
							text : '主叫方FlashSDK',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:2048,
						height : 90,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : 'CPU',
							data :cpu_caller,
							yAxis : 0

						},{
							type : 'spline',
							name : '内存',
							data :memory_caller,
							yAxis : 0

						},{
							type : 'spline',
							name : '发送的视频码率',
							data :real_v_bps_r_caller,
							yAxis : 0

						},{
							type : 'spline',
							name : '发送的音频码率',
							data :real_a_bps_r_caller,
							yAxis : 0

						},{
							type : 'spline',
							name : '采样帧率',
							data :sample_fps_caller,
							yAxis : 0

						},{
							type : 'scatter',
							name : '调节点',
							data : flash_adjust_caller,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'diamond'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}
					]
			});
}

/**
 * 被叫方RtmpServer
 */ 
function flashView_zb02() {			
	$('#flashAdjust_main_zb02').highcharts('StockChart', {
				exporting: {//右上角导出图片    
		            enabled: false//是否能导出趋势图图片  
		        },
		        navigation:{//对图表右上角的导出趋势图的菜单进行设置
			    	enabled:true,
			    	buttonOptions:{
				    	width:200,
				    	text:'导出'
			    	},
			    	menuStyle: {
			    		border: '1px solid #A0A0A0',
			    		background: '#FFFFFF'
			    	}
			    },
		        navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:140,
		        	xAxis: {
		        	    tickWidth: 0,//数据分段
		        	    lineWidth: 0,
		        	    gridLineWidth: 1,
		        	    tickPixelInterval: 100,
		        	    labels: {
		        	        align: 'left',
		        	        style: {
		        	            color: '#888'
		        	        },
		        	        x: 3,
		        	        y: -4
		        	    }
		        	}
		        },
		        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
		        	//enabled:false,
					height : 20,
					barBackgroundColor:'#2493F7',//滚动条背景色
					buttonBackgroundColor:'#F07600',//左右按钮的背景色
					buttonBorderColor:'#F07600'//左右按钮的边框色
				},
				tooltip : {// 标签提示框
					enabled : true,// 显示提示框
					backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
					crosshairs : true,// 鼠标经过时显示上下标尺线
					shared : true,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
					formatter : function() {//如果此项进行了设置，提示框的显示将按下面设置的显示，上面的xDateFormat失效
						var  now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
        	   			var maptime = splitTime(time).getTime();
        	   			var info = "";
        	   			var v_bps = flashCalledMap.get(maptime+"_v_bps");
        	   			var a_bps = flashCalledMap.get(maptime+"_a_bps");
        	   			var flash_lost = flashCalledMap.get(maptime+"_flash_lost");
        	   			
        	   			info += time + "<br/>";
        	   			
        	   			if(v_bps!=undefined&&v_bps!=null&&v_bps!==""){
        	   				info += "接收的视频码率："+v_bps+ "KB/秒<br/>";
        	   			}else{
        	   				info += "接收的视频码率：无<br/>";
        	   			}
        	   			if(a_bps!=undefined&&a_bps!=null&&a_bps!==""){
        	   				info += "接收的音频码率："+a_bps+ "KB/秒<br/>";
        	   			}else{
        	   				info += "接收的音频码率：无<br/>";
        	   			}
        	   			if(flash_lost!=undefined&&flash_lost!=null&&flash_lost!==""){
        	   				info += "<b>丢包事件：</b><br/>"+flash_lost;
        	   			}else{
        	   				info += "<b>丢包事件：</b><br/>无";
        	   			}
        	   			return info;
					},
					style : {
						color : '#00FF00',// 绿字
						fontSize : '12px'
					}
				},
				rangeSelector: {//控制顶部的时间快捷按钮
		        	enabled:true,
		            buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
			            type: 'minute',  
			            count: 1,  
			            text: '1分钟'  
			        },{  
			            type: 'minute',  
			            count: 5,  
			            text: '5分钟'  
			        }, {  
			            type: 'minute',  
			            count: 10,  
			            text: '10分钟'  
			        }, {  
			            type: 'minute',  
			            count: 20,  
			            text: '20分钟'  
			        }, {  
			            type: 'minute',  
			            count: 30,  
			            text: '30分钟'  
			        }, {  
			            type: 'minute',  
			            count: 45,  
			            text: '45分钟'  
			        }, {  
			            type: 'hour',  
			            count: 1,  
			            text: '1小时'  
			        }, {  
			            type: 'all',  
			            text: '所有' 
			        }],
			        buttonTheme: {
			        	width: 36,
			        	height: 16,
			        	padding: 1,
			        	r: 0,
			        	stroke: '#68A'
			        	//zIndex: 7
		        	},
		        	inputEnabled:false,//是否显示右上角的输入框
		        	inputBoxWidth:190,//右上角时间输入框的宽度
		        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
		        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
		            selected: 0//加载时以上定义button的index哪个被选中,从0开始  
		        }, 
				credits : {// 配置右下角版权链接
					enabled : false,
					href : 'http://www.butel.com/',
					text : 'Butel',
					style : {
						color : '#0000FF',
						fontSize : '19',
						fontWeight : 'bold'
					}
				},
				legend : {// 图例
					// 是否显示图例
					enabled : true,
					// 垂直排列
					layout : 'vertical',
					height:134,//定位上下位置
					// 靠右显示
					align : 'right',
					//verticalAlign : 'bottom',//"top", "middle" or "bottom".
					borderWidth : 0
				},
				plotOptions:{//对于数据点的操作　
		        	column:{
		        		allowPointSelect:true,//允许柱形被选择
			        	//pointWidth:null,//每个柱形的宽度，默认是null，自动根据实际情况变化
		        		//pointRange:20,
			        	showCheckbox:false//图例旁显示复选框
		        	}
		        },
				xAxis : {
					//tickPixelInterval: 10,//x轴上的间隔  
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					height:310,
					type: 'datetime',//datetime
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S:%L'
		            }
				},
				yAxis : [{
						title : {
							text : '被叫方RtmpServer',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:2048,
						height : 90,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : '接收的视频码率',
							data : v_bps_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '接收的音频码率',
							data : a_bps_called,
							yAxis : 0

						},{
							type : 'scatter',
							name : '丢包事件',
							data : flash_lost_called,
							marker : {  
			                   enabled : true,//显示曲线上的点  
			                   radius : 6,//曲线上点的大小
			                   symbol:'triangle'//triangle-down：箭头向下，triangle：箭头向上，square：方形，diamond：菱形，circle：圆点
			           		},
							yAxis : 0

						}
					]
			});
			
}
/**
 * 被叫方FlashSDK
 */ 
function flashView_zb03() {			
	$('#flashAdjust_main_zb03').highcharts('StockChart', {
				exporting: {//右上角导出图片    
		            enabled: false//是否能导出趋势图图片  
		        },
		        navigation:{//对图表右上角的导出趋势图的菜单进行设置
			    	enabled:true,
			    	buttonOptions:{
				    	width:200,
				    	text:'导出'
			    	},
			    	menuStyle: {
			    		border: '1px solid #A0A0A0',
			    		background: '#FFFFFF'
			    	}
			    },
		        navigator:{//图表底部的数据区域
		        	enabled:true,
		        	height:20,
		        	top:140,
		        	xAxis: {
		        	    tickWidth: 0,//数据分段
		        	    lineWidth: 0,
		        	    gridLineWidth: 1,
		        	    tickPixelInterval: 100,
		        	    labels: {
		        	        align: 'left',
		        	        style: {
		        	            color: '#888'
		        	        },
		        	        x: 3,
		        	        y: -4
		        	    }
		        	}
		        },
		        scrollbar : {// 处于图表底部数据区域下方的滚动条，带左右两个方向的箭头，大数据量时可以方便查看局部数据
		        	//enabled:false,
					height : 20,
					barBackgroundColor:'#2493F7',//滚动条背景色
					buttonBackgroundColor:'#F07600',//左右按钮的背景色
					buttonBorderColor:'#F07600'//左右按钮的边框色
				},
				tooltip : {// 标签提示框
					enabled : true,// 显示提示框
					backgroundColor: 'rgba(0,0,0,0.7)',//设置透明度，a的取值在0-1之间
					crosshairs : true,// 鼠标经过时显示上下标尺线
					shared : true,// 开启多图联动，各个图例的值同时显示设置为true,如想各个图例单独显示，设置为false
					xDateFormat: '%Y-%m-%d %H:%M:%S:%L',//鼠标移动到趋势线上时显示的日期格式  
					formatter : function() {//如果此项进行了设置，提示框的显示将按下面设置的显示，上面的xDateFormat失效
						var  now = new Date(this.x-8*60*60*1000);
						var time = "";
						time += now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
        	   			
    	   				//必须将时间转化为毫秒，否则key值不对应，取不出值，因为汇报的日志中日期格式是2015-02-05 15:06:52;012，而插件读取的界面时间是2015-2-5 15:6:52;012
						var maptime = splitTime(time).getTime();
        	   			var info = "";
        	   			var cpu = flashCalledMap.get(maptime+"_cpu");
        	   			var memory = flashCalledMap.get(maptime+"_memory");
        	   			var real_v_bps_l = flashCalledMap.get(maptime+"_real_v_bps_l");
        	   			var real_a_bps_l = flashCalledMap.get(maptime+"_real_a_bps_l");
        	   			var play_fps = flashCalledMap.get(maptime+"_play_fps");
        	   			var net_delay = flashCalledMap.get(maptime+"_net_delay");
        	   			
        	   			info += time + "<br/>";
        	   			
        	   			if(cpu!=undefined&&cpu!=null&&cpu!==""){
        	   				info += "CPU："+cpu+ "%<br/>";
        	   			}else{
        	   				info += "CPU：无<br/>";
        	   			}
        	   			if(memory!=undefined&&memory!=null&&memory!==""){
        	   				info += "内存："+ memory + "MB<br/>";
        	   			}else{
        	   				info += "内存：无<br/>";
        	   			}
        	   			if(real_v_bps_l!=undefined&&real_v_bps_l!=null&&real_v_bps_l!==""){
        	   				info += "接收的视频码率："+real_v_bps_l+ "KB/秒<br/>";
        	   			}else{
        	   				info += "接收的视频码率：无<br/>";
        	   			}
        	   			if(real_a_bps_l!=undefined&&real_a_bps_l!=null&&real_a_bps_l!==""){
        	   				info += "接收的音频码率："+real_a_bps_l+ "KB/秒<br/>";
        	   			}else{
        	   				info += "接收的音频码率：无<br/>";
        	   			}
        	   			if(play_fps!=undefined&&play_fps!=null&&play_fps!==""){
        	   				info += "播放帧率："+play_fps+ "帧/秒<br/>";
        	   			}else{
        	   				info += "播放帧率：无<br/>";
        	   			}
        	   			if(net_delay!=undefined&&net_delay!=null&&net_delay!==""){
        	   				info += "延时："+net_delay+"ms";
        	   			}else{
        	   				info += "延时：无";
        	   			}
        	   			return info;
					},
					style : {
						color : '#00FF00',// 绿字
						fontSize : '12px'
					}
				},
				rangeSelector: {//控制顶部的时间快捷按钮
		        	enabled:true,
		            buttons: [{//顶部时间快捷按钮的定义，下标从0开始  
			            type: 'minute',  
			            count: 1,  
			            text: '1分钟'  
			        },{  
			            type: 'minute',  
			            count: 5,  
			            text: '5分钟'  
			        }, {  
			            type: 'minute',  
			            count: 10,  
			            text: '10分钟'  
			        }, {  
			            type: 'minute',  
			            count: 20,  
			            text: '20分钟'  
			        }, {  
			            type: 'minute',  
			            count: 30,  
			            text: '30分钟'  
			        }, {  
			            type: 'minute',  
			            count: 45,  
			            text: '45分钟'  
			        }, {  
			            type: 'hour',  
			            count: 1,  
			            text: '1小时'  
			        }, {  
			            type: 'all',  
			            text: '所有' 
			        }],
			        buttonTheme: {
			        	width: 36,
			        	height: 16,
			        	padding: 1,
			        	r: 0,
			        	stroke: '#68A'
			        	//zIndex: 7
		        	},
		        	inputEnabled:false,//是否显示右上角的输入框
		        	inputBoxWidth:190,//右上角时间输入框的宽度
		        	inputDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框未获取焦点时，日期的显示格式
		        	inputEditDateFormat: '%Y-%m-%d %H:%M:%S:%L',//右上角时间输入框获取焦点时，日期的显示格式
		            selected: 0//加载时以上定义button的index哪个被选中,从0开始  
		        }, 
				credits : {// 配置右下角版权链接
					enabled : false,
					href : 'http://www.butel.com/',
					text : 'Butel',
					style : {
						color : '#0000FF',
						fontSize : '19',
						fontWeight : 'bold'
					}
				},
				legend : {// 图例
					// 是否显示图例
					enabled : true,
					// 垂直排列
					layout : 'vertical',
					height:134,//定位上下位置
					// 靠右显示
					align : 'right',
					//verticalAlign : 'bottom',//"top", "middle" or "bottom".
					borderWidth : 0
				},
				plotOptions:{//对于数据点的操作　
		        	column:{
		        		allowPointSelect:true,//允许柱形被选择
			        	//pointWidth:null,//每个柱形的宽度，默认是null，自动根据实际情况变化
		        		//pointRange:20,
			        	showCheckbox:false//图例旁显示复选框
		        	}
		        },
				xAxis : {
					//tickPixelInterval: 10,//x轴上的间隔  
					tickPosition:'inside',//X轴的分隔线的位置，朝上还是朝下，取值为“inside”,"outside"
					height:310,
					type: 'datetime',//datetime
					title:{
						text:"通话时间",
						align:"high"
					},
					dateTimeLabelFormats:{
		                second: '%H:%M:%S:%L'
		            }
				},
				yAxis : [{
						title : {
							text : '被叫方RtmpServer',
							align : 'high',
							offset : 18,// 偏移
							rotation : 0// 旋转
						},
						//top : 30,
						min:0,
					    //max:2048,
						height : 90,
						lineWidth : 1,
						opposite : false,// 图标题显示位置，为true时显示在右边
						offset : 0// 偏移
					}
				],
				series : [{
							type : 'spline',
							name : 'CPU',
							data : cpu_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '内存',
							data : memory_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '接收的视频码率',
							data : real_v_bps_l_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '接收的音频码率',
							data : real_a_bps_l_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '播放帧率',
							data : play_fps_called,
							yAxis : 0

						},{
							type : 'spline',
							name : '延时',
							data : net_delay_called,
							yAxis : 0

						}
					]
			});
			
}
