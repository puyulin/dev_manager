<%@ page language="java" contentType="text/html; charset=utf8"%>
<%@ include file="/common.jsp" %>

	<form id="location_search" class="query-form-venus" data-target="res_table" onsubmit="return false;"
		data-venus="{
			'blurPlaceholder':'商品名称，商品型号'
		}"
	>
		<input name="data_init_pid" value="123" type="hidden"/>
		<input name="name" type="text" class="form-widget-venus"
			data-venus="{
				'hideLabel':true,
				'label':'商品名称',
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
		'options':'TradeListPage.logsListGridOpts'}"></div>


<%-- <form action="${ctx}/resManager/deleteByIds.do" id="delForm" style="display: none;"></form>
<form action="${ctx}/resManager/exportSysresList.do?nodeId=${nodeId}" method="post" id="exportForm" style="display: none;"></form> --%>


<script type="text/javascript">
    var TradeListPage = Venus.pageInit("TradeListPage");
    TradeListPage.index = 1; 
	TradeListPage.logsListGridOpts = {
		url : '${ctx}/trade/searchList.do',
		caption : '商品列表',
		shrinkToFit:true,
		shrinkHeight:true,
		//multiselect:true,
		//multiboxonly:false,
		//pager:null,
		rownumbers:true,
		relativeSelectId:"thisTableSelect",
		selectShowField:'name',
		colModel : [
			{ name : 'id', 			 label:'ID',	width : 100, sortable : false,hidden:true },
			{ name : 'name', 		 label:'名称',	width : 100, sortable : true,
				formatter:function(value,option,rowObj){
					var detail_name = "<a href=\"javascript:TradeListPage.update('"+rowObj.id+"');\">"+value+"</a>";
					return detail_name;
				} 
			},
			{ name : 'code', 			 label:'编号',	width : 100, sortable : false},
			{ name : 'price', 			 label:'价格',	width : 100, sortable : false},
			{ name : 'brand', 			 label:'品牌',	width : 100, sortable : false},
			{name :'operation' , label:'操作',width:30,sortable:false,
				operations:function(rowObj){
					return ['preview(id)'];
				}
			}
		],
		loadComplete:function(){
			$("#res_table").find("th:nth-child(2)").css("cssText","text-align:center!important");
		} 
	};
		
	
	TradeListPage.logsListGridOpts.preview = function(id){
		window.open("http://localhost${ctx}/trade/showTradeInfo.do?tradeId="+id);
	};
	
	TradeListPage.update = function(id){
		Venus.load("#main","${ctx }/trade/gotoModify.do?id="+id);
	};
	
	
</script>

