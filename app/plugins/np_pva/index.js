var ip = '';
var port=0;
var user = '';
var pswd = '';
var avId = '';



var win_count=0;		//视频窗口总数
var win_hwnd_list=null;
var mouseindex  = -1;
var timer = null;
var bshowlog = false;
var ocxVer = [0,0,0];
var g_focusChangeIndex = 0;
var g_setfocusIndex = 0;

var g_pvaocxdownloadparam = "";
var allowEvent=true;


var logininfo={
	"username":"",
	"psd":"",
	"pvgip":"",
	"port":""	
};


$(function()
{
	var pix={}
			pix= document.getElementById("pixwin");
	if(!pix)
	{
		var div = document.getElementById("win_pixwin");
		div.innerHTML = "<object id='pixwin' type='applicatin/x-firebreath' width='100%' height='100%'><param name='onload' value='pluginLoaded'/></object>"
		pix = document.getElementById("pixwin");
	}

	$('#btn_selectFile').click(function(){
		$('#inputFile').click();
	});

	$('#inputFile').change(function() {
		var fileValue = $('#inputFile').attr('value');
		//getrealpath(fileValue, this, "");
		$('#txt_filepath').attr('value',fileValue);
	});

	
	$('#btn_login').click(function () {
		btn_login_click();
	});
	$('#btn_cancel').click(function () {
		self.close();
	});

	////////////窗口云台///////////////
	
	$('#btn_ptz_right').mousedown(function () {
		btn_ptz_mousedown(0);
	});
	$('#btn_ptz_rightup').mousedown(function () {
		btn_ptz_mousedown(1);
	});	
	$('#btn_ptz_up').mousedown(function () {
		btn_ptz_mousedown(2);
	});	
	$('#btn_ptz_leftup').mousedown(function () {
		btn_ptz_mousedown(3);
	});
	$('#btn_ptz_left').mousedown(function () {
		btn_ptz_mousedown(4);
	});
	$('#btn_ptz_leftdown').mousedown(function () {
		btn_ptz_mousedown(5);
	});
	$('#btn_ptz_down').mousedown(function () {
		btn_ptz_mousedown(6);
	});
	$('#btn_ptz_rightdown').mousedown(function () {
		btn_ptz_mousedown(7);
	});

	$('#btn_ptz_light1').mousedown(function () {
		btn_ptz_mousedown(10,true);
	});
	$('#btn_ptz_light2').mousedown(function () {
		btn_ptz_mousedown(10);
	});
	$('#btn_ptz_zoom1').mousedown(function () {
		btn_ptz_mousedown(11,true);
	});
	$('#btn_ptz_zoom2').mousedown(function () {
		btn_ptz_mousedown(11);
	});
	$('#btn_ptz_focus1').mousedown(function () {
		btn_ptz_mousedown(12,true);
	});
	$('#btn_ptz_focus2').mousedown(function () {
		btn_ptz_mousedown(12);
	});

	$('#btn_ptz_view').mousedown(function () {
		btn_ptz_mousedown(13);
	});
	$('#btn_ptz_setview').mousedown(function () {
		btn_ptz_mousedown(14);
	});


	$('#btn_ptz_right').mouseup(function () {
		btn_ptz_mouseup(0);
	});
	$('#btn_ptz_rightup').mouseup(function () {
		btn_ptz_mouseup(1);
	});	
	$('#btn_ptz_up').mouseup(function () {
		btn_ptz_mouseup(2);
	});	
	$('#btn_ptz_leftup').mouseup(function () {
		btn_ptz_mouseup(3);
	});
	$('#btn_ptz_left').mouseup(function () {
		btn_ptz_mouseup(4);
	});
	$('#btn_ptz_leftdown').mouseup(function () {
		btn_ptz_mouseup(5);
	});
	$('#btn_ptz_down').mouseup(function () {
		btn_ptz_mouseup(6);
	});
	$('#btn_ptz_rightdown').mouseup(function () {
		btn_ptz_mouseup(7);
	});

	$('#btn_ptz_light1').mouseup(function () {
		btn_ptz_mouseup(10);
	});
	$('#btn_ptz_light2').mouseup(function () {
		btn_ptz_mouseup(10);
	});
	$('#btn_ptz_zoom1').mouseup(function () {
		btn_ptz_mouseup(11);
	});
	$('#btn_ptz_zoom2').mouseup(function () {
		btn_ptz_mouseup(11);
	});
	$('#btn_ptz_focus1').mouseup(function () {
		btn_ptz_mouseup(12);
	});
	$('#btn_ptz_focus2').mouseup(function () {
		btn_ptz_mouseup(12);
	});
	$('#btn_ptz_ptzlock').mouseup(function () {
		btn_ptz_ptzlock_click();
	});





	//////////视频颜色/////////
	$('#btn_getcolor').click(function(){
		btn_getcolor_click();
	});	
	$('#btn_setcolor').click(function(){
		btn_setcolor_click();
	});		
	
	/////////////窗口布局/////////
	$('#btn_win_one').click(function(){
		btn_win_one_click();
	});
	$('#btn_win_four').click(function(){
		btn_win_four_click();
	});	
	$('#btn_win_nine').click(function(){
		btn_win_nine_click();
	});
	$('#btn_win_sixteen').click(function(){
		btn_win_sixteen_click();
	});

	$('#btn_win_mxn').click(function(){
		btn_win_mxn_click();
	});

	$('#btn_win_fullscreen').click(function(){
		btn_win_fullscreen_click();

	});

	$('#chk_windowSpace').change(function(){
		windowSpace_change();
	});

	$('#chk_windowSwitch').change(function(){
		windowSwitch_change();

	});


	$('#btn_Interspace').click(function(){
		btn_Interspace_click();
	});

	$('#btn_FocusBorder').click(function(){
		btn_FocusBorder_click();
	});

	$('#btn_VideoMargin').click(function(){
		btn_VideoMargin_click();
	});

	$('#btn_isFoces').click(function(){
		btn_isFoces_click();
	});

	$('#btn_setFocus').click(function(){
		btn_setFocus_click();
	});

	$('#btn_isHaveMax').click(function(){
		btn_isHaveMax_click();
	});

	




	$('#chk_loadingGif').change(function(){
		loadingGif_change();
	});

	$('#chk_ptzEnable').change(function(){
		ptzEnable_change();
	});

	$('#chk_HandilyCloseDZoom').change(function(){
		HandilyCloseDZoom_change();
	});

	$('#chk_EnableDES').change(function(){
		EnableDES_change();
	});
	
	
	$('#btn_OSD').click(function(){
		btn_OSD_click();
	});



	/////////////播放/////////
	$('#btn_stream_play').click(function(){
		btn_stream_play_click();
	});

	$('#btn_record_play').click(function(){
		btn_record_play_click();
	});

	$('#btn_file_play').click(function(){
		btn_file_play_click();
	});

	$('#btn_sipstream_play').click(function(){
		btn_sipstream_play_click();
	});

	$('#btn_siprecord_play').click(function(){
		btn_siprecord_play_click();
	});

	$('#btn_closeall').click(function(){
		btn_closeall_click();
	});

	$('#btn_record_download').click(function(){
		btn_record_download_click();
	});

	handleEvent(attachEventEx);

	$(window).resize(function(){

	});
	/*
	$(window).unload( function (){
		StopAllPlay();
		logout();
		/// 清理资源
		NPLiveSDK.Cleanup();
		alert("关闭unload");
	});
	*/
	
	window.onbeforeunload=function(){
		win_beforeunload_main();
	};
	
});

function attachEventEx(element, evtstr, evtfun){
	
	if (window.attachEvent) { 
		element.attachEvent("on"+evtstr, evtfun); 
	} else if (window.addEventListener) {
		element.addEventListener(evtstr, evtfun, false);   
	} 
	else{
		element["on"+evtstr] = evtfun;
	}
}


function detachEventEx(element, evtstr, evtfun){
	
	if (window.detachEvent) { 
		element.detachEvent("on"+evtstr, evtfun); 
	} else if (window.removeEventListener) {
		element.removeEventListener(evtstr, evtfun, false);   
	} 
	else{
		element["on"+evtstr] = null;
	}
}


function handleEvent( handleMethod)
{
	/////////////事件/////////
	var pix = document.getElementById('pixwin');
	handleMethod(pix, 'WebDialogEvent',pixwin_WebDialogEvent);	
	handleMethod(pix, 'PTZContorlEvent',pixwin_PTZContorlEvent );	
	handleMethod(pix, 'FocusChange',pixwin_FocusChange);	
	handleMethod(pix, 'WndClick',pixwin_WndClick);	
	handleMethod(pix, 'WndDClik',pixwin_WndDClik);	
	handleMethod(pix, 'SwitchWindow',pixwin_SwitchWindow);	
	handleMethod(pix, 'UnexecutedSwitchWindow',pixwin_UnexecutedSwitchWindow);	
	handleMethod(pix, 'MouseEnterWindow',pixwin_MouseEnterWindow);	
	handleMethod(pix, 'MouseLeaveControlEx',pixwin_MouseLeaveControlEx);	
	handleMethod(pix, 'MouseMoveWindow',pixwin_MouseMoveWindow);	
	handleMethod(pix, 'MouseLeaveControl',pixwin_MouseLeaveControl);
	handleMethod(pix, 'LayoutChange',pixwin_LayoutChange);	
	handleMethod(pix, 'FullScreen',pixwin_FullScreen);	
	handleMethod(pix, 'ExitFullScreen',pixwin_ExitFullScreen);	
	handleMethod(pix, 'SizeChanged',pixwin_SizeChanged);	
	handleMethod(pix, 'MouseDown',pixwin_MouseDown);	
	handleMethod(pix, 'MouseUp',pixwin_MouseUp);	
	handleMethod(pix, 'MouseMove',pixwin_MouseMove);	
	handleMethod(pix, 'MouseWheelEvent',pixwin_MouseWheelEvent);	
	handleMethod(pix, 'PlayBackStartOrEnd',pixwin_PlayBackStartOrEnd);	
	handleMethod(pix, 'ExpandScreen',pixwin_ExpandScreen);//on
	handleMethod(pix, 'StreamTimeout',pixwin_StreamTimeout);	
	handleMethod(pix, 'DecoderTimeout',pixwin_DecoderTimeout );	
	handleMethod(pix, 'DRcdFileSplitEvent',pixwin_DRcdFileSplitEvent );	
	handleMethod(pix, 'DownLoadPercent',pixwin_DownLoadPercent );	
	
}


/////////////事件响应函数/////////
function pixwin_WebDialogEvent(id, elementID, elementValue)
{
	if(elementValue == "window.close"){
		for(var i=0; i<win_hwnd_list.length; i++){
			if(win_hwnd_list[i].webid == id){
				win_hwnd_list[i].webid = 0;
				break;
			}
		}
	}
	prints("WebDialogEvent("+id+","+elementID+","+elementValue+")");
}	

function pixwin_PTZContorlEvent(index, cmd, enable, trigger)
{
	if(enable){
		printlog("PTZContorlEvent("+index+","+cmd+","+enable+","+trigger+")");
	}
	else{
		prints("PTZContorlEvent("+index+","+cmd+","+enable+","+trigger+")");
	}
}	

function pixwin_FocusChange(old, newindex)
{
	g_focusChangeIndex = newindex;
	prints("FocusChange("+old+","+newindex+")");
}	

function pixwin_WndClick(index, x, y)
{
	printlog("WndClick("+index+","+x+","+y+")");
}	

function pixwin_WndDClik(index, x, y)
{
	printlog("WndDClik("+index+","+x+","+y+")");
}	

function pixwin_SwitchWindow(srcpos, dstpos)
{
	//printlog("SwitchWindow("+srcpos+","+dstpos+")");
	var param = win_hwnd_list[srcpos];
	win_hwnd_list[srcpos] = win_hwnd_list[dstpos];
	win_hwnd_list[dstpos] = param;
}	

function pixwin_UnexecutedSwitchWindow(srcpos, dstpos)
{
	prints("UnexecutedSwitchWindow("+srcpos+","+dstpos+")");
}	

function pixwin_MouseEnterWindow(index, x, y)
{
	if(mouseindex>-1 && ocxVer[0]>1){
		ShowWindowToolbar(mouseindex, false);
	}
	ShowWindowToolbar(index, true);
	mouseindex = index;
}	

function pixwin_MouseLeaveControlEx(index, x, y)
{

	if(ocxVer[0]>1){
		ShowWindowToolbar(index, false);
	}
	mouseindex = -1;
	//prints("MouseLeaveControlEx("+index+")");
}	

function pixwin_MouseMoveWindow(index, x, y)
{
	printlog("MouseMoveWindow("+index+","+x+","+y+")");
}	

function pixwin_MouseLeaveControl(index)
{
	printlog("MouseLeaveControl("+index+")");
}	

function pixwin_LayoutChange(oldcount, newcount)
{
	printlog("LayoutChange("+oldcount+","+newcount+")");
}	

function pixwin_FullScreen()
{
	printlog("FullScreen()");
}	

function pixwin_ExitFullScreen()
{
	printlog("ExitFullScreen()");
}	

function pixwin_SizeChanged(oldwidth, oldheight, newwidth, newheight)
{
	printlog("SizeChanged("+oldwidth+","+oldheight+","+newwidth+","+newheight+")");
}	

function pixwin_MouseDown(index, flag, x, y)
{
	printlog("MouseDown("+index+","+flag+","+x+","+y+")");
}	

function pixwin_MouseUp(index, flag, x, y)
{
	printlog("MouseUp("+index+","+flag+","+x+","+y+")");
}	

function pixwin_MouseMove(index, flag, x, y)
{
	printlog("MouseMove("+index+","+flag+","+x+","+y+")");
}	

function pixwin_MouseWheelEvent(index, data, x, y)
{
	printlog("MouseWheelEvent("+index+","+data+","+x+","+y+")");
}	

function pixwin_PlayBackStartOrEnd(index, flag)
{
	printlog("PlayBackStartOrEnd("+index+","+flag+")");
}	

function pixwin_ExpandScreen(monitorInfo, newMonitorInfo)
{
	printlog("ExpandScreen("+monitorInfo+","+newMonitorInfo+")");
}	

function pixwin_StreamTimeout(index, id, mode)
{
	printlog("StreamTimeout("+index+","+id+","+mode+")");
}	

function pixwin_DecoderTimeout(index, id, mode)
{
	printlog("DecoderTimeout("+index+","+id+","+mode+")");
}	

function pixwin_DRcdFileSplitEvent (id, brFileName, brReserved)
{
	printlog("DRcdFileSplitEvent("+id+","+brFileName+","+brReserved+")");
}	

function pixwin_DownLoadPercent(id, percent)
{
	printlog("DownLoadPercent("+id+","+percent+")");
}





/////////加载/////////
function win_beforeunload_main()
{
	if(!allowEvent){
		prints("win_beforeunload_main return");
		return;
	}

	handleEvent(detachEventEx);
	if(timer != null){
		clearInterval(timer);
		timer = null;
	}
	for(var i=0; i<win_hwnd_list.length; i++){
		StopStream(i);
	}
	
}


function win_load_main()
{

	//$('#win_pixwin').show();

	var Ver = GetVersion();
	ocxVer = Ver.match(/\d+/g);
	prints("安装包版本"+GetLocalRegInfo());
	var strjson = readFileJSON();
	if(IsUpgradeVersion(strjson)){
		alert("比JSON文件配置版本低");
	}

	DownloadToolbarImage("http://192.168.61.25:80/toolbar");

	SetLayout(1);
	win_hwnd_init();


/*	var date=new Date();
	var begin=date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-"+date.getDate().toString();
	var end=date.getFullYear().toString() + "-" + (date.getMonth()+1).toString()+ "-"+date.getDate().toString();
	$('#datetime_begin').datebox('setValue',begin);
	$('#datetime_end').datebox('setValue',end);
	$('#sip_datetime_begin').datebox('setValue',begin);
	$('#sip_datetime_end').datebox('setValue',end);
	
	begin=(date.getHours()-1).toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
	end=date.getHours() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
	$('#time_begin').attr('value',begin);
	$('#time_end').attr('value',end);
	$('#sip_time_begin').attr('value',begin);
	$('#sip_time_end').attr('value',end);

	document.getElementsByName("fileType")[0].checked=true;
	document.getElementsByName("sipVodtype")[0].checked=true;*/

	try{
		SetHandilyCloseDZoom(true);
		var bstatus = GetHandilyCloseDZoom();
		$('#chk_HandilyCloseDZoom').attr('checked', bstatus);
	}
	catch (e){
		$('#chk_HandilyCloseDZoom').attr('checked', false);
	}

	/*try{
		var ret = GetHWDecoderConfig();
		ret = JSON.parse(ret);
		if(ret){
			ret = ret["hwdecoder"];
			if(ret["support"]==1){
				document.getElementsByName("hwdecoder")[0].checked=true;
				prints("硬解设置: "+ret["mode"]);
			}
			else{
				prints("计算机不支持硬解");
				document.getElementsByName("hwdecoder")[2].checked=true;
			}
		}
	}
	catch (e){
		prints("控件不支持硬解");
		document.getElementsByName("hwdecoder")[2].checked=true;
	}
*/


	/*
	if(timer == null){
		timer = setInterval(function() {
				for(var i=0; i<win_count; i++){
					if(win_hwnd_list[i].showToolbar){
						UpdateToolbar(i);
					}
				}
			},
			500
			);
	}
	*/

	
}



//////////布局//////////////


function win_hwnd_init()
{
	var win_count_old = win_count;
	win_count = GetWindowCount();
	if(win_count_old < win_count){
		loadingGif_change();
		}
	var layout = GetLayout();
	if(win_hwnd_list==null)
		win_hwnd_list=new Array();
	
	if(win_hwnd_list.length<win_count)
	{
		for(var i=win_hwnd_list.length;i<win_count;i++)
		{
			var row={};

			row["type"]=-1;  	//文件、实时流、录像、PFS、国标实时流、国标录像，0、1、2、3、4、5；
			row["menu"] = -1;
			row["toolbar"] = -1;
			row["zoom"] = false;
			row["timerZoom"] = null;
			row["ptz"] = false;
			row["ptz3d"] = false;
			row["showToolbar"] = false;
			row["timerToolbar"] = null;
			row["path"] = {};
			row["dur"] = 0;
			row["seek"] = -1;
			row["seektimes"] = 0;
			//row["maxdtime"] = 1.0;
			row["bpause"] = false;
			row["brange"] = false;
			row["webid"] = 0;
			win_hwnd_list.push(row);
			//CreateMenu(i);
		/*	CreateWindowToolbar(i)*/
		}
	}
}


function btn_win_one_click()
{
	var ret = SetLayout(1);
	if(ret == 0){
		win_hwnd_init();
	}
}

function btn_win_four_click()
{
	var ret = SetLayout(4);
	if(ret == 0){
		win_hwnd_init();
	}
}

function btn_win_nine_click()
{
	var ret = SetLayout(9);
	if(ret == 0){
		win_hwnd_init();
	}	

}

function btn_win_sixteen_click()
{
	var ret = SetLayout(16);
	if(ret == 0){
		win_hwnd_init();
	}	

}

function btn_win_mxn_click()
{
	var m =$('#txt_layout_m').attr('value');
	var n =$('#txt_layout_n').attr('value');
	var dis =$('#txt_layout_dis').attr('value');
	var err = SetLayoutEx(101, m, n, dis);
	if(err == 0){
		win_hwnd_init();	
	}
	else{
		alert('mXn分屏错误'+err);
	}
}


function btn_win_fullscreen_click()
{
	if(!IsFullScreen()){
		SetFullScreen(true);
	}
}

function windowSpace_change()
{
	var bEnable = false;
	if($('#chk_windowSpace').attr('checked')){
		bEnable=true;
	}
	EnableWindowSpace(bEnable);

}
function windowSwitch_change()
{
	var bEnable = false;
	if($('#chk_windowSwitch').attr('checked')){
		bEnable=true;
	}
	EnableWindowSwitch(bEnable);
}

function loadingGif_change()
{
	var bEnable = false;
	if($('#chk_loadingGif').attr('checked')){
		bEnable=true;
	}

	for(var i=0; i<win_count; i++){
		var ret = EnableLoadingGif(bEnable, i);
	}
}

function EnableDES_change()
{
	var bEnable = false;
	if($('#chk_EnableDES').attr('checked')){
		bEnable=true;
		alert("输入路径信息需加密~")
	}

	
	var ret = EnableDES(bEnable);
}





function btn_Interspace_click()
{
	var r = parseInt($('#txt_color_R').attr('value'));
	var g = parseInt($('#txt_color_G').attr('value'));
	var b = parseInt($('#txt_color_B').attr('value'));
	return SetInterspaceColor(r, g, b);
}
function btn_FocusBorder_click()
{
	var r = parseInt($('#txt_color_R').attr('value'));
	var g = parseInt($('#txt_color_G').attr('value'));
	var b = parseInt($('#txt_color_B').attr('value'));
	return SetFocusColor(r, g, b);
}
function btn_VideoMargin_click()
{
	var r = parseInt($('#txt_color_R').attr('value'));
	var g = parseInt($('#txt_color_G').attr('value'));
	var b = parseInt($('#txt_color_B').attr('value'));
	return SetVideoMarginColor(r, g, b);
}

function btn_isFoces_click()
{
	var index = parseInt($('#txt_window_index').attr('value'));
	var ret = IsFocusWindow(index);
	if(ret){
		alert("窗口 "+index+" 是焦点窗口");
	}
	else{
		alert("窗口 "+index+" 不是焦点窗口");
	}
}
function btn_setFocus_click()
{
	var index = parseInt($('#txt_window_index').attr('value'));
	SetFocusWindow(index);
}

function btn_isHaveMax_click()
{
	var ret = IsHaveMaximizeWindow()
	if(ret){
		alert("有最大化窗口");
	}
	else{
		alert("无最大化窗口");
	}
}

//////////视频颜色//////////////
function btn_getcolor_click()
{
	var index=GetFocesIndex();
	var info=GetColorAttribute(index);
	info = JSON.parse(info);

	$('#txt_brightness').attr('value',info.bright);
	$('#txt_contrast').attr('value',info.contrast);
	$('#txt_saturation').attr('value',info.saturation);
	$('#txt_hue').attr('value',info.hue);
	
}

function btn_setcolor_click()
{
	var index=GetFocesIndex();
	var brightness=parseInt($('#txt_brightness').attr('value'));
	var contrast=parseInt($('#txt_contrast').attr('value'));
	var saturation=parseInt($('#txt_saturation').attr('value'));
	var hue=parseInt($('#txt_hue').attr('value'));
	
	return SetColorAttribute(index,brightness,contrast,saturation,hue);
	
}



function btn_OSD_click()
{
	var index = GetFocesIndex();
	SetOsd(index);
	
}

/////////PVG流播放////////////////
function GetUsefulIndex()
{
	return GetFocesIndex();
	
	var index = g_focusChangeIndex;
	if( g_focusChangeIndex != g_setfocusIndex){
		 g_focusChangeIndex = g_setfocusIndex;
		return index;
	}
	index = g_setfocusIndex;
	if(win_hwnd_list[index].type != -1){
		for(var i=0; i<win_count;i++){
			index++;
			if(index<win_count){
				if(win_hwnd_list[index].type==-1){
					SetFocusWindow(index);
					g_setfocusIndex = index;
					return index;
				}
			}
			else{
				index=0;
			}
		}
		index++;
		if(index==win_count){
			index =0;
		}
		SetFocusWindow(index);
		g_setfocusIndex = index;
		return index;
	}
	else{
		return index;
	}
	
}

function btn_stream_play_click()
{
	var stream = getStreamPath();
	var index = GetUsefulIndex();
	playstreamEx(index, stream);

}

function btn_record_play_click()
{
	var stream = getRecordPath();
	var index = GetUsefulIndex();
	playstreamEx(index, stream);
}


function btn_file_play_click()
{
	var stream = GetFilePath();
	var index = GetUsefulIndex();
	playstreamEx(index, stream);
}


function btn_sipstream_play_click()
{
	var stream = GetSipStreamPath();
	var index = GetUsefulIndex();
	playstreamEx(index, stream);
}

function btn_siprecord_play_click()
{
	var stream = GetSipRecordPath();
	var index = GetUsefulIndex();
	playstreamEx(index, stream);
}

function playstreamEx(index, stream)
{	

	 //if(win_hwnd_list[index].type!=-1){
	if(IsWindowBusy(index)){
		StopVideo(index,
		function fun1(pos, result, userParam){
			if(result==0){
				cleanWindow(pos);
				playstream(pos, stream);
			}
		}, 0);
	}
	else{
		playstream(index, stream);
	}
}

function playstream(index, stream){
	var err = PlayVideo(index, JSON.stringify(stream), 
		function playcb(pos, result, userParam){
			if(result!=0){
				StopVideo(pos,funnull, 0);
				SetBKImage(pos,1);//无法打开
				//prints("PlayVideo("+pos+", "+JSON.stringify(stream)+") ="+result);
			}
			else {
				//afterPlayStream(pos, stream);
			}
		},0,
		function firstframecb(pos, result, userParam){
			if(result!=0){
				printlog("playstream window "+pos+" error "+result);
				//StopVideo(pos,function fun(pos, result, userParam){
				//		SetBKImage(pos,0);
				//		SetText(pos, "请求流超时");}, 0);
			}
			else{
				//SetOsd(pos);
			}
		},0,
		function recordendcb(pos, result, userParam){
			if(result == 0){
				printlog("playstream window "+pos+" recordend");
				//StopVideo(pos,function fun(pos, result, userParam){
				//	SetText(pos, "录像播放结束");}, 0);
			}
		}, 0
	);
	if(err!=0){
		SetBKImage(index, 1);//无法打开
		//prints("PlayVideo("+index+", "+JSON.stringify(stream)+") ="+err);
	}
	afterPlayStream(index, stream)
}

function afterPlayStream(index, stream)
{
	win_hwnd_list[index].path=stream;
	win_hwnd_list[index].type=stream.type;
	if(win_hwnd_list[index].menu != stream.type){
		RemoveMenu(index, win_hwnd_list[index].menu);
		SetMenu(index, stream.type);
		win_hwnd_list[index].menu = stream.type;
	}
	//SetWindowToolbar(index, stream.type);
	/*if(index == mouseindex){
		ShowWindowToolbar(index,true);
	}*/
}

function gethwdecoder()
{
	var chkObjs = document.getElementsByName("hwdecoder");
	for(var i=0;i<chkObjs.length;i++){
		if(chkObjs[i].checked){
			return parseInt($(chkObjs[i]).attr('value'));
		}
	}
}



function getStreamPath()
{
	var stream ={
		"type":1,
		"user":$('#txt_username_login').attr('value'),
		"passwd":$('#txt_password_login').attr('value'),
		"ip": $('#txt_pvgip_login').attr('value'), 
		"port":parseInt($('#txt_port_login').attr('value')),
		"path":$('#txt_avpath').attr('value'),
		"displayMode":0,
		"hwdecoder":gethwdecoder()
	}
	return stream;
}

function getRecordPath()
{
	var begin=stringParseDate($('#datetime_begin').datebox('getValue') + " " + $('#time_begin').attr('value')) +".000";
	var end=stringParseDate($('#datetime_end').datebox('getValue') + " " + $('#time_end').attr('value'))+".000";
	var vodtype = parseInt($('#vodtype').attr('value'));
	var stream ={
		"type":2,
		"user":$('#txt_username_login').attr('value'),
		"passwd":$('#txt_password_login').attr('value'),
		"ip": $('#txt_pvgip_login').attr('value'), 
		"port":parseInt($('#txt_port_login').attr('value')),
		"path":$('#txt_avpath').attr('value'),
		"displayMode":0,
		"vodType":vodtype,
		"beginTime":begin,
		"endTime":end,
		"hwdecoder":gethwdecoder()
	}
	return stream;
}

function GetFileType()
{
	var chkObjs = document.getElementsByName("fileType");
	for(var i=0;i<chkObjs.length;i++){
		if(chkObjs[i].checked){
			return parseInt($(chkObjs[i]).attr('value'));
		}
	}
}



function GetFilePath()
{
	var FileType = GetFileType();
	var filename = $('#txt_filepath').attr('value');
	//filename = getrealpath(filename);
	var stream = {
		"type":FileType,
		"filename":filename,
		"displayMode":0,
		"hwdecoder":gethwdecoder()
	}
	return stream;
}


function GetSipStreamPath()
{
	var stream ={
		"type":4,
		"user":$('#txt_sipusername_login').attr('value'),
		"passwd":$('#txt_sippassword_login').attr('value'),
		"severip": $('#txt_sipip_login').attr('value'), 
		"severid":$('txt_sipid_login').attr('value'),
		"severport":parseInt($('#txt_sipport_login').attr('value')),
		"deviceID":$('#txt_sipavpath').attr('value'),
		"displayMode":0,
		"hwdecoder":gethwdecoder()
	}
	return stream;
}

function GetisDeviceRcd()
{
	
	var isDeviceRcd = 0;
	if($('#chk_sipisDeviceRcd').attr('checked')){
		isDeviceRcd = 1;
	}
	return isDeviceRcd;
}

function GetSipVodtype()
{
	var chkObjs = document.getElementsByName("sipVodtype");
	for(var i=0;i<chkObjs.length;i++){
		if(chkObjs[i].checked){
			return parseInt($(chkObjs[i]).attr('value'));
		}
	}
}

function GetSipRecordPath()
{
	var begin=stringParseDateSip($('#sip_datetime_begin').datebox('getValue') + " " + $('#sip_time_begin').attr('value'));
	var end=stringParseDateSip($('#sip_datetime_end').datebox('getValue') + " " + $('#sip_time_end').attr('value'));
	var vodtype = GetSipVodtype();
	var isDeviceRcd = GetisDeviceRcd();
	var stream ={
		"type":5,
		"user":$('#txt_sipusername_login').attr('value'),
		"passwd":$('#txt_sippassword_login').attr('value'),
		"severip": $('#txt_sipip_login').attr('value'), 
		"severid":$('txt_sipid_login').attr('value'),
		"severport":parseInt($('#txt_sipport_login').attr('value')),
		"deviceID":$('#txt_sipavpath').attr('value'),
		"vodType":vodtype,
		"isDeviceRcd":isDeviceRcd, 
		"beginTime":begin,
		"endTime":end,
		"displayMode":0,
		"hwdecoder":gethwdecoder()
	}
	return stream;
}

function btn_closeall_click()
{
	for(var i=0; i<win_hwnd_list.length; i++){
		StopStream(i);
	}
}

function StopStream(index)
{
	SetText(index, "");
	if(win_hwnd_list[index].webid>0){
		CloseWebDialog(win_hwnd_list[index].webid);
		win_hwnd_list[index].webid = 0;
	}

	if(IsWindowBusy(index)){
		StopVideo(index,
			function fun1(pos, result, userParam){
				if(result==0){
					SetBKImage(pos,0);
				}
			}, 0);
	}
	
	SetBKImage(index,0);
	cleanWindow(index);
	
	//ShowMenu(index, false);
}



function cleanWindow(index)
{
	win_hwnd_list[index].path={};
	if(win_hwnd_list[index].type != -1){
		if(win_hwnd_list[index].webid >0){
			CloseWebDialog(win_hwnd_list[index].webid);
			win_hwnd_list[index].webid = 0;
		}
		RemoveMenu(index, win_hwnd_list[index].type);
		if(win_hwnd_list[index].timerZoom){
			clearInterval(win_hwnd_list[index].timerZoom);
			win_hwnd_list[index].timerZoom = null;
		}
		ShowWindowToolbar(index, false);
		win_hwnd_list[index].menu = -1;
		win_hwnd_list[index].type= -1;
		win_hwnd_list[index].seek= -1;
		win_hwnd_list[index].toolbar = -1;
		win_hwnd_list[index].zoom = false;
		win_hwnd_list[index].ptz = false;
		win_hwnd_list[index].ptz3d = false;
		win_hwnd_list[index].path = {};
		win_hwnd_list[index].dur = 0;
		win_hwnd_list[index].seek = -1;
		win_hwnd_list[index].seektimes = 0;
		//win_hwnd_list[index].maxdtime = 6;
		win_hwnd_list[index].bpause = false;
		win_hwnd_list[index].brange = false;
	}
	
}


//////////右键菜单////////////////////

function CreateMenu(index)
{
	var ratio = GetRatioCode(index);
	var param = InitMenu(ratio);
	var err = CreateJsonMenu(index, param);
	
	AddMenuCallBackByID(index, 141, MenuSetRatio);
	AddMenuCallBackByID(index, 142, MenuSetRatio);
	AddMenuCallBackByID(index, 143, MenuSetRatio);
	AddMenuCallBackByID(index, 144, MenuSetRatio);
	AddMenuCallBackByID(index, 145, MenuSetRatio);
	return err;

}

function SetMenu(index, streamType)
{
	var param = GetVideoMenu(streamType);
	var err = InsertJsonMenu(index,14, param, true);
	AddMenuCallBackByID(index, 10, MenuStop);
	AddMenuCallBackByID(index, 11, MenuEnableZoom);
	AddMenuCallBackByID(index, 12, MenuEnablePTZ);
	AddMenuCallBackByID(index, 13, MenuEnablePTZ3D);
	//AddMenuCallBackByID(index, 15, MenuPTZLock);
}


function ShowMenu(index, bshow)
{
	var param = {
			"id"   : 1
		};
	param = JSON.stringify(param);
	ShowJsonMenu(index, param, false);
}


function RemoveMenu(index, streamType)
{
	if(streamType == -1)
		return 0;
	else{
		var param = GetVideoMenu(streamType);
		RemoveJsonMenu(index, param);
	}
}




function MenuStop(index, menuID, nID)
{
	StopStream(index);
}

function MenuSetRatio(index, menuID,nID)
{
	var param = GetCheckRatio(nID);
	SetJsonMenu(index, param);
	return SetRatio(index, nID-140);
}


////////////数字放大//////////////////////

function MenuEnableZoom(index, menuID,nID)
{
	var bEnable = !(win_hwnd_list[index].zoom);
	if(bEnable && win_hwnd_list[index].ptz3d){
		EnablePTZ3DPro(index, false);
	}
	EnableZoomPro(index, bEnable);
}

function EnableZoomPro(index, bEnable)
{
	var err = EnableDigitalZoom(index, bEnable);
	if(err == 0){
		SetMenuZoomStatus(index, bEnable);	
	}
}

function SetMenuZoomStatus(index, bEnable)
{
	var param = {
			"id"      : 11,
			"text"    : "数字放大",
			"check"   : bEnable
		};
	param = JSON.stringify(param);
	SetJsonMenu(index, param);
	win_hwnd_list[index].zoom = bEnable;
	if(bEnable){
		if(GetHandilyCloseDZoom() && !win_hwnd_list[index].timerZoom){
			var timer = setInterval(
			function(){UpdateMenuZoomStatus(index)}, 500);
			win_hwnd_list[index].timerZoom = timer;
		}
	}
	else{
		if(win_hwnd_list[index].timerZoom){
			clearInterval(win_hwnd_list[index].timerZoom);
			win_hwnd_list[index].timerZoom = null;
		}
	}
}

function UpdateMenuZoomStatus(index)
{
	var status = GetZoomStatus(index);//GetAllZoomStatus();
	if(status == 0){
		SetMenuZoomStatus(index, false);
	}
}

function HandilyCloseDZoom_change()
{
	var bEnable = false;
	if($('#chk_HandilyCloseDZoom').attr('checked')){
		bEnable=true;
	}
	try{
		var ret = SetHandilyCloseDZoom(bEnable);
	}
	catch (e){
		$('#chk_HandilyCloseDZoom').attr('checked', false);
		alert("不支持此功能");
	}
	var bstatus = GetHandilyCloseDZoom();
	if(bstatus!=bEnable){
		$('#chk_HandilyCloseDZoom').attr('checked', bstatus);
	}
}

/////////////PTZ//////////////////////


function ptzEnable_change()
{
	var bEnable = false;
	if($('#chk_ptzEnable').attr('checked')){
		bEnable=true;
	}
	var ret = EnablePTZ(bEnable);
}

function btn_ptz_mousedown(cmd,bval)
{
	//var speed=$('#cbo_ptz_speed').combobox('getValue');
	var speed=parseInt($('#cbo_ptz_speed').attr('value'));

	if(speed=="")
		speed=5;
	speed=parseInt(speed);
	if(bval)
		speed=0-speed;
	
	if(cmd==9)
		speed=0;

	var index = GetFocesIndex();
	PtzControl(index,cmd,speed);
	
}
function btn_ptz_mouseup(cmd)
{
	var index = GetFocesIndex();
	PtzControl(index,cmd,0);
	
}

function btn_ptz_ptzlock_click()
{
	var time = parseInt($('#ptzlocktime').attr('value'));
	var index = GetFocesIndex();
	var err = PtzLock(index, time);
}




function MenuEnablePTZ(index, menuID,nID)
{
	var bEnable = !(win_hwnd_list[index].ptz);
	var err = EnableWindowPTZ(index, bEnable);
	if(err == 0){
		var param = {
			"id"      : 12,
			"text"    : "窗口云台",
			"check"   : bEnable
		};
		param = JSON.stringify(param);
		SetJsonMenu(index, param);
		win_hwnd_list[index].ptz = bEnable;	
	}
}
function MenuEnablePTZ3D(index, menuID,nID)
{
	var bEnable = !(win_hwnd_list[index].ptz3d);
	if(bEnable && win_hwnd_list[index].zoom){
		EnableZoomPro(index, false);
	}
	EnablePTZ3DPro(index, bEnable);
}

function EnablePTZ3DPro(index, bEnable)
{
	var err = EnableWindowPTZ3D(index, bEnable);
	if(err == 0){
		var param = {
			"id"      : 13,
			"text"    : "3D云台",
			"check"   : bEnable
		};
		param = JSON.stringify(param);
		SetJsonMenu(index, param);
		win_hwnd_list[index].ptz3d = bEnable;	
	}
}

// function MenuPTZLock(index, menuID,nID)
// {
// 	var err = PtzLock(index, 86400);
// 	if(err == 0){
// 		var param = {
// 			"id"      : 15,
// 			"text"    : "云台锁定",
// 			"check"   : bEnable
// 		};
// 		param = JSON.stringify(param);
// 		SetJsonMenu(index, param);
// 	}
// }

/////////////工具条////////////////

function CreateWindowToolbar(index)
{
	/*var buttomTool = InitToolbarBottom();
	var err = CreateToolbar(index, buttomTool);*/
	var topTool = InitToolbarTop();
	err = CreateToolbar(index, topTool);
	SetToolbarCallBack("ToolbarStop", ToolbarStop);
	SetToolbarCallBack("ToolbarSoundTrue", ToolbarSoundTrue);
	SetToolbarCallBack("ToolbarSoundFalse", ToolbarSoundFalse);
	SetToolbarCallBack("ToolbarCapture", ToolbarCapture);
	SetToolbarCallBack("ToolbarContinuousCapture", ToolbarContinuousCapture);
	SetToolbarCallBack("ToolbarPTZ", ToolbarPTZ);



	SetToolbarCallBack("ToolbarPlayStream", ToolbarPlayStream);
	SetToolbarCallBack("ToolbarPlayRecord", ToolbarPlayRecord);
	//SetToolbarCallBack("ToolbarAlaram", ToolbarAlaram);
	SetToolbarCallBack("ToolbarPlaySlow", ToolbarPlaySlow);
	SetToolbarCallBack("ToolbarPlayFast", ToolbarPlayFast);
	SetToolbarCallBack("ToolbarPauseTrue", ToolbarPauseTrue);
	SetToolbarCallBack("ToolbarPauseFalse", ToolbarPauseFalse);
	SetToolbarCallBack("ToolbarPlayStep", ToolbarPlayStep);

	SetToolbarCallBack("ToolbarPosChange", ToolbarPosChange);
	SetToolbarCallBack("ToolbarMouseOnChannal", ToolbarMouseOnChannal);
	SetToolbarCallBack("ToolbarRangeChange", ToolbarRangeChange);
	SetToolbarCallBack("ToolbarPlayRange", ToolbarPlayRange);
	SetToolbarCallBack("ToolbarPlayRangeCancel", ToolbarPlayRangeCancel);

	


	return err;
}

function ShowWindowToolbar(index, bshow)
{

	if(bshow && win_hwnd_list[index].type ==-1){
		return;
	}

	//prints("ShowWindowToolbar("+index+", "+bshow+")");

	if(win_hwnd_list[index].type !=-1){
		var info = {
			"key":1,
			"show":bshow,
			"enable":true,
			"status":0
			};
		ShowAndEnableToolbarItem(index, JSON.stringify(info));
		info = {
			"key":2,
			"show":bshow,
			"enable":true,
			"status":0
			}
		ShowAndEnableToolbarItem(index, JSON.stringify(info))
		ShowToolbar(index, bshow);
		win_hwnd_list[index].showToolbar = bshow;
	}

	if(bshow){
		if(!win_hwnd_list[index].timerToolbar){
			var timer = setInterval(function(){UpdateToolbar(index)} , 500);
			win_hwnd_list[index].timerToolbar = timer;
		}
	}
	else{
		if(win_hwnd_list[index].timerToolbar){
			clearInterval(win_hwnd_list[index].timerToolbar);
			win_hwnd_list[index].timerToolbar = null;
		}
	}

}

function SetWindowToolbar(index, streamType)
{
	var text25 = GetVideotype(streamType);
	SetToolbarStaticContent(index, 25, text25);
	UpdateToolbar(index);
	var Toolobj = GetVideToolbarObjs(streamType, false);
	for(var i=0; i<Toolobj.length; i++){
		var info=JSON.stringify(Toolobj[i]);
		ShowAndEnableToolbarItem(index, info);
	}
	benable = isSoundEnable(index);
	ToolbarSound(index, benable);
	if(isStream(streamType)){
		return;
	} 
	if(isRecord(streamType)){
		var begin = win_hwnd_list[index].path.beginTime;
		var end   = win_hwnd_list[index].path.endTime;
		var dur = GetDurationRecord(end, begin);
		if(dur>=0){
			win_hwnd_list[index].dur = dur;
			ResetToolbarPlayStatus(index, dur);
		}

	}
	else{
		var dur = Math.floor(GetDuration(index)/1000);
		if(dur>=0){
			win_hwnd_list[index].dur = dur;
			ResetToolbarPlayStatus(index, dur);
		}
		prints("GetDuration("+index+") = "+dur+"S");
	}
	SetToolbarProgressPos(index, 19, 0);
	setToolbarFrameFlag(index, 19, 0, 0, false);
	SetToolbarStaticContent(index, 102, "00:00:00");
	UpdatePlaySpeed(index);
}

function ResetToolbarPlayStatus(index, dur)
{
	var text = GetDueString(dur);
	SetToolbarStaticContent(index, 101, text);
	
	SetToolbarProgressRange(index, 19, dur);
}


function UpdateToolbar(index)
{
	// var ret = GetAllZoomStatus();
	// prints("GetAllZoomStatus() = " +ret);

	if(win_hwnd_list[index].type == -1){
		return;
	}
	var speed = GetTransferSpeed(index);
	var fps = GetFrameRate(index);
	SetToolbarStaticContent(index, 26, speed+" " +fps);

	if(win_hwnd_list[index].dur>0){
		var time = Math.floor(GetPlayTime(index)/1000);
		if(time>0 && time<=win_hwnd_list[index].dur){
			if((win_hwnd_list[index].seek==-1)){
				SetToolbarProgressPos(index, 19, time);
				var strtime = GetDueString(time)
				SetToolbarStaticContent(index, 102, strtime);
			}
			else{
				var dtime = time - win_hwnd_list[index].seek;
				//var maxdtime = win_hwnd_list[index].maxdtime;
				if(dtime>-1 && dtime<=6){
					win_hwnd_list[index].seek = -1;
					SetToolbarProgressPos(index, 19, time);
					var strtime = GetDueString(time)
					SetToolbarStaticContent(index, 102, strtime);
					prints("seek dtime OK "+dtime);
				}
				else{
					win_hwnd_list[index].seektimes += 1;
					prints("seek dtime error"+dtime+","+win_hwnd_list[index].seektimes);
					if(win_hwnd_list[index].seektimes>6){
						win_hwnd_list[index].seek = -1;	
					}
				}
			}
		}	
	}
	else 
		{
			var streamType = win_hwnd_list[index].type;
			if(streamType == 0 || streamType == 3 || streamType == 6){
			var dur = Math.floor(GetDuration(index)/1000);
			if(dur>0){
				win_hwnd_list[index].dur = dur;
				ResetToolbarPlayStatus(index, dur);
			}
		}
	}
}

function ToolbarStop(strinfo)
{
	var param = JSON.parse(strinfo);
	ResetToolbarStatus(param.index, 21);
	StopStream(param.index);
}



function ToolbarPlayStream(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	if(win_hwnd_list[index].type == 2)
	{
		var stream = win_hwnd_list[index].path;
		stream.type = 1;
		win_hwnd_list[index].seek= -1;
		win_hwnd_list[index].zoom = false;
		win_hwnd_list[index].ptz = false;
		win_hwnd_list[index].ptz3d = false;
		win_hwnd_list[index].dur = 0;
		win_hwnd_list[index].seek = -1;
		playstreamEx(index, stream);
	}
	else if(win_hwnd_list[index].type == 5)
	{
		var stream = win_hwnd_list[index].path;
		stream.type = 4;
		win_hwnd_list[index].seek= -1;
		win_hwnd_list[index].zoom = false;
		win_hwnd_list[index].ptz = false;
		win_hwnd_list[index].ptz3d = false;
		win_hwnd_list[index].dur = 0;
		win_hwnd_list[index].seek = -1;
		playstreamEx(index, stream);
	}
}


function ToolbarPlayRecord(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	if(win_hwnd_list[index].type == 1)
	{
		var stream = win_hwnd_list[index].path;
		stream.type = 2;
		var begin=stringParseDate($('#datetime_begin').datebox('getValue') + " " + $('#time_begin').attr('value')) +".000";
		var end=stringParseDate($('#datetime_end').datebox('getValue') + " " + $('#time_end').attr('value'))+".000";
		var vodtype = $('#vodtype').attr('value');
		stream.vodType = parseInt(vodtype);
		stream.beginTime = begin;
		stream.endTime = end;
		win_hwnd_list[index].seek= -1;
		win_hwnd_list[index].zoom = false;
		win_hwnd_list[index].ptz = false;
		win_hwnd_list[index].ptz3d = false;
		win_hwnd_list[index].dur = 0;
		win_hwnd_list[index].seek = -1;
		playstreamEx(index, stream);
	}
	else if(win_hwnd_list[index].type == 4){
		var stream = win_hwnd_list[index].path;
		stream.type = 5;
		var begin=stringParseDateSip($('#sip_datetime_begin').datebox('getValue') + " " + $('#sip_time_begin').attr('value'));
		var end=stringParseDateSip($('#sip_datetime_end').datebox('getValue') + " " + $('#sip_time_end').attr('value'));
		var vodtype = GetSipVodtype();
		var isDeviceRcd = GetisDeviceRcd();
		stream.beginTime = begin;
		stream.endTime = end;
		stream.vodType = vodtype;
		stream.isDeviceRcd = isDeviceRcd;
		win_hwnd_list[index].seek= -1;
		win_hwnd_list[index].zoom = false;
		win_hwnd_list[index].ptz = false;
		win_hwnd_list[index].ptz3d = false;
		win_hwnd_list[index].dur = 0;
		win_hwnd_list[index].seek = -1;
		playstreamEx(index, stream);
	}
}

function ToolbarPlaySlow(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	if(win_hwnd_list[index].bpause){
		return;
	}
	PlaySlow(index);
	ResetToolbarStatus(index, 14);
	UpdatePlaySpeed(index);

}

function ToolbarPlayFast(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	if(win_hwnd_list[index].bpause){
		return;
	}
	PlayFast(index);
	ResetToolbarStatus(index, 17);
	UpdatePlaySpeed(index);
}

function ToolbarPauseTrue(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	Pause(index, true);
	ResetToolbarStatus(index, 15);
	ToolbarPlayPause(index, true);
}
function ToolbarPauseFalse(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	Pause(index, false);
	ResetToolbarStatus(index, 151);
	ToolbarPlayPause(index, false);
	UpdatePlaySpeed(index);
}
function ToolbarPlayStep(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	PlayStep(index);
	ResetToolbarStatus(index, 16);
	ToolbarPlayPause(index, true);
}

function ToolbarPlayPause(index, bpause)
{
	win_hwnd_list[index].bpause = bpause;
	var info = {
		"key":15,//控件id
		"show":(!bpause),// 编号为key的控件是否显示
		"enable":true,//编号为key的控件是否使能
		"status":0//预留
		};
	info = JSON.stringify(info);
	ShowAndEnableToolbarItem(index, info);
	info = {
		"key":151,//控件id
		"show":bpause,// 编号为key的控件是否显示
		"enable":true,//编号为key的控件是否使能
		"status":0//预留
		};
	info = JSON.stringify(info);
	ShowAndEnableToolbarItem(index, info);
}


function UpdatePlaySpeed(index)
{
	var speed = GetPlaySpeed(index);
	if(speed != "ERROR"){
		//var maxdtime = GetMaxdtime(speed);
		//win_hwnd_list[index].maxdtime = maxdtime;
		speed = "x"+speed;
		SetToolbarStaticContent(index, 18, speed);
	}
	else{
		speed = "x1";
		SetToolbarStaticContent(index, 18, speed);
		prints("GetPlaySpeed("+index+") = error");
	}
}


function ToolbarPosChange(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	var err = PlaySeek(index, param.pos*1000);
	prints("playseek("+index+", "+param.pos+")="+err);
	if(err==0){
		win_hwnd_list[index].seek = param.pos;
		win_hwnd_list[index].seektimes = 0;
	}
	else{
		prints("playseek("+index+", "+param.pos+")="+err);
	}
	/*
	if(win_hwnd_list[index].brange){
		setToolbarFrameFlag(index, 19, 0, 0, false);
		PlayRange(index, 0, 0, false, function(){}, 0);
		win_hwnd_list[index].brange = false;
	}
	*/
	
}
function ToolbarRangeChange(strinfo)
{
	printlog("ToolbarRangeChange "+strinfo);
}
function ToolbarMouseOnChannal(strinfo)
{
	var param = JSON.parse(strinfo);
	var tip = ""+param.pos;
	SetToolbarProgressToolTip(param.index, 19, tip);
}

function ToolbarSound(index, benable)
{
	var info = {
		"key":27,//控件id
		"show":benable,// 编号为key的控件是否显示
		"enable":true,//编号为key的控件是否使能
		"status":0//预留
		};
	info = JSON.stringify(info);
	ShowAndEnableToolbarItem(index, info);
	info = {
		"key":271,//控件id
		"show":(!benable),// 编号为key的控件是否显示
		"enable":true,//编号为key的控件是否使能
		"status":0//预留
		};
	info = JSON.stringify(info);
	ShowAndEnableToolbarItem(index, info);
}

function ToolbarSoundTrue(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	SoundEnable(index, false);
	ResetToolbarStatus(index, 27);
	ToolbarSound(index, false);
}
function ToolbarSoundFalse(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	SoundEnable(index, true);
	ResetToolbarStatus(index, 271);
	ToolbarSound(index, true);
}


function ToolbarCapture(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	var pic = catchScaleDownPicture(index,3, 300, 0);
	var pic2 = GetRawPicture(index, 3);
	ResetToolbarStatus(index, 23);
	var tag = '<div id="pic_div"> <img src="'+"data:image/jpeg;base64,"+pic+'"> </img></div>';
	if($("#pic_div")[0]){
		$("#pic_div").remove();
	}	
	$('#win_picture').append(tag);
}
function ToolbarContinuousCapture(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	var ret = ContinuousCatchScaleDownPictures(index,3, 0, 0,1, 10, 
		function(id,  result,  brPicture, brRawPicture, userParam){
			prints("ContinuousCapture("+id+", "+result+", piclen("+brPicture.length+"), rawpiclen("+brRawPicture.length+")");
		}, 0);
	ResetToolbarStatus(index, 28);
}

function ToolbarPlayRange(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	var dur = win_hwnd_list[index].dur;
	var start = Math.floor(dur/4);
	var end = dur - start - 1;
	setToolbarFrameFlag(index, 19, start, end, true);
	win_hwnd_list[index].brange = true;
	PlayRange(index, start*1000, end*1000,false, function fun(pos,result,userParam){
			prints("playRange end("+pos+", "+start+" ,"+end+", false)");
		}, 0)
	var toolbarObjs = getRangeToolbarObjs(win_hwnd_list[index].type, true);
	for(var i=0; i<toolbarObjs.length; i++){
		var info=JSON.stringify(toolbarObjs[i]);
		ShowAndEnableToolbarItem(index, info);
	}

}
function ToolbarPlayRangeCancel(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	setToolbarFrameFlag(index, 19, 0, 0, false);
	PlayRange(index, 0, 0, false, function(){}, 0);
	var toolbarObjs = getRangeToolbarObjs(win_hwnd_list[index].type, false);
	for(var i=0; i<toolbarObjs.length; i++){
		var info=JSON.stringify(toolbarObjs[i]);
		ShowAndEnableToolbarItem(index, info);
	}
}

function ToolbarRangeChange(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	var err = PlayRange(index, param.startPos*1000, param.endPos*1000, true, function(){}, 0)
}



function ToolbarPTZ(strinfo)
{
	var param = JSON.parse(strinfo);
	var index = param.index;
	ResetToolbarStatus(index, 29);

	var webid = win_hwnd_list[index].webid;
	if(webid>0){
		var info={"show":""};
		var ret = GetWebDialog(webid,JSON.stringify(info));
		info = {"show":true}
		ret = SetWebDialog(webid, JSON.stringify(info));
	}
	else{
		var webinfo = GetPtzWebinfo();
		webid = OpenWebDialog(webinfo);
		win_hwnd_list[index].webid = webid;
	}

	
}




function btn_record_download_click()
{

	g_pvaocxdownloadparam = JSON.stringify(getRecordPath());
	$.cookie('pvadownloadparam',g_pvaocxdownloadparam);
	var html =$.cookie('pvadownloadhtml');
	//if(html==null || html=='closed')
	{
		allowEvent = false;
		window.setTimeout(function confirmLeave(){
			allowEvent=true;
			}  ,1000);
	     
		window.open('./temiframe.html?'+g_pvaocxdownloadparam , 'download', 'top=300,left=350,width=600,height=400,toolbar=no,location=no,menubar=no,status=yes,scrollbars=no,resizable=yes,');
		$.cookie('pvadownloadhtml','opened',{expires:7});
	}

}




