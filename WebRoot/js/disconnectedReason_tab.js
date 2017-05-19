/**
 * 挂断原因字典表
 * @param {} eventValue
 * @return {}
 */
function disconnectReason(eventValue){
	var map = new Map();
	
	/**
	 * 事件名称
	 * 用在event.js中，“通话详情”/“通话事件”
	 */
	map.put('sip_event_newcall','被叫收到新呼叫');
	map.put('sip_event_inprogess','主叫收到被叫的临时响应');
	map.put('sip_event_m_ringing','主叫收到被叫的振铃响应');
	map.put('sip_event_connected','呼叫接通(主被相同)');
	map.put('sip_event_disconnected','呼叫挂断(主被相同)');
	map.put('event_start_camera_preview','启动视频组件(主被相同)');
	map.put('event_stop_camera_preview','关闭视频组件(主被相同)');
	
	//以下map的key是为了向前兼容
	map.put('100','通话中，本端对远端的点对点心跳超时【可能对端异常退出或对方网络异常】');
	map.put('101','wifi切换时，若有呼叫，清除呼叫，上报挂断事件');
	map.put('102','主叫getRtpCandisates失败(音频/视频/单路/多路 获取打洞息失败)，上报挂断事件');
	
	map.put('103','建路超时');
	map.put('104','主叫getPath()失败');
	map.put('210','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 RelayServer返回错误');
	map.put('211','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 客户端在RelayServer上的映射端口发生变化');
	map.put('212','通话中客户端对本端RelayServer的心跳超时，挂断呼叫 向RelayServer发送心跳消息超时');
	map.put('213','建路会话保活超时，挂断呼叫');
	map.put('403','禁止呼叫');
	map.put('404','查找被叫失败(被叫不在线)');
	map.put('405','被叫不可达(INVITE发送失败)');
	map.put('408','超时或无人应答');
	map.put('410','用户被踢时，挂断呼叫');
	map.put('481','事务不存在');
	map.put('486','被叫忙');
	map.put('487','主叫取消呼叫');
	map.put('603','被叫主动拒绝');
	map.put('16','找不到SN');
	map.put('17','找不到BootStrap');
	map.put('37','NO_UCS 【连接UCS失败】');
	map.put('38','UCS_CHANGE_FAILED 【UCS切换失败】');
	map.put('-1','no call 【呼叫不存在】');
	map.put('-2','OSIP_BADPARAMETER 【OSIP协议栈参数错误】');
	map.put('-3','OSIP_WRONG_STATE 【OSIP协议栈状态错误】');
	map.put('1000','打开摄像头失败');
	map.put('1001','本地预览的控件失效');
	map.put('1002','显示远端视频的控件失效');
	//以上是为了向前兼容
	
	//以下是最新的对照表
	//Host引起的挂断原因
	map.put('2016','Host超时，同步接口结束');
	map.put('2020','用户被踢时，挂断呼叫');
	map.put('2069','HOST未连接');
	map.put('2078','UCS未连接HOST');
	map.put('2079','DHT未连接HOST');
	map.put('2080','CM未连接HOST');
	map.put('2081','DHT未JOIN');
	map.put('2098','与HOST断开');
	map.put('2099','UCS异常，在场服务断开');
	map.put('2101','UCS异常，通讯录断开');
	map.put('2103','UCS异常，用户中心断开');
	map.put('2114','用户中心返回令牌失效');
	
	//SIP SDK引起的挂断原因
	//基础类，错误码
	map.put('4500','SIP协议栈失败Base，错误码+-10');
	map.put('4810','本地没有该呼叫');
	map.put('4811','对端收到OPTION时，由于当前无呼叫回复481，导致本端挂断');
	map.put('4820','主叫版本低');
	map.put('4821','被叫版本低');
	map.put('4822','被叫自适应信息为空');
	map.put('4848','主叫在获取被叫信息返回前，挂断外呼');
	
	//主叫错误，原因码
	map.put('4849','主叫忙');
	map.put('4850','主叫查询被叫失败');
	map.put('4851','主叫获取SID失败');
	map.put('4852','主叫GetPath失败');
	map.put('4853','主叫获取打洞信息失败');
	map.put('4854','主叫建路失败');
	map.put('4855','主叫呼叫自己');
	map.put('4856','SDK不支持视频呼叫');
	map.put('4857','INVITE后没有收到SIP应答响应');
	map.put('4858','主叫查询被叫超时');
	map.put('4859','INVITE后没有收到任何SIP响应');
	
	//被叫错误，原因码
	map.put('4860','被叫忙，拒接');
	map.put('4861','被叫解析主叫SDP空');
	map.put('4862','被叫GetPath失败');
	map.put('4863','被叫获取打洞信息失败');
	map.put('4864','被叫建路失败');
	map.put('4865','被叫拒接陌生人呼叫 SIP 403');
	map.put('4866','被叫App忙，App拒绝新呼叫');
	
	//媒体协商错误 原因码
	map.put('4880','媒体变更失败');
	map.put('4881','音频协商失败');
	map.put('4882','视频协商失败');
	map.put('4883','媒体变更时对端呼叫不存在');
	map.put('4910','媒体变更冲突');
	
	//挂断呼叫 原因码
	map.put('6030','被叫拒接 SIP 603');
	map.put('6031','主叫用户取消呼 SIP CANCEL');
	map.put('6032','主叫外呼超时,70s后主叫主动挂断呼叫');
	map.put('6033','被叫应答超时,60s后被叫主动挂断呼叫');
	map.put('6034','与Host保活超时(HC错误码)');
	map.put('6035','Media通道保活全部失败');
	map.put('6036','通话中SIP 点对点（P2P）的保活超时');
	map.put('6100','打开摄像头失败，挂断呼叫');
	map.put('6101','本端视频预览控件失效，挂断呼叫');
	map.put('6102','显示远端视频控件失效，挂断呼叫');
	map.put('6103','网络切换，挂断呼叫');
	
	map.put('48501','获取被叫信息被取消');
	
	//自定义
	map.put('-10000','未收到挂机事件');
 
	map.put('0','正常');
	
	map.put('60001','i看家');
	map.put('60002','i看家');
	map.put('60003','i看家');
	map.put('60004','i看家');
	map.put('60005','i看家');
	
	
	return map.get(eventValue);
}