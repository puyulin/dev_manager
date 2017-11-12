/**
 * Created by WANGLILONG on 2015/11/23.
 */
// @tag core
/**
 * @class Venus
 *
 * Venus 是一个全局的单例对象，是针对态势项目框架而开发的工具集，包括 AJAX，JDialog，Ztree 以及
 * 异步页面加载等方法。
 *
 * 使用时一般在项目入口文件 index.html(.jsp|.php) 中引入即可，例如:
 *
 *      <script type="text/javascript" src="venus.js"></script>
 *
 * <b>Venus</b>  乃技术大牛王立龙潜心开发，严禁任何个人或企业未经允许就私自使用，否则将追究其形式责任。
 * 更多信息请参考:
 *
 *
 * @singleton
 */
var Venus = Venus || {}; // jshint ignore:line
(function() {

	//是否支持多线程
	Venus.hasWebWorker = !!window.Worker;
	//是否支持动画
	Venus.useAnimation = false;
	//国际化语言种类
	Venus.i18n = 'zh_CN';
	//是否在表单控件校验成功时显示绿色小对钩
	Venus.showRightTick = false;
	Venus.windowSize = null;
	//主页面内容总高度
	Venus.centerHeight = 0;
	//最近加载页面的类型（main, left, right）
	Venus.latestLoadedPageType = "";
	//各页面对象的集合（main, left, right）
	Venus.loadedPages = {main:[],left:[],right:[]};
	//各页面加载完成的回调函数集合
	Venus.pageCompleteCallbacks = [];
	//需要销毁的日期控件集合
	Venus.waitToDestroyDateWidgets = [];
	//框架国际化
	Venus.msg = function(key){
		return I18N.MESSAGES[Venus.i18n][key];
	};
	//业务国际化
	Venus.i18nMsg = function(key){
		return I18N.MESSAGES.SYSMESSAGES[key];
	};
	Venus.changeLanguage = function(newLanguage){
		Venus.i18n = newLanguage;
		Venus.initTableOperationHTMLArr();
		$.validator[newLanguage]();
	};
	//字典
	Venus.sysCode = null;
	//前台字典
	Venus.getSysCode = function(group,key){
		if(key==null || key==""){
	    	return "";
	    }else{
	    	return (Venus.sysCode[group] && Venus.sysCode[group][key]) || key;
	    }
	};
	//统一定义表格中按钮操作的图标
	Venus.btnIconClasses = {
		"edit"         : "ace-icon fa fa-pencil",
		"del"          : "ace-icon fa fa-trash-o",
		"detail"       : "ace-icon fa fa-search-plus",
		"lock"         : "fa fa-lock",
		"unlock"       : "fa fa-unlock",
		"exchange"     : "ace-icon fa fa-exchange",
		"cogs"         : "fa fa-cogs",
		"download"     : "ace-icon glyphicon glyphicon-download",
		"upload"       : "ace-icon glyphicon glyphicon-upload",
		"add"          : "glyphicon glyphicon-plus",
		"grant"        : "glyphicon glyphicon-retweet",
		"import"      : "glyphicon glyphicon-import",
		"export"      : "glyphicon glyphicon-export",
		"remove"       : "glyphicon glyphicon-remove",
		"search"       : "glyphicon glyphicon-search",
		"save"         : "glyphicon glyphicon-ok",
		"reset"        : "glyphicon glyphicon-repeat",
		"back"         : "glyphicon glyphicon-share-alt",
		"wrench"       : "glyphicon glyphicon-wrench",
		"setting"      : "glyphicon glyphicon-cog",
		"settingProp"      : "glyphicon glyphicon-cog",
		"registration" : "glyphicon glyphicon-registration-mark",
		"forbid"       : "glyphicon glyphicon-ban-circle",
		"unforbid"     : "glyphicon glyphicon-ok-circle",
		"editpro"      : "glyphicon glyphicon-wrench",
		"editres"      : "glyphicon glyphicon-registration-mark",
		"execute"      : "fa fa-play",
		"pause"        : "fa fa-pause",
		"stop"         : "fa fa-stop",
		"viewlog"      : "fa fa-list-alt",
		"viewlogdetail"      : "fa fa-list-alt",
		"allotAcount"  : "fa fa-cogs",
		"recover"      : "glyphicon glyphicon-share",
		"dtt"          : "fa fa-share-alt",
		"checkIcon"    : "glyphicon glyphicon-check",
		"apply"        : "fa fa-location-arrow",
		"clone"		   : "fa fa-copy",
		"preview"      : "glyphicon glyphicon-zoom-in",
		"iptables"     : "fa fa-list-alt",
		"batchLogin"   : "fa fa-users",
		"look"         : "glyphicon glyphicon-eye-open",
		"up"        : "glyphicon glyphicon-arrow-up",
		"down"        : "glyphicon glyphicon-arrow-down",
		"conflictDetail"        : "glyphicon glyphicon-zoom-in",
		"ingore"       : "glyphicon glyphicon-eye-close",
		"relation"    : "glyphicon glyphicon-link",
	};
	Venus.tableOperationHTMLArr = {};
	Venus.initTableOperationHTMLArr = function(){
		Venus.tableOperationHTMLArr.edit     = '<span title="' + Venus.msg("edit") + '" onclick="operationfun" class="ace-icon fa fa-pencil blue marginl-10" style="cursor:pointer;"></span>';
		Venus.tableOperationHTMLArr.del      = '<span title="' + Venus.msg("del") + '" onclick="operationfun" class="ace-icon fa fa-trash-o blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.detail   = '<span title="' + Venus.msg("detail") + '" onclick="operationfun" class="ace-icon fa fa-search-plus blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.lock     = '<span title="' + Venus.msg("lock") + '" onclick="operationfun" class="fa fa-lock blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.unlock   = '<span title="' + Venus.msg("unlock") + '" onclick="operationfun" class="fa fa-unlock blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.exchange = '<span title="' + Venus.msg("exchange") + '" onclick="operationfun" class="ace-icon fa fa-exchangeblue  marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.cogs     = '<span title="' + Venus.msg("cogs") + '" onclick="operationfun" class="fa fa-cogs blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.download = '<span title="' + Venus.msg("download") + '" onclick="operationfun" class="ace-icon glyphicon glyphicon-download blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.upload   = '<span title="' + Venus.msg("upload") + '" onclick="operationfun" class="ace-icon glyphicon glyphicon-upload blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.add      = '<span title="' + Venus.msg("add") + '" onclick="operationfun" class="glyphicon glyphicon-plus blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.grant    = '<span title="' + Venus.msg("grant") + '" onclick="operationfun" class="glyphicon glyphicon-retweet blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr['import']= '<span title="' + Venus.msg("import") + '" onclick="operationfun" class="glyphicon glyphicon-import blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr['export']= '<span title="' + Venus.msg("export") + '" onclick="operationfun" class="glyphicon glyphicon-export blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.remove   = '<span title="' + Venus.msg("remove") + '" onclick="operationfun" class="glyphicon glyphicon-remove blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.search   = '<span title="' + Venus.msg("search") + '" onclick="operationfun" class="glyphicon glyphicon-search blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.save     = '<span title="' + Venus.msg("save") + '" onclick="operationfun" class="glyphicon glyphicon-ok blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.reset    = '<span title="' + Venus.msg("reset") + '" onclick="operationfun" class="glyphicon glyphicon-repeat blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.back     = '<span title="' + Venus.msg("back") + '" onclick="operationfun" class="glyphicon glyphicon-share-alt blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.wrench   = '<span title="' + Venus.msg("wrench") + '" onclick="operationfun" class="glyphicon glyphicon-wrench blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.setting  = '<span title="' + Venus.msg("setting") + '" onclick="operationfun" class="glyphicon glyphicon-cog blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.settingProp  = '<span title="' + Venus.msg("settingProp") + '" onclick="operationfun" class="glyphicon glyphicon-cog blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.registration  = '<span title="' + Venus.msg("registration") + '" onclick="operationfun" class="glyphicon glyphicon-registration-mark blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.forbid   = '<span title="' + Venus.msg("forbid") + '" onclick="operationfun" class="glyphicon glyphicon-ban-circle blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.unforbid = '<span title="' + Venus.msg("unforbid") + '" onclick="operationfun" class="glyphicon glyphicon-ok-circle blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.editpro  = '<span title="' + Venus.msg("editpro") + '" onclick="operationfun" class="glyphicon glyphicon-wrench blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.editres  = '<span title="' + Venus.msg("editres") + '" onclick="operationfun" class="glyphicon glyphicon-registration-mark blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.execute  = '<span title="' + Venus.msg("execute") + '" onclick="operationfun" class="fa fa-play blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.pause    = '<span title="' + Venus.msg("pause") + '" onclick="operationfun" class="fa fa-pause blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.stop     = '<span title="' + Venus.msg("stop") + '" onclick="operationfun" class="fa fa-stop blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.viewlog  = '<span title="' + Venus.msg("viewlog") + '" onclick="operationfun" class="fa fa-list-alt blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.viewlogdetail  = '<span title="' + Venus.msg("viewlogdetail") + '" onclick="operationfun" class="fa fa-list-alt blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.allotAcount = '<span title="' + Venus.msg("allotAcount") + '" onclick="operationfun" class="fa fa-cogs blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.recover = '<span title="' + Venus.msg("recover") + '" onclick="operationfun" class="glyphicon glyphicon-share blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.dtt = '<span title="' + Venus.msg("dtt") + '" onclick="operationfun" class="fa fa-share-alt blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.checkIcon = '<span title="' + Venus.msg("checkIcon") + '" onclick="operationfun" class="glyphicon glyphicon-check blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.apply = '<span title="' + Venus.msg("apply") + '" onclick="operationfun" class="fa fa-location-arrow blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.clone = '<span title="' + Venus.msg("clone") + '" onclick="operationfun" class="fa fa-copy blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.preview = '<span title="' + Venus.msg("preview") + '" onclick="operationfun" class="glyphicon glyphicon-zoom-in blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.iptables = '<span title="' + Venus.msg("iptables") + '" onclick="operationfun" class="fa fa-list-alt blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.batchLogin = '<span title="' + Venus.msg("batchLogin") + '" onclick="operationfun" class="fa fa-users blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.look = '<span title="' + Venus.msg("look") + '" onclick="operationfun" class="glyphicon glyphicon-eye-open blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.up    = '<span title="' + Venus.msg("up") + '" onclick="operationfun" class="glyphicon glyphicon-arrow-up blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.down    = '<span title="' + Venus.msg("down") + '" onclick="operationfun" class="glyphicon glyphicon-arrow-down blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.conflictDetail    = '<span title="' + Venus.msg("conflictDetail") + '" onclick="operationfun" class="glyphicon glyphicon-zoom-in blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.ingore    = '<span title="' + Venus.msg("ingore") + '" onclick="operationfun" class="glyphicon glyphicon-eye-close blue marginl-10" style="cursor:pointer;" ></span>';
		Venus.tableOperationHTMLArr.relation    = '<span title="' + Venus.msg("relation") + '" onclick="operationfun" class="glyphicon glyphicon-link blue marginl-10" style="cursor:pointer;" ></span>';
	};
	Venus.initTableOperationHTMLArr();
	//将字符串转换为对象，替换原生的eval
	Venus.str2Obj = function(str){
		var resultObj = null;
		if(typeof str =='string'){
			try{
				var objArr = $.trim(str).split('.');
				resultObj = window[objArr[0]];
				for(var i = 1; i < objArr.length; i++){
					resultObj = resultObj[objArr[i]];
				}
			}catch (e) {
				//console.log('object transform error');
				resultObj = null;
			}
		}else{
			resultObj = str;
		}
		return resultObj;
	};
	Venus.cleanObjects = function(){

	};
	/**
	 * 获取n范围内的随机数。<br/>
	 * 示例：<br/>
	 *
	 *      var tempNum = Venus.getRandom(100);
	 *
	 * @param {Number} n 随机数范围
	 * @return {Number} 生成的随机数
	 */
	Venus.getRandom = function(n) {
		return Math.floor(Math.random() * n + 1);
	};

	/**
	 * 获取一个随机ID字符串，格式为 "id_123456", 后面的数字是指定范围的随机数。<br/>
	 * 示例：<br/>
	 *
	 *      var tempNum = Venus.getRandomId(10000000);
	 *
	 * @param {Number} n 随机数范围
	 * @return {Number} 生成的随机数
	 */
	Venus.getRandomId = function(n) {
		var nowdate = new Date(); // 获取当前时间
		var datems = nowdate.getTime(); // 从 1970/01/01 至今的毫秒数
		return "id_" + datems + "_" + Math.floor(Math.random() * (n ? n : 100) + 1);
	};

	Venus.updatePagesHeight = function(){
		//调整#main,#left,#right的滚动高度
		if($('#footer').length !== 0){
			var newcenterHeight = $('#footer').offset().top -
				($(".nav.nav-list").length != 0 ? $(".nav.nav-list").offset().top : 85) -10;
			if(Venus.centerHeight != newcenterHeight){
				Venus.centerHeight = newcenterHeight;
				$("#main,#left,#right").height(Venus.centerHeight);
				$("#main,#left,#right").ace_scroll('update',{size: Venus.centerHeight});
				$("#main,#left,#right").ace_scroll('reset');
				$("#main,#left,#right").find(".scroll-content:first").css({
					'max-height':Venus.centerHeight + "px",
					'min-height':Venus.centerHeight + "px"
				});
			}
		}
	};

	Venus.showLoading = function(){
		if($(".loading").length === 0){
			$('body').prepend('<i class="loading" style="display:none"></i><div class="loading-div" style="display:none"></div>');
		}
		$(".loading").css({
			top:window.innerHeight/2 - 40,
			left:window.innerWidth/2 - 40
		});
		$(".loading,.loading-div").show();
	};
	Venus.hideLoading = function(){
		$(".loading,.loading-div").hide();
	};
	/**
	 * 用于全局的一些设置信息初始化
	 */
	Venus.globalInit = function() {
		// 设置jQuery Ajax全局的参数
		$.ajaxSetup({
			error: function(jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status) {
					case (500):
						Venus.alert("服务器系统内部错误", "ERROR" + " 500", 'error');
						break;
					case (401):
						Venus.alert("未授权访问", "ERROR" + " 401", 'error');
						break;
					case (403):
						Venus.alert("无权限执行此操作", "ERROR" + " 403", 'error');
						break;
					case (404):
						Venus.alert("没找到该页面", "ERROR" + " 404", 'error');
						break;
					case (408):
						Venus.alert("请求超时", "ERROR" + " 408", 'error');
						break;
					default:
						Venus.alert("未知错误 ", "ERROR " + textStatus + " 状态码:" + jqXHR.status + " error:" + errorThrown, "error");
				}
			},
			beforeSend: function() {
				if(this.url && typeof this.url === "string"){
					var hasWenHao = this.url.indexOf("?") !== -1;
					if(hasWenHao){
						this.url = this.url + "&temptime=" + new Date().getTime();
					}else{
						this.url = this.url + "?temptime=" + new Date().getTime();
					}
					Venus.showLoading();
				}
			},
			complete: function() {
				Venus.hideLoading();
			}

		});
		//初始记录浏览器窗口大小
		if(!Venus.windowSize){
			Venus.windowSize = {width:$(window).width(),height:$(window).height()};
		}
		//窗口大小改变时页面布局调整
		{
			window.onresize = function() {

				//debugger;
				//如果浏览器窗口大小改变
				if(Venus.windowSize.width != $(window).width() || Venus.windowSize.height != $(window).height()){
					//console.log('change window size...');
					Venus.windowSize = {width:$(window).width(),height:$(window).height()};
					Venus.updatePagesHeight();

					//table的宽度调整
					$("table[id^=jqid_]").each(function(index, grid) {
						//console.log(grid);
						$(grid).jqGrid("setGridWidth",$(grid).parents(".table-container:first").width());
					});
				}
				//首次调整页面的高度
				if(Venus.centerHeight === 0){
					//console.log('first change page size...');
					Venus.updatePagesHeight();
				}

				//调整模糊查询的宽度
				$(".queryFieldsContainer").each(function(){
					var $this = $(this);
					$this.width($this.parents(".row:first").width() - 80);
				});
				//table的scroll调整
				$("table[id^=jqid_]").each(function(index, grid) {
					try{
						var $grid = $(grid);
						var $pager = $grid.parents(".ui-jqgrid:first").find(".ui-jqgrid-pager:first");
						var $scroller = $grid.parents(".scroll-content:first");
						var $tableContainer = $grid.parents(".table-container:first");
						$grid.jqGrid("setGridWidth",$tableContainer.width());
						var tbodyHeight = $scroller.height() -
							($tableContainer.offset().top - $scroller.offset().top) -
							90 - //82是表格的标题、表头的高度之和
							($pager.length > 0 ? 35 : 0);//如果有分页控件的话，减去分页控件
						if($grid.jqGrid("getGridParam","shrinkHeight")){
							$grid.jqGrid("setGridHeight",tbodyHeight);
						}
						//如果没有分页控件，则给tbody下面加上边框
						if($pager.length === 0){
							$tableContainer.find(".ui-jqgrid-bdiv").css("border-bottom","1px solid #E1E1E1");
						}
					}catch(e){
						console.log("调整表格高度有误");
					}
				});
				//调整left页面中树的高度
				$("#left .widget-body").height(Venus.centerHeight - 44);
				//调整树的滚动区域
				$(".ztree").each(function(index, treeDom){
					var $tree = $(treeDom);
					if($tree.find(".scroll-content").length > 0){
						var $treeParent = $tree.parent();
						$tree.width($treeParent.width() -10);
						$tree.ace_scroll("update",{size:$treeParent.height() -10});
						$tree.ace_scroll("reset");
						$tree.find(".scroll-content:first").css({
							'min-height':$tree.height(),
							'max-height':$tree.height()
						});
					}
				});
				//Chosen控件的宽度调整
				$(".chosen-container").each(function(index, item){
					var $this = $(item);
					var $widgetContainer = $this.parents(".widget-container:first");
					var addonsWidth = 0;
					$widgetContainer.find(".input-group-addon").each(function(index, item){
						addonsWidth += $(item).outerWidth();
					});
					$this.width($widgetContainer.width() - addonsWidth);
				});
				////console.log('resize');
			};
		}
		/**
		 * 隐藏或显示左侧菜单的时候，调整页面控件的宽度
		 */
		$(document).on(ace.click_event + '.ace.menu', '.sidebar-collapse', function() {
			$(window).trigger("resize");
		});
		//alert的位置在右下角
		$.gritter.options.position = "bottom-right";
	};
	Venus.globalInit();

	/**
	 * 构造页面实例
	 */
	Venus.pageInit = function(pageName) {
		var obj = {};
		//把此页面对象放到对应的页面组里，便于清理垃圾
		Venus.latestLoadedPageType &&
		Venus.loadedPages[Venus.latestLoadedPageType].push(pageName);
		Venus.pageCompleteCallbacks.push(pageName);
		return obj;
	};

	Venus.redrawScroller = function($el){
		var $scroller = $el.parents(".scroll-content:first");
		setTimeout(function(){
			$scroller.trigger('mouseenter');
			setTimeout(function(){$scroller.trigger('mouseenter');},500);
		},100);
	};
	/**
	 * 构造树控件
	 * @param $treeContainer {Object} 加载树的div
	 * @param $treeSettings {Object} 加载树的setting
	 * @param $treeNodes {Object} 加载树的节点数据
	 */
	Venus.getzTree = function($treeContainer, treeSettings, treeNodes) {
		//防止树控件单击节点时用scrollIntoView方法跳出父容器

		$treeContainer.css("position", "fixed");
		//默认统一加上图标ICON
		for (var key in treeNodes) {
			if (!treeNodes[key].iconSkin)
				treeNodes[key].iconSkin = "icon-item glyphicon glyphicon-file ";
			if (!treeNodes[key].iconOpen)
				treeNodes[key].iconOpen = "glyphicon icon-folder glyphicon-folder-open ";
			if (!treeNodes[key].iconClose)
				treeNodes[key].iconClose = "glyphicon icon-folder glyphicon-folder-close ";
		}
		//设置默认的treeSetting
		var defaultSettings = {
			data: {
				simpleData: {
					enable: true
				},
				key: {
					url: 'xURL' //不要给a标签的href属性赋值
				}
			},
			view: {
				dblClickExpand: false,
				showLine: false,
				nameIsHTML: true
			},
			callback: {
				onCheck: function(event, treeId, treeNode, clickFlag) {
					////console.log(event.target.tagName);
				},
				beforeClick: function(treeId, treeNode, clickFlag, event) {
					var event = event || window.event;
					var zTree = $.fn.zTree.getZTreeObj(treeId);
					if(event && event.target.tagName == 'I'){//如果点的是图标就展开或闭合
						zTree.expandNode(treeNode);
						if(treeNode.open){
							zTree.setting.callback.onExpand &&
							zTree.setting.callback.onExpand(event, treeId, treeNode);
						}else{
							zTree.setting.callback.onCollapse &&
							zTree.setting.callback.onCollapse(event, treeId, treeNode);
						}
					}else{
						if(zTree.setting.check.enable){//如果可以选择，选中它
							zTree.checkNode(treeNode);
						}
					}
					return true;
				}
			}
		};
		treeSettings = jQuery.extend(true, {}, defaultSettings, treeSettings);
		//给原始onClick方法前面加特殊处理
		var oldClickTreeNode = treeSettings.callback.onClick;
		var newClickTreeNode = function(event, treeId, treeNode, clickFlag) {
			//如果点击的是图标,则单击文字时展开或闭合folder
			/*if(event.target.tagName == 'I'){
				$(event.target).parents("li:first").find(".switch").click();
			}else{
				//点节点内容后
				if(treeSettings.check.enable){
					//如果是可选择的，而且点击的是叶子节点，则触发前面的radio或checkbox
					$(event.target).parents("li:first").find(".chk").click();
				}else{
					//如果是不可以选择的，则单击文字时展开或闭合folder
					$(event.target).parents("li:first").find(".switch").click();
				}
			}*/
			//重新设置树滚动区域的大小
			setTimeout(function(){
				$treeContainer.trigger('mouseenter');
				setTimeout(function(){$treeContainer.trigger('mouseenter');},500);
			},100);
			if(event && event.target.tagName != 'I'){
				//如果点的不是图标则执行click事件
				oldClickTreeNode(event, treeId, treeNode, clickFlag);
			}
		};
		treeSettings.callback.onClick = newClickTreeNode;
		$treeContainer[0].ztree = $.fn.zTree.init($treeContainer, treeSettings, treeNodes);
		//判断要不要禁用根节点的勾选
		if(treeSettings.rootCheck === false){
			Venus.disabledRootCheckForZTree($treeContainer[0].ztree);
		}
		$.data($treeContainer[0],'ztree',$treeContainer[0].ztree);
		setTimeout(function(){
			var $treeHeightParent = null;
			if($treeContainer.hasClass("dialog-tree")){
				$treeHeightParent = $treeContainer.parents('.ui-dialog-content:first');
			}else{
				$treeHeightParent = $treeContainer.parents('.widget-box:first').parent();
			}
			var scrollWidth = treeSettings.width || $treeContainer.parent().width() - 10;
			var scrollHeight = treeSettings.height || $treeHeightParent.height() -57;
			$treeContainer.width(scrollWidth);
			$treeContainer.height(scrollHeight);
			$treeContainer.parent('.widget-body').height((scrollHeight + 10) || ($treeHeightParent.height() - 48));
			$treeContainer.css({
				'max-height':scrollHeight + "px",
				'min-height':scrollHeight + "px"
			});
			$treeContainer.ace_scroll({styleClass: 'scroll-thin scroll-margin',size:scrollHeight});
			$treeContainer.ace_scroll("reset");
			$treeContainer.find(".scroll-content:first").css({
				'max-height':scrollHeight + "px",
				'min-height':scrollHeight + "px"
			});
			//如果有预先要点击的，触发此节点的click事件
			if(treeSettings.preClick){
				var node = null;
				for(var key in treeSettings.preClick){
					var value = treeSettings.preClick[key];
					if(value){
						var node = $treeContainer[0].ztree.getNodeByParam(key, value, null);
						$treeContainer[0].ztree.selectNode(node);
						$("#" + node.tId + "_span").click();
					}
				}
			}
			if($treeContainer.parents("#left").length === 0){
				$treeContainer.css("position", "relative");
			}
		},150);
		//如果不是可以选择的，默认展开第一个节点
		if (!treeSettings.check.enable) {
			var firstNode = $treeContainer[0].ztree.getNodes()[0];
			$treeContainer[0].ztree.expandNode(firstNode, true);
		}
		return $treeContainer[0].ztree;
	};

	//让自定义对话框里的right面板滚动
	Venus.initDialogScroller = function(){
		$(".dialog-scroller").each(function(index, item) {
			var $this = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($this.attr("dialog-scroller-init") == "done") return true;
			var $parentDialog = $this.parents('.ui-dialog-content:first');
			var scrollHeight;
			if($parentDialog.length === 0){
				scrollHeight = $this.height();
			}else{
				scrollHeight = $this.parents('.ui-dialog-content:first').height() -5;
			}
			$this.ace_scroll({
				styleClass: 'scroll-thin scroll-margin',
				size:scrollHeight
			});
			$this.ace_scroll("reset");
			$this.find(".scroll-content:first").css({
				'max-height':scrollHeight + "px",
				'min-height':scrollHeight + "px"
			});
			$this.find(".scroll-content:first").css("overflow-x","hidden");
			//标识完成
			$this.attr("dialog-scroller-init", "done");
		});
	};
	/**
	解析框架中的树形控件
	示例：
	<div class="tree-venus"
		data-venus="{
			'idKey':'menuNo',                               //id字段名
			'pIdKey':'parentNo',                            //pId字段名
			'nameKey':'name',                               //name字段名
			'iconSkin':'',                                  //叶子节点图标样式
			'iconOpen':'',                                  //父节点打开时图标样式
			'iconClose':'',                                 //父节点闭合时图标样式
			'checkEnable':true,                             //是否开启选择
			'checkStyle':'radio',                           //是单选还是多选
			'radioType':'all',                              //单选的话是在组内单选还是全局单选
			'localData':'DemoPage.treeArr',                 //需要加载的数据,本地数组形式
			'url':'auth/menu/listAll.do',                   //如果没有localData就去这个url获取
			'onClick':'DemoPage.onClick',                   //节点单击事件
			'dataPreHandler':'DemoPage.treeDataPreHandler'  //对拿到的节点数据预处理函数
		}"></div>
	*/
	Venus.initVenusTree = function() {
		$(".tree-venus").each(function(index, item) {
			var $this = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($this.attr("tree-venus-init") == "done") return true;
			//判断是不是left页面里的树,如果是则给他的treeBody加边框
			if($this.parents("#left").length > 0){
				$this.parents(".widget-body:first").height(Venus.centerHeight - 44);//.css('position','fixed');
			}
			$this.addClass("ztree");
			var config = $this.data("config") || eval("(" + $this.attr("data-venus") + ")");
			$.data($this[0],'config',config);
			var id = $(this).attr("id");
			if (!id) {
				$this.attr("id", Venus.getRandomId(100));
			}
			var defaultSettings = {
				data: {
					simpleData: {
						idKey: config.idKey,
						pIdKey: config.pIdKey
					},
					key: {
						name: config.nameKey
					}
				},
				check: {
					enable: config.checkEnable,
					chkStyle: config.checkStyle,
					radioType: config.radioType,
					chkboxType:config.chkboxType
				},
				callback: {
					onCheck: function(event, treeId, treeNode, clickFlag) {
						if(config.disableChild){
							var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
							Venus.dealAllChildrenNodes(treeNode,treeNode.checked,ztreeObj);
						}
					},
					onClick: function(event, treeId, treeNode, clickFlag) {
						if(config.disableChild){
							var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
							Venus.dealAllChildrenNodes(treeNode,treeNode.checked,ztreeObj);
						}
						if (config.onClick) {
							Venus.str2Obj(config.onClick)(event, treeId, treeNode, clickFlag);
						}
					}
				},
				height:config.height,
				width:config.width
			};
			var treeSettings = $.extend(true,defaultSettings,config);
			// 获取树的节点数据,如果有localData，则直接从本地变量里拿数据，否则从url拿数据
			var treeNodes = null;
			if (config.localData) {
				treeNodes = Venus.str2Obj(config.localData);
				treeNodes = $.extend(true, [], treeNodes);
				//如果treeNodes在载入树控件之前需要处理
				if (config.dataPreHandler)
					treeNodes = Venus.str2Obj(config.dataPreHandler)(treeNodes);
				Venus.getzTree($this, treeSettings, treeNodes)
			} else {
				$.getJSON(config.url, function(data) {
					//如果treeNodes在载入树控件之前需要处理
					if (config.dataPreHandler)
						data = Venus.str2Obj(config.dataPreHandler)(data);
					Venus.getzTree($this, treeSettings, data);
				});
			}
			//标识完成
			$this.attr("tree-venus-init", "done");
		});
	};

	/**
	 * 禁用或者启用树子节点可选
	 */
	 Venus.dealAllChildrenNodes = function(treeNode,checkFlag,ztreeObj){
	      if (treeNode.isParent) {
			var cNodes = treeNode.children;
			if(checkFlag){//禁用的时候禁用子孙菜单下面所有的节点
				for(var i in cNodes) {
					cNodes[i].chkDisabled = true;
					ztreeObj.updateNode(cNodes[i]);
					Venus.dealAllChildrenNodes(cNodes[i],checkFlag,ztreeObj);
				 }
			} else {
				for(var i in cNodes) {//启用仅启用没有勾选节点的子节点
					cNodes[i].chkDisabled = false;
					ztreeObj.updateNode(cNodes[i]);
					Venus.dealAllChildrenNodes(cNodes[i],cNodes[i].checked,ztreeObj);
				 }
			}
	    }
	 };
	Venus.disabledRootCheckForZTree = function(zTreeObj){
		var rootNodes = zTreeObj.getNodes();
		var rootNodesLen = rootNodes.length;
		for(var i = 0; i < rootNodesLen; i++){
			rootNodes[i].nocheck = true;
			zTreeObj.updateNode(rootNodes[i]);
		}
	};

	Venus.refreshVenusWidget = function($widget) {
		if($widget.attr("tree-venus-init") === "done"){
			$widget.data("ztree").destroy();
			$widget.removeAttr("tree-venus-init");
		}
		Venus.initVenusWidgets();
	};


	Venus.initVenusQueryForm = function() {
		$(".query-form-venus").each(function(index, item) {
			var $form = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($form.attr("query-form-venus-init") == "done") return true;
			var config = $form.data("config") || eval("(" + $form.attr("data-venus") + ")");
			$.data($form[0],'config',config);
			//开始让控件都隐藏
			$form.find(".form-widget-venus").each(function(index,item){
				var $widgetItem = $(item);
				$widgetItem.attr("data-venus",$widgetItem.attr("data-venus").replace("{","{'hide':true,"))
			});
			//自动加入模糊查询框
			var $blurQueryField = $("<input name=\"blurQueryField\" type=\"text\" class=\"form-widget-venus\"" +
										"data-venus=\"{" +
											"'hideLabel':true," +
											"'label':'" + config.blurPlaceholder + "'," +
											"'colNum':'col-sm-5'}\" />");
			$form.prepend($blurQueryField);
			$form.wrapInner("<div class='queryFieldsContainer' style='float: left;width: calc(100% - (90px)*1);'></div>");
			var $queryFieldsContainer = $form.find(".queryFieldsContainer");
			$queryFieldsContainer.width($queryFieldsContainer.parent().width() - 130);
			//展开高级查询按钮
			var $collapseBtn = $("<button class='btn btn-sm btn-primary pull-right btn-search-collapse' style='height: 34px;' type='button'>" +
										"<i class='ace-icon fa white fa-chevron-down'></i>" +
								"</button>");
			//切换模糊查询和高级查询的开关
			var $searchSwitch = $("<label style='display:none;float:right'>" +
									"<input class='ace ace-switch ace-switch-4 btn-flat search-switch' type='checkbox'/>" +
									"<span class='lbl'></span>" +
								"</label>");
			//查询按钮
			var $searchBtn = $("<button class='btn btn-sm btn-primary pull-right' style='height: 34px;'>" + Venus.msg("search") + "</button>");
			$form.append($collapseBtn).append($searchBtn).append($searchSwitch);
			$form.wrapInner("<div class='row' style='padding-right: 12px;'></div>");
			$searchBtn.click(function(e){
				var $targetGrid = $("#" + $form.data("target"));
				try{
					var gridObj = $targetGrid.data("jqgrid");
					//防止参数累积缓存
					var oldPostData = gridObj.grid.jqGrid("getGridParam", "postData");
					for(var key in oldPostData){
						delete oldPostData[key];
					}
					var postData = {};
					$("input[type='hidden'][name ^='data_init_']").each(function(index,element){
						var initname = $(element).attr("name");
						var initval = $(element).val();
						postData[initname] = initval;
					});
					if($blurQueryField.is(":enabled")){
						//执行模糊查询
						var blurQueryFields = $.trim($blurQueryField.val());
						blurQueryFields = blurQueryFields.replace(/_/g,"\\_");
						postData["blurQueryField"] = blurQueryFields;
					}else{
						//将精确查询封装成postData对象，
						$($form.serializeArray()).each(function(index, item){
							var itemNames = (item.value + "").trim();
							itemNames = itemNames.replace(/_/g,"\\_");
							postData[item.name] = itemNames;
						});
						//如果有formSearch(),则调用
						if(gridObj.options.formSearch){
							postData = gridObj.options.formSearch(postData);
						}
					}
					gridObj.reload({postData:postData,page:1});
				}catch(e){
					//console.log(e);
				}
				return false;
			});
			$collapseBtn.click(function(e){
				//if($collapseBtn.data("hasCollapseClick") !== true){
					if($blurQueryField.is(":visible")){
						Venus.showFormWidget($form.find(".form-widget-venus"));
						Venus.hideFormWidget($blurQueryField);
						$collapseBtn.find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
					}else{
						Venus.hideFormWidget($form.find(".form-widget-venus"));
						Venus.showFormWidget($blurQueryField);
						$collapseBtn.find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
					}
					$.data($collapseBtn[0],'hasCollapseClick',true);
				//}
			});
			$searchSwitch.find("input.search-switch").change(function(){
				if($blurQueryField.is(":visible")){
					Venus.showFormWidget($form.find(".form-widget-venus"));
					Venus.hideFormWidget($blurQueryField);
					$collapseBtn.find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
				}else{
					Venus.hideFormWidget($form.find(".form-widget-venus"));
					Venus.showFormWidget($blurQueryField);
					$collapseBtn.find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
				}
				$.data($collapseBtn[0],'hasCollapseClick',true);
			});
			//标识完成
			$form.attr("query-form-venus-init", "done");
		});
	};
	/**
	 * 解析框架中的Grid控件
	 * @Attr options grid属性设置
	 * @Attr checkLevel 全局选择还是节点选择
	 * 示例：
	 *<div
	 *  class="table-container table-venus"
	 *  data-venus="{
	 *		'options':''
	 *	}"></div>
	 */
	Venus.initVenusGrid = function() {
		$(".table-venus").each(function(index, item) {
			var $this = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($this.attr("table-venus-init") == "done") return true;
			var config = $this.data("config") || eval("(" + $this.attr("data-venus") + ")");
			$.data($this[0],'config',config);
			var newOptions = Venus.str2Obj(config.options);
			newOptions.tipsFunDataArr = {};//修改悬浮提示的方法和参数集合
			var obj = {};
			var randomTableId = "jq" + Venus.getRandomId(100);
			var randomPagerId = "pager" + Venus.getRandomId(100);
			var gridHtml = "<table id='tableId'></table><div id='pagerId'></div>";
			gridHtml = gridHtml.replace("tableId", randomTableId).replace("pagerId", randomPagerId);
			$this.append(gridHtml);
			//操作按钮的事件队列
			var gridEventsQueen = [];
			var updatePagerIcons = function(table) {
				var replacement =
				{
					'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
					'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
					'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
					'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
				};
				$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
					var icon = $(this);
					var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

					if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
				});
			};
			//保留自定义的loadComplete,onSelectRow
			var loadComplete = newOptions.loadComplete;
			var onSelectRow = newOptions.onSelectRow;
			var onSelectAll = newOptions.onSelectAll;
			var gridIsIniting = false;
			var updateChosenFromGrid = function($select,$grid,options){
				//遍历grid中的记录
				var gridIds = $grid.jqGrid('getDataIDs');
				var selectedIds = $grid.jqGrid('getGridParam', 'selarrrow');
				$(gridIds).each(function(index, id){
					var dataObject = $grid.jqGrid('getRowData', id);
					if(selectedIds.indexOf(id) != -1){
						//如果此行选中
						if($select.find("option[value=" + id + "]").length > 0){
							//如果已经加过了
							$select.find("option[value=" + id + "]").prop("selected",true);
						}else{
							//如果未加过了
							var showText = "name";
							if(newOptions.selectShowField){
								showText = dataObject[options.selectShowField];
							}
							var $option = $("<option value='" + id + "' selected>" + showText + "</option>");
							$.data($option[0],'dataObject',dataObject);
							$select.append($option);
						}
					}else{
						//如果此行未选中
						if($select.find("option[value=" + id + "]").length > 0){
							//如果已经加过了
							$select.find("option[value=" + id + "]").prop("selected",false);
						}
					}
				});
				$select.trigger('chosen:updated');
				$select.chosen().change();
			};
			var beChanged = false;//表格和下拉框关联时，判断是否被动更新，放只死循环
			var defaultOpts = {
				datatype: "json",
				mtype:"post",
				caption : 'caption',
				pager: "#" + randomPagerId,
				multiselect: false, // 带多选checkbox
				viewrecords: true,
				autowidth: true,
				autoheight: true,
				sortorder: "desc",
				jsonReader: {
					root: "data", // json中代表实际模型数据的入口
					page: "page", // json中代表当前页码的数据
					id: "id",
					total: "total", // json中代表页码总数的数据
					records: "records" // json中代表数据行总数的数据
				},
				rowNum: 10,
				rowList: [10, 20, 40, 100],
				altRows: true,
				multiboxonly: true,
				loadComplete: function() {
					var $grid = $(this);
					//修改单元格的悬浮提示
					for(var item in obj.options.tipsFunDataArr){
						var tempObj = obj.options.tipsFunDataArr[item];
						$(tempObj.argsArr).each(function(subIndex, args){
							var cellOpt = args[1];
							var $cell = $grid.find(" #" + cellOpt.rowId + " td:nth(" + cellOpt.pos + ")");
							$cell.attr("title",tempObj.fun(args[0],args[1],args[2]));
						});
						tempObj.argsArr = [];
					};
					//更新翻页的图标
					updatePagerIcons();
					//静态回选记录
					if(newOptions.preSelectedIds){
						$(newOptions.preSelectedIds).each(function(index, id){
							obj.grid.jqGrid('setSelection', id);
						});
					}else if(newOptions.relativeSelectId){
						//遍历下拉框中的记录
						var $select = $("#" + newOptions.relativeSelectId);
						var ids = $select.val();
						$(ids).each(function(index, id){
							obj.grid.jqGrid('setSelection', id);
							beChanged = false;
						});
					}
					//关联select动态回显记录
					if(newOptions.relativeSelectId && gridIsIniting){
						var $select = $("#" + newOptions.relativeSelectId);
						//给关联的select绑定change事件
						$select.chosen().change(function(e,selectedObj){
							if(!beChanged){
								//触发源是下拉框
								beChanged = true;
								if(selectedObj){
									obj.grid.jqGrid('setSelection', selectedObj.selected || selectedObj.deselected);
								}
							}else{
								//被迫更新,停止操作
								beChanged = false;
							}
						});
					}
					//调整table宽度
					$grid.jqGrid("setGridWidth",$grid.parents(".table-container:first").width());
					//调整table尺寸
					setTimeout(function() {$(window).trigger('resize');}, 0);
					//如果是单选
					if(newOptions.singleselect){
						$grid.parents(".ui-jqgrid-bdiv").prev().find("[type=checkbox]:first").detach();
					}
					//解除初始化标识
					gridIsIniting = false;
					//执行自定义的loadComplete回调函数
					if(typeof loadComplete == 'function')loadComplete();
				},
				beforeSelectRow:function(rowid,e){
					var ss = $(this).find(":checkbox").prop("disabled");
					return !ss;
				},
				onSelectRow:function(rowid,status){
					//单选或多选
					if(newOptions.singleselect && status){
						//拿到所有行的id,将其它行取消选中
						var gridIds = obj.grid.jqGrid('getGridParam', 'selarrrow');
						$(gridIds).each(function(index,id){
							if(id != rowid){
								obj.grid.jqGrid('setSelection', id);
							}
						});
						if(typeof onSelectRow == 'function')onSelectRow(rowid,status);
					}else if(!newOptions.singleselect){
						if(typeof onSelectRow == 'function')onSelectRow(rowid,status);
					}
					//跟select相互绑定
					if(newOptions.relativeSelectId){
						if(!beChanged){
							//触发源是grid
							beChanged = true;
							if(!gridIsIniting){
								updateChosenFromGrid($("#" + newOptions.relativeSelectId),obj.grid,newOptions);
							}
						}else{
							//被迫更新,停止操作
							beChanged = false;
						}
					}
				},
				onSelectAll:function(rowids, status){
					updateChosenFromGrid($("#" + newOptions.relativeSelectId),obj.grid,newOptions);
					//触发每一行的onSelectRow事件
					if(typeof onSelectAll == 'function'){
						onSelectAll(rowids,status);
					}
					$(rowids).each(function(index, rowid){
						obj.options.onSelectRow(rowid,status);
					});
				}
			};
			try {
				var colModel = newOptions.colModel;
				$(newOptions.colModel).each(function(index, item){
					//是否进行字典翻译
					if(item.translate){
						item.formatter = function(cellvalue, options, rowObject){
							return Venus.getSysCode(item.translate, cellvalue);
						};
					}
					//是否修改悬浮提示
					if(item.tipFormatter){
						newOptions.tipsFunDataArr["tipFun_" + item.name]={
							fun:item.tipFormatter,
							argsArr:[]
						};
						if(item.formatter && typeof item.formatter === "function"){
							//有formatter而且formatter是function
							var tempFormatter = $.extend(true,{},{formatter:item.formatter});
							item.formatter = function(value,cellOpt,rowObj){
								obj.options.tipsFunDataArr["tipFun_" + item.name].argsArr.push([value,cellOpt,rowObj]);
								return tempFormatter.formatter(value,cellOpt,rowObj);
							};
						}else if(!!item.formatter === false){
							//没有formatter
							item.formatter = function(value,cellOpt,rowObj){
								obj.options.tipsFunDataArr["tipFun_" + item.name].argsArr.push([value,cellOpt,rowObj]);
								return value;
							};
						}
					}
					if(item.name == 'operation'){
						item.formatter = function(cellvalue, options, rowObject){
							var value = rowObject.id;
							var name = rowObject.name;
							var resultStr = "";
							var operations = null;
							if(typeof item.operations == 'object'){
								operations = item.operations;
							}else if(typeof item.operations == 'function'){
								operations = item.operations(rowObject);
							}
							$(operations).each(function(opIndex, operation){
								var opArr = $.trim(operation).split('(');
								var optBtnStr = Venus.tableOperationHTMLArr[opArr[0]];
								//判断是否有自定义悬浮提示
								if(item.operationsTip && item.operationsTip[opArr[0]]){
									optBtnStr = optBtnStr.replace(/title=.* onclick/,"title=\"" + item.operationsTip[opArr[0]] + "\" onclick");
								}
								if(opArr.length > 1){
									//有参数定义
									var args = opArr[1].replace(')','').split(',');
									var operationfunStr = 'window.' + config.options + '.' + opArr[0] + '(';
									$(args).each(function(index,arg){
										if(arg == 'this'){
											operationfunStr += "this,";
										}else{
											operationfunStr += "'" + rowObject[arg] + "',";
										}
									});
									operationfunStr = operationfunStr.substr(0,operationfunStr.length - 1);
									operationfunStr += ")";
									resultStr += optBtnStr.replace('operationfun',operationfunStr);
								}else{
									resultStr += optBtnStr.replace('operationfun',
										'window.' + config.options + '.' + opArr[0] +
										"(" +
										"'" + rowObject.id + "'," +
										"'" + rowObject.name + "'" +
										")");
								}
							});
							return resultStr;
						};
					}
				});
			} catch (e) {
				//console.log(e.toString() + " @Venus.js");
			}
			if(!newOptions) return true;
			delete newOptions.loadComplete;
			delete newOptions.onSelectRow;
			delete newOptions.onSelectAll;
			//如果不需要分页
			if(newOptions.hasOwnProperty('pager') && newOptions.pager === null){
				delete defaultOpts.pager;
				delete defaultOpts.rowNum;
				delete defaultOpts.rowList;
			}
			obj.options = jQuery.extend(true, {}, defaultOpts, newOptions);

			obj.grid = null; // 外界可以使用grid变量，操作jqgrid
			/**
			 * 手动初始化jqgrid
			 */
			obj.init = function() {
				obj.grid = jQuery("#" + randomTableId).jqGrid(this.options);
				//标志表格是第一次加载
				gridIsIniting = true;
				//加载头部按钮
				var $grid = obj.grid;
				var $tableContainer = $grid.parents(".table-container:first");
				var $btnsContainer = $(".grid-title-btns-venus[data-target=" + $tableContainer.attr("id") + "]:first");
				if($btnsContainer.length != 0){
					var $btns = $btnsContainer.find("button");
					var $titleBar = $tableContainer.find(".ui-jqgrid-titlebar:first");
					$titleBar.find("span.ui-jqgrid-title:first").detach();
					$btns.addClass("btn btn-primary pull-left");
					$btns.prependTo($tableContainer.find(".ui-jqgrid-titlebar:first"));
					var $btnSpliter = $("<span class='btn-spliter'></span>")
					$btns.after($btnSpliter);
					Venus.addpulsEffect($btns);
					Venus.initVenusButton();
					$btnsContainer.detach();
					$tableContainer = $btnsContainer = $btns = $titleBar = $btnSpliter = null;
				}
				$.data($this[0],'jqgrid',obj);
			};
			obj.init();
			/**
			 * 更新jqgrid的options，重新加载jqgrid
			 */
			obj.reload = function(op) {
				obj.grid.setGridParam(op).trigger('reloadGrid');
			};
			newOptions.grid = obj;
			//标识完成
			$this.attr("table-venus-init", "done");
		});
	};

	/**
	 * 解析框架中的表单控件
	 * @Attr options grid属性设置
	 * 示例：
	 *<div
	 *  class="form-widget-venus"
	 *  data-venus="{
	 *		'options':''
	 *	}"></div>
	 */
	Venus.initVenusFormWidgets = function() {
		
		$(".form-widget-venus").each(function(index, item) {
			var $widget = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($widget.attr("form-widget-venus") == "done") return true;
			$widget.addClass("form-control");
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			var widgetType = $widget.attr("type") || this.tagName.toLowerCase();
			var settings = $widget.parents("form:first").length > 0 &&
				$widget.parents("form:first").validate().settings; //拿到验证setting
			var $errorMsgDiv = null;
			$errorMsgDiv = $('<div class="error-msg ' + (config.errMsgColNum || '') + '" style="display:' + (config.hide === true ? 'none' : '') + '">&nbsp;</div>');
			config.errMsgColNum && $widget.after($errorMsgDiv);//如果没设置错误提示就不去显示它
			//如果是模糊查询框则右浮动
			var blurQueryStyle = "";
			if($widget.attr("name") === "blurQueryField" && $widget.parents("form.query-form-venus").length > 0){
				blurQueryStyle = "float:right;"
			}
			$widget.wrap("<div class='widget-container " + config.colNum + "' style='margin-bottom:10px;display:" + (config.hide === true ? 'none' : '') + ";" + blurQueryStyle + "'></div>");
			$widget.wrap("<div class='input-group' style='width:100%'></div>");
			var $label = $("<span class='input-group-addon'>" + config.label + "</span>");
			//是否隐藏label
			if(!config.hideLabel){
				$widget.before($label);
			}else{
				$widget.attr("placeholder",config.label);
			}
			var randomIconContainerId = Venus.getRandomId();
			$widget.wrap('<span class="input-icon input-icon-right" id="' + randomIconContainerId + '" style="width:100%;"></span>');
			//如果是隐藏的则删掉验证
			if(config.hide === true){
				try {
					$widget.rules("remove");
				} catch (e) {
					////console.log(e);
				}
			}

			var $helpIcon = $('<i class="ace-icon fa fa-lightbulb-o orange" style="display:none"></i>');
			//将提示控件附加到控件上
			$.data($widget[0],'helpIcon',$helpIcon);
			var popoverOpts = {
				'styleClass': 'popover-info',
				'title': config.label,
				'container': 'body',
				'trigger': 'hover',
				'html': true,
				'placement': 'auto'
			};
			if ($widget.parents('form').length > 0 &&
					$widget.rules().required === true  &&
					$widget.parents(".input-group:first").find("span.required-start").length === 0) {
				$widget.parents(".input-group:first").find(".input-group-addon:first").append("<span class='required-start'>&nbsp;*</span>");
			}
			$helpIcon.popover(popoverOpts);
			$widget.focusin(function() {
				var fieldDescStr = ""; //字段描述
				var fieldFormatDescStr = ""; //验证格式说明
				try { //为必填项加星号，展示字段填写信息
					var fieldName = $widget.attr('name');
					fieldDescStr = settings.descriptions[fieldName];
					for (var key in settings.rules[fieldName]) {
						var msgItem = settings.messages[fieldName] ? settings.messages[fieldName][key] : null;
						if (!msgItem) {
							if (typeof $.validator.messages[key] == "function") {
								msgItem = $.validator.messages[key](settings.rules[fieldName][key]);
							} else {
								msgItem = $.validator.messages[key];
							}
						}
						fieldFormatDescStr += msgItem + ',';
					}
				} catch (e) {
					////console.log(e);
					////console.log(config.label + " 没有验证规则")
				}
				var popContent = '';
				popContent += fieldDescStr ? '<b>' + Venus.msg("fieldDesc") + '：</b><br/>' + fieldDescStr + '<br/><br/>':'';
				popContent += fieldFormatDescStr ? '<b>' + Venus.msg("fieldFormatDesc") + '：</b><br/>' + fieldFormatDescStr + '<br/><br/>':'';
				popoverOpts.content = popContent;
				if (settings.singleColumn) $errorMsgDiv.find('.no-error-message-tip').detach(); //去除对钩
				if ($widget.hasClass("validationError")) {
					$helpIcon.popover("destroy");
					popoverOpts.styleClass = 'popover-error';
					$helpIcon.popover(popoverOpts);
				} else {
					$helpIcon.popover("destroy");
					popoverOpts.styleClass = 'popover-info';
					$helpIcon.popover(popoverOpts);
				}
				settings && (fieldDescStr || fieldFormatDescStr) && $helpIcon.show();
			});
			$widget.focusout(function() {
				$helpIcon.hide();
				if(!settings)return;//不需要验证
				if ($widget.valid()) {
					//失去焦点时验证输入内容,如果正确，打对勾
					Venus.showRightTick &&
						$errorMsgDiv &&
						$errorMsgDiv.html('<i class="ace-icon fa fa-check no-error-message-tip green" style="margin-top:7px;"></i>');
				} else {
					//Venus.useAnimation && Venus.animate($widget.parents(".input-group:first"), "shake", {
					//	duration: "0.5s"
					//});
				}
			});
			//根据不同控件特殊处理
			if (widgetType == "text") {
				Venus.initVenusFormWidgetsInput($widget, $helpIcon,  config);
			} else if (widgetType == 'file') {
				Venus.initVenusFormWidgetsFile($widget, $helpIcon,  config);
			} else if (widgetType == 'radio') {
				Venus.initVenusFormWidgetsRadio($widget, $helpIcon,  config);
			} else if (widgetType == 'checkbox') {
				Venus.initVenusFormWidgetsCheckBox($widget, $helpIcon,  config, $label);
			} else if (widgetType == 'textarea') {
				Venus.initVenusFormWidgetsTextarea($widget, $helpIcon,  config, $label);
			} else if (widgetType == 'password') {
				$widget.after($helpIcon);
			} else if (widgetType == 'select') {
				Venus.initVenusFormWidgetsSelect($widget, $helpIcon,  config);
			}
			//设置错误提示的高度
			$errorMsgDiv && $errorMsgDiv.css('height', $errorMsgDiv.prev().height());
			$widget.addClass("form-control");
			//标识完成
			$widget.attr("form-widget-venus", "done");
		});
		/**
		 * 对齐表单名称
		 */
		Venus.alignInputGroupAddon();
	};

	Venus.alignInputGroupAddon = function(){
		var width = 0;
		$('form').each(function(index, form){
			var $form = $(form);
			var $inputAddons = $form.find(".input-group-addon");
			$inputAddons.each(function(index, item) {
				var $item = $(item);
				if ($item.next().hasClass("input-icon")){
					if($item.is(":first-child")){
						if ($item.width() > width) width = $item.width();
					}else{
						if ($item.width() + $item.prev().width() > width) width = $item.width() + $item.prev().width();
					}
				}
			});
			$inputAddons.each(function(index, item) {
				var $item = $(item);
				if ($item.next().hasClass("input-icon")){
					if($item.is(":first-child")){
						$item.css("padding-right", width - $item.width() + 12);
					}else{
						$item.prev().css("padding-right", width - $item.width() - $item.prev().width() + 12);
					}
				}

			});
		});
	};
	Venus.initVenusFormWidgetsTextarea = function($widget, $helpIcon,  config, $label){
		//绑定reset函数
		$.data($widget[0],"init-value",$widget.val());
		$.data($widget[0],"reset",function(){
			if(config.useEditor !== true){
				$widget.val($widget.data("init-value"));
			}
		});
		//添加问号提示
		if(config.useEditor !== true){
			$widget.after($helpIcon);
		}
		if(config.useEditor === true){
			var $editContainer = $("<span style='width:100%;'></span>");
			var tempUEId = Venus.getRandomId();
			var widgetName = $widget.attr("name");
			var isEmpty = ($widget.html() == "") ? true : false;
			var $editor = $('<script name="' + widgetName + '" id="' + tempUEId + '" type="text/plain" style="width:100%">' + (isEmpty ? '&nbsp;' : $widget.html()) + '</script>');
			$widget.removeAttr("name");
			$editContainer.append($editor);
			$widget.after($editContainer);
			var ue = UE.getEditor(tempUEId, config.UEditorOpts || {});
			ue.addListener( 'ready', function( editor ) {
				if(config.UEditorOpts && config.UEditorOpts.height){
					ue.setHeight(config.UEditorOpts.height);
				}
				$.data($widget.parents("form:first").find("#ueditor_textarea_" + widgetName)[0], 'ueditor', ue);
				ue.setContent("");
				if(!isEmpty){
					ue.execCommand('insertHtml', $widget.text());
				}
				$widget.detach();
			});
		}
	};
	/**
	 * 解析框架中的表单控件
	 * @Attr options grid属性设置
	 * 示例：
	 <input name="menuNo" type="text" class="form-widget-venus"
		data-venus="{
			'label':'日期',
			'isDate':true,
			'dateOption':{
				'dateType':'date',           //日期控件的类型 date:日期 time:时间 dateTime:日期时间 dateRange:日期段 dateTimeRange:日期时间段
				'format':'yyyyy-mm-dd',      //日期控件的格式
				'start':'fromName',        //日期开始的name
				'end':'toName',          //日期结束的name
			},
			'colNum':'col-sm-4',
			'errMsgColNum':'col-sm-2'}" />
	 */
	Venus.initVenusFormWidgetsInput = function($widget, $helpIcon, config){
		$widget.after($helpIcon);
		if(config.isRange === true){
			//如果是Range控件
			Venus.initVenusFormWidgetsRange($widget, $helpIcon, config);
		}else if (config.isDate === true){
			//如果是日期控件
			Venus.initVenusFormWidgetsDate($widget, $helpIcon, config);
		}else{
			//普通文本框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				$widget.val($widget.data("init-value"));
			});
		}

	};

	Venus.initVenusFormWidgetsRange = function($widget, $helpIcon, config){
		$widget.attr("name",config.startName);
		$widget.val(config.start || '');
		var $rangeIcon = $('<span class="input-group-addon" style="width:24px;border-left: 0px;border-right: 0px;"><i class="fa fa-exchange"></i></span>');
		$widget.after($rangeIcon);
		var $endInput = $('<input type="text" class="form-control" name="' + config.endName + '" value="' + (config.end || '') + '"/>');
		$rangeIcon.after($endInput);
		if ($widget.rules().required === true  &&
				$widget.parents(".input-group:first").find("span.required-start").length === 0) {
			$widget.parents(".input-group:first").find(".input-group-addon:first").append("<span class='required-start'>&nbsp;*</span>");
			if($endInput.rules().required !== true){
				$endInput.rules("add",{required:true})
			}
		}
		$endInput.focusout(function() {
			if ($endInput.valid()) {
				//失去焦点时验证输入内容,如果正确，打对勾
				Venus.showRightTick &&
					$errorMsgDiv &&
					$errorMsgDiv.html('<i class="ace-icon fa fa-check no-error-message-tip green" style="margin-top:7px;"></i>');
			}
			$widget.valid();
		});
		//当控件改变值时，触发验证
		$widget.change(function(){
			$widget.valid();
			$endInput.valid();
		});
		$endInput.change(function(){
			$widget.valid();
			$endInput.valid();
		});
		if(config.rangeOptions && config.rangeOptions.rangeType == 'time'){
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			$endInput.after($clearIcon);
			$widget.timepicker({
				minuteStep: 1,
				showSeconds: true,
				showMeridian: false
			});
			$endInput.timepicker({
				minuteStep: 1,
				showSeconds: true,
				showMeridian: false
			});
			$clearIcon.click(function(){
				$widget.val("");
				$endInput.val("");
			});
			$widget.rules("add",{timeBefore:'[name=' + $endInput.attr('name') + ']'})
		}
		//范围文本框的初始化记录与绑定
		$.data($widget[0],"init-value",$widget.val() + "----" + $endInput.val());
		$.data($widget[0],"reset",function(){
			var tempArr = $widget.data("init-value").split("----");
			$widget.val(tempArr[0]);
			$endInput.val(tempArr[1]);
		});
	};

	Venus.initVenusFormWidgetsDate = function($widget, $helpIcon, config){
		var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
		if(config.clearBtn !== false){
			$widget.parent().after($clearIcon);
		}
		var dateOption = config.dateOption || {dateType:'date'};
		if(dateOption.dateType == 'date'){
			var datepickerOpts = {
				autoclose:false,
				todayHighlight: true,
				zIndexOffset:8888888888888888,
				format:'yyyy-mm-dd'
			};
			datepickerOpts = $.extend(true,datepickerOpts,dateOption);
			$widget.datepicker(datepickerOpts);
			$clearIcon.on('click',function(){
				$widget.val("");
			});
			//日期框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				$widget.val($widget.data("init-value"));
			});
		}else if(dateOption.dateType == 'time'){
			var timepickerOpt = {
				minuteStep: 1,
				showSeconds: true,
				showMeridian: false
			};
			timepickerOpt = $.extend(true,timepickerOpt,dateOption);
			$widget.timepicker(timepickerOpt);
			$clearIcon.on('click',function(){
				$widget.val("");
			});
			//时间框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				$widget.val($widget.data("init-value"));
			});
		}else if(dateOption.dateType == 'dateTime'){
			Venus.waitToDestroyDateWidgets.push({
				type:'dateTime',
				object:$widget
			});
			var datetimeOpts = {
				autoUpdateInput:false,
				singleDatePicker: true,
				showDropdowns: true,
				timePicker: true,
			    timePicker24Hour: true,
			    timePickerIncrement: 1,
			    showWeekNumbers: true,
			    timePickerSeconds: true,
				'applyClass' : 'btn-sm btn-success',
				'cancelClass' : 'btn-sm ',
				locale: {
					applyLabel: '确认',
					cancelLabel: '取消',
					format: 'YYYY-MM-DD HH:mm:ss'
				},
				startDate:$widget.val() || '',
				endDate:''
			};
			datetimeOpts = $.extend(true,datetimeOpts,dateOption);
			$widget.daterangepicker(
				datetimeOpts
			);
			$clearIcon.on('click',function(){
				$widget.val("");
			});
			if($widget.val() === "Invalid date"){
				$clearIcon.click();
				try{
					//console.log("初始日期有误：" + $widget.val());
					}catch(e){}
			}
			$widget.on('apply.daterangepicker', function(ev, picker) {
				if(picker.startDate._i){
					$widget.val(picker.startDate.format(datetimeOpts.locale.format));
				}
			});
			//时间框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				$widget.val($widget.data("init-value"));
			});
		}else if(dateOption.dateType == 'dateRange'){
			Venus.waitToDestroyDateWidgets.push({
				type:'dateRange',
				object:$widget
			});
			var $startDate = $("<input name='" + (dateOption.startName || '') + "' value='" + (dateOption.start || dateOption.startDate || '') + "' type='hidden' />");
			var $endDate = $("<input name='" + (dateOption.endName || '') + "' value='" + (dateOption.end || dateOption.endDate || '') + "' type='hidden' />");
			$widget.after($endDate).after($startDate);
			var daterangepickerOpts = {
				autoUpdateInput:false,
		        showDropdowns: true,
			    showWeekNumbers: true,
				'applyClass' : 'btn-sm btn-success',
				'cancelClass' : 'btn-sm',
				locale: {
					applyLabel: '确认',
					cancelLabel: '取消',
					format: 'YYYY-MM-DD'
				},
				startDate:'',
				endDate:'',
			};
			daterangepickerOpts = $.extend(true,daterangepickerOpts,dateOption);
			$widget.daterangepicker(
				daterangepickerOpts,
				function(start, end, label){
					$startDate.val(start.format(dateOption.format || 'YYYY-MM-DD'));
					$endDate.val(end.format(dateOption.format || 'YYYY-MM-DD'));
				}
			);
			if(daterangepickerOpts.startDate){
				$widget.val((daterangepickerOpts.startDate || '') + " - " + (daterangepickerOpts.endDate || ''));
			}
			$clearIcon.on('click',function(){
				$widget.val("");
				$startDate.val("");
				$endDate.val("");
			});
			if($widget.val() === "Invalid date"){
				$clearIcon.click();
				try{
					//console.log("初始日期有误：start: " + $startDate.val() + " end: " + $endDate.val());
					}catch(e){}
			}
			$widget.on('apply.daterangepicker', function(ev, picker) {
				$startDate.val(picker.startDate.format(daterangepickerOpts.locale.format));
				$endDate.val(picker.endDate.format(daterangepickerOpts.locale.format));
				$widget.val($startDate.val() + " - " + $endDate.val());
			});
			//日期范围框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				var tempArr = $widget.data("init-value").split(" - ");
				$widget.val(tempArr[0] + " - " + tempArr[1]);
				$startDate.val(tempArr[0]);
				$endDate.val(tempArr[1]);
			});
		}else if(dateOption.dateType == 'dateTimeRange'){
			Venus.waitToDestroyDateWidgets.push({
				type:'dateTimeRange',
				object:$widget
			});
			var $startDate = $("<input name='" + (dateOption.startName || '') + "' value='" + (dateOption.startDate || '') + "' type='hidden' />");
			var $endDate = $("<input name='" + (dateOption.endName || '') + "' value='" + (dateOption.endDate || '') + "' type='hidden' />");
			$widget.after($endDate).after($startDate);
			//$widget.val((dateOption.start || '') + " - " + (dateOption.end || ''));
			//处理minDate和maxDate
			if(dateOption.minDate){
				dateOption.minDate = Venus.str2Obj(dateOption.minDate);
			}
			if(dateOption.maxDate){
				dateOption.maxDate = Venus.str2Obj(dateOption.maxDate);
			}
			var daterangepickerOpts = {
				autoUpdateInput:true,
				showDropdowns: true,
				timePicker: true,
			    timePicker24Hour: true,
			    timePickerIncrement: 1,
			    showWeekNumbers: true,
			    timePickerSeconds: true,
				'applyClass' : 'btn-sm btn-success',
				'cancelClass' : 'btn-sm ',
				locale: {
					applyLabel: '确认',
					cancelLabel: '取消',
					format: 'YYYY-MM-DD HH:mm:ss'
				},
				startDate:'',
				endDate:''
			};
			daterangepickerOpts = $.extend(true,daterangepickerOpts,dateOption);
			$widget.daterangepicker(
				daterangepickerOpts,
				function(start, end, label){
					$startDate.val(start.format(dateOption.format || 'YYYY-MM-DD HH:mm:ss'));
					$endDate.val(end.format(dateOption.format || 'YYYY-MM-DD HH:mm:ss'));
				}
			);
			if(daterangepickerOpts.startDate){
				$widget.val((daterangepickerOpts.startDate || '') + " - " + (daterangepickerOpts.endDate || ''));
			}
			$clearIcon.on('click',function(){
				$widget.val("");
				$startDate.val("");
				$endDate.val("");
			});
			if($widget.val() === "Invalid date"){
				$clearIcon.click();
				try{
					//console.log("初始日期有误：start: " + $startDate.val() + " end: " + $endDate.val());
					}catch(e){}
			}
			$widget.on('apply.daterangepicker', function(ev, picker) {
				$startDate.val(picker.startDate.format(daterangepickerOpts.locale.format));
				$endDate.val(picker.endDate.format(daterangepickerOpts.locale.format));
				$widget.val($startDate.val() + " - " + $endDate.val());
			});
			//日期时间范围框的初始化记录与绑定
			$.data($widget[0],"init-value",$widget.val());
			$.data($widget[0],"reset",function(){
				var tempArr = $widget.data("init-value").split(" - ");
				$widget.val(tempArr[0] + " - " + tempArr[1]);
				$startDate.val(tempArr[0]);
				$endDate.val(tempArr[1]);
			});
		} else if(dateOption.dateType == 'monthOnly'){
			var datepickerOpts = {
					autoclose:true,
					todayHighlight: true,
					zIndexOffset:8888888888888888,
					todayBtn: "linked",
					format:'yyyy-mm',
					language:'zh-CN',
					startView: 'year',
				    viewMode: "months", 
				    minViewMode: "months"
				};
				datepickerOpts = $.extend(true,datepickerOpts,dateOption);
				$widget.datepicker(datepickerOpts);
				$clearIcon.on('click',function(){
					$widget.val("").trigger("change");
				});
				//日期框的初始化记录与绑定
				$.data($widget[0],"init-value",$widget.val());
				$.data($widget[0],"reset",function(){
					$widget.val($widget.data("init-value"));
				});
			} else if(dateOption.dateType == 'datePlus'){
				Venus.waitToDestroyDateWidgets.push({
					type:'datePlus',
					object:$widget
				});
				var dateplusOpts = {
						autoUpdateInput:false,
						singleDatePicker: true,
						showDropdowns: true,
					    timePicker24Hour: false,
					    timePickerIncrement: 1,
					    showWeekNumbers: false,
					    timePickerSeconds: false,
					    format: 'YYYY-MM-DD',
					    language:'zh-CN',
						startDate:$widget.val() || '',
						endDate:''
				};
				dateplusOpts = $.extend(true,dateplusOpts,dateOption);
				$widget.daterangepicker(
						dateplusOpts
				);
				$clearIcon.on('click',function(){
					$widget.val("");
				});
				if($widget.val() === "Invalid date"){
					$clearIcon.click();
					try{
						//console.log("初始日期有误：" + $widget.val());
						}catch(e){}
				}
				$widget.on('apply.daterangepicker', function(ev, picker) {
					if(picker.startDate._i){
						$widget.val(picker.startDate.format(dateplusOpts.locale.format));
					}
				});
				//时间框的初始化记录与绑定
				$.data($widget[0],"init-value",$widget.val());
				$.data($widget[0],"reset",function(){
					$widget.val($widget.data("init-value"));
				});
			}
	};
	Venus.initVenusFormWidgetsFile = function($widget, $helpIcon, config){
		var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
		var $uploadBtn = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-upload'></i></span>");
		var $previewBtn = $("<span class='input-group-addon'><i class='ace-icon fa fa-search-plus'></i></span>");
		$widget.parent().after($clearIcon);
		var uploadCallback = Venus.str2Obj(config.uploadCallback);
		if(typeof uploadCallback == 'function'){
			$clearIcon.after($uploadBtn);
			$uploadBtn.click(function(){
				uploadCallback($widget);
			});
			var previewCallback = Venus.str2Obj(config.previewCallback);
			if(typeof previewCallback == 'function'){
				$uploadBtn.after($previewBtn);
				$previewBtn.click(function(){
					previewCallback($widget);
				});
			}
		}
		var defaultFileOption = {
			no_file:'No File ...',
			btn_choose:'',
			btn_change:'',
			icon_remove:false,
			droppable:false,
			thumbnail:false //| true | large
			//whitelist:'gif|png|jpg|jpeg'
			//blacklist:'exe|php'
		};
		var newFileOptions = $.extend(true, defaultFileOption, config);
		$widget.ace_file_input(newFileOptions).on('change', function(){
			////console.log($(this).data('ace_input_files'));
			////console.log($(this).data('ace_input_method'));
			$widget.valid();
		});
		var $hiddenFileInput = null;
		var $fileNameSpan = null;
		if(config.hiddenField){
			//增加隐藏域用来存储文件名
			$hiddenFileInput = $("<input type='hidden' name='" + config.hiddenField + "' />");
			$widget.after($hiddenFileInput);
			//拿到文件名的span
			$fileNameSpan = $hiddenFileInput.next().find(".ace-file-name:first");
			$fileNameSpan.attr("data-path",config.preSelected || "");
			$fileNameSpan.addClass("show-file-path");
			$widget.change(function(){
				$hiddenFileInput.val($widget.val());
				$fileNameSpan.attr("data-path",$widget.val());
			});
		}
		if(config.preSelected){
			$widget.ace_file_input('show_file_list', config.preSelected);
			config.hiddenField && $hiddenFileInput.val(config.preSelected);
		}
		if(config.disable){
			$widget.ace_file_input('disable');
		}
		$clearIcon.on('click',function(){
			$widget.val("").valid();
			$hiddenFileInput && $hiddenFileInput.val("");
			$widget.ace_file_input('reset_input_ui');
		});
		//文件域的初始化记录与绑定
		$.data($widget[0],"init-value",$widget.val());
		$.data($widget[0],"reset",function(){
			$widget.ace_file_input('show_file_list', config.preSelected);
			if(config.hiddenField){
				$hiddenFileInput.val(config.preSelected || "");
				$fileNameSpan.attr("data-path",config.preSelected || "");
			}
			if(!config.preSelected || config.preSelected.length == 0){
				$widget.ace_file_input('reset_input_ui');
			}
		});
	};

	Venus.initVenusFormWidgetsRadio = function($widget, $helpIcon, config){
		var $clearIcon = null;
		if(config.clearBtn === true){
			$clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			$widget.after($clearIcon);
		}
		var $radioContainer = $("<div class='radio no-margin radio-container '></div>");
		$widget.wrap($radioContainer);
		var addOneRadio = function($widget,object){
			var itemStr = "<label title='@@title'><input type='radio' name='@@name' value='@@value' @@checked class='ace' @@disabled/>" +
							"<span class='lbl'>@@text</span></label>";
			itemStr = itemStr.replace("@@name", $widget.attr("name"))
				.replace("@@value", object.value)
				.replace("@@checked", (object.checked === true || object.value == config.preChecked) ? "checked" : "")
				.replace("@@disabled", object.disabled === true || $widget.is("[disabled]") ? 'disabled' : '')
				.replace("@@text", object.text)
				.replace("@@title",object.title?object.title:'');
			var $item = $(itemStr);
			if(config.onClick){
				var $radio = $item.find("input[type=radio]");
				$radio.on('change',function(){
					Venus.str2Obj(config.onClick) && Venus.str2Obj(config.onClick)(object,$radio[0]);
				});
			}
			$widget.before($item);
			var radioDom = $item.find("[type=radio]")[0];
			$.data(radioDom,'dataObject',object);
			$(radioDom).addClass("form-widget-venus").attr("form-widget-venus", "done");
			//绑定reset函数
			var initChecked = $(radioDom).prop("checked");
			$.data(radioDom,"reset",function(){
				$(radioDom).prop("checked",initChecked);
			});
		};
		var data = [];
		if(config.items && config.items.length > 0){
			//用页面静态的items遍历
			data = config.items;
		}else if(config.localData){
			//用本地数组遍历
			if(typeof config.localData == 'object' && config.localData.length > 0){
				data = config.localData;
			}else{
				//用字典的数据遍历
				config.localData = Venus.str2Obj(config.localData);
				for(var key in config.localData){
					data.push({value:key,text:config.localData[key]});
				}
			}
		}else{
			//用URL加载
			$.getJSON(config.url, function(data) {
				//如果载入控件之前需要处理
				if (config.dataPreHandler)
					data = Venus.str2Obj(config.dataPreHandler)(data);
				$(data).each(function(index, item) {
					addOneRadio($widget, item);
				});
			});
		}
		if (config.dataPreHandler)
			data = Venus.str2Obj(config.dataPreHandler)(data);
		$(data).each(function(index, item) {
			addOneRadio($widget, item);
		});
		$widget.detach();
		if($clearIcon){
			$clearIcon.click(function(){
				$(this).prev().find('[type=radio]').prop('checked',false);
			});
		}
	};

	Venus.initVenusFormWidgetsCheckBox = function($widget, $helpIcon, config, $label){
		var $clearIcon = null;
		if(config.clearBtn === true){
			$clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			$widget.after($clearIcon);
		}
		var $checkBoxContainer = $("<div class='checkbox no-margin radio-container '></div>");
		$widget.wrap($checkBoxContainer);
		var addOneCheckbox = function($widget,object){
			var itemStr = "<label title='@@title'><input type='checkbox' name='@@name' value='@@value' @@checked class='ace' @@disabled/>" +
							"<span class='lbl'>@@text</span></label>";
			itemStr = itemStr.replace("@@name", $widget.attr("name"))
				.replace("@@value", object.value)
				.replace("@@checked", (object.checked === true || (config.preChecked && config.preChecked.indexOf(object.value) != -1)) ? "checked" : "")
				.replace("@@disabled", object.disabled === true  || $widget.is("[disabled]") ? 'disabled' : '')
				.replace("@@text", object.text)
				.replace("@@title",object.title?object.title:'');
			var $item = $(itemStr);
			if(config.onClick){
				var $checkbox = $item.find("input[type=checkbox]");
				$checkbox.on('change',function(){
					Venus.str2Obj(config.onClick)(object,$checkbox[0]);
				});
			}
			$widget.before($item);
			var checkboxDom = $item.find("[type=checkbox]")[0];
			$.data(checkboxDom,'dataObject',object);
			$(checkboxDom).addClass("form-widget-venus").attr("form-widget-venus", "done");

			//绑定reset函数
			var initChecked = $(checkboxDom).prop("checked");
			$.data(checkboxDom,"reset",function(){
				$(checkboxDom).prop("checked",initChecked);
			});
		};
		var data = [];
		if(config.items && config.items.length > 0){
			//用页面静态的items遍历
			data = config.items;
		}else if(config.localData){
			//用本地数组遍历
			if(typeof config.localData == 'object' && config.localData.length > 0){
				data = config.localData;
			}else{
				//用字典的数据遍历
				config.localData = Venus.str2Obj(config.localData);
				for(var key in config.localData){
					data.push({value:key,text:config.localData[key]});
				}
			}
		}else{
			//用URL加载
			$.getJSON(config.url, function(data) {
				//如果载入控件之前需要处理
				if (config.dataPreHandler)
					data = Venus.str2Obj(config.dataPreHandler)(data);
				$(data).each(function(index, item) {
					addOneCheckbox($widget, item);
				});
			});
		}
		if (config.dataPreHandler)
			data = Venus.str2Obj(config.dataPreHandler)(data);
		$(data).each(function(index, item) {
			addOneCheckbox($widget, item);
		});
		$widget.after($helpIcon);
		$widget.detach();
		if($clearIcon){
			$clearIcon.click(function(){
				$(this).prev().find('[type=checkbox]').prop('checked',false);
			});
		}
		//附加操作
		if(config.additionalOptions || true){
			var $labelAdditional = $(
					'<span class="input-group-addon input-group-addon-operation">' +
					'	<button data-toggle="dropdown" class="btn btn-xs btn-additional dropdown-toggle">' +
					'	<span class="ace-icon fa fa-caret-down icon-only" style="color:black;"></span>' +
					'	</button>' +
					'	<ul class="dropdown-menu">' +
					'		<li><a class="selectAllAction">' + Venus.msg('selectAll') + '</a></li>' +
					'		<li><a class="selectInverseAction">' + Venus.msg('selectInverse') + '</a></li>' +
					'	</ul>' +
					'</span>');
			$label.after($labelAdditional);
			var $selectAllBtn = $labelAdditional.find(".selectAllAction");
			var $selectInverseBtn = $labelAdditional.find(".selectInverseAction");
			$selectAllBtn.click(function(){
				var $checkboxes = $labelAdditional.next().find('[type=checkbox]:enabled');
				if($checkboxes.filter(':not(:checked)').length === 0){
					$checkboxes.prop('checked',false).trigger("change");
				}else{
					$checkboxes.prop('checked', true).trigger("change");
				}
			});
			$selectInverseBtn.click(function(){
				var $checkboxes = $labelAdditional.next().find('[type=checkbox]:enabled');
				$checkboxes.each(function(index, checkbox){
					var $checkbox = $(checkbox);
					$checkbox.prop('checked',function(){
						return !$checkbox.prop('checked');
					}).trigger("change");
				});
			});
		}
	};

	Venus.initVenusFormWidgetsSelect = function($widget, $helpIcon, config){
		$widget.after($helpIcon);
		var initChoseSelect = function($select){

			if($select.next().hasClass("chosen-container")){
				$select.trigger('chosen:updated');
			}else{
				//如果是IE，则需要手动初始调用update方法
				var needInitUpdate = false;
				var className = $select.attr("class");
				if($select.find("option:contains('-" + config.label + "-')").length == 0 &&
						className.indexOf("input-multi-select-venus") == -1 &&
						className.indexOf("input-custome-select-venus") == -1 &&
						className.indexOf("select-table-chosen-venus") == -1 &&
						className.indexOf("select-complex-chosen-venus") == -1 &&
						(config.labelToOption === undefined || config.labelToOption === true) &&
						!$select.attr("multiple")){
					if(!config.noBlank){
						if($select.find("option[selected]").length === 0){
							$select.prepend('<option value="" selected="selected">--' + config.label + '--</option');
							needInitUpdate = true;
						}else{
							$select.prepend('<option value="">--' + config.label + '--</option');
						}
					}
				}
				$select.chosen({
					no_results_text: Venus.msg('no-data'),
					placeholder_text : " ",
					allow_single_deselect:true,
					search_contains: true,
					disable_search_threshold: 10
				});
				if(needInitUpdate){
					$select.val("").trigger("chosen:updated");
				}
			}
			//绑定reset事件
			if(!$select.data("reset")){
				var initSelected = $select.val();
				$.data($select[0],"reset",function(){
					$select.val(initSelected).trigger("chosen:updated");
				});
			};
			//change时出发验证
			$select.change(function(){
				$select.valid();
			});
		};
		var fillSelect = function($select, data) {
			var config = $select.data("config") || eval("(" + $select.attr("data-venus") + ")");
			var preSelectedIds = Venus.str2Obj(config.preSelected);
			var $options = [];
			if(data.length > 0){
				for (var i = 0; i < data.length; i++) {
					var optionStr = '<option value="@@value" @@selected>@@text</option>';
					optionStr = optionStr.replace(/@@value/g, data[i][config.valueName] || data[i].id);
					optionStr = optionStr.replace(/@@text/g, data[i][config.textName] || data[i].name);
					if(preSelectedIds && preSelectedIds.indexOf(data[i][config.valueName] || data[i].id) != -1){
						optionStr = optionStr.replace(/@@selected/, "selected");
					}else{
						optionStr = optionStr.replace(/@@selected/, "");
					}
					var $option = $(optionStr);
					$.data($option[0],'dataObject',data[i]);
					$options.push($option);
				}
			}else{
				for (var key in data) {
					var optionStr = '<option value="@@value" @@selected>@@text</option>';
					optionStr = optionStr.replace(/@@value/g, key);
					optionStr = optionStr.replace(/@@text/g, data[key]);
					if(preSelectedIds && preSelectedIds.indexOf(key) != -1){
						optionStr = optionStr.replace(/@@selected/, "selected");
					}else{
						optionStr = optionStr.replace(/@@selected/, "");
					}
					var $option = $(optionStr);
					$.data($option[0],'dataObject',data[i]);
					$options.push($option);
				}
			}
			$select.html("");
			$select.append($options);
			//config.chosen &&
				initChoseSelect($select);
		};

		//获取下拉数据
		if (config.localData) {
			//从jsonData加载
			var data = Venus.str2Obj(config.localData);
			if($.isArray(data)){
				data = $.extend(true, [], data);
			}else{
				data = $.extend(true, {}, data);
			}
			fillSelect($widget, data);
		} else if (config.url) {
			//用url远程加载数据
			$.post(config.url).done(function(data) {
				fillSelect($widget, data);
			});
		}else if(config.relativeFromSelect){
			//把目select的数据考过来
			//如果为true，则使用Venus.latestRelativeSelect,否则使用选择器
			//此控件必须在dialog容器内
			var $dialog = $widget.parents(".dialog-scroller.ui-dialog-content:first");
			if($dialog.length > 0){
				var $targetSelect = null;
				if(config.relativeFromSelect === true){
					$targetSelect = $dialog.data("srcSelect");
				}else{
					$targetSelect = $(config.relativeFromSelect);
				}
				if($targetSelect){
					$widget.html("");
					$targetSelect.find("option:selected").appendTo($widget);
				}
				initChoseSelect($widget);
				$.data($dialog[0],"desSelect",$widget);
			}

		}else{
			//页面的静态数据,如果有预选择属性，则将其选中
			if(config.preSelected && config.preSelected.length > 0){
				$(config.preSelected).each(function(index, item){
					$widget.find("option[value=" + item + "]").attr("selected","selected");
				});
			}
			//config.chosen &&
			initChoseSelect($widget);
		}
		//是否有级联选择
		if (config.nextId) {
			var $nextSelect = $("#" + config.nextId);
			var subConfig = eval("(" + $nextSelect.attr("data-venus") + ")");
			$widget.on('change', function() {
				//触发验证
				$widget.trigger('blur');
				//获取下级下拉数据
				if (subConfig.localData) {
					//从jsonData加载
					var data = Venus.str2Obj(subConfig.localData);
					data = $.extend(true, [], data);
					//根据父级参数筛选数据
					var subData = [];
					for (var i = 0; i < data.length; i++) {
						if (data[i][subConfig.field] == $widget.val()) {
							subData.push(data[i]);
						}
					}
					fillSelect($nextSelect, subData);
				} else if (subConfig.url) {
					//用url远程加载数据
					var paramName = subConfig.field;
					$.post({
						url: subConfig.url,
						data: {
							paramName: $widget.val()
						}
					}).
					done(function(data) {
						fillSelect($nextSelect, data);
					});
				}
			});
		}
	};
	//给select绑定获取数据源的方法
	$.extend($.fn, {
		dataObjects:function(){
			var $this = $(this);
			if($this.length > 0 && $this.is("select")){
				var data = [];
				$this.find("option:selected").each(function(index, option){
					var $option = $(option);
					if($option.data('dataObject')){
						data.push($option.data('dataObject'));
					}else{
						data.push({value:$option.attr("value"),text:$option.text()});
					}
				});
				return data;
			}else if($this.length > 0 && ($this.is(":radio") || $this.is(":checkbox"))){
				var data = [];
				$this.filter(":checked").each(function(index, item){
					var $item = $(item);
					if($item.data('dataObject')){
						data.push($item.data('dataObject'));
					}else{
						data.push({value:$item.attr("value"),text:$item.text()});
					}
				});
				return data;
			}
		}
	});
	Venus.showFormWidget = function($widgets){
		$widgets.each(function(index, widget){
			var $widget = $(widget);
			$widget.prop("disabled",false)
			//显示控件和错误提示
			var $form = $widget.parents("form:first");
			var widgetContainer = $widget.parents('.widget-container:first');
			var errorMsgContainer = widgetContainer.next(".error-msg:first");
			widgetContainer.show("fast",function(){$(window).trigger("resize");});
			errorMsgContainer.show("fast");
			errorMsgContainer.height(widgetContainer.height());
			//启用控件的验证
			try{
				$widget.rules("add", $form.data("validateBackup").settings.rules[$widget.attr("name")]);
			}catch (e) {
				//console.log("undefined validate rules");
			}
			Venus.refreshFormWidget($widget);
		});
	};
	Venus.refreshFormWidget = function($widget){
		//重新初始化弹出提示框
		var $form = $widget.parents("form:first");
		var settings = $form.length > 0 && $form.validate().settings; //拿到验证setting
		var fieldDescStr = ""; //字段描述
		var fieldFormatDescStr = ""; //验证格式说明
		try { //为必填项加星号，展示字段填写信息
			var fieldName = $widget.attr('name');
			if ($widget.rules().required === true) {
				if($widget.parents(".input-group:first").find("span.required-start").length === 0){
					$widget.parents(".input-group:first").find(".input-group-addon:first").append("<span class='required-start'>&nbsp;*</span>");
				}
			}else{
				$widget.parents(".input-group:first").find("span.required-start").detach();
			}
			fieldDescStr = settings.descriptions[fieldName];
			for (var key in settings.rules[fieldName]) {
				var msgItem = settings.messages[fieldName] ? settings.messages[fieldName][key] : null;
				if (!msgItem) {
					if (typeof $.validator.messages[key] == "function") {
						msgItem = $.validator.messages[key](settings.rules[fieldName][key]);
					} else {
						msgItem = $.validator.messages[key];
					}
				}
				fieldFormatDescStr += msgItem + ',';
			}
		} catch (e) {
			////console.log(e);
			////console.log(config.label + " 没有验证规则")
		}
		var popContent = '';
		popContent += fieldDescStr ? '<b>字段说明：</b><br/>' + fieldDescStr + '<br/><br/>':'';
		popContent += fieldFormatDescStr ? '<b>字段说明：</b><br/>' + fieldFormatDescStr + '<br/><br/>':'';
		var popoverOpts = {
			'styleClass': 'popover-info',
			'title': $widget.parents(".input-group:first").find(".input-group-addon").text(),
			'container': 'body',
			'trigger': 'hover',
			'html': true,
			'placement': 'auto',
			'content': popContent
		};
		var $helpIcon = $widget.data("helpIcon");
		$helpIcon && $helpIcon.popover("destroy");
		$helpIcon && $helpIcon.popover(popoverOpts);
		//如果下拉控件，则出发jquery chosen的updated事件
		if($widget.is("select")){
			$widget.trigger("chosen:updated");
		}
		Venus.alignInputGroupAddon();
		$(window).trigger("resize");
	};
	Venus.hideFormWidget = function($widgets){
		$widgets.each(function(index, widget){
			var $widget = $(widget);
			$widget.prop("disabled",true)
			//隐藏控件和错误提示
			var widgetContainer = $widget.parents('.widget-container:first');
			var errorMsgContainer = widgetContainer.next(".error-msg:first");
			widgetContainer.hide("fast");
			errorMsgContainer.hide("fast");
			//禁用控件的验证
			try{
				$widget.rules("remove");
			}catch (e) {
			}
			$widget.parents(".input-group:first").find("span.required-start").detach();
		});
	};

	//销毁控件
	Venus.removeFormWidget = function($form, $widget){
		var removeOne = function($one){
			var $widgetContainer = $one.parents('.widget-container:first');
			var $errorMsg = $widgetContainer.next(".error-msg:first");
			try{
				$widget.rules("remove");
			}catch(e){
				//console.error($widget.attr("name")  + " can not remove rules");
			}
			$widgetContainer.detach();
			$errorMsg.detach();
		};
		if($widget.length == 1){
			if($form.find("[name=" + $widget.attr("name") + "]").length > 0){
				removeOne($widget);
			}
		}else{
			$widget.each(function(index,widget){
				if($form.find("[name=" + $(widget).attr("name") + "]").length > 0){
					removeOne($(widget));
				}
			});
		}
	};
	//重置表单
	Venus.resetForm = function($form){
		//清楚验证
		$form.validate().resetForm();
		//重置表单控件初始值
		$form.find(".form-widget-venus").each(function(index, item){
			var reset = $(item).data("reset");
			if(typeof reset === "function"){
				reset();
			}
		});
	};
	/**
	 * 解析框架中的树形单选控件
	  示例：
		<div class="tree-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
			'treeOpts':{
				'idKey':'menuNo',                               //id字段名
				'pIdKey':'parentNo',                            //pId字段名
				'nameKey':'name',                               //name字段名
				'iconSkin':'',                                  //叶子节点图标样式
				'iconOpen':'',                                  //父节点打开时图标样式
				'iconClose':'',                                 //父节点闭合时图标样式
				'checkEnable':true,                             //是否开启选择
				'checkStyle':'radio',                           //是单选还是多选
				'radioType':'all',                              //单选的话是在组内单选还是全局单选
				'localData':'DemoPage.treeArr',                 //需要加载的数据,本地数组形式
				'url':'auth/menu/listAll.do',                   //如果没有localData就去这个url获取
				'onClick':'DemoPage.onClick',                   //节点单击事件
				'dataPreHandler':'DemoPage.treeDataPreHandler'  //对拿到的节点数据预处理函数
			 }
		}"></div>
	 */
	Venus.initVenusSelectInput = function() {
		$(".input-select-venus").each(function() {
			//如果已经初始化过，则直接退出
			if ($(this).attr("input-select-venus-init") == "done") return true;
			var $widget = $(this);
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			var $hideWidget = $('<input type="hidden" name="' + config.hideName + '" value="' + (config.hideValue || '') + '"/>');
			$widget.after($hideWidget);
			$clearIcon.on('click',function(){
				$hideWidget.val("");
				$widget.val("");
				//触发验证
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				var treeId = Venus.getRandomId();
				var $treeDom = $('<div class="widget-box widget-color-blue2">' +
					'  <div class="widget-header">' +
					'    <h4 class="widget-title lighter smaller">' + (config.treeTitle || config.label) + '</h4>' +
					'  </div>' +
					'  <div class="widget-body" style="height:' + (config.treeHeight || '300') + 'px;">' +
					//'    <div class="widget-main padding-8">' +
					'      <div class="ztree" id="' + treeId + '"></div>' +
					//'    </div>' +
					'  </div>' +
					'</div>');
				bootbox.dialog({
					title: config.dialogTitle || '自定义对话框',
					message: $treeDom,
					buttons: {
						"success": {
							"label": "确定",
							"className": "btn-sm btn-primary",
							"callback": function() {
								var ids = [];
								var names = [];
								var selectedItems = $widget.ztree.getCheckedNodes();
								for (var key in selectedItems) {
									ids.push(selectedItems[key].id);
									names.push(selectedItems[key].name);
								}
								$hideWidget.val(ids.toString());
								$widget.val(names.toString());
								//触发验证
								$widget.trigger('focusout');
								$widget.trigger('change');
							}
						},
						"danger": {
							"label": "取消",
							"className": "btn-sm",
							"callback": function() {
								//Example.show("uh oh, look out!");
							}
						},
						"info": {
							"label": "清空",
							"className": "btn-sm btn-info",
							"callback": function() {
								var checkedNodes = $widget.ztree.getCheckedNodes();
								for (var key in checkedNodes) {
									$widget.ztree.checkNode(checkedNodes[key], false);
								}
								return false;
							}
						}
					}
				});
				//如果没有config.treeOpts，默认给空对象防止报错
				config.treeOpts = config.treeOpts || {};
				var treeSettings = {
					data: {
						simpleData: {
							idKey: config.treeOpts.idKey,
							pIdKey: config.treeOpts.pIdKey
						},
						key: {
							name: config.treeOpts.nameKey
						}
					},
					check: {
						enable: true,
						chkStyle: config.treeOpts.chkStyle || 'radio',
						radioType: config.treeOpts.radioType || 'all'
					},
					callback: {
						onClick: function(event, treeId, treeNode, clickFlag) {
							if (config.treeOpts.onClick) {
								Venus.str2Obj(config.treeOpts.onClick)(event, treeId, treeNode, clickFlag);
							}
						}
					}
				};
				//将已选中的节点预先勾选出来
				var setCheckedNodes = function(nodes) {
					var checkedIds = $hideWidget.val();
					var idKey = config.treeOpts.idKey || "id";
					for (var key in nodes) {
						if (checkedIds.indexOf(nodes[key][idKey]) != -1) {
							nodes[key].checked = true;
						}
					}
					return nodes;
				};

				//将半选中的节点展开
				var openHalfCheckedNodes = function(ztree) {
					var nodes = ztree.getNodes();
					//如果没有选中的，则展开第一个父节点
					if (!$hideWidget.val()) {
						ztree.expandNode(nodes[0], true);
					} else {
						var checkedNode = ztree.getCheckedNodes()[0];
						var parentNode = checkedNode.getParentNode();
						while (parentNode) {
							ztree.expandNode(parentNode, true);
							parentNode = parentNode.getParentNode();
						}
					}
				};
				// 获取树的节点数据,如果有localData，则直接从本地变量里拿数据，否则从url拿数据
				var treeNodes = null;
				if (config.treeOpts.localData) {
					treeNodes = Venus.str2Obj(config.treeOpts.localData);
					treeNodes = $.extend(true, [], treeNodes);
					//如果treeNodes在载入树控件之前需要处理
					if (config.treeOpts.dataPreHandler)
						treeNodes = Venus.str2Obj(config.treeOpts.dataPreHandler)(treeNodes);
					treeNodes = setCheckedNodes(treeNodes);
					$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, treeNodes);
					openHalfCheckedNodes($widget.ztree);
				} else {
					$.getJSON(config.treeOpts.url, function(data) {
						//如果treeNodes在载入树控件之前需要处理
						if (config.treeOpts.dataPreHandler)
							data = Venus.str2Obj(config.treeOpts.dataPreHandler)(data);
						data = setCheckedNodes(data);
						$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, data);
						openHalfCheckedNodes($widget.ztree);
					});
				}


			});

			//标识完成
			$(this).attr("input-select-venus-init", "done");
		});
	};

	/**
	 * 解析框架中的树形多选控件
	  示例：
		<div class="tree-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
			'treeOpts':{
				'idKey':'menuNo',                               //id字段名
				'pIdKey':'parentNo',                            //pId字段名
				'nameKey':'name',                               //name字段名
				'iconSkin':'',                                  //叶子节点图标样式
				'iconOpen':'',                                  //父节点打开时图标样式
				'iconClose':'',                                 //父节点闭合时图标样式
				'checkEnable':true,                             //是否开启选择
				'checkStyle':'radio',                           //是单选还是多选
				'radioType':'all',                              //单选的话是在组内单选还是全局单选
				'localData':'DemoPage.treeArr',                 //需要加载的数据,本地数组形式
				'url':'auth/menu/listAll.do',                   //如果没有localData就去这个url获取
				'onClick':'DemoPage.onClick',                   //节点单击事件
				'dataPreHandler':'DemoPage.treeDataPreHandler'  //对拿到的节点数据预处理函数
			 }
		}"></div>
	 */
	Venus.initVenusMultiSelectInput = function() {
		$(".input-multi-select-venus").each(function(index, item) {
			//如果已经初始化过，则直接退出
			if ($(this).attr("input-multi-select-venus-init") == "done") return true;
			var $widget = $(this);
			//去掉select中的小箭头
			$widget.parents(".widget-container:first").find(".chosen-single div b").detach();
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			var treeOpts = config.treeOpts;
			$clearIcon.on('click',function(){
				$widget.val("");
				$widget.trigger('chosen:updated');
				//触发验证
				$widget.valid();
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				var treeId = Venus.getRandomId();
				var $treeDom = $('<div class="widget-box widget-color-blue2">' +
					'  <div class="widget-header">' +
					'    <h4 class="widget-title lighter smaller">' + (config.treeTitle || config.label) + '</h4>' +
					'  </div>' +
					'  <div class="widget-body" style="height:' + (config.treeHeight || '300') + 'px;">' +
					//'    <div class="widget-main padding-8">' +
					'      <div class="ztree" id="' + treeId + '"></div>' +
					//'    </div>' +
					'  </div>' +
					'</div>');
				bootbox.dialog({
					title: config.dialogTitle || '自定义对话框',
					message: $treeDom,
					buttons: {
						"danger": {
							"label":  "&nbsp" + Venus.msg("cancel"),
							"className": "btn-sm btn-icon-remove",
							"callback": function() {
								//Example.show("uh oh, look out!");
							}
						},
						"success": {
							"label":  "&nbsp" + Venus.msg("confirm"),
							"className": "btn-sm btn-primary btn-icon-save",
							"callback": function() {
								var selectedItems = $widget.ztree.getCheckedNodes();
								//将选择的节点全部装载到select中，并将其更新
								var optionsArr = [];
								var $optionsArr = [];
								for (var key in selectedItems) {
									var item = selectedItems[key];
									var value = item.id;
									var showText = item.name;
									if(config.showFullPath === true){
										while(item.getParentNode()){
											showText = item.getParentNode().name + "/" +showText;
											item = item.getParentNode();
										}
									}
									var $option = $("<option value='" + value + "' selected>" + showText + "</option>");
									$.data($option[0],'dataObject', item);
									$optionsArr.push($option);
								}
								$widget.html("");
								$($optionsArr).each(function(index, $option){
									$widget.append($option);
								});
								$widget.trigger('chosen:updated');
								//触发验证
								$widget.valid();
								$widget.trigger('focusout');
								$widget.trigger('change');
								if(config.yesCallback){
									Venus.str2Obj(config.yesCallback)(selectedItems);
								}
							}
						}
					}
				});
				Venus.initVenusButton();
				//如果没有config.treeOpts，默认给空对象防止报错
				config.treeOpts = config.treeOpts || {};
				var defaultSettings = {
					data: {
						simpleData: {
							idKey: config.treeOpts.idKey,
							pIdKey: config.treeOpts.pIdKey
						},
						key: {
							name: config.treeOpts.nameKey
						}
					},
					check: {
						enable: true,
						chkStyle: config.treeOpts.chkStyle || 'radio',
						radioType: config.treeOpts.radioType || 'all'
					},
					callback: {
						onClick: function(event, treeId, treeNode, clickFlag) {
							if (config.treeOpts.onClick) {
								Venus.str2Obj(config.treeOpts.onClick)(event, treeId, treeNode, clickFlag);
							}
						}
					}
				};
				var treeSettings = $.extend(true,defaultSettings,config.treeOpts);
				//将已选中的节点预先勾选出来
				var setCheckedNodes = function(nodes) {
					var checkedIds = $widget.val();
					if(typeof checkedIds == "string"){
						checkedIds = [checkedIds];
					}
					var idKey = config.treeOpts.idKey || "id";
					checkedIds && $(nodes).each(function(index, node){
						if (checkedIds.indexOf(node[idKey].toString()) != -1) {
							node.checked = true;
						}
					});
					return nodes;
				};

				//将半选中的节点展开
				var openHalfCheckedNodes = function(ztree) {
					var nodes = ztree.getNodes();
					//如果没有选中的，则展开第一个父节点
					if (!$widget.val()) {
						ztree.expandNode(nodes[0], true);
					} else {
						var checkedNode = ztree.getCheckedNodes()[0];
						var parentNode = checkedNode ? checkedNode.getParentNode() : false;
						while (parentNode) {
							ztree.expandNode(parentNode, true);
							parentNode = parentNode.getParentNode();
						}
					}
				};
				// 获取树的节点数据,如果有localData，则直接从本地变量里拿数据，否则从url拿数据
				var treeNodes = null;
				if (config.treeOpts.localData) {
					treeNodes = Venus.str2Obj(config.treeOpts.localData);
					treeNodes = $.extend(true,[],treeNodes);
					//如果treeNodes在载入树控件之前需要处理
					if (config.treeOpts.dataPreHandler){
						treeNodes = Venus.str2Obj(config.treeOpts.dataPreHandler)(treeNodes);
					}
					treeNodes = setCheckedNodes(treeNodes);
					$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, treeNodes);
					openHalfCheckedNodes($widget.ztree);
				} else {
					$.getJSON(config.treeOpts.url, function(data) {
						//如果treeNodes在载入树控件之前需要处理
						if (config.treeOpts.dataPreHandler)
							data = Venus.str2Obj(config.treeOpts.dataPreHandler)(data);
						data = setCheckedNodes(data);
						$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, data);
						openHalfCheckedNodes($widget.ztree);
					});
				}


			});

			//标识完成
			$(this).attr("input-multi-select-venus-init", "done");
		});
	};


	/**
	 * 解析框架中的文本框表格选择控件
	  示例：
		<div class="input-table-select-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
		}"></div>
	 */
	Venus.initVenusTableSelectInput = function() {
		$(".input-table-select-venus").each(function(index, item) {
			//如果已经初始化过，则直接退出
			if ($(this).attr("input-table-select-venus-init") == "done") return true;
			var $widget = $(this);
			//去掉select中的小箭头
			$widget.parents(".widget-container:first").find(".chosen-single div b").detach();
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			var hideWidgetId = Venus.getRandomId();
			var $hideWidget = $('<input id="' + hideWidgetId + '" type="hidden" name="' + config.hideName + '" value="' + (config.hideValue || '') + '"/>');
			$widget.after($hideWidget);
			$clearIcon.on('click',function(){
				$hideWidget.val("");
				$widget.val("");
				//触发验证
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				var treeId = Venus.getRandomId();
				var opArr = config.tableOpts.split('.');
				//给表格属性中加入preSelectedIds，用于回选记录
				window[opArr[0]][opArr[1]].preSelectedIds = $hideWidget.val();
				var $tableDom = $("<div class=\"table-container table-venus\" data-venus=\"{'options':'" + config.tableOpts + "'}\"></div>");
				bootbox.dialog({
					title: config.dialogTitle || '自定义对话框',
					message: $tableDom,
					buttons: {
						"info": {
							"label": "&nbsp" + Venus.msg("reset"),
							"className": "btn-sm btn-info btn-icon-reset",
							"callback": function() {
								var $grid = $tableDom.find(".ui-jqgrid-bdiv table");
							}
						},
						"danger": {
							"label":  "&nbsp" + Venus.msg("cancel"),
							"className": "btn-sm btn-icon-remove",
							"callback": function() {
								//Example.show("uh oh, look out!");
							}
						},
						"success": {
							"label":  "&nbsp" + Venus.msg("confirm"),
							"className": "btn-sm btn-primary btn-icon-save",
							"callback": function() {
								var $grid = $tableDom.find(".ui-jqgrid-bdiv table");
								var selectedIds = $tableDom.find(".ui-jqgrid-bdiv table").jqGrid('getGridParam', 'selarrrow');
								var idArr = [];
								var nameArr = [];
								$(selectedIds).each(function(index, id){
									var rowData = $grid.jqGrid('getRowData', id);
									idArr.push(rowData[config.selectField] || rowData.id);
									nameArr.push(rowData[config.showField] || rowData.name);
									rowData = null;
								});
								$widget.val(nameArr.join(','));
								$hideWidget.val(idArr.join(','));
								//触发验证
								$widget.trigger('focusout');
								$widget.trigger('change');
								$grid = selectedIds = idArr = nameArr = null;
							}
						}
					}
				});
				Venus.initVenusButton();
				setTimeout(function(){Venus.initVenusGrid();},150);
			});

			//标识完成
			$(this).attr("input-table-select-venus-init", "done");
		});
	};


	/**
	 * 解析框架中的文本框表格选择控件
	  示例：
		<div class="input-table-select-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
		}"></div>
	 */
	Venus.initVenusTableSelectChosen = function() {
		$(".select-table-chosen-venus").each(function(index, item) {
			//如果已经初始化过，则直接退出
			if ($(this).attr("select-table-chosen-venus-init") == "done") return true;
			var $widget = $(this);
			//去掉select中的小箭头
			$widget.parents(".widget-container:first").find(".chosen-single div b").detach();
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			$clearIcon.on('click',function(){
				$widget.val("");
				$widget.trigger('chosen:updated');
				//触发验证
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				var treeId = Venus.getRandomId();
				//给表格属性中加入preSelectedIds，用于回选记录
				Venus.str2Obj(config.tableOpts).preSelectedIds = $widget.val();
				var $tableDom = $("<div class=\"table-container table-venus\" data-venus=\"{'options':'" + config.tableOpts + "'}\"></div>");
				bootbox.dialog({
					title: config.dialogTitle || '自定义对话框',
					message: $tableDom,
					buttons: {
						"danger": {
							"label":  "&nbsp" + Venus.msg("cancel"),
							"className": "btn-sm btn-icon-remove",
							"callback": function() {
								//Example.show("uh oh, look out!");
							}
						},
						"success": {
							"label":  "&nbsp" + Venus.msg("confirm"),
							"className": "btn-sm btn-primary btn-icon-save",
							"callback": function() {
								var $grid = $tableDom.find(".ui-jqgrid-bdiv table");
								var selectedIds = $tableDom.find(".ui-jqgrid-bdiv table").jqGrid('getGridParam', 'selarrrow');
								//将选择的节点全部装载到select中，并将其更新
								var optionsArr = [];
								$(selectedIds).each(function(index, id){
									var rowData = $grid.jqGrid('getRowData', id);
									optionsArr.push("<option value='",(rowData[config.selectField] || rowData.id),"' selected>",(rowData[config.showField] || rowData.name),"</option>");
									rowData = null;
								});
								$widget.html(optionsArr.join(""));
								$widget.trigger('chosen:updated');
								//触发验证
								$widget.trigger('focusout');
								$widget.trigger('change');
							}
						}
					}
				});
				Venus.initVenusButton();
				setTimeout(function(){Venus.initVenusGrid();},150);
			});

			//标识完成
			$(this).attr("select-table-chosen-venus-init", "done");
		});
	};

	/**
	 * 解析框架中的文本框表格选择控件
	  示例：
		<div class="input-table-select-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
		}"></div>
	 */
	Venus.initVenusComplexSelectChosen = function() {
		$(".select-complex-chosen-venus").each(function(index, item) {
			//如果已经初始化过，则直接退出
			if ($(this).attr("select-complex-chosen-venus-init") == "done") return true;
			var $widget = $(this);
			//去掉select中的小箭头
			$widget.parents(".widget-container:first").find(".chosen-single div b").detach();
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			$clearIcon.on('click',function(){
				$widget.val("");
				$widget.trigger('chosen:updated');
				//触发验证
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				var $dialog = null;
				//将下拉选项备份，在取消是将其还原
				var selectedOptsBackUP = $widget.find("option:selected").clone(true);
				config.dialogOptions.buttons = [
					{
						html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; " + Venus.msg('cancel'),
						"class" : "btn btn-xs",
						click: function() {
							$widget.html("");
							selectedOptsBackUP.appendTo($widget);
							$widget.trigger('chosen:updated');
							$( this ).dialog( "destroy" ).detach();
						}
					},{
						html: "<i class='ace-icon fa fa-check'></i>&nbsp; " + Venus.msg('confirm'),
						"class" : "btn btn-primary btn-xs",
						click: function() {
							var $select = $dialog.data("desSelect");
							//将选择的节点全部装载到select中，并将其更新
							var optionsArr = [];
							$select.find("option:selected").each(function(index, option){
								var $option = $(this);
								optionsArr.push("<option value='",$option.val(),"' selected>",$option.text(),"</option>");
							});
							$widget.html("");
							$select.find('option').appendTo($widget);
							$widget.trigger('chosen:updated');
							//触发验证
							$widget.trigger('focusout');
							$widget.trigger('change');
							var yesCallback = Venus.str2Obj(config.yesCallback);
							typeof yesCallback == 'function' && yesCallback();
							$( this ).dialog( "destroy" ).detach();
						}
					}
				];
				config.dialogOptions.close = function(event,ui){
					var $target = $(event.target);
					if($target.hasClass("ui-dialog-content")){
						$widget.html("");
						selectedOptsBackUP.appendTo($widget);
						$widget.trigger('chosen:updated');
						$target.parents(".ui-dialog:first").detach();
					}
				};
				$dialog = Venus.dialog(config.dialogOptions);
				$.data($dialog[0],"srcSelect",$widget);
			});

			//标识完成
			$(this).attr("select-complex-chosen-venus-init", "done");
		});
	};


	/**
	 * 解析框架中的文本框表格选择控件
	  示例：
		<div class="input-table-select-venus"
		data-venus="{
			'label':'上级菜单',                                 //表单控件label
			'hideName':'parentNo',                              //隐藏域字段名
			'hideValue':'',                                     //隐藏域字段值
			'colNum':'col-sm-10',                               //表单控件所占的宽度
			'errMsgColNum':'col-sm-2',                          //错误提示所占的宽度
			'dialogTitle':'请选择',                             //对话框的标题
			'treeHeight':'400',                                 //树的高度
			'treeTitle':'请选择上级菜单',                       //输的标题
		}"></div>
	 */
	Venus.initVenusCustomeSelectChosen = function() {
		$(".input-custome-select-venus").each(function(index, item) {
			//如果已经初始化过，则直接退出
			if ($(this).attr("input-custome-select-venus-init") == "done") return true;
			var $widget = $(this);
			//去掉select中的小箭头
			$widget.parents(".widget-container:first").find(".chosen-single div b").detach();
			var $clearIcon = $("<span class='input-group-addon'><i class='ace-icon glyphicon glyphicon-trash'></i></span>");
			var $queryIcon = $("<span class='input-group-addon'><i class='ace-icon fa fa-search nav-search-icon'></i></span>");
			$widget.attr("readonly", "readonly").parents(".input-group:first").append($clearIcon).append($queryIcon);
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			config.title = "<div class='widget-header widget-header-small'><h4 class='smaller'>" + config.title + "</h4></div>";
			$clearIcon.on('click',function(){
				$widget.val("");
				$widget.trigger('chosen:updated');
				//触发验证
				$widget.trigger('focusout');
				$widget.trigger('change');
			});
			//给查询按钮绑定事件
			$queryIcon.on('click', function() {
				//override dialog's title function to allow for HTML titles
				$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
					_title: function(title) {
						var $title = this.options.title || '&nbsp;';
						if( ("title_html" in this.options) && this.options.title_html == true )
							title.html($title);
						else title.text($title);
					}
				}));
				var defaultOptions = {
					resizable: false,
					modal: true,
					title_html: true,
					buttons: config.buttons ? Venus.str2Obj(config.buttons) :[
						{
							html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; " + Venus.msg('cancel'),
							"class" : "btn btn-xs",
							click: function() {
								$( this ).dialog( "destroy" ).detach();
							}
						},{
							html: "<i class='ace-icon fa fa-check'></i>&nbsp; " + Venus.msg('confirm'),
							"class" : "btn btn-primary btn-xs",
							click: function() {
								var selectedIds = null;
								if(config.yesCallback){
									selectedIds = Venus.str2Obj(config.yesCallback)();
								}
								if(typeof selectedIds == 'object'){
									var optionsArr = [];
									$(selectedIds).each(function(index, item){
										optionsArr.push("<option value='",item.value,"' selected>",item.text,"</option>");
									});
									$widget.html(optionsArr.join(""));
								}else if(typeof selectedIds == 'string'){
									$widget.html(selectedIds);
								}
								$widget.trigger('chosen:updated');
								//触发验证
								$widget.trigger('focusout');
								$widget.trigger('change');
								$( this ).dialog( "destroy" ).detach();
							}
						}
					],
					close:function(event,ui){
						var $target = $(event.target);
						if($target.hasClass("ui-dialog-content")){
							$target.parents(".ui-dialog:first").detach();
						}
					}
				};
				if(config.size){
					//三种尺寸大小
					switch(config.size){
						case 'lg':
							defaultOptions.width = window.screen.width * 0.8 < 800 ? 800 : window.screen.width * 0.8;
							defaultOptions.height = window.screen.height * 0.8 < 600 ? 600 : window.screen.height * 0.8;
							break;
						case 'md':
							defaultOptions.width = window.screen.width * 0.6 < 600 ? 600 : window.screen.width * 0.6;
							defaultOptions.height = window.screen.height * 0.6 < 400 ? 400 : window.screen.height * 0.6;
							break;
						case 'sm':
							defaultOptions.width = window.screen.width * 0.4 < 400 ? 400 : window.screen.width * 0.4;
							defaultOptions.height = window.screen.height * 0.4 < 300 ? 300 : window.screen.height * 0.4;
							break;
					}
					delete config.width;
					delete config.height;
				}
				var dialogOpts = $.extend(true,defaultOptions,config);

				var dialogId = Venus.getRandomId();
				var $dialog = $('<div class="dialog-scroller" id="' + dialogId + '"></div>');
				$("body").append($dialog);
				if(config.type == 'dom'){
					$dialog.append($(config.target).show());
				}else if (config.type == 'url'){
					var target = config.target;
					if(config.target.indexOf('?') == -1){
						target = config.target + '?preSelectedIds=' + $widget.val();
					}else{
						target = config.target + '&preSelectedIds=' + $widget.val();
					}
					Venus.load("#" + dialogId, target);
				}
				$dialog.dialog(dialogOpts);
				$dialog.dialog({ show: { effect: "blind", duration: 200 } });
				//防止对话框的关闭按钮出现下方的篮框
				$(".ui-dialog-titlebar-close .ui-button-text:contains('Close')").detach();
				Venus.initVenusButton();
			});

			//标识完成
			$(this).attr("input-custome-select-venus-init", "done");
		});
	};
	/**
	 * 解析框架中的查询按钮控件
	 */
	Venus.initQueryFormButton = function() {
		$(".query-form-button-venus").each(function(index, item) {
			var $this = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($this.attr("query-form-button-venus-init") == "done") return true;
			var config = $this.data("config") || eval("(" + $this.attr("data-venus") + ")");
			$.data($this[0],'config',config);
			//生成一个dialog用来承载查询form表单
			var randomDialogId = "dialog" + Venus.getRandomId(100);
			var randomDialogBodyId = "dialogBody" + Venus.getRandomId(100);
			var randomSubmitBtnId = "btn" + Venus.getRandomId(100);
			var queryDialogStr = '<div class="modal fade" id="' + randomDialogId + '" tabindex="-1" role="dialog"' +
				'	aria-labelledby="myModalLabel">' +
				'	<div class="modal-dialog" role="document">' +
				'		<div class="modal-content">' +
				'			<div class="modal-header">' +
				'				<button type="button" class="close" data-dismiss="modal"' +
				'					aria-label="Close">' +
				'					<span aria-hidden="true">&times;</span>' +
				'				</button>' +
				'				<h4 class="modal-title" id="myModalLabel">' + (config.title || "title") + '</h4>' +
				'			</div>' +
				'			<div class="modal-body" id="' + randomDialogBodyId + '">' +
				'			</div>' +
				'			<div class="modal-footer">' +
				'				<button type="button" id="' + randomSubmitBtnId + '" ' +
				'				class="btn btn-primary">查询</button>' +
				'			</div>' +
				'		</div>' +
				'	</div>' +
				'</div>';
			$this.after(queryDialogStr);
			var $queryForm = $("#" + config.queryFormId);
			$queryForm.css("display", "inline-block");
			$queryForm.appendTo($("#" + randomDialogBodyId));
			$this.addClass("btn btn-sm btn-primary pull-right marginl-10");
			$this.attr("data-toggle", "modal").attr("data-target", "#" + randomDialogId);
			$("#" + randomSubmitBtnId).on("click", function() {
				//用查询条件重新加载表格
				var grid = Venus.str2Obj(config.targetGrid).reload({
					postData: $queryForm.serialize()
				});
				$("#" + randomDialogId + " .close").click();
			});
			//标识完成
			$this.attr("query-form-button-venus-init", "done");
		});
	};

	/**
	 * 渲染button控件
	 */
	Venus.initVenusButton = function() {
		$("button").each(function(index, item) {
			var $this = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if($this.attr("class").indexOf("btn-icon-") === -1) return true;
			if ($this.attr("button-venus-init") == "done") return true;
			var iconClass = "";
			$($this.attr("class").split(" ")).each(function(index,item){
				if(item.indexOf('btn-icon-') !== -1)
					iconClass = Venus.btnIconClasses[item.replace("btn-icon-","")];
			});
			if($this.find("span").length > 0){
				$this.find("span").prepend("<i class='" + iconClass + " white ' style='margin-right:2px;'></i>&nbsp");
			}else{
				$this.prepend("<i class='" + iconClass + " white ' style='margin-right:2px;'></i>&nbsp");
			}
			//标识完成
			$this.attr("button-venus-init", "done");
		});

	};

	/**
	 * 解析框架中的查询按钮控件
	 */
	Venus.initDetailinfo = function() {
		$(".detail-info-venus").each(function(index, item) {
			var $detailContainer = $(item);
			
			//如果已经初始化过，则直接跳过判断下一个
			if ($detailContainer.attr("detail-info-venus-init") == "done") return true;
			var config = $detailContainer.data("config") || eval("(" + $detailContainer.attr("data-venus") + ")");
			$.data($detailContainer[0],'config',config);
			$detailContainer.addClass("detail-info");
			if(typeof config.detailObj == "string" && config.detailObj.indexOf(".")){
				config.detailObj = Venus.str2Obj(config.detailObj);
			}
			var renderInfoItem = function(field){
				var colClass = "";
				if(config.layoutColumn == 1){
					colClass = 'col-sm-12 col-xs-12';
				}else{
					if(config.longField && config.longField.indexOf(field) !== -1){
						colClass = 'col-sm-12 col-xs-12';
					}else{
						colClass = 'col-sm-6 col-xs-6';
					}
				}
				var $itemContainer = $('<div class="detail-info-item ' + colClass + '"></div>');
				var $labelContainer;
				if(config.fmtKey && I18N.MESSAGES.SYSMESSAGES['product.field_label.' + config.fmtKey + "." + field]){
					//统一框架
					$labelContainer = $('<div class="detail-info-label" >' +
							(I18N.MESSAGES.SYSMESSAGES['product.field_label.' + config.fmtKey + "." + field] ||  field) + '</div>');
				}else{
					//4A配置文件里的前缀为 standard_field
					var temp_field = (I18N.MESSAGES.SYSMESSAGES['standard_field_' + field] ||  field);
					$labelContainer = $('<div class="detail-info-label" title="'+temp_field+'">' +
							temp_field + '</div>');  
				}
				if(config.labelWidth){
					$labelContainer
						.css('width',config.labelWidth)
						.css('min-width',config.labelWidth)
						.css('max-width',config.labelWidth);
				}
				var textContainerStr = '<div class="detail-info-text">';
				//如果内容是数组
				if($.isArray(config.detailObj[field])){
					$(config.detailObj[field]).each(function(index, item){
						if(config.sysCodeTranslate && config.sysCodeTranslate[item]){
							textContainerStr += '<span>' +
								Venus.getSysCode(config.sysCodeTranslate[field], item) + '</span>';
						}else{
							textContainerStr += '<span>' + item + '</span>';
						}
					});
				}else{
					if(config.sysCodeTranslate && config.sysCodeTranslate[field]){
						textContainerStr += Venus.getSysCode(config.sysCodeTranslate[field], config.detailObj[field]);
					}else{
						textContainerStr += config.detailObj[field];
					}
				}
				textContainerStr += '</div>';
				$itemContainer.append($labelContainer).append($(textContainerStr));
				$detailContainer.append($itemContainer);
			};
			if(config.showProps){
				//如果定义了显示顺序
				$(config.showProps).each(function(index, field){
					renderInfoItem(field);
				});
			}else{
				for(var key in config.detailObj){
					renderInfoItem(key);
				}
			}
			var $detailItems = $detailContainer.find(".detail-info-item");
			var $lastItem = $($detailItems[$detailItems.length - 1]);
			var $lastSecondItem = $($detailItems[$detailItems.length - 2]);
			if(Math.abs($lastItem.offset().left - $detailContainer.offset().left < 10)){
				$lastItem.find(".detail-info-text").css("border-bottom","0px");
			}else{
				$lastItem.find(".detail-info-text").css("border-bottom","0px");
				$lastSecondItem.find(".detail-info-text").css("border-bottom","0px");
			}
			//标识完成
			$detailContainer.attr("detail-info-venus-init", "done");
		});
	};
	Venus.initFormGroupSpliter = function(){
		$(".form-group-split-venus").each(function(index, item){
			var $formGroupSpliter = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($formGroupSpliter.attr("form-group-split-venus-init") == "done") return true;
			var str = $formGroupSpliter.html();
			$formGroupSpliter
				.addClass("col-sm-12")
				.html('<h3 class="row header smaller lighter gyan" style="margin-left: 0px;margin-right: 0px;">' + str + '</h3>');
			//标识完成
			$formGroupSpliter.attr("form-group-split-venus-init", "done");
		});
	};

	//定时控件
	Venus.initPeriodWidgets = function(){
		$(".period-widget-venus").each(function(index, item){
			var $widget = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($widget.attr("period-widget-venus-init") == "done") return true;
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);

			//生成各组件的id
			var tempId = Venus.getRandomId();
			var categoryId = tempId + "_category";
			var typeId = tempId + "_type";
			var monthId = tempId + "_month";
			var dayId = tempId + "_day";
			var weekId = tempId + "_week";
			var datetimeId = tempId + "_datetime";
			var timeId = tempId + "_time";
			var minuteId = tempId + "_minute";
			//生成周期类别组件
			var $category  = $(	"<select class='form-widget-venus'				" +
								"	data-venus=\"{								" +
								"	'label':'" + config.label + "',				" +
								"	'noBlank':true,								" +
								"	'colNum':'col-sm-3'							" +
								"	}\">										" +
								"	<option value='0'>定时扫描</option> 			" +
								"	<option value='1'>周期扫描</option>			" +
								"</select>");
			var $type  = $(	"<select class='form-widget-venus'		" +
							"	data-venus=\"{						" +
							"		'hideLabel':true,				" +
							"		'hide':true,					" +
							"		'colNum':'col-sm-2',			" +
							"		'noBlank':true,					" +
							"		'label':'类型'}\">				" +
							"	<option value='1'>每月</option>		" +
							"	<option value='2'>每周</option>		" +
							"	<option value='3'>每天</option>		" +
							"	<option value='4'>每小时</option>	" +
							"	<option value='5'>每刻钟</option>	" +
							"	<option value='6'>每季度</option>	" +
							"	<option value='7'>每半年</option>	" +
							"	<option value='8'>每年</option>		" +
							"</select>");
			var $month  = $("<select class='form-widget-venus'	" +
							"	data-venus=\"{					" +
							"	'hideLabel':true,				" +
							"	'hide':true,					" +
							"	'noBlank':true,					" +
							"	'colNum':'col-sm-2'}\">			" +
							"	<option value='1'>1月</option>	" +
							"	<option value='2'>2月</option>	" +
							"	<option value='3'>3月</option>	" +
							"	<option value='4'>4月</option>	" +
							"	<option value='5'>5月</option>	" +
							"	<option value='6'>6月</option>	" +
							"	<option value='7'>7月</option>	" +
							"	<option value='8'>8月</option>	" +
							"	<option value='9'>9月</option>	" +
							"	<option value='10'>10月</option>" +
							"	<option value='11'>11月</option>" +
							"	<option value='12'>12月</option>" +
							"</select>");
			var $day  = $( 	"<select class='form-widget-venus'	" +
							"	data-venus=\"{					" +
							"	'hideLabel':true,				" +
							"	'hide':true,					" +
							"	'noBlank':true,					" +
							"	'colNum':'col-sm-2'}\">			" +
							"</select>");
			for(var i = 1; i < 32; i++){
				$day.append("<option value='" + i + "'>" + i + "日</option>");
			}
			$day.append("<option value='L'>月底最后一天</option>");
			var $week  = $(	"<select class='form-widget-venus'		" +
							"	data-venus=\"{						" +
							"		'hideLabel':true,				" +
							"		'hide':true,					" +
							"		'colNum':'col-sm-2',			" +
							"		'noBlank':true}\">				" +
							"	<option value='1'>星期日</option>		" +
							"	<option value='2'>星期一</option>		" +
							"	<option value='3'>星期二</option>		" +
							"	<option value='4'>星期三</option>		" +
							"	<option value='5'>星期四</option>		" +
							"	<option value='6'>星期五</option>		" +
							"	<option value='7'>星期六</option>		" +
							"</select>");
			var $datetime = $( "<input type='text' class='form-widget-venus'  " +
								"	value='2012-06-15 05:37:00'				" +
								"	data-venus=\"{							" +
								"	'hideLabel':true,						" +
								"	'clearBtn':false,						" +
								"	'isDate':true,							" +
								"	'dateOption':{							" +
								"		'dateType':'dateTime',				" +
								"		'autoclose':true					" +
								"	},										" +
								"	'colNum':'col-sm-3'}\" />");
			var $time = $( "<input type='text' class='form-widget-venus'  	" +
								"	value='2012-06-15 05:37:00'				" +
								"	data-venus=\"{							" +
								"	'hideLabel':true,						" +
								"	'hide':true,							" +
								"	'clearBtn':false,						" +
								"	'isDate':true,							" +
								"	'dateOption':{							" +
								"		'dateType':'time',					" +
								"		'autoclose':true					" +
								"	},										" +
								"	'colNum':'col-sm-2'}\" />");
			var $minute  = $( 	"<select class='form-widget-venus'	" +
							"	data-venus=\"{					" +
							"	'hideLabel':true,				" +
							"	'hide':true,					" +
							"	'noBlank':true,					" +
							"	'colNum':'col-sm-2'}\">			" +
							"</select>");
			for(var i = 0; i < 59; i++){
				$minute.append("<option value='" + i + "'>" + i + "分</option>");
			}
			var $errMsg  = $('<div class="error-msg col-sm-1" style="height: 34px;margin-bottom:10px;">&nbsp;</div>');
			//加入组件
			$widget.wrap('<div class="col-sm-12" style="padding-left:0px;padding-right:0px;over-flow:hidden;"></div>');
			$widget.before($category);
			$widget.before($type);
			$widget.before($month);
			$widget.before($week);
			$widget.before($day);
			$widget.before($datetime);
			$widget.before($time);
			$widget.before($minute);
			$widget.after($errMsg);
			$widget.wrap('<div class="widget-container" style="display:none;"></div>');
			//当每个控件改变时给主控件赋值
			var $allWidgets = $category.add($type).add($month).add($day).add($week).add($datetime).add($time).add($minute);
			$allWidgets.change(function(){
				var result = "";
				var category = $category.val();
				var type = $type.val();
				if(category == 0){
					//定时
					result = category + "," + $datetime.val();
				}else{
					//周期
					result += category + "," + type;
					switch(type){
					case "1":
						//每月
						result += "," + $day.val() + "," + $time.val();
						break;
					case "2":
						//每周
						result += "," + $week.val() + "," + $time.val();
						break;
					case "3":
						//每天
						result += "," + $time.val();
						break;
					case "4":
						//每小时
						result += "," + $minute.val();
						break;
					case "5":
						//每刻钟
						break;
					case "6":
					case "7":
					case "8":
						//每季度，年，半年
						result += "," + $month.val() + "," + $day.val() + "," + $time.val();
						break;
					}
				}
				$widget.val(result);
			});
			//改变调度类型
			$category.change(function(){
				if($category.val() === "0"){
					//定时
					Venus.hideFormWidget($([$type,$month,$day,$week,$time,$minute]));
					Venus.showFormWidget($datetime);
				}else{
					//周期
					Venus.hideFormWidget($datetime);
					Venus.showFormWidget($type);
					$type.trigger("change");
				}
			});
			//改变周期类型
			$type.change(function(){
				$errMsg.hide();
				switch($type.val()){
				case "1":
					//每月
					Venus.hideFormWidget($([$week,$month,$minute]));
					Venus.showFormWidget($([$day,$time]));
					break;
				case "2":
					//每周
					Venus.hideFormWidget($([$month,$day,$minute]));
					Venus.showFormWidget($([$week,$time]));
					break;
				case "3":
					//每天
					Venus.hideFormWidget($([$month,$day,$week,$minute]));
					Venus.showFormWidget($time);
					break;
				case "4":
					//每小时
					Venus.hideFormWidget($([$month,$day,$week,$time]));
					Venus.showFormWidget($minute);
					break;
				case "5":
					//每刻钟
					Venus.hideFormWidget($([$month,$day,$week,$minute,$time]));
					break;
				case "6":
				case "7":
				case "8":
					//每季度，年，半年
					Venus.hideFormWidget($([$week,$minute]));
					Venus.showFormWidget($([$month,$day,$time]));
					break;
				}
				setTimeout(function(){
					$errMsg.show();
				},100);
			});
			$month.change(function(){
				//改变月份时，重置$day中的选项
				/*for(var i = 1; i < 32; i++){
					$day.append("<option value='" + i + "'>" + i + "日</option>");
				}
				$day.append("<option value='L'>月底最后一天</option>");*/
			});
			//回填值
			var schedulerInfo = config.schedulerInfo;
			var schedulerType = config.schedulerType;
			if(schedulerInfo && schedulerType){
				var infoArr = schedulerInfo.split(" ");
				//var $allWidgets = $category.add($type).add($month).add($day).add($week).add($datetime).add($time).add($minute);
				if(schedulerType == "1001"){
					//定时
					$category.val("0").trigger("change");
					$datetime.val(infoArr[5]+"-"+infoArr[4]+"-"+infoArr[3]+" "+infoArr[2]+":"+infoArr[1]+":"+infoArr[0]);
				}else{
					//周期
					$category.val("1").trigger("change");
					if(schedulerType == 2005 ||schedulerType == 2006||schedulerType == 2007){
						if(schedulerType == 2005 ){
							$type.val("6");//季度
						}else if(schedulerType == 2006){
							$type.val("7");//半年
						}else if(schedulerType == 2007){
							$type.val("8");//年
						}

						var month=infoArr[4];
						if(month.indexOf("/")>0){
							month=month.substr(0,month.indexOf("/"));
						}
						$month.val(month);
						$day.val(infoArr[3]);
						$time.val(infoArr[2]+":"+infoArr[1]+":00");
					}else if(schedulerType == 2003){
						$type.val("1");
						$day.val(infoArr[3]);
						$time.val(infoArr[2]+":"+infoArr[1]);
					}else if(schedulerType == 2004){
						$type.val("2");
						$day.val(infoArr[5]);
						$time.val(infoArr[2]+":"+infoArr[1]);
					}else if(schedulerType == 2002){
						$type.val("3");
						$time.val(infoArr[2]+":"+infoArr[1]);
					}else if(schedulerType == 2001){
						$type.val("4");
						$minute.val(infoArr[1]);
					}else if(schedulerType == 2000){
						$type.val("5");
					}
				}
				setTimeout(function(){
					$category.trigger("change");
				},0);
			}
			//标识完成
			$widget.attr("period-widget-venus-init", "done");
		});
	};

	/**
	 * 解析框架中的自定义控件
	 */
	Venus.initVenusWidgets = function(callback) {
		//备份表单的验证规则
		$("form").each(function(index,form){
			if(!$(form).data("validateBackup")){
				$.data(form,"validateBackup",$.extend(true,{},$(form).validate()));
			}
		});
		$(window).trigger('resize');
		Venus.initPeriodWidgets();
		Venus.initVenusTree();
		Venus.initReferenceTableSelect();
		Venus.initVenusGrid();
		Venus.initVenusQueryForm();
		Venus.initQueryFormButton();
		Venus.initVenusFormWidgets();
		Venus.initVenusSelectInput();
		Venus.initVenusMultiSelectInput();
		Venus.initVenusTableSelectInput();
		Venus.initVenusTableSelectChosen();
		Venus.initVenusCustomeSelectChosen();
		Venus.initVenusComplexSelectChosen();
		Venus.initVenusButton();
		Venus.initDialogScroller();
		Venus.initDetailinfo();
		Venus.initFormGroupSpliter();
		typeof callback == 'function' && callback();
		//页面渲染完成后，调整尺寸
		$(window).trigger('resize');
		while(Venus.animationQueen.length > 0){
			var item = Venus.animationQueen.shift();
			if(item.method == "fadeIn"){
				Venus.fadeIn(item.element);
			}
		}
		//调用页面加载完成的回调函数
		setTimeout(function(){
			if(Venus.pageCompleteCallbacks.length > 0){
				var pageObj = window[Venus.pageCompleteCallbacks.shift()];
				if(pageObj && pageObj.afterPageComplete){
					pageObj.afterPageComplete();
				}
			}
		},0);
		//兼容IE8、9的placeholder
		jQuery('input, textarea, select').placeholder();
	};


	/**
	 * 加载连接到对应的容器
	 * @param {Object} containerselector 容器选择器
	 * @param {String} targethref 目的url
	 */
	Venus.load = function(containerselector, targethref) {
		var $container = $(containerselector);
		//分两种情况 1加载到main 2 加载到left 3加载到right
		//1加载到main，显示main，清空left，right，并将其隐藏
		if(containerselector == "#main"){
			Venus.latestLoadedPageType = "main";
			Venus.loadPage($("#main .scroll-content").first(), targethref, "main");

		}else if(containerselector == "#left"){
			//2加载到left，显示left，right，清空main，并将其隐藏
			Venus.latestLoadedPageType = "left";
			Venus.loadPage($("#left .scroll-content").first(), targethref, "left");
		}else if(containerselector == "#right"){
			//3加载到right
			Venus.latestLoadedPageType = "right";
			Venus.loadPage($("#right .scroll-content").first(), targethref, "right");
		}else{
			//4加载到其它
			setTimeout(function(){
				$container.load(targethref, Venus.initVenusWidgets);
			},250);

		}
	};


	Venus.fadeIn = function($element){
		$element.velocity({
			top:[0,-2],
			opacity:[1,0.5]
		},{
			duration:80
		});
	};

	Venus.animationQueen = [];
	/**
	 * 加载连接到对应的容器
	 * @param {Object} containerselector 容器选择器
	 * @param {String} targethref 目的url
	 */
	Venus.loadPage = function($container, targethref, pageType) {
		//载入页面Page对象时清空页面垃圾对象
		var clearPages = function(pagesArr){
			if(pagesArr.length === 0)return;
			for(var key in pagesArr){
				//eval(pagesArr[key] +" = null");
				pagesArr[key] = null;
				//console.log('clear ' + pagesArr[key]);
			}
			pagesArr = [];
		};
		clearPages(Venus.loadedPages.main);
		clearPages(Venus.loadedPages.right);
		Venus.loadedPages.main = [];
		Venus.loadedPages.right = [];
		//1如果要载入right页面，则不清空left页面上的对象
		if(Venus.latestLoadedPageType != "right"){
			clearPages(Venus.loadedPages.left);
			Venus.loadedPages.left = [];
		}
		clearPages = null;
		//清空页面表单的日期控件
		while(Venus.waitToDestroyDateWidgets.length > 0){
			var item = Venus.waitToDestroyDateWidgets.shift();
			if(item.type === "dateTime"){
				//item.object.data("datetimepicker").destroy();
			}else if(item.type === "dateRange"){
				item.object.data('daterangepicker').remove();
			}else if(item.type === "dateTimeRange"){
				item.object.data('daterangepicker').remove();
			}
		}
		var $main = $("#main");
		var $left = $("#left");
		var $right = $("#right");
		if(Venus.useAnimation){
			if(pageType == "main"){
				//如果从main页面跳到main页面
				if($main.css("display") != "none"){

					$main.velocity({opacity: [0,1]}, {
						duration:50,
						complete:function(){
							Venus.animationQueen.push({method:"fadeIn",element:$main});
							$container.load(targethref, Venus.initVenusWidgets);
						}
					});
				}else{
					//如果从left页面跳到main页面
					$("#left, #right").velocity({opacity: [0,1]}, {
						duration:80,
						complete:function(){
							$left.hide();
							$right.hide();
							$main.show();
							Venus.animationQueen.push({method:"fadeIn",element:$main});
							$("#left .scroll-content").first().html("");
							$("#right .scroll-content").first().html("");
							$container.load(targethref, Venus.initVenusWidgets);
						}
					});
				}
			}else if(pageType == "left"){
				//如果从main页面跳到left页面
				if($main.css("display") != "none"){

					$main.velocity({opacity: [0,1]}, {
						duration:80,
						complete:function(){
							$main.hide();
							$left.show();
							Venus.animationQueen.push({method:"fadeIn",element:$left});
							$("#main .scroll-content").first().html("");
							$container.load(targethref, Venus.initVenusWidgets);
						}
					});
				}else{
					//如果从left页面跳到left页面
					$("#left, #right").velocity({opacity: [0,1]}, {
						duration:100,
						complete:function(){
							$right.hide();
							$left.show();
							Venus.animationQueen.push({method:"fadeIn",element:$left});
							$container.load(targethref, Venus.initVenusWidgets);
						}
					});
				}
			}else if(pageType == "right"){
				$right.velocity({opacity: [0,1]}, {
					duration:100,
					complete:function(){
						$right.show();
						Venus.animationQueen.push({method:"fadeIn",element:$right});
						$container.load(targethref, Venus.initVenusWidgets);
					}
				});
			}

		}else{
			if(pageType == "main"){
				$("#left .scroll-content").first().html("");
				$("#right .scroll-content").first().html("");
			}else if(pageType == "left"){
				$("#main .scroll-content").first().html("");
				$("#right .scroll-content").first().html("");
			}
			$container.load(targethref, Venus.initVenusWidgets);
			if(pageType == "main"){
				$left.hide();
				$right.hide();
				$main.show();
				$main.css("opacity","1");
			}else if(pageType == "left"){
				$main.hide();
				$left.show();
				$right.show();
				$main.css("opacity","1");
			}
		}
	};

	/**
	 * 初始化确认框组件
	 * @param title {String} 确认框标题
	 * @param message {String} 确认框提示内容
	 * @param yesCallback {Function} 确认框点确认按钮后执行的函数
	 */
	Venus.confirm = function(msg, yesCallback) {
		bootbox.confirm({
			message:"<h3>" + msg + "</h3>",
			buttons:{
				cancel:{
					label:Venus.msg('cancel'),
					className:'btn-icon-remove'
				},
				confirm:{
					label:Venus.msg('confirm'),
					className:'btn-icon-save btn-primary'
				}
			},
			callback:function(result) {
				if (result) {
					yesCallback();
				}
			}
		});
		Venus.initVenusButton();
	};

	/**
	 * 初始化操作提示框组件
	 * @param flag {String} 提示类型(success/warning/error)
	 */
	Venus.alert = function(title, message, styleClass) {
		$.gritter.add({
			title: title,
			text: message,
			class_name: 'gritter-' + styleClass + ' gritter-light'
		});
	};

	Venus.dialog = function(config){
		//override dialog's title function to allow for HTML titles
		$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
			_title: function(title) {
				var $title = this.options.title || '&nbsp;';
				if( ("title_html" in this.options) && this.options.title_html === true ){
					title.html($title);
				}else {
					title.text($title);
				}
			}
		}));
		config = $.extend(true,{},config);
		config.title = "<div class='widget-header widget-header-small'><h4 class='smaller'>" + config.title + "</h4></div>";
		var defaultOptions = {
			resizable: false,
			closeText:'关闭',
			modal: true,
			title_html: true,
			buttons: config.buttons ? Venus.str2Obj(config.buttons) : [

				{
					html: "&nbsp;" + Venus.msg('cancel'),
					"class" : "btn btn-xs  btn-icon-remove",
					click: function() {
						if(config.type == 'dom'){
							$(config.target).insertAfter($(config.target).data("preDom")).hide();
						}
						$( this ).dialog( "destroy").detach();
					}
				},{
					html: "&nbsp;" + Venus.msg('confirm'),
					"class" : "btn btn-primary btn-xs btn-icon-save",
					click: function() {
						config.yesCallback && Venus.str2Obj(config.yesCallback)();
						if(config.type == 'dom'){
							$(config.target).insertAfter($(config.target).data("preDom")).hide();
						}
						$( this ).dialog( "destroy").detach();
					}
				}
			],
			close:function(event,ui){
				var $target = $(event.target);
				if($target.hasClass("ui-dialog-content")){
					if(config.type == 'dom'){
						$(config.target).insertAfter($(config.target).data("preDom")).hide();
					}
					$( this ).dialog( "destroy").detach();
				}
			}
		};
		if(config.size){
			//三种尺寸大小
			switch(config.size){
				case 'lg':
					defaultOptions.width = window.screen.width * 0.8 < 800 ? 800 : window.screen.width * 0.8;
					defaultOptions.height = window.screen.height * 0.8 < 600 ? 600 : window.screen.height * 0.8;
					break;
				case 'md':
					defaultOptions.width = window.screen.width * 0.6 < 600 ? 600 : window.screen.width * 0.6;
					defaultOptions.height = window.screen.height * 0.6 < 400 ? 400 : window.screen.height * 0.6;
					break;
				case 'sm':
					defaultOptions.width = window.screen.width * 0.4 < 400 ? 400 : window.screen.width * 0.4;
					defaultOptions.height = window.screen.height * 0.4 < 300 ? 300 : window.screen.height * 0.4;
					break;
			}
			delete config.width;
			delete config.height;
		}
		delete config.buttons;

		var dialogOpts = $.extend(true,defaultOptions,config);

		var dialogId = Venus.getRandomId();
		var $dialog = $('<div class="dialog-scroller" id="' + dialogId + '"></div>');
		$("body").append($dialog);
		if(config.type == 'dom'){
			$.data($(config.target)[0],"preDom",$(config.target).prev());
			$dialog.append($(config.target).show());
			Venus.initDialogScroller();
		}else if (config.type == 'url'){
			Venus.load("#" + dialogId, config.target);
		}
		$dialog.dialog(dialogOpts);
		$dialog.dialog({ show: { effect: "blind", duration: 200 } });
		Venus.initVenusButton();
		//防止对话框的关闭按钮出现下方的篮框
		$(".ui-dialog-titlebar-close .ui-button-text:contains('Close')").detach();
		//dialog不允许有滚动调
		$("#" + dialogId).css("overflow-y","hidden");
		return $dialog;
	};

	Venus.closeDialog = function(el){
		$(el).parents(".ui-dialog:first").find(".ui-dialog-content:first").dialog( "destroy").detach();
	};
	Venus.jsonData = {};

	/*
	 * 给元素添加动画
	 * @param $el {Object} 需要添加动画的元素
	 * @param animateName {String} 动画的名称
	 * @param animationOptions {Object} 执行动画的属性设置对象
	 *
	 * */
	Venus.animate = function($el, animateName, animationOptions, callback) {
		var animationName = "animated " + animateName;
		var animationend = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
		var animationDefaultOptions = {
			duration: "1s",
			delay: "0s",
			iterationCount: "1"
		};
		animationOptions = $.extend(true, animationDefaultOptions, animationOptions);
		$el
			.css('-webkit-animation-duration', animationOptions.duration)
			.css('-webkit-animation-delay', animationOptions.delay)
			.css('-webkit-animation-iterationCount', animationOptions.iterationCount)
			.addClass(animationName).one(animationend, function() {
				$(this).removeClass(animationName);
				typeof callback == "function" && callback();
			});
	};
	Venus.getFromWebWorker = function(data, callback) {
		var worker = new Worker("/resources/js/venus-worker.js");
		worker.postMessage(data);
		worker.onmessage = function(event) {
			worker.terminate();
			callback(event.data);
		};
	};
	Venus.compile = function(){
		if(arguments.length < 2)return;
		var result = arguments[0];
		for(var i = 0; i < arguments.length; i++){
			result = result.replace('{' + i + '}', arguments[i+1]);
		}
		return result;
	};


	Venus.addRippleEffect = function(e){
		try{
		    var target = e.target;
		    if (target.tagName.toLowerCase() !== 'button') return false;
		    var rect = target.getBoundingClientRect();
		    var ripple = target.querySelector('.ripple');
		    if (!ripple) {
		        ripple = document.createElement('span');
		        ripple.className = 'ripple';
		        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		        target.appendChild(ripple);
		    }
		    ripple.classList.remove('show');
		    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
		    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
		    ripple.style.top = top + 'px';
		    ripple.style.left = left + 'px';
		    ripple.classList.add('show');
		}catch(e){
			//console.log(e);
		}
	    return false;
	};
	//Venus.addRippleEffect();


	Venus.shrinkLeftMenuHandler = function(e){
	    var $target = $(e.target);
	    if ($target.attr("id") === "sidebar-collapse" || $target.parents("#sidebar-collapse").length > 0){
	    	$(window).trigger("resize");
	    }
	};
	//页面上触发单击事件时的一些处理（按钮点击特效，伸缩左侧菜单页面重新布局）
	try{
		document.addEventListener('click', function(e){
			Venus.addRippleEffect(e);
			Venus.shrinkLeftMenuHandler(e);
			Venus.tabMenuHandler(e);

		}, false);
	}catch(e){
		//console && console.log("浏览器版本太低");
	}

	//点tab标签时重新渲染控件
	Venus.tabMenuHandler = function(e){
		var $target = $(e.target);
		if($target.is(".nav-tabs li a")){
			setTimeout(function(){
				Venus.initVenusWidgets();
			},200);
		}
	};
	Venus.addpulsEffect = function($btns){
		$btns.filter(function(){
			return $(this).parent().css("z-index") != "auto";
		}).on('mouseenter', function () {
			var $this = $(this);
			$this
			.css("z-index",~~$this.parent().css("z-index") + 1)
			.velocity({
					scaleX:1.1,
					scaleY: 1.1
				},{
				    duration: 200,
				    easing: "easeOutExpo"
				}
			);
		}).on('mouseleave', function () {
			var $this = $(this);
			$this
			.css("z-index",~~$this.parent().css("z-index"))
			.velocity({
					scaleX:1,
					scaleY: 1
				},{
				    duration: 100,
				    easing: "easeInOutCubic"
			});
		});
	};

	/***********************************SMP 新增方法***************************************/
	Venus.transformArrayToTreeGridData = function(nodes, settings){
		var idKey = settings.idKey || "id";
		var pIdKey = settings.pIdKey || "pid";
		var resultNodes = [];
		var setting = {
			data: {
				simpleData: {
					enable: true,
					idKey: idKey,
					pIdKey: pIdKey
				}
			}
		};
		var tempTreeObj = $.fn.zTree.init($("<div></div>"),setting,nodes);
		var tempNodes = tempTreeObj.getNodes();
		var transformNodes = function(nodes,level){
			for(var i = 0; i < nodes.length; i++){
				var obj = {};
				obj.id = nodes[i][idKey];
				obj.parent = nodes[i][pIdKey] || 0;
				obj.level = level;
				obj.expanded=true;
				$(settings.fields).each(function(index, item){
					obj[item] = nodes[i][item];
				});
				resultNodes.push(obj);
				if(!nodes[i].children || nodes[i].children.length == 0){
					obj.isLeaf = true;
				}else if(nodes[i].children && nodes[i].children.length > 0){
					transformNodes(nodes[i].children, level+1);
				}
			}
		};
		transformNodes(tempNodes,0);
		return resultNodes;
	};

	/**
	 * 解析框架中的表格引用控件
	 */
	Venus.initReferenceTableSelect = function() {

		$(".reference-table-venus").each(function(index, item) {
			var $widget = $(item);
			//如果已经初始化过，则直接跳过判断下一个
			if ($widget.attr("reference-table-venus-init") == "done") return true;
			$widget.addClass("form-control");
			var config = $widget.data("config") || eval("(" + $widget.attr("data-venus") + ")");
			$.data($widget[0],'config',config);
			var settings = $widget.parents("form:first").length > 0 &&
				$widget.parents("form:first").validate().settings; //拿到验证setting
			var $errorMsgDiv = null;
			//在后面添加错误提示框
			$errorMsgDiv = $('<div class="error-msg ' + (config.errMsgColNum || '') + '" style="display:none"' + '">&nbsp;</div>');
			config.errMsgColNum && $widget.after($errorMsgDiv);//如果没设置错误提示就不去显示它
			//包装在widget-container内
			$widget.wrap("<div class='widget-container " + config.colNum + "' style='margin-bottom:10px;'></div>");
			//在后面添加表格控件
			var tempId = Venus.getRandomId();
			var $btnContainer = $('<div class="grid-title-btns-venus" data-target="' + tempId + '">' +
										'<button class="btn-icon-add" id="' + (tempId + '_btn') + '">' + (config.label || '新增') + '</button>' 	+
									'</div>');
			var $addBtn = $btnContainer.find("#" + tempId + '_btn');
			var $table = $('<div class="table-container table-venus" id="' + tempId + '" data-venus="{\'options\':\'' + config.showGridOpts + '\'}"></div>');
			$widget.after($table).after($btnContainer);
			//给按钮加事件
			if(config.selectType === 'tree'){
				Venus.bindAddEventOnReferenceTableTree($addBtn, $table, $widget, config);
			}else if(config.selectType === 'grid'){
				Venus.bindAddEventOnReferenceTableGrid($addBtn, $table, $widget, config);
			}else if(config.selectType === 'complex'){
				Venus.bindAddEventOnReferenceTableComplex($addBtn, $table, $widget, config);
			}
			//给已选表格记录添加删除按钮
			var showGridOpts = Venus.str2Obj(config.showGridOpts);
			var hasOperationCol = false;
			$(showGridOpts.colModel).each(function(index, item){
				if(item.name == "operation") hasOperationCol = true;
			});
			!hasOperationCol && showGridOpts.colModel.push({ name : 'operation', 	label:'操作',	width : 100,operations: ['del(id)']});
			showGridOpts.del = function(id){
				$table.data('jqgrid').grid.jqGrid("delRowData",id);
				$widget.find("[value=" + id + "]").detach();
			};
			//隐藏自己
			$widget.hide();
			//标识完成
			$widget.attr("reference-table-venus-init", "done");
		});
	};

	Venus.bindAddEventOnReferenceTableTree = function($btn, $table, $widget, config){
		//如果没有config.treeOpts，默认给空对象防止报错
		config.treeOpts = config.treeOpts || {};
		$btn.on('click', function() {
			var treeId = Venus.getRandomId();
			var $treeDom = $('<div class="widget-box widget-color-blue2">' +
				'  <div class="widget-header">' +
				'    <h4 class="widget-title lighter smaller">' + (config.treeOpts.treeTitle || config.label) + '</h4>' +
				'  </div>' +
				'  <div class="widget-body" style="height:' + (config.treeOpts.treeHeight || '300') + 'px;">' +
				'      <div class="ztree" id="' + treeId + '"></div>' +
				'  </div>' +
				'</div>');
			bootbox.dialog({
				title: config.label || '自定义对话框',
				message: $treeDom,
				buttons: {
					"danger": {
						"label":  "&nbsp" + Venus.msg("cancel"),
						"className": "btn-sm btn-icon-remove",
						"callback": function() {
							//Example.show("uh oh, look out!");
						}
					},
					"success": {
						"label":  "&nbsp" + Venus.msg("confirm"),
						"className": "btn-sm btn-primary btn-icon-save",
						"callback": function() {
							//获取选中的节点
							var selectedItems = $widget.ztree.getCheckedNodes();
							//拿到将要装载数据的表格
							var $grid = $table.data("jqgrid").grid;
							//清空数据
							$grid.jqGrid("clearGridData");
							$grid[0].addJSONData({
								total : 1,
								page : 1,
								records : selectedItems.length,
								rows : selectedItems
							});
							var optionsArr = [];
							for (var key in selectedItems) {
								var item = selectedItems[key];
								var value = item.id;
								var showText = item.name;
								if(config.showFullPath === true){
									while(item.getParentNode()){
										showText = item.getParentNode().name + "/" +showText;
										item = item.getParentNode();
									}
								}
								optionsArr.push("<option value='",value,"' selected>",showText,"</option>");
							}
							$widget.html(optionsArr.join(""));
							$widget.trigger('focusout');
							$widget.trigger('change');
							if(config.yesCallback){
								Venus.str2Obj(config.yesCallback)(selectedItems);
							}
						}
					}
				}
			});
			//Venus.initVenusButton();
			var defaultSettings = {
				data: {
					simpleData: {
						idKey: config.treeOpts.idKey,
						pIdKey: config.treeOpts.pIdKey
					},
					key: {
						name: config.treeOpts.nameKey
					}
				},
				check: {
					enable: true,
					chkStyle: config.treeOpts.chkStyle || 'radio',
					radioType: config.treeOpts.radioType || 'all'
				},
				callback: {
					onClick: function(event, treeId, treeNode, clickFlag) {
						if (config.treeOpts.onClick) {
							Venus.str2Obj(config.treeOpts.onClick)(event, treeId, treeNode, clickFlag);
						}
					}
				}
			};
			var treeSettings = $.extend(true,defaultSettings,config.treeOpts);
			//将已选中的节点预先勾选出来
			var setCheckedNodes = function(nodes) {
				var checkedIds = $widget.val();
				if(typeof checkedIds == "string"){
					checkedIds = [checkedIds];
				}
				var idKey = config.treeOpts.idKey || "id";
				checkedIds && $(nodes).each(function(index, node){
					if (checkedIds.indexOf(node[idKey].toString()) != -1) {
						node.checked = true;
					}
				});
				return nodes;
			};

			//将半选中的节点展开
			var openHalfCheckedNodes = function(ztree) {
				var nodes = ztree.getNodes();
				//如果没有选中的，则展开第一个父节点
				if (!$widget.val()) {
					ztree.expandNode(nodes[0], true);
				} else {
					var checkedNode = ztree.getCheckedNodes()[0];
					var parentNode = checkedNode ? checkedNode.getParentNode() : false;
					while (parentNode) {
						ztree.expandNode(parentNode, true);
						parentNode = parentNode.getParentNode();
					}
				}
			};
			// 获取树的节点数据,如果有localData，则直接从本地变量里拿数据，否则从url拿数据
			var treeNodes = null;
			if (config.treeOpts.localData) {
				treeNodes = Venus.str2Obj(config.treeOpts.localData);
				treeNodes = $.extend(true,[],treeNodes);
				//如果treeNodes在载入树控件之前需要处理
				if (config.treeOpts.dataPreHandler){
					treeNodes = Venus.str2Obj(config.treeOpts.dataPreHandler)(treeNodes);
				}
				treeNodes = setCheckedNodes(treeNodes);
				$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, treeNodes);
				openHalfCheckedNodes($widget.ztree);
			} else {
				$.getJSON(config.treeOpts.url, function(data) {
					//如果treeNodes在载入树控件之前需要处理
					if (config.treeOpts.dataPreHandler)
						data = Venus.str2Obj(config.treeOpts.dataPreHandler)(data);
					data = setCheckedNodes(data);
					$widget.ztree = Venus.getzTree($("#" + treeId), treeSettings, data);
					openHalfCheckedNodes($widget.ztree);
				});
			}
			return false;
		});
	};

	Venus.bindAddEventOnReferenceTableGrid = function($btn, $table, $widget, config){
		$btn.on('click', function() {
			//给表格属性中加入preSelectedIds，用于回选记录
			Venus.str2Obj(config.selectGridOpts).preSelectedIds = $widget.val();
			var $tableDom = $("<div class=\"table-container table-venus\" data-venus=\"{'options':'" + config.selectGridOpts + "'}\"></div>");
			bootbox.dialog({
				title: config.dialogTitle || '自定义对话框',
				message: $tableDom,
				buttons: {
					"danger": {
						"label":  "&nbsp" + Venus.msg("cancel"),
						"className": "btn-sm btn-icon-remove",
						"callback": function() {
							//Example.show("uh oh, look out!");
						}
					},
					"success": {
						"label":  "&nbsp" + Venus.msg("confirm"),
						"className": "btn-sm btn-primary btn-icon-save",
						"callback": function() {
							var $selectGrid = $tableDom.find(".ui-jqgrid-bdiv table");
							var selectedIds = $tableDom.find(".ui-jqgrid-bdiv table").jqGrid('getGridParam', 'selarrrow');
							//将选择的节点全部装载到select中，并将其更新
							var optionsArr = [];
							var selectedData = [];
							$(selectedIds).each(function(index, id){
								var rowData = $selectGrid.jqGrid('getRowData', id);
								selectedData.push(rowData);
								optionsArr.push("<option value='",(rowData[config.selectField] || rowData.id),"' selected>",(rowData[config.showField] || rowData.name),"</option>");
								rowData = null;
							});
							$widget.html(optionsArr.join(""));
							var $showGrid = $table.data("jqgrid").grid;
							$showGrid.jqGrid("clearGridData");
							$showGrid[0].addJSONData({
								total : 1,
								page : 1,
								records : selectedData.length,
								rows : selectedData
							});
							//触发验证
							$widget.trigger('focusout');
							$widget.trigger('change');
						}
					}
				}
			});
			Venus.initVenusButton();
			setTimeout(function(){Venus.initVenusGrid();},150);
			return false;
		});
	};

	Venus.bindAddEventOnReferenceTableComplex = function($btn, $table, $widget, config){
		//给表格属性中加入preSelectedIds，用于回选记录
		$btn.on('click', function() {
			var selectedOptsBackUP = $widget.find("option:selected").clone(true);
			//将表格中的数据放入select中
			var $showGrid = $table.data("jqgrid").grid;
			var ids = $showGrid.jqGrid("getDataIDs");
			var $optionsArr = [];
			$(ids).each(function(index, id){
				var rowData = $showGrid.jqGrid("getRowData",id);
				var $option = $('<option value="' + id + '" selected>' + id + '</option>');
				$.data($option[0], 'dataObject', rowData);
				$optionsArr.push($option);
			});
			$widget.html("");
			$($optionsArr).each(function(index, $option){
				$widget.append($option);
			});
			var $dialog = null;
			//将下拉选项备份，在取消是将其还原
			var selectedOptsBackUP = $widget.find("option:selected").clone(true);
			config.dialogOptions.buttons = [
				{
					html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; " + Venus.msg('cancel'),
					"class" : "btn btn-xs",
					click: function() {
						$widget.html("");
						selectedOptsBackUP.appendTo($widget);
						$widget.trigger('chosen:updated');
						$( this ).dialog( "destroy" ).detach();
					}
				},{
					html: "<i class='ace-icon fa fa-check'></i>&nbsp; " + Venus.msg('confirm'),
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var $select = $dialog.data("desSelect");
						//将选择的节点全部装载到select中，并将其更新
						$widget.html("");
						$select.find('option:selected').appendTo($widget);
						var selectedData = $widget.dataObjects();
						var $showGrid = $table.data("jqgrid").grid;
						$showGrid.jqGrid("clearGridData");
						$table.data("jqgrid").options.datatype = 'local';
						$showGrid[0].addJSONData(selectedData);
						//触发验证
						$widget.trigger('focusout');
						$widget.trigger('change');
						var yesCallback = Venus.str2Obj(config.yesCallback);
						typeof yesCallback == 'function' && yesCallback();
						$( this ).dialog( "destroy" ).detach();
					}
				}
			];
			config.dialogOptions.close = function(event,ui){
				var $target = $(event.target);
				if($target.hasClass("ui-dialog-content")){
					$widget.html("");
					selectedOptsBackUP.appendTo($widget);
					$widget.trigger('chosen:updated');
					$target.parents(".ui-dialog:first").detach();
				}
			};
			$dialog = Venus.dialog(config.dialogOptions);
			$.data($dialog[0],"srcSelect",$widget);
			return false;
		});
	};
}());