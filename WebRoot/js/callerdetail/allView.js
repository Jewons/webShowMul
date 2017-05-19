/* 通话详情callDetail.jsp页面中“总览”标签页面的JS效果 */
//“总览”页面的“打洞信息”页面数据填充
//“总览”页面的“Relay路径信息”页面数据填充
//“总览”页面的“流信息统计”页面数据填充
//“总览”页面的“模块版本号”页面数据填充
$(document).ready(function() {
	// 获取控制子标签内容的div
	var tabContainers = $('#allView01 > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.allView_tabs li a').click(function() {
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.allView_tabs li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
});


/**
 * “总览”页面的“双方设备扩展信息上报”
 * @param {} data
 */
function allViewExt_dev_info(datas){
	var result = datas.result;
	
	var ext_dev_info;//双方设备扩展信息
	
	var loc_dom;//本端地域编号
	var loc_isp;//本端运营商编号
	var loc_dev;//本端设备类型
	var loc_dev_id;//本段mac地址 
	var loc_dev_name;//本端具体设备型号例如华为xxx（目前这个接口应用还没调，目前该值为空） 
	var loc_hostid;//本端hostID（目前服务端这个接口未实现，该值目前为空） 
	var loc_net;//本段网络类型 
	var loc_os;//本段操作系统类型 
	var loc_user_type;//本段用户类型 
	var rem_dom;//远端地域编号
	var rem_isp;//远端运营商编号 
	var rem_dev;//远端设备类型 
	var rem_dev_name;//远端具体设备型号例如华为xxx（目前这个接口应用还没调，目前该值为空） 
	var rem_net;//远端网络类型 
	var rem_os;//远端操作系统类型 
	var rem_user_type;//远端用户类型 
	var rem_hostid;//远端hostID  
	var rem_dev_id;//远端设备类型
	
	var getpath;
	//源用户信息
	var src_user_info ;
	
	//目的用户信息
	var dest_user_info ;
	
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var paramExt = call.paramExt;
					if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
						//先从主的取，主的取不到再从被的取
						ext_dev_info = paramExt.ext_dev_info;
						if(ext_dev_info==undefined||ext_dev_info==null||ext_dev_info===""){
							var called = data.called;
							if(called!=undefined&&called!=null&&called!==""){
								var call = called.call;
								if(call!=undefined&&call!=null&&call!==""){
									var paramExt = call.paramExt;
									if(paramExt!=undefined&&paramExt!=null&&paramExt!==""){
										ext_dev_info = paramExt.ext_dev_info;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	
	
	if(ext_dev_info!=undefined&&ext_dev_info!=null&&ext_dev_info!==""){
		var ext_dev_infoOne = ext_dev_info[0];
		if(ext_dev_infoOne!=undefined&&ext_dev_infoOne!=null&&ext_dev_infoOne!==""){
			var ext_dev_infoArr = splitString(ext_dev_infoOne);
			var ext_dev_infoMap = new Map();
			if(ext_dev_infoArr!=undefined&&ext_dev_infoArr!=null&&ext_dev_infoArr!==""&&(ext_dev_infoArr instanceof Array)){
				$.each(ext_dev_infoArr,function(i,val){
					if(val!=undefined&&val!=null&&val!==""){
						ext_dev_infoMap.put(val.split('=')[0],val.split('=')[1]);
					}
				});
			}
			
			loc_dom = ext_dev_infoMap.get('loc_dom');//本端地域编号
			loc_isp = ext_dev_infoMap.get('loc_isp');//本端运营商编号
			loc_dev = ext_dev_infoMap.get('loc_dev');//本端设备类型
			loc_dev_id = ext_dev_infoMap.get('loc_dev_id');//本段mac地址 
			loc_dev_name = ext_dev_infoMap.get('loc_dev_name');//本端具体设备型号例如华为xxx（目前这个接口应用还没调，目前该值为空） 
			loc_hostid = ext_dev_infoMap.get('loc_hostid');//hostID（目前服务端这个接口未实现，该值目前为空） 
			loc_net = ext_dev_infoMap.get('loc_net');//本段网络类型 
			loc_os = ext_dev_infoMap.get('loc_os');//本段操作系统类型 
			loc_user_type = ext_dev_infoMap.get('loc_user_type');//本段用户类型 
			rem_dom = ext_dev_infoMap.get('rem_dom');//远端地域编号
			rem_isp = ext_dev_infoMap.get('rem_isp');//远端运营商编号 
			rem_dev = ext_dev_infoMap.get('rem_dev');//远端设备类型 
			rem_dev_name = ext_dev_infoMap.get('rem_dev_name');//远端具体设备型号例如华为xxx（目前这个接口应用还没调，目前该值为空） 
			rem_net = ext_dev_infoMap.get('rem_net');//远端网络类型 
			rem_os = ext_dev_infoMap.get('rem_os');//远端操作系统类型 
			rem_user_type = ext_dev_infoMap.get('rem_user_type');//远端用户类型 
			rem_hostid = ext_dev_infoMap.get('rem_hostid');//远端hostID  
			rem_dev_id = ext_dev_infoMap.get('rem_dev_id');//远端设备类型
		}
	}else{//如果从双方设备扩展信息中取不到值，就从getpath中取
		if(result===0){
			var data = datas.data;
			if(data!=undefined&&data!=null&&data!==""){
				var caller = data.caller;
				if(caller!=undefined&&caller!=null&&caller!==""){
					//先按主的取，如果主的不存在，再按被的取，如果都不存在，显示空
					getpath = caller.getpath;
						
					if(getpath!=undefined&&getpath!=null&&getpath!==""){
						//源用户信息
						src_user_info = getpath.src_user_info;
						//目的用户信息
						dest_user_info = getpath.dest_user_info;
					}else{
						var called = data.called;
						if(called!=undefined&&called!=null&&called!==""){
							getpath = called.getpath;
							if(getpath!=undefined&&getpath!=null&&getpath!==""){
								//源用户信息
								src_user_info = getpath.dest_user_info;
								//目的用户信息
								dest_user_info = getpath.src_user_info;
							}
						}
					}
				}
			}
		}
	}
	
	//本端
	if(src_user_info!=undefined&&src_user_info!=null&&src_user_info!==""){
		//本端地域编号
		loc_dom = src_user_info.domain_index;
		//本端运营商编号
		loc_isp = src_user_info.isp_index;
		//本端设备类型
		loc_dev = src_user_info.device_type;
		
		//本段网络类型 
		loc_net = src_user_info.net_type;		
		//本段操作系统类型 
		loc_os = src_user_info.os;
		//本段用户类型 
		loc_user_type = src_user_info.user_type;
	}
	//远端
	if(dest_user_info!=undefined&&dest_user_info!=null&&dest_user_info!==""){
			
		rem_dom = dest_user_info.domain_index;
		//远端运营商编号
		rem_isp = dest_user_info.isp_index;
		//远端设备类型
		rem_dev = dest_user_info.device_type;
		
		//远段网络类型 
		rem_net = dest_user_info.net_type;		
		//远段操作系统类型 
		rem_os = dest_user_info.os;
		//远段用户类型 
		rem_user_type = dest_user_info.user_type;
	}
	
	if(loc_dom==undefined||loc_dom==null||loc_dom===""){
		loc_dom = "--";
	}
	if(loc_isp==undefined||loc_isp==null||loc_isp===""){
		loc_isp = "--";
	}
	if(loc_dev==undefined||loc_dev==null||loc_dev===""){
		loc_dev = "--";
	}
	if(loc_dev_id==undefined||loc_dev_id==null||loc_dev_id===""){
		loc_dev_id = "--";
	}
	if(loc_dev_name==undefined||loc_dev_name==null||loc_dev_name===""){
		loc_dev_name = "--";
	}
	if(loc_hostid==undefined||loc_hostid==null||loc_hostid===""){
		loc_hostid = "--";
	}
	if(loc_net==undefined||loc_net==null||loc_net===""){
		loc_net = "--";
	}
	if(loc_os==undefined||loc_os==null||loc_os===""){
		loc_os = "--";
	}
	if(loc_user_type==undefined||loc_user_type==null||loc_user_type===""){
		loc_user_type = "--";
	}
	if(rem_dom==undefined||rem_dom==null||rem_dom===""){
		rem_dom = "--";
	}
	if(rem_isp==undefined||rem_isp==null||rem_isp===""){
		rem_isp = "--";
	}
	if(rem_dev==undefined||rem_dev==null||rem_dev===""){
		rem_dev = "--";
	}
	if(rem_dev_name==undefined||rem_dev_name==null||rem_dev_name===""){
		rem_dev_name = "--";
	}
	if(rem_net==undefined||rem_net==null||rem_net===""){
		rem_net = "--";
	}
	if(rem_os==undefined||rem_os==null||rem_os===""){
		rem_os = "--";
	}
	if(rem_user_type==undefined||rem_user_type==null||rem_user_type===""){
		rem_user_type = "--";
	}
	if(rem_hostid==undefined||rem_hostid==null||rem_hostid===""){
		rem_hostid = "--";
	}
	if(rem_dev_id==undefined||rem_dev_id==null||rem_dev_id===""){
		rem_dev_id = "--";
	}
	
	/**
	 * 地域编号
	 */
	//本端地域编号
	var loc_domChinese = domain_map.get(loc_dom);
	//远端地域编号
	var rem_domChinese = domain_map.get(rem_dom);
	if(loc_domChinese==undefined||loc_domChinese==null||loc_domChinese===""){
		loc_domChinese = "--";
	}
	if(rem_domChinese==undefined||rem_domChinese==null||rem_domChinese===""){
		rem_domChinese = "--";
	}
	
	/**
	 * 运营商编号
	 */
	//本端运营商编号
	var loc_ispChinese = isp_map.get(loc_isp);
	//远端运营商编号
	var rem_ispChinese = isp_map.get(rem_isp);
	if(loc_ispChinese==undefined||loc_ispChinese==null||loc_ispChinese===""){
		loc_ispChinese = "--";
	}
	if(rem_ispChinese==undefined||rem_ispChinese==null||rem_ispChinese===""){
		rem_ispChinese = "--";
	}
	
	
	/**
	 * 设备类型
	 */
	//本端设备类型
	var loc_devChinese = device_type_map.get(loc_dev);
	//远端设备类型
	var rem_devChinese = device_type_map.get(rem_dev);
	if(loc_devChinese==undefined||loc_devChinese==null||loc_devChinese===""){
		loc_devChinese = "--";
	}
	if(rem_devChinese==undefined||rem_devChinese==null||rem_devChinese===""){
		rem_devChinese = "--";
	}
	
	/**
	 * 网络类型
	 */
	//本端网络类型
	var loc_netChinese = net_type_map.get(loc_net);
	//远端网络类型
	var rem_netChinese = net_type_map.get(rem_net);
	if(loc_netChinese==undefined||loc_netChinese==null||loc_netChinese===""){
		loc_netChinese = "--";
	}
	if(rem_netChinese==undefined||rem_netChinese==null||rem_netChinese===""){
		rem_netChinese = "--";
	}
	
	/**
	 * 操作系统类型
	 */
	//本端操作系统类型
	var loc_osChinese = os_map.get(loc_os);
	//远端操作系统类型
	var rem_osChinese = os_map.get(rem_os);
	if(loc_osChinese==undefined||loc_osChinese==null||loc_osChinese===""){
		loc_osChinese = "--";
	}
	if(rem_osChinese==undefined||rem_osChinese==null||rem_osChinese===""){
		rem_osChinese = "--";
	}
	
	
	/**
	 * 用户类型
	 */
	var loc_user_typeChinese = user_type_map.get(loc_user_type);
	//远端操作系统类型
	var rem_user_typeChinese = user_type_map.get(rem_user_type);
	if(loc_user_typeChinese==undefined||loc_user_typeChinese==null||loc_user_typeChinese===""){
		loc_user_typeChinese = "--";
	}
	if(rem_user_typeChinese==undefined||rem_user_typeChinese==null||rem_user_typeChinese===""){
		rem_user_typeChinese = "--";
	}
	
	var html = "";
	html += "<table class='detailTable'>" +
				"<tr>" +
					"<th>方向</th>" +
					"<th>地域编号</th>" +
					"<th>运营商编号</th>" +
					"<th>设备类型</th>" +
					"<th>mac地址</th>" +
					"<th>具体设备型号</th>" +
					"<th>hostID</th>" +
					"<th>网络类型</th>" +
					"<th>操作系统类型</th>" +
					"<th>用户类型</th>" +
				"</tr>" +
				"<tr>" +
					"<td>本端</td>" +
					"<td>"+loc_domChinese+"["+loc_dom+"]</td>" +
					"<td>"+loc_ispChinese+"["+loc_isp+"]</td>" +
					"<td>"+loc_devChinese+"["+loc_dev+"]</td>" +
					"<td>"+loc_dev_id+"</td>" +
					"<td>"+loc_dev_name+"</td>" +
					"<td>"+loc_hostid+"</td>" +
					"<td>"+loc_netChinese+"["+loc_net+"]</td>" +
					"<td>"+loc_osChinese+"["+loc_os+"]</td>" +
					"<td>"+loc_user_typeChinese+"["+loc_user_type+"]</td>" +
				"</tr>" +
				"<tr>" +
					"<td>远端</td>" +
					"<td>"+rem_domChinese+"["+rem_dom+"]</td>" +
					"<td>"+rem_ispChinese+"["+rem_isp+"]</td>" +
					"<td>"+rem_devChinese+"["+rem_dev+"]</td>" +
					"<td>"+rem_dev_id+"</td>" +
					"<td>"+rem_dev_name+"</td>" +
					"<td>"+rem_hostid+"</td>" +
					"<td>"+rem_netChinese+"["+rem_net+"]</td>" +
					"<td>"+rem_osChinese+"["+rem_os+"]</td>" +
					"<td>"+rem_user_typeChinese+"["+rem_user_type+"]</td>" +
				"</tr>" +
			"</table>";
	
	
	$('#callerAll_Ext_dev_info').append(html);
}


/**
 * “总览”页面的“打洞信息”，去掉了，不再显示
 * @param {} data
 */
function allViewPunchView(datas){
	var html = "";
	var call;
	
	//主叫
	var loc_Local;
	var loc_nat;
	var loc_src;
	var loc_dom;
	var loc_isp;
	var loc_dev;
	var loc_net;
	var loc_os;
	var loc_user_Type;
	
	
	//被叫
	var rem_Local;
	var rem_nat;
	var rem_src;
	var rem_dom;
	var rem_isp;
	var rem_dev;
	var rem_net;
	var rem_os;
	var rem_user_Type;
	
	var callerp2p;
	var calledp2p;
	
	var data = datas.data;
	if(data!=undefined&&data!=null&&data!==""){
		var caller = data.caller;
		if(caller!=undefined&&caller!=null&&caller!==""){
			call = caller.call;
			if(call!=undefined&&call!=null&&call!==""){
				//主叫端
				var punchCaller = call.punch;
				if(punchCaller!=undefined&&punchCaller!=null&&punchCaller!==""){
					var punchArrCaller = splitString(punchCaller);
					var mapCaller = new Map();
					for(var i=0;i<punchArrCaller.length;i++){
						mapCaller.put(punchArrCaller[i].split('=')[0],punchArrCaller[i].split('=')[1]);
					}
					
					//正常取值
					loc_Local = mapCaller.get('loc_host');
					
					loc_nat = mapCaller.get('loc_ref');
					
					loc_src = mapCaller.get('loc_rel');
					
					loc_dom = mapCaller.get('loc_dom');
					
					loc_isp = mapCaller.get('loc_isp');
					
					loc_dev = mapCaller.get('loc_dev');
					
					loc_net = mapCaller.get('loc_net');
					
					loc_os = mapCaller.get('loc_os');
					loc_user_Type = mapCaller.get('loc_user_Type');
					
					//主、被各取一次，以防止获取不到主或被数据时无法显示p2p
					//p2p result
					var p2pArr = mapCaller.get('ice_res').split(':');
					callerp2p = p2pArr[2];
				}
			}
		}
		
		var called = data.called;
		if(called!=undefined&&called!=null&&called!==""){
			call = called.call;
			if(call!=undefined&&call!=null&&call!==""){
				//主叫端
				var punchCalled = call.punch;
				if(punchCalled!=undefined&&punchCalled!=null&&punchCalled!==""){
					var punchArrCalled = splitString(punchCalled);
					var mapCalled = new Map();
					for(var i=0;i<punchArrCalled.length;i++){
						mapCalled.put(punchArrCalled[i].split('=')[0],punchArrCalled[i].split('=')[1]);
					}
					
					//这里虽然要显示rem，但要按loc取值，因为在获取的json中，主叫和被叫都有loc和rem，并且主叫的loc=被叫的rem，主叫的rem＝被叫的loc
					//正常取值
					rem_Local = mapCalled.get('loc_host');
					
					rem_nat = mapCalled.get('loc_ref');
					
					rem_src = mapCalled.get('loc_rel');
					
					rem_dom = mapCalled.get('loc_dom');
					
					rem_isp = mapCalled.get('loc_isp');
					
					rem_dev = mapCalled.get('loc_dev');
					
					rem_net = mapCalled.get('loc_net');
					
					rem_os = mapCalled.get('loc_os');
					rem_user_Type = mapCalled.get('loc_user_Type');
					
					//主、被各取一次，以防止获取不到主或被数据时无法显示p2p
					//p2p result
					var p2pArr = mapCalled.get('ice_res').split(':');
					calledp2p = p2pArr[2];
				}
			}
		}
	}		
	
	//空值校验
	if(loc_Local==undefined||loc_Local==null||loc_Local===""){
		loc_Local = "无";
	}
	if(loc_nat==undefined||loc_nat==null||loc_nat===""){
		loc_nat = "无";
	}
	if(loc_src==undefined||loc_src==null||loc_src===""){
		loc_src = "无";
	}
	if(loc_dom==undefined||loc_dom==null||loc_dom===""){
		loc_dom = "无";
	}
	if(loc_isp==undefined||loc_isp==null||loc_isp===""){
		loc_isp = "无";
	}
	if(loc_dev==undefined||loc_dev==null||loc_dev===""){
		loc_dev = "无";
	}
	if(loc_net==undefined||loc_net==null||loc_net===""){
		loc_net = "无";
	}
	if(loc_os==undefined||loc_os==null||loc_os===""){
		loc_os = "无";
	}
	if(loc_user_Type==undefined||loc_user_Type==null||loc_user_Type===""){
		loc_user_Type = "无";
	}
	
	//空值校验
	if(rem_Local==undefined||rem_Local==null||rem_Local===""){
		rem_Local = "无";
	}
	if(rem_nat==undefined||rem_nat==null||rem_nat===""){
		rem_nat = "无";
	}
	if(rem_src==undefined||rem_src==null||rem_src===""){
		rem_src = "无";
	}
	if(rem_dom==undefined||rem_dom==null||rem_dom===""){
		rem_dom = "无";
	}
	if(rem_isp==undefined||rem_isp==null||rem_isp===""){
		rem_isp = "无";
	}
	if(rem_dev==undefined||rem_dev==null||rem_dev===""){
		rem_dev = "无";
	}
	if(rem_net==undefined||rem_net==null||rem_net===""){
		rem_net = "无";
	}
	if(rem_os==undefined||rem_os==null||rem_os===""){
		rem_os = "无";
	}
	if(rem_user_Type==undefined||rem_user_Type==null||rem_user_Type===""){
		rem_user_Type = "无";
	}
	
	if(callerp2p==undefined||callerp2p==null||callerp2p===""){
		callerp2p = "无";
	}
	if(calledp2p==undefined||calledp2p==null||calledp2p===""){
		calledp2p = "无";
	}
	
	//主叫空值校验
	var net_type_map_loc_net = "";
	var os_map_loc_os = "";
	var user_type_map_loc_user_Type = "";
	var device_type_map_loc_dev = "";
	var domain_map_loc_dom = "";
	var isp_map_loc_isp = "";
	if(net_type_map.get(loc_net)!=undefined){
		net_type_map_loc_net = net_type_map.get(loc_net);
	}
	if(os_map.get(loc_os)!=undefined){
		os_map_loc_os = os_map.get(loc_os);
	}
	if(user_type_map.get(loc_user_Type)!=undefined){
		user_type_map_loc_user_Type = user_type_map.get(loc_user_Type);
	}
	if(device_type_map.get(loc_dev)!=undefined){
		device_type_map_loc_dev = device_type_map.get(loc_dev);
	}
	if(domain_map.get(loc_dom)!=undefined){
		domain_map_loc_dom = domain_map.get(loc_dom);
	}
	if(isp_map.get(loc_isp)!=undefined){
		isp_map_loc_isp = isp_map.get(loc_isp);
	}
	
	//被叫空值校验
	var net_type_map_rem_net = "";
	var os_map_rem_os = "";
	var user_type_map_rem_user_Type = "";
	var device_type_map_rem_dev = "";
	var domain_map_rem_dom = "";
	var isp_map_rem_isp = "";
	if(net_type_map.get(rem_net)!=undefined){
		net_type_map_rem_net = net_type_map.get(rem_net);
	}
	if(os_map.get(rem_os)!=undefined){
		os_map_rem_os = os_map.get(rem_os);
	}
	if(user_type_map.get(rem_user_Type)!=undefined){
		user_type_map_rem_user_Type = user_type_map.get(rem_user_Type);
	}
	if(device_type_map.get(rem_dev)!=undefined){
		device_type_map_rem_dev = device_type_map.get(rem_dev);
	}
	if(domain_map.get(rem_dom)!=undefined){
		domain_map_rem_dom = domain_map.get(rem_dom);
	}
	if(isp_map.get(rem_isp)!=undefined){
		isp_map_rem_isp = isp_map.get(rem_isp);
	}
	
	html += "主叫端：" +
			"<span class='summaryStyle'>P2P result：</span>"+callerp2p+"<br/>"+
			"<span class='summaryStyle'>Local</span>&nbsp;["+loc_Local+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>nat</span>&nbsp;["+loc_nat+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>srv</span>&nbsp;["+loc_src+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_net&nbsp;=&nbsp;</span>"+net_type_map_loc_net+"["+loc_net+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_os&nbsp;=&nbsp;</span>"+os_map_loc_os+"["+loc_os+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_user_Type&nbsp;=&nbsp;</span>"+user_type_map_loc_user_Type+"["+loc_user_Type+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_dev&nbsp;=&nbsp;</span>"+device_type_map_loc_dev+"["+loc_dev+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_dom&nbsp;=&nbsp;</span>"+domain_map_loc_dom+"["+loc_dom+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_isp&nbsp;=&nbsp;</span>"+isp_map_loc_isp+"["+loc_isp+"]<br/>"+
			"被叫端：" +
			"<span class='summaryStyle'>P2P result：</span>"+calledp2p+"<br/>"+
			"<span class='summaryStyle'>Local</span>&nbsp;["+rem_Local+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>nat</span>&nbsp;["+rem_nat+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>srv</span>&nbsp;["+rem_src+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_net&nbsp;=&nbsp;</span>"+net_type_map_rem_net+"["+rem_net+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_os&nbsp;=&nbsp;</span>"+os_map_rem_os+"["+rem_os+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_user_Type&nbsp;=&nbsp;</span>"+user_type_map_rem_user_Type+"["+rem_user_Type+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_dev&nbsp;=&nbsp;</span>"+device_type_map_rem_dev+"["+rem_dev+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_dom&nbsp;=&nbsp;</span>"+domain_map_rem_dom+"["+rem_dom+"]&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>loc_isp&nbsp;=&nbsp;</span>"+isp_map_rem_isp+"["+rem_isp+"]";
	$('#callerAll_punch').html(html);
}

/**
 * “总览”标签页的“Relay路径信息”，主叫向数据
 * @param {} data
 */
function allViewRelayView_zb(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					//取得voip的整体信息
					var voip = call.voip;
					if(voip!=undefined&&voip!=null&&voip!==""){
						//获取voip包含的三个子部分
						var pathid;
						var pathinfo;
						var pathsub;
							
						//道路id
						var pid ;
						//道路类型
						var path_type ;
						//道路角色
						var path_role ;
						
						var html = "";
						html += "<table class='detailTable'>";
						$.each(voip,function(i,val){
							//获取voip包含的三个子部分
							pathid = val.pathid;
							pathinfo = val.pathinfo;
							pathsub  = val.pathsub;
						    if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
								//上部道路信息
								var map = new Map();
								var pathinfoArr = splitString(pathinfo);
								$.each(pathinfoArr,function(j,va){
									map.put(va.split('=')[0],va.split('=')[1]);
								});
								
								//道路类型
								path_type = map.get('path_type');
								//道路角色
								path_role = map.get('path_role'); 
								
								//各段丢包率
								var src;
								var dst;
								var total ;//总包数
								var loss ;//总丢包
								var loss_r ;//总丢包率
								
								var audio ;//视频总包数
								var a_loss ;//视频丢包数
								var a_loss_r ;//视频丢包率
								
								var video ;//音频总包数
								var v_loss ;//音频丢包数
								var v_loss_r ;//音频丢包率
								
								var v_fec ;//FEC总包数
								var vf_loss ;//FEC丢包数
								var vf_loss_r ;//FEC丢包率
								
								var delay_aver;	//延时
								
								var allArr;
								var map1 = new Map();
								if(path_type!='rpath'){
									html += "<tr>" +
												"<td>" ;
													html += path_role;
										html += "</td>"+
												"<td id='allViewRelayView_zb"+i+"' style='width:400px;'></td>"+
												"<td valign='top'>";
												if(pathsub!=undefined&&pathsub!=null&&pathsub!==""&&pathsub.length>0){
													/*var p2p = 0;
													$.each(pathsub,function(i,val){
														allArr = val.split(" ");
														$.each(allArr,function(j,va){
															map1.put(va.split('=')[0],va.split('=')[1]);
														});
														//判断是不是p2p路径
														map1.each(function(key,value,i){
															if(value=='CISRV'||value=='CRISRV'){
																p2p = 1;
															}
														});
													});*/
													
													html += "<table class='detailTable'>";
													html +="<tr><td></td><td>总丢包率(%)</td><td>视频丢包率(%)</td><td>音频丢包率(%)</td><td>FEC丢包率(%)</td><td>延时(ms)</td></tr>";
													$.each(pathsub,function(i,val){
														allArr = splitString(val);
														$.each(allArr,function(j,va){
															map1.put(va.split('=')[0],va.split('=')[1]);
														});
														src = map1.get('src');
														dst = map1.get('dst');
					
														total = map1.get('total');
														loss = map1.get('loss');
														loss_r = map1.get('loss_r');
														
														audio = map1.get('audio');
														a_loss = map1.get('a_loss');
														a_loss_r = map1.get('a_loss_r');
														
														video = map1.get('video');
														v_loss = map1.get('v_loss');
														v_loss_r = map1.get('v_loss_r');
														
														v_fec = map1.get('v_fec');
														vf_loss = map1.get('vf_loss');
														vf_loss_r = map1.get('vf_loss_r');
														
														delay_aver = map1.get('delay_aver');
														//空值校验
														if(total==undefined||total==null||total===""){
															total = "无";
														}
														if(loss==undefined||loss==null||loss===""){
															loss = "无";
														}
														if(loss_r==undefined||loss_r==null||loss_r===""){
															loss_r = "无";
														}
														if(audio==undefined||audio==null||audio===""){
															audio = "无";
														}
														if(a_loss==undefined||a_loss==null||a_loss===""){
															a_loss = "无";
														}
														if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
															a_loss_r = "无";
														}
														if(video==undefined||video==null||video===""){
															video = "无";
														}
														if(v_loss==undefined||v_loss==null||v_loss===""){
															v_loss = "无";
														}
														if(v_loss_r==undefined||v_loss_r==null||v_loss_r===""){
															v_loss_r = "无";
														}
														if(v_fec==undefined||v_fec==null||v_fec===""){
															v_fec = "无";
														}
														if(vf_loss==undefined||vf_loss==null||vf_loss===""){
															vf_loss = "无";
														}
														if(vf_loss_r==undefined||vf_loss_r==null||vf_loss_r===""){
															vf_loss_r = "无";
														}
														if(delay_aver==undefined||delay_aver==null||delay_aver===""){
															delay_aver = "无";
														}
														if(path_type == 'p2ppath'){//是p2p路径
															if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																html +="<tr>"+
																			"<td>" +
																				"Us→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>" +
																			"<td>" +
																				delay_aver+
																			"</td>" +
																		"</tr>";
															
															}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																html +="<tr>"+
																	 		"<td>" +
																				"Us→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>" +
																			"<td>" +
																				delay_aver+
																			"</td>" +
																		"</tr>";
															}
														}else{
															if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																if(dst!=undefined&&dst!=null&&dst!=""){
																	if(dst.indexOf("_")<0){
																		dst = "<font color='red'>R*</font>";
																	}else{
																		dst = "R"+dst.split("_")[1];
																	}
																}else{
																	dst = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	 		"<td>" +
																				"Us→"+ dst +
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>" +
																			"<td>" +
																				delay_aver+
																			"</td>" +
																		"</tr>";
															
															}else if(map1.get('sub_type')=='CISRV'||map1.get('sub_type')=='CRISRV'){//RR
																if(src!=undefined&&src!=null&&src!==""){
																	if(src.indexOf("_")<0){
																		src = "<font color='red'>R*</font>";
																	}else{
																		src = "R"+src.split("_")[1];
																	}
																}else{
																	src = "<font color='red'>R*</font>";
																}
																
																if(dst!=undefined&&dst!=null&&dst!==""){
																	if(dst.indexOf("_")<0){
																		dst = "<font color='red'>R*</font>";
																	}else{
																		dst = "R"+dst.split("_")[1];
																	}
																}else{
																	dst = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	 		"<td>" +
																				src +"→"+ dst +
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>" +
																			"<td>" +
																				delay_aver+
																			"</td>" +
																		"</tr>";
															}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																if(src!=undefined&&src!=null&&src!==""){
																	if(src.indexOf("_")<0){
																		src = "<font color='red'>R*</font>";
																	}else{
																		src = "R"+src.split("_")[1];
																	}
																}else{
																	src = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	 		"<td>" +
																				src +"→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>" +
																			"<td>" +
																				delay_aver+
																			"</td>" +
																		"</tr>";
															}
														}
													});
													html +="</table>";
												}else{
													html += "未获取数据，无法展示信息！";
												}
									html += "</td>" +
										"</tr>";
								}
							}
						});
						html += "</table>";
						
						//必须先把创建好的表格放到页面中，才能通过其id画relay的关系图
						$('#allView_zb').html(html);
						
						//取得getpath的信息
						var getpath = caller.getpath;
						if(getpath!=undefined&&getpath!=null&&getpath!==""){
							var resp_cmd_path_array = getpath.resp_cmd_path_array;
							if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
								//画Relay关系图
								$.each(voip,function(i,val){
									pathid = val.pathid;
									pathinfo = val.pathinfo;
									if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
										var map = new Map();
										var pathinfoArr = splitString(pathinfo);
										$.each(pathinfoArr,function(j,va){
											map.put(va.split('=')[0],va.split('=')[1]);
										});
										//路径ID
										pid = map.get('pid');
										//道路类型
										path_type = map.get('path_type');
										
										if(path_type!='rpath'){
											var flag = 0;
											//画Relay关系图
											$.each(resp_cmd_path_array,function(j,v){
												if(pathid==v.path_id||pid==v.path_id){//取得与pathid对应的getpath中的子路径
													flag = 1;
													//画图函数
													drawPathByDataObject(v,"allViewRelayView_zb"+i);
													return;
												}
											});
											if(flag==0){
												$("#allViewRelayView_zb"+i).text("getpath中没有与"+pathid+"对应的路径,无法展示关系图。");
											}
										}
									}else{
										$("allViewRelayView_zb"+i).text("getpath中没有对应的路径,无法展示关系图。");
									}
								});
							}
						}
					}
				}
			}
		}
	}
}

/**
 * “总览”标签页的“Relay路径信息”，被叫向数据
 * @param {} data
 */
function allViewRelayView_bz(datas){
	var result = datas.result;
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				var call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					//取得voip的整体信息
					var voip = call.voip;
					if(voip!=undefined&&voip!=null&&voip!==""){
						//获取voip包含的三个子部分
						var pathid;
						var pathinfo;
						var pathsub;
						
						//道路id
						var pid ;
						//道路类型
						var path_type ;
						//道路角色
						var path_role;
							
						var html = "";
						html += "<table class='detailTable'>" ;
						$.each(voip,function(i,val){
							//获取voip包含的三个子部分
							pathid = val.pathid;
							pathinfo = val.pathinfo;
							pathsub  = val.pathsub;
							if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
								//上部道路信息
								var map = new Map();
								var pathinfoArr = splitString(pathinfo);
								$.each(pathinfoArr,function(j,va){
									map.put(va.split('=')[0],va.split('=')[1]);
								});
								
								//道路类型
								path_type = map.get('path_type');
								//道路角色
								path_role = map.get('path_role'); 
								
								//空值校验
								if(path_role==undefined||path_role==null||path_role===""){
									path_role = "未提供数据";
								}
								
								//各段丢包率
								var src;
								var dst;
								var total ;//总包数
								var loss ;//总丢包
								var loss_r ;//总丢包率
								
								var audio ;//视频总包数
								var a_loss ;//视频丢包数
								var a_loss_r ;//视频丢包率
								
								var video ;//音频总包数
								var v_loss ;//音频丢包数
								var v_loss_r ;//音频丢包率
								
								var v_fec ;//FEC总包数
								var vf_loss ;//FEC丢包数
								var vf_loss_r ;//FEC丢包率
								
								var delay_aver ;//延时
								
								var allArr;
								var map1 = new Map();
								if(path_type!='rpath'){
									html += "<tr>" +
												"<td>" ;
													html += path_role;
										html += "</td>"+
												"<td id='allViewRelayView_bz"+i+"' style='width:400px;'></td>"+
												"<td valign='top'>";
												if(pathsub!=undefined&&pathsub!=null&&pathsub!==""&&pathsub.length>0){
													/*var p2p = 0;
													$.each(pathsub,function(i,val){
														allArr = val.split(" ");
														$.each(allArr,function(j,va){
															map1.put(va.split('=')[0],va.split('=')[1]);
														});
														//判断是不是p2p路径
														map1.each(function(key,value,i){
															if(value=='CISRV'||value=='CRISRV'){
																p2p = 1;
															}
														});
													});*/
													html += "<table class='detailTable'>";
													html +="<tr><td></td><td>总丢包率(%)</td><td>视频丢包率(%)</td><td>音频丢包率(%)</td><td>FEC丢包率(%)</td><td>延时(ms)</td></tr>";
													$.each(pathsub,function(i,val){
														allArr = splitString(val);
														$.each(allArr,function(j,va){
															map1.put(va.split('=')[0],va.split('=')[1]);
														});
														src = map1.get('src');
														dst = map1.get('dst');
														
														total = map1.get('total');
														loss = map1.get('loss');
														loss_r = map1.get('loss_r');
														
														audio = map1.get('audio');
														a_loss = map1.get('a_loss');
														a_loss_r = map1.get('a_loss_r');
														
														video = map1.get('video');
														v_loss = map1.get('v_loss');
														v_loss_r = map1.get('v_loss_r');
														
														v_fec = map1.get('v_fec');
														vf_loss = map1.get('vf_loss');
														vf_loss_r = map1.get('vf_loss_r');
														
														delay_aver = map1.get('delay_aver');
														
														//空值校验
														if(total==undefined||total==null||total===""){
															total = "无";
														}
														if(loss==undefined||loss==null||loss===""){
															loss = "无";
														}
														if(loss_r==undefined||loss_r==null||loss_r===""){
															loss_r = "无";
														}
														if(audio==undefined||audio==null||audio===""){
															audio = "无";
														}
														if(a_loss==undefined||a_loss==null||a_loss===""){
															a_loss = "无";
														}
														if(a_loss_r==undefined||a_loss_r==null||a_loss_r===""){
															a_loss_r = "无";
														}
														if(video==undefined||video==null||video===""){
															video = "无";
														}
														if(v_loss==undefined||v_loss==null||v_loss===""){
															v_loss = "无";
														}
														if(v_loss_r==undefined||v_loss_r==null||v_loss_r===""){
															v_loss_r = "无";
														}
														if(v_fec==undefined||v_fec==null||v_fec===""){
															v_fec = "无";
														}
														if(vf_loss==undefined||vf_loss==null||vf_loss===""){
															vf_loss = "无";
														}
														if(vf_loss_r==undefined||vf_loss_r==null||vf_loss_r===""){
															vf_loss_r = "无";
														}
														if(delay_aver==undefined||delay_aver==null||delay_aver===""){
															delay_aver = "无";
														}
																												
														if(path_type == 'p2ppath'){//是p2p路径
															if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																html +="<tr>"+
																	       "<td>" +
																				"Us→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>"+
																			"<td>" +
																				delay_aver+
																			"</td>"+
																		"</tr>";
															}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																html +="<tr>"+
																	        "<td>" +
																				"Us→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>"+
																			"<td>" +
																				delay_aver+
																			"</td>"+
																		"</tr>";
															}
														}else{
															if(map1.get('sub_type')=='CLU'||map1.get('sub_type')=='CRU'){//UR
																if(dst!=undefined&&dst!=null&&dst!==""){
																	if(dst.indexOf("_")<0){
																		dst = "<font color='red'>R*</font>";
																	}else{
																		dst = "R"+dst.split("_")[1];
																	}
																}else{
																	dst = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	 		"<td>" +
																				"Us→"+ dst +
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>"+
																			"<td>" +
																				delay_aver+
																			"</td>"+
																		"</tr>";
															
															}else if(map1.get('sub_type')=='CISRV'||map1.get('sub_type')=='CRISRV'){//RR
																if(src!=undefined&&src!=null&&src!==""){
																	if(src.indexOf("_")<0){
																		src = "<font color='red'>R*</font>";
																	}else{
																		src = "R"+src.split("_")[1];
																	}
																}else{
																	src = "<font color='red'>R*</font>";
																}
																
																if(dst!=undefined&&dst!=null&&dst!==""){
																	if(dst.indexOf("_")<0){
																		dst = "<font color='red'>R*</font>";
																	}else{
																		dst = "R"+dst.split("_")[1];
																	}
																}else{
																	dst = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	 		"<td>" +
																				src +"→"+ dst +
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>"+
																			"<td>" +
																				delay_aver+
																			"</td>"+
																		"</tr>";
															}else if(map1.get('sub_type')=='CRD'||map1.get('sub_type')=='CLD'){//RU
																if(src!=undefined&&src!=null&&src!==""){
																	if(src.indexOf("_")<0){
																		src = "<font color='red'>R*</font>";
																	}else{
																		src = "R"+src.split("_")[1];
																	}
																}else{
																	src = "<font color='red'>R*</font>";
																}
																html +="<tr>"+
																	       "<td>" +
																				src +"→Ud"+
																			"</td>"+
																			"<td>" +
																				loss_r+"("+loss+"/"+total+")"+
																			"</td>"+
																			"<td>" +
																				v_loss_r+"("+v_loss+"/"+video+")"+
																			"</td>"+
																			"<td>" +
																				a_loss_r+"("+a_loss+"/"+audio+")"+
																			"</td>"+
																			"<td>" +
																				vf_loss_r+"("+vf_loss+"/"+v_fec+")"+
																			"</td>"+
																			"<td>" +
																				delay_aver+
																			"</td>"+
																		"</tr>";
															}
														}
													});
													html +="</table>";
												}else{
													html += "未获取数据，无法展示信息！";
												}
									html += "</td>" +
										"</tr>";
								}
							}
						});
						html += "</table>";
						
						//必须先把创建好的表格放到页面中，才能通过其id画relay的关系图
						$('#allView_bz').html(html);
						
						//取得getpath的信息
						var getpath = called.getpath;
						if(getpath!=undefined&&getpath!=null&&getpath!==""){
							var resp_cmd_path_array = getpath.resp_cmd_path_array;
							if(resp_cmd_path_array!=undefined&&resp_cmd_path_array!=null&&resp_cmd_path_array!==""){
								//画Relay关系图
								$.each(voip,function(i,val){
									pathid = val.pathid;
									
									pathinfo = val.pathinfo;
									if(pathinfo!=undefined&&pathinfo!=null&&pathinfo!==""){
										//上部道路信息
										var map = new Map();
										var pathinfoArr = splitString(pathinfo);
										$.each(pathinfoArr,function(j,va){
											map.put(va.split('=')[0],va.split('=')[1]);
										});
										//道路id
										pid = map.get('pid');
										//道路类型
										path_type = map.get('path_type');
										
										if(path_type!='rpath'){
											var flag = 0;
											//画Relay关系图
											$.each(resp_cmd_path_array,function(j,v){
												if(pathid==v.path_id||pid==v.path_id){//取得与pathid对应的getpath中的子路径
													flag = 1;
													//画图函数
													drawPathByDataObject(v,"allViewRelayView_bz"+i);
													return;
												}
											});
											if(flag==0){
												$("#allViewRelayView_bz"+i).text("getpath中没有与"+pathid+"对应的路径,无法展示关系图。");
											}
										}
									}else{
										$("#allViewRelayView_bz"+i).text("getpath中没有对应的路径,无法展示关系图。");
									}
								});
							}
						}
					}
				}
			}
		}
	}
}



/**
 *“总览”页面的“流信息统计”
 * @param {} data
 */
function allViewStreamView(datas){
	var html = "";
	var data;
	var caller;
	var called;
	var call;
	var total;
	var streamSummary;
	var summary;
	
	//主叫
	var countcaller;//主叫道路切换次数
	var recvAudioLossRcaller;//主叫音频丢包率
	var recvVideoLossRcaller ;//主叫 fec恢复前的视频丢包率
	var recvFecLossRcaller;//主叫fec恢复后的视频流丢包率
	
	//被叫
	var countcalled;//被叫道路切换次数
	var recvAudioLossRcalled;//被叫音频丢包率
	var recvVideoLossRcalled ;//被叫 fec恢复前的视频丢包率
	var recvFecLossRcalled;//被叫fec恢复后的视频流丢包率
	
	var result = datas.result;
	
	/*
	 * 对于 fec恢复后的视频流丢包率有两个地方可以取值，一个是call/total/streamSummary/recvFecLostR，另一个是call/stream/recv/v_after_fec_recover_loss_r
	   ，所以都要取出来，默认按第一个取值，如果第一个没有，再按第二个显示，都没有值时，显示无。
	*/
	var stream;
	var recv;
	var v_after_fec_recover_loss_r_caller;//主叫 fec恢复后的视频流丢包率
	var v_after_fec_recover_loss_r_called;//被叫 fec恢复后的视频流丢包率
	var v_after_r_caller;//主叫 fec恢复后的视频流丢包率
	var v_after_r_called;//被叫 fec恢复后的视频流丢包率
	
	if(result===0){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			//取主的
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						streamSummary = total.streamSummary;
						if(streamSummary!=undefined&&streamSummary!=null&&streamSummary!==""){
							recvAudioLossRcaller = streamSummary.recvAudioLossR;
							recvVideoLossRcaller = streamSummary.recvVideoLossR;
							recvFecLossRcaller = streamSummary.recvFecLostR;
						}
						summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							countcaller = summary.count;
						}
					}
					
					
					stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = splitString(recv);
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							// fec恢复后的视频流丢包率
							v_after_fec_recover_loss_r_caller = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率
						}
					}
				}
			}
			
			//------------------------------------
			//取被的
			called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						streamSummary = total.streamSummary;
						if(streamSummary!=undefined&&streamSummary!=null&&streamSummary!==""){
							recvAudioLossRcalled = streamSummary.recvAudioLossR;
							recvVideoLossRcalled = streamSummary.recvVideoLossR;
							recvFecLossRcalled = streamSummary.recvFecLostR;
						}
						summary = total.summary;
						if(summary!=undefined&&summary!=null&&summary!==""){
							countcalled = summary.count;
						}
					}
					
					stream = call.stream;
					if(stream!=undefined&&stream!=null&&stream!==""){
						recv = stream.recv;
						if(recv!=undefined&&recv!=null&&recv!==""){
							var recvArr = splitString(recv);
							var maprecv = new Map();
							$.each(recvArr,function(i,val){
								maprecv.put(val.split('=')[0],val.split('=')[1]);
							});
							// fec恢复后的视频流丢包率
							v_after_fec_recover_loss_r_called = maprecv.get('v_after_fec_recover_loss_r');//fec恢复后的视频流丢包率
						}
					}
				}
			}
			//------------------------------------
		}
	}
	
	//空值校验，主叫
	if(recvAudioLossRcaller==undefined||recvAudioLossRcaller==null||recvAudioLossRcaller===""){
		recvAudioLossRcaller = "无";
	}else{
		recvAudioLossRcaller = toFixed(recvAudioLossRcaller)+"%";
	}
	
	if(recvVideoLossRcaller == undefined||recvVideoLossRcaller==null||recvVideoLossRcaller===""){
		recvVideoLossRcaller = "无";
	}else{
		recvVideoLossRcaller = toFixed(recvVideoLossRcaller)+"%";
	}
	
	if(recvFecLossRcaller!=undefined&&recvFecLossRcaller!=null&&recvFecLossRcaller!==""){
		v_after_r_caller = toFixed(recvFecLossRcaller)+"%";
	}else if(v_after_fec_recover_loss_r_caller!=undefined&&v_after_fec_recover_loss_r_caller!=null&&v_after_fec_recover_loss_r_caller!==""){
		v_after_r_caller = toFixed(v_after_fec_recover_loss_r_caller)+"%";
	}else{
		v_after_r_caller = "无";
	}
	
	if(countcaller==undefined||countcaller==null||countcaller===""){
		countcaller = "无";
	}
	
	//空值校验，被叫
	if(recvAudioLossRcalled==undefined||recvAudioLossRcalled==null||recvAudioLossRcalled===""){
		recvAudioLossRcalled = "无";
	}else{
		recvAudioLossRcalled = toFixed(recvAudioLossRcalled)+"%";
	}
	
	if(recvVideoLossRcalled==undefined||recvVideoLossRcalled==null||recvVideoLossRcalled===""){
		recvVideoLossRcalled = "无";
	}else{
		recvVideoLossRcalled = toFixed(recvVideoLossRcalled)+"%";
	}
	
	if(recvFecLossRcalled!=undefined&&recvFecLossRcalled!=null&&recvFecLossRcalled!==""){
		v_after_r_called = toFixed(recvFecLossRcalled)+"%";
	}else if(v_after_fec_recover_loss_r_called!=undefined&&v_after_fec_recover_loss_r_called!=null&&v_after_fec_recover_loss_r_called!==""){
		v_after_r_called = toFixed(v_after_fec_recover_loss_r_called)+"%";
	}else{
		v_after_r_called = "无";
	}
	
	if(countcalled==undefined||countcalled==null||countcalled===""){
		countcalled = "无";
	}
	
	html += "主叫收包:<br/>"+
			"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcaller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_caller+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>道路切换次数：</span>"+countcaller+"<br/>"+
			"被叫收包:<br/>"+
			"<span class='summaryStyle'>音频丢包率：</span>"+recvAudioLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复前的视频丢包率：</span>"+recvVideoLossRcalled+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>fec恢复后的视频流丢包率：</span>"+v_after_r_called+"&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<span class='summaryStyle'>道路切换次数：</span>"+countcalled+"<br/>";
	$('#callerAll_stream').html(html);
}

/**
* “总览”页面的“模块版本号”
 * @param {} data
 */
function allViewVersionView(datas){
	var html = "";
	var data;
	var caller;
	var called;
	var call;
	var total;
	var versioncaller;
	var versioncalled;
	var result = datas.result;
	if(result === 0){
		data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						versioncaller = total.version;
					}
				}
			}
			
			//若主的不存在，按被的取
			called = data.called;
			if(called!=undefined&&called!=null&&called!==""){
				call = called.call;
				if(call!=undefined&&call!=null&&call!==""){
					total = call.total;
					if(total!=undefined&&total!=null&&total!==""){
						versioncalled = total.version;										
					}
				}
			}
			
			
		}
	}
	
	//空值校验
	if(versioncaller==undefined||versioncaller==null||versioncaller===""){
		versioncaller = "无";
	}
	if(versioncalled==undefined||versioncalled==null||versioncalled===""){
		versioncalled = "无";
	}
	
	html += "主叫：<span class='summaryStyle'>"+versioncaller+"</span><br/>被叫：<span class='summaryStyle'>"+versioncalled+"</span>";
	$('#callerAll_version').html(html);
}