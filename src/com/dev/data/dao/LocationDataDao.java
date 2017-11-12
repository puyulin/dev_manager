package com.dev.data.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface LocationDataDao {

	public List<Map<String, Object>> queryList(Map<String, Object> conditionMap);
}
