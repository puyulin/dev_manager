<%@ page contentType="text/html;charset=utf-8" language="java"%>
<%@ include file="../../../common.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<c:choose>
	<c:when test="${!empty bgdParams.iconame}">
		<link type="image/x-icon" rel="shortcut icon" href="${ctx}${bgdParams.iconame}">
	</c:when>
	<c:otherwise>
		<link type="image/x-icon" rel="shortcut icon" href="${ctx}/resources/images/favicon.ico">
	</c:otherwise>
</c:choose>
<title>欢迎使用微信统一后台管理系统</title>
<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="${ctx}/resources/css/bootstrap.min.css" />
<link rel="stylesheet" href="${ctx}/resources/css/font-awesome.min.css" />
<!-- page specific plugin styles -->
<link rel="stylesheet" href="${ctx}/resources/css/jquery-ui.min.css" />
<link rel="stylesheet" href="${ctx}/resources/css/jquery.gritter.css" />
<link rel="stylesheet" href="${ctx}/resources/css/datepicker.css" />
<link rel="stylesheet" href="${ctx}/resources/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${ctx}/resources/css/chosen.css" />
<link rel="stylesheet" href="${ctx}/resources/js/zTree_v3/css/metroStyle/metroStyle.css" />

<link rel="stylesheet" href="${ctx}/resources/css/bootstrap-timepicker.css" />
<link rel="stylesheet" href="${ctx}/resources/css/date-time/bootstrap-datepicker.css" />
<link rel="stylesheet" href="${ctx}/resources/css/date-time/bootstrap-datetimepicker.css" />
<link rel="stylesheet" href="${ctx}/resources/css/date-time/daterangepicker.css" />

<link rel="stylesheet" href="${ctx}/resources/css/colorpicker.css" />
<link rel="stylesheet" href="${ctx}/resources/css/ace-fonts.css" />
<link rel="stylesheet" href="${ctx}/resources/css/ace.min.css" id="main-ace-style" />
<link rel="stylesheet" href="${ctx}/resources/css/ace-skins.min.css" />
<link rel="stylesheet" href="${ctx}/resources/css/ace-rtl.min.css" />
<link rel="stylesheet" href="${ctx}/resources/css/animate.min.css" />
<link rel="stylesheet" href="${ctx}/resources/css/venus.css" />
<!-- ace settings handler -->
<script src="${ctx}/resources/js/jquery.min.js"></script>
<script src="${ctx}/resources/js/jquery.placeholder.js"></script>
<script src="${ctx}/resources/js/jquery.gritter.min.js"></script>
<script src="${ctx}/resources/js/velocity.min.js"></script>
<script src="${ctx}/resources/js/velocity.ui.js"></script>
<script src="${ctx}/resources/js/store.min.js"></script>
<script src="${ctx}/resources/js/uncompressed/bootstrap.js"></script>
<script src="${ctx}/resources/js/jqGrid/jquery.jqGrid.min.js"></script>
<script src="${ctx}/resources/js/jqGrid/i18n/grid.locale-en.js"></script>
<script src="${ctx}/resources/js/zTree_v3/js/jquery.ztree.all-3.5.js"></script>
<script src="${ctx}/resources/js/fuelux/fuelux.spinner.min.js"></script>
<script src="${ctx}/resources/js/jquery-ui.min.js"></script>
<script src="${ctx}/resources/js/jquery-ui.custom.min.js"></script>
<script src="${ctx}/resources/js/jquery.ui.touch-punch.min.js"></script>
<script src="${ctx}/resources/js/date-time/moment.js"></script>
<script src="${ctx}/resources/js/date-time/bootstrap-datepicker.js"></script>
<script src="${ctx}/resources/js/date-time/bootstrap-datetimepicker.js"></script>
<script src="${ctx}/resources/js/date-time/bootstrap-timepicker.js"></script>
<script src="${ctx}/resources/js/date-time/daterangepicker.js"></script>

<script src="${ctx}/resources/js/bootstrap-colorpicker.min.js"></script>
<script src="${ctx}/resources/js/jquery.knob.min.js"></script>
<script src="${ctx}/resources/js/jquery.autosize.min.js"></script>
<script src="${ctx}/resources/js/jquery.inputlimiter.1.3.1.min.js"></script>
<script src="${ctx}/resources/js/jquery.maskedinput.min.js"></script>
<script src="${ctx}/resources/js/jquery.validate.js"></script>
<script src="${ctx}/resources/js/jquery.validate.additional-methods.js"></script>
<script src="${ctx}/resources/js/jquery.validate.messages_zh.js"></script>
<script src="${ctx}/resources/js/bootstrap-tag.min.js"></script>
<script src="${ctx}/resources/js/typeahead.jquery.min.js"></script>
<script src="${ctx}/resources/js/chosen.jquery.min.js"></script>
<script src="${ctx}/resources/js/uncompressed/bootbox.js"></script>
<script src="${ctx}/resources/js/excanvas.min.js"></script>
<script src="${ctx}/resources/js/jquery.easypiechart.min.js"></script>
<script src="${ctx}/resources/js/jquery.sparkline.min.js"></script>
<script src="${ctx}/resources/js/flot/jquery.flot.min.js"></script>
<script src="${ctx}/resources/js/flot/jquery.flot.pie.min.js"></script>
<script src="${ctx}/resources/js/flot/jquery.flot.resize.min.js"></script>
<!-- ace scripts -->
<script src="${ctx}/resources/js/ace-extra.min.js"></script>
<script src="${ctx}/resources/js/ace-elements.min.js"></script>
<script src="${ctx}/resources/js/fuelux.wizard.js"></script>
<script src="${ctx}/resources/js/elements.wizard.js"></script>
<script src="${ctx}/resources/js/uncompressed/ace.js"></script>
<script type="text/javascript">
	ace.vars['base'] = '..';
</script>
<script src="${ctx}/resources/js/jsonData/cities.js"></script>
<script src="${ctx}/resources/js/jsonData/treeData.js"></script>
<script src="${ctx}/resources/js/menu.js"></script>
<script src="${ctx}/resources/js/venus-i18n.js"></script>
<script src="${ctx}/resources/js/venus.js"></script>
<script src="${ctx}/resources/js/venus-worker.js"></script>
<script src="${ctx}/resources/js/venus/venus_core_admin.js"></script>
<script src="${ctx}/resources/js/venus/ajaxFileUpload.js"></script>
<script src="${ctx}/resources/js/accordion.js"></script>
<script src="${ctx}/resources/js/echarts-2.2.7/build/dist/echarts.js"></script>
<script src="${ctx}/resources/js/zrender-2.1.0/src/tool/color.js"></script>
<script src="${ctx}/resources/js/base64.min.js"></script>
<script src="${ctx}/resources/js/simpleEncrypt.js"></script>

	<!-- 自定义脚本 -->
	<script type="text/javascript">
		$(document).ready(function() {
		});
	</script>
	
	<style type="text/css">
		button[name="menubtn"]:hover{
			background: #000093 !important;
		}
		button[name="menubtn"]{
			background: #004B97 !important;
			color: #fff;
			font-size: 18px;
			border-right:solid 1px ;
			
		}
	</style>
</head>

<body class="no-skin"
	style="font-family: '微软雅黑 Light'; overflow: hidden;">
	<!-- 顶部导航 #section:basics/navbar.layout -->
	<div id="navbar" class="navbar navbar-default navbar-fixed-top" style="background: #004B97;">
		<script type="text/javascript">
			try {
				ace.settings.check('navbar', 'fixed')
			} catch (e) {
			}
		</script>

	<!-- 顶部导航 /section:basics/navbar.layout -->
	<div class="navbar-container" id="navbar-container" style="display:flex;">
			<!-- #section:basics/sidebar.mobile.toggle -->
			<button type="button" class="navbar-toggle menu-toggler pull-left"
				id="menu-toggler">
				<span class="sr-only">Toggle sidebar</span> <span class="icon-bar"></span>
				<span class="icon-bar"></span> <span class="icon-bar"></span>
			</button>

			<div class="navbar-header pull-left" style="flex-shrink: 0;">
				<!-- #section:basics/navbar.layout.brand -->
				<span class="navbar-brand" style="height:45px">
						<small>
							<img src="${ctx}/resources/images/logo.png" style="height:35px;width:50px;border:none;border-radius:0px;" onerror="nofind(this);"/>
							微信统一管理平台
						</small>
				</span>


			</div>
			<!-- <div style="display:flex;overflow:hidden;flex-grow: 1;justify-content: center;">
						<span id="menuspan" class="navbar-brand" style="height:45px;overflow: hidden; white-space: nowrap; text-overflow: clip;">
								<button name="menubtn" class="btn btn-primary" style="height:45px;">基础设置</a>
						</span>
			</div> -->
			<div class="box navbar-menu pull-left collapse navbar-collapse" style="float:left; overflow:hidden; height:30px; position:relative;flex-grow: 1;" id="box">
			        <div class="menu" id="menu_top">
			          <ul id="menuspan" style="margin:0;padding:0;" style="height:60px;margin:0;padding:0;position: absolute;" class="nav navbar-nav pagination">
							<li>
								<a name="menubtn" menuId="1" href="javascript:void(0);" style="border: 0">基础设置</a>
							</li>
							<li>
								<a name="menubtn" menuId="2" href="javascript:void(0);" style="border: 0">商品管理</a>
							</li>
			          </ul>
			      </div>
			</div>
			<div class="navbar-buttons navbar-header pull-right" role="navigation"  style="flex-shrink: 0;">
				<ul class="nav ace-nav">
					<li class="light-blue">
						<a data-toggle="dropdown" href="#" class="dropdown-toggle"> <img class="nav-user-photo" src="${ctx}/resources/avatars/avatar2.png" /> 
							<span class="user-info">
							</span> <i class="ace-icon fa fa-caret-down"></i>
					</a>

						<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
							<li>
								<a href="javascript:gotoGetLoginUserInfo();" >
										<i class="glyphicon glyphicon-user  blue"></i>
										用户登录
								</a>
							</li>

							<li class="divider"></li>

							<li><a href="${ctx}/fouraLogin_logout.do">
								<i class="glyphicon glyphicon-off red"></i>
								退出
								</a>
							</li>
						</ul></li>

				</ul>
			</div>
	</div>

</div>




	<!-- 主页面 /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try {
				ace.settings.check('main-container', 'fixed')
			} catch (e) {
			}
		</script>

		<!-- 左菜单栏 #section:basics/sidebar -->
		<div id="sidebar" class="sidebar responsive sidebar-fixed">
			<script type="text/javascript">
				try {
					ace.settings.check('sidebar', 'fixed')
				} catch (e) {
				}
			</script>

			<!-- 快捷功能区 #sidebar-shortcuts -->
			<div class="sidebar-shortcuts" id="sidebar-shortcuts">

				<!-- 快捷功能按钮 #section:basics/sidebar.layout.shortcuts -->
				<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
					<!-- <a class="btn btn-warning" href="#" onclick="javascript:void(0);">
						<i class="ace-icon fa fa-users"></i>
					</a>
					<a class="btn btn-success" href="#" onclick="javascript:void(0);">
						<i class="ace-icon fa fa-pencil"></i>
					</a> -->
				</div>
				<!-- /section:basics/sidebar.layout.shortcuts -->

				<!-- 快捷功能迷你按钮 #section:basics/sidebar.layout.shortcuts -->
				<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
					<span class="btn btn-warning" href="asset/asset/assetList.html"></span>
					<span class="btn btn-success" href="asset/asset/assetAdd.html"></span>
				</div>
			</div>
			<!-- /.sidebar-shortcuts -->
			<ul class="nav nav-list">
				  		<li>
							<a url="" class="dropdown-toggle">
								<i class="menu-icon fa fa-hand-pointer-o"></i>
									<span class="menu-text">配送范围管理 </span>
									<b class="arrow glyphicon glyphicon-chevron-down"></b>
							</a>
							<ul class="submenu nav-show">
								<li>
							   		<a url="${ctx}/location/list.do" parentMenu="配送范围管理 " optMenu="true">
										<i class="menu-icon glyphicon glyphicon-tag"></i>
										<span class="menu-text">地址常量</span>
									</a>
   								</li>
							</ul>
                        </li>
                        <li>
							<a url="" class="dropdown-toggle">
								<i class="menu-icon fa fa-hand-pointer-o"></i>
									<span class="menu-text">商品维护</span>
									<b class="arrow glyphicon glyphicon-chevron-down"></b>
							</a>
							<ul class="submenu nav-show">
								<li>
							   		<a url="${ctx}/trade/gotoUpdate.do" parentMenu="商品维护 " optMenu="true">
										<i class="menu-icon glyphicon glyphicon-tag"></i>
										<span class="menu-text">商品上传</span>
									</a>
   								</li>
   								<li>
							   		<a url="${ctx}/trade/list.do" parentMenu="商品维护 " optMenu="true">
										<i class="menu-icon glyphicon glyphicon-tag"></i>
										<span class="menu-text">商品列表</span>
									</a>
   								</li>
							</ul>
                        </li>
				<div style="height: 30px"></div>               
			</ul>
			<!-- /.nav-list -->

			<!-- #section:basics/sidebar.layout.minimize -->
			<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
				<i class="ace-icon fa fa-angle-double-left"
					data-icon1="ace-icon fa fa-angle-double-left"
					data-icon2="ace-icon fa fa-angle-double-right"></i>
			</div>
			<!-- /section:basics/sidebar.layout.minimize -->
			<script type="text/javascript">
				try {
					ace.settings.check('sidebar', 'collapsed')
				} catch (e) {
				}
			</script>
		</div>
		<!-- 左菜单栏 /section:basics/sidebar -->

		<div class="main-content">
			<!-- 页面导航栏 #section:basics/content.breadcrumbs -->
			<div class="breadcrumbs  breadcrumbs-fixed" id="breadcrumbs">
				<script type="text/javascript">
					try {
						ace.settings.check('breadcrumbs', 'fixed')
					} catch (e) {
					}
				</script>
				<div class="dirTitle"></div>
				<ul class="nav nav-list nav-header">
				</ul>
				<!-- /.breadcrumb -->

				<!-- #section:basics/content.searchbox -->
				<div class="nav-search" id="nav-search">
					<form class="form-search">
						<label>
							<!-- <input id="useAnimationSwitch" class="ace ace-switch ace-switch-4 btn-flat" type="checkbox"/> -->
							<span class="lbl"></span>
						</label>
					</form>
				</div>
				<!-- /.nav-search -->
				<!-- /section:basics/content.searchbox -->

			</div>
			<!-- 页面导航栏 /section:basics/content.breadcrumbs -->

			<div class="page-content">
				<!-- 设置 #section:settings.box -->
				<div class="ace-settings-container" id="ace-settings-container"
					style="display: none;">
					<div class="btn btn-app btn-xs btn-warning ace-settings-btn"
						id="ace-settings-btn">
						<i class="ace-icon fa fa-cog bigger-150"></i>
					</div>

					<div class="ace-settings-box clearfix" id="ace-settings-box">
						<div class="pull-left width-50">
							<!-- #section:settings.skins -->
							<div class="ace-settings-item">
								<div class="pull-left">
									<select id="skin-colorpicker" class="hide">
										<option data-skin="no-skin" value="#438EB9">#438EB9</option>
										<option data-skin="skin-1" value="#222A2D">#222A2D</option>
										<option data-skin="skin-2" value="#C6487E">#C6487E</option>
										<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
									</select>
								</div>
								<span>&nbsp; Choose Skin</span>
							</div>

							<!-- /section:settings.skins -->

							<!-- #section:settings.navbar -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-navbar" /> <label class="lbl"
									for="ace-settings-navbar"> Fixed Navbar</label>
							</div>

							<!-- /section:settings.navbar -->

							<!-- #section:settings.sidebar -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-sidebar" /> <label class="lbl"
									for="ace-settings-sidebar"> Fixed Sidebar</label>
							</div>

							<!-- /section:settings.sidebar -->

							<!-- #section:settings.breadcrumbs -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-breadcrumbs" /> <label class="lbl"
									for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
							</div>

							<!-- /section:settings.breadcrumbs -->

							<!-- #section:settings.rtl -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-rtl" /> <label class="lbl"
									for="ace-settings-rtl"> Right To Left (rtl)</label>
							</div>

							<!-- /section:settings.rtl -->

							<!-- #section:settings.container -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-add-container" /> <label class="lbl"
									for="ace-settings-add-container"> Inside <b>.container</b>
								</label>
							</div>

							<!-- /section:settings.container -->
						</div>
						<!-- /.pull-left -->

						<div class="pull-left width-50">
							<!-- #section:basics/sidebar.options -->
							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-hover" /> <label class="lbl"
									for="ace-settings-hover"> Submenu on Hover</label>
							</div>

							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-compact" /> <label class="lbl"
									for="ace-settings-compact"> Compact Sidebar</label>
							</div>

							<div class="ace-settings-item">
								<input type="checkbox" class="ace ace-checkbox-2"
									id="ace-settings-highlight" /> <label class="lbl"
									for="ace-settings-highlight"> Alt. Active Item</label>
							</div>

							<!-- /section:basics/sidebar.options -->
						</div>
						<!-- /.pull-left -->
					</div>
					<!-- /.ace-settings-box -->
				</div>
				<!-- /.ace-settings-container -->

				<!-- /section:settings.box -->
				<div class="page-content-area">
					<div id="center" class="row">
						<div id="main" class="col-sm-12"></div>
						<div id="left" class="col-sm-2">
							
						</div>
						<div id="right" class="col-sm-10"></div>
					</div>
					<!-- /.row -->
				</div>
				<!-- /.page-content-area -->
			</div>
			<!-- /.page-content -->
		</div>
		<!-- /.main-content -->


		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
		</a>
	</div>
	<!-- /.main-container -->

	<div class="footer ">
		<div id="footer" class="navbar navbar-default navbar-fixed-bottom"
			style="background-color: ghostwhite; border-top: 3px double #E5E5E5;">
			<div class="footer-inner">
				<span class="bigger-100">
					<fmt:message key="info_copyright"/>
					<div class="space-6"></div>
				</span>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		//给菜单绑定点击事件
		$('.nav-list a[class!=dropdown-toggle]').on('click',function(e) {
			var $this = $(this);
			e.preventDefault();
			if($this.attr("loadStyle") == 'left-right'){
				$this.attr("url") && Venus.load('#left', $this.attr("url"));
			}else{
				$this.attr("url") && Venus.load('#main', $this.attr("url"));
			}
			$('.nav-list li.active').removeClass('active');
			$this.parents("li").addClass("active");
			//显示页面路劲标题
			var $dirTitle = $(".dirTitle"); 
			$dirTitle.html("");
			var $item = $this.parents('li:first');
			while($item.length > 0){
				$dirTitle.prepend('<span>' + $item.find('a:first').text().trim() + '</span>');
				$item = $item.parents('li:first');
			}
			$this = null;
		});
	</script>
</body>
</html>
