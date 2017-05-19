// JavaScript Document
function drawPathByDataObject( jsonObject, containerId ){
	var container = document.getElementById( containerId );
	var id = jsonObject.path_id;
	var subPath = jsonObject.sub_path_array;
	if( subPath.length == 1 ){//不带分支
		var seg = subPath[0].segment;
		if( seg.R_R == null ){//1跳情况
			drawPath( id, 1, container, [ seg.U_R.dest_id ] );
		}
		else{
			var rr = seg.R_R;
			if( rr.length == 1 ){
				if( rr[0].twin ){
					drawPath( id, 2, container, [ rr[0].src_id, rr[0].dest_id ] );
				}
				else{
					drawPath( id, 3, container, [ rr[0].src_id, rr[0].dest_id ] );
				}
			}
			else if( rr.length == 2 ){
				if( rr[0].twin && rr[1].twin != true ){
					drawPath( id, 4, container, [ rr[0].src_id, rr[0].dest_id, rr[1].dest_id ] );
				}
				else if ( rr[0].twin != true && rr[1].twin ){
					drawPath( id, 5, container, [ rr[0].src_id, rr[0].dest_id, rr[1].dest_id ] );
				}
				else{
					alert( "非预想情况，没有图形可供参考" );
				}
			}
			else if( rr.length == 3 ){
				if( rr[0].twin && rr[1].twin != true && rr[2].twin ){
					drawPath( id, 6, container, [ rr[0].src_id, rr[0].dest_id, rr[2].src_id, rr[2].dest_id ] );
				}
				else{
					alert( "非预想情况，没有图形可供参考" );
				}
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
	}
	else if( subPath.length == 2 ){//带2分支
		var seg1 = subPath[0].segment;
		var seg2 = subPath[1].segment;
		var rr1 = seg1.R_R;
		var rr2 = seg2.R_R;
		if( rr1.length == 1 && rr2.length == 1 && rr1[0].src_id == rr2[0].src_id ){
			if( rr1[0].twin != true && rr2[0].twin != true ){
				drawPath( id, 7, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[0].dest_id ] );
			}
			else if( rr1[0].twin && rr2[0].twin != true ){
				drawPath( id, 8, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[0].dest_id ] );
			}
			else if( rr1[0].twin != true && rr2[0].twin ){
				drawPath( id, 9, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[0].dest_id ] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 2 && rr2.length == 2 && rr1[0].src_id == rr2[0].src_id ){
			if( rr1[0].dest_id == rr2[0].dest_id && rr1[0].twin && rr2[0].twin ){
				drawPath( id, 10, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[1].dest_id, rr2[1].dest_id ] );
			}
			else if( rr1[0].dest_id != rr2[0].dest_id && rr1[1].dest_id != rr2[1].dest_id ){
				if( rr1[0].twin != true && rr1[1].twin && rr2[0].twin != true && rr2[1].twin ){
					drawPath( id, 17, container, [ rr1[0].src_id, rr1[1].src_id, rr1[1].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
				}
				else if( rr1[0].twin != true && rr1[1].twin && rr2[0].twin && rr2[1].twin != true ){
					drawPath( id, 18, container, [ rr1[0].src_id, rr1[1].src_id, rr1[1].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
				}
				else if( rr1[0].twin && rr1[1].twin != true && rr2[0].twin != true && rr2[1].twin ){
					drawPath( id, 19, container, [ rr1[0].src_id, rr1[1].src_id, rr1[1].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
				}
				else{
					alert( "非预想情况，没有图形可供参考" );
				}
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 2 && rr2.length == 1 && rr1[0].src_id == rr2[0].src_id ){
			if( rr1[0].twin != true && rr1[1].twin && rr2[0].twin != true ){
				drawPath( id, 11, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[1].dest_id, rr2[0].dest_id ] );
			}
			else if( rr1[0].twin && rr1[1].twin != true && rr2[0].twin != true ){
				drawPath( id, 13, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[1].dest_id, rr2[0].dest_id ] );
			}
			else if( rr1[0].twin != true && rr1[1].twin && rr2[0].twin ){
				drawPath( id, 15, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[1].dest_id, rr2[0].dest_id ] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 1 && rr2.length == 2 && rr1[0].src_id == rr2[0].src_id ){
			if( rr1[0].twin != true && rr2[0].twin != true && rr2[1].twin ){
				drawPath( id, 12, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
			}
			else if( rr1[0].twin != true && rr2[0].twin && rr2[1].twin != true ){
				drawPath( id, 14, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
			}
			else if( rr1[0].twin && rr2[0].twin != true && rr2[1].twin ){
				drawPath( id, 16, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[1].src_id, rr2[1].dest_id ] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 3 && rr2.length == 2 && rr1[0].src_id == rr2[0].src_id && rr1[0].dest_id == rr2[0].dest_id ){
			if( rr1[0].twin && rr2[0].twin && rr1[1].twin != true && rr1[2].twin && rr2[1].twin != true ){
				drawPath( id, 20, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[2].src_id, rr1[2].dest_id, rr2[1].dest_id ] );
			}
			else if( rr1[0].twin != true && rr2[0].twin != true && rr1[1].twin != true && rr1[2].twin && rr2[1].twin ){
				drawPath( id, 22, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[2].src_id, rr1[2].dest_id, rr2[1].dest_id ] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 2 && rr2.length == 3 && rr1[0].src_id == rr2[0].src_id && rr1[0].dest_id == rr2[0].dest_id ){
			if( rr1[0].twin && rr2[0].twin && rr1[1].twin != true && rr2[1].twin != true && rr2[2].twin ){
				drawPath( id, 21, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[2].src_id, rr2[2].dest_id, rr1[1].dest_id ] );
			}
			else if( rr1[0].twin != true && rr2[0].twin != true && rr1[1].twin && rr2[1].twin != true && rr2[2].twin ){
				drawPath( id, 23, container, [ rr1[0].src_id, rr1[0].dest_id, rr2[2].src_id, rr2[2].dest_id, rr1[1].dest_id ] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else if( rr1.length == 3 && rr2.length == 3 && rr1[0].src_id == rr2[0].src_id && rr1[0].dest_id == rr2[0].dest_id ){
			if( rr1[0].twin && rr2[0].twin && rr1[1].twin != true && rr2[1].twin != true && rr1[2].twin && rr2[2].twin ){
				drawPath( id, 24, container, [ rr1[0].src_id, rr1[0].dest_id, rr1[2].src_id, rr1[2].dest_id, rr2[2].src_id, rr2[2].dest_id] );
			}
			else{
				alert( "非预想情况，没有图形可供参考" );
			}
		}
		else{
			alert( "非预想情况，没有图形可供参考" );
		}
	}
	else{
		alert( "非预想情况，没有图形可供参考" );
	}
}

var firstY = 30;//首个方块的下坠高度
var rowSpace = 22;//行距
var columnSpacing = 70;//列距
var sugOutSpace = 35;//分支路径的方块的偏移量
var leaveSpace = 32;//线和方块的纵向距离的偏移量
var leanLeaveSpace = 6;//斜线和方块的距离的偏移量
var leanRotation = 20;//斜线倾斜度
var leanOutSpace = 177;//斜线纵向偏移量
var leanLeaveSpace2 = 0;//反向斜线和方块的距离的偏移量
var leanRotation2 = 22;//反向斜线倾斜度
var leanOutSpace2 = 154;//反向斜线纵向偏移量
var longLeanLeaveSpace = -7;
var longLeanRotation = 10;//长线倾斜角
var longLeanOutSpace = 55;//长线的纵向偏移量
function drawPath( id, type, container, relayIds ){
	container.innerHTML = "<div style='overflow:hidden;width:400px;;height:110px'><div style='width:950px;'></div></div>";
	var cnn = container.getElementsByTagName( "div" )[0].getElementsByTagName( "div" )[0];
	functionArray[ type-1 ]( id, cnn, relayIds );
}
var oneJump = function( id, container, relayIds ){
	var firstX = 40;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 3 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 4 ) );
};
var oneJumpWithTwin = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 4 ) );	
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 5 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 6 ) );
};
var twoJump = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 4 ) );	
	addDivTo( container, createArrow( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 5 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 6 ) );
};
var twoJumpWithTwin1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 5 ) );	
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 8 ) );
};
var twoJumpWithTwin2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 5 ) );	
	addDivTo( container, createArrow( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 8 ) );
};
var twoJumpWith2Twin = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 9 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 4 + leaveSpace, firstY - rowSpace * 10 ) );
};
var sug1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 5 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 6 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 - leanOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 8 - leanOutSpace2 ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 9 + leanOutSpace2 ) );
};
var sug1WithTwin1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 5 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 6 + leanOutSpace ) );
	addDivTo( container, createTwinLine( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 - leanOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 8 - leanOutSpace2 ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 9 + leanOutSpace2 ) );
};
var sug1WithTwin2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 5 ) );
	addDivTo( container, createTwinLine( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 6 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 - leanOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 8 - leanOutSpace2 ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 2 + leanLeaveSpace2, firstY - rowSpace * 9 + leanOutSpace2 ) );
};
var sug2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 8 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 9 - leanOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 - leanOutSpace2 ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 11 + leanOutSpace2 ) );
};
var sug3WithTwin1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 - sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 - longLeanOutSpace, 0 ) );
};
var sug3WithTwin2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 + sugOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 - leanOutSpace2 ) );
	addDivTo( container, createArrow( longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 + longLeanOutSpace, 0 ) );
};
var sug3WithTwin3 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createTwinLine( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 - sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 - longLeanOutSpace, 0 ) );
};
var sug3WithTwin4 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createTwinLine( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 + sugOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 - leanOutSpace2 ) );
	addDivTo( container, createArrow( longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 + longLeanOutSpace, 0 ) );
};
var sug3WithTwin5 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createTwinLine( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 - sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 - longLeanOutSpace, 0 ) );
};
var sug3WithTwin6 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 5, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 6 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 7 + leanOutSpace ) );
	addDivTo( container, createTwinLine( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 9 + sugOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 10 - leanOutSpace2 ) );
	addDivTo( container, createArrow( longLeanRotation, firstX + columnSpacing * 2 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 11 + longLeanOutSpace, 0 ) );
};
var sug4WithTwin1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 9 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 10 + sugOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 11 - sugOutSpace ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 12 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 13 - leanOutSpace2 ) );
};
var sug4WithTwin2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createTwinLine( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 9 - leanOutSpace  ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 10 + sugOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 11 - sugOutSpace ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 12 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 13 - leanOutSpace2 ) );
};
var sug4WithTwin3 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2 - sugOutSpace, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 8 + leanOutSpace ) );
	addDivTo( container, createTwinLine( -leanRotation, firstX + columnSpacing + leanLeaveSpace, firstY - rowSpace * 9 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 10 + sugOutSpace  ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing * 2 + leaveSpace, firstY - rowSpace * 11 - sugOutSpace ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 12 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 3 + leanLeaveSpace2, firstY - rowSpace * 13 - leanOutSpace2 ) );
};
var sug5WithTwin1 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 9 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 10 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 11 - sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 12 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -longLeanRotation, firstX + columnSpacing * 3 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 13 - longLeanOutSpace, 0 ) );
};
var sug5WithTwin2 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 - sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 9 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 10 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 11 + sugOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 12 - leanOutSpace2 ) );
	addDivTo( container, createArrow( longLeanRotation, firstX + columnSpacing * 3 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 13 + longLeanOutSpace, 0 ) );
};
var sug5WithTwin3 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createTwinLine( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 9 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 10 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 11 - sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 12 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -longLeanRotation, firstX + columnSpacing * 3 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 13 - longLeanOutSpace, 0 ) );
};
var sug5WithTwin4 = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 + sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4 + sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 - sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 6, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 7 ) );
	addDivTo( container, createArrow( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 9 + leanOutSpace ) );
	addDivTo( container, createTwinLine( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 10 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 11 + sugOutSpace  ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 12 - leanOutSpace2 ) );
	addDivTo( container, createArrow( longLeanRotation, firstX + columnSpacing * 3 + leaveSpace + longLeanLeaveSpace, firstY - rowSpace * 13 + longLeanOutSpace, 0 ) );
};
var sug6WithTwin = function( id, container, relayIds ){
	var firstX = 5;
	addDivTo( container, createTitle( "Path:" + id ) );
	addDivTo( container, createPoint( "", firstX, firstY, "Us") );	
	addDivTo( container, createPoint( "", firstX + columnSpacing, firstY - rowSpace, "R" + relayIds[0] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 2, firstY - rowSpace * 2, "R" + relayIds[1] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 3 - sugOutSpace, "R" + relayIds[2] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 4 - sugOutSpace, "R" + relayIds[3] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 3, firstY - rowSpace * 5 + sugOutSpace, "R" + relayIds[4] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 4, firstY - rowSpace * 6 + sugOutSpace, "R" + relayIds[5] ) );
	addDivTo( container, createPoint( "", firstX + columnSpacing * 5, firstY - rowSpace * 7, "Ud" ) );
	addDivTo( container, createArrow( 0, firstX + leaveSpace, firstY - rowSpace * 8 ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing + leaveSpace, firstY - rowSpace * 9 ) );
	addDivTo( container, createArrow( leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 10 + leanOutSpace ) );
	addDivTo( container, createArrow( -leanRotation, firstX + columnSpacing * 2 + leanLeaveSpace, firstY - rowSpace * 11 - leanOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 12 - sugOutSpace  ) );
	addDivTo( container, createTwinLine( 0, firstX + columnSpacing * 3 + leaveSpace, firstY - rowSpace * 13 + sugOutSpace  ) );
	addDivTo( container, createArrow( leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 14 + leanOutSpace2 ) );
	addDivTo( container, createArrow( -leanRotation2, firstX + columnSpacing * 4 + leanLeaveSpace2, firstY - rowSpace * 15 - leanOutSpace2 ) );
};
var functionArray = [ oneJump, oneJumpWithTwin, twoJump, twoJumpWithTwin1, twoJumpWithTwin2, twoJumpWith2Twin, sug1, sug1WithTwin1, sug1WithTwin2, sug2, sug3WithTwin1, sug3WithTwin2, sug3WithTwin3, sug3WithTwin4, sug3WithTwin5, sug3WithTwin6, sug4WithTwin1, sug4WithTwin2, sug4WithTwin3, sug5WithTwin1, sug5WithTwin2, sug5WithTwin3, sug5WithTwin4, sug6WithTwin ];
//以下内容请勿修改
function addDivTo( container, div ){
	container.innerHTML += div;
}
function createTitle( title ){
	return createDivAt( "", 0, 0, title, "#fff", true, 120 );
}
function createPoint( name, xps, yps, textInner ){
	return createDivAt( name, xps, yps, textInner, "#fff", true, 30 );
	}
function createTwinLine( deg, xps, yps ){
	return createArrow( deg, xps, yps, 2 );
}
function createDivAt( name, xps, yps, textInner, bgColor, border, divWidth ){//创建指定名称，位置坐标，背景颜色和文字内容的Div
	var divString = "<div id='" + name + "' style='position: relative;height: 20px;left:" + xps + "px;top:" + yps + "px;z-index:1;	width: " + divWidth + "px;" + ( border? "border:#000;border-style:solid;border-width:thin;" : "" ) + "text-align:center;background-color:" + bgColor + "'>" + textInner + "</div>";
	return divString;
}
function createArrow( deg, xps, yps, type ){
	if( type == null )type = 1;
	var typeArray = [ "js/callerdetail/relayImgJs/longArrow.png", "js/callerdetail/relayImgJs/arrow.png", "js/callerdetail/relayImgJs/twin.png" ];
	var divString = "<div style='position:relative;left:" + xps + "px;top:" + yps + "px;transform: rotate(" + deg + "deg);-o-transform: rotate(" + deg + "deg);-webkit-transform:rotate(" + deg + "deg);-moz-transform: rotate(" + deg + "deg);'><img src='" + typeArray[type]+ "'/></div>";
	return divString;
}