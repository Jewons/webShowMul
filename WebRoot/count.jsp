<%@ page language="java" import="java.util.*,java.net.InetAddress" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<base href="<%=basePath%>" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Butel视频会议分析和统计查询系统</title>
		<meta http-equiv="pragma" content="no-cache"/>
		<meta http-equiv="cache-control" content="no-cache"/>
		<meta http-equiv="expires" content="0"/>  
		
		<link href="css/general.css" rel="stylesheet" type="text/css" />
		<link href="css/count.css?<%=new Date().getTime()%>" rel="stylesheet" type="text/css" />
		
		<script src="js/jquery-1.6.1.min.js" type="text/javascript"></script>
		<script src="js/count.js?<%=new Date().getTime()%>" type="text/javascript"></script>
		<script src="js/map.js" type="text/javascript"></script>
		<script src="js/util.js?<%=new Date().getTime()%>" type="text/javascript"></script>
		<script src="js/newViewModel.js?<%=new Date().getTime()%>" type="text/javascript"></script>
		<script src="js/SortTable.js" type="text/javascript"></script>
		<!-- 日历插件 -->
		<script src="My97DatePicker/WdatePicker.js" type="text/javascript" ></script>
	 
		<script type="text/javascript" charset="utf-8">
			$(function(){
			  $(".sortable tr:odd").css("background-color","#00ff00");
			  $(".sortable tr:even").css("background-color","#0000ff");
			});
			
			$(function () {
				//获取所有的查询框
				var tabContainers = $('div.tabs > form >div');
				//隐藏所有的查询框，初始时显示第一个查询框
				tabContainers.hide().filter(':first').show();
				
				$('div.tabs ul.tabNavigation a').click(function () {
					//$('.allSearchDiv').css({display:'none'});//不显示最下面的查询按钮
					//显示单个标签下的查询框
					$('.subbtn').removeClass('subbtn1');
					//单独标签显示时，宽度自适应
					$('#second > table,#third > table,#forth > table,#fiveth > table,#sexth > table,#seventh > table,#eightth > table,#nineth > table,#tenth > table,#eleventh > table').removeClass('newTable');
					tabContainers.hide();//隐藏所有查询框
					tabContainers.filter(this.hash).show();//显示当前标签的查询框
					//将ul下所有标签的类名移除
					$('div.tabs ul.tabNavigation a').removeClass('selected');
					//为当前点击的标签设置类名
					$(this).addClass('selected');
					return false;
				}).filter(':first').click();
				
				/*****************星号之间的部分逻辑复杂些，作用：点击“高级”按钮展开/合并时显示当前的单独查询框************************/
				var array = new Array();
				array[0] = "#first";
				array[1] = "#second";
				array[2] = "#third";
				array[3] = "#forth";
				array[4] = "#fiveth";
				array[5] = "#sexth";
				array[6] = "#seventh";
				array[7] = "#eightth";
				array[8] = "#nineth";
				array[9] = "#tenth";
				array[10] = "#eleventh";
				
				var flag = 0;
				//var flag2 = 0;
				//单击“高级”按钮
				$('#highBut').click(function(){
					var num = 0;//num每次点击都要置零
					for(var i=0;i<array.length;i++){
						if($(array[i]).css('display')=='block'){
							flag = i;//取得点击“高级”前哪一个标签处于显示状态
							//num++;//如果是在展开前判断，num肯定为1
						}
					}
					//if(num==1){
					//	flag2 = flag;
					//}
					$(array[flag]).hide();
					
					tabContainers.toggle();
					
					//当展开时，不显示单个查询标签的查询按钮
					if($('.subbtn').hasClass('subbtn1')){
						$('.subbtn').removeClass('subbtn1');
					}else{
						$('.subbtn').addClass('subbtn1');
					}
					
					//所有查询框div样式，点击高级前只显示一个，点击高级后显示所有
					//单独标签时，表格宽度定长，占据满屏
					//点击“高级”后，宽度根据内容自适应
					//因为第一个标签刚加载页面时就已经显示，所以只能用除了第一个标签以外的其它标签判断(不包括“高级”标签)
					if($('#second > table').hasClass('newTable')){
						$('#second > table,#third > table,#forth > table,#fiveth > table,#sexth > table,#seventh > table,#eightth > table,#nineth > table,#tenth > table,#eleventh > table').removeClass('newTable');
					}else{
						$('#second > table,#third > table,#forth > table,#fiveth > table,#sexth > table,#seventh > table,#eightth > table,#nineth > table,#tenth > table,#eleventh > table').addClass('newTable');
					}
				});
			});
		</script>
	</head>
	   <body style="background-image:url(images/bg.jpg);padding:5px;"> 
	 
		<div class="layer"></div>
		<center>
			<table class="allTable" width="1320px" border="1" style="border-color:#CFBCAA;">
				<tr>
					<td align="center">
						<br/>
						<h1><font style="color: RGB(51, 158, 53);">Butel视频会议分析统计查询系统</font></h1>
						<br/>
					</td>
				</tr>
				<tr>
					<td>
						<div class="tabs">
					        <ul class="tabNavigation">
					            <li><a href="#first">标识</a></li>
<!-- 					            <li><a href="#second">视频流统计</a></li> -->
<!-- 					           	<li><a href="#forth">音频流统计</a></li> -->
					            <!--<li><a href="#third">质量</a></li>-->
					            <li><a href="#seventh">参会人数</a></li>
					            <!--<li><a href="#fifth">空心包</a></li>-->
					            <li><a href="#sixth">时间</a></li>
					            <%--
					            <li><a href="#eightth">U-R</a></li>
					            <li><a href="#nineth">参数</a></li>
					            <li><a href="#tenth">异常</a></li>
					            <li><a href="#eleventh">挂断原因</a></li>
					            --%>
								<li><a href="" id="highBut">高级查询</a></li>
								<%--<input type="button" value="高级查询" id="highBut"/>
					        --%></ul>
					        <div id="zero">
					        	<!-- 通用 -->
					        	<table class="topzero">
					        		<tr>
					        			<td>
											开始时间：
										</td>
										<td>
											<input type="text" class="Wdate" readonly="readonly"
												onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
												id="startTime" onblur="removeRadio()" value="1970-01-01 08:00:00"/>
										</td>
										<td>
											&nbsp;&nbsp;结束时间：
										</td>
										<td>
											<input type="text" class="Wdate" readonly="readonly"
												onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"
												id="endTime" onblur="removeRadio()" value="1970-01-01 08:00:10"/>
										</td>
										<td>&nbsp;											
											<input type="radio" name="timeradio" id="radioFirst" value="30"/>最近0.5小时
											<input type="radio" name="timeradio" id="radioSecond" value="60"/>最近1小时
											<input type="radio" name="timeradio" id="radioThird" value="90"/>最近1.5小时
											<input type="radio" name="timeradio" id="radioFourth" value="120"/>最近2小时
											<input type="radio" name="timeradio" id="radioSixth" value="1440"/>最近一天
											<input type="radio" name="timeradio" id="radioFifth" value="10080"/>一周以内
											&nbsp;											
										</td>
										<td>&nbsp;
											<input type="button" onclick="makeReport()" value="导出报告"/>
<%--											<input type="button" onclick="makeDetailData()" value="导出详细数据"/>--%>
                                           <input type="button" onclick="makeMarketClientData()" value="导出销售报告"/>
										</td>
					        		</tr>
					        		<tr><td></td><td></td><td></td><td></td>
					        			<td style="color:red;">
					        			&nbsp;&nbsp;手动设置“开始时间”和“结束时间”，上方快捷按钮将失效，如需使用请重新点击
					        			</td>
					        		</tr>					        		
					        	</table>
					        </div>
					        <%-- 
					        <div class="reporttypeBt" style="border:#000000;">
					        	<input type="radio" name="directionType" value="2" checked="checked"/>全部
					        	<input type="radio" name="directionType" value="0"/>上行
					        	<input type="radio" name="directionType" value="1"/>下行
					        </div>
					        --%>
					        <form action="" method="post">
						        <div id="first">
						           <!-- 标识 -->
						           <div class="hightitle">标识</div>
						           <table class="oldTable">
									 <tr>
										<td width="35%">
										    userId:
											<input type="text" id="aboutIDuser"/>
											 公司名称:
											<input type="text" id="aboutCompanyName"/>
										</td>
										<td>
											会议号：
											<input type="text" id="aboutIDmeeting" />
										</td>
										<td>
										    RelayId:
										    <input type="text" id="aboutIDRelay" />
										</td>
										<td class="subbtn" width="180px">
											<input type="reset" class="selectreset" value="重置" />
											&nbsp;
											<input type="button" id="aboutIDsubmit" value="查询" />
											<!-- <input type="button" id="getError" value="错误数据"/> -->
										</td>
									 </tr>
								   </table>
						        </div>
						        <%-- 
						        <div id="second">
						            <!-- 流统计 -->
						        	<div class="hightitle">视频流统计</div>
						   			<table class="oldTable">
										<tr>
											<td>
												上行原始丢包率：
												<select id="aboutStreamUpVideoLostBefore">
													<option value="">不限</option>
													<option value="<,500">小于5%</option>
													<option value="500,1000">5%-10%</option>
													<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												上行fec丢包率：
											<select id="aboutStreamUpVideoLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												上行最终丢包率：
											<select id="aboutStreamUpVideoLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行原始丢包率：
												<select id="aboutStreamDownVideoLostBefore">
													<option value="">不限</option>
													<option value="<,500">小于5%</option>
													<option value="500,1000">5%-10%</option>
													<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行fec丢包率：
											<select id="aboutStreamDownVideoLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行最终丢包率：
											<select id="aboutStreamDownVideoLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体原始丢包率：
												<select id="aboutStreamVideoLostBefore">
													<option value="">不限</option>
													<option value="<,500">小于5%</option>
													<option value="500,1000">5%-10%</option>
													<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体fec丢包率：
											<select id="aboutStreamVideoLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体最终丢包率：
											<select id="aboutStreamVideoLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
												&nbsp;
												<input type="button" id="aboutVideoStreamsubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>
						        --%>
						        <%-- 
						        <div id="third">
						        	<!-- 质量 -->
						        	<div class="hightitle">质量</div>
						            <table class="oldTable">
										<tr>
											<td>
												帧率：
												<select id="aboutFrameRate">
													<option value="">不限</option>
													<option value="<,10">小于10</option>
													<option value="10，15">10-15</option>
													<option value=">,15">大于15</option>
												</select>
											</td>
									         <td>
												时延：
												<select id="aboutDelay">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value="11,20">11-20</option>
													<option value=">,20">大于20</option>
												</select>
											</td>
											 <td>
												CPU使用率：
												<select id="aboutCpuRate">
													<option value="">不限</option>
													<option value="<,40">小于40</option>
													<option value="40,60">40-60</option>
													<option value="61,80">61-80</option>
													<option value=">,80">大于80</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
												&nbsp;
												<input type="button" id="aboutQualitysubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>
						        --%>  						       
						        <div id="seventh">
						            <!-- 人数 -->
						            <div class="hightitle">人数</div>
						            <table class="oldTable">
										<tr>
											<td>
												参会人数：
												<select id="aboutAttendCount">
													<option value="">不限</option>
													<option value="<,2">小于2</option>
													<option value="2,10">2-10</option>
													<option value="10,20">10-20</option>
													<option value=">,20">大于20</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
												&nbsp;
												<input type="button" id="aboutAttendCountsubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>
						        <%-- 
						        <div id="fifth">
						        	<!-- 空心包 -->
						        	<div class="hightitle">空心包</div>
						            <table class="oldTable">
										<tr>
											<td>
												一个空心包次数：
												<select id="aboutOneEmpty">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value=">,10">大于10</option>
												</select>
											</td>
											<td>
												连续2个空心包次数：
												<select id="aboutTwoEmpty">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value=">,10">大于10</option>
												</select>
											</td>
											<td>
												连续3个空心包次数：
												<select id="aboutThreeEmpty">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value=">,10">大于10</option>
												</select>
											</td>
											<td>
												连续4到10个空心包次数：
												<select id="aboutFourEmpty">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value=">,10">大于10</option>
												</select>
											</td>
											<td>
												连续10个以上空心包次数：
												<select id="aboutTenEmpty">
													<option value="">不限</option>
													<option value="<,5">小于5</option>
													<option value="5,10">5-10</option>
													<option value=">,10">大于10</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
													&nbsp;
												<input type="button" id="aboutEmptyPackagesubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>						        
						        --%>
						        <div id="sixth">
						            <!-- 人数 -->
						            <div class="hightitle">会议时长</div>
						            <table class="oldTable">
										<tr>
											<td>
												会议时长：
												<select id="aboutTimeduraction">
													<option value="">不限</option>
													<option value="<,300">小于5分钟</option>
													<option value="300,1800">5分钟-30分钟</option>
													<option value=">,1800">大于30分钟</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
												&nbsp;
												<input type="button" id="abouttimesubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>
						        <%--
						        <div id="forth">
						            <!-- 音频 -->
						            <div class="hightitle">音频流统计</div>
						            <table class="oldTable">
										<tr>
											<td>
												上行原始丢包率：
											<select id="aboutStreamUpAudioLostBefore">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												上行fec丢包率：
											<select id="aboutStreamUpAudioLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												上行最终丢包率：
											<select id="aboutStreamUpAudioLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行原始丢包率：
											<select id="aboutStreamDownAudioLostBefore">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行fec丢包率：
											<select id="aboutStreamDownAudioLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												下行最终丢包率：
											<select id="aboutStreamDownAudioLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体原始丢包率：
											<select id="aboutStreamAudioLostBefore">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体fec丢包率：
											<select id="aboutStreamAudioLostAfter">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td>
												整体最终丢包率：
											<select id="aboutStreamAudioLostFinal">
												<option value="">不限</option>
												<option value="<,500">小于5%</option>
												<option value="500,1000">5%-10%</option>
												<option value=">,1000">大于10%</option>
												</select>
											</td>
											<td class="subbtn" width="150px">
												<input type="reset" class="selectreset" value="重置" />
												&nbsp;
												<input type="button" id="aboutAudioStreamsubmit" value="查询" />
											</td>
										</tr>
									</table>
						        </div>
						        --%>
						        <div class="allSearchDiv">
						        	<input type="reset" class="selectreset" value="重置"/>
						        	&nbsp;
						        	<input type="button" id="allSearch" value="查询"/>
						        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						        </div>
					        </form>
					    </div>
					</td>
				</tr>
				<tr>
					<td>
						<div id="section_qualified"></div>
						<div id="selectcontent">
							<%--<h1>查询内容显示在此</h1>
							--%>
						</div>
					</td>
				</tr>
			</table>
			    <br/>
				<font style="font-size:22px;text-align: center;">友情提示：为保证最佳页面效果，请使用Firefox(火狐浏览器)</font>
				<img style="width:39px;height:50px;" src="images/firefox.jpg"></img><br/>
				<div id="version"></div>
				<%
				String url = request.getScheme() + "://"
					+ request.getServerName() + ":" + request.getServerPort()
					+ "/ErrorLogWebShow/";
				%>
				<div style="line-height: 30px;background-color:silver;width:380px;font-variant:small-caps;">
					<a href="<%=url%>" target="_blank">
						Butel视频会议错误日志统计查询系统
					</a>
				</div>
		</center>
	</body>
</html>
