package com.dev.user.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository("userDaoMapper")
public interface UserDao {
	
	
	public Map<String, Object> queryList(Map<String, String> conditionMap);

}
