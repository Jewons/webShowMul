<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  	<base href="<%=basePath%>" />
    <title>会议详情</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>  
	
	<link rel="stylesheet" href="css/general.css"  type="text/css" />
	<link rel="stylesheet" href="css/count.css"  type="text/css" />
    <link rel="stylesheet" href="css/callerdetail/callerdetail.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/allView.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/bandwithAdaptive.css?<%=new Date().getTime()%>" type="text/css"></link>
    <%-- <link rel="stylesheet" href="css/callerdetail/flashAdjust.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/flashEventInfo.css?<%=new Date().getTime()%>" type="text/css"></link>--%>
    <link rel="stylesheet" href="css/callerdetail/videoParam.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/punch.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/relay.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/voip.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/event.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/pathSwitch.css?<%=new Date().getTime()%>" type="text/css"></link>
    <!--<link rel="stylesheet" href="css/callerdetail/lost.css?<%=new Date().getTime()%>" type="text/css"></link>-->
    <link rel="stylesheet" href="css/callerdetail/log.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/exception.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/lossPackage.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/dataPackDetail.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/MeetingbandwithAdaptive.css?<%=new Date().getTime()%>" type="text/css"></link>
    <link rel="stylesheet" href="css/callerdetail/MultlossPackage.css?<%=new Date().getTime()%>" type="text/css"></link>
    <!-- 道路切换排序用 -->
    <link rel="stylesheet" type="text/css" href="jquery.tablesorter/themes/green/style.css?<%=new Date().getTime()%>"/>
    
    <script src="js/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="js/map.js" type="text/javascript"></script>
    <script src="js/json2.js" type="text/javascript"></script>
    <script src="js/util.js?<%=new Date().getTime()%>" type="text/javascript"></script>
  	<script src="js/Infodictionary.js?<%=new Date().getTime()%>" type="text/javascript"></script>

  	<!-- 道路切换排序 -->
  	<!-- 排序js -->
	    <script src="jquery.tablesorter/jquery.tablesorter.js" type="text/javascript"></script>
  
    <!-- 导入echarts框架文件 -->
    <script src="echarts-2.1.10/build/dist/echarts.js"></script>
    
    <!-- 导入highstock框架文件，以下两个文件顺序不能反 -->
    <script src="Highstock-2.0.3/js/highstock.js" type="text/javascript"></script>
    <script src="Highstock-2.0.3/js/modules/exporting.js" type="text/javascript"></script>
   
    <!-- 显示highstock视图的文件 -->
    <script src="js/callerdetail/bandwithAdaptive/highstock/highstockView_zb.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/highstock/highstockView_bz.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/highstock/flashView_zb.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/highstock/flashView_bz.js?<%=new Date().getTime()%>" type="text/javascript"></script>
     
    <!-- 挂断原因字典表 -->
    <script src="js/disconnectedReason_tab.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <!-- 地域、运营商、用户类型、设备类型、系统类型、网络类型字典表 -->
  
    
    <script src="js/callerdetail/relayUtil.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/relayImgJs/relayImg.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/callerdetail.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/dataToView.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/allView.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/pathSwitch_overflowDataUtil.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/bandAdaptiveDataUtil_ability.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/bandAdaptiveDataUtil_zb.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/bandAdaptiveDataUtil_bz.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/flashDataUtil.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/bandwithAdaptiveView_zb.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/bandwithAdaptive/bandwithAdaptiveView_bz.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/videoParam.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/punch.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/relay.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/voip.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/event.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/pathSwitch.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <!--<script src="js/callerdetail/lost.js?<%=new Date().getTime()%>" type="text/javascript"></script>  -->
    <script src="js/callerdetail/log.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/exception.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/lossPackage.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/dataPackDetail.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/callerdetail/MeetingbandwithAdaptive.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/MultlossPackage.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/viewModel.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script src="js/SortTable.js?<%=new Date().getTime()%>" type="text/javascript"></script>
    <script type="text/javascript">
	    $(document).ready(function(){	    	
	    	//一个接口取出“通话详情”的所有数据
	    	summaryView("${param.meetingId}","${param.startTime}","${param.durations}","${param.userCount}"/*,"${param.upLossVideoMic1}","${param.downLossVideoMic1}","${param.upLossVideoMic2}","${param.downLossVideoMic2}","${param.upLossVideoEFCMic1}","${param.downLossVideoEFCMic1}","${param.upLossVideoEFCMic2}","${param.downLossVideoEFCMic2}","${param.upLossAudioMic1}","${param.downLossAudioMic1}","${param.upLossAudioMic2}","${param.downLossAudioMic2}","${param.upLossAudioEFCMic1}","${param.downLossAudioEFCMic1}","${param.upLossAudioEFCMic2}","${param.downLossAudioEFCMic2}"*/);
	    	userIdTabView("${param.userIdList}","${param.meetingId}","${param.relayIdList}","${param.speakerIdList}","${param.startTime}","${param.endTime}","${param.qosTableName}");
	    	//getQosTableName("${param.qosTableName}");
// 	    	speakerIdTabView("${param.meetingId}","${param.speakerIdListMic1}","${param.speakerIdListMic2}");
	    	var upUserID = "${param.upUserID}";
	    	var downUserID = "${param.downUserID}";
	    	var flag = "${param.flag}";
	    	if(flag == "true"){
	    		aboutIDsubmit(downUserID,upUserID,"${param.meetingId}","lossPackageMult",1,"${param.startTime}","${param.endTime}","${param.qosTableName}");
	    		$("#downdirection").click();
	    	}
	    	//切换“带宽自适应/静态协商参数/FEC档位”的解释说明的可见状态
<%--		   $('#upLevel').live("click",function () {
			   $('#bandFec').slideToggle("slow");
			   $('#upLevel').toggle();
			   $('#downLevel').toggle();
			});
			$('#downLevel').live("click",function () {
				   $('#bandFec').slideToggle("slow");
				   $('#upLevel').toggle();
				   $('#downLevel').toggle();
			});--%>
	    });
    </script>
    
  </head>
  <body style="background-image:url(images/bg.jpg);padding:5px;">
	<div id="callerdetail_all">
		<div class='callerdetail_title'><h1>会议详情</h1></div>
		<!-- 顶部固定信息 -->
		<div id="callerdetail_summary">
			
		</div>
		<!-- 八大标签 -->
		<div>
  			<ul class="callerdetail_tabs">
				<%-- <li><a href="#callerdetail_callerAll" id="">总览</a></li>--%>
<%--				<li><a href="#callerdetail_bandwithAdaptive" id="">带宽自适应调节</a></li>--%>
				<%-- <li><a href="#callerdetail_flashAdjust" id="">丢包统计</a></li>--%>
				<!-- <li><a href="#callerdetail_lossPackage" id="">丢包统计</a></li>-->
				<li><a href="#callerdetail_lossPackageMult" id="">丢包统计</a></li>
				<%-- <li><a href="#callerdetail_dataPackDetail" id="">数据</a></li>--%>
				<%--<li><a href="#callerdetail_videoParam" id="">视频参数</a></li>
				<li><a href="#callerdetail_punch" id="">打洞信息</a></li>
				<li><a href="#callerdetail_relay" id="">Relay信息</a></li>
				<li><a href="#callerdetail_voip" id="">VOIP信息</a></li>
				<li><a href="#callerdetail_event" id="">通话事件</a></li>
				<li><a href="#callerdetail_pathSwitch" id="">道路切换</a></li>
				<li><a href="#callerdetail_lost" id="">丢包统计</a></li>
				<li><a href="#callerdetail_log" id="">数据日志</a></li>--%>
				<!--<li><a href="#callerdetail_exception" id="">异常数据</a></li>-->
			</ul>
		</div>
		<!-- 所有子标签版面 -->
		<div id="callerdetail_div">
			<!--总览 01-->
			<div id='callerdetail_callerAll'>
				<div class='callerdetail_title'><h1>通话总览</h1></div>
				&nbsp;
				<b>双方设备扩展信息上报</b>
				<div class='divBorder' id='callerAll_Ext_dev_info'></div>
				<!--
				 <b>打洞信息</b>
				 <div class='divBorder' id='callerAll_punch'></div> 
				-->
				<div class='divBorder'>
					&nbsp;<b>Relay路径信息</b>
					<div>
			  			<ul class="allView_tabs">
							<li><a href="#allView_zb" id="">主叫端数据</a></li>
							<li><a href="#allView_bz" id="">被叫端数据</a></li>
						</ul>
					</div>
					<div id='allView01'>
						<!-- 总览主叫端数据 -->
						<div id='allView_zb'>未获取总览主叫端数据！<br/><br/><br/><br/><br/></div>
						<!-- 总览被叫端数据 -->
						<div id='allView_bz'>未获取总览被叫端数据！<br/><br/><br/><br/><br/></div>
					</div>
				</div>
				&nbsp;<b>流信息统计</b>
				<div class='divBorder' id='callerAll_stream'>流信息统计</div>
				&nbsp;<b>模块版本号</b>
				<div class='divBorder' id='callerAll_version'></div>
			</div>
			
			<!-- 带宽自适应调节 02-->
			<%-- 
			<div id='callerdetail_bandwithAdaptive'>
				<div class='callerdetail_title'><h1>带宽自适应调节</h1></div>
				<div>
		  			<ul class="bandwithAdaptive_tabs">
						<li><a href="#bandwithAdaptive_ability" id="">静态协商参数</a></li>
						<!-- 
						<li><a href="#bandwithAdaptive_zb01" id="">主叫端数据</a></li>
						<li><a href="#bandwithAdaptive_bz01" id="">被叫端数据</a></li>
						 -->
						<li><a href="#bandwithAdaptive_zb02" id="">主叫端数据</a></li>
						<li><a href="#bandwithAdaptive_bz02" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='bandwithAdaptive01'>
					<!-- 静态协商参数 -->
					<div id='bandwithAdaptive_ability'>未获取带宽自适应调节双方能力参数！<br/><br/><br/><br/><br/></div>
					<!-- 带宽自适应调节主叫端数据 -->
					<div id='bandwithAdaptive_zb01'>
						<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
						<center>
							<div id="bandAdaptive_main1_zb" style="height:100px;width:1090px;"></div>
							<div id="bandAdaptive_main2_zb" style="height:140px;width:1090px;"></div>
							<div id="bandAdaptive_main3_zb" style="height:110px;width:1090px;"></div>
							<div id="bandAdaptive_main4_zb" style="height:110px;width:1090px;"></div>
							<div id="bandAdaptive_main5_zb" style="height:90px;width:1090px;"></div>
						</center>
					</div>
					<!-- 带宽自适应调节被叫端数据 -->
					<div id='bandwithAdaptive_bz01'>
						<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
						<center>
							<div id="bandAdaptive_main1_bz" style="height:100px;width:1090px;"></div>
							<div id="bandAdaptive_main2_bz" style="height:140px;width:1090px;"></div>
							<div id="bandAdaptive_main3_bz" style="height:110px;width:1090px;"></div>
							<div id="bandAdaptive_main4_bz" style="height:110px;width:1090px;"></div>
							<div id="bandAdaptive_main5_bz" style="height:90px;width:1090px;"></div>
						</center>
					</div>
					<div id='bandwithAdaptive_zb02'>
						<!-- 为highstock准备一个具备大小（宽高）的Dom -->
						<center>
							<div id="bandAdaptive_main1_zb01" style="height:100px;width:1090px;"></div>
							<div id="bandAdaptive_main1_zb02" style="height:450px;width:1090px;"></div>
						</center>
					</div>
					<!-- 带宽自适应调节被叫端数据 -->
					<div id='bandwithAdaptive_bz02'>
						<!-- 为highstock准备一个具备大小（宽高）的Dom -->
						<center>
							<div id="bandAdaptive_main1_bz01" style="height:100px;width:1090px;"></div>
							<div id="bandAdaptive_main1_bz02" style="height:450px;width:1090px;"></div>
						</center>
					</div>
				</div>
			</div>  
			--%>
			
			
			<!-- 打洞信息 06-->
			<div id='callerdetail_punch'>
				<div class='callerdetail_title'><h1>打洞信息</h1></div>
				<div>
		  			<ul class="punch_tabs">
						<li><a href="#punch_zb" id="">主叫端数据</a></li>
						<li><a href="#punch_bz" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='punch01'>
					<!-- 打洞信息主叫端数据 -->
					<div id='punch_zb'>未获取打洞信息主叫端数据！<br/><br/><br/><br/><br/></div>
					<!-- 打洞信息被叫端数据 -->
					<div id='punch_bz'>未获取打洞信息被叫端数据！<br/><br/><br/><br/><br/></div>
				</div>
			</div>
			
			<!-- 视频会议带宽自适应 -->
			<div id='callerdetail_bandwithAdaptive'>
			     <div class='callerdetail_title'><h1>带宽自适应信息</h1></div>
			     <div>
			     	<ul class="MeetingbandwithAdaptive_tabs">
						<li><a href="#MeetingbandwithAdaptive01" id="">Mic1</a></li>
						<li><a href="#MeetingbandwithAdaptive02" id="">Mic2</a></li>
					</ul>
				</div>
				<div id='MeetingbandwithAdaptiveContent'>
				     <!--MIC1  -->
				     <div id='MeetingbandwithAdaptive01'>
				        <div id="MeetingbandwithAdaptive01_audio_tab"></div>
				        <div>
				     		<ul class="MeetingbandwithAdaptive0101_tabs">
				     			<li><a href="#MeetingbandwithAdaptive0101Up" id="">上行</a></li>
				     			<li><a href="#MeetingbandwithAdaptive0101Down" id="">下行</a></li>
				     		</ul>
				     	</div>
				     	<div id='MeetingbandwithAdaptive0101'>
				     		<div id='MeetingbandwithAdaptive0101Up'>
				     			<div id='MeetingbandwithAdaptive0101Up_01'></div>
				     		</div>
				     		<div id='MeetingbandwithAdaptive0101Down'>
				     			<div id='MeetingbandwithAdaptive0101Down_01'></div>
				     		</div>
				     	</div>
				     </div>
				     <!--MIC2  -->
				     <div id='MeetingbandwithAdaptive02'>
				        <div id="MeetingbandwithAdaptive02_audio_tab"></div>
				         <div>
				     		<ul class="MeetingbandwithAdaptive0202_tabs">
				     			<li><a href="#MeetingbandwithAdaptive0202Up" id="">上行</a></li>
				     			<li><a href="#MeetingbandwithAdaptive0202Down" id="">下行</a></li>
				     		</ul>
				     	</div>				     	
				     	<div id='MeetingbandwithAdaptive0202'>
				     		<div id='MeetingbandwithAdaptive0202Up'>
				     			<div id='MeetingbandwithAdaptive0202Up_01'></div>
				     		</div>
				     		<div id='MeetingbandwithAdaptive0202Down'>
				     			<div id='MeetingbandwithAdaptive0202Down_01'></div>
				     		</div>
				     	</div>
				     </div>
				</div>
			</div>
			<!-- 视频会议丢包统计 -->
			<div id='callerdetail_lossPackage'>
			     <div class='callerdetail_title'>
			     	<h1>丢包统计</h1>
			     	<input type="button" onclick="MakeQosreport('${param.meetingId}','0')" value="导出报告"/>
			     	<input type="button" onclick="MakeQosreport('${param.meetingId}','1')" value="导出Mic1报告"/>
			     	<input type="button" onclick="MakeQosreport('${param.meetingId}','2')" value="导出Mic2报告"/>
			     </div>
			     <div>
			     	<ul class="lossPackage_tabs">
						<li><a href="#lossPackage01" id="">Mic1</a></li>
						<li><a href="#lossPackage02" id="">Mic2</a></li>
					</ul>
				</div>
				<div id='lossPackageContent'>
				     <!--MIC1  -->
				     <div id='lossPackage01' style="width:1690px;">
				        <div id="lossPackage01_audio_tab"></div>
				     	<div>
				     		<ul class="lossPackage0101_tabs">
				     			<li><a href="#lossPackage0101Up" id="">上行</a></li>
				     			<li><a href="#lossPackage0101Down" id="">下行</a></li>
				     		</ul>
				     	</div>
				     	<div id='lossPackage0101'>
							<!--<div id='lossPackage0101Up'>无上行数据！<br/><br/><br/><br/>-->
							<div id='lossPackage0101Up'>
								<!-- 丢包率散列图 -->
								<div id='lossPackage0101Up_01' style="width:1685px;"></div>
								<hr/>
								<!-- 丢包率列表 -->
								<div id='lossPackage0101Up_02'></div>
							</div>
							<!-- <div id='lossPackage0101Down'>无下行数据！<br/><br/><br/><br/></div>-->
							<div id='lossPackage0101Down'>
								<!-- 丢包率散列图 -->
								<div id='lossPackage0101Down_01' style="width:1685px;"></div>
								<hr/>
								<!-- 丢包率列表 -->
								<div id='lossPackage0101Down_02'></div>
							</div>
						</div>
				     </div>
				     <!--MIC2  -->
				     <div id='lossPackage02' style="width:1690px;">
				        <div id="lossPackage02_audio_tab"></div>
				        <div>
				        	<ul class="lossPackage0202_tabs">
				     			<li><a href="#lossPackage0202Up" id="">上行</a></li>
				     			<li><a href="#lossPackage0202Down" id="">下行</a></li>
				     		</ul>
				        </div>				     	
				     	<div id='lossPackage0202'>
				     		 <div id='lossPackage0202Up'>
				     		 	<!-- 丢包率散列图 -->
								<div id='lossPackage0202Up_01' style="width:1685px;"></div>
								<hr/>
								<!-- 丢包率列表 -->
								<div id='lossPackage0202Up_02'></div>
				     		 </div>
							 <div id='lossPackage0202Down'>
							 	<!-- 丢包率散列图 -->
								<div id='lossPackage0202Down_01' style="width:1685px;"></div>
								<hr/>
								<!-- 丢包率列表 -->
								<div id='lossPackage0202Down_02'></div>
							 </div>
				     	</div>
				     </div>
				</div>
			</div>
			<!-- 多流视频会议丢包统计 -->
			<div id='callerdetail_lossPackageMult'>
			     <div class='callerdetail_title'>
			     	<h1>丢包统计</h1>
			     </div>
			    <!-- 一级标签  -->
			    <div id='lossPackageMult_speaker_tabs'></div>
				<div id='lossPackageMult_speaker_tabs_view'></div>	
				<div>
					<ul class='lossPackageMult_directon_tabs'>
				     	<li><a href="#lossPackageMultUp" id="updirection">上行</a></li>
				        <li><a href="#lossPackageMultDown" id="downdirection">下行</a></li>
				    </ul>
				</div>
				<div id= 'lossPackageMult_content'>
					<div id='lossPackageMultUp'>
						<div>
							<ul class='lossPackageMult_resourceId_up_tap'>
								<li><a href="#lossPackageMult_up_resourceId_100" id="up_resourceId_100">视频</a></li>
								<li><a href="#lossPackageMult_up_resourceId_200" id="up_resourceId_200">音频</a></li>
								<li><a href="#lossPackageMult_up_resourceId_300" id="up_resourceId_300">文档</a></li>
							</ul>
						</div>
						<div id = 'lossPackageMultUpView'>
							<div id ='lossPackageMult_up_resourceId_100'></div>
							<div id ='lossPackageMult_up_resourceId_200'></div>
							<div id ='lossPackageMult_up_resourceId_300'></div>
						</div>
					</div>
					<div id='lossPackageMultDown'>
						<div>
							<ul class='lossPackageMult_resourceId_down_tap'>
								<li><a href="#lossPackageMult_down_resourceId_100" id="down_resourceId_100">视频</a></li>
								<li><a href="#lossPackageMult_down_resourceId_200" id="down_resourceId_200">音频</a></li>
								<li><a href="#lossPackageMult_down_resourceId_300" id="down_resourceId_300">文档</a></li>
							</ul>
						</div>
						<div id = 'lossPackageMultDownView'>
							<div id = 'lossPackageMult_down_resourceId_100'></div>
							<div id = 'lossPackageMult_down_resourceId_200'></div>
							<div id = 'lossPackageMult_down_resourceId_300'></div>	
						</div>	
					</div>
				</div>
			</div>
			<!-- 视频会议数据包详情 -->
			<div id='callerdetail_dataPackDetail'>
			 <div class='callerdetail_title'><h1>数据包详情</h1></div>
			     <div>
			     	<ul class="dataPackDetail_tabs">
						<li><a href="#dataPackDetail01" id="">Mic1</a></li>
						<li><a href="#dataPackDetail02" id="">Mic2</a></li>
					</ul>
			     </div>
			     <div id='dataPackDetailContent'>
			        <!--MIC1-->
			     	<div id='dataPackDetail01' style="width:1085px;">
			     		<!-- 二级标签speakerId -->
			     	    <div id='dataPackDetail01_speaker_tabs'></div>
			     	    <!-- 三级标签C-R R-R R-C -->
			     		<div id='dataPackDetail01_topo_tabs'></div>
			     		<!-- 三级标签对应的内容 -->
			     		<div id='dataPackDetail01_view_div'></div>
			     	</div>
			     	<!--MIC2-->
			     	<div id='dataPackDetail02' style="width:1085px">
			     		<!-- 二级标签speakerId -->
			     		<div id='dataPackDetail02_speaker_tabs'></div>
			     		<!-- 三级标签C-R R-R R-C -->
			     		<div id='dataPackDetail02_topo_tabs'></div>
			     		<!-- 三级标签对应的内容 -->
			     		<div id='dataPackDetail02_view_div'></div>
			     	</div>
			     </div>
			</div>
			<!-- Relay信息07 -->
			<div id='callerdetail_relay'>
				<div>
		  			<ul class="relay_tabs">
						<li><a href="#relay01" id="">Relay状态</a></li>
						<li><a href="#relay02" id="">短链关系</a></li>
						<li><a href="#relay03" id="">可达路径</a></li>
						<li><a href="#relay04" id="">RC输出</a></li>
					</ul>
				</div>	
				<div id='relayContent'>
					<!-- Relay状态 -->
					<div id='relay01'>
						<div class='callerdetail_title'><h1>Relay状态</h1></div>
						<div>
				  			<ul class="relay0101_tabs">
								<li><a href="#relay0101_zb" id="">主叫端数据</a></li>
								
								<li><a href="#relay0101_bz" id="">被叫端数据</a></li>
								
							</ul>
						</div>		
						<div id='relay0101'>
							<!-- Relay信息中可达路径主叫端数据 -->
							<div id='relay0101_zb'>未获取此处表格信息！<br/><br/><br/><br/></div>
							<!-- Relay信息中可达路径被叫端数据 -->
							<div id='relay0101_bz'>未获取此处表格信息！<br/><br/><br/><br/></div>
						</div>
					</div>	
					<!-- 短链关系 -->
					<div id='relay02'>
						<div class='callerdetail_title'><h1>短链关系</h1></div>
						
						<div>
				  			<ul class="relay0202_tabs">
								<li><a href="#relay0202_zb" id="">主叫端数据</a></li>
								<li><a href="#relay0202_bz" id="">被叫端数据</a></li>
							</ul>
						</div>		
						<div id='relay0202'>
							<!-- Relay信息中短链关系主叫端数据 -->
							<div id='relay0202_zb'>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<b>所有Relay此刻的实时信息</b>
								<div id='relay0202_zb_01'>Relay信息表格</div>
								<div id='relay0202_zb_02'>未获取Relay信息中短链关系主叫端数据！<br/><br/><br/><br/><br/></div>
							</div>
							<!-- Relay信息中短链关系被叫端数据 -->
							<div id='relay0202_bz'>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<b>所有Relay此刻的实时信息</b>
								<div id='relay0202_bz_01'>Relay信息表格</div>
								<div id='relay0202_bz_02'>未获取Relay信息中短链关系被叫端数据！<br/><br/><br/><br/><br/></div>
							</div>
						</div>
					</div>	
					<!-- 可达路径 -->
					<div id='relay03'>
						<div class='callerdetail_title'><h1>可达路径</h1></div>
						<div>
				  			<ul class="relay0301_tabs">
								<li><a href="#relay0301_zb" id="">主叫端数据</a></li>
								<li><a href="#relay0301_bz" id="">被叫端数据</a></li>
							</ul>
						</div>		
						<div id='relay0301'>
							<!-- Relay信息中全可达路径主叫端数据 -->
							<div id='relay0301_zb'>未获取Relay信息中全可达路径主叫端数据！<br/><br/><br/><br/><br/></div>
							<!-- Relay信息中全可达路径被叫端数据 -->
							<div id='relay0301_bz'>未获取Relay信息中全可达路径被叫端数据！<br/><br/><br/><br/><br/></div>
						</div>
					</div>	
					<!-- RC输出 -->
					<div id='relay04'>
						<div class='callerdetail_title'><h1>RC输出</h1></div>
						
						<div>
				  			<ul class="relay0402_tabs">
								<li><a href="#relay0402_zb" id="">主叫端数据</a></li>
								<li><a href="#relay0402_bz" id="">被叫端数据</a></li>
							</ul>
						</div>		
						<div id='relay0402'>
							<!-- Relay信息中RC输出主叫端数据，包含表和relay关系图 -->
							<div id='relay0402_zb'>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<b>Relay信息</b>
								<div id='relay0402_zb_01'>Relay信息表格</div>
								<div id='relay0402_zb_02'>未获取Relay信息中RC输出主叫端数据！<br/><br/><br/><br/><br/></div>
							</div>
							<!-- Relay信息中RC输出被叫端数据 ，包含表和relay关系图-->
							<div id='relay0402_bz'>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<b>Relay信息</b>
								<div id='relay0402_bz_01'>Relay信息表格</div>
								<div id='relay0402_bz_02'>未获取Relay信息中RC输出被叫端数据！<br/><br/><br/><br/><br/></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!-- VOIP信息08 -->
			<div id='callerdetail_voip'>
				<div class='callerdetail_title'><h1>VOIP侧通话数据</h1></div>
				<div>
		  			<ul class="voip_tabs">
						<li><a href="#voip_zb" id="">主叫端数据</a></li>
						<li><a href="#voip_bz" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='voip01'>
	  				<!-- VOIP信息主叫端数据 -->
					<div id='voip_zb'>未获取VOIP信息主叫端数据！<br/><br/><br/><br/><br/></div>
					<!-- VOIP信息被叫端数据 -->
					<div id='voip_bz'>未获取VOIP信息被叫端数据！<br/><br/><br/><br/><br/></div>
				</div>
			</div>
			
			<!-- 通话事件09 -->
			<div id='callerdetail_event'>
				<div class='callerdetail_title'><h1>通话事件</h1></div>
				<div>
		  			<ul class="event_tabs">
						<li><a href="#event_zb" id="">主叫端事件</a></li>
						<li><a href="#event_bz" id="">被叫端事件</a></li>
					</ul>
				</div>		
				<div id='event01'>
					<!-- 通话事件主叫端事件 -->
					<div id='event_zb'>未获取通话事件主叫端事件！</div>
					<!-- 通话事件被叫端事件 -->
					<div id='event_bz'>未获取通话事件被叫端事件！</div>
				</div>
			</div>
			
			<!-- 道路切换 10-->
			<div id='callerdetail_pathSwitch'>
				<div class='callerdetail_title'><h1>道路切换</h1></div>
				<div>
		  			<ul class="pathSwitch_tabs">
						<li><a href="#pathSwitch_zb" id="">主叫端数据</a></li>
						<li><a href="#pathSwitch_bz" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='pathSwitch01'>
					<!-- 道路切换主叫端数据 -->
					<div id='pathSwitch_zb'>未获取道路切换主叫端数据！<br/><br/><br/><br/><br/></div>
					<!-- 道路切换被叫端数据 -->
					<div id='pathSwitch_bz'>未获取道路切换被叫端数据！<br/><br/><br/><br/><br/></div>
				</div>
			</div>
			
			<!-- 丢包统计11 -->
			<div id='callerdetail_lost'>
				<div class='callerdetail_title'><h1>丢包统计</h1></div>
				<div>
		  			<ul class="lost_tabs">
						<li><a href="#lost_zb" id="">主叫端数据</a></li>
						<li><a href="#lost_bz" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='lost01'>
					<!-- 丢包统计主叫端数据 -->
					<div id='lost_zb'>未获取丢包统计主叫端数据！<br/><br/><br/><br/><br/></div>
					<!-- 丢包统计被叫端数据 -->
					<div id='lost_bz'>未获取丢包统计被叫端数据！<br/><br/><br/><br/><br/></div>
				</div>
			</div>
			
			<!-- 数据日志12 -->
			<div id='callerdetail_log'>
				<div class='callerdetail_title'><h2>如数据显示不正常，需要查询日志信息是否汇报，请在此查看！<font style='color:#FF0000;'></font></h2>此处为数据库中原始数据，若此处没有显示，则说明未汇报。</div>
				<div>
		  			<ul class="log_tabs">
						<li><a href="#log_zb" id="log_zb1">主叫端数据</a></li>
						<li><a href="#log_bz" id="log_bz1">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='log01'>
					<!-- 丢包统计主叫端数据 -->
					<div id='log_zb'>请点击标签加载数据！</div>
					<!-- 丢包统计被叫端数据 -->
					<div id='log_bz'>请点击标签加载数据！</div>
				</div>
			</div>
			
			<!-- 异常数据13 -->
			<div id='callerdetail_exception'>
				<div class='callerdetail_title'><h2>如汇报的日志有异常，异常的部分会在此处显示。</h2></div>
				<div>
		  			<ul class="exception_tabs">
						<li><a href="#exception_zb" id="">主叫端数据</a></li>
						<li><a href="#exception_bz" id="">被叫端数据</a></li>
					</ul>
				</div>		
				<div id='exception01'>
					<!-- 丢包统计主叫端数据 -->
					<div id='exception_zb'>数据正常，没有异常数据！</div>
					<!-- 丢包统计被叫端数据 -->
					<div id='exception_bz'>数据正常，没有异常数据！</div>
				</div>
			</div>
			
		</div>
	</div>
  </body>
</html>
