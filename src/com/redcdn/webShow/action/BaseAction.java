package com.redcdn.webShow.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import com.redcdn.webShow.common.Struts2Utils;
import com.redcdn.webShow.ws.proxy.RestTemplateProxy;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BaseAction extends ActionSupport implements SessionAware,ServletRequestAware,ServletResponseAware
{

	private static final long serialVersionUID = -5928621999360509705L;
    
    private static final String MESSAGE ="message";
    
    protected Logger logger = Logger.getLogger(BaseAction.class);

    protected HttpServletRequest request;

    protected HttpServletResponse response;

    protected Map<String, Object> map;
    
    @Autowired
    protected RestTemplateProxy proxy;
	
    public void setResponse(HttpServletResponse response)
    {
        this.response = response;
    }

    public void setSession(Map<String, Object> map)
    {
        this.map = map;
    }

    public void setServletRequest(HttpServletRequest request)
    {
        this.request = request;
    }

    public void setServletResponse(HttpServletResponse response)
    {
        this.response = response;
    }

    public String renderJsonString(String jsonString)
    {
        Struts2Utils.renderJson(jsonString);
        return null;
    }

    public void put(String key, Object value)
    {
        ActionContext context = ActionContext.getContext();
        context.put(key, value);
    }

    public void putMessage(Object value)
    {
        put(MESSAGE, value);
    }

    public Object get(String key)
    {
        ActionContext context = ActionContext.getContext();
        return context.get(key);
    }
    
    public Object getsession(String key){
        return map.get(key);
    }


	public boolean isAjax(HttpServletRequest request)
    {
    	//判断是不是Ajax请求
        String header = request.getHeader("X-Requested-With");
        if (header != null && "XMLHttpRequest".equalsIgnoreCase(header))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    
    //TODO 未使用到
    protected String getIpAdrr()
    {
        String ip = request.getHeader("X-Real-IP");
        if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("x-forwarded-for");
        }
        if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isEmpty(ip) || "unknown".equalsIgnoreCase(ip))
        {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
    
    
    /**
	 * @方法功能 将查询出的结果以sid为key放入Map中，话务显示时使用
	 * @param jsonObject
	 */
	public void jsonToMap(JSONObject jsonObject) {
		JSONArray jsonArray;
		jsonArray = jsonObject.getJSONObject("data").getJSONArray("search");

		for (int i = 0; i < jsonArray.size(); i++) {
			String sid = ((JSONObject) jsonArray.get(i)).getString("sid");
			map.put(sid, (Object)jsonArray.get(i));
		}
	}

	/**
	 * @方法功能 通过会话id取出相应的某条记录　
	 * @param sid
	 */
	public JSONObject mapToJsonFromKey(String sid) {
		return JSONObject.fromObject(map.get(sid));
	}

	public static void sop(Object object) {
		System.err.println(object);
	}
	
	
}
