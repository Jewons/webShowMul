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
    <title>数据包信息</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
	<meta http-equiv="pragma" content="no-cache"/>
	<meta http-equiv="cache-control" content="no-cache"/>
	<meta http-equiv="expires" content="0"/>  
	
	<link rel="stylesheet" href="css/general.css"  type="text/css" />
	<link rel="stylesheet" href="css/count.css"  type="text/css" />
   	<link rel="stylesheet" href="css/packageDetail.css"  type="text/css" />

  
    
    <script src="js/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="js/map.js" type="text/javascript"></script>
    <script src="js/json2.js" type="text/javascript"></script>
    <script src="js/util.js?<%=new Date().getTime()%>" type="text/javascript"></script>
     <script src="js/viewModel.js?<%=new Date().getTime()%>" type="text/javascript"></script>
     <script src="js/SortTable.js?<%=new Date().getTime()%>" type="text/javascript"></script>
     <script src="js/packageDetail.js?<%=new Date().getTime()%>" type="text/javascript"></script>
     
    <script type="text/javascript">
	    $(document).ready(function(){	    	
	    	//一个接口取出“通话详情”的所有数据
	    	packageDetail_summaryView("${param.meetingId}","${param.speakerId}","${param.micId}","${param.timeStamp}","${param.frameId}","${param.framePiece}","${param.realPiece}","${param.topoInfo}");
	    	getPackageDetail("${param.meetingId}","${param.speakerId}","${param.micId}","${param.timeStamp}","${param.topoInfo}");	
	    	getResendReqConmandDetail("${param.meetingId}","${param.speakerId}","${param.micId}","${param.timeStamp}","${param.topoInfo}");	
	    });
    </script>
    
  </head>
  <body style="background-image:url(images/bg.jpg);padding:5px;">
	<div id="packageDetail_all">
		<div class='packageDetail_title'><h1>数据包详情</h1></div>
		<!-- 顶部固定信息 -->
		<div id="packagedetail_summary">
		</div>
		<div id="packagedetaillist"></div>
		<div id="resendReqConmandlist"></div>
		<!-- 所有子标签版面 -->
	 </div>
  </body>
</html>
