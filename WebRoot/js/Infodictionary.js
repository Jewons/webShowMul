/**
 * 信息字典
 * 
 *
 */


//缓存ip地址对应的地理信息 key为IP地址，value为IP地理信息
var ipMap = new Map();

function getRelayInfo(relayIp){
	var relayMap = new Map();
	relayMap.put("210.51.168.102:20026","北京  联通");
	relayMap.put("114.112.74.7:20023","北京  电信");
	relayMap.put("112.65.213.217:20026","上海 联通");
	relayMap.put("180.153.194.185:20023","上海 电信");
	relayMap.put("122.13.78.228:20026","广东 联通");
	relayMap.put("125.88.254.161:20023","广东 电信");
	relayMap.put("125.211.202.30:20026","哈尔滨 联通");
	relayMap.put("222.171.242.144:20023","哈尔滨 电信");
	relayMap.put("123.138.91.26:20026","西安 联通");
	relayMap.put("124.116.176.117:20023","西安 电信");
	relayMap.put("220.249.119.219:20026","武汉 联通");
	relayMap.put("61.183.245.142:20023","武汉 电信");
	relayMap.put("221.7.112.76:20026", "重庆 联通");
    relayMap.put("222.178.179.75:20023", "重庆 电信");
    
    relayMap.put("111.206.20.107:20026", "北京高配联通 主");
    relayMap.put("114.112.74.3:20023", "北京高配电信 主");
    relayMap.put("111.206.20.106:20026", "北京高配联通 备");
    relayMap.put("114.112.74.2:20023", "北京高配电信 备");
    relayMap.put("121.46.2.24", "广州高配 主");
    relayMap.put("121.46.2.25", "广州高配 备");
	var message = relayMap.get(relayIp);
	if(message!=null&&message !=undefined){
		message += "  " + relayIp;
		return message;
	}else{
		return relayIp;
	}
}

function getNetTypeInfo(value){
	var map = new Map();
	map.put("255","未知网络类型");
	map.put("-1","未知");
	map.put("0","有线");
	map.put("1","wifi");
	map.put("2","4G");
	map.put("3","3G");
	map.put("4","移动3G");
	map.put("5","移动4G");
	map.put("6","联通3G");
	map.put("7","联通4G");
	map.put("8","电信3G");
	map.put("9","电信4G");
	map.put("10","移动2G");
	map.put("11","联通2G");
	map.put("12","电信2G");
	if(isNaN(value)==false){//判断是不是数字
		if(value!=undefined&&value!=null&&value!==""){
			var message = map.get(value);
			if(message!=undefined&&message!=null){
				return message;
			}else{
				return value;
			}
		}
	}else{
		return "非数值类型，无法处理";
	}
}

function getSystemType(value){
	var map = new Map();
	map.put("0","海军会诊系统");
	if(isNaN(value)==false){//判断是不是数字
		if(value!=undefined&&value!=null&&value!==""){
			var message = map.get(value);
			if(message!=undefined&&message!=null){
				return message;
			}else{
				return value;
			}
		}
	}else{
		return "非数值类型，无法处理";
	}
}

function getDeviceType(value){
	var map = new Map();
	map.put("-1","未知");
	map.put("1","pc");
	map.put("2","手机");
	map.put("3","N8");
	map.put("4","X1");
	map.put("5","ANDROID");
	map.put("6", "IOS");
	if(isNaN(value)==false){//判断是不是数字
		if(value!=undefined&&value!=null&&value!==""){
			var message = map.get(value);
			if(message!=undefined&&message!=null){
				return message;
			}else{
				return value;
			}
		}
	}else{
		return "非数值类型，无法处理";
	}
}

function getMeidaType(value){
	var map = new Map();
	map.put("-1","未知");
	map.put("0","视频流");
	map.put("1","音频流");
	map.put("2","文档流");
	if(isNaN(value)==false){//判断是不是数字
		if(value!=undefined&&value!=null&&value!==""){
			var message = map.get(value);
			if(message!=undefined&&message!=null){
				return message;
			}else{
				return value;
			}
		}
	}else{
		return "非数值类型，无法处理";
	}
}
/**
 * 调用taboo接口获取ip地址的地理信息
 * @param value ip地址
 * @returns
 */
//function postUserIpToOutSide(value){
//	console.info("value:"+value);
//	var ip = value.split(":")[0];
//	//var ip = value;
//	console.info("ip:"+ip);
//	$.ajax({
//    		type : "post",
//    		url : "ipinfo.aboutUserIpInfo.action",
//    		//改成同步请求
//    		async: false, 
//    		dataType : "json",
//    		data : "ip=" + ip,
//    		beforeSend : function() {
//    			$(".layer").show();
//    		},
//    		complete : function() {
//    			$(".layer").hide();
//    		},
//    		success : function(data) {
//    			value = getUserIpInfo(data,value);
//    		},
//    		error : function(request, textStatus, errorThrown) {
//    			if (request.status == 900) {
//    				window.location.href = "login.jsp";
//    			}
//    		}
//    	});
//	return value;
// }

/**
 * 处理taoboo返回的数据
 * @param data 淘宝返回的数据 格式为json字符串
 * @param ip 需要转换地理信息的ip地址
 * @returns
 */
//function getUserIpInfo(data,ip){
//	var code = data.code;
//	var info = data.data;
//	var region;
//	var city;
//	var isp;
//	var ipInfo = "";
//	if(code==0&&info!=undefined&&info!=null){
//		var country_id = info.country_id;
//		if(country_id ==="IANA"||country_id == undefined||country_id == null){
//			return ip;
//		}else{
//			region = info.region;
//			city = info.city;
//			isp = info.isp;
//			if(region!=null&&region!=undefined&&region!=="北京市"&&region!=="上海市"&&region!=="天津市"&&region!=="重庆市"){
//				ipInfo = region;
//			}
//			if(city!=null&&city!=undefined){
//				ipInfo += " " +city;
//			}
//			if(isp!=null&&isp!=undefined){
//				ipInfo += " " +isp;
//			}
//			if(ipInfo!==""&&ipInfo!==undefined){
//				return ipInfo + "  " + ip;
//			}else{
//				return ip;
//			}
//		}
//	}else{
//		return ip;
//	}
//}


function getIpInfo(value){
	if(value!=null && value != undefined){
		var ipMessage = ipMap.get(value);
		if(ipMessage==null||ipMessage==undefined || ipMessage === value){
			ipMessage = postUserIpToOutSide(value);
			if(ipMessage != null || ipMessage != undefined){
				ipMap.put(value,ipMessage);
				return ipMessage + "  " + value;
			}else{
				return value;
			}
		}else{
			return ipMessage + "  " + value;
		}
	}
}

/**
 * 调用taboo接口获取ip地址的地理信息
 * @param value ip地址
 * @returns
 */
function postUserIpToOutSide(value){
	console.info("value:"+value);
	$.ajax({
    		type : "post",
    		//url : "ipinfo.aboutUserIpInfo.action",
    		url : "ipinfo.aboutUserIpInfoLocalVersion.action",
    		//改成同步请求
    		async: false, 
    		dataType : "json",
    		data : "ip=" + value,
    		beforeSend : function() {
    			$(".layer").show();
    		},
    		complete : function() {
    			$(".layer").hide();
    		},
    		success : function(data) {
    			value = getUserIpInfo(data,value);
    		},
    		error : function(request, textStatus, errorThrown) {
    			if (request.status == 900) {
    				window.location.href = "login.jsp";
    			}
    		}
    	});
	return value;
 }

/**
 * 处理taoboo返回的数据
 * @param data 淘宝返回的数据 格式为json字符串
 * @param ip 需要转换地理信息的ip地址
 * @returns
 */
//function getUserIpInfo(data,ip){
//	var code = data.code;
//	var info = data.data;
//	var region;
//	var city;
//	var isp;
//	var ipInfo = "";
//	if(code==0&&info!=undefined&&info!=null){
//		var country_id = info.country_id;
//		if(country_id ==="IANA"||country_id == undefined||country_id == null){
//			return null;
//		}else{
//			region = info.region;
//			city = info.city;
//			isp = info.isp;
//			if(region!=null&&region!=undefined&&region!=="北京市"&&region!=="上海市"&&region!=="天津市"&&region!=="重庆市"){
//				ipInfo = region;
//			}
//			if(city!=null&&city!=undefined){
//				ipInfo += " " +city;
//			}
//			if(isp!=null&&isp!=undefined){
//				ipInfo += " " +isp;
//			}
//			if(ipInfo!==""&&ipInfo!==undefined){
//				return ipInfo;
//			}else{
//				return null;
//			}
//		}
//	}else{
//		return null;
//	}
//}
/**
 * 处理taoboo返回的数据
 * @param data 淘宝返回的数据 格式为json字符串
 * @param ip 需要转换地理信息的ip地址
 * @returns
 */
function getUserIpInfo(data,ip){
	var code = data.code;
	var ipInfo = data.IpInfo;
	console.info("code:"+code);
	console.info("ipInfo:"+ipInfo);
	if(code == 0){
		if(ipInfo!=undefined&&ipInfo!=null){
			return ipInfo + " " + ip;
		}else
			return ip;
	}else {
		return ip;
	}
	
}

function getKeyword(){
	return "媒体接收|数据包 [媒体接收]校验包 包补发请求";
}