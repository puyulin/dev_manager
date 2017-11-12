<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="common.jsp" %>
<!DOCTYPE HTML >
<html>
  <head>
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
  </head>
  
  <body>
      <form action="${ctx}/login/index.do" method="post">
      	<input type="text" name="userName"/>
      	<input type="password" name="passwd"/>
      	<input type="submit" value="登录"/>
      </form>
  </body>
</html>
