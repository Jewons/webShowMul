package com.redcdn.webShow.dictionary;

import java.util.HashMap;
import java.util.Map;

public class NetworkTypeDict {
	public static Map<Integer,String>	m_tab = new HashMap<Integer, String>();
	static{
		m_tab.put(-1,"未知网络类型");
		m_tab.put(0,"有线");
		m_tab.put(1,"wifi");
		m_tab.put(2,"4G");
		m_tab.put(3,"3G");
		m_tab.put(4,"移动3G");
		m_tab.put(5,"移动4G");
		m_tab.put(6,"联通3G");
		m_tab.put(7,"联通4G");
		m_tab.put(8,"电信3G");
		m_tab.put(9,"电信4G");
		m_tab.put(10,"移动2G");
		m_tab.put(11,"联通2G");
		m_tab.put(12,"电信2G");
	}
}
