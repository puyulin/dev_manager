$(function(){
		$("#form_save_id").validate({
			rules:
			{
				'name':
				{
					required: true
				},
				'code':
				{
					required: true
				},
				'brand':{
					required:true,
				},
				'price':
				{
					required: true,
				}
				
			},
			messages:
			{
				'name':
				{
					required:"商品名称不能为空"
				},
				'code':
				{
					required:"商品编号不能为空"
				},
				'brand':{
					required:"商品品牌不能为空"
				},
				'price':
				{
					required:"商品价格不能为空"
				}
			}
		});
});

var TradePage = Venus.pageInit("TradePage");

TradePage.add = function(){
	if($("#form_save_id").valid()){
		Venus.showLoading();
		$.ajax({
			url:ctx+'/trade/save.do',
			type:'post',
			data:$("#form_save_id").serializeArray(),// 你的formid
			dataType:'json',
			timeout:25000,
			cache:false,
			success:function(result){
				Venus.hideLoading();
				if(result["isSuccess"]){
					//Venus.load("#left","${ctx}/master/getMasterTreeList.do?orgId="+orgid);
					bootbox.alert("添加成功!");
					Venus.load('#main','${ctx }/trade/gotoUpdate.do');
				}else if(result == "OPT_ERROR"){
					bootbox.alert("您的请求操作有异常");
				}else{
					bootbox.alert(isNull(result)?"您的请求操作有异常,请重新操作":result);
				}
			},
			error:function(result){
				Venus.hideLoading();
				bootbox.alert("系统错误，请稍后重试");
			}
		});
	}
};



TradePage.uploadImg = function(obj){
	    var index=$(obj).attr("imgIndex");
		jQuery("#icon_up").attr("disabled","disabled");
		jQuery.ajaxFileUpload({
			url:ctx+"/trade/upImg.do?index="+index,
			dataType:"text",
			secureuri:false,
			fileElementId:'img_path_'+index,
			success: function (data)
			{
				var result = jQuery.parseJSON(data);
				if(result["resultType"]=="SUCCESS"){
					bootbox.alert("上传成功!");//"上传成功!"
					if($("input[name='trade_imgpath_"+index+"']")){
						var imgid = result["imgid"];
						$("input[name='trade_imgpath_"+index+"']").val(imgid);//修改为数据库二进制流存储
					}
					
				}else{
					bootbox.alert("失败!");
				}
			},
			error: function (data, status, e)
			{	
				debugger;
				jQuery(obj).removeAttr("disabled");
				bootbox.alert("系统错误，请稍后重试！");//"系统错误，请稍后重试！"
			}
		});
	};
	
TradePage.viewImg = function(){
	var imgpath = jQuery("input[name='appManager.imgpath']").val();
	if(isNull(imgpath) || imgpath.indexOf("browser") > 0){
		bootbox.dialog({
			message: "<img style=\"width:50px;height:50px\" src=\""+ctx+"/resources/foura/images/web/resmanager/browser.png?_="+new Date().getTime()+"\">",
			size:'small',
			title:Venus.i18nMsg("m_resmanager_js_preImg_default"),//默认图标
			buttons: {
				main: {
					label: Venus.i18nMsg("m_resmanager_js_preImg_close"),//关闭
					className: "btn-closed",
					callback: function() {
						return true;
					}
				}
			}
		});
	}else{
		bootbox.dialog({
			//message: "<img style=\"width:50px;height:50px\" src=\""+ctx+""+imgpath+"?_="+new Date().getTime()+"\">",
			message: "<img style=\"width:50px;height:50px\" src=\""+ctx+"/sysfile/outputCacheFile.do?moduleid=appManager&id="+imgpath+"&_t="+new Date().getTime()+"\">",
			size:'small',
			title:Venus.i18nMsg("m_resmanager_js_preImg_custom"),//自定义图标
			buttons: {
				main: {
					label: Venus.i18nMsg("m_resmanager_js_preImg_close"),//关闭
					className: "btn-closed",
					callback: function() {
						return true;
					}
				}
			}
		});
	}
};