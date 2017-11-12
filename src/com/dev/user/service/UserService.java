package com.dev.user.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.user.dao.UserDao;

@Service
public class UserService {
	
	@Autowired UserDao userDao;
	
	public void queryUserList(Map<String, String> conditionMap){
		userDao.queryList(conditionMap);
	}

}
