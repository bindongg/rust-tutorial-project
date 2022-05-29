package com.rust.compile.controller;

import com.rust.compile.model.CompileInputModel;
import com.rust.compile.model.CompileOutputModel;
import com.rust.compile.service.CompileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class CompilerController {
	@Autowired
	private CompileService compileService;

	@ResponseBody
	@RequestMapping(value = "/compile", method = RequestMethod.POST)
	public String onlineCompile(CompileInputModel compileInputModel) {
		try {
			CompileOutputModel compileOutputModel = compileService.onlineCompile(compileInputModel);
			return (compileOutputModel.getStdOut().length() != 0) ? compileOutputModel.getStdOut() : compileOutputModel.getStdErr();
		} catch (IOException e) {
			e.printStackTrace();
			return "IOException Error";
		}
	}
}