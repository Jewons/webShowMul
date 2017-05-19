/*通话详情callDetail.jsp页面中“带宽自适应调节”标签页面的JS效果 */
//“带宽自适应调节”页面数据填充

$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#bandwithAdaptive01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.bandwithAdaptive_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.bandwithAdaptive_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});
		
/**
 * “带宽自适应调节”标签页，被叫端数据视图
 * @param {} data
 */
function bandwithAdaptive_bzView(){
// 路径配置
		require.config({
			paths : {
				echarts : 'echarts-2.1.10/build/dist'
			}
		});

		// 使用
		require([ 'echarts', 
		          'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
				  'echarts/chart/line',
				  'echarts/chart/k',
				  'echarts/chart/scatter'
				  ], 
		function(ec) {

			var axisData = [ '2014-12-26 9:34:40:365', '2014-12-26 9:35:00:365', '2014-12-26 9:35:20:365','2014-12-26 9:35:40:365', '2014-12-26 9:36:00:365', 
			                 '2014-12-26 9:36:20:365', '2014-12-26 9:36:40:365','2014-12-26 9:37:00:365', '2014-12-26 9:37:20:365', '2014-12-26 9:37:40:365'];
			//var axisData = [ "2014-12-26-9:34:40:365", "2014-12-26-9:35:00:365", "2014-12-26-9:35:20:365","2014-12-26-9:35:40:365", "2014-12-26-9:36:00:365", 
			//                 "2014-12-26-9:36:20:365", "2014-12-26-9:36:40:365","2014-12-26-9:37:00:365", "2014-12-26-9:37:20:365", "2014-12-26-9:37:40:365"];
			//var axisData = [ "2013/1/24 ", "2013/1/25", "2013/1/28",	"2013/1/29", "2013/1/30", "2013/1/31", "2013/2/1","2013/2/4", "2013/2/5", "2013/2/6"];

			//散点图注意事项：xAxis的data要包含series中的data数组的所有时间，这样xAxis的type就可以用"category"，否则只能用"value"，而类似于“2014-12-26 9:35:00:365”并不是value形式，会导致散点图无法显示
			option1 = {
				title : {
					text : '本次通话带宽自适应调节过程记录图',
					x : 'center'
				},
				
				tooltip : {
					trigger : 'axis',//axis,item
	                showDelay : 0,
	                axisPointer:{
			            type : 'cross',//十字线
			            show:false,
			            lineStyle: {
			               type : 'dashed',//虚线
			               width : 1
			            }
			        },
	                formatter : function (params) {
	                	//console.info(params[0].name);
	                	if(params[0].value[1]==1){
	                		return "道路切换，"+switchinfoMap.get(params[0].name+"_1_bz");
	                	}
	                	if(params[0].value[1]==2){
	                		return "浪涌，"+switchinfoMap.get(params[0].name+"_2_bz");
	                	}
	                },
	                textStyle:{
						align:'left'
					}
				},
				legend : {
					show:false,
					data : [ '道路切换','浪涌'],
					x : 'right',//靠右显示
					y:'bottom',//图例靠下显示
					orient : 'vertical',//垂直排列
					selectedMode:false
				},
				
				grid : {
					x : 80,
					y : 40,
					x2 : 150,
					y2 : 30
				},
				dataZoom : {//底部滚动条数据区域缩放
					show : false,//不显示滚动条
					realtime : false,//缩放变化是否实时显示图形的变化数据
					start : 0,
					end : 100
				},
				xAxis : [ {
					type : 'category',
					name:'时间',
					position : 'bottom',
					boundaryGap : true,
					axisLabel : {
						show : true
					},
					axisTick : {
						onGap : true
					},
					splitLine : {
						show : true
					},
					data:pathSwitch_audioOverFlowTime_bz
					//data:scatterTime
				} ],
				yAxis : [ {
					type : 'value',
					name:'道路切换/浪涌',
					position:'left',
					scale : true,
					min:0,
					max:2,
					splitNumber : 2,///分割段数，不指定时根据min、max算法调整。 
					boundaryGap : [ 0.05, 0.05 ],
					axisLabel : {
						show:false
						//formatter : '{value}'
					},
					splitArea : {
						show : true
					},
					splitLine:{
						show : true
					}
				} ],
				series : [ {
					type:'scatter',
					symbol: 'arrow',
					symbolSize : 10,
					data:(function(){
		            	var oldArr = pathSwitch_audioOverFlowData_bz;
		            	//var oldArr = scatter03Arr;
		            	var newArr = [];
		            	var length = oldArr.length;
		            	for(var i=0; i<length; i++){
		            		if(oldArr[i][1]==1){
		            			newArr.push({//道路切换
		            				value:oldArr[i],
		            				symbol: 'arrow',
					            	symbolSize : 10
		            			});
		            		}else{
		            			newArr.push({//音频溢出
		            				value:oldArr[i],
		            				symbol: 'droplet',
					            	symbolSize : 7
		            			});
		            		}
		            	}
		            	return newArr;
		            })()
				}
				/*
				,{
					name : '音频溢出',
					type:'scatter',
					symbol: 'droplet',
					symbolSize : 10,
		            data:scatter02Arr
				}*/
			     /*      
		           {
					name : '道路切换/音频是否溢出',
					type:'scatter',
					//symbol: 'arrow',
		            tooltip : {
		                trigger: 'axis',
		                showDelay : 0,
		                axisPointer:{
				            type : 'cross',//十字线
				            lineStyle: {
				               type : 'dashed',//虚线
				               width : 1
				            }
				        },
		                formatter : function (params) {
		                    if (params.value==1) {
		                        return 'aa';
		                    }
		                    else {
		                        return 'bb';
		                    }
		                }
		            },
		            data:switchAndAudioArr
		            
					
		            data:(function(){
		            	var oldArr = switchAndAudioArr;
		            	var newArr = [];
		            	var length = oldArr.length;
		            	for(var i=0; i<length; i++){
		            		if(oldArr[i][1]==1){
		            			newArr.push({//道路切换
		            				value:[oldArr[i][1],1],
		            				symbol: 'arrow',
					            	symbolSize : 15
		            			});
		            		}else{
		            			newArr.push({//音频溢出
		            				value:[oldArr[i][1],2],
		            				symbol: 'droplet',
					            	symbolSize : 10
		            			});
		            		}
		            	}
		            	return newArr;
		            })(),
				} */
		           ]
			};
			
			option2 = {
				tooltip : {
					trigger : 'axis',//axis,item
					showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
					//单独设置，因为“自适应调节的散点图不需要显示数值”
					formatter:function(params){
						//console.info(params[0].name);
						var info = "";
						//if(params[5].value[1]==2000){
							//info += "符号★所在的位置说明此处发生了自适应调节";
							//return info;
						//}
						
						info += params[0].name +'(为了准备定位，请将鼠标放到“等级”图上左右移动操作)<br/>';
						info += "注：因计算比例时涉及到5个柱形的数据，只有当它们都显示时才可正常取值，请勿关闭。<br/>";
						var adjust_count = BandwidthMap_bz.get(params[0].name);
						if(adjust_count!=undefined&&adjust_count!=null&&adjust_count!==""){
							info += adjust_count+"<br/>";
						}
						
						if(params[0].seriesName!=undefined&&params[0].seriesName!=null&&params[0].seriesName!==""){
							//端到端带宽
							info += "【"+params[0].seriesName+' : '+params[0].value ;
						}
						if(params[0].seriesName!=undefined&&params[0].seriesName!=null&&params[0].seriesName!==""
						&&params[1].seriesName!=undefined&&params[1].seriesName!=null&&params[1].seriesName!==""
						&&params[2].seriesName!=undefined&&params[2].seriesName!=null&&params[2].seriesName!==""){
							//带宽利用率
							info += '，带宽利用率 : '+rate(parseInt(params[2].value),params[0].value) +'%】<br/>';
						}
						if(params[1].seriesName!=undefined&&params[1].seriesName!=null&&params[1].seriesName!==""){
							//冗余带宽
							info += "【"+params[1].seriesName+' : '+params[1].value ;
						}
						if(params[1].seriesName!=undefined&&params[1].seriesName!=null&&params[1].seriesName!==""
						&&params[2].seriesName!=undefined&&params[2].seriesName!=null&&params[2].seriesName!==""){
							//冗余带宽比例
							info += '，比例 : '+rate(params[1].value,parseInt(params[2].value)) +'%】 ';
						}
						if(params[2].seriesName!=undefined&&params[2].seriesName!=null&&params[2].seriesName!==""){
							//有效上行带宽
							info += "【"+params[2].seriesName+' : '+params[2].value ;
						}
						if(params[1].seriesName!=undefined&&params[1].seriesName!=null&&params[1].seriesName!==""
						&&params[2].seriesName!=undefined&&params[2].seriesName!=null&&params[2].seriesName!==""){
							info += "】<br/>";
							//info += '，比例 : '+rate(params[2].value,(parseInt(params[1].value)+parseInt(params[2].value))) +'%】<br/>';
						}
						if(params[3].seriesName!=undefined&&params[3].seriesName!=null&&params[3].seriesName!==""){
							//FEC后音频带宽
							info += "【"+params[3].seriesName+' : '+params[3].value ;
						}
						if(params[3].seriesName!=undefined&&params[3].seriesName!=null&&params[3].seriesName!==""
						&&params[4].seriesName!=undefined&&params[4].seriesName!=null&&params[4].seriesName!==""){
							//音频带宽比例
							info += '，比例 : '+rate(params[3].value,(parseInt(params[3].value)+parseInt(params[4].value))) +'%】 ';
						}
						if(params[4].seriesName!=undefined&&params[4].seriesName!=null&&params[4].seriesName!==""){
							//FEC后视频带宽
							info += "【"+params[4].seriesName+' : '+params[4].value ;
						}
						if(params[3].seriesName!=undefined&&params[3].seriesName!=null&&params[3].seriesName!==""
						&&params[4].seriesName!=undefined&&params[4].seriesName!=null&&params[4].seriesName!==""){
							//视频带宽比例
							info += '，比例 : '+rate(params[4].value,(parseInt(params[3].value)+parseInt(params[4].value)))+'%】';
						}
						
						return info;
					},
					textStyle:{
						align:'left'
					}
				},
				toolbox : {
					show : true,//是否启动工具箱功能
					x:'left',
					feature : {
						mark : {
							show : false//辅助线
						},
						dataZoom : {
							show : false//区域缩放
						},
						dataView : {
							show : false,//数据视图
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' , 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				legend : {
					data : [ '端到端带宽', '冗余带宽','有效上行带宽','FEC后音频带宽','FEC后视频带宽','自适应调节点'],
					x : 'right',//靠右显示
					y:'bottom',//图例靠下显示
					orient : 'vertical',//垂直排列
					selectedMode:true					
				},
				
				grid : {
					x : 80,//图形距左边缘的距离
					y : 50,//图形距上边缘的距离
					x2 : 150,//图形距右边缘的距离
					y2 : 3
				//图形距下边缘的距离
				},
				dataZoom : {//底部滚动条数据区域缩放
					show : false,//不显示滚动条
					realtime : false,//缩放变化是否实时显示图形的变化数据
					start : 0,
					end : 100
				},
				xAxis : [ {
					type : 'category',
					position : 'bottom',
					boundaryGap : true,
					axisLabel : {
						show : true
					},//是否显示横轴文本标签
					axisTick : {
						onGap : false
					},
					splitLine : {
						show : false
					},
					data : bandAdaptiveTimeArr_bz					
				} ],
				yAxis : [ {
					name:'带宽(kbps)',
					type : 'value',
					scale : true,
					min:0,
					//max:2048,
					splitNumber:4,
					boundaryGap : [ 0.05, 0.05 ],
					splitArea : {
						show : true
					}
				} ],
				series : [
						{
							name : '端到端带宽',
							type : 'bar',
							data : etoe_bwYArr_bz
						},{
							name : '冗余带宽',
							type : 'bar',
							data : redund_up_bwYArr_bz
						},{
							name : '有效上行带宽',
							type : 'bar',
							data : valid_up_bwYArr_bz
						},{
							name : 'FEC后音频带宽',
							type : 'bar',
							data : audio_bw_fYArr_bz
						},{
							name : 'FEC后视频带宽',
							type : 'bar',
							data : video_bw_fYArr_bz
						},{
							name : '自适应调节点',
							type : 'scatter',
							symbol: 'star',
							symbolSize:10,//大小
							//symbolRotate:-180,//旋转角度
							data : adaptivePoint_bz
						}
				]
			};
			option3 = {
				
				tooltip : {
					trigger : 'axis',
					showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
					textStyle:{
						align:'left'
					}
				},
				legend : {
					data : [ '通话等级','视频fec等级','音频fec等级'],
					x : 'right',//靠右显示
					y:'bottom',//图例靠下显示
					orient : 'vertical',//垂直排列
					selectedMode:true
				},
				toolbox : {//工具箱
					y:-30,
					show : true,//是否启动工具箱功能
					feature : {
						mark : {
							show : true
						},
						dataZoom : {
							show : true
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ,'scatter', 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				
				grid : {
					x : 80,//图形距左边缘的距离
					y : 20,//图形距上边缘的距离
					x2 : 150,//图形距右边缘的距离
					y2 : 3
				//图形距下边缘的距离
				},
				dataZoom : {//底部滚动条数据区域缩放
					show : false,//不显示滚动条
					realtime : false,//缩放变化是否实时显示图形的变化数据
					start : 0,
					end : 100
				},
				xAxis : [ {
					type : 'category',
					position : 'bottom',
					boundaryGap : true,
					axisLabel : {
						show : true
					},//是否显示横轴文本标签
					axisTick : {
						onGap : false
					},
					splitLine : {
						show : false
					},
					data : bandAdaptiveTimeArr_bz
				} ],
				yAxis : [ {
					name:'等级',
					type : 'value',
					scale : true,
					min:0,
					max:6,
					splitNumber : 6,
					boundaryGap : [ 0.05, 0.05 ],
					splitArea : {
						show : true
					}
				} ],
				series : [
						{
							name:'通话等级',
							type:'bar',
							data : trans_level_idArr_bz
						},{
							name:'视频fec等级',
							type:'bar',
							data : video_redundent_levArr_bz
						},{
							name:'音频fec等级',
							type:'bar',
							data : audio_redundent_levArr_bz
						}
				]
			};

			option4 = {
				tooltip : {
					trigger : 'axis',
					showDelay : 0,
					formatter:function(params){
						//console.info(params[0].value);
						var info = "";
						info += params[0].name+"<br/>";
						
						var audio_videoCodeRate = audio_videoMap_bz.get(params[0].name);
						if(audio_videoCodeRate==undefined||audio_videoCodeRate==null||audio_videoCodeRate===""){
							audio_videoCodeRate = "刚开始呼叫，此时还未上报丢包率数据";
						}else{
							info += params[0].seriesName+':'+params[0].value +'%，'+//视频原始丢包率
							params[1].seriesName+':'+params[1].value +'%<br/>'+//视频fec纠错后丢包率
							params[2].seriesName+':'+params[2].value +'%，'+//音频原始丢包率
							params[3].seriesName+':'+params[3].value+'%<br/>';//音频fec纠错后丢包率		
						}
						info += audio_videoCodeRate;
						return info;
					},
					textStyle:{
						align:'left'
					}
			
				// 显示延迟，添加显示延迟可以避免频繁切换，单位ms
				},
				legend : {
					data : [ '视频原始丢包率','视频fec纠错后丢包率','音频原始丢包率','音频fec纠错后丢包率'],
					x : 'right',//靠右显示
					y:'bottom',//图例靠下显示
					orient : 'vertical',//垂直排列
					selectedMode:true
				},
				toolbox : {
					y:-30,
					show : true,//是否启动工具箱功能
					feature : {
						mark : {
							show : true
						},
						dataZoom : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ,'scatter', 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				grid : {
					x : 80,
					y : 20,
					x2 : 150,
					y2 : 3
				},
				dataZoom : {//底部滚动条数据区域缩放
					show : false,//不显示滚动条
					realtime : false,//缩放变化是否实时显示图形的变化数据
					start : 0,
					end : 100
				},
				xAxis : [ {
					type : 'category',

					position : 'bottom',
					boundaryGap : true,
					axisLabel : {
						show : true
					},
					axisTick : {
						onGap : false
					},
					splitLine : {
						show : false
					},
					data : bandAdaptiveTimeArr_bz
				} ],
				yAxis : [ {
					name:'丢包率(%)',
					type : 'value',
					scale : true,
					//min:0,
					//max:100,
					splitNumber : 5,
					boundaryGap : [ 0.05, 0.05 ],
					axisLabel : {
						formatter : '{value}'
					},
					splitArea : {
						show : true
					}
				} ],
				series : [ {
					name : '视频原始丢包率',
					type : 'line',
					symbol : 'star',
					data : video_lose_bYArr_bz
					
				} ,{
					name : '视频fec纠错后丢包率',
					type : 'line',
					symbol : 'star',
					data : video_lose_fYArr_bz
					
				},{
					name : '音频原始丢包率',
					type : 'line',
					symbol : 'star',
					data : audio_lose_bYArr_bz
					
				} ,{
					name : '音频fec纠错后丢包率',
					type : 'line',
					symbol : 'star',
					data : audio_lose_fYArr_bz
				}]
			};
			
			option5 = {
				tooltip : {
					trigger : 'axis',
					showDelay : 0,
					textStyle:{
						align:'left'
					},
					formatter:function(params){
						var info = "";
						info += params[0].name+"<br/>";
						
						var delay = delayMap_bz.get(params[0].name);
						if(delay==undefined||delay==null||delay===""){
							info += "刚开始呼叫，此时还未上报延时数据";
						}else{
							info += params[0].seriesName+':'+params[0].value+'ms';//延时
						}
						return info;
					}
				// 显示延迟，添加显示延迟可以避免频繁切换，单位ms
				},
				legend : {
					data : ['延时'],
					x : 'right',//靠右显示
					y:'bottom',//图例靠下显示
					orient : 'vertical',//垂直排列
					selectedMode:false
				},
				toolbox : {
					y:-30,
					show : true,//是否启动工具箱功能
					feature : {
						mark : {
							show : true
						},
						dataZoom : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ,'scatter', 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				grid : {
					x : 80,
					y : 20,
					x2 : 150,
					y2 : 40
				},
				dataZoom : {//底部滚动条数据区域缩放
					orient : 'horizontal',//布局方式，默认为水平布局，可选为：'horizontal' | 'vertical' 
					show : true,
					realtime : false,//缩放变化是否实时显示图形的变化数据，实时显示时页面会卡，所以不让实时显示，当鼠标按键松开时再显示数据
					start : 0,
					end : 100,
					height:15,
					fillerColor : '#2493F7',//滚动条背景色
					dataBackgroundColor : '#8BB9CA',//数据背景色
					handleColor : '#F07600',
					showDetail : true
				//缩放变化是否显示定位详情。 
				},
				xAxis : [ {
					type : 'category',
					//splitNumber:9,
					position : 'bottom',
					rotate: 70,
					boundaryGap : true,
					axisLabel : {//是否显示各点的值
						show : true
					},
					axisTick : {//坐标轴小标记，默认不显示
						onGap : false
					},
					splitLine : {//分隔线，默认显示
						show : false
					},
					splitArea:{//分隔区域，默认不显示
						show:false
					},
					data : bandAdaptiveTimeArr_bz,
					name : '时间',//只能显示两个字节
					nameLocation : 'end'
				} ],
				yAxis : [ {
					name:'延时(ms)',
					type : 'value',
					scale : true,
					//min:0,
					//max:1000
					splitNumber : 1
				} ],
				series : [ {
					name : '延时',
					type : 'line',
					symbol : 'star',
					data : delayYArr_bz
					
				}
				]
			};

			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('bandAdaptive_main1_bz'));
			var myChart2 = ec.init(document.getElementById('bandAdaptive_main2_bz'));
			var myChart3 = ec.init(document.getElementById('bandAdaptive_main3_bz'));
			var myChart4 = ec.init(document.getElementById('bandAdaptive_main4_bz'));
			var myChart5 = ec.init(document.getElementById('bandAdaptive_main5_bz'));
			// 为echarts对象加载数据 
			myChart1.setOption(option1);
			myChart2.setOption(option2);
			myChart3.setOption(option3);
			myChart4.setOption(option4);
			myChart5.setOption(option5);

			myChart2.connect([myChart3,myChart4,myChart5]);
			myChart3.connect([myChart2,myChart4,myChart5]);
			myChart4.connect([myChart2,myChart3,myChart5]);
			myChart5.connect([myChart2,myChart3,myChart4]);

			setTimeout(function() {
				window.onresize = function() {
					myChart1.resize();
					myChart2.resize();
					myChart3.resize();
					myChart4.resize();
					myChart5.resize();
				};
			}, 200);

		});
}
