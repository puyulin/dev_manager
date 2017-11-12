//自定义左侧菜单内容
//console.log('haha');
var rootMenuArr = [] ;
loadLeftMenus = function(menuId){
	var  rootMenu = null;
	for(var key in rootMenuArr){
		if(rootMenuArr[key].id == menuId){
			rootMenu =rootMenuArr[key]; 
		}
	}
	var leftMenusStr = "";
	//遍历左边一级菜单
	$(rootMenu.childrenList).each(function(index, item){
		var firstLevelMenuItemStr = 
			'<li class="hsub active open"><a name="@@name" class="dropdown-toggle">' +
				'<i class="##icon"></i>' + 
				'<span class="menu-text">@@text</span>' +
				'<b class="arrow fa fa-angle-down"></b>' +
			'</a>' + 
			'<b class="arrow"></b>';
		firstLevelMenuItemStr = firstLevelMenuItemStr.replace("@@name", item.id);
		firstLevelMenuItemStr = firstLevelMenuItemStr.replace("@@icon", item.icon);
		firstLevelMenuItemStr = firstLevelMenuItemStr.replace("@@text", item.name);
		var subMenusStr = '<ul class="submenu">';
		//遍历左边二级菜单
		$(rootMenu.childrenList[index].childrenList).each(function(index, subItem){
			var secondLevelMenuItemStr =
				'<li><a url="@@url" loadStyle="@@loadStyle" class="dropdown-toggle">' +
					'<i class="##icon"></i>' + 
					'<span class="menu-text">@@text</span>' +
					'<b class="arrow fa fa-angle-down"></b>' +
				'</a>' + 
				'<b class="arrow"></b>';
			secondLevelMenuItemStr = secondLevelMenuItemStr.replace("@@url", subItem.url);
			secondLevelMenuItemStr = secondLevelMenuItemStr.replace("@@name", subItem.id);
			secondLevelMenuItemStr = secondLevelMenuItemStr.replace("@@icon", subItem.icon);
			secondLevelMenuItemStr = secondLevelMenuItemStr.replace("@@text", subItem.name);
			secondLevelMenuItemStr = secondLevelMenuItemStr.replace("@@loadStyle", subItem.loadStyle);
			subMenusStr += secondLevelMenuItemStr + "</li>";
		});
		subMenusStr += "</ul>";
		leftMenusStr += firstLevelMenuItemStr + subMenusStr + "</li>";
	});
	$(".sidebar .nav-list").html(leftMenusStr);
	//绑定左侧菜单点击事件
	$(".sidebar .nav-list a").each(function(index,item){
		var $this = $(item);
		if($this.attr("url")){
			$this.on("click", function(e){
				e.preventDefault();
				var $this = $(this);
				var $parentLi = $this.parent();
				var hasSubMenus = $parentLi.find("li").length > 0;
				$parentLi.addClass("active");
				$parentLi.siblings().removeClass("active");
				//加载页面
				////console.log("haha");
				if($this.attr("loadStyle") == 'left-right'){
					//console.log("1...............");
					$this.attr("url") && Venus.load('#left', $this.attr("url"));
				}else{
					$this.attr("url") && Venus.load('#main', $this.attr("url"));
				}
			});
		} 
	});
	//菜单加载完毕，点击第一个菜单，加载出页面
	setTimeout(function(){
		$(".sidebar .nav-list li:first li a:first").click();
	},100);
};
loadHeaderMenus = function(data){
	if(data){
		//重构菜单数据
		//data = formatMenuJsonData(data);
		rootMenuArr = data;
		var $navHeaderMenuContainer = $(".nav-header");
		var headerMenusStr = "";
		$(data).each(function(index, item){
			var menuItemStr = '<li class="hover"><a  name="@@name">' + 
			'<i class="@@icon"></i>' + 
			'<span class="menu-text">@@text</span>' + 
			'</a></li>';
			//menuItemStr = menuItemStr.replace("@@url", item.url);
			menuItemStr = menuItemStr.replace("@@name", item.id);
			menuItemStr = menuItemStr.replace("@@icon", item.icon);
			menuItemStr = menuItemStr.replace("@@text", item.name);
			headerMenusStr += menuItemStr;
		});
		$navHeaderMenuContainer.html(headerMenusStr);
	}
	//顶部菜单绑定事件
	$(".nav-header li a").on("click", function(e){
		//e.preventDefault();
		var $this = $(this);
		var $parentLi = $this.parent();
		if($parentLi.hasClass("active")) return;
		$(".nav-header li.active").removeClass("active");
		$parentLi.addClass("active");
		//级联出左侧二级菜单
		loadLeftMenus($this.attr("name"));
	});
	$(".nav-header li:first a").click();
};

formatMenuJsonData = function(data){
	var subMenuArr = [];//所有子菜单
	var secondMenuArr = [];//二级菜单
	var thirdMenuArr = [];//三级菜单
	//拿到根菜单
	for(var key in data){
		if(data[key].parentNo == '-1'){
			rootMenuArr.push(data[key]);
		}else{
			subMenuArr.push(data[key]);
		}
	}
	//给根菜单找二级菜单

	var tempLeftMenus = [];
	for(var key in rootMenuArr){
		var rootMenu = rootMenuArr[key]; 
		rootMenu.children = [];
		while(subMenuArr.length > 0){
			var subMenu = subMenuArr.shift();
			if(subMenu.parentNo == rootMenu.menuNo){
				rootMenu.children.push(subMenu);
			}else{
				tempLeftMenus.push(subMenu);
			}
		}
		subMenuArr = tempLeftMenus;
		tempLeftMenus = [];
	}

	//subMenu中已不包含一级和二级菜单，现在给二级菜单级联三级菜单
	for(var key in rootMenuArr){
		var rootMenu = rootMenuArr[key];
		for(var subKey in rootMenu.children){
			var secondMenu = rootMenu.children[subKey];
			secondMenu.children = [];
			while(subMenuArr.length > 0){
				var subMenu = subMenuArr.shift();
				if(subMenu.parentNo == secondMenu.menuNo){
					secondMenu.children.push(subMenu);
				}else{
					tempLeftMenus.push(subMenu);
				}
			}
			subMenuArr = tempLeftMenus;
			tempLeftMenus = [];
		}
	}
	//console.log(rootMenuArr);
	return rootMenuArr;
};