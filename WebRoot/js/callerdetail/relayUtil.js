//获取Relay状态，这个接口数据从rcMongoServer/relay/GetRelayInfo中获取，不是从monitorMongoServer中取
//对获取的数据进行处理保存，以便在其它函数中使用
var mapRelay2Map = new Map();
var mapRelay2MapisEnable = new Map();
function relay2map(data){
	var description;
	var relay_items;
	var relayInfo;
	var relayID;
	var enable;//是否可用
	description = data.description;
	if(description!=undefined&&description!=null&&description!==""){
		relay_items = description.relay_items;
		if(relay_items!=undefined&&relay_items!=null&&relay_items!==""){
			$.each(relay_items,function(i,val){
				relayInfo = val.relayInfo;
				enable = val.enable;
				if(relayInfo!=undefined&&relayInfo!=null&&relayInfo!==""){
					relayID = relayInfo.relayID;
					if(relayID!=undefined&&relayID!=null&&relayID!==""){
						mapRelay2Map.put(relayID,relayInfo);
						if(enable==true){
							mapRelay2MapisEnable.put(relayID,"可用");
						}else{
							mapRelay2MapisEnable.put(relayID,"不可用");
						}
					}
				}
			});
		}
	}
}