

function printlog(log)
{
	if(bshowlog){
		if(window.console){
			console.log(log);
		}
	}
}

function showlog(log)
{
	if(bshowlog){
		alert(log);
	}
}

function prints(log)
{
	if(window.console){
		console.log(log);
	}
}


function SetCookie(sName, sValue)
{
  document.cookie = sName + "=" + escape(sValue) + ";";
}

function GetCookie(sName)
{
  // cookies are separated by semicolons
  var aCookie = document.cookie.split(";");
  for (var i=0; i < aCookie.length; i++)
  {
    // a name/value pair (a crumb) is separated by an equal sign
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0]) 
      return unescape(aCrumb[1]);
  }

  // a cookie with the requested name does not exist
  return null;
}


function GetfolderPath()
{
	var js=document.scripts;
	js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/"));
	// js=js.substring(js.lastIndexOf(":")-1,js.lastIndexOf("/")+1)
	js=js.substring(0,js.lastIndexOf("/")+1)
	js = unescape(js);
	return js;
}



function stringParseDate(str)
{
	str=str.replace(/-/g,"/");
	var tmp=new Date(str);
	
	var date=Tostr(tmp.getFullYear()) +"-"+Tostr(tmp.getMonth()+1)+ "-"+Tostr(tmp.getDate()) + " " + Tostr(tmp.getHours()) + ":" + Tostr(tmp.getMinutes()) + ":" + Tostr(tmp.getSeconds());
	
	return date;
	
}

function stringParseDateSip(str)
{
	str=str.replace(/-/g,"/");
	var tmp=new Date(str);
	
	var date=Tostr(tmp.getFullYear()) +"-"+Tostr(tmp.getMonth()+1)+ "-"+Tostr(tmp.getDate()) + "T" + Tostr(tmp.getHours()) + ":" + Tostr(tmp.getMinutes()) + ":" + Tostr(tmp.getSeconds());
	
	return date;
	
}




function Tostr(i)
{

	return (i<10) ? "0"+i : i;
}

//2012-01-01 13:20:00.000
function GetDurationRecord(end, begin)
{
	var timebegin = (begin.slice(0,19)).replace(/-/g,"/");
	timebegin = timebegin.replace(/T/g," ");
	var dbegin =new Date(timebegin);
	var timeend = (end.slice(0,19)).replace(/-/g,"/");
	timeend = timeend.replace(/T/g," ");
	var dend =new Date(timeend);
	var dur = (dend.getTime()-dbegin.getTime())/1000;
	dur = Math.floor(dur)
	return dur;

}

function GetDueString(dur)
{
	var str = Tostr(Math.floor(dur/3600))+":"+Tostr(Math.floor((dur%3600)/60))+":"+Tostr(Math.floor(dur%60));
	return str;
}



function GetMaxdtime(strspeed)
{
	var fspeed = 1.0;
	var speed = strspeed.match(/\d+/g);
	if(speed.length ==1){
		fspeed = parseInt(speed[0]);
	}
	return fspeed;
}

/*fileQuery是指input type为file的对象，在事件中使用this来替代，fakepath， 
比如:obj.onChange=function(){ 
var file_img=document.getElementById("img"); 
getPath(file_img,this,transImg); 
} 
transImg是解决IE左上角图标的那张透明图片的路径;*/ 
function getrealpath(obj,fileQuery,transImg){ 
	if(window.navigator.userAgent.indexOf("MSIE")>=1){ 
		obj.select(); 
		var path=document.selection.createRange().text; 
		if(obj.removeAttribute){
			obj.removeAttribute("src"); 
			obj.setAttribute("src",transImg); 
		}
		if(obj.style && obj.style.filter){
			obj.style.filter=   
			"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');";  
			return obj.attr('value');
		}
		return path;
	} 
	else{ 
		var file =fileQuery.files[0];  
		var reader = new FileReader();  
		reader.onload = function(e){ 
			obj.setAttribute("src",e.target.result) 
		} 
		reader.readAsDataURL(file);
	}

}

/*
function getrealpath(obj){
	if (obj) {
		if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
			obj.select();
			return document.selection.createRange().text;
		}
		else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
			if (obj.files) {
				return obj.files.item(0).getAsDataURL();
			}
			var path = window.URL.createObjectURL(f.files[0]);;
			path = obj.files.item(0).getAsDataURL();
			return obj.attr('value');
		}

		var path = obj.files.item(0).getAsDataURL();
		return obj.attr('value');
	}
}
*/

function readFileJSON(){ 
/*
	var filename = GetfolderPath()+"pva-plugins.json";
	var fso = new ActiveXObject("Scripting.FileSystemObject"); 
	var f = fso.OpenTextFile(filename,1); 
	var s = ""; 
	while (!f.AtEndOfStream) 
	s += f.ReadLine(); 
	f.Close(); 
	return s; 
*/
	return "";
} 


function InitMenu(ratio)
{
	var param ={
		"id":1,
		"text":"菜单",
		"submenu":
		[
			{
				"id"      : 14,
				"text"    : "设置比例",
				"submenu" :
				[
					{
						"id"      : 141,
						"text"    : "原始",
						"check"   : ((ratio==1)?true:false)
					},
					{
						"id"      : 142,
						"text"    : "拉伸",
						"check"   : ((ratio==2)?true:false)
					},
					{
						"id"      : 143,
						"text"    : "4:3",
						"check"   : ((ratio==3)?true:false)
					},
					{
						"id"      : 144,
						"text"    : "16:9",
						"check"   : ((ratio==4)?true:false)
					},
					{
						"id"      : 145,
						"text"    : "16:10",
						"check"   : ((ratio==5)?true:false)
					}
				]
			}
		]
	};	
	param = JSON.stringify(param);
	return param;
}

function GetCheckRatio(nID)
{
	var param =[
		{
			"id"      : 141,
			"text"    : "原始",
			"check"   : ((nID==141)?true:false)
		},
		{
			"id"      : 142,
			"text"    : "拉伸",
			"check"   : ((nID==142)?true:false)
		},
		{
			"id"      : 143,
			"text"    : "4:3",
			"check"   : ((nID==143)?true:false)
		},
		{
			"id"      : 144,
			"text"    : "16:9",
			"check"   : ((nID==144)?true:false)
		},
		{
			"id"      : 145,
			"text"    : "16:10",
			"check"   : ((nID==145)?true:false)
		}
	];
	param = JSON.stringify(param);
	return param;
}

function GetVideoMenu(streamType)////文件0、实时流1、录像2、PFS3、国标实时流4、国标录像5、RTSP6；
{
	var text = "";
	switch (streamType)
	{
	case 0:
		text = "关闭本地文件";
		break;
	case 1:
		text = "关闭实时流";
		break;
	case 2:
		text = "关闭录像";
		break;
	case 3:
		text = "关闭PFS文件";
		break;
	case 4:
		text = "关闭国标实时流";
		break;
	case 5:
		text = "关闭国标录像";
		break;
	case 6:
		text = "关闭RTSP流";
		break;
	default:
	    return "";
	}

	var param =[
		{ 
			"id"      : 10,
			"text"    : text
		},
		{
			"id"      : 11,
			"text"    : "数字放大"
		},
		{
			"id"      : 12,
			"text"    : "窗口云台",
			"gray"    : ((streamType==1)?false:true)
		},
		{
			"id"      : 13,
			"text"    : "3D云台",
			"gray"	  : ((streamType==1)?false:true)
		}
		// ,{
		// 	"id"      : 15,
		// 	"text"    : "云台锁定",
		// 	"gray"	  : ((streamType==1)?false:true)
		// }
	];	
	param = JSON.stringify(param);
	return param;
}



function GetVideotype(streamType)
{
	var text = "";
	switch (streamType)
	{
	case 0:
		text = "本地文件";
		break;
	case 1:
		text = "PVG实时流";
		break;
	case 2:
		text = "PVG录像";
		break;
	case 3:
		text = "PFS文件";
		break;
	case 4:
		text = "SIP实时流";
		break;
	case 5:
		text = "SIP录像";
		break;
	case 6:
		text = "RTSP流";
		break;
	default:
	    text = "无视频";
		break;
	}
	return text;
}



function InitToolbarBottom()
{

	var jsonTool = {
				"type": "panel",
				"style": "left-bottom",
				"key": 1,
				"x": "0",
				"y": "0",
				"width": "100%",
				"height": "25px",
				"backColor": "0x242424",
				"transparent": "0.8", 
				"animateTime": "500",  //毫秒值
				"show": false,
				"items": [{
					"type": "button",
					"style": "left-bottom",
					"key": 11,
					"show": true,
					"x": "0",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0xffc800",
					"text": "实时",
					"textColor": "0x000000",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "实时",
					"function": ""
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 12,
					"show": true,
					"x": "40",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0x242424",
					"text": "历史",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "录像",
					"function": "ToolbarPlayRecord"

				},{
					"type": "button",
					"style": "left-bottom",
					"key": 111,
					"show": true,
					"x": "0",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0x242424",
					"text": "实时",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "实时",
					"function": "ToolbarPlayStream"
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 121,
					"show": true,
					"x": "40",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0xffc800",
					"text": "历史",
					"textColor": "0x000000",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "录像",
					"function": ""

				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 112,
					"show": false,
					"x": "0",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0xffc800",
					"text": "文件",
					"textColor": "0x000000",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "文件",
					"function": ""
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 122,
					"show": true,
					"x": "40",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0x242424",
					"text": "片段",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "片段",
					"function": "ToolbarPlayRange"

				},{
					"type": "button",
					"style": "left-bottom",
					"key": 113,
					"show": false,
					"x": "0",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0x242424",
					"text": "文件",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "文件",
					"function": "ToolbarPlayRangeCancel"
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 123,
					"show": true,
					"x": "40",
					"y": "0",
					"width": "40px",
					"height": "100%",
					"backColor": "0xffc800",
					"text": "片段",
					"textColor": "0x000000",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "片段",
					"function": "ToolbarPlayRange"

				},{
					"type": "button",
					"style": "left-bottom",
					"key": 13,
					"show": true,
					"x": "100",
					"y": "2",
					"width": "80px",
					"height": "22px",
					"backColor": "0x3400ff",
					"text": "手动报警",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "",
					"function": "ToolbarAlaram"
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 14,
					"show": false,
					"x": "100",
					"y": "0",
					"width": "15px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "23.png",
						"hover": "24.png",
						"keydown": "23.png",
						"disabled": "23.png"
					},
					"tooltip": "慢放",
					"function": "ToolbarPlaySlow"
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 15,
					"show": false,
					"x": "117",
					"y": "0",
					"width": "15px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "27.png",
						"hover": "28.png",
						"keydown": "27.png",
						"disabled": "28.png"
					},
					"tooltip": "暂停/播放",
					"function": "ToolbarPauseTrue"
				},{
					"type": "button",
					"style": "left-bottom",
					"key": 151,
					"show": false,
					"x": "117",
					"y": "0",
					"width": "15px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "25.png",
						"hover": "26.png",
						"keydown": "25.png",
						"disabled": "26.png"
					},
					"tooltip": "暂停/播放",
					"function": "ToolbarPauseFalse"
				}, {
					"type": "button",
					"style": "left-bottom",
					"key": 16,
					"show": false,
					"x": "134",
					"y": "0",
					"width": "15px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "11.png",
						"hover": "11.png",
						"keydown": "11.png",
						"disabled": "11.png"
					},
					"tooltip": "单帧播放",
					"function": "ToolbarPlayStep"
				},  {
					"type": "button",
					"style": "left-bottom",
					"key": 17,
					"show": false,
					"x": "151",
					"y": "0",
					"width": "15px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "21.png",
						"hover": "22.png",
						"keydown": "22.png",
						"disabled": "21.png"
					},
					"tooltip": "快放",
					"function": "ToolbarPlayFast"
				},{
					"type": "static",
					"style": "left-top",
					"key": 18,
					"show": true,
					"backColor": "0x242424",
					"x": "168",
					"y": "4",
					"width": "40px",
					"height": "100%",
					"text": "x1",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 14
				},{
					"type": "process",
					"style": "right-bottom",
					"key": 19,
					"show": false,
					"x": "62",
					"y": "0",
					"width": "40%",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"backGround": "progessbar-bg.png",
						"backGroundHover": "progressbar.png",
						"playThumb": "11.png",
						"playThumbHover": "11.png",
						"startFlag": "imagejude-before.png",
						"startFlagHover": "imagejude-beforehover.png",
						"endFlag": "imagejude-after.png",
						"endFlagHover": "imagejude-afterhover.png"
					},
					"funPosChange": "ToolbarPosChange",
					"funRangeChange": "ToolbarRangeChange",
					"funMouseOnChannel": "ToolbarMouseOnChannal"
				},{
					"type": "static",
					"style": "right-bottom",
					"key": 101,
					"show": true,
					"backColor": "0x242424",
					"x": "0",
					"y": "-10",
					"width": "60px",
					"height": "100%",
					"text": "0:0:0",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 14
				},{
					"type": "static",
					"style": "right-bottom",
					"key": 102,
					"show": true,
					"backColor": "0x242424",
					"x": "0",
					"y": "0",
					"width": "60px",
					"height": "100%",
					"text": "0:0:0",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 14
				}]
			};
	jsonTool = JSON.stringify(jsonTool);
	return jsonTool;
			
}

function InitToolbarTop()
{
	var jsonTool= {
				"type": "panel",
				"style": "left-top",
				"key": 2,
				"x": "0",
				"y": "0",
				"width": "100%",
				"height": "25px",
				"transparent": "0.8",
				"animateTime": "1000",
				"show": false,
				"backColor": "0x242424",

				"items": [{
					"type": "button",
					"style": "right-top",
					"key": 21,
					"show": true,
					"x": "0",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "8.png",
						"hover": "7.png",
						"keydown": "7.png",
						"disabled": "8.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "关闭",
					"function": "ToolbarStop"

				},{
					"type": "button",
					"style": "right-top",
					"key": 22,
					"show": true,
					"x": "30",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "17.png",
						"hover": "18.png",
						"keydown": "18.png",
						"disabled": "17.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "发送到",
					"function": "ToolbarSendto"

				},{
					"type": "button",
					"style": "right-top",
					"key": 23,
					"show": true,
					"x": "60",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "13.png",
						"hover": "14.png",
						"keydown": "14.png",
						"disabled": "13.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "抓图",
					"function": "ToolbarCapture"

				},{
					"type": "button",
					"style": "right-top",
					"key": 28,
					"show": true,
					"x": "90",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "29.png",
						"hover": "12.png",
						"keydown": "12.png",
						"disabled": "29.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "连拍",
					"function": "ToolbarContinuousCapture"

				},{
					"type": "button",
					"style": "right-top",
					"key": 27,
					"show": true,
					"x": "120",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "1.png",
						"hover": "2.png",
						"keydown": "2.png",
						"disabled": "1.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "声音",
					"function": "ToolbarSoundTrue"

				},{
					"type": "button",
					"style": "right-top",
					"key": 271,
					"show": false,
					"x": "120",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "3.png",
						"hover": "4.png",
						"keydown": "4.png",
						"disabled": "3.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "静音",
					"function": "ToolbarSoundFalse"

				},{
					"type": "button",
					"style": "right-top",
					"key": 24,
					"show": true,
					"x": "150",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",
					"picture": {
						"normal": "10.png",
						"hover": "9.png",
						"keydown": "9.png",
						"disabled": "10.png"
					},
					"text": "",
					"textColor": "0x0000ff",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "放大",
					"leftOrRight": true,
					"upOrDown": false,
					"function": ""
				},{
					"type": "button",
					"style": "right-top",
					"key": 29,
					"show": true,
					"x": "180",
					"y": "0",
					"width": "30px",
					"height": "100%",
					"backColor": "0x242424",

					"picture": {
						"normal": "30.png",
						"hover": "31.png",
						"keydown": "31.png",
						"disabled": "30.png",
					},
					"text": "",
					"textColor": "",
					"font": "宋体",
					"fontSize": 12,
					"tooltip": "云台",
					"function": "ToolbarPTZ"

				},{
					"type": "static",
					"style": "left-top",
					"key": 25,
					"show": true,
		      		"backColor": "0x242424",
					"x": "10",
					"y": "4",
					"width": "70px",
					"height": "100%",
					"text": "无视频",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize": 14
				},{
					"type": "static",
					"style": "left-top",
					"key": 26,
					"show": true,
		      		"backColor": "0x242424",
					"x": "80",
					"y": "4",
					"width": "120px",
					"height": "100%",
					"text": "0bps",
					"textColor": "0xffffff",
					"font": "宋体",
					"fontSize":14
				}]
			};
	jsonTool = JSON.stringify(jsonTool);
	return jsonTool;
}


function isFile(streamType)
{
	if(streamType==1 || streamType==4){
		return false;
	}
	return true;
}

function isRange(streamType)
{
	if(streamType==0||streamType==3){
		return true;
	}
	else
		return false;
}

function isStream(streamType)
{
	if(streamType==1 || streamType==4){
		return true;
	}
	return false;
}

function isRecord(streamType)
{
	if(streamType==2 || streamType==5){
		return true;
	}
	return false;
}

function GetVideToolbarObjs(streamType, brange)
{
	var toolbarinfo = toolbarinfo = [{
			"key":11,//实时中
			"show":isStream(streamType),
			"enable":true,
			"status":0
			},{
			"key":12,//历史
			"show":isStream(streamType),
			"enable":true,
			"status":0
			},{
			"key":111,//实时
			"show":isRecord(streamType),
			"enable":true,
			"status":0
			},{
			"key":121,//历史中
			"show":isRecord(streamType),
			"enable":true,
			"status":0
			},{"key":112, //文件中
			"show":(isRange(streamType) && !brange),
			"enable":true,
			"status":0
			},{
			"key":122,//片段
			"show":(isRange(streamType) && !brange),
			"enable":true,
			"status":0
			},{
			"key":113, //文件
			"show":(isRange(streamType) && brange),
			"enable":true,
			"status":0
			},{
			"key":123,//片段中
			"show":(isRange(streamType) && brange),
			"enable":true,
			"status":0
			},{
			"key":13,//实时警报
			"show":isStream(streamType),
			"enable":true,
			"status":0
			},{
			"key":14,// 慢放
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":15,//暂停
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":151,//恢复播放
			"show":false,
			"enable":true,
			"status":0
			},{
			"key":16,//单帧
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":17,//快放
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":18,//速度
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":19,//进度条
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":101,//总时长
			"show":isFile(streamType),
			"enable":true,
			"status":0
			},{
			"key":102,//播放时长
			"show":isFile(streamType),
			"enable":true,
			"status":0
			}
		];
	//toolbarinfo = JSON.stringify(toolbarinfo);
	return toolbarinfo;
}

function getRangeToolbarObjs(streamType, brange)
{
	var toolbarObjs = [
			{"key":112,//文件中
			"show":(isRange(streamType) && !brange),
			"enable":true,
			"status":0
			},{
			"key":122,//片段
			"show":(isRange(streamType) && !brange),
			"enable":true,
			"status":0
			},{
			"key":113,//文件
			"show":(isRange(streamType) && brange),
			"enable":true,
			"status":0
			},{
			"key":123,//片段中
			"show":(isRange(streamType) && brange),
			"enable":true,
			"status":0
			}];
	return toolbarObjs;
}


function GetPtzWebinfo()
{
	var dir = GetfolderPath();
	var info = {
		"url":dir+"ptzweb.html", //网址  
		"center":true, //true,false  是否居中，如果center为false，则设置left,top,定位
		"left":0,  //单位像素
		"top":200, 
		"width":280,  //宽度
		"height":345,// 高度
		"alpha":0.2,// 透明度
		"resize":true,//可以拖动大小 
		"movingwithinpage":true, //页面内移动
		"modal":false, //模式粗航口
		"border":{  //边框
			"width":2, //粗细
			"color":0x00ff00ff  // RGB颜色
		}, 
		"title":{  //标题
			"text":"云台控制" ,
			"textcolor":0,
			"font":"微软雅黑",
			"fontsize":12,
			"color": 0x00F5F5DC,// RGB颜色,
			"height":30 ,
			"leftmargin":17
		}, 
		"closebtn":{  //关闭按钮
			"rightmargin":10,
			"show":true //是否显示按钮
		} , 
		"minbtn":{  //最小化按钮
			"rightmargin":10,
			"show":true //是否显示按钮
		} 
	}

	return JSON.stringify(info);

}