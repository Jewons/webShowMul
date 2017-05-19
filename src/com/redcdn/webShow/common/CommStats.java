package com.redcdn.webShow.common;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;


/**
 * 配置文件读取
 * @author Belie
 */
public class CommStats {
	  
	public static final String version;
//	public static final String Logkeyword;
	public static Map<String, String> market_map = new HashMap<String,String>();
	static
	   {  
		   version = ResourceBundle.getBundle("config").getString("version");
//		   Logkeyword = ResourceBundle.getBundle("config").getString("keyword");
		   market_map = AboutReadExcel.aboutReadExcelFile("user.xls");
	   }
}
