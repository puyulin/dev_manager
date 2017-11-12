<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/common.jsp" %>
<script type="text/javascript" src="${ctx}/resources/js/venus/ajaxFileUpload.js"></script>
<script type="text/javascript" src="${ctx}/resources/trade/trade_update.js"></script>
	<div class="col-sm-12" style="padding-top: 3px;">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">新增商品</h3>
			</div>
			<div class="panel-body">

				<form id="form_save_id" style="display: inline-block">

					<input id="name" name="name" type="text" autocomplete="off" class="form-widget-venus"
						data-venus="{
                      'label':'商品名称',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" maxlength="50"/>
					<input id="code" name="code" type="text" autocomplete="off" class="form-widget-venus"
						data-venus="{
                      'label':'商品编号',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" maxlength="50"/>
					<input id="brand" name="brand" type="text" autocomplete="off" class="form-widget-venus"
						data-venus="{
                      'label':'品牌',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
					<input id="price" name="price" type="text"  class="form-widget-venus"
						data-venus="{
                      'label':'商品价格￥',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
					<input name="MS" type="text" class="form-widget-venus"
						data-venus="{
                      'label':'商品材质',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
                    <input id="msize" type="text" name="msize"  class="form-widget-venus " 
	                	data-venus="{
	                      'label':'商品尺寸',
	                     'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
					<input id="wxcode" name="wxcode" type="text" class="form-widget-venus"
						data-venus="{
                      'label':'咨询微信号',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
                    <input id="email" name="email" type="text" class="form-widget-venus"
						data-venus="{
                      'label':'咨询邮箱',
                      'colNum':'col-sm-4',
                      'errMsgColNum':'col-sm-2'}" />
                      
                    <!-- 图片地址 -->
	                <input id="img_path_1" imgIndex="1" name="file" type="file" class="form-widget-venus" 
						data-venus="{
	                     'label':'图片地址1',
					  	 'disable':false,
	                     'colNum':'col-sm-8',
	                     'errMsgColNum':'col-sm-4',
	                     'uploadCallback':'TradePage.uploadImg',
	                     'previewCallback':'TradePage.viewImg'}" />
	                     <!-- 图片地址 -->
	                <input id="img_path_2" imgIndex="2" name="file" type="file" class="form-widget-venus"
						data-venus="{
	                     'label':'图片地址2',
					  	 'disable':false,
	                     'colNum':'col-sm-8',
	                     'errMsgColNum':'col-sm-4',
	                     'uploadCallback':'TradePage.uploadImg',
	                     'previewCallback':'TradePage.viewImg'}" />
	                     <!-- 图片地址 -->
	                <input id="img_path_3" imgIndex="3" name="file" type="file" class="form-widget-venus"
						data-venus="{
	                     'label':'图片地址3',
					  	 'disable':false,
	                     'colNum':'col-sm-8',
	                     'errMsgColNum':'col-sm-4',
	                     'uploadCallback':'TradePage.uploadImg',
	                     'previewCallback':'TradePage.viewImg'}" />
	                <input id="img_path_4" imgIndex="4" name="file" type="file" class="form-widget-venus"
						data-venus="{
	                     'label':'图片地址4',
					  	 'disable':false,
	                     'colNum':'col-sm-8',
	                     'errMsgColNum':'col-sm-4',
	                     'uploadCallback':'TradePage.uploadImg',
	                     'previewCallback':'TradePage.viewImg'}" />
	                <input id="img_path_5" imgIndex="5" name="file" type="file" class="form-widget-venus"
						data-venus="{
	                     'label':'内容图片1',
					  	 'disable':false,
	                     'colNum':'col-sm-8',
	                     'errMsgColNum':'col-sm-4',
	                     'uploadCallback':'TradePage.uploadImg',
	                     'previewCallback':'TradePage.viewImg'}" />
	                 <input type="hidden" name="trade_imgpath_1">
	                 <input type="hidden" name="trade_imgpath_2">
	                 <input type="hidden" name="trade_imgpath_3">
	                 <input type="hidden" name="trade_imgpath_4">
	                 <input type="hidden" name="trade_imgpath_5">
				</form>
			</div>
			<!-- /.widget-body -->
			<div class="panel-footer align-center">
				<button class="btn btn-primary" type="button"
					onclick="TradePage.add();">
					<i class="ace-icon fa fa-check bigger-110"></i> 保存
				</button>
				<div style="margin-left: 20px; display: inline-block"></div>
				<button class="btn btn-info" type="reset" onclick="javascript:{Venus.load('#main','${ctx }/trade/gotoUpdate.do?orgId=${orgId}');}">
					<i class="ace-icon glyphicon glyphicon-repeat bigger-110"></i> 重置
				</button>
			</div>
		</div>
	</div>


<script type="text/javascript">
	var ctx = "${ctx}";
	
	
/* 
	TradePage.addErrorMsg = function(input,errormsg){
		var input_name = $(input).attr("name");
		var errorDom = "<p id='"+input_name+"_error' class='validationError'>"+errormsg+"</p>";
		var $error = $(input).parents(".widget-container:first").next(".error-msg");
		console.log($error);
		$error.html(errorDom);
	};
	
$.validator.addMethod("CnNmWithNmbr",function(value,element){
		var length = value.length;
		if(length < 1)return false;
		var strRex = /^[\u4E00-\u9FA5]{1}[\u4E00-\u9FA5]*$/;
		return this.optional(element) || (strRex.test(value));
	});
 */	
</script>