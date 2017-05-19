package com.redcdn.webShow.action;

import net.sf.json.JSONObject;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class PackDetailAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String speakerId; //发言者Id
	private String meetingId;//会议Id
	private String micId;
	private int pageSize = 25;
	private int currPage;// 当前页
	private String topoInfo;
	private long timeStamp;
	


	/**
	 * 按meetingId+micId+speakerId查询  表中的帧流转信息
	 * @return
	 */
	public String aboutSpeakerId(){
		logger.info("即将进入PackDetailAction.aboutSpeakerId().action");
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("meetingId", meetingId);
	    form.add("micId",micId);
	    form.add("speakerId", speakerId);
	    //form.add("userId", userId);
	    System.out.println("meetingId:"+meetingId+"micId:"+micId+"speakerId:"+speakerId);
	    form.add("pageSize", pageSize + "");
		form.add("currPage", currPage + "");
	    
		
		
		
		
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/MeetingInfoAnalysis/aboutMeetingId", form);
			logger.info("查询帧流转信息");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);		
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
		logger.info("即将退出PackDetailAction.aboutSpeakerId().action");
		return null;	
	}
	
   
	/**
	 * 按meetingId+micId+speakerId+senderId+receiverId+timeStamp查询  表中的详细数据包信息
	 * @return
	 */
	public String aboutTimeStamp(){
		logger.info("即将进入PackDetailAction.aboutTimeStamp.action");
		
		long startTime;
	    long endTime;
	    String senderId;
	    String receiverId;
		
		startTime = timeStamp - 2000;
		endTime  = timeStamp + 2000;
		String[] topoInfos = topoInfo.split("_");
		if (topoInfos.length ==2) {
			senderId = topoInfo.split("_")[0];
		    receiverId = topoInfo.split("_")[1];
		}
		else {
			senderId = topoInfo;
			receiverId = "0";
		}
	    
	    MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("meetingId", meetingId);
	    form.add("micId",micId);
	    form.add("speakerId", speakerId);
	    form.add("startTime", startTime+"");
	    form.add("endTime", endTime+"");
	    form.add("senderId", senderId);
	    form.add("receiverId", receiverId);
	    //form.add("userId", userId);
	    System.out.println("meetingId:"+meetingId+"micId:"+micId+"speakerId:"+speakerId+"startTime:"+startTime+"endTime:"+endTime+"senderId:"+senderId+"receiverId:"+receiverId);
	    
	    //test
//	    JSONObject testJson1 = new JSONObject();
//  		testJson1.put("result", 0);
//  		JSONObject testJson2 = new JSONObject();
//  		testJson2.put("index",65532);
//  		testJson2.put("meetingid",60010001);
//  		testJson2.put("micid",1);
//  		testJson2.put("direction",1);
//  		testJson2.put("speakerid",60010001);
//  		testJson2.put("senderid", 60010001);
//  		testJson2.put("receiverid", "10.130.60.123:1001");//
//  		testJson2.put("packettype", "data");
//  		testJson2.put("frameid", 65533);
//  		testJson2.put("fecgroupid",3002);
//  		testJson2.put("fecrateFEC","4:2");
//  		testJson2.put("fecgroupinnerid",12);//音频丢包率	
//  		testJson2.put("frameInnerId",20);//efc后音频丢包率
//  		testJson2.put("recvtimes","2015-7-5 9:30:12");
//  		testJson2.put("times","2015-7-5 9:30:12");
//  		testJson2.put("mideatype",0);
//  		JSONObject testJson3 = new JSONObject();
//  		testJson3.put("index",65532);
//  		testJson3.put("meetingid",60010001);
//  		testJson3.put("micid",1);
//  		testJson3.put("direction",0);
//  		testJson3.put("speakerid",60010001);
//  		testJson3.put("senderid", 60010001);
//  		testJson3.put("receiverid", "10.130.60.123:1001");//
//  		testJson3.put("packettype", "data");
//  		testJson3.put("frameid", 65533);
//  		testJson3.put("fecgroupid",3002);
//  		testJson3.put("fecrateFEC","4:2");
//  		testJson3.put("fecgroupinnerid",12);//音频丢包率	
//  		testJson3.put("frameInnerId",20);//efc后音频丢包率
//  		testJson3.put("recvtimes","2015-7-5 9:30:12");
//  		testJson3.put("times","2015-7-5 9:30:12");
//  		testJson3.put("mideatype",0);
//  		JSONObject testJson4 = new JSONObject();
//  		testJson4.put("index",65531);
//  		testJson4.put("meetingid",60010001);
//  		testJson4.put("micid",1);
//  		testJson4.put("direction",1);
//  		testJson4.put("speakerid",60010001);
//  		testJson4.put("senderid", 60010001);
//  		testJson4.put("receiverid", "10.130.60.123:1001");//
//  		testJson4.put("packettype", "data");
//  		testJson4.put("frameid", 65533);
//  		testJson4.put("fecgroupid",3002);
//  		testJson4.put("fecrateFEC","4:2");
//  		testJson4.put("fecgroupinnerid",12);//音频丢包率	
//  		testJson4.put("frameInnerId",20);//efc后音频丢包率
//  		testJson4.put("recvtimes","2015-7-5 9:30:12");
//  		testJson4.put("times","2015-7-5 9:30:12");
//  		testJson4.put("mideatype",0);
//  		JSONObject testJson5 = new JSONObject();
//  		testJson5.put("index",65531);
//  		testJson5.put("meetingid",60010001);
//  		testJson5.put("micid",1);
//  		testJson5.put("direction",0);
//  		testJson5.put("speakerid",60010001);
//  		testJson5.put("senderid", 60010001);
//  		testJson5.put("receiverid", "10.130.60.123:1001");//
//  		testJson5.put("packettype", "data");
//  		testJson5.put("frameid", 65533);
//  		testJson5.put("fecgroupid",3002);
//  		testJson5.put("fecrateFEC","4:2");
//  		testJson5.put("fecgroupinnerid",12);//音频丢包率	
//  		testJson5.put("frameInnerId",20);//efc后音频丢包率
//  		testJson5.put("recvtimes","2015-7-5 9:30:12");
//  		testJson5.put("times","2015-7-5 9:30:12");
//  		testJson5.put("mideatype",0);
//  		JSONArray testJsonArray = new JSONArray();
//  		testJsonArray.add(testJson2);
//  		testJsonArray.add(testJson3);
//  		testJsonArray.add(testJson4);
//  		testJsonArray.add(testJson5);
//  		testJson1.put("items", testJsonArray);
//  		//System.out.println("json:"+testJson1);
//  		if (isAjax(request)) {
//  			return renderJsonString(testJson1.toString());
//  		}
  		
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/PacketInfoAnalyse/aboutTimeStamp", form);
			logger.info("查询数据包信息");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);		
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
		logger.info("即将退出PackDetailAction.aboutTimeStamp.action");
		return null;	
	}
	
	public String aboutResendReqConmandTimeStamp(){
		logger.info("即将进入PackDetailAction.aboutTimeStamp.action");
		
		long startTime;
	    long endTime;
	    String senderId;
	    String receiverId;
		
		startTime = timeStamp - 2000;
		endTime  = timeStamp + 2000;
		String[] topoInfos = topoInfo.split("_");
		if (topoInfos.length ==2) {
			senderId = topoInfo.split("_")[0];
		    receiverId = topoInfo.split("_")[1];
		}
		else {
			senderId = topoInfo;
			receiverId = "0";
		}
	    
	    MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
	    form.add("meetingId", meetingId);
	    form.add("micId",micId);
	    form.add("speakerId", speakerId);
	    form.add("startTime", startTime+"");
	    form.add("endTime", endTime+"");
	    form.add("senderId", senderId);
	    form.add("receiverId", receiverId);
	    System.out.println("meetingId:"+meetingId+"micId:"+micId+"speakerId:"+speakerId+"startTime:"+startTime+"endTime:"+endTime+"senderId:"+senderId+"receiverId:"+receiverId);
	    
	    //test
//	    JSONObject testJson1 = new JSONObject();
//  		testJson1.put("result", 0);
//  		JSONObject testJson2 = new JSONObject();
//  		testJson2.put("index",65532);
//  		testJson2.put("meetingid",60010001);
//  		testJson2.put("micid",1);
//  		testJson2.put("direction",1);
//  		testJson2.put("speakerid",60010001);
//  		testJson2.put("senderid", 60010001);
//  		testJson2.put("receiverid", "10.130.60.123:1001");//
//  		testJson2.put("packetrtt", 60);
//  		testJson2.put("packetrto", 100);
//  		testJson2.put("packetmaxrto",3002);
//  		testJson2.put("packetmaxtimes",3);
//  		testJson2.put("framertt",12);
//  		testJson2.put("framerto",12);
//  		testJson2.put("framemaxtimes",12);
//  		testJson2.put("dataPacketList","12345_12346_12347_12348");
//  		testJson2.put("checkPacketList","12345_12346_12347_12348");
//  		testJson2.put("frameList","12345_12346_12347_12348");
//  		testJson2.put("recvtimes","2015-7-5 9:30:12");
//  		testJson2.put("times","2015-7-5 9:30:12");
//  		JSONObject testJson3 = new JSONObject();
//  		testJson3.put("index",65532);
//  		testJson3.put("meetingid",60010001);
//  		testJson3.put("micid",1);
//  		testJson3.put("direction",0);
//  		testJson3.put("speakerid",60010001);
//  		testJson3.put("senderid", 60010001);
//  		testJson3.put("receiverid", "10.130.60.123:1001");//
//  		testJson3.put("packetrtt", 60);
//  		testJson3.put("packetrto", 100);
//  		testJson3.put("packetmaxrto",3002);
//  		testJson3.put("packetmaxtimes",3);
//  		testJson3.put("framertt",12);
//  		testJson3.put("framerto",12);
//  		testJson3.put("framemaxtimes",12);
//  		testJson3.put("dataPacketList","12345_12346_12347_12348");
//  		testJson3.put("checkPacketList","12345_12346_12347_12348");
//  		testJson3.put("frameList","12345_12346_12347_12348");
//  		testJson3.put("recvtimes","2015-7-5 9:30:12");
//  		testJson3.put("times","2015-7-5 9:30:12");
//  		testJson3.put("mideatype",0);
//  		JSONObject testJson4 = new JSONObject();
//  		testJson4.put("index",65531);
//  		testJson4.put("meetingid",60010001);
//  		testJson4.put("micid",1);
//  		testJson4.put("direction",1);
//  		testJson4.put("speakerid",60010001);
//  		testJson4.put("senderid", 60010001);
//  		testJson4.put("receiverid", "10.130.60.123:1001");//
//  		testJson4.put("packetrtt", 60);
//  		testJson4.put("packetrto", 100);
//  		testJson4.put("packetmaxrto",3002);
//  		testJson4.put("packetmaxtimes",3);
//  		testJson4.put("framertt",12);
//  		testJson4.put("framerto",12);
//  		testJson4.put("framemaxtimes",12);
//  		testJson4.put("dataPacketList","12345_12346_12347_12348");
//  		testJson4.put("checkPacketList","12345_12346_12347_12348");
//  		testJson4.put("frameList","12345_12346_12347_12348");
//  		testJson4.put("recvtimes","2015-7-5 9:30:12");
//  		testJson4.put("times","2015-7-5 9:30:12");
//  		testJson4.put("mideatype",0);
//  		JSONObject testJson5 = new JSONObject();
//  		testJson5.put("index",65531);
//  		testJson5.put("meetingid",60010001);
//  		testJson5.put("micid",1);
//  		testJson5.put("direction",0);
//  		testJson5.put("speakerid",60010001);
//  		testJson5.put("senderid", 60010001);
//  		testJson5.put("receiverid", "10.130.60.123:1001");//
//  		testJson5.put("packetrtt", 60);
//  		testJson5.put("packetrto", 100);
//  		testJson5.put("packetmaxrto",3002);
//  		testJson5.put("packetmaxtimes",3);
//  		testJson5.put("framertt",12);
//  		testJson5.put("framerto",12);
//  		testJson5.put("framemaxtimes",12);
//  		testJson5.put("dataPacketList","12345_12346_12347_12348");
//  		testJson5.put("checkPacketList","12345_12346_12347_12348");
//  		testJson5.put("frameList","12345_12346_12347_12348");
//  		testJson5.put("recvtimes","2015-7-5 9:30:12");
//  		testJson5.put("times","2015-7-5 9:30:12");
//  		testJson5.put("mideatype",0);
//  		JSONArray testJsonArray = new JSONArray();
//  		testJsonArray.add(testJson2);
//  		testJsonArray.add(testJson3);
//  		testJsonArray.add(testJson4);
//  		testJsonArray.add(testJson5);
//  		testJson1.put("items", testJsonArray);
//  		//System.out.println("json:"+testJson1);
//  		if (isAjax(request)) {
//  			return renderJsonString(testJson1.toString());
//  		}
  		
  		
    	JSONObject jsonObject = null;
		int result = 10;
		try {

			// 将查询框表单值传送到monitorServer
			jsonObject = proxy.postFormWithReturnJSONObject("/PacketInfoAnalyse/aboutResendReqConmandTimeStamp", form);
			logger.info("查询数据包信息");

			result = jsonObject.getInt("result");
			//if (result == 0) {
			//   System.out.println("count.jsp中查询结果，用来进行话务的显示：" + jsonObject);		
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
		logger.info("即将退出PackDetailAction.aboutTimeStamp.action");
		return null;	
	}
	
	public String getSpeakerId() {
		return speakerId;
	}
	public void setSpeakerId(String speakerId) {
		this.speakerId = speakerId;
	}
	public String getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}
	public String getMicId() {
		return micId;
	}
	public void setMicId(String micId) {
		this.micId = micId;
	}
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}

	public String getTopoInfo() {
		return topoInfo;
	}

	public void setTopoInfo(String topoInfo) {
		this.topoInfo = topoInfo;
	}

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}
}

