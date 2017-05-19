/**
 * 如果是整数，直接返回，如果只含一位小数，直接返回，如果超过一位小数，保留两位小数
 * @param {数字} data
 * @return {String}
 */
function toFixed(data){
	if(isNaN(data)==true){//非数值返回异常提醒
		return "非数值类型，无法处理";
	}else if((data+"").indexOf(".")==-1){//当是整数时直接返回
		return data;
	}else if((data+"").split(".")[1].length==1){//只有一位小数时直接返回
		return data;
	}
	return parseFloat(data).toFixed(2);
}

/**
 * 计算百分比
 * @param {} loss 除数
 * @param {} recv　被除数
 * @return {String} loss/recv
 */
function rate(loss,recv){
	if(parseInt(loss)>=0&&parseInt(recv)>=0){
		if(loss!=undefined&&loss!=null&&recv!=undefined&&recv!=null){
			if(recv==0&&loss!=0){
				return "数据有误";
			}else if(recv==0&&loss==0){
				return "数据有误";
			}else if(loss==0){
				return "0";
			}
			//Math.round()返回数字最接近的整数，四舍五入
			//在本程序中，要求显示百分比时保留两位小数，所以以下公式先将float型数据乘以10000，
			//然后再通过Math.round()四舍五入取整，将四舍五入的结果再除以100，即得结果。
			// /100.00，因为保留了4位小数，那要显示百分比，必须得将保留的数除以100，如果是保留三位小数，要显示百分比，则是乘以1000除以10.00，如果是保留两位小数，要显示百分比，则是乘以100除以1.00
			return (Math.round(parseFloat(parseInt(loss) / parseInt(recv)) * 10000) / 100.00);
		}
	}else{
		return "数据有误";
	}
}

/**
 * 数组里面每条记录的格式为“2015-1-14 14:32:45:165”
 * 冒泡排序，将时间按从小到大排序
 * @param {} scatterTime
 */
function bom(array){
	// 定义一个中间变量
	var temp = 0;
	if(array!=undefined&&array!=null&&array!==""){
		// 循环比较，按升序排序，外层循环中比较次数减1，因为最后一个元素无须自己跟自己比较
		for (var i = 0; i < array.length - 1; i++) {
			// 头脑中建立立体感，从最下面一个元素开始比较，冒泡上浮
			for (var j = array.length - 1; j > i; j--) {
				
				var a = splitTime(array[j]);
				var b = splitTime(array[j-1]);
				// 交换位置
				if ( a < b ) {
					temp = array[j];
					array[j] = array[j - 1];
					array[j - 1] = temp;
				}
			}
		}
	}
}

/**
 * 将以下格式的字符串转化为本地时间
 *数据格式为“2015-1-14 14:32:45:165”
 * @param {} time
 */
function splitTime(time){
	var times = time;
	var year;//年
	var month;//月
	var day;//日
	var hours;//时
	var minutes;//分
	var seconds;//秒
	var milliseconds;//毫秒
	if(times!=undefined&&times!=null&&times!==""){
		var timesArr01 =  times.split(' ');
		if(timesArr01!=undefined&&timesArr01!=null&&timesArr01!==""){
			if(timesArr01[0]!=undefined&&timesArr01[0]!=null&&timesArr01[0]!==""){
				var timesArr01_01 = timesArr01[0].split('-');
				
				if(timesArr01_01!=undefined&&timesArr01_01!=null&&timesArr01_01!==""){
					year = timesArr01_01[0];//年
					month = timesArr01_01[1];//月
					day = timesArr01_01[2];//日
				}
			
			}
			if(timesArr01[1]!=undefined&&timesArr01[1]!=null&&timesArr01[1]!==""){
				var timesArr01_02 = timesArr01[1].split(':');
				if(timesArr01_02!=undefined&&timesArr01_02!=null&&timesArr01_02!==""){
					hours = timesArr01_02[0];//时
					minutes = timesArr01_02[1];//分
					seconds = timesArr01_02[2];//秒
					milliseconds = timesArr01_02[3];//毫秒
				}
				
			}
			
			if(year!=undefined&&year!=null&&year!==""&&
			   month!=undefined&&month!=null&&month!==""&&
			   day!=undefined&&day!=null&&day!==""&&
			   hours!=undefined&&hours!=null&&hours!==""&&
			   minutes!=undefined&&minutes!=null&&minutes!==""&&
			   seconds!=undefined&&seconds!=null&&seconds!==""&&
			   milliseconds!=undefined&&milliseconds!=null&&milliseconds!==""
			){
				return new Date(year,month,day,hours,minutes,seconds,milliseconds);
			}
		}
	}
}

/**
 * 将以下格式的字符串转化为UTC时间(国际标准时间)
 *数据格式为“2015-1-14 14:32:45:165”
 * @param {} time
 */
function dateToUTC(time){
	var times = time;
	var year;//年
	var month;//月
	var day;//日
	var hours;//时
	var minutes;//分
	var seconds;//秒
	var milliseconds;//毫秒
	if(times!=undefined&&times!=null&&times!==""){
		var timesArr01 =  times.split(' ');
		if(timesArr01!=undefined&&timesArr01!=null&&timesArr01!==""){
			if(timesArr01[0]!=undefined&&timesArr01[0]!=null&&timesArr01[0]!==""){
				var timesArr01_01 = timesArr01[0].split('-');
				
				if(timesArr01_01!=undefined&&timesArr01_01!=null&&timesArr01_01!==""){
					year = timesArr01_01[0];//年
					month = timesArr01_01[1];//月
					day = timesArr01_01[2];//日
				}
			
			}
			if(timesArr01[1]!=undefined&&timesArr01[1]!=null&&timesArr01[1]!==""){
				var timesArr01_02 = timesArr01[1].split(':');
				if(timesArr01_02!=undefined&&timesArr01_02!=null&&timesArr01_02!==""){
					hours = timesArr01_02[0];//时
					minutes = timesArr01_02[1];//分
					seconds = timesArr01_02[2];//秒
					milliseconds = timesArr01_02[3];//毫秒
				}
				
			}
			
			if(year!=undefined&&year!=null&&year!==""&&
			   month!=undefined&&month!=null&&month!==""&&
			   day!=undefined&&day!=null&&day!==""&&
			   hours!=undefined&&hours!=null&&hours!==""&&
			   minutes!=undefined&&minutes!=null&&minutes!==""&&
			   seconds!=undefined&&seconds!=null&&seconds!==""&&
			   milliseconds!=undefined&&milliseconds!=null&&milliseconds!==""
			){
				return Date.UTC(year,(month-1),day,hours,minutes,seconds,milliseconds);
			}
		}
	}
}

/**
 * 将2015-01-14-14:32:45:165的时间转化为2015-01-14 14:32:45:165
 * @param {} time
 * @return {}
 */
function formatTime(time){
	if(time!=undefined&&time!=null&&time!==""){
		return time.substring(0,time.lastIndexOf('-'))+" "+time.substring(time.lastIndexOf('-')+1);
	}
}

/**
 * 去除排好序的数组中的重复记录
 * @param {} newArr
 * @param {} oldArr
 */
function getNoNameArr(newArr, oldArr){
	if(oldArr == undefined){
		newArr = null;
	}else{
		if(oldArr[0]!=undefined&&oldArr[0]!=null&&oldArr[0]!==""){
			newArr[0] = oldArr[0];
			if(oldArr.length>1){
				for(var i=1;i<oldArr.length;i++){
					var length = newArr.length;
					if(newArr[length-1]!=oldArr[i]){
						newArr[length] = oldArr[i];
					}
				}
			}
		}
	}
}

/**
 * 将小数变成百分比
 * @param {} data
 * @return {}
 */
function getPercentage(data){
	if(isNaN(data)==true){//非数值返回异常提醒
		return "非数值类型，无法处理";
	}
	return Math.round(parseFloat(data) * 10000) / 100.00;
}

/**
 * 将数字形式的字符串转化为数字
 * @param {} data
 */
function stringToNumber(data){
	if(isNaN(data)==false){
		if(data.toString().indexOf(".")){
			return parseFloat(data);
		}else{
			return parseInt(data);
		}
	}else{
		return "非数值类型，无法处理";
	}
}

/**
 * 拆分由key=value key=value ...组成的字符串，返回一个数组
 * 因为value里可能带有空格，所以要做特殊处理
 * @return [key=value key=value]
 */
function splitString(str){
	var arrs = new Array();
	var arrsIndex = 0;
	var strArr = str.split(" ");
	if(strArr!=undefined&&strArr!=null&&strArr!==""){
		//第一次循环，将不带有=号的数组记录与前一条记录组合后，作为前一条记录的值，并将本条记录置空
		var spaceFlag = "";
		$.each(strArr,function(i,val){
			//数据记录里面不含=号，说明此value中含有空格
			if(val.toString().indexOf("=")==-1){
				spaceFlag += " "+val.replace(/[\"]/g,"");
			}else{
				if(spaceFlag!==""){
					arrs[arrsIndex-1] += spaceFlag;
					spaceFlag = "";//置空
					arrs[arrsIndex] = val;
					arrsIndex++;
				}else{
					arrs[arrsIndex] = val;
					arrsIndex++;
				}
			}
		});
	}
	return arrs;
}


/**
 * 将毫秒时间转化为3小时32分54秒的格式
 * @param {} time
 * @return {}
 */
function timeformat(time) {
	var times = "";
	if (time) {
		var timef = Math.round(time / 1000);// 转换到秒
		if (timef > 60) {
			var second = Math.round(timef % 60);
			var minite = Math.round(timef / 60);
			if (minite > 60) {
				var mminite = Math.round(minite % 60);
				var hour = Math.round(minite / 60);
				if (hour > 0) {
					times = hour + "小时" + mminite + "分" + second + "秒";
				} else {
					times = mminite + "分" + second + "秒";
				}
			} else {
				times = minite + "分" + second + "秒";
			}
		} else {
			times = timef + "秒";
		}

	}
	return times;
}

/**
* 功能：返回当前时间flag分钟之前的时间
* @param {} flag 分钟数
* @return {} 年-月-日　时:分:秒
* 如果flag = 3
* 若当前时间是：2014-05-05 16:37:08
* 则返回：2014-05-05 16:34:08
*/
function time(flag){
	var day = new Date(); 
	day.setMinutes(day.getMinutes()-flag);
	//返回当前时间flag天之前的日期，如果flag = 3，若当前时间为2014-05-05 16:34:08，则返回2014-05-02 16:34:08
	//day.setDate(parseInt(day.getDate(),10)-flag);
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minuts = day.getMinutes();
	var second = day.getSeconds();
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(second<10){
		second = "0"+second;
	}
	var time =year+"-"+month+"-"+date+" "+ hours+":"+ minuts+":"+ second;
	return time;
}

/**
 * 功能，返回指定时间flag毫秒之前或之后的时间，返回的格式为　2015-01-14 14:32:45:165
 * @param {} date 字符串格式为：2015-01-14-14:32:45:165
 * @param {} flag 毫秒值
 */
function timeBeforeAfter(date,flag){
	//将date转化为2015-01-14 14:32:45:165的格式
	var dates = formatTime(date);
	//将date转化为本地日期类型
	console.info("date:"+date);
	var day = splitTime(dates);
	//将date增加flag毫秒
	day.setMilliseconds(day.getMilliseconds()+flag);
	//返回当前时间flag天之前的日期，如果flag = 3，若当前时间为2014-05-05 16:34:08，则返回2014-05-02 16:34:08
	//day.setDate(parseInt(day.getDate(),10)-flag);
	var year = day.getFullYear();
	var month = day.getMonth()+1;
	var date = day.getDate();
	var hours = day.getHours();
	var minuts = day.getMinutes();
	var second = day.getSeconds();
	var millisecond = day.getMilliseconds();
	if(month<10){
		month = "0"+month;
	}
	if(date<10){
		date = "0"+date;
	}
	if(second<10){
		second = "0"+second;
	}
	var time =year+"-"+month+"-"+date+" "+ hours+":"+ minuts+":"+ second+":"+millisecond;
	return time;
}








//吴磊
//time冒泡排序 散列图使用
function bomTime(array)
{
	//console.info("array:"+array);
	var temp ;
	if(array!=undefined&&array!=null&&array!==""){
		// 循环比较，按升序排序，外层循环中比较次数减1，因为最后一个元素无须自己跟自己比较
		for (var i = 0; i < array.length - 1; i++) {
			for(var j = i+1;j<array.length;j++){
				if(array[i][0] > array[j][0]){
					temp = array[i][0];
					array[i][0] = array[j][0];
					array[j][0] = temp;
				}
			}
		}
	}
	//console.info("arrayBom:"+array);
}

//往数组里插入值 如果相同则过滤
function addValue(array,val){
	var flag = 1;
	$.each(array,function(i,e){
		if(e == val){
			flag = 0;
			return false;
		}
	});
	if(flag == 1){
		array.push(val);
	}
}

//冒泡排序帧信息
function bomFramInfo(array){
	var temp;
	var tempArr1;
	var tempArr2;
	if(array!=undefined&&array!=null&&array!==""){
		// 循环比较，按升序排序，外层循环中比较次数减1，因为最后一个元素无须自己跟自己比较
		for (var i = 0; i < array.length - 1; i++) {
			for(var j = i+1;j<array.length;j++){
				tempArr1 = array[i].split("_");
				tempArr2 = array[j].split("_");
				if(tempArr1[0]>tempArr2[0]){
					temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
		}
	}
}

//时间戳转换为yyyy-mm-dd hh:mm:ss
Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "h+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
};


//时间戳转换为年月日
function timeStampsFormat(time){
	var newDate = new Date();
	newDate.setTime(time);
	//var timeString = newDate.toLocaleString();
	var timeString = newDate.format('yyyy-MM-dd h:m:s');
	//console.log(newDate.format('yyyy-MM-dd h:m:s'));
	//console.log(newDate.toLocaleString());
	return timeString;
	
	
}

function unrecognizeFormat(expression){
	//console.info("expression:"+expression);
	var id1;
	var id2;
//	if(-1 != expression.lastIndexOf(":")){
//		var arr = expression.split(":");
//		id1 = arr[0];
//		id2 = "\\:"+arr[1];
//		return id1+id2;
//	}else{
//		return expression;
//	}
	if(-1 != expression.lastIndexOf(":")){
		var arr = expression.split(":");
		id1 = arr[0];
		var arr1 = arr[0].split(".");
		//console.info("arr1:"+arr1);
		var id3 ="";
		$.each(arr1,function(i,val){
			if(i<arr1.length){
				id3 +=val+"_";
			}else{
				id3 +=val;
			}
		});
		//console.info("id3:"+id3);
		id2 = "_" + arr[1];
		return id3+id2;
	}else{
		return expression;
	}
}

function recognizeForShow(expression){
	var arr = expression.split("_");
	console.info("arr:"+arr);
	if(arr.length > 2){
		var message = arr[0]+"_"+arr[1]+"."+arr[2]+"."+arr[3]+"."+arr[4]+":"+arr[6];
		return message;
	}else{
		return expression;
	}
}

//结果分页 假分页
function responsePagination(list,currPage,pageSize){
	var length;
	var page;
	var itemNum;
	if(list!=null&&list!=undefined){
		length = list.length;
		page = (length - (currPage-1)*pageSize)/pageSize;
		item = (length - (currPage-1)*pageSize)%pageSize;
		if(page > 1){
			return true;
		}else if(page == 1){
			if(item > 0){
				return true;
			}
			else{
				return false;
			}
		}else if(page < 1){
			return false;
		}
//		if( page > 0 && item > 0){
//			//可以分页
//			return true;
//		}
//		else{
//			//不分页
//			return false;
//		}
	}
}

function floatToint(data){
	if(isNaN(data) == true){
		return "非数字类型，无法处理";
	}else{
		if((data+"").indexOf(".")==-1){//当是整数时直接返回
			return data;
		}else{
			return parseInt((data+"").split(".")[0]);
		}
	}
}

function bomStringArray(array){
	var temp;
	if(array!=undefined&&array!=null&&array!==""){
		// 循环比较，按升序排序，外层循环中比较次数减1，因为最后一个元素无须自己跟自己比较
		for (var i = 0; i < array.length - 1; i++) {
			for(var j = i+1;j<array.length;j++){
				if(array[i] > array[j]){
					temp = array[j];
					array[j] = array[i];
					array[i] = temp;
				}
			}
		}
	}
} 

function SearchHighlight(idVal,keyword) 
{
	console.info("keyword:"+keyword);
    var pucl = document.getElementById(idVal); 
    if("" == keyword) return; 
    var temp=pucl.innerHTML;
    var htmlReg = new RegExp("\<.*?\>","i"); 
    var arrA = new Array(); 
    //替换HTML标签 
    for(var i=0;true;i++) 
    { 
        var m=htmlReg.exec(temp); 
        if(m) 
        { 
            arrA[i]=m; 
        } 
        else 
        { 
            break; 
        } 
        temp=temp.replace(m,"{~}"); 
    }
    words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/); 
    //替换关键字 
    for (var w=0;w < words.length;w++) 
    { 
 
        var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig");
//    	word1 = "[^{\[(]" + words[w];
//    	var r = new RegExp(word1,"ig");
    	console.info("r:"+r);
        if(w%3 == 0){
//        	temp = temp.replace(r,"<b style='color:Red;'>"+words[w]+"</b>");
        	temp = temp.replace(r,"<b style='color:Red;'>$1</b>");
        }
        if(w%3 == 1){
//        	temp = temp.replace(r,"<b style='color:Blue;'>"+words[w]+"</b>");
        	temp = temp.replace(r,"<b style='color:Blue;'>$1</b>");
        }
        if(w%3 == 2){
//        	temp = temp.replace(r,"<b style='color:Green;'>"+words[w]+"</b>");
        	temp = temp.replace(r,"<b style='color:Green;'>$1</b>");
        }
    } 
    //恢复HTML标签 
    var num = -1;
    temp= temp.replace(/{~}/g,function(){
        num++;
        return arrA[num];
    });
//    for(var i=0;i<arrA.length;i++) 
//    { 
//        temp=temp.replace("{[("+i+")]}",arrA[i]); 
//    }
    pucl.innerHTML=temp; 
}