/* 通话详情callDetail.jsp页面中“丢包率信息”标签页面的JS效果 */

// 最外层四个子标签点击效果
$(document).ready(function() {
			// 获取控制子标签内容的div
			var tabContainers = $('#dataPackDetailContent > div');
			// 隐藏所有div，初始时显示第一个
			tabContainers.hide().filter(':first').show();

			$('.dataPackDetail_tabs li a').click(function() {
						tabContainers.hide();// 隐藏所有
						tabContainers.filter(this.hash).show();// 显示当前标签的子内容
						// 将ul下所有标签的类名移除
						$('.dataPackDetail_tabs li a').removeClass('selected');
						// 为当前点击的标签设置类名
						$(this).addClass('selected');
						return false;
					}).filter(':first').click();
		});

//全局会议号 发言者ID MICId
var gMeetingId;
var gSpeakerId;
var gMicId;
function aboutspeakerIdsubmit(speakerId,meetingId,micId,showType,currPage){
	console.info("speakerId:"+speakerId+"meetingId:"+meetingId+"micId:"+micId+"showType:"+showType+"currPage:"+currPage);
	gMeetingId = meetingId;
	gSpeakerId = speakerId;
	gMicId = micId;
	
	$.ajax({
		type : "post",
		url : "packdetail.aboutSpeakerId.action",
		//url : "search.aboutMeetingId.action",
		dataType : "json",
		data : "speakerId="+speakerId+"&meetingId="+meetingId+"&micId="+micId+"&currPage="+currPage,
		beforeSend : function() {
			$(".layer").show();
		},
		complete : function() {
			$(".layer").hide();
		},
		success : function(data) {
			showdata(data, "aboutSpeakerId",showType);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
	

	
}
/** *******************以上属于点击效果************************ */
/** *******************以下属于页面数据展示************************ */

function speakerIdTabView_dataPackDetailMic1(meetingId,list){
	var html ="";
	var speakerIdArr;
	if(list!=null&&list!=undefined!==""){
		speakerIdArr = list.split(",");
		html +="<div>"+
	              "<ul class='dataPackDetail_tabs'>";
		$.each(speakerIdArr,function(i,val){
			html+="<li><a onclick=aboutspeakerIdsubmit('"+val+"','"+meetingId+"','1','dataPackDetail_mic1','1')>"+val+"</a></li>";
		});
		html+="</ul>"+
		"</div>";
	}
	$("#dataPackDetail01_speaker_tabs").html(html);
}

function speakerIdTabView_dataPackDetailMic2(meetingId,list){
	var html ="";
	var speakerIdArr;
	if(list!=null&&list!=undefined!==""){
		speakerIdArr = list.split(",");
		html +="<div>"+
	              "<ul class='dataPackDetail_tabs'>";
		$.each(speakerIdArr,function(i,val){
			html+="<li><a onclick=aboutspeakerIdsubmit('"+val+"','"+meetingId+"','2','dataPackDetail_mic2','1')>"+val+"</a></li>";
		});
		html+="</ul>"+
		"</div>";
	}
	$("#dataPackDetail02_speaker_tabs").html(html);
}

/*function showdata_dataPackDetail_mic1(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameArr;                //帧信息数组
	var topoFrameMap = new Map();//topo路径与帧信息相关联的map,topo路径为key
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""){
				topoDescription = val.senderId + "_" + val.receiverId;
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
			}
			var flag = 1;//标志位   1标识topo路径第一次出现
			$.each(topoArr,function(j,e){
				//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
				if(topoDescription == e){
					var tempArr = topoFrameMap.get(topoDescription);
					FrameArr = val.frameInfo.split(",");
					tempArr = tempArr.concat(FrameArr);
					topoFrameMap.put(topoDescription, tempArr);
					flag = 0;
				}
			});
			//topo路径第一次出现 将该路径所对应的帧信息存入map
			if(flag == 1){
				FrameArr = val.frameInfo.split(",");
				topoFrameMap.put(topoDescription,FrameArr);
				topoArr.push(topoDescription);
			}
		});
	}	
	dataDetailThreeTabView(topoFrameMap,topoArr,func,1);
}
function showdata_dataPackDetail_mic2(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameArr;                //帧信息数组
	var topoFrameMap = new Map();//topo路径与帧信息相关联的map,topo路径为key
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			topoDescription = val.senderId + "_" + val.receiverId;
			//topoDescription = val.senderId + val.receiverId;
			var flag = 1;//标志位   1标识topo路径第一次出现
			$.each(topoArr,function(j,e){
				//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
				if(topoDescription == e){
					var tempArr = topoFrameMap.get(topoDescription);
					FrameArr = val.frameInfo.split(",");
					tempArr = tempArr.concat(FrameArr);
					topoFrameMap.put(topoDescription, tempArr);
					flag = 0;
				}
			});
			//topo路径第一次出现 将该路径所对应的帧信息存入map
			if(flag == 1){
				FrameArr = val.frameInfo.split(",");
				topoFrameMap.put(topoDescription,FrameArr);
				topoArr.push(topoDescription);
			}
		});
	}	
	dataDetailThreeTabView(topoFrameMap,topoArr,func,2);
}*/

function showdata_dataPackDetail_mic1(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameArr;                //帧信息数组
	var topoFrameMap = new Map();//topo路径与帧信息相关联的map,topo路径为key
	var senderArr = new Array();
	var senderMap = new Map();   //发送者记录的帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""&&val.receiverId!=="0"){
				topoDescription = val.senderId + "_" + val.receiverId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(topoArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempArr = topoFrameMap.get(topoDescription);
						FrameArr = val.frameInfo.split(",");
						tempArr = tempArr.concat(FrameArr);
						topoFrameMap.put(topoDescription, tempArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameArr = val.frameInfo.split(",");
					topoFrameMap.put(topoDescription,FrameArr);
					topoArr.push(topoDescription);
				}
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(senderArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempArr = senderMap.get(topoDescription);
						FrameArr = val.frameInfo.split(",");
						tempArr = tempArr.concat(FrameArr);
						senderMap.put(topoDescription, tempArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameArr = val.frameInfo.split(",");
					senderMap.put(topoDescription,FrameArr);
					senderArr.push(topoDescription);
				}
			}
		});
	}	
	dataDetailThreeTabView(topoFrameMap,topoArr,senderMap,func,1);
}


function testshowdata_dataPackDetail_mic1(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameVideoArr;           //视频帧信息数组
	var FrameAudioArr;           //音频帧信息数组
	var topoVideoFrameMap = new Map();//topo路径与视频帧信息相关联的map,topo路径为key
	var topoAudioFrameMap = new Map();//topo路径与音频帧信息相关联的map,topo路径为key
	var senderArr = new Array(); //发送者队列
	var senderVideoMap = new Map();//发送者记录的视频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var senderAudioMap = new Map();//发送者记录的音频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""&&val.receiverId!=="0"){
				topoDescription = val.senderId + "_" + val.receiverId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(topoArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = topoVideoFrameMap.get(topoDescription);
						var tempAudioArr = topoAudioFrameMap.get(topoDescription);
						FrameVideoArr = val.frameVideoInfo.split(",");
						FrameAudioArr = val.frameAudioInfo.split(",");
						tempVideoArr = tempVideoArr.concat(FrameVideoArr);
						topoVideoFrameMap.put(topoDescription, tempVideoArr);
						tempAudioArr = tempAudioArr.concat(FrameAudioArr);
						topoAudioFrameMap.put(topoDescription, tempAudioArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameVideoArr = val.frameVideoInfo.split(",");
					FrameAudioArr = val.frameAudioInfo.split(",");
					topoVideoFrameMap.put(topoDescription, tempVideoArr);
					topoAudioFrameMap.put(topoDescription, tempAudioArr);
					topoArr.push(topoDescription);
				}
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(senderArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = senderVideoMap.get(topoDescription);
						var tempAudioArr = senderAudioMap.get(topoDescription);
						//var tempArr = senderMap.get(topoDescription);
						FrameVideoArr = val.frameVideoInfo.split(",");
						FrameAudioArr = val.frameAudioInfo.split(",");
						tempVideoArr = tempVideoArr.concat(FrameVideoArr);
						tempAudioArr = tempAudioArr.concat(tempAudioArr);
						senderVideoMap.put(topoDescription, tempVideoArr);
						senderAudioMap.put(topoDescription,tempAudioArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameVideoArr = val.frameVideoInfo.split(",");
					FrameAudioArr = val.frameAudioInfo.split(",");
					senderVideoMap.put(topoDescription, FrameVideoArr);
					senderAudioMap.put(topoDescription, FrameAudioArr);
					senderArr.push(topoDescription);
				}
			}
		});
	}
	dataDetailThreeTabView(topoVideoFrameMap,topoAudioFrameMap,topoArr,senderVideoMap,senderAudioMap,func,1);
}


function dataDetailThreeTabView(topoVideMap,topoAudioMap,topoArr,senderVideoMap,senderAudioMap,fun,micid){
	
}

function showdata_dataPackDetail_mic2(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameArr;                //帧信息数组
	var topoFrameMap = new Map();//topo路径与帧信息相关联的map,topo路径为key
	var senderArr = new Array();
	var senderMap = new Map();
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""){
				topoDescription = val.senderId + "_" + val.receiverId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(topoArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempArr = topoFrameMap.get(topoDescription);
						FrameArr = val.frameInfo.split(",");
						tempArr = tempArr.concat(FrameArr);
						topoFrameMap.put(topoDescription, tempArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameArr = val.frameInfo.split(",");
					topoFrameMap.put(topoDescription,FrameArr);
					topoArr.push(topoDescription);
				}
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(senderArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempArr = senderMap.get(topoDescription);
						FrameArr = val.frameInfo.split(",");
						tempArr = tempArr.concat(FrameArr);
						senderMap.put(topoDescription, tempArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameArr = val.frameInfo.split(",");
					senderMap.put(topoDescription,FrameArr);
					senderArr.push(topoDescription);
				}
			}
		});
	}	
	dataDetailThreeTabView(topoFrameMap,topoArr,senderMap,func,2);
}

/**
 * 
 * @param map1 	topo路径与帧信息相关联的map,topo路径为key
 * @param array topo路径数组，用于存放每条路径，相同路径只存一次
 * @param map2	发送者记录的帧信息，发送者ID与帧信息相关联的map,发言者ID为key
 * @param func
 * @param micId
 */
function dataDetailThreeTabView(map1,array,map2,func,micId){
	
	var html ="";
	$("#dataPackDetail01_topo_tabs").html(html);
	$("#dataPackDetail02_topo_tabs").html(html);
	$("#dataPackDetail01_view_div").html(html);
	$("#dataPackDetail02_view_div").html(html);
	//array不为空 即有topo路径
	if(array!=null&&array!=undefined&&array.length!=0){
		html = "<ul class='dataPackDetail_tabs3'>";
		var html1 ="";
		$.each(array,function(i,val){
			//var topoInfo = recognizeForShow(val);
			var valArr = val.split("_");
			var topoInfoForJS = unrecognizeFormat(valArr[0])+unrecognizeFormat(valArr[1]);
			html +="<li><a href='#"+topoInfoForJS+"'>"+val+"</a></li>";
			var topoFrameArr = map1.get(val);
			var senderArr = map2.get(valArr[0]);
			if(topoFrameArr!=null&&topoFrameArr!=undefined){
				//html1 =threeTabViewContent(val,topoFrameArr,senderArr,html1,topoInfo);
			    html1 = threeTabViewContent(topoInfoForJS,topoFrameArr,senderArr,html1,val);
			}
		});
		if(micId == 1){
			$("#dataPackDetail01_view_div").html(html1);
		}
		if(micId == 2){
			$("#dataPackDetail02_view_div").html(html1);
		}
		html +="</ul>";
		console.info("BBBBhtml:"+html);
	}
	if(micId == 1){
		$("#dataPackDetail01_topo_tabs").html(html);
	}
	if(micId == 2){
		$("#dataPackDetail02_topo_tabs").html(html);
	
	}
	threecssMic1();
	threecssMic2();
	sortables_init();
}


/**
 * topoInfoForJS 标签对应的id(js能够处理的)
 * array1 接收者的帧信息队列
 * array2 发送者的帧信息队列
 * html   列表页面
 * val    标签对应的ID(页面显示的)
 */
/*function threeTabViewContent(topoInfoForJS,array1,array2,html,val){
	html += "<div id='"+topoInfoForJS+"'>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
	"</tr>";
	var indexId = 0;
	if(array2!=null&&array2!=undefined&&array2.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(array2[0].split("_")[0]);
		var lastTime;
		$.each(array2,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					for(var m=1;m<=Number(list[0]);m++){
						indexId++;
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list1\">" +
						"<th scope=\"row\">" + indexId +"</th>" +
						//帧Id
						"<td title='"+ frameId + "'>" + frameId +"</td>" +
						//记录时间戳
						"<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
					}
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					for(var m=1;m<Number(list[0])-lastId;m++){
						indexId++;
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list1\">" +
						"<th scope=\"row\">" + indexId +"</th>" +
						//帧Id
						"<td title='"+ frameId + "'>" + frameId +"</td>" +
						//记录时间戳
						"<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
					}			
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
	}
	if(array1.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(array1[0].split("_")[0]);
		var lastTime;
		var index1 =0;
		$.each(array1,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环
			if(lastId == 65535){
				if(list[0]==="0"){
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					for(var m=1;m<=Number(list[0]);m++){
						index1++;
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index1+indexId) +"</th>" +
						//帧Id
						"<td title='"+ frameId + "'>" + frameId +"</td>" +
						//记录时间戳
						"<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
					}
					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					for(var m=1;m<Number(list[0])-lastId;m++){
						index1++;
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index1+indexId) +"</th>" +
						//帧Id
						"<td title='"+ frameId + "'>" + frameId +"</td>" +
						//记录时间戳
						"<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
					}
					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				else{
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
			
			
		});
	}
	html += "</table>";
	html += "<div>";
	var count;
	if(array2!=null&&array2!=undefined){
		count = indexId + index1;
	}
	else{
		count = index1;
	}
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}				
	html += "</div></div>";

	return html;
}*/

function threeTabViewContent(topoInfoForJS,array1,array2,html,val){
	html += "<div id='"+topoInfoForJS+"'>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
	"</tr>";
	var indexId = 0;
	if(array2!=null&&array2!=undefined&&array2.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(array2[0].split("_")[0]);
		var lastTime;
		$.each(array2,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					for(var m=1;m<Number(list[0])-lastId;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					}	
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
	}
	if(array1.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(array1[0].split("_")[0]);
		var lastTime;
		var index1 =0;
		$.each(array1,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环
			if(lastId == 65535){
				if(list[0]==="0"){
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					index1++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" ;
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";

					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					var frameStartId = lastId+1;
					for(var m=1;m<Number(list[0])-lastId;m++){	
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
						index1++;
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index1+indexId) +"</th>";
						//帧Id
						if(frameStartId!=frameId){
							html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
						}else if(frameStartId == frameId){
							html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
						}
						//记录时间戳
						html +="<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
				
					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				else{
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
			
			
		});
	}
	html += "</table>";
	html += "<div>";
	var count;
	if(array2!=null&&array2!=undefined){
		count = indexId + index1;
	}
	else{
		count = index1;
	}
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}				
	html += "</div></div>";

	return html;
}

/**
 * 控制topo标签
 * 点击topo标签显示该TOPO内容
 * 默认显示第一个标签的内容 其余隐藏
 * 
 */ 
function threecssMic1() {
	// 获取控制子标签内容的div
	var tabContainers = $('#dataPackDetail01_view_div > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.dataPackDetail_tabs3 li a').click(function() {
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.dataPackDetail_tabs3 li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
}

function  threecssMic2() {
	// 获取控制子标签内容的div
	var tabContainers = $('#dataPackDetail02_view_div > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.dataPackDetail_tabs3 li a').click(function() {
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.dataPackDetail_tabs3 li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
}



function openPackageDialog(meetingId,speakerId,micId,timeStamp,topoInfo,frameId,framePiece,realPiece) {
	console.info(frameId+framePiece+realPiece);
    window.open("packageDetail.jsp?meetingId="+meetingId+"&speakerId="+speakerId+"&micId="+micId+"&timeStamp="+timeStamp+"&topoInfo="+topoInfo+"&frameId="+frameId+"&framePiece="+framePiece+"&realPiece="+realPiece);
	jQuery(this).target = "_blank";
}

/**
 * 
 * @param topoInfoForJS
 * @param array1
 * @param array2
 * @param html
 * @param val
 * @param currPage  当前页码
 * @param pageSize  分页条目
 */
/*function testthreeTabViewContent(topoInfoForJS,array1,array2,html,val,currPage,pageSize){
	html += "<div id='"+topoInfoForJS+"'>";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
	"</tr>";
	//列表中先写接收者信息
	if(array2!=null&&array2!=undefined){
		if(array2.length - (4*(currPage-1)*pageSize/5) < 4*pageSize/5){
			//全部显示
		}else{
			//分页显示
			for(var i = 4*(currPage-1)*pageSize/5;i < 4*currPage*pageSize/5;i++){
				
			}
		}
	}
	if(array1!=null&&array1!=undefined){
		if(array1.length - (currPage-1)*pageSize<pageSize/5){
			//全部显示
		}else{
			for(var i = (currPage-1)*pageSize/5;i < currPage*pageSize/5;i++){
				//分页显示
			}
		}
	}
	html += "</table>";
	var page ="";
	var flag;
	if(array2!=null&&array2!=undefined){
		flag = (array2.length - 4*(currPage-1)*pageSize/5) < (4*pageSize/5)&& (array1.length - (currPage-1)*pageSize < (pageSize/5));
	}
	if(flag){
		if(currPage != 1){
			pages += "<a onclick="+testthreeTabViewContent+"(topoInfoForJS,array1,array2,html,val,1,pageSize)>首页</a>";
			
			pages += "&nbsp;<a onclick=" + func + "("
					+ (currPage - 1) + ")>上一页</a>";
			pages += "&nbsp;尾页";
		}else{
			pages += "共1页";
		}
	}
	html += "<div>";
	var count;
	if(array2!=null&&array2!=undefined){
		count = indexId + index1;
	}
	else{
		count = index1;
	}
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}				
	html += "</div></div>";

	return html;
	
	
	html += "</table>";
	var pages = "";
	
	//用的是真分页，每次查询出多少条就显示多少条，显示的条数与pageSize不一样相等。
	//只要存在的数据够多，一定是length>=pageSize，只有最后一页会出现length<=pageSize的现象
	//所以当length==pageSize时，无法判断是不是到了尾页，但是如果length<pageSize，一定是到了尾页		
	//只要能执行到这里，length肯定大于0
	var flag = length < pageSize;
	
	if(flag) {//此时查出的数据条数>=0，<pageSize
		if (currPage != 1) {//处于最后一页
			pages += "<a onclick=" + func + "(1)>首页</a>";
			
			pages += "&nbsp;<a onclick=" + func + "("
					+ (currPage - 1) + ")>上一页</a>";
			pages += "&nbsp;尾页";
		}else{
			pages += "共1页";
		}
	}else{
		if (currPage != 1) {
			if(end==1){
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage - 1) + ")>上一页</a>";
				pages += "&nbsp;尾页";
				//将标志重置 
				end = 0;
			}else{
				pages += "<a onclick=" + func + "(1)>首页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage - 1) + ")>上一页</a>";
				
				pages += "&nbsp;<a onclick=" + func + "("
						+ (currPage + 1) + ")>下一页</a>";
			}
					
			//pages += "&nbsp;<a onclick=" + func + "(" + flag + ")>尾页</a>";
		} else {
			pages += "&nbsp;<a onclick=" + func + "("
					+ (currPage + 1) + ")>下一页</a>";
					
			//pages += "&nbsp;<a onclick=" + func + "(" + flag + ")>尾页</a>";
		}
	}

	html += "<div>&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
			+ currPage + "页";
	
	count = data.count;
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}		
			
	html += "</div>";
	
	$("#"+mainid).html(html);
}*/
function testshowdata_dataPackDetail_mic1(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameVideoArr;           //视频帧信息数组
	var FrameAudioArr;           //音频帧信息数组
	var topoVideoFrameMap = new Map();//topo路径与视频帧信息相关联的map,topo路径为key
	var topoAudioFrameMap = new Map();//topo路径与音频帧信息相关联的map,topo路径为key
	var senderArr = new Array(); //发送者队列
	var senderVideoMap = new Map();//发送者记录的视频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var senderAudioMap = new Map();//发送者记录的音频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var topoDescription;         //topo路径描述
	var frameVideoInfo;
	var frameAudioInfo;
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""&&val.receiverId!=="0"){
				topoDescription = val.senderId + "_" + val.receiverId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(topoArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = topoVideoFrameMap.get(topoDescription);
						var tempAudioArr = topoAudioFrameMap.get(topoDescription);
						if(val.frameVideoInfo!=null&&val.frameVideoInfo!=undefined&&val.frameVideoInfo!==""){
							FrameVideoArr = val.frameVideoInfo.split(",");
							tempVideoArr = tempVideoArr.concat(FrameVideoArr);
							topoVideoFrameMap.put(topoDescription, tempVideoArr);
							flag = 0;
						}
						if(val.frameAudioInfo!=null&&val.frameAudioInfo!=undefined&&val.frameAudioInfo!==""){
							FrameAudioArr = val.frameAudioInfo.split(",");
							tempAudioArr = tempAudioArr.concat(FrameAudioArr);
							topoAudioFrameMap.put(topoDescription, tempAudioArr);
							flag = 0;
						}
						
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					if(val.frameVideoInfo!=null&&val.frameVideoInfo!=undefined&&val.frameVideoInfo!==""){
						FrameVideoArr = val.frameVideoInfo.split(",");
						topoVideoFrameMap.put(topoDescription, FrameVideoArr);
					}
					if(val.frameAudioInfo!=null&&val.frameAudioInfo!=undefined&&val.frameAudioInfo!==""){
						FrameAudioArr = val.frameAudioInfo.split(",");
						topoAudioFrameMap.put(topoDescription, FrameAudioArr);
						
					}
					topoArr.push(topoDescription);
				}
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(senderArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = senderVideoMap.get(topoDescription);
						var tempAudioArr = senderAudioMap.get(topoDescription);
						//var tempArr = senderMap.get(topoDescription);
						if(val.frameVideoInfo!=null&&val.frameVideoInfo!=undefined&&val.frameVideoInfo!==""&&val.frameAudioInfo!=null&&val.frameAudioInfo!=undefined&&val.frameAudioInfo!==""){
							FrameVideoArr = val.frameVideoInfo.split(",");
							FrameAudioArr = val.frameAudioInfo.split(",");
							tempVideoArr = tempVideoArr.concat(FrameVideoArr);
							tempAudioArr = tempAudioArr.concat(tempAudioArr);
							senderVideoMap.put(topoDescription, tempVideoArr);
							senderAudioMap.put(topoDescription,tempAudioArr);
							flag = 0;
						}
						
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					if(val.frameVideoInfo!=null&&val.frameVideoInfo!=undefined&&val.frameVideoInfo!==""&&val.frameAudioInfo!=null&&val.frameAudioInfo!=undefined&&val.frameAudioInfo!==""){
						FrameVideoArr = val.frameVideoInfo.split(",");
						FrameAudioArr = val.frameAudioInfo.split(",");
						senderVideoMap.put(topoDescription, FrameVideoArr);
						senderAudioMap.put(topoDescription, FrameAudioArr);
						senderArr.push(topoDescription);
					}
				}
			}
		});
	}
	testdataDetailThreeTabView(topoVideoFrameMap,topoAudioFrameMap,topoArr,senderVideoMap,senderAudioMap,func,1,senderArr);
}
function testshowdata_dataPackDetail_mic2(data,func){
	
	var result =data.result;
	var list = data.items;
	var topoArr = new Array();   //topo路径数组，用于存放每条路径，相同路径只存一次
	var FrameVideoArr;           //视频帧信息数组
	var FrameAudioArr;           //音频帧信息数组
	var topoVideoFrameMap = new Map();//topo路径与视频帧信息相关联的map,topo路径为key
	var topoAudioFrameMap = new Map();//topo路径与音频帧信息相关联的map,topo路径为key
	var senderArr = new Array(); //发送者队列
	var senderVideoMap = new Map();//发送者记录的视频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var senderAudioMap = new Map();//发送者记录的音频帧信息，发送者ID与帧信息相关联的map,发言者ID为key
	var topoDescription;         //topo路径描述
	if (result==0&&list!=undefined&&list!=null&&list!==""){
		$.each(list,function(i,val){
			//接收方如果存在，即为接收方记录的包
			if(val.receiverId!=null&&val.receiverId!=undefined&&val.receiverId!==""&&val.receiverId!=="0"){
				topoDescription = val.senderId + "_" + val.receiverId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(topoArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = topoVideoFrameMap.get(topoDescription);
						var tempAudioArr = topoAudioFrameMap.get(topoDescription);
						FrameVideoArr = val.frameVideoInfo.split(",");
						FrameAudioArr = val.frameAudioInfo.split(",");
						tempVideoArr = tempVideoArr.concat(FrameVideoArr);
						topoVideoFrameMap.put(topoDescription, tempVideoArr);
						tempAudioArr = tempAudioArr.concat(FrameAudioArr);
						topoAudioFrameMap.put(topoDescription, tempAudioArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameVideoArr = val.frameVideoInfo.split(",");
					FrameAudioArr = val.frameAudioInfo.split(",");
					topoVideoFrameMap.put(topoDescription, FrameVideoArr);
					topoAudioFrameMap.put(topoDescription, FrameAudioArr);
					topoArr.push(topoDescription);
				}
			}
			//发送方记录的包
			else{
				topoDescription = val.senderId;
				var flag = 1;//标志位   1标识topo路径第一次出现
				$.each(senderArr,function(j,e){
					//topo路径已存入topo路径队列中  更新该路径所对应的帧信息
					if(topoDescription == e){
						var tempVideoArr = senderVideoMap.get(topoDescription);
						var tempAudioArr = senderAudioMap.get(topoDescription);
						//var tempArr = senderMap.get(topoDescription);
						FrameVideoArr = val.frameVideoInfo.split(",");
						FrameAudioArr = val.frameAudioInfo.split(",");
						tempVideoArr = tempVideoArr.concat(FrameVideoArr);
						tempAudioArr = tempAudioArr.concat(tempAudioArr);
						senderVideoMap.put(topoDescription, tempVideoArr);
						senderAudioMap.put(topoDescription,tempAudioArr);
						flag = 0;
					}
				});
				//topo路径第一次出现 将该路径所对应的帧信息存入map
				if(flag == 1){
					FrameVideoArr = val.frameVideoInfo.split(",");
					FrameAudioArr = val.frameAudioInfo.split(",");
					senderVideoMap.put(topoDescription, FrameVideoArr);
					senderAudioMap.put(topoDescription, FrameAudioArr);
					senderArr.push(topoDescription);
				}
			}
		});
	}
	testdataDetailThreeTabView(topoVideoFrameMap,topoAudioFrameMap,topoArr,senderVideoMap,senderAudioMap,func,2);
}

function testdataDetailThreeTabView(topoVideoMap,topoAudioMap,topoArr,senderVideoMap,senderAudioMap,fun,micId,senderArr){
	var html ="";
	$("#dataPackDetail01_topo_tabs").html(html);
	$("#dataPackDetail02_topo_tabs").html(html);
	$("#dataPackDetail01_view_div").html(html);
	$("#dataPackDetail02_view_div").html(html);
	if(topoArr!=null&&topoArr!=undefined&&topoArr.length!=0){
		//array不为空 即有topo路径
		html = "<ul class='dataPackDetail_tabs3'>";
		var html1 ="";
		$.each(senderArr,function(i,val){
			var senderForJS = unrecognizeFormat(val);
			html +="<li><a href='#"+senderForJS+"'>"+val+"</a></li>";
			var senderVideoArr = senderVideoMap.get(val);
			var senderAudioArr = senderAudioMap.get(val);
			if(senderVideoArr!=null&&senderVideoArr!=undefined&&senderAudioArr!=null&&senderAudioArr!=undefined){
			    html1 = testthreeTabViewContentSender(senderForJS,senderVideoArr,senderAudioArr,html1,val,fun);
			}
		});
		$.each(topoArr,function(i,val){
			//var topoInfo = recognizeForShow(val);
			var valArr = val.split("_");
			var topoInfoForJS = unrecognizeFormat(valArr[0])+unrecognizeFormat(valArr[1]);
			html +="<li><a href='#"+topoInfoForJS+"'>"+val+"</a></li>";
			var topoVideoFrameArr = topoVideoMap.get(val);
			var topoAudioFrameArr = topoAudioMap.get(val);
			var senderVideoArr = senderVideoMap.get(valArr[0]);
			var senderAudioArr = senderAudioMap.get(valArr[0]);
			if(topoVideoFrameArr!=null&&topoVideoFrameArr!=undefined&&topoAudioFrameArr!=null&&topoAudioFrameArr!=undefined){
			    html1 = testthreeTabViewContent(topoInfoForJS,topoVideoFrameArr,senderVideoArr,topoAudioFrameArr,senderAudioArr,html1,val,fun);
			}
		});
		if(micId == 1){
			$("#dataPackDetail01_view_div").html(html1);
		}
		if(micId == 2){
			$("#dataPackDetail02_view_div").html(html1);
		}
		html +="</ul>";
		console.info("BBBBhtml:"+html);
	}
	if(micId == 1){
		$("#dataPackDetail01_topo_tabs").html(html);
	}
	if(micId == 2){
		$("#dataPackDetail02_topo_tabs").html(html);
	
	}
	threecssMic1();
	threecssMic2();
	fourcssMic1();
	sortables_init();
}
function testthreeTabViewContentSender(senderForJS,senderVideoArr,senderAudioArr,html,val,fun){
	html += "<div id='"+senderForJS+"'>"+
	//"<ul class='dataPackDetail_tabs4'>"+
	//"<li><a href='#fourTab01'>视频</a></li>"+
	"<div id='fourTab01'>视频";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		+ "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
		"</tr>";
		var indexId = 0;
		if(senderVideoArr!=null&&senderVideoArr!=undefined&&senderVideoArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(senderVideoArr[0].split("_")[0]);
		var lastTime;
		$.each(senderVideoArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					}	
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
		}
		
		html += "</table>";
		html += "<div>";
		var count = indexId;
		if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
		}				
		html += "</div></div>";

		html +=//"<li><a href='#fourTab02'>音频</a></li>"+
		   "<div id='fourTab02'>音频";
		html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		+ "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
		"</tr>";
		var index2 = 0;
		if(senderAudioArr!=null&&senderAudioArr!=undefined&&senderAudioArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(senderAudioArr[0].split("_")[0]);
		var lastTime;
		$.each(senderAudioArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					index2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					index2++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					index2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					    
					}	
					index2++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					index2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					index2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
		}
		html += "</table>";
		html += "<div>";
		var count1 =index2;
		if(count1!=undefined&&count1!=null&&count1!==""){
			console.info("ddddd");
			html += "&nbsp;&nbsp;为您找到约"+count1+"条相关结果";
		}				
		html += "</div></div>";
		html +="</div>";

		return html;
}
/*function testdataDetailThreeTabView(topoVideoMap,topoAudioMap,topoArr,senderVideoMap,senderAudioMap,fun,micId){
	var html ="";
	$("#dataPackDetail01_topo_tabs").html(html);
	$("#dataPackDetail02_topo_tabs").html(html);
	$("#dataPackDetail01_view_div").html(html);
	$("#dataPackDetail02_view_div").html(html);

	if(topoArr!=null&&topoArr!=undefined&&topoArr.length!=0){
		//array不为空 即有topo路径
		html = "<ul class='dataPackDetail_tabs3'>";
		var html1 ="";
		$.each(topoArr,function(i,val){
			//var topoInfo = recognizeForShow(val);
			var valArr = val.split("_");
			var topoInfoForJS = unrecognizeFormat(valArr[0])+unrecognizeFormat(valArr[1]);
			html +="<li><a href='#"+topoInfoForJS+"'>"+val+"</a></li>"+
					"<ul class='dataPackDetail_tab4'>"+
					 "<li><a href='#"+topoInfoForJS+"_video'>"+"视频</a></li>"+
					 "<li><a href='#"+topoInfoForJS+"_audio'>"+"音频</a></li>"+
					 "</ul>";
			var topoVideoFrameArr = topoVideoMap.get(val);
			var topoAudioFrameArr = topoAudioMap.get(val);
			var senderVideoArr = senderVideoMap.get(valArr[0]);
			var senderAudioArr = senderAudioMap.get(valArr[0]);
//			if(topoVideoFrameArr!=null&&topoVideoFrameArr!=undefined&&topoAudioFrameArr!=null&&topoAudioFrameArr!=undefined){
//			    html1 = testthreeTabViewContent(topoInfoForJS,topoVideoFrameArr,senderVideoArr,topoAudioFrameArr,senderAudioArr,html1,val,fun);
//			}
			html1 +="<div id='"+topoInfoForJS+"'>";
			if(topoVideoFrameArr!=null&&topoVideoFrameArr!=undefined){
				html1 = testthreeTabViewContent(topoInfoForJS,topoVideoFrameArr,senderVideoArr,html1,val,fun,0);
			}
			if(topoAudioFrameArr!=null&&topoAudioFrameArr!=undefined){
				html1 = testthreeTabViewContent(topoInfoForJS,topoAudioFrameArr,senderAudioArr,html1,val,fun,1);
			}
			html1 +="</div>";
			console.info("XXXXXXXhtml1:"+html1);
		});
		if(micId == 1){
			$("#dataPackDetail01_view_div").html(html1);
		}
		if(micId == 2){
			$("#dataPackDetail02_view_div").html(html1);
		}
		html +="</ul>";
		console.info("BBBBhtml:"+html);
	}
	if(micId == 1){
		$("#dataPackDetail01_topo_tabs").html(html);
	}
	if(micId == 2){
		$("#dataPackDetail02_topo_tabs").html(html);
	
	}
	threecssMic1();
	threecssMic2();
	fourcssMic1();
	sortables_init();
}
*//**
 * 
 * @param topoInfoForJS
 * @param topoFrameArr
 * @param senderArr
 * @param html
 * @param val
 * @param func
 * @param mediaType 0视频 1音频
 * @returns
 *//*
function testthreeTabViewContent(topoInfoForJS,topoFrameArr,senderArr,html,val,func,mediaType){
	if(mediaType = 0){
		html +="<div id='"+topoInfoForJS+"_video'>";
	}else{
		html +="<div id='"+topoInfoForJS+"_audio'>";
	}
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
	"</tr>";
	var indexId = 0;
	if(senderArr!=null&&senderArr!=undefined&&senderArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(senderArr[0].split("_")[0]);
		var lastTime;
		$.each(senderArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					}	
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
	}
	if(topoFrameArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(topoFrameArr[0].split("_")[0]);
		var lastTime;
		var index1 =0;
		$.each(topoFrameArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环
			if(lastId == 65535){
				if(list[0]==="0"){
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					index1++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" ;
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";

					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					var frameStartId = lastId+1;
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){	
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
						index1++;
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index1+indexId) +"</th>";
						//帧Id
						if(frameStartId!=frameId){
							html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
						}else if(frameStartId == frameId){
							html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
						}
						//记录时间戳
						html +="<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
				
					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				else{
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
			
			
		});
	}
	html += "</table>";
	html += "<div>";
	var count;
	if(senderArr!=null&&senderArr!=undefined){
		count = indexId + index1;
	}
	else{
		count = index1;
	}
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}				
	html += "</div></div>";
	return html;
}*/
function testthreeTabViewContent(topoInfoForJS,topoVideoFrameArr,senderVideoArr,topoAudioFrameArr,senderAudioArr,html,val,func){
	html += "<div id='"+topoInfoForJS+"'>"+
			//"<ul class='dataPackDetail_tabs4'>"+
			//"<li><a href='#fourTab01'>视频</a></li>"+
			"<div id='fourTab01'>视频";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
	    + "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
	"</tr>";
	var indexId = 0;
	if(senderVideoArr!=null&&senderVideoArr!=undefined&&senderVideoArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(senderVideoArr[0].split("_")[0]);
		var lastTime;
		$.each(senderVideoArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					}	
					indexId++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + indexId +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
	}
	if(topoVideoFrameArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(topoVideoFrameArr[0].split("_")[0]);
		var lastTime;
		var index1 =0;
		$.each(topoVideoFrameArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环
			if(lastId == 65535){
				if(list[0]==="0"){
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					index1++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" ;
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";

					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					var frameStartId = lastId+1;
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){	
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
						index1++;
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index1+indexId) +"</th>";
						//帧Id
						if(frameStartId!=frameId){
							html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
						}else if(frameStartId == frameId){
							html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
						}
						//记录时间戳
						html +="<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
				
					index1++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				else{
					index1++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index1+indexId) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
			
			
		});
	}
	html += "</table>";
	html += "<div>";
	var count;
	if(senderVideoArr!=null&&senderVideoArr!=undefined){
		count = indexId + index1;
	}
	else{
		count = index1;
	}
	if(count!=undefined&&count!=null&&count!==""){
		html += "&nbsp;&nbsp;为您找到约"+count+"条相关结果";
	}				
	html += "</div></div>";
	
	html +=//"<li><a href='#fourTab02'>音频</a></li>"+
	       "<div id='fourTab02'>音频";
	html += "<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"  class=\"sortable\" id=\"mytable\">"
		+ "<tr class=\"head\">" +
		"<th scope=\"col\" width='40px'>序号</th>" +
		"<th scope=\"col\" width='70px'>帧Id</th>" +
		"<th scope=\"col\" width='130px'>时间戳</th>" +
		"<th scope=\"col\" width='100px'>帧内包数</th>" +
		"<th scope=\"col\" width='70px'>实际包数</th>" +
		"<th scope=\"col\" width='100px'>结果描述</th>" +
		"<th scope=\"col\" colspan='1' width='40px'></th>" +
		"</tr>";
		var index2 = 0;
		if(senderAudioArr!=null&&senderAudioArr!=undefined&&senderAudioArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(senderAudioArr[0].split("_")[0]);
		var lastTime;
		$.each(senderAudioArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环问题
			if(lastId == 65535){
				//65535之后是0，成功回环，中间未丢包
				if(list[0]==="0"){
					indexId2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				//65535之后不是0，丢包
				else{
					//起始ID
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
					indexId2++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";	

					indexId2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			//不回环	
			}else{
				var frameStartId = lastId+1;
				if(i!=0&&Number(list[0])!=lastId+1){
					var id = Number(list[0]) -lastId;
					for(var m=1;m<id;m++){
						frameId = ++lastId;
					    time = timeStampsFormat(lastTime);
					    
					}	
					indexId2++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>";
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";				
					indexId2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{
					indexId2++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list1\">" +
					"<th scope=\"row\">" + index2 +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +	
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
				
		});
		}
		if(topoAudioFrameArr.length!=0){
		var frameId;
		var time;
		var framePiece;
		var realPiece;
		var result;
		var lastId = Number(topoAudioFrameArr[0].split("_")[0]);
		var lastTime;
		var index3 =0;
		$.each(topoAudioFrameArr,function(i,frameInfo){
			var list = frameInfo.split("_");
			//回环
			if(lastId == 65535){
				if(list[0]==="0"){
					index3++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index3+index2) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}else{	
					var frameStartId = lastId+1;
					for(var m=1;m<=Number(list[0]);m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);					
					}
					index3++;
					framePiece = "--";
					realPiece = "--";
					result = "帧丢失";
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index3+index2) +"</th>" ;
					//帧Id
					if(frameStartId!=frameId){
						html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
					}else if(frameStartId == frameId){
						html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
					}
					//记录时间戳
					html +="<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";

					index3++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index3+index2) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}else{
				if(i!=0&&Number(list[0])!=lastId+1){
					var frameStartId = lastId+1;
					var id = Number(list[0]) -lastId;
					//console.info("id:"+id);
					//for(var m=1;m<Number(list[0])-lastId;m++){	
					for(var m=1;m<id;m++){
						frameId = ++lastId;
						time = timeStampsFormat(lastTime);
					}
						index3++;
						framePiece = "--";
						realPiece = "--";
						result = "帧丢失";
						html += "<tr class=\"list2\">" +
						"<th scope=\"row\">" + (index3+index2) +"</th>";
						//帧Id
						if(frameStartId!=frameId){
							html +="<td title='"+ frameId + "'>"+frameStartId+"到" + frameId +"</td>";
						}else if(frameStartId == frameId){
							html +="<td title='"+ frameId + "'>"+ frameId +"</td>";
						}
						//记录时间戳
						html +="<td title='" + time + "'>"+time+"</td>" +
						//帧内片数
						"<td title='" + framePiece + "'>" + framePiece + "</td>" +
						//实际片数
						"<td title='" + realPiece + "'>" + realPiece + "</td>" +
						//结果描述
						"<td title='" + result + "'>" + result + "</td>" +
						"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+lastTime+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
					"</tr>";
				
					index3++;
					frameId = list[0];
					lastId = Number(frameId);	
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index3+index2) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
				else{
					index3++;
					frameId = list[0];
					lastId = Number(frameId);
					time = timeStampsFormat(list[1]);
					lastTime = list[1];
					framePiece = list[2];
					realPiece = list[3];
					result = list[4];
					if(frameId ==null||frameId==undefined||frameId===""){
						frameId ="--";
					}
					if(time == null || time == undefined || time ===""){
						time ="--";
					}
					if(framePiece == null || framePiece == undefined || framePiece ===""){
						framePiece =="--";
					}
					if(realPiece == null || realPiece == undefined || realPiece ===""){
						realPiece =="--";
					}
					if(result == null || result == undefined || result ===""){
						result ="--";
					}
					html += "<tr class=\"list2\">" +
					"<th scope=\"row\">" + (index3+index2) +"</th>" +
					//帧Id
					"<td title='"+ frameId + "'>" + frameId +"</td>" +
					//记录时间戳
					"<td title='" + time + "'>"+time+"</td>" +
					//帧内片数
					"<td title='" + framePiece + "'>" + framePiece + "</td>" +
					//实际片数
					"<td title='" + realPiece + "'>" + realPiece + "</td>" +
					//结果描述
					"<td title='" + result + "'>" + result + "</td>" +
					"<td><a onclick=openPackageDialog('"+gMeetingId+"','"+gSpeakerId+"','"+gMicId+"','"+list[1]+"','"+val+"','"+frameId+"','"+framePiece+"','"+realPiece+"') class='clickBackgroundColor1'><font style='color:#359E33'>包信息</font>|</a></td>"+
				"</tr>";
				}
			}
			
			
		});
		}
		html += "</table>";
		html += "<div>";
		var count1;
		if(senderAudioArr!=null&&senderAudioArr!=undefined){
		count1 = index2 + index3;
		}
		else{
		count1 = index3;
		}
		if(count1!=undefined&&count1!=null&&count1!==""){
			console.info("ddddd");
			html += "&nbsp;&nbsp;为您找到约"+count1+"条相关结果";
		}				
		html += "</div></div>";
		html +="</div>";

	return html;
}

function fourcssMic1() {
	// 获取控制子标签内容的div
	var tabContainers = $('#dataPackDetail01_view_div > div');
	// 隐藏所有div，初始时显示第一个
	tabContainers.hide().filter(':first').show();

	$('.dataPackDetail_tabs4 li a').click(function() {
				tabContainers.hide();// 隐藏所有
				tabContainers.filter(this.hash).show();// 显示当前标签的子内容
				// 将ul下所有标签的类名移除
				$('.dataPackDetail_tabs4 li a').removeClass('selected');
				// 为当前点击的标签设置类名
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
}
