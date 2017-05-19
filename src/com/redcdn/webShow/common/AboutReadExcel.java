package com.redcdn.webShow.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;

public class AboutReadExcel {
	public static Map<String,String> aboutReadExcelFile(String fileName){
		Map<String,String> market_user_map = new HashMap<String, String>();
		try {
				market_user_map.clear();
				//把一张xls的数据表读到wb里
				String path = AboutReadExcel.class.getClassLoader().getResource(fileName).getPath().toString();
				//String path = SearchAction.class.getClassLoader().getResource("").getPath().toString();
				path = URLDecoder.decode(path,"utf-8");
				System.out.println(path);
				HSSFWorkbook  wb = new HSSFWorkbook(new FileInputStream(new File(path)));
				//HSSFWorkbook  wb = new HSSFWorkbook(new FileInputStream(new File("D:\\user.xls")));
				//File file = new File("D:\\User.xlsx");
				//InputStream fileStream = new FileInputStream(file);
				//XSSFWorkbook wb = new XSSFWorkbook(fileStream);
				//读取第一页,一般一个excel文件会有三个工作表，这里获取第一个工作表来进行操作  
				for(int i = 0; i < wb.getNumberOfSheets();i++){
					//System.out.println(i);
					HSSFSheet sheet = wb.getSheetAt(i);
					//循环遍历表sheet.getLastRowNum()是获取一个表最后一条记录的记录号，	
					//如果总共有3条记录，那获取到的最后记录号就为2，因为是从0开始的
					//第一行是表头，不读取，从第二行开始(j = 1)
					for(int j=1;j<sheet.getLastRowNum()+1;j++) {
						//创建一个行对象
						HSSFRow row = sheet.getRow(j);
						//把一行里的每一个字段遍历出来
						row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
						HSSFCell cell_userid = row.getCell(0);
						//zhanghy 运维需求，增加一列，写上商业用户标识，然后把和商业用户所属拼接上，放到MPA的VALUE中
						HSSFCell cell_flag = row.getCell(1);
						HSSFCell cell_companyname = row.getCell(2);
						//System.out.println(cell_userid.getStringCellValue());
						//System.out.println(cell_companyname.getStringCellValue());
						market_user_map.put(cell_userid.getStringCellValue(), cell_companyname.getStringCellValue()+"|"+cell_flag.getStringCellValue());
					}
				}
				System.out.println(market_user_map);
				System.out.println("Map-Size:"+market_user_map.size());
			} catch (FileNotFoundException e) {
			e.printStackTrace();
			} catch (IOException e) {
			e.printStackTrace();
			}
		return market_user_map;
	}
}
