<%@ page language="java" contentType="text/html; charset=utf8"%>
<%@ include file="/common.jsp" %>

	<form id="location_search" class="query-form-venus" data-target="trade_table" onsubmit="return false;"
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
<div class="grid-title-btns-venus" data-target="trade_table">
	<button class="btn-icon-del" onclick="javascript:TradeListPage.delTrade()" >
		删除
	</button>
</div>
<div class="space-4"></div>

<!-- ----------------------------------------------------TABLE------------------------------------------------------ -->
<div class="table-container table-venus" id="trade_table"
	data-venus="{
		'options':'TradeListPage.logsListGridOpts'}"></div>


<form action="${ctx}/trade/deleteByIds.do" id="delForm" style="display: none;"></form>
<%-- <form action="${ctx}/resManager/exportSysresList.do?nodeId=${nodeId}" method="post" id="exportForm" style="display: none;"></form> --%>


<script type="text/javascript">
    var TradeListPage = Venus.pageInit("TradeListPage");
    TradeListPage.index = 1; 
	TradeListPage.logsListGridOpts = {
		url : '${ctx}/trade/searchList.do',
		caption : '商品列表',
		shrinkToFit:true,
		shrinkHeight:true,
		multiselect:true,
		multiboxonly:false,
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
			$("#trade_table").find("th:nth-child(2)").css("cssText","text-align:center!important");
		} 
	};
		
	
	TradeListPage.logsListGridOpts.preview = function(id){
		window.open("http://localhost${ctx}/trade/showTradeInfo.do?tradeId="+id);
	};
	
	TradeListPage.update = function(id){
		Venus.load("#main","${ctx }/trade/gotoModify.do?id="+id);
	};
	
	TradeListPage.delTrade = function(){
		  var s = jQuery("#trade_table").find("table[id^=jqid_]").jqGrid('getGridParam', 'selarrrow');
		    if(s.length==0){
		    	Venus.alert("请选择删除的商品!");
		    	return false;
		    }
		    Venus.confirm("是否确定删除商品",function(){
			    $("#delForm").empty();
			    $("#delForm").append("<input type='hidden'  value='"+s+"' name='tradeIds'/>");
			    $.ajax({
			    	url:"${ctx}/trade/deleteByIds.do",
			    	data:$("#delForm").serialize(),
			    	type:"POST",
			    	dataType:"json",
			    	async: true,
			    	success:function(data){
			    		 if(data.resultType=="isSuccess"){
			    			Venus.alert("操作成功","删除商品成功","success");
			    			TradeListPage.search();
			    		}else{
			    			bootbox.alert(data.msg);
			    			TradeListPage.search();
			    		}
			    	}
			    });
		    });
	};
	TradeListPage.search = function(){
		//$("#res_searchFrom").find("button:last").click();
		Venus.load("#main","${ctx }/trade/list.do");
	};
	
	
	
</script>

