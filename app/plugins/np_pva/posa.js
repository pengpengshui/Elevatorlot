/////注册np_pixlivesdk.ocx
/////id="NPLiveSDK"  classid="clsid:CDF01DAB-AF9C-4163-83FF-98EA3BF3FF80"

/////注册PIXWin.ocx
/////id="pixwin" classid="clsid:678788C1-36D6-41AF-A407-5405BCBC6E49"


var g_streamID = 0;
var login_id = 0;

function  funnull()
{

}

/////////版本//////////////////
function GetVersion()
{
	 try {
       return pixwin.GetVersion();
    }
    catch (e) {
        var a = confirm("未检测到OCX播放控件，请下载");
        if (a) {
            //location.href = "../NP PVA Plugins JX 2.1.22.exe";
            //window.location = "../NP PVA Plugins JX 2.1.22.exe";
            window.open("../NP PVA Plugins JX 2.1.22.exe");
        }
    }
}

function GetLocalRegInfo()
{
	return pixwin.GetLocalRegInfo("");
}

function IsUpgradeVersion(strinfo)
{
	return pixwin.IsUpgradeVersion(strinfo);
}

/////////布局//////////////////
function SetLayout(layout)
{
	pixwin.SetLayout(layout);
	return 0;
}

function SetLayoutEx(type, m, n, dis)
{
	var layoutinfo = {
	"row":m,     //行
	"column": n,  //列 窗口总数不得超过16
	"distance":dis  //窗口间距离，单位为像素
	};
	layoutinfo = JSON.stringify(layoutinfo);
	return pixwin.SetLayoutEx(type, layoutinfo);
}

function GetLayout()
{
	return pixwin.GetLayout();
}

//{"step":3}
//{"to":[1,5,7,2], "from":[2,6,5,-1]};
function ReplaceWindow(option)
{
	return pixwin.ReplaceWindow(option)
}
function GetWindowCount()
{
	return pixwin.GetWindowCount();
}


function EnableWindowSpace(benable)
{
	return pixwin.EnableWndDivider(benable, 0);
}

function EnableWindowSwitch(benable)
{
	return pixwin.EnableExchangeWindow (benable);
}


function SetInterspaceColor(r, g, b)
{
	return pixwin.SetLayoutInterspaceColor(r, g, b)
}

function SetFocusColor(r, g, b)
{
	return pixwin.SetFocusBorderColor(r, g, b);
}

function SetVideoMarginColor(r, g, b)
{
	return pixwin.SetVideoMarginColor(r, g, b,-1);
}

function GetFocesIndex()
{
	return pixwin.GetFocusWindowIndex();
}

function IsWindowBusy(index)
{
	return pixwin.GetWindowBusyByIndex(index);
}

function IsFocusWindow(index)
{
	return pixwin.IsFocusWindow(index);
}
function SetFocusWindow(index)
{
	return pixwin.SetFocusWindow(index);
}
function IsHaveMaximizeWindow()
{
	var ret = pixwin.IsHaveMaximizeWindow();
	if(ret == 1){
		return true;
	}
	else{
		return false;
	}
}


function SetBKImage(index, type)//0 正常，  1 无法打开，  2 离线， 3 CPU过高， 4 纯黑背景，5 无权限
{
	return pixwin.SetStreamLostByIndex(type, index);
}

function RefreshWindow(index)
{
	pixwin.RefreshVideoWindow(index);
	return 0;
}

function SetText(index, strinfo)
{
	var config = {
		'Font':'宋体',
		'size':30, 
		'color':0x00cccc, 
		'xPos':0.4, 
		'yPos':0.6
	};
	config = JSON.stringify(config);
	return pixwin.SetText(strinfo, config, index);
}

//0原始大小居中，  1 拉伸到窗口大小，  2平铺， 3 保持图片原始比例拉伸
//path = ””，为取消背景设置
function SetBackground(index, type, path)//
{
	return pixwin.SetBackground(type, path, index);
}

function GetWindowRect(index)
{
	//{"Left":400,"Top":100,"Width":100,"Height":100}
	return pixwin.GetVideoRectByIndex(index);
}

function RefreshForGis(interval)//ms
{
	return pixwin.RefreshForGis(interval);
}

function ShowOCX(bShow)
{
	pixwin.ShowOrHideOCX(bshow);
	return 0;
}

////////////全屏//////////////
 function SetFullScreen(bfull)
{
	if(bfull){
		pixwin.SetControlFullScreen();
	}
	else{
		pixwin.RestoreControlScreenShow();
	}
	return 0;
}

function IsFullScreen()
{
	return pixwin.IsControlFullScreen();
}


///////////////播放////////////////////////
function PlayVideo(index, strPath, playCallBack, userPlayParam, displayFirstFrameCallBack, userDisplayFirstFrameParam, recordendCallback, userRecordendParam)
{
	return pixwin.PlayEx2(strPath, index, playCallBack, userPlayParam, displayFirstFrameCallBack, userDisplayFirstFrameParam, recordendCallback, userRecordendParam);
}


function StopVideo(index, stopCallback, userparam)
{
	return pixwin.StopEx(false, index, stopCallback, userparam);
}


function Pause(index, bpause)
{
	if(bpause)
		return pixwin.StopEx(true, index, funnull, 0);
	else
		return pixwin.PlayEx2("", index, funnull, 0, funnull, 0, funnull, 0)
}

function PlayFast(index)
{
	return pixwin.SetPlayMode(0, 1, index);
}

function PlaySlow(index)
{
	return pixwin.SetPlayMode(0, -1, index);
}

function PlayStep(index)
{
	return pixwin.SetPlayMode(0, -2, index);
}


function PlaySeek(index, value)
{
	return pixwin.SetPlayMode(2, value, index);
}

function PlayRange(index, start, end, bcycle, funcallback, userparam)
{
	return pixwin.PlayFormStartToEnd2(start, end, bcycle, index, funcallback, userparam)
}


function SetOsd(index)
{
	var param = {
		"type":0,
		"x":0.1,
		"y":0.4, 
		"text":"测试admin\n 这是一个真4K实时流\n测试视频", 
		"font":"宋体", 
		"autocolor":0, 
		"textcolor":255,  
		"backcolor":200,
		"fontsize":0, 
		"algin":1
	};
	param = JSON.stringify(param);
	var ret = pixwin.SetOSD(param, index);
	param = {
		"type":1,
		"x1":0.5,
		"y1":0.91, 
		"x2":0.64,
		"y2":0.91,
		"width":20,
		"color":65456
	};
	param = JSON.stringify(param);
	return pixwin.SetOSD(param, index);
}

function EnableLoadingGif(benable, index)
{
	return pixwin.EnableLoadingGif(benable, index);
}

/////////////获取视频属性/////////////////
function GetPlaySpeed(index)
{
	return pixwin.GetPlayMode(index);
}

function GetDuration(index)
{
	var ret = pixwin.GetVideoAttribute(index);
	if(ret!="ERROR"){
		ret = JSON.parse(ret);
		if(ret.duration){
			return ret.duration;
		}
	}
	return 0;
}

function GetPlayTime(index)
{
	return pixwin.GetPlayTime(index);
}

function GetTransferSpeed(index)
{
	return pixwin.GetTransferSpeed(index);
}

function GetFrameRate(index)
{
	return pixwin.GetFrameRate(index)
}

function GetVideoEncode(index)
{
	return pixwin.GetVideoEncode(index);
}

////////////////抓图//////////////////////
//1:BMP  2:GIF  3:JPG 4:PNG 
function catchScaleDownPicture(index, type, width, height)
{
	//CatchScaleDownPicture CatchScaleDownPictureEx 
	var base64 = pixwin.CatchScaleDownPictureEx2(index,type,width,height);
	base64.replace(/[\n\r]/ig, '');
	prints("CatchScaleDownPictureEx2("+index+","+type+","+width+","+height+") = "+base64.length)
	//prints(base64);
	return base64;
	return base64decode(base64);
}

function GetRawPicture(index, type)
{
	//GetRawPicture GetRawPictureEx
	var base64 = pixwin.GetRawPictureEx(index, type);
	base64.replace(/[\n\r]/ig, '');
	prints("GetRawPicture("+index+","+type+") = len "+base64.length)
	return base64;
	return base64decode(base64);

}

function CatchPictrue(index,type)//grabCompressEx2
{
	//PlayerSna GetPicInfo
	var base64 = pixwin.CatchPictrue(index,type);
	base64.replace(/[\n\r]/ig, '');
	prints("CatchPictrue("+index+","+type+") = len "+base64.length)
	return base64;
	return base64decode(base64);

}

///id ContinuousCatchScaleDownPictures返回值
///result>=0 表示图片的index [1,16] ，递增的， <0 抓拍失败，表示错误码并结束抓拍 
///brPictrue 缩略图Base64编码 
///brRawPicture 原始图Base64编码 
// userParam  用户参数，与ContinuousCatchScaleDownPictures中用户传入的userParam值保持一致
//function pictureCallback (id,  result,  brPicture, brRawPicture, userParam){}

function ContinuousCatchScaleDownPictures(index, type, width, height, raw, count, pictureCallback, userParam)
{
	var ret = pixwin.ContinuousCatchScaleDownPictures(index, type, width, height, raw, count, pictureCallback, userParam);
	prints("ContinuousCatchScaleDownPictures("+index+","+type+","+width+","+height+","+count+") = "+ret);
	return ret;
}

function CapturePicture(index)////jpg本地文件
{
	return pixwin.CapturePicture(index);
}
///////声音///////////////////
function isSoundEnable(index)
{
	var benable = pixwin.IsSoundEnable(index);
	if(benable == 1){
		return true;
	}
	else{
		return false;
	}
}

function SoundEnable(index, benable)
{
	return pixwin.SoundEnable(benable, index);
}

/* 
 * 视频比例
 */

function GetRatioCode(index)
{
	return pixwin.GetRatioCode(index);
}

function SetRatio(index, type)
{
	return pixwin.SetRatio(type, index);
}


/*
 * 右键菜单
 */
function CreateJsonMenu(index, strMenu)
{
	return pixwin.CreateJsonMenu(strMenu, index);
}

function SetJsonMenu(index, strMenu)
{
	return pixwin.SetJsonMenu(strMenu, index);
}

function AddMenuCallBackByID(index, nid, menucallback)
{
	return pixwin.AddMenuCallBackByID(nid, menucallback, index);
}

function RemoveJsonMenu(index, strMenu)
{
	return pixwin.RemoveJsonMenu(strMenu, index);
}

function InsertJsonMenu(index, nid, strMenu, bAfter)
{
	return pixwin.InsertJsonMenu(nid, strMenu, bAfter, index);
}

function ShowJsonMenu(index, strMenu, bshow)
{
	return pixwin.ShowJsonMenu(strMenu,bshow, index);
}


/*
 * 工具条
 */
function DownloadToolbarImage(text) 
{
    return pixwin.DownLoadImage(text);
}

function CreateToolbar(index, strjson)
{
	return pixwin.CreateToolBar(strjson, index);
}

function SetToolbarCallBack(strfunname, funcallback)
{
	return pixwin.SetCallBack(strfunname, funcallback);
} 
function MoveToolBarItem(index, strinfo)
{
	return pixwin.MoveToolBarItem(strinfo, index);
}
function ShowAndEnableToolbarItem(index, strinfo)
{
	return pixwin.ShowAndEnable(strinfo, index);
}

function ResetToolbarStatus(index, key)
{
	return pixwin.ResetStatus(key, index);
}

function SetToolbarProgressRange(index, key, total)
{
	return pixwin.SetProgressRange(key, total, index);
}

function SetToolbarProgressPos(index, key, pos)
{
	return pixwin.SetProgressPos(key, pos, index);
}

function SetToolbarProgressToolTip(index, key, strinfo)
{
	pixwin.SetProgressToolTip(key, strinfo, index);
	return 0;
}

function setToolbarFrameFlag(index, key, start, end, bshow)
{
	return pixwin.setFrameFlag(key, start, end, bshow, index);
}

function SetToolbarStaticContent(index, key, strinfo)
{
	return pixwin.SetContent(key, strinfo, index);
}

function GetToolbarStaticContent(index, key)
{
	return pixwin.GetStaticContent(key, index);
}

function ShowToolbar(index, bshow)
{
	//prints("ShowToolbar("+index+", "+bshow+")");
	pixwin.ShowToolBar(bshow, index);
	return 0;
}



/*
 * 数字放大
 */
function EnableDigitalZoom(index, benable)//默认为红色
{
	var ret = false;
	if(benable){
		pixwin.SetWndOsdProperty(0xff00ff, 8, 0xffffffff, index);
		ret = pixwin.StartZoomByIndex(0, index);
	}
	else{
		ret = pixwin.StopZoomByIndex(index)
	}
	if(ret){
		return 0;
	}
	else{
		return -1;
	}
}

/*
 * 云台控制
 */

function EnablePTZ(benable)
{
	return pixwin.EnablePTZ(benable);
}

function SetWndPtzSpeed(index, speed)
{
	var ret = pixwin.SetWndPtzSpeed(speed. index);
	if(ret){
		return 0;
	}
	else{
		return -1;
	}
}

//0:像素为单位  1:百分比为单位
function SetPTZRange(mode, top_bottom, left_right)
{
	var ret = pixwin.SetPTZRange(mode, top_bottom, left_right);
	if(ret){
		return 0;
	}
	else{
		return -1;
	}
}

function EnableWindowPTZ3D(index, benable)//默认为绿色
{
	var param = "";
	if(benable){
		param = {
			"color":0x00ffff
		}
	}
	param = JSON.stringify(param);
	return pixwin.EnablePtzControl3D(index,benable,param);
}

function EnableWindowPTZ(index, benable)
{
	pixwin.SetWindowPTZByIndex(benable, index);
	return 0;
}

function PtzControl(index, cmd, param)
{
	return pixwin.PtzControlEx(cmd, param, index, 50);
	//return pixwin.PtzControl(cmd, param, index);
}

function PtzLock(index, time)
{
	return pixwin.PtzLock(time, index);
}

function PtzControlAsyn(index, cmd, param, resultCallback, userParam)//
{
	return pixwin.PtzControlAsyn(cmd, param, index, resultCallback, userParam)
}

/*
 * 视频颜色
 */
function SetColorAttribute(index, b, c, s, h)
{
	var color = {
		"bright":b,
		"contrast":c,
		"saturation":s,
		"hue":h
	}
	color = JSON.stringify(color);
	return pixwin.SetColorAttribute(color, index);
}

function GetColorAttribute(index)
{
	return pixwin.GetColorAttribute(index);
}

////////////录像下载//////////////////
function StartDownLoadRecord(brPath, brFileName, pProgressCallback, lProgressParam, pSpeedRateCallback, lSpeedRateParam)
{
	//StartDownLoadRecord
	return pixwin.StartDownLoadRecordEx(brPath, brFileName, pProgressCallback, lProgressParam, pSpeedRateCallback, lSpeedRateParam)
}

function PauseDownLoadRecord(nid, bpause)
{
	return pixwin.PauseDownLoadRecord(nid, bpause);
}

function StopDownLoadRecord(nid, bdelete)
{
	//StopDownLoadRecord
	return pixwin.StopDownLoadRecord2(nid, bdelete);
}

function IsDownloadDirectorySettable()
{
	var ret = pixwin.IsDownloadDirectorySettable();
	if(ret == 0){
		return false;
	}
	else{
		return true;
	}
}

function SetDownloadRecordDirectory(brpath)
{
	return pixwin.SetDownloadRecordDirectory(brpath);
}

function GetDownloadRecordDirectory()
{
	return pixwin.GetDownloadRecordDirectory();
}

function OpenLocalSelectFolderDlg(brpath)
{
	return pixwin.OpenLocalSelectFolderDlg(brpath);
}

function OpenContainsFileDirectory(brfile)
{
	return pixwin.OpenContainsFileDirectory(brfile);
}

function DeleteRecordFile(brfile)
{
	return pixwin.DeleteRecordFile(brfile);
}

////////////加密////////////////
function EnableDES(benable)
{
	return pixwin.EnableDES(benable);
}


/////////////webDialog////////////////////
/*{"url":"http://www.baidu.com", //网址  
" center ":true, //true,false  是否居中，如果center为false，则设置left,top,定位
"left":0,  //单位像素
"top":200, 
"width":200,  //宽度
"height":200,// 高度
" alpha ":0.5,// 透明度
" resize ":true,//可以拖动大小 
"movingwithinpage":true, //页面内移动
" modal ":false, //模式粗航口
" border ":{  //边框
" width ":2, //粗细
" color ":0x000000ff  // RGB颜色
}, 
" title ":{  //标题
"text":"窗口" ,
"textcolor":0,
"font":"微软雅黑",
"fontsize":12,
"color": 0x000000ff,// RGB颜色,
"height":30 ,
"leftmargin":17
}, 
" closebtn ":{  //关闭按钮
"rightmargin":10,
"show":true //是否显示按钮
} , 
" minbtn ":{  //最小化按钮
"rightmargin":10,
"show":true //是否显示按钮
} 
}
*/
function OpenWebDialog(brStyle)
{
	//ShowWebDialog
	return pixwin.OpenWebDialog(brStyle);
}

function GetWebDialog(nid, brconfig)
{
	return pixwin.GetWebDialog(nid, brconfig);
}

function SetWebDialog(nid, brconfig)
{
	return pixwin.SetWebDialog(nid, brconfig);
}

function ExeScript(nid, brFunName, brParam)
{
	return pixwin.ExeScript(nid, brFunName, brParam);
}

function CloseWebDialog(nid)
{
	return pixwin.CloseWebDialog(nid);
}


///////////其他功能/////////////////
//{"expandCnt":0,"isMousePrimary":1,"width":1440,"height":900,
//"Item":[{"index":1,"isPrimary":1,"angle":0.00,"curRect":
//				{"left":0,"top":0,"right":1440,"bottom":900}
//		}]
//}
function getExpandScreenInfo()
{
	return pixwin.getExpandScreenInfo();
}

//{"left": 50, "top" : 50,"width": -1, "height": -1, 
//   "mode"  : 1 //0代表仅移动位置，宽度和高度无效，
				 //1代表移动到指定点所在屏幕并最大化显示，
				 //2代表移动到指定位置并设置为指定大小，其他值无效
//}
function MoveProgressWindow(progressName, title, strRect, bMax)
{
	return pixwin.MoveProgressWindow();
}

function GetMemory()
{
	return pixwin.GetMemory();
}

//0：隐藏  1：正常  2：最小化  3：最大化
function RunProgress(strPath,showType, strParam)
{
	return pixwin.RunProgress()
}



// QueryRecordCallback (nID, brRecordInfo , nUserParam); 
function QueryRecord(brPath, QueryRecordCallback, nUserParam)
{
	return pixwin.QueryRecord(brPath, QueryRecordCallback, nUserParam);
}



///Login	登录PVG服务器
///////////
///参数：ipOrHost	PVG服务器的ip或dns
///参数：port		PVG服务器的服务端口
///参数：userName	登录用户名
///参数：passwd	登录密码
///返回		用户句柄,如果成功大于零
function login(ip, user, pswd, port)
{
	var loginfo = {
		"user":user,
		"passwd":pswd,
		"ip": ip, 
		"port":port
	}
	loginfo = JSON.stringify(loginfo)
	return pixwin.Login(loginfo);
}

///logout	登出PVG服务器
///////////
///参数：login_id		登录句柄,由Login()获得
function logout()
{
	//stopRealplay();
    
	if(login_id != 0)
	{
	    pixwin.Logout(login_id);
	}	    
}



////////////硬解配置//////////////////

//"none","all","4k","1080p","720p","auto"
function SetHWDecoderConfig(mode)
{
	var param = {
		"hwdecoder":{"mode":mode}
	};
	param = JSON.stringify(param);
	return pixwin.SetOption(param);
}

function GetHWDecoderConfig()
{
	var param = {
		"hwdecoder":{}
	};
	param = JSON.stringify(param);
	return pixwin.GetOption(param);
}


///////////////录像下载配置//////////////////////
 //"duration" - 按时长分割, "splitvalue"代表数值，单位 秒， -1 - 默认值，不分割   //保留，暂不支持 
function SetDRcdSplitConfig(benable)
{
	var param;
	if(benable){
		param = {
			"rcddownload":{"splitmode":"size",
					  		"splitvalue":1024 
						 }
		};
	}
	else{
		param = {
			"rcddownload":{"splitmode":"size",
					  		"splitvalue":-1 
						 }
		};
	}
	
	param = JSON.stringify(param);
	return pixwin.SetOption(param);
}

function GetDRcdSplitConfig()
{
	var param = {
		"rcddownload":{}
	};
	param = JSON.stringify(param);
	var ret = pixwin.GetOption(param);
	ret = JSON.parse(ret);
	if(ret){
		ret = ret["rcddownload"];
		if(ret["splitmode"] == "size" && ret["splitvalue"]>0 ){
			return true;
		}
	}
	return false;
}

////////////对讲功能////////////////

function StartTalkback(index)
{
	var param = {
		"starttalkback":{"pos":index,
					   	 "mode":3   //1 - 监听模式 2 - 喊话模式  3 - 对讲模式 
					  }
	};
	param = JSON.stringify(param);
	return pixwin.SetOption(param);
}

function StopTalkback(index)
{
	var param = {
		"stoptalkback":{"pos":index}
	};
	param = JSON.stringify(param);
	return pixwin.SetOption(param);
}

///"status""mode"
function GetTalkback(index)
{
	var param = {
		"talkback":{"pos":index}
	};
	param = JSON.stringify(param);
	return pixwin.GetOption(param);
}

////"standard""width""height""framerate""bitsrate"
//"quality""keyframeinterval"
function GetChannelInfo(ip, port, user, passwd, name)
{
	var param = {
		"channelinfo":{"ip":ip,
					   "port":port,
					   "user":user,
					   "password":passwd,
					   "name":name
					  }
	};
	param = JSON.stringify(param);
	return pixwin.GetOption(param);
}

//////////////数字放大快捷方式//////////////////
function SetHandilyCloseDZoom(benable)
{
	var param = {
		"handilyclosedzoom":{"enable":benable}
	};
	param = JSON.stringify(param);
	return pixwin.SetOption(param);
}


//"enable"
function GetHandilyCloseDZoom()
{
	var param = {
		"handilyclosedzoom":{}
	};
	param = JSON.stringify(param);
	var ret = pixwin.GetOption(param);
	ret = JSON.parse(ret);
	if(ret){
		ret = ret["handilyclosedzoom"];
		if( ret["enable"]){
			return ret.enable;
		}
	}
	return false;

}

function GetAllZoomStatus()
{
	var param = {
		"zoomstatus":{}
	};
	param = JSON.stringify(param);
	return pixwin.GetOption(param);
}

function GetZoomStatus(index)
{
	var param = {
		"zoomstatus":{"pos":index}
	};
	param = JSON.stringify(param);
	var ret = pixwin.GetOption(param);
	ret = JSON.parse(ret);
	if(ret){
		ret = ret["zoomstatus"];
		if( ret["pos"] == index){
			return ret["status"];
		}
	}
	return -1;
}
