var $windowModel; // 窗体的样例
var WINDOW_ID_PREFIX = "popWin";
var gbl_window_zIndex = 1100;
// 页面加载完以后，初始化各种方法
jQuery(function() {
	var $body = jQuery("body");
	$windowModel = jQuery("#windowModelDiv");
    
    // 初始化弹出框
	init_ui_dialog($body);
	
	//自定义手机号码校验规则
	jQuery.validator.addMethod("isMobile", function(value, element) {       
	     var length = value.length;   
	    var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;   
	   return this.optional(element) || (length == 11 && mobile.test(value));       
	}, "请正确填写您的手机号码");    
    jQuery.validator.addMethod("checkStr",function(value,element){
    	var length = value.length;
    	var strRex = /^([a-zA-Z]+)$/;
    	return this.optional(element) || (strRex.test(value));
    }, "只能输入英文");
    jQuery.validator.addMethod("checkCN",function(value,element){
    	var length = value.length;
    	if(length < 1)return false;
    	var strRex = /[^\u4E00-\u9FA5]/g;
    	return this.optional(element) || !(strRex.test(value));
    }, "只能输入中文");
    jQuery.validator.addMethod("checkCNname",function(value,element){
    	var length = value.length;
    	if(length < 1)return false;
    	var strRex = /^[_0-9a-zA-Z\u4E00-\u9FA5]+$/;
    	return this.optional(element) || (strRex.test(value));
    }, "只能由字母、数字、下划线及中文组成");
    jQuery.validator.addMethod("checkName",function(value,element){
    	var length = value.length;
    	if(length < 1)return false;
    	var strRex = /^[_0-9a-zA-Z-.]+$/;
    	return this.optional(element) || (strRex.test(value));
    }, "只能由字母、数字、下划线、英文中划线组成");
    jQuery.validator.addMethod("checkIp",function(value,element){
    	var length = value.length;
    	if(length < 1)return false;
    	var strRex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    	return this.optional(element) || (strRex.test(value));
    }, "IP地址的格式不合法");
    jQuery.validator.addMethod("EN_CN_SN",function(value,element){
    	var strRex = /^[_0-9a-zA-Z\u4E00-\u9FA5-\-\(\)\[\].]*$/;
    	return this.optional(element) || (strRex.test(value));
    },"只能是中文、英文、数字、下划线、中划线、小数点、圆括号、中括号组成");
    jQuery.validator.addMethod("EN_CN",function(value,element){
    	var length = value.length;
    	if(length < 1)return false;
    	var strRex = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    	return this.optional(element) || (strRex.test(value));
    }, "只能由中文、英文和数字组成");
    jQuery.validator.addMethod("unCnCode",function(value,element){
    	var strRex = /^[_0-9a-zA-Z\u4E00-\u9FA5-\-\(\)\[\].@#\%&\*\+\-]*$/;
    	return this.optional(element) || (strRex.test(value));
    },"只能是中文、英文、数字、下划线、中划线、小数点、圆括号、中括号、(@#%&*+-)组成");
    jQuery.validator.addMethod("UN_CN",function(value,element){
    	var strRex = /[^\u4E00-\u9FA5]/;
    	return this.optional(element) || (strRex.test(value));
    },"密码不能包含中文");
});

/**
 * 初始化弹出框
 * @param contextObj 上下文对象(jquery对象)
 */
function init_ui_dialog($contextObj) {
	
	// 初始化动作
	$contextObj.click(function(event) {
		var $this = jQuery(event.target).closest("a");
	    if($this.attr("openMode")=="logout")
	    {
	    	return;
	    }
	    
		if ($this.attr("openMode")=="rightPage") {
			_openRightPage($this);
			// 防止页面跳转
			return false;
		}
		
		// 以dialog方式打开
		if ($this.attr("openMode") == "dialog") {
			gbl_closeWindow_callBack = function() {
			};
			_open_dialog($this);
			return false;
		} 
		
	});
}


//在右侧打开连接页面
function _openRightPage($this)
{
    //切换样式
	if(($this.attr("optMenu")) == "true")
	{
		changeMenuStyle($this);
	}
    _rightLoad($this.attr("href"),null);
	
}

//切换选中menu样式
function changeMenuStyle($thisMenu)
{
    jQuery('li').has('a').removeClass('active');
    
    //匹配当前选中的a节点邻近的第一个li节点
    $thisMenu.closest('li').addClass('active');
    
    jQuery("#span_menuOneLevel").html($thisMenu.attr("parentMenu"));
    jQuery("#span_menuTwoLevel").html($thisMenu.attr("presentMenu"));
    
}


/**
*将url执行后返回的信息加载到loadPosition参数指定的位置
*/
function selfLoad(url, data, loadPosition) {
	var l_data = {};
	if (data != null && data != "") {
		l_data = data;
	}
	// 加载内容
	var $rightBody = jQuery(loadPosition);
	showLoadingMsg();
	$rightBody.load(url, l_data, function(result, status) {
		if (status == "success") {
			jQuery(this).find("input:text:visible").attr("autocomplete","off");
			_selfshowPageNum(loadPosition);
			lui_showPlaceholder();
			setSelectStatus();
			removeLoadingMsg();
			return false;
		} else {
			bootbox.alert("您的请求操作有异常", function(alertResult) {
				location.reload();
			});
			return false;
		}
	});
}

/**
*将url执行后返回的信息加载到loadPosition参数指定的位置,不支持分页
*/
function selfLoadInfo(url, data, loadPosition) {
	var l_data = {};
	if (data != null && data != "") {
		l_data = data;
	}
	// 加载内容
	var $rightBody = jQuery(loadPosition);
	showLoadingMsg();
	$rightBody.load(url, l_data, function(result, status) {
		if (status == "success") {
			lui_showPlaceholder();
			removeLoadingMsg();
			return false;
		} else {
			bootbox.alert("您的请求操作有异常", function(alertResult) {
				location.reload();
			});
			return false;
		}
	});
}

function _rightLoad(url,data)
{
	selfLoad(url,data,"#vf_loadRight");
}

//使用ajax方式提交表单,并刷新(或转向)指定的列表页面
function ajaxSubmitAndRefresh(formId,refreshUrl)
{
	$formObj = jQuery("#"+formId);
	showLoadingMsg();//加载等待信息
	$formObj = jQuery("#"+formId);
	// 加载内容
	var $rightBody = jQuery('#vf_loadRight');
	$rightBody.load($formObj.attr("action"), $formObj.serializeArray(), function(result,status){
		if (result == "OPT_SUCCESS") {
			if(refreshUrl!="" && refreshUrl!=null)
			{
				removeLoadingMsg();
				//刷新(或转向)
				_rightLoad(refreshUrl,null);
				_showGritter();
			}
			return false;
		}else if(result == "OPT_ERROR") {
			bootbox.alert("操作失败，<br>请检查相关数据信息是否正确.",function(result) {
				_rightLoad(refreshUrl,null);
			});
			return false;
		}else{
			bootbox.alert(result+"",function(result) {
				removeLoadingMsg();
				_rightLoad(refreshUrl,null);
			});
			return false;
		}
	});
}
//使用ajax方式提交表单,并刷新(或转向)指定的列表页面
function ajaxSubmitAndRefreshSelf(formId,refreshUrl,loadPosition)
{	
	$formObj = jQuery("#"+formId);
	showLoadingMsg();//加载等待信息
	$formObj = jQuery("#"+formId);
	// 加载内容
	var $rightBody = jQuery(loadPosition);
	$rightBody.load($formObj.attr("action"), $formObj.serializeArray(), function(result,status){
		if (result == "OPT_SUCCESS") {
			if(refreshUrl!="" && refreshUrl!=null)
			{
				removeLoadingMsg();
				//刷新(或转向)
				condition_search_self(refreshUrl,loadPosition);
//				var $rightBody = jQuery(loadPosition);
//				$rightBody.load(refreshUrl, jQuery("div[id='div_condition_search'] input,select").serializeArray(), function(){
//					_selfshowPageNum(loadPosition);
//				});
				_showGritter();
			}
			return false;
		}else if(result == "OPT_ERROR") {
			removeLoadingMsg();
			bootbox.alert("操作失败，<br>请检查相关数据信息是否正确.",function(result) {
			});
			condition_search_self(refreshUrl,loadPosition);
			return false;
		}else if(result == "OPT_SYN_ERROR") {
			removeLoadingMsg();
			bootbox.alert("同步操作失败，<br>请检查相关数据信息是否正确.",function(result) {
			});
			condition_search_self(refreshUrl,loadPosition);
			return false;
		}
		removeLoadingMsg();//关闭遮挡层
	});
}

//使用ajax方式提交表单,并执行指定的function函数
function ajaxSubmitAndFunc(formId,func)
{
	$formObj = $("#"+formId);
	// 加载内容
	var $rightBody = $('#vf_loadRight');
	$rightBody.load($formObj.attr("action"), $formObj.serializeArray(), function(result,status){
		if (result == "OPT_SUCCESS") {
			eval(func+'()');
			return false;
		}else if(result == "OPT_ERROR") {
			bootbox.alert("操作失败，<br>请检查相关数据信息是否正确.",function(result) {
				
			});
			return false;
		}
	});
}

//刷新(或转向)指定的列表页面
function ajaxRefresh(hrefUrl,refreshUrl)
{
	ajaxTreeRefresh(hrefUrl,refreshUrl,{});
}

//刷新(或转向)指定的列表页面,param为提交的参数
function ajaxTreeRefresh(hrefUrl,refreshUrl,param)
{
	// 发送ajax请求，
	jQuery.post(hrefUrl, param, function(result) {
		if (result == "OPT_SUCCESS") {
			if(refreshUrl!="" && refreshUrl!=null)
			{
				//刷新(或转向)
				_rightLoad(refreshUrl,null);
				_showGritter();
			}
			return false;
		}else {
			bootbox.alert("操作失败，<br>请检查相关数据信息是否正确.",function(result) {
				
			});
			return false;
		}
	});
}

//刷新(或转向)指定的列表页面
/**
function ajaxRefresh_oldddd(formId,refreshUrl)
{
	//alert(jQuery("#"+formId).serializeArray());
	$formObj = jQuery("#"+formId);
	// 发送ajax请求，
	jQuery.post($formObj.attr("action"), $formObj.serializeArray(), function(result) {
		
		if (result == "OPT_SUCCESS") {
			if(refreshUrl!="" && refreshUrl!=null)
			{
				//刷新(或转向)
				_rightLoad(refreshUrl,null);
				_showGritter();
			}
			return false;
		}else {
			bootbox.alert("操作失败，<br>请检查相关数据信息是否正确.",function(result) {
				
			});
			return false;
		}
	});
}
**/

//右下方的操作消息提醒
function _showGritter()
{
	jQuery.gritter.add({
		title: '提示',
		text: '操作成功',
		sticky: false,
		time:3000,
		class_name: 'gritter_hl_bottom_right gritter-light' 
	});

	return false;
}
//执行分页的相关操作,自定义显示分页的位置
function _selfshowPageNum(loadPosition)
{
	var _currentPage = 1;
	var _totalPages = 1;
	var _totalRows = 1;

	//$table_pageNum = jQuery("#table_pageNum");
	$table_pageNum = jQuery(loadPosition).find("ul[id='table_pageNum']");
	if(typeof($table_pageNum.html()) != "undefined"&&$table_pageNum.html() != undefined)
	//if($table_pageNum.html() != "undefined")
	{
		$formObj = $table_pageNum.closest("form");
		
		_currentPage = $table_pageNum.attr("currentPage");
		_totalRows = $table_pageNum.attr("totalRows");
		_totalPages = $table_pageNum.attr("totalPages");
		_sizePage = $table_pageNum.attr("sizePage");
		
		selfshowPageSelect(_totalRows,_totalPages,_sizePage,$formObj,loadPosition);
		var options = {
	    		bootstrapMajorVersion:3,
	    		currentPage:_currentPage,
	    		totalPages: _totalPages,
	    		sizePage:_sizePage,
	    		numberOfPages:1,
	    		onPageClicked: function(e,originalEvent,type,page){
	    			selfLoad($formObj.attr("action")+"/"+page+"-"+_sizePage,jQuery(loadPosition).find("div[id='div_condition_search'] input,select").serializeArray(),loadPosition);
	            }
	    		};
		$table_pageNum.bootstrapPaginator(options);
	}
}

//每页显示 n 条，共 m 页；下拉可直接执行,自定义显示分页的位置
function selfshowPageSelect(totalRows,totalPages, sizePage, formObj,loadPosition)
{
	var _tempPageSelect = jQuery("<span>&nbsp;共 "+totalRows+" 行&nbsp;&nbsp;每页显示 <select id='lui_pageSelected'>" +
							"<option value='10'>10</option>" +
							"<option value='20'>20</option>" +
							"<option value='40'>40</option>" +
							"<option value='60'>60</option>" +
							"<option value='80'>80</option>" +
							"<option value='100'>100</option>" +
						  "</select> 行&nbsp;&nbsp;共 "+totalPages+" 页&nbsp;&nbsp;&nbsp;&nbsp;</span>");
	jQuery(loadPosition).find("ul[id='table_pageNum']").before(_tempPageSelect);
	//jQuery("#table_pageNum").before(_tempPageSelect);
	_tempPageSelect.find("select[id='lui_pageSelected']").val(sizePage);
	_tempPageSelect.on("change",function()
	{
		var tempSizePage = _tempPageSelect.find("option:selected").val();
		selfLoad($formObj.attr("action")+"/1-" + tempSizePage,jQuery(loadPosition).find("div[id='div_condition_search'] input,select").serializeArray(),loadPosition);
	});
}

/**
 * 执行右侧列表的条件查询，加载到指定位置的
 */
function condition_search_self(refreshUrl,loadPosition){
	// 加载内容
	condition_search_self_position(refreshUrl,loadPosition,null);
}
/**
 * 执行指定位置的条件查询，加载到指定位置的
 */
function condition_search_self_position(refreshUrl,loadPosition,conditionPosition){
	// 加载内容
	var $rightBody = jQuery(loadPosition);
	if(conditionPosition==null){
		$rightBody.load(refreshUrl, jQuery("div[id='div_condition_search'] input,select").serializeArray(), function(){
			jQuery(this).find("input:text:visible").attr("autocomplete","off");
			_selfshowPageNum(loadPosition);
		});
	}else{
		$rightBody.load(refreshUrl, jQuery(conditionPosition).find("div[id='div_condition_search'] input,select").serializeArray(), function(){
			jQuery(this).find("input:text:visible").attr("autocomplete","off");
			_selfshowPageNum(loadPosition);
		});
	}	
}

/**
 * 执行条件查询
 */
function condition_search(refreshUrl)
{
	condition_search_self(refreshUrl,"#vf_loadRight");
}


/**
 * 在body中加入等待的消息
 */
function showLoadingMsg() {
	var $body = jQuery("body");
	var _bodyHeight = $body.height();
	
	if(_bodyHeight < 800)
	{
		_bodyHeight = 800;
	}
	
	jQuery("<div class=\"mask\"></div>").css({zIndex:90}).appendTo($body).css({
		height:_bodyHeight,
		width:$body.width()
	}).show();

	jQuery("<div id=\"lui_spin_div\" class=\"maskMsg\"></div>").html("加载中...").appendTo($body).css({
		display:"none",zIndex:8000,
		left:$body.width()/2-jQuery("div.maskMsg").width()/2,
		top:300}).show();
	
	var opts = {
			  lines: 12, 
			  length: 0,
			  width: 8, 
			  radius: 25,
			  color: 'blue', 
			  speed: 1, 
			  trail: 80, 
			  shadow: true 
			};
	var target = document.getElementById('lui_spin_div');
	var spinner = new Spinner(opts).spin(target);
}

/**
 * 取消body中等待的消息
 */
function removeLoadingMsg() {
	var $body = jQuery("body");
	var $masgMsg = $body.find("div.maskMsg");
	var $mask = $body.find("div.mask"); 
	$masgMsg.fadeOut();
	$mask.fadeOut();

	$masgMsg.remove();
	$mask.remove();
	
	$mask = null;
	$masgMsg = null;
	$body = null;
}

/**
 * 兼容IE8、9 ,显示 placeholder
 */
function lui_showPlaceholder()
{
	//兼容IE8、9
	jQuery('input, textarea, select').placeholder();
}
  
/**
 * table列表中带有复选框的 全选/取消 操作
 * allcheck:表头th对象，可以直接通过checkboxSelectAll(this)调用该方法
 */
function checkboxSelectAll()
{
		var that = jQuery('table th input:checkbox');
		that.closest('table').find('tr > td:first-child input:checkbox')
		.each(function(){
			 if(jQuery(this).attr("checked")=="checked")
		     {
			     jQuery(this).removeAttr("checked");
		     }
		     else
		     {
		    	 jQuery(this).attr("checked",true);
		     }
		});
}
/**
 * table列表中带有复选框的 全选/取消 操作
 * allcheck:表头th对象，可以直接通过checkboxSelectAll(this)调用该方法
 */
function getcheckedboxValuesToString()
{
	var _stringObj = "";
	var that = jQuery('table th input:checkbox');
	that.closest('table').find('tr > td:first-child input:checkbox')
	.each(function(idx){
//		if(jQuery(this).attr("checked")=="checked")
		//应该与checkboxSelectAll中一致都使用prop();
		if(jQuery(this).prop("checked"))
	    {
			if(_stringObj == "")
			{
				_stringObj = jQuery(this).attr("value");
				//alert(jQuery(this).attr("value"));
			}else
			{
				_stringObj = _stringObj +","+ jQuery(this).attr("value");
			}
	    }
	});
	//alert(_stringObj);
	return _stringObj;
}
function checkboxSelectAll(allcheck){
	if(allcheck.checked){
		jQuery("td input:checkbox").each(function(){
			jQuery(this).prop("checked",true);
		});
	}else{
		jQuery("td input:checkbox").each(function(){
			jQuery(this).prop("checked",false);
		});
	}
}
/**
 * table列表中带有复选框的 全选/取消 操作;
 * 选择指定位置区域全选/取消
 */
function checkboxSelfSelectAll(obj,position){
	if(jQuery(obj).prop("checked")){
		jQuery(position).find("td input:checkbox").each(function(){
			jQuery(this).prop("checked",true);
		});
	}else{
		jQuery(position).find("td input:checkbox").each(function(){
			jQuery(this).prop("checked",false);
		});
	}
}
/**
 * 得到选中的checkbox的id值，array方式返回
 */
function getSelCheckboxToArray()
{
	var _arrayObj = "[";
	var that = jQuery('table th input:checkbox');
	that.closest('table').find('tr > td:first-child input:checkbox')
	.each(function(idx){
		//alert(jQuery(this).attr("checked")+"------"+jQuery(this).prop("checked"));
//		if(jQuery(this).attr("checked")=="checked")
		//应该与checkboxSelectAll中一致都使用prop();
		if(jQuery(this).prop("checked"))
	    {
			if(_arrayObj == "[")
			{
				_arrayObj = _arrayObj + jQuery(this).attr("id");
			}else
			{
				_arrayObj = _arrayObj +","+ jQuery(this).attr("id");
			}
	    }
	});
	_arrayObj = _arrayObj + "]";
//	alert(_arrayObj);
	return _arrayObj;
}

/**
 * 设置checkbox的 选中/取消 状态
 */
function setSelectStatus()
{
	jQuery('table td input:checkbox').bind("click",function()
	{
		//alert(jQuery(this).attr("checked"));
		if(jQuery(this).attr("checked")=="checked")
		{
			jQuery(this).removeAttr("checked");
		}
		else
		{
			jQuery(this).attr("checked","checked");
		}
	});
}



/**
 * 打开dialog弹出层窗口
 * @param $objClickTarget
 */
function _open_dialog($objClickTarget) {
	
	// 系统模块名称
	var moduleName = $objClickTarget.attr("moduleName");
	// 系统功能名称
	var functionName = $objClickTarget.attr("functionName");
	if (functionName.length > 20) {
		functionName = functionName.substring(0, 20)+"...";
	}
	
	// 窗体的宽度
	var width = $objClickTarget.attr("width");
	
	// 窗体的高度
	var height = $objClickTarget.attr("height");
	
	// 窗口需要打开的URL
	var url = $objClickTarget.attr("href");
	
	// 是否使用iframe
	var isIframe = $objClickTarget.attr("isIframe");
	
	// 是否以模态的方式打开
	var isModel = $objClickTarget.attr("modal");
	
	// 是否隐藏关闭按钮
	var hideCloseBtn = false;//$objClickTarget.attr("hideCloseBtn");

	// 关闭的时候的回调函数
	var closeCallBack = $objClickTarget.attr("closeCallBack");
	
	// 窗口数据
	var data = $objClickTarget.attr("data");

	// 打开窗口
	var wi = _open_dialog_action_callBack(moduleName, functionName, width, height, url, isIframe, isModel, hideCloseBtn, closeCallBack,data);
	
	$objClickTarget = null;
	return wi;
}

/**
 * 打开窗体window
 * @param $objClickTarget 被点击的a标签
 */
function _open_dialog_action_callBack(moduleName, functionName, width, height, url, isIframe, isModel, hideCloseBtn, callBackFunc,data) {
	
	

	var $body = jQuery("body");
	var left = ($body.width() - width) / 2;
	//var top = ($body.height() - height) / 2 + 50;
	//统一调整弹出框的显示位置为，标题下方；位置80
	var top = 80;
	// 获取窗体的模板代码，并设置其中的属性
	var $objTargetWin = $windowModel.clone().appendTo($body);
	
	$objTargetWin.draggable({
		//handle:$objTargetWin.find("div.row")
	});
	$objTargetWin.draggable('option', 'cancel', 'div .widget-body'); 
	// 设定页面内容(当前位置)
	$objTargetWin.find("span.title_pre").html(moduleName + "&nbsp;&gt;");
	$objTargetWin.find("span.title_cur").html(functionName);
	
	var $objContentDiv = $objTargetWin.find("div.content");
	var _bodyHeight = $body.height();
	if(_bodyHeight < 800)
	{
		_bodyHeight = 800;
	}
	
	// 如果需要显示模态对话框
	if (isModel != "false") {
		
		// 首先判断当前是否有已经打开的dialog，如果有，则将dialog的遮罩层zIndex+1
		var $maskDiv = jQuery("div.windowMask");
		if ($maskDiv.length > 0) {

			// 调整全局的zindex
			gbl_window_zIndex += 1;
			$maskDiv.css({zIndex:gbl_window_zIndex});
		} else {
			jQuery("<div class=\"windowMask\"></div>").css({zIndex:gbl_window_zIndex}).appendTo($body).css({
				height:_bodyHeight,
				width:$body.width()
			}).show();
		}
	}
	
	// 是否使用iframe
	var wi = "";
	if (isIframe == "true") {
		var appendHTML = '<iframe src="'+url+'" height="'+height+'" width="'+(width-15)+'" frameborder="0" scrolling="auto"></iframe>';
		//jQuery(appendHTML).appendTo($objContentDiv);
		
		// 打开窗体
		gbl_window_zIndex += 1;
		wi = WINDOW_ID_PREFIX+gbl_window_zIndex;
		if(data == null || data == ""){
			$objTargetWin.find("div.window_close").attr("data","{'winId':'"+wi+"'}");
		}else{
			$objTargetWin.find("div.window_close").attr("data","{'winId':'"+wi+"',"+data+"}");
		}
		$objTargetWin.appendTo(jQuery("body")).show().height(height).width(width)
			.css({position:"absolute", left:left, top:top, "z-index" : gbl_window_zIndex}).attr("id", wi);
		$objTargetWin.find("div.content").html(appendHTML);
		$objTargetWin.find("div.window_close").click(function(event) {
			eval(callBackFunc);
			data = event.target.data;
			data = eval("("+data+")");
			closeMoreWindow(data);
			//closeCurrentWindow();
		});
			
		// 清空内容占用
		$objContentDiv = null;
		$objTargetWin = null;
		$body = null;
	} else {

		// 打开窗体
		gbl_window_zIndex += 1;
		wi = WINDOW_ID_PREFIX+gbl_window_zIndex;
		if(data == null || data == ""){
			$objTargetWin.find("div.window_close").attr("data","{'winId':'"+wi+"'}");
		}else{
			$objTargetWin.find("div.window_close").attr("data","{'winId':'"+wi+"',"+data+"}");
		}
		$objTargetWin.appendTo(jQuery("body")).hide().height(height).width(width)
			.css({position:"absolute", left:left, top:top, "z-index" : gbl_window_zIndex}).attr("id", wi);
		if(url.indexOf("?")>-1){
			url = (url+"&_="+new Date().getTime());
		}else{
			url = (url+"?_="+new Date().getTime());
		}
		$objContentDiv.load(url, jQuery.parseJSON((data&&jQuery.trim(data)!='')?data:"{}"),function() {
			jQuery(this).find("input:text:visible").attr("autocomplete","off");
			$objContentDiv.height(height-44).css({"overflow-y":"auto"});
			$objContentDiv.css({"background-color":"#fff"});
			
			$objTargetWin.appendTo(jQuery("body")).show();
			
			// 是否需要隐藏关闭按钮
			if (hideCloseBtn == "true") {
				$objTargetWin.find("div.window_close").hide();
			} 

//			// 打开窗体
//			$objTargetWin.appendTo(jQuery("body")).show().height(height).width(width)
//				.css({position:"absolute", left:left, top:top, "z-index" : gbl_window_zIndex}).attr("id", WINDOW_ID_PREFIX+gbl_window_zIndex);

			

			initSysUICompentent($objTargetWin);

			$objTargetWin.find("div.window_close").click(function(event) {
				eval(callBackFunc);
				data = event.target.data;
				data = eval("("+data+")");
				closeMoreWindow(data);
				//closeCurrentWindow();
			});
			_selfshowPageNum(jQuery(this));
			$objTargetWin.focus();

			// 清空内容占用
			$objContentDiv = null;
			$objTargetWin = null;
			$body = null;
		});
	}
	return wi;
}

//关闭多个dialog中的一个
function closeMoreWindow(data) {
    if(data != undefined)
    {
       var winId = data.winId;
	   jQuery("#"+winId).remove();
    }else{
       // 关闭当前的窗口
	   jQuery("#"+WINDOW_ID_PREFIX+gbl_window_zIndex).remove();
    }
    
    
	//关闭下层遮罩
	var $openedWin = jQuery("div.window_frame:visible");
	if ($openedWin.length > 0) {
		gbl_window_zIndex -= 2;
		jQuery("div.windowMask").css({"z-index":gbl_window_zIndex});
	} else {
		jQuery("div.windowMask").remove();
	}
}

function closeDivWindow() {
    
    // 关闭当前的窗口
    jQuery("#"+WINDOW_ID_PREFIX+gbl_window_zIndex).remove();
	
	//关闭下层遮罩
	var $openedWin = jQuery("div.window_frame:visible");
	if ($openedWin.length > 0) {
		gbl_window_zIndex -= 2;
		jQuery("div.windowMask").css({"z-index":gbl_window_zIndex});
	} else {
		jQuery("div.windowMask").remove();
	}
}


/**
 * 初始化系统UI组件
 *    1：鼠标经过的时候的样式改变
 *    2：获取焦点的时候的样式改变
 * 初始化对象：
 *    1：文本框
 *    2：文本区域
 * @param $contextObj 需要初始化的对象（窗体，tab）
 */
function initSysUICompentent($contextObj) {
	
	if (!$contextObj) {
		return;
	}
	
	var $inputs = $contextObj.find("input[type=text]");
	
	if ($inputs.length > 0) {
		$inputs.each(function(index, elem) {
			var $elem = jQuery(elem);
			var $containerDiv = $elem.closest("div.input_wrap");
			$elem.mouseover(function() {
				$containerDiv.addClass("input_wrap_hover");
			}).mouseout(function(){
				$containerDiv.removeClass("input_wrap_hover");
			}).focus(function() {
				$containerDiv.addClass("input_wrap_focus");
			}).blur(function() {
				$containerDiv.removeClass("input_wrap_focus");
			});
		});
	}

	var $textArea = $contextObj.find("textarea");
	
	if ($textArea.length > 0) {
		$textArea.each(function(index, elem) {
			var $elem = jQuery(elem);
			var $containerDiv = $elem.closest("table.form_textarea");
			$elem.mouseover(function() {
				$containerDiv.addClass("form_textarea_hover");
			}).mouseout(function(){
				$containerDiv.removeClass("form_textarea_hover");
			}).focus(function() {
				$containerDiv.addClass("form_textarea_focus");
			}).blur(function() {
				$containerDiv.removeClass("form_textarea_focus");
			});
		});
	}
	
	// 在form中点击回车，执行提交
	$contextObj.find("form").keydown(function(event) {
		if (jQuery(this).attr("autoSubmitFlg") == "false" || event.keyCode != 13) {
		} else {
			var $thisForm = jQuery(this);
			// 如果是在窗体中点击回车
			try {
				
				if ($thisForm.attr("onsubmit") != undefined) {
					$thisForm.submit();
				} else {
				 	var $currentWindowBody = getCurrentWindowBody();
				 	if ($currentWindowBody != undefined) {
				 		getCurrentWindowBody().load($thisForm.attr("action"),
							$thisForm.find("input[value!=''], select[value!='']").serializeArray(), function() {
								initSysUICompentent($currentWindowBody);		
							});
				 	} else {
				 		$thisForm.submit();
				 	}
				}
				
			} catch (e) {
				$thisForm.submit();
			}
		}
	});
}
/*
 * 获取当前时间按照yyyy-MM-dd hh:mm:ss
 * 参数addYear添加的年份
 */
function getNowDateFamate(addYear) {
    var now = new Date();
    var year = now.getFullYear()+addYear; //getFullYear getYear
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    return time;
}
/**
 * 框架外的ajax提交error处理
 * 1、处理没有数据授权的错误
 * @param obj
 * @param errorInfo
 */
function commonError(obj,errorInfo){
	//关闭弹出窗口
	jQuery("div[id*="+WINDOW_ID_PREFIX+"]").remove();
	var $openedWin = jQuery("div.window_frame:visible");
	if ($openedWin.length > 0) {
		gbl_window_zIndex -= 2;
		jQuery("div.windowMask").css({"z-index":gbl_window_zIndex});
	} else {
		jQuery("div.windowMask").remove();
	}
	//错误处理
	if(obj){
		var txt = obj.responseText;
		if(errorInfo == 'parsererror' || txt.indexOf("body") > 0){
			jQuery("#vf_loadRight").html(txt);
			var href = jQuery("#sidebar li.active").children().attr("href");
			_rightLoad(href);
		}
	}else
		alert("系统错误,请稍后重试!");
}
