<%@ page language="java" contentType="text/html; charset=utf8"%>
<%@ include file="/common.jsp" %>

	<form id="location_search" class="query-form-venus" data-target="res_table" onsubmit="return false;"
		data-venus="{
			'blurPlaceholder':'名称，编号'
		}"
	>
		<input name="data_init_pid" value="123" type="hidden"/>
		<input name="name" type="text" class="form-widget-venus"
			data-venus="{
				'hideLabel':true,
				'label':'<fmt:message key="m_resmanager_view_list_search_IP"/>',
				'colNum':'col-sm-3'}" />
				
		 <%-- <select name="restypeid" readonly class="form-widget-venus input-multi-select-venus" 
              	data-venus="{
                    'label':'<fmt:message key="m_resmanager_view_list_search_type"/>',
                    'colNum':'col-sm-4',
                    'treeHeight':'400',
                    'treeTitle':'<fmt:message key="m_resmanager_view_list_search_ctype"/>',
                    'dialogTitle':'<fmt:message key="m_resmanager_view_list_search_ctype"/>',
                    'chosen':true,
                    'treeOpts':{
					'idKey':'id',
					'pIdKey':'pid',
					'url':'${ctx}/resManager/selectRestype.do'
                    }
                  }">
                 </select> --%>
	</form>
<!-- ----------------------------------------------------CONTROL------------------------------------------------------ -->
<!-- <div class="grid-title-btns-venus" data-target="res_table">
		<button class="btn-icon-add" id="resmanager_add" href="javascript:void(0);">
			刷新
		</button>
</div> -->
<div class="space-4"></div>

<!-- ----------------------------------------------------TABLE------------------------------------------------------ -->
<div class="table-container table-venus" id="res_table"
	data-venus="{
		'options':'LocalListPage.logsListGridOpts'}"></div>


<%-- <form action="${ctx}/resManager/deleteByIds.do" id="delForm" style="display: none;"></form>
<form action="${ctx}/resManager/exportSysresList.do?nodeId=${nodeId}" method="post" id="exportForm" style="display: none;"></form> --%>


<script type="text/javascript">
    var LocalListPage = Venus.pageInit("LocalListPage");
    LocalListPage.index = 1; 
	LocalListPage.logsListGridOpts = {
		url : '${ctx}/location/searchList.do?nodeId=${nodeId}',
		caption : '省市区数据字典',
		shrinkToFit:true,
		shrinkHeight:true,
		//multiselect:true,
		//multiboxonly:false,
		pager:null,
		relativeSelectId:"thisTableSelect",
		selectShowField:'name',
		rowNum:1000,
		colModel : [
			{ name : 'codeid', 			 label:'ID',	width : 100, sortable : false,hidden:true },
			{ name : 'index', 			 label:'序号',	width : 10, sortable : false,
				formatter:function(value,option,rowObj){
					var index = LocalListPage.index++;
					return "&nbsp;&nbsp;"+index;
				}	
			},
			{ name : 'name', 		 label:'名称',	width : 100, sortable : true,
				formatter:function(value,option,rowObj){
					var detail_name = "<a href='javascript:LocalListPage.children(\""+rowObj.codeid+"\",\""+value+"\");'>"+value+"</a>";
					return detail_name;
				} 
			},
			{ name : 'codeid', 			 label:'编号',	width : 100, sortable : false}
			/* {name :'operation' , label:'操作',width:30,sortable:false,
				operations:function(rowObj){
					return ['detail(id)'];
				}
			} */
		],
		loadComplete:function(){
			$("#res_table").find("th:nth-child(2)").css("cssText","text-align:center!important");
		} 
	};
		
	
	LocalListPage.children = function(codeid,name){
		$("input[name='data_init_pid']").val(codeid);
		LocalListPage.index = 1;
		$("#location_search").find("button:last").click();
	}
	
	
</script>

