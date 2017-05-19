package com.redcdn.webShow.action;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.Null;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.io.IOUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.opensymphony.xwork2.inject.util.Strings;
import com.redcdn.webShow.common.AboutTime;
import com.redcdn.webShow.common.CommStats;
import com.redcdn.webShow.common.ExportFile;
import com.redcdn.webShow.common.HttpPostMethod;
//import com.redcdn.webShow.dictionary.MarketUserDict;
import com.redcdn.webShow.dictionary.NetworkTypeDict;
import com.redcdn.webShow.dictionary.RelayDict;

/**
 * 
 * @Author 吴磊
 * @date 2015-6-15下午3:26:46
 * @类功能　count.jsp的各个查询所调用的方法
 */
public class SearchAction extends BaseAction {
	private static final long serialVersionUID = 2L;

	private int pageSize = 25;

	private int currPage;// 当前页
	private String startTime;// 开始时间
	private String endTime;// 结束时间

	private String string[] = null;

	//会议
	private String userId; //用户Id
	private String meetingId;//会议Id
	private String relayId;  //relayId
	private String directionType;//上下行 0上行 1下行
	private String micId;
	
	private String speakerId;

	private String keyLogId;
	
	private String companyName; //公司名称 zhanghy 12-22新加
	private String qosTableName; //在概要表数据库中的MeetingQosStaticTables的名字
	/**
	 * 获取关键字用于跟踪日志显示
	 * @return
	 */
	public String getKeyWord(){
		JsonObject jsonObject = new JsonObject();
//		jsonObject.addProperty("Logkeyword", CommStats.Logkeyword);
		return renderJsonString(jsonObject.toString());
	}
	
	
	/**
	 * 获取版本
	 */
	public String getVersion(){
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("version", CommStats.version);
		return renderJsonString(jsonObject.toString());
	}
	
	public String aboutDataPacketQuality() {
		response.setContentType("text/html;charset=UTF-8");
		try {
			String urls = "/QosDataPacketQualityService/aboutDataPacketQualityNew";
			HttpClient http = new HttpClient();
			HttpPostMethod get = proxy.httpPostMothed(urls);
			get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
			// 添加头信息告诉服务端可以对Response进行GZip压缩
			get.setRequestHeader("Accept-Encoding", "gzip");
			get.setParameter("keyLogId", keyLogId);
			get.setParameter("pageSize", pageSize+"");
			get.setParameter("currPage", currPage+"");
			try {
				int statusCode = http.executeMethod(get);
				if (statusCode != HttpStatus.SC_OK) {
					logger.error("Method failed: " + get.getStatusLine());
				}
				//logger.info("获得丢包率数据");
				ServletOutputStream sout = response.getOutputStream();
				byte[] dat = get.getResponseBodyover();
				response.setHeader("Content-Encoding", "gzip");
				response.setHeader("Content-Length", dat.length + "");
				//System.out.println("dat.length:"+dat.length);
				sout.write(dat);
				sout.flush();
				sout.close();	
			} catch (Exception e) {
				logger.error("页面无法访问");
				e.printStackTrace();
			} finally {
				get.releaseConnection();
			}
		} catch (Exception e) {
		}
		return null;
	}
	/**
	 * 根据起始时间段生成用户质量execl
	 * @return
	 */
	public String aboutMakeReport(){
		
		String attendCountSign = "0";
		String attendCountMin = "0";
		String attendCountMax = "0";
		
		if (!attendCount.equals("")) {
			string = attendCount.split(",");
			if (string[0].equals("<")) {
				attendCountSign = "<";
				attendCountMin = string[1];
			}else if (string[0].equals(">")) {
				attendCountSign = ">";
				attendCountMax = string[1];
			}else {
				attendCountSign = "between";
				attendCountMin = string[0];
				attendCountMax = string[1];
			}
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			 String urls = "/MeetingInfoSummaryAnalysis/aboutMakeReport";
			 //String urls = "/MeetingInfoSummaryAnalysis/aboutID";
			 //String urls = "/MeetingInfoAnalysis/aboutMakeReport";
			 HttpClient http = new HttpClient();
			 HttpPostMethod get = proxy.httpPostMothed(urls);
			 get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
			 // 添加头信息告诉服务端可以对Response进行GZip压缩
			 get.setRequestHeader("Accept-Encoding", "gzip");
			 get.setParameter("startTime", AboutTime.toLong(startTime)/1000 + "");
			 get.setParameter("directionType", "0");
			 get.setParameter("endTime", AboutTime.toLong(endTime)/1000 + "");
			 get.setParameter("attendCountSign", attendCountSign);
			 get.setParameter("attendCountMin", attendCountMin);
			 get.setParameter("attendCountMax", attendCountMax);
			 try {
					int statusCode = http.executeMethod(get);
					if (statusCode != HttpStatus.SC_OK) {
						logger.error("Method failed: " + get.getStatusLine());
					}
//					byte[] dat = get.getResponseBodyover();
					
					InputStream data = get.getResponseBodyAsStream();
					//拿到数据之后直接写到excel文件里面
					//分sheet
//					JsonObject json = MulMeetingOriginaldataToJson(dat);
					JsonObject json = MulMeetingOriginaldataToJson(data);
					//System.out.println("导出报告:"+json);
					ExportFile exportExcel = new ExportFile();
					exportExcel.exportExcel(json, startTime);
				} catch (Exception e) {
					logger.error("页面无法访问");
					e.printStackTrace();
				} finally {
					get.releaseConnection();
				}
		} catch (Exception e) {
		}
		
		System.gc();
//		HttpSession session1 = request.getSession(false);
//		//request.getSession(true).removeAttribute("getAttribute");
//		Enumeration<String> en = session1.getAttributeNames();
//		while (en.hasMoreElements()) {
//			String name = (String) en.nextElement();
//			System.out.println("name:"+name);
//		}
//		session1.removeAttribute("userlogin");
		return null;
	}
	
	/**
	 * 根据起始时间段生成销售客户用户体验
	 * @return
	 */
	public String aboutMakeMarketClientData()
	{
		String attendCountSign = "0";
		String attendCountMin = "0";
		String attendCountMax = "0";
		
		if (!attendCount.equals("")) {
			string = attendCount.split(",");
			if (string[0].equals("<")) {
				attendCountSign = "<";
				attendCountMin = string[1];
			}else if (string[0].equals(">")) {
				attendCountSign = ">";
				attendCountMax = string[1];
			}else {
				attendCountSign = "between";
				attendCountMin = string[0];
				attendCountMax = string[1];
			}
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			 String urls = "/MeetingInfoSummaryAnalysis/aboutMakeMarketReport";
			 HttpClient http = new HttpClient();
			 HttpPostMethod get = proxy.httpPostMothed(urls);
			 get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
			 // 添加头信息告诉服务端可以对Response进行GZip压缩
			 get.setRequestHeader("Accept-Encoding", "gzip");
			 get.setParameter("startTime", AboutTime.toLong(startTime)/1000 + "");
			 get.setParameter("directionType", "0");
			 get.setParameter("endTime", AboutTime.toLong(endTime)/1000 + "");
			 get.setParameter("attendCountSign", attendCountSign);
			 get.setParameter("attendCountMin", attendCountMin);
			 get.setParameter("attendCountMax", attendCountMax);
			 try {
					int statusCode = http.executeMethod(get);
					if (statusCode != HttpStatus.SC_OK) {
						logger.error("Method failed: " + get.getStatusLine());
					}
					byte[] dat = get.getResponseBodyover();
					JsonObject json = MulMeetingOriginaldataToJsonForMarket(dat);
					ExportFile exportExcel = new ExportFile();
					exportExcel.exportExcelForMarket(json, startTime);
				} catch (Exception e) {
					logger.error("页面无法访问");
					e.printStackTrace();
				} finally {
					get.releaseConnection();
				}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null;
	}
	
	public String aboutDetailData(){
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
	    form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
	    form.add("index", 0+"");
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutDetailDataForReportNew", form);
			logger.info("导出详细数据");

			result = jsonObject.getInt("result");
			if (result == 0) {
				
			}
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}finally{
			
		}

		logger.info("即将退出search.aboutDetailData().action");
		return null;
	}
	
	/**
	 * 根据会议号查询会议丢包率信息并生产excel报表
	 * @return
	 */
	public String aboutMakeQosReport() {	    
	    response.setContentType("text/html;charset=UTF-8");
		try {
			String urls = "/MeetingInfoAnalysis/aboutMakeQosReport";
			HttpClient http = new HttpClient();
			HttpPostMethod get = proxy.httpPostMothed(urls);
			get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
			// 添加头信息告诉服务端可以对Response进行GZip压缩
			get.setRequestHeader("Accept-Encoding", "gzip");
			get.setParameter("meetingId", meetingId);
			get.setParameter("directionType", "0");
			get.setParameter("micId", micId);
			try {
				int statusCode = http.executeMethod(get);
				if (statusCode != HttpStatus.SC_OK) {
					logger.error("Method failed: " + get.getStatusLine());
				}
				//ServletOutputStream sout = response.getOutputStream();
				byte[] dat = get.getResponseBodyover();
		
				//拿到数据之后直接写到excel文件里面
				//分sheet
				//JSONObject json = OriginaldataToJson(dat);
				JSONObject json = NewOriginaldataToJson(dat);
//				JSONArray array = json.getJSONArray("mic");
				ExportFile exportExcel = new ExportFile();
//				JSONObject jsonMicInfo;
//				for(int i = 0;i<array.size();i++){
//					jsonMicInfo = array.getJSONObject(i);
//					System.out.println("jsonInfo:"+jsonMicInfo.toString());
//					exportExcel.exportExcel1(jsonMicInfo,meetingId,i+1);
//					Thread.sleep(30000);
//				}
				exportExcel.exportExcel(json, meetingId, micId);
			} catch (Exception e) {
				logger.error("页面无法访问");
				e.printStackTrace();
			} finally {
				get.releaseConnection();
			}
		} catch (Exception e) {
		}
		return null;
	}
	
   /**
	* 根据会议号+userId+MICID查询用户QOS信息
	* @return
	*/
	public String aboutLossPacketInfo() {
			MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		    form.add("meetingId", meetingId);
		    form.add("micId",micId);
		    form.add("userId", userId);
		    form.add("pageSize", pageSize + "");
			form.add("currPage", currPage + "");
		    
		    /*JSONObject testJson1 = new JSONObject();
			testJson1.put("result", 0);
			testJson1.put("pageSize",25);
			testJson1.put("currPage", 1);
			testJson1.put("count",1);
			JSONObject testJson2 = new JSONObject();
			testJson2.put("userId",60010001);
			testJson2.put("userIp", "10.130.60.123");//
			testJson2.put("relayId", 1001);
			testJson2.put("relayIp", "192.168.1.12");
			testJson2.put("lossPackRatioBeforeFECDTO",2.25);//视频丢包率
			testJson2.put("lossPackRatioAfterFECDTO",1.22);//efc后视频丢包率
			testJson2.put("audioLossPackRatioBeforeFECDTO",3.11);//音频丢包率
			testJson2.put("audioLossPackRatioAfterFECDTO",1.20);//efc后音频丢包率
			testJson2.put("timeStamps","2015-7-5 9:30:12");
			JSONArray testJsonArray = new JSONArray();
			testJsonArray.add(testJson2);
			testJson1.put("items", testJsonArray);
			//System.out.println("json:"+testJson1);
			if (isAjax(request)) {
				return renderJsonString(testJson1.toString());
			}*/
			
	    	JSONObject jsonObject = null;
			int result = 10;
			try {

				// 将查询框表单值传送到monitorServer
				jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutLossPacketInfo", form);
				logger.info("按标识查询");

				result = jsonObject.getInt("result");
				//if (result == 0) {
				//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
				// 将查出的结果封装到session中，话务显示使用
				    //jsonToMap(jsonObject);		
				// }
			} catch (Exception e) {
				result = 10;
				String message = e.getMessage() == null ? "" : e.getMessage();
				if (message.indexOf("Read timed out;") != -1) {
					result = -1;
				}
				jsonObject = new JSONObject();
				jsonObject.element("result", result);
				logger.error(e.getMessage(), e);
			}

			if (isAjax(request)) {
				return renderJsonString(jsonObject.toString());
			}
			logger.info("即将退出search.aboutLossPacketInfo().action");
			return null;		    	
	}
	
	/**
	 * 根据会议号+userId+MICID查询用户QOS信息
	 * @return
	 */
	public String aboutLossPacketInfo1() {
		 response.setContentType("text/html;charset=UTF-8");
			try {
				String urls = "/MeetingInfoAnalysis/aboutLossPacketInfo";
				HttpClient http = new HttpClient();
				HttpPostMethod get = proxy.httpPostMothed(urls);
				get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
				// 添加头信息告诉服务端可以对Response进行GZip压缩
				get.setRequestHeader("Accept-Encoding", "gzip");
				get.setParameter("meetingId", meetingId);
				get.setParameter("speakerId", speakerId);
				get.setParameter("userId", userId);
				get.setParameter("pageSize", pageSize+"");
				get.setParameter("currPage", currPage+"");
				try {
					int statusCode = http.executeMethod(get);
					if (statusCode != HttpStatus.SC_OK) {
						logger.error("Method failed: " + get.getStatusLine());
					}
					//logger.info("获得丢包率数据");
					ServletOutputStream sout = response.getOutputStream();
					byte[] dat = get.getResponseBodyover();
					response.setHeader("Content-Encoding", "gzip");
					response.setHeader("Content-Length", dat.length + "");
					//System.out.println("dat.length:"+dat.length);
					sout.write(dat);
					sout.flush();
					sout.close();	
				} catch (Exception e) {
					logger.error("页面无法访问");
					e.printStackTrace();
				} finally {
					get.releaseConnection();
				}
			} catch (Exception e) {
			}
			return null;
				    	
	}
	
	private String  meetingStartTime;
	private String  meetingEndTime;
	/**
	 * 根据会议号+userId+MICID查询用户QOS信息
	 * @return
	 */
	public String aboutLossPacketInfo2() {
		 response.setContentType("text/html;charset=UTF-8");
			try {
				String urls = "/MeetingInfoAnalysis/aboutLossPacketInfo2";
				HttpClient http = new HttpClient();
				HttpPostMethod get = proxy.httpPostMothed(urls);
				get.setRequestHeader("Accept-Language", "zh-CN,zh;q=0.8");
				// 添加头信息告诉服务端可以对Response进行GZip压缩
				get.setRequestHeader("Accept-Encoding", "gzip");
				get.setParameter("meetingId", meetingId);
				get.setParameter("speakerId", speakerId);
				get.setParameter("userId", userId);
				get.setParameter("pageSize", pageSize+"");
				get.setParameter("currPage", currPage+"");
				get.setParameter("meetingStartTime", meetingStartTime);
				get.setParameter("meetingEndTime", meetingEndTime);
				get.setParameter("QosTableNames", qosTableName);
				try {
					int statusCode = http.executeMethod(get);
					if (statusCode != HttpStatus.SC_OK) {
						logger.error("Method failed: " + get.getStatusLine());
					}
					//logger.info("获得丢包率数据");
					ServletOutputStream sout = response.getOutputStream();
					byte[] dat = get.getResponseBodyover();
					response.setHeader("Content-Encoding", "gzip");
					response.setHeader("Content-Length", dat.length + "");
					//System.out.println("dat.length:"+dat.length);
					sout.write(dat);
					sout.flush();
					sout.close();	
				} catch (Exception e) {
					logger.error("页面无法访问");
					e.printStackTrace();
				} finally {
					get.releaseConnection();
				}
			} catch (Exception e) {
			}
			return null;
				    	
	}
	
	
	private String relayIp;
	

	/**
	 * 查询自适应信息（关键事件）
	 * @return
	 */
	public String aboutBandAdpInfoForRelay() {
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("meetingId", meetingId);
	    form.add("micId",micId);
	    form.add("relayIp", relayIp);
	    form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutBandAdpInfoForRelay", form);
			logger.info("按标识查询");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			 // 将查出的结果封装到session中，话务显示使用
			    //jsonToMap(jsonObject);		
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		logger.info("即将bbbbb退出search.aboutBandAdpInfoForRelay().action");
		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		logger.info("即将退出search.aboutBandAdpInfoForRelay().action");
		return null;
	}
	
	/**
	 * 查询自适应信息（关键事件）
	 * @return
	 */
	public String aboutBandAdpInfo() {
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("meetingId", meetingId);
	    form.add("micId",micId);
	    form.add("userId", userId);
	    form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutBandAdpInfo", form);
			logger.info("按标识查询");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			 // 将查出的结果封装到session中，话务显示使用
			    //jsonToMap(jsonObject);		
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		logger.info("即将退出search.aboutBandAdpInfo().action");
		return null;
	}
	
	
	/*public String aboutID() {
		logger.info("进入search.aboutID.action");
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();

		// 取得前台页面传来的值
		form.add("userId", userId.trim());
		form.add("meetingId", meetingId.trim());
		form.add("relayId", relayId.trim());
		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		 
		System.out.println("form:"+form);
		//test
		
		JSONObject testJson1 = new JSONObject();
		testJson1.put("result", 0);
		testJson1.put("pageSize",25);
		testJson1.put("currPage", 1);
		testJson1.put("count",1);
		JSONObject testItem = new JSONObject();
		testItem.put("meetingId", 70014568);
		testItem.put("timeStamps", "2015-06-29 10:13:09");
		int testUserId = 60011280;
		List<String> list = new ArrayList<String>();
		for(int i = 0; i<10; i++){
			testUserId++;
			String usersString = Integer.toString(testUserId);
			list.add(usersString);
		}
		JSONArray userArray = JSONArray.fromObject(list);
		testItem.put("userIdList", userArray);
//		testItem.put("downLossAudioEFCMic2", 1.04);
//		testItem.put("upLossAudioEFCMic2", 1.02);
//		testItem.put("downLossAudioEFCMic1", 1.24);
//		testItem.put("upLossAudioEFCMic1", 1.12);
//		testItem.put("downLossAudioMic2", 2.06);
//		testItem.put("upLossAudioMic2", 2.02);
//		testItem.put("downLossAudioMic1", 3.09);
//		testItem.put("upLossAudioMic1", 3.22);
//		testItem.put("upLossVideoEFCMic2", 1.14);
//		testItem.put("downLossVideoEFCMic2", 1.52);
//		testItem.put("downLossVideoEFCMic1", 1.29);
//		testItem.put("upLossVideoEFCMic1", 1.11);
//		testItem.put("upLossVideoMic2", 5.34);
//		testItem.put("downLossVideoMic2", 7.02);
//		testItem.put("upLossVideoMic1", 6.73);
//		testItem.put("downLossVideoMic1", 5.56);
		testItem.put("userCount", 20);
		testItem.put("duration", "60000");
		JSONArray testArray = new JSONArray();
		testArray.add(testItem);
		testJson1.put("items", testArray);
		if (isAjax(request)) {
			return renderJsonString(testJson1.toString());
		}
		
		
		JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutID", form);
			logger.info("按标识查询");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			 // 将查出的结果封装到session中，话务显示使用
			    //jsonToMap(jsonObject);		
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		
		logger.info("即将退出search.aboutID().action");
		return null;
	}*/
	/******************************************************************/
	public String aboutIDtest(){
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		JSONObject postJSON = new JSONObject();
		String postJsonString = postJSON.toString();
		
		form.add("param", postJsonString);
		JSONObject jsonObject = null;
		int result = 10;
		try {
			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutIDtest", form);
			logger.info("按标识查询");

			result = jsonObject.getInt("result");
			
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		
		return null;
	}
	/******************************************************************/
	public String aboutID() {
		logger.info("进入search.aboutID.action");
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();

		// 取得前台页面传来的值
		form.add("userId", userId.trim());
		form.add("meetingId", meetingId.trim());
		form.add("relayId", relayId.trim());
		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		List<String> List_userId = new ArrayList<String>();

		if(!(companyName == null ||"".equals(companyName))) {
			List_userId = getCompanyList(CommStats.market_map, companyName);
			//解决LIST传值问题
			JSONArray jsonArray = JSONArray.fromObject(List_userId);
			JSONObject jsonUserList = new JSONObject();
			jsonUserList.put("userIdList", jsonArray);
			String userLiString = jsonUserList.toString();
			form.add("UserId_List_for_Company", userLiString);
		}
		System.out.println("UserId_List_for_Company:"+List_userId);
		System.out.println("form:"+form);
		//test
		/*
		JSONObject testJson1 = new JSONObject();
		testJson1.put("result", 0);
		testJson1.put("pageSize",25);
		testJson1.put("currPage", 1);
		testJson1.put("count",1);
		JSONObject testItem = new JSONObject();
		testItem.put("meetingId", 70014568);
		testItem.put("timeStamps", "2015-06-29 10:13:09");
		int testUserId = 60011280;
		List<String> list = new ArrayList<String>();
		for(int i = 0; i<10; i++){
			testUserId++;
			String usersString = Integer.toString(testUserId);
			list.add(usersString);
		}
		JSONArray userArray = JSONArray.fromObject(list);
		testItem.put("userIdList", userArray);
//		testItem.put("downLossAudioEFCMic2", 1.04);
//		testItem.put("upLossAudioEFCMic2", 1.02);
//		testItem.put("downLossAudioEFCMic1", 1.24);
//		testItem.put("upLossAudioEFCMic1", 1.12);
//		testItem.put("downLossAudioMic2", 2.06);
//		testItem.put("upLossAudioMic2", 2.02);
//		testItem.put("downLossAudioMic1", 3.09);
//		testItem.put("upLossAudioMic1", 3.22);
//		testItem.put("upLossVideoEFCMic2", 1.14);
//		testItem.put("downLossVideoEFCMic2", 1.52);
//		testItem.put("downLossVideoEFCMic1", 1.29);
//		testItem.put("upLossVideoEFCMic1", 1.11);
//		testItem.put("upLossVideoMic2", 5.34);
//		testItem.put("downLossVideoMic2", 7.02);
//		testItem.put("upLossVideoMic1", 6.73);
//		testItem.put("downLossVideoMic1", 5.56);
		testItem.put("userCount", 20);
		testItem.put("duration", "60000");
		JSONArray testArray = new JSONArray();
		testArray.add(testItem);
		testJson1.put("items", testArray);
		if (isAjax(request)) {
			return renderJsonString(testJson1.toString());
		}
		*/
		//test
		JSONObject testJsonObject = new JSONObject();
		testJsonObject.put("result", 0);
		testJsonObject.put("pageSize", 25);
		testJsonObject.put("currPage", 1);
		testJsonObject.put("count", 3);
		testJsonObject.put("index", 0);
		JSONArray testJsonArray = new JSONArray();
		JSONObject testJsonObject1 = new JSONObject();
		JSONObject testJsonObject2 = new JSONObject();
		JSONObject testJsonObject3 = new JSONObject();
		
		
		testJsonObject1.put("meetingId", 80194589);
		testJsonObject1.put("timeStamps", "2016-12-30 10:50:33");
		testJsonObject1.put("userCount", 1);
		JSONArray testJsonArrayUserList = new JSONArray();
		testJsonArrayUserList.add("61000593");
		testJsonObject1.put("userIdList", testJsonArrayUserList);
		JSONArray testJsonArrayRelayList = new JSONArray();
		testJsonArrayRelayList.add("10.130.68.152:43022");
		testJsonObject1.put("relayList", testJsonArrayRelayList);
		testJsonObject1.put("duration", 72);
		JSONArray testJsonArraySpeakerList = new JSONArray();
		testJsonArraySpeakerList.add("61000593");
		testJsonObject1.put("speakerIdList", testJsonArraySpeakerList);
		testJsonObject1.put("endTimes", "2016-12-30 10:51:45");
		testJsonObject1.put("c2cquality", "61000593/61000593/0|61000593/61000593/1");
		testJsonArray.add(testJsonObject1);
		
		testJsonObject2.put("meetingId", 80194589);
		testJsonObject2.put("timeStamps", "2016-12-30 10:50:33");
		testJsonObject2.put("userCount", 1);
		JSONArray testJsonArrayUserList1 = new JSONArray();
		testJsonArrayUserList1.add("61000593");
		testJsonObject2.put("userIdList", testJsonArrayUserList1);
		JSONArray testJsonArrayRelayList1 = new JSONArray();
		testJsonArrayRelayList1.add("10.130.68.152:43022");
		testJsonObject2.put("relayList", testJsonArrayRelayList1);
		testJsonObject2.put("duration", 72);
		JSONArray testJsonArraySpeakerList1 = new JSONArray();
		testJsonArraySpeakerList1.add("61000593");
		testJsonObject2.put("speakerIdList", testJsonArraySpeakerList1);
		testJsonObject2.put("endTimes", "2016-12-30 10:51:45");
		testJsonObject2.put("c2cquality", "61000593/61000593/0|61000593/61000593/1");
		testJsonArray.add(testJsonObject2);
		
		testJsonObject3.put("meetingId", 80194589);
		testJsonObject3.put("timeStamps", "2016-12-30 10:50:33");
		testJsonObject3.put("userCount", 1);
		JSONArray testJsonArrayUserList11 = new JSONArray();
		testJsonArrayUserList11.add("61000593");
		testJsonObject3.put("userIdList", testJsonArrayUserList11);
		JSONArray testJsonArrayRelayList11 = new JSONArray();
		testJsonArrayRelayList11.add("10.130.68.152:43022");
		testJsonObject3.put("relayList", testJsonArrayRelayList11);
		testJsonObject3.put("duration", 72);
		JSONArray testJsonArraySpeakerList11 = new JSONArray();
		testJsonArraySpeakerList11.add("61000593");
		testJsonObject3.put("speakerIdList", testJsonArraySpeakerList11);
		testJsonObject3.put("endTimes", "2016-12-30 10:51:45");
		testJsonObject3.put("c2cquality", "61000593/61000593/0|61000593/61000593/1");
		testJsonObject3.put("qosTableName", "20161230_01/20161230_03|20161231_01/20161231_02");
		testJsonArray.add(testJsonObject3);
		
		testJsonObject.put("items", testJsonArray);
		
		JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutID", form);
			logger.info("按标识查询");
			//从概要表中获取qosTableName字段的值，存到内存中，通过search.losspackInfo2.action发送过去
			//tableNames = jsonObject.get("qosTableName").toString();
			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			 // 将查出的结果封装到session中，话务显示使用
			    //jsonToMap(jsonObject);		
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
			//return renderJsonString(testJsonObject.toString());
			
		}
		
		logger.info("即将退出search.aboutID().action");
		return null;
	}
	
	private String upVideoLossBefore ;//上行视频fec前
	private String upVideoLossAfter ;//上行视频fec后
	private String upVideoLossFinal;//上行视频最终
	private String downVideoLossBefore ;//下行视频fec前
	private String downVideoLossAfter ;//下行视频fec后
	private String downVideoLossFinal;//下行视频最终
	private String videoLossBefore;//整体视频fec前
	private String videoLossAfter;//整体视频fec后
	private String videoLossFinal;//整体视频fec后
	

    /**
	* @方法功能 2视频流统计　
	* @return
	*/
	public String aboutVideoStream() {
		logger.info("进入search.aboutVideoStream.action");
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		// 上行视频 fec前
		String upVideoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossBeforeMin = "0";
		String upVideoLossBeforeMax = "0";

		if (!upVideoLossBefore.equals("")) {
			// 拆分
			string = upVideoLossBefore.split(",");
			if (string[0].equals("<")) {
				upVideoSignBefore = "<";
				upVideoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				upVideoSignBefore = ">";
				upVideoLossBeforeMax = string[1];// 大于某个值
			} else {
				upVideoSignBefore = "between";
				upVideoLossBeforeMin = string[0];// 在两个值之间
				upVideoLossBeforeMax = string[1];
			}
		}

		// 上行视频 fec后
		String upVideoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossAfterMin = "0";
		String upVideoLossAfterMax = "0";

		if (!upVideoLossAfter.equals("")) {
		   // 拆分
		   string = upVideoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   upVideoSignAfter = "<";
			   upVideoLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upVideoSignAfter = ">";
			   upVideoLossAfterMax = string[1];// 大于某个值
		   } else {
			   upVideoSignAfter = "between";
			   upVideoLossAfterMin = string[0];// 在两个值之间
			   upVideoLossAfterMax = string[1];
		   }
	    }
		
		//上行视频最终丢包率
		String upVideoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossFinalMin = "0";
		String upVideoLossFinalMax = "0";

		if (!upVideoLossFinal.equals("")) {
		   // 拆分
		   string = upVideoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   upVideoSignFinal = "<";
			   upVideoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upVideoSignFinal = ">";
			   upVideoLossFinalMax = string[1];// 大于某个值
		   } else {
			   upVideoSignFinal = "between";
			   upVideoLossFinalMin = string[0];// 在两个值之间
			   upVideoLossFinalMax = string[1];
		   }
	    }
		
		// 下行视频 fec前
		String downVideoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossBeforeMin = "0";
		String downVideoLossBeforeMax = "0";

		if (!downVideoLossBefore.equals("")) {
			// 拆分
			string = downVideoLossBefore.split(",");
			if (string[0].equals("<")) {
				downVideoSignBefore = "<";
				downVideoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				downVideoSignBefore = ">";
				downVideoLossBeforeMax = string[1];// 大于某个值
			} else {
				downVideoSignBefore = "between";
				downVideoLossBeforeMin = string[0];// 在两个值之间
				downVideoLossBeforeMax = string[1];
			}
		}

		// 下行视频 fec后
		String downVideoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossAfterMin = "0";
		String downVideoLossAfterMax = "0";

		if (!downVideoLossAfter.equals("")) {
		   // 拆分
		   string = downVideoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   downVideoSignAfter = "<";
			   downVideoLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downVideoSignAfter = ">";
			   downVideoLossAfterMax = string[1];// 大于某个值
		   } else {
			   downVideoSignAfter = "between";
			   downVideoLossAfterMin = string[0];// 在两个值之间
			   downVideoLossAfterMax = string[1];
		   }
	    }
		
		// 下行视频 fec最终
		String downVideoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossFinalMin = "0";
		String downVideoLossFinalMax = "0";

		if (!downVideoLossFinal.equals("")) {
		   // 拆分
		   string = downVideoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   downVideoSignFinal = "<";
			   downVideoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downVideoSignFinal = ">";
			   downVideoLossFinalMax = string[1];// 大于某个值
		   } else {
			   downVideoSignFinal = "between";
			   downVideoLossFinalMin = string[0];// 在两个值之间
			   downVideoLossFinalMax = string[1];
		   }
	    }
		
		// 整体视频 fec前
		String videoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossBeforeMin = "0";
		String videoLossBeforeMax = "0";

		if (!videoLossBefore.equals("")) {
			// 拆分
			string = videoLossBefore.split(",");
			if (string[0].equals("<")) {
				videoSignBefore = "<";
				videoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				videoSignBefore = ">";
				videoLossBeforeMax = string[1];// 大于某个值
			} else {
				videoSignBefore = "between";
				videoLossBeforeMin = string[0];// 在两个值之间
				videoLossBeforeMax = string[1];
			}
		}

		// 整体视频 fec后
		String videoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossAfterMin = "0";
		String videoLossAfterMax = "0";

		if (!videoLossAfter.equals("")) {
		   // 拆分
		   string = videoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   videoSignAfter = "<";
			   videoLossAfterMax = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   videoSignAfter = ">";
			   videoLossAfterMax = string[1];// 大于某个值
		   } else {
			   videoSignAfter = "between";
			   videoLossAfterMin = string[0];// 在两个值之间
			   videoLossAfterMax = string[1];
		   }
	    }
		
		// 整体视频 fec最终
		String videoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossFinalMin = "0";
		String videoLossFinalMax = "0";

		if (!videoLossFinal.equals("")) {
		   // 拆分
		   string = videoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   videoSignFinal = "<";
			   videoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   videoSignFinal = ">";
			   videoLossFinalMax = string[1];// 大于某个值
		   } else {
			   videoSignFinal = "between";
			   videoLossFinalMin = string[0];// 在两个值之间
			   videoLossFinalMax = string[1];
		   }
	    }		
		
		
		 
		//上行
		form.add("upVideoSignBefore", upVideoSignBefore);
		form.add("upVideoLossBeforeMin", upVideoLossBeforeMin);
		form.add("upVideoLossBeforeMax", upVideoLossBeforeMax);
		form.add("upVideoSignAfter", upVideoSignAfter);
		form.add("upVideoLossAfterMin",upVideoLossAfterMin);
		form.add("upVideoLossAfterMax", upVideoLossAfterMax);
		form.add("upVideoSignFinal", upVideoSignFinal);
		form.add("upVideoLossFinalMin",upVideoLossFinalMin);
		form.add("upVideoLossFinalMax", upVideoLossFinalMax);
		
		//下行
		form.add("downVideoSignBefore", downVideoSignBefore);
		form.add("downVideoLossBeforeMin", downVideoLossBeforeMin);
		form.add("downVideoLossBeforeMax", downVideoLossBeforeMax);
		form.add("downVideoSignAfter", downVideoSignAfter);
		form.add("downVideoLossAfterMin", downVideoLossAfterMin);
		form.add("downVideoLossAfterMax", downVideoLossAfterMax);
		form.add("downVideoSignFinal", downVideoSignFinal);
		form.add("downVideoLossFinalMin", downVideoLossFinalMin);
		form.add("downVideoLossFinalMax", downVideoLossFinalMax);
		
		//整体
		form.add("videoSignBefore", videoSignBefore);
		form.add("videoLossBeforeMin", videoLossBeforeMin);
		form.add("videoLossBeforeMax", videoLossBeforeMax);
		form.add("videoSignAfter", videoSignAfter);
		form.add("videoLossAfterMin", videoLossAfterMin);
		form.add("videoLossAfterMax", videoLossAfterMax);
		form.add("videoSignFinal", videoSignFinal);
		form.add("videoLossFinalMin", videoLossFinalMin);
		form.add("videoLossFinalMax", videoLossFinalMax);
		

		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		System.out.println("form:"+form);
		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutVideoStream", form);
			logger.info("按统计查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			//
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	
	
	private String upAudioLossBefore ;//上行视频fec前
	private String upAudioLossAfter ;//上行视频fec后
	private String upAudioLossFinal;//上行视频最终
	private String downAudioLossBefore ;//下行视频fec前
	private String downAudioLossAfter ;//下行视频fec后
	private String downAudioLossFinal;//下行视频最终
	private String audioLossBefore;//整体视频fec前
	private String audioLossAfter;//整体视频fec后
	private String audioLossFinal;//整体视频fec后
	
	
	public String aboutAudioStream() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		// 上行音频 fec前
		String upAudioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossBeforeMin = "0";
		String upAudioLossBeforeMax = "0";

		if (!upAudioLossBefore.equals("")) {
			// 拆分
			string = upAudioLossBefore.split(",");
			if (string[0].equals("<")) {
				upAudioSignBefore = "<";
				upAudioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				upAudioSignBefore = ">";
				upAudioLossBeforeMax = string[1];// 大于某个值
			} else {
				upAudioSignBefore = "between";
				upAudioLossBeforeMin = string[0];// 在两个值之间
				upAudioLossBeforeMax = string[1];
			}
		}

		// 上行音频 fec后
		String upAudioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossAfterMin = "0";
		String upAudioLossAfterMax = "0";

		if (!upAudioLossAfter.equals("")) {
		   // 拆分
		   string = upAudioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   upAudioSignAfter = "<";
			   upAudioLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upAudioSignAfter = ">";
			   upAudioLossAfterMax = string[1];// 大于某个值
		   } else {
			   upAudioSignAfter = "between";
			   upAudioLossAfterMin = string[0];// 在两个值之间
			   upAudioLossAfterMax = string[1];
		   }
	    }
		
		//上行音频最终丢包率
		String upAudioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossFinalMin = "0";
		String upAudioLossFinalMax = "0";

		if (!upAudioLossFinal.equals("")) {
		   // 拆分
		   string = upAudioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   upAudioSignFinal = "<";
			   upAudioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upAudioSignFinal = ">";
			   upAudioLossFinalMax = string[1];// 大于某个值
		   } else {
			   upAudioSignFinal = "between";
			   upAudioLossFinalMin = string[0];// 在两个值之间
			   upAudioLossFinalMax = string[1];
		   }
	    }
		
		// 下行音频 fec前
		String downAudioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossBeforeMin = "0";
		String downAudioLossBeforeMax = "0";

		if (!downAudioLossBefore.equals("")) {
			// 拆分
			string = downAudioLossBefore.split(",");
			if (string[0].equals("<")) {
				downAudioSignBefore = "<";
				downAudioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				downAudioSignBefore = ">";
				downAudioLossBeforeMax = string[1];// 大于某个值
			} else {
				downAudioSignBefore = "between";
				downAudioLossBeforeMin = string[0];// 在两个值之间
				downAudioLossBeforeMax = string[1];
			}
		}

		// 下行音频 fec后
		String downAudioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossAfterMin = "0";
		String downAudioLossAfterMax = "0";

		if (!downAudioLossAfter.equals("")) {
		   // 拆分
		   string = downAudioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   downAudioSignAfter = "<";
			   downAudioLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downAudioSignAfter = ">";
			   downAudioLossAfterMax = string[1];// 大于某个值
		   } else {
			   downAudioSignAfter = "between";
			   downAudioLossAfterMin = string[0];// 在两个值之间
			   downAudioLossAfterMax = string[1];
		   }
	    }
		
		// 下行音频 fec最终
		String downAudioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossFinalMin = "0";
		String downAudioLossFinalMax = "0";

		if (!downAudioLossFinal.equals("")) {
		   // 拆分
		   string = downAudioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   downAudioSignFinal = "<";
			   downAudioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downAudioSignFinal = ">";
			   downAudioLossFinalMax = string[1];// 大于某个值
		   } else {
			   downAudioSignFinal = "between";
			   downAudioLossFinalMin = string[0];// 在两个值之间
			   downAudioLossFinalMax = string[1];
		   }
	    }
		
		// 整体音频 fec前
		String audioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossBeforeMin = "0";
		String audioLossBeforeMax = "0";

		if (!audioLossBefore.equals("")) {
			// 拆分
			string = audioLossBefore.split(",");
			if (string[0].equals("<")) {
				audioSignBefore = "<";
				audioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				audioSignBefore = ">";
				audioLossBeforeMax = string[1];// 大于某个值
			} else {
				audioSignBefore = "between";
				audioLossBeforeMin = string[0];// 在两个值之间
				audioLossBeforeMax = string[1];
			}
		}

		// 整体音频 fec后
		String audioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossAfterMin = "0";
		String audioLossAfterMax = "0";

		if (!audioLossAfter.equals("")) {
		   // 拆分
		   string = audioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   audioSignAfter = "<";
			   audioLossAfterMax = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   audioSignAfter = ">";
			   audioLossAfterMax = string[1];// 大于某个值
		   } else {
			   audioSignAfter = "between";
			   audioLossAfterMin = string[0];// 在两个值之间
			   audioLossAfterMax = string[1];
		   }
	    }
		
		// 整体音频 fec最终
		String audioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossFinalMin = "0";
		String audioLossFinalMax = "0";

		if (!audioLossFinal.equals("")) {
		   // 拆分
		   string = audioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   audioSignFinal = "<";
			   audioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   audioSignFinal = ">";
			   audioLossFinalMax = string[1];// 大于某个值
		   } else {
			   audioSignFinal = "between";
			   audioLossFinalMin = string[0];// 在两个值之间
			   audioLossFinalMax = string[1];
		   }
	    }		
		
		
		 
		//上行
		form.add("upAudioSignBefore", upAudioSignBefore);
		form.add("upAudioLossBeforeMin", upAudioLossBeforeMin);
		form.add("upAudioLossBeforeMax", upAudioLossBeforeMax);
		form.add("upAudioSignAfter", upAudioSignAfter);
		form.add("upAudioLossAfterMin",upAudioLossAfterMin);
		form.add("upAudioLossAfterMax", upAudioLossAfterMax);
		form.add("upAudioSignFinal", upAudioSignFinal);
		form.add("upAudioLossFinalMin",upAudioLossFinalMin);
		form.add("upAudioLossFinalMax", upAudioLossFinalMax);
		
		//下行
		form.add("downAudioSignBefore", downAudioSignBefore);
		form.add("downAudioLossBeforeMin", downAudioLossBeforeMin);
		form.add("downAudioLossBeforeMax", downAudioLossBeforeMax);
		form.add("downAudioSignAfter", downAudioSignAfter);
		form.add("downAudioLossAfterMin", downAudioLossAfterMin);
		form.add("downAudioLossAfterMax", downAudioLossAfterMax);
		form.add("downAudioSignFinal", downAudioSignFinal);
		form.add("downAudioLossFinalMin", downAudioLossFinalMin);
		form.add("downAudioLossFinalMax", downAudioLossFinalMax);
		
		//整体
		form.add("audioSignBefore", audioSignBefore);
		form.add("audioLossBeforeMin", audioLossBeforeMin);
		form.add("audioLossBeforeMax", audioLossBeforeMax);
		form.add("audioSignAfter", audioSignAfter);
		form.add("audioLossAfterMin", audioLossAfterMin);
		form.add("audioLossAfterMax", audioLossAfterMax);
		form.add("audioSignFinal", audioSignFinal);
		form.add("audioLossFinalMin", audioLossFinalMin);
		form.add("audioLossFinalMax", audioLossFinalMax);
		

		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		//form.add("directionType", directionType);

		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutAudioStream", form);
			logger.info("按统计查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			//
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	
	private String cpuRate;//cpu使用率
	private String frameRate;//帧率
	private String delay;//延时

	/**
	 * @方法功能 3质量
	 * @return
	 */
	public String aboutQuality(){
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();
		
		//cpuRate
		String cpuRateSign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String cpuRateMin = "0"; // 值1
		String cpuRateMax = "0";//值2
		
		if (!cpuRate.equals("")) {
			string = cpuRate.split(",");
			if (string[0].equals("<")) {
				cpuRateSign = "<";
				cpuRateMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				cpuRateSign = ">";
				cpuRateMax = string[1];// 大于某个值
			} else {
				cpuRateSign = "between";
				cpuRateMin = string[0];// 在两个值之间
				cpuRateMax = string[1];
			}
		}
		
		
		
		//帧率
		String frameRateSign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String frameRateMin = "0"; // 值1
		String frameRateMax = "0";//值2		
		
		if (!frameRate.equals("")) {
			string = frameRate.split(",");
			if (string[0].equals("<")) {
				frameRateSign = "<";
				frameRateMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				frameRateSign = ">";
				frameRateMax = string[1];// 大于某个值
			} else {
				frameRateSign = "between";
				frameRateMin = string[0];// 在两个值之间
				frameRateMax = string[1];
			}
		}
		
		//时延
		String delaySign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String delayMin = "0"; // 值1
		String delayMax = "0";//值2		
		
		if (!delay.equals("")) {
			string = delay.split(",");
			if (string[0].equals("<")) {
				delaySign = "<";
				delayMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				delaySign = ">";
				delayMax = string[1];// 大于某个值
			} else {
				delaySign = "between";
				delayMin = string[0];// 在两个值之间
				delayMax = string[1];
			}
		}		
		
		form.add("cpuRateSign", cpuRateSign);
		form.add("cpuRateMin", cpuRateMin);
		form.add("cpuRateMax", cpuRateMax);
		form.add("frameRateSign", frameRateSign);
		form.add("frameRateMin", frameRateMin);
		form.add("frameRateMax", frameRateMax);
		form.add("delaySign", delaySign);
		form.add("delayMin", delayMin);
		form.add("delayMax", delayMax);
		
		
		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");

		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutQuality", form);
			logger.info("按统计查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			//
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}
		
	
		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		
		return null;
	}
	

	private String oneEmpty;
	private String twoEmpty;
	private String thrEmpty;
	private String fouEmpty;
	private String tenEmpty;
	
	/**
	 * 按空心包出现次数查询
	 * @return
	 */
	public String aboutEmptyPackage() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();
		
		String oneSign = "0";
		String oneMin = "0";
		String oneMax = "0";	
		if (!oneEmpty.equals("")) {
			string = oneEmpty.split(",");
			if (string[0].equals("<")) {
				oneSign = "<";
				oneMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				oneSign = ">";
				oneMax = string[1];// 大于某个值
			} else {
				oneSign = "between";
				oneMin = string[0];// 在两个值之间
				oneMax = string[1];
			}
		}
		
		String twoSign = "0";
		String twoMin = "0";
		String twoMax = "0";	
		if (!twoEmpty.equals("")) {
			string = twoEmpty.split(",");
			if (string[0].equals("<")) {
				twoSign = "<";
				twoMax = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				twoSign = ">";
				twoMax = string[1];// 大于某个值
			} else {
				twoSign = "between";
				twoMin = string[0];// 在两个值之间
				twoMax = string[1];
			}
		}
		
		String thrSign = "0";
		String thrMin = "0";
		String thrMax = "0";	
		if (!thrEmpty.equals("")) {
			string = oneEmpty.split(",");
			if (string[0].equals("<")) {
				thrSign = "<";
				thrMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				thrSign = ">";
				thrMax = string[1];// 大于某个值
			} else {
				thrSign = "between";
				thrMin = string[0];// 在两个值之间
				thrMax = string[1];
			}
		}
		
		String fouSign = "0";
		String fouMin = "0";
		String fouMax = "0";	
		if (!fouEmpty.equals("")) {
			string = fouEmpty.split(",");
			if (string[0].equals("<")) {
				fouSign = "<";
				fouMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				fouSign = ">";
				fouMax = string[1];// 大于某个值
			} else {
				fouSign = "between";
				fouMin = string[0];// 在两个值之间
				fouMax = string[1];
			}
		}
		
		String tenSign = "0";
		String tenMin = "0";
		String tenMax = "0";	
		if (!tenEmpty.equals("")) {
			string = tenEmpty.split(",");
			if (string[0].equals("<")) {
				tenSign = "<";
				tenMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				tenSign = ">";
				tenMax = string[1];// 大于某个值
			} else {
				tenSign = "between";
				tenMin = string[0];// 在两个值之间
				tenMax = string[1];
			}
		}
		
		form.add("oneSign", oneSign);
		form.add("oneMin", oneMin);
		form.add("oneMax", oneMax);
		form.add("twoSign", twoSign);
		form.add("twoMin", twoMin);
		form.add("twoMax", twoMax);
		form.add("thrSign", thrSign);
		form.add("thrMin", thrMin);
		form.add("thrMax", thrMax);
		form.add("fouSign", fouSign);
		form.add("fouMin", fouMin);
		form.add("fouMax", fouMax);
		form.add("tenSign", tenSign);
		form.add("tenMin", tenMin);
		form.add("tenMax", tenMax);
		
		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		
		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutEmptyPackage", form);
			logger.info("按空心包次数原因查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	
	
	
	
	
	private String attendCount;//参会人数
	/**
	 * @方法功能 根据参会人数查询
	 * @return
	 */
	public String aboutAttendCount() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();
		
		String attendCountSign = "0";
		String attendCountMin = "0";
		String attendCountMax = "0";
		
		if (!attendCount.equals("")) {
			string = attendCount.split(",");
			if (string[0].equals("<")) {
				attendCountSign = "<";
				attendCountMin = string[1];
			}else if (string[0].equals(">")) {
				attendCountSign = ">";
				attendCountMax = string[1];
			}else {
				attendCountSign = "between";
				attendCountMin = string[0];
				attendCountMax = string[1];
			}
		}
		
		form.add("attendCountSign", attendCountSign);
		form.add("attendCountMin", attendCountMin);
		form.add("attendCountMax", attendCountMax);
		
		// 固定要传的四个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		

		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutAttendCount", form);
			logger.info("按统计查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			//
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}
		
	
		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		
		return null;
	}
	
	private String timeduraction;// 持续时间

	

	/**
	 * @方法功能  时间　
	 * @return
	 */
	public String aboutTime() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

		String ducationsign = "0";// 方式0、 >、<、between(不限，小于持续时间1，在两个时间之间，大于持续时间2)
		String ducationMin = "0";// 时间1
		String ducationMax = "0";// 时间2

		if (!timeduraction.equals("")) {
			// 拆分时间段
			string = timeduraction.split(",");
			if (string[0].equals("<")) {
				ducationsign = "<";
				ducationMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				ducationsign = ">";
				ducationMax = string[1];// 大于某个值
			} else {
				ducationsign = "between";
				ducationMin = string[0];// 在两个值之间
				ducationMax = string[1];
			}
		}

		form.add("ducationsign", ducationsign);//
		form.add("ducationMin", ducationMin);
		form.add("ducationMax", ducationMax);

		// 固定要传的四个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		
		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutTime", form);
			logger.info("按时间查询");

			result = jsonObject.getInt("result");
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	/**
	 * 
	 * @方法功能　高级查询　将所有条件组合查询
	 * @return
	 */
	public String aboutAll() {
		MultiValueMap<String, Object> form = new LinkedMultiValueMap<String, Object>();

	
		// 标识
	    form.add("userId", userId.trim());
	    form.add("meetingId", meetingId.trim());
		form.add("relayId", relayId.trim());
		

		// 上行视频 fec前
		String upVideoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossBeforeMin = "0";
		String upVideoLossBeforeMax = "0";

		if (!upVideoLossBefore.equals("")) {
			// 拆分
			string = upVideoLossBefore.split(",");
			if (string[0].equals("<")) {
				upVideoSignBefore = "<";
				upVideoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				upVideoSignBefore = ">";
				upVideoLossBeforeMax = string[1];// 大于某个值
			} else {
				upVideoSignBefore = "between";
				upVideoLossBeforeMin = string[0];// 在两个值之间
				upVideoLossBeforeMax = string[1];
			}
		}

		// 上行视频 fec后
		String upVideoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossAfterMin = "0";
		String upVideoLossAfterMax = "0";

		if (!upVideoLossAfter.equals("")) {
		   // 拆分
		   string = upVideoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   upVideoSignAfter = "<";
			   upVideoLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upVideoSignAfter = ">";
			   upVideoLossAfterMax = string[1];// 大于某个值
		   } else {
			   upVideoSignAfter = "between";
			   upVideoLossAfterMin = string[0];// 在两个值之间
			   upVideoLossAfterMax = string[1];
		   }
	    }
		
		//上行视频最终丢包率
		String upVideoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upVideoLossFinalMin = "0";
		String upVideoLossFinalMax = "0";

		if (!upVideoLossFinal.equals("")) {
		   // 拆分
		   string = upVideoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   upVideoSignFinal = "<";
			   upVideoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upVideoSignFinal = ">";
			   upVideoLossFinalMax = string[1];// 大于某个值
		   } else {
			   upVideoSignFinal = "between";
			   upVideoLossFinalMin = string[0];// 在两个值之间
			   upVideoLossFinalMax = string[1];
		   }
	    }
		
		// 下行视频 fec前
		String downVideoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossBeforeMin = "0";
		String downVideoLossBeforeMax = "0";

		if (!downVideoLossBefore.equals("")) {
			// 拆分
			string = downVideoLossBefore.split(",");
			if (string[0].equals("<")) {
				downVideoSignBefore = "<";
				downVideoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				downVideoSignBefore = ">";
				downVideoLossBeforeMax = string[1];// 大于某个值
			} else {
				downVideoSignBefore = "between";
				downVideoLossBeforeMin = string[0];// 在两个值之间
				downVideoLossBeforeMax = string[1];
			}
		}

		// 下行视频 fec后
		String downVideoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossAfterMin = "0";
		String downVideoLossAfterMax = "0";

		if (!downVideoLossAfter.equals("")) {
		   // 拆分
		   string = downVideoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   downVideoSignAfter = "<";
			   downVideoLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downVideoSignAfter = ">";
			   downVideoLossAfterMax = string[1];// 大于某个值
		   } else {
			   downVideoSignAfter = "between";
			   downVideoLossAfterMin = string[0];// 在两个值之间
			   downVideoLossAfterMax = string[1];
		   }
	    }
		
		// 下行视频 fec最终
		String downVideoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downVideoLossFinalMin = "0";
		String downVideoLossFinalMax = "0";

		if (!downVideoLossFinal.equals("")) {
		   // 拆分
		   string = downVideoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   downVideoSignFinal = "<";
			   downVideoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downVideoSignFinal = ">";
			   downVideoLossFinalMax = string[1];// 大于某个值
		   } else {
			   downVideoSignFinal = "between";
			   downVideoLossFinalMin = string[0];// 在两个值之间
			   downVideoLossFinalMax = string[1];
		   }
	    }
		
		// 整体视频 fec前
		String videoSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossBeforeMin = "0";
		String videoLossBeforeMax = "0";

		if (!videoLossBefore.equals("")) {
			// 拆分
			string = videoLossBefore.split(",");
			if (string[0].equals("<")) {
				videoSignBefore = "<";
				videoLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				videoSignBefore = ">";
				videoLossBeforeMax = string[1];// 大于某个值
			} else {
				videoSignBefore = "between";
				videoLossBeforeMin = string[0];// 在两个值之间
				videoLossBeforeMax = string[1];
			}
		}

		// 整体视频 fec后
		String videoSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossAfterMin = "0";
		String videoLossAfterMax = "0";

		if (!videoLossAfter.equals("")) {
		   // 拆分
		   string = videoLossAfter.split(",");
		   if (string[0].equals("<")) {
			   videoSignAfter = "<";
			   videoLossAfterMax = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   videoSignAfter = ">";
			   videoLossAfterMax = string[1];// 大于某个值
		   } else {
			   videoSignAfter = "between";
			   videoLossAfterMin = string[0];// 在两个值之间
			   videoLossAfterMax = string[1];
		   }
	    }
		
		// 整体视频 fec最终
		String videoSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String videoLossFinalMin = "0";
		String videoLossFinalMax = "0";

		if (!videoLossFinal.equals("")) {
		   // 拆分
		   string = videoLossFinal.split(",");
		   if (string[0].equals("<")) {
			   videoSignFinal = "<";
			   videoLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   videoSignFinal = ">";
			   videoLossFinalMax = string[1];// 大于某个值
		   } else {
			   videoSignFinal = "between";
			   videoLossFinalMin = string[0];// 在两个值之间
			   videoLossFinalMax = string[1];
		   }
	    }		
		
		
		 
		//上行
		form.add("upVideoSignBefore", upVideoSignBefore);
		form.add("upVideoLossBeforeMin", upVideoLossBeforeMin);
		form.add("upVideoLossBeforeMax", upVideoLossBeforeMax);
		form.add("upVideoSignAfter", upVideoSignAfter);
		form.add("upVideoLossAfterMin",upVideoLossAfterMin);
		form.add("upVideoLossAfterMax", upVideoLossAfterMax);
		form.add("upVideoSignFinal", upVideoSignFinal);
		form.add("upVideoLossFinalMin",upVideoLossFinalMin);
		form.add("upVideoLossFinalMax", upVideoLossFinalMax);
		
		//下行
		form.add("downVideoSignBefore", downVideoSignBefore);
		form.add("downVideoLossBeforeMin", downVideoLossBeforeMin);
		form.add("downVideoLossBeforeMax", downVideoLossBeforeMax);
		form.add("downVideoSignAfter", downVideoSignAfter);
		form.add("downVideoLossAfterMin", downVideoLossAfterMin);
		form.add("downVideoLossAfterMax", downVideoLossAfterMax);
		form.add("downVideoSignFinal", downVideoSignFinal);
		form.add("downVideoLossFinalMin", downVideoLossFinalMin);
		form.add("downVideoLossFinalMax", downVideoLossFinalMax);
		
		//整体
		form.add("videoSignBefore", videoSignBefore);
		form.add("videoLossBeforeMin", videoLossBeforeMin);
		form.add("videoLossBeforeMax", videoLossBeforeMax);
		form.add("videoSignAfter", videoSignAfter);
		form.add("videoLossAfterMin", videoLossAfterMin);
		form.add("videoLossAfterMax", videoLossAfterMax);
		form.add("videoSignFinal", videoSignFinal);
		form.add("videoLossFinalMin", videoLossFinalMin);
		form.add("videoLossFinalMax", videoLossFinalMax);
		
		
		// 上行音频 fec前
		String upAudioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossBeforeMin = "0";
		String upAudioLossBeforeMax = "0";

		if (!upAudioLossBefore.equals("")) {
			// 拆分
			string = upAudioLossBefore.split(",");
			if (string[0].equals("<")) {
				upAudioSignBefore = "<";
				upAudioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				upAudioSignBefore = ">";
				upAudioLossBeforeMax = string[1];// 大于某个值
			} else {
				upAudioSignBefore = "between";
				upAudioLossBeforeMin = string[0];// 在两个值之间
				upAudioLossBeforeMax = string[1];
			}
		}

		// 上行音频 fec后
		String upAudioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossAfterMin = "0";
		String upAudioLossAfterMax = "0";

		if (!upAudioLossAfter.equals("")) {
		   // 拆分
		   string = upAudioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   upAudioSignAfter = "<";
			   upAudioLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upAudioSignAfter = ">";
			   upAudioLossAfterMax = string[1];// 大于某个值
		   } else {
			   upAudioSignAfter = "between";
			   upAudioLossAfterMin = string[0];// 在两个值之间
			   upAudioLossAfterMax = string[1];
		   }
	    }
		
		//上行音频最终丢包率
		String upAudioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String upAudioLossFinalMin = "0";
		String upAudioLossFinalMax = "0";

		if (!upAudioLossFinal.equals("")) {
		   // 拆分
		   string = upAudioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   upAudioSignFinal = "<";
			   upAudioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   upAudioSignFinal = ">";
			   upAudioLossFinalMax = string[1];// 大于某个值
		   } else {
			   upAudioSignFinal = "between";
			   upAudioLossFinalMin = string[0];// 在两个值之间
			   upAudioLossFinalMax = string[1];
		   }
	    }
		
		// 下行音频 fec前
		String downAudioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossBeforeMin = "0";
		String downAudioLossBeforeMax = "0";

		if (!downAudioLossBefore.equals("")) {
			// 拆分
			string = downAudioLossBefore.split(",");
			if (string[0].equals("<")) {
				downAudioSignBefore = "<";
				downAudioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				downAudioSignBefore = ">";
				downAudioLossBeforeMax = string[1];// 大于某个值
			} else {
				downAudioSignBefore = "between";
				downAudioLossBeforeMin = string[0];// 在两个值之间
				downAudioLossBeforeMax = string[1];
			}
		}

		// 下行音频 fec后
		String downAudioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossAfterMin = "0";
		String downAudioLossAfterMax = "0";

		if (!downAudioLossAfter.equals("")) {
		   // 拆分
		   string = downAudioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   downAudioSignAfter = "<";
			   downAudioLossAfterMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downAudioSignAfter = ">";
			   downAudioLossAfterMax = string[1];// 大于某个值
		   } else {
			   downAudioSignAfter = "between";
			   downAudioLossAfterMin = string[0];// 在两个值之间
			   downAudioLossAfterMax = string[1];
		   }
	    }
		
		// 下行音频 fec最终
		String downAudioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String downAudioLossFinalMin = "0";
		String downAudioLossFinalMax = "0";

		if (!downAudioLossFinal.equals("")) {
		   // 拆分
		   string = downAudioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   downAudioSignFinal = "<";
			   downAudioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   downAudioSignFinal = ">";
			   downAudioLossFinalMax = string[1];// 大于某个值
		   } else {
			   downAudioSignFinal = "between";
			   downAudioLossFinalMin = string[0];// 在两个值之间
			   downAudioLossFinalMax = string[1];
		   }
	    }
		
		// 整体音频 fec前
		String audioSignBefore = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossBeforeMin = "0";
		String audioLossBeforeMax = "0";

		if (!audioLossBefore.equals("")) {
			// 拆分
			string = audioLossBefore.split(",");
			if (string[0].equals("<")) {
				audioSignBefore = "<";
				audioLossBeforeMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				audioSignBefore = ">";
				audioLossBeforeMax = string[1];// 大于某个值
			} else {
				audioSignBefore = "between";
				audioLossBeforeMin = string[0];// 在两个值之间
				audioLossBeforeMax = string[1];
			}
		}

		// 整体音频 fec后
		String audioSignAfter = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossAfterMin = "0";
		String audioLossAfterMax = "0";

		if (!audioLossAfter.equals("")) {
		   // 拆分
		   string = audioLossAfter.split(",");
		   if (string[0].equals("<")) {
			   audioSignAfter = "<";
			   audioLossAfterMax = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   audioSignAfter = ">";
			   audioLossAfterMax = string[1];// 大于某个值
		   } else {
			   audioSignAfter = "between";
			   audioLossAfterMin = string[0];// 在两个值之间
			   audioLossAfterMax = string[1];
		   }
	    }
		
		// 整体音频 fec最终
		String audioSignFinal = "0";// 不限 //方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
		String audioLossFinalMin = "0";
		String audioLossFinalMax = "0";

		if (!audioLossFinal.equals("")) {
		   // 拆分
		   string = audioLossFinal.split(",");
		   if (string[0].equals("<")) {
			   audioSignFinal = "<";
			   audioLossFinalMin = string[1];// 小于某个值
		   } else if (string[0].equals(">")) {
			   audioSignFinal = ">";
			   audioLossFinalMax = string[1];// 大于某个值
		   } else {
			   audioSignFinal = "between";
			   audioLossFinalMin = string[0];// 在两个值之间
			   audioLossFinalMax = string[1];
		   }
	    }		
		
		
		 
		//上行
		form.add("upAudioSignBefore", upAudioSignBefore);
		form.add("upAudioLossBeforeMin", upAudioLossBeforeMin);
		form.add("upAudioLossBeforeMax", upAudioLossBeforeMax);
		form.add("upAudioSignAfter", upAudioSignAfter);
		form.add("upAudioLossAfterMin",upAudioLossAfterMin);
		form.add("upAudioLossAfterMax", upAudioLossAfterMax);
		form.add("upAudioSignFinal", upAudioSignFinal);
		form.add("upAudioLossFinalMin",upAudioLossFinalMin);
		form.add("upAudioLossFinalMax", upAudioLossFinalMax);
		
		//下行
		form.add("downAudioSignBefore", downAudioSignBefore);
		form.add("downAudioLossBeforeMin", downAudioLossBeforeMin);
		form.add("downAudioLossBeforeMax", downAudioLossBeforeMax);
		form.add("downAudioSignAfter", downAudioSignAfter);
		form.add("downAudioLossAfterMin", downAudioLossAfterMin);
		form.add("downAudioLossAfterMax", downAudioLossAfterMax);
		form.add("downAudioSignFinal", downAudioSignFinal);
		form.add("downAudioLossFinalMin", downAudioLossFinalMin);
		form.add("downAudioLossFinalMax", downAudioLossFinalMax);
		
		//整体
		form.add("audioSignBefore", audioSignBefore);
		form.add("audioLossBeforeMin", audioLossBeforeMin);
		form.add("audioLossBeforeMax", audioLossBeforeMax);
		form.add("audioSignAfter", audioSignAfter);
		form.add("audioLossAfterMin", audioLossAfterMin);
		form.add("audioLossAfterMax", audioLossAfterMax);
		form.add("audioSignFinal", audioSignFinal);
		form.add("audioLossFinalMin", audioLossFinalMin);
		form.add("audioLossFinalMax", audioLossFinalMax);		
		
		//参会人数
		String attendCountSign = "0";
		String attendCountMin = "0";
		String attendCountMax = "0";
		
		if (!attendCount.equals("")) {
			string = attendCount.split(",");
			if (string[0].equals("<")) {
				attendCountSign = "<";
				attendCountMin = string[1];
			}else if (string[0].equals(">")) {
				attendCountSign = ">";
				attendCountMax = string[1];
			}else {
				attendCountSign = "between";
				attendCountMin = string[0];
				attendCountMax = string[1];
			}
		}
		
		form.add("attendCountSign", attendCountSign);
		form.add("attendCountMin", attendCountMin);
		form.add("attendCountMax", attendCountMax);
		
		//时间
		String ducationsign = "0";// 方式0、 >、<、between(不限，小于持续时间1，在两个时间之间，大于持续时间2)
		String ducationMin = "0";// 时间1
		String ducationMax = "0";// 时间2

		if (!timeduraction.equals("")) {
			// 拆分时间段
			string = timeduraction.split(",");
			if (string[0].equals("<")) {
				ducationsign = "<";
				ducationMin = string[1];// 小于某个值
			} else if (string[0].equals(">")) {
				ducationsign = ">";
				ducationMax = string[1];// 大于某个值
			} else {
				ducationsign = "between";
				ducationMin = string[0];// 在两个值之间
				ducationMax = string[1];
			}
		}

		form.add("ducationsign", ducationsign);//
		form.add("ducationMin", ducationMin);
		form.add("ducationMax", ducationMax);
		
		
		//质量
		//cpuRate
//		String cpuRateSign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
//		String cpuRateMin = "0"; // 值1
//		String cpuRateMax = "0";//值2
//		
//		if (!cpuRate.equals("")) {
//			string = cpuRate.split(",");
//			if (string[0].equals("<")) {
//				cpuRateSign = "<";
//				cpuRateMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				cpuRateSign = ">";
//				cpuRateMax = string[1];// 大于某个值
//			} else {
//				cpuRateSign = "between";
//				cpuRateMin = string[0];// 在两个值之间
//				cpuRateMax = string[1];
//			}
//		}
//		
//		
//		
//		//帧率
//		String frameRateSign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
//		String frameRateMin = "0"; // 值1
//		String frameRateMax = "0";//值2		
//		
//		if (!frameRate.equals("")) {
//			string = frameRate.split(",");
//			if (string[0].equals("<")) {
//				frameRateSign = "<";
//				frameRateMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				frameRateSign = ">";
//				frameRateMax = string[1];// 大于某个值
//			} else {
//				frameRateSign = "between";
//				frameRateMin = string[0];// 在两个值之间
//				frameRateMax = string[1];
//			}
//		}
//		
//		//时延
//		String delaySign = "0";// 方式0、 >、<、between(不限，小于值1，在两个值之间，大于值2)
//		String delayMin = "0"; // 值1
//		String delayMax = "0";//值2		
//		
//		if (!delay.equals("")) {
//			string = delay.split(",");
//			if (string[0].equals("<")) {
//				delaySign = "<";
//				delayMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				delaySign = ">";
//				delayMax = string[1];// 大于某个值
//			} else {
//				delaySign = "between";
//				delayMin = string[0];// 在两个值之间
//				delayMax = string[1];
//			}
//		}		
//		
//		form.add("cpuRateSign", cpuRateSign);
//		form.add("cpuRateMin", cpuRateMin);
//		form.add("cpuRateMax", cpuRateMax);
//		form.add("frameRateSign", frameRateSign);
//		form.add("frameRateMin", frameRateMin);
//		form.add("frameRateMax", frameRateMax);
//		form.add("delaySign", delaySign);
//		form.add("delayMin", delayMin);
//		form.add("delayMax", delayMax);
//		
//		//空心包
//		String oneSign = "0";
//		String oneMin = "0";
//		String oneMax = "0";	
//		if (!oneEmpty.equals("")) {
//			string = oneEmpty.split(",");
//			if (string[0].equals("<")) {
//				oneSign = "<";
//				oneMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				oneSign = ">";
//				oneMax = string[1];// 大于某个值
//			} else {
//				oneSign = "between";
//				oneMin = string[0];// 在两个值之间
//				oneMax = string[1];
//			}
//		}
//		
//		String twoSign = "0";
//		String twoMin = "0";
//		String twoMax = "0";	
//		if (!twoEmpty.equals("")) {
//			string = twoEmpty.split(",");
//			if (string[0].equals("<")) {
//				twoSign = "<";
//				twoMax = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				twoSign = ">";
//				twoMax = string[1];// 大于某个值
//			} else {
//				twoSign = "between";
//				twoMin = string[0];// 在两个值之间
//				twoMax = string[1];
//			}
//		}
//		
//		String thrSign = "0";
//		String thrMin = "0";
//		String thrMax = "0";	
//		if (!thrEmpty.equals("")) {
//			string = oneEmpty.split(",");
//			if (string[0].equals("<")) {
//				thrSign = "<";
//				thrMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				thrSign = ">";
//				thrMax = string[1];// 大于某个值
//			} else {
//				thrSign = "between";
//				thrMin = string[0];// 在两个值之间
//				thrMax = string[1];
//			}
//		}
//		
//		String fouSign = "0";
//		String fouMin = "0";
//		String fouMax = "0";	
//		if (!fouEmpty.equals("")) {
//			string = fouEmpty.split(",");
//			if (string[0].equals("<")) {
//				fouSign = "<";
//				fouMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				fouSign = ">";
//				fouMax = string[1];// 大于某个值
//			} else {
//				fouSign = "between";
//				fouMin = string[0];// 在两个值之间
//				fouMax = string[1];
//			}
//		}
//		
//		String tenSign = "0";
//		String tenMin = "0";
//		String tenMax = "0";	
//		if (!tenEmpty.equals("")) {
//			string = tenEmpty.split(",");
//			if (string[0].equals("<")) {
//				tenSign = "<";
//				tenMin = string[1];// 小于某个值
//			} else if (string[0].equals(">")) {
//				tenSign = ">";
//				tenMax = string[1];// 大于某个值
//			} else {
//				tenSign = "between";
//				tenMin = string[0];// 在两个值之间
//				tenMax = string[1];
//			}
//		}
//		
//		form.add("oneSign", oneSign);
//		form.add("oneMin", oneMin);
//		form.add("oneMax", oneMax);
//		form.add("twoSign", twoSign);
//		form.add("twoMin", twoMin);
//		form.add("twoMax", twoMax);
//		form.add("thrSign", thrSign);
//		form.add("thrMin", thrMin);
//		form.add("thrMax", thrMax);
//		form.add("fouSign", fouSign);
//		form.add("fouMin", fouMin);
//		form.add("fouMax", fouMax);
//		form.add("tenSign", tenSign);
//		form.add("tenMin", tenMin);
//		form.add("tenMax", tenMax);
		
		// 固定要传的五个值
		form.add("startTime", AboutTime.toLong(startTime)/1000 + "");
		form.add("endTime", AboutTime.toLong(endTime)/1000 + "");
		form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
		
		JSONObject jsonObject = null;
		int result = 10;
		try {
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoSummaryAnalysis/aboutAll", form);
			logger.info("按高级查询");

			result = jsonObject.getInt("result");
			// if (result == 0) {
			// System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);
			// // 将查出的结果封装到session中，话务显示使用
			// jsonToMap(jsonObject);
			// }
		} catch (Exception e) {
			result = 10;
			String message = e.getMessage() == null ? "" : e.getMessage();
			if (message.indexOf("Read timed out;") != -1) {
				result = -1;
			}
			jsonObject = new JSONObject();
			jsonObject.element("result", result);
			logger.error(e.getMessage(), e);
		}

		if (isAjax(request)) {
			return renderJsonString(jsonObject.toString());
		}
		return null;
	}
	
	public int getCurrPage() {
		return currPage;
	}

	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}



	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}
	public String getRelayId() {
		return relayId;
	}
	public void setRelayId(String relayId) {
		this.relayId = relayId;
	}

	public String getDirectionType() {
		return directionType;
	}
	public void setDirectionType(String directionType) {
		this.directionType = directionType;
	}
	
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getUpVideoLossBefore() {
		return upVideoLossBefore;
	}

	public void setUpVideoLossBefore(String upVideoLossBefore) {
		this.upVideoLossBefore = upVideoLossBefore;
	}

	public String getUpVideoLossAfter() {
		return upVideoLossAfter;
	}

	public void setUpVideoLossAfter(String upVideoLossAfter) {
		this.upVideoLossAfter = upVideoLossAfter;
	}

	public String getDownVideoLossBefore() {
		return downVideoLossBefore;
	}

	public void setDownVideoLossBefore(String downVideoLossBefore) {
		this.downVideoLossBefore = downVideoLossBefore;
	}

	public String getDownVideoLossAfter() {
		return downVideoLossAfter;
	}

	public void setDownVideoLossAfter(String downVideoLossAfter) {
		this.downVideoLossAfter = downVideoLossAfter;
	}

	public String getUpAudioLossBefore() {
		return upAudioLossBefore;
	}

	public void setUpAudioLossBefore(String upAudioLossBefore) {
		this.upAudioLossBefore = upAudioLossBefore;
	}

	public String getUpAudioLossAfter() {
		return upAudioLossAfter;
	}

	public void setUpAudioLossAfter(String upAudioLossAfter) {
		this.upAudioLossAfter = upAudioLossAfter;
	}

	public String getDownAudioLossBefore() {
		return downAudioLossBefore;
	}

	public void setDownAudioLossBefore(String downAudioLossBefore) {
		this.downAudioLossBefore = downAudioLossBefore;
	}

	public String getDownAudioLossAfter() {
		return downAudioLossAfter;
	}

	public void setDownAudioLossAfter(String downAudioLossAfter) {
		this.downAudioLossAfter = downAudioLossAfter;
	}

	public String getCpuRate() {
		return cpuRate;
	}

	public void setCpuRate(String cpuRate) {
		this.cpuRate = cpuRate;
	}

	public String getFrameRate() {
		return frameRate;
	}

	public void setFrameRate(String frameRate) {
		this.frameRate = frameRate;
	}

	public String getDelay() {
		return delay;
	}

	public void setDelay(String delay) {
		this.delay = delay;
	}
	
	public String getOneEmpty() {
		return oneEmpty;
	}

	public void setOneEmpty(String oneEmpty) {
		this.oneEmpty = oneEmpty;
	}

	public String getTwoEmpty() {
		return twoEmpty;
	}

	public void setTwoEmpty(String twoEmpty) {
		this.twoEmpty = twoEmpty;
	}

	public String getThrEmpty() {
		return thrEmpty;
	}

	public void setThrEmpty(String thrEmpty) {
		this.thrEmpty = thrEmpty;
	}

	public String getFouEmpty() {
		return fouEmpty;
	}

	public void setFouEmpty(String fouEmpty) {
		this.fouEmpty = fouEmpty;
	}

	public String getTenEmpty() {
		return tenEmpty;
	}

	public void setTenEmpty(String tenEmpty) {
		this.tenEmpty = tenEmpty;
	}
	
	public String getMicId() {
		return micId;
	}

	public void setMicId(String micId) {
		this.micId = micId;
	}
	
	public String getAttendCount() {
		return attendCount;
	}

	public void setAttendCount(String attendCount) {
		this.attendCount = attendCount;
	}
	
	public String getTimeduraction() {
		return timeduraction;
	}

	public void setTimeduraction(String timeduraction) {
		this.timeduraction = timeduraction;
	}

	public String getSpeakerId() {
		return speakerId;
	}

	public void setSpeakerId(String speakerId) {
		this.speakerId = speakerId;
	}

	public String getUpVideoLossFinal() {
		return upVideoLossFinal;
	}

	public void setUpVideoLossFinal(String upVideoLossFinal) {
		this.upVideoLossFinal = upVideoLossFinal;
	}

	public String getDownVideoLossFinal() {
		return downVideoLossFinal;
	}

	public void setDownVideoLossFinal(String downVideoLossFinal) {
		this.downVideoLossFinal = downVideoLossFinal;
	}

	public String getVideoLossBefore() {
		return videoLossBefore;
	}

	public void setVideoLossBefore(String videoLossBefore) {
		this.videoLossBefore = videoLossBefore;
	}

	public String getVideoLossAfter() {
		return videoLossAfter;
	}

	public void setVideoLossAfter(String videoLossAfter) {
		this.videoLossAfter = videoLossAfter;
	}

	public String getVideoLossFinal() {
		return videoLossFinal;
	}

	public void setVideoLossFinal(String videoLossFinal) {
		this.videoLossFinal = videoLossFinal;
	}

	public String getUpAudioLossFinal() {
		return upAudioLossFinal;
	}

	public void setUpAudioLossFinal(String upAudioLossFinal) {
		this.upAudioLossFinal = upAudioLossFinal;
	}

	public String getDownAudioLossFinal() {
		return downAudioLossFinal;
	}

	public void setDownAudioLossFinal(String downAudioLossFinal) {
		this.downAudioLossFinal = downAudioLossFinal;
	}

	public String getAudioLossBefore() {
		return audioLossBefore;
	}

	public void setAudioLossBefore(String audioLossBefore) {
		this.audioLossBefore = audioLossBefore;
	}

	public String getAudioLossAfter() {
		return audioLossAfter;
	}

	public void setAudioLossAfter(String audioLossAfter) {
		this.audioLossAfter = audioLossAfter;
	}

	public String getAudioLossFinal() {
		return audioLossFinal;
	}

	public void setAudioLossFinal(String audioLossFinal) {
		this.audioLossFinal = audioLossFinal;
	}
	
	public String getRelayIp() {
		return relayIp;
	}

	public void setRelayIp(String relayIp) {
		this.relayIp = relayIp;
	}
	
	
	public String getMeetingStartTime() {
		return meetingStartTime;
	}

	public void setMeetingStartTime(String meetingStartTime) {
		this.meetingStartTime = meetingStartTime;
	}

	public String getMeetingEndTime() {
		return meetingEndTime;
	}

	public void setMeetingEndTime(String meetingEndTime) {
		this.meetingEndTime = meetingEndTime;
	}
	
	public String getKeyLogId() {
		return keyLogId;
	}

	public void setKeyLogId(String keyLogId) {
		this.keyLogId = keyLogId;
	}
	public String getQosTableName() {
		return qosTableName;
	}
	public void setQosTableName(String qosTableName) {
		this.qosTableName = qosTableName;
	}
	/**
	 * @方法功能 将原始数据整理为excel表可用的json数据
	 * @param data GZIP压缩后的数据
	 * @return
	 * @throws IOException
	 */
	private JSONObject OriginaldataToJson(byte[] data) throws IOException {
		logger.info("进入OriginaldataToJson");
		 if (data == null || data.length == 0) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
	     ByteArrayInputStream in = new ByteArrayInputStream(data);

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    //String orignalData = out.toString();
	    logger.info("进入解析JSON");
	    //System.out.println("data:"+out.toString()); 
	    //JSONObject orginalJson = JSONObject.fromObject(orignalData);
		JSONObject orginalJson = JSONObject.fromObject(out.toString());
		logger.info("从字符串转成JSON");

		JSONArray array = orginalJson.getJSONArray("items");
//		JSONArray newArray1 = new JSONArray();//存放mic1中的数据
//		JSONArray newArray2 = new JSONArray();//存放mic2中的数据
//		JSONObject newJSON1 = new JSONObject();//mic1
//		JSONObject newJSON2 = new JSONObject();//mic2
		JSONArray newArray = new JSONArray();
		JSONObject newJSON = new JSONObject();
		JSONObject json1;//存放整体视频丢包率(万分之几)Fec前
		JSONObject json2;//存放整体视频丢包率Fec后
		JSONObject json3;//存放
		JSONObject json4;//存放
		JSONObject json5;//存放
		JSONObject json6;//存放
		JSONArray  lossInfoArray;
		String excelHead = "时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率";

//		newJSON1.put("result", orginalJson.getInt("result"));
//		newJSON1.put("head", excelHead);
//		newJSON2.put("result", orginalJson.getInt("result"));
//		newJSON2.put("head", excelHead);
		newJSON.put("result", orginalJson.getInt("result"));
		newJSON.put("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isArray()){
			for(int i = 0;i<array.size();i++){
				JSONObject json = array.getJSONObject(i);
			    String time = json.getString("timeStamps");
			    String userid = json.getString("userId");
			    double videolossRateOriginalCCs = json.getDouble("videolossRateOriginalCCs");//整体视频丢包率(万分之几)Fec前
//			    System.out.println("time:"+time+"userid:"+userid+"videolossRateOriginalCCs:"+videolossRateOriginalCCs);
			    double videolossRateFECCCs = json.getDouble("videolossRateFECCCs");//整体视频丢包率Fec后
			    double videolossRateFinalCCs = json.getDouble("videolossRateFinalCCs");//整体视频最终丢包率
			    double audiolossRateOriginalCCs = json.getDouble("audiolossRateOriginalCCs");//整体音频丢包率Fec前
			    double audiolossRateFECCCs = json.getDouble("audiolossRateFECCCs");//整体音频丢包率Fec后
			    double audiolossRateFinalCCs = json.getDouble("audiolossRateFinalCCs");//整体音频最终丢包率
//			    int micid = json.getInt("micId");//获取micid
				json.clear();
				json.put("userId", userid);
				json.put("timeStamps", time);
				lossInfoArray = new JSONArray();
				json1 = new JSONObject();
				json2 = new JSONObject();
				json3 = new JSONObject();
				json4 = new JSONObject();
				json5 = new JSONObject();
				json6 = new JSONObject();
				json1.put("data", videolossRateOriginalCCs);
				json2.put("data", videolossRateFECCCs);
				json3.put("data", videolossRateFinalCCs);
				json4.put("data", audiolossRateOriginalCCs);
				json5.put("data", audiolossRateFECCCs);
				json6.put("data", audiolossRateFinalCCs);
				lossInfoArray.add(json1);
				lossInfoArray.add(json2);
				lossInfoArray.add(json3);
				lossInfoArray.add(json4);
				lossInfoArray.add(json5);
				lossInfoArray.add(json6);
				json.put("lossInfo", lossInfoArray);
//				if(micid == 1){
//					newArray1.add(json);
//				}
//				if(micid == 2){
//					newArray2.add(json);
//				}
				newArray.add(json);
				//logger.info("遍历次数："+i+"JSON");
			}
//			newJSON1.put("items", newArray1);
//			newJSON2.put("items", newArray2);
			newJSON.put("items", newArray);
		}
		//System.out.println("json:"+newJSON.toString());
//		JSONArray array2 = new JSONArray();
//		array2.add(newJSON1);
//		array2.add(newJSON2);
//		JSONObject jsonObject = new JSONObject();
//		jsonObject.put("mic", array2);
//		System.out.println("json:"+jsonObject.toString());
//		return jsonObject;
		//System.out.println("json:"+newJSON.toString());
	    out.flush();
	    out.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	
	/**
	 * @方法功能 将原始数据整理为excel表可用的json数据 用gson将字符串转换为JSON
	 * @param data GZIP压缩后的数据
	 * @return
	 * @throws IOException
	 */
	private JSONObject NewOriginaldataToJson(byte[] data) throws IOException {
		logger.info("进入NewOriginaldataToJson");
		 if (data == null || data.length == 0) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
	     ByteArrayInputStream in = new ByteArrayInputStream(data);

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    logger.info("进入解析JSON");
	    Gson gs = new Gson();
	    JsonElement element = gs.fromJson(out.toString(), JsonElement.class);
	    logger.info("从Gson字符串转成JSON1");
	    JsonObject orginalJson = element.getAsJsonObject();
	    logger.info("从Gson字符串转成JSON2");
//	    JsonParser parser = new JsonParser();
//	    JsonObject orginalJson = (JsonObject)parser.parse(out.toString());
	    JsonArray array = orginalJson.getAsJsonArray("items");
		
		System.out.println("array.length:"+array.size());
		JSONArray newArray = new JSONArray();
		JSONObject newJSON = new JSONObject();
		JSONObject jsonObject;
		JSONObject json1;//存放整体视频丢包率(万分之几)Fec前
		JSONObject json2;//存放整体视频丢包率Fec后
		JSONObject json3;//存放
		JSONObject json4;//存放
		JSONObject json5;//存放
		JSONObject json6;//存放
		JSONArray  lossInfoArray;
		String excelHead = "时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率";
		//newJSON.put("result", orginalJson.getInt("result"));
		newJSON.put("result", orginalJson.get("result").getAsInt());
		newJSON.put("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isJsonArray()){
			for(int i = 0;i<array.size();i++){
				JsonObject json = array.get(i).getAsJsonObject();
				String time = json.get("timeStamps").getAsString();
			    //String time = json.getString("timeStamps");
			    String userid = json.get("userId").getAsString();
			    double videolossRateOriginalCCs = json.get("videolossRateOriginalCCs").getAsDouble();
			    double videolossRateFECCCs = json.get("videolossRateFECCCs").getAsDouble();
			    double videolossRateFinalCCs = json.get("videolossRateFinalCCs").getAsDouble();
			    double audiolossRateOriginalCCs = json.get("audiolossRateOriginalCCs").getAsDouble();
			    double audiolossRateFECCCs = json.get("audiolossRateFECCCs").getAsDouble();
			    double audiolossRateFinalCCs = json.get("audiolossRateFinalCCs").getAsDouble();
			    json = null;
			    jsonObject = new JSONObject();
//				json.clear();
			    jsonObject.put("userId", userid);
			    jsonObject.put("timeStamps", time);
				lossInfoArray = new JSONArray();
				json1 = new JSONObject();
				json2 = new JSONObject();
				json3 = new JSONObject();
				json4 = new JSONObject();
				json5 = new JSONObject();
				json6 = new JSONObject();
				json1.put("data", videolossRateOriginalCCs);
				json2.put("data", videolossRateFECCCs);
				json3.put("data", videolossRateFinalCCs);
				json4.put("data", audiolossRateOriginalCCs);
				json5.put("data", audiolossRateFECCCs);
				json6.put("data", audiolossRateFinalCCs);
				lossInfoArray.add(json1);
				lossInfoArray.add(json2);
				lossInfoArray.add(json3);
				lossInfoArray.add(json4);
				lossInfoArray.add(json5);
				lossInfoArray.add(json6);
				jsonObject.put("lossInfo", lossInfoArray);
				newArray.add(jsonObject);
				//logger.info("遍历次数："+i+"JSON");
			}
			newJSON.put("items", newArray);
		}
		array = null;
		orginalJson = null;
	    out.flush();
	    out.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	
	/**
	 * @方法功能 将原始数据整理为excel表可用的json数据 用gson将字符串转换为JSON 输出多会议的原始数据
	 * @param data GZIP压缩后的数据
	 * @return
	 * @throws IOException
	 */
	private JsonObject MulMeetingOriginaldataToJson(byte[] data) throws IOException {
		logger.info("进入NewOriginaldataToJson");
		 if (data == null || data.length == 0) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
	     ByteArrayInputStream in = new ByteArrayInputStream(data);
	     
	     data = null;

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    logger.info("进入解析JSON");
	    Gson gs = new Gson();
	    JsonElement element = gs.fromJson(out.toString(), JsonElement.class);
	    logger.info("从Gson字符串转成JSON1");
	    JsonObject orginalJson = element.getAsJsonObject();
	    logger.info("从Gson字符串转成JSON2");
//	    JsonParser parser = new JsonParser();
//	    JsonObject orginalJson = (JsonObject)parser.parse(out.toString());
	    JsonArray array = orginalJson.getAsJsonArray("items");
		
		System.out.println("array.length:"+array.size());
		JsonArray newArray = new JsonArray();
		JsonObject newJSON = new JsonObject();
		JsonObject jsonObject;
		JsonObject json1;//存放
		JsonObject json2;//存放
		JsonObject json3;//存放
//		JsonObject json4;//存放
//		JsonObject json5;//存放
//		JsonObject json6;//存放
		JsonObject json7;//存放
		JsonObject json8;//存放CPU
		JsonObject json10;
		JsonObject json9;//存放resourceId
		JsonObject json11;
		JsonArray  lossInfoArray;
		String excelHead = "时间,网络类型,原始丢包率,解FEC丢包率,最终丢包率,CPU使用率,媒体类型,resourceId,speakerId";
		//String excelHead = "时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率";
		//newJSON.put("result", orginalJson.getInt("result"));
		newJSON.addProperty("result", orginalJson.get("result").getAsInt());
		newJSON.addProperty("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isJsonArray()){
			//NetworkTypeDict dict = new NetworkTypeDict();
			int arraySize = array.size();
			for(int i = 0;i<arraySize;i++){
				JsonObject json = array.get(i).getAsJsonObject();
				String time = json.get("timeStamps").getAsString();
			    //String time = json.getString("timeStamps");
			    String userid = json.get("userId").getAsString();
			    String meetingId = json.get("meetingId").getAsInt()+"";
			    String mediaType = json.get("mediaType").getAsInt() + 1 +"";
			    userid = userid + "_" + meetingId ;
			    Integer netType = json.get("networkType").getAsInt();
			    String networkType = NetworkTypeDict.m_tab.get(netType);
				if (null == networkType) {
					networkType = "网络类型未获取";
				}
			    String videolossRateOriginalCCs = json.get("lossRateOriginalCCs").getAsDouble() +"";
			    String videolossRateFECCCs      = json.get("lossRateFECCCs").getAsDouble()+"";
			    String videolossRateFinalCCs    = json.get("lossRateFinalCCs").getAsDouble()+"";
//			    String audiolossRateOriginalCCs = json.get("audiolossRateOriginalCCs").getAsDouble()+"";
//			    String audiolossRateFECCCs      = json.get("audiolossRateFECCCs").getAsDouble()+"";
//			    String audiolossRateFinalCCs    = json.get("audiolossRateFinalCCs").getAsDouble()+"";
			    String cpuRate                  = json.get("cpuRate").getAsInt()+""; 
			    String resourceId               = json.get("resourceId").getAsInt() +"";
			    String relateSpeakerId          = json.get("speakerId").getAsString();   
			    json = null;
			    jsonObject = new JsonObject();
//				json.clear();
			    jsonObject.addProperty("userId", userid);
			    jsonObject.addProperty("timeStamps", time);
				lossInfoArray = new JsonArray();
				json1 = new JsonObject();
				json2 = new JsonObject();
				json3 = new JsonObject();
//				json4 = new JsonObject();
//				json5 = new JsonObject();
//				json6 = new JsonObject();
				json7 = new JsonObject();
				json8 = new JsonObject();
				json9 = new JsonObject();
				json10 = new JsonObject();
				json11 = new JsonObject();
				json7.addProperty("data", networkType);
				json1.addProperty("data", videolossRateOriginalCCs);
				json2.addProperty("data", videolossRateFECCCs);
				json3.addProperty("data", videolossRateFinalCCs);
//				json4.addProperty("data", audiolossRateOriginalCCs);
//				json5.addProperty("data", audiolossRateFECCCs);
//				json6.addProperty("data", audiolossRateFinalCCs);
				json8.addProperty("data", cpuRate);
				json9.addProperty("data", resourceId);
				json10.addProperty("data", mediaType);
				json11.addProperty("data", relateSpeakerId);
				lossInfoArray.add(json7);
				lossInfoArray.add(json1);
				lossInfoArray.add(json2);
				lossInfoArray.add(json3);
//				lossInfoArray.add(json4);
//				lossInfoArray.add(json5);
//				lossInfoArray.add(json6);
				lossInfoArray.add(json8);
				lossInfoArray.add(json10);
				lossInfoArray.add(json9);
				lossInfoArray.add(json11);
				jsonObject.add("lossInfo", lossInfoArray);
				newArray.add(jsonObject);
				//logger.info("遍历次数："+i+"JSON");
			}
			newJSON.add("items", newArray);
		}
		element = null;
		array = null;
		orginalJson = null;
	    out.flush();
	    out.close();
	    in.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	
	

	
	private JsonObject MulMeetingOriginalDetaildataToJson(byte[] data) throws IOException {
		logger.info("进入NewOriginaldataToJson");
		 if (data == null || data.length == 0) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
	     ByteArrayInputStream in = new ByteArrayInputStream(data);

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    logger.info("进入解析JSON");
	    Gson gs = new Gson();
	    JsonElement element = gs.fromJson(out.toString(), JsonElement.class);
	    logger.info("从Gson字符串转成JSON1");
	    JsonObject orginalJson = element.getAsJsonObject();
	    logger.info("从Gson字符串转成JSON2");
	    JsonArray array = orginalJson.getAsJsonArray("items");
		
		System.out.println("array.length:"+array.size());
		JsonArray newArray = new JsonArray();
		JsonObject newJSON = new JsonObject();
		JsonObject jsonObject;
		JsonObject json6;//存放MicId
		JsonObject json7;//存放网络类型
		JsonObject json8;//存放传输方向
		JsonObject json9;//存放用户IP
		JsonObject json10;//存放RelayIP
		JsonObject json26;//存放客观带宽
		JsonObject json28;//存放使用带宽

		
		JsonArray  lossInfoArray;
		String excelHead = "时间,网络类型,传输方向,MicId,用户IP,RelayIp,客观带宽,使用带宽";
		newJSON.addProperty("result", orginalJson.get("result").getAsInt());
		newJSON.addProperty("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isJsonArray()){
			for(int i = 0;i<array.size();i++){
				JsonObject json = array.get(i).getAsJsonObject();
				String time = json.get("timeStamps").getAsString();
			    String userid = json.get("userId").getAsString();
			    String meetingId = json.get("meetingId").getAsInt()+"";
			    userid = userid + "_" + meetingId;
			    Integer netType = json.get("networkType").getAsInt();
			    String networkType = NetworkTypeDict.m_tab.get(netType);
				if (null == networkType) {
					networkType = "网络类型未获取";
				}
				String directionType = json.get("directionType").getAsInt() +"";
				String micId = json.get("micId").getAsInt()+"";
				String userIp = json.get("userIp").getAsString();
				String relayIp = json.get("relayIp").getAsString();
				String relayDescription = RelayDict.relayMap.get(relayIp);
				if (null == relayDescription) {
					relayDescription = relayIp;
				}else {
					relayDescription = relayIp + " " + relayDescription;
				}
			    String bandwidth = json.get("bandwidth").getAsInt() +"";
				String traffic = json.get("traffic").getAsInt() +"";
			    json = null;
			    jsonObject = new JsonObject();

			    jsonObject.addProperty("userId", userid);
			    jsonObject.addProperty("timeStamps", time);
				lossInfoArray = new JsonArray();
				json6 = new JsonObject();
				json7 = new JsonObject();
				json8 = new JsonObject();
				json9 = new JsonObject();
				json10 = new JsonObject();
				json26 = new JsonObject();
				json28 = new JsonObject();

				

				json7.addProperty("data", networkType);
				json8.addProperty("data", directionType);
				json6.addProperty("data", micId);
				json9.addProperty("data", userIp);
				json10.addProperty("data", relayDescription);
				json26.addProperty("data", bandwidth);
				json28.addProperty("data", traffic);


				lossInfoArray.add(json7);
				lossInfoArray.add(json8);
				lossInfoArray.add(json6);
				lossInfoArray.add(json9);
				lossInfoArray.add(json10);
				lossInfoArray.add(json26);
				lossInfoArray.add(json28);
				jsonObject.add("lossInfo", lossInfoArray);
				newArray.add(jsonObject);
			}
			newJSON.add("items", newArray);
		}
		array = null;
		orginalJson = null;
	    out.flush();
	    out.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	

	
	/**
	 * @方法功能 将原始数据整理为excel表可用的json数据 用gson将字符串转换为JSON 输出多会议的原始数据
	 * @param data GZIP压缩后的数据
	 * @return
	 * @throws IOException
	 */
	private JsonObject MulMeetingOriginaldataToJsonForMarket(byte[] data) throws IOException {
		logger.info("进入NewOriginaldataToJson");
		 if (data == null || data.length == 0) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
	     ByteArrayInputStream in = new ByteArrayInputStream(data);

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    logger.info("进入解析JSON");
	    Gson gs = new Gson();
	    JsonElement element = gs.fromJson(out.toString(), JsonElement.class);
	    logger.info("从Gson字符串转成JSON1");
	    JsonObject orginalJson = element.getAsJsonObject();
	    logger.info("从Gson字符串转成JSON2");
	    JsonArray array = orginalJson.getAsJsonArray("items");
		//zhanghy 2017-01-18 获取从后台传过来的MAP
	    JsonElement meetingInfoJsonElement = orginalJson.get("meetingInfoMap");
	    JsonObject meetingInfoObject = meetingInfoJsonElement.getAsJsonObject();
	    
		System.out.println("array.length:"+array.size());
		JsonArray newArray = new JsonArray();
		JsonObject newJSON = new JsonObject();
		JsonObject jsonObject;
		JsonObject json1;//存放整体视频丢包率(万分之几)Fec前
		JsonObject json2;//存放整体视频丢包率Fec后
		JsonObject json3;//存放 
		JsonObject json4;//存放 cpu
		JsonObject json5;//存放 resourceid
		JsonObject json6;//存放 speakerid
		JsonObject json7;//存放网络类型
		JsonObject json8;//存放客户归属
		JsonObject json9;//mediatype
		JsonArray  lossInfoArray;
		String excelHead = "时间,网络类型,原始丢包率,解FEC丢包率,最终丢包率,CPU使用率,媒体类型,resourceId,speakerId,所属";
		//String excelHead = "时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率";
		//newJSON.put("result", orginalJson.getInt("result"));
		newJSON.addProperty("result", orginalJson.get("result").getAsInt());
		newJSON.addProperty("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isJsonArray()){
			for(int i = 0;i<array.size();i++){
				JsonObject json = array.get(i).getAsJsonObject();
				String time = json.get("timeStamps").getAsString();
			    //String time = json.getString("timeStamps");
			    String userid = json.get("userId").getAsString();
			    String userid1 = json.get("userId").getAsString();
			   // String relationship = MarketUserDict.m_tab.get(userid);
			    //zhanghy  12-09 改四方销售 读取用户map
			    String relationship = CommStats.market_map.get(userid);
			    if (null == relationship) {
					relationship = "未知";
				}
			    String meetingId = json.get("meetingId").getAsInt()+"";
			    userid = userid + "_" + meetingId;
			    String mediaType = json.get("mediaType").getAsInt() + 1 +"";
			    Integer netType = json.get("networkType").getAsInt();
			    String networkType = NetworkTypeDict.m_tab.get(netType);
				if (null == networkType) {
					networkType = "网络类型未获取";
				}
/*			    String videolossRateOriginalCCs = json.get("videolossRateOriginalCCs").getAsDouble() +"";
			    String videolossRateFECCCs = json.get("videolossRateFECCCs").getAsDouble()+"";
			    String videolossRateFinalCCs = json.get("videolossRateFinalCCs").getAsDouble()+"";*/
			    String videolossRateOriginalCCs = json.get("lossRateOriginalCCs").getAsDouble() +"";
			    String videolossRateFECCCs = json.get("lossRateFECCCs").getAsDouble()+"";
			    String videolossRateFinalCCs = json.get("lossRateFinalCCs").getAsDouble()+"";
/*			    String audiolossRateOriginalCCs = json.get("audiolossRateOriginalCCs").getAsDouble()+"";
			    String audiolossRateFECCCs = json.get("audiolossRateFECCCs").getAsDouble()+"";
			    String audiolossRateFinalCCs = json.get("audiolossRateFinalCCs").getAsDouble()+"";*/
			    String cpuRate                  = json.get("cpuRate").getAsInt()+""; 
			    String resourceId               = json.get("resourceId").getAsInt() +"";
			    String relateSpeakerId          = json.get("speakerId").getAsString();   
			    json = null;
			    jsonObject = new JsonObject();
			    jsonObject.addProperty("userId", userid);
			    jsonObject.addProperty("timeStamps", time);
				lossInfoArray = new JsonArray();
				json1 = new JsonObject();
				json2 = new JsonObject();
				json3 = new JsonObject();
				json4 = new JsonObject();
				json5 = new JsonObject();
				json6 = new JsonObject();
				json7 = new JsonObject();
				json8 = new JsonObject();
				json9 = new JsonObject();
				json7.addProperty("data", networkType);
				json1.addProperty("data", videolossRateOriginalCCs);
				json2.addProperty("data", videolossRateFECCCs);
				json3.addProperty("data", videolossRateFinalCCs);
/*				json4.addProperty("data", audiolossRateOriginalCCs);
				json5.addProperty("data", audiolossRateFECCCs);
				json6.addProperty("data", audiolossRateFinalCCs);*/
				json4.addProperty("data", cpuRate);
				json9.addProperty("data", mediaType);
				json5.addProperty("data", resourceId);
				json6.addProperty("data", relateSpeakerId);
				json8.addProperty("data", relationship);
				lossInfoArray.add(json7);
				lossInfoArray.add(json1);
				lossInfoArray.add(json2);
				lossInfoArray.add(json3);
				lossInfoArray.add(json4);
				lossInfoArray.add(json9);
				lossInfoArray.add(json5);
				lossInfoArray.add(json6);
				lossInfoArray.add(json8);
				jsonObject.add("lossInfo", lossInfoArray);
				newArray.add(jsonObject);
				//logger.info("遍历次数："+i+"JSON");
			}
			newJSON.add("items", newArray);
			newJSON.add("meetingInfo", meetingInfoObject);
		}
		array = null;
		orginalJson = null;
	    out.flush();
	    out.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	
	private JsonObject MulMeetingOriginaldataToJson(InputStream in)throws Exception{
		logger.info("进入NewOriginaldataToJson");
		 if (in == null) {
	            return null;
	     }
	     ByteArrayOutputStream out = new ByteArrayOutputStream();
//	     ByteArrayInputStream in = new ByteArrayInputStream(data);

	     try {
	            GZIPInputStream gunzip = new GZIPInputStream(in);
	            byte[] buffer = new byte[256];
	            int n;
	            while ((n = gunzip.read(buffer)) >= 0) {
	                out.write(buffer, 0, n);
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    logger.info("进入解析JSON");
	    Gson gs = new Gson();
	    JsonElement element = gs.fromJson(out.toString(), JsonElement.class);
	    logger.info("从Gson字符串转成JSON1");
	    JsonObject orginalJson = element.getAsJsonObject();
	    logger.info("从Gson字符串转成JSON2");
//	    JsonParser parser = new JsonParser();
//	    JsonObject orginalJson = (JsonObject)parser.parse(out.toString());
	    JsonArray array = orginalJson.getAsJsonArray("items");
		
		System.out.println("array.length:"+array.size());
		JsonArray newArray = new JsonArray();
		JsonObject newJSON = new JsonObject();
		JsonObject jsonObject;
		JsonObject json1;//存放
		JsonObject json2;//存放
		JsonObject json3;//存放
//		JsonObject json4;//存放
//		JsonObject json5;//存放
//		JsonObject json6;//存放
		JsonObject json7;//存放
		JsonObject json8;//存放CPU
		JsonObject json10;
		JsonObject json9;//存放resourceId
		JsonObject json11;
		JsonArray  lossInfoArray;
		String excelHead = "时间,网络类型,原始丢包率,解FEC丢包率,最终丢包率,CPU使用率,媒体类型,resourceId,speakerId";
		//newJSON.put("result", orginalJson.getInt("result"));
		newJSON.addProperty("result", orginalJson.get("result").getAsInt());
		newJSON.addProperty("head", excelHead);
		logger.info("准备进入遍历JSON");
		if(array.isJsonArray()){
			//NetworkTypeDict dict = new NetworkTypeDict();
			int arraySize = array.size();
			for(int i = 0;i<arraySize;i++){
				JsonObject json = array.get(i).getAsJsonObject();
				String time = json.get("timeStamps").getAsString();
			    //String time = json.getString("timeStamps");
			    String userid = json.get("userId").getAsString();
			    String meetingId = json.get("meetingId").getAsInt()+"";
			    String mediaType = json.get("mediaType").getAsInt() + 1 +"";
			    userid = userid + "_" + meetingId ;
			    Integer netType = json.get("networkType").getAsInt();
			    String networkType = NetworkTypeDict.m_tab.get(netType);
				if (null == networkType) {
					networkType = "网络类型未获取";
				}
			    String videolossRateOriginalCCs = json.get("lossRateOriginalCCs").getAsDouble() +"";
			    String videolossRateFECCCs      = json.get("lossRateFECCCs").getAsDouble()+"";
			    String videolossRateFinalCCs    = json.get("lossRateFinalCCs").getAsDouble()+"";
//			    String audiolossRateOriginalCCs = json.get("audiolossRateOriginalCCs").getAsDouble()+"";
//			    String audiolossRateFECCCs      = json.get("audiolossRateFECCCs").getAsDouble()+"";
//			    String audiolossRateFinalCCs    = json.get("audiolossRateFinalCCs").getAsDouble()+"";
			    String cpuRate                  = json.get("cpuRate").getAsInt()+""; 
			    String resourceId               = json.get("resourceId").getAsInt() +"";
			    String relateSpeakerId          = json.get("speakerId").getAsString();   
			    json = null;
			    jsonObject = new JsonObject();
//				json.clear();
			    jsonObject.addProperty("userId", userid);
			    jsonObject.addProperty("timeStamps", time);
				lossInfoArray = new JsonArray();
				json1 = new JsonObject();
				json2 = new JsonObject();
				json3 = new JsonObject();
//				json4 = new JsonObject();
//				json5 = new JsonObject();
//				json6 = new JsonObject();
				json7 = new JsonObject();
				json8 = new JsonObject();
				json9 = new JsonObject();
				json10 = new JsonObject();
				json11 = new JsonObject();
				json7.addProperty("data", networkType);
				json1.addProperty("data", videolossRateOriginalCCs);
				json2.addProperty("data", videolossRateFECCCs);
				json3.addProperty("data", videolossRateFinalCCs);
//				json4.addProperty("data", audiolossRateOriginalCCs);
//				json5.addProperty("data", audiolossRateFECCCs);
//				json6.addProperty("data", audiolossRateFinalCCs);
				json8.addProperty("data", cpuRate);
				json9.addProperty("data", resourceId);
				json10.addProperty("data", mediaType);
				json11.addProperty("data", relateSpeakerId);
				lossInfoArray.add(json7);
				lossInfoArray.add(json1);
				lossInfoArray.add(json2);
				lossInfoArray.add(json3);
//				lossInfoArray.add(json4);
//				lossInfoArray.add(json5);
//				lossInfoArray.add(json6);
				lossInfoArray.add(json8);
				lossInfoArray.add(json10);
				lossInfoArray.add(json9);
				lossInfoArray.add(json11);
				jsonObject.add("lossInfo", lossInfoArray);
				newArray.add(jsonObject);
				//logger.info("遍历次数："+i+"JSON");
			}
			newJSON.add("items", newArray);
		}
		element = null;
		array = null;
		orginalJson = null;
	    out.flush();
	    out.close();
	    in.close();
		logger.info("退出OriginaldataToJson");
		return newJSON;
	}
	private ArrayList<String> getCompanyList(Map map,String companyName){
		Set set = map.entrySet();//新建一个不可重复的集合
	    ArrayList<String> arr = new ArrayList<String>();//新建一个集合
		
	    Iterator it = set.iterator();//遍历的类
	    int arr_length = 0;
	    int index = 0;
	    while(it.hasNext()) {
	      Map.Entry entry = (Map.Entry)it.next();//找到所有key-value对集合
	     // Pattern pattern = Pattern.compile("^.*" + companyName+ ".*$", Pattern.CASE_INSENSITIVE);
	      if(entry.getValue().toString().contains(companyName)) {//通过判断是否有该value值
	        String userId = (String)entry.getKey();//取得key值
	        arr.add(userId);
	      }
	    }
	    return arr;
	}
/*	private String getQosTablesList(JSONObject jsonObject){
		String qosTablesString = new String();
		JSONArray jsonArray = jsonObject.getJSONArray("items");
		for(int i = 0; i < jsonArray.size() ; i++){
			JSONObject json = (JSONObject)jsonArray.get(i);
			qosTablesString += json.get("qosTableName").toString()+",";
		}
		return qosTablesString;
	}*/


	
}
