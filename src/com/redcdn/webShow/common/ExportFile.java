package com.redcdn.webShow.common;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.redcdn.webShow.action.DownloadBaseAction;
import org.apache.log4j.Logger;

public class ExportFile {
	protected Logger logger = Logger.getLogger(ExportFile.class);
//	public void exportExcel(JSONObject jsonObject) throws IOException {
//		/*
//		 * 操作步骤： 1、创建工作簿对象workbook 2、创建工作表对象sheet 3、创建行对象 row 4、创建单元格对象，赋列值
//		 * 5、写入内容 6、设置样式（可以没有） 7、写入文件 8、关闭文件
//		 */
//		HSSFWorkbook wb = new HSSFWorkbook(); // 新建工作簿
//		HSSFSheet sheet = wb.createSheet(); // 新建工作表
//		HSSFRow nRow = sheet.createRow(5); // 创建行对象，起始值为0
//		HSSFCell nCell = nRow.createCell(4); // 创建单元格对象
//
//
//
//		String result = jsonObject.getString("result");
//		if ("0".equals(result)) {
//			JSONArray count_report = jsonObject.getJSONArray("count_report");
//
//			if (count_report != null) {
//
//				for (int i = 0; i < count_report.size(); i++) {
//
//					JSONArray data = count_report.getJSONObject(i).getJSONArray("data");
//
//					// 创建表头
//					if (data != null && data.size() > 0) {
//						nRow = sheet.createRow(0);
//						nCell = nRow.createCell(0);
//						nCell.setCellValue("文件名");
//
//						for (int j = 0; j < data.size(); j++) {
//							String name = data.getJSONObject(j).getString("name");
//							nCell = nRow.createCell(j + 1);
//							nCell.setCellValue(name);// 列名
//						}
//						break;
//					}
//				}
//
//				// 插入数据内容
//				for (int i = 0; i < count_report.size(); i++) {
//					String firstColsName = count_report.getJSONObject(i).getString("firstColsName");
//					JSONArray data = count_report.getJSONObject(i).getJSONArray("data");
//					nRow = sheet.createRow(i + 1);
//					if (data != null) {
//						nCell = nRow.createCell(0);
//						nCell.setCellValue(firstColsName);// 文件名
//
//						for (int j = 0; j < data.size(); j++) {
//							double value = Double.parseDouble(data.getJSONObject(j).getString("value"));
//
//							nCell = nRow.createCell(j + 1);
//							nCell.setCellValue(value);// 列值
//						}
//					}
//				}
//			}
//		} else {
//			nRow = sheet.createRow(0);
//			nCell = nRow.createCell(0);
//			nCell.setCellValue("所查询日期范围内无相关数据！");
//		}
//
//		// 7.生成excel文件
//		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 生成流对象
//		wb.write(byteArrayOutputStream); // 将excel写入流
//
//		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
//
//		String fileName = sf.format(Calendar.getInstance().getTime());
//
//		// 工具类，封装弹出下载框：
//		String outFile = fileName + ".xls";
//		DownloadBaseAction down = new DownloadBaseAction();
//		HttpServletResponse response = ServletActionContext.getResponse();
//		down.download(byteArrayOutputStream, response, outFile);
//	}
	public void exportExcel(JSONObject jsonObject,String meetingId,String micId) throws IOException {
		logger.info("进入exportExcel");
		/*
		 * 操作步骤： 1、创建工作簿对象workbook 2、创建工作表对象sheet 3、创建行对象 row 4、创建单元格对象，赋列值
		 * 5、写入内容 6、设置样式（可以没有） 7、写入文件 8、关闭文件
		 */
//		System.out.println("jsonObject:"+jsonObject.toString());
		HSSFWorkbook wb = new HSSFWorkbook(); // 新建工作簿
		HSSFSheet sheet;// 新建工作表
//		HSSFRow nRow = sheet.createRow(5); // 创建行对象，起始值为0
//		HSSFCell nCell = nRow.createCell(4); // 创建单元格对象
		String userId;
		int num = 0;
		//test
		//jsonObject.clear();
		//String testString = "{\"result\":0,\"head\":\"时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率\",\"items\":[{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:32:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:47\",\"lossInfo\":[{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1}]},{\"userId\":\"50120263\",\"timeStamps\":\"2015-08-18 10:45:43\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120180\",\"timeStamps\":\"2015-08-18 10:45:49\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]}]}";
		//JSONObject jsonObject = JSONObject.fromObject(testString);
		String result = jsonObject.getString("result");
		String[] head = jsonObject.getString("head").split(",");
		if("0".equals(result)){
			JSONArray array = jsonObject.getJSONArray("items");
			if(array.isArray()){
				if(array.size()>0){
					//创建第一张表
					userId = array.getJSONObject(0).getString("userId");
					sheet = wb.createSheet(userId);
					sheet.setDefaultColumnWidth(17);
					//添加表头
					HSSFRow nRow = sheet.createRow(0);
					for (int i = 0; i<head.length;i++) {
						HSSFCell nCell = nRow.createCell(i);
						nCell.setCellValue(head[i]);
					}
//					HSSFCell nineCell = nRow.createCell(8);
//					nineCell.setCellValue("视频最终丢包率");
//					HSSFCell tenCell = nRow.createCell(9);
//					tenCell.setCellValue("音频最终丢包率");
					//添加数据
					for(int i = 0; i<array.size();i++){
						JSONObject json = array.getJSONObject(i);
						if(userId.equals(json.getString("userId"))){
							nRow = sheet.createRow(i+1-num);
//							if (i+1-num == 1) {
//								nineCell = nRow.createCell(8);
//								nineCell.setCellValue("<5");
//								tenCell = nRow.createCell(9);
//								tenCell.setCellValue("<2");
//							}
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.getString("timeStamps"));
							JSONArray dataArray = json.getJSONArray("lossInfo");
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
							}
						}else{
							//新的用户ID 新建一张工作表 记录用户ID和已经遍历到的数据行数
							userId = json.getString("userId");
							num = i;
							sheet = wb.createSheet(userId);
							sheet.setDefaultColumnWidth(17);
							//添加表头
							nRow = sheet.createRow(0);
							for (int k = 0; k<head.length;k++) {
								HSSFCell nCell = nRow.createCell(k);
								nCell.setCellValue(head[k]);
							}
//							nineCell = nRow.createCell(8);
//							nineCell.setCellValue("视频最终丢包率");
//							tenCell = nRow.createCell(9);
//							tenCell.setCellValue("音频最终丢包率");
							
							nRow = sheet.createRow(i+1-num);
							if (i+1-num == 1) {
//								nineCell = nRow.createCell(8);
//								nineCell.setCellValue("<5");
//								tenCell = nRow.createCell(9);
//								tenCell.setCellValue("<2");
							}
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.getString("timeStamps"));
							JSONArray dataArray = json.getJSONArray("lossInfo");
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
							}
						}
					}
				}
			}
		}else{
			//
			sheet = wb.createSheet();
			HSSFRow nRow = sheet.createRow(0);
			HSSFCell nCell = nRow.createCell(0);
			nCell.setCellValue("所查询会议无相关数据！");
		}

		// 7.生成excel文件
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 生成流对象
		wb.write(byteArrayOutputStream); // 将excel写入流

		//SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

		//String fileName = sf.format(Calendar.getInstance().getTime());
		String fileName;
		if(micId.equals("1") || micId.equals("2")){
			fileName = meetingId + "_"+ micId;
		}else{
			fileName = meetingId;
		}
		
		// 工具类，封装弹出下载框：
		String outFile = fileName + ".xls";
		DownloadBaseAction down = new DownloadBaseAction();
		HttpServletResponse response = ServletActionContext.getResponse();
		down.download(byteArrayOutputStream, response, outFile);
		
		logger.info("退出exportExcel");
	}
	
	public void exportExcel(JsonObject jsonObject,String time) throws IOException {
		logger.info("进入exportExcel");
		/*
		 * 操作步骤： 1、创建工作簿对象workbook 2、创建工作表对象sheet 3、创建行对象 row 4、创建单元格对象，赋列值
		 * 5、写入内容 6、设置样式（可以没有） 7、写入文件 8、关闭文件
		 */
//		System.out.println("jsonObject:"+jsonObject.toString());
		HSSFWorkbook wb = new HSSFWorkbook(); // 新建工作簿
		HSSFSheet sheet;// 新建工作表
//		HSSFRow nRow = sheet.createRow(5); // 创建行对象，起始值为0
//		HSSFCell nCell = nRow.createCell(4); // 创建单元格对象
		String userId;
		int num = 0;
		//test
		//jsonObject.clear();
		//String testString = "{\"result\":0,\"head\":\"时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率\",\"items\":[{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:32:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:47\",\"lossInfo\":[{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1}]},{\"userId\":\"50120263\",\"timeStamps\":\"2015-08-18 10:45:43\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120180\",\"timeStamps\":\"2015-08-18 10:45:49\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]}]}";
		//JSONObject jsonObject = JSONObject.fromObject(testString);
		String result = jsonObject.get("result").getAsInt() + "";
		String[] head = jsonObject.get("head").getAsString().split(",");
		if("0".equals(result)){
			JsonArray array = jsonObject.getAsJsonArray("items");
			if(array.isJsonArray()){
				if(array.size()>0){
					//创建第一张表
					userId = array.get(0).getAsJsonObject().get("userId").getAsString();
					sheet = wb.createSheet(userId);
					sheet.setDefaultColumnWidth(17);
					//添加表头
					HSSFRow nRow = sheet.createRow(0);
					for (int i = 0; i<head.length;i++) {
						HSSFCell nCell = nRow.createCell(i);
						nCell.setCellValue(head[i]);
					}
					//添加数据
					for(int i = 0; i<array.size();i++){
						JsonObject json = array.get(i).getAsJsonObject();
						if(userId.equals(json.get("userId").getAsString())){
							if (i+1-num < 65535) {
								nRow = sheet.createRow(i+1-num);
								HSSFCell nCell0 = nRow.createCell(0);
								nCell0.setCellValue(json.get("timeStamps").getAsString());
								JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
								for(int j = 1; j<head.length; j++){
									HSSFCell nCell = nRow.createCell(j);
									nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());						
									//nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
								}
							}
						}else{
							//新的用户ID 新建一张工作表 记录用户ID和已经遍历到的数据行数
							userId = json.get("userId").getAsString();
							num = i;
							sheet = wb.createSheet(userId);
							sheet.setDefaultColumnWidth(17);
							//添加表头
							nRow = sheet.createRow(0);
							for (int k = 0; k<head.length;k++) {
								HSSFCell nCell = nRow.createCell(k);
								nCell.setCellValue(head[k]);
							}

							if (i+1-num < 65535){
								nRow = sheet.createRow(i+1-num);
								if (i+1-num == 1) {
//									nineCell = nRow.createCell(8);
//									nineCell.setCellValue("<5");
//									tenCell = nRow.createCell(9);
//									tenCell.setCellValue("<2");
								}
								HSSFCell nCell0 = nRow.createCell(0);
								nCell0.setCellValue(json.get("timeStamps").getAsString());
								JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
								for(int j = 1; j<head.length; j++){
									HSSFCell nCell = nRow.createCell(j);
									//nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
									nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());
								}
							}
						}
					}
				}
			}
		}else{
			//
			sheet = wb.createSheet();
			HSSFRow nRow = sheet.createRow(0);
			HSSFCell nCell = nRow.createCell(0);
			nCell.setCellValue("所查询会议无相关数据！");
		}

		// 7.生成excel文件
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 生成流对象
		wb.write(byteArrayOutputStream); // 将excel写入流

		//SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

		//String fileName = sf.format(Calendar.getInstance().getTime());
		String fileName = time.split(" ")[0] + "_"+ time.split(" ")[1];
		
		// 工具类，封装弹出下载框：
		String outFile = fileName + ".xls";
		DownloadBaseAction down = new DownloadBaseAction();
		HttpServletResponse response = ServletActionContext.getResponse();
		down.download(byteArrayOutputStream, response, outFile);
		wb = null;
		byteArrayOutputStream.close();
		logger.info("退出exportExcel");
	}
	
	/**
	 * 会议信息详细表 供黄锐使用
	 * @param jsonObject
	 * @param time
	 * @throws IOException
	 */
	public void mulMeetingExportExcel(JsonObject jsonObject,String time) throws IOException {
		logger.info("进入exportExcel");
		/*
		 * 操作步骤： 1、创建工作簿对象workbook 2、创建工作表对象sheet 3、创建行对象 row 4、创建单元格对象，赋列值
		 * 5、写入内容 6、设置样式（可以没有） 7、写入文件 8、关闭文件
		 */
//		System.out.println("jsonObject:"+jsonObject.toString());
		HSSFWorkbook wb = new HSSFWorkbook(); // 新建工作簿
		HSSFSheet sheet;// 新建工作表
		String userId;
		int num = 0;
		//test
		//jsonObject.clear();
		//String testString = "{\"result\":0,\"head\":\"时间,视频原始丢包率,视频解FEC丢包率,视频最终丢包率,音频原始丢包率,音频解FEC后丢包率,音频最终丢包率\",\"items\":[{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:32:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:37\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120163\",\"timeStamps\":\"2015-08-18 10:37:47\",\"lossInfo\":[{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1},{\"data\":1}]},{\"userId\":\"50120263\",\"timeStamps\":\"2015-08-18 10:45:43\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]},{\"userId\":\"50120180\",\"timeStamps\":\"2015-08-18 10:45:49\",\"lossInfo\":[{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0},{\"data\":0}]}]}";
		//JSONObject jsonObject = JSONObject.fromObject(testString);
		String result = jsonObject.get("result").getAsInt() + "";
		String[] head = jsonObject.get("head").getAsString().split(",");
		if("0".equals(result)){
			JsonArray array = jsonObject.getAsJsonArray("items");
			if(array.isJsonArray()){
				if(array.size()>0){
					//创建第一张表
					userId = array.get(0).getAsJsonObject().get("userId").getAsString();
					sheet = wb.createSheet(userId);
					sheet.setDefaultColumnWidth(17);
					//添加表头
					HSSFRow nRow = sheet.createRow(0);
					for (int i = 0; i<head.length;i++) {
						HSSFCell nCell = nRow.createCell(i);
						nCell.setCellValue(head[i]);
					}
//					HSSFCell nineCell = nRow.createCell(8);
//					nineCell.setCellValue("视频最终丢包率");
//					HSSFCell tenCell = nRow.createCell(9);
//					tenCell.setCellValue("音频最终丢包率");
					//添加数据
					for(int i = 0; i<array.size();i++){
						JsonObject json = array.get(i).getAsJsonObject();
						if(userId.equals(json.get("userId").getAsString())){
							//用户ID相同
							nRow = sheet.createRow(i+1-num);
//							if (i+1-num == 1) {
//								nineCell = nRow.createCell(8);
//								nineCell.setCellValue("<5");
//								tenCell = nRow.createCell(9);
//								tenCell.setCellValue("<2");
//							}
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.get("timeStamps").getAsString());
							JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());						
								//nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
							}
						}else{
							//新的用户ID 新建一张工作表 记录用户ID和已经遍历到的数据行数
							userId = json.get("userId").getAsString();
							num = i;
							sheet = wb.createSheet(userId);
							sheet.setDefaultColumnWidth(17);
							//添加表头
							nRow = sheet.createRow(0);
							for (int k = 0; k<head.length;k++) {
								HSSFCell nCell = nRow.createCell(k);
								nCell.setCellValue(head[k]);
							}
//							nineCell = nRow.createCell(8);
//							nineCell.setCellValue("视频最终丢包率");
//							tenCell = nRow.createCell(9);
//							tenCell.setCellValue("音频最终丢包率");
							
							nRow = sheet.createRow(i+1-num);
							if (i+1-num == 1) {
//								nineCell = nRow.createCell(8);
//								nineCell.setCellValue("<5");
//								tenCell = nRow.createCell(9);
//								tenCell.setCellValue("<2");
							}
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.get("timeStamps").getAsString());
							JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								//nCell.setCellValue(dataArray.getJSONObject(j-1).getDouble("data"));
								nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());
							}
						}
					}
				}
			}
		}else{
			//
			sheet = wb.createSheet();
			HSSFRow nRow = sheet.createRow(0);
			HSSFCell nCell = nRow.createCell(0);
			nCell.setCellValue("所查询会议无相关数据！");
		}

		// 7.生成excel文件
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 生成流对象
		wb.write(byteArrayOutputStream); // 将excel写入流

		//SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

		//String fileName = sf.format(Calendar.getInstance().getTime());
		String fileName = time.split(" ")[0] + "_"+ time.split(" ")[1];
		
		// 工具类，封装弹出下载框：
		String outFile = fileName + ".xls";
		DownloadBaseAction down = new DownloadBaseAction();
		HttpServletResponse response = ServletActionContext.getResponse();
		down.download(byteArrayOutputStream, response, outFile);
		
		logger.info("退出exportExcel");
	}
	
	public void exportExcelForMarket(JsonObject jsonObject,String time) throws IOException {
		logger.info("进入exportExcelForMarket");
		/*
		 * 操作步骤： 1、创建工作簿对象workbook 2、创建工作表对象sheet 3、创建行对象 row 4、创建单元格对象，赋列值
		 * 5、写入内容 6、设置样式（可以没有） 7、写入文件 8、关闭文件
		 */
		HSSFWorkbook wb = new HSSFWorkbook(); // 新建工作簿
		HSSFSheet sheet;// 新建工作表
		String userId;
		int num = 0;
		String result = jsonObject.get("result").getAsInt() + "";
		String[] head = jsonObject.get("head").getAsString().split(",");
		if("0".equals(result)){
			JsonObject mapJsonObject = jsonObject.getAsJsonObject("meetingInfo");
			JsonArray array = jsonObject.getAsJsonArray("items");
			if(array.isJsonArray()){
				if(array.size()>0){
					//创建第一张表
					userId = array.get(0).getAsJsonObject().get("userId").getAsString();
					sheet = wb.createSheet(userId);
					sheet.setDefaultColumnWidth(17);
					//在表格第一行添加会议信息
					HSSFRow nRowMeetingInfoHead = sheet.createRow(0);
					nRowMeetingInfoHead.createCell(0).setCellValue("会议号");
					nRowMeetingInfoHead.createCell(1).setCellValue("会议开始时间");
					nRowMeetingInfoHead.createCell(2).setCellValue("会议结束时间");
					nRowMeetingInfoHead.createCell(3).setCellValue("会议人数");
					nRowMeetingInfoHead.createCell(4).setCellValue("参会人员列表");
					HSSFRow nRowMeetingInfo = sheet.createRow(1);
					String meetingId = userId.split("_")[1];
					JsonObject meetingInfo = mapJsonObject.getAsJsonObject(meetingId);
					nRowMeetingInfo.createCell(0).setCellValue(meetingId);
					nRowMeetingInfo.createCell(1).setCellValue(meetingInfo.getAsJsonObject().get("startTime").getAsString());
					nRowMeetingInfo.createCell(2).setCellValue(meetingInfo.getAsJsonObject().get("endTime").getAsString());
					nRowMeetingInfo.createCell(3).setCellValue(meetingInfo.getAsJsonObject().get("userCount").getAsString());
					JsonArray userListJsonArray = meetingInfo.getAsJsonObject().get("userList").getAsJsonArray();
					String userIdList = "";
					for(int i = 0;i < userListJsonArray.size();i++){
						userIdList += userListJsonArray.get(i).getAsString()+"/";
					}
					nRowMeetingInfo.createCell(4).setCellValue(userIdList);
					//userListJsonArray.get
					//nRowMeetingInfo.createCell(4).setCellValue();
					//添加表头
					//HSSFRow nRow = sheet.createRow(0);
					HSSFRow nRow = sheet.createRow(2);
					for (int i = 0; i<head.length;i++) {
						HSSFCell nCell = nRow.createCell(i);
						nCell.setCellValue(head[i]);
					}
					//添加数据
					for(int i = 0; i<array.size();i++){
						JsonObject json = array.get(i).getAsJsonObject();
						if(userId.equals(json.get("userId").getAsString())){
							//zhanghy 01-19 由于前两行添加会议信息，所以往下移两行
							//nRow = sheet.createRow(i+1-num);
							nRow = sheet.createRow(i+3-num);
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.get("timeStamps").getAsString());
							JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());						
							}
						}else{
							//新的用户ID 新建一张工作表 记录用户ID和已经遍历到的数据行数
							userId = json.get("userId").getAsString();
							num = i;
							sheet = wb.createSheet(userId);
							sheet.setDefaultColumnWidth(17);
							//在表格第一行添加会议信息
							nRowMeetingInfoHead = sheet.createRow(0);
							nRowMeetingInfoHead.createCell(0).setCellValue("会议号");
							nRowMeetingInfoHead.createCell(1).setCellValue("会议开始时间");
							nRowMeetingInfoHead.createCell(2).setCellValue("会议结束时间");
							nRowMeetingInfoHead.createCell(3).setCellValue("会议人数");
							nRowMeetingInfoHead.createCell(4).setCellValue("参会人员列表");
							nRowMeetingInfo = sheet.createRow(1);
							meetingId = userId.split("_")[1];
							meetingInfo = mapJsonObject.getAsJsonObject(meetingId);
							nRowMeetingInfo.createCell(0).setCellValue(meetingId);
							nRowMeetingInfo.createCell(1).setCellValue(meetingInfo.getAsJsonObject().get("startTime").getAsString());
							nRowMeetingInfo.createCell(2).setCellValue(meetingInfo.getAsJsonObject().get("endTime").getAsString());
							nRowMeetingInfo.createCell(3).setCellValue(meetingInfo.getAsJsonObject().get("userCount").getAsString());
							userListJsonArray = meetingInfo.getAsJsonObject().get("userList").getAsJsonArray();
							userIdList = "";
							for(int i1 = 0;i1 < userListJsonArray.size();i1++){
								userIdList += userListJsonArray.get(i1).getAsString()+"/";
							}
							nRowMeetingInfo.createCell(4).setCellValue(userIdList);
							//添加表头
							nRow = sheet.createRow(2);
							for (int k = 0; k<head.length;k++) {
								HSSFCell nCell = nRow.createCell(k);
								nCell.setCellValue(head[k]);
							}							
							nRow = sheet.createRow(i+3-num);
							if (i+1-num == 1) {
							}
							HSSFCell nCell0 = nRow.createCell(0);
							nCell0.setCellValue(json.get("timeStamps").getAsString());
							JsonArray dataArray = json.get("lossInfo").getAsJsonArray();
							for(int j = 1; j<head.length; j++){
								HSSFCell nCell = nRow.createCell(j);
								nCell.setCellValue(dataArray.get(j-1).getAsJsonObject().get("data").getAsString());
							}
						}
					}
				}
			}
		}else{
			//
			sheet = wb.createSheet();
			HSSFRow nRow = sheet.createRow(0);
			HSSFCell nCell = nRow.createCell(0);
			nCell.setCellValue("所查询会议无相关数据！");
		}

		// 7.生成excel文件
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(); // 生成流对象
		wb.write(byteArrayOutputStream); // 将excel写入流

		//SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmssSSS");

		//String fileName = sf.format(Calendar.getInstance().getTime());
		String fileName = time.split(" ")[0] + "_"+ time.split(" ")[1];
		
		// 工具类，封装弹出下载框：
		String outFile = fileName + ".xls";
		DownloadBaseAction down = new DownloadBaseAction();
		HttpServletResponse response = ServletActionContext.getResponse();
		down.download(byteArrayOutputStream, response, outFile);
		
		byteArrayOutputStream.close();
		logger.info("退出exportExcelForMarket");
	}
}
