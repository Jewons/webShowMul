package com.redcdn.webShow.action;

import net.sf.json.JSONObject;

/**
 * 
 * @Author 刘艳伟
 * @date 2014-2-14下午5:41:53
 * @类功能　
 */
public class LoginAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private String username;// 用户名

	private String userpwd;// 密码

	/**
	 * 
	 * @方法功能　登录验证
	 * @return
	 */
	public String login() {

		int result = 10;
		JSONObject jsonObject = new JSONObject();
		if ("admin".endsWith(username) && "654321".equals(userpwd)) {
			result = 0;
			map.put("userlogin", jsonObject);
			//System.out.println("result="+result);
		}
		jsonObject.element("result", result);

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return SUCCESS;
	}

	/**
	 * 
	 * @方法功能　退出登录　
	 * @return
	 */
	public String logout() {
		map.remove("userlogin");
		return "logout";
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpwd() {
		return userpwd;
	}

	public void setUserpwd(String userpwd) {
		this.userpwd = userpwd;
	}

}

