package com.redcdn.webShow.dictionary;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

public class IpInfoDict {
	public static Map<String,String>	m_tab = new HashMap<String, String>();
	
	public static  String analysisData(JSONObject json){
		if (null == json) {
			return null;
		}
		JSONObject data = json.getJSONObject("data");
		String country  = data.getString("country");
		String region   = data.getString("region");
		String city     = data.getString("city");
		String isp      = data.getString("isp");
//		String country_id = data.getString("country_id");
//		String ip       = json.getString("ip");
		String ipInfo = null;
		if (country.equals("未分配或者内网IP")) {
			return "内网IP";
		}else {
			if (!country.equals("中国")) {
				ipInfo = country + " " + region + " " + city + " " + isp;
			}else {
				if (!region.equals("北京市")  && !region.equals("上海市") && !region.equals("天津市") && !region.equals("重庆市")) {
					ipInfo = region + " " +city + " " + isp;
				}else {
					ipInfo = city + " " + isp;
				}
			}
		}
		return ipInfo;
	}
}
