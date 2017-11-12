package com.dev.data.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dev.data.dao.LocationDataDao;

@Service
public class LocationDataService {

	@Resource LocationDataDao locationDataDao;
	
	
	public List<Map<String, Object>> queryList(Map<String, Object> conditionMap){
		
		return locationDataDao.queryList(conditionMap);
		
	}
}
