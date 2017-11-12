package com.dev.data.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dev.data.service.LocationDataService;
import com.dev.freamarker.controller.BaseController;
import com.dev.freamarker.pager.Pager;


@Controller
@RequestMapping(value="/location")
public class LocatioinDataController extends BaseController{
	
	@Resource LocationDataService locationDataService;
	
	@RequestMapping("/list")
	public String list(){
		
		return "/data/location/list";
	}
	
	@RequestMapping("/searchList")
	@ResponseBody
	public List<Map<String, Object>> searchList(){
		Map<String,Object> conditionMap = new HashMap<String,Object>();
		String blurQueryField = getParameter("blurQueryField");
		String pid = getParameter("data_init_pid");
		if (StringUtils.isNotBlank(blurQueryField)) {
			conditionMap.put("blurQueryField", blurQueryField);
		}
		if(StringUtils.isNotBlank(pid)){
			conditionMap.put("pid", pid);
		}
		List<Map<String, Object>> resultList = locationDataService.queryList(conditionMap);
		return resultList;
	}

}
