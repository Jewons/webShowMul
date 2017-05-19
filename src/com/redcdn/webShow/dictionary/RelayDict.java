package com.redcdn.webShow.dictionary;

import java.util.HashMap;
import java.util.Map;

public class RelayDict {
	public static Map<String,String>	relayMap = new HashMap<String, String>();
	static{
		relayMap.put("210.51.168.106:10026","北京  联通");
		relayMap.put("114.112.74.10:10023","北京  电信");
		relayMap.put("112.65.213.211:10026","上海 联通");
		relayMap.put("180.153.194.179:10023","上海 电信");
		relayMap.put("122.13.78.227:10026","广东 联通");
		relayMap.put("125.88.254.160:10023","广东 电信");
		relayMap.put("125.211.202.29:10026","哈尔滨 联通");
		relayMap.put("222.171.242.143:10023","哈尔滨 电信");
		relayMap.put("123.138.91.25:10026","西安 联通");
		relayMap.put("124.116.176.118:10023","西安 电信");
		relayMap.put("220.249.119.218:10026","武汉 联通");
		relayMap.put("61.183.245.141:10023","武汉 电信");
	    relayMap.put("222.178.179.74:10023", "重庆 电信");
	}
}