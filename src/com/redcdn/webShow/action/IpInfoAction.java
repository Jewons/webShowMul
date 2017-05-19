package com.redcdn.webShow.action;

import net.sf.json.JSONObject;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.google.gson.JsonObject;
import com.redcdn.webShow.dictionary.IpInfoDict;

public class IpInfoAction extends BaseAction{
	private static final long serialVersionUID = 3044114402646944323L;

	private String ip;
	
	public String aboutUserIpInfo(){
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", ip);
		
		JSONObject jsonObject = null;
		int code = 10;
		try {
			//将表单数据传给淘宝接口
			jsonObject = proxy.postFormToCloudStore("http://ip.taobao.com/service/getIpInfo.php", form);
			logger.info("获取ip地址");
			
			//在这个地方将ip地址信息写到文件里
			System.out.println(jsonObject.toString());
		} catch (Exception e) {
			code = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				code = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("code", code);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		logger.info("即将退出IpInfo.aboutUserIpInfo().action");
		return null;
	}
	
	public String aboutUserIpInfoLocalVersion(){
		String ipInfo = IpInfoDict.m_tab.get(ip);
		if (null != ipInfo) {
			logger.info("IP地址的地理信息在缓存里");
			JsonObject jsonObject = new JsonObject();
			jsonObject.addProperty("code", 0);
			jsonObject.addProperty("IpInfo", ipInfo);
			jsonObject.addProperty("Ip", ip);
			return renderJsonString(jsonObject.toString());
		}else {
			MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
			form.add("ip", ip);
			JSONObject jsonObject = null;
			int code = 10;
			try {
				//将表单数据传给淘宝接口
				jsonObject = proxy.postFormToCloudStore("http://ip.taobao.com/service/getIpInfo.php", form);
				logger.info("获取ip地址");
				
				//在这个地方将ip地址信息写到文件里
				System.out.println(jsonObject.toString());
				ipInfo = IpInfoDict.analysisData(jsonObject);
				jsonObject.clear();
				if (ipInfo != null) {
					jsonObject.put("IpInfo", ipInfo);
					jsonObject.put("Ip", ip);
					jsonObject.put("code", 0);
					IpInfoDict.m_tab.put(ip, ipInfo);
				}else {
					jsonObject.put("code", -1);
				}
			} catch (Exception e) {
				code = 10;
				String message = e.getMessage() == null ? "" : e.getMessage();
				if (message.indexOf("Read timed out;") != -1) {
					code = -1;
				}
				jsonObject = new JSONObject();
				jsonObject.element("code", code);
				logger.error(e.getMessage(), e);
			}

			if (isAjax(request)) {
				return renderJsonString(jsonObject.toString());
			}
			logger.info("即将退出IpInfo.aboutUserIpInfo().action");
			return null;
		}	
	}
	
	
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}
	
	
}
