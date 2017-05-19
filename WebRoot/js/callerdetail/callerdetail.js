/* 通话详情callDetail.jsp页面的总体js效果 */

/* 顶部固定信息的视图显示 */
/* 包括顶部的八大标签点击效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#callerdetail_div > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.callerdetail_tabs li a').click(function() {
						//var id = $(this).attr("id");
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.callerdetail_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});


/**
 * 顶部固定信息
 * 
 * @param {}
 *            data
 */
function summaryView(meetingId,endTime,durations,userCount/*,upLossVideoMic1,downLossVideoMic1,upLossVideoMic2,downLossVideoMic2,upLossVideoEFCMic1,
		downLossVideoEFCMic1,upLossVideoEFCMic2,downLossVideoEFCMic2,upLossAudioMic1,downLossAudioMic1,upLossAudioMic2,downLossAudioMic2,upLossAudioEFCMic1,downLossAudioEFCMic1,upLossAudioEFCMic2,downLossAudioEFCMic2*/) {
	
	// 空值校验
	if (endTime == undefined || endTime == null || endTime === "") {
		endTime = "无";
	}
//	if (duration == undefined || duration == null || duration === "") {
//		duration = "无";
//	}
	
	if (durations == undefined || durations == null || durations === "") {
		durations = "无";
	}else {
		durations = timeformat(durations*1000);
	}
	if (userCount == undefined || userCount == null || userCount === "") {
		userCount = "无";
	}
//	if (upLossVideoMic1 == undefined || upLossVideoMic1 == null || upLossVideoMic1 === "") {
//		upLossVideoMic1 = "无";
//	}
//	if (downLossVideoMic1 == undefined || downLossVideoMic1 == null || downLossVideoMic1 === "") {
//		downLossVideoMic1 = "无";
//	}
//	if (upLossVideoMic2 == undefined || upLossVideoMic2 == null || upLossVideoMic2 === "") {
//		upLossVideoMic2 = "无";
//	}
//	if (downLossVideoMic2 == undefined || downLossVideoMic2 == null || downLossVideoMic2 === "") {
//		downLossVideoMic2 = "无";
//	}
//	if (upLossVideoEFCMic1 == undefined || upLossVideoEFCMic1 == null || upLossVideoEFCMic1 === "") {
//		upLossVideoEFCMic1 = "无";
//	}
//	if (downLossVideoEFCMic1 == undefined || downLossVideoEFCMic1 == null || downLossVideoEFCMic1 === "") {
//		downLossVideoEFCMic1 = "无";
//	}
//	if (upLossVideoEFCMic2 == undefined || upLossVideoEFCMic2 == null || upLossVideoEFCMic2 === "") {
//		upLossVideoEFCMic2 = "无";
//	}
//	if (downLossVideoEFCMic2 == undefined || downLossVideoEFCMic2 == null || downLossVideoEFCMic2 === "") {
//		downLossVideoEFCMic2 = "无";
//	}
//	if (upLossAudioMic1 == undefined || upLossAudioMic1 == null || upLossAudioMic1 === "") {
//		upLossAudioMic1 = "无";
//	}
//	if (downLossAudioMic1 == undefined || downLossAudioMic1 == null || downLossAudioMic1 === "") {
//		downLossAudioMic1 = "无";
//	}
//	if (upLossAudioMic2 == undefined || upLossAudioMic2 == null || upLossAudioMic2 === "") {
//		upLossAudioMic2 = "无";
//	}
//	if (downLossAudioMic2 == undefined || downLossAudioMic2 == null || downLossAudioMic2 === "") {
//		downLossAudioMic2 = "无";
//	}
//	if (upLossAudioEFCMic1 == undefined || upLossAudioEFCMic1 == null || upLossAudioEFCMic1 === "") {
//		upLossAudioEFCMic1 = "无";
//	}
//	if (downLossAudioEFCMic1 == undefined || downLossAudioEFCMic1 == null || downLossAudioEFCMic1 === "") {
//		downLossAudioEFCMic1 = "无";
//	}
//	if (upLossAudioEFCMic2 == undefined || upLossAudioEFCMic2 == null || upLossAudioEFCMic2 === "") {
//		upLossAudioEFCMic2 = "无";
//	}
//	if (downLossAudioEFCMic2 == undefined || downLossAudioEFCMic2 == null || downLossAudioEFCMic2 === "") {
//		downLossAudioEFCMic2 = "无";
//	}
	
	var html = "<span class='summaryStyle'>会议号：</span>" + meetingId
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>开始时间：</span>" + endTime
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>持续时间：</span>" + durations 
				+ "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<span class='summaryStyle'>参会人数：</span>" + userCount
				+ "&nbsp;&nbsp;&nbsp;&nbsp;";
//				+ "<span class='summaryStyle'>上行mic1视频平均丢包率：</span>" + upLossVideoMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"
//				+"<span class='summaryStyle'>下行mic1视频平均丢包率：</span>" + downLossVideoMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>上行mic2视频平均丢包率：</span>" + upLossVideoMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic2视频平均丢包率：</span>" + downLossVideoMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>上行mic1视频解FEC后平均丢包率：</span>" + upLossVideoEFCMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic1视频解FEC后平均丢包率：</span>" + downLossVideoEFCMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>上行mic2视频解FEC后平均丢包率：</span>" + upLossVideoEFCMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic2视频解FEC后平均丢包率：</span>" + downLossVideoEFCMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>上行mic1音频平均丢包率：</span>" + upLossAudioMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic1音频平均丢包率：</span>" + downLossAudioMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>上行mic2音频平均丢包率：</span>" + upLossAudioMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic2音频平均丢包率：</span>" + downLossAudioMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//                "<span class='summaryStyle'>上行mic1音频解FEC后平均丢包率：</span>" + upLossAudioEFCMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic1音频解FEC后平均丢包率：</span>" + downLossAudioEFCMic1
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//                "<span class='summaryStyle'>上行mic2音频解FEC后平均丢包率：</span>" + upLossAudioEFCMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;"+
//				"<span class='summaryStyle'>下行mic2音频解FEC后平均丢包率：</span>" + downLossAudioEFCMic2
//				+"&nbsp;&nbsp;&nbsp;&nbsp;";
	$('#callerdetail_summary').html(html);
}
