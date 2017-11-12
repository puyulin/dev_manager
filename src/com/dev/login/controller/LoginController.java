package com.dev.login.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dev.freamarker.controller.BaseController;
import com.dev.user.service.UserService;

@Controller
@RequestMapping("/login")
public class LoginController extends BaseController{

	@Autowired UserService userService;
	
	@RequestMapping("/index")
	public String login(){
		System.out.println(getRequest().getParameter("userName"));
		Map<String,String> condtionMap = new HashMap<String,String>();
		userService.queryUserList(condtionMap);
		return "/main/index";
	}
	
	
}
