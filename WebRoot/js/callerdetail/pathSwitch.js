/*通话详情callDetail.jsp页面中“道路切换”标签页面的JS效果 */
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#pathSwitch01 > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.pathSwitch_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.pathSwitch_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
					
				
					
		});

/**
 * “道路切换”标签页，主叫端数据
 * @param {} datas
 */
function pathSwitchView_zb(datas){
	var result = datas.result;
	
	/**
	 *旧路信息 
	 */
	var old_main_cid = "";//主路ID
	var old_main_rating = "";//主路打分
	var old_back_cid = "";//备路ID
	var old_back_rating = "";//备路打分
	
	/**
	 * 新路信息
	 */
	var new_main_cid = "";//主路ID
	var new_main_rating = "";//主路打分
	var new_back_cid = "";//备路ID
	var new_back_rating = "";//备路打分
	
	var count;//切换序号，第几次切换
	 
	var time = "";//切换时间

	var html = "";
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var caller = data.caller;
			if(caller!=undefined&&caller!=null&&caller!==""){
				var call = caller.call;
				if(call!=undefined&&call!=null&&call!==""){
					var pathswitch = call.pathswitch;
					if(pathswitch!=undefined&&pathswitch!=null&&pathswitch!==""&&pathswitch.length>0){
					html+="<table class='tablesorter' id='pathSwitchSortTable_zb'>" +
							"<thead>" +
							"<tr><th>切换序号</th><td>旧路信息</td><td>新路信息</td><td>切换时间</td></tr>" +
							"</thead>";
						
						var length1 = pathswitch.length;//取得数组长度
						for(var i=0;i<length1;i++){
							var map = new Map();//实例化map对象
							var switchinfo = pathswitch[i].switchinfo;
							var switchinfoArr = switchinfo.split(' ');
							for(var j=0;j<switchinfoArr.length;j++){
								map.put(switchinfoArr[j].split('=')[0],switchinfoArr[j].split('=')[1]);
							}
							map.put('switchtime',pathswitch[i].switchtime);
							
							/**
							 * 旧路信息
							 */
							old_main_cid = map.get('old_main_cid');//主路ID
							old_main_rating = map.get('old_main_rating');//主路打分
							old_back_cid = map.get('old_back_cid');//备路ID
							old_back_rating =map.get('old_back_rating');//备路打分
							
							//空值校验
							if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
								old_main_cid = "--";
							}
							if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
								old_main_rating = "--";
							}
							if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
								old_back_cid = "--";
							}
							if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
								old_back_rating = "--";
							}
							
							/**
							 * 新路信息
							 */
						 	new_main_cid = map.get('new_main_cid');//主路ID
							new_main_rating = map.get('new_main_rating');//主路打分
							new_back_cid = map.get('new_back_cid');//备路ID
							new_back_rating = map.get('new_back_rating');//备路打分
							
							//空值校验
							if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
								new_main_cid = "--";
							}
							if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
								new_main_rating = "--";
							}
							if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
								new_back_cid = "--";
							}
							if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
								new_back_rating = "--";
							}
							 
							count = map.get("count");//切换序号，即第几次切换
							time = map.get('switchtime');//切换时间
							
							if(count==undefined||count==null||count===""){
								count = "--";
							}
							if(time==undefined||time==null||time===""){
								time = "--";
							}
							
							html+="<tr>" +
							"<td>"+count+"</td>" +
							"<td>" +
							"主路ID："+old_main_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"主路打分："+old_main_rating+"<br/>"+
							"备路ID："+old_back_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"备路打分："+old_back_rating+
							"</td>" +
							"<td>" +
							"主路ID："+new_main_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"主路打分："+new_main_rating+"<br/>"+
							"备路ID："+new_back_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"备路打分："+new_back_rating+
							"</td>" +
							"<td>"+time+"</td>" +
							"</tr>";
						}
						html+= "</table>";
					}
				}
			}
		}
	}
	$('#pathSwitch_zb').html("注：-- 代表未获取到数据");
	$('#pathSwitch_zb').append(html);
	//将道路切换按序号排序
	$("#pathSwitchSortTable_zb").tablesorter();	
}

/**
 * “道路切换”标签页，被叫端数据
 * @param {} datas
 */
function pathSwitchView_bz(datas){
	var result = datas.result;

	/**
	 *旧路信息 
	 */
	var old_main_cid = "";//主路ID
	var old_main_rating = "";//主路打分
	var old_back_cid = "";//备路ID
	var old_back_rating = "";//备路打分
	
	/**
	 * 新路信息
	 */
	var new_main_cid = "";//主路ID
	var new_main_rating = "";//主路打分
	var new_back_cid = "";//备路ID
	var new_back_rating = "";//备路打分
	
	var count;//切换序号，第几次切换
	var time = "";//切换时间
	
	var html = "";
	if(result===0){
		var data = datas.data;
		if(data!=undefined&&data!=null&&data!==""){
			var called = data.called;
		    if(called!=undefined&&called!=null&&called!==""){
		    	var call = called.call;
		    	if(call!=undefined&&call!=null&&call!==""){
		    		var pathswitch = call.pathswitch; 
		    		if(pathswitch!=undefined&&pathswitch!=null&&pathswitch!==""&&pathswitch.length>0){
					html+="<table class='tablesorter' id='pathSwitchSortTable_bz'>" +
							"<thead>" +
							"<tr><th>切换序号</th><td>旧路信息</td><td>新路信息</td><td>切换时间</td></tr>" +
							"</thead>";
		    			
		    			
						var length1 = pathswitch.length;//取得数组长度
						for(var i=0;i<length1;i++){
							var map = new Map();//实例化map对象
							var switchinfo = pathswitch[i].switchinfo;
							var switchinfoArr = switchinfo.split(' ');
							for(var j=0;j<switchinfoArr.length;j++){
								map.put(switchinfoArr[j].split('=')[0],switchinfoArr[j].split('=')[1]);
							}
							map.put('switchtime',pathswitch[i].switchtime);
							
							/**
							 * 旧路信息
							 */
							old_main_cid = map.get('old_main_cid');//主路ID
							old_main_rating = map.get('old_main_rating');//主路打分
							old_back_cid = map.get('old_back_cid');//备路ID
							old_back_rating =map.get('old_back_rating');//备路打分
							
							//空值校验
							if(old_main_cid==undefined||old_main_cid==null||old_main_cid===""){
								old_main_cid = "--";
							}
							if(old_main_rating==undefined||old_main_rating==null||old_main_rating===""){
								old_main_rating = "--";
							}
							if(old_back_cid==undefined||old_back_cid==null||old_back_cid===""){
								old_back_cid = "--";
							}
							if(old_back_rating==undefined||old_back_rating==null||old_back_rating===""){
								old_back_rating = "--";
							}
							
							/**
							 * 新路信息
							 */
						 	new_main_cid = map.get('new_main_cid');//主路ID
							new_main_rating = map.get('new_main_rating');//主路打分
							new_back_cid = map.get('new_back_cid');//备路ID
							new_back_rating = map.get('new_back_rating');//备路打分
							
							//空值校验
							if(new_main_cid==undefined||new_main_cid==null||new_main_cid===""){
								new_main_cid = "--";
							}
							if(new_main_rating==undefined||new_main_rating==null||new_main_rating===""){
								new_main_rating = "--";
							}
							if(new_back_cid==undefined||new_back_cid==null||new_back_cid===""){
								new_back_cid = "无--";
							}
							if(new_back_rating==undefined||new_back_rating==null||new_back_rating===""){
								new_back_rating = "--";
							}
							 
							count = map.get("count");//切换序号，第几次切换
							time = map.get('switchtime');//切换时间
							
							if(count==undefined||count==null||count===""){
								count = "--";
							}
							if(time==undefined||time==null||time===""){
								time = "--";
							}
							
							html+="<tr>" +
							"<td>"+count+"</td>" +
							"<td>" +
							"主路ID："+old_main_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"主路打分："+old_main_rating+"<br/>"+
							"备路ID："+old_back_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"备路打分："+old_back_rating+
							"</td>" +
							"<td>" +
							"主路ID："+new_main_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"主路打分："+new_main_rating+"<br/>"+
							"备路ID："+new_back_cid+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
							"备路打分："+new_back_rating+
							"</td>" +
							"<td>"+time+"</td>" +
							"</tr>";
						}
						html+= "</table>";
					}
		    	}
		    }
		}
	}
	$('#pathSwitch_bz').html("注：-- 代表未获取到数据");
	$('#pathSwitch_bz').append(html);
	//将道路切换按序号排序
	$("#pathSwitchSortTable_bz").tablesorter();	
}