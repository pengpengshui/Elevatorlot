
var loginer='admin1';
/*var configSet='http://172.16.1.19:8099';
//var configSet='http://172.16.20.254:8099';
//var socktUrl='ws://172.16.20.254:9009';
var socktUrl='ws://172.16.1.19:9009';*/
//轮询秒数，
/*var lunXunSeconds=5000;*/

var configSet='';
var socktUrl='';
var lunXunSeconds='';
var mapUrl='';
//设置登录标识
var login=false;

$.getJSON('../config.json',function (data) {
  configSet=data.configSet;
  socktUrl=data.socktUrl;
  lunXunSeconds=data.lunXunSeconds;
  mapUrl=data.mapUrl;
})

$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


//登录页面
$('#userName').focus(function(){
	$('.icon-icon_login_user').css('color','#30ADDC')
})
$('#userName').blur(function(){
	$('.icon-icon_login_user').css('color','#9A9A9A')
}); 

$('#passWord').focus(function(){
	$('.icon-icon_login_pwd').css('color','#30ADDC')
})
$('#passWord').blur(function(){
	$('.icon-icon_login_pwd').css('color','#9A9A9A')
});


/*获取数据*/
var getData=function (url,callback) {
  $.get(url,function (data) { 
    //当获取数据失败或者暂无数	据时
    if (data.Code === 0) { 
    	if(data.Msg==='系统繁忙请稍后再试！'|| data.Msg =='该楼宇下有电梯信息，暂不能删除！'){
      		alert(data.Msg);
      }else{
      		callback(data.Msg,data.num);
      		return;
      }
    }
    if (data.Code === 1) {
      //获取第一页数据
      if (data.Obj){
        callback(data.Obj,data.num);
        return;
      }else {
        //添加删除执行
        //alert(data.Msg);
        if (data.Msg == '删除成功！'){
          $('#tipsCon').text(data.Msg);
          $('#deleteDataModel').modal('show');
          setTimeout(function () {
            $('#deleteDataModel').modal('hide');
          },1000)
        }
        callback();
        return;
      }
    }
  })
}

//表格的数据填充
 var tableData=function (Obj,$tbody,$tbodyinf) {
    if (Obj === '暂无数据！'){
      $tbody.html('<tr><td colspan=\'10\' class=\'text-center\'>'+Obj+'</td></tr>');
    }else {
      var myTemplate = Handlebars.compile($tbodyinf.html());
      $tbody.html(myTemplate(JSON.parse(Obj)));
    }
  }
 
//json数据与input、select、radio数据匹配
//Num:1是input和radio，2是select
var editInput=function (jsonObj,ele,num) {
  for(var k in jsonObj){
    if (num == '1') {
      for(var i=0;i<ele.length;i++){
        if (k === ele[i].name){
        	if(ele[i].type ==='radio'){
        		var val = jsonObj[k];
          	$('#addForm').find($('input[name='+k+'][value='+val+']')).prop('checked',true).siblings().removeAttr('checked');
        	}else{
        		ele[i].value=jsonObj[k];
        	}
        }
      }
  	}else if(num=='2'){
  		for(var i=0;i<ele.length;i++){
	    	if(k === ele[i].name){
	    		var id =jsonObj[k];
	    		$(ele).find($('option[value='+id+']')).prop('selected',true).siblings().removeAttr('selected');

	    	}
	    }	
    }
	}
}

//下拉框
function Option(url,$select,name,id,dataValue){
 	getData(url,function (Obj,pageNum) {
		var data = JSON.parse(Obj)
		data.forEach(function(ele,index){
			var op=$('<option/>').html(ele[name]).attr({'value':ele[id],'dataCoo':ele[dataValue]});
//			console.log(op)
			$select.append(op)
		})
   })
 }
 
//显示 提交/修改按钮，显示弹框头部信息
var toggle=function (btn,id,text1){
		if(btn =='add'){
			$('#addModelBtn').removeClass('hide');
			$('#editModelBtn').addClass('hide');
			$(id).find($('.modal-title')).html(text1);
		}else if(btn == 'edit'){
			$('#addModelBtn').addClass('hide');
			$('#editModelBtn').removeClass('hide');
			$(id).find($('#gridSystemModalLabel')).html(text1);
		}
	}

/*提交数据*/
var postData=function (url,data1,callback) {
  $.ajax({
    type: 'POST',
    url:url,
    data: data1,
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
      if (data.Code === 0) {
      	if(data.Msg === '用户名不存在！' || data.Msg === '密码不正确！' ){
      			callback(data.Msg)
      	}else if(data.Msg === '暂无数据！'){
      		callback(data.Msg,data.num)
      		 $('.page').hide()
      	}else{
      		alert(data.Msg);
      	}
        return;
      };
      if (data.Code === 1) {
      	if(data.Msg === '登录成功!'){
      			callback(data.Msg,data.Obj)
      	}else if(data.Obj){
      		 callback(data.Obj,data.num);
        	return;
      	}else{
      		//alert(data.Msg);
          if (data.Msg == '修改成功！' || data.Msg== '添加成功！' ){
            $('#tipsCon').text(data.Msg);
            $('#deleteDataModel').modal('show');
            setTimeout(function () {
              $('#deleteDataModel').modal('hide');
            },1000)
          }
      		callback();
        return;
      	}
      }
      return;
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest, textStatus, errorThrown);
    }
  })
}

//post方法获取列表数据方法
function getData2(id,url,pagenum,tbId,tbIf){
	var formse = $(id).serializeObject();
			formse.Inquire = $.trim($('.search-wrap input').val());
	  	formse.pagesize = pageSize;
      formse.pagenum = pagenum;
      formse.loginer=loginer;
	postData(url, JSON.stringify(formse),function (Obj,pageNum) {
     tableData(Obj,$(tbId), $(tbIf));
     pageFun(pageNum)
  })
}

//post方法获取列表数据方法
function getDataByPost(id,url,pagenum,tbId,tbIf,ele){
	var formse = $(id).serializeObject();
	var searchVal = $(id).find('.search-wrap input').val()
			formse.Inquire = $.trim(searchVal);
	  	formse.pagesize = pageSize;
      formse.pagenum = pagenum;
      formse.loginer=loginer;
	postData(url, JSON.stringify(formse),function (Obj,pageNum) {
     tableData(Obj,$(tbId), $(tbIf));
     pageFun2(pageNum,ele)
  })
}

//判断添加必填项是否为空
function required(length,form,promts){
	for (var i=0;i<length;i++){
        var ele = form.elements[i];
        var value = $.trim(ele.value);
        var msg = ele.parentElement.previousElementSibling.textContent;
        if(value == ''){ 
//         alert(msg + "不能为空!"); 
					$('#prompts').html(msg+ '不能为空!')
          if(promts){
            $(promts).html(msg+ '不能为空!')
          }
           ele.focus();
           return false; 
        }
    }
	return true;
}

//单位管理搜索函数
var searchValue = '';
function searchFn(url){
	searchValue = $.trim($('.search-wrap input').val());
	var searchUrl = url+searchValue;
	getTableData(searchUrl)  
}

//正则验证：
//手机号
var phoneNumber = /^1[34578]\d{9}$/;
//固话
var Landline = /^\d{2,5}-\d{7,8}$/;
//楼层
var integer = /^[1-9][\d]*$/;
//载重
var weight = /^[1-9]\d*(\.\d+)?$/;
//IP（1~255）.（0~255）.（0~255）.（0~255）的格式
var ipReg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;


//label 数据展示
var labelData=function ($div,data) {
  var labels=$div.find('label');
  for (var i=0;i<labels.length;i++){
    $(labels[i]).next().text(data[$(labels[i]).attr('label-data')]);
    $(labels[i]).next().attr('title',data[$(labels[i]).attr('label-data')]);
  }
}

  //复选框点击事件
  var fullCheckedFun=function () {
    $('input.fullChecked').on('ifChecked', function () {
      $('#tbody2').find('input[type="checkbox"]').iCheck('check');
    });
    $('input.fullChecked').on('ifUnchecked', function () {
      $('#tbody2').find('input[type="checkbox"]').iCheck('uncheck');
    });
  }

 var builder=(function () {
  //楼宇数量的点击事件
  //显示小区下的楼宇
  //url:根据小区id；$modal:弹层，$tbody:表格的数据展示区域；$tbodyinfo:表格模板的
  var builderSelected=function (url, $modal,$tbody,$tbodyinf) {
    getData(url,function (Obj) {
      $modal.modal('show');
      tableData(Obj,$tbody, $tbodyinf);
      //$tbody.attr("data-disid",estId);
    })
  };
    //添加关联楼宇
   //disId 小区id； $tbody:表格的数据展示区域；callback回掉
  var addElevator=function($tbody,disId,callback) {
       var buildArr={'arr':[]};
       var tr=$tbody.find('tr');
       for(var i=0;i<tr.length;i++){
         if ($(tr[i]).find('input').is(':checked')){
         var estId=$(tr[i]).attr('data-estId');
         var info={'EstId':estId,'EstDisId':disId,'EstUpdater':loginer};
         buildArr.arr.push(info);
         }
       }
       callback(JSON.stringify(buildArr.arr));
     };
  //保存已添加的楼宇的id
   var oldBuilder=function ($tbody) {
     var tr=$tbody.find('tr');
     var idArr=[];
     for(var i=0;i<tr.length;i++){
       idArr.push($(tr[i]).attr('data-estId'));
     }
     return idArr;
   };

   var compareId=function ($tbody1,$tbody2) {
     var oldIdArr=oldBuilder($tbody1);
     var newtr=$tbody2.find('tr');
     var j=0;
     for(var i=0;i<newtr.length;i++){
       if (oldIdArr.indexOf($(newtr[i]).attr('data-estId')) > -1){
         $(newtr[i]).find('input[type="checkbox"]').iCheck('check');
         j++;
       }
     }
     if (j==newtr.length){
       $('input.fullChecked').iCheck('check');
     }else {
       $('input.fullChecked').iCheck('uncheck');
     }
   }

    //复选框全选/全不选
    var fullCheckeds=function ($tbody2){
      $('input.fullChecked').on('ifChecked', function () {
        $tbody2.find('input[type="checkbox"]').iCheck('check');
      });
      $('input.fullChecked').on('ifUnchecked', function () {
        $tbody2.find('input[type="checkbox"]').iCheck('uncheck');
      });
    }

  return{
    builderSelected:builderSelected,
    fullChecked:fullCheckeds,
    addElevator:addElevator,
    oldBuilder:oldBuilder,
    compareId:compareId
  };
})()

//websocket connetction
var socket1={};//设置空对象
var createSocket=function(address) {

  var socket = new WebSocket(address);
 socket.onopen = function () {
   console.log('Connection to server opened');
   socket.send(loginer);
   };
 /*  socket.onmessage=function (e) {
    console.log(e)
  };*/
  socket.onerror = function (e) {
    console.log('Error creating WebSocket connection to ' + address);
    console.log(e);
  }

  socket.onclose = function (e) {
    if (e.target == socket) {
      console.log('Disconnected.');
    }
  }
  return socket;
}

//openlayer地图
var openMaps= function() {
  var zeroPad =function (num, len, radix) {
    var str = num.toString(radix || 10).toLocaleUpperCase();
    while (str.length < len)
    {
      str = '0' + str;
    }
    return str;
  }
  // 我们需要一个vector的layer来放置图标
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector()
  });

  var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees'
  });
  var firstlayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      tileUrlFunction: function (tileCoord) {
        var x = tileCoord[1];
        var y = -tileCoord[2] - 1;
        var z = tileCoord[0];
        return mapUrl+'/TDT/' + z + '/' + x + '/' + y + '.png';
      },
      projection:'EPSG:4326'
    })
  });
  var secondlayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      tileUrlFunction: function (tileCoord) {
        var x = 'C' + zeroPad(tileCoord[1], 8, 16);
        var y = 'R' + zeroPad(-tileCoord[2] - 1, 8, 16);
        var z = 'L' + zeroPad(tileCoord[0], 2, 10);
        return mapUrl+'/v101/Layers/_alllayers/' + z + '/' + y + '/' + x + '.png';
      }
    })
  });

  var map = new ol.Map({
    target: 'map',
    layers: [
      //secondlayer,
      firstlayer,
      layer
    ],
    logo:false,
    view: new ol.View({
      /*  旋转角度
       rotation: Math.PI / 6,*/
      extent: [115.55, 39.554361777, 117.27, 40.993621790],
       /*坐标系
       center: ol.proj.fromLonLat([116.3975, 39.9087]), */
      center: [116.3975, 39.9087],
      projection: 'EPSG:4326',
      zoom: 12,
      minZoom: 11,
      maxZoom: 17
    })
  });
  return {map:map,layer:layer};
}

//获取经纬度
var getPoints=function (map,callback) {
  // 监听singleclick事件
  map.on('singleclick', function(event){
    // 通过getEventCoordinate方法获取地理位置，再转换为wgs84坐标，并弹出对话框显示

    var feature = map.forEachFeatureAtPixel(event.pixel, function(feature){
      return feature;
    });
    if (feature) {
      // 将空心五星为红色实心五星
      map.getView().setZoom(17);
      map.getView().setCenter(event.coordinate);
    }
    else
    {
//    alert(event.coordinate);
      callback(event.coordinate)
    }
  })
}

var lunxunInterval=null;
var version='';
var pvaFun=function (callback) {
  $.get('../plugins/np_pva/index.js', function () {
    $.get('../plugins/np_pva/posa.js', function () {
      $.get('../plugins/np_pva/basefunction.js', function () {
        if (version){
          version=GetVersion();
        }
        if (lunxunInterval){
          clearInterval(lunxunInterval);
        }
        callback();
      });
    });
  });
}
//分页
var pageSize=10;

function  pageFun(pageNum) {
	$('.Next').unbind('click'); //移除click
	if(!pageNum){
    	$('.page').hide();
    	return;
  }
  $('.pageWrap>span').html('共'+pageNum+'条数据');
  if (pageNum<=pageSize){
    if(!$('.icon-icon_daochu').length){
    	$('.page').hide()
    }else{
    	$('.page').show()
    	$('.pageWrap').hide();
    }
    return;
  }else {
    var html='';
    $('.page').show()
    $('.pageWrap').show();
    var pageCount=Math.ceil(pageNum / pageSize) ;
    //当小于等于五页的时候，pre与next都隐藏
    if (pageCount <= 5){
      //console.log(pageCount)
      $('.page .count').remove();
      for(var i=1;i<=pageCount;i++){
        html+='<li><a href="#" class="count">'+i+'</a></li>'
      }
      $('.Previous').after(html);
      $('.Previous').css('display','none');
      $('.Next').css('display','none');
    }
    //当dayu五页的时候，pre与next都显示
    if(pageCount >5){
    	$('.page .count').remove();
      var i=1;
      var j=1;
      $('.Previous').css('display','inlinelock');
      $('.Next').css('display','inlineBlock');
      for(i=j;i<=5;i++,j++){
        html+='<li class="count"><a href="#">'+i+'</a></li>'
      }
      //console.log('firstj:',j);
      $('.Previous').after(html);
      //向后点击事件
      $('.Next').click(function () {
        $(this).removeClass('disabled');
        $('.Previous').removeClass('disabled')
        var lastCount=parseInt($(this).prev().text());
        var html='';var i=0;

        if (lastCount<pageCount){
          for(i=lastCount+1;i <= lastCount+5;i++){
            html+='<li class="count"><a href="#">'+i+'</a></li>';
            if(i==pageCount){
              break;
            }
          }
        }else{
          $(this).addClass('disabled');
          return;
        }
        $('.page .count').remove();
        $('.Previous').after(html);
      })
      //向前点击事件
      $('.Previous').click(function () {
        $(this).removeClass('disabled');
        $('.Next').removeClass('disabled')
        var html='';var i=0;
        var firstCount=parseInt($(this).next().text());
        if (firstCount >1){
          for(i=firstCount-5;i<firstCount;i++){
            html+='<li class="count"><a href="#">'+i+'</a></li>';
          }
        }else {
          $(this).addClass('disabled')
          return false;}
        $('.page .count').remove();
        $('.Previous').after(html);
      })
    }
  }
}

function  pageFun2(pageNum,ele) {
	$(ele).find('.Next').unbind('click'); //移除click
  if(!pageNum){
    	$(ele).hide();
    	return;
  }
  if (pageNum<=pageSize){
  	if(!$('.icon-icon_daochu').length){
    	 $(ele).hide()
    }else{
    	$(ele).show()
    	$(ele).find('.pageWrap').hide();
    }
    return;
  }else {
    var html='';
    $(ele).show()
    $(ele).find('.pageWrap').show();
    var pageCount=Math.ceil(pageNum / pageSize) ;
    //当小于等于五页的时候，pre与next都隐藏
    if (pageCount <= 5){
      //console.log(pageCount)
      $(ele).find('.count').remove();
      for(var i=1;i<=pageCount;i++){
        html+='<li><a href="#" class="count">'+i+'</a></li>'
      }
      $(ele).find('.Previous').after(html);
      $(ele).find('.Previous').css('display','none');
      $(ele).find('.Next').css('display','none');
    }
    //当dayu五页的时候，pre与next都显示
    if(pageCount >5){
    	$(ele).find('.count').remove();
      var i=1;
      var j=1;
      $(ele).find('.Previous').css('display','inlineBlock');
      $(ele).find('.Next').css('display','inlineBlock');
      for(i=j;i<=5;i++,j++){
        html+='<li class="count"><a href="#">'+i+'</a></li>'
      }
      //console.log('firstj:',j);
      $(ele).find('.Previous').after(html);
      //向后点击事件
      $(ele).find('.Next').click(function () {
        $(this).removeClass('disabled');
        $(ele).find('.Previous').removeClass('disabled');
        var lastCount=parseInt($(this).prev().text());
        var html='';var i=0;

        if (lastCount<pageCount){
          for(i=lastCount+1;i <= lastCount+5;i++){
            html+='<li class="count"><a href="#">'+i+'</a></li>';
            if(i==pageCount){
              break;
            }
          }
        }else{
          $(this).addClass('disabled');
          return;
        }
        $(ele).find('.count').remove();
        $(ele).find('.Previous').after(html);
      })
      //向前点击事件
      $(ele).find('.Previous').click(function () {
        $(this).removeClass('disabled');
        $(ele).find('.Next').removeClass('disabled');
        var html='';var i=0;
        var firstCount=parseInt($(this).next().text());
        if (firstCount >1){
          for(i=firstCount-5;i<firstCount;i++){
            html+='<li class="count"><a href="#">'+i+'</a></li>';
          }
        }else {
          $(this).addClass('disabled')
          return false;}
        $(ele).find('.count').remove();
        $(ele).find('.Previous').after(html);
      })
    }
  }
  $(ele).find($('.pageWrap>span')).html('共'+pageNum+'条数据');
}

var dataInit=function ($start,$end) {
  var start1 = {
    elem: $start,
    format: 'YYYY-MM-DD hh:mm:ss',
    max: laydate.now(), //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
     /* end1.min = datas; //开始日选好后，重置结束日的最小日期
      end1.start = datas //将结束日的初始值设定为开始日*/
    }
  };
  var end1 = {
    elem: $end,
    format: 'YYYY-MM-DD hh:mm:ss',
    max: laydate.now(),
    istime: true,
    istoday: false,
    choose: function(datas){
      /*start1.max = datas; //结束日选好后，重置开始日的最大日期*/
    }
  };
  laydate(start1);
  laydate(end1);

/*  var startVal= $($start).val();
  var endVal=$($end).val();
  var starArr=startVal.split(" ")[0].split("-");
  var endArr=endVal.split(" ")[0].split("-");
  if (parseInt(starArr)[0]>parseInt(endArr)[0] || parseInt(starArr)[1] >parseInt(endArr)[1] || parseInt(starArr)[2]> parseInt(endArr)[2]){
    alert("结束时间不能小于开始时间");
    $($end).val();
  }*/
  /*if ()*/
}



