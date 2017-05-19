/**
 * 
 * 
 */
$(document).ready(function() {
		});

function userIdTabView(userIdList,meetingId,relayIdList,speakerIdList,startTime,endTime,TableName){
	
	userIdTabView_lossPackageMic01(userIdList,meetingId);
	userIdTabView_lossPackageMic02(userIdList,meetingId);
	userIdTabView_BandAdpMic01(userIdList,meetingId,relayIdList);
	userIdTabView_BandAdpMic02(userIdList,meetingId,relayIdList);
	//userIdTabView_dataPackDetailMic1();
	speakerIdTabView_MultLossPack(speakerIdList,meetingId,userIdList,startTime,endTime,TableName);
}

function speakerIdTabView(meetingId,list1,list2){
	//console.info()
	speakerIdTabView_dataPackDetailMic1(meetingId,list1);
	speakerIdTabView_dataPackDetailMic2(meetingId,list2);
}
	


/**
 * “Relay信息”标签页第一个子标签“Relay状态”数据，不再分主被
 * @param {} data
 * @param {} sid
 */
function sendDataToView00(data) {
	// 将从实时监控接口中取出的relay信息封装到map中，以便在“Relay信息/Relay状态”和“Relay信息/短链关系”的表格使用
	relay2map(data);
}

/**
 * 视图转向，在此处将数据的各部分显示到页面上相应的位置
 * “通话详情”的页面
 */
function sendDataToView01(data,sid) {
	// 顶部固定信息
	//summaryView(data,sid);

	/* ====================总览====================== */
	// “总览”打洞
	//allViewPunchView(data);
	//“总览”双方设置扩展信息上报，不分主被
	allViewExt_dev_info(data);
	
	// “总览”Relay路径信息（被选用）_主叫向数据
	allViewRelayView_zb(data);
	// “总览”Relay路径信息（被选用）_被叫向数据
	allViewRelayView_bz(data);
	
	// “总览”流信息统计
	allViewStreamView(data);
	// “总览”模块版本号
	allViewVersionView(data);
	
	
	/* ====================带宽自适应====================== */
	//“带宽自适应/道路切换和音频溢出”主叫端//“带宽自适应/道路切换和音频溢出”被叫端
	pathSwitch_overflow(data);
	
	//“带宽自适应/带宽、等级、丢包率、延时”主叫端
	bandWithAdaptive_zb(data);
	//“带宽自适应/带宽、等级、丢包率、延时”被叫端
	bandWithAdaptive_bz(data);
	
	//“带宽自适应/双方设备能力”
	bandWithAdaptive_ability(data);
	
	/* ====================Flash调节====================== */
	//“FlashSDK调节”
	flashAdjustData(data);
	
	//“flash信息”，由mac和guid反查得到
	gainMac_Guid(data);
	
	
	
	
	/* ====================视频参数====================== */
	// “视频参数”主叫端数据
	videoParamView_zb(data);
	// “视频参数”被叫端数据
	videoParamView_bz(data);
	
	/* ====================打洞信息====================== */
	// “打洞信息”主叫端数据
	punchView_zb(data);
	// “打洞信息”被叫端数据
	punchView_bz(data);
	
	/* ====================Relay信息====================== */
	// “Relay信息”Relay状态的表格信息01
	relayView01_zb(data);
	relayView01_bz(data);
	
	// “Relay信息”短链关系02
	// “Relay信息”短链关系02和“Relay信息”RC输出04顶部的表格信息
	relayView02_zb_01table();
	// 主叫向数据
	relayView02_zb(data);
	// 被叫向数据
	// “Relay信息”短链关系02和“Relay信息”RC输出04顶部的表格信息
	//relayView02_bz_01table(data);
	relayView02_bz(data);
	
	// “Relay信息”可达路径03
	// 主叫向数据
	relayView03_zb(data);
	// 被叫向数据
	relayView03_bz(data);
	
	// “Relay信息”RC输出04
	// 主叫向数据
	relayView04_zb(data);
	// 被叫向数据
	relayView04_bz(data);
	//底部Relay关系图，主叫向
	relayImg_zb(data);
	//底部Relay关系图，被叫向
	relayImg_bz(data);
	
	/* ====================VOIP信息====================== */
	// 主叫向数据
	voipView_zb(data);
	// 被叫向数据
	voipView_bz(data);
	
	/* ====================通话事件====================== */
	// 主叫端数据
	eventView_zb(data);
	// 被叫端数据
	eventView_bz(data);
	
	/* ====================道路切换====================== */
	// 主叫端数据
	pathSwitchView_zb(data);
	// 被叫端数据
	pathSwitchView_bz(data);
	
	/* ====================丢包统计====================== */
	// 主叫端数据
	lostView_zb(data);
	
	// 被叫端数据
	lostView_bz(data);
	
	/* ====================数据日志====================== */
	//getLogsid(sid);
	//主叫端数据
	logView_zb_new(data);
	//被叫端数据
	logView_bz_new(data);
	
	/* ====================异常数据====================== */
	// 主叫端数据
	exceptionView_zb(data);
	
	// 被叫端数据
	exceptionView_bz(data);
}

/**
 * “话务报告”的页面
 */
function sendDataToView02(data,sid) {
	//顶部固定信息
	setView00(data,sid);
	//重要用户信息
	setView01(data);
	//端到端流质量
	
	//对照发包信息
	createTable0300();//先创建表格
	setView0301(data);//对照发包信息 01[被叫参数类型]
	setView0302(data);//对照发包信息 02[被叫相关参数]
	setView0303(data);//对照发包信息 03[主叫参数类型]
	setView0304(data);//对照发包信息 04[主叫相关参数]
	//路径质量
	setView04_zb(data);//路径质量 01主被
	setView04_bz(data);//路径质量　02被主
	//选路策略
	setView05_zb(data);//选路策略 主被
	setView05_bz(data);//选路策略 被主

}

