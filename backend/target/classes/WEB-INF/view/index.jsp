<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Rust Online Compiler</title>

<link rel="stylesheet" href="${path}/resources/css/style.css" />
</head>
<body>
	<div class="header">Rust Online Compiler</div>
	
	<div class="editor" id="editor"></div>
	<br>
	<div class="stdIn" id="stdIn" ></div>		
	<div class="button-container">			
		<button class="btn" onclick="executeCode()">Run</button>
	</div>
	
	<br>
	<div class="output"></div>

	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="${path}/resources/js/lib/ace.js"></script>
	<script src="${path}/resources/js/lib/theme-monokai.js"></script>
	<script src="${path}/resources/js/ide.js"></script>
</body>
</html>